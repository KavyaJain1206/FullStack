import { lazy, Suspense } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Lazy Loading in React</h1>

        <nav className="nav">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </nav>
      </header>

      <Suspense fallback={<div className="loader">Loading module...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;