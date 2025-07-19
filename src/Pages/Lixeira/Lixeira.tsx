//Css

import '../Cadastrar/Cadastrar.css';

//type

import type { INota } from '../../Hooks/useGerenciaNotas';

//Hooks

import { useContextNotes } from '../../Hooks/useContextNotes';
import { useQ } from '../../Hooks/useQ';

//Componentes

import Lixo from '../../Componentes/Lixo';

const Lixeira = () => {
  const { estNotas } = useContextNotes();
  const { q } = useQ();
  return (
    <div className="containerNotas">
      <>
        {estNotas.lixeira.filter(
          (nota) =>
            nota.title.includes(q.trim()) || nota.content.includes(q.trim()),
        ).length > 0 ? (
          <div className="notas">
            {estNotas.lixeira
              .filter(
                (nota) =>
                  nota.title.includes(q.trim()) ||
                  nota.content.includes(q.trim()),
              )
              .map((lixo: INota) => (
                <Lixo key={lixo.id} lixo={lixo} />
              ))}
          </div>
        ) : (
          <div className="semNotas">
            <p>{q.trim() == '' ? `Sem lixo` : `Sem resultados para ${q}`}</p>
          </div>
        )}
      </>
    </div>
  );
};

export default Lixeira;
