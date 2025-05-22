
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Info } from 'lucide-react';

const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user) {
      navigate('/auth');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-2 h-6 w-6" /> Admin Dashboard
      </h1>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Admin Access</AlertTitle>
        <AlertDescription>
          As an admin, you can edit content directly on the site. Look for the edit options when hovering over content elements.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Manage page content and code samples</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Navigate to any page and hover over content sections to edit:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Page titles and descriptions</li>
              <li>Code samples and examples</li>
              <li>Section content</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Monitor and manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Currently, user management is handled through the Supabase dashboard. 
              To grant admin access to users, update their admin_level in the profiles table.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
