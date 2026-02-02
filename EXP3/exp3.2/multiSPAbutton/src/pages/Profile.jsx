import React from "react";
import { useNavigate } from "react-router-dom";
import myPhoto from "../image.png";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">👤 Profile Page</h1>

      {/* ✅ Navigation Buttons */}
      <div className="btn-area">
        <button className="page-btn" onClick={() => navigate("/")}>
          Profile
        </button>
        <button className="page-btn" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="card profile-card">
        <img src={myPhoto} alt="My Photo" className="profile-img-square" />

        <div className="profile-content">
          <h2 className="name">Kavya Jain</h2>

          <p className="text">
            I am a Computer Science student specializing in AI & ML. I love web
            development, building projects, and learning new technologies.
          </p>

          <h3 className="section-title">Internship</h3>
          <ul className="list">
            <li>Web Development Internship (Frontend / React)</li>
          </ul>

          <h3 className="section-title">Projects</h3>
          <ul className="list">
            <li>Student Portal UI</li>
            <li>To-Do App using React</li>
            <li>Responsive Navbar Design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
