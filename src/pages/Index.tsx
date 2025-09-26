import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Collapsible Document Library */}
        <div className="min-w-0 max-w-xs">
          <DocumentLibrary />
        </div>

        {/* Main Content - Document Table */}
        <div className="flex-1 p-6">
          {/* Action Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
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
          
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-fit grid-cols-3 mb-4">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared With Me</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <DocumentTable />
            </TabsContent>
            
            <TabsContent value="shared">
              <DocumentTable />
            </TabsContent>
            
            <TabsContent value="favorites">
              <DocumentTable />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div className="w-80 border-l p-4">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default Index;
