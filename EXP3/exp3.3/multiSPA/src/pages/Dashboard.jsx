import React from "react";

export default function Dashboard() {
  const skills = [
    {
      name: "C++",
      desc: "Strong in problem solving, OOP concepts, and DSA implementation.",
    },
    {
      name: "Java",
      desc: "Good understanding of OOP, collections, and basic backend concepts.",
    },
    {
      name: "Python",
      desc: "Used for scripting, automation, and basic ML/AI related tasks.",
    },
    {
      name: "HTML",
      desc: "Creates structure of webpages using semantic tags and clean layout.",
    },
    {
      name: "CSS",
      desc: "Designs UI using flexbox, grid, transitions, and responsive layouts.",
    },
    {
      name: "JavaScript",
      desc: "Works with DOM, events, ES6 concepts, and interactive UI building.",
    },
    {
      name: "React",
      desc: "Builds SPA using components, props, hooks, and React Router.",
    },
  ];

  return (
    <div className="container">
      <h1 className="title">📊 Dashboard Page</h1>

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
