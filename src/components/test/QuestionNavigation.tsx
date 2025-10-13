import { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

type Question = Database['public']['Tables']['test_questions']['Row'];

interface QuestionNavigationProps {
  questions: Question[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
}

const QuestionNavigation = ({
  questions,
  currentIndex,
  onSelectQuestion,
}: QuestionNavigationProps) => {
  return (
    <div className="w-64 border-r bg-card/30 p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Circle className="w-4 h-4" />
        Questions
      </h3>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <Button
            key={question.id}
            variant={currentIndex === index ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSelectQuestion(index)}
          >
            <div className="flex items-center gap-2 w-full">
              <span className="font-mono text-sm">Q{index + 1}</span>
              <span className="flex-1 text-left truncate">{question.title}</span>
              <Badge variant="outline" className="text-xs">
                {question.points}pts
              </Badge>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
