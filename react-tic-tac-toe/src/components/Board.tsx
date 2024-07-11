"use client";

import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";

class CellInfo {
  id: number;
  state: string;

  constructor(id: number, state: string) {
    this.id = id;
    this.state = state;
  }
}

class WinningLineParams {
  x1: string;
  y1: string;
  x2: string;
  y2: string;

  constructor(x1: string, y1: string, x2: string, y2: string) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

function getInitialBoardState() {
  const initialState: CellInfo[] = [];
  const initialValue: string = "";

  for (let i = 0; i < 9; i++) {
    initialState.push(new CellInfo(i, initialValue));
  }

  return initialState;
}

function* getNextMoveGenerator(validMoves: string[]): Generator<string> {
  let index = Math.floor(Math.random() * 2);

  while (true) {
    yield validMoves[index];
    index = ++index % 2;
  }
}

function Board() {
  const [currentState, setCurrentState] = useState(getInitialBoardState);
  const getNextMove = useRef(getNextMoveGenerator(["X", "O"])).current;
  const [currentMove, setCurrentMove] = useState("");
  const [previousMove, setPreviousMove] = useState("");
  const [win, setWin] = useState<WinningLineParams | null>(null);

  useEffect(() => setCurrentMove(getNextMove.next().value), []);

  useEffect(() => {
    let winningLine = checkWin(previousMove);
    if (winningLine != null) {
      setWin(winningLine);
    }
  }, [previousMove]);

  function checkWin(playerSymbol: string) {
    if (playerSymbol === "") {
      return null;
    }

    console.log("Check win for " + playerSymbol);

    if (
      currentState[0].state === playerSymbol &&
      currentState[1].state === playerSymbol &&
      currentState[2].state === playerSymbol
    ) {
      return new WinningLineParams("10%", "25%", "90%", "25%");
    } else if (
      currentState[3].state === playerSymbol &&
      currentState[4].state === playerSymbol &&
      currentState[5].state === playerSymbol
    ) {
      return new WinningLineParams("10%", "50%", "90%", "50%");
    } else if (
      currentState[6].state === playerSymbol &&
      currentState[7].state === playerSymbol &&
      currentState[8].state === playerSymbol
    ) {
      return new WinningLineParams("10%", "75%", "90%", "75%");
    } else if (
      currentState[0].state === playerSymbol &&
      currentState[3].state === playerSymbol &&
      currentState[6].state === playerSymbol
    ) {
      return new WinningLineParams("25%", "10%", "25%", "90%");
    } else if (
      currentState[1].state === playerSymbol &&
      currentState[4].state === playerSymbol &&
      currentState[7].state === playerSymbol
    ) {
      return new WinningLineParams("50%", "10%", "50%", "90%");
    } else if (
      currentState[2].state === playerSymbol &&
      currentState[5].state === playerSymbol &&
      currentState[8].state === playerSymbol
    ) {
      return new WinningLineParams("75%", "10%", "75%", "90%");
    } else if (
      currentState[0].state === playerSymbol &&
      currentState[4].state === playerSymbol &&
      currentState[8].state === playerSymbol
    ) {
      return new WinningLineParams("10%", "10%", "90%", "90%");
    } else if (
      currentState[2].state === playerSymbol &&
      currentState[4].state === playerSymbol &&
      currentState[6].state === playerSymbol
    ) {
      return new WinningLineParams("90%", "10%", "10%", "90%");
    } else {
      console.log("No win found");
      return null;
    }
  }

  function makeMove(cellId: number) {
    setCurrentState((currentState) =>
      currentState.map((cell) => {
        if (cell.id === cellId) {
          return { ...cell, state: currentMove };
        }

        return cell;
      })
    );

    setPreviousMove(currentMove);
    setCurrentMove(getNextMove.next().value);
  }

  const cells = currentState.map((cellInfo) => (
    <Cell
      key={cellInfo.id}
      state={cellInfo.state}
      moveHandler={() => makeMove(cellInfo.id)}
    />
  ));

  // wait for starting move to be determined
  if (!currentMove) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="grid grid-cols-3 grid-rows-3 border-2 w-32">
        {win && (
          <svg className="absolute w-32 aspect-square visible">
            (
            <line
              x1={win.x1}
              y1={win.y1}
              x2={win.x2}
              y2={win.y2}
              style={{ stroke: "white", strokeWidth: "3px" }}
            />
            )
          </svg>
        )}
        {cells}
      </div>
      <span className="my-1 font-semibold">
        {win == null
          ? "Current move: " + currentMove
          : "Winner: " + previousMove}
      </span>
    </div>
  );
}

export default Board;
