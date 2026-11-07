#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ETHERION 안드로이드 앱(APK) 만들기 — 안드로이드 SDK · Android Studio 없이, 파이썬 표준 라이브러리만으로.

    python tools/android/build_apk.py            → android/apk/ETHERION-v<버전>.apk

게임(index.html · css · js · img · audio · fonts)을 그대로 앱 안(assets/)에 넣고, 화면 전체를 덮는
WebView 하나로 연다. 앱 코드는 android/app/src/main/java/.../MainActivity.java 와 같은 일을 한다
(아래 build_dex 가 그 자바 코드를 달빅 바이트코드로 직접 적은 것). 둘을 고칠 때는 함께 고친다.

- 버전: docs/CHANGELOG.md 맨 위의 "## v3.14 …" 에서 읽는다. versionCode = 3·10000 + 14·100 + 0.
- 서명 열쇠: android/signing/etherion-key.json (처음 한 번 만든다). **잃어버리면 같은 앱으로 업데이트할 수 없다**
  (지우고 새로 깔아야 하고, 그러면 앱 안의 저장 — 계정 · 컬렉션 — 이 사라진다). 따로 백업해 둘 것.
- 배경음은 .ogg 만 넣는다(안드로이드 WebView는 ogg를 늘 튼다, js/bgm.js 가 ogg를 고름). .mp3 는 빼서 크기를 줄인다.
- 서명: APK Signature Scheme v2 (안드로이드 7.0 이상, minSdk 24).
"""
import hashlib, json, os, random, re, struct, sys, time, zlib, base64

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
ANDROID = os.path.join(ROOT, "android")
PKG = "com.etherion.game"
APP_LABEL = "ETHERION"
MIN_SDK, TARGET_SDK = 24, 34

# ---------------------------------------------------------------- 게임 파일
WEB_DIRS = ["css", "js", "img", "audio", "fonts"]
SKIP_EXT = {".mp3", ".md", ".txt", ".wav", ".psd", ".bak"}
SKIP_DIRS = {os.path.join("img", "ui", "src")}          # 그림을 만드는 스크립트 (게임에서 안 씀)
STORE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".ogg", ".mp3", ".ttf", ".woff2", ".gif"}   # 이미 압축된 것


def web_files():
    out = [("index.html", os.path.join(ROOT, "index.html"))]
    for d in WEB_DIRS:
        base = os.path.join(ROOT, d)
        for dp, dns, fns in os.walk(base):
            rel_dir = os.path.relpath(dp, ROOT)
            dns[:] = sorted(x for x in dns if os.path.join(rel_dir, x) not in SKIP_DIRS and not x.startswith("."))
            for fn in sorted(fns):
                if fn.startswith(".") or os.path.splitext(fn)[1].lower() in SKIP_EXT:
                    continue
                full = os.path.join(dp, fn)
                out.append((os.path.relpath(full, ROOT).replace(os.sep, "/"), full))
    return out


def game_version():
    p = os.path.join(ROOT, "docs", "CHANGELOG.md")
    with open(p, encoding="utf-8") as f:
        for line in f:
            m = re.match(r"##\s*v(\d+)\.(\d+)(?:\.(\d+))?", line)
            if m:
                a, b, c = int(m.group(1)), int(m.group(2)), int(m.group(3) or 0)
                return "%d.%d%s" % (a, b, (".%d" % c) if m.group(3) else ""), a * 10000 + b * 100 + c
    return "0.0", 1


# ---------------------------------------------------------------- DEX (달빅 바이트코드)
def uleb(n):
    out = bytearray()
    while True:
        b = n & 0x7F
        n >>= 7
        if n:
            out.append(b | 0x80)
        else:
            out.append(b)
            return bytes(out)


def shorty_of(d):
    return d if d in "VZBSCIJFD" else "L"


class DexBuilder:
    """클래스 하나짜리 DEX를 만든다. 참조는 (종류, 값) 꼴로 적고 마지막에 번호를 매긴다."""

    def __init__(self):
        self.strings, self.types, self.protos, self.fields, self.methods = set(), set(), set(), set(), set()

    def T(self, d):
        self.types.add(d); self.strings.add(d); return d

    def S(self, s):
        self.strings.add(s); return ("s", s)

    def P(self, ret, params):
        shorty = shorty_of(ret) + "".join(shorty_of(p) for p in params)
        self.strings.add(shorty); self.T(ret)
        for p in params:
            self.T(p)
        key = (shorty, ret, tuple(params)); self.protos.add(key); return key

    def F(self, cls, name, typ):
        self.T(cls); self.T(typ); self.strings.add(name)
        key = (cls, name, typ); self.fields.add(key); return ("f", key)

    def M(self, cls, name, ret, params=()):
        self.T(cls); self.strings.add(name)
        proto = self.P(ret, params)
        key = (cls, name, proto); self.methods.add(key); return ("m", key)

    # --- 코드: 명령 목록을 16비트 단위 배열로
    SIZES = {"return-void": 1, "const/4": 1, "move-result-object": 1, "move-result-wide": 1,
             "const/16": 2, "const/high16": 2, "const-wide/16": 2, "const-string": 2, "new-instance": 2,
             "iget-object": 2, "iput-object": 2, "iget-wide": 2, "iput-wide": 2, "if-eqz": 2, "if-nez": 2,
             "if-gez": 2, "cmp-long": 2, "sub-long": 2,
             "invoke-virtual": 3, "invoke-super": 3, "invoke-direct": 3, "invoke-static": 3}
    OPS = {"return-void": 0x0E, "const/4": 0x12, "const/16": 0x13, "const/high16": 0x15, "const-wide/16": 0x16,
           "const-string": 0x1A, "new-instance": 0x22, "move-result-wide": 0x0B, "move-result-object": 0x0C,
           "iget-wide": 0x53, "iget-object": 0x54, "iput-wide": 0x5A, "iput-object": 0x5B,
           "if-eqz": 0x38, "if-nez": 0x39, "if-gez": 0x3B, "cmp-long": 0x31, "sub-long": 0x9C,
           "invoke-virtual": 0x6E, "invoke-super": 0x6F, "invoke-direct": 0x70, "invoke-static": 0x71}

    def assemble(self, code, idx):
        addr, labels = 0, {}
        for ins in code:
            if ins[0] == "label":
                labels[ins[1]] = addr
            else:
                addr += self.SIZES[ins[0]]
        units, addr = [], 0
        for ins in code:
            op = ins[0]
            if op == "label":
                continue
            o = self.OPS[op]
            if op == "return-void":
                u = [o]
            elif op == "const/4":
                a, v = ins[1], ins[2]; assert 0 <= a < 16 and -8 <= v < 8
                u = [o | (a << 8) | ((v & 0xF) << 12)]
            elif op in ("move-result-object", "move-result-wide"):
                u = [o | (ins[1] << 8)]
            elif op in ("const/16", "const-wide/16"):
                assert -32768 <= ins[2] < 32768
                u = [o | (ins[1] << 8), ins[2] & 0xFFFF]
            elif op == "const/high16":
                assert ins[2] & 0xFFFF == 0
                u = [o | (ins[1] << 8), (ins[2] >> 16) & 0xFFFF]
            elif op == "const-string":
                u = [o | (ins[1] << 8), idx(ins[2])]
            elif op == "new-instance":
                u = [o | (ins[1] << 8), idx(("t", ins[2]))]
            elif op in ("iget-object", "iput-object", "iget-wide", "iput-wide"):
                a, b = ins[1], ins[2]; assert a < 16 and b < 16
                u = [o | (a << 8) | (b << 12), idx(ins[3])]
            elif op in ("if-eqz", "if-nez", "if-gez"):
                off = labels[ins[2]] - addr
                u = [o | (ins[1] << 8), off & 0xFFFF]
            elif op in ("cmp-long", "sub-long"):
                u = [o | (ins[1] << 8), ins[2] | (ins[3] << 8)]
            elif op.startswith("invoke-"):
                regs, ref = ins[1], ins[2]; assert len(regs) <= 4 and all(r < 16 for r in regs)
                r = list(regs) + [0] * (4 - len(regs))
                u = [o | (len(regs) << 12), idx(ref), r[0] | (r[1] << 4) | (r[2] << 8) | (r[3] << 12)]
            else:
                raise ValueError(op)
            assert len(u) == self.SIZES[op], op
            units += u; addr += len(u)
        return units

    def build(self, cls, sup, access, ifields, methods):
        """methods: (ref, access, registers, ins, outs, code)"""
        self.T(cls); self.T(sup)
        strings = sorted(self.strings)                           # 기본 다국어 평면 글자만 → 파이썬 정렬 = UTF-16 순서
        sid = {s: i for i, s in enumerate(strings)}
        types = sorted(self.types, key=lambda d: sid[d])
        tid = {t: i for i, t in enumerate(types)}
        protos = sorted(self.protos, key=lambda p: (tid[p[1]], [tid[x] for x in p[2]]))
        pid = {p: i for i, p in enumerate(protos)}
        fields = sorted(self.fields, key=lambda f: (tid[f[0]], sid[f[1]], tid[f[2]]))
        fid = {f: i for i, f in enumerate(fields)}
        meths = sorted(self.methods, key=lambda m: (tid[m[0]], sid[m[1]], pid[m[2]]))
        mid = {m: i for i, m in enumerate(meths)}

        def idx(ref):
            k, v = ref
            return {"s": sid, "t": tid, "f": fid, "m": mid}[k][v]

        HDR = 0x70
        off = HDR
        string_ids_off = off; off += 4 * len(strings)
        type_ids_off = off; off += 4 * len(types)
        proto_ids_off = off; off += 12 * len(protos)
        field_ids_off = off; off += 8 * len(fields)
        method_ids_off = off; off += 8 * len(meths)
        class_defs_off = off; off += 32
        data_off = off

        data = bytearray()

        def align4():
            while (data_off + len(data)) % 4:
                data.append(0)

        # code_item
        code_offs = {}
        for ref, acc, regs, ins, outs, code in methods:
            align4()
            code_offs[ref] = data_off + len(data)
            units = self.assemble(code, idx)
            data += struct.pack("<HHHHII", regs, ins, outs, 0, 0, len(units))
            data += b"".join(struct.pack("<H", x) for x in units)
        code_n, code_first = len(methods), min(code_offs.values())
        # type_list
        align4()
        tl_first = data_off + len(data)
        tl_off = {}
        lists = sorted({p[2] for p in protos if p[2]}, key=lambda l: [tid[x] for x in l])
        for l in lists:
            align4()
            tl_off[l] = data_off + len(data)
            data += struct.pack("<I", len(l)) + b"".join(struct.pack("<H", tid[x]) for x in l)
        # string_data
        align4()
        sd_first = data_off + len(data)
        sd_off = []
        for s in strings:
            sd_off.append(data_off + len(data))
            data += uleb(len(s)) + s.encode("utf-8") + b"\0"     # NUL 없는 BMP 글자 → MUTF-8 = UTF-8
        # class_data
        cd_first = data_off + len(data)
        direct = sorted([m for m in methods if m[1] & 0x10000 or m[1] & 0x8 or m[1] & 0x2], key=lambda m: mid[m[0][1]])
        virtual = sorted([m for m in methods if m not in direct], key=lambda m: mid[m[0][1]])
        flist = sorted(ifields, key=lambda f: fid[f[0][1]])
        cdat = uleb(0) + uleb(len(flist)) + uleb(len(direct)) + uleb(len(virtual))
        prev = 0
        for (ref, acc) in flist:
            i = fid[ref[1]]; cdat += uleb(i - prev) + uleb(acc); prev = i
        for group in (direct, virtual):
            prev = 0
            for m in group:
                i = mid[m[0][1]]; cdat += uleb(i - prev) + uleb(m[1]) + uleb(code_offs[m[0]]); prev = i
        data += cdat
        # map_list
        align4()
        map_off = data_off + len(data)
        entries = [(0x0000, 1, 0), (0x0001, len(strings), string_ids_off), (0x0002, len(types), type_ids_off),
                   (0x0003, len(protos), proto_ids_off), (0x0004, len(fields), field_ids_off),
                   (0x0005, len(meths), method_ids_off), (0x0006, 1, class_defs_off),
                   (0x2001, code_n, code_first)]
        if lists:
            entries.append((0x1001, len(lists), tl_first))
        entries += [(0x2002, len(strings), sd_first), (0x2000, 1, cd_first), (0x1000, 1, map_off)]
        entries = [e for e in entries if e[1]]
        entries.sort(key=lambda e: e[2])
        data += struct.pack("<I", len(entries)) + b"".join(struct.pack("<HHII", t, 0, n, o) for t, n, o in entries)

        ids = bytearray()
        ids += b"".join(struct.pack("<I", o) for o in sd_off)
        ids += b"".join(struct.pack("<I", sid[t]) for t in types)
        for p in protos:
            ids += struct.pack("<III", sid[p[0]], tid[p[1]], tl_off[p[2]] if p[2] else 0)
        for f in fields:
            ids += struct.pack("<HHI", tid[f[0]], tid[f[2]], sid[f[1]])
        for m in meths:
            ids += struct.pack("<HHI", tid[m[0]], pid[m[2]], sid[m[1]])
        ids += struct.pack("<IIIIIIII", tid[cls], access, tid[sup], 0, 0xFFFFFFFF, 0, cd_first, 0)
        assert HDR + len(ids) == data_off

        size = data_off + len(data)
        hdr = bytearray(b"dex\n035\0") + bytes(24)
        hdr += struct.pack("<IIIIII", size, HDR, 0x12345678, 0, 0, map_off)
        hdr += struct.pack("<II", len(strings), string_ids_off)
        hdr += struct.pack("<II", len(types), type_ids_off)
        hdr += struct.pack("<II", len(protos), proto_ids_off)
        hdr += struct.pack("<II", len(fields), field_ids_off)
        hdr += struct.pack("<II", len(meths), method_ids_off)
        hdr += struct.pack("<II", 1, class_defs_off)
        hdr += struct.pack("<II", size - data_off, data_off)
        assert len(hdr) == HDR
        dex = hdr + ids + data
        dex[12:32] = hashlib.sha1(bytes(dex[32:])).digest()
        dex[8:12] = struct.pack("<I", zlib.adler32(bytes(dex[12:])) & 0xFFFFFFFF)
        return bytes(dex)


def build_dex():
    """android/app/src/main/java/com/etherion/game/MainActivity.java 와 같은 일."""
    d = DexBuilder()
    ME = "Lcom/etherion/game/MainActivity;"
    ACT, BUNDLE, WIN = "Landroid/app/Activity;", "Landroid/os/Bundle;", "Landroid/view/Window;"
    WV, WS, WCC = "Landroid/webkit/WebView;", "Landroid/webkit/WebSettings;", "Landroid/webkit/WebChromeClient;"
    CTX, VIEW, STR, CS = "Landroid/content/Context;", "Landroid/view/View;", "Ljava/lang/String;", "Ljava/lang/CharSequence;"
    TOAST, SYS = "Landroid/widget/Toast;", "Ljava/lang/System;"
    UI = 0x1706   # HIDE_NAVIGATION | FULLSCREEN | LAYOUT_STABLE | LAYOUT_HIDE_NAVIGATION | LAYOUT_FULLSCREEN | IMMERSIVE_STICKY

    f_w = d.F(ME, "web", WV)
    f_back = d.F(ME, "lastBack", "J")
    m_init = d.M(ME, "<init>", "V")
    m_onCreate = d.M(ME, "onCreate", "V", [BUNDLE])
    m_focus = d.M(ME, "onWindowFocusChanged", "V", ["Z"])
    m_pause = d.M(ME, "onPause", "V")
    m_resume = d.M(ME, "onResume", "V")
    m_back = d.M(ME, "onBackPressed", "V")

    s_init = d.M(ACT, "<init>", "V")
    s_onCreate = d.M(ACT, "onCreate", "V", [BUNDLE])
    s_focus = d.M(ACT, "onWindowFocusChanged", "V", ["Z"])
    s_pause = d.M(ACT, "onPause", "V")
    s_resume = d.M(ACT, "onResume", "V")
    s_back = d.M(ACT, "onBackPressed", "V")
    getWindow = d.M(ACT, "getWindow", WIN)
    setContentView = d.M(ACT, "setContentView", "V", [VIEW])
    addFlags = d.M(WIN, "addFlags", "V", ["I"])
    wv_init = d.M(WV, "<init>", "V", [CTX])
    getSettings = d.M(WV, "getSettings", WS)
    setWCC = d.M(WV, "setWebChromeClient", "V", [WCC])
    setBg = d.M(WV, "setBackgroundColor", "V", ["I"])
    setSUV = d.M(WV, "setSystemUiVisibility", "V", ["I"])
    loadUrl = d.M(WV, "loadUrl", "V", [STR])
    wv_pause = d.M(WV, "onPause", "V")
    wv_resume = d.M(WV, "onResume", "V")
    wcc_init = d.M(WCC, "<init>", "V")
    js = d.M(WS, "setJavaScriptEnabled", "V", ["Z"])
    dom = d.M(WS, "setDomStorageEnabled", "V", ["Z"])
    files = d.M(WS, "setAllowFileAccess", "V", ["Z"])
    wide = d.M(WS, "setUseWideViewPort", "V", ["Z"])
    overview = d.M(WS, "setLoadWithOverviewMode", "V", ["Z"])
    gesture = d.M(WS, "setMediaPlaybackRequiresUserGesture", "V", ["Z"])
    zoom = d.M(WS, "setSupportZoom", "V", ["Z"])
    textZoom = d.M(WS, "setTextZoom", "V", ["I"])
    now = d.M(SYS, "currentTimeMillis", "J")
    makeText = d.M(TOAST, "makeText", TOAST, [CTX, CS, "I"])
    show = d.M(TOAST, "show", "V")
    url = d.S("file:///android_asset/index.html")
    msg = d.S("뒤로 단추를 한 번 더 누르면 게임을 닫습니다")
    d.T(CS)

    init = [("invoke-direct", [0], s_init), ("return-void",)]
    # onCreate: v0 v1 v2, this = v3, bundle = v4
    on_create = [
        ("invoke-super", [3, 4], s_onCreate),
        ("invoke-virtual", [3], getWindow), ("move-result-object", 0),
        ("const/16", 1, 0x480),                                  # KEEP_SCREEN_ON | FULLSCREEN
        ("invoke-virtual", [0, 1], addFlags),
        ("new-instance", 0, WV), ("invoke-direct", [0, 3], wv_init),
        ("iput-object", 0, 3, f_w),
        ("invoke-virtual", [0], getSettings), ("move-result-object", 1),
        ("const/4", 2, 1),
        ("invoke-virtual", [1, 2], js), ("invoke-virtual", [1, 2], dom), ("invoke-virtual", [1, 2], files),
        ("invoke-virtual", [1, 2], wide), ("invoke-virtual", [1, 2], overview),
        ("const/4", 2, 0),
        ("invoke-virtual", [1, 2], gesture), ("invoke-virtual", [1, 2], zoom),
        ("const/16", 2, 100), ("invoke-virtual", [1, 2], textZoom),  # 기기 글자 크기 설정이 화면을 깨지 않게
        ("new-instance", 1, WCC), ("invoke-direct", [1], wcc_init), ("invoke-virtual", [0, 1], setWCC),
        ("const/high16", 1, 0xFF000000), ("invoke-virtual", [0, 1], setBg),
        ("invoke-virtual", [3, 0], setContentView),
        ("const/16", 1, UI), ("invoke-virtual", [0, 1], setSUV),
        ("const-string", 1, url), ("invoke-virtual", [0, 1], loadUrl),
        ("return-void",)]
    # onWindowFocusChanged: v0 v1, this = v2, hasFocus = v3
    on_focus = [
        ("invoke-super", [2, 3], s_focus),
        ("if-eqz", 3, "end"),
        ("iget-object", 0, 2, f_w), ("if-eqz", 0, "end"),
        ("const/16", 1, UI), ("invoke-virtual", [0, 1], setSUV),
        ("label", "end"), ("return-void",)]

    def life(sup, wvm):   # v0, this = v1
        return [("invoke-super", [1], sup), ("iget-object", 0, 1, f_w), ("if-eqz", 0, "end"),
                ("invoke-virtual", [0], wvm), ("label", "end"), ("return-void",)]
    # onBackPressed: v0..v5, this = v6 — 2초 안에 두 번 누르면 닫는다
    on_back = [
        ("invoke-static", [], now), ("move-result-wide", 0),
        ("iget-wide", 2, 6, f_back),
        ("sub-long", 2, 0, 2),
        ("const-wide/16", 4, 2000),
        ("cmp-long", 2, 2, 4),
        ("if-gez", 2, "arm"),
        ("invoke-super", [6], s_back), ("return-void",),
        ("label", "arm"),
        ("iput-wide", 0, 6, f_back),
        ("const-string", 2, msg), ("const/4", 3, 0),
        ("invoke-static", [6, 2, 3], makeText), ("move-result-object", 2),
        ("invoke-virtual", [2], show),
        ("return-void",)]
    PUB, PROT, PRIV, CTOR = 0x1, 0x4, 0x2, 0x10000
    return d.build(ME, ACT, PUB, [(f_w, PRIV), (f_back, PRIV)], [
        (m_init, PUB | CTOR, 1, 1, 1, init),
        (m_onCreate, PROT, 5, 2, 2, on_create),
        (m_focus, PUB, 4, 2, 2, on_focus),
        (m_pause, PROT, 2, 1, 1, life(s_pause, wv_pause)),
        (m_resume, PROT, 2, 1, 1, life(s_resume, wv_resume)),
        (m_back, PUB, 7, 1, 3, on_back)])


# ---------------------------------------------------------------- 바이너리 XML · 리소스 표
def string_pool(strings):
    offs, body = [], bytearray()
    for s in strings:
        b = s.encode("utf-8")
        offs.append(len(body))
        for n in (len(s), len(b)):
            body += bytes([n]) if n < 0x80 else bytes([0x80 | (n >> 8), n & 0xFF])
        body += b + b"\0"
    while len(body) % 4:
        body.append(0)
    start = 28 + 4 * len(strings)
    return struct.pack("<HHIIIIII", 0x0001, 28, start + len(body), len(strings), 0, 0x100, start, 0) + \
        b"".join(struct.pack("<I", o) for o in offs) + bytes(body)


ANDROID_NS = "http://schemas.android.com/apk/res/android"
ATTR = {"theme": 0x01010000, "label": 0x01010001, "icon": 0x01010002, "name": 0x01010003, "exported": 0x01010010,
        "launchMode": 0x0101001D, "screenOrientation": 0x0101001E, "configChanges": 0x0101001F,
        "minSdkVersion": 0x0101020C, "versionCode": 0x0101021B, "versionName": 0x0101021C,
        "targetSdkVersion": 0x01010270, "drawable": 0x01010199, "allowBackup": 0x01010280, "hardwareAccelerated": 0x010102D3}
T_REF, T_STR, T_DEC, T_HEX, T_BOOL = 0x01, 0x03, 0x10, 0x11, 0x12


def axml(root):
    """root = (태그, [(android 속성인가, 이름, 종류, 값)], [자식])"""
    attr_names, others = [], []

    def walk(e):
        others.append(e[0])
        for isand, n, t, v in e[1]:
            if isand:
                attr_names.append(n)
            else:
                others.append(n)
            if t == T_STR:
                others.append(v)
        for c in e[2]:
            walk(c)
    walk(root)
    mapped = sorted(set(attr_names), key=lambda n: ATTR[n])
    pool = list(mapped)
    for s in ["android", ANDROID_NS] + others:
        if s not in pool:
            pool.append(s)
    si = {s: i for i, s in enumerate(pool)}
    NONE = 0xFFFFFFFF
    out = bytearray()
    out += string_pool(pool)
    rmap = b"".join(struct.pack("<I", ATTR[n]) for n in mapped)
    out += struct.pack("<HHI", 0x0180, 8, 8 + len(rmap)) + rmap
    line = [1]
    out += struct.pack("<HHIIIII", 0x0100, 16, 24, 1, NONE, si["android"], si[ANDROID_NS])

    def elem(e):
        tag, attrs, kids = e
        attrs = sorted(attrs, key=lambda a: ATTR[a[1]] if a[0] else -1)
        body = bytearray()
        for isand, n, t, v in attrs:
            raw = si[v] if t == T_STR else NONE
            data = si[v] if t == T_STR else (0xFFFFFFFF if (t == T_BOOL and v) else (0 if t == T_BOOL else v))
            body += struct.pack("<IIIHBBI", si[ANDROID_NS] if isand else NONE, si[n], raw, 8, 0, t, data)
        ln = line[0]; line[0] += 1
        hdr = struct.pack("<HHIII", 0x0102, 16, 36 + len(body), ln, NONE) + \
            struct.pack("<IIHHHHHH", NONE, si[tag], 20, 20, len(attrs), 0, 0, 0)
        out.extend(hdr + body)
        for k in kids:
            elem(k)
        out.extend(struct.pack("<HHIIIII", 0x0103, 16, 24, line[0], NONE, NONE, si[tag]))
        line[0] += 1
    elem(root)
    out += struct.pack("<HHIIIII", 0x0101, 16, 24, line[0], NONE, si["android"], si[ANDROID_NS])
    return struct.pack("<HHI", 0x0003, 8, 8 + len(out)) + bytes(out)


def manifest(version_name, version_code):
    A = True
    activity = ("activity", [(A, "name", T_STR, PKG + ".MainActivity"), (A, "exported", T_BOOL, True),
                             (A, "screenOrientation", T_DEC, 6),           # sensorLandscape
                             (A, "configChanges", T_HEX, 0xFF0),           # 회전 · 화면 크기가 바뀌어도 판을 다시 열지 않는다
                             (A, "launchMode", T_DEC, 2),                  # singleTask
                             (A, "hardwareAccelerated", T_BOOL, True)],
                [("intent-filter", [], [("action", [(A, "name", T_STR, "android.intent.action.MAIN")], []),
                                        ("category", [(A, "name", T_STR, "android.intent.category.LAUNCHER")], [])])])
    app = ("application", [(A, "label", T_STR, APP_LABEL), (A, "icon", T_REF, 0x7F010000),
                           (A, "theme", T_REF, 0x01030007),                # @android:style/Theme.NoTitleBar.Fullscreen
                           (A, "allowBackup", T_BOOL, True), (A, "hardwareAccelerated", T_BOOL, True)], [activity])
    root = ("manifest", [(False, "package", T_STR, PKG), (A, "versionCode", T_DEC, version_code),
                         (A, "versionName", T_STR, version_name)],
            [("uses-sdk", [(A, "minSdkVersion", T_DEC, MIN_SDK), (A, "targetSdkVersion", T_DEC, TARGET_SDK)], []),
             ("uses-permission", [(A, "name", T_STR, "android.permission.INTERNET")], []),
             app])
    return axml(root)


DENS = [("mdpi", 160), ("hdpi", 240), ("xhdpi", 320), ("xxhdpi", 480), ("xxxhdpi", 640)]
ANYDPI = 0xFFFE
ICON_XML = "res/mipmap-anydpi-v26/ic_launcher.xml"
ICON_BG = "res/mipmap-xxxhdpi-v4/ic_launcher_background.png"
ICON_FG = "res/mipmap-xxxhdpi-v4/ic_launcher_foreground.png"


def adaptive_icon_xml():
    """안드로이드 8 이상의 모양 맞춤 아이콘: 밤하늘 바탕 + 에테리온 고리."""
    A = True
    return axml(("adaptive-icon", [], [("background", [(A, "drawable", T_REF, 0x7F010001)], []),
                                       ("foreground", [(A, "drawable", T_REF, 0x7F010002)], [])]))


def resources_arsc():
    """mipmap: ic_launcher (0x7f010000, 밀도 다섯 + anydpi-v26 xml) · ic_launcher_background · ic_launcher_foreground."""
    paths = ["res/mipmap-%s-v4/ic_launcher.png" % n for n, _ in DENS]
    gstrs = paths + [ICON_XML, ICON_BG, ICON_FG]
    gpool = string_pool(gstrs)
    tpool = string_pool(["mipmap"])
    kpool = string_pool(["ic_launcher", "ic_launcher_background", "ic_launcher_foreground"])
    spec = struct.pack("<HHIBBHI", 0x0202, 16, 16 + 12, 1, 0, 0, 3) + struct.pack("<III", 0x0500, 0x0100, 0x0100)
    configs = [(dpi, 4, {0: gstrs.index(pth)}) for (_, dpi), pth in zip(DENS, paths)]
    configs[-1][2].update({1: gstrs.index(ICON_BG), 2: gstrs.index(ICON_FG)})
    configs.append((ANYDPI, 26, {0: gstrs.index(ICON_XML)}))
    types = b""
    for dpi, sdk, ents in configs:
        cfg = bytearray(64); struct.pack_into("<I", cfg, 0, 64)
        struct.pack_into("<H", cfg, 14, dpi); struct.pack_into("<H", cfg, 24, sdk)
        hs = 20 + 64
        offs, body = [], b""
        for k in range(3):
            if k in ents:
                offs.append(len(body))
                body += struct.pack("<HHI", 8, 0, k) + struct.pack("<HBBI", 8, 0, T_STR, ents[k])
            else:
                offs.append(0xFFFFFFFF)
        body = b"".join(struct.pack("<I", o) for o in offs) + body
        types += struct.pack("<HHIBBHII", 0x0201, hs, hs + len(body), 1, 0, 0, 3, hs + 12) + bytes(cfg) + body
    name = PKG.encode("utf-16-le").ljust(256, b"\0")
    ph = 288
    pkg_body = tpool + kpool + spec + types
    pkg = struct.pack("<HHII", 0x0200, ph, ph + len(pkg_body), 0x7F) + name + \
        struct.pack("<IIIII", ph, 1, ph + len(tpool), 3, 0) + pkg_body
    body = gpool + pkg
    return struct.pack("<HHII", 0x0002, 12, 12 + len(body), 1) + body, paths


# ---------------------------------------------------------------- RSA · 인증서 · 서명
def _is_prime(n, rnd):
    if n < 2:
        return False
    for p in (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97):
        if n % p == 0:
            return n == p
    d, s = n - 1, 0
    while d % 2 == 0:
        d //= 2; s += 1
    for _ in range(40):
        x = pow(rnd.randrange(2, n - 1), d, n)
        if x in (1, n - 1):
            continue
        for _ in range(s - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True


def _prime(bits, rnd):
    while True:
        p = rnd.getrandbits(bits) | (3 << (bits - 2)) | 1
        if _is_prime(p, rnd):
            return p


def der_len(n):
    if n < 0x80:
        return bytes([n])
    b = n.to_bytes((n.bit_length() + 7) // 8, "big")
    return bytes([0x80 | len(b)]) + b


def tlv(tag, c):
    return bytes([tag]) + der_len(len(c)) + c


def INT(x):
    return tlv(0x02, x.to_bytes(x.bit_length() // 8 + 1, "big"))


def SEQ(*xs):
    return tlv(0x30, b"".join(xs))


def OID(s):
    p = [int(x) for x in s.split(".")]
    out = bytearray([40 * p[0] + p[1]])
    for v in p[2:]:
        enc = [v & 0x7F]; v >>= 7
        while v:
            enc.append(0x80 | (v & 0x7F)); v >>= 7
        out += bytes(reversed(enc))
    return tlv(0x06, bytes(out))


NULL = b"\x05\x00"
RSA_ENC = SEQ(OID("1.2.840.113549.1.1.1"), NULL)
SHA256_RSA = SEQ(OID("1.2.840.113549.1.1.11"), NULL)
SHA256_PREFIX = bytes.fromhex("3031300d060960864801650304020105000420")


def rsa_sign(key, msg):
    n, d = key["n"], key["d"]
    k = (n.bit_length() + 7) // 8
    t = SHA256_PREFIX + hashlib.sha256(msg).digest()
    em = b"\x00\x01" + b"\xff" * (k - len(t) - 3) + b"\x00" + t
    return pow(int.from_bytes(em, "big"), d, n).to_bytes(k, "big")


def spki(key):
    return SEQ(RSA_ENC, tlv(0x03, b"\0" + SEQ(INT(key["n"]), INT(key["e"]))))


def make_key():
    rnd = random.SystemRandom()
    e = 65537
    while True:
        p, q = _prime(1024, rnd), _prime(1024, rnd)
        phi = (p - 1) * (q - 1)
        if p != q and phi % e:
            break
    key = {"n": p * q, "e": e, "d": pow(e, -1, phi)}
    name = SEQ(tlv(0x31, SEQ(OID("2.5.4.3"), tlv(0x0C, b"ETHERION"))),
               tlv(0x31, SEQ(OID("2.5.4.10"), tlv(0x0C, b"ETHERION"))))
    validity = SEQ(tlv(0x17, time.strftime("%y%m%d000000Z", time.gmtime()).encode()), tlv(0x18, b"20760101000000Z"))
    tbs = SEQ(tlv(0xA0, INT(2)), INT(rnd.getrandbits(63) | 1), SHA256_RSA, name, validity, name, spki(key))
    cert = SEQ(tbs, SHA256_RSA, tlv(0x03, b"\0" + rsa_sign(key, tbs)))
    key["cert"] = cert
    return key


def load_key():
    p = os.path.join(ANDROID, "signing", "etherion-key.json")
    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            j = json.load(f)
        return {"n": int(j["n"], 16), "e": int(j["e"], 16), "d": int(j["d"], 16), "cert": base64.b64decode(j["cert"])}
    print("서명 열쇠가 없어 새로 만듭니다 (몇 초 걸림) →", os.path.relpath(p, ROOT))
    k = make_key()
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        json.dump({"note": "ETHERION 앱 서명 열쇠. 잃어버리면 같은 앱으로 업데이트할 수 없다. 남에게 주지 말 것.",
                   "n": "%x" % k["n"], "e": "%x" % k["e"], "d": "%x" % k["d"],
                   "cert": base64.b64encode(k["cert"]).decode()}, f, indent=1)
    return k


# ---------------------------------------------------------------- ZIP · APK 서명 v2
def zip_bytes(entries):
    """entries: (이름, 바이트, 압축 안 함?) → 압축 안 한 항목은 데이터가 4바이트 자리에 오게(zipalign)."""
    out, cd = bytearray(), bytearray()
    dos_time, dos_date = 0, (2026 - 1980) << 9 | 11 << 5 | 7
    for name, data, store in entries:
        nb = name.encode("utf-8")
        flag = 0x0800 if any(c > 127 for c in nb) else 0
        crc = zlib.crc32(data) & 0xFFFFFFFF
        if store:
            comp, method = data, 0
            pad = (-(len(out) + 30 + len(nb) + 6)) % 4
            extra = struct.pack("<HHH", 0xD935, 2 + pad, 4) + b"\0" * pad
        else:
            c = zlib.compressobj(9, zlib.DEFLATED, -15)
            comp, method, extra = c.compress(data) + c.flush(), 8, b""
        off = len(out)
        out += struct.pack("<IHHHHHIIIHH", 0x04034B50, 20, flag, method, dos_time, dos_date, crc, len(comp), len(data),
                           len(nb), len(extra)) + nb + extra + comp
        cd += struct.pack("<IHHHHHHIIIHHHHHII", 0x02014B50, 20, 20, flag, method, dos_time, dos_date, crc, len(comp),
                          len(data), len(nb), 0, 0, 0, 0, 0, off) + nb
    cd_off = len(out)
    eocd = struct.pack("<IHHHHIIH", 0x06054B50, 0, 0, len(entries), len(entries), len(cd), cd_off, 0)
    return bytes(out), bytes(cd), eocd


def chunked_sha256(sections):
    digests = []
    for s in sections:
        for i in range(0, len(s), 1 << 20):
            c = s[i:i + (1 << 20)]
            digests.append(hashlib.sha256(b"\xa5" + struct.pack("<I", len(c)) + c).digest())
    return hashlib.sha256(b"\x5a" + struct.pack("<I", len(digests)) + b"".join(digests)).digest()


def sign_v2(body, cd, eocd, key):
    lp = lambda b: struct.pack("<I", len(b)) + b
    ALG = 0x0103                                                   # RSASSA-PKCS1-v1_5 + SHA2-256
    digest = chunked_sha256([body, cd, eocd])
    signed = lp(lp(struct.pack("<I", ALG) + lp(digest))) + lp(lp(key["cert"])) + lp(b"")
    sigs = lp(lp(struct.pack("<I", ALG) + lp(rsa_sign(key, signed))))
    signer = lp(signed) + sigs + lp(spki(key))
    value = lp(lp(signer))
    pair = struct.pack("<QI", 4 + len(value), 0x7109871A) + value
    size = len(pair) + 8 + 16
    block = struct.pack("<Q", size) + pair + struct.pack("<Q", size) + b"APK Sig Block 42"
    eocd2 = eocd[:16] + struct.pack("<I", len(body) + len(block)) + eocd[20:]
    return body + block + cd + eocd2


# ---------------------------------------------------------------- 만들기
def main():
    vname, vcode = game_version()
    print("ETHERION v%s (versionCode %d) 안드로이드 앱을 만듭니다" % (vname, vcode))
    key = load_key()
    arsc, icon_paths = resources_arsc()
    entries = [("AndroidManifest.xml", manifest(vname, vcode), False),
               ("classes.dex", build_dex(), False),
               ("resources.arsc", arsc, True)]
    res = os.path.join(ANDROID, "app", "src", "main", "res")
    for (dn, _), zp in zip(DENS, icon_paths):
        with open(os.path.join(res, "mipmap-" + dn, "ic_launcher.png"), "rb") as f:
            entries.append((zp, f.read(), True))
    entries.append((ICON_XML, adaptive_icon_xml(), False))
    for zp, fn in ((ICON_BG, "ic_launcher_background.png"), (ICON_FG, "ic_launcher_foreground.png")):
        with open(os.path.join(res, "mipmap-xxxhdpi", fn), "rb") as f:
            entries.append((zp, f.read(), True))
    total = 0
    for rel, full in web_files():
        with open(full, "rb") as f:
            data = f.read()
        total += len(data)
        entries.append(("assets/" + rel, data, os.path.splitext(rel)[1].lower() in STORE_EXT))
    print("  게임 파일 %d개 (%.1f MB)" % (len(entries) - 6 - len(DENS), total / 1e6))
    body, cd, eocd = zip_bytes(entries)
    apk = sign_v2(body, cd, eocd, key)
    out_dir = os.path.join(ANDROID, "apk")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, "ETHERION-v%s.apk" % vname)
    with open(out, "wb") as f:
        f.write(apk)
    print("  완성:", os.path.relpath(out, ROOT), "(%.1f MB)" % (len(apk) / 1e6))
    return out


if __name__ == "__main__":
    main()
