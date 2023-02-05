import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ReactNativeWebView?: any;
  }
}

const ReactNativeListener = () => {
  const navigate = useNavigate();

  const listener = useCallback(
    (event: any) => {
      const pathname = window.location.pathname;
      const { type } = JSON.parse(event.data);

      switch (type) {
        // 안드로이드 백 버튼
        case "ANDROID_BACK_BUTTON":
          // 홈인 경우 종료
          if (pathname === "/") {
            const requestMessage = JSON.stringify({ type: "APP_CLOSE" });
            window.ReactNativeWebView.postMessage(requestMessage);
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
