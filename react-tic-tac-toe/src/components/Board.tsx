"use client";

import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";

type CellInfo = {
  id: number;
  state: string;
};

type WinningLineParams = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

function checkWin(board: CellInfo[], playerSymbol: string) {
  if (playerSymbol === "") {
    return null;
  }

  console.log("Check win for " + playerSymbol);

  if (
    board[0].state === playerSymbol &&
    board[1].state === playerSymbol &&
    board[2].state === playerSymbol
  ) {
    return { x1: "10%", y1: "25%", x2: "90%", y2: "25%" };
  } else if (
    board[3].state === playerSymbol &&
    board[4].state === playerSymbol &&
    board[5].state === playerSymbol
  ) {
    return { x1: "10%", y1: "50%", x2: "90%", y2: "50%" };
  } else if (
    board[6].state === playerSymbol &&
    board[7].state === playerSymbol &&
    board[8].state === playerSymbol
  ) {
    return { x1: "10%", y1: "75%", x2: "90%", y2: "75%" };
  } else if (
    board[0].state === playerSymbol &&
    board[3].state === playerSymbol &&
    board[6].state === playerSymbol
  ) {
    return { x1: "25%", y1: "10%", x2: "25%", y2: "90%" };
  } else if (
    board[1].state === playerSymbol &&
    board[4].state === playerSymbol &&
    board[7].state === playerSymbol
  ) {
    return { x1: "50%", y1: "10%", x2: "50%", y2: "90%" };
  } else if (
    board[2].state === playerSymbol &&
    board[5].state === playerSymbol &&
    board[8].state === playerSymbol
  ) {
    return { x1: "75%", y1: "10%", x2: "75%", y2: "90%" };
  } else if (
    board[0].state === playerSymbol &&
    board[4].state === playerSymbol &&
    board[8].state === playerSymbol
  ) {
    return { x1: "10%", y1: "10%", x2: "90%", y2: "90%" };
  } else if (
    board[2].state === playerSymbol &&
    board[4].state === playerSymbol &&
    board[6].state === playerSymbol
  ) {
    return { x1: "90%", y1: "10%", x2: "10%", y2: "90%" };
  } else {
    console.log("No win found");
    return null;
  }
}

function getInitialBoardState() {
  const initialState: CellInfo[] = [];
  const initialValue: string = "";

  for (let i = 0; i < 9; i++) {
    initialState.push({ id: i, state: initialValue });
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
    let winningLine = checkWin(currentState, previousMove);
    if (winningLine != null) {
      setWin(winningLine);
    }
  }, [previousMove]);

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
        {win === null
          ? "Current move: " + currentMove
          : "Winner: " + previousMove}
      </span>
    </div>
  );
}

export default Board;
