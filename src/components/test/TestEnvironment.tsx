import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import SecureEditor from './SecureEditor';
import QuestionNavigation from './QuestionNavigation';
import TimerCountdown from './TimerCountdown';
import AskQuestionDialog from './AskQuestionDialog';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Test = Database['public']['Tables']['tests']['Row'];
type Assignment = Database['public']['Tables']['test_questions']['Row'];
type Submission = Database['public']['Tables']['test_submissions']['Row'];

const TestEnvironment = () => {
  const { user } = useAuth();
  const [liveTests, setLiveTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState(0);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [code, setCode] = useState('');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);

  // Fetch live tests
  useEffect(() => {
    fetchLiveTests();
  }, []);

  // Fetch assignments when test is selected
  useEffect(() => {
    if (selectedTest) {
      fetchAssignments();
    }
  }, [selectedTest]);

  // Load or create submission when assignment changes
  useEffect(() => {
    if (selectedTest && assignments.length > 0 && user) {
      loadOrCreateSubmission();
    }
  }, [currentAssignmentIndex, assignments, selectedTest, user]);

  const fetchLiveTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('status', 'live')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLiveTests(data || []);
      
      if (data && data.length > 0) {
        setSelectedTest(data[0]);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
      toast({
        title: 'Error',
        description: 'Failed to load assignments',
        variant: 'destructive',
      });
    }
  };

  const loadOrCreateSubmission = async () => {
    if (!selectedTest || !assignments[currentAssignmentIndex] || !user) return;

    try {
      // Try to fetch existing submission
      const { data: existing, error: fetchError } = await supabase
        .from('test_submissions')
        .select('*')
        .eq('student_id', user.id)
        .eq('question_id', assignments[currentAssignmentIndex].id)
        .single();

      if (existing) {
        setSubmission(existing);
        setCode(existing.code_content || assignments[currentAssignmentIndex].starter_code || '');
      } else {
        // Create new submission
        const { data: newSubmission, error: createError } = await supabase
          .from('test_submissions')
          .insert({
            test_id: selectedTest.id,
            question_id: assignments[currentAssignmentIndex].id,
            student_id: user.id,
            code_content: assignments[currentAssignmentIndex].starter_code || '',
          })
          .select()
          .single();

        if (createError) throw createError;
        setSubmission(newSubmission);
        setCode(newSubmission.code_content || '');
      }
    } catch (error) {
      console.error('Error loading submission:', error);
    }
  };

  const handleSubmit = async () => {
    if (!submission) return;

    try {
      const { error } = await supabase
        .from('test_submissions')
        .update({
          status: 'submitted',
          submitted_at: new Date().toISOString(),
          is_active: false,
        })
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Answer submitted successfully',
      });

      // Move to next assignment or finish
      if (currentAssignmentIndex < assignments.length - 1) {
        setCurrentAssignmentIndex(currentAssignmentIndex + 1);
      } else {
        toast({
          title: 'Test Complete',
          description: 'You have completed all assignments',
        });
      }
    } catch (error) {
      console.error('Error submitting:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit answer',
        variant: 'destructive',
      });
    } finally {
      setShowSubmitDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading test environment...</p>
        </div>
      </div>
    );
  }

  if (liveTests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No Live Tests</h2>
          <p className="text-muted-foreground">There are no active tests at the moment. Please check back later.</p>
        </div>
      </div>
    );
  }

  if (!selectedTest || assignments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading assignments...</p>
        </div>
      </div>
    );
  }

  const currentAssignment = assignments[currentAssignmentIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header with timer */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">{selectedTest.title}</h1>
            <p className="text-xs text-muted-foreground">Assignment {currentAssignmentIndex + 1} of {assignments.length}</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedTest.time_limit_minutes && selectedTest.start_time && (
              <TimerCountdown
                startTime={selectedTest.start_time}
                timeLimitMinutes={selectedTest.time_limit_minutes}
              />
            )}
            <AskQuestionDialog testId={selectedTest.id} studentId={user!.id} />
            <Button
              onClick={() => setShowSubmitDialog(true)}
              disabled={!submission || submission.status === 'submitted'}
              size="sm"
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-56px)]">
        {/* Assignment Navigation Sidebar */}
        <QuestionNavigation
          questions={assignments}
          currentIndex={currentAssignmentIndex}
          onSelectQuestion={setCurrentAssignmentIndex}
        />

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Collapsible Assignment Description */}
          <Collapsible
            open={isDescriptionExpanded}
            onOpenChange={setIsDescriptionExpanded}
            className="border-b bg-card/30"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 hover:bg-card/50"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">{currentAssignment.title}</h2>
                  <span className="text-sm text-muted-foreground">({currentAssignment.points} pts)</span>
                </div>
                {isDescriptionExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-muted-foreground whitespace-pre-wrap">{currentAssignment.description}</p>
              {submission?.teacher_note && (
                <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">💡 Teacher's Note:</p>
                  <p className="text-sm">{submission.teacher_note}</p>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Secure Code Editor - Takes remaining space */}
          <div className="flex-1 min-h-0">
            {submission && (
              <SecureEditor
                code={code}
                onChange={setCode}
                submissionId={submission.id}
                language="python"
              />
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Answer?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your answer? You won't be able to edit it after submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestEnvironment;
