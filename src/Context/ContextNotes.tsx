import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { IinitialReducer } from '../Hooks/useGerenciaNotas';

interface NotasContextType {
  estNotas: IinitialReducer;
  setEstNotas: React.Dispatch<React.SetStateAction<IinitialReducer>>;
}

export const NotasContext = createContext<NotasContextType | undefined>(
  undefined,
);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const initialState: IinitialReducer = {
    notas: [],
    lixeira: [],
  };

  const [estNotas, setEstNotas] = useState<IinitialReducer>(() => {
    const storedNote: string | null = localStorage.getItem('notes');
    return storedNote ? JSON.parse(storedNote) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(estNotas));
  }, [estNotas]);

  return (
    <NotasContext.Provider value={{ estNotas, setEstNotas }}>
      {children}
    </NotasContext.Provider>
  );
};
