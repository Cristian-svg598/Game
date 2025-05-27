import React, { useEffect, useRef } from "react";

const LightingAround = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });

  const NODE_COUNT = 1000;
  const MAX_DISTANCE = 100;
  const NODE_SIZE = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }));

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;

      nodesRef.current.forEach(({ x, y }) => {
        let opacity = 0;

        if (mouseX !== null && mouseY !== null) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            opacity = 1 - dist / MAX_DISTANCE;
          }
        }

        context.fillStyle = `rgba(0, 255, 204, ${opacity})`;
        context.fillRect(x - NODE_SIZE / 2, y - NODE_SIZE / 2, NODE_SIZE, NODE_SIZE);
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

export default LightingAround;
