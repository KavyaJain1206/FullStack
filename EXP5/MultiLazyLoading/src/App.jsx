import { lazy, Suspense } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

const Profile = lazy(() => import("./components/profile"));
const Dashboard = lazy(() => import("./components/dashboard"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <div className="App">
      <h1>Lazy Loading in React</h1>

      <nav className="nav">
        <NavLink className="nav-link" to="/">
          Profile
        </NavLink>
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className="nav-link" to="/contact">
          Contact
        </NavLink>
      </nav>

      <Suspense fallback={<div className="loader">Loading module...</div>}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;