#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ETHERION PC 앱 만들기 (Electron) — 파이썬 표준 라이브러리만으로. Node.js · npm 필요 없음.

    python tools/desktop/build_exe.py            → desktop/out/ETHERION-v<버전>-win/ETHERION.exe  (출시용)
    python tools/desktop/build_exe.py --dev      → …-win-dev/   개발자 도구(F12) · 새로고침(F5) 되는 것
    python tools/desktop/build_exe.py --zip      → 폴더와 함께 …-win.zip 도 (남에게 보낼 때)
    python tools/desktop/build_exe.py --mac      → desktop/out/ETHERION-v<버전>-mac-arm64.zip  (애플 실리콘 맥, M1 이후)
    python tools/desktop/build_exe.py --mac-intel → …-mac-x64.zip (인텔 맥)
    (--linux 도 있다. 리눅스에서 시험해 볼 때)

하는 일
1. Electron 본체(크로미움이 든 실행 파일, 약 100MB)를 GitHub에서 처음 한 번 받아 desktop/cache/ 에 둔다.
   SHASUMS256.txt 로 확인한다. 버전은 아래 ELECTRON. 올리면 다시 받는다.
2. 게임 파일(안드로이드 앱과 같은 목록 — tools/android/build_apk.py 의 web_files: index.html · css · js · img · audio · fonts,
   배경음은 .ogg 만) + desktop/main.js · desktop/icon.png + package.json 을 app.asar 하나로 묶는다.
3. 본체를 풀어 electron.exe → ETHERION.exe, resources/app.asar 를 넣는다.
4. 출시용은 Electron fuse 를 바꾼다: 노드로 실행(ELECTRON_RUN_AS_NODE) · NODE_OPTIONS · --inspect 끔, app.asar 에서만 읽기.
5. 윈도우에서는 rcedit(처음 한 번 받음)로 exe 아이콘(desktop/icon.ico) · 이름 · 버전을 넣는다.

