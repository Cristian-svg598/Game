import React, { useEffect, useState } from "react";
import '../../styles/gatoCorriendo.css'

const CatRunner = () => {
    const [x, setX] = useState(0);
    const [frame, setFrame] = useState(0);


    useEffect(() => {
        const frameInterval = setInterval(() => {
            setFrame((prev) => (prev + 1) % 3); 
        }, 300); 

        return () => clearInterval(frameInterval);
    }, []);

    return (
        <div className="scene">
            <div
                className="cat-sprite"
                style={{
                    transform: `translateX(${x}px)`,
                   backgroundPosition: `-${frame * 220}px -${225 + 40}px`, 
                }}
            />
        </div>
    );
}

export default CatRunner;
