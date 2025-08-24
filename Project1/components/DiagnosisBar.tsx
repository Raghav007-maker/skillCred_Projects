
import React from 'react';
import type { Diagnosis } from '../types';

interface DiagnosisBarProps {
  diagnosis: Diagnosis;
  isTop: boolean;
}

const getBarColor = (probability: number): string => {
  if (probability > 0.75) return 'bg-red-500';
  if (probability > 0.5) return 'bg-orange-500';
  if (probability > 0.2) return 'bg-yellow-500';
  return 'bg-green-500';
};


const DiagnosisBar: React.FC<DiagnosisBarProps> = ({ diagnosis, isTop }) => {
  const { condition, probability, description } = diagnosis;
  const percentage = (probability * 100).toFixed(1);
  const barColor = getBarColor(probability);

  return (
    <div className={`p-4 rounded-lg transition-all duration-300 ${isTop ? 'bg-slate-700/80 ring-2 ring-cyan-400' : 'bg-slate-700/50'}`}>
      <div className="flex justify-between items-center">
        <span className={`font-semibold ${isTop ? 'text-cyan-300' : 'text-slate-200'}`}>{condition}</span>
        <span className={`font-mono text-lg font-bold ${isTop ? 'text-white' : 'text-slate-300'}`}>{percentage}%</span>
      </div>
      <p className="text-sm text-slate-400 mt-1 mb-3">{description}</p>
      <div className="w-full bg-slate-600 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DiagnosisBar;