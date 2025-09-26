import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <PanelGroup direction="horizontal" className="flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <Panel defaultSize={25} minSize={15} maxSize={40}>
          <div className="flex flex-col h-full">
            <DocumentLibrary />
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-1 bg-border hover:bg-accent-foreground/20 transition-colors" />

        {/* Main Content - Document Table */}
        <Panel defaultSize={50} minSize={30}>
          <div className="flex flex-col justify-end h-full">
            <div className="p-6 flex flex-col h-full">
              {/* Tabs and Document Table */}
              <div className="flex-1 flex flex-col min-h-0">
                <Tabs defaultValue="recent" className="w-full h-full flex flex-col">
                  <TabsList className="grid w-fit grid-cols-3 mb-4 flex-shrink-0">
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="shared">Shared With Me</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recent" className="flex-1 min-h-0">
                    <DocumentTable />
                  </TabsContent>
                  
                  <TabsContent value="shared" className="flex-1 min-h-0">
                    <DocumentTable />
                  </TabsContent>
                  
                  <TabsContent value="favorites" className="flex-1 min-h-0">
                    <DocumentTable />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-border hover:bg-accent-foreground/20 transition-colors" />

        {/* Right Sidebar - AI Assistant */}
        <Panel defaultSize={25} minSize={15} maxSize={40}>
          <div className="border-l flex flex-col h-full">
            <div className="h-full p-4 flex flex-col">
              <div className="flex-1 min-h-0">
                <AIAssistant />
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Index;
