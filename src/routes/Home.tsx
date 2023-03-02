import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import logo from "../logo.svg";
import { webviewToAppMessage } from "../utils/webviewToAppMessage";

function Home() {
  const [searchParams] = useSearchParams();
  // fcm token
  const fcmToken = searchParams.get("fcmToken");
  // notification 권한상태 (-1: 요청 안함, 0: 거부, 1: 수락, 2: 임시권한)
  const authorizationStatus = searchParams.get("authorizationStatus");
  console.log(fcmToken, authorizationStatus);

  useEffect(() => {
    // App to Webview message
    const listener = (event: any) => {
      const { type } = JSON.parse(event.data);

      switch (type) {
        case "ANDROID_BACK_BUTTON": {
          webviewToAppMessage("APP_CLOSE");
          break;
        }
        default:
          break;
      }
    };
    if (window?.ReactNativeWebView) {
      document.addEventListener("message", listener); // android
      window.addEventListener("message", listener); // ios
    }
    return () => {
      document.removeEventListener("message", listener);
      window.removeEventListener("message", listener);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Home</p>
        <Link to="/detail">Move Detail</Link>
      </header>
    </div>
  );
}

export default Home;
