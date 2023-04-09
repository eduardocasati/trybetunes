import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/HamburgerMenu.css';

export default function HamburgerMenu() {
  const [ active, setMode ] = useState(false);
  const toggleMode = () => {
    setMode(!active);
  };
  return (
    <>
      <div className={active ? 'icon iconActive' : 'icon'} onClick={toggleMode}>
        <div className="hamburger hamburgerIcon" />
      </div>
      <div className={active ? 'menu menuOpen' : 'menu menuClose'}>
        <div className="list">
          <nav>
            <ul className="listItems">
              <Link to="/search" onClick={toggleMode}>
                <li>Pesquisa</li>
              </Link>
              <Link to="/favorites" onClick={toggleMode}>
                <li>Favoritos</li>
              </Link>
              <Link to="/profile" onClick={toggleMode}>
                <li>Perfil</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
