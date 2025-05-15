import React, { useState, useRef } from "react";
import '../../styles/galeriaImagenes.css';

const images = [
  "https://tse1.mm.bing.net/th?id=OIP.OJXjQZ-hft32b72WzaoWvAHaIN&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.9L_lGQL-gjDf-qfm33eEdgHaJN&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.WBDuxJZ59tWlW2svOcZ1tAHaG1&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.i1yxhWJGoP3lvMuha37_9AHaHk&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.zj0skOTQUBolfmKDoiwU3gHaFz&pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th?id=OIP.dBI6X4wRiethDACz9kqbWAHaIQ&pid=Api&P=0&h=180",
];

export default function Carousel3D() {
  const [angle, setAngle] = useState(0);
  const imageCount = images.length;
  const angleStep = 360 / imageCount;

  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;

 
    const sensitivity = 2;

    setAngle((prev) => prev + deltaX / sensitivity);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="carousel-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-scene">
        <div
          className="carousel"
          style={{
            transform: `rotateY(${angle}deg)`,
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className="carousel-image"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(300px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
