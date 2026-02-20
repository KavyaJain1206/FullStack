import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext.jsx";

function Theme() {
    const { theme, setTheme } = useContext(GlobalContext);

    return (
        <div>
            <h2>Theme: {theme}</h2>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                Toggle Theme
            </button>
        </div>
    );
}

export default Theme;
