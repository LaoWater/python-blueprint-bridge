import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Lock, Upload, File, Key, RefreshCw, Edit, Trash2, Eye, Shield,
  Search, Filter, BookOpen, Code, FileText, Sparkles, Vault,
  Archive, Globe, Star, Clock, Hash, Tag
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import UploadButton from '@/components/UploadButton';

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

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const PersonalVault = () => {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

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
        title: "Vault Secured",
        description: "Your personal vault has been secured with a password.",
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
      const { data: rateLimitCheck } = await supabase.rpc('check_password_attempt_rate_limit', {
        p_user_id: user?.id
      });

      if (!rateLimitCheck) {
        throw new Error('Too many password attempts. Please wait a minute before trying again.');
      }

      const passwordHash = await hashPassword(enterPassword);
      
      const { data, error } = await supabase
        .from('personal_files')
        .select('password_hash')
        .eq('user_id', user?.id)
        .eq('password_protected', true)
        .not('password_hash', 'is', null)
        .limit(1);

      if (error) throw error;

      await supabase
        .from('personal_files')
        .update({ last_password_attempt: new Date().toISOString() })
        .eq('user_id', user?.id);

      if (data && data.length > 0 && data[0].password_hash === passwordHash) {
        setIsPasswordSet(true);
        setEnterPassword('');
        toast({
          title: "Vault Unlocked",
          description: "Welcome to your personal programming vault.",
        });
      } else {
        throw new Error('Invalid password');
      }
    } catch (error: any) {
      toast({
        title: "Access Denied",
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
        .neq('original_filename', '.password_setup')
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

  const handleFileUpload = async (file: File) => {
    const allowedTypes = ['.txt', '.sql', '.py', '.js', '.ts', '.md', '.json', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.rs', '.kt', '.swift'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      throw new Error("Unsupported file type. Upload code files, documentation, or structured data files");
    }

    const reader = new FileReader();
    
    return new Promise<void>((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const passwordHash = await hashPassword(enterPassword || 'default');
          
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

          const { error: processError } = await supabase.functions.invoke('process-personal-file', {
            body: { 
              fileId: fileRecord.id,
              filename: file.name,
              content: content 
            }
          });

          if (processError) throw processError;

          toast({
            title: "Blueprint Added",
            description: "Your knowledge is being processed and stored securely...",
          });

          loadFiles();
          resolve();
        } catch (error: any) {
          toast({
            title: "Upload Failed",
            description: error.message || "Failed to upload file",
            variant: "destructive",
          });
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
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
        title: "Blueprint Updated",
        description: "Your knowledge has been refined and saved.",
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
        title: "Blueprint Removed",
        description: "Knowledge has been removed from your vault.",
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

  const getFileIcon = (extension: string) => {
    const iconMap: { [key: string]: any } = {
      '.py': Code,
      '.js': Code,
      '.ts': Code,
      '.java': Code,
      '.cpp': Code,
      '.c': Code,
      '.md': BookOpen,
      '.txt': FileText,
      '.sql': Hash,
      '.json': Archive,
    };
    return iconMap[extension] || File;
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.processed_md_content?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || file.file_extension === filterType;
    return matchesSearch && matchesFilter;
  });

  const fileTypes = [...new Set(files.map(f => f.file_extension))];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vault-dark via-vault-accent to-vault-primary">
        <Card className="w-full max-w-md border-vault-border bg-vault-surface/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-vault-text">
              <Lock className="w-5 h-5" />
              Access Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-vault-muted">Please log in to access your Personal Vault.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isPasswordSet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vault-dark via-vault-accent to-vault-primary">
        <Card className="w-full max-w-md border-vault-border bg-vault-surface/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-vault-text">
              <Vault className="w-6 h-6" />
              Personal Programming Vault
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-vault-muted text-sm">
                Create your secure personal vault to store programming blueprints, patterns, and knowledge that travels with you across the world.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-vault-text">Enter Vault Password</label>
              <Input
                type="password"
                placeholder="Enter your vault password"
                value={enterPassword}
                onChange={(e) => setEnterPassword(e.target.value)}
                disabled={isVerifyingPassword}
                className="bg-vault-input border-vault-border"
              />
              <Button 
                onClick={verifyPassword} 
                disabled={!enterPassword || isVerifyingPassword}
                className="w-full bg-vault-primary hover:bg-vault-primary/90"
              >
                {isVerifyingPassword ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Unlocking Vault...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Unlock Vault
                  </>
                )}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-vault-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-vault-surface px-2 text-vault-muted">or create new vault</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-vault-text">Create Vault Password</label>
              <Input
                type="password"
                placeholder="Create a secure password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSettingPassword}
                className="bg-vault-input border-vault-border"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSettingPassword}
                className="bg-vault-input border-vault-border"
              />
              <Button 
                onClick={setUserPassword} 
                disabled={!password || !confirmPassword || isSettingPassword}
                variant="outline"
                className="w-full border-vault-border hover:bg-vault-accent"
              >
                {isSettingPassword ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Securing Vault...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Create Vault
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vault-dark via-vault-accent to-vault-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Vault className="w-8 h-8 text-vault-primary" />
            <h1 className="text-4xl font-bold text-vault-text">
              Personal Programming Vault
            </h1>
            <Sparkles className="w-6 h-6 text-vault-accent animate-pulse" />
          </div>
          <p className="text-vault-muted max-w-2xl mx-auto">
            Your secure collection of programming blueprints, patterns, and knowledge. 
            Refined by AI, protected by encryption, accessible worldwide.
          </p>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-vault-surface/80 border-vault-border backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-vault-primary" />
                <div>
                  <p className="text-2xl font-bold text-vault-text">{files.length}</p>
                  <p className="text-xs text-vault-muted">Blueprints</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-vault-surface/80 border-vault-border backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-vault-accent" />
                <div>
                  <p className="text-2xl font-bold text-vault-text">{fileTypes.length}</p>
                  <p className="text-xs text-vault-muted">Languages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search your vault..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-vault-input border-vault-border"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-vault-input border border-vault-border rounded-md text-vault-text"
              >
                <option value="all">All Types</option>
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <UploadButton 
          onFileUpload={handleFileUpload}
          className="mb-8"
        />

        {/* Files Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-vault-muted" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.file_extension);
              return (
                <Card key={file.id} className="bg-vault-surface/80 border-vault-border backdrop-blur-sm hover:shadow-lg hover:shadow-vault-primary/20 transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-vault-text">
                      <FileIcon className="w-4 h-4 text-vault-primary" />
                      {file.original_filename}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge 
                        variant={
                          file.upload_status === 'completed' ? 'default' :
                          file.upload_status === 'processing' ? 'secondary' :
                          file.upload_status === 'error' ? 'destructive' : 'outline'
                        }
                        className="text-xs"
                      >
                        {file.upload_status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Secured
                      </Badge>
                      <span className="text-xs text-vault-muted">
                        {(file.file_size_bytes / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {file.processed_md_content && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-vault-surface border-vault-border">
                              <DialogHeader>
                                <DialogTitle className="text-vault-text">{file.original_filename}</DialogTitle>
                              </DialogHeader>
                              <div className="prose dark:prose-invert max-w-none prose-code:text-vault-accent">
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
                            className="flex-1"
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
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredFiles.length === 0 && !loading && files.length > 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-vault-muted" />
            <p className="text-xl text-vault-text mb-2">No matches found</p>
            <p className="text-vault-muted">Try adjusting your search or filter</p>
          </div>
        )}

        {files.length === 0 && !loading && (
          <div className="text-center py-12">
            <Vault className="w-16 h-16 mx-auto mb-4 text-vault-muted" />
            <p className="text-xl text-vault-text mb-2">Your vault awaits</p>
            <p className="text-vault-muted">Upload your first blueprint to begin building your programming knowledge base</p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] bg-vault-surface border-vault-border">
            <DialogHeader>
              <DialogTitle className="text-vault-text">Refine {editingFile?.original_filename}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm bg-vault-input border-vault-border"
                placeholder="Refine your blueprint content..."
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingFile(null)}>
                  Cancel
                </Button>
                <Button onClick={updateFileContent} className="bg-vault-primary hover:bg-vault-primary/90">
                  Save Blueprint
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PersonalVault;