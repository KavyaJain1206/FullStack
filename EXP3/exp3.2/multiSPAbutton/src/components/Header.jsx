import React from "react";
import { Link } from "react-router-dom";
import danceGif from "../assets/dance.gif";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <div className="brand">
          <img src={danceGif} alt="logo" className="brand-gif" />
          <span>Experiment 3.2</span>
        </div>
      </Link>
    </header>
  );
}
