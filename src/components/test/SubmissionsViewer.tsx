import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, AlertTriangle, Save, Award } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Submission {
  id: string;
  student_id: string;
  code_content: string;
  started_at: string;
  submitted_at: string | null;
  status: string;
  alt_tab_count: number;
  paste_attempt_count: number;
  final_score: number | null;
  feedback: string | null;
  profiles?: {
    username: string;
  };
}

interface SubmissionsViewerProps {
  testId: string;
  testTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionsViewer = ({ testId, testTitle, isOpen, onClose }: SubmissionsViewerProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [score, setScore] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen, testId]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      // Use explicit foreign key name to avoid ambiguity
      const { data, error } = await supabase
        .from('test_submissions')
        .select('*, profiles!test_submissions_student_id_fkey(username)')
        .eq('test_id', testId)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const viewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setScore(submission.final_score?.toString() || '');
    setFeedback(submission.feedback || '');
  };

  const saveGrade = async () => {
    if (!selectedSubmission) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('test_submissions')
        .update({
          final_score: score ? parseFloat(score) : null,
          feedback,
          status: 'graded',
          graded_at: new Date().toISOString(),
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({
        title: 'Grade Saved',
        description: 'Student grade has been updated',
      });

      setSelectedSubmission(null);
      loadSubmissions();
    } catch (error: any) {
      console.error('Error saving grade:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save grade',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      in_progress: 'secondary',
      submitted: 'default',
      graded: 'outline',
    };

    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <>
      {/* Main submissions list dialog */}
      <Dialog open={isOpen && !selectedSubmission} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl">Submissions: {testTitle}</DialogTitle>
            <DialogDescription>
              Review and grade student submissions for this test.
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No submissions yet</p>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Violations</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.profiles?.username || 'Unknown'}
                      </TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-sm">
                        {submission.submitted_at
                          ? new Date(submission.submitted_at).toLocaleString()
                          : 'In progress'}
                      </TableCell>
                      <TableCell>
                        {submission.alt_tab_count > 0 && (
                          <Badge variant="destructive" className="mr-2">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {submission.alt_tab_count} alt-tab
                          </Badge>
                        )}
                        {submission.paste_attempt_count > 0 && (
                          <Badge variant="outline">
                            {submission.paste_attempt_count} paste
                          </Badge>
                        )}
                        {submission.alt_tab_count === 0 && submission.paste_attempt_count === 0 && (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {submission.final_score !== null ? (
                          <Badge variant="default">
                            <Award className="h-3 w-3 mr-1" />
                            {submission.final_score}%
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not graded</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewSubmission(submission)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View & Grade
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Individual submission grading dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                Grading: {selectedSubmission?.profiles?.username || 'Student'}
              </span>
              {selectedSubmission && (
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedSubmission.status)}
                  {selectedSubmission.alt_tab_count > 0 && (
                    <Badge variant="destructive">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {selectedSubmission.alt_tab_count} violations
                    </Badge>
                  )}
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              Review the student's code and provide a grade and feedback.
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              {/* Code display */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Submitted Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      {selectedSubmission.code_content}
                    </pre>
                  </ScrollArea>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Submitted: {selectedSubmission.submitted_at
                      ? new Date(selectedSubmission.submitted_at).toLocaleString()
                      : 'In progress'}
                  </div>
                </CardContent>
              </Card>

              {/* Grading form */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score">Score (0-100)</Label>
                  <Input
                    id="score"
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Enter score"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={saveGrade}
                    disabled={saving}
                    className="w-full"
                  >
                    {saving ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Grade
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="feedback">Feedback</Label>
                <ScrollArea className="h-[100px]">
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter feedback for student..."
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubmissionsViewer;
