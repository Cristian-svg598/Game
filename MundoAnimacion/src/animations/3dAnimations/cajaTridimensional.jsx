import React, { useRef, useState } from 'react';
import '../../styles/cajaTridimensional.css';

const CajaTridimensional = () => {
  const cubeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cubeRef.current) return;

    const cubeRect = cubeRef.current.getBoundingClientRect();
    const cubeWidth = cubeRect.width;
    const cubeHeight = cubeRect.height;

    const xRotation = ((e.clientY - cubeRect.top) / cubeHeight - 0.5) * 90;
    const yRotation = ((e.clientX - cubeRect.left) / cubeWidth - 0.5) * 90;

    cubeRef.current.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  };

  const resetRotation = () => {
    if (!cubeRef.current) return;
    cubeRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      className="scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div className="cube" ref={cubeRef}>
        <div className="face front">Frontal</div>
        <div className="face back">Trasera</div>
        <div className="face right">Derecha</div>
        <div className="face left">Izquierda</div>
        <div className="face top">Arriba</div>
        <div className="face bottom">Abajo</div>
      </div>
    </div>
  );
};

export default CajaTridimensional;
