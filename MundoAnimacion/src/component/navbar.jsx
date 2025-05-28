import React from "react";
import '../styles/navbar.css';

const NavBar = ({ setBackground }) => {
  return (
    <nav className="navbar">
      <ul className="nav-center">
        <h3 className="animations">Mundo Animación</h3>
        <li>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Elegir background
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => setBackground("neural")}>Neural</button></li>
              <li><button className="dropdown-item" onClick={() => setBackground("lighting")}>Lightning</button></li>
              <li><button className="dropdown-item" onClick={() => setBackground("square")}>Square</button></li>
              <li><button className="dropdown-item" onClick={() => setBackground("explosion")}>Explosion</button></li>
              <li><button className="dropdown-item" onClick={() => setBackground("stars")}>Starfield</button></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
