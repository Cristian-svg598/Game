import React, { useRef, useEffect } from "react";
import gengarSilhouette from '../../img/gengar.svg';
import gengarColor from '../../img/Psyduck.svg';


const WhosThatPokemon = () => {
  const silhouetteRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;

    gsap.set(colorRef.current, { opacity: 0 });
    gsap.set(silhouetteRef.current, { opacity: 1 });

    gsap.to(silhouetteRef.current, {
      duration: 1,
      opacity: 0,
      delay: 2,
      ease: "power2.inOut"
    });

    gsap.to(colorRef.current, {
      duration: 1,
      opacity: 1,
      delay: 2,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <img
        ref={silhouetteRef}
        src={gengarSilhouette}
        alt="Gengar Silhouette"
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      />
      <img
        ref={colorRef}
        src={gengarColor}
        alt="Gengar Color"
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      />
    </div>
  );
};

export default WhosThatPokemon;
