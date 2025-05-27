import React, { useEffect, useRef } from "react";

const SquareTransmision = () => {
    const canvasRef = useRef(null);
    const nodesRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 }); // fuera de pantalla inicialmente

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const nodeCount = 60;
        const minDistance = 150;
        const nodes = [];

        for (let i = 0; i < nodeCount;) {
            const newNode = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                connections: [],
                glow: 0
            };

            let tooClose = false;
            for (const other of nodes) {
                const dx = newNode.x - other.x;
                const dy = newNode.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDistance) {
                    tooClose = true;
                    break;
                }
            }

            if (!tooClose) {
                nodes.push(newNode);
                i++;
            }
        }

        // Crear conexiones entre nodos
        for (let i = 0; i < nodes.length; i++) {
            const distances = nodes.map((node, j) => {
                if (i === j) return null;
                const dx = nodes[i].x - node.x;
                const dy = nodes[i].y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                return { index: j, distance: dist };
            }).filter(Boolean);

            distances.sort((a, b) => a.distance - b.distance);
            const connectionCount = Math.floor(Math.random() * 4) + 1;
            for (let k = 0; k < connectionCount; k++) {
                nodes[i].connections.push({
                    index: distances[k].index,
                    glow: 0
                });
            }
        }

        nodesRef.current = nodes;

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            const { x: mouseX, y: mouseY } = mouseRef.current;
            let closestNode = null;
            let minDist = Infinity;
            const activationRadius = 200; // Solo se activa si está cerca del mouse

            nodes.forEach(node => {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDist) {
                    minDist = dist;
                    closestNode = node;
                }
            });

            if (closestNode && minDist < activationRadius) {
                closestNode.glow = 1;
                closestNode.connections.forEach(conn => {
                    conn.glow = 1;
                    const connectedNode = nodes[conn.index];
                    connectedNode.glow = 0.7;
                });
            }

            // Dibujar conexiones visibles
            nodes.forEach((node) => {
                node.connections.forEach(conn => {
                    if (conn.glow > 0.01) {
                        const target = nodes[conn.index];
                        const lineAlpha = conn.glow * 0.8 + 0.1;
                        context.strokeStyle = `rgba(0, 255, 204, ${lineAlpha})`;
                        context.lineWidth = 1;
                        context.beginPath();
                        context.moveTo(node.x, node.y);
                        context.lineTo(target.x, target.y);
                        context.stroke();
                    }
                    conn.glow *= 0.95;
                });
            });

            // Dibujar nodos visibles
            nodes.forEach(node => {
                if (node.glow > 0.01) {
                    const size = 4 + node.glow * 6;
                    context.fillStyle = `rgba(0, 255, 204, ${0.2 + node.glow})`;
                    context.beginPath();
                    context.arc(node.x, node.y, size, 0, Math.PI * 2);
                    context.fill();
                }
                node.glow *= 0.95;
            });

            requestAnimationFrame(draw);
        };

        draw();

        const handleMouseMove = (e) => {
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
