import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { AIIndexing } from "@/components/AIIndexing";
import { AIKnowledgeGraph } from "@/components/AIKnowledgeGraph";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Plus, Upload, Bot, Sparkles, Network } from "lucide-react";
import { CitationProvider } from "@/contexts/CitationContext";
import { useIndexedDocuments } from "@/contexts/IndexedDocumentsContext";
import { useToast } from "@/hooks/use-toast";

function IndexContent() {
  const [activeTab, setActiveTab] = useState("documents");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setPendingPdfFile } = useIndexedDocuments();
  const { toast } = useToast();

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      e.target.value = "";
      return;
    }
    if (file.type !== "application/pdf") {
      toast({ title: "Please select a PDF file", variant: "destructive" });
      e.target.value = "";
      return;
    }
    setPendingPdfFile(file);
    setActiveTab("ai-indexes");
    e.target.value = "";
  };

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      <Header />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
          <div className="h-full min-h-0">
            <DocumentLibrary />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />

        {/* Main Content - Document Management */}
        <ResizablePanel defaultSize={58} minSize={40}>
          <div className="flex flex-col h-full min-h-0">
            {/* Unified Header */}
            <div className="px-6 pt-4 pb-3 border-b bg-background flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">Document Management</h1>
                    <p className="text-xs text-muted-foreground">AI-powered indexing and organization</p>
                  </div>
                </div>
                
                {/* Modern Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    className="gap-2 h-9 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">New</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 h-9 px-4 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover:scale-105 hover:shadow-md"
                    onClick={handleUploadClick}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="font-medium">Upload</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content Tabs */}
            <div className="flex-1 min-h-0">
              <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" aria-label="Upload PDF" onChange={handleFileChange} />
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
                <TabsList className="grid w-fit grid-cols-4 mx-6 mt-4 mb-4 flex-shrink-0">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="ai-indexes" className="gap-1.5 bg-gradient-to-r from-primary/10 to-primary/5 data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                    AI Indexes
                  </TabsTrigger>
                  <TabsTrigger value="knowledge-graph" className="gap-1.5 bg-gradient-to-r from-primary/10 to-primary/5 data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground">
                    <Network className="h-4 w-4" />
                    Knowledge Graph
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="documents" className="flex-1 min-h-0 px-6 scrollbar-visible">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="shared" className="flex-1 min-h-0 px-6 scrollbar-visible">
                  <DocumentTable filter="shared" />
                </TabsContent>
                
                <TabsContent value="ai-indexes" className="flex-1 min-h-0 scrollbar-visible">
                  <AIIndexing />
                </TabsContent>
                
                <TabsContent value="knowledge-graph" className="flex-1 min-h-0 scrollbar-visible">
                  <AIKnowledgeGraph />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Sidebar - AI Assistant */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="h-full min-h-0">
            <CitationProvider>
              <AIAssistant />
            </CitationProvider>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default IndexContent;
