import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import StudentTestView from '@/components/test/StudentTestView';
import AdminTestDashboard from '@/components/test/AdminTestDashboard';
import { Loader2 } from 'lucide-react';

const TestPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {isAdmin ? <AdminTestDashboard /> : <StudentTestView />}
    </div>
  );
};

export default TestPage;
