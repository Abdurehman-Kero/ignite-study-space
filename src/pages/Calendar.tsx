import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StudySession {
  id: string;
  title: string;
  subject: string;
  date: Date;
  duration: number;
  type: 'study' | 'exam' | 'assignment' | 'reminder';
  color: string;
}

const mockSessions: StudySession[] = [
  {
    id: '1',
    title: 'Algorithm Review',
    subject: 'Computer Science',
    date: new Date(),
    duration: 120,
    type: 'study',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Physics Exam',
    subject: 'Physics',
    date: new Date(Date.now() + 86400000),
    duration: 180,
    type: 'exam',
    color: 'bg-red-500',
  },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<StudySession[]>(mockSessions);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeColor = (type: StudySession['type']) => {
    switch (type) {
      case 'study': return 'bg-blue-500';
      case 'exam': return 'bg-red-500';
      case 'assignment': return 'bg-yellow-500';
      case 'reminder': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const todaysSessions = sessions.filter(session => 
    session.date.toDateString() === new Date().toDateString()
  );

  const upcomingSessions = sessions.filter(session => 
    session.date > new Date() && session.date.toDateString() !== new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Plan and track your study sessions
          </p>
        </div>
        <Button className="interactive-glow">
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="lg:col-span-2 study-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {formatDate(selectedDate)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simplified calendar view */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - date.getDay() + i);
                const isToday = date.toDateString() === new Date().toDateString();
                const hasSession = sessions.some(s => s.date.toDateString() === date.toDateString());
                
                return (
                  <button
                    key={i}
                    className={`p-2 text-sm rounded-lg transition-colors relative ${
                      isToday 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date.getDate()}
                    {hasSession && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-accent rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Sessions */}
        <Card className="study-card">
          <CardHeader>
            <CardTitle>Today's Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysSessions.length > 0 ? (
              todaysSessions.map(session => (
                <div key={session.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`h-3 w-3 rounded-full ${getTypeColor(session.type)}`} />
                    <span className="font-medium text-sm">{session.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{session.subject}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {session.duration} minutes
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No sessions today</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingSessions.map(session => (
              <div key={session.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{session.title}</h3>
                  <Badge variant="secondary" className={`${getTypeColor(session.type)} text-white`}>
                    {session.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{session.subject}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {session.date.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.duration}m
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}