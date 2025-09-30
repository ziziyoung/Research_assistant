import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { AIIndexing } from "@/components/AIIndexing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Plus, Upload, FileText, Bot, Sparkles } from "lucide-react";

const Index = () => {
  return (
    // Use full viewport height so inner flex sizing is reliable
    <div className="h-screen bg-background flex flex-col">
      <Header />

      {/* wrapper takes remaining height and hides outer overflow so inner panels manage their own scroll */}
      <div className="flex-1 flex overflow-hidden">
        {/* ResizablePanelGroup fills the area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
            {/* panel must be a column flex with min-h-0 */}
            <div className="flex flex-col h-full min-h-0">
              {/* scrollable area */}
              <div className="overflow-y-auto flex-1 min-h-0 p-4">
                <DocumentLibrary />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Middle Panel */}
          <ResizablePanel defaultSize={58} minSize={40}>
            <div className="flex flex-col h-full min-h-0">
              {/* header is fixed height (non-scrolling) */}
              <div className="p-6 border-b bg-background flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Document Management</h1>
                    <p className="text-muted-foreground">Manage your documents with AI-powered indexing and organization</p>
                  </div>
                  <Bot className="h-8 w-8 text-primary" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* action cards */}
                </div>
              </div>

              {/* tab area: header non-scrolling, tab content scrollable */}
              <div className="flex-1 min-h-0 flex flex-col">
                <Tabs defaultValue="documents" className="w-full h-full flex flex-col">
                  <TabsList className="grid w-fit grid-cols-4 mx-6 mt-4 mb-4 flex-shrink-0">
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="shared">Shared</TabsTrigger>
                    <TabsTrigger value="ai-indexes" className="gap-1.5">
                      <Sparkles className="h-4 w-4" /> AI Indexes
                    </TabsTrigger>
                  </TabsList>

                  {/* IMPORTANT: each TabsContent is the scroll container */}
                  <TabsContent value="documents" className="flex-1 min-h-0 overflow-y-auto px-6">
                    <DocumentTable />
                  </TabsContent>

                  <TabsContent value="recent" className="flex-1 min-h-0 overflow-y-auto px-6">
                    <DocumentTable />
                  </TabsContent>

                  <TabsContent value="shared" className="flex-1 min-h-0 overflow-y-auto px-6">
                    <DocumentTable />
                  </TabsContent>

                  <TabsContent value="ai-indexes" className="flex-1 min-h-0 overflow-y-auto px-6">
                    <AIIndexing />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
            <div className="flex flex-col h-full min-h-0">
              {/* scrollable chat/content area */}
              <div className="overflow-y-auto flex-1 min-h-0 p-4">
                <AIAssistant />
              </div>

              {/* example fixed footer (chat input) */}
              <div className="flex-shrink-0 p-3 border-t bg-surface">
                {/* keep this outside of the scroll area */}
                <div className="w-full">
                  {/* your input component */}
                  <input className="w-full rounded border px-3 py-2" placeholder="Type a message..." />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
