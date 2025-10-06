import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCitations } from '@/contexts/CitationContext';
import { FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const TestGenerator = () => {
  const { generatedTests } = useCitations();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  if (generatedTests.length === 0) return null;

  const handleCopy = (test: typeof generatedTests[0]) => {
    const testText = `Question: ${test.question}\n\nAnswer: ${test.answer}\n\nCitations: ${test.citations.join(', ')}`;
    navigator.clipboard.writeText(testText);
    setCopiedId(test.id);
    toast({
      title: "Test copied",
      description: "Test question and answer copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-20 right-6 w-96 max-h-96 overflow-y-auto z-50">
      <Card className="p-4 bg-background/95 backdrop-blur border-primary/20 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Generated Tests</h3>
        </div>
        <div className="space-y-3">
          {generatedTests.map((test) => (
            <Card key={test.id} className="p-3 bg-muted/50">
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Question:</p>
                  <p className="text-sm font-medium text-foreground">{test.question}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Answer:</p>
                  <p className="text-sm text-foreground">{test.answer}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Citations: {test.citations.join(', ')}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(test)}
                    className="h-7 px-2"
                  >
                    {copiedId === test.id ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
