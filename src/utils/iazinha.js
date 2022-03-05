const isEqual = (array, element) => array.find((item) => item.x === element.x
&& item.y === element.y);

export const IAzona = (shipsAll, campConfig) => {
  const positionsOpeneds = [];
  const nextPostions = [];

  shipsAll.map((line) => {
    line.map((object) => {
      if (object.open) {
        // console.log(object);
        positionsOpeneds.push({
          x: object.x,
          y: object.y,
          orientacao: object.ship.orientacao,
          kind: object.ship.kind,
        });
      }
    });
  });

  let i = 0;
  while (i < positionsOpeneds.length) {
    if (positionsOpeneds[i].orientacao === 'h') {
      if (positionsOpeneds[i].x - 2 >= 0) {
        if (shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x - 2].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x - 2].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x - 2,
            y: positionsOpeneds[i].y,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x - 2,
              y: positionsOpeneds[i].y,
            });
          }
        }
      }
      if (positionsOpeneds[i].x - 1 >= 0) {
        if (shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x - 1].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x - 1].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x - 1,
            y: positionsOpeneds[i].y,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x - 1,
              y: positionsOpeneds[i].y,
            });
          }
        }
      }
      if (positionsOpeneds[i].x + 1 <= campConfig - 1) {
        if (shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x + 1].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x + 1].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x + 1,
            y: positionsOpeneds[i].y,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x + 1,
              y: positionsOpeneds[i].y,
            });
          }
        }
      }
      if (positionsOpeneds[i].x + 2 <= campConfig - 1) {
        if (shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x + 2].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y][positionsOpeneds[i].x + 2].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x + 2,
            y: positionsOpeneds[i].y,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x + 2,
              y: positionsOpeneds[i].y,
            });
          }
        }
      }
    }

    if (positionsOpeneds[i].orientacao === 'v') {
      if (positionsOpeneds[i].y - 2 >= 0) {
        if (shipsAll[positionsOpeneds[i].y - 2][positionsOpeneds[i].x].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y - 2][positionsOpeneds[i].x].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x,
            y: positionsOpeneds[i].y - 2,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x,
              y: positionsOpeneds[i].y - 2,
            });
          }
        }
      }
      if (positionsOpeneds[i].y - 1 >= 0) {
        if (shipsAll[positionsOpeneds[i].y - 1][positionsOpeneds[i].x].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y - 1][positionsOpeneds[i].x].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x,
            y: positionsOpeneds[i].y - 1,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x,
              y: positionsOpeneds[i].y - 1,
            });
          }
        }
      }
      if (positionsOpeneds[i].y + 1 <= campConfig - 1) {
        if (shipsAll[positionsOpeneds[i].y + 1][positionsOpeneds[i].x].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y + 1][positionsOpeneds[i].x].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x,
            y: positionsOpeneds[i].y + 1,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x,
              y: positionsOpeneds[i].y + 1,
            });
          }
        }
      }
      if (positionsOpeneds[i].y + 2 <= campConfig - 1) {
        if (shipsAll[positionsOpeneds[i].y + 2][positionsOpeneds[i].x].ship.hasShip
          && !shipsAll[positionsOpeneds[i].y + 2][positionsOpeneds[i].x].open) {
          const equal = isEqual(nextPostions, {
            x: positionsOpeneds[i].x,
            y: positionsOpeneds[i].y + 2,
          });
          if (!equal) {
            nextPostions.push({
              x: positionsOpeneds[i].x,
              y: positionsOpeneds[i].y + 2,
            });
          }
        }
      }
    }

    i++;
  }

  if (nextPostions.length >= 3) {
    return nextPostions.slice(0, 3);
  }
  if (nextPostions.length === 2) {
    const xAux = Math.abs(Math.floor(Math.random() * campConfig));
    const yAux = Math.abs(Math.floor(Math.random() * campConfig));
    nextPostions.push({ x: xAux, y: yAux });

    return nextPostions;
  }
  if (nextPostions.length === 1) {
    for (let j = 0; j < 2; j++) {
      const xAux = Math.abs(Math.floor(Math.random() * campConfig));
      const yAux = Math.abs(Math.floor(Math.random() * campConfig));
      nextPostions.push({ x: xAux, y: yAux });
    }

    return nextPostions;
  }

  for (let j = 0; j < 3; j++) {
    const xAux = Math.abs(Math.floor(Math.random() * campConfig));
    const yAux = Math.abs(Math.floor(Math.random() * campConfig));
    nextPostions.push({ x: xAux, y: yAux });
  }

  return nextPostions;
};
