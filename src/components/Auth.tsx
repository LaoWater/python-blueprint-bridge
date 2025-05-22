
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { signIn, signUp, signOut, user, profile, isAdmin } = useAuth();

  const handleAuth = async (action: 'signin' | 'signup') => {
    try {
      if (action === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {profile?.username || user.email} {isAdmin && '(Admin)'}
        </span>
        <Button onClick={signOut} variant="outline" size="sm">Sign Out</Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in or create an account
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="space-y-4 mt-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button className="w-full" onClick={() => handleAuth('signin')}>Sign In</Button>
          </TabsContent>
          <TabsContent value="signup" className="space-y-4 mt-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button className="w-full" onClick={() => handleAuth('signup')}>Sign Up</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
