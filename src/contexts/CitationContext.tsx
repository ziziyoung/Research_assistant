import { createContext, useContext, useState, ReactNode } from 'react';

export interface Citation {
  id: string;
  text: string;
  color: string;
  source: string;
  timestamp: Date;
}

export interface GeneratedTest {
  id: string;
  question: string;
  answer: string;
  citations: string[];
}

interface CitationContextType {
  citations: Citation[];
  addCitation: (citation: Omit<Citation, 'id' | 'timestamp'>) => void;
  clearCitations: () => void;
  generatedTests: GeneratedTest[];
  addTest: (test: Omit<GeneratedTest, 'id'>) => void;
}

const CitationContext = createContext<CitationContextType | undefined>(undefined);

const CITATION_COLORS = [
  'bg-yellow-200/50 dark:bg-yellow-500/30',
  'bg-blue-200/50 dark:bg-blue-500/30',
  'bg-green-200/50 dark:bg-green-500/30',
  'bg-purple-200/50 dark:bg-purple-500/30',
  'bg-pink-200/50 dark:bg-pink-500/30',
  'bg-orange-200/50 dark:bg-orange-500/30',
];

export const CitationProvider = ({ children }: { children: ReactNode }) => {
  const [citations, setCitations] = useState<Citation[]>([]);
  const [generatedTests, setGeneratedTests] = useState<GeneratedTest[]>([]);
  const [colorIndex, setColorIndex] = useState(0);

  const addCitation = (citation: Omit<Citation, 'id' | 'timestamp'>) => {
    const newCitation: Citation = {
      ...citation,
      id: Date.now().toString(),
      timestamp: new Date(),
      color: citation.color || CITATION_COLORS[colorIndex % CITATION_COLORS.length],
    };
    setCitations(prev => [...prev, newCitation]);
    setColorIndex(prev => prev + 1);
  };

  const clearCitations = () => {
    setCitations([]);
    setColorIndex(0);
  };

  const addTest = (test: Omit<GeneratedTest, 'id'>) => {
    const newTest: GeneratedTest = {
      ...test,
      id: Date.now().toString(),
    };
    setGeneratedTests(prev => [...prev, newTest]);
  };

  return (
    <CitationContext.Provider value={{ citations, addCitation, clearCitations, generatedTests, addTest }}>
      {children}
    </CitationContext.Provider>
  );
};

export const useCitations = () => {
  const context = useContext(CitationContext);
  if (!context) {
    throw new Error('useCitations must be used within CitationProvider');
  }
  return context;
};
