import React, { useEffect, useState } from "react";
import "../componentStyles/ImageSlider.css";
import mkz from "../../public/images/mkz1.png";
import banner2 from "../../public/images/Banner-2.jpg";
import banner3 from "../../public/images/Banner-3.jpg";
import banner4 from "../../public/images/Banner-4.jpg";

const images = [mkz, banner2, banner3, banner4];

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
            <span className={`dot ${index===currentIndex ? 'active' : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
