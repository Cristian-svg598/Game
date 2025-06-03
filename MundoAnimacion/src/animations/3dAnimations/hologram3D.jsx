import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Hologram3D = ({ imageUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Setup básico
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // fondo transparente negro
    mountRef.current.appendChild(renderer.domElement);

    // Luz ambiente para mejor visibilidad
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Crear un canvas para extraer datos de la imagen
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      // Ajustamos el canvas al tamaño de la imagen
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      const positions = [];
      const colors = [];

      // Recorrer pixels con step para no saturar la nube de puntos
      const step = 6;

      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const idx = (y * img.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Sólo puntos con alpha alto (visible)
          if (a > 100) {
            // Normalizar posición - centrar en 0,0
            const px = (x / img.width) - 0.5;
            const py = -(y / img.height) + 0.5;

            // Profundidad Z basada en brillo promedio (o aleatorio para efecto holográfico)
            const brightness = (r + g + b) / (3 * 255);
            const pz = (brightness - 0.5) * 0.6; // profundidad pequeña +/- 0.3

            positions.push(px * 2);  // ampliar espacio en X
            positions.push(py * 2);  // ampliar espacio en Y
            positions.push(pz);

            // Color cyan con variación basada en brillo
            colors.push(0, 1, 1); // RGB
          }
        }
      }

      // Crear geometría y añadir atributos
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      // Material para puntos, usando colores por vértice
      const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      // Crear puntos y añadir a escena
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Animación (sin rotar, solo render)
      const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    };

    // Cleanup
    return () => {
      while (mountRef.current?.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      renderer.dispose();
    };
  }, [imageUrl]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "400px", margin: "0 auto", background: "#000" }}
    />
  );
};

export default Hologram3D;
