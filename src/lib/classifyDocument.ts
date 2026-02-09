import type { KnowledgeGraphCategory } from "@/contexts/IndexedDocumentsContext";

const CV_TERMS = [
  "image", "vision", "visual", "segmentation", "detection", "cnn", "convolutional",
  "object detection", "semantic", "pixel", "video", "camera", "recognition",
  "resnet", "yolo", "mask", "bounding box", "optical flow", "3d reconstruction",
  "medical image", "radiology", "x-ray", "mri", "ct scan",
];
const NLP_TERMS = [
  "language", "nlp", "natural language", "text", "transformer", "bert", "attention",
  "translation", "summarization", "embedding", "token", "sentence", "word",
  "gpt", "llm", "generation", "question answering", "named entity", "parsing",
  "speech", "speech recognition", "asr", "tts",
];
const ML_TERMS = [
  "machine learning", "learning", "training", "neural", "model", "classification",
  "regression", "reinforcement", "rl", "optimization", "gradient", "backprop",
  "few-shot", "transfer learning", "fine-tuning", "representation",
];

function scoreCategory(text: string, terms: string[]): number {
  const lower = text.toLowerCase();
  return terms.filter((t) => lower.includes(t)).length;
}

/**
 * Classify document into CV / NLP / ML from summary and keywords for knowledge graph.
 */
export function classifyDocument(summary: string, keywords: string[]): KnowledgeGraphCategory {
  const combined = `${summary} ${keywords.join(" ")}`;
  const cvScore = scoreCategory(combined, CV_TERMS);
  const nlpScore = scoreCategory(combined, NLP_TERMS);
  const mlScore = scoreCategory(combined, ML_TERMS);
  const max = Math.max(cvScore, nlpScore, mlScore);
  if (max === 0) return "machine-learning";
  if (cvScore === max) return "computer-vision";
  if (nlpScore === max) return "nlp";
  return "machine-learning";
}
