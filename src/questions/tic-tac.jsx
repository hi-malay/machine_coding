import { useState, useEffect } from "react";

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

const TicTacToe = () => {
  const [board, setBoard] = useState([...Array(9).fill(null)]);
  const [isNext, setIsNext] = useState(true);
  const [gameOver, setGameOver] = useState({
    over: false,
    winner: null,
    isDraw: false,
  });

  const handleClick = (index) => {
    if (board[index] || gameOver.over) return;
    const newBoard = [...board];
    newBoard[index] = isNext ? "X" : "O";
    setBoard(newBoard);
    setIsNext(!isNext);
  };

  useEffect(() => {
    let winnerFound = false;
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver({ over: true, winner: board[a], isDraw: false });
        winnerFound = true;
        break;
      }
    }
    if (!winnerFound && board.every((cell) => cell !== null)) {
      setGameOver({ over: true, winner: null, isDraw: true });
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsNext(true);
    setGameOver({ over: false, winner: null, isDraw: false });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        className="grid-container"
        style={{ gridTemplateColumns: "repeat(3, 80px)" }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            className={`grid-cell ${cell ? "active" : ""}`}
            onClick={() => handleClick(index)}
            style={{ color: cell === "X" ? "#ef4444" : "#6366f1" }}
          >
            {cell}
          </div>
        ))}
      </div>

      {gameOver.over && (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "var(--text-main)", marginBottom: "10px" }}>
            {gameOver.isDraw ? "It's a Draw!" : `Winner: ${gameOver.winner}`}
          </h2>
          <button
            onClick={resetGame}
            style={{ backgroundColor: "var(--primary)" }}
          >
            Play Again
          </button>
        </div>
      )}

      {!gameOver.over && (
        <p style={{ color: "var(--text-muted)" }}>
          Next Player:{" "}
          <span style={{ color: "var(--text-main)", fontWeight: "bold" }}>
            {isNext ? "X" : "O"}
          </span>
        </p>
      )}
    </div>
  );
};

export default TicTacToe;
