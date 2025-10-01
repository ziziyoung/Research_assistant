import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft, GripVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { AIAssistant } from "@/components/AIAssistant";
import { DocumentEditor } from "@/components/DocumentEditor";
import { sampleThesisContent } from "@/data/sampleThesis";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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

        {/* Main Content Area with Resizable AI Assistant */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Document Editor Panel */}
          <ResizablePanel defaultSize={isAIVisible ? 70 : 100} minSize={30}>
            <DocumentEditor 
              initialContent={sampleThesisContent}
              fileName={fileName}
              isAIVisible={isAIVisible}
            />
          </ResizablePanel>

          {/* AI Assistant Panel - Resizable */}
          {isAIVisible && (
            <>
              <ResizableHandle className="w-1 bg-border hover:bg-primary/30 active:bg-primary/50 transition-colors cursor-col-resize" />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <div className="h-full bg-background border-l overflow-y-auto">
                  <div className="p-4">
                    <AIAssistant />
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
      
      {/* Note at bottom about AI capabilities */}
      {isAIVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-ai-secondary/90 text-ai-primary px-4 py-2 rounded-lg text-sm backdrop-blur-sm z-30">
          Drag the handle to resize AI Assistant panel
        </div>
      )}
    </div>
  );
};

export default FileEditor;