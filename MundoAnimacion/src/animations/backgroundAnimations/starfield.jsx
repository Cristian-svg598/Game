import React, { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createStars = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3 + 1,
        radius: Math.random() * 1.5 + 0.5,
      }));

    starsRef.current = createStars(300);

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        const parallaxX = mouseRef.current.x / 100 / star.z;
        const parallaxY = mouseRef.current.y / 100 / star.z;

        star.x += 0.1 / star.z;
        if (star.x > canvas.width) star.x = 0;

        context.beginPath();
        context.arc(star.x - parallaxX, star.y - parallaxY, star.radius, 0, 2 * Math.PI);
        context.fillStyle = `rgba(255, 255, 255, ${1 / star.z})`;
        context.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        zIndex: -1,
      }}
    />
  );
};

export default Starfield;
