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
  const [isLeaving, setIsLeaving] = useState(false);
  const { fetchTeamMembers, teamMembers, joinTeam, leaveTeam, updateTeamCounts } = useGroupProjects();
  const { user } = useAuth();
  const { userTeams, isInTeam } = useGroupProjectContext();

  // Calculate team membership info
  const userTeamCount = userTeams.length;
  const canJoinMoreTeams = userTeamCount < 3;
  const isUserInThisTeam = isInTeam(team.id);

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

    if (!canJoinMoreTeams) {
      toast.error('You can only join up to 3 teams');
      return;
    }

    setIsJoining(true);

    const result = await joinTeam(projectId, team.id);

    if (result && result.success) {
      // Optimistically update team member count
      updateTeamCounts(team.id, true);

      toast.success(`Successfully joined ${team.name}!`);

      // Refresh team members if expanded
      if (expanded) {
        fetchTeamMembers(team.id);
      }
    }

    setIsJoining(false);
  };

  const handleLeaveTeam = async () => {
    if (!user) {
      toast.error('Please log in to leave a team');
      return;
    }

    setIsLeaving(true);

    const result = await leaveTeam(projectId, team.id);

    if (result && result.success) {
      // Optimistically update team member count
      updateTeamCounts(team.id, false);

      toast.success(`Successfully left ${team.name}`);

      // Refresh team members if expanded
      if (expanded) {
        fetchTeamMembers(team.id);
      }
    }

    setIsLeaving(false);
  };

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

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                {!user ? (
                  <p className="text-xs text-gray-400 text-center">
                    Log in to join teams
                  </p>
                ) : isUserInThisTeam ? (
                  <>
                    <Button disabled className="w-full bg-green-600/50 text-green-200">
                      <Check className="w-4 h-4 mr-2" />
                      Joined
                    </Button>
                    <Button
                      onClick={handleLeaveTeam}
                      disabled={isLeaving}
                      variant="outline"
                      className="w-full border-red-500/50 text-red-300 hover:bg-red-500/10"
                    >
                      {isLeaving ? 'Leaving...' : 'Leave Team'}
                    </Button>
                  </>
                ) : teamIsFull ? (
                  <Button disabled className="w-full bg-gray-600 text-gray-400">
                    Team is full ({team.current_members}/{team.max_members})
                  </Button>
                ) : !canJoinMoreTeams ? (
                  <Button disabled className="w-full bg-gray-600 text-gray-400">
                    Maximum 3 teams ({userTeamCount}/3)
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
                        Join Team ({userTeamCount}/3)
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