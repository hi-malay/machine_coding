import { useRef, useState, useEffect } from "react";

const Multiprogress = () => {
  const [progresses, setProgresses] = useState([]);
  const activeIntervals = useRef({});

  const addProgress = () => {
    const id = Date.now();
    setProgresses((prev) => [...prev, { id, value: 0 }]);

    const interval = setInterval(() => {
      setProgresses((prev) => {
        const item = prev.find((p) => p.id === id);
        if (item && item.value < 100) {
          return prev.map((p) =>
            p.id === id ? { ...p, value: p.value + 2 } : p,
          );
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 100);

    activeIntervals.current[id] = interval;
  };

  useEffect(() => {
    const intervals = activeIntervals.current;
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <button
        onClick={addProgress}
        style={{
          backgroundColor: "var(--primary)",
          padding: "12px 24px",
          fontSize: "1rem",
          boxShadow: "0 4px 6px -1px var(--primary)",
        }}
      >
        + Add New Progress Bar
      </button>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {progresses.map((data) => (
          <div key={data.id} className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${data.value}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiprogress;