게임을 고치거나 그림을 넣으면 이것만 다시 돌리면 된다(본체는 다시 받지 않는다).
맥 앱은 서명이 없다 — 맥에서 처음 열 때 할 일은 zip 안의 "맥에서 처음 열기.txt".
버전은 docs/CHANGELOG.md 맨 위 "## v3.20 …" 에서 읽는다(안드로이드와 같은 함수).
"""
import hashlib, importlib.util, json, os, plistlib, shutil, stat, subprocess, sys, time, urllib.request, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
DESK = os.path.join(ROOT, "desktop")
CACHE = os.path.join(DESK, "cache")
OUT = os.path.join(DESK, "out")

ELECTRON = "45.2.3"
RCEDIT = "2.0.0"
APP_ID = "com.etherion.game"
NAME = "ETHERION"

FUSE_SENTINEL = b"dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX"
# Electron FuseV1Options 순서: 0 RunAsNode · 1 CookieEncryption · 2 NodeOptions 환경변수 · 3 --inspect 인자
#   · 4 asar 무결성 검사 · 5 app.asar 에서만 읽기 · 6 V8 스냅숏 · 7 file:// 추가 권한
FUSES_RELEASE = {0: b"0", 2: b"0", 3: b"0", 5: b"1"}


def android_module():
    p = os.path.join(ROOT, "tools", "android", "build_apk.py")
    spec = importlib.util.spec_from_file_location("etherion_build_apk", p)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


# ---------------------------------------------------------------- 받기
def fetch(url, dest):
    if os.path.exists(dest):
        return dest
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    print("  받는 중:", url)
    tmp = dest + ".part"
    req = urllib.request.Request(url, headers={"User-Agent": "etherion-build"})
    with urllib.request.urlopen(req, timeout=60) as r, open(tmp, "wb") as f:
        total = int(r.headers.get("Content-Length") or 0)
        got, shown = 0, -1
        while True:
            b = r.read(1 << 20)
            if not b:
                break
            f.write(b)
            got += len(b)
            if total:
                pc = got * 100 // total
                if pc // 10 != shown:
                    shown = pc // 10
                    print("    %3d%%  (%.0f / %.0f MB)" % (pc, got / 1e6, total / 1e6), flush=True)
    os.replace(tmp, dest)
    return dest


def electron_zip(plat):
    fn = "electron-v%s-%s.zip" % (ELECTRON, plat)
    base = "https://github.com/electron/electron/releases/download/v%s/" % ELECTRON
    z = fetch(base + fn, os.path.join(CACHE, fn))
    sums = fetch(base + "SHASUMS256.txt", os.path.join(CACHE, "electron-v%s-SHASUMS256.txt" % ELECTRON))
    want = None
    with open(sums, encoding="utf-8") as f:
        for line in f:
            parts = line.split()
            if len(parts) == 2 and parts[1].lstrip("*") == fn:
                want = parts[0]
    h = hashlib.sha256()
    with open(z, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    if want and h.hexdigest() != want:
        os.remove(z)
        sys.exit("  ! %s 가 깨졌습니다(SHA256 다름). 지웠으니 다시 돌려 주세요." % fn)
    return z


# ---------------------------------------------------------------- app.asar
def asar_bytes_iter(entries):
    """entries: [(경로 'css/a.css', 파일경로 또는 bytes)] → (머리 bytes, 내용 조각들을 차례로 내놓는 함수)"""
    tree = {"files": {}}
    order, offset = [], 0
    for rel, src in entries:
        data = src if isinstance(src, bytes) else None
        size = len(data) if data is not None else os.path.getsize(src)
        node = tree
        parts = rel.split("/")
        for d in parts[:-1]:
            node = node["files"].setdefault(d, {"files": {}})
        h, blocks, bs = hashlib.sha256(), [], 4 * 1024 * 1024
        buf = data if data is not None else open(src, "rb").read()
        for i in range(0, len(buf), bs):
            blocks.append(hashlib.sha256(buf[i:i + bs]).hexdigest())
        h.update(buf)
        node["files"][parts[-1]] = {"size": size, "offset": str(offset),
                                    "integrity": {"algorithm": "SHA256", "hash": h.hexdigest(), "blockSize": bs, "blocks": blocks}}
        order.append(src)
        offset += size
    js = json.dumps(tree, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    pad = (4 - len(js) % 4) % 4
    payload = len(js).to_bytes(4, "little") + js + b"\0" * pad          # 크로미움 Pickle: 길이 + 글 + 4바이트 맞춤
    header_pickle = len(payload).to_bytes(4, "little") + payload
    size_pickle = (4).to_bytes(4, "little") + len(header_pickle).to_bytes(4, "little")

    def chunks():
        for src in order:
            if isinstance(src, bytes):
                yield src
            else:
                with open(src, "rb") as f:
                    yield f.read()
    return size_pickle + header_pickle, chunks


def write_asar(path, entries):
    head, chunks = asar_bytes_iter(entries)
    total = len(head)
    with open(path, "wb") as f:
        f.write(head)
        for c in chunks():
            f.write(c)
            total += len(c)
    return total


def server_addr():
    """v3.37 앱이 붙을 서버: --server 주소 > --offline(없음) > tools/desktop/server.txt 첫 줄"""
    a = sys.argv[1:]
    if "--offline" in a:
        return ""
    if "--server" in a and a.index("--server") + 1 < len(a):
        return a[a.index("--server") + 1].rstrip("/")
    p = os.path.join(HERE, "server.txt")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if line and not line.startswith("#"):
                return line.rstrip("/")
    return ""


def app_entries(and_mod, vname, dev):
    ver3 = ".".join((vname.split(".") + ["0", "0"])[:3])
    pkg = {"name": "etherion", "productName": NAME, "version": ver3, "main": "main.js", "private": True,
           "description": "ETHERION", "etherionDev": bool(dev)}
    srv = server_addr()
    if srv:
        pkg["etherionServer"] = srv          # v3.37 앱이 켜지면 이 서버로 붙는다(desktop/main.js → js/net.js ?server=)
        print("  서버:", srv)
    ent = [("package.json", json.dumps(pkg, ensure_ascii=False, indent=1).encode("utf-8")),
           ("main.js", os.path.join(DESK, "main.js")),
           ("icon.png", os.path.join(DESK, "icon.png"))]
    ent += and_mod.web_files()
    return ent, ver3


# ---------------------------------------------------------------- fuse
def flip_fuses(data):
    i = data.find(FUSE_SENTINEL)
    if i < 0:
        print("  ! fuse 자리를 못 찾았습니다(Electron 버전이 바뀌었나?) — 그대로 둡니다")
        return data
    p = i + len(FUSE_SENTINEL)
    ver, n = data[p], data[p + 1]
    wire = bytearray(data[p + 2:p + 2 + n])
    for k, v in FUSES_RELEASE.items():
        if k < n and wire[k:k + 1] != b"r":
            wire[k:k + 1] = v
    return data[:p + 2] + bytes(wire) + data[p + 2 + n:]


def flip_fuses_file(path):
    with open(path, "rb") as f:
        d = f.read()
    d2 = flip_fuses(d)
    if d2 != d:
        with open(path, "wb") as f:
            f.write(d2)


# ---------------------------------------------------------------- 윈도우
def rcedit(exe, vname, ver3, dev):
    tool = os.path.join(CACHE, "rcedit-x64-%s.exe" % RCEDIT)
    fetch("https://github.com/electron/rcedit/releases/download/v%s/rcedit-x64.exe" % RCEDIT, tool)
    fv = ver3 + ".0"
    args = [exe, "--set-icon", os.path.join(DESK, "icon.ico"),
            "--set-file-version", fv, "--set-product-version", fv,
            "--set-version-string", "ProductName", NAME,
            "--set-version-string", "FileDescription", NAME + (" (개발용)" if dev else ""),
            "--set-version-string", "InternalName", NAME,
            "--set-version-string", "OriginalFilename", NAME + ".exe",
            "--set-version-string", "CompanyName", NAME,
            "--set-version-string", "LegalCopyright", ""]
    if os.name == "nt":
        cmd = [tool] + args
    elif shutil.which("wine"):
        cmd = ["wine", tool] + args
    else:
        print("  · 윈도우가 아니라 exe 아이콘 · 이름은 넣지 못했습니다(윈도우에서 다시 만들면 들어갑니다)")
        return
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("  ! rcedit 실패 — 아이콘 없이 갑니다:", (r.stderr or r.stdout).strip()[:300])


def clean_dir(d):
    if os.path.exists(d):
        try:
            shutil.rmtree(d)
        except PermissionError:
            sys.exit("  ! %s 를 지우지 못했습니다. ETHERION 이 켜져 있으면 끄고 다시 해 주세요." % os.path.relpath(d, ROOT))


def build_folder(plat, entries, vname, ver3, dev, exe_old, exe_new):
    z = electron_zip(plat)
    tag = "win" if plat.startswith("win32") else "linux"
    out = os.path.join(OUT, "%s-v%s-%s%s" % (NAME, vname, tag, "-dev" if dev else ""))
    clean_dir(out)
    print("  Electron %s 푸는 중…" % ELECTRON)
    with zipfile.ZipFile(z) as zf:
        for info in zf.infolist():
            name = info.filename
            if name.endswith("resources/default_app.asar"):
                continue                      # Electron 기본 화면 — 대신 app.asar
            dest = os.path.join(out, exe_new if name == exe_old else name)
            if info.is_dir():
                os.makedirs(dest, exist_ok=True)
                continue
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            if name == exe_old and not dev:   # 출시용: fuse 를 바꿔 적는다
                with open(dest, "wb") as w:
                    w.write(flip_fuses(zf.read(info)))
            else:
                with zf.open(info) as r, open(dest, "wb") as w:
                    shutil.copyfileobj(r, w, 1 << 20)
            mode = info.external_attr >> 16
            if mode and tag == "linux":      # 리눅스: 실행 권한 살리기
                os.chmod(dest, (mode & 0o7777) | 0o200)
    res = os.path.join(out, "resources")
    os.makedirs(res, exist_ok=True)
    n = write_asar(os.path.join(res, "app.asar"), entries)
    print("  app.asar %.1f MB (파일 %d개)" % (n / 1e6, len(entries)))
    exe = os.path.join(out, exe_new)
    if tag == "win":
        rcedit(exe, vname, ver3, dev)
        if not dev:
            flip_fuses_file(exe)          # rcedit 뒤에도 fuse 가 그대로인지 (바뀌었으면 다시 적음)
    return out, exe


# ---------------------------------------------------------------- 맥 (.app 을 zip 으로 — 풀 때 심볼릭 링크가 살아야 해서 폴더로 풀지 않는다)
MAC_NOTE = """ETHERION 맥 앱 — 처음 열 때

