import { useState } from 'react';
import {
  BookOpen,
  FileText,
  Clock,
  TrendingUp,
  MoreVertical,
  Edit,
  Archive,
  Trash2,
} from 'lucide-react';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    color: string;
    description: string;
    notesCount: number;
    lastStudied: string;
    progress: number;
    isActive?: boolean;
  };
  onClick?: () => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`study-card cursor-pointer h-100 ${
        subject.isActive ? 'border-primary border-2' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease'
      }}
    >
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center">
          <div className={`p-2 rounded-3 text-white me-3 ${subject.color}`}>
            <BookOpen size={20} />
          </div>
          <div>
            <h6 className="fw-bold mb-1">{subject.name}</h6>
            <small className="text-muted">
              {subject.description}
            </small>
          </div>
        </div>
        
        <div className="dropdown">
          <button 
            className="btn btn-sm btn-outline-secondary"
            type="button" 
            data-bs-toggle="dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical size={16} />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <Edit size={16} className="me-2" />
                Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Archive size={16} className="me-2" />
                Archive
              </a>
            </li>
            <li>
              <a className="dropdown-item text-danger" href="#">
                <Trash2 size={16} className="me-2" />
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center text-muted">
            <FileText size={16} className="me-1" />
            <small>{subject.notesCount} notes</small>
          </div>
          <div className="d-flex align-items-center text-muted">
            <Clock size={16} className="me-1" />
            <small>{subject.lastStudied}</small>
          </div>
        </div>
        <span className="badge bg-success text-white">
          <TrendingUp size={12} className="me-1" />
          Active
        </span>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">Study Progress</small>
          <small className="fw-medium">{subject.progress}%</small>
        </div>
        <div className="progress" style={{ height: '8px' }}>
          <div 
            className="progress-bar bg-primary" 
            style={{ width: `${subject.progress}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-sm flex-fill"
          onClick={(e) => e.stopPropagation()}
        >
          Study
        </button>
        <button
          className="btn btn-outline-primary btn-sm flex-fill"
          onClick={(e) => e.stopPropagation()}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}