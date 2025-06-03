import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/navbar.jsx';
import Card from './component/card.jsx';
import Modal from './component/modal.jsx';

import CajaTridimensional from './animations/3dAnimations/cajaTridimensional.jsx';
import LibroAnimado from './animations/3dAnimations/libroAnimado.jsx';
import GaleriaImagenes from './animations/3dAnimations/galeriaImagenes.jsx';
import GatoCorriendo from './animations/2dAnimations/gatoCorriendo.jsx';
import BouncingBall from './animations/2dAnimations/bouncingBall.jsx';
import WhosThatPokemon from './animations/2dAnimations/whosThatPokemon.jsx';
import ScannerBulbasaur from './animations/2dAnimations/scannerBulbasaur.jsx';
import Hologram3D from './animations/3dAnimations/hologram3D.jsx';

import NeuralBackground from './animations/backgroundAnimations/neuronalBackground.jsx';
import LithtingAround from './animations/backgroundAnimations/lightingAround.jsx';
import SquareTransmision from './animations/backgroundAnimations/squareTransmision.jsx';
import ExplosionBackground from './animations/backgroundAnimations/explosionBackground.jsx';
import Starfield from './animations/backgroundAnimations/starfield.jsx';

import Bulbasaur from './img/bulbasaur.png'


const cards = [
  { category: "3d", title: "Caja Tridimensional", resume: "Cubo que gira 360º", component: <CajaTridimensional /> },
  { category: "3d", title: "Libro Animado", resume: "Animación que hace pasar páginas", component: <LibroAnimado /> },
  { category: "3d", title: "Galería de imagenes", resume: "Carrusell de imagenes que se desplazan al hacer click en el mouse y girarlo hacia izquierda o derecha", component: <GaleriaImagenes /> },
    { category: "3d", title: "Holograma", resume: "Holograma de una imagen", component: <Hologram3D imageUrl={Bulbasaur} /> },
  { category: "2d", title: "Gato corriendo", resume: "Animación de un gato corriendo", component: <GatoCorriendo /> },
  { category: "2d", title: "Bola saltarina", resume: "Animación de una Bola saltarina", component: <BouncingBall /> },
  { category: "2d", title: "Who`s That Pokemon", resume: "Adivina el pokemon", component: <WhosThatPokemon /> },
   { category: "2d", title: "Scanner Bulbasaur", resume: "Animacion de escaner", component: <ScannerBulbasaur /> },
];

const backgroundComponents = {
  neural: <NeuralBackground />,
  lighting: <LithtingAround />,
  square: <SquareTransmision />,
  explosion: <ExplosionBackground />,
  stars: <Starfield />,
};

const CardsSection = ({ category, cards, openModalWith }) => {
  const filteredCards = cards.filter(card => card.category === category);
  return (
    <section className={`animation-${category}`}>
      {filteredCards.map((card, index) => (
        <Card
          key={card.title}
          title={card.title}
          resume={card.resume}
          delay={index * 0.3}
          onClick={() => openModalWith(card.component, card.title)}
        />
      ))}
    </section>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [background, setBackground] = useState('stars');

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
      {backgroundComponents[background] || null}
      <NavBar setBackground={setBackground} />
      <CardsSection category="3d" cards={cards} openModalWith={openModalWith} />
      <CardsSection category="2d" cards={cards} openModalWith={openModalWith} />
      <Modal show={showModal} onClose={closeModal} title={selectedTitle}>
        {selectedAnimation}
      </Modal>
    </>
  );
}

export default App;
