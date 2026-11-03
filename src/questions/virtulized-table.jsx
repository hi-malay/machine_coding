import { useState } from "react";

const VirtualizedTable = ({ table = 1000 }) => {
  const ROW_HEIGHT = 60;
  const CONTAINER_HEIGHT = 400;
  const OVERSCAN = 5;

  const [scrollTop, setScrollTop] = useState(0);

  const items = Array.from({ length: table }, (_, i) => i);

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;

  const endIndex = Math.min(table, startIndex + visibleCount);

  // Render only visible items
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        width: "100%",
        maxWidth: "500px",
        height: CONTAINER_HEIGHT,
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          height: startIndex * ROW_HEIGHT,
        }}
      />

      {visibleItems.map((item) => (
        <div
          key={item}
          style={{
            height: ROW_HEIGHT,
            boxSizing: "border-box",
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: item % 2 === 0 ? "white" : "#f8fafc",
          }}
        >
          <span>{item}</span>
          <div>
            <strong>Item Row #{item}</strong>
            <div>Additional metadata for row {item}</div>
          </div>
        </div>
      ))}

      <div
        style={{
          height: (table - endIndex) * ROW_HEIGHT,
        }}
      />
    </div>
  );
};

export default VirtualizedTable;
