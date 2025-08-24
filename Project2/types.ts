export interface Condition {
  name: string;
  description: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
}

export interface Recommendation {
  category: string;
  advice: string;
}

export interface DiagnosisResult {
  possibleConditions: Condition[];
  recommendations: Recommendation[];
  disclaimer: string;
}
