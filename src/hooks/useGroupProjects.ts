import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';

export interface GroupProject {
  id: string;
  name: string;
  description: string;
  project_type: string;
  difficulty_level: number;
  max_participants: number;
  current_participants: number;
  status: string;
  project_data: any;
}

export interface ProjectTeam {
  id: string;
  project_id: string;
  name: string;
  description: string;
  icon: string;
  color_scheme: string;
  max_members: number;
  current_members: number;
  difficulty_stars: number;
  mission: string;
  tasks: string[];
  team_vibe: string;
  sort_order: number;
}

export interface TeamMember {
  user_id: string;
  username: string;
  role: string;
  joined_at: string;
  contribution_score: number;
}

export interface User {
  id: string;
  username: string;
  admin_level: number;
  created_at: string;
}

export const useGroupProjects = () => {
  const [projects, setProjects] = useState<GroupProject[]>([]);
  const [teams, setTeams] = useState<ProjectTeam[]>([]);
  const [teamMembers, setTeamMembers] = useState<Record<string, TeamMember[]>>({});
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all group projects
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('group_projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
    }
  };

  // Fetch teams for a specific project
  const fetchTeams = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('project_teams')
        .select('*')
        .eq('project_id', projectId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTeams(data || []);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to fetch teams');
    }
  };

  // Fetch team members
  const fetchTeamMembers = async (teamId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_team_members', { p_team_id: teamId });

      if (error) throw error;
      setTeamMembers(prev => ({
        ...prev,
        [teamId]: data || []
      }));
    } catch (err) {
      console.error('Error fetching team members:', err);
    }
  };

  // Fetch available users
  const fetchAvailableUsers = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_available_users');

      if (error) throw error;
      setAvailableUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Join a project team
  const joinTeam = async (projectId: string, teamId?: string) => {
    if (!user) {
      setError('You must be logged in to join a team');
      return false;
    }

    try {
      const { data, error } = await supabase
        .rpc('join_project_team', {
          p_project_id: projectId,
          p_team_id: teamId
        });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; message?: string };

      if (!result.success) {
        setError(result.error || 'Failed to join team');
        return false;
      }

      // Refresh data
      await fetchProjects();
      if (teamId) {
        await fetchTeamMembers(teamId);
      }

      return true;
    } catch (err) {
      console.error('Error joining team:', err);
      setError('Failed to join team');
      return false;
    }
  };

  // Get user's participation status for a project
  const getUserParticipation = async (projectId: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('project_participants')
        .select('*')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (err) {
      console.error('Error fetching user participation:', err);
      return null;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await fetchProjects();
      await fetchAvailableUsers();
      setLoading(false);
    };

    initializeData();
  }, []);

  return {
    projects,
    teams,
    teamMembers,
    availableUsers,
    loading,
    error,
    fetchProjects,
    fetchTeams,
    fetchTeamMembers,
    fetchAvailableUsers,
    joinTeam,
    getUserParticipation,
    clearError: () => setError(null)
  };
};