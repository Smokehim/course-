import { createContext  } from 'react';
import { useState } from 'react';
export const ContextEmail = createContext()

export function EmailInput({child}){
    
    const [email, setEmail] = useState("");
    return (
        <ContextEmail.Provider value={{ email, setEmail }}>
            {child}
        </ContextEmail.Provider>
    );

}