// src/services/syncTrackingAPI.ts
// Service for tracking file sync status and user sessions

import { supabase } from '@/integrations/supabase/client';

export interface SyncStatus {
  id?: string;
  file_id: string;
  user_id: string;
  session_id: string;
  last_synced_at?: string;
  last_modified_at?: string;
  is_synced: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserSession {
  id?: string;
  user_id: string;
  session_id: string;
  pod_name: string;
  status: string;
  created_at?: string;
  last_activity?: string;
  is_active: boolean;
}

export interface ModifiedFile {
  file_id: string;
  file_name: string;
  file_path: string;
  last_modified_at: string;
  needs_sync: boolean;
}

class SyncTrackingAPI {
  // Get or create user session (for pod persistence)
  async getOrCreateUserSession(userId: string): Promise<UserSession | null> {
    try {
      // First, try to find an active session for this user
      const { data: existingSessions, error: fetchError } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('last_activity', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error('Error fetching user sessions:', fetchError);
        return null;
      }

      if (existingSessions && existingSessions.length > 0) {
        const session = existingSessions[0];
        console.log(`Found existing session for user ${userId}: ${session.session_id}`);
        
        // Update last activity
        await this.updateSessionActivity(session.session_id);
        
        return session;
      }

      console.log(`No active session found for user ${userId}`);
      return null;
    } catch (error) {
      console.error('Error in getOrCreateUserSession:', error);
      return null;
    }
  }

  // Create a new user session
  async createUserSession(userId: string, sessionId: string, podName: string, status: string): Promise<UserSession | null> {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userId,
          session_id: sessionId,
          pod_name: podName,
          status: status,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user session:', error);
        return null;
      }

