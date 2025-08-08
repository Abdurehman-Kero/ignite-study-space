import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const welcomeMessages = [
  "Hello! I'm your AI Study Companion. How can I help you learn today?",
  "I can help you with explanations, answer questions, and provide study guidance.",
  "Try asking me about any topic you're studying!"
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: welcomeMessages[0],
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      `That's a great question about "${userInput}". Let me help explain that concept step by step...`,
      `I understand you're asking about "${userInput}". This is an important topic in your studies. Here's what you should know...`,
      `Great question! "${userInput}" is something many students find challenging. Let me break it down for you...`,
      `I can help with "${userInput}". This concept relates to several key principles we should explore together...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickPrompts = [
    "Explain quantum mechanics",
    "Help with calculus problems",
    "Study tips for exams",
    "Computer science concepts"
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gradient">AI Study Chat</h1>
        <p className="text-muted-foreground mt-1">
          Get personalized help and explanations from your AI tutor
        </p>
      </div>

      <div className="flex-1 flex gap-4">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary text-white">
                <Bot className="h-4 w-4" />
              </div>
              AI Study Companion
              <div className="ml-auto flex items-center gap-1 text-green-500">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs">Online</span>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div
                        className={`p-3 rounded-xl max-w-[80%] ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-card border'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-xs text-muted-foreground ${
                          message.sender === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-card border p-3 rounded-xl">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-75" />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your studies..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="interactive-glow"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions Sidebar */}
        <div className="w-72 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setInputMessage(prompt)}
                >
                  <span className="text-sm">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">💡 Pro Tip</p>
                <p className="text-xs text-blue-700 mt-1">
                  Ask specific questions for better responses
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">🎯 Focus</p>
                <p className="text-xs text-green-700 mt-1">
                  Break complex topics into smaller parts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}