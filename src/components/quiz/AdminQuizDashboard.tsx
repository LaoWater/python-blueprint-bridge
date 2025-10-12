import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Trophy, Clock, AlertTriangle } from 'lucide-react';
import QuizResultsViewer from './QuizResultsViewer';
import LiveQuizMonitoring from './LiveQuizMonitoring';
import DuplicateAttemptsManager from './DuplicateAttemptsManager';

interface QuizStats {
  totalAttempts: number;
  activeStudents: number;
  completedToday: number;
  averageScore: number;
}

const AdminQuizDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<QuizStats>({
    totalAttempts: 0,
    activeStudents: 0,
    completedToday: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();

    // Refresh stats every 10 seconds
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const INACTIVE_THRESHOLD_MS = 2 * 60 * 1000; // 2 minutes
      const now = Date.now();

      // Total attempts
      const { count: totalAttempts } = await supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true });

      // Active students (started but not completed, with recent activity within 2 minutes)
      const { data: incompleteAttempts } = await supabase
        .from('quiz_attempts')
        .select('id, started_at')
        .eq('is_completed', false);

      // Check last activity for each incomplete attempt
      let activeCount = 0;
      if (incompleteAttempts) {
        for (const attempt of incompleteAttempts) {
          const { data: lastResponse } = await supabase
            .from('quiz_responses')
            .select('answered_at')
            .eq('attempt_id', attempt.id)
            .order('answered_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          const lastActivityTime = lastResponse?.answered_at
            ? new Date(lastResponse.answered_at).getTime()
            : new Date(attempt.started_at).getTime();

          const timeSinceActivity = now - lastActivityTime;
          if (timeSinceActivity < INACTIVE_THRESHOLD_MS) {
            activeCount++;
          }
        }
      }

      // Completed today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: completedToday } = await supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('is_completed', true)
        .gte('completed_at', today.toISOString());

      // Average score
      const { data: scoreData } = await supabase
        .from('quiz_attempts')
        .select('score')
        .eq('is_completed', true)
        .not('score', 'is', null);

      const avgScore = scoreData && scoreData.length > 0
        ? Math.round(scoreData.reduce((sum, item) => sum + (item.score || 0), 0) / scoreData.length)
        : 0;

      setStats({
        totalAttempts: totalAttempts || 0,
        activeStudents: activeCount,
        completedToday: completedToday || 0,
        averageScore: avgScore,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-7xl py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quiz Administration</h1>
        <p className="text-muted-foreground">
          Monitor student progress, review results, and manage quizzes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalAttempts}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-blue-600">
                {stats.activeStudents}
              </div>
              {stats.activeStudents > 0 && (
                <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Taking quiz now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.completedToday}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Since midnight</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {stats.averageScore}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">All completed quizzes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            View Results
            {stats.totalAttempts > 0 && (
              <Badge variant="secondary" className="ml-2">
                {stats.totalAttempts}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Live Monitoring
            {stats.activeStudents > 0 && (
              <Badge variant="destructive" className="ml-2 animate-pulse">
                {stats.activeStudents}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="duplicates" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Manage Duplicates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <QuizResultsViewer onRefreshStats={loadStats} />
        </TabsContent>

        <TabsContent value="monitoring">
          <LiveQuizMonitoring />
        </TabsContent>

        <TabsContent value="duplicates">
          <DuplicateAttemptsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminQuizDashboard;
