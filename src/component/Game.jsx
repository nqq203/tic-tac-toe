import Board from "./Board";
import { useEffect, useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), movePos: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [isStart, setIsStart] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const movePos = `(${row + 1}, ${col + 1})`;
    const nextHistory = history.slice(0, currentMove + 1).concat([{ squares: nextSquares, movePos }]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    console.log(nextMove);
    if (nextMove === 0) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
    setCurrentMove(nextMove);
  }

  function toggleSortOrder(e) {
    setIsAscending(e.target.value === 'asc');
  }

  useEffect(() => {
    // const tmp = history[history.length - 1];
    // const start = tmp != null ? tmp.filter(element => element === null) : null;
    // if (start.length === 9 && start !== null) {
    //   setIsStart(false);
    // }
    if (history) {
      const tmp = history[history.length - 1].squares.filter(element => element === null);
      if (tmp.length !== 9) {
        setIsStart(false);
      }
    }
  }, [history])

  const sortedMoves = isAscending ? history : [...history].reverse();
  const moves = sortedMoves.map((step, move) => {
    const actualMove = isAscending ? move : history.length - 1 - move;
    const description = step.movePos
      ? `Go to move #${actualMove} at ${step.movePos}`
      : 'Go to game start';
    return (
      <li key={actualMove}>
        {currentMove === actualMove ? (
          (isStart ?
            <span aria-disabled>{`You are at game start`}</span> :
            <span aria-disabled>{`You are at move #${actualMove} ${step.movePos !== null ? step.movePos : ''}`}</span>
          )
        ) : (
          <button onClick={() => jumpTo(actualMove)}>{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={(squares, index) => handlePlay(squares, index)} />
      </div>
      <div className="game-info">
        <select name="order" onChange={toggleSortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
