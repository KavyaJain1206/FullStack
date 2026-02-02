import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import chopperLogo from "../assets/chopper.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* ✅ Logo + Title (click to Profile) */}
      <Link to="/" className="logo-link">
        <div className="brand">
          <img src={chopperLogo} alt="Logo" className="brand-logo" />
          <h2 className="logo">Experiment 3.3</h2>
        </div>
      </Link>

      <div className="nav-links">
        <button
          className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Profile
        </button>

        <button
          className={`nav-btn ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </nav>
  );
}
