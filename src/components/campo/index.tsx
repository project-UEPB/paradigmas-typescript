/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Celula } from '../celula';
import {
  ships,
} from '../../utils/kindShips';
import { IAzona } from '../../utils/iazinha';

import './style.css';

const getShipSelected = (arr: Array<any>) => arr.filter((o) => o.selected)[0];
const removeOne = (kind: string, arr: Array<any>) => arr.filter((o) => o.kind !== kind);
const XRigthSideIsValid = (size: number, arr: Array<any>, x: number) => {
  for (let i = x; i < x + size; i++) {
    if (arr[i].ship.hasShip) return false;
  }

  return true;
};

type TypePlayer = {
  name: string;
  points: number;
}

type TypePoints = {
  player: TypePlayer;
  IAzinha: number;
};

type Props = {
  points: TypePoints;
  changePoints: (a: TypePoints) => any;
  player?: string;
  seletedShip?: any;
  statusGame?: any;
  orientacao?: any;
  setSelectedShip?: any;
  campoConfig?: any;
  playerGaming?: any;
  setPlayerGaming?: any;
  superTiro?: any;
  onChangeSuperTiro?: any;
  onChangeWin: (a: any) => any;
  changehandlerRestartStates: () => any;
  changeRestart: (a: boolean) => any;
  restart: any;
  win: any;
}



