import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MonitorPlay, FileText, Settings } from 'lucide-react';
import TestCreationForm from './TestCreationForm';
import LiveMonitoringGrid from './LiveMonitoringGrid';
import TestManagement from './TestManagement';

const AdminTestDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tests');
  const [stats, setStats] = useState({
    totalTests: 0,
    activeTests: 0,
    activeStudents: 0,
    pendingGrading: 0,
  });

  useEffect(() => {
    loadStats();

    // Refresh stats every 10 seconds
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      // Total tests
      const { count: totalTests } = await supabase
        .from('tests')
        .select('*', { count: 'exact', head: true });

      // Active tests
      const { count: activeTests } = await supabase
        .from('tests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      // Active students (with active sessions)
      const { count: activeStudents } = await supabase
        .from('test_editor_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Pending grading
      const { count: pendingGrading } = await supabase
        .from('test_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'submitted');

      setStats({
        totalTests: totalTests || 0,
        activeTests: activeTests || 0,
        activeStudents: activeStudents || 0,
        pendingGrading: pendingGrading || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="container max-w-7xl py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Test Administration</h1>
        <p className="text-muted-foreground">
          Create, monitor, and manage coding tests in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.activeTests}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Students Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {stats.activeStudents}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Grading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {stats.pendingGrading}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Manage Tests
          </TabsTrigger>
          <TabsTrigger value="monitor" className="flex items-center gap-2">
            <MonitorPlay className="h-4 w-4" />
            Live Monitoring
            {stats.activeStudents > 0 && (
              <Badge variant="destructive" className="ml-2 animate-pulse">
                {stats.activeStudents}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests">
          <TestManagement onRefreshStats={loadStats} />
        </TabsContent>

        <TabsContent value="monitor">
          <LiveMonitoringGrid />
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Test</CardTitle>
              <CardDescription>
                Set up a new coding test with anti-cheat measures and time limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestCreationForm onSuccess={() => {
                setActiveTab('tests');
                loadStats();
              }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTestDashboard;
