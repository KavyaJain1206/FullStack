import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext.jsx";
import Profile from "./Profile.jsx";
import Theme from "./Theme.jsx";
import "./App.css";

function App() {
  const { theme } = useContext(GlobalContext);

  return (
    <div className={`app-container ${theme}`}>
      <h1>Context API Lab</h1>
      <Profile />
      <Theme />
    </div>
  );
}

export default App;
