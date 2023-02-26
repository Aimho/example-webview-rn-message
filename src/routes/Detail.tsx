import { Link } from "react-router-dom";
import { webviewToAppMessage } from "../components/ReactNativeListener";
import logo from "../logo.svg";

function Detail() {
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
        <input type="file" accept="image/*" />
      </header>
    </div>
  );
}

export default Detail;
