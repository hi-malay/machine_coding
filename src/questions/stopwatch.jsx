import React, { useRef, useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLocal = seconds % 60;

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-display">
        <span>{hours.toString().padStart(2, "0")}</span>:
        <span>{minutes.toString().padStart(2, "0")}</span>:
        <span>{secondsLocal.toString().padStart(2, "0")}</span>
      </div>

      <div className="stopwatch-btn-group">
        <button onClick={start} style={{ backgroundColor: "var(--p-primary)" }}>
          Start
        </button>
        <button onClick={stop} style={{ backgroundColor: "#334155" }}>
          Stop
        </button>
        <button onClick={reset} style={{ backgroundColor: "#ef4444" }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
