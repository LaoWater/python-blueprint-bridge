import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  Clock,
  Save,
  Send,
  Eye,
  EyeOff,
  MessageSquare,
  X,
  ChevronDown
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTestMode } from '@/components/TestModeContext';

interface SecureCodeEditorProps {
  test: any;
  submission: any;
  onExit: () => void;
}

interface AdminIntervention {
  id: string;
  intervention_type: string;
  content: string;
  created_at: string;
  student_acknowledged: boolean;
}

const SecureCodeEditor = ({ test, submission, onExit }: SecureCodeEditorProps) => {
  const { user } = useAuth();
  const { setTestMode } = useTestMode();
  const [code, setCode] = useState(submission.code_content || '');
  const [altTabCount, setAltTabCount] = useState(0);
  const [pasteAttempts, setPasteAttempts] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminViewing, setAdminViewing] = useState(false);
  const [interventions, setInterventions] = useState<AdminIntervention[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const sessionIdRef = useRef<string>('');

  // Enable test mode when component mounts, disable on unmount
  useEffect(() => {
    setTestMode(true);
    return () => setTestMode(false);
  }, [setTestMode]);

  // Calculate time remaining
  useEffect(() => {
    const startTime = new Date(submission.started_at).getTime();
    const endTime = startTime + test.time_limit_minutes * 60 * 1000;

    const updateTime = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0) {
        handleAutoSubmit();
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [submission, test]);

  // Visibility change detection (alt-tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAltTabCount(prev => {
          const newCount = prev + 1;
          setShowWarning(true);

          // Update in database
          supabase
            .from('test_submissions')
            .update({
              alt_tab_count: newCount,
            })
            .eq('id', submission.id)
            .then(({ error }) => {
              if (error) console.error('Error updating alt-tab count:', error);
            });

          toast({
            title: '⚠️ Tab Switch Detected',
            description: `Warning ${newCount}/${test.max_alt_tab_warnings}. Stay focused!`,
            variant: 'destructive',
          });

          setTimeout(() => setShowWarning(false), 3000);

          return newCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [submission, test]);

  // Block paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setPasteAttempts(prev => {
      const newCount = prev + 1;

      supabase
        .from('test_submissions')
        .update({
          paste_attempt_count: newCount,
        })
        .eq('id', submission.id)
        .then(({ error }) => {
          if (error) console.error('Error updating paste attempt:', error);
        });

      toast({
        title: '🚫 Paste Blocked',
        description: 'Copy-pasting is not allowed during tests',
        variant: 'destructive',
      });

      return newCount;
    });
  };

  // Block copy
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast({
      title: '🚫 Copy Blocked',
      description: 'Copying is not allowed during tests',
      variant: 'destructive',
    });
  };

  // Block context menu (right-click)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Handle TAB key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces at cursor position
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      // Move cursor after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  // Auto-save code
  const saveCode = useCallback(async (currentCode: string) => {
    setIsSaving(true);

    try {
      // Update submission
      await supabase
        .from('test_submissions')
        .update({
          code_content: currentCode,
          updated_at: new Date().toISOString(),
        })
        .eq('id', submission.id);

      // Update live session
      await supabase
        .from('test_editor_sessions')
        .update({
          current_code: currentCode,
          last_activity: new Date().toISOString(),
          keystrokes_count: currentCode.length,
        })
        .eq('test_id', test.id)
        .eq('student_id', user?.id);

    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  }, [submission, test, user]);

  // Debounced auto-save
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveCode(code);
    }, 2000); // Save every 2 seconds of inactivity

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [code, saveCode]);

  // Subscribe to admin interventions
  useEffect(() => {
    const channel = supabase
      .channel('admin_interventions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'test_admin_interventions',
          filter: `student_id=eq.${user?.id}`,
        },
        (payload) => {
          const intervention = payload.new as AdminIntervention;
          setInterventions(prev => [intervention, ...prev]);

          toast({
            title: '👨‍🏫 Message from Instructor',
            description: intervention.content,
            duration: 8000,
          });
        }
      )
      .subscribe();

    // Check admin viewing status
    const checkAdminViewing = setInterval(async () => {
      const { data } = await supabase
        .from('test_editor_sessions')
        .select('admin_viewing')
        .eq('test_id', test.id)
        .eq('student_id', user?.id)
        .single();

      setAdminViewing(data?.admin_viewing || false);
    }, 3000);

    return () => {
      channel.unsubscribe();
      clearInterval(checkAdminViewing);
    };
  }, [user, test]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const confirmSubmit = window.confirm(
      'Are you sure you want to submit? You cannot edit after submission.'
    );

    if (!confirmSubmit) return;

    setIsSubmitting(true);

    try {
      await supabase
        .from('test_submissions')
        .update({
          code_content: code,
          status: 'submitted',
          submitted_at: new Date().toISOString(),
        })
        .eq('id', submission.id);

      await supabase
        .from('test_editor_sessions')
        .update({
          is_active: false,
          session_end: new Date().toISOString(),
        })
        .eq('test_id', test.id)
        .eq('student_id', user?.id);

      toast({
        title: '✅ Test Submitted',
        description: 'Your code has been submitted successfully!',
      });

      onExit();
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: 'Submission Error',
        description: 'Failed to submit. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmit = async () => {
    toast({
      title: '⏰ Time Up!',
      description: 'Auto-submitting your code...',
    });

    await handleSubmit();
  };

  const acknowledgeIntervention = async (interventionId: string) => {
    await supabase
      .from('test_admin_interventions')
      .update({
        student_acknowledged: true,
        acknowledged_at: new Date().toISOString(),
      })
      .eq('id', interventionId);

    setInterventions(prev =>
      prev.map(i => i.id === interventionId ? { ...i, student_acknowledged: true } : i)
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeProgress = (timeRemaining / (test.time_limit_minutes * 60)) * 100;
  const timeColor = timeRemaining < 300 ? 'text-red-500' : timeRemaining < 600 ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{test.title}</h1>
            <p className="text-sm text-muted-foreground">Stay focused - You got this!</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin viewing indicator */}
            {adminViewing && (
              <Badge variant="outline" className="animate-pulse">
                <Eye className="h-3 w-3 mr-1" />
                Instructor Monitoring
              </Badge>
            )}

            {/* Time remaining */}
            <div className={`flex items-center gap-2 ${timeColor} font-mono text-lg`}>
              <Clock className="h-5 w-5" />
              {formatTime(timeRemaining)}
            </div>

            {/* Warnings */}
            {altTabCount > 0 && (
              <Badge variant="destructive">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {altTabCount} warnings
              </Badge>
            )}

            {/* Save indicator */}
            {isSaving && (
              <Badge variant="secondary">
                <Save className="h-3 w-3 mr-1 animate-spin" />
                Saving...
              </Badge>
            )}
          </div>
        </div>

        {/* Time progress bar */}
        <Progress value={timeProgress} className="h-1 rounded-none" />
      </div>

      {/* Instructions panel (collapsible & scrollable) */}
      <div className="border-b bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
        <details open className="group">
          <summary className="cursor-pointer p-4 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-indigo-900 dark:text-indigo-100 inline-flex items-center gap-2">
                📋 Test Instructions
                <ChevronDown className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-open:rotate-180 transition-transform inline" />
              </h3>
              <span className="text-xs text-indigo-600 dark:text-indigo-400">Click to collapse</span>
            </div>
          </summary>
          <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: '35vh' }}>
            <div className="prose-compact prose-sm dark:prose-invert max-w-none text-instructions">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {test.instructions}
              </ReactMarkdown>
            </div>
          </div>
        </details>
      </div>

      {/* Warning overlay */}
      {showWarning && (
        <div className="absolute inset-0 z-50 bg-red-500/20 backdrop-blur-sm flex items-center justify-center">
          <Alert className="max-w-md border-red-500 bg-red-50 dark:bg-red-950">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200 text-lg">
              <strong>⚠️ Stay on this tab!</strong>
              <br />
              Alt-tabbing is being monitored and recorded.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main editor */}
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 flex flex-col p-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Code Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Textarea
                ref={editorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onCopy={handleCopy}
                onContextMenu={handleContextMenu}
                className="flex-1 font-mono text-sm resize-none"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Submit button */}
          <div className="mt-4 flex justify-end gap-3">
            <Button
              onClick={onExit}
              variant="outline"
              disabled={isSubmitting}
            >
              Exit (will auto-save)
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Test
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Interventions sidebar */}
        {interventions.length > 0 && (
          <div className="w-80 border-l bg-muted/30 p-4 overflow-y-auto">
            <h3 className="font-semibold mb-3 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Instructor Messages
            </h3>
            <div className="space-y-3">
              {interventions.map((intervention) => (
                <Card key={intervention.id} className={
                  intervention.student_acknowledged ? 'opacity-60' : ''
                }>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={
                        intervention.intervention_type === 'warning' ? 'destructive' :
                        intervention.intervention_type === 'code_hint' ? 'default' :
                        'secondary'
                      } className="text-xs">
                        {intervention.intervention_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(intervention.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{intervention.content}</p>
                    {!intervention.student_acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => acknowledgeIntervention(intervention.id)}
                        className="w-full"
                      >
                        Got it!
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureCodeEditor;
