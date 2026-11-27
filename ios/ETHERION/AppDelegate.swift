// ETHERION iOS 앱 — 시작점.
// 안드로이드 앱(android/ … MainActivity.java)과 같은 일을 한다: 게임 파일(index.html · css · js · img · audio · fonts)을
// 앱 안에 담고, 화면 전체를 덮는 WKWebView 하나로 연다. 화면은 GameViewController, 파일 내주기는 GameSchemeHandler.
import UIKit
import AVFoundation

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // 소리: 다른 앱의 음악과 섞이고, 무음 스위치를 켜면 조용해진다(게임에서 흔한 방식).
        // 무음 스위치와 상관없이 늘 소리를 내려면 .ambient 를 .playback 으로 바꾼다.
        try? AVAudioSession.sharedInstance().setCategory(.ambient, mode: .default, options: [])
        try? AVAudioSession.sharedInstance().setActive(true)
        return true
    }

    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let cfg = UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
        cfg.delegateClass = SceneDelegate.self
        return cfg
    }
}

final class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let ws = scene as? UIWindowScene else { return }
        let w = UIWindow(windowScene: ws)
        w.backgroundColor = .black
        w.rootViewController = GameViewController()
        w.makeKeyAndVisible()
        window = w
    }

    // 게임하는 동안 화면이 꺼지지 않게(안드로이드 FLAG_KEEP_SCREEN_ON 과 같음)
    func sceneDidBecomeActive(_ scene: UIScene) { UIApplication.shared.isIdleTimerDisabled = true }
    func sceneWillResignActive(_ scene: UIScene) { UIApplication.shared.isIdleTimerDisabled = false }
}
