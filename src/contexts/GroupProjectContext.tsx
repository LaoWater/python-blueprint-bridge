import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserTeam {
  team_id: string;
  team_name: string;
  team_icon: string;
  team_color_scheme: string;
  joined_at: string;
}

interface GroupProjectContextType {
  userTeams: UserTeam[];
  setUserTeams: (teams: UserTeam[]) => void;
  refreshUserTeams: (projectId: string) => Promise<void>;
  isInTeam: (teamId: string) => boolean;
  isLoading: boolean;
}

const GroupProjectContext = createContext<GroupProjectContextType | undefined>(undefined);

export const useGroupProjectContext = () => {
  const context = useContext(GroupProjectContext);
  if (!context) {
    throw new Error('useGroupProjectContext must be used within a GroupProjectProvider');
  }
  return context;
};

interface GroupProjectProviderProps {
  children: ReactNode;
  projectId: string;
}

export const GroupProjectProvider: React.FC<GroupProjectProviderProps> = ({ children, projectId }) => {
  const [userTeams, setUserTeams] = useState<UserTeam[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const cacheRef = useRef<Map<string, { data: UserTeam[]; timestamp: number }>>(new Map());
  const fetchingRef = useRef<Set<string>>(new Set());
  const CACHE_DURATION = 30000; // 30 seconds cache

  const refreshUserTeams = useCallback(async (currentProjectId: string) => {
    if (!user?.id) return;

    const cacheKey = `${user.id}-${currentProjectId}`;
    
    // Check if already fetching
    if (fetchingRef.current.has(cacheKey)) {
      return;
    }

    // Check cache
    const cached = cacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setUserTeams(cached.data);
      return;
    }

    // Mark as fetching
    fetchingRef.current.add(cacheKey);
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .rpc('get_user_teams', { p_project_id: currentProjectId });

      if (error) throw error;

      const teams = data || [];
      setUserTeams(teams);
      cacheRef.current.set(cacheKey, { data: teams, timestamp: Date.now() });
    } catch (err) {
      console.error('Error fetching user teams:', err);
    } finally {
      fetchingRef.current.delete(cacheKey);
      setIsLoading(false);
    }
  }, [user?.id]);

  const isInTeam = useCallback((teamId: string) => {
    return userTeams.some(team => team.team_id === teamId);
  }, [userTeams]);

  useEffect(() => {
    if (projectId && user?.id) {
      refreshUserTeams(projectId);
    }
  }, [projectId, user?.id, refreshUserTeams]);

  return (
    <GroupProjectContext.Provider
      value={{
        userTeams,
        setUserTeams,
        refreshUserTeams,
        isInTeam,
        isLoading,
      }}
    >
      {children}
    </GroupProjectContext.Provider>
  );
};