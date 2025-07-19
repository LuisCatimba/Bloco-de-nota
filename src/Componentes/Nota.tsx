//Css

import styles from './Nota.module.css';

import type { INota } from '../Hooks/useGerenciaNotas';

//Ícone

import { MdDelete, MdEdit, MdFavorite } from 'react-icons/md';

//Hooks

import { useNavigate } from 'react-router-dom';
import { useContextNotes } from '../Hooks/useContextNotes';

interface IProps {
  nota: INota;
}

const Nota = ({ nota }: IProps) => {
  const Navigate = useNavigate();
  const { setEstNotas, estNotas } = useContextNotes();

  const handleDeleteNote = (id: number) => {
    //dispatch({ type: 'DELETE_NOTE', payload: id });

    //Guardando a nota no lixo antes de remové-la

    const notaRemovida: INota | undefined = estNotas.notas.find(
      (nota) => nota.id == id,
    );

    const lixeira: INota[] = notaRemovida
      ? [...estNotas.lixeira, notaRemovida]
      : estNotas.lixeira;

    //Eliminando a nota

    const notas: INota[] = estNotas.notas.filter(
      (nota: INota) => nota.id != id,
    );

    setEstNotas({ notas: notas, lixeira: lixeira });
  };

  const handleFavourite = (nota: INota) => {
    const novasNotas = estNotas.notas.map((nt: INota) =>
      nt.id == nota.id ? { ...nt, isFavourite: !nt.isFavourite } : nt,
    );
    setEstNotas({ notas: novasNotas, lixeira: estNotas.lixeira });
  };

  return (
    <div className={styles.containerNota}>
      <header>
        <h3>{nota.title}</h3>
        <div className={styles.actions}>
          <ul>
            <li>
              <MdDelete onClick={() => handleDeleteNote(nota.id)} />
            </li>
            <li>
              <MdEdit onClick={() => Navigate(`/edite-note/${nota.id}`)} />
            </li>
          </ul>
        </div>
      </header>
      <main>
        <p>{nota.content}</p>
      </main>
      <footer>
        <span>Categória: {nota.categoria}</span>
        <MdFavorite
          className={nota.isFavourite ? styles.favourite : styles.NoFavourite}
          onClick={() => handleFavourite(nota)}
        />
      </footer>
    </div>
  );
};

export default Nota;
