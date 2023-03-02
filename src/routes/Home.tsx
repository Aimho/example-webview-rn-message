import { useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import { webviewToAppMessage } from "../utils/webviewToAppMessage";

function Home() {
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
