import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Code, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, FileCode, MessageSquare, AlertCircle } from 'lucide-react';
import SecureCodeEditor from './SecureCodeEditor';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Test {
  id: string;
  title: string;
  description: string;
  instructions: string;
  time_limit_minutes: number;
  status: string;
  opens_at: string | null;
  closes_at: string | null;
}

interface Submission {
  id: string;
  test_id: string;
  status: string;
  started_at: string;
  submitted_at: string | null;
  code_content: string;
  final_score: number | null;
}

const StudentTestView = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTests();
    checkActiveSubmission();
  }, [user]);

  const loadTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (error) {
      console.error('Error loading tests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const checkActiveSubmission = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('test_submissions')
        .select('*, tests!test_submissions_test_id_fkey(*)')
        .eq('student_id', user.id)
        .eq('status', 'in_progress')
        .single();

      if (data && !error) {
        setSubmission(data);
        setActiveTest(data.tests as any);
      }
    } catch (error) {
      // No active submission
    }
  };

  const startTest = async (test: Test) => {
    if (!user) return;

    try {
      // Check if submission already exists
      const { data: existing } = await supabase
        .from('test_submissions')
        .select('*')
        .eq('test_id', test.id)
        .eq('student_id', user.id)
        .single();

      if (existing) {
        if (existing.status === 'submitted') {
          toast({
            title: 'Test Already Submitted',
            description: 'You have already completed this test.',
            variant: 'destructive',
          });
          return;
        }

        // Resume existing submission - ensure session exists
        const { data: existingSession } = await supabase
          .from('test_editor_sessions')
          .select('*')
          .eq('test_id', test.id)
          .eq('student_id', user.id)
          .single();

        if (!existingSession) {
          // Create session if it doesn't exist
          await supabase.from('test_editor_sessions').insert({
            test_id: test.id,
            student_id: user.id,
            submission_id: existing.id,
            current_code: existing.code_content,
          });
        }

        setSubmission(existing);
        setActiveTest(test);

        toast({
          title: 'Resuming Test',
          description: 'Your previous work has been loaded.',
        });
        return;
      }

      // Create new submission
      const { data: newSubmission, error } = await supabase
        .from('test_submissions')
        .insert({
          test_id: test.id,
          student_id: user.id,
          code_content: test.starter_code || '# Start coding here...\n',
          status: 'in_progress',
        })
        .select()
        .single();

      if (error) throw error;

      // Create editor session
      await supabase.from('test_editor_sessions').insert({
        test_id: test.id,
        student_id: user.id,
        submission_id: newSubmission.id,
        current_code: test.starter_code || '# Start coding here...\n',
      });

      setSubmission(newSubmission);
      setActiveTest(test);

      toast({
        title: 'Test Started',
        description: 'Good luck! Remember: no copy-paste or alt-tabbing.',
      });
    } catch (error) {
      console.error('Error starting test:', error);
      toast({
        title: 'Error',
        description: 'Failed to start test',
        variant: 'destructive',
      });
    }
  };

  const exitTest = () => {
    setActiveTest(null);
    setSubmission(null);
    loadTests();
  };

  if (loading) {
    return (
      <div className="container max-w-7xl py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  // Active test view
  if (activeTest && submission) {
    return (
      <SecureCodeEditor
        test={activeTest}
        submission={submission}
        onExit={exitTest}
      />
    );
  }

  // Test selection view
  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Coding Tests</h1>
        <p className="text-muted-foreground">
          Select a test to begin. Remember to follow the rules!
        </p>
      </div>

      <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800 dark:text-yellow-200">
          <strong>Important Rules:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>No copy-pasting code (Ctrl+C/V disabled)</li>
            <li>Switching tabs will trigger warnings and may affect your score</li>
            <li>Your code is auto-saved every 5 seconds</li>
            <li>Submit before time runs out or it will auto-submit</li>
          </ul>
        </AlertDescription>
      </Alert>

      {tests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Code className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No active tests available</p>
            <p className="text-sm text-muted-foreground mt-2">Check back later!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{test.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {test.description}
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="ml-2">
                    {test.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Time Limit: {test.time_limit_minutes} minutes</span>
                  </div>

                  {test.closes_at && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span>
                        Closes: {new Date(test.closes_at).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={() => startTest(test)}
                    className="w-full"
                    size="lg"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Completed tests section */}
      <CompletedTests userId={user?.id || ''} />
    </div>
  );
};

// Component for showing completed tests
const CompletedTests = ({ userId }: { userId: string }) => {
  const [completed, setCompleted] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadCompleted();
  }, [userId]);

  const loadCompleted = async () => {
    const { data } = await supabase
      .from('test_submissions')
      .select('*, tests!test_submissions_test_id_fkey(*)')
      .eq('student_id', userId)
      .in('status', ['submitted', 'graded'])
      .order('submitted_at', { ascending: false })
      .limit(5);

    setCompleted(data || []);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (completed.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recent Submissions</h2>
      <div className="space-y-3">
        {completed.map((sub) => {
          const isExpanded = expandedId === sub.id;
          const hasGrading = sub.status === 'graded' && sub.final_score !== null;

          return (
            <Card key={sub.id} className="overflow-hidden">
              <CardContent
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => toggleExpand(sub.id)}
              >
                <div className="flex items-center flex-1">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">{sub.tests?.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(sub.submitted_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasGrading && (
                    <Badge variant="outline" className="text-lg">
                      {sub.final_score}%
                    </Badge>
                  )}
                  {!hasGrading && (
                    <Badge variant="secondary">
                      Pending Review
                    </Badge>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardContent>

              {isExpanded && (
                <div className="border-t">
                  <CardContent className="pt-6 space-y-6">
                    {/* Anti-cheat metrics */}
                    {(sub.alt_tab_count > 0 || sub.paste_attempt_count > 0) && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <span>Activity Metrics</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-muted p-3 rounded-md">
                            <span className="text-muted-foreground">Alt-Tab Count:</span>
                            <span className="ml-2 font-medium">{sub.alt_tab_count}</span>
                          </div>
                          <div className="bg-muted p-3 rounded-md">
                            <span className="text-muted-foreground">Paste Attempts:</span>
                            <span className="ml-2 font-medium">{sub.paste_attempt_count}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Test Instructions */}
                    {sub.tests?.instructions && (
                      <div className="space-y-2">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors">
                            <FileCode className="h-4 w-4 text-indigo-600" />
                            <span>Test Instructions</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="mt-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 p-4 rounded-md text-instructions">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {sub.tests.instructions}
                            </ReactMarkdown>
                          </div>
                        </details>
                      </div>
                    )}

                    {/* Grading details */}
                    {hasGrading && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Grading Details</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {sub.auto_graded_score !== null && (
                            <div className="bg-muted p-3 rounded-md">
                              <span className="text-muted-foreground">Auto Score:</span>
                              <span className="ml-2 font-medium">{sub.auto_graded_score}%</span>
                            </div>
                          )}
                          {sub.manual_graded_score !== null && (
                            <div className="bg-muted p-3 rounded-md">
                              <span className="text-muted-foreground">Manual Score:</span>
                              <span className="ml-2 font-medium">{sub.manual_graded_score}%</span>
                            </div>
                          )}
                          <div className="bg-primary/10 p-3 rounded-md col-span-2">
                            <span className="text-muted-foreground">Final Score:</span>
                            <span className="ml-2 font-bold text-lg">{sub.final_score}%</span>
                          </div>
                        </div>
                        {sub.graded_at && (
                          <p className="text-xs text-muted-foreground">
                            Graded on {new Date(sub.graded_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Teacher's feedback */}
                    {sub.feedback && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          <span>Teacher's Notes</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-md">
                          <p className="text-sm whitespace-pre-wrap">{sub.feedback}</p>
                        </div>
                      </div>
                    )}

                    {/* Submitted code */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <FileCode className="h-4 w-4 text-purple-600" />
                        <span>Your Submission</span>
                      </div>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{sub.code_content}</pre>
                      </div>
                    </div>
                  </CardContent>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTestView;
