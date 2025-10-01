import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { AIAssistant } from "@/components/AIAssistant";
import { DocumentEditor } from "@/components/DocumentEditor";
import { sampleThesisContent } from "@/data/sampleThesis";

const FileEditor = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [isAIVisible, setIsAIVisible] = useState(true);

  // Mock file data - in real app this would come from your data store
  const fileName = fileId === "1" ? "Short Video Competition Analysis Lab" : 
                   fileId === "2" ? "Research Notes" :
                   fileId === "3" ? "Interview Transcript" : 
                   "Document";

  const fileType = fileId === "1" ? "pdf" : 
                   fileId === "2" ? "doc" : 
                   fileId === "3" ? "slide" : "draft";

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Research Assistant</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAIVisible(!isAIVisible)}
              className="flex items-center gap-2"
            >
              {isAIVisible ? (
                <>
                  <ChevronRight className="h-4 w-4" />
                  Hide AI Assistant
                </>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  Show AI Assistant
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Document Library */}
        <div className="w-80 border-r bg-card">
          <DocumentLibrary />
        </div>

        {/* Main Content - File Editing Area */}
        <div className={`flex-1 flex flex-col ${isAIVisible ? 'mr-80' : ''} transition-all duration-300`}>
          <div className="flex-1 overflow-hidden">
            <DocumentEditor 
              initialContent={sampleThesisContent}
              fileName={fileName}
            />
          </div>
        </div>

        {/* Right Sidebar - AI Assistant (Collapsible) */}
        {isAIVisible && (
          <div className="w-80 border-l p-4 fixed right-0 top-16 h-[calc(100vh-4rem)] bg-background z-10">
            <AIAssistant />
          </div>
        )}
      </div>
      
      {/* Note at bottom about AI capabilities */}
      {isAIVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-ai-secondary/90 text-ai-primary px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
          AI can be hidden - Toggle with the button above
        </div>
      )}
    </div>
  );
};

export default FileEditor;