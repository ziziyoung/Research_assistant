import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentLibrary } from "@/components/DocumentLibrary";
import { AIAssistant } from "@/components/AIAssistant";
import { DocumentEditor } from "@/components/DocumentEditor";
import { AIKnowledgeGraph } from "@/components/AIKnowledgeGraph";
import { sampleThesisContent } from "@/data/sampleThesis";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FileEditor = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [isAIVisible, setIsAIVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("assistant");

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
      
      <div className="h-[calc(100vh-4rem)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Document Library */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full border-r bg-card">
              <DocumentLibrary />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />

          {/* Main Content - File Editing Area */}
          <ResizablePanel defaultSize={isAIVisible ? 55 : 80} minSize={30}>
            <div className="h-full flex flex-col">
              <DocumentEditor 
                initialContent={sampleThesisContent}
                fileName={fileName}
                isAIVisible={isAIVisible}
              />
            </div>
          </ResizablePanel>

          {/* Right Sidebar - AI Assistant & Knowledge Graph (Collapsible & Resizable) */}
          {isAIVisible && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                <div className="h-full border-l bg-background">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="w-full justify-start rounded-none border-b px-4 pt-4">
                      <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                      <TabsTrigger value="knowledge">Knowledge Graph</TabsTrigger>
                    </TabsList>
                    <TabsContent value="assistant" className="flex-1 m-0 p-4 overflow-auto">
                      <AIAssistant />
                    </TabsContent>
                    <TabsContent value="knowledge" className="flex-1 m-0 overflow-hidden">
                      <AIKnowledgeGraph />
                    </TabsContent>
                  </Tabs>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
      
      {/* Note at bottom about AI capabilities */}
      {isAIVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-ai-secondary/90 text-ai-primary px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
          AI Assistant & Knowledge Graph - Switch tabs to explore citation relationships
        </div>
      )}
    </div>
  );
};

export default FileEditor;