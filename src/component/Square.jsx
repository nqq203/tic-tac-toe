export default function Square({value, onSquareClick, style }) {
  return (
    <button style={style} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}