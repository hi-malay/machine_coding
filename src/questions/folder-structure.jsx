import React, { useState } from "react";

const FolderStructure = ({ data }) => {
  const [open, setOpen] = useState([]);

  return (
    <ul className="folder-list">
      {data.map((item) => (
        <li key={item.name} className="folder-item">
          <div
            className="folder-label"
            onClick={() => {
              return setOpen((prev) =>
                prev.includes(item.name)
                  ? prev.filter((data) => data !== item.name)
                  : [...prev, item.name],
              );
            }}
          >
            <span>{item.type === "folder" ? "📁" : "📄"}</span>
            <span>{item.name}</span>
          </div>
          {item.type === "folder" && open.includes(item.name) && (
            <div style={{ marginLeft: "20px" }}>
              <FolderStructure data={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FolderStructure;
