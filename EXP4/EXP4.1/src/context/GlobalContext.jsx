import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState("Boy");
    const [theme, setTheme] = useState("light");

    return (
        <GlobalContext.Provider value={{ user, setUser, theme, setTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};
