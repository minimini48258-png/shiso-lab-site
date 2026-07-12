import ftplib
import os
import sys

HOST = os.environ["FTP_HOST"]
USER = os.environ["FTP_USER"]
PASSWORD = os.environ["FTP_PASSWORD"]
LOCAL_ROOT = os.environ.get("LOCAL_ROOT", "out")

# 元からサーバーにある、このサイトのビルドとは無関係のフォルダ。触らない。
KEEP = {"wordpress", "images"}


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


def upload_dir(ftp: ftplib.FTP_TLS, local_dir: str, remote_dir: str):
    for entry in sorted(os.listdir(local_dir)):
        if entry == ".DS_Store":
            continue
        local_path = os.path.join(local_dir, entry)
        remote_path = f"{remote_dir}/{entry}" if remote_dir else entry
        if os.path.isdir(local_path):
            mkd_safe(ftp, remote_path)
            upload_dir(ftp, local_path, remote_path)
        else:
            with open(local_path, "rb") as f:
                ftp.storbinary(f"STOR {remote_path}", f)
            print(f"uploaded: {remote_path}")


def main():
    ftp = ftplib.FTP_TLS(HOST, timeout=60)
    ftp.login(USER, PASSWORD)
    ftp.prot_p()

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

    print("--- uploading new site ---")
    upload_dir(ftp, LOCAL_ROOT, "")

    ftp.quit()
    print("--- done ---")


if __name__ == "__main__":
    sys.exit(main())
