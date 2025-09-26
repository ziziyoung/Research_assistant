import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Plus, Upload, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1 h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
          <div className="h-full flex flex-col">
            <DocumentLibrary />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />

        {/* Main Content - Document Table */}
        <ResizablePanel defaultSize={58} minSize={40}>
          <div className="flex flex-col justify-end h-full">
            <div className="p-6 flex flex-col h-full">
              {/* Action Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8 flex-shrink-0">
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
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Sidebar - AI Assistant */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="border-l flex flex-col h-full">
            <div className="h-full p-4 flex flex-col">
              <div className="flex-1 min-h-0">
                <AIAssistant />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
