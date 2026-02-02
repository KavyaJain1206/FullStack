import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const skills = [
    { name: "C++", desc: "Strong in problem solving, OOP concepts, and DSA." },
    { name: "Java", desc: "Good in OOP, collections, and backend basics." },
    { name: "Python", desc: "Used for scripting, automation and AI/ML basics." },
    { name: "HTML", desc: "Builds structure of web pages using semantic tags." },
    { name: "CSS", desc: "Design UI using flexbox, grid and responsive layout." },
    { name: "JavaScript", desc: "Works with DOM, events, ES6 and logic building." },
    { name: "React", desc: "Build SPA using components, hooks and routing." },
  ];

  return (
    <div className="container">
      <h1 className="title">📊 Dashboard Page</h1>

      {/* ✅ Navigation Buttons */}
      <div className="btn-area">
        <button className="page-btn" onClick={() => navigate("/")}>
          Profile
        </button>
        <button className="page-btn" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="card dashboard-card2">
        <h2 className="section-title">Skills Overview</h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3 className="skill-title">{skill.name}</h3>
              <p className="skill-desc">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
