import { useRef, useState } from "react";

const isIntersecting = (c1, c2) => {
  const x1 = c1.x + c1.radius / 2;
  const y1 = c1.y + c1.radius / 2;
  const x2 = c2.x + c2.radius / 2;
  const y2 = c2.y + c2.radius / 2;

  const dx = x2 - x1;
  const dy = y2 - y1;

  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= (c1.radius + c2.radius) / 2;
};

const CircleTouch = () => {
  const [circles, setCircles] = useState([]);
  const whiteboardRef = useRef(null);

  const handleCanvasClick = (e) => {
    const rect = whiteboardRef.current.getBoundingClientRect();
    const radius = Math.floor(Math.random() * 40) + 30; // 30-70px

    const x = e.clientX - rect.left - radius / 2;
    const y = e.clientY - rect.top - radius / 2;

    const newCircle = { x, y, radius };

    setCircles((prev) => {
      const colideIndex = prev.findIndex((data) =>
        isIntersecting(data, newCircle),
      );

      if (colideIndex !== -1) {
        return prev.filter((_, index) => index !== colideIndex);
      }
      return [...prev, newCircle];
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "800px",
          alignItems: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Click to add circles. Click an existing circle to remove it.
        </p>
        <button className="btn-outline" onClick={() => setCircles([])}>
          Clear Canvas
        </button>
      </div>

      <div
        ref={whiteboardRef}
        className="whiteboard"
        onClick={handleCanvasClick}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {circles.map((circle, index) => (
          <div
            key={index}
            className="circle"
            style={{
              position: "absolute",
              top: `${circle.y}px`,
              left: `${circle.x}px`,
              width: `${circle.radius}px`,
              height: `${circle.radius}px`,
              borderRadius: "50%",
              transition: "transform 0.2s ease",
              pointerEvents: "none", // Let the canvas handle clicks
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CircleTouch;
