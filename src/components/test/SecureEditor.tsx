import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface SecureEditorProps {
  code: string;
  onChange: (code: string) => void;
  submissionId: string;
  language?: string;
  readOnly?: boolean;
}

const SecureEditor = ({
  code,
  onChange,
  submissionId,
  language = 'python',
  readOnly = false,
}: SecureEditorProps) => {
  const { user } = useAuth();
  const [tabSwitches, setTabSwitches] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout>();
  const editorRef = useRef<any>(null);

  // Auto-save mechanism (debounced 1.5 seconds)
  useEffect(() => {
    if (readOnly) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      if (!user) return;

      try {
        const cursorPosition = editorRef.current?.getPosition();
        
        const { error } = await supabase
          .from('test_submissions')
          .update({
            code_content: code,
            cursor_position: cursorPosition ? { line: cursorPosition.lineNumber, column: cursorPosition.column } : null,
            last_edited_by: user.id,
            last_edit_at: new Date().toISOString(),
          })
          .eq('id', submissionId);

        if (error) throw error;
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 1500);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [code, submissionId, user, readOnly]);

  // Copy/Paste prevention
  useEffect(() => {
    if (readOnly) return;

    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      toast({
        title: '⚠️ Copying Disabled',
        description: 'Copying is not allowed during the test',
        variant: 'destructive',
      });
      
      // Log violation
      logViolation('copy');
    };

    const preventPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      toast({
        title: '⚠️ Pasting Disabled',
        description: 'Pasting is not allowed during the test',
        variant: 'destructive',
      });
      
      // Log violation
      logViolation('paste');
    };

    const preventCut = (e: ClipboardEvent) => {
      e.preventDefault();
      toast({
        title: '⚠️ Cutting Disabled',
        description: 'Cutting is not allowed during the test',
        variant: 'destructive',
      });
      
      logViolation('copy');
    };

    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventPaste);
    document.addEventListener('cut', preventCut);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventPaste);
      document.removeEventListener('cut', preventCut);
    };
  }, [readOnly]);

  // Alt-Tab detection with 3-strike system
  useEffect(() => {
    if (readOnly) return;

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        const newCount = tabSwitches + 1;
        setTabSwitches(newCount);

        try {
          await supabase
            .from('test_submissions')
            .update({ tab_switches: newCount })
            .eq('id', submissionId);

          if (newCount === 1) {
            toast({
              title: '⚠️ First Warning',
              description: 'Tab switching detected. This is your first warning.',
              variant: 'destructive',
            });
          } else if (newCount === 2) {
            toast({
              title: '🚨 Second Warning',
              description: 'One more tab switch and your test will be auto-submitted!',
              variant: 'destructive',
            });
          } else if (newCount >= 3) {
            toast({
              title: '❌ Test Auto-Submitted',
              description: 'Your test has been auto-submitted due to multiple tab switches.',
              variant: 'destructive',
            });
            
            // Auto-submit
            await supabase
              .from('test_submissions')
              .update({
                status: 'submitted',
                submitted_at: new Date().toISOString(),
                is_active: false,
              })
              .eq('id', submissionId);
          }
        } catch (error) {
          console.error('Error tracking tab switch:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tabSwitches, submissionId, readOnly]);

  const logViolation = async (type: 'copy' | 'paste') => {
    try {
      const { data } = await supabase
        .from('test_submissions')
        .select('copy_paste_attempts')
        .eq('id', submissionId)
        .single();

      const attempts = (data?.copy_paste_attempts || 0) + 1;

      await supabase
        .from('test_submissions')
        .update({ copy_paste_attempts: attempts })
        .eq('id', submissionId);
    } catch (error) {
      console.error('Error logging violation:', error);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full flex flex-col">
      {!readOnly && (
        <div className="px-4 py-2 bg-muted/30 border-b flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-muted-foreground">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
            {tabSwitches > 0 && (
              <Badge variant="destructive">
                ⚠️ Tab Switches: {tabSwitches}/3
              </Badge>
            )}
          </div>
          <div className="text-muted-foreground">
            Auto-saving every 1.5 seconds
          </div>
        </div>
      )}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            contextmenu: false,
            copyWithSyntaxHighlighting: false,
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 4,
            formatOnPaste: false,
            formatOnType: false,
          }}
        />
      </div>
    </div>
  );
};

export default SecureEditor;
