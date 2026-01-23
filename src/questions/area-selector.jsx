import React, { useState } from "react";

const AreaSelector = ({ row, col }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [selectedCells, setSelectedCells] = useState({});

  const handleMouseEnter = (i, j) => {
    if (mouseDown) {
      const index = `${i}-${j}`;
      setSelectedCells((prev) => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const handleMouseDown = (i, j) => {
    setMouseDown(true);
    const index = `${i}-${j}`;
    setSelectedCells((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  return (
    <div
      className="area-selector-grid"
      style={{
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        width: `${col * 40}px`,
      }}
      onMouseLeave={() => setMouseDown(false)}
    >
      {Array.from({ length: row }).map((_, i) =>
        Array.from({ length: col }).map((_, j) => {
          const index = `${i}-${j}`;
          return (
            <div
              key={index}
              className={`area-cell ${selectedCells[index] ? "selected" : ""}`}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseEnter={() => handleMouseEnter(i, j)}
              onMouseUp={handleMouseUp}
            >
              {index}
            </div>
          );
        }),
      )}
    </div>
  );
};

export default AreaSelector;
