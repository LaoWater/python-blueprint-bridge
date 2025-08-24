import { supabase } from '@/integrations/supabase/client';

// Types matching our database schema
export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FileSystemItem {
  id: string;
  project_id: string;
  user_id: string;
  parent_id?: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  language?: string;
  encoding?: string;
  size_bytes: number;
  is_binary: boolean;
  is_readonly: boolean;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  sort_order: number;
  children?: FileSystemItem[];
  expanded?: boolean;
}

export interface FileHistory {
  id: string;
  file_id: string;
  user_id: string;
  version_number: number;
  content: string;
  change_description?: string;
  size_bytes: number;
  created_at: string;
}

export interface RecentFile {
  id: string;
  user_id: string;
  file_id: string;
  last_opened_at: string;
  open_count: number;
  file?: FileSystemItem;
}

class ExplorerService {
  // ============================================================
  // PROJECT MANAGEMENT
  // ============================================================

  async getActiveProject(): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching active project:', error);
      throw error;
    }

    return data;
  }

  async createProject(name: string, description?: string): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        is_active: true, // New project becomes active
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }

    // Create default project structure
    await this.createDefaultProjectStructure(data.id);

    return data;
  }

  async getUserProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data || [];
  }

  async setActiveProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update({ is_active: true })
      .eq('id', projectId);

    if (error) {
      console.error('Error setting active project:', error);
      throw error;
    }
  }

  private async createDefaultProjectStructure(projectId: string): Promise<void> {
    const { error } = await supabase.rpc('create_default_project_structure', {
      project_uuid: projectId,
    });

    if (error) {
      console.error('Error creating default project structure:', error);
      throw error;
    }
  }

  // ============================================================
  // FILE SYSTEM OPERATIONS
  // ============================================================

  async getFileTree(projectId?: string): Promise<FileSystemItem[]> {
    let targetProjectId = projectId;
    
    if (!targetProjectId) {
      const activeProject = await this.getActiveProject();
      if (!activeProject) {
        return [];
      }
      targetProjectId = activeProject.id;
    }

    const { data, error } = await supabase.rpc('get_file_tree', {
      project_uuid: targetProjectId,
    });

    if (error) {
      console.error('Error fetching file tree:', error);
      throw error;
    }

    // Convert flat list to hierarchical structure
    return this.buildFileTree(data || []);
  }

  private buildFileTree(flatItems: any[]): FileSystemItem[] {
    const itemMap = new Map<string, FileSystemItem>();
    const rootItems: FileSystemItem[] = [];

    // First pass: create all items
    flatItems.forEach(item => {
      const fileItem: FileSystemItem = {
        id: item.id,
        project_id: item.project_id,
        user_id: item.user_id,
        parent_id: item.parent_id,
        name: item.name,
        type: item.type,
        path: item.path,
        content: item.content,
        language: item.language || 'plaintext',
        encoding: item.encoding || 'utf-8',
        size_bytes: item.size_bytes || 0,
        is_binary: item.is_binary || false,
        is_readonly: item.is_readonly || false,
        is_hidden: item.is_hidden || false,
        created_at: item.created_at,
        updated_at: item.updated_at,
        last_accessed_at: item.last_accessed_at,
        sort_order: item.sort_order || 0,
        children: [],
        expanded: false,
      };
      itemMap.set(item.id, fileItem);
    });

    // Second pass: build hierarchy
    itemMap.forEach(item => {
      if (item.parent_id && itemMap.has(item.parent_id)) {
        const parent = itemMap.get(item.parent_id)!;
        parent.children = parent.children || [];
        parent.children.push(item);
      } else {
        rootItems.push(item);
      }
    });

    // Sort children in each folder
    const sortItems = (items: FileSystemItem[]) => {
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          item.children.sort((a, b) => {
            // Folders first, then by sort_order, then by name
            if (a.type !== b.type) {
              return a.type === 'folder' ? -1 : 1;
            }
            if (a.sort_order !== b.sort_order) {
              return a.sort_order - b.sort_order;
            }
            return a.name.localeCompare(b.name);
          });
          sortItems(item.children);
        }
      });
    };

    sortItems(rootItems);
    return rootItems.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      if (a.sort_order !== b.sort_order) {
        return a.sort_order - b.sort_order;
      }
      return a.name.localeCompare(b.name);
    });
  }

  async getFileContent(fileId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('file_system_items')
      .select('content, last_accessed_at')
      .eq('id', fileId)
      .eq('type', 'file')
      .single();

    if (error) {
      console.error('Error fetching file content:', error);
      throw error;
    }

    // Update last accessed time
    await this.updateLastAccessed(fileId);

    return data?.content || null;
  }

  async updateFileContent(fileId: string, content: string): Promise<void> {
    const { error } = await supabase
      .from('file_system_items')
      .update({
        content,
        size_bytes: new Blob([content]).size,
        updated_at: new Date().toISOString(),
      })
      .eq('id', fileId)
      .eq('type', 'file');

    if (error) {
      console.error('Error updating file content:', error);
      throw error;
    }
  }

  async createFile(
    name: string,
    parentId: string | null,
    content: string = '',
    language: string = 'plaintext'
  ): Promise<FileSystemItem> {
    const activeProject = await this.getActiveProject();
    if (!activeProject) {
      throw new Error('No active project found');
    }

    const { data, error } = await supabase
      .from('file_system_items')
      .insert({
        project_id: activeProject.id,
        parent_id: parentId,
        name,
        type: 'file',
        content,
        language,
        size_bytes: new Blob([content]).size,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating file:', error);
      throw error;
    }

    return data;
  }

  async createFolder(name: string, parentId: string | null): Promise<FileSystemItem> {
    const activeProject = await this.getActiveProject();
    if (!activeProject) {
      throw new Error('No active project found');
    }

    const { data, error } = await supabase
      .from('file_system_items')
      .insert({
        project_id: activeProject.id,
        parent_id: parentId,
        name,
        type: 'folder',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating folder:', error);
      throw error;
    }

    return data;
  }

  async renameItem(itemId: string, newName: string): Promise<void> {
    const { error } = await supabase
      .from('file_system_items')
      .update({ name: newName })
      .eq('id', itemId);

    if (error) {
      console.error('Error renaming item:', error);
      throw error;
    }
  }

  async deleteItem(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('file_system_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  async moveItem(itemId: string, newParentId: string | null): Promise<void> {
    const { error } = await supabase
      .from('file_system_items')
      .update({ parent_id: newParentId })
      .eq('id', itemId);

    if (error) {
      console.error('Error moving item:', error);
      throw error;
    }
  }

  private async updateLastAccessed(fileId: string): Promise<void> {
    const { error } = await supabase
      .from('file_system_items')
      .update({ last_accessed_at: new Date().toISOString() })
      .eq('id', fileId);

    if (error) {
      console.error('Error updating last accessed time:', error);
    }
  }

  // ============================================================
  // FILE HISTORY
  // ============================================================

  async getFileHistory(fileId: string): Promise<FileHistory[]> {
    const { data, error } = await supabase
      .from('file_history')
      .select('*')
      .eq('file_id', fileId)
      .order('version_number', { ascending: false });

    if (error) {
      console.error('Error fetching file history:', error);
      throw error;
    }

    return data || [];
  }

  // ============================================================
  // RECENT FILES
  // ============================================================

  async getRecentFiles(limit: number = 10): Promise<RecentFile[]> {
    const { data, error } = await supabase
      .from('recent_files')
      .select(`
        *,
        file:file_system_items(*)
      `)
      .order('last_opened_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent files:', error);
      throw error;
    }

    return data || [];
  }

  // ============================================================
  // SEARCH
  // ============================================================

  async searchFiles(query: string, projectId?: string): Promise<FileSystemItem[]> {
    let targetProjectId = projectId;
    
    if (!targetProjectId) {
      const activeProject = await this.getActiveProject();
      if (!activeProject) {
        return [];
      }
      targetProjectId = activeProject.id;
    }

    const { data, error } = await supabase
      .from('file_system_items')
      .select('*')
      .eq('project_id', targetProjectId)
      .or(`name.ilike.%${query}%,content.ilike.%${query}%`)
      .eq('type', 'file')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error searching files:', error);
      throw error;
    }

    return data || [];
  }
}

// Export singleton instance
export const explorerService = new ExplorerService();