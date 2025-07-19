import { useContext } from 'react';
import { ContextQ } from '../Context/ContexQ';

export const useQ = () => {
  const context = useContext(ContextQ);

  if (!context) {
    throw new Error('sem contexto');
  }

  return context;
};
