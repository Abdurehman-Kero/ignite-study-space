import { useState } from 'react';
import {
  FileText,
  Zap,
  Brain,
  MessageSquare,
  Upload,
  Download,
  Sparkles,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  isAvailable: boolean;
}

const aiTools: AITool[] = [
  {
    id: 'summarizer',
    name: 'Smart Summarizer',
    description: 'Generate concise summaries from your notes and documents',
    icon: FileText,
    color: 'bg-blue-500',
    isAvailable: true,
  },
  {
    id: 'flashcards',
    name: 'Flashcard Generator',
    description: 'Create interactive flashcards from your study materials',
    icon: Zap,
    color: 'bg-yellow-500',
    isAvailable: true,
  },
  {
    id: 'quiz',
    name: 'Quiz Creator',
    description: 'Generate practice quizzes and tests automatically',
    icon: Brain,
    color: 'bg-purple-500',
    isAvailable: true,
  },
  {
    id: 'tutor',
    name: 'AI Tutor Chat',
    description: 'Get personalized help and explanations',
    icon: MessageSquare,
    color: 'bg-green-500',
    isAvailable: true,
  },
];

export default function AIToolsSection() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
    setResult(null);
    setInputText('');
  };

  const processWithAI = async (toolId: string) => {
    if (!inputText.trim()) {
      toast({
        title: 'Input required',
        description: 'Please provide some text to process.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let mockResult = '';
    switch (toolId) {
      case 'summarizer':
        mockResult = `## Summary\n\nKey points from your text:\n• Main concept identified\n• Supporting arguments outlined\n• Conclusion highlighted\n\nThis is a concise overview of the provided content.`;
        break;
      case 'flashcards':
        mockResult = `## Generated Flashcards\n\n**Card 1**\nFront: What is the main concept?\nBack: The primary idea discussed in the text\n\n**Card 2**\nFront: Key supporting point?\nBack: Supporting evidence for the main argument\n\n**Card 3**\nFront: Final conclusion?\nBack: The summarized outcome or result`;
        break;
      case 'quiz':
        mockResult = `## Practice Quiz\n\n**Question 1:** Multiple Choice\nWhat is the main concept discussed?\na) Option A\nb) Option B\nc) Option C\nd) Option D\n*Answer: b*\n\n**Question 2:** True/False\nThe supporting arguments strengthen the main point.\n*Answer: True*\n\n**Question 3:** Short Answer\nExplain the conclusion in your own words.\n*Sample Answer: [Brief explanation]*`;
        break;
      case 'tutor':
        mockResult = `## AI Tutor Response\n\nBased on your input, here's my explanation:\n\nThe concept you've shared relates to [subject area]. Let me break this down:\n\n1. **Foundation**: The basic principles involved\n2. **Application**: How this applies in practice\n3. **Examples**: Real-world scenarios\n\nWould you like me to elaborate on any specific aspect?`;
        break;
    }
    
    setResult(mockResult);
    setIsProcessing(false);
    
    toast({
      title: 'Processing complete',
      description: 'Your AI-generated content is ready!',
    });
  };

  const selectedToolData = aiTools.find(tool => tool.id === selectedTool);

  return (
    <div className="space-y-6">
      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <Card
              key={tool.id}
              className={`study-card cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-primary ring-offset-2 scale-105' : ''
              }`}
              onClick={() => handleToolSelect(tool.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${tool.color} text-white shadow-glow`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm">{tool.name}</CardTitle>
                    {tool.isAvailable ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Tool Interface */}
      {selectedTool && selectedToolData && (
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${selectedToolData.color} text-white`}>
                <selectedToolData.icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>{selectedToolData.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedToolData.description}
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Input Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Input Text</label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Paste your notes, documents, or questions here for ${selectedToolData.name.toLowerCase()}...`}
                rows={6}
                className="resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => processWithAI(selectedTool)}
                disabled={isProcessing || !inputText.trim()}
                className="interactive-glow"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
              
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Generated Result</label>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {result}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}