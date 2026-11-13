package com.etherion.game;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

/**
 * ETHERION 안드로이드 앱: 게임(assets/ 의 index.html)을 화면 전체를 덮는 WebView 하나로 연다.
 *
 * tools/android/build_apk.py 의 build_dex() 가 이 코드를 바이트코드로 직접 적은 것이다.
 * 여기를 고치면 그쪽도 같이 고친다 (SDK 없이 APK를 만드는 길은 그쪽, Android Studio로 만드는 길은 이쪽).
 */
public class MainActivity extends Activity {
    /** 상태 띠 · 아래 단추 줄을 숨기고, 화면 가장자리를 쓸어야만 잠깐 보인다 */
    private static final int IMMERSIVE = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN
            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;   // 0x1706

    /** v3.46.2 처음 여는 주소. 서버 모드면 "?server=<https 주소, URL 인코딩>"을 붙인다 (js/net.js 가 읽음).
     *  build_apk.py 는 tools/desktop/server.txt(또는 --server · --offline)로 이 값을 정해 바이트코드에 넣는다. */
    private static final String START_URL = "file:///android_asset/index.html?server=https%3A%2F%2Fetherion.tail2be349.ts.net";

    private WebView web;
    private long lastBack;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON | WindowManager.LayoutParams.FLAG_FULLSCREEN);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);                 // 저장(localStorage: 계정 · 컬렉션 · 설정)
        s.setAllowFileAccess(true);
        s.setUseWideViewPort(true);                   // js/mobile.js 가 정한 레이아웃 폭(예: 1600)을 따른다
        s.setLoadWithOverviewMode(true);              // 그 폭이 화면에 꼭 맞게 줄여 보인다
        s.setMediaPlaybackRequiresUserGesture(false); // 타이틀 음악이 바로 나온다
        s.setSupportZoom(false);
        s.setTextZoom(100);                           // 기기의 글자 크기 설정이 화면 배치를 깨지 않게
        web.setWebChromeClient(new WebChromeClient());
        web.setBackgroundColor(0xFF000000);
        setContentView(web);
        web.setSystemUiVisibility(IMMERSIVE);
        web.loadUrl(START_URL);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && web != null) web.setSystemUiVisibility(IMMERSIVE);
    }

    @Override
    protected void onPause() {          // 홈으로 나가면 배경음이 멈춘다(js/bgm.js 의 visibilitychange)
        super.onPause();
        if (web != null) web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.onResume();
    }

    /** 뒤로 단추: 2초 안에 두 번 눌러야 닫는다 (싸우다 잘못 눌러 판을 잃지 않게) */
    @Override
    public void onBackPressed() {
        long now = System.currentTimeMillis();
        if (now - lastBack < 2000) {
            super.onBackPressed();
            return;
        }
        lastBack = now;
        Toast.makeText(this, "뒤로 단추를 한 번 더 누르면 게임을 닫습니다", Toast.LENGTH_SHORT).show();
    }
}
