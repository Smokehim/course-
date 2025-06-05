

import { createContext, useState } from "react";

interface ContextProps {
  users: string;
  addUsers: (value: string) => void;
  emails: string;
  addEmail: (value: string) => void;
}

export const ContextAPI = createContext<ContextProps | undefined>(undefined);

export function GetInput() {
  const [users, addUsers] = useState('');
  const [emails, addEmail] = useState('');

  return (
    <ContextAPI.Provider value={{ users, addUsers, emails, addEmail }}>
      
    </ContextAPI.Provider>
  );
}
