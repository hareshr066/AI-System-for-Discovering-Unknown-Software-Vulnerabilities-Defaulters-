import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const CinematicBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const mv = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', mv);
    return () => window.removeEventListener('mousemove', mv);
  }, [mouseX, mouseY]);

  const glowX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 25 });
  const moveX = useTransform(glowX, v => v - 400);
  const moveY = useTransform(glowY, v => v - 400);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="fixed top-0 left-0 w-full h-screen bg-[length:60px_60px] z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 243, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 243, 255, 0.03) 1px, transparent 1px)'
        }} />
      
      <div className="absolute bottom-[-60%] left-[-50%] w-[200%] h-[200%] pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(188, 19, 254, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 243, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: 'rotateX(75deg) translateZ(0)',
          transformOrigin: 'top center',
          maskImage: 'linear-gradient(to top, transparent 10%, black 70%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 10%, black 70%)'
        }} />

      <motion.div
        className="absolute rounded-full mix-blend-screen pointer-events-none"
        style={{
          width: 800, height: 800,
          x: moveX, y: moveY,
          background: 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(188,19,254,0.1) 40%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="absolute top-[-20%] left-[-15%] w-[55%] h-[55%] rounded-full bg-[#BC13FE] blur-[200px] opacity-[0.04]" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[55%] h-[55%] rounded-full bg-[#00F3FF] blur-[200px] opacity-[0.04]" />

      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute w-px h-[200px] opacity-0 z-[1] pointer-events-none"
          style={{
            left: `${10 + i * 12}%`,
            background: 'linear-gradient(to bottom, transparent, #00F3FF, transparent)',
            animation: `streakFall ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {Array.from({ length: 35 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#00F3FF' : i % 2 === 0 ? '#BC13FE' : '#1e293b',
            boxShadow: i % 3 === 0 ? '0 0 10px #00F3FF' : i % 2 === 0 ? '0 0 10px #BC13FE' : 'none',
          }}
          animate={{
            y: [0, -(Math.random() * 200 + 80)],
            opacity: [0, 0.7, 0],
          }}
          transition={{ duration: Math.random() * 12 + 8, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <pattern id="hp-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#00F3FF" />
          <circle cx="60" cy="60" r="1" fill="#BC13FE" />
          <line x1="20" y1="20" x2="60" y2="60" stroke="#00F3FF" strokeWidth="0.3" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hp-dots)" />
      </svg>

      <style>{`
        @keyframes streakFall {
          0% { transform: translateY(-200px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CinematicBackground;
