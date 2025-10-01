import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Save,
  Pencil,
  Eraser,
  MousePointer,
  FileText,
  Code
} from "lucide-react";
import { toast } from "sonner";

interface DocumentEditorProps {
  initialContent?: string;
  fileName: string;
  isAIVisible?: boolean;
}

export const DocumentEditor = ({ initialContent = "", fileName, isAIVisible = false }: DocumentEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isNotesVisible, setIsNotesVisible] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<"select" | "draw" | "erase">("select");
  const [drawColor, setDrawColor] = useState("#ff0000");
  const [lineWidth, setLineWidth] = useState(3);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawMode === "select") return;
    setIsDrawing(true);
    const pos = getMousePos(e);
    setLastPos(pos);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || drawMode === "select" || !lastPos) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const currentPos = getMousePos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    
    if (drawMode === "erase") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = lineWidth * 3;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = lineWidth;
    }
    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    setLastPos(currentPos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toast.success("Drawing cleared!");
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    if (editorRef.current) {
      const savedContent = editorRef.current.innerHTML;
      setContent(savedContent);
      toast.success("Document saved successfully!");
    }
  };

  const handleSaveNotes = () => {
    toast.success("Notes saved successfully!");
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="border-b bg-card p-2">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Notes Toggle */}
          <Button
            variant={isNotesVisible ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsNotesVisible(!isNotesVisible)}
            title="Toggle Markdown Notes"
          >
            <Code className="h-4 w-4 mr-2" />
            Notes
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Drawing Tools */}
          <>
              <Button
                variant={drawMode === "select" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDrawMode("select")}
                title="Select/Edit Text"
              >
                <MousePointer className="h-4 w-4" />
              </Button>
              <Button
                variant={drawMode === "draw" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDrawMode("draw")}
                title="Draw"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant={drawMode === "erase" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDrawMode("erase")}
                title="Eraser"
              >
                <Eraser className="h-4 w-4" />
              </Button>

              {drawMode !== "select" && (
                <>
                  <input
                    type="color"
                    value={drawColor}
                    onChange={(e) => setDrawColor(e.target.value)}
                    className="h-8 w-12 border rounded cursor-pointer"
                    title="Drawing Color"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="w-20"
                    title="Line Width"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCanvas}
                    title="Clear Drawing"
                  >
                    Clear
                  </Button>
                </>
              )}

              <Separator orientation="vertical" className="h-6 mx-1" />
            </>
          
          {/* Text Formatting */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("underline")}
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("justifyLeft")}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("justifyCenter")}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("justifyRight")}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("insertUnorderedList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Heading Styles */}
          <select
            className="h-8 text-sm border rounded px-2 bg-background"
            onChange={(e) => executeCommand("formatBlock", e.target.value)}
            defaultValue=""
          >
            <option value="">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="p">Paragraph</option>
          </select>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Undo/Redo */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("undo")}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("redo")}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Save */}
          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            className="ml-auto"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Editor Area with Side-by-Side Layout */}
      <div className="flex-1 overflow-hidden flex bg-muted/30">
        {/* Main Document Editor */}
        <div 
          className="flex-1 overflow-y-auto scrollbar-visible p-8 transition-all duration-300"
          style={{ 
            marginRight: isNotesVisible && isAIVisible ? '720px' : 
                        isNotesVisible ? '400px' : 
                        isAIVisible ? '320px' : '0px'
          }}
        >
          <div className="max-w-4xl mx-auto bg-background shadow-lg min-h-full relative">
            {/* Text Editor */}
            <div
              ref={editorRef}
              contentEditable={drawMode === "select"}
              onInput={handleInput}
              className="p-16 outline-none min-h-full prose prose-slate max-w-none relative z-10
                       [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
                       [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5
                       [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4
                       [&_p]:mb-4 [&_p]:leading-relaxed
                       [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc
                       [&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal
                       [&_li]:mb-2"
              style={{ pointerEvents: drawMode === "select" ? "auto" : "none" }}
              suppressContentEditableWarning
            />
            {/* Drawing Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ 
                pointerEvents: drawMode === "select" ? "none" : "auto",
                cursor: drawMode === "draw" ? "crosshair" : drawMode === "erase" ? "pointer" : "default"
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>

        {/* Markdown Notes Panel - Right Side */}
        {isNotesVisible && (
          <div 
            className="w-[400px] border-l bg-background fixed top-[64px] h-[calc(100vh-64px)] overflow-hidden flex flex-col z-5 transition-all duration-300"
            style={{ right: isAIVisible ? '320px' : '0px' }}
          >
            <div className="border-b p-3 flex items-center justify-between bg-card">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Markdown Notes
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveNotes}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Notes
              </Button>
            </div>
            <Tabs defaultValue="write" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-3 mt-3 w-auto self-start">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write" className="flex-1 p-3 overflow-hidden">
                <Textarea
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  placeholder="Write your markdown notes here...&#10;&#10;# Heading&#10;- Bullet point&#10;**Bold text**&#10;*Italic text*&#10;&#10;You can reference your document while taking notes!"
                  className="h-full font-mono resize-none"
                />
              </TabsContent>
              <TabsContent value="preview" className="flex-1 p-6 overflow-y-auto">
                <div className="prose prose-slate prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent || "*No notes yet. Switch to Write tab to add notes.*"}
                  </ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t bg-card p-2 text-sm text-muted-foreground flex items-center justify-between">
        <span>Editing: {fileName}</span>
        <div className="flex items-center gap-4">
          <span>Document Words: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}</span>
          {isNotesVisible && (
            <span>Notes Words: {markdownContent.split(/\s+/).filter(Boolean).length}</span>
          )}
        </div>
      </div>
    </div>
  );
};
