"use client"

import { useState } from "react";
import Cell from "./Cell";

class CellInfo {
  id: number;
  state: string;

  constructor(id: number, state: string) {
    this.id = id;
    this.state = state;
  }
}

function getInitialBoardState(){
  const initialState: CellInfo[] = [];
  const initialValue: string = "";

  for (let i = 0; i < 9; i++) {
      initialState.push(new CellInfo(i, initialValue));
  }

  return initialState;
}

function Board() {
  const [currentState, setCurrentState] = useState(getInitialBoardState);
  const currentMove: string = "X"

  function makeMove(cellId: number){
    console.log(`Move id: ${cellId}`);

    setCurrentState(currentState.map(cell => {
      if (cell.id === cellId){
        return { ...cell, state: currentMove };
      }

      return cell;
    }))
  }

  const cells = currentState.map((cellInfo) => (
    <Cell key={cellInfo.id} state={cellInfo.state} moveHandler={() => makeMove(cellInfo.id)}/>
  ));

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 grid-rows-3 border-2">{cells}</div>
      <span className="my-1 font-semibold">Current move: {currentMove}</span>
    </div>
  );
}

export default Board;
