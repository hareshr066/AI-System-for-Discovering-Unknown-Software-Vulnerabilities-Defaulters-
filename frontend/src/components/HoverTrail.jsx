import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HoverTrail({ children, className = '', color = 'rgba(99,102,241,0.6)' }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`relative overflow-hidden ${className}`}
        >
            {isHovering && (
                <motion.div
                    className="pointer-events-none absolute z-10 h-40 w-40 rounded-full opacity-60 blur-2xl"
                    style={{
                        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                        left: mousePosition.x - 80,
                        top: mousePosition.y - 80
                    }}
                    animate={{
                        left: mousePosition.x - 80,
                        top: mousePosition.y - 80
                    }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                />
            )}
            {children}
        </div>
    );
}
