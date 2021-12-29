import React, { useCallback, useEffect, useState } from "react";
import GridDiv from "./StyleComponent";
import { randomCells } from "./utils";

const Grid = () => {
  const totalCell = 10000;
  const [cells, setCells] = useState(randomCells(totalCell));
  const [side] = useState(100);
  const [time, setTime] = useState(Date.now());
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const reCalculate = useCallback(() => {
    const newArr = cells.map((cell) => {
      const neighbors = getNeighbors(side, cell.id);

      let count = 0;
      neighbors.forEach((neighbor) => {
        if (cells[neighbor - 1].isAlive) {
          count += 1;
        }
      });

      if (count < 2 && cell.isAlive) {
        cell.isAlive = false;
        return cell;
      }

      if ((count === 2 || count === 3) && cell.isAlive) {
        return cell;
      }

      if (cell.isAlive && count > 3) {
        cell.isAlive = false;
        return cell;
      }

      if (count === 3 && !cell.isAlive) {
        cell.isAlive = true;
        return cell;
      }

      return cell;
    });

    setCells(newArr);
  }, [cells, side]);

  const getNeighbors = (side, id) => {
    let isTopSide = false;
    let isRightSide = false;
    let isBottomSide = false;
    let isLeftSide = false;

    let isTopLeft = false;
    let isTopRight = false;
    let isBottomLeft = false;
    let isBottomRight = false;

    switch (true) {
      case id <= side:
        isTopSide = true;
        break;

      case id >= side * (side - 1) + 1:
        isBottomSide = true;
        break;

      case id % side === 1:
        isLeftSide = true;
        break;

      case id % side === 0:
        isRightSide = true;
        break;

      default:
    }

    switch (id) {
      case 1:
        isTopLeft = true;
        break;

      case side:
        isTopRight = true;
        break;

      case side * (side - 1) + 1:
        isBottomLeft = true;
        break;

      case side * side:
        isBottomRight = true;
        break;

      default:
    }

    if (isTopLeft) {
      // console.log("isTopLeft");
      return [id + 1, id + side, id + side + 1];
    }

    if (isTopRight) {
      // console.log("isTopRight");
      return [id - 1, id + side, id + side - 1];
    }

    if (isBottomLeft) {
      // console.log("isBottomLeft");
      return [id + 1, id - side, id - side + 1];
    }

    if (isBottomRight) {
      // console.log("isBottomRight");
      return [id - 1, id - side, id - side - 1];
    }

    if (isTopSide) {
      // console.log("isTopSide");
      return [id - 1, id + 1, id + side, id + side - 1, id + side + 1];
    }

    if (isBottomSide) {
      // console.log("isBottomSide");
      return [id - 1, id + 1, id - side, id - side - 1, id - side + 1];
    }

    if (isLeftSide) {
      // console.log("isLeftSide");
      return [id + 1, id + side, id - side, id + side + 1, id - side + 1];
    }

    if (isRightSide) {
      // console.log("isRightSide");
      return [id - 1, id + side, id - side, id + side - 1, id - side - 1];
    }

    return [
      id + 1,
      id - 1,
      id + side,
      id - side,
      id + side - 1,
      id + side + 1,
      id - side - 1,
      id - side + 1,
    ];
  };

  useEffect(() => {
    if (isRunning) {
      setGeneration(generation + 1);
      const interval = setInterval(() => setTime(Date.now()), 1);
      reCalculate();
      return () => {
        clearInterval(interval);
      };
    }
  }, [time, isRunning, generation, reCalculate]);

  return (
    <div>
      <h1>Generation: {generation}</h1>
      <button
        type="button"
        onClick={() => {
          setIsRunning(true);
        }}
      >
        Start
      </button>
      <button
        type="button"
        onClick={() => {
          setIsRunning(false);
        }}
      >
        Stop
      </button>
      <button
        type="button"
        onClick={() => {
          setIsRunning(false);
          setGeneration(0);
          setCells(randomCells(totalCell));
        }}
      >
        Reset
      </button>
      <GridDiv side={side}>
        {cells.map((cell) => (
          <div
            key={cell.id}
            style={{
              backgroundColor: `${cell.isAlive ? "black" : "white"}`,
              borderTop: "1px solid black",
              borderRight: "1px solid black",
              // borderLeft: "1px solid black",
            }}
          ></div>
        ))}
      </GridDiv>
    </div>
  );
};

export default Grid;
