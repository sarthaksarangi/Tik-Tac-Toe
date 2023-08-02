import React from "react";
import Square from "./Square";
import { useState } from "react";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] != null && state[a] == state[b] && state[b] == state[c]) {
        return state[a];
      }
    }
    if (state.every((square) => square !== null)) {
      return "Draw";
    }
    return false;
  };

  const isWinner = checkWinner();

  console.log(state);

  const handleClick = (index) => {
    if(state[index]!= null){
      return;
    }

    const copyState = [...state]; //copies all the elements of existing state using the spread operator
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState); //updates the original state with setState function

    setXTurn(!isXTurn);
  };
  return (
    <div className="board-container">
      {isWinner ? (
        <div style={{ textAlign: "center", marginTop: "15em" }}>
          {isWinner === "Draw" ? (
            <h1>It's a Draw!</h1>
          ) : (
            <h1> {isWinner} is the winner</h1>
          )}
          
          
          <button
            style={{
              border: "1px solid #fff",
              width: "100px",
              height: "40px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor:"pointer"
            }
          }
          onClick={()=>setState(Array(9).fill(null))}
          >
            Play Again!
          </button>
        </div>
      ) : (
        <>
        <h4 style={{textAlign:"center"}}>Player {isXTurn? "X":"O"} Turn.</h4>
          <div className="board-rows">
            <Square value={state[0]} onClick={() => handleClick(0)} />
            <Square value={state[1]} onClick={() => handleClick(1)} />
            <Square value={state[2]} onClick={() => handleClick(2)} />
          </div>
          <div className="board-rows">
            <Square value={state[3]} onClick={() => handleClick(3)} />
            <Square value={state[4]} onClick={() => handleClick(4)} />
            <Square value={state[5]} onClick={() => handleClick(5)} />
          </div>
          <div className="board-rows">
            <Square value={state[6]} onClick={() => handleClick(6)} />
            <Square value={state[7]} onClick={() => handleClick(7)} />
            <Square value={state[8]} onClick={() => handleClick(8)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