      console.log(`Created new session for user ${userId}: ${sessionId}`);
      return data;
    } catch (error) {
      console.error('Error in createUserSession:', error);
      return null;
    }
  }

  // Update session activity timestamp
  async updateSessionActivity(sessionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({ 
          last_activity: new Date().toISOString(),
          status: 'ready' // Assume ready if we're updating activity
        })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error updating session activity:', error);
      }
    } catch (error) {
      console.error('Error in updateSessionActivity:', error);
    }
  }

  // Deactivate user session (when pod is deleted)
  async deactivateSession(sessionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({ 
          is_active: false,
          status: 'terminated'
        })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error deactivating session:', error);
      } else {
        console.log(`Deactivated session: ${sessionId}`);
      }
    } catch (error) {
      console.error('Error in deactivateSession:', error);
    }
  }

  // Get files that need syncing for a user/session
  async getFilesNeedingSync(userId: string, sessionId: string, fileIds: string[]): Promise<ModifiedFile[]> {
    try {
      console.log('🔍 getFilesNeedingSync called with:');
      console.log('👤 userId:', userId);
      console.log('🔧 sessionId:', sessionId);
      console.log('📄 fileIds:', fileIds);
      
      // Get files from file_system_items table (not content table!)
      const { data: files, error: filesError } = await supabase
        .from('file_system_items')
        .select('id, name, content, updated_at, created_at')
        .in('id', fileIds)
        .eq('type', 'file');
      
      console.log('📊 Files from database:', files?.length || 0, files);

      if (filesError) {
        console.error('Error fetching files:', filesError);
        return [];
      }

      // Then get sync status for these files for this specific user/session
      const { data: syncStatuses, error: syncError } = await supabase
        .from('file_sync_status')
        .select('file_id, last_synced_at, is_synced')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .in('file_id', fileIds);

      if (syncError) {
        console.error('Error fetching sync status:', syncError);
        return [];
      }

      const modifiedFiles: ModifiedFile[] = [];
      const syncStatusMap = new Map();
      
      // Create a map of file_id -> sync status
      syncStatuses?.forEach(status => {
        syncStatusMap.set(status.file_id, status);
      });

      for (const file of files || []) {
        const syncStatus = syncStatusMap.get(file.id);
        
        let needsSync = false;

        if (!syncStatus) {
          // No sync record exists - definitely needs syncing
          needsSync = true;
          console.log(`File ${file.name} has never been synced`);
        } else if (!syncStatus.is_synced) {
          // Sync record exists but marked as failed - needs syncing
          needsSync = true;
          console.log(`File ${file.name} sync previously failed`);
        } else if (syncStatus.last_synced_at) {
          // Check if file was modified after last sync  
          // Use updated_at from file_system_items table
          const fileModifiedAt = new Date(file.updated_at || file.created_at || '').getTime();
          const lastSyncedAt = new Date(syncStatus.last_synced_at).getTime();
          
          if (fileModifiedAt > lastSyncedAt) {
            needsSync = true;
            console.log(`File ${file.name} modified since last sync`);
          }
        }

        if (needsSync) {
          modifiedFiles.push({
            file_id: file.id,
            file_name: file.name || 'Untitled',
            file_path: '', // Will be built from file tree
            last_modified_at: file.updated_at || file.created_at || '',
            needs_sync: true
          });
        }
      }

      console.log(`Found ${modifiedFiles.length} files needing sync for session ${sessionId}`);
      return modifiedFiles;
    } catch (error) {
      console.error('Error in getFilesNeedingSync:', error);
      return [];
    }
  }

  // Update sync status for files
  async updateSyncStatus(userId: string, sessionId: string, fileId: string, success: boolean): Promise<void> {
    try {
      const now = new Date().toISOString();

      // Check if sync status record exists
      const { data: existing, error: fetchError } = await supabase
        .from('file_sync_status')
        .select('id')
        .eq('user_id', userId)
        .eq('session_id', sessionId)
        .eq('file_id', fileId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking existing sync status:', fetchError);
        return;
      }

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('file_sync_status')
          .update({
            last_synced_at: now,
            is_synced: success,
            last_modified_at: now
          })
          .eq('id', existing.id);

        if (error) {
          console.error('Error updating sync status:', error);
        } else {
          console.log(`✅ Updated sync status for file ${fileId}: ${success}`);
        }
      } else {
        // Create new record
        const { error } = await supabase
          .from('file_sync_status')
          .insert({
            file_id: fileId,
            user_id: userId,
            session_id: sessionId,
            last_synced_at: now,
            last_modified_at: now,
            is_synced: success
          });

        if (error) {
          console.error('Error creating sync status:', error);
          console.error('Failed file_id:', fileId);
          console.error('User ID:', userId);
          console.error('Session ID:', sessionId);
        } else {
          console.log(`✅ Created sync status for file ${fileId}: ${success}`);
        }
      }
    } catch (error) {
      console.error('Error in updateSyncStatus:', error);
    }
  }

  // Get sync summary for UI display
  async getSyncSummary(userId: string, sessionId: string): Promise<{
    totalFiles: number;
    syncedFiles: number;
    lastSyncTime: string | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('file_sync_status')
        .select('last_synced_at, is_synced')
        .eq('user_id', userId)
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error fetching sync summary:', error);
        return { totalFiles: 0, syncedFiles: 0, lastSyncTime: null };
      }

      const totalFiles = data?.length || 0;
      const syncedFiles = data?.filter(item => item.is_synced).length || 0;
      const lastSyncTime = data && data.length > 0 
        ? data.reduce((latest, item) => {
            const itemTime = new Date(item.last_synced_at || 0).getTime();
            const latestTime = new Date(latest || 0).getTime();
            return itemTime > latestTime ? item.last_synced_at : latest;
          }, null)
        : null;

      return { totalFiles, syncedFiles, lastSyncTime };
    } catch (error) {
      console.error('Error in getSyncSummary:', error);
      return { totalFiles: 0, syncedFiles: 0, lastSyncTime: null };
    }
  }
}

// Export singleton instance
const syncTrackingAPI = new SyncTrackingAPI();
export default syncTrackingAPI;