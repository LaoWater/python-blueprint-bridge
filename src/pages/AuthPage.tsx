
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, Mail, Lock, Sparkles, ArrowRight, GitBranch } from 'lucide-react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const handleAuth = async (action: 'signin' | 'signup') => {
    try {
      setLoading(true);

      if (action === 'signin') {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You've been successfully signed in",
        });
      } else {
        await signUp(email, password);
        toast({
          title: "Account created",
          description: "Your account has been created. Check your email for verification.",
        });
      }

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'signin' | 'signup') => {
    if (e.key === 'Enter' && !loading && email && password) {
      if (action === 'signup' && password.length < 6) return;
      handleAuth(action);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-10 px-4 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md backdrop-blur-xl bg-card/95 border-2 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <GitBranch className="h-12 w-12 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 bg-blue-500/20 rounded-full blur-xl animate-ping" />
            </div>
          </div>
          <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Blue Pigeon
          </CardTitle>
          <CardDescription className="text-center text-base">
            Your journey to programming mastery begins here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-11">
              <TabsTrigger value="signin" className="text-base transition-all data-[state=active]:shadow-md">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-base transition-all data-[state=active]:shadow-md">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-blue-500" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'signin')}
                    disabled={loading}
                    className="pl-11 h-12 text-base transition-all focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-blue-500" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'signin')}
                    disabled={loading}
                    className="pl-11 h-12 text-base transition-all focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              <Button
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
                onClick={() => handleAuth('signin')}
                disabled={loading || !email || !password}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to sign in
              </p>
            </TabsContent>
            <TabsContent value="signup" className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-blue-500" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'signup')}
                    disabled={loading}
                    className="pl-11 h-12 text-base transition-all focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-blue-500" />
                  <Input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'signup')}
                    disabled={loading}
                    className="pl-11 h-12 text-base transition-all focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              <Button
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
                onClick={() => handleAuth('signup')}
                disabled={loading || !email || !password || password.length < 6}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to sign up
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col pt-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg backdrop-blur-sm">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>Development mode: Email verification needed</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
