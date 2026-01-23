import { Checkbox } from "../components/ui/checkbox";
import React from "react";

const NestedCheckBox = ({ data, checkbox, setCheckbox }) => {
  const toggleCheckbox = (id, children, newValue) => {
    setCheckbox((prev) => {
      const newState = { ...prev, [id]: newValue };

      const updateChildren = (childList) => {
        if (!childList) return;
        childList.forEach((child) => {
          newState[child.id] = newValue;
          if (child.children) {
            updateChildren(child.children);
          }
        });
      };

      updateChildren(children);
      return newState;
    });
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {data.map((item) => (
        <div key={item.id} style={{ margin: "8px 0" }}>
          <div className="folder-label" style={{ padding: "6px 10px" }}>
            <Checkbox
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
                borderLeft: "1px solid var(--p-border)",
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
