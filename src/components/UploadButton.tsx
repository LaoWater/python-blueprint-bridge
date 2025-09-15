import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Code, 
  Database, 
  Hash, 
  BookOpen, 
  Archive,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadButtonProps {
  onFileUpload: (file: File) => Promise<void>;
  disabled?: boolean;
  className?: string;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  fileName?: string;
  fileType?: string;
  stage?: string;
}

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
    '.sql': Database,
    '.json': Archive,
  };
  return iconMap[extension] || FileText;
};

const UploadButton: React.FC<UploadButtonProps> = ({ onFileUpload, disabled, className }) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['.txt', '.sql', '.py', '.js', '.ts', '.md', '.json', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.rs', '.kt', '.swift'];

  const simulateUploadProgress = async (file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    setUploadState({
      status: 'uploading',
      progress: 0,
      fileName: file.name,
      fileType: fileExtension,
      stage: 'Securing vault connection...'
    });

    // Stage 1: Upload simulation
    for (let i = 0; i <= 30; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadState(prev => ({
        ...prev,
        progress: i,
        stage: i < 15 ? 'Encrypting blueprint...' : 'Uploading to vault...'
      }));
    }

    // Stage 2: Processing
    setUploadState(prev => ({
      ...prev,
      status: 'processing',
      progress: 40,
      stage: 'Analyzing knowledge patterns...'
    }));

    // Call the actual upload function
    try {
      await onFileUpload(file);
      
      // Stage 3: AI Processing simulation
      for (let i = 50; i <= 90; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadState(prev => ({
          ...prev,
          progress: i,
          stage: i < 70 ? 'AI extracting insights...' : 'Generating documentation...'
        }));
      }

      // Completion
      setUploadState(prev => ({
        ...prev,
        status: 'completed',
        progress: 100,
        stage: 'Blueprint added to vault!'
      }));

      // Reset after success
      setTimeout(() => {
        setUploadState({ status: 'idle', progress: 0 });
      }, 3000);

    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        status: 'error',
        stage: 'Upload failed - please try again'
      }));

      setTimeout(() => {
        setUploadState({ status: 'idle', progress: 0 });
      }, 3000);
    }
  };

  const handleFileSelect = async (file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setUploadState({
        status: 'error',
        progress: 0,
        stage: 'Unsupported file type'
      });
      setTimeout(() => {
        setUploadState({ status: 'idle', progress: 0 });
      }, 3000);
      return;
    }

    await simulateUploadProgress(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  if (uploadState.status !== 'idle') {
    const FileIcon = uploadState.fileType ? getFileIcon(uploadState.fileType) : FileText;
    
    return (
      <Card className={cn(
        "border-2 transition-all duration-500",
        uploadState.status === 'completed' ? 'border-green-400 bg-green-50 dark:bg-green-950/20' :
        uploadState.status === 'error' ? 'border-red-400 bg-red-50 dark:bg-red-950/20' :
        'border-vault-primary bg-vault-surface/80 backdrop-blur-sm',
        className
      )}>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-center justify-center gap-3">
              <div className={cn(
                "p-3 rounded-full",
                uploadState.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                uploadState.status === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                'bg-vault-accent/50'
              )}>
                <FileIcon className={cn(
                  "w-6 h-6",
                  uploadState.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                  uploadState.status === 'error' ? 'text-red-600 dark:text-red-400' :
                  'text-vault-primary'
                )} />
              </div>
              <div className="text-center">
                <p className="font-medium text-vault-text">{uploadState.fileName}</p>
                <Badge variant="outline" className="mt-1">
                  {uploadState.fileType}
                </Badge>
              </div>
            </div>

            {/* Status Animation */}
            <div className="flex items-center justify-center">
              {uploadState.status === 'uploading' && (
                <div className="flex items-center gap-2 text-vault-primary">
                  <Upload className="w-5 h-5 animate-bounce" />
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              )}
              {uploadState.status === 'processing' && (
                <div className="flex items-center gap-2 text-vault-primary">
                  <Brain className="w-5 h-5 animate-pulse" />
                  <Zap className="w-4 h-4 animate-ping" />
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              )}
              {uploadState.status === 'completed' && (
                <CheckCircle className="w-8 h-8 text-green-500 animate-pulse" />
              )}
              {uploadState.status === 'error' && (
                <AlertCircle className="w-8 h-8 text-red-500" />
              )}
            </div>

            {/* Progress Bar */}
            {uploadState.status !== 'error' && (
              <div className="space-y-2">
                <Progress 
                  value={uploadState.progress} 
                  className="h-3"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-vault-muted">{uploadState.stage}</span>
                  <span className="text-vault-text font-medium">{uploadState.progress}%</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {uploadState.status === 'error' && (
              <p className="text-center text-red-600 dark:text-red-400">
                {uploadState.stage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      <Card 
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-vault-primary/20",
          isDragOver ? 'border-vault-primary bg-vault-accent/20 scale-105' : 'border-vault-border hover:border-vault-primary',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            {/* Upload Icon with Animation */}
            <div className="relative">
              <div className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                isDragOver ? 'bg-vault-primary/20' : 'bg-vault-accent/50 group-hover:bg-vault-primary/10'
              )}>
                <Upload className={cn(
                  "w-10 h-10 transition-all duration-300",
                  isDragOver ? 'text-vault-primary animate-bounce' : 'text-vault-muted group-hover:text-vault-primary'
                )} />
              </div>
              
              {/* Sparkle Effects */}
              <Sparkles className={cn(
                "absolute -top-2 -right-2 w-6 h-6 transition-all duration-300",
                isDragOver ? 'text-vault-primary animate-pulse' : 'text-vault-muted/50 group-hover:text-vault-primary group-hover:animate-pulse'
              )} />
            </div>

            {/* Upload Text */}
            <div className="space-y-2">
              <h3 className={cn(
                "text-xl font-semibold transition-colors duration-300",
                isDragOver ? 'text-vault-primary' : 'text-vault-text group-hover:text-vault-primary'
              )}>
                {isDragOver ? 'Drop to Add Blueprint' : 'Upload Your Knowledge'}
              </h3>
              
              <p className="text-vault-muted">
                Drop files here or click to browse
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {['.py', '.js', '.ts', '.md', '.sql', '.json'].map(type => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs">+more</Badge>
              </div>
            </div>

            {/* Call to Action Button */}
            <Button 
              className={cn(
                "bg-vault-primary hover:bg-vault-primary/90 text-white transition-all duration-300 group-hover:scale-105",
                isDragOver && 'scale-105 shadow-lg shadow-vault-primary/30'
              )}
              disabled={disabled}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadButton;