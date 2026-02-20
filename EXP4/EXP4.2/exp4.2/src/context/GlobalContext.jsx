import React, { createContext, useState, useContext } from 'react';

// Create the context
const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);
    const reset = () => setCount(0);

    return (
        <GlobalContext.Provider value={{ count, increment, decrement, reset }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default GlobalContext;
