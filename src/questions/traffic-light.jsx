import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [light, setLight] = useState("red");

  useEffect(() => {
    const sequence = [
      { color: "red", duration: 3000 },
      { color: "yellow", duration: 1000 },
      { color: "green", duration: 3000 },
    ];

    let currentIndex = 0;

    const changeLight = () => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setLight(sequence[currentIndex].color);
      setTimeout(changeLight, sequence[currentIndex].duration);
    };

    const timer = setTimeout(changeLight, sequence[currentIndex].duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="traffic-light-container">
      <div
        className={`traffic-light-circle ${light === "red" ? "active red" : ""}`}
      ></div>
      <div
        className={`traffic-light-circle ${light === "yellow" ? "active yellow" : ""}`}
      ></div>
      <div
        className={`traffic-light-circle ${light === "green" ? "active green" : ""}`}
      ></div>
    </div>
  );
};

export default TrafficLight;
