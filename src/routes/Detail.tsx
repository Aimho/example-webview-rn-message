import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Detail() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Detail</p>
        <Link to="/">Move Detail</Link>
        <input type="file" accept="image/*" multiple />
      </header>
    </div>
  );
}

export default Detail;
