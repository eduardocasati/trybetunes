import React from 'react';
import { Link } from 'react-router-dom';
import {TbFaceIdError} from 'react-icons/tb'

import '../style/NotFound.css'

import Header from '../components/Header'

function NotFound() {
  return (
    <div className='not-found-container'>
      <div className='not-found-content'>
        <span>Página não encontrada!</span>
        <TbFaceIdError className='not-found-icon' />
        <Link to="/search">
          <button type='button'>
            HOME
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
