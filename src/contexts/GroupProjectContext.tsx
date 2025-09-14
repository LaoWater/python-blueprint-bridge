import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useGroupProjects } from '@/hooks/useGroupProjects';

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
  const { user } = useAuth();
  const { getUserTeams } = useGroupProjects();

  const refreshUserTeams = async (currentProjectId: string) => {
    if (user?.id) {
      const teams = await getUserTeams(currentProjectId);
      setUserTeams(teams || []);
    }
  };

  const isInTeam = (teamId: string) => {
    return userTeams.some(team => team.team_id === teamId);
  };

  useEffect(() => {
    if (projectId) {
      refreshUserTeams(projectId);
    }
  }, [projectId, user?.id]);

  return (
    <GroupProjectContext.Provider
      value={{
        userTeams,
        setUserTeams,
        refreshUserTeams,
        isInTeam,
      }}
    >
      {children}
    </GroupProjectContext.Provider>
  );
};