import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexedDocumentsProvider } from "@/contexts/IndexedDocumentsContext";
import Index from "./pages/Index";
import FileEditor from "./pages/FileEditor";
import PdfViewer from "./pages/PdfViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <IndexedDocumentsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/file/:fileId" element={<FileEditor />} />
            <Route path="/viewer/:docId" element={<PdfViewer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </IndexedDocumentsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
