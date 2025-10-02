import React, { useState, useEffect, useCallback } from 'react';
import {
  Brain,
  Heart,
  Activity,
  MessageCircle,
  TrendingUp,
  Calendar,
  Moon,
  Zap,
  Mic,
  BarChart3,
  Target,
  Sparkles,
  Database,
  Search,
  Bot,
  Users,
  Code,
  Cpu
} from 'lucide-react';

import { useGroupProjects } from '../../hooks/useGroupProjects';

export default function WellnessOracle() {
  const [activeSection, setActiveSection] = useState('teams');
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [joiningTeam, setJoiningTeam] = useState<string | null>(null);
  const [userTeams, setUserTeams] = useState<string[]>([]);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const { projects, teams, fetchTeams, joinTeam, leaveTeam, getUserTeams, loading, error } = useGroupProjects();

  // Get the wellness project
  const wellnessProject = projects.find(p => p.name === 'Personal Wellness Oracle');

  // Debug logging (remove in production)
  // console.log('Projects:', projects);
  // console.log('Wellness Project:', wellnessProject);
  // console.log('Teams:', teams);

  // Load user's current teams with error handling
  const loadUserTeams = useCallback(async () => {
    if (!wellnessProject?.id) return;
    try {
      const teams = await getUserTeams(wellnessProject.id);
      if (teams && Array.isArray(teams)) {
        setUserTeams(teams.map(t => t.team_id));
      }
    } catch (err) {
      console.error('Error loading user teams:', err);
      // Silently fail - don't break the UI
    }
  }, [wellnessProject?.id, getUserTeams]);

  // Fetch teams and user's teams when component mounts or project changes
  useEffect(() => {
    if (wellnessProject?.id) {
      // Add a small delay to prevent rapid fire requests
      const timer = setTimeout(() => {
        fetchTeams(wellnessProject.id);
        loadUserTeams();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [wellnessProject?.id, fetchTeams, loadUserTeams]);

  // Handle page visibility changes to prevent unnecessary requests
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, clear any pending requests
        return;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Team icons mapping
  const getTeamIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      '⚡': <Activity className="w-8 h-8" />,
      '🧠': <Database className="w-8 h-8" />,
      '🤖': <Bot className="w-8 h-8" />,
      '🔍': <Search className="w-8 h-8" />,
      '💾': <Database className="w-8 h-8" />,
      '💬': <MessageCircle className="w-8 h-8" />,
      '✨': <Sparkles className="w-8 h-8" />,
      '🎼': <Cpu className="w-8 h-8" />
    };
    return iconMap[iconName] || <Activity className="w-8 h-8" />;
  };

  // Handle team join
  const handleJoinTeam = async (teamId: string) => {
    if (!wellnessProject?.id || joiningTeam) return;

    setJoiningTeam(teamId);
    setJoinError(null);
    setJoinSuccess(null);

    const result = await joinTeam(wellnessProject.id, teamId);
    if (result && 'success' in result && result.success) {
      // Refresh user teams (fetchTeams is called automatically by hook)
      await loadUserTeams();
      setJoinSuccess('Successfully joined team! 🎉');
      setTimeout(() => setJoinSuccess(null), 3000);
    } else {
      setJoinError('Failed to join team. You may already be a member or the team may be full.');
      setTimeout(() => setJoinError(null), 5000);
    }
    setJoiningTeam(null);
  };

  // Handle team leave
  const handleLeaveTeam = async (teamId: string) => {
    if (!wellnessProject?.id || joiningTeam) return;

    setJoiningTeam(teamId);
    setJoinError(null);
    setJoinSuccess(null);

    const result = await leaveTeam(wellnessProject.id, teamId);
    if (result && 'success' in result && result.success) {
      // Refresh user teams
      await loadUserTeams();
      setJoinSuccess('Successfully left team');
      setTimeout(() => setJoinSuccess(null), 3000);
    } else {
      setJoinError('Failed to leave team. Please try again.');
      setTimeout(() => setJoinError(null), 5000);
    }
    setJoiningTeam(null);
  };

  // Check if user is in team
  const isInTeam = useCallback((teamId: string) => userTeams.includes(teamId), [userTeams]);

  // Get team status
  const getTeamStatus = useCallback((team: any) => {
    if (isInTeam(team.id)) return 'joined';
    if (team.current_members >= team.max_members) return 'full';
    return 'available';
  }, [isInTeam]);

  // Removed auto-scroll for better UX - let users stay where they are

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Personal Wellness Oracle
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300">Your AI wellness companion that discovers patterns in your daily life and guides you toward optimal living</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveSection('vision')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'vision'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card hover:bg-secondary dark:bg-gray-800 dark:hover:bg-gray-700 text-foreground'
            }`}
          >
            <Heart className="inline mr-2" size={20} />
            The Vision
          </button>
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'architecture'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card hover:bg-secondary dark:bg-gray-800 dark:hover:bg-gray-700 text-foreground'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            AI Architecture
          </button>
          <button
            onClick={() => setActiveSection('teams')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'teams'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card hover:bg-secondary dark:bg-gray-800 dark:hover:bg-gray-700 text-foreground'
            }`}
          >
            <Users className="inline mr-2" size={20} />
            The Teams
          </button>
        </div>
      </div>

      {/* Vision Section */}
      {activeSection === 'vision' && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-card/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-border dark:border-blue-500/20 transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🌟 Holistic Pattern Recognition: Understanding Your Complete Story</h2>

            <div className="space-y-8 text-lg">
              <div className="flex items-start gap-6 p-6 bg-secondary/50 dark:bg-gray-700/30 rounded-2xl transition-colors duration-300">
                <div className="text-4xl">🌅</div>
                <div>
                  <p className="font-semibold text-blue-300 mb-2">Morning (7:23 AM) - The Pattern Detective</p>
                  <p className="text-muted-foreground dark:text-gray-300 mb-3">You wake up groggy despite sleeping 8 hours. You open the Oracle app and speak: <span className="text-yellow-300">"I feel terrible again, and I don't know why."</span></p>
                  <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-blue-200 italic">Oracle's Pattern Analysis: "Looking at your diary entries from the past 3 weeks, I notice a constellation of factors converging. <strong>Sleep Pattern:</strong> Your sleep tracker shows 4 wake-ups between 2-4 AM - this happened after your most stressful work days. <strong>Environmental:</strong> Yesterday's air quality index was 156 (unhealthy) - your energy crashes consistently correlate with poor air days. <strong>Digestive:</strong> Your diary mentions bloating after lunch yesterday - dairy sensitivity patterns show up 6 hours later as sleep disruption. <strong>Emotional:</strong> The client criticism triggered your familiar stress-eating pattern at 9:30 PM. <strong>Personal Context:</strong> You've been putting pressure on yourself about the promotion deadline. All these factors created a perfect storm disrupting your natural circadian rhythm."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-secondary/50 dark:bg-gray-700/30 rounded-2xl transition-colors duration-300">
                <div className="text-4xl">☀️</div>
                <div>
                  <p className="font-semibold text-purple-300 mb-2">Afternoon (2:15 PM) - Multi-Factor Analysis</p>
                  <p className="text-muted-foreground dark:text-gray-300 mb-3">You're dragging despite caffeine. <span className="text-yellow-300">"Why doesn't coffee help anymore? This feels familiar."</span></p>
                  <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="text-purple-200 italic">Oracle: "It IS familiar - your diary shows this exact pattern 6 times in the past 2 months. Multiple factors are working against you: <strong>Timing:</strong> Your energy naturally dips at 2 PM (circadian rhythm), but caffeine from this morning is blocking your adenosine receptors. <strong>Blood Sugar:</strong> Your diary shows you skipped morning protein - your glucose crashed exactly when caffeine peaked. <strong>Hydration:</strong> Only 16oz water logged today, and dehydration amplifies fatigue. <strong>Goals Stress:</strong> You wrote about the promotion pressure yesterday - chronic stress depletes your natural energy systems. <strong>Family Pattern:</strong> Yes, your family history suggests sensitivity to stimulants, but now you understand the WHY behind the pattern. You have tools to work WITH your unique biology."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-secondary/50 dark:bg-gray-700/30 rounded-2xl transition-colors duration-300">
                <div className="text-4xl">🧬</div>
                <div>
                  <p className="font-semibold text-green-300 mb-2">Evening (6:47 PM) - Personalized Intervention</p>
                  <p className="text-muted-foreground dark:text-gray-300 mb-3">Work stress hits again. Your Oracle sends a personalized intervention based on your unique patterns:</p>
                  <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-200 italic">"Stress pattern detected - I recognize this from your diary entries. Your personal stress signature: work criticism → stomach tension → emotional eating → sleep disruption → next-day fatigue. But today feels different. <strong>Environmental Support:</strong> Air quality improved to 45 (good) - your body can process stress better. <strong>Digestive Prep:</strong> You logged yogurt this morning - your gut microbiome is more balanced for stress resilience. <strong>Goal Clarity:</strong> Yesterday's journaling about your promotion fears shows you're processing, not suppressing. <strong>Family Wisdom:</strong> Your family history suggests high stress sensitivity, but you've learned tools they didn't have. <strong>Personal Growth:</strong> You're choosing your prepared meal over emotional eating - creating new neural pathways and breaking old patterns. This isn't just habit change; it's personal evolution."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-secondary/50 dark:bg-gray-700/30 rounded-2xl transition-colors duration-300">
                <div className="text-4xl">🌟</div>
                <div>
                  <p className="font-semibold text-orange-300 mb-2">Weekend (11:32 AM) - Holistic Harmony</p>
                  <p className="text-muted-foreground dark:text-gray-300 mb-3">You check in feeling different: <span className="text-yellow-300">"I actually feel great today. What's different? This feels... new."</span></p>
                  <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-400">
                    <p className="text-orange-200 italic">Oracle: "You're experiencing harmonious alignment across all your wellness factors. Here's your constellation: <strong>Environment:</strong> Perfect air quality (32) and you spent 2 hours outdoors. <strong>Digestive:</strong> Your gut feels calm - the dairy elimination experiment is working. <strong>Emotional:</strong> Yesterday's journaling about the promotion shows clarity, not anxiety. <strong>Physical:</strong> You honored your natural sleep rhythm and moved your body. <strong>Goals:</strong> You're aligned with your authentic aspirations, not external pressure. <strong>Family Patterns:</strong> You've transformed inherited stress patterns into conscious choices. This isn't just feeling good - it's your entire system working in harmony. You've created a sustainable foundation for optimal living by understanding and honoring your unique patterns rather than fighting against them."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-border dark:border-blue-500/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">🌈 The Holistic Wellness Intelligence Stack</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Capture Your World</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Daily diary entries, sleep patterns, energy levels, digestive health, air quality, emotions, goals, and family context</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Discover Hidden Connections</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">AI finds patterns across environment, lifestyle, emotions, goals, family history, and personal biology</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Honor Your Uniqueness</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Understand your personal patterns, family influences, and individual biological needs</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Create Your Optimal Life</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Transform patterns through conscious choices that align with your authentic self and life goals</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Section */}
      {activeSection === 'architecture' && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-card/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-border dark:border-purple-500/20 transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-300">🧠 Advanced LLM Chain Architecture</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-border dark:border-blue-500/30 transition-colors duration-300">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Core Data Pipeline</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span>Daily entries → Vector embeddings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span>Diary text → Semantic search</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <span>Patterns → Correlation analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Context → LLM reasoning</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl p-6 border border-border dark:border-green-500/30 transition-colors duration-300">
                <h3 className="text-xl font-bold mb-4 text-green-300">LLM Chain Process</h3>
                <ol className="space-y-2 text-sm">
                  <li><span className="text-green-400 font-bold">1.</span> Context Retrieval (vector search)</li>
                  <li><span className="text-cyan-400 font-bold">2.</span> Pattern Analysis (correlation detection)</li>
                  <li><span className="text-blue-400 font-bold">3.</span> Insight Generation (LLM reasoning)</li>
                  <li><span className="text-purple-400 font-bold">4.</span> Personalized Guidance (action steps)</li>
                  <li><span className="text-pink-400 font-bold">5.</span> Learning Loop (effectiveness tracking)</li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-border dark:border-purple-500/30 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-300">🔮 The AI Magic</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
                <div>
                  <h4 className="font-bold mb-2 text-blue-300">Vector Memory</h4>
                  <p className="text-muted-foreground dark:text-gray-400">Every diary entry, mood rating, and pattern becomes searchable context that never forgets</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">Deep Retrieval</h4>
                  <p className="text-muted-foreground dark:text-gray-400">When you say "I feel terrible," AI instantly searches through months of similar moments</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-pink-300">Pattern Synthesis</h4>
                  <p className="text-muted-foreground dark:text-gray-400">Connects dots across time: sleep→mood→productivity→relationships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teams Section */}
      {activeSection === 'teams' && (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-purple-300">🏗️ The Art of Building Intelligence</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">Each team owns their piece of the AI puzzle. Trust others with theirs. Together, we build magic.</p>
          </div>

          {/* Status Info */}
          {loading && <div className="text-center text-muted-foreground dark:text-gray-400 mb-8">Loading teams...</div>}
          {error && (
            <div className="text-center mb-8">
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 max-w-md mx-auto transition-colors duration-300">
                <p className="text-yellow-300">Teams temporarily unavailable</p>
                <p className="text-muted-foreground dark:text-gray-400 text-sm mt-2">Working in offline mode</p>
              </div>
            </div>
          )}
          {!loading && !error && teams.length === 0 && (
            <div className="text-center text-muted-foreground dark:text-gray-400 mb-8">
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 max-w-md mx-auto transition-colors duration-300">
                <p>Setting up team structure...</p>
                <p className="text-sm mt-2">Check back soon!</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="relative bg-card/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-border dark:border-purple-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${team.color_scheme} opacity-10 rounded-2xl`}></div>

                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${team.color_scheme} rounded-xl`}>
                      {getTeamIcon(team.icon)}
                    </div>
                    <span className="text-2xl">{'⭐'.repeat(team.difficulty_stars)}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                  <p className="text-muted-foreground dark:text-gray-300 mb-3 text-sm">{team.description}</p>
                  <p className="text-muted-foreground dark:text-gray-400 mb-3 text-sm font-medium">{team.mission}</p>

                  {/* Member Count Display */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground dark:text-gray-400">
                      {team.current_members}/{team.max_members} members
                    </span>
                    {isInTeam(team.id) && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">✓ Joined</span>
                    )}
                    {team.current_members >= team.max_members && !isInTeam(team.id) && (
                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Full</span>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                    className="w-full text-left mb-4 text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300"
                  >
                    {expandedTeam === team.id ? '▼ Hide Details' : '▶ View Tasks & Focus'}
                  </button>

                  {expandedTeam === team.id && (
                    <div className="space-y-4 mb-4 animate-in fade-in duration-200">
                      <div>
                        <p className="font-semibold text-sm text-blue-300 mb-2">Core Tasks:</p>
                        <ul className="text-xs text-muted-foreground dark:text-gray-300 space-y-1">
                          {team.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-border dark:border-purple-500/20 pt-4 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground dark:text-gray-400">({team.current_members}/{team.max_members} members)</span>
                          {getTeamStatus(team) === 'joined' && (
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">✓ Joined</span>
                          )}
                          {getTeamStatus(team) === 'full' && (
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Full</span>
                          )}
                        </div>

                        {joinSuccess && expandedTeam === team.id && (
                          <div className="mb-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm text-center transition-colors duration-300">
                            {joinSuccess}
                          </div>
                        )}

                        {joinError && expandedTeam === team.id && (
                          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center transition-colors duration-300">
                            {joinError}
                          </div>
                        )}

                        {getTeamStatus(team) === 'joined' ? (
                          <button
                            onClick={() => handleLeaveTeam(team.id)}
                            disabled={joiningTeam === team.id}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                              joiningTeam === team.id
                                ? 'bg-red-500/50 text-red-300 cursor-wait'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
                            }`}
                          >
                            {joiningTeam === team.id ? 'Leaving...' : '← Leave Team'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleJoinTeam(team.id)}
                            disabled={getTeamStatus(team) !== 'available' || joiningTeam === team.id}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                              getTeamStatus(team) === 'full'
                                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                : joiningTeam === team.id
                                ? 'bg-purple-500/50 text-purple-300 cursor-wait'
                                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                            }`}
                          >
                            {getTeamStatus(team) === 'full'
                              ? 'Team Full'
                              : joiningTeam === team.id
                              ? 'Joining...'
                              : 'Join This Team'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-center text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {team.team_vibe}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-border dark:border-blue-500/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-6 text-center">🚀 The Art of Building Together</h3>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-bold mb-2">Week 1-2: Data Foundation</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Harvesters & Memory Keepers build the data pipeline</p>
              </div>

              <div>
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold mb-2">Week 3-4: Intelligence Layer</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Vector Architects & LLM Engineers create the AI brain</p>
              </div>

              <div>
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="font-bold mb-2">Week 5-6: Pattern Recognition</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Pattern Detectives find the hidden connections</p>
              </div>

              <div>
                <div className="text-4xl mb-3">✨</div>
                <h4 className="font-bold mb-2">Week 7-8: Magic Interface</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Interface Magicians & Conversation Designers perfect the experience</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl font-semibold text-purple-300 mb-2">Remember: You're not building software...</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">You're creating an AI that understands human wellness like a wise friend! 🤖❤️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}