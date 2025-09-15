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
  const [activeSection, setActiveSection] = useState('vision');
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [joiningTeam, setJoiningTeam] = useState<string | null>(null);
  const [userTeams, setUserTeams] = useState<string[]>([]);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const { projects, teams, fetchTeams, joinTeam, getUserTeams, loading, error } = useGroupProjects();

  // Get the wellness project
  const wellnessProject = projects.find(p => p.name === 'Personal Wellness Oracle');

  // Debug logging (remove in production)
  // console.log('Projects:', projects);
  // console.log('Wellness Project:', wellnessProject);
  // console.log('Teams:', teams);

  // Fetch teams and user's teams when component mounts or project changes
  useEffect(() => {
    if (wellnessProject?.id) {
      fetchTeams(wellnessProject.id);
      loadUserTeams();
    }
  }, [wellnessProject?.id, fetchTeams, loadUserTeams]);

  // Load user's current teams
  const loadUserTeams = useCallback(async () => {
    if (!wellnessProject?.id) return;
    const teams = await getUserTeams(wellnessProject.id);
    setUserTeams(teams.map(t => t.team_id));
  }, [wellnessProject?.id, getUserTeams]);

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

  // Check if user is in team
  const isInTeam = useCallback((teamId: string) => userTeams.includes(teamId), [userTeams]);

  // Get team status
  const getTeamStatus = useCallback((team: any) => {
    if (isInTeam(team.id)) return 'joined';
    if (team.current_members >= team.max_members) return 'full';
    return 'available';
  }, [isInTeam]);

  // Auto-scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="w-full bg-transparent text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Personal Wellness Oracle
          </h1>
          <p className="text-xl text-gray-300">Your AI life coach that understands your patterns and guides you toward optimal living</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveSection('vision')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'vision'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Heart className="inline mr-2" size={20} />
            The Vision
          </button>
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'architecture'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            AI Architecture
          </button>
          <button
            onClick={() => setActiveSection('teams')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'teams'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
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
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">🧬 Deep Biological Intelligence: Understanding Your Complete Story</h2>

            <div className="space-y-8 text-lg">
              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">🌅</div>
                <div>
                  <p className="font-semibold text-blue-300 mb-2">Morning (7:23 AM) - The Genetic Detective</p>
                  <p className="text-gray-300 mb-3">You wake up groggy despite sleeping 8 hours. You open the Oracle app and speak: <span className="text-yellow-300">"I feel terrible again, and I don't know why."</span></p>
                  <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-blue-200 italic">Oracle's Deep Analysis: "I see the multi-layered pattern combining your genetics, family history, and emotional triggers. Your sleep was fragmented - 4 wake-ups between 2-4 AM. Three factors converged: <strong>Genetic:</strong> Your COMT gene variant makes you a slow caffeine metabolizer - yesterday's 3 PM coffee was still active at bedtime. <strong>Inherited Pattern:</strong> Your stress response mirrors your mother's cortisol pattern (elevated evening cortisol, documented in family health history). <strong>Emotional Trigger:</strong> Client criticism activated your inherited 'rejection sensitivity' - a pattern that runs in your family line. The 9:30 PM stress-eating wasn't just behavioral; it was your genetic stress response seeking comfort through food, disrupting your circadian rhythm that's programmed for 10 PM melatonin release."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">☀️</div>
                <div>
                  <p className="font-semibold text-purple-300 mb-2">Afternoon (2:15 PM) - Generational Patterns</p>
                  <p className="text-gray-300 mb-3">You're dragging despite caffeine. <span className="text-yellow-300">"Why doesn't coffee help anymore? This feels familiar."</span></p>
                  <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="text-purple-200 italic">Oracle: "It IS familiar - this exact pattern appeared in your grandmother's wellness journal from 1987. Your genetic profile shows you're a slow caffeine metabolizer (CYP1A2 variant), AND you've inherited the family's adrenal sensitivity. Your 2 PM crash follows three generations of data: disrupted sleep → cortisol dysregulation → blood sugar instability → energy collapse. But here's what's powerful: your grandmother never understood WHY. You do. Your genetic makeup creates this vulnerability, but knowing this gives you the power to work WITH your biology instead of against it. The emotional stress from yesterday's call triggered your inherited fight-or-flight response, depleting your adrenals faster than average due to your genetic predisposition."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">🧬</div>
                <div>
                  <p className="font-semibold text-green-300 mb-2">Evening (6:47 PM) - Emotional Heritage & New Choices</p>
                  <p className="text-gray-300 mb-3">Work stress hits again. Your Oracle sends a personalized intervention based on deep family patterns:</p>
                  <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-200 italic">"Stress pattern detected - this is your family's signature response. Three generations show this exact trigger: work criticism → emotional eating → sleep disruption → next-day fatigue. Your genetic stress response (high cortisol sensitivity via COMT gene) combines with learned family coping mechanisms passed down through emotional modeling. But you have tools they didn't: Based on your genetic profile, ashwagandha works 3x better for you than average (genetic testing confirmed). Your breathing exercise interrupts the inherited stress cascade at the neurological level. Most importantly, you're choosing your prepared meal over emotional eating - literally rewriting your family's coping patterns. You're not just optimizing your health; you're healing generational trauma and creating new neural pathways for future generations."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">🌟</div>
                <div>
                  <p className="font-semibold text-orange-300 mb-2">Weekend (11:32 AM) - Epigenetic Transformation</p>
                  <p className="text-gray-300 mb-3">You check in feeling different: <span className="text-yellow-300">"I actually feel great today. What's different? This feels... new."</span></p>
                  <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-400">
                    <p className="text-orange-200 italic">Oracle: "You're experiencing something your family history shows rarely happened - sustained energy without crashes, emotional resilience under stress. Here's the constellation: You honored your genetic chronotype (early sleep), avoided late caffeine (genetic sensitivity), processed stress through movement instead of food (breaking learned pattern), and maintained consistent meal timing (supporting your genetic insulin sensitivity). Most remarkably, your choices are influencing gene expression - what scientists call epigenetics. Stress no longer automatically triggers the cortisol-food-sleep disruption cycle because you've created new neural pathways. You're not just the beneficiary of your genetic inheritance; you're actively reshaping it. Your future children will inherit not just your genes, but the improved epigenetic expression you're creating through these conscious choices."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">🧬 The Biological Intelligence Stack</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Collect Your Reality</h4>
                <p className="text-gray-300 text-sm">Sleep, energy, mood, genetic data, family history - your complete biological story</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Find Deep Patterns</h4>
                <p className="text-gray-300 text-sm">AI connects genetics, emotions, family patterns, and behaviors across generations</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Understand Heritage</h4>
                <p className="text-gray-300 text-sm">Recognize inherited emotional triggers and genetic predispositions</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Transform Legacy</h4>
                <p className="text-gray-300 text-sm">Create new patterns that heal generational cycles and optimize your unique biology</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Section */}
      {activeSection === 'architecture' && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-300">🧠 Advanced LLM Chain Architecture</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
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

              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl p-6 border border-green-500/30">
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

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-300">🔮 The AI Magic</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
                <div>
                  <h4 className="font-bold mb-2 text-blue-300">Vector Memory</h4>
                  <p className="text-gray-400">Every diary entry, mood rating, and pattern becomes searchable context that never forgets</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">Deep Retrieval</h4>
                  <p className="text-gray-400">When you say "I feel terrible," AI instantly searches through months of similar moments</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-pink-300">Pattern Synthesis</h4>
                  <p className="text-gray-400">Connects dots across time: sleep→mood→productivity→relationships</p>
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
            <p className="text-xl text-gray-300">Each team owns their piece of the AI puzzle. Trust others with theirs. Together, we build magic.</p>
          </div>

          {/* Debug Info */}
          {loading && <div className="text-center text-gray-400">Loading teams...</div>}
          {error && <div className="text-center text-red-400">Error: {error}</div>}
          {!loading && teams.length === 0 && (
            <div className="text-center text-gray-400">
              <p>No teams found. Project ID: {wellnessProject?.id || 'Not found'}</p>
              <p>Available projects: {projects.map(p => p.name).join(', ')}</p>
              <p>Teams count: {teams.length}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
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
                  <p className="text-gray-300 mb-3 text-sm">{team.description}</p>
                  <p className="text-gray-400 mb-3 text-sm font-medium">{team.mission}</p>

                  {/* Member Count Display */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">
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
                    className="w-full text-left mb-4 text-sm text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {expandedTeam === team.id ? '▼ Hide Details' : '▶ View Tasks & Focus'}
                  </button>

                  {expandedTeam === team.id && (
                    <div className="space-y-4 mb-4 animate-in fade-in duration-200">
                      <div>
                        <p className="font-semibold text-sm text-blue-300 mb-2">Core Tasks:</p>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {team.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-purple-500/20 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400">({team.current_members}/{team.max_members} members)</span>
                          {getTeamStatus(team) === 'joined' && (
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">✓ Joined</span>
                          )}
                          {getTeamStatus(team) === 'full' && (
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Full</span>
                          )}
                        </div>

                        {joinSuccess && expandedTeam === team.id && (
                          <div className="mb-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm text-center">
                            {joinSuccess}
                          </div>
                        )}

                        {joinError && expandedTeam === team.id && (
                          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center">
                            {joinError}
                          </div>
                        )}

                        <button
                          onClick={() => handleJoinTeam(team.id)}
                          disabled={getTeamStatus(team) !== 'available' || joiningTeam === team.id}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            getTeamStatus(team) === 'joined'
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-not-allowed'
                              : getTeamStatus(team) === 'full'
                              ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                              : joiningTeam === team.id
                              ? 'bg-purple-500/50 text-purple-300 cursor-wait'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                          }`}
                        >
                          {getTeamStatus(team) === 'joined'
                            ? '✓ Already Joined'
                            : getTeamStatus(team) === 'full'
                            ? 'Team Full'
                            : joiningTeam === team.id
                            ? 'Joining...'
                            : 'Join This Team'}
                        </button>
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

          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-6 text-center">🚀 The Art of Building Together</h3>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-bold mb-2">Week 1-2: Data Foundation</h4>
                <p className="text-gray-300 text-sm">Harvesters & Memory Keepers build the data pipeline</p>
              </div>

              <div>
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold mb-2">Week 3-4: Intelligence Layer</h4>
                <p className="text-gray-300 text-sm">Vector Architects & LLM Engineers create the AI brain</p>
              </div>

              <div>
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="font-bold mb-2">Week 5-6: Pattern Recognition</h4>
                <p className="text-gray-300 text-sm">Pattern Detectives find the hidden connections</p>
              </div>

              <div>
                <div className="text-4xl mb-3">✨</div>
                <h4 className="font-bold mb-2">Week 7-8: Magic Interface</h4>
                <p className="text-gray-300 text-sm">Interface Magicians & Conversation Designers perfect the experience</p>
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