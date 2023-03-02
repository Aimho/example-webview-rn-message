import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import ReactNativeListener from "./components/ReactNativeListener";

function App() {
  const [searchParams] = useSearchParams();
  // fcm token
  const fcmToken = searchParams.get("fcmToken");
  // notification 권한상태 (-1: 요청 안함, 0: 거부, 1: 수락, 2: 임시권한)
  const authorizationStatus = searchParams.get("authorizationStatus");
  console.log(fcmToken, authorizationStatus);

  return (
    <BrowserRouter>
      <ReactNativeListener />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
