"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Cell from "./Cell";

class CellInfo {
  id: number;
  state: string;

  constructor(id: number, state: string) {
    this.id = id;
    this.state = state;
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
  const nextMove = useRef(getNextMoveGenerator(["X", "O"])).current;
  const [currentMove, setCurrentMove] = useState("");

  useEffect(() => {
    setCurrentMove(nextMove.next().value);
  }, []);

  function makeMove(cellId: number) {
    setCurrentState((currentState) =>
      currentState.map((cell) => {
        if (cell.id === cellId) {
          return { ...cell, state: currentMove };
        }

        return cell;
      })
    );

    setCurrentMove(nextMove.next().value);
  }

  const cells = currentState.map((cellInfo) => (
    <Cell
      key={cellInfo.id}
      state={cellInfo.state}
      moveHandler={() => makeMove(cellInfo.id)}
    />
  ));

  if (!currentMove) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="grid grid-cols-3 grid-rows-3 border-2 w-32">
        <svg className="absolute visible">
          <line
            x1="10%"
            y1="10%"
            x2={300}
            y2={300}
            style={{ stroke: "white", strokeWidth: "3px" }}
          />
        </svg>
        {cells}
      </div>
      <span className="my-1 font-semibold">Current move: {currentMove}</span>
    </div>
  );
}

export default Board;
