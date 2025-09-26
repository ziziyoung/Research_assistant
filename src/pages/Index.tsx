import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex flex-1 items-stretch h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <div className="w-72 flex flex-col">
          <DocumentLibrary />
        </div>

        {/* Main Content - Document Table */}
        <div className="flex-1 flex flex-col justify-end">
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

        {/* Right Sidebar - AI Assistant */}
        <div className="w-80 border-l flex flex-col">
          <div className="h-full p-4 flex flex-col">
            <div className="flex-1 min-h-0">
              <AIAssistant />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
