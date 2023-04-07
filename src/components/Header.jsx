import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsPerson, BsStar, BsPersonSquare, BsInfoCircle } from 'react-icons/bs';

import '../style/Header.css';
import logo from '../assets/logo_transparent.svg';

import { getUser } from '../services/userAPI';

import Loading from './Loading';
import HamburgerMenu from './HamburgerMenu';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({ user: data, isLoading: false });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <>
        <HamburgerMenu />
        <header className="header">
          <div className="header-logo__container">
            <img src={ logo } alt="TrybeTunes Logo" />
            <p>
              TRYBE
              <span>Tunes</span>
            </p>
          </div>
          <div className="separator" />
          <div className="nav__container">
            <nav>
              <Link
                to="/search"
                className="nav-links"
              >
                <BsSearch className="nav-icon" />
                {' '}
                Pesquisa

              </Link>
              <Link
                to="/favorites"
                className="nav-links"
              >
                <BsStar className="nav-icon" />
                {' '}
                Favoritos
              </Link>
              <Link
                to="/profile"
                className="nav-links"
              >
                <BsPersonSquare className="nav-icon" />
                {' '}
                Perfil
              </Link>
              <div className="separator about" />
              <Link
                to="/about"
                className="nav-links"
              >
                <BsInfoCircle className="nav-icon" />
                {' '}
                Sobre
              </Link>
            </nav>
          </div>
          <div className="username__container">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {user.name}
                {' '}
                <BsPerson color="white" />
              </>
            )}
          </div>
        </header>
      </>
    );
  }
}

export default Header;
