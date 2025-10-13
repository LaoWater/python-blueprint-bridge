import React, { useState, useEffect } from 'react';
import { Users, Plus, Check, AlertCircle, Mic, FileAudio, Brain, Sparkles, Headphones, Volume2, Palette, Puzzle, User, Package } from 'lucide-react';
import { ProjectTeam, TeamMember, useGroupProjects, ProjectTeamWithMembers } from '@/hooks/useGroupProjects';
import { useAuth } from '@/components/AuthContext';
import { useGroupProjectContext } from '@/contexts/GroupProjectContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TeamCardProps {
  team: ProjectTeam | ProjectTeamWithMembers;
  projectId: string;
  initialMembers?: TeamMember[];
}

export default function TeamCard({ team, projectId, initialMembers }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>(initialMembers || []);
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

  // Update members when initialMembers change or when fetched
  useEffect(() => {
    if (initialMembers && initialMembers.length > 0) {
      setMembers(initialMembers);
    } else if (teamMembers[team.id]) {
      setMembers(teamMembers[team.id]);
    }
  }, [initialMembers, teamMembers, team.id]);

  // Only fetch if we need to (when expanded and no members cached)
  useEffect(() => {
    if (expanded && !initialMembers && !teamMembers[team.id]) {
      fetchTeamMembers(team.id);
    }
  }, [expanded, team.id, initialMembers]); // Removed fetchTeamMembers from dependencies

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
    <div className="relative bg-card/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-border dark:border-purple-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
      <div className={`absolute inset-0 bg-gradient-to-br ${team.color_scheme} opacity-10 rounded-2xl`}></div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${team.color_scheme} rounded-xl`}>
            {getIconComponent(team.icon)}
          </div>
          <div className="text-right">
            <div className="text-2xl">{'⭐'.repeat(team.difficulty_stars)}</div>
            <div className="text-xs text-muted-foreground dark:text-gray-400">Difficulty</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-foreground">{team.name}</h3>
        <p className="text-muted-foreground dark:text-gray-300 mb-4">{team.mission}</p>

        {/* Team Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
            <span className="text-sm text-muted-foreground dark:text-gray-400">
              {team.current_members}/{team.max_members} members
            </span>
          </div>
          {isUserInThisTeam && (
            <div className="flex items-center gap-1 text-green-800 dark:text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-xs font-semibold">Joined</span>
            </div>
          )}
          {teamIsFull && (
            <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">Full</span>
            </div>
          )}
        </div>

        {/* Member Avatars Preview (when collapsed) */}
        {!expanded && members.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {members.slice(0, 5).map((member, idx) => (
                  <div
                    key={member.user_id}
                    className="relative"
                    title={member.username}
                  >
                    {member.avatar_data?.type === 'url' ? (
                      <img
                        src={member.avatar_data.value}
                        alt={member.username}
                        className="w-8 h-8 rounded-full object-cover border-2 border-card dark:border-gray-800"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-card dark:border-gray-800 bg-gradient-to-br ${team.color_scheme}`}>
                        {member.avatar_data?.value || member.username.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
                {members.length > 5 && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground dark:text-gray-400 bg-secondary dark:bg-slate-700 border-2 border-card dark:border-gray-800">
                    +{members.length - 5}
                  </div>
                )}
              </div>
              {members.length > 0 && (
                <span className="text-xs text-muted-foreground dark:text-gray-400">
                  {members.length === 1 ? '1 member' : `${members.length} members`}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left mb-4 text-sm text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-colors duration-300"
        >
          {expanded ? '▼ Hide Details' : '▶ View Tasks & All Members'}
        </button>

        {expanded && (
          <div className="space-y-4 mb-4 animate-in fade-in duration-200">
            {/* Tasks */}
            <div>
              <p className="font-semibold text-sm text-purple-600 dark:text-purple-300 mb-2">Team Tasks:</p>
              <ul className="text-sm text-foreground dark:text-gray-300 space-y-1">
                {team.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables - Highlighted Card */}
            {(() => {
              console.log('🔍 Team deliverables debug:', {
                teamName: team.name,
                hasDeliverables: !!team.deliverables,
                deliverablesType: typeof team.deliverables,
                deliverablesLength: team.deliverables?.length,
                deliverables: team.deliverables,
                fullTeam: team
              });
              return null;
            })()}
            {team.deliverables && team.deliverables.length > 0 && (
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border-2 border-amber-500/30 dark:border-amber-500/40 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <p className="font-bold text-sm text-amber-800 dark:text-amber-300">Team Deliverables:</p>
                </div>
                <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-2">
                  {team.deliverables.map((deliverable, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-lg">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                      <span className="font-medium">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Members */}
            <div className="border-t border-border dark:border-purple-500/20 pt-4 transition-colors duration-300">
              <p className="font-semibold text-sm text-purple-600 dark:text-purple-300 mb-3">Team Members ({members.length}/{team.max_members}):</p>
              {members.length > 0 ? (
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.user_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 dark:hover:bg-slate-700/30 transition-colors duration-200">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {member.avatar_data?.type === 'url' ? (
                          <img
                            src={member.avatar_data.value}
                            alt={member.username}
                            className="w-10 h-10 rounded-full object-cover border-2 border-purple-400/30"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${team.color_scheme}`}>
                            {member.avatar_data?.value || member.username.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Member Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground dark:text-gray-200 truncate">
                            {member.username}
                          </span>
                          {member.admin_level && member.admin_level > 0 && (
                            <span className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-0.5 rounded text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground dark:text-gray-400">{member.role}</span>
                          {member.contribution_score > 0 && (
                            <>
                              <span className="text-xs text-muted-foreground dark:text-gray-500">•</span>
                              <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded text-purple-600 dark:text-purple-300">
                                {member.contribution_score} pts
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <User className="w-8 h-8 mx-auto mb-2 text-muted-foreground dark:text-gray-500 opacity-50" />
                  <p className="text-sm text-muted-foreground dark:text-gray-400">No members yet - be the first to join!</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                {!user ? (
                  <p className="text-xs text-muted-foreground dark:text-gray-400 text-center">
                    Log in to join teams
                  </p>
                ) : isUserInThisTeam ? (
                  <>
                    <Button disabled className="w-full bg-green-600/50 dark:bg-green-600/50 text-green-900 dark:text-green-200 font-semibold">
                      <Check className="w-4 h-4 mr-2" />
                      Joined
                    </Button>
                    <Button
                      onClick={handleLeaveTeam}
                      disabled={isLeaving}
                      variant="outline"
                      className="w-full border-red-500/50 text-red-700 dark:text-red-300 hover:bg-red-500/10"
                    >
                      {isLeaving ? 'Leaving...' : 'Leave Team'}
                    </Button>
                  </>
                ) : teamIsFull ? (
                  <Button disabled className="w-full bg-secondary dark:bg-gray-600 text-muted-foreground dark:text-gray-400">
                    Team is full ({team.current_members}/{team.max_members})
                  </Button>
                ) : !canJoinMoreTeams ? (
                  <Button disabled className="w-full bg-secondary dark:bg-gray-600 text-muted-foreground dark:text-gray-400">
                    Maximum 3 teams ({userTeamCount}/3)
                  </Button>
                ) : (
                  <Button
                    onClick={handleJoinTeam}
                    disabled={isJoining}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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

        <p className="text-center text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          {team.team_vibe}
        </p>
      </div>
    </div>
  );
}