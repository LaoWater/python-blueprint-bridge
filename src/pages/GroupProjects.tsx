import React, { useState, useEffect } from 'react';
import { Users, Rocket, Brain, Code, Globe, ChevronRight, Star, GitBranch, MessageSquare, Target, Loader2 } from 'lucide-react';
import MoodMusicProject from '../components/group-projects/dj_blue';
import TeamCard from '../components/group-projects/TeamCard';
import { GroupProjectProvider } from '../contexts/GroupProjectContext';
import { useGroupProjects } from '../hooks/useGroupProjects';
import { useAuth } from '../components/AuthContext';
import { toast } from 'sonner';

export default function GroupProjects() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { projects, teams, loading, error, fetchTeams, clearError } = useGroupProjects();
  const { user } = useAuth();

  // Auto-select DJ Blue project
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      const djBlue = projects.find(p => p.name.includes('DJ Blue'));
      if (djBlue) {
        setSelectedProject(djBlue.id);
        fetchTeams(djBlue.id);
      }
    }
  }, [projects, selectedProject, fetchTeams]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Group Projects
            </h1>
            <p className="text-2xl text-blue-200 mb-4">
              Stepping into the Real World
            </p>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Where algorithms meet human collaboration. Here we learn the most crucial skill:
              <span className="text-blue-300 font-semibold"> working with other programmers</span> to build something bigger than any individual could create alone.
            </p>
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
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <Globe className="inline mr-2" size={20} />
            Real World Skills
          </button>
          <button
            onClick={() => setActiveView('philosophy')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'philosophy'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            Collaboration Art
          </button>
          <button
            onClick={() => setActiveView('projects')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'projects'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <Rocket className="inline mr-2" size={20} />
            Live Projects
          </button>
        </div>
      </div>

      {/* Overview Section */}
      {activeView === 'overview' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Team Dynamics</h3>
                <p className="text-slate-300 leading-relaxed">
                  Learn to divide complex problems into manageable pieces that different people can own.
                  Master the art of clear communication between code components.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Code Integration</h3>
                <p className="text-slate-300 leading-relaxed">
                  Discover how individual algorithms connect to form complete systems.
                  Experience the magic when separate components work together seamlessly.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-300">Real Impact</h3>
                <p className="text-slate-300 leading-relaxed">
                  Build projects that solve actual problems. Learn to think beyond algorithms
                  and consider user experience, maintainability, and real-world constraints.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-blue-500/30">
              <h3 className="text-3xl font-bold mb-6 text-center">🎯 The Art of Programming Evolution</h3>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4">🧠</div>
                  <h4 className="text-xl font-bold mb-3 text-blue-300">Individual Mastery</h4>
                  <p className="text-slate-300">Algorithms, data structures, and pattern recognition form your foundation.</p>
                </div>

                <div className="flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-blue-400" />
                </div>

                <div>
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold mb-3 text-purple-300">Collective Creation</h4>
                  <p className="text-slate-300">Combining minds to build systems that change the world.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Philosophy Section */}
      {activeView === 'philosophy' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-blue-500/20">
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-300">The Collaboration Mindset</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="text-4xl">🧩</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-purple-300">Think in Components</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Every complex system is built from simple, well-defined pieces. Learn to break problems down
                      so that each person can focus on their expertise while trusting others with theirs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">🔗</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-blue-300">Design Clear Interfaces</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      The magic happens at the boundaries. How components talk to each other determines
                      whether your system flows like poetry or crashes like chaos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">💝</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-green-300">Trust and Verification</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Great teams trust each other's code while building systems to verify everything works.
                      It's not about doubt—it's about creating confidence through good engineering.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">✨</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-pink-300">Emergence Over Control</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      The best systems emerge from good principles rather than rigid control.
                      Set clear patterns, then let creativity flourish within those boundaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-300">Remember: Programming is a Social Art</h3>
              <p className="text-center text-xl text-slate-300">
                The most beautiful code is not just elegant—it's <span className="text-purple-300 font-semibold">understandable, maintainable, and collaborative</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Projects Section */}
      {activeView === 'projects' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-blue-300">Live Group Projects</h2>
              <p className="text-xl text-slate-300">
                Real projects where teams of programmers collaborate to build amazing systems
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                <span className="ml-2 text-slate-300">Loading projects...</span>
              </div>
            ) : (
              <>
                {/* Project Selection */}
                {projects.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-300 mb-4">Choose a Project:</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => {
                            setSelectedProject(project.id);
                            fetchTeams(project.id);
                          }}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            selectedProject === project.id
                              ? 'bg-purple-500/20 border-purple-500/50 text-purple-200'
                              : 'bg-slate-800/50 border-slate-600/30 text-slate-300 hover:bg-slate-700/50'
                          }`}
                        >
                          <h4 className="font-bold mb-2">{project.name}</h4>
                          <p className="text-sm opacity-80 mb-2">{project.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span>Difficulty: {'⭐'.repeat(project.difficulty_level)}</span>
                            <span>•</span>
                            <span>{project.current_participants}/{project.max_participants} members</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Teams for Selected Project */}
                {selectedProject && teams.length > 0 && (
                  <GroupProjectProvider projectId={selectedProject}>
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg rounded-3xl p-8 border border-blue-500/30">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-purple-300">Project Teams</h3>
                        <p className="text-slate-400">Choose your role and join a team</p>
                        {!user && (
                          <p className="text-orange-400 text-sm mt-2">Log in to join teams</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                          <TeamCard
                            key={team.id}
                            team={team}
                            projectId={selectedProject}
                          />
                        ))}
                      </div>
                    </div>
                  </GroupProjectProvider>
                )}

                {/* Coming Soon Projects */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-center mb-8 text-slate-300">Coming Soon</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-blue-300">Smart Code Reviewer</h3>
                          <p className="text-slate-400">Coming Soon</p>
                        </div>
                      </div>
                      <p className="text-slate-300 mb-4">
                        AI-powered code review system that learns from the best practices of expert programmers
                        and provides contextual feedback for improving code quality.
                      </p>
                      <div className="text-sm text-slate-400">
                        Teams: Analysis • Pattern Recognition • Feedback Generation • Integration
                      </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-green-300">Collaborative Learning Bot</h3>
                          <p className="text-slate-400">Coming Soon</p>
                        </div>
                      </div>
                      <p className="text-slate-300 mb-4">
                        An intelligent tutoring system that adapts to individual learning styles and facilitates
                        peer-to-peer knowledge sharing in programming education.
                      </p>
                      <div className="text-sm text-slate-400">
                        Teams: Learning Analytics • Content Generation • Peer Matching • Assessment
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* DJ Blue Project Detail */}
      {activeView === 'dj-blue' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-8 text-center">
            <button
              onClick={() => setActiveView('projects')}
              className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
            >
              ← Back to Projects
            </button>
          </div>
          <MoodMusicProject />
        </div>
      )}
    </div>
  );
}