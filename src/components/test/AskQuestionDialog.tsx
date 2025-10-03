import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AskQuestionDialogProps {
  testId: string;
  studentId: string;
}

const AskQuestionDialog = ({ testId, studentId }: AskQuestionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [loading, setLoading] = useState(false);
  const MAX_QUESTIONS = 2;

  useEffect(() => {
    fetchQuestionCount();
  }, [testId, studentId]);

  const fetchQuestionCount = async () => {
    try {
      const { data, error } = await supabase
        .from('test_student_questions')
        .select('id')
        .eq('test_id', testId)
        .eq('student_id', studentId);

      if (error) throw error;
      setQuestionsAsked(data?.length || 0);
    } catch (error) {
      console.error('Error fetching question count:', error);
    }
  };

  const handleAskQuestion = async () => {
    if (!questionText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a question',
        variant: 'destructive',
      });
      return;
    }

    if (questionsAsked >= MAX_QUESTIONS) {
      toast({
        title: 'Limit Reached',
        description: `You can only ask ${MAX_QUESTIONS} questions per test`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('test_student_questions')
        .insert({
          test_id: testId,
          student_id: studentId,
          question_text: questionText,
        });

      if (error) throw error;

      toast({
        title: 'Question Sent',
        description: 'Your question has been sent to the instructor',
      });

      setQuestionText('');
      setOpen(false);
      fetchQuestionCount();
    } catch (error) {
      console.error('Error asking question:', error);
      toast({
        title: 'Error',
        description: 'Failed to send question',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const remainingQuestions = MAX_QUESTIONS - questionsAsked;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={questionsAsked >= MAX_QUESTIONS}
          className="gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Ask Question
          <Badge variant={remainingQuestions === 0 ? 'destructive' : 'secondary'}>
            {remainingQuestions}/{MAX_QUESTIONS}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
          <DialogDescription>
            You can ask up to {MAX_QUESTIONS} questions during this test. Remaining: {remainingQuestions}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Type your question here..."
            className="min-h-[120px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAskQuestion} disabled={loading || !questionText.trim()}>
            {loading ? 'Sending...' : 'Send Question'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionDialog;
