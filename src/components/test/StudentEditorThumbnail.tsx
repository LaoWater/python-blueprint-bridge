import { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

type Submission = Database['public']['Tables']['test_submissions']['Row'];

interface StudentEditorThumbnailProps {
  submission: Submission;
}

const StudentEditorThumbnail = ({ submission }: StudentEditorThumbnailProps) => {
  const [isRecent, setIsRecent] = useState(false);

  useEffect(() => {
    const checkRecent = () => {
      const lastEdit = new Date(submission.last_edit_at);
      const now = new Date();
      const diffSeconds = (now.getTime() - lastEdit.getTime()) / 1000;
      setIsRecent(diffSeconds < 30);
    };

    checkRecent();
    const interval = setInterval(checkRecent, 5000);

    return () => clearInterval(interval);
  }, [submission.last_edit_at]);

  const getStatusBadge = () => {
    if (submission.status === 'submitted') {
      return <Badge className="bg-blue-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Submitted</Badge>;
    }
    if (submission.tab_switches >= 3) {
      return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" /> Violations</Badge>;
    }
    if (isRecent) {
      return <Badge className="bg-green-500 animate-pulse"><Clock className="w-3 h-3 mr-1" /> Active</Badge>;
    }
    return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" /> Idle</Badge>;
  };

  const username = `Student ${submission.student_id.slice(0, 8)}`;

  return (
    <Card className="hover:border-primary/50 transition-all cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{username}</h3>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-muted rounded-lg p-3 font-mono text-xs h-32 overflow-hidden">
          <pre className="whitespace-pre-wrap break-words">
            {submission.code_content.split('\n').slice(0, 6).join('\n')}
            {submission.code_content.split('\n').length > 6 && '\n...'}
          </pre>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Last edit: {new Date(submission.last_edit_at).toLocaleTimeString()}
          </span>
          {submission.tab_switches > 0 && (
            <Badge variant="destructive" className="text-xs">
              Switches: {submission.tab_switches}
            </Badge>
          )}
        </div>
        {submission.teacher_note && (
          <div className="text-xs p-2 bg-primary/5 rounded border border-primary/20">
            💡 Note left
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentEditorThumbnail;
