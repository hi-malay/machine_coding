import { useState, useEffect, useRef } from "react";

const StrechDiv = () => {
  const divRef = useRef(null);
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!active || !divRef.current) return;

      const { clientX, clientY } = e;
      const { left, top } = divRef.current.getBoundingClientRect();

      const newWidth = Math.max(clientX - left);
      const newHeight = Math.max(clientY - top);

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setActive(false);
    };

    if (active) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [active]);
  console.log(size);
  return (
    <div
      ref={divRef}
      style={{ height: size.height, width: size.width }}
      className="w-[100px] h-[100px] bg-gray-200 relative cursor-nwse-resize"
      onMouseDown={(e) => {
        setActive(true);
      }}
    >
      <div className="absolute w-[10px] h-[2px] bg-blue-500 rounded-50% bottom-0 right-0"></div>
      <div className="absolute w-[2px] h-[10px] bg-blue-500 rounded-50% bottom-0 right-0"></div>
    </div>
  );
};

export default StrechDiv;
