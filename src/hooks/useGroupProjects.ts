import { useState, useEffect, useCallback, useRef } from 'react';
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
  votes_up: number;
  votes_down: number;
  vote_score: number;
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
  deliverables: string[];
  required_skills: string[];
  team_vibe: string;
  sort_order: number;
}

export interface TeamMember {
  user_id: string;
  username: string;
  role: string;
  joined_at: string;
  contribution_score: number;
  admin_level?: number;
  avatar_url?: string;
  avatar_data?: {
    type: 'url' | 'initials';
    value: string;
  };
}

export interface ProjectTeamWithMembers extends ProjectTeam {
  members: TeamMember[];
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
  const [teamsWithMembers, setTeamsWithMembers] = useState<ProjectTeamWithMembers[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Prevent infinite loops with request tracking
  const fetchingRef = useRef<Set<string>>(new Set());
  const retryCountRef = useRef<Map<string, number>>(new Map());
  const maxRetries = 3;
  const retryDelay = 1000;

  // Helper function to handle retries
  const withRetry = async (key: string, fn: () => Promise<any>) => {
    if (fetchingRef.current.has(key)) {
      return; // Already fetching
    }

    fetchingRef.current.add(key);
    const retries = retryCountRef.current.get(key) || 0;

    try {
      const result = await fn();
      retryCountRef.current.delete(key);
      return result;
    } catch (err) {
      if (retries < maxRetries) {
        retryCountRef.current.set(key, retries + 1);
        setTimeout(() => withRetry(key, fn), retryDelay * (retries + 1));
      } else {
        console.error(`Failed after ${maxRetries} retries:`, err);
        retryCountRef.current.delete(key);
        throw err;
      }
    } finally {
      fetchingRef.current.delete(key);
    }
  };

  // Fetch all group projects
  const fetchProjects = async () => {
    try {
      await withRetry('projects', async () => {
        const { data, error } = await supabase
          .from('group_projects')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      });
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Network error - using offline mode');
      // Set default projects for offline mode
      setProjects([
        {
          id: 'wellness-oracle',
          name: 'Personal Wellness Oracle',
          description: 'Your AI wellness companion that discovers patterns in your daily diary entries',
          project_type: 'ai_wellness',
          difficulty_level: 5,
          max_participants: 32,
          current_participants: 0,
          status: 'active',
          project_data: {},
          votes_up: 0,
          votes_down: 0,
          vote_score: 0
        },
        {
          id: 'ai-study-buddy',
          name: 'AI Study Buddy',
          description: 'Personal tutor that adapts to your learning style',
          project_type: 'ai_education',
          difficulty_level: 5,
          max_participants: 32,
          current_participants: 0,
          status: 'active',
          project_data: {},
          votes_up: 0,
          votes_down: 0,
          vote_score: 0
        },
        {
          id: 'dj-blue',
          name: 'DJ BlueAI',
          description: 'Mood-adaptive music assistant',
          project_type: 'ai_music',
          difficulty_level: 4,
          max_participants: 24,
          current_participants: 0,
          status: 'active',
          project_data: {},
          votes_up: 0,
          votes_down: 0,
          vote_score: 0
        }
      ]);
    }
  };

  // Fetch teams for a specific project
  const fetchTeams = async (projectId: string) => {
    try {
      await withRetry(`teams-${projectId}`, async () => {
        const { data, error } = await supabase
          .from('project_teams')
          .select('*')
          .eq('project_id', projectId)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setTeams((data as any) || []);
      });
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Teams temporarily unavailable');
      // Set empty teams for now
      setTeams([]);
    }
  };

  // NEW: Fetch teams WITH all their members in ONE efficient call
  // This prevents thousands of API requests by fetching everything at once
  const fetchTeamsWithMembers = useCallback(async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_project_teams_with_members', { p_project_id: projectId });

      if (error) throw error;

      // Transform the data to match our interface
      const teamsData: ProjectTeamWithMembers[] = (data || []).map((team: any) => ({
        id: team.team_id,
        project_id: projectId,
        name: team.team_name,
        description: team.team_description,
        icon: team.team_icon,
        color_scheme: team.team_color_scheme,
        max_members: team.team_max_members,
        current_members: team.team_current_members,
        difficulty_stars: team.team_difficulty_stars,
        mission: team.team_mission,
        tasks: team.team_tasks || [],
        deliverables: team.team_deliverables || [],
        required_skills: team.team_required_skills || [],
        team_vibe: team.team_vibe,
        sort_order: team.team_sort_order,
        members: team.members || []
      }));

      setTeamsWithMembers(teamsData);

      // Also populate the regular teams state for backwards compatibility
      setTeams(teamsData.map(({ members, ...team }) => team));

      // Populate teamMembers cache for individual team access
      const membersCache: Record<string, TeamMember[]> = {};
      teamsData.forEach(team => {
        membersCache[team.id] = team.members;
      });
      setTeamMembers(membersCache);

      return teamsData;
    } catch (err) {
      console.error('Error fetching teams with members:', err);
      setError('Teams temporarily unavailable');
      setTeamsWithMembers([]);
      setTeams([]);
      return [];
    }
  }, []);

  // Fetch team members
  const fetchTeamMembers = useCallback(async (teamId: string) => {
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
  }, []);

  // Fetch available users
  const fetchAvailableUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_available_users');

      if (error) throw error;
      setAvailableUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, []);

  // Update team member counts for multi-team membership
  const updateTeamCounts = useCallback((teamId: string, increment: boolean) => {
    setTeams(prevTeams => prevTeams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          current_members: increment
            ? team.current_members + 1
            : Math.max(0, team.current_members - 1)
        };
      }
      return team;
    }));
  }, []);

  // Join a project team
  const joinTeam = useCallback(async (projectId: string, teamId?: string) => {
    console.log('🔍 useGroupProjects - joinTeam called:', {
      projectId,
      teamId,
      userId: user?.id,
      userEmail: user?.email
    });

    if (!user) {
      console.error('❌ useGroupProjects - No user authenticated');
      setError('You must be logged in to join a team');
      return { success: false, error: 'You must be logged in to join a team' };
    }

    try {
      console.log('📤 useGroupProjects - Calling join_project_team RPC...');
      const { data, error } = await supabase
        .rpc('join_project_team', {
          p_project_id: projectId,
          p_team_id: teamId
        });

      console.log('📥 useGroupProjects - RPC Response:', { data, error });

      if (error) {
        console.error('❌ useGroupProjects - Supabase error:', error);
        throw error;
      }

      const result = data as { success: boolean; error?: string; message?: string };
      console.log('📋 useGroupProjects - Parsed result:', result);

      if (!result.success) {
        console.error('❌ useGroupProjects - Join failed:', result.error);
        setError(result.error || 'Failed to join team');
        return { success: false, error: result.error || 'Failed to join team' };
      }

      console.log('✅ useGroupProjects - Join successful, refreshing teams...');
      // Automatically refresh teams after successful join
      await fetchTeams(projectId);

      return { success: true, teamId };
    } catch (err) {
      console.error('💥 useGroupProjects - Exception in joinTeam:', err);
      setError('Failed to join team');
      return { success: false, error: 'Failed to join team' };
    }
  }, [user, fetchTeams]);

  // Leave a project team
  const leaveTeam = useCallback(async (projectId: string, teamId: string) => {
    console.log('🔍 Leave Team Debug:', { projectId, teamId, userId: user?.id });

    if (!user) {
      console.error('❌ No user authenticated');
      setError('You must be logged in to leave a team');
      return { success: false, error: 'You must be logged in to leave a team' };
    }

    try {
      console.log('📤 Calling leave_project_team RPC...');
      const { data, error } = await supabase
        .rpc('leave_project_team', {
          p_project_id: projectId,
          p_team_id: teamId
        });

      console.log('📥 RPC Response:', { data, error });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      const result = data as { success: boolean; error?: string; message?: string };
      console.log('📋 Result parsed:', result);

      if (!result.success) {
        console.error('❌ Leave team failed:', result.error);
        setError(result.error || 'Failed to leave team');
        return { success: false, error: result.error || 'Failed to leave team' };
      }

      console.log('✅ Successfully left team, refreshing teams...');
      // Automatically refresh teams after successful leave
      await fetchTeams(projectId);

      return { success: true, teamId };
    } catch (err) {
      console.error('❌ Exception in leaveTeam:', err);
      setError('Failed to leave team');
      return { success: false, error: 'Failed to leave team' };
    }
  }, [user, fetchTeams]);

  // Get user's teams for a project
  const getUserTeams = useCallback(async (projectId: string) => {
    if (!user?.id) return [];

    try {
      return await withRetry(`user-teams-${projectId}`, async () => {
        const { data, error } = await supabase
          .rpc('get_user_teams', { p_project_id: projectId });

        if (error) {
          throw error;
        }
        return data || [];
      });
    } catch (err) {
      console.error('Error fetching user teams:', err);
      return [];
    }
  }, [user?.id]);

  // Check if user is in a specific team
  const isUserInTeam = useCallback(async (projectId: string, teamId: string) => {
    if (!user?.id) return false;

    try {
      const { data, error } = await supabase
        .from('project_participants')
        .select('id')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .eq('team_id', teamId)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('Error checking team membership:', error);
        return false;
      }
      return !!data;
    } catch (err) {
      console.error('Error checking team membership:', err);
      return false;
    }
  }, [user?.id]);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await fetchProjects();
      await fetchAvailableUsers();
      setLoading(false);
    };

    initializeData();
  }, []);

  // Cast a vote for a project
  const castVote = useCallback(async (projectId: string, voteType: 'up' | 'down') => {
    if (!user) {
      setError('You must be logged in to vote');
      return false;
    }

    try {
      const { data, error } = await supabase
        .rpc('cast_project_vote', {
          p_project_id: projectId,
          p_vote_type: voteType
        });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; message?: string };

      if (!result.success) {
        setError(result.error || 'Failed to cast vote');
        return false;
      }

      // Refresh projects to get updated vote counts
      await fetchProjects();

      return true;
    } catch (err) {
      console.error('Error casting vote:', err);
      setError('Failed to cast vote');
      return false;
    }
  }, [user, fetchProjects]);

  // Remove a vote for a project
  const removeVote = useCallback(async (projectId: string) => {
    if (!user) {
      setError('You must be logged in to remove vote');
      return false;
    }

    try {
      const { data, error } = await supabase
        .rpc('remove_project_vote', {
          p_project_id: projectId
        });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; message?: string };

      if (!result.success) {
        setError(result.error || 'Failed to remove vote');
        return false;
      }

      // Refresh projects to get updated vote counts
      await fetchProjects();

      return true;
    } catch (err) {
      console.error('Error removing vote:', err);
      setError('Failed to remove vote');
      return false;
    }
  }, [user, fetchProjects]);

  // Get user's vote for a project
  const getUserVote = useCallback(async (projectId: string) => {
    if (!user?.id) return null;

    try {
      const { data, error } = await supabase
        .rpc('get_user_project_vote', {
          p_project_id: projectId
        });

      if (error) throw error;

      return data && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error('Error getting user vote:', err);
      return null;
    }
  }, [user?.id]);

  // ADMIN FUNCTIONS - for managing project teams

  // Update a team (admin only)
  const updateTeam = useCallback(async (teamId: string, updates: Partial<ProjectTeam>) => {
    try {
      const { data, error } = await supabase
        .from('project_teams')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', teamId)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setTeams(prevTeams =>
        prevTeams.map(team => team.id === teamId ? { ...team, ...updates } : team)
      );

      return { success: true, data };
    } catch (err) {
      console.error('Error updating team:', err);
      setError('Failed to update team');
      return { success: false, error: err };
    }
  }, []);

  // Create a new team (admin only)
  const createTeam = useCallback(async (projectId: string, teamData: Omit<ProjectTeam, 'id' | 'created_at' | 'updated_at' | 'current_members'>) => {
    try {
      const { data, error } = await supabase
        .from('project_teams')
        .insert({
          project_id: projectId,
          ...teamData,
          current_members: 0,
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      setTeams(prevTeams => [...prevTeams, data as ProjectTeam]);

      return { success: true, data };
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create team');
      return { success: false, error: err };
    }
  }, []);

  // Delete a team (admin only)
  const deleteTeam = useCallback(async (teamId: string) => {
    try {
      // Check if team has members
      const { data: participants, error: checkError } = await supabase
        .from('project_participants')
        .select('id')
        .eq('team_id', teamId)
        .eq('status', 'active');

      if (checkError) throw checkError;

      if (participants && participants.length > 0) {
        return {
          success: false,
          error: 'Cannot delete team with active members. Please remove all members first.'
        };
      }

      const { error } = await supabase
        .from('project_teams')
        .delete()
        .eq('id', teamId);

      if (error) throw error;

      // Remove from local state
      setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));

      return { success: true };
    } catch (err) {
      console.error('Error deleting team:', err);
      setError('Failed to delete team');
      return { success: false, error: err };
    }
  }, []);

  return {
    projects,
    teams,
    teamMembers,
    teamsWithMembers,
    availableUsers,
    loading,
    error,
    fetchProjects,
    fetchTeams,
    fetchTeamsWithMembers,
    fetchTeamMembers,
    fetchAvailableUsers,
    joinTeam,
    leaveTeam,
    getUserTeams,
    isUserInTeam,
    updateTeamCounts,
    castVote,
    removeVote,
    getUserVote,
    // Admin functions
    updateTeam,
    createTeam,
    deleteTeam,
    clearError: () => setError(null)
  };
};