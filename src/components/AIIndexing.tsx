import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Image,
  Search,
  ExternalLink,
  Download,
  Loader2,
} from "lucide-react";
import { useIndexedDocuments } from "@/contexts/IndexedDocumentsContext";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenAI } from "@google/genai";
import { classifyDocument } from "@/lib/classifyDocument";

const EXTRACTION_PROMPT = `You are analyzing an academic or technical PDF. Extract the following fields and return ONLY a valid JSON object (no markdown, no code fence) with these exact keys. Use empty string or empty array if not found. "title" must be the exact paper title as shown.

Important for downloadUrl: Prefer the official PDF URL of this paper if it appears in the document (e.g. arXiv PDF link like https://arxiv.org/pdf/xxxx.xxxxx.pdf, publisher PDF, project page PDF link, "available at" link). Must be a direct PDF URL (often ends with .pdf). If no such link is found, use empty string.

Important for keywords: Extract 3–8 representative keywords (e.g. task names, method names, dataset names, domain terms). Use lowercase; prefer terms that appear in the abstract or title.

{
  "title": "Full paper title as on the first page",
  "summary": "2-4 sentence summary of the paper",
  "keywords": ["keyword1", "keyword2", ...],
  "methodSummary": "Brief description of methods used",
  "author": "Author names as in the paper",
  "conferenceJournal": "Venue name e.g. NeurIPS 2024",
  "literatureTime": "Publication date or year",
  "datasets": ["Dataset1", "Dataset2", ...],
  "networkArchitectures": ["Architecture1", ...],
  "innovation": "Main contribution or innovation in 1-2 sentences",
  "codeAddress": "Code repository URL if mentioned, else empty string",
  "downloadUrl": "Official/source PDF URL if mentioned in the paper (e.g. arXiv, publisher), else empty string"
}`;

/** Citation count would require a backend proxy to Semantic Scholar (browser direct call hits CORS/429); not requested here */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64 ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function parseJsonFromText(text: string): Record<string, unknown> {
  let trimmed = text.trim();
  const codeBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) trimmed = codeBlock[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}") + 1;
  if (start === -1 || end <= start) throw new Error("No JSON object in response");
  return JSON.parse(trimmed.slice(start, end)) as Record<string, unknown>;
}

/** Infer source from download URL when Conference/Journal is empty */
function getSourceFromDownloadUrl(downloadUrl: string): string {
  if (!downloadUrl) return "";
  if (downloadUrl.startsWith("blob:")) return "Local upload";
  if (!downloadUrl.startsWith("http")) return "";
  const u = downloadUrl.toLowerCase();
  if (u.includes("arxiv.org")) return "arXiv";
  if (u.includes("openreview.net")) return "OpenReview";
  if (u.includes("cvf.openaccess.thecvf.com") || u.includes("openaccess.thecvf.com")) return "CVF Open Access";
  if (u.includes("aclanthology.org")) return "ACL Anthology";
  if (u.includes("proceedings.neurips.cc") || u.includes("papers.nips.cc")) return "NeurIPS";
  if (u.includes("proceedings.mlr.press")) return "PMLR";
  if (u.includes("ieee.org") || u.includes("ieeexplore")) return "IEEE";
  if (u.includes("springer.com") || u.includes("link.springer")) return "Springer";
  if (u.includes("sciencedirect.com") || u.includes("elsevier")) return "Elsevier";
  if (u.includes("acm.org") || u.includes("dl.acm.org")) return "ACM";
  if (u.includes("biorxiv.org")) return "bioRxiv";
  if (u.includes("medrxiv.org")) return "medRxiv";
  try {
    const host = new URL(downloadUrl).hostname.replace(/^www\./, "");
    return host || "";
  } catch {
    return "";
  }
}

