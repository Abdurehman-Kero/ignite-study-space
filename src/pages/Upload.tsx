import { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, File, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
  uploadDate: Date;
}

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(async (file) => {
      // Check file type
      if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.pdf')) {
        toast({
          title: 'Invalid file type',
          description: 'Only .txt and .pdf files are supported.',
          variant: 'destructive',
        });
        return;
      }

      const content = await file.text();
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type,
        content,
        uploadDate: new Date(),
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);
      
      toast({
        title: 'File uploaded successfully',
        description: `${file.name} has been processed and is ready for AI analysis.`,
      });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Files</h1>
        <p className="text-muted-foreground mt-1">
          Upload your lecture notes, PDFs, and documents for AI processing
        </p>
      </div>

      {/* Upload Zone */}
      <Card 
        className={`study-card border-2 border-dashed transition-all duration-300 ${
          isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-border'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-12 text-center">
          <div className="max-w-sm mx-auto space-y-4">
            <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
              <UploadIcon className="h-10 w-10 text-primary" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Drop your files here
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports .txt and .pdf files up to 10MB each
              </p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="interactive-glow"
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground">
                Or drag and drop files here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.pdf"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Uploaded Files ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  {file.name.endsWith('.pdf') ? (
                    <File className="h-5 w-5 text-red-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Process with AI
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Processing Instructions */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <UploadIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium">1. Upload</h4>
              <p className="text-sm text-muted-foreground">
                Your files are securely processed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <h4 className="font-medium">2. Extract</h4>
              <p className="text-sm text-muted-foreground">
                Text content is extracted and analyzed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h4 className="font-medium">3. Ready</h4>
              <p className="text-sm text-muted-foreground">
                Use AI tools for summaries & flashcards
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}