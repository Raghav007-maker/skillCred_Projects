import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto p-4 flex items-center justify-center md:justify-start">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-10 w-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Nira
          </h1>
        </div>
      </div>
    </header>
  );
};
