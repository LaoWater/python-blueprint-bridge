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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DuplicateAttempt {
  user_id: string;
  quiz_id: string;
  username: string;
  quiz_title: string;
  attempt_count: number;
  latest_attempt_at: string;
  has_completed: boolean;
}

const DuplicateAttemptsManager = () => {
  const [duplicates, setDuplicates] = useState<DuplicateAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedDuplicate, setSelectedDuplicate] = useState<DuplicateAttempt | null>(null);

  useEffect(() => {
    loadDuplicates();
  }, []);

  const loadDuplicates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_users_with_duplicate_attempts');

      if (error) throw error;

      setDuplicates(data || []);
    } catch (error) {
      console.error('Error loading duplicates:', error);
      toast({
        title: 'Error',
        description: 'Failed to load duplicate attempts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDuplicates = async (duplicate: DuplicateAttempt) => {
    const deleteKey = `${duplicate.user_id}-${duplicate.quiz_id}`;
    setDeletingId(deleteKey);

    try {
      const { data, error } = await supabase.rpc('admin_cleanup_duplicate_attempts', {
        p_user_id: duplicate.user_id,
        p_quiz_id: duplicate.quiz_id,
      });

      if (error) throw error;

      const deletedCount = data?.[0]?.deleted_count || 0;

      toast({
        title: 'Success',
        description: `Deleted ${deletedCount} duplicate attempt${deletedCount !== 1 ? 's' : ''}. Kept the latest attempt.`,
      });

      // Refresh the list
      loadDuplicates();
      setSelectedDuplicate(null);
    } catch (error) {
      console.error('Error deleting duplicates:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete duplicate attempts',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Duplicate Quiz Attempts
              </CardTitle>
              <CardDescription>
                Students with multiple attempts for the same quiz. Click delete to keep only the latest attempt.
              </CardDescription>
            </div>
            <Button onClick={loadDuplicates} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {duplicates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No duplicate attempts found</p>
              <p className="text-sm mt-2">All students have clean quiz records</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latest Attempt</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {duplicates.map((duplicate) => {
                    const deleteKey = `${duplicate.user_id}-${duplicate.quiz_id}`;
                    const isDeleting = deletingId === deleteKey;

                    return (
                      <TableRow key={deleteKey}>
                        <TableCell className="font-medium">
                          {duplicate.username || 'Unknown'}
                        </TableCell>
                        <TableCell>{duplicate.quiz_title || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">
                            {duplicate.attempt_count} attempts
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {duplicate.has_completed ? (
                            <Badge variant="default" className="bg-green-600">
                              Has Completed
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              In Progress
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(duplicate.latest_attempt_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedDuplicate(duplicate)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete Duplicates
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedDuplicate} onOpenChange={() => setSelectedDuplicate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Duplicate Attempts?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all duplicate quiz attempts for{' '}
              <strong>{selectedDuplicate?.username}</strong> on{' '}
              <strong>{selectedDuplicate?.quiz_title}</strong>.
              <br />
              <br />
              <span className="text-orange-600 font-semibold">
                ⚠️ Only the LATEST attempt (most recent) will be kept.
              </span>
              <br />
              <br />
              {selectedDuplicate && selectedDuplicate.attempt_count > 1 && (
                <span>
                  {selectedDuplicate.attempt_count - 1} attempt
                  {selectedDuplicate.attempt_count - 1 !== 1 ? 's' : ''} will be deleted.
                </span>
              )}
              <br />
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedDuplicate && handleDeleteDuplicates(selectedDuplicate)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Duplicates
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DuplicateAttemptsManager;
