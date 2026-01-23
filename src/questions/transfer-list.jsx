import { useState } from "react";

const TransferList = ({ transferData }) => {
  const [listOne, setListOne] = useState(
    transferData.map((item) => ({ ...item, checked: false })),
  );
  const [listTwo, setListTwo] = useState([]);

  const handleToggle = (id, listType) => {
    const list = listType === "one" ? listOne : listTwo;
    const setList = listType === "one" ? setListOne : setListTwo;

    setList(
      list.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const moveChecked = (fromOne) => {
    if (fromOne) {
      const toMove = listOne
        .filter((item) => item.checked)
        .map((i) => ({ ...i, checked: false }));
      const remaining = listOne.filter((item) => !item.checked);
      setListOne(remaining);
      setListTwo([...listTwo, ...toMove]);
    } else {
      const toMove = listTwo
        .filter((item) => item.checked)
        .map((i) => ({ ...i, checked: false }));
      const remaining = listTwo.filter((item) => !item.checked);
      setListTwo(remaining);
      setListOne([...listOne, ...toMove]);
    }
  };

  const moveAll = (fromOne) => {
    if (fromOne) {
      setListTwo([
        ...listTwo,
        ...listOne.map((i) => ({ ...i, checked: false })),
      ]);
      setListOne([]);
    } else {
      setListOne([
        ...listOne,
        ...listTwo.map((i) => ({ ...i, checked: false })),
      ]);
      setListTwo([]);
    }
  };

  const renderList = (items, type) => (
    <div className="list-box">
      {items.map((item) => (
        <div
          key={item.id}
          className="list-item"
          onClick={() => handleToggle(item.id, type)}
        >
          <input type="checkbox" checked={item.checked} readOnly />
          <label style={{ cursor: "pointer" }}>{item.label}</label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="transfer-list-container">
      {renderList(listOne, "one")}

      <div className="transfer-btns">
        <button className="btn-outline" onClick={() => moveAll(true)}>
          {"≫"}
        </button>
        <button
          className="btn-primary"
          onClick={() => moveChecked(true)}
          disabled={!listOne.some((i) => i.checked)}
        >
          {">"}
        </button>
        <button
          className="btn-primary"
          onClick={() => moveChecked(false)}
          disabled={!listTwo.some((i) => i.checked)}
        >
          {"<"}
        </button>
        <button className="btn-outline" onClick={() => moveAll(false)}>
          {"≪"}
        </button>
      </div>

      {renderList(listTwo, "two")}
    </div>
  );
};

export default TransferList;
