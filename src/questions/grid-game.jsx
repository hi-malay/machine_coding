import { useEffect, useRef, useState } from "react";

const GridGame = ({ list = 16 }) => {
  const [open, setOpen] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const bombIndex = useRef(Math.floor(Math.random() * list));

  const openBox = (index) => {
    if (gameOver || open.includes(index)) return;

    setOpen((prev) => [...prev, index]);

    if (index === bombIndex.current) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setOpen([]);
    setGameOver(false);
    bombIndex.current = Math.floor(Math.random() * list);
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
        style={{ gridTemplateColumns: `repeat(${Math.sqrt(list)}, 1fr)` }}
      >
        {[...Array(list)].map((_, index) => (
          <div
            key={index}
            className={`grid-cell ${open.includes(index) ? "active" : ""}`}
            onClick={() => openBox(index)}
            style={{
              backgroundColor:
                gameOver && index === bombIndex.current ? "#ef4444" : undefined,
              borderColor:
                gameOver && index === bombIndex.current ? "#ef4444" : undefined,
            }}
          >
            {open.includes(index)
              ? index === bombIndex.current
                ? "💣"
                : "💎"
              : ""}
          </div>
        ))}
      </div>

      {gameOver && (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#ef4444", marginBottom: "10px" }}>
            BOOM! You Lost!
          </h2>
          <button className="btn-primary" onClick={resetGame}>
            Try Again
          </button>
        </div>
      )}

      {!gameOver && open.length === list - 1 && (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#22c55e", marginBottom: "10px" }}>
            You Won! 🏆
          </h2>
          <button className="btn-primary" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GridGame;
