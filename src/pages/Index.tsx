import { Header } from "@/components/Header";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { DocumentTable } from "@/components/DocumentTable";
import { AIAssistant } from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Content - Document Table */}
        <div className="flex-1 p-6">
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
