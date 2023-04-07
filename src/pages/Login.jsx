import React from 'react';
import PropTypes from 'prop-types';

import '../style/Login.css';
import logo from '../assets/logo_transparent.svg';

import LoadingScreen from '../components/LoadingScreen';

class Login extends React.Component {
  render() {
    const lintNoMagicNumber = 3;
    const { loginNameInput, handleChange, handleLogInBtn, isLoading } = this.props;
    return isLoading ? (
      <LoadingScreen />
    ) : (
      <div className="home__container">
        <div className="logo__container">
          <img src={ logo } alt="Logo TrybeTunes" />
        </div>
        <div className="title__container">
          <h1>
            TRYBE
            <span>Tunes</span>
          </h1>
        </div>
        <div className="login__container">
          <div className="form__container">
            <input
              value={ loginNameInput }
              onChange={ handleChange }
              type="text"
              name="login-name-input"
              id="login-name-input"
              placeholder="Seu nome"
            />
            <button
              disabled={ loginNameInput.length < lintNoMagicNumber }
              onClick={ handleLogInBtn }
              type="button"
              name="login-submit-button"
              id="login-submit-button"
            >
              ENTRAR
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginNameInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLogInBtn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
