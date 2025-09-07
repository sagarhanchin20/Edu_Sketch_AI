
import React from 'react';
import { PanelData } from '../types';
import Panel from './Panel';

interface LearningGuideProps {
  panels: PanelData[];
}

const LearningGuide: React.FC<LearningGuideProps> = ({ panels }) => {
  return (
    <div className="mt-12 w-full max-w-3xl mx-auto">
      <div className="space-y-8">
        {panels.map((panel, index) => (
          <Panel key={index} panel={panel} />
        ))}
      </div>
    </div>
  );
};

export default LearningGuide;
