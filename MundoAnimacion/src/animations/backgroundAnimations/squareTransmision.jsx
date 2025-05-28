import React, { useEffect, useRef } from "react";

const SquareTransmision = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const NODE_COUNT = 200;
    const MIN_DISTANCE = 50;
    const ACTIVATION_RADIUS = 200;

    // Generar nodos con distancia mínima
    const nodes = [];
    while (nodes.length < NODE_COUNT) {
      const newNode = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        glow: 0,
        baseSize: Math.random() * 10,
      };

      const tooClose = nodes.some(other => {
        const dx = newNode.x - other.x;
        const dy = newNode.y - other.y;
        return Math.hypot(dx, dy) < MIN_DISTANCE;
      });

      if (!tooClose) nodes.push(newNode);
    }

    // Crear conexiones entre nodos
    nodes.forEach((node, i) => {
      const distances = nodes
        .map((other, j) => {
          if (i === j) return null;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          return { index: j, distance: Math.hypot(dx, dy) };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

      const connectionCount = Math.floor(Math.random() * 4) + 1;
      node.connections = distances.slice(0, connectionCount).map(d => ({
        index: d.index,
        glow: 0,
      }));
    });

    nodesRef.current = nodes;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;
      let closestNode = null;
      let minDist = Infinity;

      nodes.forEach(node => {
        const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (dist < minDist) {
          minDist = dist;
          closestNode = node;
        }
      });

      if (closestNode && minDist < ACTIVATION_RADIUS) {
        closestNode.glow = 1;
        closestNode.connections.forEach(conn => {
          conn.glow = 1;
          nodes[conn.index].glow = 0.7;
        });
      }

      // Conexiones
      nodes.forEach(node => {
        node.connections.forEach(conn => {
          if (conn.glow > 0.01) {
            const target = nodes[conn.index];
            context.strokeStyle = `rgba(0, 255, 204, ${conn.glow * 0.8 + 0.1})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(target.x, target.y);
            context.stroke();
          }
          conn.glow *= 0.95;
        });
      });

      nodes.forEach(node => {
        if (node.glow > 0.01) {
          const size = node.baseSize + node.glow * 6;
          const halfSize = size / 2;
          context.fillStyle = `rgba(0, 255, 204, ${0.2 + node.glow})`;
          context.fillRect(node.x - halfSize, node.y - halfSize, size, size);
        }
        node.glow *= 0.95;
      });


      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = e => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

export default SquareTransmision;
