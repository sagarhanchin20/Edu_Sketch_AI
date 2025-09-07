
import React, { useState, useEffect } from 'react';

const messages = [
  "Sketching the concepts...",
  "Mixing the perfect colors...",
  "Sharpening our pencils...",
  "Drafting the illustrations...",
  "Adding the final touches...",
  "Forging knowledge in pixels..."
];

const LoadingState: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-12 flex flex-col items-center justify-center text-center p-6 bg-black/30 rounded-lg">
      <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-xl font-semibold text-white transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
      <p className="mt-2 text-gray-300">This may take a moment, great art needs time!</p>
    </div>
  );
};

export default LoadingState;
