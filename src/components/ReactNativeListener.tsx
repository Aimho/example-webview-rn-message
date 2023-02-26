import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    ReactNativeWebView?: any;
  }
}

const ReactNativeListener = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // fcm token
  const fcmToken = searchParams.get("fcmToken");
  // notification 권한상태 (-1: 요청 안함, 0: 거부, 1: 수락, 2: 임시권한)
  const authorizationStatus = searchParams.get("authorizationStatus");
  console.log(fcmToken, authorizationStatus);

  // App to Webview message
  const listener = useCallback(
    (event: any) => {
      const pathname = window.location.pathname;
      const { type } = JSON.parse(event.data);

      switch (type) {
        // 안드로이드 백 버튼
        case "ANDROID_BACK_BUTTON":
          // 홈인 경우 종료
          if (pathname === "/") {
            webviewToAppMessage("APP_CLOSE");
          } else {
            // 아닌 경우 뒤로가기
            navigate(-1);
          }
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (window?.ReactNativeWebView) {
      // android
      document.addEventListener("message", listener);
      // ios
      window.addEventListener("message", listener);
    }
    return () => {
      // android
      document.removeEventListener("message", listener);
      // ios
      window.removeEventListener("message", listener);
    };
  }, [listener]);

  return null;
};

export default ReactNativeListener;

export const webviewToAppMessage = (
  type: "APP_CLOSE" | "PERMISSION_CAMERA" | "PERMISSION_PHOTO_LIBRARY"
) => {
  const requestMessage = JSON.stringify({ type });
  window.ReactNativeWebView.postMessage(requestMessage);
};
