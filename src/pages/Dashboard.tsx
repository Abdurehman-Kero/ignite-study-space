import { useState, useEffect } from 'react';
import {
  Plus,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  FileText,
} from 'lucide-react';
import SubjectCard from '@/components/Dashboard/SubjectCard';

const mockSubjects = [
  {
    id: '1',
    name: 'Computer Science',
    color: 'bg-primary',
    description: 'Algorithms & Data Structures',
    notesCount: 24,
    lastStudied: '2 hours ago',
    progress: 78,
    isActive: true,
  },
  {
    id: '2',
    name: 'Mathematics',
    color: 'bg-success',
    description: 'Calculus & Linear Algebra',
    notesCount: 18,
    lastStudied: '1 day ago',
    progress: 65,
  },
  {
    id: '3',
    name: 'Physics',
    color: 'bg-info',
    description: 'Quantum Mechanics',
    notesCount: 15,
    lastStudied: '3 days ago',
    progress: 42,
  },
  {
    id: '4',
    name: 'Chemistry',
    color: 'bg-danger',
    description: 'Organic Chemistry',
    notesCount: 12,
    lastStudied: '1 week ago',
    progress: 28,
  },
];

const studyStats = [
  {
    title: 'Total Notes',
    value: '69',
    change: '+12 this week',
    icon: FileText,
    color: 'text-blue-500',
  },
  {
    title: 'Study Time',
    value: '24h',
    change: '+3h from last week',
    icon: Clock,
    color: 'text-green-500',
  },
  {
    title: 'Subjects Active',
    value: '4',
    change: 'All subjects',
    icon: BookOpen,
    color: 'text-purple-500',
  },
  {
    title: 'AI Interactions',
    value: '156',
    change: '+28 this week',
    icon: Target,
    color: 'text-orange-500',
  },
];

export default function Dashboard() {
  const [weeklyGoal, setWeeklyGoal] = useState(85);
  const [currentProgress, setCurrentProgress] = useState(68);

  return (
    <div className="container-fluid">
      {/* Welcome Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-5 fw-bold text-primary mb-1">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted">
            Ready to continue your learning journey?
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} className="me-2" />
          New Subject
        </button>
      </div>

      {/* Study Stats */}
      <div className="row g-4 mb-4">
        {studyStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="study-card h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted fw-medium">
                      {stat.title}
                    </small>
                    <h3 className="fw-bold mb-1">{stat.value}</h3>
                    <small className="text-muted d-flex align-items-center">
                      <TrendingUp size={12} className="me-1" />
                      {stat.change}
                    </small>
                  </div>
                  <div className={`p-3 rounded-3 bg-light ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Goal Progress */}
      <div className="study-card mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold d-flex align-items-center mb-1">
              <Award size={20} className="text-primary me-2" />
              Weekly Study Goal
            </h5>
            <small className="text-muted">
              Track your weekly learning progress
            </small>
          </div>
          <button className="btn btn-outline-primary btn-sm">
            <Calendar size={16} className="me-2" />
            View Calendar
          </button>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="fw-medium">
              {currentProgress}% of {weeklyGoal}% goal completed
            </small>
            <small className="text-muted">
              {7 - Math.floor(currentProgress / (weeklyGoal / 7))} days remaining
            </small>
          </div>
          <div className="progress mb-3" style={{ height: '12px' }}>
            <div 
              className="progress-bar bg-primary" 
              style={{ width: `${(currentProgress / weeklyGoal) * 100}%` }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Great progress! Keep it up! 🚀
            </small>
            <small className="fw-medium text-primary">
              {weeklyGoal - currentProgress}% to go
            </small>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">Your Subjects</h2>
          <button className="btn btn-outline-primary">
            <Plus size={16} className="me-2" />
            Add Subject
          </button>
        </div>
        
        <div className="row g-4">
          {mockSubjects.map((subject) => (
            <div key={subject.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <SubjectCard
                subject={subject}
                onClick={() => console.log(`Opening subject: ${subject.name}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="study-card">
        <h5 className="fw-bold mb-1">Quick Actions</h5>
        <small className="text-muted mb-3 d-block">
          Jump into your most common tasks
        </small>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <button className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
              <FileText size={20} className="mb-2" />
              New Note
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
              <BookOpen size={20} className="mb-2" />
              Study Session
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
              <Target size={20} className="mb-2" />
              Take Quiz
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
              <Award size={20} className="mb-2" />
              AI Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}