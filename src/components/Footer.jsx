import React from 'react';

import '../style/Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>
          Site criado por
          {' '}
          <a
            href="https://github.com/eduardocasati"
            target="_blank"
            rel="noreferrer"
          >
            Eduardo Casati
          </a>
          {' '}
          como um projeto da
          {' '}
          <a
            href="https://www.betrybe.com/formacao-desenvolvimento-web"
            target="_blank"
            rel="noreferrer"
          >
            Formação em Desenvolvimento Web da Trybe
          </a>
        </p>
      </footer>
    );
  }
}
