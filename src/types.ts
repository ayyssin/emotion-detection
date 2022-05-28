export interface Post {
  username?: string;
  content: string;
  analysis: string;
}

interface spanScore {
  begin: number;
  end: number;
  score: {
    type: string;
    probability: number;
  };
}

export interface attack {
  spanScores: spanScore[];
  summaryScore: {
    type: string;
    value: number;
  };
}

export interface PostAnalysis {
  attributeScores: {
    IDENTITY_ATTACK: attack;
    INSULT: attack;
    PROFANITY: attack;
    SEVERE_TOXICITY: attack;
    TOXICITY: attack;
  };
  detectedLanguages: string[];
  languages: string[];
}
