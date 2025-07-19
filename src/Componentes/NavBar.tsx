//Css

import styles from './NavBar.module.css';

//Link

import { NavLink } from 'react-router-dom';

//Ícones

import { MdStickyNote2, MdFavorite } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { FaPlusCircle } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.Active : styles.noActive
            }
          >
            <MdStickyNote2 />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              isActive ? styles.Active : styles.noActive
            }
          >
            <MdFavorite />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/lixeira"
            className={({ isActive }) =>
              isActive ? styles.Active : styles.noActive
            }
          >
            <IoMdTrash />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cadastrar"
            className={({ isActive }) =>
              isActive ? styles.Active : styles.noActive
            }
          >
            <FaPlusCircle />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
