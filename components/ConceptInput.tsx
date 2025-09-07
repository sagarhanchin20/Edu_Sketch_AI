
import React, { useState } from 'react';

interface ConceptInputProps {
  onGenerate: (concept: string) => void;
  isLoading: boolean;
}

const ConceptInput: React.FC<ConceptInputProps> = ({ onGenerate, isLoading }) => {
  const [concept, setConcept] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(concept);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="e.g., Photosynthesis, The Water Cycle..."
          className="w-full px-4 py-3 bg-gray-900/50 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Create Guide'
          )}
        </button>
      </div>
    </form>
  );
};

export default ConceptInput;
