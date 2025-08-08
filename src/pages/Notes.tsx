import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotesEditor from '@/components/Notes/NotesEditor';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastModified: Date;
  subject?: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem('studyNotes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        lastModified: new Date(note.lastModified),
      }));
      setNotes(parsedNotes);
    }
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNewNote = () => {
    setSelectedNote(null);
    setShowEditor(true);
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setShowEditor(true);
  };

  const handleNoteSave = (note: Note) => {
    const updatedNotes = selectedNote
      ? notes.map(n => n.id === note.id ? note : n)
      : [...notes, note];
    
    setNotes(updatedNotes);
    setSelectedNote(note);
  };

  if (showEditor) {
    return (
      <NotesEditor
        note={selectedNote || undefined}
        onSave={handleNoteSave}
        onClose={() => setShowEditor(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Notes</h1>
          <p className="text-muted-foreground mt-1">
            Organize and manage your study notes
          </p>
        </div>
        <Button onClick={handleNewNote} className="interactive-glow">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="study-card cursor-pointer"
              onClick={() => handleNoteSelect(note)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">
                  {note.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {note.lastModified.toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content || 'No content yet...'}
                </p>
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
                      >
                        <Tag className="h-2 w-2" />
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{note.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="study-card text-center py-12">
          <CardContent>
            <div className="max-w-sm mx-auto">
              <div className="bg-muted rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <Plus className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-4">
                Start creating notes to organize your study materials
              </p>
              <Button onClick={handleNewNote} className="interactive-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Note
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}