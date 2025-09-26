import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Hash, 
  Image, 
  Code, 
  Clock, 
  Upload, 
  RefreshCw, 
  Download,
  Trash2,
  Eye
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
  processingStatus: 'pending' | 'processing' | 'completed' | 'error';
}

export const AIIndexing = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentIndex[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startBatchProcessing = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate AI processing
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const newDoc: DocumentIndex = {
        id: `doc_${Date.now()}_${i}`,
        name: file.name,
        summary: `AI-generated summary for ${file.name}. This document contains important information about the topic and provides comprehensive analysis of the subject matter.`,
        keywords: [`keyword${i + 1}`, `tag${i + 1}`, "analysis", "document", "research"],
        thumbnail: `/api/placeholder/150/200`,
        methodSummary: `Method analysis: This document uses analytical approach with systematic methodology.`,
        codeAddress: `https://github.com/example/repo/blob/main/${file.name}`,
        literatureTime: "2024-01-15",
        createdAt: new Date().toISOString(),
        processingStatus: 'processing'
      };

      setDocuments(prev => [...prev, { ...newDoc, processingStatus: 'processing' }]);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDoc.id 
            ? { ...doc, processingStatus: 'completed' } 
            : doc
        )
      );
      
      setProcessingProgress(((i + 1) / selectedFiles.length) * 100);
    }

    setIsProcessing(false);
    setSelectedFiles([]);
    
    toast({
      title: "Processing completed",
      description: `Successfully processed ${selectedFiles.length} documents`,
    });
  };

  const regenerateIndex = async (docId: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === docId 
          ? { ...doc, processingStatus: 'processing' } 
          : doc
      )
    );

    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === docId 
          ? { 
              ...doc, 
              processingStatus: 'completed',
              summary: `Regenerated AI summary for ${doc.name}. Enhanced analysis with updated insights and comprehensive review.`,
              keywords: [...doc.keywords, "updated", "enhanced"]
            } 
          : doc
      )
    );

    toast({
      title: "Index regenerated",
      description: "Document index has been updated successfully",
    });
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Document removed",
      description: "Document has been removed from index",
    });
  };

  const exportIndexes = () => {
    const dataStr = JSON.stringify(documents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-indexes.json';
    link.click();
    
    toast({
      title: "Indexes exported",
      description: "AI indexes have been exported successfully",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-foreground mb-2">AI Indexes</h2>
        <p className="text-sm text-muted-foreground">
          Automatically generate summaries, keywords, and metadata for your documents
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="upload">Upload & Process</TabsTrigger>
            <TabsTrigger value="indexes">Generated Indexes</TabsTrigger>
            <TabsTrigger value="management">Batch Management</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="flex-1 p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Selected Files ({selectedFiles.length})</h4>
                    <ScrollArea className="h-32">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Processing documents...</span>
                      <span className="text-sm">{Math.round(processingProgress)}%</span>
                    </div>
                    <Progress value={processingProgress} />
                  </div>
                )}

                <Button 
                  onClick={startBatchProcessing} 
                  disabled={selectedFiles.length === 0 || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "Processing..." : "Start AI Indexing"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indexes" className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No indexed documents yet. Upload and process documents to see AI-generated indexes here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{doc.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant={doc.processingStatus === 'completed' ? 'default' : 'secondary'}>
                              {doc.processingStatus}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => regenerateIndex(doc.id)}
                              disabled={doc.processingStatus === 'processing'}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteDocument(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="management" className="flex-1 p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Batch Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={exportIndexes}
                    disabled={documents.length === 0}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export All Indexes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      documents.forEach(doc => regenerateIndex(doc.id));
                    }}
                    disabled={documents.length === 0}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate All
                  </Button>
                </div>

                <div className="border rounded p-4 space-y-2">
                  <h4 className="font-medium">Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Documents:</span>
                      <span className="ml-2 font-medium">{documents.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="ml-2 font-medium">
                        {documents.filter(d => d.processingStatus === 'completed').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Processing:</span>
                      <span className="ml-2 font-medium">
                        {documents.filter(d => d.processingStatus === 'processing').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pending:</span>
                      <span className="ml-2 font-medium">
                        {documents.filter(d => d.processingStatus === 'pending').length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};