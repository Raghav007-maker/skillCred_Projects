import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-slate-200">
      <div className="flex justify-center items-center mb-4">
        <LogoIcon className="h-16 w-16 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Welcome to Nira
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Your personal AI-powered health assistant. Describe your symptoms in the box above to receive a preliminary analysis of potential conditions and recommended next steps.
      </p>
    </div>
  );
};
