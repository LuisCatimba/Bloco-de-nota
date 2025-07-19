//Css

import './Notas.css';

//Componentes

import Nota from '../../Componentes/Nota';

//type

import type { INota } from '../../Hooks/useGerenciaNotas';

//Hooks

import { useNavigate } from 'react-router-dom';
import { useContextNotes } from '../../Hooks/useContextNotes';
import { useQ } from '../../Hooks/useQ';

const Notas = () => {
  const Navigate = useNavigate();
  const { estNotas } = useContextNotes();
  const { q } = useQ();

  return (
    <div className="containerNotas">
      <>
        {estNotas.notas.filter(
          (nota) =>
            nota.title.includes(q.trim()) || nota.content.includes(q.trim()),
        ).length > 0 ? (
          <div className="notas">
            {estNotas.notas
              .filter(
                (nota) =>
                  nota.title.includes(q.trim()) ||
                  nota.content.includes(q.trim()),
              )
              .map((nota: INota) => (
                <Nota key={nota.id} nota={nota} />
              ))}
          </div>
        ) : (
          <div className="semNotas">
            <p>
              {q.trim() == ''
                ? `Você não tem notas cadastradas`
                : `Sem resultados para ${q}`}
            </p>
            <button onClick={() => Navigate('/cadastrar')}>Cadastrar</button>
          </div>
        )}
      </>
    </div>
  );
};

export default Notas;
