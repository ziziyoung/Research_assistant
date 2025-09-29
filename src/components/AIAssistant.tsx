import { useState, useRef, useEffect } from "react";
import { Bot, Send, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content: "Hello! I'm your AI research assistant. I can help you analyze documents, generate summaries, create indexes, and answer questions about your research. How can I assist you today?",
    timestamp: new Date()
  }
];

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you're asking about "${inputValue}". Based on your document library, I can help analyze your research materials and provide insights. Would you like me to summarize specific documents or search for particular information across your collection?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Processing your voice input...",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak your question or command...",
      });
    }
  };

  const handleSpeechToggle = () => {
    setIsSpeaking(!isSpeaking);
    toast({
      title: isSpeaking ? "Speech disabled" : "Speech enabled",
      description: isSpeaking ? "AI responses will be silent" : "AI responses will be spoken aloud",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <Card className="flex flex-col h-full glass-panel overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-ai-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-ai-primary ai-pulse" />
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSpeechToggle}
            className={isSpeaking ? "text-accent" : "text-muted-foreground"}
          >
            {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-ai-primary ai-pulse" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Ask me about your documents..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                isRecording ? "text-red-500 voice-recording" : "text-muted-foreground"
              }`}
              onClick={handleVoiceToggle}
            >
              {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      </Card>
    </div>
  );
};