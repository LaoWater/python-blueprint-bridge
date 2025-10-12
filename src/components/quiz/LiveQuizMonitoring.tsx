import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, User, Clock, CheckCircle2 } from 'lucide-react';

interface ActiveStudent {
  id: string;
  user_id: string;
  username: string;
  started_at: string;
  correct_answers: number;
  total_questions: number;
  current_progress: number;
  time_elapsed: number;
  last_activity: string | null;
  is_active: boolean;
}

const LiveQuizMonitoring = () => {
  const [activeStudents, setActiveStudents] = useState<ActiveStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActiveStudents();

    // Real-time subscription - listen for all relevant changes
    const channel = supabase
      .channel('quiz_monitoring')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'quiz_attempts',
        },
        () => {
          loadActiveStudents();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (not just INSERT)
          schema: 'public',
          table: 'quiz_responses',
        },
        () => {
          loadActiveStudents();
        }
      )
      .subscribe();

    // Refresh every 5 seconds
    const interval = setInterval(loadActiveStudents, 5000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const loadActiveStudents = async () => {
    try {
      const INACTIVE_THRESHOLD_MS = 2 * 60 * 1000; // 2 minutes in milliseconds
      const now = Date.now();

      // Get active quiz attempts (not completed)
      const { data: attempts, error } = await supabase
        .from('quiz_attempts')
        .select('id, user_id, started_at, correct_answers, total_questions')
        .eq('is_completed', false)
        .order('started_at', { ascending: false });

      if (error) throw error;

      // Get profiles for these users
      const userIds = [...new Set(attempts?.map(a => a.user_id) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      // Calculate progress for each student and get last activity
      const studentsWithProgress = await Promise.all(
        (attempts || []).map(async (attempt) => {
          // Get number of responses and last activity time
          const { data: responses, count } = await supabase
            .from('quiz_responses')
            .select('answered_at', { count: 'exact' })
            .eq('attempt_id', attempt.id)
            .order('answered_at', { ascending: false })
            .limit(1);

          const lastActivity = responses?.[0]?.answered_at || null;
          const lastActivityTime = lastActivity
            ? new Date(lastActivity).getTime()
            : new Date(attempt.started_at).getTime();

          const timeSinceLastActivity = now - lastActivityTime;
          const isActive = timeSinceLastActivity < INACTIVE_THRESHOLD_MS;

          const progress = attempt.total_questions > 0
            ? Math.round(((count || 0) / attempt.total_questions) * 100)
            : 0;

          const timeElapsed = Math.floor(
            (Date.now() - new Date(attempt.started_at).getTime()) / 1000
          );

          const profile = profileMap.get(attempt.user_id);

          return {
            id: attempt.id,
            user_id: attempt.user_id,
            username: profile?.username || 'Unknown',
            started_at: attempt.started_at,
            correct_answers: attempt.correct_answers,
            total_questions: attempt.total_questions,
            current_progress: progress,
            time_elapsed: timeElapsed,
            last_activity: lastActivity,
            is_active: isActive,
          };
        })
      );

      // Filter to only show active students (last activity within 2 minutes)
      const activeOnly = studentsWithProgress.filter(student => student.is_active);

      setActiveStudents(activeOnly);
    } catch (error) {
      console.error('Error loading active students:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getActivityColor = (lastActivity: string | null, startedAt: string) => {
    // Calculate seconds since last activity
    const lastActivityTime = lastActivity
      ? new Date(lastActivity).getTime()
      : new Date(startedAt).getTime();
    const secondsSinceActivity = Math.floor((Date.now() - lastActivityTime) / 1000);

    // Green if active within 2 minutes
    if (secondsSinceActivity < 120) return 'bg-green-500';
    // This shouldn't happen as we filter out inactive students, but just in case:
    return 'bg-yellow-500';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Active Students
            </CardTitle>
            <Badge variant="default">
              {activeStudents.length} online
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {activeStudents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <User className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <p className="text-xl text-muted-foreground">No students taking quiz</p>
            <p className="text-sm text-muted-foreground mt-2">
              Students will appear here when they start the quiz
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeStudents.map((student) => (
            <Card key={student.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getActivityColor(
                        student.last_activity,
                        student.started_at
                      )}`}
                    />
                    <User className="h-4 w-4" />
                    <CardTitle className="text-sm">
                      {student.username}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{student.current_progress}%</span>
                  </div>
                  <Progress value={student.current_progress} className="h-2" />
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    <span>Question {Math.floor((student.current_progress / 100) * student.total_questions)} of {student.total_questions}</span>
                    <span>{Math.round((student.correct_answers / Math.max(Math.floor((student.current_progress / 100) * student.total_questions), 1)) * 100)}% correct</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium text-green-600">{student.correct_answers}</div>
                      <div className="text-xs text-muted-foreground">Correct</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium font-mono text-blue-600">
                        {formatTime(student.time_elapsed)}
                      </div>
                      <div className="text-xs text-muted-foreground">Time</div>
                    </div>
                  </div>
                </div>

                {/* Question Count & Score Preview */}
                <div className="text-xs border-t pt-2 space-y-1">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Started:</span>
                    <span>{new Date(student.started_at).toLocaleTimeString()}</span>
                  </div>
                  {student.current_progress > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Score:</span>
                      <span className={`font-semibold ${
                        (student.correct_answers / Math.max(Math.floor((student.current_progress / 100) * student.total_questions), 1)) * 100 >= 70
                          ? 'text-green-600'
                          : 'text-orange-600'
                      }`}>
                        {Math.round((student.correct_answers / Math.max(Math.floor((student.current_progress / 100) * student.total_questions), 1)) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveQuizMonitoring;
