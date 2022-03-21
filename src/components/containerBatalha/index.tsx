/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Botao } from '../Botao';
import { Campo } from '../campo';
import { SelectShip } from '../selectShip';
import UserContext from '../../UserContext';
import api from '../../services/api';

import './style.css';

const initialPoints = {
  player: {
    name: 'jose',
    points: 0,
  },
  IAzinha: 0,
};

export const initialShips = [
  {
    kind: 'submarino',
    qtd: 4,
    selected: false,
    size: 2,
    hasShip: true,
    imagePath: 'submarino',
    points: 1000,
  },
  {
    kind: 'contratopedeiros',
    qtd: 3,
    selected: false,
    size: 3,
    hasShip: true,
    imagePath: 'contratopedeiros',
    points: 500,
  },
  {
    kind: 'navioTanque',
    qtd: 2,
    selected: false,
    size: 4,
    hasShip: true,
    imagePath: 'navio-tanque',
    points: 750,
  },
  {
    kind: 'portaAvioes',
    qtd: 1,
    selected: false,
    size: 5,
    hasShip: true,
    imagePath: 'porta-avioes',
    points: 300,
  },
];

const initialStatusGame = {
  config: false,
  inicio: false,
  reiniciar: false,
};

const initialSuperTiro = {
  player: false,
  IAzinha: false,
};

const findBy = (kind: any, arr: Array<any>) => arr.filter((el: any) => el.kind === kind)[0];
const removeOne = (kind: any, arr: any) => {
  const aux = [];
  for (const el of arr) {
    if (el.kind !== kind) aux.push({ ...el, selected: false });
  }
  return aux;
};

export const ContainerBatalha = () => {
  const [points, setPoints] = useState(initialPoints);
  const [ships, setShips] = useState(initialShips);
  const [statusGame, setStatusGame] = useState(initialStatusGame);
  const [orientacao, setOrientacao] = useState('h');
  const [playerGaming, setPlayerGaming] = useState('player');
  const [superTiro, setSuperTiro] = useState(initialSuperTiro);
  const [win, setWin] = useState(initialSuperTiro);
  const [restart, setRestart] = useState(false);
  const [context, setContext] = useContext(UserContext);
  const navigate = useNavigate();

  const handlerRestart = () => {
    setRestart(true);
  };

  const handlerRestartStates = () => {
    if (restart) {
      setStatusGame(initialStatusGame);
      setPoints(initialPoints);
      setShips(initialShips);
      setOrientacao('h');
      setPlayerGaming('player');
      setSuperTiro(initialSuperTiro);
      setWin(initialSuperTiro);
    }
  };

  const handlerGoToHome = () => {
    navigate('/', { replace: true });
  };

  const handlerSelectedShip = (shipKey: any) => {
    if (statusGame.config) {
      const qtdShip = findBy(shipKey, ships).qtd;

      if (qtdShip === 0) {
        setShips([
          ...removeOne(shipKey, ships),
          {
            ...findBy(shipKey, ships),
            selected: !findBy(shipKey, ships).selected,
          },
        ]);
      }

      if (qtdShip - 1 < 0) return;

      const objAux = [
        ...removeOne(shipKey, ships),
        {
          ...findBy(shipKey, ships),
          kind: shipKey,
          qtd: qtdShip,
          selected: !findBy(shipKey, ships).selected,
        },
      ];

      setShips(objAux);
    }
  };

  const handlerConfig = () => {
    if (!statusGame.config) {
      setStatusGame({ ...initialStatusGame, config: true });
      setShips(initialShips);
    }
  };

  const canInitGame = () => {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].qtd > 0) return false;
    }

    return true;
  };

  const handlerInicio = () => {
    if (!statusGame.inicio && canInitGame()) setStatusGame({ ...initialStatusGame, inicio: true });
  };

  const postWin = async () => {
    await api.post('/score/create',
      {
        name: context.name,
        score: points.player.points,
      })
      .then((response) => {
        console.log('Enviado');
      })
      .catch((err) => {
        console.error(`ops! ocorreu um erro${err}`);
      });
  };

  useEffect(() => {
    if (win.player && !win.IAzinha) {
      postWin();
      alert(`Parabéns, ${context.name} você venceu!!!`);
    }
    if (win.IAzinha && !win.player) {
      alert('Que pena a IAzinha venceu!!!');
    }
  }, [win, context.name]);

  return (
    <div className="container-jogo">
      <Botao
        onClick={handlerGoToHome}
        text="<"
        title="Voltar"
      />
      <div className="cols">
        <div className="col-1">
          <div className="content">
            <h2>Pontuação</h2>
            <h3>{points.player.points}</h3>
            <h3>{context.name}</h3>
            <Campo
              points={points}
              changePoints={setPoints}
              player="player"
              playerGaming={playerGaming}
              setPlayerGaming={setPlayerGaming}
              seletedShip={ships}
              orientacao={orientacao}
              setSelectedShip={setShips}
              onChangeWin={setWin}
              restart={restart}
              changehandlerRestartStates={handlerRestartStates}
              changeRestart={setRestart}
              win={win}
              statusGame={statusGame}
              campoConfig={{ x: context.campSize, y: context.campSize }}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="content">
            <h2>Pontuação</h2>
            <h3>{points.IAzinha}</h3>
            <h3>IAzinha</h3>
            <Campo
              campoConfig={{ x: context.campSize, y: context.campSize }}
              points={points}
              playerGaming={playerGaming}
              setPlayerGaming={setPlayerGaming}
              changePoints={setPoints}
              statusGame={statusGame}
              orientacao="h"
              player="IAzinha"
              superTiro={superTiro}
              onChangeSuperTiro={setSuperTiro}
              restart={restart}
              changehandlerRestartStates={handlerRestartStates}
              changeRestart={setRestart}
              win={win}
              onChangeWin={setWin}
            />
          </div>
        </div>
      </div>
      <div className="options">
        <SelectShip
          orientacao={orientacao}
          statusGame={statusGame}
          onChangeOrientacao={setOrientacao}
          initialShips={ships}
          onChangeShip={setShips}
          onChangeSelectedShip={handlerSelectedShip}
          superTiro={superTiro}
          onChangeSuperTiro={setSuperTiro}
          playerGaming={playerGaming}
        />
        <div className="btns-play-game">
          <Botao
            text="Configurar Campo"
            onClick={handlerConfig}
          />
          <Botao
            text="Reiniciar"
            onClick={() => {
              handlerRestart();
            }}
          />
          <Botao
            text="Iniciar"
            onClick={() => handlerInicio()}
          />
        </div>
      </div>
    </div>
  );
};
