import React from "react";
import '../styles/navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-center">
         <h3 className="animations">Animations</h3>
        <li className="nav-item">
          <a className="nav-link" href="#section1">2D Animations</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#section2">3D Animations</a>
        </li>
      </ul>
     
    </nav>
  );
};

export default NavBar;
