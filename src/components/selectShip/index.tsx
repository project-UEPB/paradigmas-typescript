/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Botao } from '../Botao';

import './style.css';

const findBy = (kind: any, arr: any) => arr.filter((el: any) => el.kind === kind)[0];

type TypeProps = {
    initialShips: any,
    onChangeShip: any,
    onChangeSelectedShip: any,
    orientacao: any,
    onChangeOrientacao: any,
    statusGame: any,
    superTiro: any,
    onChangeSuperTiro: any,
    playerGaming: any,
}

export const SelectShip = ({
  initialShips,
  onChangeShip,
  onChangeSelectedShip,
  orientacao,
  onChangeOrientacao,
  statusGame,
  superTiro,
  onChangeSuperTiro,
  playerGaming,
}: TypeProps) => {
  // const [selectedShip, setSelectedShip] = useState('');
  // const [reload, setReload] = useState(false);
  const [superTiroPlayer, setSuperTiroPlayer] = useState(false);
  // const [ships, setShips] = useState([]);

  const handlerDecrementShip = (shipKey: any) => {
    onChangeSelectedShip(shipKey);
  };

  return (
    <div className="container-options">
      <div
        onClick={() => handlerDecrementShip('submarino')}
        className={findBy('submarino', initialShips).selected
          ? 'image-container selected-ship' : 'image-container container-img'}
      >
        <div>{findBy('submarino', initialShips).qtd}</div>
        <img
          className="img-select"
          src="/assets/img/submarino-h.svg"
          alt="submarino"
        />
      </div>
      <div
        onClick={() => handlerDecrementShip('contratopedeiros')}
        className={findBy('contratopedeiros', initialShips).selected
          ? 'image-container selected-ship' : 'image-container container-img'}
      >
        <div>{findBy('contratopedeiros', initialShips).qtd}</div>
        <img
          className="img-select"
          src="/assets/img/contratopedeiros-h.svg"
          alt="contratopedeiros"
        />
      </div>
      <div
        onClick={() => handlerDecrementShip('navioTanque')}
        className={findBy('navioTanque', initialShips).selected
          ? 'image-container selected-ship' : 'image-container container-img'}
      >
        <div>{findBy('navioTanque', initialShips).qtd}</div>
        <img
          className="img-select"
          src="/assets/img/navio-tanque-h.svg"
          alt="navio-tanque"
        />
      </div>
      <div
        onClick={() => handlerDecrementShip('portaAvioes')}
        className={findBy('portaAvioes', initialShips).selected
          ? 'image-container selected-ship' : 'image-container container-img'}
      >
        <div>{findBy('portaAvioes', initialShips).qtd}</div>
        <img
          className="img-select"
          src="/assets/img/porta-avioes-h.svg"
          alt="submarino"
        />
      </div>
      {statusGame.config && (
      <div className="orientacao">
        <Botao
          active={orientacao === 'h' ? 'btn-orientacao-ativo' : ''}
          text="H"
          title="Horizontal"
          onClick={() => onChangeOrientacao('h')}
        />
        <Botao
          active={orientacao === 'v' ? 'btn-orientacao-ativo' : ''}
          text="V"
          title="Vertical"
          onClick={() => onChangeOrientacao('v')}
        />
      </div>
      )}
      {(statusGame.inicio) && (
      <div className="super-tiro">
        <Botao
          active={superTiro[playerGaming] ? 'btn-orientacao-ativo' : ''}
          disabled={superTiroPlayer}
          text="Super Tiro"
          title="Super Tiro"
          onClick={() => {
            if (!superTiroPlayer) setSuperTiroPlayer(true);
            if (playerGaming === 'player') {
              onChangeSuperTiro({
                ...superTiro, [playerGaming]: superTiro[playerGaming] === null ? null : true,
              });
            }
          }}
        />
      </div>
      )}
    </div>
  );
};
