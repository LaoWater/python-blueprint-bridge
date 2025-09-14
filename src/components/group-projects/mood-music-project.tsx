import React, { useState } from 'react';
import { Music, Mic, Brain, Users, Volume2, Sparkles, Headphones, Play, FileAudio, Database, Cpu, Palette, Puzzle, Rocket, Heart } from 'lucide-react';

export default function MoodMusicProject() {
  const [activeSection, setActiveSection] = useState('vision');
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const teams = [
    {
      id: 1,
      name: "The Listeners",
      icon: <Mic className="w-8 h-8" />,
      color: "from-purple-400 to-pink-400",
      mission: "Record conversations with a simple Python script",
      tasks: [
        "Press record, save as MP3",
        "Split audio every 10 minutes",
        "Name files with timestamps",
        "Keep a backup folder"
      ],
      difficulty: "⭐⭐",
      vibe: "You're the ears of the system! 👂"
    },
    {
      id: 2,
      name: "The Music Librarians",
      icon: <FileAudio className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-400",
      mission: "Organize our music collection",
      tasks: [
        "Collect 50+ MP3 songs",
        "Create mood folders (Happy, Chill, Party, Focus)",
        "Make a simple spreadsheet of songs",
        "Test all files play correctly"
      ],
      difficulty: "⭐",
      vibe: "You're the heart of the playlist! 💿"
    },
    {
      id: 3,
      name: "The Translators",
      icon: <Brain className="w-8 h-8" />,
      color: "from-green-400 to-emerald-400",
      mission: "Turn audio into text we can read",
      tasks: [
        "Use Whisper or Google Speech API",
        "Save transcripts as text files",
        "Handle errors gracefully",
        "Keep the last 3 transcripts"
      ],
      difficulty: "⭐⭐⭐",
      vibe: "You're the bridge to understanding! 🌉"
    },
    {
      id: 4,
      name: "The Mood Readers",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-400",
      mission: "Feel the vibe of the conversation",
      tasks: [
        "Send transcript to ChatGPT",
        "Ask: 'What's the mood? Scale 1-10 energy?'",
        "Get back: mood type + energy level",
        "Remember the last 3 moods"
      ],
      difficulty: "⭐⭐⭐⭐",
      vibe: "You're the soul of the system! ✨"
    },
    {
      id: 5,
      name: "The DJs",
      icon: <Headphones className="w-8 h-8" />,
      color: "from-indigo-400 to-purple-400",
      mission: "Pick the perfect next songs",
      tasks: [
        "Match mood to music genre",
        "Pick 3 songs for the queue",
        "Avoid repeating recent songs",
        "Smooth energy transitions"
      ],
      difficulty: "⭐⭐⭐",
      vibe: "You're the taste makers! 🎵"
    },
    {
      id: 6,
      name: "The Sound Engineers",
      icon: <Volume2 className="w-8 h-8" />,
      color: "from-red-400 to-pink-400",
      mission: "Play music smoothly",
      tasks: [
        "Build a Python music player",
        "Handle play, pause, skip",
        "Adjust volume based on conversation",
        "Smooth transitions between songs"
      ],
      difficulty: "⭐⭐⭐⭐",
      vibe: "You're the rhythm keeper! 🎚️"
    },
    {
      id: 7,
      name: "The AI Designers",
      icon: <Palette className="w-8 h-8" />,
      color: "from-teal-400 to-blue-400",
      mission: "Make it beautiful and easy to use",
      tasks: [
        "Design a simple music player UI",
        "Show current song & next 2 songs",
        "Add play/pause/skip buttons",
        "Display current mood with colors"
      ],
      difficulty: "⭐⭐⭐",
      vibe: "You're the face of the magic! 🎨"
    },
    {
      id: 8,
      name: "The Architects",
      icon: <Puzzle className="w-8 h-8" />,
      color: "from-gray-400 to-gray-600",
      mission: "Connect all the pieces together",
      tasks: [
        "Make teams talk to each other",
        "Create the main program loop",
        "Handle errors between components",
        "Test the complete system"
      ],
      difficulty: "⭐⭐⭐⭐⭐",
      vibe: "You're the master builders! 🏗️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
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
            <h2 className="text-3xl font-bold mb-6 text-center">🎭 How Would We Do It As Humans?</h2>
            
            <div className="space-y-6 text-lg">
              <div className="flex items-start gap-4">
                <span className="text-3xl">👥</span>
                <div>
                  <p className="font-semibold text-purple-300">You're at a party...</p>
                  <p className="text-gray-300">You notice people are having deep conversations. The energy is mellow. You'd naturally lower the music and play something chill.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="font-semibold text-purple-300">Suddenly everyone starts laughing...</p>
                  <p className="text-gray-300">The mood shifts! People are energized. Time to gradually turn up something more upbeat!</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">🤖</span>
                <div>
                  <p className="font-semibold text-purple-300">Our AI DJ does exactly this!</p>
                  <p className="text-gray-300">It listens, understands the vibe, and adjusts the music - just like a thoughtful friend would.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4 text-center">✨ The Magic Formula</h3>
            <div className="flex justify-around items-center text-center">
              <div>
                <Mic className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                <p>Listen</p>
              </div>
              <span className="text-2xl">→</span>
              <div>
                <Brain className="w-12 h-12 mx-auto mb-2 text-pink-400" />
                <p>Understand</p>
              </div>
              <span className="text-2xl">→</span>
              <div>
                <Music className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                <p>Play</p>
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
                onMouseEnter={() => setHoveredTeam(team.id)}
                onMouseLeave={() => setHoveredTeam(null)}
                className={`relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 transition-all duration-300 ${
                  hoveredTeam === team.id ? 'scale-105 shadow-2xl shadow-purple-500/20' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-10 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${team.color} rounded-xl`}>
                      {team.icon}
                    </div>
                    <span className="text-2xl">{team.difficulty}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                  <p className="text-gray-300 mb-4">{team.mission}</p>

                  {hoveredTeam === team.id && (
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold text-sm text-purple-300">Your Tasks:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {team.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-center text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {team.vibe}
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