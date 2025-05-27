import React, { useEffect, useRef } from "react";

const LithtingAround = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let nodes = []
        const nodeCount = 1000;
        const maxDist = 100;

        let mouse = { x: null, y: null };

        //Crear nodos estáticos
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];
                let opacity = 0;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = node.x - mouse.x;
                    const dy = node.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        opacity = 1 - dist / maxDist;
                    }
                }

                context.fillStyle = `rgba(0, 255, 204, ${opacity})`;
                const size = 10;
                context.fillRect(node.x - size / 2, node.y - size / 2, size, size);
            }

            requestAnimationFrame(draw);
        };

        // Actualizar posición del mouse
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        draw();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -1,
                background: "#0e0e0e",
            }}>
        </canvas>

    );
}

export default LithtingAround;