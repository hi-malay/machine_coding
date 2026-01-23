import React from "react";

const NestedCheckBox = ({ data, checkbox, setCheckbox }) => {
  const toggleCheckbox = (id, children, newValue) => {
    let updates = { [id]: newValue };

    const recurse = (items) => {
      items.forEach((item) => {
        updates[item.id] = newValue;
        if (item.children) recurse(item.children);
      });
    };

    if (children) recurse(children);
    setCheckbox((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {data.map((item) => (
        <div key={item.id} style={{ margin: "8px 0" }}>
          <div className="folder-label" style={{ padding: "6px 10px" }}>
            <input
              type="checkbox"
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
              checked={!!checkbox[item.id]}
              onChange={(e) =>
                toggleCheckbox(item.id, item.children, e.target.checked)
              }
            />
            <span style={{ fontSize: "1rem", fontWeight: "500" }}>
              {item.label}
            </span>
          </div>

          {item.children && (
            <div
              style={{
                marginLeft: "32px",
                borderLeft: "1px solid var(--border)",
              }}
            >
              <NestedCheckBox
                data={item.children}
                checkbox={checkbox}
                setCheckbox={setCheckbox}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedCheckBox;
