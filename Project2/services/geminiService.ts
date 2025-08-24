import { GoogleGenAI, Type } from "@google/genai";
import type { DiagnosisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    possibleConditions: {
      type: Type.ARRAY,
      description: "A list of possible medical conditions based on the symptoms. Provide at least 2-3 possibilities.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the possible condition.",
          },
          description: {
            type: Type.STRING,
            description: "A brief, easy-to-understand description of the condition and why it might be relevant based on the symptoms.",
          },
          severity: {
            type: Type.STRING,
            description: "An estimated severity level. Options must be one of: Mild, Moderate, Severe, Critical.",
          },
        },
        required: ["name", "description", "severity"],
      },
    },
    recommendations: {
      type: Type.ARRAY,
      description: "A list of concrete, actionable next steps for the user. Categorize each recommendation. You must use one of the following categories: 'Immediate Action', 'Consult a Doctor', 'Self-Care & Monitoring'.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: {
            type: Type.STRING,
            description: "The category of the recommendation. Choose from: 'Immediate Action', 'Consult a Doctor', 'Self-Care & Monitoring'."
          },
          advice: {
            type: Type.STRING,
            description: "The specific recommendation or advice text."
          }
        },
        required: ["category", "advice"],
      },
    },
    disclaimer: {
        type: Type.STRING,
        description: "A mandatory disclaimer stating that this is not a substitute for professional medical advice and the user should consult a doctor."
    }
  },
  required: ["possibleConditions", "recommendations", "disclaimer"],
};


export const getDiagnosis = async (symptoms: string): Promise<DiagnosisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following symptoms and provide potential conditions and recommendations: "${symptoms}"`,
      config: {
        systemInstruction: "You are an advanced AI medical assistant. Your role is to analyze user-provided symptoms and provide a list of possible medical conditions and actionable next steps. You must not provide a definitive diagnosis. Always prioritize user safety and strongly recommend consulting a healthcare professional. Your response must be in JSON format, strictly adhering to the provided schema.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the AI model.");
    }
    
    const parsedResult: DiagnosisResult = JSON.parse(jsonText);
    return parsedResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a diagnosis from the AI service.");
  }
};
