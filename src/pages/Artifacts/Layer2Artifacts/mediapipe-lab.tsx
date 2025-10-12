import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Play, Zap, Target, Eye, Hand, PersonStanding, Info, AlertTriangle, CheckCircle, Code, Smartphone, Cpu, Globe, Copy, Check } from 'lucide-react';

const MediaPipeLab = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<'pose' | 'hands' | 'face' | null>(null);
  const [showHelp, setShowHelp] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const demos = [
    {
      id: 'pose' as const,
      title: 'Pose Estimation',
      icon: PersonStanding,
      color: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBg: 'from-blue-950/30 to-cyan-950/30',
      description: 'Track full body pose with 33 landmarks - perfect for workout form analysis',
      useCase: 'Fitness apps (Peloton, Apple Fitness+), Physical therapy, Posture monitoring',
      demoFeatures: [
        'Real-time body landmark detection',
        'Calculate joint angles (knee, hip, shoulder)',
        'Count exercise reps automatically',
        'Detect squat depth and form quality'
      ],
      codeSnippet: `import mediapipe as mp

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Process frame
results = pose.process(frame)

# Get landmarks (33 points)
landmarks = results.pose_landmarks.landmark

# Calculate knee angle
hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]
ankle = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]

angle = calculate_angle(hip, knee, ankle)
print(f"Knee angle: {angle}°")`,
      whyItMatters: 'Building pose estimation from scratch requires PhD-level expertise, years of training data, and millions in compute. MediaPipe gives it to you in 5 lines of code.'
    },
    {
      id: 'hands' as const,
      title: 'Hand Tracking',
      icon: Hand,
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      darkBg: 'from-green-950/30 to-emerald-950/30',
      description: 'Track 21 hand landmarks per hand - enable gesture-based interfaces',
      useCase: 'Virtual try-on, Sign language recognition, Touchless UI, Gaming controls',
      demoFeatures: [
        'Detect up to 2 hands simultaneously',
        'Track 21 landmarks per hand',
        'Recognize gestures (pinch, swipe, point)',
        'Calculate hand orientation and distance'
      ],
      codeSnippet: `import mediapipe as mp

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=2)

results = hands.process(frame)

if results.multi_hand_landmarks:
    for hand_landmarks in results.multi_hand_landmarks:
        # Get thumb tip and index tip
        thumb = hand_landmarks.landmark[4]
        index = hand_landmarks.landmark[8]

        # Calculate pinch distance
        distance = np.sqrt(
            (thumb.x - index.x)**2 +
            (thumb.y - index.y)**2
        )

        if distance < 0.05:
            print("Pinch detected! 📸")`,
      whyItMatters: 'Hand tracking enables touchless interfaces - critical for hygiene-conscious applications, AR/VR, and accessibility features.'
    },
    {
      id: 'face' as const,
      title: 'Face Mesh',
      icon: Eye,
      color: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      darkBg: 'from-purple-950/30 to-pink-950/30',
      description: 'Track 468 facial landmarks - for makeup filters, emotion detection, gaze tracking',
      useCase: 'Snapchat/Instagram filters, Video conferencing (background blur), Driver attention monitoring',
      demoFeatures: [
        'Detect 468 facial landmarks',
        'Track eyes, lips, eyebrows precisely',
        'Measure head pose and gaze direction',
        'Real-time performance (30+ FPS)'
      ],
      codeSnippet: `import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

results = face_mesh.process(frame)

if results.multi_face_landmarks:
    for face_landmarks in results.multi_face_landmarks:
        # Get key points
        nose_tip = face_landmarks.landmark[1]
        left_eye = face_landmarks.landmark[33]
        right_eye = face_landmarks.landmark[263]

        # Calculate gaze direction
        gaze_vector = calculate_gaze(
            nose_tip, left_eye, right_eye
        )

        if gaze_vector.y > 0.3:
            print("⚠️ Looking down - poor posture!")`,
      whyItMatters: 'Face mesh powers every AR filter you use, monitors driver attention in autonomous vehicles, and enables accessibility features like gaze-based control.'
    }
  ];

  const activeData = demos.find(d => d.id === activeDemo);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/artifacts/computer-vision-session28')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Session 28</span>
          </button>
          <button
            onClick={() => navigate('/machine-learning')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>ML Overview</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🚀 MediaPipe: Production-Ready Computer Vision
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Google's pre-trained models that work on ANY device. This is standing on giants' shoulders!
          </p>
        </div>

        {/* Why MediaPipe is Revolutionary */}
        <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
          <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Why MediaPipe Changes Everything
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-2 border-red-200 dark:border-red-800">
              <h3 className="font-bold text-red-700 dark:text-red-300 mb-3 text-lg">❌ Building from Scratch:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>PhD-level ML/CV expertise required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Years collecting and labeling training data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Millions in compute resources (GPUs/TPUs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Complex model architecture design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Optimization for mobile/edge devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Team of 10+ engineers, 2+ years timeline</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-2 border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-700 dark:text-green-300 mb-3 text-lg">✅ Using MediaPipe:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>5 lines of code</strong> - that's it!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>No training data</strong> - models pre-trained</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>Works everywhere</strong> - Python, JS, mobile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>Real-time performance</strong> - 30+ FPS on CPU</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>Production-ready</strong> - battle-tested by Google</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>Free & Open Source</strong> - Apache 2.0 license</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border-l-4 border-blue-500">
            <p className="text-blue-800 dark:text-blue-200 font-semibold text-lg">
              💡 This is the POWER of standing on giants' shoulders!
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
              Google spent millions building and optimizing these models. You get to use them for free. Focus on solving YOUR problems, not rebuilding the wheel.
            </p>
          </div>
        </div>

        {/* Platform Support */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Cross-Platform Magic
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Cpu className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Python</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">pip install mediapipe</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Code className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">JavaScript</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">npm install @mediapipe/tasks</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Mobile</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">iOS & Android native</p>
            </div>
          </div>
        </div>

        {/* Help Panel */}
        {showHelp && (
          <div className="mb-8 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-xl p-6 border-2 border-yellow-300 dark:border-yellow-700 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Info className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 text-lg">
                    📚 How to Use This Lab
                  </h3>
                  <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p><strong>Note:</strong> This is an educational overview showing MediaPipe's capabilities through code and explanations.</p>
                    <p><strong>To implement in Python:</strong></p>
                    <ol className="list-decimal list-inside ml-4 space-y-1">
                      <li>Install: <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-0.5 rounded">pip install mediapipe opencv-python</code></li>
                      <li>Use your webcam with <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-0.5 rounded">cv2.VideoCapture(0)</code></li>
                      <li>Process each frame with MediaPipe solutions</li>
                      <li>Display results in real-time</li>
                    </ol>
                    <p className="mt-3 pt-3 border-t border-yellow-300 dark:border-yellow-700">
                      <strong>Click on each demo below</strong> to see code examples, use cases, and understand why MediaPipe is revolutionary!
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Demo Selection Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Choose a MediaPipe Solution
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {demos.map((demo) => {
              const Icon = demo.icon;
              const isActive = activeDemo === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    isActive
                      ? `bg-gradient-to-br ${demo.bgGradient} dark:${demo.darkBg} border-${demo.color.split('-')[1]}-400 scale-105 shadow-2xl`
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:scale-102 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${demo.color} shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {demo.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    {isActive ? (
                      <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">Click to explore</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Demo Details */}
        {activeData && (
          <div className="space-y-6 animate-fadeIn">
            {/* Use Case */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Real-World Applications
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className={`bg-gradient-to-r ${activeData.color} bg-clip-text text-transparent`}>
                  {activeData.useCase}
                </strong>
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {activeData.demoFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Example
              </h3>
              <div className="relative">
                <button
                  onClick={() => copyCode(activeData.codeSnippet)}
                  className="absolute top-3 right-3 z-10 px-3 py-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg border border-gray-600 dark:border-gray-500"
                >
                  {copiedCode === activeData.codeSnippet ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono leading-relaxed">
                    {activeData.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>

            {/* Why It Matters */}
            <div className={`bg-gradient-to-r ${activeData.bgGradient} dark:${activeData.darkBg} rounded-xl p-6 shadow-lg border-2 border-${activeData.color.split('-')[1]}-300 dark:border-${activeData.color.split('-')[1]}-700`}>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                💡 Why This Matters
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {activeData.whyItMatters}
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-8 shadow-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🎯 Ready to Build?</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto opacity-90">
            MediaPipe gives you the power of Google's ML research team. Install it in your Python environment and start building production-ready computer vision applications today!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <code className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg font-mono text-sm">
              pip install mediapipe opencv-python
            </code>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Works on: Windows, macOS, Linux, Raspberry Pi, iOS, Android, Web (WASM)
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MediaPipeLab;
