"""마법 연출 프레임 찍기용 작은 서버 (tools/fxlab/shots/README 참고):  python3 tools/fxlab/shots/serve.py   → http://127.0.0.1:8791
/h/… = 이 폴더, 나머지 = 게임 폴더. /__log?글 = log.txt 에 한 줄, /__slow?s=초 = 그만큼 늦게 답한다(헤드리스 Firefox 가 그동안 기다렸다 찍는다)."""
import http.server, os, time, urllib.parse
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = urllib.parse.urlparse(path).path
        if p.startswith("/h/"): return os.path.join(HERE, p[3:])
        return os.path.join(ROOT, urllib.parse.unquote(p).lstrip("/"))
    def do_GET(self):
        p = urllib.parse.urlparse(self.path)
        if p.path == "/__log":
            open(os.path.join(HERE, "log.txt"), "a").write(urllib.parse.unquote(p.query) + "\n"); self.send_response(204); self.end_headers(); return
        if p.path == "/__slow":
            q = urllib.parse.parse_qs(p.query); time.sleep(float(q.get("s", ["4"])[0])); self.send_response(204); self.end_headers(); return
        super().do_GET()
    def end_headers(self):
        self.send_header("Cache-Control", "no-store"); super().end_headers()
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(("127.0.0.1", 8791), H).serve_forever()
