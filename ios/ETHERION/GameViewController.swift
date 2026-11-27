// 화면 전체를 덮는 WKWebView 하나. 가로 고정 · 상태 띠 숨김 · 소리 자동 재생 · 바깥 링크는 사파리로.
import UIKit
import WebKit

final class GameViewController: UIViewController, WKNavigationDelegate, WKUIDelegate {
    private var web: WKWebView!

    /// 앱 안의 게임 폴더 (빌드 단계 "Copy game files" — scripts/copy_game.sh 가 채운다)
    private var gameDir: URL { Bundle.main.resourceURL!.appendingPathComponent("game", isDirectory: true) }

    /// 처음 여는 주소. 앱 안 server.txt 첫 줄이 있으면 "?server=<주소>" 를 붙인다 → js/net.js 가 그 서버에 붙는다(서버 모드).
    /// 없으면 혼자 도는 로컬 모드. 안드로이드 MainActivity.START_URL 과 같은 규칙(tools/desktop/server.txt).
    private var startURL: URL {
        var c = URLComponents()
        c.scheme = GameSchemeHandler.scheme
        c.host = GameSchemeHandler.host
        c.path = "/index.html"
        if let server = Self.serverAddress() { c.queryItems = [URLQueryItem(name: "server", value: server)] }
        return c.url!
    }

    static func serverAddress() -> String? {
        guard let url = Bundle.main.url(forResource: "server", withExtension: "txt"),
              let text = try? String(contentsOf: url, encoding: .utf8) else { return nil }
        return text.split(whereSeparator: \.isNewline)
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .first { !$0.isEmpty && !$0.hasPrefix("#") }
    }

    override func loadView() {
        let cfg = WKWebViewConfiguration()
        cfg.setURLSchemeHandler(GameSchemeHandler(root: gameDir), forURLScheme: GameSchemeHandler.scheme)
        cfg.allowsInlineMediaPlayback = true
        cfg.mediaTypesRequiringUserActionForPlayback = []          // 타이틀 음악이 첫 터치 없이 바로 나온다
        cfg.allowsAirPlayForMediaPlayback = false
        cfg.websiteDataStore = .default()                            // localStorage(계정 · 컬렉션 · 설정)를 앱에 남긴다
        cfg.defaultWebpagePreferences.preferredContentMode = .mobile // 아이패드도 "데스크톱 사이트"(980px 화면)로 열지 않는다
        // 게임이 "iOS 앱 안"임을 알게 한다 → js/mobile.js 가 안드로이드 앱처럼 폰 배치 · 화면 줄임을 켠다
        cfg.userContentController.addUserScript(WKUserScript(
            source: "window.ETHERION_SHELL = 'ios';", injectionTime: .atDocumentStart, forMainFrameOnly: true))

        web = WKWebView(frame: .zero, configuration: cfg)
        web.isOpaque = false
        web.backgroundColor = .black
        web.scrollView.backgroundColor = .black
        web.scrollView.bounces = false
        web.scrollView.contentInsetAdjustmentBehavior = .never       // 노치 여백은 CSS env(safe-area-inset-*) 가 맡는다
        web.allowsBackForwardNavigationGestures = false
        web.allowsLinkPreview = false
        web.navigationDelegate = self
        web.uiDelegate = self
        #if DEBUG
        if #available(iOS 16.4, *) { web.isInspectable = true }      // 맥 Safari → 개발자 메뉴로 들여다보기(시험용 빌드만)
        #endif
        view = web
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        web.load(URLRequest(url: startURL))
    }

    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
    // 화면 가장자리를 쓸어도 바로 홈 · 알림으로 빠지지 않는다(한 번 더 쓸어야) — 카드를 끌다 앱을 나가지 않게
    override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { .all }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .landscape }   // 안드로이드 앱처럼 가로 고정
    override var preferredInterfaceOrientationForPresentation: UIInterfaceOrientation { .landscapeRight }

    // MARK: - 이동: 게임 주소는 그대로, 바깥 http(s) 링크는 사파리로
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url, let scheme = url.scheme?.lowercased() else { return decisionHandler(.cancel) }
        if scheme == GameSchemeHandler.scheme || scheme == "about" || scheme == "blob" || scheme == "data" {
            return decisionHandler(.allow)
        }
        let mainFrame = action.targetFrame?.isMainFrame ?? true
        if (scheme == "http" || scheme == "https") && !mainFrame { return decisionHandler(.allow) }   // 틀 안(iframe)은 그대로
        UIApplication.shared.open(url)          // 처리방침 · 약관 · 메일(mailto:) 등
        decisionHandler(.cancel)
    }

    // window.open · target="_blank" → 사파리
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = action.request.url { UIApplication.shared.open(url) }
        return nil
    }

    // 웹 내용 처리기가 (메모리 부족 등으로) 죽으면 다시 연다 — 안 그러면 빈 화면으로 남는다
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        webView.load(URLRequest(url: startURL))
    }

    // MARK: - alert · confirm · prompt (WKWebView 는 이것들을 직접 그려 줘야 뜬다)
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: "확인", style: .default) { _ in completionHandler() })
        present(a, animated: true)
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: "취소", style: .cancel) { _ in completionHandler(false) })
        a.addAction(UIAlertAction(title: "확인", style: .default) { _ in completionHandler(true) })
        present(a, animated: true)
    }

    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        let a = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
        a.addTextField { $0.text = defaultText }
        a.addAction(UIAlertAction(title: "취소", style: .cancel) { _ in completionHandler(nil) })
        a.addAction(UIAlertAction(title: "확인", style: .default) { _ in completionHandler(a.textFields?.first?.text) })
        present(a, animated: true)
    }
}
