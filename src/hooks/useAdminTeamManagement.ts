import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useGroupProjects, ProjectTeam } from './useGroupProjects';

/**
 * Reusable hook for admin team management across all group projects
 * Handles state and operations for creating, editing, and deleting teams
 */
export const useAdminTeamManagement = (projectId: string | undefined) => {
  const [adminEditMode, setAdminEditMode] = useState(false);
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('edit');
  const [selectedTeamForEdit, setSelectedTeamForEdit] = useState<ProjectTeam | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<string | null>(null);

  const { updateTeam, createTeam, deleteTeam, fetchTeamsWithMembers } = useGroupProjects();

  const handleCreateTeam = useCallback(() => {
    setEditorMode('create');
    setSelectedTeamForEdit(null);
    setEditorModalOpen(true);
  }, []);

  const handleEditTeam = useCallback((team: ProjectTeam) => {
    setEditorMode('edit');
    setSelectedTeamForEdit(team);
    setEditorModalOpen(true);
  }, []);

  const handleSaveTeam = useCallback(async (teamId: string | null, teamData: Partial<ProjectTeam>) => {
    if (!projectId) return;

    try {
      if (teamId) {
        // Update existing team
        const result = await updateTeam(teamId, teamData);
        if (result.success) {
          toast.success('Team updated successfully!');
          fetchTeamsWithMembers(projectId);
          setEditorModalOpen(false);
        } else {
          toast.error('Failed to update team');
        }
      } else {
        // Create new team
        const result = await createTeam(projectId, teamData as any);
        if (result.success) {
          toast.success('Team created successfully!');
          fetchTeamsWithMembers(projectId);
          setEditorModalOpen(false);
        } else {
          toast.error('Failed to create team');
        }
      }
    } catch (err) {
      toast.error('An error occurred while saving the team');
    }
  }, [projectId, updateTeam, createTeam, fetchTeamsWithMembers]);

  const handleDeleteTeam = useCallback(async (teamId: string, teamName: string) => {
    if (!confirm(`Are you sure you want to delete "${teamName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingTeam(teamId);
    try {
      const result = await deleteTeam(teamId);
      if (result.success) {
        toast.success('Team deleted successfully');
        if (projectId) {
          fetchTeamsWithMembers(projectId);
        }
      } else {
        toast.error(result.error || 'Failed to delete team');
      }
    } catch (err) {
      toast.error('An error occurred while deleting the team');
    } finally {
      setDeletingTeam(null);
    }
  }, [projectId, deleteTeam, fetchTeamsWithMembers]);

  const toggleAdminEditMode = useCallback(() => {
    setAdminEditMode(prev => !prev);
  }, []);

  return {
    // State
    adminEditMode,
    editorModalOpen,
    editorMode,
    selectedTeamForEdit,
    deletingTeam,

    // Actions
    handleCreateTeam,
    handleEditTeam,
    handleSaveTeam,
    handleDeleteTeam,
    toggleAdminEditMode,
    setEditorModalOpen
  };
};
