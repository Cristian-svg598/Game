import React, { useState, useEffect } from "react";
import "../styles/card.css";

const Card = ({ title, resume, onClick, delay = 0 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay * 5000); 

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`custom-card ${visible ? "visible" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{resume}</p>
      </div>
      <div className="card-footer">
        <button className="card-btn" onClick={onClick}>
          Mostrar Animación
        </button>
      </div>
    </div>
  );
};

export default Card;
