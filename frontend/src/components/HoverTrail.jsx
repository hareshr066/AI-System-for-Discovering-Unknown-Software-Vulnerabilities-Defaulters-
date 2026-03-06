import React from 'react';

// Fallback HoverTrail component created to prevent Vite from crashing.
// If your friend pushed a more complex version of this component,
// you can pull it and it will naturally overwrite this file.
const HoverTrail = ({ strokeColor, color }) => {
    return (
        <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ 
                boxShadow: `inset 0 0 20px ${strokeColor || color || 'rgba(255,255,255,0.1)'}` 
            }}
        />
    );
};

export default HoverTrail;
