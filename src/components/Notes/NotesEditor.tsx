import { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading,
  Quote,
  Save,
  Tag,
  Hash,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastModified: Date;
  subject?: string;
}

interface NotesEditorProps {
  note?: Note;
  onSave?: (note: Note) => void;
  onClose?: () => void;
}

export default function NotesEditor({ note, onSave, onClose }: NotesEditorProps) {
  const [title, setTitle] = useState(note?.title || 'Untitled Note');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isModified, setIsModified] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleContentChange = (value: string) => {
    setContent(value);
    setIsModified(true);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setIsModified(true);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setIsModified(true);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    setIsModified(true);
  };

  const handleSave = () => {
    const savedNote: Note = {
      id: note?.id || Date.now().toString(),
      title,
      content,
      tags,
      lastModified: new Date(),
      subject: note?.subject,
    };

    // Save to localStorage for now
    const existingNotes = JSON.parse(localStorage.getItem('studyNotes') || '[]');
    const noteIndex = existingNotes.findIndex((n: Note) => n.id === savedNote.id);
    
    if (noteIndex >= 0) {
      existingNotes[noteIndex] = savedNote;
    } else {
      existingNotes.push(savedNote);
    }
    
    localStorage.setItem('studyNotes', JSON.stringify(existingNotes));
    
    onSave?.(savedNote);
    setIsModified(false);
    
    toast({
      title: 'Note saved',
      description: 'Your note has been saved successfully.',
    });
  };

  const formatText = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    setIsModified(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4 flex-1">
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-lg font-semibold border-none bg-transparent p-0 focus-visible:ring-0"
            placeholder="Enter note title..."
          />
          {isModified && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Modified
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} size="sm" className="interactive-glow">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Formatting Toolbar */}
      <Card className="m-4 mb-2">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('bold')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('italic')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('heading')}
              title="Heading"
            >
              <Heading className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('list')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('quote')}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Editor */}
      <Card className="mx-4 mb-2 flex-1">
        <CardContent className="p-4 h-full">
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing your notes here..."
            className="w-full h-full resize-none border-none outline-none bg-transparent text-foreground placeholder:text-muted-foreground font-mono"
          />
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="m-4 mt-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                <Hash className="h-3 w-3 mr-1" />
                {tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="flex-1"
            />
            <Button onClick={addTag} size="sm" variant="outline">
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}