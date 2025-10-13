import { useAuth } from '@/components/AuthContext';
import { Navigate } from 'react-router-dom';
import TestAdminDashboard from '@/components/test/TestAdminDashboard';
import TestEnvironment from '@/components/test/TestEnvironment';

const TestPlatform = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading test platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Route based on admin level
  const isAdmin = profile?.admin_level && profile.admin_level > 0;

  return isAdmin ? <TestAdminDashboard /> : <TestEnvironment />;
};

export default TestPlatform;
