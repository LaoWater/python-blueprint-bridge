import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useGroupProjects } from '@/hooks/useGroupProjects';

interface GroupProjectContextType {
  userParticipation: any;
  setUserParticipation: (participation: any) => void;
  refreshUserParticipation: (projectId: string) => Promise<void>;
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
  const [userParticipation, setUserParticipation] = useState<any>(null);
  const { user } = useAuth();
  const { getUserParticipation } = useGroupProjects();

  const refreshUserParticipation = async (currentProjectId: string) => {
    if (user?.id) {
      const participation = await getUserParticipation(currentProjectId);
      setUserParticipation(participation);
    }
  };

  useEffect(() => {
    if (projectId) {
      refreshUserParticipation(projectId);
    }
  }, [projectId, user?.id]);

  return (
    <GroupProjectContext.Provider
      value={{
        userParticipation,
        setUserParticipation,
        refreshUserParticipation,
      }}
    >
      {children}
    </GroupProjectContext.Provider>
  );
};