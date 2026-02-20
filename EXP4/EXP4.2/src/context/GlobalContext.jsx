import React, { createContext, useState, useContext } from 'react';

// Create the context
const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    return (
        <GlobalContext.Provider value={{ count, setCount }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default GlobalContext;
