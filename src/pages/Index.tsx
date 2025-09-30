import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { AIIndexing } from "@/components/AIIndexing";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Plus, Upload, FileText, Bot, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
          <DocumentLibrary />
        </ResizablePanel>
        
        <ResizableHandle />

        {/* Main Content - Document Management */}
        <ResizablePanel defaultSize={58} minSize={40}>
          <div className="flex flex-col h-full">
            {/* Unified Header */}
            <div className="p-6 border-b bg-background flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Document Management</h1>
                  <p className="text-muted-foreground">Manage your documents with AI-powered indexing and organization</p>
                </div>
                <Bot className="h-8 w-8 text-primary" />
              </div>
              
              {/* Action Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">New</h3>
                    <p className="text-sm text-muted-foreground">Create a new document</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Upload className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Upload</h3>
                    <p className="text-sm text-muted-foreground">Upload local files</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Templates</h3>
                    <p className="text-sm text-muted-foreground">Go to template gallery</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content Tabs */}
            <div className="flex-1 min-h-0">
              <Tabs defaultValue="documents" className="w-full h-full flex flex-col">
                <TabsList className="grid w-fit grid-cols-4 mx-6 mt-4 mb-4 flex-shrink-0">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="ai-indexes" className="gap-1.5 bg-gradient-to-r from-primary/10 to-primary/5 data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                    AI Indexes
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="documents" className="flex-1 min-h-0 px-6 overflow-y-scroll">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="recent" className="flex-1 min-h-0 px-6 overflow-y-scroll">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="shared" className="flex-1 min-h-0 px-6 overflow-y-scroll">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="ai-indexes" className="flex-1 min-h-0 overflow-y-scroll">
                  <AIIndexing />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Sidebar - AI Assistant */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <AIAssistant />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
