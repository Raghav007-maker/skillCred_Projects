import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-slate-100 text-slate-600 text-xs p-4 rounded-lg border border-slate-200 text-center">
      <p>
        <strong className="font-semibold text-slate-700">Disclaimer:</strong> Nira is an informational tool and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
      </p>
    </div>
  );
};
