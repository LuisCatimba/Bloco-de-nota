import './Cadastrar.css';

//Hooks

import { useEffect, useState } from 'react';
import { useGerenciaNota } from '../../Hooks/useGerenciaNotas';

import { Categoria } from '../../Hooks/useGerenciaNotas';

import type { INota } from '../../Hooks/useGerenciaNotas';

//Componente
import Message from '../../Componentes/Message';

const Cadastrar = () => {
  const [title, setTitle] = useState<string>('');
  const [categoria, setCategoria] = useState<Categoria>(Categoria.escola);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const { dispatch } = useGerenciaNota();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Resetando error e success

    setError('');
    setSuccess(false);

    if (title.trim() == '') {
      setError('Título não pode estar vazio');
      return;
    }

    if (content.trim() == '') {
      setError('Conteúdo não pode estar vazio');
      return;
    }

    const nota: INota = {
      title: title,
      categoria: categoria,
      content: content,
      isFavourite: false,
      isCompleted: false,
      id: Date.now(),
    };

    dispatch({ type: 'ADD_NOTE', payload: nota });
    setSuccess(true);

    setTitle('');
    setCategoria(Categoria.diversao);
    setContent('');
  };

  return (
    <div className="containerForm">
      <div className="form">
        <h2>Anote suas notas</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título</span>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value as string)}
            />
          </label>
          <label>
            <span>Seleccione uma categoria</span>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
            >
              {Object.entries(Categoria).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Nota</span>
            <textarea
              placeholder="Escreva o conteúdo da sua nota..."
              value={content}
              onChange={(e) => setContent(e.target.value as string)}
            ></textarea>
          </label>
          <button>Cadastrar</button>
          {error !== '' && <Message message={error} isError={true} />}
          {success && (
            <Message message="Nota anotada com sucesso" isError={false} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Cadastrar;
