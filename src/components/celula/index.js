/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React from 'react';

import './style.css';

export const Celula = ({
  configCel, onOpen, changePoints, open, statusGame, xy,
}) => {
  const handlerOnClick = () => {
    onOpen();
  };

  return (
    <div className={configCel.ship.hasShip ? 'celula-bg' : ''}>
      {configCel.ship.imagePath && (
      <img
        className={`img-${configCel.ship.orientacao} 
        ${configCel.ship.imagePath}-${configCel.ship.orientacao}`}
        src={`/assets/img/${configCel.ship.imagePath}-${configCel.ship.orientacao}.svg`}
        alt=""
      />
      )}
      {(!configCel.ship.size > 0 && !statusGame.config) && (
        <img
          className="bomba"
          src="/assets/img/bomba.svg"
          alt="bomba"
        />
      )}
      <div
        className={!configCel.open && !configCel.selected
          ? 'celula regular'
          : configCel.selected
            ? 'celula regular selected-bg'
            : 'celula withou-border'}
        onClick={handlerOnClick}
      />
    </div>
  );
};
