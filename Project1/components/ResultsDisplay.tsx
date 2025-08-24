
import React from 'react';
import type { AnalysisResult } from '../types';
import DiagnosisBar from './DiagnosisBar';

interface ResultsDisplayProps {
  imageUrl: string;
  results: AnalysisResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ imageUrl, results, onReset }) => {
  const { diagnoses, keyFindings } = results;

  // Find the top diagnosis to highlight
  const topDiagnosis = [...diagnoses].sort((a, b) => b.probability - a.probability)[0];

  return (
    <div className="w-full max-w-5xl bg-slate-800/70 rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Images Section */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-slate-300 mb-2">Original X-Ray</h3>
            <div className="aspect-square w-full bg-black rounded-lg overflow-hidden shadow-lg">
              <img src={imageUrl} alt="Original X-Ray" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-col items-center">
             <h3 className="text-lg font-semibold text-slate-300 mb-2">AI Attention Map</h3>
             <div className="aspect-square w-full bg-black rounded-lg overflow-hidden shadow-lg relative">
                <img src={imageUrl} alt="X-Ray with attention map" className="w-full h-full object-contain" />
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-red-500/80 via-yellow-500/0 to-blue-500/0 mix-blend-color-dodge"
                  style={{ maskImage: 'radial-gradient(circle at 70% 40%, black 0%, transparent 60%)' }}
                ></div>
             </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="flex-1 md:max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Analysis Results</h2>
          
          <div className="mb-6 p-4 bg-slate-900/70 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-cyan-300 mb-2 text-sm uppercase tracking-wider">Key Findings</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{keyFindings}</p>
          </div>

          <h3 className="text-lg font-semibold text-slate-300 mb-4">Differential Diagnosis</h3>
          <div className="space-y-4">
            {diagnoses.sort((a, b) => b.probability - a.probability).map((diag) => (
              <DiagnosisBar key={diag.condition} diagnosis={diag} isTop={diag.condition === topDiagnosis.condition} />
            ))}
          </div>
        </div>

      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-700 flex justify-center">
          <button 
            onClick={onReset} 
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Analyze Another Image
          </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
