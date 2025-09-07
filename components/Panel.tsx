
import React from 'react';
import { PanelData } from '../types';

interface PanelProps {
  panel: PanelData;
}

const Panel: React.FC<PanelProps> = ({ panel }) => {
  return (
    <div className="bg-white/90 text-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg border border-white/20 transform hover:-translate-y-2 transition-transform duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
        {panel.imageSrc ? (
          <img src={panel.imageSrc} alt={panel.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-64 animate-pulse bg-gray-300 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-2xl text-gray-900">{panel.step}. {panel.title}</h3>
        <p className="mt-3 text-gray-700 leading-relaxed">{panel.explanation}</p>
      </div>
    </div>
  );
};

export default Panel;
