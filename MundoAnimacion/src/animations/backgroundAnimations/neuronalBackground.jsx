import React, { useEffect, useRef } from "react";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);

  const NODE_COUNT = 100;
  const MAX_DIST = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Crear nodos
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      // Dibujar líneas entre nodos cercanos
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            context.strokeStyle = `rgba(255, 255, 255, ${1 - dist / MAX_DIST})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.stroke();
          }
        }
      }

      // Dibujar nodos y actualizar posiciones
      nodes.forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, 2, 0, Math.PI * 2);
        context.fillStyle = "#00ffcc";
        context.fill();

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "#0e0e0e",
      }}
    />
  );
};

export default NeuralBackground;
