import React from 'react';
import { WaveSpinner } from 'react-spinners-kit';

import '../style/LoadingScreen.css';

function Loading() {
  return (
    <div className="screen-loader__container">
      <p>Carregando...</p>
      <WaveSpinner color="#4DE89C" />
    </div>
  );
}

export default Loading;
