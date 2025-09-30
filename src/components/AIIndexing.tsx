import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Hash, 
  Image, 
  Code, 
  Clock,
  Search
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
      processingStatus: 'completed'
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
      processingStatus: 'completed'
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
      processingStatus: 'completed'
    }
  ]);

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => {
    const query = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.summary.toLowerCase().includes(query) ||
      doc.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
      doc.methodSummary.toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 border-b bg-card space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">AI Indexes</h2>
          <p className="text-sm text-muted-foreground">
            AI-generated document indexes with automatic summaries and metadata
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

      <div className="flex-1 overflow-auto">{/* Both horizontal and vertical scroll */}
        <div className="p-6 space-y-6">
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="pb-4 bg-muted/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold truncate">{doc.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{doc.literatureTime}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {doc.processingStatus}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,200px] gap-6">
                  {/* Main Content */}
                  <div className="space-y-6">
                    {/* Summary */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm text-foreground">Summary</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {doc.summary}
                      </p>
                    </div>

                    {/* Method Summary */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm text-foreground">Method Summary</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {doc.methodSummary}
                      </p>
                    </div>

                    {/* Keywords */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm text-foreground">Keywords</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doc.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs font-normal">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Code Address */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm text-foreground">Code Address</h4>
                      </div>
                      <a 
                        href={doc.codeAddress} 
                        className="text-sm text-primary hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.codeAddress}
                      </a>
                    </div>
                  </div>

                  {/* Thumbnail Sidebar */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3 self-start">
                      <Image className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm text-foreground">Thumbnail</h4>
                    </div>
                    <div className="w-full aspect-[3/4] bg-muted/50 rounded-lg border-2 border-border flex items-center justify-center">
                      <Image className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};