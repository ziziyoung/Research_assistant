import { Header } from "@/components/Header";
import { AIAssistant } from "@/components/AIAssistant";

const AIAssistantPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 h-[calc(100vh-4rem)]">
        <AIAssistant />
      </div>
    </div>
  );
};

export default AIAssistantPage;
