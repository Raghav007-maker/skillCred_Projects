
import React, { useState } from 'react';
import { Header } from './components/Header';
import { SymptomInputForm } from './components/SymptomInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Disclaimer } from './components/Disclaimer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getDiagnosis } from './services/geminiService';
import type { DiagnosisResult } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [results, setResults] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSymptomSubmit = async (symptoms: string) => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms before submitting.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const diagnosis = await getDiagnosis(symptoms);
      setResults(diagnosis);
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing your symptoms. Please check your connection or API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <SymptomInputForm onSubmit={handleSymptomSubmit} isLoading={isLoading} />
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            {results ? (
              <ResultsDisplay results={results} />
            ) : (
              !isLoading && !error && <WelcomeScreen />
            )}
          </div>
        </div>
      </main>
      <footer className="w-full py-6 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <Disclaimer />
        </div>
      </footer>
    </div>
  );
};

export default App;
