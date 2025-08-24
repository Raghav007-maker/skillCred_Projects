import React from 'react';
import type { DiagnosisResult, Condition, Recommendation } from '../types';

interface ResultsDisplayProps {
  results: DiagnosisResult;
}

const getSeverityClass = (severity: Condition['severity']) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-500';
    case 'Severe':
      return 'bg-orange-100 text-orange-800 border-orange-500';
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    case 'Mild':
      return 'bg-green-100 text-green-800 border-green-500';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-500';
  }
};

const ConditionCard: React.FC<{ condition: Condition }> = ({ condition }) => (
  <div className="bg-white rounded-lg p-5 border border-slate-200">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-bold text-slate-800">{condition.name}</h3>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getSeverityClass(condition.severity)}`}>
        {condition.severity}
      </span>
    </div>
    <p className="text-slate-600">{condition.description}</p>
  </div>
);

const categoryStyles: Record<string, { icon: JSX.Element; containerClasses: string; titleClasses: string; }> = {
    'Immediate Action': {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
        containerClasses: 'border-l-4 border-red-500 bg-red-50',
        titleClasses: 'text-red-800'
    },
    'Consult a Doctor': {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        containerClasses: 'border-l-4 border-blue-500 bg-blue-50',
        titleClasses: 'text-blue-800'
    },
    'Self-Care & Monitoring': {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
        containerClasses: 'border-l-4 border-green-500 bg-green-50',
        titleClasses: 'text-green-800'
    },
    'Default': {
        icon: <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
        containerClasses: 'border-l-4 border-slate-500 bg-slate-50',
        titleClasses: 'text-slate-800'
    }
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {

  const groupedRecommendations = results.recommendations.reduce((acc, rec) => {
    if (!acc[rec.category]) {
        acc[rec.category] = [];
    }
    acc[rec.category].push(rec);
    return acc;
}, {} as Record<string, Recommendation[]>);

const categoryOrder = ['Immediate Action', 'Consult a Doctor', 'Self-Care & Monitoring'];
const sortedCategories = Object.keys(groupedRecommendations).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
});


  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Possible Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.possibleConditions.map((condition, index) => (
            <ConditionCard key={index} condition={condition} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Recommended Next Steps</h2>
        <div className="space-y-4">
          {sortedCategories.map((category) => {
            const recs = groupedRecommendations[category];
            const style = categoryStyles[category] || categoryStyles['Default'];
            return (
              <div key={category} className={`bg-white p-5 rounded-lg ${style.containerClasses}`}>
                <h3 className={`flex items-center text-lg font-bold mb-3 ${style.titleClasses}`}>
                  {style.icon}
                  {category}
                </h3>
                <ul className="space-y-3 pl-8">
                  {recs.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      <span className="text-slate-700">{rec.advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      
      {results.disclaimer && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md mt-6" role="alert">
            <p className="font-bold">Important</p>
            <p>{results.disclaimer}</p>
        </div>
      )}
    </div>
  );
};
