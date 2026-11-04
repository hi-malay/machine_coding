import { Button } from "../components/ui/button";
import { useState } from "react";

const ToastDiv = () => {
  const [showToast, setShowToast] = useState([
    {
      on: false,
      message: "Hello, I'm a Toast Div!",
      id: Date.now(),
    },
  ]);

  const handleToastClick = () => {
    const id = Date.now();
    setShowToast((prev) => [
      ...prev,
      { on: true, message: "Hello, I'm a Toast Div!", id: id },
    ]);

    setTimeout(() => {
      setShowToast((prev) =>
        prev.map((data) => {
          if (data.id === id) {
            data.on = false;
          }
          return data;
        }),
      );
    }, 5000);
  };

  return (
    <div>
      {showToast.toReversed().map((data, index) => {
        return (
          <div
            key={data.id}
            style={{
              position: "fixed",
              top: `${index * 50}px`,
              right: "10px",
              backgroundColor: "var(--p-primary)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              boxShadow: "0 4px 6px -1px var(--p-primary)",
              opacity: data.on ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {data.message}
          </div>
        );
      })}
      {console.log("showToast", showToast)}
      <Button onClick={() => handleToastClick()}>
        Hello, I'm a Toast Div!
      </Button>
    </div>
  );
};

export default ToastDiv;
