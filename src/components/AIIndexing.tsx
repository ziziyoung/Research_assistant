import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Hash, 
  Image, 
  Code, 
  Clock
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

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-foreground mb-2">AI Indexes</h2>
        <p className="text-sm text-muted-foreground">
          Display AI-generated document indexes with automatic summaries, keyword annotations, thumbnails, method summaries, code addresses, and literature times
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="mb-4 p-3 bg-muted/50 rounded-lg mx-4 mt-4">
          <h3 className="font-medium text-sm text-foreground">AI-Generated Index Display</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Displaying AI-generated document indexes with automatic summaries, keyword annotations, thumbnails, method summaries, code addresses, and literature times
          </p>
        </div>
        
        <ScrollArea className="h-full px-4">
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{doc.name}</CardTitle>
                    <Badge variant="default">
                      {doc.processingStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4" />
                          Summary
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{doc.summary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-sm">
                          <Hash className="h-4 w-4" />
                          Keywords
                        </h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-sm">
                          <Code className="h-4 w-4" />
                          Method Summary
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{doc.methodSummary}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-sm">
                          <Image className="h-4 w-4" />
                          Thumbnail
                        </h4>
                        <div className="mt-1 w-24 h-32 bg-muted rounded border flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          Literature Time
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{doc.literatureTime}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm">Code Address</h4>
                        <a 
                          href={doc.codeAddress} 
                          className="text-sm text-primary hover:underline mt-1 block truncate"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.codeAddress}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};