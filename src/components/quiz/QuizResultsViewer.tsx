import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, Trophy, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  started_at: string;
  completed_at: string | null;
  score: number | null;
  correct_answers: number;
  total_questions: number;
  time_spent_seconds: number | null;
  passed: boolean | null;
  is_completed: boolean;
  profiles?: {
    username: string;
  };
  quizzes?: {
    title: string;
    passing_score: number;
  };
}

interface QuestionResponse {
  id: string;
  question_id: string;
  user_answer: string;
  is_correct: boolean;
  time_spent_seconds: number;
  quiz_questions?: {
    question_text: string;
    correct_answer: string;
    explanation: string;
    options: any;
  };
}

interface QuizResultsViewerProps {
  onRefreshStats: () => void;
}

const QuizResultsViewer = ({ onRefreshStats }: QuizResultsViewerProps) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = async () => {
    setLoading(true);
    try {
      // First, get attempts and user IDs
      const { data: attemptsData, error: attemptsError } = await supabase
        .from('quiz_attempts')
        .select('*')
        .order('started_at', { ascending: false });

      if (attemptsError) throw attemptsError;

      // Then get user profiles
      const userIds = [...new Set(attemptsData?.map(a => a.user_id) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds);

      // Get quiz info
      const quizIds = [...new Set(attemptsData?.map(a => a.quiz_id) || [])];
      const { data: quizzes } = await supabase
        .from('quizzes')
        .select('id, title, passing_score')
        .in('id', quizIds);

      // Merge data
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      const quizMap = new Map(quizzes?.map(q => [q.id, q]) || []);

      const mergedData = attemptsData?.map(attempt => ({
        ...attempt,
        profiles: profileMap.get(attempt.user_id),
        quizzes: quizMap.get(attempt.quiz_id),
      })) || [];

      setAttempts(mergedData);
      onRefreshStats();
    } catch (error) {
      console.error('Error loading attempts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load quiz attempts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (attempt: QuizAttempt) => {
    setSelectedAttempt(attempt);
    setDetailsLoading(true);

    try {
      // Get responses
      const { data: responsesData, error: responsesError } = await supabase
        .from('quiz_responses')
        .select('*')
        .eq('attempt_id', attempt.id)
        .order('created_at', { ascending: true });

      if (responsesError) throw responsesError;

      // Get questions
      const questionIds = [...new Set(responsesData?.map(r => r.question_id) || [])];
      const { data: questions } = await supabase
        .from('quiz_questions')
        .select('id, question_text, correct_answer, explanation, options')
        .in('id', questionIds);

      // Merge data
      const questionMap = new Map(questions?.map(q => [q.id, q]) || []);
      const mergedResponses = responsesData?.map(response => ({
        ...response,
        quiz_questions: questionMap.get(response.question_id),
      })) || [];

      setResponses(mergedResponses);
    } catch (error) {
      console.error('Error loading responses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load question responses',
        variant: 'destructive',
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const getStatusBadge = (attempt: QuizAttempt) => {
    if (!attempt.is_completed) {
      return <Badge variant="secondary">In Progress</Badge>;
    }
    if (attempt.passed) {
      return <Badge variant="default" className="bg-green-600">Passed</Badge>;
    }
    return <Badge variant="destructive">Failed</Badge>;
  };

  const formatTime = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnswerText = (options: any, answerId: string) => {
    if (!options) return answerId;
    const option = options.find((opt: any) => opt.id === answerId);
    return option ? option.text : answerId;
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
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Quiz Attempts</CardTitle>
          <CardDescription>View and analyze student quiz performance</CardDescription>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No quiz attempts yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Correct</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-medium">
                        {attempt.profiles?.username || 'Unknown'}
                      </TableCell>
                      <TableCell>{attempt.quizzes?.title || 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(attempt)}</TableCell>
                      <TableCell>
                        {attempt.score !== null ? (
                          <span className={`font-semibold ${
                            attempt.passed ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {attempt.score}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {attempt.correct_answers}/{attempt.total_questions}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {formatTime(attempt.time_spent_seconds)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(attempt.started_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDetails(attempt)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={!!selectedAttempt} onOpenChange={() => setSelectedAttempt(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                Quiz Details: {selectedAttempt?.profiles?.username || 'Student'}
              </span>
              {selectedAttempt && (
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedAttempt)}
                  {selectedAttempt.score !== null && (
                    <Badge variant="outline" className="text-lg">
                      {selectedAttempt.score}%
                    </Badge>
                  )}
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              Detailed breakdown of answers and performance
            </DialogDescription>
          </DialogHeader>

          {selectedAttempt && (
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {selectedAttempt.correct_answers}
                        </div>
                        <div className="text-xs text-muted-foreground">Correct</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="text-2xl font-bold text-red-600">
                          {selectedAttempt.total_questions - selectedAttempt.correct_answers}
                        </div>
                        <div className="text-xs text-muted-foreground">Incorrect</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatTime(selectedAttempt.time_spent_seconds)}
                        </div>
                        <div className="text-xs text-muted-foreground">Time Taken</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Question Breakdown */}
              <ScrollArea className="h-[400px]">
                {detailsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : (
                  <div className="space-y-4 pr-4">
                    {responses.map((response, index) => (
                      <Card key={response.id} className={
                        response.is_correct
                          ? 'border-green-200 bg-green-50 dark:bg-green-950'
                          : 'border-red-200 bg-red-50 dark:bg-red-950'
                      }>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm font-medium">
                              Question {index + 1}
                            </CardTitle>
                            {response.is_correct ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm font-medium">
                            {response.quiz_questions?.question_text}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Student Answer: </span>
                              <span className={response.is_correct ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {getAnswerText(response.quiz_questions?.options, response.user_answer)}
                              </span>
                            </div>
                            {!response.is_correct && (
                              <div>
                                <span className="text-muted-foreground">Correct Answer: </span>
                                <span className="text-green-600 font-medium">
                                  {getAnswerText(response.quiz_questions?.options, response.quiz_questions?.correct_answer || '')}
                                </span>
                              </div>
                            )}
                          </div>
                          {response.quiz_questions?.explanation && (
                            <div className="mt-2 p-2 bg-background rounded text-xs">
                              <strong>Explanation:</strong> {response.quiz_questions.explanation}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizResultsViewer;
