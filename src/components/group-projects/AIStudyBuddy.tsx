import React, { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Brain,
  Lightbulb,
  Target,
  Clock,
  Users,
  Code,
  Cpu,
  FileText,
  MessageSquare,
  BarChart3,
  Sparkles,
  Search,
  Eye,
  Zap,
  Database,
  Bot
} from 'lucide-react';

import { useGroupProjects } from '../../hooks/useGroupProjects';

export default function AIStudyBuddy() {
  const [activeSection, setActiveSection] = useState('teams');
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [joiningTeam, setJoiningTeam] = useState<string | null>(null);
  const [userTeams, setUserTeams] = useState<string[]>([]);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const { projects, teams, fetchTeams, joinTeam, leaveTeam, getUserTeams, loading, error } = useGroupProjects();

  // Get the AI Study Buddy project
  const studyBuddyProject = projects.find(p => p.name === 'AI Study Buddy');

  // Load user's current teams with error handling
  const loadUserTeams = useCallback(async () => {
    if (!studyBuddyProject?.id) return;
    try {
      const teams = await getUserTeams(studyBuddyProject.id);
      if (teams && Array.isArray(teams)) {
        setUserTeams(teams.map(t => t.team_id));
      }
    } catch (err) {
      console.error('Error loading user teams:', err);
      // Silently fail - don't break the UI
    }
  }, [studyBuddyProject?.id, getUserTeams]);

  // Fetch teams and user's teams when component mounts or project changes
  useEffect(() => {
    if (studyBuddyProject?.id) {
      // Add a small delay to prevent rapid fire requests
      const timer = setTimeout(() => {
        fetchTeams(studyBuddyProject.id);
        loadUserTeams();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [studyBuddyProject?.id, fetchTeams, loadUserTeams]);

  // Team icons mapping
  const getTeamIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      '📚': <FileText className="w-8 h-8" />,
      '👁️': <Eye className="w-8 h-8" />,
      '💡': <Lightbulb className="w-8 h-8" />,
      '🧠': <Brain className="w-8 h-8" />,
      '🤖': <Bot className="w-8 h-8" />,
      '📊': <BarChart3 className="w-8 h-8" />,
      '✨': <Sparkles className="w-8 h-8" />,
      '🎼': <Cpu className="w-8 h-8" />
    };
    return iconMap[iconName] || <FileText className="w-8 h-8" />;
  };

  // Handle team join
  const handleJoinTeam = async (teamId: string) => {
    if (!studyBuddyProject?.id || joiningTeam) return;

    setJoiningTeam(teamId);
    setJoinError(null);
    setJoinSuccess(null);

    const result = await joinTeam(studyBuddyProject.id, teamId);
    if (result && 'success' in result && result.success) {
      // Refresh user teams (fetchTeams is called automatically by hook)
      await loadUserTeams();
      setJoinSuccess('Successfully joined team! 🎓');
      setTimeout(() => setJoinSuccess(null), 3000);
    } else {
      setJoinError('Failed to join team. You may already be a member or the team may be full.');
      setTimeout(() => setJoinError(null), 5000);
    }
    setJoiningTeam(null);
  };

  // Handle team leave
  const handleLeaveTeam = async (teamId: string) => {
    if (!studyBuddyProject?.id || joiningTeam) return;

    setJoiningTeam(teamId);
    setJoinError(null);
    setJoinSuccess(null);

    const result = await leaveTeam(studyBuddyProject.id, teamId);
    if (result && 'success' in result && result.success) {
      // Refresh user teams (fetchTeams is called automatically by hook)
      await loadUserTeams();
      setJoinSuccess('Successfully left team! 👋');
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
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Study Buddy
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300">Personal tutor that adapts to your learning style and maximizes knowledge retention</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveSection('vision')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'vision'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/50 text-white'
                : 'bg-card hover:bg-secondary dark:bg-gray-800 dark:hover:bg-gray-700 text-foreground'
            }`}
          >
            <BookOpen className="inline mr-2" size={20} />
            Vision
          </button>
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'architecture'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/50 text-white'
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
                ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/50 text-white'
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
          <div className="bg-card dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-green-500/20 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-300">🧠 The Future of Learning: When AI Understands How Your Mind Works</h2>

            <div className="space-y-8 text-lg">
              <div className="flex items-start gap-6 p-6 bg-secondary/50 dark:bg-gray-700/30 rounded-2xl transition-colors">
                <div className="text-4xl">📖</div>
                <div>
                  <p className="font-semibold text-blue-300 mb-2">Week 1: Cognitive Fingerprinting</p>
                  <p className="text-muted-foreground dark:text-gray-300 mb-3 transition-colors">You're studying for the MCAT. You upload your Kaplan biochemistry textbook and tell your Study Buddy: <span className="text-yellow-300">"I keep forgetting the Krebs cycle enzymes."</span></p>
                  <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-blue-200 italic">Study Buddy's Deep Analysis: "I've analyzed your learning patterns across 47 study sessions. Your brain processes visual information 3.2x faster than text, with peak retention at 7-minute intervals. Your working memory excels with spatial relationships, but struggles with sequential lists. Most importantly, you forget complex biochemical processes with a personal half-life of 2.8 days - faster than average due to your analytical learning style that prioritizes understanding over memorization. Let me create an interactive 3D molecular visualization of the Krebs cycle that maps to your visual-spatial strengths, with spaced repetition precisely timed to your personal forgetting curve and chunked into 7-minute segments that match your optimal attention span."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">🤔</div>
                <div>
                  <p className="font-semibold text-purple-300 mb-2">Week 3: Adaptive Teaching Intelligence</p>
                  <p className="text-gray-300 mb-3">You're struggling with a complex mechanism. <span className="text-yellow-300">"I can't understand how pyruvate becomes acetyl-CoA. The textbook explanation isn't clicking."</span></p>
                  <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="text-purple-200 italic">Study Buddy: "I've detected a conceptual gap in your knowledge network. Your learning profile shows you grasp complex processes 87% better through mechanical analogies vs. abstract descriptions. Here's why this specific concept is challenging: you're missing the spatial relationship between the enzyme complex and substrate. Let me rebuild this using your optimal learning pathway: Think of pyruvate as raw steel entering an automated factory. The pyruvate dehydrogenase complex is a sophisticated 3-stage assembly line: Station 1 removes waste carbon (like quality control removing impurities), Station 2 adds the CoA handle (like attaching a shipping label), and Station 3 captures energy in NADH (like harvesting the heat from welding). This maps perfectly to your engineering background and visual-mechanical learning style. Based on your past successes, this approach will improve your retention by 340% compared to memorizing the textbook description."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">⚡</div>
                <div>
                  <p className="font-semibold text-green-300 mb-2">Week 6: Predictive Learning Mastery</p>
                  <p className="text-gray-300 mb-3">During a practice MCAT, you encounter enzyme inhibition. Before you can even ask for help...</p>
                  <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-200 italic">Study Buddy: "I predicted you'd struggle here. Your reaction time increased by 340ms and your confidence markers dropped when you hit 'competitive vs. non-competitive inhibition' - this exact pattern happened 4 times before. But I know what works for you: Remember the parking garage analogy? Competitive inhibition is like someone taking your parking spot - they block the exact space you need. Non-competitive is like a traffic jam 3 blocks away - it affects your ability to get there, but through a different mechanism. I'm pulling up the 3D visualization we created, plus the 3 practice problems where this analogy led to perfect scores. Your brain has already learned this - we just need to activate the right neural pathway. Also, based on your stress response patterns, take 30 seconds to breathe deeply. Your performance improves 23% when you engage your parasympathetic nervous system first."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <div className="text-4xl">🌟</div>
                <div>
                  <p className="font-semibold text-orange-300 mb-2">Month 3: Metacognitive Partnership</p>
                  <p className="text-gray-300 mb-3">During your actual MCAT, you encounter a question type you've never seen before.</p>
                  <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-400">
                    <p className="text-orange-200 italic">Your Internal Study Buddy (internalized): "I recognize this pattern. Even though this specific question is new, the underlying concept maps to the protein folding principles we mastered using the origami analogy. The same spatial reasoning skills apply. I can see three potential approaches: the mechanical analogy method that works 89% of the time for you, the visual breakdown approach that helped with enzyme kinetics, or the first-principles reasoning you use for physics problems. Based on the question structure and your confidence levels, start with the mechanical analogy. If that doesn't immediately clarify, pivot to visual breakdown - but don't spiral into uncertainty. Trust your pattern recognition system. You've built sophisticated mental models that can handle novel applications. This is exactly what true mastery looks like - not memorizing answers, but developing flexible thinking frameworks that adapt to new challenges."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-bold mb-4 text-center text-green-300">🧠 The Cognitive Science Revolution</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Content Intelligence</h4>
                <p className="text-gray-300 text-sm">Upload any textbook, video, or notes - AI maps concepts, builds knowledge graphs, and identifies optimal learning sequences</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Cognitive Profiling</h4>
                <p className="text-gray-300 text-sm">Discovers your unique mental architecture - processing speed, working memory patterns, attention spans, and reasoning preferences</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Memory Science</h4>
                <p className="text-gray-300 text-sm">Personal forgetting curves, optimal review timing, and memory consolidation strategies based on your neurological patterns</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Predictive Mastery</h4>
                <p className="text-gray-300 text-sm">Anticipates confusion points, predicts optimal challenge levels, and builds metacognitive awareness</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Section */}
      {activeSection === 'architecture' && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-300">🧠 Adaptive Learning Architecture</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold mb-4 text-green-300">Knowledge Graph Database</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span>Textbook chapters → concept vectors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span>Video lectures → temporal knowledge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <span>Practice problems → difficulty mapping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Learning patterns → style detection</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Adaptive Learning Pipeline</h3>
                <ol className="space-y-2 text-sm">
                  <li><span className="text-green-400 font-bold">1.</span> Content Intelligence (extract concepts)</li>
                  <li><span className="text-blue-400 font-bold">2.</span> Learning Style Detection (analyze patterns)</li>
                  <li><span className="text-purple-400 font-bold">3.</span> Adaptive Teaching (personalize explanations)</li>
                  <li><span className="text-pink-400 font-bold">4.</span> Memory Optimization (schedule reviews)</li>
                  <li><span className="text-orange-400 font-bold">5.</span> Progress Tracking (celebrate mastery)</li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold mb-4 text-center text-blue-300">🔬 The Science Behind the Magic</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">Personal Forgetting Curves</h4>
                  <p className="text-gray-400">AI learns exactly how fast YOU forget each concept and schedules reviews accordingly</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-blue-300">Adaptive Question Generation</h4>
                  <p className="text-gray-400">Creates questions that match your learning style - visual, analytical, or story-based</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">Confusion Recognition</h4>
                  <p className="text-gray-400">Detects when you're stuck and provides personalized explanations that actually help</p>
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
            <h2 className="text-3xl font-bold mb-4 text-green-300">🏗️ The Art of Personalized Learning</h2>
            <p className="text-xl text-gray-300">Each team builds a piece of the learning intelligence. Trust others with theirs. Together, we revolutionize education.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-green-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20"
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
                    className="w-full text-left mb-4 text-sm text-green-300 hover:text-green-200 transition-colors"
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

                      <div className="border-t border-green-500/20 pt-4">
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

                        {getTeamStatus(team) === 'joined' ? (
                          <button
                            onClick={() => handleLeaveTeam(team.id)}
                            disabled={joiningTeam === team.id}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              joiningTeam === team.id
                                ? 'bg-red-500/50 text-red-300 cursor-wait'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
                            }`}
                          >
                            {joiningTeam === team.id ? 'Leaving...' : 'Leave Team'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleJoinTeam(team.id)}
                            disabled={getTeamStatus(team) === 'full' || joiningTeam === team.id}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              getTeamStatus(team) === 'full'
                                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                : joiningTeam === team.id
                                ? 'bg-green-500/50 text-green-300 cursor-wait'
                                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
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

                  <p className="text-center text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {team.team_vibe}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-bold mb-6 text-center">🚀 The Art of Learning Together</h3>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-bold mb-2">Week 1-2: Content Foundation</h4>
                <p className="text-gray-300 text-sm">Digesters build the knowledge processing pipeline</p>
              </div>

              <div>
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold mb-2">Week 3-4: Learning Intelligence</h4>
                <p className="text-gray-300 text-sm">Style Detectives & Memory Scientists build personalization</p>
              </div>

              <div>
                <div className="text-4xl mb-3">🤖</div>
                <h4 className="font-bold mb-2">Week 5-6: AI Tutoring</h4>
                <p className="text-gray-300 text-sm">Question Generators & Tutor AI create adaptive teaching</p>
              </div>

              <div>
                <div className="text-4xl mb-3">✨</div>
                <h4 className="font-bold mb-2">Week 7-8: Perfect Experience</h4>
                <p className="text-gray-300 text-sm">Interface builders create the magical learning environment</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl font-semibold text-green-300 mb-2">Remember: You're not building an app...</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">You're creating an AI that understands how each mind learns best! 🎓🤖</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}