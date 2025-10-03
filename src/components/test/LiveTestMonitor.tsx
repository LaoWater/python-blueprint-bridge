import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StudentEditorThumbnail from './StudentEditorThumbnail';

type Test = Database['public']['Tables']['tests']['Row'];
type Submission = Database['public']['Tables']['test_submissions']['Row'];

interface LiveTestMonitorProps {
  test: Test;
  onBack: () => void;
}

const LiveTestMonitor = ({ test, onBack }: LiveTestMonitorProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();

    // Real-time subscription
    const channel = supabase
      .channel(`test-${test.id}-monitor`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'test_submissions',
          filter: `test_id=eq.${test.id}`,
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [test.id]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('test_submissions')
        .select('*')
        .eq('test_id', test.id)
        .eq('is_active', true)
        .order('last_edit_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeStudents = new Set(submissions.map(s => s.student_id)).size;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{test.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Live Monitoring • {activeStudents} Active Student{activeStudents !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading student submissions...</p>
            </div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No active students yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {submissions.map((submission) => (
              <StudentEditorThumbnail key={submission.id} submission={submission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTestMonitor;
