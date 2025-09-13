import React, { useState, useEffect } from 'react';
import { Users, Plus, Check, AlertCircle, Mic, FileAudio, Brain, Sparkles, Headphones, Volume2, Palette, Puzzle } from 'lucide-react';
import { ProjectTeam, TeamMember, useGroupProjects } from '@/hooks/useGroupProjects';
import { useAuth } from '@/components/AuthContext';
import { useGroupProjectContext } from '@/contexts/GroupProjectContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TeamCardProps {
  team: ProjectTeam;
  projectId: string;
}

export default function TeamCard({ team, projectId }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isJoining, setIsJoining] = useState(false);
  const { fetchTeamMembers, teamMembers, joinTeam, updateTeamCounts } = useGroupProjects();
  const { user } = useAuth();
  const { userParticipation, setUserParticipation } = useGroupProjectContext();

  // Get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'Mic': Mic,
      'FileAudio': FileAudio,
      'Brain': Brain,
      'Sparkles': Sparkles,
      'Headphones': Headphones,
      'Volume2': Volume2,
      'Palette': Palette,
      'Puzzle': Puzzle,
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Users className="w-8 h-8" />;
  };

  useEffect(() => {
    if (expanded && !teamMembers[team.id]) {
      fetchTeamMembers(team.id);
    }
  }, [expanded, team.id]); // Removed fetchTeamMembers from dependencies

  useEffect(() => {
    setMembers(teamMembers[team.id] || []);
  }, [teamMembers, team.id]);

  const handleJoinTeam = async () => {
    if (!user) {
      toast.error('Please log in to join a team');
      return;
    }

    if (team.current_members >= team.max_members) {
      toast.error('This team is full');
      return;
    }

    setIsJoining(true);

    // Store old team for count updates
    const oldTeamId = userParticipation?.team_id || null;

    const result = await joinTeam(projectId, team.id);

    if (result && result.success) {
      // Optimistically update team member counts
      updateTeamCounts(oldTeamId, team.id);

      // Show appropriate success message
      if (oldTeamId && oldTeamId !== team.id) {
        toast.success(`Successfully switched to ${team.name}!`);
      } else {
        toast.success(`Successfully joined ${team.name}!`);
      }

      // Update local participation state
      setUserParticipation({
        project_id: projectId,
        team_id: team.id,
        user_id: user.id,
        status: 'active',
        role: 'member'
      });

      // Update team members if expanded
      if (expanded) {
        fetchTeamMembers(team.id);
      }
    }

    setIsJoining(false);
  };

  const isUserInThisTeam = userParticipation?.team_id === team.id;
  const isUserInAnotherTeam = userParticipation && userParticipation.team_id !== team.id;
  const teamIsFull = team.current_members >= team.max_members;

  return (
    <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
      <div className={`absolute inset-0 bg-gradient-to-br ${team.color_scheme} opacity-10 rounded-2xl`}></div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${team.color_scheme} rounded-xl`}>
            {getIconComponent(team.icon)}
          </div>
          <div className="text-right">
            <div className="text-2xl">{'⭐'.repeat(team.difficulty_stars)}</div>
            <div className="text-xs text-gray-400">Difficulty</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{team.name}</h3>
        <p className="text-gray-300 mb-4">{team.mission}</p>

        {/* Team Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {team.current_members}/{team.max_members} members
            </span>
          </div>
          {isUserInThisTeam && (
            <div className="flex items-center gap-1 text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-xs">Joined</span>
            </div>
          )}
          {teamIsFull && (
            <div className="flex items-center gap-1 text-orange-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">Full</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left mb-4 text-sm text-purple-300 hover:text-purple-200 transition-colors"
        >
          {expanded ? '▼ Hide Details' : '▶ View Tasks & Members'}
        </button>

        {expanded && (
          <div className="space-y-4 mb-4 animate-in fade-in duration-200">
            {/* Tasks */}
            <div>
              <p className="font-semibold text-sm text-purple-300 mb-2">Team Tasks:</p>
              <ul className="text-sm text-gray-300 space-y-1">
                {team.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Members */}
            <div className="border-t border-purple-500/20 pt-4">
              <p className="font-semibold text-sm text-purple-300 mb-2">Team Members:</p>
              {members.length > 0 ? (
                <div className="space-y-2">
                  {members.map((member) => (
                    <div key={member.user_id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{member.username}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{member.role}</span>
                        {member.contribution_score > 0 && (
                          <span className="text-xs bg-purple-500/20 px-2 py-1 rounded text-purple-300">
                            {member.contribution_score} pts
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No members yet</p>
              )}

              {/* Join Button */}
              <div className="mt-4">
                {!user ? (
                  <p className="text-xs text-gray-400 text-center">
                    Log in to join this team
                  </p>
                ) : isUserInThisTeam ? (
                  <Button disabled className="w-full bg-green-600/50 text-green-200">
                    <Check className="w-4 h-4 mr-2" />
                    Already in this team
                  </Button>
                ) : isUserInAnotherTeam ? (
                  <Button
                    onClick={handleJoinTeam}
                    disabled={isJoining}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {isJoining ? 'Switching...' : 'Switch to this team'}
                  </Button>
                ) : teamIsFull ? (
                  <Button disabled className="w-full bg-gray-600 text-gray-400">
                    Team is full
                  </Button>
                ) : (
                  <Button
                    onClick={handleJoinTeam}
                    disabled={isJoining}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isJoining ? (
                      'Joining...'
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Join This Team
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {team.team_vibe}
        </p>
      </div>
    </div>
  );
}