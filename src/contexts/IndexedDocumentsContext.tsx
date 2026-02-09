import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type KnowledgeGraphCategory = "computer-vision" | "nlp" | "machine-learning";

export interface DocumentIndex {
  id: string;
  name: string;
  summary: string;
  keywords: string[];
  thumbnail: string;
  methodSummary: string;
  codeAddress: string;
  downloadUrl: string;
  literatureTime: string;
  createdAt: string;
  readingStatus: "unread" | "reading" | "completed";
  conferenceJournal: string;
  datasets: string[];
  networkArchitectures: string[];
  innovation: string;
  author: string;
  citation: number;
  /** Knowledge graph category: CV / NLP / ML, used to merge into corresponding cluster */
  category: KnowledgeGraphCategory;
}

type PendingPdf = File | null;

interface IndexedDocumentsContextValue {
  documents: DocumentIndex[];
  addDocument: (doc: Omit<DocumentIndex, "id" | "createdAt">) => DocumentIndex;
  pendingPdfFile: PendingPdf;
  setPendingPdfFile: (file: PendingPdf) => void;
  isProcessingPdf: boolean;
  setProcessingPdf: (v: boolean) => void;
}

const IndexedDocumentsContext = createContext<IndexedDocumentsContextValue | null>(null);

const defaultDocuments: DocumentIndex[] = [
  {
    id: "doc_1",
    name: "Research_Paper_Analysis.pdf",
    summary: "Comprehensive analysis of machine learning algorithms and their applications in data science. This document explores various methodologies and provides insights into best practices for implementation.",
    keywords: ["machine learning", "algorithms", "data science", "analysis", "methodology"],
    thumbnail: "/api/placeholder/150/200",
    methodSummary: "Quantitative analysis using statistical methods and experimental validation with cross-validation techniques.",
    codeAddress: "https://github.com/research/ml-analysis/blob/main/analysis.py",
    downloadUrl: "https://arxiv.org/pdf/2024.12345.pdf",
    literatureTime: "2024-01-15",
    createdAt: "2024-01-15T10:30:00Z",
    readingStatus: "completed",
    conferenceJournal: "NeurIPS 2024",
    datasets: ["ImageNet", "COCO", "MNIST"],
    networkArchitectures: ["ResNet-50", "Transformer", "CNN"],
    innovation: "Novel attention mechanism that improves accuracy by 15% while reducing computational cost",
    author: "Smith, J., Johnson, A., & Wang, L.",
    citation: 1523,
    category: "machine-learning",
  },
  {
    id: "doc_2",
    name: "Technical_Documentation.md",
    summary: "Technical documentation covering API specifications, implementation guidelines, and system architecture. Includes detailed examples and code snippets for developers.",
    keywords: ["API", "documentation", "architecture", "development", "specifications"],
    thumbnail: "/api/placeholder/150/200",
    methodSummary: "Systematic documentation approach with structured content organization and practical examples.",
    codeAddress: "https://github.com/project/docs/blob/main/technical-guide.md",
    downloadUrl: "https://arxiv.org/pdf/2024.67890.pdf",
    literatureTime: "2024-01-20",
    createdAt: "2024-01-20T14:15:00Z",
    readingStatus: "reading",
    conferenceJournal: "ICML 2024",
    datasets: ["Custom Dataset", "OpenAI Gym"],
    networkArchitectures: ["GAN", "VAE"],
    innovation: "Introduces a hybrid architecture combining generative and discriminative models",
    author: "Chen, M., & Rodriguez, P.",
    citation: 847,
    category: "nlp",
  },
  {
    id: "doc_3",
    name: "Market_Research_Report.docx",
    summary: "Market analysis report examining current trends, competitive landscape, and growth opportunities in the technology sector. Contains statistical data and forecasting models.",
    keywords: ["market research", "trends", "competitive analysis", "technology", "forecasting"],
    thumbnail: "/api/placeholder/150/200",
    methodSummary: "Mixed-methods research combining quantitative market data analysis with qualitative stakeholder interviews.",
    codeAddress: "https://github.com/research/market-analysis/blob/main/report.R",
    downloadUrl: "https://arxiv.org/pdf/2024.11223.pdf",
    literatureTime: "2024-01-10",
    createdAt: "2024-01-10T09:45:00Z",
    readingStatus: "unread",
    conferenceJournal: "CVPR 2024",
    datasets: ["Market Data API", "Financial Reports"],
    networkArchitectures: ["LSTM", "GRU"],
    innovation: "Real-time market prediction using temporal attention mechanisms",
    author: "Thompson, R., & Lee, K.",
    citation: 2145,
    category: "computer-vision",
  },
];

export function IndexedDocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentIndex[]>(defaultDocuments);
  const [pendingPdfFile, setPendingPdfFile] = useState<PendingPdf>(null);
  const [isProcessingPdf, setProcessingPdf] = useState(false);

  const addDocument = useCallback((doc: Omit<DocumentIndex, "id" | "createdAt">) => {
    const newDoc: DocumentIndex = {
      ...doc,
      id: `doc_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setDocuments((prev) => [...prev, newDoc]);
    return newDoc;
  }, []);

  return (
    <IndexedDocumentsContext.Provider
      value={{
        documents,
        addDocument,
        pendingPdfFile,
        setPendingPdfFile,
        isProcessingPdf,
        setProcessingPdf,
      }}
    >
      {children}
    </IndexedDocumentsContext.Provider>
  );
}

export function useIndexedDocuments() {
  const ctx = useContext(IndexedDocumentsContext);
  if (!ctx) throw new Error("useIndexedDocuments must be used within IndexedDocumentsProvider");
  return ctx;
}
