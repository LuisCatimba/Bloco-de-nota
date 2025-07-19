import { createContext, useState, type ReactNode } from 'react';

interface QContextType {
  q: string;
  setQ: React.Dispatch<React.SetStateAction<string>>;
}

interface propsChildren {
  children: ReactNode;
}

export const ContextQ = createContext<QContextType | undefined>(undefined);

export const ContextQProvider = ({ children }: propsChildren) => {
  const [q, setQ] = useState<string>('');

  return <ContextQ.Provider value={{ q, setQ }}>{children}</ContextQ.Provider>;
};
