import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, Tag } from 'lucide-react';
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
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-5 fw-bold">My Notes</h1>
          <p className="text-muted">
            Organize and manage your study notes
          </p>
        </div>
        <button onClick={handleNewNote} className="btn btn-primary">
          <Plus size={16} className="me-2" />
          New Note
        </button>
      </div>

      {/* Search and Filters */}
      <div className="study-card mb-4">
        <div className="d-flex gap-3">
          <div className="flex-grow-1 position-relative">
            <Search 
              className="position-absolute top-50 translate-middle-y text-muted" 
              style={{ left: '12px', pointerEvents: 'none' }}
              size={16}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search notes by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-primary">
            <Filter size={16} className="me-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="row g-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div
                className="study-card cursor-pointer h-100"
                onClick={() => handleNoteSelect(note)}
              >
                <h6 className="fw-bold mb-2 text-truncate">
                  {note.title}
                </h6>
                <div className="d-flex align-items-center gap-2 mb-3 text-muted">
                  <Calendar size={12} />
                  <small>{note.lastModified.toLocaleDateString()}</small>
                </div>
                <p className="text-muted small mb-3" style={{ 
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden'
                }}>
                  {note.content || 'No content yet...'}
                </p>
                {note.tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-1">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="badge bg-primary bg-opacity-10 text-primary"
                      >
                        <Tag size={10} className="me-1" />
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <small className="text-muted">
                        +{note.tags.length - 3} more
                      </small>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="study-card text-center py-5">
          <div className="mx-auto" style={{ maxWidth: '400px' }}>
            <div className="bg-light rounded-circle p-4 mx-auto mb-4" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={40} className="text-muted" />
            </div>
            <h5 className="fw-bold mb-3">No notes yet</h5>
            <p className="text-muted mb-4">
              Start creating notes to organize your study materials
            </p>
            <button onClick={handleNewNote} className="btn btn-primary">
              <Plus size={16} className="me-2" />
              Create Your First Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}