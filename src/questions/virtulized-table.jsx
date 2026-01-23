import { useEffect, useRef, useState } from "react";

const VirtulizedTable = ({ table = 1000 }) => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i));
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && items.length < table) {
        // Simulate loading more items
        setTimeout(() => {
          setItems((prev) => [
            ...prev,
            ...Array.from({ length: 20 }, (_, i) => prev.length + i),
          ]);
        }, 500);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [items.length, table]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "400px",
        overflowY: "auto",
        border: "1px solid var(--p-border)",
        borderRadius: "12px",
        bgcolor: "white",
      }}
    >
      <div style={{ padding: "0" }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: item % 2 === 0 ? "white" : "#f8fafc",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "var(--p-primary)",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
            >
              {item}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600", color: "var(--text-main)" }}>
                Item Row #{item}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Additional metadata for row {item}
              </div>
            </div>
          </div>
        ))}
        {items.length < table && (
          <div
            ref={loaderRef}
            style={{
              padding: "20px",
              textAlign: "center",
              color: "var(--p-primary)",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtulizedTable;
