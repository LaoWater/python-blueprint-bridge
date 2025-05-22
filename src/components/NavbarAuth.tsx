
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Settings, UserPlus } from 'lucide-react';

const NavbarAuth = () => {
  const { user, profile, signOut, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link to="/auth">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  const userInitials = profile?.username 
    ? profile.username.substring(0, 2).toUpperCase() 
    : user.email 
      ? user.email.substring(0, 2).toUpperCase() 
      : 'US';

  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full hidden sm:inline-block">
          Admin
        </span>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start p-2">
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{profile?.username || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate w-44">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Admin Settings</span>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarAuth;
