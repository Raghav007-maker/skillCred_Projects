import React, { useState } from 'react';

interface SymptomInputFormProps {
  onSubmit: (symptoms: string) => void;
  isLoading: boolean;
}

export const SymptomInputForm: React.FC<SymptomInputFormProps> = ({ onSubmit, isLoading }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(symptoms);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
      <form onSubmit={handleSubmit}>
        <label htmlFor="symptoms" className="block text-lg font-semibold text-slate-700 mb-2">
          Describe your symptoms
        </label>
        <p className="text-sm text-slate-500 mb-4">
          Please be as detailed as possible. Include when the symptoms started, their severity, and any other relevant information.
        </p>
        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g., 'I have a persistent dry cough, a headache, and a slight fever of 100.4°F for the past 3 days...'"
          className="w-full h-40 p-3 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y text-slate-900 placeholder:text-slate-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !symptoms.trim()}
          className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Symptoms'
          )}
        </button>
      </form>
    </div>
  );
};
