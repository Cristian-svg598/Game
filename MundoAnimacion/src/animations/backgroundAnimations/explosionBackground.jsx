import React, { useEffect, useRef } from "react";

const ExplosionBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createParticle = (x, y) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      return {
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1,
        life: 60,
      };
    };

    const emitParticles = (x, y, count = 20) => {
      for (let i = 0; i < count; i++) {
        particles.current.push(createParticle(x, y));
      }
    };

    const drawParticles = () => {
      context.fillStyle = "rgba(14, 14, 14, 0.3)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter(p => p.life > 0);

      particles.current.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 255, 204, ${p.life / 60})`;
        context.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      emitParticles(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    drawParticles();

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

export default ExplosionBackground;
