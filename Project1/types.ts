
export interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
}

export interface AnalysisResult {
  diagnoses: Diagnosis[];
  attentionMapUrl: string; // In this PoC, we'll simulate this.
  keyFindings: string;
}
