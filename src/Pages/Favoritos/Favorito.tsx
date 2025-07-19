import '../Cadastrar/Cadastrar.css';

//Componentes

import Nota from '../../Componentes/Nota';

//type

import type { INota } from '../../Hooks/useGerenciaNotas';

//Hooks

import { useContextNotes } from '../../Hooks/useContextNotes';
import { useQ } from '../../Hooks/useQ';

const Favoritos = () => {
  const { estNotas } = useContextNotes();
  const { q } = useQ();

  return (
    <div className="containerNotas">
      <>
        {estNotas.notas
          .filter((nota) => nota.isFavourite)
          .filter(
            (nota) =>
              nota.title.includes(q.trim()) || nota.content.includes(q.trim()),
          ).length > 0 ? (
          <div className="notas">
            {estNotas.notas
              .filter((nota) => nota.isFavourite)
              .filter(
                (nota) => nota.title.includes(q) || nota.content.includes(q),
              )
              .map((nota: INota) => (
                <Nota key={nota.id} nota={nota} />
              ))}
          </div>
        ) : (
          <div className="semNotas">
            <p>
              {q.trim() == ''
                ? `Você não tem favoritos`
                : `Sem resultados para ${q}`}
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default Favoritos;
