import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Upload, File, Key, RefreshCw, Edit, Trash2, Eye, Shield } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';

// Sync
interface PersonalFile {
  id: string;
  original_filename: string;
  file_extension: string;
  file_size_bytes: number;
  processed_md_content: string | null;
  upload_status: 'uploading' | 'processing' | 'completed' | 'error';
  password_protected: boolean;
  created_at: string;
  updated_at: string;
}

// Simple password hashing (for demo purposes - in production use bcrypt)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const PersonalFilesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enterPassword, setEnterPassword] = useState('');
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [files, setFiles] = useState<PersonalFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingFile, setEditingFile] = useState<PersonalFile | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (user && isPasswordSet) {
      loadFiles();
    }
  }, [user, isPasswordSet]);

  useEffect(() => {
    if (user) {
      checkPasswordStatus();
    }
  }, [user]);

  const checkPasswordStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('personal_files')
        .select('password_protected')
        .eq('user_id', user?.id)
        .limit(1);

      if (error) throw error;
      
      // If user has any password-protected files, they have set a password
      setIsPasswordSet(data && data.length > 0 && data[0].password_protected);
    } catch (error: any) {
      console.error('Error checking password status:', error);
    }
  };

  const setUserPassword = async () => {
    if (!password || password !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords don't match or are empty",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Error", 
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsSettingPassword(true);
    try {
      const passwordHash = await hashPassword(password);
      
      // Create a dummy file record with password to establish password protection
      const { error } = await supabase
        .from('personal_files')
        .insert({
          original_filename: '.password_setup',
          file_extension: '.system',
          file_size_bytes: 0,
          upload_status: 'completed' as const,
          password_hash: passwordHash,
          password_protected: true,
          user_id: user?.id
        });

      if (error) throw error;

      setIsPasswordSet(true);
      setPassword('');
      setConfirmPassword('');
      
      toast({
        title: "Password Set",
        description: "Your password has been set successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set password",
        variant: "destructive",
      });
    } finally {
      setIsSettingPassword(false);
    }
  };

  const verifyPassword = async () => {
    if (!enterPassword) return;

    setIsVerifyingPassword(true);
    try {
      // Check rate limiting
      const { data: rateLimitCheck } = await supabase.rpc('check_password_attempt_rate_limit', {
        p_user_id: user?.id
      });

      if (!rateLimitCheck) {
        throw new Error('Too many password attempts. Please wait a minute before trying again.');
      }

      const passwordHash = await hashPassword(enterPassword);
      
      // Check if password matches any of the user's files
      const { data, error } = await supabase
        .from('personal_files')
        .select('password_hash')
        .eq('user_id', user?.id)
        .eq('password_protected', true)
        .not('password_hash', 'is', null)
        .limit(1);

      if (error) throw error;

      // Update last password attempt
      await supabase
        .from('personal_files')
        .update({ last_password_attempt: new Date().toISOString() })
        .eq('user_id', user?.id);

      if (data && data.length > 0 && data[0].password_hash === passwordHash) {
        setIsPasswordSet(true);
        setEnterPassword('');
        toast({
          title: "Access Granted",
          description: "Password verified successfully.",
        });
      } else {
        throw new Error('Invalid password');
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid password",
        variant: "destructive",
      });
    } finally {
      setIsVerifyingPassword(false);
    }
  };

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('personal_files')
        .select('*')
        .eq('user_id', user?.id)
        .neq('original_filename', '.password_setup') // Exclude system files
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles((data || []) as PersonalFile[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['.txt', '.sql', '.py', '.js', '.ts', '.md', '.json'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: "Only .txt, .sql, .py, .js, .ts, .md, and .json files are allowed",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const passwordHash = await hashPassword(enterPassword || 'default');
        
        // Insert file record with password protection
        const { data: fileRecord, error: insertError } = await supabase
          .from('personal_files')
          .insert({
            original_filename: file.name,
            file_extension: fileExtension,
            file_size_bytes: file.size,
            upload_status: 'processing' as const,
            password_hash: passwordHash,
            password_protected: true,
            user_id: user?.id
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Process file with LLM
        const { error: processError } = await supabase.functions.invoke('process-personal-file', {
          body: { 
            fileId: fileRecord.id,
            filename: file.name,
            content: content 
          }
        });

        if (processError) throw processError;

        toast({
          title: "File Uploaded",
          description: "Your file is being processed...",
        });

        loadFiles();
      } catch (error: any) {
        toast({
          title: "Upload Failed",
          description: error.message || "Failed to upload file",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  const updateFileContent = async () => {
    if (!editingFile) return;

    try {
      const { error } = await supabase
        .from('personal_files')
        .update({ 
          processed_md_content: editContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingFile.id);

      if (error) throw error;

      toast({
        title: "Content Updated",
        description: "File content has been saved successfully.",
      });

      setEditingFile(null);
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update content",
        variant: "destructive",
      });
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('personal_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      toast({
        title: "File Deleted",
        description: "File has been deleted successfully.",
      });

      loadFiles();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Login Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please log in to access Personal Files.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isPasswordSet) {
    // Check if user needs to set password or enter password
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Personal Files Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Secure your personal files with a password. This ensures only you can access your uploaded content.
            </p>
            
            {/* Try to enter existing password first */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={enterPassword}
                onChange={(e) => setEnterPassword(e.target.value)}
                disabled={isVerifyingPassword}
              />
              <Button 
                onClick={verifyPassword} 
                disabled={!enterPassword || isVerifyingPassword}
                className="w-full"
              >
                {isVerifyingPassword ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Access Files
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-500">or set a new password</span>
            </div>

            {/* Set new password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSettingPassword}
              />
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSettingPassword}
              />
              <Button 
                onClick={setUserPassword} 
                disabled={!password || !confirmPassword || isSettingPassword}
                variant="outline"
                className="w-full"
              >
                {isSettingPassword ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Setting Password...
                  </>
                ) : (
                  'Set Password'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Personal Files
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Securely upload and manage your personal files. Files are processed by AI to create beautiful Markdown documentation.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Upload .txt, .sql, .py, .js, .ts, .md, or .json files
              </p>
              <Input
                type="file"
                accept=".txt,.sql,.py,.js,.ts,.md,.json"
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <Card key={file.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <File className="w-5 h-5" />
                    {file.original_filename}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      file.upload_status === 'completed' ? 'default' :
                      file.upload_status === 'processing' ? 'secondary' :
                      file.upload_status === 'error' ? 'destructive' : 'outline'
                    }>
                      {file.upload_status}
                    </Badge>
                    {file.password_protected && (
                      <Badge variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        Protected
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">
                      {(file.file_size_bytes / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {file.processed_md_content && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{file.original_filename}</DialogTitle>
                            </DialogHeader>
                            <div className="prose dark:prose-invert max-w-none">
                              <ReactMarkdown>{file.processed_md_content}</ReactMarkdown>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingFile(file);
                            setEditContent(file.processed_md_content || '');
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {files.length === 0 && !loading && (
          <div className="text-center py-12">
            <File className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">No files yet</p>
            <p className="text-gray-500">Upload your first file to get started</p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Edit {editingFile?.original_filename}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Edit your markdown content here..."
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingFile(null)}>
                  Cancel
                </Button>
                <Button onClick={updateFileContent}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PersonalFilesPage;