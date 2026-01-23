import React, { useState } from "react";

const Rating = ({ rating: initialRating = 0 }) => {
  const [hover, setHover] = useState(0);
  const [selectedRating, setSelectedRating] = useState(initialRating);

  return (
    <div className="rating-container">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || selectedRating);

        return (
          <span
            key={index}
            className={`star ${isFilled ? "filled" : ""}`}
            onClick={() => setSelectedRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
      <div
        style={{
          marginLeft: "1rem",
          color: "var(--text-muted)",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        {selectedRating} / 5
      </div>
    </div>
  );
};

export default Rating;
