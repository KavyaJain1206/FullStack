import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <button
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        Change color
      </button>
    </div>
  );
}

export default App;
