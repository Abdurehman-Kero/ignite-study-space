import AIToolsSection from '@/components/AI/AIToolsSection';

export default function AITools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">AI Study Tools</h1>
        <p className="text-muted-foreground mt-1">
          Enhance your learning with AI-powered study assistants
        </p>
      </div>
      
      <AIToolsSection />
    </div>
  );
}