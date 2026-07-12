import ftplib
import os
import sys
import tempfile
import time
from datetime import datetime, timezone

HOST = os.environ["FTP_HOST"]
USER = os.environ["FTP_USER"]
PASSWORD = os.environ["FTP_PASSWORD"]
LOCAL_ROOT = os.environ.get("LOCAL_ROOT", "out")

MAX_RETRIES = 5
KEEP_RELEASES = 2

HTACCESS_TEMPLATE = """RewriteEngine On
RewriteCond %{{REQUEST_URI}} !^/releases/
RewriteCond %{{REQUEST_URI}} !^/wordpress/
RewriteCond %{{REQUEST_URI}} !^/images/
RewriteRule ^(.*)$ /releases/{release_id}/$1 [L]
"""


def connect() -> ftplib.FTP_TLS:
    ftp = ftplib.FTP_TLS(HOST, timeout=60)
    ftp.login(USER, PASSWORD)
    ftp.prot_p()
    return ftp


def rm_recursive(ftp: ftplib.FTP_TLS, path: str):
    try:
        names = ftp.nlst(path)
    except ftplib.error_perm:
        return
    for name in names:
        base = name.rsplit("/", 1)[-1]
        if base in (".", ".."):
            continue
        full = f"{path}/{base}"
        try:
            ftp.delete(full)
        except ftplib.error_perm:
            rm_recursive(ftp, full)
    try:
        ftp.rmd(path)
    except ftplib.error_perm:
        pass


def mkd_safe(ftp: ftplib.FTP_TLS, path: str):
    try:
        ftp.mkd(path)
    except ftplib.error_perm:
        pass


class Uploader:
    """Uploads a directory tree, transparently reconnecting and retrying
    on transient FTP/TLS errors (Lolipop occasionally resets the data
    connection under many rapid transfers)."""

    def __init__(self):
        self.ftp = connect()

    def store(self, local_path: str, remote_path: str):
        last_error = None
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                with open(local_path, "rb") as f:
                    self.ftp.storbinary(f"STOR {remote_path}", f)
                print(f"uploaded: {remote_path}")
                return
            except (*ftplib.all_errors, OSError, EOFError) as e:
                last_error = e
                print(f"retry {attempt}/{MAX_RETRIES} for {remote_path}: {e}")
                try:
                    self.ftp.close()
                except Exception:
                    pass
                time.sleep(min(2 ** attempt, 15))
                self.ftp = connect()
        raise RuntimeError(f"failed to upload {remote_path} after {MAX_RETRIES} attempts") from last_error

    def mkd_safe(self, path: str):
        mkd_safe(self.ftp, path)

    def upload_dir(self, local_dir: str, remote_dir: str):
        self.mkd_safe(remote_dir)
        for entry in sorted(os.listdir(local_dir)):
            if entry == ".DS_Store":
                continue
            local_path = os.path.join(local_dir, entry)
            remote_path = f"{remote_dir}/{entry}" if remote_dir else entry
            if os.path.isdir(local_path):
                self.mkd_safe(remote_path)
                self.upload_dir(local_path, remote_path)
            else:
                self.store(local_path, remote_path)

    def close(self):
        try:
            self.ftp.quit()
        except Exception:
            pass


def main():
    release_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    release_path = f"releases/{release_id}"

    print(f"--- uploading new release to {release_path} (live site untouched) ---")
    uploader = Uploader()
    uploader.mkd_safe("releases")
    uploader.upload_dir(LOCAL_ROOT, release_path)
    uploader.close()

    print("--- switching live site (atomic .htaccess swap) ---")
    htaccess_content = HTACCESS_TEMPLATE.format(release_id=release_id)
    ftp = connect()
    with tempfile.NamedTemporaryFile("w", suffix=".htaccess", delete=False) as f:
        f.write(htaccess_content)
        tmp_path = f.name
    try:
        with open(tmp_path, "rb") as f:
            ftp.storbinary("STOR .htaccess", f)
    finally:
        os.unlink(tmp_path)
    print(f"switched live site to {release_path}")

    print("--- cleaning up old releases (keeping newest "
          f"{KEEP_RELEASES}) ---")
    names = sorted(
        n.rsplit("/", 1)[-1] for n in ftp.nlst("releases")
        if n.rsplit("/", 1)[-1] not in (".", "..")
    )
    for name in names[:-KEEP_RELEASES] if len(names) > KEEP_RELEASES else []:
        rm_recursive(ftp, f"releases/{name}")
        print(f"removed old release: {name}")

    ftp.quit()
    print("--- done ---")


if __name__ == "__main__":
    sys.exit(main())
