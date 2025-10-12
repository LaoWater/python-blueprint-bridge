import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SubmissionsViewer from './SubmissionsViewer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { MoreVertical, Play, Pause, Trash, FileText, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TestManagementProps {
  onRefreshStats: () => void;
}

const TestManagement = ({ onRefreshStats }: TestManagementProps) => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTest, setDeleteTest] = useState<string | null>(null);
  const [viewingSubmissions, setViewingSubmissions] = useState<{ testId: string; testTitle: string } | null>(null);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*, profiles(username)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (error) {
      console.error('Error loading tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTestStatus = async (testId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tests')
        .update({ status })
        .eq('id', testId);

      if (error) throw error;

      toast({
        title: 'Status Updated',
        description: `Test ${status === 'open' ? 'opened' : 'closed'} successfully`,
      });

      loadTests();
      onRefreshStats();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTest) return;

    try {
      const { error } = await supabase
        .from('tests')
        .delete()
        .eq('id', deleteTest);

      if (error) throw error;

      toast({
        title: 'Test Deleted',
        description: 'Test and all submissions have been deleted',
      });

      loadTests();
      onRefreshStats();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleteTest(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: 'secondary',
      open: 'default',
      closed: 'outline',
      archived: 'destructive',
    };

    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
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
          <CardTitle>All Tests</CardTitle>
          <CardDescription>Manage your coding tests</CardDescription>
        </CardHeader>
        <CardContent>
          {tests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No tests created yet</p>
              <p className="text-sm">Create your first test to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time Limit</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>{getStatusBadge(test.status)}</TableCell>
                    <TableCell>{test.time_limit_minutes} min</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(test.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {test.opens_at && (
                        <div>Opens: {new Date(test.opens_at).toLocaleDateString()}</div>
                      )}
                      {test.closes_at && (
                        <div>Closes: {new Date(test.closes_at).toLocaleDateString()}</div>
                      )}
                      {!test.opens_at && !test.closes_at && '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {test.status === 'draft' && (
                            <DropdownMenuItem
                              onClick={() => updateTestStatus(test.id, 'open')}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Open Test
                            </DropdownMenuItem>
                          )}
                          {test.status === 'open' && (
                            <DropdownMenuItem
                              onClick={() => updateTestStatus(test.id, 'closed')}
                            >
                              <Pause className="h-4 w-4 mr-2" />
                              Close Test
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => setViewingSubmissions({ testId: test.id, testTitle: test.title })}
                          >
                            <Users className="h-4 w-4 mr-2" />
                            View Submissions
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteTest(test.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTest} onOpenChange={() => setDeleteTest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the test and all student submissions.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submissions Viewer */}
      {viewingSubmissions && (
        <SubmissionsViewer
          testId={viewingSubmissions.testId}
          testTitle={viewingSubmissions.testTitle}
          isOpen={true}
          onClose={() => setViewingSubmissions(null)}
        />
      )}
    </>
  );
};

export default TestManagement;
