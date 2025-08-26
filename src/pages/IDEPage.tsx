import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { 
  FileText, 
  Folder, 
  FolderOpen, 
  Terminal as TerminalIcon, 
  Play, 
  Square,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Plus,
  X,
  Settings,
  Search,
  GitBranch,
  Bug,
  Package,
  Save,
  Circle,
  Monitor,
  Focus,
  Eye,
  PanelBottom,
  PanelBottomClose,
  Loader2,
  RefreshCw,
  Home,
  RotateCw
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { useExplorer } from '@/hooks/useExplorer';
import type { FileSystemItem } from '@/hooks/useExplorer';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { usePythonTerminal } from '@/hooks/usePythonTerminal';

// Extend Window interface for auto-switch callback
declare global {
  interface Window {
    autoSwitchToTerminal?: () => void;
  }
}

const FileTreeItem: React.FC<{
  item: FileSystemItem;
  depth: number;
  onFileSelect: (item: FileSystemItem) => void;
  onToggleFolder: (itemId: string) => void;
  currentFileId?: string;
}> = ({ item, depth, onFileSelect, onToggleFolder, currentFileId }) => {
  const isFolder = item.type === 'folder';
  const indent = depth * 12;
  const isSelected = currentFileId === item.id;

  return (
    <div>
      <div 
        className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm transition-colors ${
          isSelected ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
        }`}
        style={{ paddingLeft: `${8 + indent}px` }}
        onClick={() => isFolder ? onToggleFolder(item.id) : onFileSelect(item)}
        title={item.path}
      >
        {isFolder ? (
          item.expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        ) : null}
        {isFolder ? (
          item.expanded ? <FolderOpen size={14} className="ml-1 mr-2 text-blue-500" /> 
                       : <Folder size={14} className="ml-1 mr-2 text-blue-500" />
        ) : (
          <FileText size={14} className="ml-1 mr-2 text-gray-600 dark:text-gray-400" />
        )}
        <span className="truncate flex-1">{item.name}</span>
        {!isFolder && item.size_bytes > 0 && (
          <span className="text-xs text-gray-400 ml-2">
            {formatFileSize(item.size_bytes)}
          </span>
        )}
      </div>
      {isFolder && item.expanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              onToggleFolder={onToggleFolder}
              currentFileId={currentFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to format file sizes
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const TerminalComponent: React.FC<{ 
  isActive?: boolean;
  sessionId?: string | null;
  isConnected?: boolean;
  terminalOutput?: string;
  onSendCommand?: (command: string) => void;
  onCreateSession?: () => void;
}> = ({ 
  isActive = false, 
  sessionId, 
  isConnected, 
  terminalOutput,
  onSendCommand,
  onCreateSession
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isActive && inputRef.current && isConnected) {
      inputRef.current.focus();
    }
  }, [isActive, isConnected]);

  // Auto-scroll to bottom when new output arrives
  React.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    
    if (onSendCommand && isConnected) {
      onSendCommand(command + '\n');  // Add newline for proper command execution
      setCurrentInput('');
    } else {
      toast.error('Terminal not connected. Please start a Python session first.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for common commands
      const commonCommands = ['ls', 'cd', 'mkdir', 'python3', 'pip', 'nano', 'cat', 'touch', 'rm'];
      const matching = commonCommands.filter(cmd => cmd.startsWith(currentInput));
      if (matching.length === 1) {
        setCurrentInput(matching[0] + ' ');
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // TODO: Command history
      e.preventDefault();
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      handleCommand('\u0003'); // Send Ctrl+C
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      handleCommand('clear');
    }
  };

  if (!sessionId) {
    return (
      <div className="h-full bg-black text-green-400 font-mono text-sm p-4 flex flex-col items-center justify-center">
        <div className="text-center mb-4">
          <h3 className="text-lg text-blue-400 mb-2">🐍 Python Linux Terminal</h3>
          <p className="text-gray-400 mb-2">Full access Linux terminal with Python environment</p>
          <div className="text-gray-500 text-xs mb-4 space-y-1">
            <p>• Create directories, run scripts, install packages</p>
            <p>• Tab completion for common commands</p>
            <p>• Ctrl+C to interrupt, Ctrl+L to clear</p>
            <p>• Separate from "Run" button (executes current file)</p>
          </div>
          <button
            onClick={onCreateSession}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
          >
            🚀 Start Python Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm flex flex-col">
      <div 
        ref={outputRef}
        className="flex-1 min-h-0 p-4 overflow-auto whitespace-pre-wrap"
      >
        {terminalOutput || 'Connecting to Python terminal...'}
      </div>
      <div className="flex items-center p-4 pt-0 flex-shrink-0 min-h-[3rem]">
        <span className="text-green-400">pythonuser</span>
        <span className="text-gray-400">@</span>
        <span className="text-blue-400">blue-pigeon</span>
        <span className="text-gray-400">:</span>
        <span className="text-purple-400">/tmp</span>
        <span className="text-green-400 font-bold">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected}
          className="flex-1 bg-transparent border-none outline-none text-green-400 ml-1 disabled:opacity-50 font-mono"
          placeholder={isConnected ? "Try: ls, mkdir, python, pip install..." : "Connecting to terminal..."}
          autoComplete="off"
          spellCheck={false}
        />
        {!isConnected && (
          <Loader2 size={16} className="ml-2 animate-spin text-yellow-400" />
        )}
      </div>
    </div>
  );
};

const IDEPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Use the Explorer hook for database integration
  const {
    fileTree,
    activeProject,
    currentFile,
    recentFiles,
    searchResults,
    isLoading,
    error,
    loadFileContent,
    updateFileContent,
    createFile,
    createFolder,
    renameItem,
    deleteItem,
    moveItem,
    searchFiles,
    clearSearch,
    toggleFolder,
    selectFile,
    loadRecentFiles
  } = useExplorer();

  // Python Terminal Integration
  const {
    sessionId,
    status: terminalStatus,
    isReady: isTerminalReady,
    error: terminalError,
    isLoading: isTerminalLoading,
    isConnected,
    terminalOutput,
    canRun,
    canSendCommands,
    createSession,
    saveAndRunFile,
    sendCommand,
    deleteSession,
    clearOutput,
    syncFileSystem,
    executeFile
  } = usePythonTerminal();

  // Local state for UI
  const [openTabs, setOpenTabs] = useState<FileSystemItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTerminalEnabled, setIsTerminalEnabled] = useState(true);
  const [explorerCollapsed, setExplorerCollapsed] = useState(true);
  const [explorerActiveView, setExplorerActiveView] = useState<'files' | 'search' | 'git' | 'debug'>('files');
  const [bottomPanelVisible, setBottomPanelVisible] = useState(true);
  const [bottomActiveTab, setBottomActiveTab] = useState<'output' | 'terminal'>('output');
  const [searchQuery, setSearchQuery] = useState('');
  const [code, setCode] = useState('');
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [runOutput, setRunOutput] = useState('Blue Pigeon IDE - Ready for Python execution\n=====================================\nRun a Python file to see output here.');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  
  // IDE Settings state
  const [ideSettings, setIdeSettings] = useState({
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    autoSave: true,
    autoSaveDelay: 10, // seconds
    tabSize: 2,
    wordWrap: false,
    minimap: true,
    lineNumbers: true,
    theme: 'vs-dark',
  });
  
  // Get the proper sizes for explorer panel
  const getExplorerSizes = () => {
    if (explorerCollapsed) {
      return { defaultSize: 3, minSize: 3, maxSize: 3 };
    } else {
      return { defaultSize: 25, minSize: 20, maxSize: 40 };
    }
  };

  // Handle file selection and loading
  const handleFileSelect = useCallback(async (file: FileSystemItem) => {
    try {
      setIsLoadingFile(true);
      
      // Add to open tabs if not already open
      if (!openTabs.find(tab => tab.id === file.id)) {
        setOpenTabs(prev => [...prev, file]);
      }
      
      // Select the file
      selectFile(file);
      
      // Load file content if it's a file
      if (file.type === 'file') {
        const content = await loadFileContent(file.id);
        setCode(content || '');
      }
    } catch (error) {
      toast.error('Failed to open file');
    } finally {
      setIsLoadingFile(false);
    }
  }, [openTabs, selectFile, loadFileContent]);

  // Handle folder toggle
  const handleToggleFolder = useCallback((folderId: string) => {
    toggleFolder(folderId);
  }, [toggleFolder]);

  // Handle tab close
  const handleCloseTab = useCallback((file: FileSystemItem) => {
    setOpenTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== file.id);
      
      // If closing the current file, switch to another tab
      if (currentFile?.id === file.id && newTabs.length > 0) {
        const nextFile = newTabs[newTabs.length - 1];
        selectFile(nextFile);
        loadFileContent(nextFile.id).then(content => {
          setCode(content || '');
        });
      } else if (newTabs.length === 0) {
        selectFile({} as FileSystemItem);
        setCode('');
      }
      
      return newTabs;
    });
  }, [currentFile, selectFile, loadFileContent]);

  // Execute the current file
  const executeCurrentFile = useCallback(async () => {
    if (!currentFile || !sessionId || !isConnected) return;

    setIsRunning(true);
    setBottomPanelVisible(true);
    setBottomActiveTab('terminal');
    
    try {
      // Save current changes first
      if (code !== currentFile.content) {
        await updateFileContent(currentFile.id, code);
      }

      // Create the Python file in the terminal and run it
      const fileName = currentFile.name;
      
      // Create file using echo method (more reliable than heredoc)
      const codeLines = code.split('\n');
      
      // First, remove existing file and create new one
      await sendCommand(`rm -f ${fileName} 2>/dev/null || true`);
      await sendCommand(`echo "📝 Creating ${fileName}..."`);
      
      // Write each line individually (more reliable)
      for (let i = 0; i < codeLines.length; i++) {
        const line = codeLines[i];
        const escapedLine = line.replace(/'/g, "'\"'\"'").replace(/"/g, '\\"');
        if (i === 0) {
          await sendCommand(`echo '${escapedLine}' > ${fileName}`);
        } else {
          await sendCommand(`echo '${escapedLine}' >> ${fileName}`);
        }
      }
      
      // Small delay to ensure file is written, then run it
      setTimeout(async () => {
        await sendCommand(`echo "✅ File created successfully"`);
        await sendCommand(`echo "🏃 Executing: python3 ${fileName}"`);
        await sendCommand(`echo "─────────────────────────────────────"`);
        await sendCommand(`python3 ${fileName}`);
        await sendCommand(`echo "─────────────────────────────────────"`);
        await sendCommand(`echo "✅ Execution completed"`);
      }, 1000);
      
      toast.success(`Running ${currentFile.name} in terminal`);
    } catch (error) {
      toast.error('Failed to execute file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsRunning(false);
    }
  }, [currentFile, code, updateFileContent, sessionId, isConnected, sendCommand]);

  // Handle Python session creation
  const handleCreatePythonSession = useCallback(async () => {
    try {
      await createSession();
      setBottomPanelVisible(true);
      setBottomActiveTab('terminal');
      toast.success('Python session created! Terminal ready for use.');
    } catch (error) {
      toast.error('Failed to create Python session');
    }
  }, [createSession]);

  // Handle filesystem sync
  const handleSync = useCallback(async () => {
    if (!sessionId || !isTerminalReady) {
      toast.error('No active Python session. Create a session first.');
      return;
    }

    setIsSyncing(true);
    setIsSynced(false);
    
    try {
      // Build file structure from the database file tree
      const buildFileStructure = (items: FileSystemItem[], basePath = ''): any[] => {
        const structure: any[] = [];
        
        for (const item of items) {
          const itemPath = basePath ? `${basePath}/${item.name}` : item.name;
          
          if (item.type === 'folder') {
            structure.push({
              path: itemPath,
              type: 'folder'
            });
            
            if (item.children) {
              structure.push(...buildFileStructure(item.children, itemPath));
            }
          } else if (item.type === 'file') {
            structure.push({
              path: itemPath,
              type: 'file',
              content: item.content || ''
            });
          }
        }
        
        return structure;
      };

      const fileStructure = buildFileStructure(fileTree);
      console.log('Syncing file structure:', fileStructure);
      
      const result = await syncFileSystem(fileStructure);
      
      const successCount = result.results.filter(r => r.success).length;
      const totalCount = result.results.length;
      
      setIsSynced(true);
      toast.success(`✅ Synced ${successCount}/${totalCount} items to Linux terminal`);
      
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Failed to sync filesystem: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSyncing(false);
    }
  }, [sessionId, isTerminalReady, fileTree, syncFileSystem]);

  // Auto-switch to terminal when WebSocket connects
  useEffect(() => {
    window.autoSwitchToTerminal = () => {
      setBottomPanelVisible(true);
      setBottomActiveTab('terminal');
      // Focus the terminal input after a short delay
      setTimeout(() => {
        const terminalInput = document.querySelector('input[placeholder*="Try: ls"]') as HTMLInputElement;
        if (terminalInput) {
          terminalInput.focus();
        }
      }, 100);
    };
    
    return () => {
      delete window.autoSwitchToTerminal;
    };
  }, []);

  // Handle code execution - clean Run button
  const handleRunCode = useCallback(async () => {
    if (!currentFile || currentFile.type !== 'file') {
      toast.error('No file selected to run');
      return;
    }

    // Check if we have a Python session
    if (!sessionId || !isTerminalReady) {
      toast.error('No active Python session. Create a session and sync files first.');
      return;
    }

    // Check if files are synced
    if (!isSynced) {
      toast.error('Files not synced. Click Sync button first to sync your files to the Linux terminal.');
      return;
    }

    setIsRunning(true);
    setBottomPanelVisible(true);
    setBottomActiveTab('output');
    
    try {
      // Save current changes to database first
      if (hasUnsavedChanges) {
        await updateFileContent(currentFile.id, code);
        setHasUnsavedChanges(false);
        setLastSavedContent(code);
      }

      // Build file path from current file
      const getFilePath = (file: FileSystemItem): string => {
        // This is a simplified approach - you might need to build the full path
        // based on your file tree structure
        return file.name;
      };

      const filePath = getFilePath(currentFile);
      
      setRunOutput('🏃 Running ' + filePath + '...\n=====================================\n');
      
      // Execute the file cleanly
      const result = await executeFile(filePath);
      
      if (result.success) {
        setRunOutput(
          `✅ Executed: ${result.command || `python3 ${filePath}`}\n` +
          `=====================================\n` +
          result.output
        );
        toast.success(`✅ ${currentFile.name} executed successfully`);
      } else {
        setRunOutput(
          `❌ Execution failed: ${filePath}\n` +
          `=====================================\n` +
          result.output
        );
        toast.error(`❌ Failed to execute ${currentFile.name}`);
      }
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setRunOutput(`❌ Error: ${errorMsg}\n=====================================\n`);
      toast.error('Execution failed: ' + errorMsg);
    } finally {
      setIsRunning(false);
    }
  }, [currentFile, sessionId, isTerminalReady, isSynced, hasUnsavedChanges, code, updateFileContent, executeFile]);

  const handleToggleTerminal = () => {
    if (sessionId && isConnected) {
      // If we have an active session, switch to terminal or disconnect
      if (bottomActiveTab === 'terminal') {
        // If terminal is already active, disconnect session
        deleteSession();
        setBottomActiveTab('output');
        toast.info('Python session disconnected');
      } else {
        // Switch to terminal tab
        setBottomPanelVisible(true);
        setBottomActiveTab('terminal');
      }
    } else {
      // No session or not connected - create new session
      setBottomPanelVisible(true);
      setBottomActiveTab('terminal');
      handleCreatePythonSession();
    }
  };

  // Handle terminal command sending
  const handleSendTerminalCommand = useCallback(async (command: string) => {
    try {
      await sendCommand(command);
    } catch (error) {
      toast.error('Failed to send command');
    }
  }, [sendCommand]);

  const handleToggleBottomPanel = () => {
    setBottomPanelVisible(!bottomPanelVisible);
  };

  // Manual save function
  const handleSave = useCallback(async () => {
    if (!currentFile || currentFile.type !== 'file' || !hasUnsavedChanges || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      await updateFileContent(currentFile.id, code);
      
      // Update last saved content to reflect what we just saved
      setLastSavedContent(code);
      setHasUnsavedChanges(false);
      
      toast.success(`Saved ${currentFile.name}`);
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save file');
    } finally {
      setIsSaving(false);
    }
  }, [currentFile, hasUnsavedChanges, isSaving, code, updateFileContent]);

  // Keyboard shortcuts (Ctrl+S for save, Ctrl+, for settings, Escape to close/exit)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Save shortcut
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
      // Settings shortcut (Ctrl+, or Cmd+,)
      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault();
        setShowSettings(!showSettings);
      }
      // Exit IDE shortcut (Escape key)
      if (event.key === 'Escape') {
        if (showSettings) {
          setShowSettings(false);
        } else {
          // Exit IDE and return to home
          navigate('/');
          toast.info('Exited IDE - Returned to home');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, showSettings, navigate]);

  // Handle currentFile changes (file switching only - NOT content editing)
  useEffect(() => {
    if (currentFile && currentFile.type === 'file') {
      // Check if this file is already open in tabs
      const isAlreadyOpen = openTabs.some(tab => tab.id === currentFile.id);
      
      if (!isAlreadyOpen) {
        // Add to tabs if not already there
        setOpenTabs(prev => [...prev, currentFile]);
      }
      
      // Load file content ONLY when switching files
      const loadContentFromDB = async () => {
        try {
          setIsLoadingFile(true);
          const content = await loadFileContent(currentFile.id);
          if (content !== null) {
            setCode(content);
            setLastSavedContent(content); // Track what we loaded as the last saved state
            setHasUnsavedChanges(false); // Reset unsaved state when loading new file
          }
        } catch (error) {
          console.error('Failed to load file content:', error);
          toast.error('Failed to load file content');
        } finally {
          setIsLoadingFile(false);
        }
      };
      
      // Only load if we don't have content or if file has stored content
      if (currentFile.content !== undefined) {
        // File has content in memory - use it
        setCode(currentFile.content);
        setLastSavedContent(currentFile.content); // Track current content as saved
        setHasUnsavedChanges(false);
      } else {
        // File needs to be loaded from database
        loadContentFromDB();
      }
    }
  }, [currentFile?.id, loadFileContent, openTabs]); // REMOVED 'code' from dependencies!

  // Track unsaved changes (compare with last saved content)
  useEffect(() => {
    if (currentFile && currentFile.type === 'file') {
      // Compare current editor content with the last saved version
      const hasChanges = code !== lastSavedContent;
      setHasUnsavedChanges(hasChanges);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [code, currentFile, lastSavedContent]);

  // Auto-save functionality (configurable delay)
  useEffect(() => {
    if (currentFile && currentFile.type === 'file' && hasUnsavedChanges && !isSaving && ideSettings.autoSave) {
      const timeoutId = setTimeout(async () => {
        try {
          setIsSaving(true);
          await updateFileContent(currentFile.id, code);
          
          // Update last saved content to reflect what we just saved
          setLastSavedContent(code);
          setHasUnsavedChanges(false);
          
          // Silently auto-save - no toast notification
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }, ideSettings.autoSaveDelay * 1000); // Convert seconds to milliseconds

      return () => clearTimeout(timeoutId);
    }
  }, [code, currentFile, updateFileContent, hasUnsavedChanges, isSaving, ideSettings.autoSave, ideSettings.autoSaveDelay]);

  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      await searchFiles(query);
    } else {
      clearSearch();
    }
  }, [searchFiles, clearSearch]);

  // Function to highlight search matches in text with better context
  const highlightSearchMatches = useCallback((text: string, query: string, maxLength: number = 200): React.ReactNode => {
    if (!query.trim() || !text) return text;
    
    // Escape special regex characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    
    // Find the first match to show context around it
    const firstMatchIndex = text.toLowerCase().indexOf(query.toLowerCase());
    let displayText = text;
    
    // If text is too long, show context around the first match
    if (text.length > maxLength && firstMatchIndex !== -1) {
      const start = Math.max(0, firstMatchIndex - 50);
      const end = Math.min(text.length, firstMatchIndex + maxLength - 50);
      displayText = (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
    } else if (text.length > maxLength) {
      displayText = text.substring(0, maxLength) + '...';
    }
    
    const parts = displayText.split(regex);
    
    return parts.map((part, index) => {
      // Check if this part matches the query (case-insensitive)
      const isMatch = part.toLowerCase() === query.toLowerCase() && part.length > 0;
      return isMatch ? (
        <span 
          key={index}
          className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-0.5 py-0.5 rounded font-semibold shadow-sm"
        >
          {part}
        </span>
      ) : (
        part
      );
    });
  }, []);

  const handleExplorerViewChange = (view: 'files' | 'search' | 'git' | 'debug') => {
    setExplorerActiveView(view);
    if (explorerCollapsed) {
      // Use a small timeout to ensure smooth transition
      setTimeout(() => setExplorerCollapsed(false), 50);
    }
    
    // Clear search when switching views
    if (view !== 'search') {
      setSearchQuery('');
      clearSearch();
    }
  };

  const handleExplorerExpand = () => {
    setExplorerCollapsed(false);
    setExplorerActiveView('files');
  };

  const renderExplorerContent = () => {
    switch (explorerActiveView) {
      case 'search':
        return (
          <div className="flex-1 p-3">
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search files..."
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 size={16} className="animate-spin text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="mb-3">
                  <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                    SEARCH RESULTS ({searchResults.length})
                  </h4>
                  {searchQuery && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono">
                      Query: "{searchQuery}"
                    </div>
                  )}
                </div>
                {searchResults.length === 0 && searchQuery ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => handleFileSelect(result)}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {highlightSearchMatches(result.name, searchQuery)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {result.path}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1 leading-relaxed">
                        {highlightSearchMatches(result.content || '', searchQuery, 150)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      
      case 'git':
        return (
          <div className="flex-1 p-3">
            <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-3">
              SOURCE CONTROL
            </h4>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Changes (3)</div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <span className="text-green-500 mr-2">M</span>
                    main.py
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <span className="text-blue-500 mr-2">A</span>
                    algorithms.py
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <span className="text-red-500 mr-2">D</span>
                    old_utils.py
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Staged Changes (0)</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 italic">No staged changes</div>
              </div>
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Commit message..."
                  className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="w-full mt-2 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                  Commit
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'debug':
        return (
          <div className="flex-1 p-3">
            <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-3">
              RUN AND DEBUG
            </h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium">
                <Play size={14} className="mr-2" />
                Start Debugging
              </button>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Breakpoints</div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    main.py:15
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    algorithms.py:8
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Watch</div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono p-1">
                    fib_numbers: [0, 1, 1, 2, 3, 5, 8, 13]
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono p-1">
                    n: 10
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default: // 'files'
        return (
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Loading files...</span>
              </div>
            ) : fileTree.length === 0 ? (
              <div className="p-4 text-center">
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {!user ? 'Please sign in to access your files' : 'No files found'}
                </div>
                {!activeProject && user && (
                  <div className="mt-2 text-xs text-gray-400">
                    Creating your first project...
                  </div>
                )}
              </div>
            ) : (
              <div className="py-2">
                {fileTree.map((item) => (
                  <FileTreeItem
                    key={item.id}
                    item={item}
                    depth={0}
                    onFileSelect={handleFileSelect}
                    onToggleFolder={handleToggleFolder}
                    currentFileId={currentFile?.id}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  // IDE immersive glow styles (always applied)
  const ideGlowStyles = {
    boxShadow: `
      inset 0 0 60px rgba(59, 130, 246, 0.18),
      inset 0 0 120px rgba(59, 130, 246, 0.12),
      inset 0 0 180px rgba(59, 130, 246, 0.08),
      0 0 40px rgba(59, 130, 246, 0.22)
    `,
    border: '1px solid rgba(59, 130, 246, 0.3)',
    animation: 'ide-pulse 6s ease-in-out infinite alternate'
  };

  return (
    <>
      {/* IDE Immersive Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ide-pulse {
            0% {
              box-shadow: 
                inset 0 0 60px rgba(59, 130, 246, 0.18),
                inset 0 0 120px rgba(59, 130, 246, 0.12),
                inset 0 0 180px rgba(59, 130, 246, 0.08),
                0 0 40px rgba(59, 130, 246, 0.22);
            }
            100% {
              box-shadow: 
                inset 0 0 80px rgba(59, 130, 246, 0.25),
                inset 0 0 160px rgba(59, 130, 246, 0.18),
                inset 0 0 220px rgba(59, 130, 246, 0.12),
                0 0 60px rgba(59, 130, 246, 0.28);
            }
          }
        `
      }} />
      
      <div 
        className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden"
        style={ideGlowStyles}
      >
      {/* Top Toolbar */}
      <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            Blue Pigeon IDE
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning || !currentFile || currentFile.type !== 'file' || !isSynced}
              className="flex items-center space-x-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded text-sm font-medium"
            >
              {isRunning ? <Square size={14} /> : <Play size={14} />}
              <span>
                {isRunning ? 'Running...' : 'Run'}
              </span>
            </button>
            <button
              onClick={handleSync}
              disabled={isSyncing || !sessionId || !isTerminalReady}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium ${
                isSynced
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : isSyncing
                  ? 'bg-orange-500 hover:bg-orange-600 text-white animate-pulse'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300'
              }`}
              title={isSynced ? 'Files synced with Linux terminal' : 'Sync database files to Linux terminal'}
            >
              {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <Sync size={14} />}
              <span>
                {isSyncing ? 'Syncing...' : isSynced ? 'Synced' : 'Sync'}
              </span>
              {isSynced && (
                <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse" title="Files synced" />
              )}
            </button>
            <button
              onClick={handleToggleTerminal}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium ${
                sessionId && isConnected
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : isTerminalLoading
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white animate-pulse'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300'
              }`}
              title={sessionId ? `Python Session: ${sessionId.slice(0,8)}...` : 'Start Python Terminal'}
            >
              <TerminalIcon size={14} />
              <span>
                {isTerminalLoading ? 'Starting...' : sessionId ? 'Python' : 'Terminal'}
              </span>
              {sessionId && isConnected && (
                <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse" title="Connected" />
              )}
              {isTerminalLoading && (
                <Loader2 size={14} className="animate-spin" />
              )}
            </button>
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isSaving || !currentFile}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                hasUnsavedChanges && currentFile
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              title={hasUnsavedChanges ? 'Save file (Ctrl+S)' : 'No unsaved changes'}
            >
              {isSaving ? <Circle size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={() => {
                navigate('/');
                toast.info('Exited IDE - Returned to home');
              }}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors"
              title="Exit IDE and return to home (Escape)"
            >
              <Home size={14} />
              <span>Exit IDE</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* File Status Indicator */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            {currentFile && (
              <>
                <span>{currentFile.name}</span>
                {hasUnsavedChanges && <span className="text-orange-500">• unsaved</span>}
                {isSaving && <span className="text-blue-500">• saving...</span>}
                {ideSettings.autoSave ? (
                  <span className="text-green-500">• auto-save: {ideSettings.autoSaveDelay}s</span>
                ) : (
                  <span className="text-gray-500">• auto-save: off</span>
                )}
                {sessionId && (
                  <span className="text-green-400">• python: {terminalStatus}</span>
                )}
                {sessionId && (
                  <span className={isSynced ? "text-blue-400" : "text-gray-500"}>
                    • sync: {isSynced ? 'ready' : 'pending'}
                  </span>
                )}
                <span className="text-blue-400 animate-pulse">• immersive mode</span>
              </>
            )}
          </div>
          <button
            onClick={handleToggleBottomPanel}
            className="flex items-center space-x-2 px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded"
            title="Toggle Terminal/Output Panel"
          >
            {bottomPanelVisible ? <PanelBottomClose size={16} /> : <PanelBottom size={16} />}
          </button>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <GitBranch size={16} />
            <span className="text-sm">main</span>
          </div>
          <ThemeToggle />
          <Settings 
            size={16} 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
            onClick={() => setShowSettings(!showSettings)}
            title="IDE Settings (Ctrl+,)"
          />
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PanelGroup direction="vertical">
          {/* Top Panel - Main Content */}
          <Panel defaultSize={bottomPanelVisible ? 65 : 100} minSize={40}>
            <div className="h-full flex overflow-hidden">
              <PanelGroup direction="horizontal" key={`explorer-${explorerCollapsed}`}>
                {/* Left Sidebar - File Explorer */}
                <Panel 
                  {...getExplorerSizes()}
                  collapsible={true}
                  className="transition-all duration-300 ease-in-out"
                >
                  <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    {explorerCollapsed ? (
                      /* Collapsed Explorer */
                      <div className="flex flex-col items-center py-2 space-y-4">
                        <button
                          onClick={handleExplorerExpand}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                        <div className="flex flex-col space-y-3">
                          <button
                            onClick={() => handleExplorerViewChange('files')}
                            className={`p-2 rounded transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              explorerActiveView === 'files' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400'
                            }`}
                            title="Files"
                          >
                            <Folder size={18} />
                          </button>
                          <button
                            onClick={() => handleExplorerViewChange('search')}
                            className={`p-2 rounded transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              explorerActiveView === 'search' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400'
                            }`}
                            title="Search"
                          >
                            <Search size={18} />
                          </button>
                          <button
                            onClick={() => handleExplorerViewChange('git')}
                            className={`p-2 rounded transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              explorerActiveView === 'git' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400'
                            }`}
                            title="Source Control"
                          >
                            <GitBranch size={18} />
                          </button>
                          <button
                            onClick={() => handleExplorerViewChange('debug')}
                            className={`p-2 rounded transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              explorerActiveView === 'debug' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400'
                            }`}
                            title="Run and Debug"
                          >
                            <Bug size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Expanded Explorer */
                      <div className="h-full flex flex-col animate-in slide-in-from-left-5 duration-300">
                        {/* Sidebar Header */}
                        <div className="h-10 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3">
                          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {explorerActiveView === 'files' && <><Folder size={14} className="mr-2" />Explorer</>}
                            {explorerActiveView === 'search' && <><Search size={14} className="mr-2" />Search</>}
                            {explorerActiveView === 'git' && <><GitBranch size={14} className="mr-2" />Source Control</>}
                            {explorerActiveView === 'debug' && <><Bug size={14} className="mr-2" />Run & Debug</>}
                          </div>
                          <button
                            onClick={() => setExplorerCollapsed(true)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <ChevronLeft size={14} />
                          </button>
                        </div>
                        
                        {/* Sidebar Tabs */}
                        <div className="h-8 border-b border-gray-200 dark:border-gray-700 flex">
                          <button
                            onClick={() => setExplorerActiveView('files')}
                            className={`flex-1 flex items-center justify-center text-xs font-medium transition-all ${
                              explorerActiveView === 'files' 
                                ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-750' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750'
                            }`}
                          >
                            Files
                          </button>
                          <button
                            onClick={() => setExplorerActiveView('search')}
                            className={`px-3 flex items-center justify-center transition-all ${
                              explorerActiveView === 'search' 
                                ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-750' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                            } cursor-pointer`}
                          >
                            <Search size={14} />
                          </button>
                          <button
                            onClick={() => setExplorerActiveView('git')}
                            className={`px-3 flex items-center justify-center transition-all ${
                              explorerActiveView === 'git' 
                                ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-750' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                            } cursor-pointer`}
                          >
                            <GitBranch size={14} />
                          </button>
                          <button
                            onClick={() => setExplorerActiveView('debug')}
                            className={`px-3 flex items-center justify-center transition-all ${
                              explorerActiveView === 'debug' 
                                ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-750' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                            } cursor-pointer`}
                          >
                            <Bug size={14} />
                          </button>
                        </div>
                        
                        {/* Dynamic Content */}
                        {renderExplorerContent()}
                      </div>
                    )}
                  </div>
                </Panel>

                <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 transition-all" />

                {/* Main Content Area */}
                <Panel defaultSize={explorerCollapsed ? 97 : 75}>
                  <div className="h-full flex flex-col">
                    {/* Editor Tabs */}
                    <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      {openTabs.map(tab => (
                        <div
                          key={tab.id}
                          className={`flex items-center px-4 py-2 border-r border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${
                            currentFile?.id === tab.id
                              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-900'
                          }`}
                          onClick={() => handleFileSelect(tab)}
                        >
                          <FileText size={14} className="mr-2" />
                          <span className="text-sm" title={tab.path}>{tab.name}</span>
                          {/* Unsaved changes indicator */}
                          {currentFile?.id === tab.id && hasUnsavedChanges && (
                            <Circle size={8} className="ml-2 fill-orange-500 text-orange-500" title="Unsaved changes" />
                          )}
                          {openTabs.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseTab(tab);
                              }}
                              className="ml-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-0.5"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800">
                        {activeProject && (
                          <div className="flex items-center justify-end px-2 h-full">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {activeProject.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 relative">
                      {isLoadingFile && (
                        <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10">
                          <div className="flex items-center">
                            <Loader2 size={20} className="animate-spin text-blue-500" />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading file...</span>
                          </div>
                        </div>
                      )}
                      {currentFile ? (
                        <Editor
                          height="100%"
                          language={currentFile.language || 'plaintext'}
                          value={code}
                          onChange={(value) => setCode(value || '')}
                          theme={theme === 'dark' ? 'vs-dark' : 'light'}
                          options={{
                            minimap: { enabled: ideSettings.minimap },
                            fontSize: ideSettings.fontSize,
                            fontFamily: ideSettings.fontFamily,
                            lineNumbers: ideSettings.lineNumbers ? 'on' : 'off',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            wordWrap: ideSettings.wordWrap ? 'on' : 'off',
                            tabSize: ideSettings.tabSize,
                            insertSpaces: true,
                            readOnly: currentFile.is_readonly,
                            renderWhitespace: 'selection',
                            cursorBlinking: 'smooth',
                            smoothScrolling: true,
                            contextmenu: true,
                            selectOnLineNumbers: true,
                          }}
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                          <div className="text-center">
                            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                              Welcome to Blue Pigeon IDE
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              {user ? (
                                fileTree.length === 0 ? 'Creating your project...' : 'Select a file from the Explorer to start coding'
                              ) : (
                                'Please sign in to access your projects'
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </div>
          </Panel>

          {/* Bottom Panel - Terminal/Output */}
          {bottomPanelVisible && (
            <>
              <PanelResizeHandle className="h-1 hover:h-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 transition-all" />
              <Panel defaultSize={35} minSize={20} maxSize={60}>
                <div className="h-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-col">
                  {/* Bottom Panel Tabs - Fixed Height */}
                  <div className="h-8 min-h-[2rem] max-h-[2rem] border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                    <div className="flex">
                      <button
                        onClick={() => setBottomActiveTab('output')}
                        className={`px-3 py-1 text-sm font-medium ${
                          bottomActiveTab === 'output'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                      >
                        <Monitor size={14} className="inline mr-2" />
                        Output
                      </button>
                      {isTerminalEnabled && (
                        <button
                          onClick={() => setBottomActiveTab('terminal')}
                          className={`px-3 py-1 text-sm font-medium ${
                            bottomActiveTab === 'terminal'
                              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                          }`}
                        >
                          <TerminalIcon size={14} className="inline mr-2" />
                          Terminal
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setBottomPanelVisible(false)}
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Panel Content - Takes remaining space */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    {bottomActiveTab === 'output' && (
                      <div className="h-full p-4 text-sm font-mono overflow-auto bg-gray-50 dark:bg-gray-900">
                        <div className="text-gray-600 dark:text-gray-400">
                          {runOutput || 'Blue Pigeon IDE - Ready for Python execution\n=====================================\nRun a Python file to see output here.'}
                        </div>
                      </div>
                    )}
                    {bottomActiveTab === 'terminal' && isTerminalEnabled && (
                      <TerminalComponent 
                        isActive={bottomActiveTab === 'terminal'}
                        sessionId={sessionId}
                        isConnected={isConnected}
                        terminalOutput={terminalOutput}
                        onSendCommand={handleSendTerminalCommand}
                        onCreateSession={handleCreatePythonSession}
                      />
                    )}
                  </div>
                </div>
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl z-[60]">
          <div className="h-full flex flex-col">
            {/* Settings Header */}
            <div className="h-12 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">IDE Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <X size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Editor Settings */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Editor</h3>
                
                {/* Font Size */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Size: {ideSettings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={ideSettings.fontSize}
                    onChange={(e) => setIdeSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>10px</span>
                    <span>24px</span>
                  </div>
                </div>

                {/* Font Family */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</label>
                  <select
                    value={ideSettings.fontFamily}
                    onChange={(e) => setIdeSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Monaco, Menlo, 'Ubuntu Mono', monospace">Monaco</option>
                    <option value="'Fira Code', 'Cascadia Code', Consolas, monospace">Fira Code</option>
                    <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                    <option value="'Source Code Pro', monospace">Source Code Pro</option>
                    <option value="Consolas, monospace">Consolas</option>
                  </select>
                </div>

                {/* Tab Size */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tab Size: {ideSettings.tabSize}
                  </label>
                  <select
                    value={ideSettings.tabSize}
                    onChange={(e) => setIdeSettings(prev => ({ ...prev, tabSize: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>

                {/* Word Wrap */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={ideSettings.wordWrap}
                      onChange={(e) => setIdeSettings(prev => ({ ...prev, wordWrap: e.target.checked }))}
                      className="mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable word wrap</span>
                  </label>
                </div>

                {/* Line Numbers */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={ideSettings.lineNumbers}
                      onChange={(e) => setIdeSettings(prev => ({ ...prev, lineNumbers: e.target.checked }))}
                      className="mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show line numbers</span>
                  </label>
                </div>

                {/* Minimap */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={ideSettings.minimap}
                      onChange={(e) => setIdeSettings(prev => ({ ...prev, minimap: e.target.checked }))}
                      className="mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show minimap</span>
                  </label>
                </div>
              </div>

              {/* Auto-Save Settings */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Auto-Save</h3>
                
                {/* Enable Auto-Save */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={ideSettings.autoSave}
                      onChange={(e) => setIdeSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                      className="mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable auto-save</span>
                  </label>
                </div>

                {/* Auto-Save Delay */}
                {ideSettings.autoSave && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Auto-save delay: {ideSettings.autoSaveDelay}s
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={ideSettings.autoSaveDelay}
                      onChange={(e) => setIdeSettings(prev => ({ ...prev, autoSaveDelay: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>5s</span>
                      <span>30s</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Reset to Defaults */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => {
                    setIdeSettings({
                      fontSize: 14,
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      autoSave: true,
                      autoSaveDelay: 10,
                      tabSize: 2,
                      wordWrap: false,
                      minimap: true,
                      lineNumbers: true,
                      theme: 'vs-dark',
                    });
                  }}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Overlay */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-[59]"
          onClick={() => setShowSettings(false)}
        />
      )}
    </div>
    </>
  );
};

export default IDEPage;