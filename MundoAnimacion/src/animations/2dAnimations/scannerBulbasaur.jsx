import React from "react";
import Bulbasaur from '../../img/bulbasaur.png';
import '../../styles/scannerBulbasaur.css';


const ScannerBulbasaur = () => {

    return (
        <div className="scanner-container">
            <img src={Bulbasaur} className="scanner-image" alt="Imagen a escanear"/>
                <div className="scan-line"></div>
        </div>
    );
}

export default ScannerBulbasaur;

