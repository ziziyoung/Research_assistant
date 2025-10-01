import { useState } from "react";
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
  ExternalLink
} from "lucide-react";

interface DocumentIndex {
  id: string;
  name: string;
  summary: string;
  keywords: string[];
  thumbnail: string;
  methodSummary: string;
  codeAddress: string;
  literatureTime: string;
  createdAt: string;
  processingStatus: 'completed';
  conferenceJournal: string;
  datasets: string[];
  networkArchitectures: string[];
  innovation: string;
  notes: string;
  author: string;
  citation: number;
}

export const AIIndexing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample AI-generated indexes for display
  const [documents] = useState<DocumentIndex[]>([
    {
      id: "doc_1",
      name: "Research_Paper_Analysis.pdf",
      summary: "Comprehensive analysis of machine learning algorithms and their applications in data science. This document explores various methodologies and provides insights into best practices for implementation.",
      keywords: ["machine learning", "algorithms", "data science", "analysis", "methodology"],
      thumbnail: "/api/placeholder/150/200",
      methodSummary: "Quantitative analysis using statistical methods and experimental validation with cross-validation techniques.",
      codeAddress: "https://github.com/research/ml-analysis/blob/main/analysis.py",
      literatureTime: "2024-01-15",
      createdAt: "2024-01-15T10:30:00Z",
      processingStatus: 'completed',
      conferenceJournal: "NeurIPS 2024",
      datasets: ["ImageNet", "COCO", "MNIST"],
      networkArchitectures: ["ResNet-50", "Transformer", "CNN"],
      innovation: "Novel attention mechanism that improves accuracy by 15% while reducing computational cost",
      notes: "Experimental results validated across multiple datasets with consistent improvements",
      author: "Smith, J., Johnson, A., & Wang, L.",
      citation: 1523
    },
    {
      id: "doc_2", 
      name: "Technical_Documentation.md",
      summary: "Technical documentation covering API specifications, implementation guidelines, and system architecture. Includes detailed examples and code snippets for developers.",
      keywords: ["API", "documentation", "architecture", "development", "specifications"],
      thumbnail: "/api/placeholder/150/200",
      methodSummary: "Systematic documentation approach with structured content organization and practical examples.",
      codeAddress: "https://github.com/project/docs/blob/main/technical-guide.md",
      literatureTime: "2024-01-20",
      createdAt: "2024-01-20T14:15:00Z",
      processingStatus: 'completed',
      conferenceJournal: "ICML 2024",
      datasets: ["Custom Dataset", "OpenAI Gym"],
      networkArchitectures: ["GAN", "VAE"],
      innovation: "Introduces a hybrid architecture combining generative and discriminative models",
      notes: "Code implementation available with detailed API documentation",
      author: "Chen, M., & Rodriguez, P.",
      citation: 847
    },
    {
      id: "doc_3",
      name: "Market_Research_Report.docx", 
      summary: "Market analysis report examining current trends, competitive landscape, and growth opportunities in the technology sector. Contains statistical data and forecasting models.",
      keywords: ["market research", "trends", "competitive analysis", "technology", "forecasting"],
      thumbnail: "/api/placeholder/150/200",
      methodSummary: "Mixed-methods research combining quantitative market data analysis with qualitative stakeholder interviews.",
      codeAddress: "https://github.com/research/market-analysis/blob/main/report.R",
      literatureTime: "2024-01-10",
      createdAt: "2024-01-10T09:45:00Z",
      processingStatus: 'completed',
      conferenceJournal: "CVPR 2024",
      datasets: ["Market Data API", "Financial Reports"],
      networkArchitectures: ["LSTM", "GRU"],
      innovation: "Real-time market prediction using temporal attention mechanisms",
      notes: "Includes comprehensive statistical analysis with R implementation",
      author: "Thompson, R., & Lee, K.",
      citation: 2145
    }
  ]);

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => {
    const query = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.summary.toLowerCase().includes(query) ||
      doc.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
      doc.methodSummary.toLowerCase().includes(query) ||
      doc.conferenceJournal.toLowerCase().includes(query) ||
      doc.datasets.some(dataset => dataset.toLowerCase().includes(query)) ||
      doc.networkArchitectures.some(arch => arch.toLowerCase().includes(query)) ||
      doc.innovation.toLowerCase().includes(query) ||
      doc.notes.toLowerCase().includes(query) ||
      doc.author.toLowerCase().includes(query) ||
      doc.citation.toString().includes(query)
    );
  });

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-6 py-4 border-b bg-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-foreground">AI Indexes</h2>
            <p className="text-xs text-muted-foreground">
              {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'}
            </p>
          </div>
        </div>
        
        {/* Modern Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-20 h-10 border-2 focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all text-xs"
            onClick={() => setSearchQuery("NeurIPS")}
          >
            NeurIPS
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all text-xs"
            onClick={() => setSearchQuery("CVPR")}
          >
            CVPR
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all text-xs"
            onClick={() => setSearchQuery("Transformer")}
          >
            Transformer
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all text-xs"
            onClick={() => setSearchQuery("CNN")}
          >
            CNN
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No results found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try different keywords or clear filters
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-primary hover:underline font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[250px]">Author</TableHead>
                  <TableHead className="min-w-[120px]">Citation</TableHead>
                  <TableHead className="min-w-[180px]">Conference/Journal</TableHead>
                  <TableHead className="min-w-[120px]">Literature Time</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[400px]">Summary</TableHead>
                  <TableHead className="min-w-[300px]">Method Summary</TableHead>
                  <TableHead className="min-w-[250px]">Keywords</TableHead>
                  <TableHead className="min-w-[200px]">Datasets</TableHead>
                  <TableHead className="min-w-[250px]">Network Architectures</TableHead>
                  <TableHead className="min-w-[350px]">Innovation</TableHead>
                  <TableHead className="min-w-[300px]">Notes</TableHead>
                  <TableHead className="min-w-[300px]">Code Address</TableHead>
                  <TableHead className="min-w-[120px]">Thumbnail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell className="text-sm">{doc.author}</TableCell>
                    <TableCell className="text-sm font-medium">
                      {doc.citation.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{doc.conferenceJournal}</TableCell>
                    <TableCell>{doc.literatureTime}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.processingStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {doc.summary}
                    </TableCell>
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
                    <TableCell className="text-sm text-muted-foreground">
                      {doc.innovation}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {doc.notes}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={doc.codeAddress} 
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="truncate max-w-[250px]">{doc.codeAddress}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="w-20 h-24 bg-muted/50 rounded border flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground/50" />
                      </div>
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