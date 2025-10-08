import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Eye,
  Activity,
  AlertTriangle,
  MessageSquare,
  Clock,
  Code,
  User,
  Send,
  Maximize2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface StudentSession {
  student_id: string;
  student_username: string;
  current_code: string;
  last_activity: string;
  is_active: boolean;
  alt_tab_count: number;
  keystrokes_count: number;
  submission_status: string;
  test_id: string;
  test_title: string;
}

const LiveMonitoringGrid = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentSession | null>(null);
  const [interventionMessage, setInterventionMessage] = useState('');
  const [interventionType, setInterventionType] = useState<'message' | 'code_hint' | 'warning'>('message');

  // Load active tests
  useEffect(() => {
    loadActiveTests();
  }, []);

  // Subscribe to sessions when test is selected
  useEffect(() => {
    if (!selectedTest) return;

    loadSessions();

    // Real-time subscription
    const channel = supabase
      .channel('test_sessions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'test_editor_sessions',
          filter: `test_id=eq.${selectedTest}`,
        },
        () => {
          loadSessions();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'test_submissions',
          filter: `test_id=eq.${selectedTest}`,
        },
        () => {
          loadSessions();
        }
      )
      .subscribe();

    // Refresh every 5 seconds
    const interval = setInterval(loadSessions, 5000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, [selectedTest]);

  const loadActiveTests = async () => {
    const { data } = await supabase
      .from('tests')
      .select('id, title, status')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    setTests(data || []);
    if (data && data.length > 0) {
      setSelectedTest(data[0].id);
    }
  };

  const loadSessions = async () => {
    if (!selectedTest) return;

    try {
      // Get all editor sessions for this test
      const { data: sessionData, error: sessionError } = await supabase
        .from('test_editor_sessions')
        .select('*, profiles!test_editor_sessions_student_id_fkey(id, username)')
        .eq('test_id', selectedTest);

      if (sessionError) throw sessionError;

      // Get all submissions for this test
      const { data: submissionData, error: submissionError } = await supabase
        .from('test_submissions')
        .select('student_id, status, alt_tab_count')
        .eq('test_id', selectedTest);

      if (submissionError) throw submissionError;

      // Merge the data
      const submissionMap = new Map(
        submissionData?.map(s => [s.student_id, s]) || []
      );

      const mergedSessions: StudentSession[] = (sessionData || []).map(session => {
        const submission = submissionMap.get(session.student_id);
        return {
          student_id: session.student_id,
          student_username: (session.profiles as any)?.username || 'Unknown',
          current_code: session.current_code || '',
          last_activity: session.last_activity,
          is_active: session.is_active,
          alt_tab_count: submission?.alt_tab_count || 0,
          keystrokes_count: session.keystrokes_count || 0,
          submission_status: submission?.status || 'not_started',
          test_id: selectedTest,
          test_title: tests.find(t => t.id === selectedTest)?.title || '',
        };
      });

      setSessions(mergedSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load student sessions',
        variant: 'destructive',
      });
    }
  };

  const sendIntervention = async () => {
    if (!selectedStudent || !interventionMessage.trim()) return;

    try {
      // Insert intervention
      await supabase.from('test_admin_interventions').insert({
        test_id: selectedTest,
        student_id: selectedStudent.student_id,
        admin_id: user?.id,
        intervention_type: interventionType,
        content: interventionMessage,
        student_code_snapshot: selectedStudent.current_code,
      });

      toast({
        title: 'Intervention Sent',
        description: `Message sent to ${selectedStudent.student_username}`,
      });

      setInterventionMessage('');
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error sending intervention:', error);
      toast({
        title: 'Error',
        description: 'Failed to send intervention',
        variant: 'destructive',
      });
    }
  };

  const markAsViewing = async (studentId: string, viewing: boolean) => {
    await supabase
      .from('test_editor_sessions')
      .update({ admin_viewing: viewing })
      .eq('test_id', selectedTest)
      .eq('student_id', studentId);
  };

  const getActivityColor = (lastActivity: string) => {
    const seconds = (Date.now() - new Date(lastActivity).getTime()) / 1000;
    if (seconds < 10) return 'bg-green-500';
    if (seconds < 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      in_progress: 'default',
      submitted: 'secondary',
      not_started: 'outline',
    };

    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Test selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Select Test to Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedTest} onValueChange={setSelectedTest}>
            <SelectTrigger>
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent>
              {tests.map((test) => (
                <SelectItem key={test.id} value={test.id}>
                  {test.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Student grid */}
      {selectedTest && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <Card key={session.student_id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <CardTitle className="text-sm">
                      {session.student_username || 'Anonymous'}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getActivityColor(session.last_activity)}`}
                      title={`Last active: ${new Date(session.last_activity).toLocaleTimeString()}`}
                    />
                    {getStatusBadge(session.submission_status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Code preview */}
                <div className="bg-muted rounded-md p-2 font-mono text-xs h-32 overflow-hidden relative">
                  <pre className="whitespace-pre-wrap break-words">
                    {session.current_code?.slice(0, 200) || 'No code yet...'}
                  </pre>
                  {session.current_code && session.current_code.length > 200 && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted to-transparent" />
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    {session.keystrokes_count} chars
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(session.last_activity).toLocaleTimeString()}
                  </span>
                </div>

                {/* Warnings */}
                {session.alt_tab_count > 0 && (
                  <Badge variant="destructive" className="w-full justify-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {session.alt_tab_count} alt-tab warnings
                  </Badge>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedStudent(session);
                          markAsViewing(session.student_id, true);
                        }}
                      >
                        <Maximize2 className="h-3 w-3 mr-1" />
                        View Full
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>
                          {session.student_username}'s Code
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                        <pre className="font-mono text-sm whitespace-pre-wrap">
                          {session.current_code || 'No code written yet...'}
                        </pre>
                      </ScrollArea>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Activity className="h-4 w-4" />
                        Last activity: {new Date(session.last_activity).toLocaleString()}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1"
                        onClick={() => setSelectedStudent(session)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Help
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Send Message to {session.student_username}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Select
                          value={interventionType}
                          onValueChange={(val: any) => setInterventionType(val)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="message">💬 Message</SelectItem>
                            <SelectItem value="code_hint">💡 Code Hint</SelectItem>
                            <SelectItem value="warning">⚠️ Warning</SelectItem>
                          </SelectContent>
                        </Select>

                        <Textarea
                          placeholder="Type your message here..."
                          value={interventionMessage}
                          onChange={(e) => setInterventionMessage(e.target.value)}
                          rows={4}
                        />

                        <Button
                          onClick={sendIntervention}
                          className="w-full"
                          disabled={!interventionMessage.trim()}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Intervention
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTest && sessions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Eye className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No active students</p>
            <p className="text-sm text-muted-foreground mt-2">
              Students will appear here once they start the test
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveMonitoringGrid;
