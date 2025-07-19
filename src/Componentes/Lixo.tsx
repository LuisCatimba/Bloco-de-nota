//Css

import styles from './Nota.module.css';

import type { INota } from '../Hooks/useGerenciaNotas';

//Ícone

import { MdDelete, MdRestoreFromTrash } from 'react-icons/md';

//Hooks

import { useContextNotes } from '../Hooks/useContextNotes';

interface IProps {
  lixo: INota;
}

const Lixo = ({ lixo }: IProps) => {
  const { estNotas, setEstNotas } = useContextNotes();

  const handleDeleteNote = (id: number) => {
    const novaLixeira = estNotas.lixeira.filter(
      (lixo: INota) => lixo.id !== id,
    );
    setEstNotas({ notas: estNotas.notas, lixeira: novaLixeira });
  };

  const restaurarLixo = () => {
    //Adicionando o lixo nas notas

    const notas: INota[] = [...estNotas.notas, lixo];

    //Eliminando o lixo da lixeira

    const lixeira = estNotas.lixeira.filter((lx) => lx.id != lixo.id);

    setEstNotas({
      notas,
      lixeira,
    });
  };

  return (
    <div className={styles.containerNota}>
      <header>
        <h3>{lixo.title}</h3>
        <div className={styles.actions}>
          <ul>
            <li>
              <MdDelete size={24} onClick={() => handleDeleteNote(lixo.id)} />
            </li>
            <li>
              <MdRestoreFromTrash size={24} onClick={restaurarLixo} />
            </li>
          </ul>
        </div>
      </header>
      <main>
        <p>{lixo.content}</p>
      </main>
      <footer>
        <span>Categória: {lixo.categoria}</span>
      </footer>
    </div>
  );
};

export default Lixo;
