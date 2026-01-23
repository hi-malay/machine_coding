import React, { useEffect, useRef, useState } from "react";

const BubblingCapturing = () => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  };

  useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;

    const captureHandler = (e) => {
      addLog(`[Capture] Parent Clicked - Phase: ${e.eventPhase}`);
    };

    const bubbleHandler = (e) => {
      addLog(`[Bubble] Child Clicked - Phase: ${e.eventPhase}`);
    };

    const delegationHandler = (e) => {
      if (e.target.tagName === "BUTTON") {
        addLog(`[Delegation] Button ${e.target.dataset.id} Clicked`);
      }
    };

    parent.addEventListener("click", captureHandler, true);
    parent.addEventListener("click", delegationHandler);
    child.addEventListener("click", bubbleHandler);

    return () => {
      parent.removeEventListener("click", captureHandler, true);
      parent.removeEventListener("click", delegationHandler);
      child.removeEventListener("click", bubbleHandler);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <div ref={parentRef} className="div-sec">
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Parent (Capturing + Delegation)
        </span>
        <div className="div-sec-b">
          <div ref={childRef} className="div-sec-c">
            Child (Bubbling)
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button className="btn-outline" data-id="1">
            Btn 1
          </button>
          <button className="btn-outline" data-id="2">
            Btn 2
          </button>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "300px" }}>
        <h4 style={{ marginBottom: "10px", fontSize: "0.9rem" }}>Event Log:</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {logs.map((log, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.8rem",
                padding: "6px 10px",
                backgroundColor: i === 0 ? "rgba(79, 70, 229, 0.1)" : "#f8fafc",
                borderRadius: "6px",
                border: "1px solid var(--p-border)",
                color: i === 0 ? "var(--p-primary)" : "var(--text-muted)",
              }}
            >
              {log}
            </div>
          ))}
          {logs.length === 0 && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Click elements above to see events...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BubblingCapturing;
