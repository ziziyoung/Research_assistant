import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { AIIndexing } from "@/components/AIIndexing";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Plus, Upload, FileText, Bot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
          <div className="h-full w-full overflow-hidden">
            <DocumentLibrary />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />

        {/* Main Content - Document Management */}
        <ResizablePanel defaultSize={58} minSize={40}>
          <div className="h-full w-full overflow-hidden flex flex-col">
            {/* Unified Header */}
            <div className="p-6 border-b bg-background flex-shrink-0">
...
            </div>
            
            {/* Main Content Tabs */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <Tabs defaultValue="documents" className="w-full h-full flex flex-col">
                <TabsList className="grid w-fit grid-cols-4 mx-6 mt-4 mb-4 flex-shrink-0">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="ai-indexes">AI Indexes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="documents" className="flex-1 min-h-0 px-6 overflow-auto m-0">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="recent" className="flex-1 min-h-0 px-6 overflow-auto m-0">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="shared" className="flex-1 min-h-0 px-6 overflow-auto m-0">
                  <DocumentTable />
                </TabsContent>
                
                <TabsContent value="ai-indexes" className="flex-1 min-h-0 overflow-auto m-0">
                  <AIIndexing />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Sidebar - AI Assistant */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="h-full w-full overflow-hidden border-l">
            <AIAssistant />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
