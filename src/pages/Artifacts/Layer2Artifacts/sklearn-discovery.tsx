import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Zap, Brain, TrendingUp, AlertCircle, CheckCircle, Code, ArrowLeft, Home } from 'lucide-react';

const SklearnDiscovery = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const journey = [
    {
      title: "The Problem: Naive OpenCV Analysis",
      icon: AlertCircle,
      color: "bg-red-500",
      code: `# Your original approach
unique_hues = len(np.unique(hue_channel))
variety_score = (unique_hues / 180) * 100

# Result: 97.2% for EVERYTHING! 😱`,
      issue: "Counting unique pixel values treats a rainbow gradient the same as a diverse meal",
      painPoint: "No understanding of COLOR GROUPING or PATTERNS",
      visual: "pixels"
    },
    {
      title: "First Attempt: Manual Clustering",
      icon: Code,
      color: "bg-orange-500",
      code: `# Let's group similar colors ourselves!
def manual_cluster(pixels):
    groups = []
    for pixel in pixels:  # 1.3M pixels!
        found = False
        for group in groups:
            if color_distance(pixel, group.center) < 30:
                group.add(pixel)
                found = True
                break
        if not found:
            groups.append(Group(pixel))
    return groups

# O(n²) complexity = 💀 DEATH 💀`,
      issue: "Takes 15 minutes to process one image",
      painPoint: "We need FAST, OPTIMIZED clustering algorithms",
      visual: "loading"
    },
    {
      title: "The 'Aha!' Moment: K-Means Algorithm",
      icon: Brain,
      color: "bg-yellow-500",
      code: `# K-means: Elegant mathematical solution
# 1. Pick K random centers
# 2. Assign pixels to nearest center
# 3. Recalculate centers
# 4. Repeat until convergence

# But implementing this optimally is HARD:
# - Matrix operations for speed
# - Initialization strategies (k-means++)
# - Convergence criteria
# - Numerical stability`,
      issue: "Implementing production-grade K-means = 1000+ lines of optimized code",
      painPoint: "We need BATTLE-TESTED implementations",
      visual: "kmeans"
    },
    {
      title: "Enter sklearn: The Gateway Opens",
      icon: Zap,
      color: "bg-green-500",
      code: `from sklearn.cluster import KMeans

# ONE LINE. That's it.
kmeans = KMeans(n_clusters=8, random_state=42)
kmeans.fit(pixels)

# ✨ Fast C/Cython backend
# ✨ k-means++ initialization
# ✨ Multiple runs for stability
# ✨ Parallel processing
# ✨ Memory efficient`,
      issue: "SOLVED! From 15 minutes to 0.3 seconds",
      painPoint: "But wait... what else can sklearn do?",
      visual: "success"
    },
    {
      title: "The Gateway: sklearn's Universe",
      icon: TrendingUp,
      color: "bg-purple-500",
      code: `# sklearn opened doors to EVERYTHING:

# 📊 Classification
from sklearn.svm import SVC  # Is this a healthy meal?
from sklearn.ensemble import RandomForest

# 📈 Regression  
from sklearn.linear_model import Ridge
# Predict calories from image features

# 🎯 Dimensionality Reduction
from sklearn.decomposition import PCA
# Reduce 1.3M pixels to key features

# 🔍 Preprocessing
from sklearn.preprocessing import StandardScaler
# Normalize color values

# 🎓 Model Selection
from sklearn.model_selection import cross_val_score
# Validate our meal analyzer`,
      issue: "sklearn isn't just about clustering",
      painPoint: "It's the FOUNDATION of modern ML pipelines",
      visual: "universe"
    },
    {
      title: "Real-World Impact: Full ML Pipeline",
      icon: CheckCircle,
      color: "bg-blue-500",
      code: `# Production meal analysis with sklearn:

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier

# 1. Cluster colors (we did this!)
colors = KMeans(n_clusters=8).fit(pixels)

# 2. Extract features
features = extract_color_features(colors)

# 3. Normalize
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# 4. Reduce dimensions
pca = PCA(n_components=10)
features_reduced = pca.fit_transform(features_scaled)

# 5. Classify meal type
classifier = RandomForestClassifier()
meal_type = classifier.predict(features_reduced)

# From "count unique pixels" to ML pipeline! 🚀`,
      issue: "This is how MyFitnessPal, Noom, and Yummly work",
      painPoint: "sklearn made this possible for everyone",
      visual: "pipeline"
    }
  ];

  const nextStep = () => {
    if (currentStep < journey.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const step = journey[currentStep];
  const StepIcon = step.icon;

  const renderVisual = () => {
    switch(step.visual) {
      case "pixels":
        return (
          <div className="grid grid-cols-8 gap-1 p-4">
            {[...Array(64)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded transition-all"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  opacity: 0.3 + Math.random() * 0.7
                }}
              />
            ))}
          </div>
        );
      
      case "loading":
        return (
          <div className="flex items-center justify-center p-8">
            <div className="relative">
              <div className="w-32 h-32 border-8 border-gray-200 rounded-full"></div>
              <div className="w-32 h-32 border-8 border-orange-500 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-orange-500">
                15m
              </div>
            </div>
          </div>
        );
      
      case "kmeans":
        return (
          <div className="p-4 space-y-4">
            {[...Array(4)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-2">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                  style={{backgroundColor: `hsl(${groupIdx * 90}, 70%, 60%)`}}
                />
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded"
                      style={{
                        backgroundColor: `hsl(${groupIdx * 90 + (Math.random() - 0.5) * 30}, 70%, 60%)`,
                        opacity: 0.6 + Math.random() * 0.4
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case "success":
        return (
          <div className="flex items-center justify-center p-8">
            <div className="relative">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-20 h-20 text-green-500" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                0.3s ⚡
              </div>
            </div>
          </div>
        );
      
      case "universe":
        const libraries = [
          { name: "Clustering", color: "bg-blue-400" },
          { name: "Classification", color: "bg-green-400" },
          { name: "Regression", color: "bg-yellow-400" },
          { name: "PCA", color: "bg-purple-400" },
          { name: "SVM", color: "bg-red-400" },
          { name: "Scaling", color: "bg-pink-400" },
          { name: "Cross-Val", color: "bg-indigo-400" },
          { name: "Pipelines", color: "bg-orange-400" }
        ];
        return (
          <div className="relative p-8 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl animate-pulse">
                sklearn
              </div>
            </div>
            {libraries.map((lib, i) => {
              const angle = (i / libraries.length) * 2 * Math.PI;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={i}
                  className={`absolute ${lib.color} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    animation: `float ${2 + i * 0.2}s ease-in-out infinite`
                  }}
                >
                  {lib.name}
                </div>
              );
            })}
          </div>
        );
      
      case "pipeline":
        const stages = ["Raw Image", "Cluster", "Extract", "Scale", "PCA", "Classify"];
        return (
          <div className="p-6 space-y-4">
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-lg border-2 border-blue-200">
                  <div className="font-semibold text-blue-900">{stage}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className="text-blue-400 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/artifacts/computer-vision-session28')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Session 28</span>
          </button>
          <button
            onClick={() => navigate('/machine-learning')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>ML Overview</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            The Birth of <span className="text-green-400">sklearn</span>
          </h1>
          <p className="text-xl text-gray-300">
            Discovered through the pain of inefficient meal analysis
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {journey.map((j, i) => (
              <div
                key={i}
                className={`w-full h-2 mx-1 rounded transition-all ${
                  i <= currentStep ? step.color : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Problem</span>
            <span>Solution</span>
            <span>Gateway</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          {/* Card Header */}
          <div className={`${step.color} p-6 text-white`}>
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <StepIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm opacity-80">Step {currentStep + 1} of {journey.length}</div>
                <h2 className="text-3xl font-bold">{step.title}</h2>
              </div>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="bg-gray-50 border-b-4 border-gray-200">
            {renderVisual()}
          </div>

          {/* Code Block */}
          <div className="bg-gray-900 p-6">
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
              {step.code}
            </pre>
          </div>

          {/* Insights */}
          <div className="p-6 space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="font-semibold text-red-900 mb-1">❌ The Issue:</div>
              <div className="text-red-700">{step.issue}</div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="font-semibold text-blue-900 mb-1">💡 The Pain Point:</div>
              <div className="text-blue-700">{step.painPoint}</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-6 bg-gray-50 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
            >
              ← Previous
            </button>
            
            <div className="text-gray-600 font-medium">
              {currentStep + 1} / {journey.length}
            </div>
            
            <button
              onClick={nextStep}
              disabled={currentStep === journey.length - 1}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-blue-600 transition-colors flex items-center gap-2"
            >
              Next → <Play className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Key Takeaway */}
        {currentStep === journey.length - 1 && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 p-8 rounded-2xl text-white text-center">
            <h3 className="text-3xl font-bold mb-4">🎓 The Big Lesson</h3>
            <p className="text-xl leading-relaxed">
              sklearn didn't just solve our clustering problem — it opened the gateway to the entire 
              <span className="font-bold"> machine learning ecosystem</span>. 
              What started as "I need to group colors better" became 
              <span className="font-bold"> classification, regression, feature engineering, and production ML pipelines</span>.
            </p>
            <p className="text-lg mt-4 opacity-90">
              This is why sklearn has 60,000+ stars on GitHub and powers thousands of production ML systems. 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SklearnDiscovery;