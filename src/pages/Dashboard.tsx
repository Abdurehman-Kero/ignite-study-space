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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SubjectCard from '@/components/Dashboard/SubjectCard';

const mockSubjects = [
  {
    id: '1',
    name: 'Computer Science',
    color: 'bg-blue-500',
    description: 'Algorithms & Data Structures',
    notesCount: 24,
    lastStudied: '2 hours ago',
    progress: 78,
    isActive: true,
  },
  {
    id: '2',
    name: 'Mathematics',
    color: 'bg-green-500',
    description: 'Calculus & Linear Algebra',
    notesCount: 18,
    lastStudied: '1 day ago',
    progress: 65,
  },
  {
    id: '3',
    name: 'Physics',
    color: 'bg-purple-500',
    description: 'Quantum Mechanics',
    notesCount: 15,
    lastStudied: '3 days ago',
    progress: 42,
  },
  {
    id: '4',
    name: 'Chemistry',
    color: 'bg-red-500',
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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">
            Welcome back, group-6! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to continue your learning journey?
          </p>
        </div>
        <Button className="interactive-glow">
          <Plus className="h-4 w-4 mr-2" />
          New Subject
        </Button>
      </div>

      {/* Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {studyStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="study-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Goal Progress */}
      <Card className="study-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Weekly Study Goal
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Track your weekly learning progress
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {currentProgress}% of {weeklyGoal}% goal completed
              </span>
              <span className="text-sm text-muted-foreground">
                {7 - Math.floor(currentProgress / (weeklyGoal / 7))} days remaining
              </span>
            </div>
            <Progress value={(currentProgress / weeklyGoal) * 100} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Great progress! Keep it up! 🚀
              </span>
              <span className="font-medium text-primary">
                {weeklyGoal - currentProgress}% to go
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Subjects</h2>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => console.log(`Opening subject: ${subject.name}`)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Jump into your most common tasks
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <FileText className="h-5 w-5 mb-2" />
              New Note
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <BookOpen className="h-5 w-5 mb-2" />
              Study Session
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Target className="h-5 w-5 mb-2" />
              Take Quiz
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Award className="h-5 w-5 mb-2" />
              AI Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
