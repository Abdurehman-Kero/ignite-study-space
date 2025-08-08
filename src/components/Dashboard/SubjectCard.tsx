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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

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
    <Card
      className={`study-card cursor-pointer transition-all duration-300 ${
        subject.isActive ? 'ring-2 ring-primary ring-offset-2' : ''
      } ${isHovered ? 'scale-105' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl shadow-sm ${subject.color} text-white`}
            >
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">
                {subject.description}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{subject.notesCount} notes</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{subject.lastStudied}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Study Progress</span>
            <span className="text-sm font-medium">{subject.progress}%</span>
          </div>
          <Progress value={subject.progress} className="h-2" />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8"
            onClick={(e) => e.stopPropagation()}
          >
            Study
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8"
            onClick={(e) => e.stopPropagation()}
          >
            Add Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}