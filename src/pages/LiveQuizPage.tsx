import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Clock, Trophy, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminQuizDashboard from '@/components/quiz/AdminQuizDashboard';

interface QuizOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  question_type: string;
  question_text: string;
  code_snippet: string | null;
  options: QuizOption[];
  correct_answer: string;
  explanation: string;
  points: number;
  chapter: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  chapters: string[];
  total_questions: number;
  passing_score: number;
  time_limit_minutes: number;
}

export default function LiveQuizPage() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Quiz state
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Quiz session state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Results state
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch quiz and questions on mount
  useEffect(() => {
    fetchQuizData();
  }, []);

  // Timer for quiz duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
        setTimeElapsed(elapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, startTime]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);

      // Fetch Phase I quiz
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('title', 'Python Fundamentals - Phase I')
        .single();

      if (quizError) throw quizError;
      setQuiz(quizData);

      // Fetch questions for this quiz
      const { data: questionsData, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizData.id)
        .order('order_index', { ascending: true });

      if (questionsError) throw questionsError;
      setQuestions(questionsData);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Failed to load quiz. Please try again.');
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    if (!user || !quiz) return;

    try {
      // Create a new quiz attempt
      const { data: attemptData, error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: quiz.id,
          total_questions: questions.length,
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (attemptError) throw attemptError;

      setAttemptId(attemptData.id);
      setQuizStarted(true);
      setStartTime(new Date());
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowExplanation(false);
    } catch (err) {
      console.error('Error starting quiz:', err);
      setError('Failed to start quiz. Please try again.');
    }
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || !attemptId || showExplanation) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setIsAnswerCorrect(isCorrect);
    setShowExplanation(true);

    // Update correct count
    const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;

    // Save response to database
    try {
      // 1. Insert the response
      await supabase.from('quiz_responses').insert({
        attempt_id: attemptId,
        question_id: currentQuestion.id,
        user_answer: selectedAnswer,
        is_correct: isCorrect,
        time_spent_seconds: timeElapsed,
      });

      // 2. Update quiz_attempts with running score (for live monitoring)
      await supabase
        .from('quiz_attempts')
        .update({
          correct_answers: newCorrectCount,
          time_spent_seconds: timeElapsed,
        })
        .eq('id', attemptId);

      // Update local state
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer
      }));

      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error saving answer:', err);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
      setIsAnswerCorrect(null);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    if (!attemptId || !quiz) return;

    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= quiz.passing_score;

    try {
      // Update quiz attempt with final results
      await supabase
        .from('quiz_attempts')
        .update({
          completed_at: new Date().toISOString(),
          score: finalScore,
          correct_answers: correctCount,
          time_spent_seconds: timeElapsed,
          passed: passed,
          is_completed: true,
        })
        .eq('id', attemptId);

      setScore(finalScore);
      setQuizCompleted(true);
    } catch (err) {
      console.error('Error completing quiz:', err);
      setError('Failed to save quiz results.');
    }
  };

  const retakeQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setUserAnswers({});
    setShowExplanation(false);
    setIsAnswerCorrect(null);
    setAttemptId(null);
    setStartTime(null);
    setTimeElapsed(0);
    setScore(0);
    setCorrectCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/')} className="mt-4">
          Return Home
        </Button>
      </div>
    );
  }

  // Admin view - show dashboard
  if (isAdmin) {
    return <AdminQuizDashboard />;
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to take the quiz</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Alert>
          <AlertDescription>No quiz available at the moment.</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Quiz completed - show results
  if (quizCompleted) {
    const passed = score >= quiz.passing_score;

    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {passed ? (
                <Trophy className="w-16 h-16 text-yellow-500" />
              ) : (
                <BookOpen className="w-16 h-16 text-blue-500" />
              )}
            </div>
            <CardTitle className="text-3xl">
              {passed ? 'Congratulations! 🎉' : 'Quiz Complete'}
            </CardTitle>
            <CardDescription>
              {passed
                ? `You passed the ${quiz.title}!`
                : 'Keep practicing to improve your score'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">{score}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <div className="text-3xl font-bold">{correctCount}/{questions.length}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Time Taken:</span>
                <span className="font-medium">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Passing Score:</span>
                <span className="font-medium">{quiz.passing_score}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Difficulty:</span>
                <span className="font-medium capitalize">{quiz.difficulty}</span>
              </div>
            </div>

            {!passed && (
              <Alert>
                <AlertDescription>
                  Don't worry! Review the material and try again. You need {quiz.passing_score}% to pass.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button onClick={retakeQuiz} variant="outline" className="flex-1">
              Retake Quiz
            </Button>
            <Button onClick={() => navigate('/')} className="flex-1">
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Quiz not started - show intro
  if (!quizStarted) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">{quiz.total_questions} Questions</div>
                  <div className="text-sm text-muted-foreground">Multiple choice</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">{quiz.time_limit_minutes} Minutes</div>
                  <div className="text-sm text-muted-foreground">Recommended time</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Chapters Covered:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {quiz.chapters.map((chapter, idx) => (
                  <li key={idx}>{chapter}</li>
                ))}
              </ul>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Passing Score:</strong> {quiz.passing_score}% •
                <strong className="ml-2">Difficulty:</strong> <span className="capitalize">{quiz.difficulty}</span>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={startQuiz} className="w-full" size="lg">
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Quiz in progress - show current question
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2 capitalize">
                  {currentQuestion.chapter} • {currentQuestion.question_type.replace('_', ' ')}
                </div>
                <CardTitle className="text-xl">{currentQuestion.question_text}</CardTitle>
              </div>
              <div className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
                {currentQuestion.points} {currentQuestion.points === 1 ? 'pt' : 'pts'}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Code Snippet */}
            {currentQuestion.code_snippet && (
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{currentQuestion.code_snippet}</pre>
              </div>
            )}

            {/* Answer Options */}
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              disabled={showExplanation}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      showExplanation
                        ? option.id === currentQuestion.correct_answer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : option.id === selectedAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-950'
                          : 'border-border bg-background'
                        : selectedAnswer === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <span className="flex-1 font-normal">
                      <span className="font-semibold mr-2">{option.id.toUpperCase()}.</span>
                      {option.text}
                    </span>
                    {showExplanation && option.id === currentQuestion.correct_answer && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {showExplanation && option.id === selectedAnswer && option.id !== currentQuestion.correct_answer && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </Label>
                ))}
              </div>
            </RadioGroup>

            {/* Explanation */}
            {showExplanation && (
              <Alert className={isAnswerCorrect ? 'border-green-500' : 'border-red-500'}>
                <div className="flex items-start gap-2">
                  {isAnswerCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold mb-1">
                      {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    <AlertDescription>{currentQuestion.explanation}</AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {correctCount} correct so far
            </div>
            {!showExplanation ? (
              <Button
                onClick={submitAnswer}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
