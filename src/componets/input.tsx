import { createContext, useState, ReactNode } from "react";

interface ContextProps {
  users: string;
  setUsers: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export const ContextAPI = createContext<ContextProps | undefined>(undefined);

export function GetInput({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState("");
  const [email, setEmail] = useState("");

  return (
    <ContextAPI.Provider value={{ users, setUsers, email, setEmail }}>
      {children}
    </ContextAPI.Provider>
  );
}
