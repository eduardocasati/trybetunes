import React from 'react';
import { BsPerson, BsPersonSquare, BsSearch, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import logo from '../assets/logo_transparent.svg';
import '../style/Header.css';

import { getUser } from '../services/userAPI';

import HamburgerMenu from './HamburgerMenu';
import Loading from './Loading';

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
            <img src={logo} alt="TrybeTunes Logo" />
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
