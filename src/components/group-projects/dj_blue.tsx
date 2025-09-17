import React, { useState, useEffect, useCallback } from 'react';
import { Music, Mic, Brain, Users, Volume2, Sparkles, Headphones, Play, FileAudio, Database, Cpu, Palette, Puzzle, Rocket, Heart } from 'lucide-react';

import { useGroupProjects } from '../../hooks/useGroupProjects';

export default function MoodMusicProject() {
  const [activeSection, setActiveSection] = useState('teams');
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [joiningTeam, setJoiningTeam] = useState<string | null>(null);
  const [userTeams, setUserTeams] = useState<string[]>([]);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const { projects, teams, fetchTeams, joinTeam, leaveTeam, getUserTeams, loading, error } = useGroupProjects();

  // Get the DJ Blue project
  const djBlueProject = projects.find(p => p.name === 'DJ Blue - Group Mood Music Assistant');

  // Load user's current teams
  const loadUserTeams = useCallback(async () => {
    if (!djBlueProject?.id) return;
    try {
      const teams = await getUserTeams(djBlueProject.id);
      if (teams && Array.isArray(teams)) {
        setUserTeams(teams.map(t => t.team_id));
      }
    } catch (err) {
      console.error('Error loading user teams:', err);
      // Silently fail - don't break the UI
    }
  }, [djBlueProject?.id, getUserTeams]);

  // Fetch teams and user's teams when component mounts or project changes
  useEffect(() => {
    if (djBlueProject?.id) {
      // Add a small delay to prevent rapid fire requests
      const timer = setTimeout(() => {
        fetchTeams(djBlueProject.id);
        loadUserTeams();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [djBlueProject?.id, fetchTeams, loadUserTeams]);

  // Team icons mapping
  const getTeamIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      '🎤': <Mic className="w-8 h-8" />,
      '🎵': <FileAudio className="w-8 h-8" />,
      '🧠': <Brain className="w-8 h-8" />,
      '✨': <Sparkles className="w-8 h-8" />,
      '🎧': <Headphones className="w-8 h-8" />,
      '🔊': <Volume2 className="w-8 h-8" />,
      '🎨': <Palette className="w-8 h-8" />,
      '🧩': <Puzzle className="w-8 h-8" />
    };
    return iconMap[iconName] || <Music className="w-8 h-8" />;
  };

  // Handle team join
  const handleJoinTeam = async (teamId: string) => {
    if (!djBlueProject?.id || joiningTeam) return;

    setJoiningTeam(teamId);
    setJoinError(null);
    setJoinSuccess(null);

    const result = await joinTeam(djBlueProject.id, teamId);
    if (result && 'success' in result && result.success) {
      // Refresh user teams (fetchTeams is called automatically by hook)
      await loadUserTeams();
      setJoinSuccess('Successfully joined team! 🎵');
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

  return (
    <div className="w-full bg-transparent text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Group Mood Music Assistant
          </h1>
          <p className="text-xl text-gray-300">A magical DJ that reads the room and plays the perfect soundtrack</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSection('vision')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'vision' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Heart className="inline mr-2" size={20} />
            The Vision
          </button>
          <button
            onClick={() => setActiveSection('mental')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'mental' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            Mental Model
          </button>
          <button
            onClick={() => setActiveSection('teams')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'teams' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 text-center">🎭 The Art of Reading Human Energy: From Intuition to Intelligence</h2>

            <div className="space-y-8 text-lg">
              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <span className="text-4xl">👥</span>
                <div>
                  <p className="font-semibold text-purple-300 mb-2">Corporate Event (7:32 PM) - The Subtle Art of Professional Energy</p>
                  <p className="text-gray-300 mb-3">You notice the networking event's energy: conversations are focused but tense, people speak in measured tones about quarterly reports and market projections. The music is currently jazz at medium volume.</p>
                  <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="text-purple-200 italic">DJ Blue's Advanced Analysis: "Detecting professional anxiety markers in speech patterns: 23% slower speech rate, 15% longer pauses between words, formal vocabulary density at 87%. Stress indicators suggest cognitive load from work discussions. Current jazz tempo (140 BPM) is creating subliminal urgency. Optimal intervention: transition to ambient instrumental at 90-110 BPM, reduce volume by 15%, select tracks with natural harmonies to activate parasympathetic nervous system. This will reduce cortisol response and encourage deeper, more authentic networking conversations."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <span className="text-4xl">🎉</span>
                <div>
                  <p className="font-semibold text-pink-300 mb-2">House Party (11:15 PM) - Reading Micro-Expressions Through Audio</p>
                  <p className="text-gray-300 mb-3">The conversation shifts - sudden bursts of laughter, overlapping speech, playful interruptions. Someone just told a story that triggered genuine joy responses in the group.</p>
                  <div className="bg-pink-900/30 p-4 rounded-lg border-l-4 border-pink-400">
                    <p className="text-pink-200 italic">DJ Blue: "Euphoria cascade detected: authentic laughter signatures (not polite chuckles), dopamine-driven speech acceleration, social bonding vocalizations increasing by 340%. The group has shifted from formal to tribal bonding mode. Current ambient track is emotionally mismatched. Initiating gradual transition: crossfade to uplifting indie track at 128 BPM, increase bass presence for embodied response, time the crescendo with their natural energy peak. Music becomes the invisible amplifier of their existing joy, not an interruption to it."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <span className="text-4xl">🧠</span>
                <div>
                  <p className="font-semibold text-blue-300 mb-2">Study Group (2:45 PM) - Cognitive Load Recognition</p>
                  <p className="text-gray-300 mb-3">Five friends working on calculus problems. Long silences punctuated by frustrated sighs, pencils tapping, occasional "wait, how did you get that?" There's focused concentration but mounting stress.</p>
                  <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-blue-200 italic">DJ Blue: "Cognitive strain pattern identified: increased vocal fry indicating mental fatigue, question intonation suggesting confusion, declining verbal confidence markers. Working memory is approaching capacity limits. Current silence is productive but stress indicators rising. Optimal cognitive support: introduce binaural beats at 40Hz (gamma wave stimulation), layer with nature sounds at barely audible levels, select instrumental tracks with mathematical ratios in melody structure. This enhances focus without conscious distraction, reduces cortisol, and supports sustained attention for complex problem-solving."</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-700/30 rounded-2xl">
                <span className="text-4xl">💫</span>
                <div>
                  <p className="font-semibold text-green-300 mb-2">Date Night (8:20 PM) - Emotional Intimacy Detection</p>
                  <p className="text-gray-300 mb-3">Two people sharing vulnerable stories about their childhood. Speech is soft, intimate, with longer pauses filled with emotional presence rather than awkwardness.</p>
                  <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="text-green-200 italic">DJ Blue: "Intimate connection protocol activated: detecting vulnerability markers (softer vocal tones, increased pause tolerance, storytelling structure), emotional synchronization (matching breathing patterns in speech rhythm), trust-building language patterns. Current environment requires invisible support. Implementing: ultra-subtle ambient soundscape at threshold of perception, frequency spectrum that enhances voice clarity, eliminate any musical elements that could interrupt emotional flow. The goal is to create acoustic intimacy that makes their voices feel like the only sounds in the world - turning the space into an emotional sanctuary."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4 text-center">🧠 The Emotional Intelligence Stack</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Deep Listening</h4>
                <p className="text-gray-300 text-sm">Analyze speech patterns, vocal stress, laughter authenticity, and conversation dynamics</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Emotional Decode</h4>
                <p className="text-gray-300 text-sm">Recognize cognitive load, social bonding, stress markers, and intimacy levels</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Context Awareness</h4>
                <p className="text-gray-300 text-sm">Understand the purpose: networking, celebration, focus, or intimate connection</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold mb-2">Invisible Support</h4>
                <p className="text-gray-300 text-sm">Create the perfect acoustic environment that amplifies human connection</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mental Model Section */}
      {activeSection === 'mental' && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-8 text-center">🧠 The Mental Model</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Every 10 Minutes...</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">1.</span>
                    <span>Save the last 10 minutes of conversation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">2.</span>
                    <span>Convert speech to text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">3.</span>
                    <span>Ask AI: "What's the mood here?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">4.</span>
                    <span>Get mood + energy level (1-10)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">5.</span>
                    <span>Pick 3 perfect songs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">6.</span>
                    <span>Queue them up smoothly</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Mood → Music Mapping</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span>😊 Happy</span>
                    <span className="text-yellow-400">→ Pop, Upbeat</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span>😌 Chill</span>
                    <span className="text-green-400">→ Lo-fi, Acoustic</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span>🎉 Party</span>
                    <span className="text-pink-400">→ Dance, Electronic</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span>🤔 Focus</span>
                    <span className="text-blue-400">→ Instrumental, Classical</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span>😴 Winding Down</span>
                    <span className="text-purple-400">→ Ambient, Soft</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-bold mb-4 text-orange-300 text-center">The Beautiful Loop</h3>
              <div className="text-center text-lg">
                <p className="mb-2">Listen (continuously) → Analyze (every 10 min) → Select Music → Play Smoothly</p>
                <p className="text-gray-400">↺ Repeat Forever ↺</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teams Section */}
      {activeSection === 'teams' && (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🏗️ The Art of Breaking It Down</h2>
            <p className="text-xl text-gray-300">Each team owns their brick. Trust others with theirs. Together, we build magic.</p>
          </div>

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
                    {expandedTeam === team.id ? '▼ Hide Details' : '▶ View Tasks & Join Team'}
                  </button>

                  {expandedTeam === team.id && (
                    <div className="space-y-4 mb-4 animate-in fade-in duration-200">
                      <div>
                        <p className="font-semibold text-sm text-purple-300 mb-2">Your Tasks:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {team.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-400 mt-1">•</span>
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

          <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-6 text-center">🚀 The Art of Putting It Together</h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">📦</div>
                <h4 className="font-bold mb-2">Week 1-2: Build Your Brick</h4>
                <p className="text-gray-300">Each team perfects their component independently</p>
              </div>
              
              <div>
                <div className="text-4xl mb-3">🔗</div>
                <h4 className="font-bold mb-2">Week 3: Connect the Dots</h4>
                <p className="text-gray-300">Teams start talking to each other's code</p>
              </div>
              
              <div>
                <div className="text-4xl mb-3">✨</div>
                <h4 className="font-bold mb-2">Week 4: The Magic Happens</h4>
                <p className="text-gray-300">Everything flows together as one system</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl font-semibold text-purple-300">Remember: You're not building software...</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">You're creating magic that reads minds and plays souls! 🎵</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}