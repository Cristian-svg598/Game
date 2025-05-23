import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/navbar.jsx';
import Card from './component/card.jsx';
import Modal from './component/modal.jsx';
import CajaTridimensional from './animations/3dAnimations/cajaTridimensional.jsx';
import LibroAnimado from './animations/3dAnimations/libroAnimado.jsx';
import GaleriaImagenes from './animations/3dAnimations/galeriaImagenes.jsx'
import GatoCorriendo from './animations/2dAnimations/gatoCorriendo.jsx'
import BouncingBall from './animations/2dAnimations/bouncingBall.jsx';
import ParticlesBackground from './animations/backgroundAnimations/particleBacground.jsx';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  const openModalWith = (animationComponent, title) => {
    setSelectedAnimation(animationComponent);
    setSelectedTitle(title);
    setShowModal(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAnimation(null);
    setSelectedTitle('');
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      <NavBar />
      <br />
      <section className='animation-3d'>
        <Card
          title="Caja Tridimensional"
          resume="Cubo que gira 360º"
          onClick={() => openModalWith(<CajaTridimensional />, 'Caja Tridimensional')}
        />
        <Card
          title="Libro Animado"
          resume="Animación que hace pasar páginas"
          onClick={() => openModalWith(<LibroAnimado />, 'Libro Animado')}
        />

        <Card
          title="Galería de imagenes"
          resume="Carrusell de imagenes que se desplazan al hacer click en el mouse y girarlo hacia izquierda o derecha"
          onClick={() => openModalWith(<GaleriaImagenes />, 'Galeria Imagenes')}
        />
      </section>

      <section className='animation-2d'>
        <Card
          title="Gato corriendo"
          resume="Animación de un gato corriendo"
          onClick={() => openModalWith(<GatoCorriendo />, 'Gato Corriendo')}
        />
        <Card
          title="Bola saltarina"
          resume="Animación de una Bola saltarina"
          onClick={() => openModalWith(<BouncingBall />, 'Bola saltarina')}
        />




      </section>
      <section className='background-animation'>
        <Card
          title="Partículas Interactivas"
          resume="Fondo animado de partículas"
          onClick={() => openModalWith(<ParticlesBackground />, '')}
        />



      </section>
      <Modal show={showModal} onClose={closeModal} title={selectedTitle}>
        {selectedAnimation}
      </Modal>
    </>
  );
}

export default App
