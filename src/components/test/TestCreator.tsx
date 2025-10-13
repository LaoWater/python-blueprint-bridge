import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Question {
  question_number: number;
  title: string;
  description: string;
  starter_code: string;
  points: number;
}

interface TestCreatorProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TestCreator = ({ onSuccess, onCancel }: TestCreatorProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number | null>(60);
  const [questions, setQuestions] = useState<Question[]>([
    {
      question_number: 1,
      title: '',
      description: '',
      starter_code: '# Write your solution here\n',
      points: 10,
    },
  ]);
  const [creating, setCreating] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_number: questions.length + 1,
        title: '',
        description: '',
        starter_code: '# Write your solution here\n',
        points: 10,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      toast({
        title: 'Cannot Remove',
        description: 'A test must have at least one question',
        variant: 'destructive',
      });
      return;
    }
    
    const newQuestions = questions.filter((_, i) => i !== index);
    // Renumber questions
    newQuestions.forEach((q, i) => {
      q.question_number = i + 1;
    });
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | number) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleCreateTest = async () => {
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Test title is required',
        variant: 'destructive',
      });
      return;
    }

    if (questions.some(q => !q.title.trim() || !q.description.trim())) {
      toast({
        title: 'Error',
        description: 'All questions must have a title and description',
        variant: 'destructive',
      });
      return;
    }

    if (!user) return;

    setCreating(true);
    try {
      // Create test
      const { data: test, error: testError } = await supabase
        .from('tests')
        .insert({
          title,
          description,
          time_limit_minutes: timeLimitMinutes,
          created_by: user.id,
          status: 'draft',
        })
        .select()
        .single();

      if (testError) throw testError;

      // Create questions
      const questionsToInsert = questions.map(q => ({
        test_id: test.id,
        question_number: q.question_number,
        title: q.title,
        description: q.description,
        starter_code: q.starter_code,
        points: q.points,
      }));

      const { error: questionsError } = await supabase
        .from('test_questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      toast({
        title: 'Test Created',
        description: `"${title}" has been created successfully`,
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error creating test:', error);
      toast({
        title: 'Error',
        description: 'Failed to create test',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Create New Test</h2>
          <p className="text-muted-foreground">Define test parameters and questions</p>
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleCreateTest} disabled={creating}>
            <Save className="w-4 h-4 mr-2" />
            {creating ? 'Creating...' : 'Create Test'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Details</CardTitle>
          <CardDescription>Basic information about the test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Test Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Python Fundamentals Quiz"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this test covers..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
            <Input
              id="timeLimit"
              type="number"
              value={timeLimitMinutes || ''}
              onChange={(e) => setTimeLimitMinutes(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Leave empty for no time limit"
              min={1}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty for no time limit
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Questions</h3>
          <p className="text-sm text-muted-foreground">
            {questions.length} question{questions.length !== 1 ? 's' : ''} • Total: {totalPoints} points
          </p>
        </div>
        <Button onClick={addQuestion} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge>Q{index + 1}</Badge>
                  Question {index + 1}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuestion(index)}
                  disabled={questions.length === 1}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Question Title *</Label>
                  <Input
                    value={question.title}
                    onChange={(e) => updateQuestion(index, 'title', e.target.value)}
                    placeholder="e.g., Implement a Binary Search"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={question.points}
                    onChange={(e) => updateQuestion(index, 'points', parseInt(e.target.value) || 0)}
                    min={1}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={question.description}
                  onChange={(e) => updateQuestion(index, 'description', e.target.value)}
                  placeholder="Describe what the student needs to do..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Starter Code</Label>
                <Textarea
                  value={question.starter_code}
                  onChange={(e) => updateQuestion(index, 'starter_code', e.target.value)}
                  placeholder="# Initial code template for students"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestCreator;
