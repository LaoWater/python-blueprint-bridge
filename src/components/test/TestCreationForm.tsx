import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface TestCreationFormProps {
  onSuccess: () => void;
}

const TestCreationForm = ({ onSuccess }: TestCreationFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    starter_code: '# Write your solution here\n\n',
    time_limit_minutes: 60,
    max_alt_tab_warnings: 3,
    allow_partial_submission: true,
  });
  const [opensAt, setOpensAt] = useState<Date>();
  const [closesAt, setClosesAt] = useState<Date>();
  const [testCases, setTestCases] = useState<Array<{ input: string; expected: string }>>([
    { input: '', expected: '' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('tests')
        .insert({
          ...formData,
          created_by: user.id,
          status: 'draft',
          opens_at: opensAt?.toISOString(),
          closes_at: closesAt?.toISOString(),
          test_cases: testCases.filter(tc => tc.input || tc.expected),
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Test Created',
        description: 'Your test has been created successfully!',
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error creating test:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create test',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expected: '' }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index: number, field: 'input' | 'expected', value: string) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Test Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Python Functions Quiz"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the test"
          />
        </div>

        <div>
          <Label htmlFor="instructions">Instructions *</Label>
          <Textarea
            id="instructions"
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            placeholder="Write detailed instructions for students..."
            rows={6}
            required
          />
        </div>

        <div>
          <Label htmlFor="starter_code">Starter Code</Label>
          <Textarea
            id="starter_code"
            value={formData.starter_code}
            onChange={(e) => setFormData({ ...formData, starter_code: e.target.value })}
            placeholder="# Starter code for students"
            rows={8}
            className="font-mono text-sm"
          />
        </div>
      </div>

      {/* Test Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="time_limit">Time Limit (minutes) *</Label>
          <Input
            id="time_limit"
            type="number"
            min="5"
            max="240"
            value={formData.time_limit_minutes}
            onChange={(e) => setFormData({ ...formData, time_limit_minutes: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="alt_tab_warnings">Max Alt-Tab Warnings</Label>
          <Input
            id="alt_tab_warnings"
            type="number"
            min="0"
            max="10"
            value={formData.max_alt_tab_warnings}
            onChange={(e) => setFormData({ ...formData, max_alt_tab_warnings: parseInt(e.target.value) })}
          />
        </div>
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Opens At (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {opensAt ? format(opensAt, 'PPP p') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={opensAt}
                onSelect={setOpensAt}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Closes At (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {closesAt ? format(closesAt, 'PPP p') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={closesAt}
                onSelect={setClosesAt}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Test Cases */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Test Cases (Optional)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addTestCase}>
            <Plus className="h-4 w-4 mr-1" />
            Add Test Case
          </Button>
        </div>

        {testCases.map((testCase, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Test Case #{index + 1}</span>
              {testCases.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestCase(index)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Input</Label>
                <Textarea
                  value={testCase.input}
                  onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                  placeholder="Input data"
                  rows={2}
                  className="font-mono text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Expected Output</Label>
                <Textarea
                  value={testCase.expected}
                  onChange={(e) => updateTestCase(index, 'expected', e.target.value)}
                  placeholder="Expected result"
                  rows={2}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Switches */}
      <div className="flex items-center space-x-2">
        <Switch
          id="partial"
          checked={formData.allow_partial_submission}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, allow_partial_submission: checked })
          }
        />
        <Label htmlFor="partial" className="cursor-pointer">
          Allow partial submissions (students can save and resume)
        </Label>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Creating...' : 'Create Test (Draft)'}
        </Button>
      </div>
    </form>
  );
};

export default TestCreationForm;
