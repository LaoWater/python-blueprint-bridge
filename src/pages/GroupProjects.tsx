import React, { useState, useEffect } from 'react';
import { Users, Rocket, Brain, Code, Globe, ChevronRight, ChevronLeft, Star, GitBranch, MessageSquare, Target, Loader2, Heart, BookOpen, Trophy, Medal, Award } from 'lucide-react';
import MoodMusicProject from '../components/group-projects/dj_blue';
import WellnessOracle from '../components/group-projects/WellnessOracle';
import AIStudyBuddy from '../components/group-projects/AIStudyBuddy';
import TeamCard from '../components/group-projects/TeamCard';
import UserTeamsDisplay from '../components/group-projects/UserTeamsDisplay';
import ProjectVoting from '../components/group-projects/ProjectVoting';
import { GroupProjectProvider } from '../contexts/GroupProjectContext';
import { useGroupProjects } from '../hooks/useGroupProjects';
import { useAuth } from '../components/AuthContext';
import { toast } from 'sonner';

export default function GroupProjects() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { projects, teams, loading, error, fetchTeams, clearError } = useGroupProjects();
  const { user } = useAuth();
  const teamsFetchedRef = useRef<Set<string>>(new Set());

  // Auto-select first project - only once
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      const firstProject = projects[0];
      setSelectedProject(firstProject.id);
    }
  }, [projects.length]); // Only depend on length

  // Fetch teams only when needed and not already fetched
  useEffect(() => {
    if (selectedProject && !teamsFetchedRef.current.has(selectedProject)) {
      if (activeView === 'overview' || activeView === 'philosophy' || 
          activeView === 'wellness-oracle' || activeView === 'ai-study-buddy' || 
          activeView === 'dj-blue') {
        fetchTeams(selectedProject);
        teamsFetchedRef.current.add(selectedProject);
      }
    }
  }, [selectedProject, activeView]); // Controlled dependencies

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/10 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 text-foreground pb-20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-blue-600/20 dark:to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Group Projects
            </h1>
            <p className="text-2xl text-primary dark:text-blue-200 mb-4">
              Stepping into the Real World
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where algorithms meet human collaboration. Here we learn the most crucial skill:
              <span className="text-primary dark:text-blue-300 font-semibold"> working with other programmers</span> to build something bigger than any individual could create alone.
            </p>
          </div>
        </div>
      </div>

      {/* Project Navigation - Subtle & Beautiful */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-card/60 to-card/40 dark:from-slate-800/40 dark:to-slate-700/40 backdrop-blur-md rounded-2xl border border-border dark:border-slate-600/30 p-2 transition-colors duration-300">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveView('wellness-oracle')}
              className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === 'wellness-oracle'
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 shadow-lg shadow-pink-500/20'
                  : 'hover:bg-secondary dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className={`w-4 h-4 ${activeView === 'wellness-oracle' ? 'text-pink-500 dark:text-pink-400' : 'text-muted-foreground dark:text-slate-400 group-hover:text-pink-500 dark:group-hover:text-pink-400'} transition-colors`} />
                <span className={`text-sm font-medium ${activeView === 'wellness-oracle' ? 'text-pink-600 dark:text-pink-300' : 'text-foreground dark:text-slate-300 group-hover:text-pink-600 dark:group-hover:text-pink-300'} transition-colors`}>
                  Wellness Oracle
                </span>
              </div>
              {activeView === 'wellness-oracle' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveView('ai-study-buddy')}
              className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === 'ai-study-buddy'
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/20'
                  : 'hover:bg-secondary dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen className={`w-4 h-4 ${activeView === 'ai-study-buddy' ? 'text-blue-500 dark:text-blue-400' : 'text-muted-foreground dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'} transition-colors`} />
                <span className={`text-sm font-medium ${activeView === 'ai-study-buddy' ? 'text-blue-600 dark:text-blue-300' : 'text-foreground dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-300'} transition-colors`}>
                  AI Study Buddy
                </span>
              </div>
              {activeView === 'ai-study-buddy' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveView('dj-blue')}
              className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === 'dj-blue'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shadow-lg shadow-indigo-500/20'
                  : 'hover:bg-secondary dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Rocket className={`w-4 h-4 ${activeView === 'dj-blue' ? 'text-indigo-500 dark:text-indigo-400' : 'text-muted-foreground dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'} transition-colors`} />
                <span className={`text-sm font-medium ${activeView === 'dj-blue' ? 'text-indigo-600 dark:text-indigo-300' : 'text-foreground dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'} transition-colors`}>
                  DJ BlueAI
                </span>
              </div>
              {activeView === 'dj-blue' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'overview'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground'
            }`}
          >
            <Globe className="inline mr-2" size={20} />
            Real World Skills
          </button>
          <button
            onClick={() => setActiveView('philosophy')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'philosophy'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            Collaboration Art
          </button>
          <button
            onClick={() => setActiveView('leaderboard')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'leaderboard'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground'
            }`}
          >
            <Trophy className="inline mr-2" size={20} />
            Community Vote
          </button>
        </div>
      </div>

      {/* Overview Section */}
      {activeView === 'overview' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-border dark:border-blue-500/20 transition-colors duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Team Dynamics</h3>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Learn to divide complex problems into manageable pieces that different people can own.
                  Master the art of clear communication between code components.
                </p>
              </div>

              <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-border dark:border-purple-500/20 transition-colors duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Code Integration</h3>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Discover how individual algorithms connect to form complete systems.
                  Experience the magic when separate components work together seamlessly.
                </p>
              </div>

              <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-border dark:border-green-500/20 transition-colors duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-300">Real Impact</h3>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Build projects that solve actual problems. Learn to think beyond algorithms
                  and consider user experience, maintainability, and real-world constraints.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-border dark:border-blue-500/30 mb-12 transition-colors duration-300">
              <h3 className="text-3xl font-bold mb-6 text-center">🎯 The Art of Programming Evolution</h3>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4">🧠</div>
                  <h4 className="text-xl font-bold mb-3 text-blue-300">Individual Mastery</h4>
                  <p className="text-muted-foreground dark:text-slate-300">Algorithms, data structures, and pattern recognition form your foundation.</p>
                </div>

                <div className="flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-blue-400" />
                </div>

                <div>
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold mb-3 text-purple-300">Collective Creation</h4>
                  <p className="text-muted-foreground dark:text-slate-300">Combining minds to build systems that change the world.</p>
                </div>
              </div>
            </div>

            {/* Group Projects Cards */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-center text-blue-300">🚀 Jump Into Real Projects</h3>
              <p className="text-center text-xl text-muted-foreground dark:text-slate-300 mb-8">
                Ready to apply your skills? Join a team and start building
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Wellness Oracle Card */}
                <div
                  onClick={() => setActiveView('wellness-oracle')}
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-pink-300">Personal Wellness Oracle</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      AI companion that discovers patterns in daily diary entries and guides optimal living through holistic understanding.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Join Teams</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* AI Study Buddy Card */}
                <div
                  onClick={() => setActiveView('ai-study-buddy')}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-blue-300">AI Study Buddy</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Personalized learning companion that adapts to your pace, identifies knowledge gaps, and creates optimal study paths.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-cyan-300">
                      <span>Join Teams</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* DJ Blue Card */}
                <div
                  onClick={() => setActiveView('dj-blue')}
                  className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-indigo-300">DJ BlueAI</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Mood-adaptive music assistant that reads emotional state and curates perfect soundscapes for any moment.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Join Teams</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Philosophy Section */}
      {activeView === 'philosophy' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-border dark:border-blue-500/20 transition-colors duration-300">
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-300">The Collaboration Mindset</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="text-4xl">🧩</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-purple-300">Think in Components</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      Every complex system is built from simple, well-defined pieces. Learn to break problems down
                      so that each person can focus on their expertise while trusting others with theirs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">🔗</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-blue-300">Design Clear Interfaces</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      The magic happens at the boundaries. How components talk to each other determines
                      whether your system flows like poetry or crashes like chaos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">💝</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-green-300">Trust and Verification</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      Great teams trust each other's code while building systems to verify everything works.
                      It's not about doubt—it's about creating confidence through good engineering.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">✨</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-pink-300">Emergence Over Control</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      The best systems emerge from good principles rather than rigid control.
                      Set clear patterns, then let creativity flourish within those boundaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Group Projects Cards */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-center text-purple-300">🚀 Apply These Principles</h3>
              <p className="text-center text-xl text-muted-foreground dark:text-slate-300 mb-8">
                Choose a project below to see collaboration in action
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Wellness Oracle Card */}
                <div
                  onClick={() => setActiveView('wellness-oracle')}
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-pink-300">Personal Wellness Oracle</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      AI life coach that understands your patterns and guides you toward optimal living through deep biological intelligence.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Explore Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* AI Study Buddy Card */}
                <div
                  onClick={() => setActiveView('ai-study-buddy')}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-blue-300">AI Study Buddy</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Personalized learning companion that adapts to your pace, identifies knowledge gaps, and creates optimal study paths.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-cyan-300">
                      <span>Explore Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* DJ Blue Card */}
                <div
                  onClick={() => setActiveView('dj-blue')}
                  className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-indigo-300">DJ BlueAI</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Mood-adaptive music assistant that reads your emotional state and curates perfect soundscapes for any moment.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Explore Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-border dark:border-purple-500/30 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-300">Remember: Programming is a Social Art</h3>
              <p className="text-center text-xl text-muted-foreground dark:text-slate-300">
                The most beautiful code is not just elegant—it's <span className="text-purple-300 font-semibold">understandable, maintainable, and collaborative</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      {activeView === 'leaderboard' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-yellow-300">🏆 Community Leaderboard</h2>
              <p className="text-xl text-muted-foreground dark:text-slate-300">
                Vote for the projects you want to see prioritized! Each user gets one vote per project.
              </p>
            </div>

            <div className="space-y-6">
              {projects
                .sort((a, b) => (b.vote_score || 0) - (a.vote_score || 0))
                .map((project, index) => {
                  const getRankIcon = () => {
                    if (index === 0) return <Trophy className="w-8 h-8 text-yellow-400" />;
                    if (index === 1) return <Medal className="w-8 h-8 text-gray-300" />;
                    if (index === 2) return <Award className="w-8 h-8 text-orange-400" />;
                    return <div className="w-8 h-8 bg-secondary dark:bg-slate-600 rounded-full flex items-center justify-center text-muted-foreground dark:text-slate-300 font-bold">#{index + 1}</div>;
                  };

                  const getRankClass = () => {
                    if (index === 0) return 'border-yellow-400/30 bg-yellow-400/5';
                    if (index === 1) return 'border-gray-300/30 bg-gray-300/5';
                    if (index === 2) return 'border-orange-400/30 bg-orange-400/5';
                    return 'border-border dark:border-slate-600/30 bg-card/20 dark:bg-slate-800/20';
                  };

                  return (
                    <div key={project.id} className={`bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border-2 ${getRankClass()} transition-colors duration-300`}>
                      <div className="flex items-start gap-6">
                        <div className="flex flex-col items-center gap-2">
                          {getRankIcon()}
                          <span className="text-2xl font-bold text-muted-foreground dark:text-slate-300">#{index + 1}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold mb-2 text-foreground dark:text-slate-100">{project.name}</h3>
                              <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">{project.description}</p>
                            </div>

                            <div className="ml-6 shrink-0">
                              <ProjectVoting
                                projectId={project.id}
                                projectName={project.name}
                                currentVotes={{
                                  votes_up: project.votes_up || 0,
                                  votes_down: project.votes_down || 0,
                                  vote_score: project.vote_score || 0
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground dark:text-slate-400">
                            <div>
                              <span className="font-medium">Difficulty:</span> {'⭐'.repeat(project.difficulty_level)}
                            </div>
                            <div>
                              <span className="font-medium">Participants:</span> {project.current_participants}/{project.max_participants}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span> {project.project_type.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl p-6 border-2 border-blue-500/30 dark:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 text-center text-blue-600 dark:text-blue-300">How Voting Works</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 text-base">👍 Upvote a Project</h4>
                  <p className="text-foreground/80 dark:text-slate-300">Show support for projects you want to see prioritized and actively developed by the community.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 text-base">👎 Downvote a Project</h4>
                  <p className="text-foreground/80 dark:text-slate-300">Express concerns or suggest that resources might be better allocated elsewhere.</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground dark:text-slate-400 font-medium">
                  • One vote per project per user • You can change your vote anytime • Projects are ranked by total score (upvotes - downvotes)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wellness Oracle Project Detail */}
      {activeView === 'wellness-oracle' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-6">
            <button
              onClick={() => setActiveView('philosophy')}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors duration-300 text-muted-foreground dark:text-slate-300 hover:text-foreground dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collaboration Art
            </button>
          </div>
          <WellnessOracle />
        </div>
      )}

      {/* AI Study Buddy Project Detail */}
      {activeView === 'ai-study-buddy' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-6">
            <button
              onClick={() => setActiveView('philosophy')}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors duration-300 text-muted-foreground dark:text-slate-300 hover:text-foreground dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collaboration Art
            </button>
          </div>
          <AIStudyBuddy />
        </div>
      )}

      {/* DJ Blue Project Detail */}
      {activeView === 'dj-blue' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-6">
            <button
              onClick={() => setActiveView('philosophy')}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors duration-300 text-muted-foreground dark:text-slate-300 hover:text-foreground dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collaboration Art
            </button>
          </div>
          <MoodMusicProject />
        </div>
      )}
    </div>
  );
}