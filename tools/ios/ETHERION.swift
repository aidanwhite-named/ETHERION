// ETHERION iOS 감싸개 — 게임(index.html · css · js · img · audio · fonts)을 앱 안에 담고 화면 전체 WKWebView 하나로 연다.
// 안드로이드 앱(android/ … MainActivity.java)과 같은 일을 한다. 만들기 · 시뮬레이터 실행은 tools/ios/run_sim.sh.
// 앱 안에 server.txt 가 있으면 그 첫 줄의 서버로 붙는다(js/net.js 가 file: 주소의 ?server= 를 읽음). 없으면 혼자 도는 로컬 모드.
import UIKit
import WebKit

final class GameViewController: UIViewController {
    private var web: WKWebView!

    override func loadView() {
        let cfg = WKWebViewConfiguration()
        cfg.allowsInlineMediaPlayback = true
        cfg.mediaTypesRequiringUserActionForPlayback = []          // 타이틀 음악이 바로 나온다
        cfg.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")   // 앱 안 파일끼리 읽기(file:)
        cfg.websiteDataStore = .default()                            // localStorage(계정 · 컬렉션 · 설정)를 남긴다
        web = WKWebView(frame: .zero, configuration: cfg)
        web.isOpaque = false
        web.backgroundColor = .black
        web.scrollView.backgroundColor = .black
        web.scrollView.bounces = false
        web.scrollView.contentInsetAdjustmentBehavior = .never
        if #available(iOS 16.4, *) { web.isInspectable = true }      // 맥 Safari 개발자 메뉴로 들여다보기(시험용)
        view = web
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        guard let res = Bundle.main.resourceURL else { return }
        let game = res.appendingPathComponent("game", isDirectory: true)
        let index = game.appendingPathComponent("index.html")
        var url = index
        if let s = try? String(contentsOf: res.appendingPathComponent("server.txt"), encoding: .utf8),
           let line = s.split(whereSeparator: \.isNewline).map({ $0.trimmingCharacters(in: .whitespaces) })
               .first(where: { !$0.isEmpty && !$0.hasPrefix("#") }),
           var c = URLComponents(url: index, resolvingAgainstBaseURL: false) {
            c.queryItems = [URLQueryItem(name: "server", value: line)]
            url = c.url ?? index
        }
        web.loadFileURL(url, allowingReadAccessTo: game)
    }

    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .landscape }   // 안드로이드 앱처럼 가로 고정
}

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    func application(_ app: UIApplication, didFinishLaunchingWithOptions o: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = GameViewController()
        window?.makeKeyAndVisible()
        return true
    }
}
