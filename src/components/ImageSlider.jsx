import React, { useEffect, useState } from "react";
import "../componentStyles/ImageSlider.css";
import banner2 from "../../public/images/Adire.png";
import mkz from "../../public/images/mkz1.png";
import banner3 from "../../public/images/mkz4.png";
import banner4 from "../../public/images/mkz3.png";

const images = [banner2, mkz, banner3, banner4];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="image-slider-container">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`slide ${index + 1}`} />
          </div>
        ))}

        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
