import ftplib
import os
import sys
import time

HOST = os.environ["FTP_HOST"]
USER = os.environ["FTP_USER"]
PASSWORD = os.environ["FTP_PASSWORD"]
LOCAL_ROOT = os.environ.get("LOCAL_ROOT", "out")

# 元からサーバーにある、このサイトのビルドとは無関係のフォルダ。触らない。
KEEP = {"wordpress", "images"}

MAX_RETRIES = 5


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
    ftp = connect()

    print("--- clearing previous site build (keeping wordpress/, images/) ---")
    for name in ftp.nlst("."):
        base = name.rsplit("/", 1)[-1]
        if base in (".", "..") or base in KEEP:
            continue
        try:
            ftp.delete(base)
            print(f"deleted file: {base}")
        except ftplib.error_perm:
            rm_recursive(ftp, base)
            print(f"removed dir: {base}")
    ftp.quit()

    print("--- uploading new site ---")
    uploader = Uploader()
    uploader.upload_dir(LOCAL_ROOT, "")
    uploader.close()

    print("--- done ---")


if __name__ == "__main__":
    sys.exit(main())