export const AIIndexing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {
    documents,
    addDocument,
    pendingPdfFile,
    setPendingPdfFile,
    isProcessingPdf,
    setProcessingPdf,
  } = useIndexedDocuments();
  const { toast } = useToast();

  const processPdf = useCallback(
    async (file: File) => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        toast({ title: "API Key not configured", variant: "destructive" });
        setPendingPdfFile(null);
        setProcessingPdf(false);
        return;
      }
      setProcessingPdf(true);
      const fileName = file.name;
      try {
        const base64 = await fileToBase64(file);
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: base64,
                  },
                },
                { text: EXTRACTION_PROMPT },
              ],
            },
          ],
          config: { maxOutputTokens: 2048, temperature: 0.2 },
        });
        const rawText = response.text ?? "";
        const parsed = parseJsonFromText(rawText);
        const arr = (v: unknown): string[] =>
          Array.isArray(v) ? v.map((x) => String(x ?? "")).filter(Boolean) : [];
        const author = String(parsed.author ?? "");
        const summary = String(parsed.summary ?? "");
        const keywords = arr(parsed.keywords);
        const category = classifyDocument(summary, keywords);
        const rawDownloadUrl = String(parsed.downloadUrl ?? "").trim();
        const isHttpUrl = /^https?:\/\/.+/.test(rawDownloadUrl);
        const downloadUrl = isHttpUrl ? rawDownloadUrl : URL.createObjectURL(file);
        const newDoc = addDocument({
          name: fileName,
          summary,
          keywords,
          category,
          thumbnail: "/api/placeholder/150/200",
          methodSummary: String(parsed.methodSummary ?? ""),
          codeAddress: String(parsed.codeAddress ?? ""),
          downloadUrl,
          literatureTime: String(parsed.literatureTime ?? ""),
          readingStatus: "unread",
          conferenceJournal: String(parsed.conferenceJournal ?? ""),
          datasets: arr(parsed.datasets),
          networkArchitectures: arr(parsed.networkArchitectures),
          innovation: String(parsed.innovation ?? ""),
          author,
          citation: 0,
        });
        toast({ title: "Index created", description: `AI index generated for ${fileName}` });
        navigate(`/file/${newDoc.id}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to process PDF";
        const detail = err instanceof Error ? err.stack : String(err);
        console.error("[AIIndexing] PDF processing failed:", message, detail);
        toast({
          title: "Index generation failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setProcessingPdf(false);
      }
    },
    [addDocument, setPendingPdfFile, setProcessingPdf, toast, navigate]
  );

  useEffect(() => {
    if (!pendingPdfFile) return;
    const file = pendingPdfFile;
    setPendingPdfFile(null);
    processPdf(file);
  }, [pendingPdfFile, processPdf, setPendingPdfFile]);

  const filteredDocuments = documents
    .filter((doc) => {
      const query = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(query) ||
        doc.summary.toLowerCase().includes(query) ||
        doc.keywords.some((k) => k.toLowerCase().includes(query)) ||
        doc.methodSummary.toLowerCase().includes(query) ||
        doc.conferenceJournal.toLowerCase().includes(query) ||
        doc.datasets.some((d) => d.toLowerCase().includes(query)) ||
        doc.networkArchitectures.some((a) => a.toLowerCase().includes(query)) ||
        doc.innovation.toLowerCase().includes(query) ||
        doc.author.toLowerCase().includes(query) ||
        doc.citation.toString().includes(query)
      );
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="h-full flex flex-col bg-background relative">
      {isProcessingPdf && (
        <div className="absolute inset-0 bg-background/80 z-10 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm font-medium">Generating AI index from paper…</p>
        </div>
      )}
      <div className="p-6 border-b bg-card space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">AI Indexes</h2>
          <p className="text-sm text-muted-foreground">
            AI-generated document indexes with automatic summaries and metadata. Upload a PDF via the Upload button to generate an index.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents by name, summary, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query or upload a PDF to generate indexes
            </p>
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Conference/Journal</TableHead>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[180px]">publication date</TableHead>
                  <TableHead className="min-w-[250px]">Author</TableHead>
                  <TableHead className="min-w-[120px]">Citation</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[400px]">Summary</TableHead>
                  <TableHead className="min-w-[300px]">Methods</TableHead>
                  <TableHead className="min-w-[250px]">Keywords</TableHead>
                  <TableHead className="min-w-[200px]">Datasets</TableHead>
                  <TableHead className="min-w-[250px]">Network Architectures</TableHead>
                  <TableHead className="min-w-[350px]">Innovation</TableHead>
                  <TableHead className="min-w-[120px]">Notes</TableHead>
                  <TableHead className="min-w-[300px]">Code Address</TableHead>
                  <TableHead className="min-w-[200px]">Download URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="text-sm">
                      {doc.conferenceJournal.trim() ||
                        getSourceFromDownloadUrl(doc.downloadUrl) ||
                        "—"}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        to={`/file/${doc.id}`}
                        className="text-primary hover:underline"
                      >
                        {doc.name.replace(/\.[^/.]+$/, "")}
                      </Link>
                    </TableCell>
                    <TableCell>{doc.literatureTime}</TableCell>
                    <TableCell className="text-sm">{doc.author}</TableCell>
                    <TableCell className="text-sm font-medium">
                      {doc.citation.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.readingStatus === "completed"
                            ? "default"
                            : doc.readingStatus === "reading"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {doc.readingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{doc.summary}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {doc.methodSummary}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.datasets.map((dataset, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {dataset}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.networkArchitectures.map((arch, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {arch}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{doc.innovation}</TableCell>
                    <TableCell>
                      <div className="w-20 h-24 bg-muted/50 rounded border flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.codeAddress ? (
                        <a
                          href={doc.codeAddress}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="truncate max-w-[250px]">{doc.codeAddress}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {doc.downloadUrl ? (
                        <a
                          href={doc.downloadUrl}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Download className="h-4 w-4 shrink-0" />
                          <span>Download PDF</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
