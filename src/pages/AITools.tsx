import AIToolsSection from '@/components/AI/AIToolsSection';

export default function AITools() {
  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h1 className="display-5 fw-bold text-primary">AI Study Tools</h1>
        <p className="text-muted">
          Enhance your learning with AI-powered study assistants
        </p>
      </div>
      
      <AIToolsSection />
    </div>
  );
}