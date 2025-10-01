import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { AIIndexing } from "@/components/AIIndexing";
import { AIKnowledgeGraph } from "@/components/AIKnowledgeGraph";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Plus, Upload, FileText, Bot, Sparkles, Network } from "lucide-react";

const Index = () => {
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
                  <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h1 className="text-xl font-bold text-foreground">Document Management</h1>
                    <p className="text-xs text-muted-foreground">AI-powered indexing and organization</p>
                  </div>
                </div>
                
                {/* Compact Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="default" size="sm" className="gap-2 h-8">
                    <Plus className="h-4 w-4" />
                    New
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content Tabs */}
            <div className="flex-1 min-h-0">
              <Tabs defaultValue="documents" className="w-full h-full flex flex-col">
                <TabsList className="grid w-fit grid-cols-5 mx-6 mt-4 mb-4 flex-shrink-0">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
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
                
                <TabsContent value="recent" className="flex-1 min-h-0 px-6 scrollbar-visible">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="shared" className="flex-1 min-h-0 px-6 scrollbar-visible">
                  <DocumentTable />
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
            <AIAssistant />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
