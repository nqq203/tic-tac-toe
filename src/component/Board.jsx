import Square from "./Square";
import { useEffect, useState } from "react";

export default function Board({ xIsNext, squares, onPlay }) {
  const [status, setStatus] = useState('Next player: ' + (xIsNext ? 'X' : 'O'));
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  useEffect(() => {
    if (squares.length > 0) {
      const end = squares?.filter(element => element === null);
      if (winner?.player) {
        setStatus('Winner: ' + winner.player);
      } else if (end.length === 0) {
        setStatus('Draw match')
      } else {
        setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
      }
    }
  }, [squares, xIsNext, winner?.player]);

  const rows = generateMatrix(squares, 3, handleClick, winner);

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        squares: [a, b, c],
      };
    }
  }
  return null;
}


function generateMatrix(squares, size, onSquareClick, winner) {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(
      <div className="board-row" key={i}>
        {squares
          .slice(i * size, i * size + size)
          .map((square, index) => {
            return <>
              {winner !== null && (i * size + index === winner?.squares[0] || i * size + index === winner?.squares[1] || i * size + index === winner?.squares[2]) ?
                <Square
                  key={i * size + index}
                  value={square}
                  onSquareClick={() => onSquareClick(i * size + index)}
                  style={{ backgroundColor: 'yellow' }}
                /> :
                <Square
                  key={i * size + index}
                  value={square}
                  onSquareClick={() => onSquareClick(i * size + index)}
                />}
            </>
          })}
      </div>
    );
  }
  return rows;
}