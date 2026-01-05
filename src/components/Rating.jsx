import React, { useState } from "react";
import "../componentStyles/Rating.css";
import StarIcon from "@mui/icons-material/Star";

function Rating({ value, onRatingChange, disabled }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSlectedRating] = useState(value || 0);

  // Handle star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  // Mouse leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  // Hnalde Click
  const handleClick = (rating) => {
    if (!disabled) {
      setSlectedRating(rating);
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  // Functions to generate stars based on the selected rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{pointerEvents:disabled? "none": "auto"}}
        >
          <StarIcon />
        </span>
      );
    }
    return stars;
  };
  return (
    <div>
      <div className="rating">{generateStars()}</div>
    </div>
  );
}

export default Rating;
