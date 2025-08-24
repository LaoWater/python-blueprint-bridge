import { useState, useEffect, useCallback } from 'react';
import { explorerService, FileSystemItem, Project, RecentFile } from '@/services/explorerService';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';

export interface UseExplorerReturn {
  // State
  fileTree: FileSystemItem[];
  activeProject: Project | null;
  currentFile: FileSystemItem | null;
  recentFiles: RecentFile[];
  searchResults: FileSystemItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadFileTree: () => Promise<void>;
  loadFileContent: (fileId: string) => Promise<string | null>;
  updateFileContent: (fileId: string, content: string) => Promise<void>;
  createFile: (name: string, parentId: string | null, content?: string, language?: string) => Promise<void>;
  createFolder: (name: string, parentId: string | null) => Promise<void>;
  renameItem: (itemId: string, newName: string) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;
  moveItem: (itemId: string, newParentId: string | null) => Promise<void>;
  searchFiles: (query: string) => Promise<void>;
  clearSearch: () => void;
  toggleFolder: (folderId: string) => void;
  selectFile: (file: FileSystemItem) => void;
  loadRecentFiles: () => Promise<void>;
}

export const useExplorer = (): UseExplorerReturn => {
  const { user } = useAuth();
  
  // State
  const [fileTree, setFileTree] = useState<FileSystemItem[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentFile, setCurrentFile] = useState<FileSystemItem | null>(null);
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);
  const [searchResults, setSearchResults] = useState<FileSystemItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to handle errors
  const handleError = useCallback((error: any, message: string) => {
    console.error(message, error);
    setError(error.message || message);
    toast.error(error.message || message);
  }, []);

  // Helper function to update file tree item
  const updateFileTreeItem = useCallback((
    tree: FileSystemItem[],
    itemId: string,
    updater: (item: FileSystemItem) => FileSystemItem
  ): FileSystemItem[] => {
    return tree.map(item => {
      if (item.id === itemId) {
        return updater(item);
      }
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: updateFileTreeItem(item.children, itemId, updater)
        };
      }
      return item;
    });
  }, []);

  // Load file tree
  const loadFileTree = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Get active project
      const project = await explorerService.getActiveProject();
      setActiveProject(project);

      if (project) {
        // Get file tree
        const tree = await explorerService.getFileTree(project.id);
        setFileTree(tree);
      } else {
        // No active project, create a default one
        const newProject = await explorerService.createProject(
          'My Blue Pigeon Project',
          'A project for practicing algorithmic thinking'
        );
        setActiveProject(newProject);
        
        // Load the new project's file tree
        const tree = await explorerService.getFileTree(newProject.id);
        setFileTree(tree);
        
        toast.success('Welcome! Created your first Blue Pigeon project.');
      }
    } catch (err) {
      handleError(err, 'Failed to load file tree');
    } finally {
      setIsLoading(false);
    }
  }, [user, handleError]);

  // Load file content
  const loadFileContent = useCallback(async (fileId: string): Promise<string | null> => {
    try {
      return await explorerService.getFileContent(fileId);
    } catch (err) {
      handleError(err, 'Failed to load file content');
      return null;
    }
  }, [handleError]);

  // Update file content
  const updateFileContent = useCallback(async (fileId: string, content: string) => {
    try {
      await explorerService.updateFileContent(fileId, content);
      
      // Update the file tree to reflect changes
      setFileTree(prevTree =>
        updateFileTreeItem(prevTree, fileId, item => ({
          ...item,
          content,
          size_bytes: new Blob([content]).size,
          updated_at: new Date().toISOString()
        }))
      );

      // Update current file if it's the one being edited
      if (currentFile && currentFile.id === fileId) {
        setCurrentFile(prev => prev ? {
          ...prev,
          content,
          size_bytes: new Blob([content]).size,
          updated_at: new Date().toISOString()
        } : null);
      }
    } catch (err) {
      handleError(err, 'Failed to update file content');
    }
  }, [handleError, updateFileTreeItem, currentFile]);

  // Create file
  const createFile = useCallback(async (
    name: string,
    parentId: string | null,
    content: string = '',
    language: string = 'plaintext'
  ) => {
    try {
      const newFile = await explorerService.createFile(name, parentId, content, language);
      
      // Refresh file tree to show the new file
      await loadFileTree();
      
      toast.success(`File "${name}" created successfully`);
    } catch (err) {
      handleError(err, `Failed to create file "${name}"`);
    }
  }, [handleError, loadFileTree]);

  // Create folder
  const createFolder = useCallback(async (name: string, parentId: string | null) => {
    try {
      const newFolder = await explorerService.createFolder(name, parentId);
      
      // Refresh file tree to show the new folder
      await loadFileTree();
      
      toast.success(`Folder "${name}" created successfully`);
    } catch (err) {
      handleError(err, `Failed to create folder "${name}"`);
    }
  }, [handleError, loadFileTree]);

  // Rename item
  const renameItem = useCallback(async (itemId: string, newName: string) => {
    try {
      await explorerService.renameItem(itemId, newName);
      
      // Update the file tree to reflect the rename
      setFileTree(prevTree =>
        updateFileTreeItem(prevTree, itemId, item => ({
          ...item,
          name: newName,
          updated_at: new Date().toISOString()
        }))
      );
      
      toast.success(`Item renamed to "${newName}"`);
    } catch (err) {
      handleError(err, `Failed to rename item to "${newName}"`);
    }
  }, [handleError, updateFileTreeItem]);

  // Delete item
  const deleteItem = useCallback(async (itemId: string) => {
    try {
      await explorerService.deleteItem(itemId);
      
      // Refresh file tree to remove the deleted item
      await loadFileTree();
      
      toast.success('Item deleted successfully');
    } catch (err) {
      handleError(err, 'Failed to delete item');
    }
  }, [handleError, loadFileTree]);

  // Move item
  const moveItem = useCallback(async (itemId: string, newParentId: string | null) => {
    try {
      await explorerService.moveItem(itemId, newParentId);
      
      // Refresh file tree to reflect the move
      await loadFileTree();
      
      toast.success('Item moved successfully');
    } catch (err) {
      handleError(err, 'Failed to move item');
    }
  }, [handleError, loadFileTree]);

  // Search files
  const searchFiles = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const results = await explorerService.searchFiles(query);
      setSearchResults(results);
    } catch (err) {
      handleError(err, 'Failed to search files');
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  // Toggle folder expanded state
  const toggleFolder = useCallback((folderId: string) => {
    setFileTree(prevTree =>
      updateFileTreeItem(prevTree, folderId, item => ({
        ...item,
        expanded: !item.expanded
      }))
    );
  }, [updateFileTreeItem]);

  // Select file
  const selectFile = useCallback((file: FileSystemItem) => {
    setCurrentFile(file);
  }, []);

  // Load recent files
  const loadRecentFiles = useCallback(async () => {
    if (!user) return;

    try {
      const recent = await explorerService.getRecentFiles(10);
      setRecentFiles(recent);
    } catch (err) {
      handleError(err, 'Failed to load recent files');
    }
  }, [user, handleError]);

  // Initialize on mount and user change
  useEffect(() => {
    if (user) {
      loadFileTree();
      loadRecentFiles();
    } else {
      // Reset state when user logs out
      setFileTree([]);
      setActiveProject(null);
      setCurrentFile(null);
      setRecentFiles([]);
      setSearchResults([]);
      setError(null);
    }
  }, [user, loadFileTree, loadRecentFiles]);

  return {
    // State
    fileTree,
    activeProject,
    currentFile,
    recentFiles,
    searchResults,
    isLoading,
    error,

    // Actions
    loadFileTree,
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
    loadRecentFiles,
  };
};