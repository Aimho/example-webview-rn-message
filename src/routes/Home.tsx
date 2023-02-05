import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Home() {
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
