import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

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
          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
            <Button variant="secondary" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
          
          <DocumentTable />
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
