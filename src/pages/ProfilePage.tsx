
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, User, Mail, Shield, Save, LogOut, Sparkles, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ProfilePage = () => {
  const { user, profile, signOut } = useAuth();
  const [username, setUsername] = useState(profile?.username || '');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile) {
      setUsername(profile.username || '');
      setLoading(false);
    }
  }, [user, profile, navigate]);

  if (loading || !user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const updateProfile = async () => {
    try {
      setUpdating(true);

      const { error } = await supabase
        .from('profiles')
        .update({ username, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });

      // Force a reload to update the navigation header
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !updating && username) {
      updateProfile();
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    navigate('/');
  };

  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      setUpdatingPassword(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been successfully changed",
      });

      setNewPassword('');
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-10 px-4 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container max-w-3xl">
        <Card className="backdrop-blur-xl bg-card/95 border-2 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-4 border-card flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Profile
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  Manage your account information and preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email Field */}
            <div className="space-y-3 p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Mail className="h-4 w-4 text-blue-500" />
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="h-11 text-base bg-muted/50 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Your email cannot be changed for security reasons
              </p>
            </div>

            {/* Username Field */}
            <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-blue-500/5 to-indigo-500/5 backdrop-blur-sm border border-blue-500/20">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User className="h-4 w-4 text-blue-500" />
                Display Name
              </label>
              <div className="relative group">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={updating}
                  placeholder="Set your display name"
                  className="h-11 text-base transition-all focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to save changes
              </p>
            </div>

            {/* Role Field */}
            <div className="space-y-3 p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Shield className="h-4 w-4 text-blue-500" />
                Account Role
              </label>
              <div className="relative">
                <div className={`h-11 px-4 rounded-md border bg-muted/50 flex items-center gap-2 ${
                  profile.admin_level > 0 ? 'border-blue-500/50' : 'border-border'
                }`}>
                  {profile.admin_level > 0 && (
                    <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                  )}
                  <span className={`text-base font-medium ${
                    profile.admin_level > 0 ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}>
                    {profile.admin_level > 0 ? 'Administrator' : 'Student'}
                  </span>
                </div>
              </div>
              {profile.admin_level > 0 && (
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  You have elevated privileges to manage content
                </p>
              )}
            </div>

            {/* Password Change Field */}
            <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm border border-purple-500/20">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Lock className="h-4 w-4 text-purple-500" />
                Change Password
              </label>
              <div className="relative group">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={updatingPassword}
                  placeholder="Enter new password (min 6 characters)"
                  className="h-11 text-base pr-12 transition-all focus:ring-2 focus:ring-purple-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button
                onClick={updatePassword}
                disabled={updatingPassword || !newPassword || newPassword.length < 6}
                className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {updatingPassword ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating password...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </span>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                Password will be changed immediately without email confirmation
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              onClick={updateProfile}
              disabled={updating || !username}
              className="flex-1 h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
            >
              {updating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving changes...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Save Changes
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={loading}
              className="h-11 text-base font-semibold border-2 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all duration-300 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing out...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogOut className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Sign Out
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
