import { Button } from "../components/ui/button";
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
    <section className="stopwatch-container" aria-labelledby="stopwatch-title">
      <div className="stopwatch-display" role="timer" aria-live="polite">
        <span>{hours.toString().padStart(2, "0")}</span>:
        <span>{minutes.toString().padStart(2, "0")}</span>:
        <span>{secondsLocal.toString().padStart(2, "0")}</span>
      </div>

      <div className="stopwatch-btn-group">
        <Button
          onClick={start}
          style={{ backgroundColor: "var(--p-primary)" }}
          aria-label="Start stopwatch"
        >
          Start
        </Button>
        <Button
          onClick={stop}
          style={{ backgroundColor: "#334155" }}
          aria-label="Stop stopwatch"
        >
          Stop
        </Button>
        <Button
          onClick={reset}
          style={{ backgroundColor: "#ef4444" }}
          aria-label="Reset stopwatch"
        >
          Reset
        </Button>
      </div>
    </section>
  );
};

export default Stopwatch;
