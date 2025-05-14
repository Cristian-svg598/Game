import React from "react";

const Card = ({ title, resume, onClick }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{resume}</p>
                <button className="btn btn-primary" onClick={onClick}>
                    Mostrar Animación
                </button>
            </div>
        </div>
    );
};

export default Card;
