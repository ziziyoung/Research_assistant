import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { AIAssistant } from "@/components/AIAssistant";
import { DocumentEditor } from "@/components/DocumentEditor";
import { sampleThesisContent } from "@/data/sampleThesis";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { CitationProvider } from "@/contexts/CitationContext";
import { TestGenerator } from "@/components/TestGenerator";
import { useIndexedDocuments } from "@/contexts/IndexedDocumentsContext";

const FileEditor = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [isAIVisible, setIsAIVisible] = useState(true);
  const { documents } = useIndexedDocuments();
  const indexedDoc = fileId ? documents.find((d) => d.id === fileId) : null;

  // Mock file data for demo fileIds; otherwise use indexed doc or fallback
  const fileName =
    indexedDoc
      ? indexedDoc.name.replace(/\.[^/.]+$/, "")
      : fileId === "1"
        ? "Short Video Competition Analysis Lab"
        : fileId === "2"
          ? "Research Notes"
          : fileId === "3"
            ? "Interview Transcript"
            : "Document";

  const fileType =
    indexedDoc ? "pdf" : fileId === "1" ? "pdf" : fileId === "2" ? "doc" : fileId === "3" ? "slide" : "draft";

  const hasPdfUrl =
    indexedDoc?.downloadUrl &&
    (indexedDoc.downloadUrl.startsWith("http") || indexedDoc.downloadUrl.startsWith("blob:"));

  return (
    <CitationProvider>
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
      
      <div className="h-[calc(100vh-4rem)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Document Library */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full border-r bg-card">
              <DocumentLibrary />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />

          {/* Main Content - same as /file/1: DocumentEditor (PDF + editor + Markdown Notes) or editor only */}
          <ResizablePanel defaultSize={isAIVisible ? 55 : 80} minSize={30}>
            <div className="h-full flex flex-col">
              {hasPdfUrl ? (
                <DocumentEditor
                  fileName={fileName}
                  isAIVisible={isAIVisible}
                  pdfUrl={indexedDoc!.downloadUrl}
                />
              ) : indexedDoc ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground p-6">
                  <p className="font-medium">No PDF available for preview</p>
                </div>
              ) : (
                <DocumentEditor
                  initialContent={sampleThesisContent}
                  fileName={fileName}
                  isAIVisible={isAIVisible}
                />
              )}
            </div>
          </ResizablePanel>

          {/* Right Sidebar - AI Assistant (Collapsible & Resizable) */}
          {isAIVisible && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                <div className="h-full border-l p-4 bg-background">
                  <AIAssistant />
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
      
      {/* Note at bottom about AI capabilities */}
      {isAIVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-ai-secondary/90 text-ai-primary px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
          AI can be hidden - Toggle with the button above
        </div>
      )}
      
      <TestGenerator />
    </div>
    </CitationProvider>
  );
};

export default FileEditor;