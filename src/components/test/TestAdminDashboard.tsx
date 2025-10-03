import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import LiveTestMonitor from './LiveTestMonitor';
import TestCreator from './TestCreator';

type Test = Database['public']['Tables']['tests']['Row'];

const TestAdminDashboard = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTestStatus = async (testId: string, status: 'draft' | 'live' | 'closed') => {
    try {
      const { error } = await supabase
        .from('tests')
        .update({ status })
        .eq('id', testId);

      if (error) throw error;
      
      fetchTests();
    } catch (error) {
      console.error('Error updating test status:', error);
    }
  };

  if (showCreator) {
    return (
      <div className="container mx-auto p-6">
        <TestCreator
          onSuccess={() => {
            setShowCreator(false);
            fetchTests();
          }}
          onCancel={() => setShowCreator(false)}
        />
      </div>
    );
  }

  if (selectedTest) {
    return (
      <LiveTestMonitor
        test={selectedTest}
        onBack={() => setSelectedTest(null)}
      />
    );
  }

  const draftTests = tests.filter(t => t.status === 'draft');
  const liveTests = tests.filter(t => t.status === 'live');
  const closedTests = tests.filter(t => t.status === 'closed');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Administration</h1>
          <p className="text-muted-foreground">Manage and monitor student tests</p>
        </div>
        <Button onClick={() => setShowCreator(true)}>Create New Test</Button>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">
            Live Tests <Badge className="ml-2">{liveTests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="draft">
            Draft <Badge className="ml-2" variant="secondary">{draftTests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed <Badge className="ml-2" variant="outline">{closedTests.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {liveTests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No live tests. Start a test from drafts to begin monitoring.
              </CardContent>
            </Card>
          ) : (
            liveTests.map(test => (
              <Card key={test.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{test.title}</CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {test.time_limit_minutes ? `${test.time_limit_minutes} minutes` : 'No time limit'}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => updateTestStatus(test.id, 'closed')}
                      >
                        Close Test
                      </Button>
                      <Button onClick={() => setSelectedTest(test)}>
                        Monitor Live
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {draftTests.map(test => (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">Draft</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Created {new Date(test.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Edit</Button>
                    <Button onClick={() => updateTestStatus(test.id, 'live')}>
                      Start Live
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          {closedTests.map(test => (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                  <Badge variant="outline">Closed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Closed {test.end_time ? new Date(test.end_time).toLocaleDateString() : 'N/A'}
                  </div>
                  <Button variant="outline">View Results</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestAdminDashboard;
