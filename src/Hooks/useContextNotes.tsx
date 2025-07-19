//Hooks

import { useContext } from 'react';

//Context

import { NotasContext } from '../Context/ContextNotes';

export const useContextNotes = () => {
  const context = useContext(NotasContext);

  if (!context) {
    throw new Error('Sem contexto');
  }

  return context;
};
