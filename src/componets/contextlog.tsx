import { useState, createContext } from "react";

export const ContextLog = createContext();

export function ContextLogProvider({ children }) {
    const [log, setLog] = useState(false);
    return (
        <ContextLog.Provider value={{ log, setLog }}>
            {children}
        </ContextLog.Provider>
    );
}