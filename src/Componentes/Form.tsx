//Css

import styles from './Form.module.css';

//Hooks

import { useQ } from '../Hooks/useQ';

//icone

import { FiSearch } from 'react-icons/fi';

const Form = () => {
  const { q, setQ } = useQ();

  return (
    <form className={styles.form}>
      <input
        type="text"
        placeholder="Buscar notas..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <FiSearch size={15} />
    </form>
  );
};

export default Form;
