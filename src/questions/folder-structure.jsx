import React, { useState } from "react";

const FolderStructure = ({ folderData, setFolderData }) => {
  const [open, setOpen] = useState([]);
  const [edit, setEdit] = useState({});
  const [add, setAdd] = useState({});
  const [folderName, setFolderName] = useState("");

  const editFolder = (id, newName) => {
    setFolderData((prevData) => {
      const updateRecursively = (prevData) => {
        return prevData?.map((data) => {
          if (data?.id === id) {
            return { ...data, name: newName };
          } else {
            return { ...data, children: updateRecursively(data?.children) };
          }
        });
      };
      return updateRecursively(prevData);
    });
  };

  const addFolder = (id) => {
    setFolderData((prev) => {
      const updateRecursively = (prev) => {
        return prev?.map((data) => {
          if (data?.id === id) {
            return {
              ...data,
              children: [
                ...data.children,
                { name: folderName, type: "file", children: [] },
              ],
            };
          } else {
            return { ...data, children: updateRecursively(data?.children) };
          }
        });
      };
      return updateRecursively(prev);
    });
  };

  const deleteFolder = (id) => {
    setFolderData((prev) => {
      const updateRecursively = (prev) => {
        return prev?.map((data) => {
          if (data?.id === id) {
            return "";
          } else {
            return { ...data, children: updateRecursively(data?.children) };
          }
        });
      };
      return updateRecursively(prev);
    });
  };

  return (
    <ul className="folder-list">
      {folderData?.map((item) => (
        <li
          key={item.id}
          className="folder-item"
          style={{ display: item ? "block" : "none" }}
        >
          <div className="folder-label">
            <div className="flex gap-2">
              <span
                onClick={() => {
                  if (!edit[item.id]) {
                    setOpen((prev) =>
                      prev.includes(item.name)
                        ? prev.filter((data) => data !== item.id)
                        : [...prev, item.id],
                    );
                  }
                }}
              >
                {item?.type === "folder" ? "📁" : "📄"}
              </span>
              <span>
                {edit[item.id] ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => editFolder(item.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  item.name
                )}
              </span>

              {add[item.id] && (
                <input
                  type="text"
                  onChange={(e) => setFolderName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="New folder name"
                />
              )}

              <span
                className="text-blue-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setEdit((prev) => ({
                    ...prev,
                    [item.id]: !prev[item.id],
                  }));
                }}
              >
                {edit[item.id] ? "Hide" : "Edit"}
              </span>

              {item?.type === "folder" && (
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (add[item.id] && folderName) {
                      addFolder(item.id);
                      setFolderName("");
                    }
                    setAdd((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }));
                  }}
                >
                  {add[item.id] ? "Save" : "Add"}
                </span>
              )}
              <span
                className="text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFolder(item.id);
                }}
              >
                Delete
              </span>
            </div>
          </div>

          {item?.type === "folder" && open.includes(item.id) && (
            <div style={{ marginLeft: "20px" }}>
              <FolderStructure
                folderData={item.children}
                setFolderData={setFolderData}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FolderStructure;
