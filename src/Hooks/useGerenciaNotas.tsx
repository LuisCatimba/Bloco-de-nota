import { useEffect, useReducer } from 'react';

import { useContextNotes } from './useContextNotes';

export enum Categoria {
  diversao = 'Diversão',
  escola = 'Escola',
  igreja = 'Igreja',
  trabalho = 'Trabalho',
}

export interface INota {
  title: string;
  categoria: Categoria;
  content: string;
  isFavourite: boolean;
  isCompleted: boolean;
  id: number;
}

type Action =
  | { type: 'LOAD_NOTES'; payload: IinitialReducer }
  | {
      type: 'ADD_NOTE';
      payload: INota;
    }
  | { type: 'DELETE_NOTE'; payload: number }
  | { type: 'EDITE_NOTE'; payload: INota };

export interface IinitialReducer {
  notas: INota[];
  lixeira: INota[];
}

export const useGerenciaNota = () => {
  const { setEstNotas } = useContextNotes();

  const storedNote: string | null = localStorage.getItem('notes');

  const initialReducer: IinitialReducer = storedNote
    ? JSON.parse(storedNote)
    : { notas: [], lixeira: [] };

  const reducer = (state: IinitialReducer, action: Action): IinitialReducer => {
    switch (action.type) {
      case 'LOAD_NOTES':
        return action.payload;
      case 'ADD_NOTE':
        return {
          notas: [...state.notas, action.payload],
          lixeira: state.lixeira,
        };
      case 'DELETE_NOTE': {
        //Guardando o lixo antes de eliminá-lo

        const notaRemovida: INota | undefined = state.notas.find(
          (nota: INota) => nota.id === action.payload,
        );

        const novaLixeira = notaRemovida
          ? [...state.lixeira, notaRemovida]
          : state.lixeira;

        const novasNotas = state.notas.filter(
          (nota: INota) => nota.id != action.payload,
        );

        return { notas: novasNotas, lixeira: novaLixeira };
      }
      case 'EDITE_NOTE': {
        const novasNotas = state.notas.map((nota: INota) =>
          nota.id == action.payload.id ? action.payload : nota,
        );
        return { notas: novasNotas, lixeira: state.lixeira };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialReducer);

  useEffect(() => {
    const storedNote: string | null = localStorage.getItem('notes');

    if (storedNote) {
      setEstNotas(JSON.parse(storedNote));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(state));
    setEstNotas(state);
  }, [state]);
  return { state, dispatch };
};
