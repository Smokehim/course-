import { useState, createContext } from "react";

export const ContextLog = createContext();

export function ContextLogProvider({ children }) {
    const [loging, setLoging] = useState(false);
    return (
        <ContextLog.Provider value={{ loging, setLoging }}>
            {children}
        </ContextLog.Provider>
    );
}