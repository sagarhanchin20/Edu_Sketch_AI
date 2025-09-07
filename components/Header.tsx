
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="font-bangers text-6xl md:text-8xl text-white tracking-wider" style={{ textShadow: '4px 4px 0 #000, 6px 6px 8px rgba(255,0,150,0.7), -4px -4px 8px rgba(0,255,255,0.7)' }}>
        EduSketch AI
      </h1>
      <p className="mt-2 text-lg md:text-xl text-gray-300 font-semibold">
        Your personal AI illustrator for learning any concept, step-by-step.
      </p>
    </header>
  );
};

export default Header;
