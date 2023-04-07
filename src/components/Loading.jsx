import React from 'react';
import { SequenceSpinner } from 'react-spinners-kit';

import '../style/Loading.css';

function Loading() {
  return (
    <div className="loader__container">
      <p>Carregando...</p>
      <SequenceSpinner />
    </div>
  );
}

export default Loading;
