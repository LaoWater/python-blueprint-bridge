import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, TrendingUp, TrendingDown, Crown } from 'lucide-react';
import { useGroupProjects } from '../../hooks/useGroupProjects';
import { useAuth } from '../AuthContext';

export interface ProjectVotingProps {
  projectId: string;
  projectName: string;
  currentVotes: {
    votes_up: number;
    votes_down: number;
    vote_score: number;
  };
  className?: string;
}

export default function ProjectVoting({ projectId, projectName, currentVotes, className = '' }: ProjectVotingProps) {
  const [userVote, setUserVote] = useState<{ vote_type: string } | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [localVotes, setLocalVotes] = useState(currentVotes);
  const { castVote, removeVote, getUserVote, fetchProjects } = useGroupProjects();
  const { user } = useAuth();

  // Update local votes when prop changes
  useEffect(() => {
    setLocalVotes(currentVotes);
  }, [currentVotes]);

  // Load user's current vote
  useEffect(() => {
    const loadUserVote = async () => {
      if (user && projectId) {
        const vote = await getUserVote(projectId);
        setUserVote(vote);
      }
    };
    loadUserVote();
  }, [user, projectId, getUserVote]);

  const handleVote = async (voteType: 'up' | 'down') => {
    if (!user) return;

    setIsVoting(true);

    // Store previous vote for rollback if needed
    const previousVote = userVote;
    const previousLocalVotes = localVotes;

    try {
      // If user already voted the same way, remove the vote
      if (userVote?.vote_type === voteType) {
        // Optimistically update UI
        setUserVote(null);
        setLocalVotes(prev => ({
          votes_up: voteType === 'up' ? Math.max(0, prev.votes_up - 1) : prev.votes_up,
          votes_down: voteType === 'down' ? Math.max(0, prev.votes_down - 1) : prev.votes_down,
          vote_score: voteType === 'up' ? prev.vote_score - 1 : prev.vote_score + 1
        }));

        const success = await removeVote(projectId);
        if (success) {
          // Refresh projects to get accurate counts from server
          await fetchProjects();
        } else {
          // Rollback on failure
          setUserVote(previousVote);
          setLocalVotes(previousLocalVotes);
        }
      } else {
        // Determine vote change impact
        const wasUpvote = userVote?.vote_type === 'up';
        const wasDownvote = userVote?.vote_type === 'down';

        // Optimistically update UI
        setUserVote({ vote_type: voteType });
        setLocalVotes(prev => {
          let newUpCount = prev.votes_up;
          let newDownCount = prev.votes_down;

          if (voteType === 'up') {
            newUpCount = prev.votes_up + 1;
            if (wasDownvote) newDownCount = Math.max(0, prev.votes_down - 1);
          } else {
            newDownCount = prev.votes_down + 1;
            if (wasUpvote) newUpCount = Math.max(0, prev.votes_up - 1);
          }

          return {
            votes_up: newUpCount,
            votes_down: newDownCount,
            vote_score: newUpCount - newDownCount
          };
        });

        const success = await castVote(projectId, voteType);
        if (success) {
          // Refresh projects to get accurate counts from server
          await fetchProjects();
        } else {
          // Rollback on failure
          setUserVote(previousVote);
          setLocalVotes(previousLocalVotes);
        }
      }
    } finally {
      setIsVoting(false);
    }
  };

  const getVoteButtonClass = (voteType: 'up' | 'down') => {
    const isActive = userVote?.vote_type === voteType;
    const baseClass = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all';

    if (voteType === 'up') {
      return `${baseClass} ${
        isActive
          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
          : 'bg-gray-700/50 text-gray-300 hover:bg-green-500/10 hover:text-green-300'
      }`;
    } else {
      return `${baseClass} ${
        isActive
          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
          : 'bg-gray-700/50 text-gray-300 hover:bg-red-500/10 hover:text-red-300'
      }`;
    }
  };

  const getScoreColor = () => {
    const score = localVotes.vote_score;
    if (score > 10) return 'text-green-400';
    if (score > 5) return 'text-green-300';
    if (score > 0) return 'text-blue-300';
    if (score === 0) return 'text-gray-300';
    if (score > -5) return 'text-orange-300';
    return 'text-red-300';
  };

  const getScoreIcon = () => {
    const score = localVotes.vote_score;
    if (score > 10) return <Crown className="w-5 h-5" />;
    if (score > 0) return <TrendingUp className="w-5 h-5" />;
    if (score === 0) return null;
    return <TrendingDown className="w-5 h-5" />;
  };

  return (
    <div className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-600/20 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300">Community Vote</h3>
        <div className={`flex items-center gap-1 ${getScoreColor()}`}>
          {getScoreIcon()}
          <span className="font-bold">{localVotes.vote_score > 0 ? '+' : ''}{localVotes.vote_score}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-3">
        <button
          onClick={() => handleVote('up')}
          disabled={!user || isVoting}
          className={getVoteButtonClass('up')}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{localVotes.votes_up}</span>
        </button>

        <button
          onClick={() => handleVote('down')}
          disabled={!user || isVoting}
          className={getVoteButtonClass('down')}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{localVotes.votes_down}</span>
        </button>
      </div>

      {!user && (
        <p className="text-xs text-gray-400 text-center">
          Login to vote on projects
        </p>
      )}

      {isVoting && (
        <p className="text-xs text-blue-300 text-center">
          Updating vote...
        </p>
      )}
    </div>
  );
}