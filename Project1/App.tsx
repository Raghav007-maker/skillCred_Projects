import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult } from './types';
import Logo from './components/Logo';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';


// Helper function to convert a File object to a GoogleGenAI.Part object.
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}


// Gemini analysis hook to replace the mock one
const useGeminiAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const analyzeImage = useCallback(async (imageFile: File) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    if (!process.env.API_KEY) {
      setError("API key is not configured. This is a developer error and the app cannot function.");
      setIsLoading(false);
      return;
    }

    try {
      if (imageFile.size > 10 * 1024 * 1024) { // 10MB limit
         throw new Error("File is too large. Please upload an image under 10MB.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imagePart = await fileToGenerativePart(imageFile);
      
      const prompt = `You are a highly skilled radiology AI assistant. Your task is to analyze the provided chest X-ray image with meticulous detail.

      First, provide a summary of your key findings in a 'keyFindings' field. In a few sentences, describe any notable observations, such as opacities, infiltrates, effusions, cardiothoracic ratio, or any other abnormalities. If the image appears normal, state that. This summary should be clinical and concise.
      
      Second, based on your findings, provide a list of the top 3-5 most likely differential diagnoses. Each diagnosis must include:
      1. 'condition': The name of the condition (e.g., 'Pneumonia', 'Normal', 'Cardiomegaly').
      2. 'probability': A numerical value between 0 and 1 representing the likelihood.
      3. 'description': A brief, one-sentence clinical description of the condition.
      
      Always include 'Normal' as a possibility in your list of diagnoses.
      
      Return ONLY a single JSON object that adheres to the provided schema. Do not include any other text, greetings, or markdown formatting.`;

      const responseSchema = {
          type: Type.OBJECT,
          properties: {
              keyFindings: {
                  type: Type.STRING,
                  description: "A summary of the AI's clinical observations from the X-ray image."
              },
              diagnoses: {
                  type: Type.ARRAY,
                  items: {
                      type: Type.OBJECT,
                      properties: {
                          condition: { type: Type.STRING },
                          probability: { type: Type.NUMBER },
                          description: { type: Type.STRING }
                      },
                      required: ["condition", "probability", "description"]
                  }
              }
          },
          required: ["keyFindings", "diagnoses"]
      };
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }, imagePart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.2,
        }
      });
      
      const analysisResultData = JSON.parse(response.text);

      const fullResults: AnalysisResult = {
        ...analysisResultData,
        attentionMapUrl: 'simulated', // Keep simulated attention map for UI
      };
      
      setResults(fullResults);

    } catch (e: unknown) {
        console.error(e);
        if (e instanceof Error) {
            setError(`Analysis failed: ${e.message}`);
        } else {
            setError('An unknown error occurred during analysis. Please check the console for details.');
        }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, results, analyzeImage };
};


export default function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { isLoading, error, results, analyzeImage } = useGeminiAnalysis();

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    analyzeImage(imageFile);

    // Clean up the object URL on component unmount or when file changes
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    // The results, error, and loading states are reset inside the hook
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-5xl flex items-center justify-between pb-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <Logo className="h-10 w-10 text-cyan-400" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">MediScan AI</h1>
            <p className="text-sm text-slate-400">X-Ray Image Analysis POC</p>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-5xl flex flex-col items-center justify-center py-8">
        {!previewUrl && <ImageUploader onImageUpload={setImageFile} />}
        
        {previewUrl && (
          <div className="w-full flex flex-col items-center gap-6">
            {isLoading && (
              <div className="flex flex-col items-center text-center p-8 bg-slate-800/50 rounded-lg">
                <Spinner />
                <p className="mt-4 text-lg font-medium text-cyan-300">Analyzing Image...</p>
                <p className="text-slate-400">Our AI is processing the X-Ray. This may take a moment.</p>
              </div>
            )}

            {error && (
               <div className="w-full max-w-2xl text-center p-6 bg-red-900/50 border border-red-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-300">Analysis Failed</h3>
                  <p className="mt-2 text-red-400">{error}</p>
                   <button 
                    onClick={handleReset} 
                    className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200">
                      Try Again
                  </button>
               </div>
            )}

            {results && !isLoading && (
              <ResultsDisplay 
                imageUrl={previewUrl}
                results={results}
                onReset={handleReset}
              />
            )}
          </div>
        )}
      </main>

      <footer className="w-full max-w-5xl text-center py-4 mt-auto border-t border-slate-700">
        <p className="text-xs text-slate-500">
          <strong>Disclaimer:</strong> This is a proof-of-concept application for demonstration purposes only.
          It is not a medical device and should not be used for actual medical diagnosis or treatment decisions.
        </p>
      </footer>
    </div>
  );
}