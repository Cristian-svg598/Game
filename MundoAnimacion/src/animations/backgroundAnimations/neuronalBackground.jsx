import React, { useEffect, useRef } from "react";

const NeuralBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let nodes = [];
        const nodeCount = 100;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar líneas entre nodos cercanos
            for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        context.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 120})`;
                        context.lineWidth = 1;
                        context.beginPath();
                        context.moveTo(nodes[i].x, nodes[i].y);
                        context.lineTo(nodes[j].x, nodes[j].y);
                        context.stroke();
                    }
                }
            }

            // Dibujar nodos
            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];
                context.beginPath();
                context.arc(node.x, node.y, 2, 0, Math.PI * 2);
                context.fillStyle = "#00ffcc";
                context.fill();

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            }

            requestAnimationFrame(draw);
        };

        draw(); // Iniciar animación

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
