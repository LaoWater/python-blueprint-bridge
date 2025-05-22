
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';

export default function Auth() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (user) {
    return (
      <Button onClick={handleSignOut} variant="outline" size="sm">Sign Out</Button>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="outline" size="sm">Sign In</Button>
    </Link>
  );
}
