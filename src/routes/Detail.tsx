import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../logo.svg";
import { webviewToAppMessage } from "../utils/webviewToAppMessage";

function Detail() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // App to Webview message
    const listener = (event: any) => {
      const { type } = JSON.parse(event.data);

      switch (type) {
        case "PERMISSION_CAMERA_GRANTED": {
          ref.current?.click();
          break;
        }
        case "PERMISSION_PHOTO_LIBRARY_GRANTED": {
          ref.current?.click();
          break;
        }
        case "ANDROID_BACK_BUTTON": {
          navigate(-1);
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
  }, [navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Detail</p>
        <Link to="/">Move Detail</Link>
        <button onClick={() => webviewToAppMessage("PERMISSION_CAMERA")}>
          카메라 권한 요청
        </button>
        <button onClick={() => webviewToAppMessage("PERMISSION_PHOTO_LIBRARY")}>
          포토 라이브러리 권한 요청
        </button>
        <input ref={ref} type="file" accept="image/*" />
      </header>
    </div>
  );
}

export default Detail;
