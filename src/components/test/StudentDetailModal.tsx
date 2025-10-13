import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Database } from '@/integrations/supabase/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import SecureEditor from './SecureEditor';
import { AlertTriangle, MessageSquare, Save } from 'lucide-react';

type Submission = Database['public']['Tables']['test_submissions']['Row'];

interface StudentDetailModalProps {
  submission: Submission;
  open: boolean;
  onClose: () => void;
}

const StudentDetailModal = ({ submission, open, onClose }: StudentDetailModalProps) => {
  const { user } = useAuth();
  const [code, setCode] = useState(submission.code_content);
  const [teacherNote, setTeacherNote] = useState(submission.teacher_note || '');
  const [saving, setSaving] = useState(false);
  const [studentQuestions, setStudentQuestions] = useState<any[]>([]);
  const [questionResponse, setQuestionResponse] = useState('');

  useEffect(() => {
    if (open) {
      setCode(submission.code_content);
      setTeacherNote(submission.teacher_note || '');
      fetchStudentQuestions();
    }
  }, [open, submission]);

  const fetchStudentQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('test_student_questions')
        .select('*')
        .eq('test_id', submission.test_id)
        .eq('student_id', submission.student_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudentQuestions(data || []);
    } catch (error) {
      console.error('Error fetching student questions:', error);
    }
  };

  const handleSaveCode = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('test_submissions')
        .update({
          code_content: code,
          last_edited_by: user.id,
          last_edit_at: new Date().toISOString(),
        })
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: 'Code Saved',
        description: 'Student code has been updated',
      });
    } catch (error) {
      console.error('Error saving code:', error);
      toast({
        title: 'Error',
        description: 'Failed to save code',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNote = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('test_submissions')
        .update({
          teacher_note: teacherNote,
        })
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: 'Note Saved',
        description: 'Your note has been saved',
      });
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: 'Error',
        description: 'Failed to save note',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRespondToQuestion = async (questionId: string) => {
    if (!questionResponse.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('test_student_questions')
        .update({
          admin_response: questionResponse,
          responded_by: user.id,
          responded_at: new Date().toISOString(),
        })
        .eq('id', questionId);

      if (error) throw error;

      toast({
        title: 'Response Sent',
        description: 'Your response has been sent to the student',
      });

      setQuestionResponse('');
      fetchStudentQuestions();
    } catch (error) {
      console.error('Error responding to question:', error);
      toast({
        title: 'Error',
        description: 'Failed to send response',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Student Session
            {submission.status === 'submitted' && (
              <Badge className="bg-blue-500">Submitted</Badge>
            )}
            {submission.tab_switches >= 3 && (
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Violations
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Monitor and assist student in real-time
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="editor" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">Code Editor</TabsTrigger>
            <TabsTrigger value="notes">Teacher Notes</TabsTrigger>
            <TabsTrigger value="questions">
              Questions {studentQuestions.filter(q => !q.admin_response).length > 0 && (
                <Badge className="ml-2 bg-red-500">
                  {studentQuestions.filter(q => !q.admin_response).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="flex-1 flex flex-col mt-4 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">
                  Last edited: {new Date(submission.last_edit_at).toLocaleString()}
                </p>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">
                    Tab switches: <Badge variant={submission.tab_switches > 0 ? 'destructive' : 'outline'}>
                      {submission.tab_switches}
                    </Badge>
                  </span>
                  <span className="text-muted-foreground">
                    Copy/Paste attempts: <Badge variant={submission.copy_paste_attempts > 0 ? 'destructive' : 'outline'}>
                      {submission.copy_paste_attempts}
                    </Badge>
                  </span>
                </div>
              </div>
              <Button onClick={handleSaveCode} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Code Changes'}
              </Button>
            </div>

            <div className="flex-1 border rounded-lg overflow-hidden">
              <SecureEditor
                code={code}
                onChange={setCode}
                submissionId={submission.id}
                language="python"
                readOnly={false}
              />
            </div>
          </TabsContent>

          <TabsContent value="notes" className="flex-1 flex flex-col mt-4 overflow-hidden">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="text-sm text-muted-foreground">
                Leave notes or hints for the student. They will see this in their editor.
              </div>
              <Textarea
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                placeholder="Type your note or hint here..."
                className="flex-1 min-h-[200px]"
              />
              <Button onClick={handleSaveNote} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Note'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="flex-1 mt-4 overflow-y-auto">
            <div className="space-y-4">
              {studentQuestions.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No questions asked yet
                  </CardContent>
                </Card>
              ) : (
                studentQuestions.map((question) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Student Question
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {new Date(question.created_at).toLocaleString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p>{question.question_text}</p>
                      </div>

                      {question.admin_response ? (
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <p className="text-sm font-medium mb-1">Your Response:</p>
                          <p>{question.admin_response}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Sent: {new Date(question.responded_at).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Textarea
                            value={questionResponse}
                            onChange={(e) => setQuestionResponse(e.target.value)}
                            placeholder="Type your response..."
                            className="min-h-[100px]"
                          />
                          <Button
                            onClick={() => handleRespondToQuestion(question.id)}
                            disabled={!questionResponse.trim()}
                          >
                            Send Response
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;