export const Campo = ({
  points,
  changePoints,
  player,
  seletedShip,
  statusGame,
  orientacao,
  setSelectedShip,
  campoConfig = {},
  playerGaming,
  setPlayerGaming,
  superTiro,
  onChangeSuperTiro,
  onChangeWin = () => {},
  changehandlerRestartStates = () => {},
  changeRestart = () => {},
  restart,
  win,
}: Props): any => {
  const handlerInitialCelulas = () => {
    const initialCelulas = new Array(campoConfig.x).fill(null).map(
      (_, i) => new Array(campoConfig.y).fill(null)
        .map((__, j) => ({
          open: !statusGame.inicio && player !== 'IAzinha' && statusGame.config,
          selected: false,
          x: j,
          y: i,
          ship: {
            hasShip: false,
            size: 0,
            kind: '',
            points: 25,
            imagePath: '',
            orientacao: 'h',
          },
        })),
    );

    return initialCelulas;
  };

  const [celulas, setCelulas] = useState(handlerInitialCelulas());
  const [selectedCels, setSelectedCels] = useState([]) as any;
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    if (restart) {
      setCelulas(handlerInitialCelulas());
      setSelectedCels([]);
      setWinner(false);
      changehandlerRestartStates();
      changeRestart(false);
    }
  }, [restart, handlerInitialCelulas, changeRestart, changehandlerRestartStates]);

  const handlerUpdateCelulas = (x: any, y: any, objUpdate: any) => {
    const copy = [...celulas];
    copy[y][x] = objUpdate;
    setCelulas(copy);
  };

  const isWin = () => {
    let qtdWin = (4 * 2) + (3 * 3) + (2 * 4) + 5;
    celulas.forEach((line) => line.forEach((cel) => {
      if (cel.open && cel.ship.hasShip) qtdWin--;
    }));
    return qtdWin === 0;
  };

  useEffect(() => {
    if (statusGame.inicio) {
      if (isWin() && !winner) {
        if (player !== 'IAzinha') {
          onChangeWin({ ...win, IAzinha: true });
          changePoints({
            ...points,
            IAzinha: points.IAzinha + 10000,
          } as any);
        }
        if (player !== 'player') {
          onChangeWin({ ...win, player: true });
          changePoints({
            ...points,
            player: {
              ...points.player, points: points.player.points + 10000,
            },
          } as any);
        }
        setWinner(true);
      }
    }
  }, [celulas]);

  const handlerConfigCels = (x: any, y: any) => {
    if (statusGame.config && getShipSelected(seletedShip)) {
      if (orientacao === 'h') {
        if (getShipSelected(seletedShip).qtd - 1 < 0) return;
        if (celulas[y][x].ship.hasShip) return;
        if (getShipSelected(seletedShip).size + x > campoConfig.x) return;

        const rightSideValid = XRigthSideIsValid(
          getShipSelected(seletedShip).size,
          celulas[y],
          x,
        );

        if (!rightSideValid) return;

        let firstCicle = true;
        for (let i = x; i < getShipSelected(seletedShip).size + x; i++) {
          handlerUpdateCelulas(
            i,
            y,
            {
              ...celulas[y][i],
              open: true,
              ship: {
                imagePath: firstCicle ? getShipSelected(seletedShip).imagePath : '',
                kind: getShipSelected(seletedShip).kind,
                points: getShipSelected(seletedShip).points,
                size: getShipSelected(seletedShip).size,
                hasShip: getShipSelected(seletedShip).hasShip,
                orientacao,
              },
            },
          );

          if (firstCicle) firstCicle = false;
        }
      } else if (orientacao === 'v') {
        if (getShipSelected(seletedShip).qtd - 1 < 0) return;
        if ((y + 1) - getShipSelected(seletedShip).size < 0) return;
        if (celulas[y][x].ship.hasShip) return;

        for (let l = y - getShipSelected(seletedShip).size + 1; l < y + 1; l++) {
          if (celulas[l][x].ship.hasShip) return;
        }

        let firstCicle = true;
        for (let i = y - getShipSelected(seletedShip).size + 1; i < y + 1; i++) {
          handlerUpdateCelulas(
            x,
            i,
            {
              ...celulas[i][x],
              open: true,
              ship: {
                imagePath: firstCicle ? getShipSelected(seletedShip).imagePath : '',
                kind: getShipSelected(seletedShip).kind,
                points: getShipSelected(seletedShip).points,
                size: getShipSelected(seletedShip).size,
                hasShip: getShipSelected(seletedShip).hasShip,
                orientacao,
              },
            },
          );

          if (firstCicle) firstCicle = false;
        }
      } else {
        // eslint-disable-next-line no-useless-return
        return;
      }

      setSelectedShip([
        ...removeOne(getShipSelected(seletedShip).kind, seletedShip),
        {
          ...getShipSelected(seletedShip),
          qtd: getShipSelected(seletedShip).qtd - 1,
        },
      ]);
    }
  };

  const closeCels = () => {
    const copy = [...celulas];
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].length; j++) {
        copy[i][j] = {
          ...celulas[i][j],
          open: false,
        };
      }
    }

    setCelulas(copy);
  };

  const handlerSelectedCels = (x: any, y: any) => {
    const copy = [...selectedCels] as any;
    type TypeCoords = {
      x: any;
      y: any;
    }
    const coord: TypeCoords = { x, y };
    copy.push(coord);
    setSelectedCels(copy);
    handlerUpdateCelulas(
      x,
      y,
      {
        ...celulas[y][x],
        selected: true,
      },
    );
  };

  const randomInitialShip = () => {
    let i = 0;
    while (i < 10) {
      const x = Math.abs(Math.floor(Math.random() * campoConfig.x - 1));
      const y = Math.abs(Math.floor(Math.random() * campoConfig.x - 1));

      if (x - ships[i].size < 0) continue;
      if (x + ships[i].size > campoConfig.x - 1) continue;

      let validSide = true;
      for (let j = x; j < ships[i].size + x; j++) {
        if (celulas[y][j].ship.hasShip) validSide = false;
      }

      for (let a = x - ships[i].size; a < x; a++) {
        if (celulas[y][a].ship.hasShip) validSide = false;
      }

      if (!validSide) continue;

      if (!celulas[y][x].ship.hasShip) {
        if (ships[i].size + x < campoConfig.x - 1) {
          let img = true;

          for (let k = x - ships[i].size; k < x; k++) {
            handlerUpdateCelulas(
              k,
              y,
              {
                y,
                x: k,
                open: false,
                ship: {
                  ...ships[i],
                  imagePath: img ? ships[i].imagePath : '',
                  orientacao: 'h',
                },
              },
            );
            img = false;
          }

          i++;
        }
      }
    }
  };

  const delay = (n: any) => {
    return new Promise(((resolve) => {
      setTimeout(resolve, n * 1000);
    }));
  };

  useEffect(() => {
    if (statusGame.config && !statusGame.inicio) {
      setCelulas(handlerInitialCelulas());
    }
  }, [statusGame.config]);

  useEffect(() => {
    if (statusGame.inicio) {
      closeCels();
    }

    if (player === 'IAzinha') randomInitialShip();
  }, [statusGame.inicio]);

  useEffect(() => {
    if (player === 'IAzinha' && selectedCels.length === 3) {
      let auxPoints = { ...points } as any;
      for (let i = 0; i < selectedCels.length; i++) {
        handlerUpdateCelulas(
          selectedCels[i].x,
          selectedCels[i].y,
          {
            ...celulas[selectedCels[i].y][selectedCels[i].x],
            open: true,
            selected: false,
          },
        );

        if (
          celulas[selectedCels[i].y][selectedCels[i].x].ship.hasShip
          && celulas[selectedCels[i].y][selectedCels[i].x].open
        ) {
          auxPoints = {
            ...auxPoints,
            player: {
              ...auxPoints.player,
              points: auxPoints.player.points
              + celulas[selectedCels[i].y][selectedCels[i].x].ship.points,
            },
          };
        } else if (
          !celulas[selectedCels[i].y][selectedCels[i].x].ship.hasShip
          && celulas[selectedCels[i].y][selectedCels[i].x].open
        ) {
          auxPoints = {
            ...auxPoints,
            player: {
              ...auxPoints.player,
              points: auxPoints.player.points
              - celulas[selectedCels[i].y][selectedCels[i].x].ship.points,
            },
          };
        }
      }

      changePoints(auxPoints);
      setSelectedCels([]);
      setPlayerGaming('IAzinha');
    }
  }, [selectedCels]);

  const handlerGame = (x: any, y: any) => {
    if (statusGame.config) handlerConfigCels(x, y);

    if (statusGame.inicio) {
      if (playerGaming === 'player' && !superTiro.player) {
        handlerSelectedCels(x, y);
      }

      if (playerGaming === 'player' && superTiro.player) {
        const selected = [{ x, y }];

        handlerSelectedCels(x, y);
        if (y - 1 >= 0 && x - 1 >= 0) {
          selected.push({
            x: x - 1,
            y: y - 1,
          });
          handlerSelectedCels(x - 1, y - 1);
        }
        if (y + 1 <= campoConfig.y - 1 && x + 1 <= campoConfig.x - 1) {
          selected.push({
            x: x + 1,
            y: y + 1,
          });
          handlerSelectedCels(x + 1, y + 1);
        }
        if (y - 1 >= 0 && x + 1 <= campoConfig.x - 1) {
          selected.push({
            x: x + 1,
            y: y - 1,
          });
          handlerSelectedCels(x + 1, y - 1);
        }
        if (y + 1 <= campoConfig.y - 1 && x - 1 >= 0) {
          selected.push({
            x: x - 1,
            y: y + 1,
          });
          handlerSelectedCels(x - 1, y + 1);
        }
        if (x - 1 >= 0) {
          selected.push({
            x: x - 1,
            y,
          });
          handlerSelectedCels(x - 1, y);
        }
        if (y - 1 >= 0) {
          selected.push({
            x,
            y: y - 1,
          });
          handlerSelectedCels(x, y - 1);
        }
        if (y + 1 <= campoConfig.y - 1) {
          selected.push({
            x,
            y: y + 1,
          });
          handlerSelectedCels(x, y + 1);
        }
        if (x + 1 <= campoConfig.x - 1) {
          selected.push({
            x: x + 1,
            y,
          });
          handlerSelectedCels(x + 1, y);
        }

        onChangeSuperTiro({ ...superTiro, [playerGaming]: null });

        let auxPoints = { ...points } as any;
        for (let i = 0; i < selected.length; i++) {
          handlerUpdateCelulas(
            selected[i].x,
            selected[i].y,
            {
              ...celulas[selected[i].y][selected[i].x],
              open: true,
              selected: false,
            },
          );

          if (
            celulas[selected[i].y][selected[i].x].ship.hasShip
              && celulas[selected[i].y][selected[i].x].open
          ) {
            auxPoints = {
              ...auxPoints,
              player: {
                ...auxPoints.player,
                points: auxPoints.player.points
                  + celulas[selected[i].y][selected[i].x].ship.points,
              },
            };
          } else if (
            !celulas[selected[i].y][selected[i].x].ship.hasShip
              && celulas[selected[i].y][selected[i].x].open
          ) {
            auxPoints = {
              ...auxPoints,
              player: {
                ...auxPoints.player,
                points: auxPoints.player.points
                  - celulas[selected[i].y][selected[i].x].ship.points,
              },
            };
          }
        }

        changePoints(auxPoints);
        setSelectedCels([]);
        setPlayerGaming('IAzinha');
      }
    }
  };

  useEffect(() => {
    const fnAux = async () => {
      if (playerGaming === 'IAzinha' && player === 'player') {
        const celsSelected = IAzona(celulas, campoConfig.x);
        celsSelected.forEach((element) => {
          handlerUpdateCelulas(
            element.x,
            element.y,
            {
              ...celulas[element.y][element.x],
              selected: true,
            },
          );
        });

        if (player === 'player' && celsSelected.length === 3) {
          let auxPoints = { ...points } as any;
          for (let i = 0; i < celsSelected.length; i++) {
            await delay(1);

            handlerUpdateCelulas(
              celsSelected[i].x,
              celsSelected[i].y,
              {
                ...celulas[celsSelected[i].y][celsSelected[i].x],
                open: true,
                selected: false,
              },
            );

            if (
              celulas[celsSelected[i].y][celsSelected[i].x].ship.hasShip
              && celulas[celsSelected[i].y][celsSelected[i].x].open
            ) {
              auxPoints = {
                ...auxPoints,
                IAzinha: auxPoints.IAzinha
                  + celulas[celsSelected[i].y][celsSelected[i].x].ship.points,
              };
            } else if (
              !celulas[celsSelected[i].y][celsSelected[i].x].ship.hasShip
              && celulas[celsSelected[i].y][celsSelected[i].x].open
            ) {
              auxPoints = {
                ...auxPoints,
                IAzinha: auxPoints.IAzinha
                  - celulas[celsSelected[i].y][celsSelected[i].x].ship.points,
              };
            }
          }

          changePoints(auxPoints);
          setPlayerGaming('player');
        }
      }
    };

    fnAux();
  }, [playerGaming]);
  
  return (
    <div className={campoConfig.x === 16 ? 'campo campo-16x16' : 'campo campo-12x12'}>
      {celulas.map((line, y) => line.map((configCel, x) => {
        return (
          <Celula
            statusGame={statusGame}
            key={(x ** 2) + y}
            configCel={configCel}
            xy={{ x, y }}
            onOpen={() => handlerGame(x, y)}
          /> 
        )
      }))}
    </div>
  );
};
