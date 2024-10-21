import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turnO, setTurnO] = useState(true);
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [count, setCount] = useState(0);

  const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] === '' && !isGameOver) {
      const newBoard = [...board];//spread oprator
      newBoard[index] = turnO ? 'O' : 'X';
      setBoard(newBoard);
      setTurnO(!turnO);
      setCount(count + 1);

      if (checkWinner(newBoard)) {
        setMessage(`Winner is ${newBoard[index]}`);
        setIsGameOver(true);
      } else if (count === 8) {
        setMessage('Game is a draw, please reset the game');
        setIsGameOver(true);
      }
    }
  };

  const checkWinner = (board) => {
    for (let pattern of winPattern) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setTurnO(true);
    setMessage('');
    setIsGameOver(false);
    setCount(0);
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="btn"
            onClick={() => handleClick(index)}
            disabled={value !== '' || isGameOver}
          >
            {value}
          </button>
        ))}
      </div>

      {message && <div id="msg-container">{message}</div>}

      <div className="controls">
        <button id="reset" onClick={resetGame}>
          Reset Game
        </button>
        <button id="newGame" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;