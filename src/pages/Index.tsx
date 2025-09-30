"use client"

import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IndexPage() {
  return (
    <div className="h-[calc(100vh-4rem)]"> 
      <ResizablePanelGroup direction="horizontal" className="h-full">
        
        {/* Left Panel */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35}>
          <div className="h-full min-h-0 flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-gray-50">
              {/* Test long content */}
              {Array.from({ length: 50 }).map((_, i) => (
                <p key={i}>📂 Document {i}</p>
              ))}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Middle Panel */}
        <ResizablePanel defaultSize={58} minSize={30}>
          <div className="h-full min-h-0 flex flex-col">
            <Tabs defaultValue="documents" className="flex-1 min-h-0 flex flex-col">
              <TabsList className="shrink-0">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent 
                value="documents" 
                className="flex-1 min-h-0 overflow-y-auto p-6 bg-white"
              >
                {Array.from({ length: 100 }).map((_, i) => (
                  <p key={i}>📄 Row {i}</p>
                ))}
              </TabsContent>
              <TabsContent 
                value="settings" 
                className="flex-1 min-h-0 overflow-y-auto p-6 bg-gray-100"
              >
                {Array.from({ length: 80 }).map((_, i) => (
                  <p key={i}>⚙️ Setting {i}</p>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="h-full min-h-0 flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-gray-50">
              {Array.from({ length: 60 }).map((_, i) => (
                <p key={i}>🤖 Chat message {i}</p>
              ))}
            </div>
          </div>
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  )
}
