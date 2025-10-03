import { useState, useRef, useEffect } from "react";
import { Bot, Send, Mic, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCitations } from "@/contexts/CitationContext";

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
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: "2",
    type: "user",
    content: "Can you help me analyze the Q2 Financial Report?",
    timestamp: new Date(Date.now() - 3500000)
  },
  {
    id: "3",
    type: "assistant",
    content: "Of course! I'd be happy to help you analyze the Q2 Financial Report. I can extract key metrics, identify trends, and provide insights on revenue growth, expenses, and profitability. Would you like me to focus on any specific section?",
    timestamp: new Date(Date.now() - 3400000)
  },
  {
    id: "4",
    type: "user",
    content: "Focus on the revenue trends and compare them with Q1.",
    timestamp: new Date(Date.now() - 3300000)
  },
  {
    id: "5",
    type: "assistant",
    content: "Based on my analysis, Q2 revenue shows a 15% increase compared to Q1. The main growth drivers include:\n\n• Product sales up 22%\n• Service revenue up 12%\n• Subscription revenue up 8%\n\nThe growth is particularly strong in the enterprise segment, which saw a 28% increase.",
    timestamp: new Date(Date.now() - 3200000)
  },
  {
    id: "6",
    type: "user",
    content: "What about the Marketing Strategy document? Any insights?",
    timestamp: new Date(Date.now() - 3100000)
  },
  {
    id: "7",
    type: "assistant",
    content: "The Marketing Strategy 2024 document outlines several key initiatives:\n\n1. Digital transformation focus\n2. Customer acquisition cost reduction\n3. Brand awareness campaigns\n4. Content marketing expansion\n5. Social media engagement optimization\n\nWould you like me to elaborate on any of these strategies?",
    timestamp: new Date(Date.now() - 3000000)
  },
  {
    id: "8",
    type: "user",
    content: "Can you summarize the Customer Feedback Analysis?",
    timestamp: new Date(Date.now() - 2900000)
  },
  {
    id: "9",
    type: "assistant",
    content: "Here's a summary of the Customer Feedback Analysis:\n\n**Positive Feedback (72%):**\n• Product quality and reliability\n• Customer support responsiveness\n• User-friendly interface\n\n**Areas for Improvement (28%):**\n• Onboarding process complexity\n• Feature documentation clarity\n• Mobile app performance\n\nOverall satisfaction score: 4.2/5.0",
    timestamp: new Date(Date.now() - 2800000)
  },
  {
    id: "10",
    type: "user",
    content: "What's in the Product Roadmap?",
    timestamp: new Date(Date.now() - 2700000)
  },
  {
    id: "11",
    type: "assistant",
    content: "The Product Roadmap highlights these upcoming features:\n\n**Q3 2024:**\n• Advanced analytics dashboard\n• AI-powered recommendations\n• Mobile app redesign\n\n**Q4 2024:**\n• API v2.0 release\n• Integration marketplace\n• Enhanced security features\n\n**Q1 2025:**\n• Enterprise features suite\n• Multi-language support",
    timestamp: new Date(Date.now() - 2600000)
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
  const { addCitation, addTest } = useCitations();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const detectCitationsAndGenerateTest = (content: string) => {
    // Detect citations (articles, authors, years in brackets)
    const citationPatterns = [
      /\b([A-Z][a-z]+ et al\., \d{4})\b/g, // "Smith et al., 2023"
      /\b([A-Z][a-z]+ and [A-Z][a-z]+, \d{4})\b/g, // "Smith and Jones, 2023"
      /\[([^\]]+)\]/g, // [Citation]
      /"([^"]+)"/g, // "Quoted text"
    ];

    const foundCitations: string[] = [];
    citationPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          if (match.length > 5 && !foundCitations.includes(match)) {
            foundCitations.push(match);
          }
        });
      }
    });

    // Add citations with colors
    foundCitations.forEach(citation => {
      addCitation({
        text: citation.replace(/["\[\]]/g, ''),
        source: citation,
        color: '', // Will be auto-assigned
      });
    });

    // Generate test if citations found
    if (foundCitations.length > 0) {
      const testQuestion = `Based on the cited research, what are the key findings regarding the topic discussed?`;
      const testAnswer = `The research indicates several important findings as documented in ${foundCitations.slice(0, 2).join(' and ')}.`;
      
      addTest({
        question: testQuestion,
        answer: testAnswer,
        citations: foundCitations.map(c => c.replace(/["\[\]]/g, '')),
      });

      toast({
        title: "Citations detected",
        description: `Found ${foundCitations.length} citation(s) and generated a test question`,
      });
    }
  };

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

    // Simulate AI response with citation detection
    setTimeout(() => {
      const mockResponses = [
        `According to recent studies [Smith et al., 2023], the impact of AI on research productivity has increased by 45%. Additionally, "machine learning algorithms" have shown significant improvements in data analysis efficiency.`,
        `The analysis reveals several key findings. As noted by [Johnson and Brown, 2024], the methodology demonstrates "robust statistical significance" in the results. Furthermore, [Chen et al., 2023] supports these conclusions with empirical evidence.`,
        `Based on your document library, I found relevant research from [Davis et al., 2024] which discusses "innovative approaches" to the problem. The findings align with [Martinez and Lee, 2023] regarding implementation strategies.`,
      ];

      const responseContent = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      detectCitationsAndGenerateTest(responseContent);
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
    <div className="h-full w-full flex flex-col border-l bg-background">
      {/* Header - Fixed at top */}
      <div className="p-4 border-b flex-shrink-0 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
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

      {/* Messages - Scrollable chat history fills remaining space */}
      <div 
        className="flex-1 min-h-0 scrollbar-visible overflow-x-hidden p-4" 
        ref={scrollAreaRef}
      >
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
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
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
                  <Bot className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Bar - Pinned to bottom of panel, always visible */}
      <div className="p-4 border-t bg-background flex-shrink-0">
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
                isRecording ? "text-red-500" : "text-muted-foreground"
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
    </div>
  );
};