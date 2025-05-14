import React, { useState } from 'react';
import '../../styles/libroAnimado.css';

const LibroAnimado = () => {
  const [pagesTurned, setPagesTurned] = useState([false, false]); // Una para cada página

  const handleNext = () => {
    const nextIndex = pagesTurned.findIndex(p => !p);
    if (nextIndex !== -1) {
      const newPages = [...pagesTurned];
      newPages[nextIndex] = true;
      setPagesTurned(newPages);
    }
  };

  const handlePrev = () => {
    const lastIndex = pagesTurned.lastIndexOf(true);
    if (lastIndex !== -1) {
      const newPages = [...pagesTurned];
      newPages[lastIndex] = false;
      setPagesTurned(newPages);
    }
  };

  return (
    <div className="book-container">
      <div className="book">
        <div className={`page ${pagesTurned[0] ? 'flipped' : ''}`} style={{ zIndex: 3 }}>
          <div className="front">Página 1</div>
          <div className="back">Página 2</div>
        </div>
        <div className={`page ${pagesTurned[1] ? 'flipped' : ''}`} style={{ zIndex: 2 }}>
          <div className="front">Página 3</div>
          <div className="back">Página 4</div>
        </div>
        <div className="cover">Portada</div>
        <div className="back-cover">Contraportada</div>
      </div>

      <div className="controls">
        <button className="btn btn-secondary me-2" onClick={handlePrev}>Anterior</button>
        <button className="btn btn-primary" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default LibroAnimado;
