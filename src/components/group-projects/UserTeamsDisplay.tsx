import React from 'react';
import { Users, Crown } from 'lucide-react';
import { useGroupProjectContext } from '@/contexts/GroupProjectContext';
import { useAuth } from '@/components/AuthContext';

export default function UserTeamsDisplay() {
  const { userTeams } = useGroupProjectContext();
  const { user } = useAuth();

  if (!user || userTeams.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        <Crown className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-purple-300">Your Teams ({userTeams.length}/3)</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTeams.map((team) => (
          <div
            key={team.team_id}
            className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 border border-purple-500/20"
          >
            <div className={`p-2 bg-gradient-to-br ${team.team_color_scheme} rounded-lg`}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{team.team_name}</h4>
              <p className="text-sm text-gray-400">
                Joined {new Date(team.joined_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {userTeams.length < 3 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            You can join {3 - userTeams.length} more team{3 - userTeams.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}