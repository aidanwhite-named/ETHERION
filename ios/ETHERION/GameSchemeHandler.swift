// 앱 안의 게임 파일을 etherion://localhost/… 주소로 내준다 (WKURLSchemeHandler).
//
// 왜 file:// 이 아닌가: file:// 로 열면 fetch 가 막혀 효과음 · 배경음 음향 처리(Web Audio)를 못 쓰고,
// 파일끼리 읽으려면 비공개 설정(allowFileAccessFromFileURLs)이 필요해 앱스토어 심사에 걸릴 수 있다.
// 자기 주소(etherion://)로 내주면 보통 웹 서버에서 연 것처럼 돈다. Capacitor(capacitor://localhost)와 같은 방식.
//
// 소리 · 영상은 WebKit 이 Range(bytes=…) 로 조각조각 달라고 하므로 206 응답을 지원한다.
import Foundation
import WebKit
import UniformTypeIdentifiers

final class GameSchemeHandler: NSObject, WKURLSchemeHandler {
    static let scheme = "etherion"
    static let host = "localhost"

    private let root: URL

    init(root: URL) {
        self.root = root.standardizedFileURL.resolvingSymlinksInPath()
    }

    func webView(_ webView: WKWebView, start task: WKURLSchemeTask) {
        guard let url = task.request.url else { return fail(task, url: nil, status: 400) }
        var path = url.path
        if path.isEmpty || path == "/" { path = "/index.html" }
        let file = root.appendingPathComponent(String(path.dropFirst())).standardizedFileURL.resolvingSymlinksInPath()
        // 게임 폴더 밖(../)은 내주지 않는다
        guard file.path.hasPrefix(root.path + "/"),
              let data = try? Data(contentsOf: file, options: .mappedIfSafe) else {
            return fail(task, url: url, status: 404)
        }

        let total = data.count
        var status = 200
        var body = data
        var headers: [String: String] = [
            "Content-Type": Self.mime(for: file.pathExtension),
            "Content-Length": String(total),
            "Accept-Ranges": "bytes",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        ]
        if let r = task.request.value(forHTTPHeaderField: "Range"), let range = Self.parseRange(r, total: total) {
            let (a, b) = range
            body = data.subdata(in: a..<(b + 1))
            status = 206
            headers["Content-Range"] = "bytes \(a)-\(b)/\(total)"
            headers["Content-Length"] = String(body.count)
        }
        guard let resp = HTTPURLResponse(url: url, statusCode: status, httpVersion: "HTTP/1.1", headerFields: headers) else {
            return fail(task, url: url, status: 500)
        }
        task.didReceive(resp)
        task.didReceive(body)
        task.didFinish()
    }

    func webView(_ webView: WKWebView, stop task: WKURLSchemeTask) {
        // 위에서 한 번에 다 보내므로 멈출 것이 없다
    }

    private func fail(_ task: WKURLSchemeTask, url: URL?, status: Int) {
        if let url = url, let resp = HTTPURLResponse(url: url, statusCode: status, httpVersion: "HTTP/1.1",
                                                      headerFields: ["Content-Type": "text/plain; charset=utf-8", "Content-Length": "0"]) {
            task.didReceive(resp)
            task.didReceive(Data())
            task.didFinish()
        } else {
            task.didFailWithError(URLError(.fileDoesNotExist))
        }
    }

    /// "bytes=a-b" · "bytes=a-" · "bytes=-n" → 닫힌 구간 (a, b)
    static func parseRange(_ header: String, total: Int) -> (Int, Int)? {
        guard total > 0, header.hasPrefix("bytes=") else { return nil }
        let spec = header.dropFirst(6).split(separator: ",").first.map(String.init) ?? ""
        let parts = spec.split(separator: "-", omittingEmptySubsequences: false).map { $0.trimmingCharacters(in: .whitespaces) }
        guard parts.count == 2 else { return nil }
        var a: Int, b: Int
        if parts[0].isEmpty {                       // 끝에서 n 바이트
            guard let n = Int(parts[1]), n > 0 else { return nil }
            a = max(0, total - n); b = total - 1
        } else {
            guard let s = Int(parts[0]) else { return nil }
            a = s
            b = parts[1].isEmpty ? total - 1 : (Int(parts[1]) ?? total - 1)
        }
        b = min(b, total - 1)
        guard a <= b else { return nil }
        return (a, b)
    }

    static func mime(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "js", "mjs": return "text/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json": return "application/json; charset=utf-8"
        case "svg": return "image/svg+xml"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "webp": return "image/webp"
        case "gif": return "image/gif"
        case "ogg": return "audio/ogg"
        case "mp3": return "audio/mpeg"
        case "m4a": return "audio/mp4"
        case "wav": return "audio/wav"
        case "woff2": return "font/woff2"
        case "woff": return "font/woff"
        case "ttf": return "font/ttf"
        case "otf": return "font/otf"
        default:
            return UTType(filenameExtension: ext)?.preferredMIMEType ?? "application/octet-stream"
        }
    }
}