이 앱은 애플 개발자 서명이 없어서 맥이 그냥은 열어 주지 않습니다("손상되었기 때문에 열 수 없습니다").
zip 을 풀고 ETHERION.app 을 '응용 프로그램' 폴더(또는 아무 곳)에 둔 뒤, 터미널에서 한 번만:

    xattr -cr /Applications/ETHERION.app
    codesign --force --deep --sign - /Applications/ETHERION.app

(앱을 다른 곳에 두었으면 경로를 바꿔 적는다. 터미널 창에 ETHERION.app 을 끌어다 놓으면 경로가 적힌다.)
그다음부터는 더블클릭으로 열린다. 남에게 깔끔하게 나눠 주려면 애플 개발자 계정으로 서명 · 공증해야 한다.

저장 위치: ~/Library/Application Support/ETHERION
"""


def build_mac(arch, entries, vname, ver3, dev):
    plat = "darwin-" + arch
    z = electron_zip(plat)
    os.makedirs(OUT, exist_ok=True)
    out = os.path.join(OUT, "%s-v%s-mac-%s%s.zip" % (NAME, vname, arch, "-dev" if dev else ""))
    asar_tmp = out + ".asar.tmp"
    n = write_asar(asar_tmp, entries)
    print("  app.asar %.1f MB (파일 %d개)" % (n / 1e6, len(entries)))
    FW = "Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Electron Framework"
    with zipfile.ZipFile(z) as src, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as dst:
        for info in src.infolist():
            name = info.filename
            if not name.startswith("Electron.app/"):
                continue          # LICENSE · version 등은 앱 안에도 있다
            if name.endswith("Contents/Resources/default_app.asar"):
                continue
            data = src.read(info)
            if name == "Electron.app/Contents/Info.plist":
                pl = plistlib.loads(data)
                pl.update({"CFBundleName": NAME, "CFBundleDisplayName": NAME, "CFBundleIdentifier": APP_ID,
                           "CFBundleShortVersionString": ver3, "CFBundleVersion": ver3,
                           "LSApplicationCategoryType": "public.app-category.card-games",
                           "NSHumanReadableCopyright": ""})
                data = plistlib.dumps(pl)
            elif name.endswith("Contents/Resources/electron.icns"):
                with open(os.path.join(DESK, "icon.icns"), "rb") as f:
                    data = f.read()
            elif name == FW and not dev:
                data = flip_fuses(data)
            ni = zipfile.ZipInfo(NAME + ".app/" + name[len("Electron.app/"):], info.date_time)
            ni.external_attr = info.external_attr
            ni.create_system = 3
            is_link = stat.S_ISLNK(info.external_attr >> 16)
            ni.compress_type = zipfile.ZIP_STORED if is_link else zipfile.ZIP_DEFLATED
            dst.writestr(ni, data)
        ai = zipfile.ZipInfo(NAME + ".app/Contents/Resources/app.asar", time.localtime()[:6])
        ai.external_attr = (stat.S_IFREG | 0o644) << 16
        ai.create_system = 3
        ai.compress_type = zipfile.ZIP_DEFLATED
        with open(asar_tmp, "rb") as f:
            dst.writestr(ai, f.read())
        ni = zipfile.ZipInfo("맥에서 처음 열기.txt", time.localtime()[:6])
        ni.external_attr = (stat.S_IFREG | 0o644) << 16
        dst.writestr(ni, MAC_NOTE.encode("utf-8"))
    os.remove(asar_tmp)
    return out


# ---------------------------------------------------------------- main
def main():
    args = set(sys.argv[1:])
    dev = "--dev" in args
    and_mod = android_module()
    vname, _ = and_mod.game_version()
    entries, ver3 = app_entries(and_mod, vname, dev)
    targets = [t for t in ("--mac", "--mac-intel", "--linux") if t in args] or ["--win"]
    if "--win" in args and "--win" not in targets:
        targets.insert(0, "--win")
    print("ETHERION v%s PC 앱을 만듭니다 (%s, Electron %s)" % (vname, "개발용" if dev else "출시용", ELECTRON))
    t0 = time.time()
    done = []
    for t in targets:
        if t == "--win":
            out, exe = build_folder("win32-x64", entries, vname, ver3, dev, "electron.exe", NAME + ".exe")
            done.append(os.path.relpath(exe, ROOT))
            if "--zip" in args:
                print("  zip 으로 묶는 중…")
                done.append(os.path.relpath(shutil.make_archive(out, "zip", OUT, os.path.basename(out)), ROOT))
        elif t == "--linux":
            out, exe = build_folder("linux-x64", entries, vname, ver3, dev, "electron", NAME.lower())
            done.append(os.path.relpath(exe, ROOT))
        else:
            done.append(os.path.relpath(build_mac("arm64" if t == "--mac" else "x64", entries, vname, ver3, dev), ROOT))
    print("  완성 (%.0f초):" % (time.time() - t0))
    for d in done:
        print("   ", d)


if __name__ == "__main__":
    main()
