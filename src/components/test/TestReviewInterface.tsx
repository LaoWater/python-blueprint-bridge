import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecureEditor from './SecureEditor';
import { CheckCircle2, Clock, FileText, User } from 'lucide-react';

type Test = Database['public']['Tables']['tests']['Row'];
type Assignment = Database['public']['Tables']['test_questions']['Row'];
type Submission = Database['public']['Tables']['test_submissions']['Row'];

interface SubmissionWithProfile extends Submission {
  student_username?: string;
}

const TestReviewInterface = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionWithProfile[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithProfile | null>(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    if (selectedTest) {
      fetchAssignments();
      fetchSubmissions();
    }
  }, [selectedTest]);

  useEffect(() => {
    if (selectedSubmission) {
      setScore(selectedSubmission.score?.toString() || '');
      setFeedback(selectedSubmission.teacher_note || '');
    }
  }, [selectedSubmission]);

  const fetchTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tests',
        variant: 'destructive',
      });
    }
  };

  const fetchAssignments = async () => {
    if (!selectedTest) return;

    try {
      const { data, error } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_id', selectedTest.id)
        .order('question_number', { ascending: true });

      if (error) throw error;
      setAssignments(data || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchSubmissions = async () => {
    if (!selectedTest) return;

    try {
      // Fetch submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('test_submissions')
        .select('*')
        .eq('test_id', selectedTest.id)
        .eq('status', 'submitted')
        .order('submitted_at', { ascending: false });

      if (submissionsError) throw submissionsError;

      // Fetch usernames separately
      const studentIds = [...new Set(submissionsData?.map(s => s.student_id) || [])];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', studentIds);

      if (profilesError) throw profilesError;

      // Map profiles to submissions
      const submissionsWithProfiles: SubmissionWithProfile[] = (submissionsData || []).map(sub => ({
        ...sub,
        student_username: profiles?.find(p => p.id === sub.student_id)?.username || undefined
      }));

      setSubmissions(submissionsWithProfiles);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleSaveGrade = async () => {
    if (!selectedSubmission) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('test_submissions')
        .update({
          score: score ? parseInt(score) : null,
          teacher_note: feedback,
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Grade and feedback saved',
      });

      // Refresh submissions
      await fetchSubmissions();
    } catch (error) {
      console.error('Error saving grade:', error);
      toast({
        title: 'Error',
        description: 'Failed to save grade',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getAssignmentForSubmission = (submission: Submission) => {
    return assignments.find(a => a.id === submission.question_id);
  };

  const getStudentName = (submission: SubmissionWithProfile) => {
    return submission.student_username || 'Student';
  };

  const groupSubmissionsByStudent = () => {
    const grouped = new Map<string, SubmissionWithProfile[]>();
    submissions.forEach(sub => {
      const studentId = sub.student_id;
      if (!grouped.has(studentId)) {
        grouped.set(studentId, []);
      }
      grouped.get(studentId)!.push(sub);
    });
    return grouped;
  };

  return (
    <div className="h-full flex gap-4 p-4">
      {/* Left: Test Selection */}
      <Card className="w-80 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Select Test to Review
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {tests.map(test => (
            <Button
              key={test.id}
              variant={selectedTest?.id === test.id ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedTest(test)}
            >
              <div className="flex flex-col items-start gap-1 w-full">
                <span className="font-medium truncate">{test.title}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    test.status === 'live' ? 'default' :
                    test.status === 'closed' ? 'secondary' : 'outline'
                  }>
                    {test.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(test.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Middle: Submissions List */}
      {selectedTest && (
        <Card className="w-96 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Submissions ({submissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-3">
            {Array.from(groupSubmissionsByStudent()).map(([studentId, studentSubs]) => {
              const studentName = getStudentName(studentSubs[0]);
              const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0);
              const earnedPoints = studentSubs.reduce((sum, sub) => sum + (sub.score || 0), 0);

              return (
                <Card key={studentId} className="overflow-hidden">
                  <div className="p-3 bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{studentName}</span>
                      <Badge variant="outline">
                        {earnedPoints}/{totalPoints} pts
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1 p-2">
                    {studentSubs.map(sub => {
                      const assignment = getAssignmentForSubmission(sub);
                      return (
                        <Button
                          key={sub.id}
                          variant={selectedSubmission?.id === sub.id ? 'default' : 'ghost'}
                          className="w-full justify-start text-sm"
                          size="sm"
                          onClick={() => setSelectedSubmission(sub)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="truncate">{assignment?.title}</span>
                            <div className="flex items-center gap-2">
                              {sub.score !== null ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <Clock className="w-4 h-4 text-amber-500" />
                              )}
                              <span className="text-xs">{sub.score || 0}/{assignment?.points}</span>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
            {submissions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No submissions yet
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Right: Submission Review */}
      {selectedSubmission && (
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>
              {getAssignmentForSubmission(selectedSubmission)?.title} - {getStudentName(selectedSubmission)}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Submitted: {new Date(selectedSubmission.submitted_at!).toLocaleString()}</span>
              <Badge variant={selectedSubmission.tab_switches > 0 ? 'destructive' : 'outline'}>
                Tab switches: {selectedSubmission.tab_switches}
              </Badge>
              <Badge variant={selectedSubmission.copy_paste_attempts > 0 ? 'destructive' : 'outline'}>
                Copy/Paste: {selectedSubmission.copy_paste_attempts}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
            <Tabs defaultValue="code" className="flex-1 flex flex-col min-h-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="code">Student Code</TabsTrigger>
                <TabsTrigger value="grade">Grade & Feedback</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="flex-1 min-h-0 mt-4">
                <div className="h-full border rounded-lg overflow-hidden">
                  <SecureEditor
                    code={selectedSubmission.code_content}
                    onChange={() => {}}
                    submissionId={selectedSubmission.id}
                    language="python"
                    readOnly={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="grade" className="flex-1 flex flex-col gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Score</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      placeholder="Score"
                      className="w-24"
                      min="0"
                      max={getAssignmentForSubmission(selectedSubmission)?.points}
                    />
                    <span className="text-sm text-muted-foreground">
                      / {getAssignmentForSubmission(selectedSubmission)?.points} points
                    </span>
                  </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-sm font-medium">Feedback</label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter feedback for the student..."
                    className="flex-1 min-h-[200px]"
                  />
                </div>

                <Button onClick={handleSaveGrade} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Grade & Feedback'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestReviewInterface;
