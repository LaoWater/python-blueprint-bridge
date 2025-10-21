import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Layers, Zap, TrendingUp, Heart, DollarSign, Activity, Target, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';
import { useNavigate } from 'react-router-dom';

const KerasSession42 = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    installation: false,
    basics: false,
    architecture: false,
    training: false,
    health: false,
    finance: false,
    exercises: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const storyChapters = [
    {
      icon: "💔",
      title: "2017: The Pattern Recognition Crisis",
      content: "A data scientist spends 3 weeks building a neural network in TensorFlow. The code is 500 lines. They need to iterate.",
      details: (
        <div className="space-y-3">
          <p><strong>The Reality of 2016:</strong> Deep learning is powerful, but TensorFlow requires writing hundreds of lines for even simple networks.</p>
          <p><strong>The Frustration:</strong> A binary classification model needs:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Placeholder definitions for inputs/outputs</li>
            <li>Manual weight initialization</li>
            <li>Explicit layer connections</li>
            <li>Training loop implementation</li>
            <li>Session management</li>
            <li><strong>Result: 300-500 lines for a simple model</strong></li>
          </ul>
          <p className="pt-2"><strong>The Need:</strong> Startups need to iterate FAST. Health companies need to test hypotheses QUICKLY. Financial institutions need to prototype models in HOURS, not WEEKS.</p>
          <p className="text-red-600 dark:text-red-400 font-semibold">The industry needs abstraction without losing power.</p>
        </div>
      )
    },
    {
      icon: "💡",
      title: "The LEGO Epiphany: Building Blocks vs Manual Assembly",
      content: "François Chollet (Google Brain) realizes: 90% of neural networks follow patterns. Why rebuild from atoms every time?",
      details: (
        <div className="space-y-3">
          <p><strong>The Insight:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>TensorFlow = Raw LEGO bricks:</strong> Powerful but time-consuming</li>
            <li><strong>Keras = Pre-assembled LEGO sets:</strong> Same power, 10x faster</li>
          </ul>
          <p className="pt-2"><strong>The Vision:</strong> Deep learning should be accessible to EVERY developer, not just PhD researchers.</p>
          <p className="pt-2 text-blue-600 dark:text-blue-400 font-semibold italic">
            "The same model that took 500 lines in TensorFlow can be built in 10 lines with Keras."
          </p>
          <p className="pt-2">François Chollet's motto: <strong>"Deep Learning for Humans"</strong></p>
        </div>
      )
    },
    {
      icon: "🚀",
      title: "2015-2017: Keras Birth & Rapid Adoption",
      content: "Released March 2015. Within 2 years, Keras becomes the #1 deep learning library for prototyping.",
      details: (
        <div className="space-y-3">
          <p><strong>2015:</strong> Keras 1.0 launches with simple Sequential API</p>
          <p><strong>2016:</strong> Startups adopt Keras for rapid experimentation. Medical imaging companies build prototypes in days instead of months.</p>
          <p><strong>2017:</strong> Google officially integrates Keras into TensorFlow as tf.keras</p>
          <p className="pt-2"><strong>Why it exploded:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Same 10 lines of code work for ANY dataset</li>
            <li>Intuitive layer stacking (like building with blocks)</li>
            <li>Powerful callbacks for advanced control</li>
            <li>Works on CPU, GPU, TPU—no code changes</li>
          </ul>
        </div>
      )
    },
    {
      icon: "🏥",
      title: "2018-2020: Healthcare Revolution",
      content: "Dermatology teams use Keras to detect skin cancer with 94% accuracy. Lives saved. Time from idea to deployment: 3 weeks.",
      details: (
        <div className="space-y-3">
          <p><strong>Stanford University (2017):</strong> Skin cancer detection model built with Keras rivals dermatologists.</p>
          <p><strong>The Impact:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>94% accuracy on 130,000 images</li>
            <li>Model developed in weeks (not years)</li>
            <li>Keras enabled rapid iteration on architectures</li>
            <li>Result: Early detection saves thousands of lives</li>
          </ul>
          <p className="pt-2 text-green-600 dark:text-green-400 font-semibold">
            The same framework you'll learn today powers life-saving medical AI.
          </p>
        </div>
      )
    },
    {
      icon: "💰",
      title: "2019-2024: Finance & Your Personal Projects",
      content: "From JPMorgan's fraud detection to YOUR health tracking app—Keras democratizes AI.",
      details: (
        <div className="space-y-3">
          <p><strong>Industry Adoption:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Finance:</strong> Credit risk scoring, fraud detection (99.2% accuracy)</li>
            <li><strong>Health:</strong> Patient risk prediction, vitals monitoring</li>
            <li><strong>Retail:</strong> Customer churn prediction (23% reduction in churn)</li>
            <li><strong>Manufacturing:</strong> Quality control systems</li>
          </ul>
          <p className="pt-3 text-lg font-semibold text-purple-600 dark:text-purple-400">
            YOUR Personal Projects Today:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>🏃 <strong>Health:</strong> Predict workout fatigue from sleep/nutrition data</li>
            <li>💵 <strong>Finance:</strong> Classify spending patterns, predict budget overruns</li>
            <li>🎯 <strong>Behavior:</strong> Understand correlations between lifestyle & productivity</li>
          </ul>
          <p className="pt-3 text-lg italic">
            The same tool that powers billion-dollar systems... is now in <strong>your hands</strong>, ready to solve <strong>your problems</strong>.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Back Navigation */}
        <Button
          onClick={() => navigate('/advanced-machine-learning')}
          variant="ghost"
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Advanced ML
        </Button>

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full mb-4">
            <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Session 42: Keras Foundation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your Gateway to Deep Learning: From 500 lines of TensorFlow to 10 lines of Keras
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>~3 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Beginner-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Real-World Projects</span>
            </div>
          </div>
        </div>

        {/* Story Mode */}
        <div className="mb-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Origin Story: Why Keras Exists
            </span>
          </h2>

          {/* Chapter Navigation */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {storyChapters.map((chapter, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeChapter === idx
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span className="mr-2">{chapter.icon}</span>
                Chapter {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Chapter Content */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-3 text-blue-800 dark:text-blue-200">
              {storyChapters[activeChapter].title}
            </h3>
            <p className="text-lg mb-4 text-foreground/80">
              {storyChapters[activeChapter].content}
            </p>
            <div className="text-foreground/70 leading-relaxed">
              {storyChapters[activeChapter].details}
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-foreground/80">
              <strong>💡 The Dharma Approach:</strong> Notice how Keras wasn't created because someone wanted to build a library.
              It was created because <em>real developers faced real pain</em>—spending weeks on code that should take hours.
              The <strong>NEED</strong> came first. The <strong>TOOL</strong> followed.
            </p>
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('installation')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🔧 Installation: One Line, Everything You Need
            </h2>
            {expandedSections.installation ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.installation && (
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Modern Keras comes integrated with TensorFlow. One command installs both the high-level API (Keras)
                and the powerful backend (TensorFlow).
              </p>

              <CodeBlockR language="bash">
{`# Install TensorFlow (includes Keras)
pip install tensorflow

# Verify installation
python -c "import tensorflow as tf; print(f'TensorFlow: {tf.__version__}')"
python -c "from tensorflow import keras; print('Keras is ready!')"

# Optional: Install additional visualization tools
pip install matplotlib seaborn

# For GPU support (if you have CUDA-compatible GPU)
pip install tensorflow-gpu`}
              </CodeBlockR>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>📦 What you just installed:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 text-sm space-y-1 mt-2">
                  <li><strong>Keras:</strong> High-level neural network API (tf.keras)</li>
                  <li><strong>TensorFlow:</strong> Computational backend (automatic differentiation, GPU support)</li>
                  <li><strong>Pre-trained models:</strong> VGG, ResNet, MobileNet, and more</li>
                  <li><strong>Datasets:</strong> MNIST, CIFAR, Fashion-MNIST built-in</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Key Concepts: Neural Network Architecture */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('basics')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🧠 Key Concept: Artificial Neural Networks (ANNs)
            </h2>
            {expandedSections.basics ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.basics && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Before we write code, let's understand <em>what</em> we're building and <em>why</em> it works.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Input Layer */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Layers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Input Layer</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Purpose:</strong> Receives raw data
                  </p>
                  <ul className="text-sm space-y-1 text-foreground/70">
                    <li>• One neuron per feature</li>
                    <li>• No computation, just passes data forward</li>
                    <li>• Example: 4 features → 4 input neurons</li>
                  </ul>
                </div>

                {/* Hidden Layers */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">Hidden Layers</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Purpose:</strong> Learn patterns
                  </p>
                  <ul className="text-sm space-y-1 text-foreground/70">
                    <li>• Transform data using weights</li>
                    <li>• Apply activation functions (ReLU, tanh)</li>
                    <li>• Multiple layers = "deep" learning</li>
                    <li>• Learn progressively complex patterns</li>
                  </ul>
                </div>

                {/* Output Layer */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Output Layer</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Purpose:</strong> Final prediction
                  </p>
                  <ul className="text-sm space-y-1 text-foreground/70">
                    <li>• Number of neurons = number of classes</li>
                    <li>• Sigmoid: binary (0 or 1)</li>
                    <li>• Softmax: multi-class probabilities</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                  Why This Architecture Works: Universal Function Approximation
                </h4>
                <p className="text-sm text-foreground/80 mb-3">
                  <strong>Mathematical Proof (1989):</strong> A neural network with just one hidden layer can approximate ANY continuous function, given enough neurons.
                </p>
                <p className="text-sm text-foreground/70">
                  This means neural networks can learn ANY pattern in your data—whether it's predicting customer churn,
                  detecting diseases, or understanding your spending habits. The architecture adapts to the problem.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Building Your First Keras Model */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('architecture')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              🏗️ Building Your First Keras Model: 10 Lines of Code
            </h2>
            {expandedSections.architecture ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.architecture && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground mb-6">
                Let's build a simple binary classification model. We'll use the classic Iris dataset,
                converted to a binary problem: "Is it a Setosa flower or not?"
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-sm">
                  <strong>📊 Dataset Context:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 text-sm space-y-1 mt-2">
                  <li><strong>Iris Dataset:</strong> Classic ML dataset with 150 samples, 4 features (sepal/petal length & width)</li>
                  <li><strong>Original:</strong> 3-class classification (Setosa, Versicolor, Virginica)</li>
                  <li><strong>Our Version:</strong> Binary classification → Setosa (1) or Not Setosa (0)</li>
                  <li><strong>Why?</strong> Perfect for learning neural network fundamentals before tackling complexity</li>
                </ul>
              </div>

              <CodeBlockR language="python">
{`import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ==========================================
# STEP 1: Load and Prepare Data
# ==========================================

# Load Iris dataset
iris = load_iris()
X = iris.data  # 4 features: sepal length, sepal width, petal length, petal width
y = (iris.target == 0).astype(int)  # Binary: 1 if Setosa, 0 otherwise

print(f"Dataset shape: {X.shape}")  # (150, 4)
print(f"Targets: {np.unique(y, return_counts=True)}")  # [0, 1]: [100, 50]

# ==========================================
# STEP 2: Preprocessing
# ==========================================

# Standardize features (mean=0, std=1)
# WHY? Neural networks converge faster with normalized inputs
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

print(f"Training set: {X_train.shape[0]} samples")
print(f"Test set: {X_test.shape[0]} samples")

# ==========================================
# STEP 3: Build the Model (The Magic!)
# ==========================================

model = keras.Sequential([
    # Layer 1: Input layer (implicit) + First hidden layer
    layers.Dense(8, activation='relu', input_shape=(4,)),
    # 8 neurons, ReLU activation, expects 4 input features

    # Layer 2: Second hidden layer
    layers.Dense(4, activation='relu'),
    # 4 neurons, reduces dimensionality

    # Layer 3: Output layer
    layers.Dense(1, activation='sigmoid')
    # 1 neuron, sigmoid outputs probability [0, 1]
])

print("\\n" + "="*60)
print("MODEL ARCHITECTURE")
print("="*60)
model.summary()

# ==========================================
# STEP 4: Compile the Model
# ==========================================

model.compile(
    optimizer='adam',              # Adaptive learning rate optimizer
    loss='binary_crossentropy',    # Binary classification loss
    metrics=['accuracy']           # Track accuracy during training
)

# ==========================================
# STEP 5: Train the Model
# ==========================================

print("\\n" + "="*60)
print("TRAINING")
print("="*60)

history = model.fit(
    X_train, y_train,
    epochs=50,                     # 50 complete passes through data
    batch_size=10,                 # Update weights after every 10 samples
    validation_split=0.2,          # Use 20% of training data for validation
    verbose=1                      # Show progress
)

# ==========================================
# STEP 6: Evaluate on Test Set
# ==========================================

print("\\n" + "="*60)
print("EVALUATION")
print("="*60)

test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Loss: {test_loss:.4f}")
print(f"Test Accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")

# ==========================================
# STEP 7: Make Predictions
# ==========================================

# Predict on first 5 test samples
predictions_prob = model.predict(X_test[:5])
predictions_class = (predictions_prob > 0.5).astype(int)

print("\\n" + "="*60)
print("SAMPLE PREDICTIONS")
print("="*60)
for i in range(5):
    print(f"Sample {i+1}:")
    print(f"  Probability: {predictions_prob[i][0]:.4f}")
    print(f"  Predicted Class: {predictions_class[i][0]}")
    print(f"  Actual Class: {y_test.iloc[i] if hasattr(y_test, 'iloc') else y_test[i]}")
    print()

# ==========================================
# STEP 8: Save the Model
# ==========================================

model.save('iris_model.h5')
print("Model saved as 'iris_model.h5'")

# To load later:
# loaded_model = keras.models.load_model('iris_model.h5')`}
              </CodeBlockR>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-purple-800 dark:text-purple-200">
                  🎯 Understanding Each Component
                </h4>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">layers.Dense(8, activation='relu', input_shape=(4,))</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-foreground/70">
                      <li><strong>Dense:</strong> Fully connected layer (every neuron connects to all previous)</li>
                      <li><strong>8 units:</strong> 8 neurons in this layer</li>
                      <li><strong>ReLU:</strong> f(x) = max(0, x) - prevents vanishing gradients, fast computation</li>
                      <li><strong>input_shape=(4,):</strong> Expects 4 features (sepal/petal dimensions)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">layers.Dense(4, activation='relu')</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-foreground/70">
                      <li><strong>4 units:</strong> Reduces dimensionality from 8 → 4</li>
                      <li><strong>Why fewer neurons?</strong> Funnel pattern forces compression, learns essential patterns</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">layers.Dense(1, activation='sigmoid')</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-foreground/70">
                      <li><strong>1 unit:</strong> Single output for binary classification</li>
                      <li><strong>Sigmoid:</strong> f(x) = 1/(1+e^(-x)) - outputs probability between 0 and 1</li>
                      <li><strong>Interpretation:</strong> Values &gt; 0.5 → Class 1 (Setosa), ≤ 0.5 → Class 0</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">optimizer='adam'</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-foreground/70">
                      <li><strong>Adam:</strong> Adaptive Moment Estimation</li>
                      <li><strong>Why?</strong> Combines best of multiple optimizers, automatically adjusts learning rate</li>
                      <li><strong>Safe default</strong> for 90% of use cases</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">loss='binary_crossentropy'</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-foreground/70">
                      <li><strong>Binary Crossentropy:</strong> Measures how far predictions are from actual binary labels</li>
                      <li><strong>Formula:</strong> -[y*log(p) + (1-y)*log(1-p)]</li>
                      <li><strong>Purpose:</strong> Guides model to minimize prediction error</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">epochs=50, batch_size=10</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-foreground/70">
                      <li><strong>Epoch:</strong> One complete pass through ALL training data</li>
                      <li><strong>Batch size:</strong> Update weights after seeing 10 samples (not after each one)</li>
                      <li><strong>Why batches?</strong> Faster convergence, smoother gradient estimates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>💡 The 500-to-10 Transformation:</strong> This same model would require ~300-500 lines in raw TensorFlow 1.x.
                  With Keras, it's <strong>10 lines</strong>. Same power. 10% of the code. This is why Keras became the industry standard.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Health Project Application */}
        <div className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl p-8 border border-green-200 dark:border-green-800 shadow-lg">
          <button
            onClick={() => toggleSection('health')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-200">
                🏥 Real-World Health Application: Workout Fatigue Prediction
              </h2>
            </div>
            {expandedSections.health ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.health && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                  The Problem: Should You Work Out Today?
                </h3>
                <p className="text-foreground/80 mb-4">
                  You track your sleep, nutrition, stress levels, and previous workout intensity.
                  But you don't know if you're ready for an intense workout or if you should rest.
                </p>
                <p className="text-foreground/70 text-sm">
                  <strong>The Need:</strong> A system that predicts workout fatigue based on your lifestyle data,
                  preventing overtraining and optimizing recovery.
                </p>
              </div>

              <CodeBlockR language="python">
{`import pandas as pd
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ==========================================
# HEALTH DATA: Your Tracked Lifestyle Metrics
# ==========================================

# Simulated 30 days of health tracking data
np.random.seed(42)
n_days = 30

health_data = pd.DataFrame({
    'sleep_hours': np.random.uniform(4, 9, n_days),
    'sleep_quality': np.random.randint(1, 11, n_days),  # 1-10 scale
    'calories_consumed': np.random.randint(1500, 3000, n_days),
    'protein_grams': np.random.randint(50, 200, n_days),
    'stress_level': np.random.randint(1, 11, n_days),  # 1-10 scale
    'previous_workout_intensity': np.random.randint(1, 11, n_days),  # 1-10
    'water_liters': np.random.uniform(1, 4, n_days),
})

# Target: Workout fatigue (1 = high fatigue, 0 = ready to train)
# Logic: Fatigue is high if sleep < 6, stress > 7, or previous intensity > 8
health_data['high_fatigue'] = (
    (health_data['sleep_hours'] < 6) |
    (health_data['stress_level'] > 7) |
    (health_data['previous_workout_intensity'] > 8)
).astype(int)

print("="*70)
print("HEALTH TRACKING DATA (First 10 Days)")
print("="*70)
print(health_data.head(10))
print()
print(f"Fatigue distribution: {health_data['high_fatigue'].value_counts().to_dict()}")
print()

# ==========================================
# MODEL: Predict Workout Fatigue
# ==========================================

# Separate features and target
X = health_data.drop('high_fatigue', axis=1)
y = health_data['high_fatigue']

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.3, random_state=42
)

# Build neural network
model = keras.Sequential([
    layers.Dense(16, activation='relu', input_shape=(7,)),  # 7 features
    layers.Dense(8, activation='relu'),
    layers.Dense(1, activation='sigmoid')  # Binary: fatigue yes/no
])

# Compile
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train
print("="*70)
print("TRAINING FATIGUE PREDICTION MODEL")
print("="*70)
history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=4,
    validation_split=0.2,
    verbose=0  # Silent training
)

print(f"Final training accuracy: {history.history['accuracy'][-1]:.4f}")
print(f"Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")
print()

# ==========================================
# PREDICTION: Should You Work Out Today?
# ==========================================

# Example: Today's metrics
today = pd.DataFrame({
    'sleep_hours': [5.5],
    'sleep_quality': [4],
    'calories_consumed': [1800],
    'protein_grams': [90],
    'stress_level': [8],
    'previous_workout_intensity': [9],
    'water_liters': [2.0]
})

today_scaled = scaler.transform(today)
fatigue_prob = model.predict(today_scaled, verbose=0)[0][0]

print("="*70)
print("TODAY'S WORKOUT RECOMMENDATION")
print("="*70)
print("Your Metrics:")
for col in today.columns:
    print(f"  {col}: {today[col].values[0]}")
print()
print(f"Fatigue Probability: {fatigue_prob:.2%}")
print()

if fatigue_prob > 0.6:
    print("🛑 HIGH FATIGUE DETECTED")
    print("   Recommendation: Rest day or light activity")
    print("   Focus on: Sleep, hydration, stress management")
elif fatigue_prob > 0.3:
    print("⚠️  MODERATE FATIGUE")
    print("   Recommendation: Light to moderate workout")
    print("   Avoid: High-intensity training")
else:
    print("✅ READY TO TRAIN")
    print("   Recommendation: Full intensity workout")
    print("   Your body is recovered and ready!")
print()

# ==========================================
# INSIGHTS: What Drives Fatigue?
# ==========================================

print("="*70)
print("KEY INSIGHTS FROM YOUR DATA")
print("="*70)

# Feature importance (simplified: look at correlation)
correlations = health_data.corr()['high_fatigue'].sort_values(ascending=False)
print("\\nFactors most correlated with fatigue:")
for feature, corr in correlations.items():
    if feature != 'high_fatigue':
        print(f"  {feature}: {corr:+.3f}")

# Save model
model.save('health_fatigue_predictor.h5')
print("\\nModel saved as 'health_fatigue_predictor.h5'")
print("You can now use this model daily to optimize your training!")`}
              </CodeBlockR>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-green-800 dark:text-green-200">
                  💪 How to Collect YOUR Real Data
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <p className="font-semibold">1. Create a Google Sheet or CSV with these columns:</p>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>sleep_hours (track with Apple Watch, Fitbit, or manual entry)</li>
                      <li>sleep_quality (subjective 1-10 rating)</li>
                      <li>calories_consumed (MyFitnessPal, Cronometer)</li>
                      <li>protein_grams (from nutrition tracker)</li>
                      <li>stress_level (daily 1-10 self-assessment)</li>
                      <li>previous_workout_intensity (1-10 rating after each workout)</li>
                      <li>water_liters (water intake tracking)</li>
                      <li>high_fatigue (did you feel fatigued? 1=yes, 0=no)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">2. Track for at least 30 days (more data = better predictions)</p>
                  </div>
                  <div>
                    <p className="font-semibold">3. Load your data:</p>
                    <CodeBlockR language="python">
{`# Load your actual data
health_data = pd.read_csv('my_health_tracking.csv')

# Train the model on YOUR data
# The model learns YOUR unique patterns!`}
                    </CodeBlockR>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-3">
                    <p className="text-sm">
                      <strong>🎯 The Power:</strong> This same neural network architecture adapts to YOUR body's patterns.
                      What affects my fatigue might be different from yours. The model learns your personal correlations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Finance Project Application */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-8 border border-blue-200 dark:border-blue-800 shadow-lg">
          <button
            onClick={() => toggleSection('finance')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                💰 Real-World Finance Application: Budget Overrun Prediction
              </h2>
            </div>
            {expandedSections.finance ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.finance && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                  The Problem: Will You Go Over Budget This Month?
                </h3>
                <p className="text-foreground/80 mb-4">
                  You set monthly budgets for different categories (food, entertainment, transport).
                  But halfway through the month, you don't know if you're on track or headed for disaster.
                </p>
                <p className="text-foreground/70 text-sm">
                  <strong>The Need:</strong> An early warning system that predicts budget overruns based on your spending patterns,
                  giving you time to adjust before it's too late.
                </p>
              </div>

              <CodeBlockR language="python">
{`import pandas as pd
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ==========================================
# FINANCE DATA: Your Spending Patterns
# ==========================================

# Simulated 6 months of spending tracking (weekly data)
np.random.seed(42)
n_weeks = 24  # 6 months

finance_data = pd.DataFrame({
    'week_of_month': np.tile([1, 2, 3, 4], n_weeks // 4),
    'groceries_spent': np.random.uniform(50, 200, n_weeks),
    'restaurants_spent': np.random.uniform(0, 150, n_weeks),
    'entertainment_spent': np.random.uniform(0, 100, n_weeks),
    'transport_spent': np.random.uniform(20, 80, n_weeks),
    'shopping_spent': np.random.uniform(0, 200, n_weeks),
    'avg_daily_transactions': np.random.randint(1, 10, n_weeks),
    'high_value_purchases': np.random.randint(0, 4, n_weeks),  # >$100
})

# Monthly budget: $1500
monthly_budget = 1500

# Target: Will total monthly spend exceed budget?
# Estimate monthly total from weekly spending
finance_data['estimated_monthly_total'] = (
    finance_data['groceries_spent'] +
    finance_data['restaurants_spent'] +
    finance_data['entertainment_spent'] +
    finance_data['transport_spent'] +
    finance_data['shopping_spent']
) * 4  # Multiply weekly by 4 for monthly estimate

finance_data['will_exceed_budget'] = (
    finance_data['estimated_monthly_total'] > monthly_budget
).astype(int)

print("="*70)
print("SPENDING TRACKING DATA (First 10 Weeks)")
print("="*70)
print(finance_data.head(10))
print()
print(f"Budget overrun distribution: {finance_data['will_exceed_budget'].value_counts().to_dict()}")
print()

# ==========================================
# MODEL: Predict Budget Overrun Risk
# ==========================================

# Features: all except target and estimated total
X = finance_data.drop(['will_exceed_budget', 'estimated_monthly_total'], axis=1)
y = finance_data['will_exceed_budget']

# Standardize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.3, random_state=42
)

# Build model
model = keras.Sequential([
    layers.Dense(16, activation='relu', input_shape=(7,)),
    layers.Dropout(0.2),  # Regularization to prevent overfitting
    layers.Dense(8, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

# Compile
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train
print("="*70)
print("TRAINING BUDGET OVERRUN PREDICTOR")
print("="*70)
history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=4,
    validation_split=0.2,
    verbose=0
)

print(f"Final training accuracy: {history.history['accuracy'][-1]:.4f}")
print(f"Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")
print()

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test accuracy: {test_acc:.4f}")
print()

# ==========================================
# PREDICTION: This Week's Spending Alert
# ==========================================

# Current week data (week 2 of month)
this_week = pd.DataFrame({
    'week_of_month': [2],
    'groceries_spent': [180],
    'restaurants_spent': [120],
    'entertainment_spent': [80],
    'transport_spent': [60],
    'shopping_spent': [150],
    'avg_daily_transactions': [7],
    'high_value_purchases': [2]
})

this_week_scaled = scaler.transform(this_week)
overrun_prob = model.predict(this_week_scaled, verbose=0)[0][0]

print("="*70)
print("THIS WEEK'S BUDGET ALERT")
print("="*70)
print("Current Week Spending:")
for col in this_week.columns:
    if col != 'week_of_month':
        print(f"  {col}: {this_week[col].values[0]:.2f}")
print()
weekly_total = this_week.drop('week_of_month', axis=1).sum(axis=1).values[0]
print(f"Total this week: {weekly_total:.2f}")
print(f"Projected monthly (×4): {weekly_total * 4:.2f}")
print(f"Monthly budget: {monthly_budget:.2f}")
print()
print(f"Budget Overrun Risk: {overrun_prob:.2%}")
print()

if overrun_prob > 0.7:
    print("🚨 HIGH RISK OF BUDGET OVERRUN")
    print("   Recommendation: Immediate spending freeze on non-essentials")
    print("   Action: Review and cut discretionary spending")
    print("   Focus: Groceries only, no restaurants/entertainment")
elif overrun_prob > 0.4:
    print("⚠️  MODERATE RISK")
    print("   Recommendation: Reduce discretionary spending")
    print("   Action: Limit restaurants and entertainment")
    print("   Track daily to avoid creeping costs")
else:
    print("✅ ON TRACK")
    print("   Status: Spending within healthy limits")
    print("   Continue monitoring, maintain discipline")
print()

# ==========================================
# INSIGHTS: Spending Pattern Analysis
# ==========================================

print("="*70)
print("SPENDING PATTERN INSIGHTS")
print("="*70)

# Correlations with budget overrun
correlations = finance_data.corr()['will_exceed_budget'].sort_values(ascending=False)
print("\\nFactors most correlated with budget overruns:")
for feature, corr in correlations.items():
    if feature not in ['will_exceed_budget', 'estimated_monthly_total']:
        print(f"  {feature}: {corr:+.3f}")

print("\\nKey Takeaway:")
print("  The categories with highest positive correlation are your")
print("  biggest budget risks. Focus cutbacks there first.")
print()

# Save model
model.save('finance_budget_predictor.h5')
print("Model saved as 'finance_budget_predictor.h5'")`}
              </CodeBlockR>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-200">
                  💳 How to Collect YOUR Real Finance Data
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <p className="font-semibold">1. Export transaction data from your bank/credit cards:</p>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Most banks offer CSV export of transactions</li>
                      <li>Apps like Mint, YNAB, or Personal Capital aggregate automatically</li>
                      <li>Manually track in Google Sheets if needed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">2. Categorize spending weekly:</p>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Groceries, Restaurants, Entertainment, Transport, Shopping, etc.</li>
                      <li>Count high-value purchases (&gt; $100)</li>
                      <li>Track transaction frequency</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">3. Label historical data:</p>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>For each week: Did you exceed monthly budget? (1=yes, 0=no)</li>
                      <li>Need at least 3 months of data (12 weeks minimum)</li>
                      <li>More data = more accurate predictions</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-3">
                    <p className="text-sm">
                      <strong>🎯 Real-World Impact:</strong> Banks use this exact approach for credit risk scoring.
                      You're building the same technology JPMorgan uses—but for YOUR personal finances.
                      Early warning = time to adjust = financial control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Practical Exercises */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('exercises')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🎯 Practical Exercises: Mastery Through Application
            </h2>
            {expandedSections.exercises ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.exercises && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Complete these exercises to solidify your understanding. Each builds on the concepts you've learned.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Exercise 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                    Exercise 1: Multi-Layer Architecture
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Create a model with 3 hidden layers instead of 2
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Use layer sizes: 16 → 8 → 4</li>
                    <li>Keep ReLU activation for hidden layers</li>
                    <li>Compare accuracy with the 2-layer model</li>
                    <li>Question: Does deeper always mean better?</li>
                  </ul>
                </div>

                {/* Exercise 2 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">
                    Exercise 2: Activation Function Comparison
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Replace ReLU with tanh activation
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Change activation='relu' to activation='tanh'</li>
                    <li>Retrain the model</li>
                    <li>Compare training speed and final accuracy</li>
                    <li>Learn: When to use tanh vs ReLU</li>
                  </ul>
                </div>

                {/* Exercise 3 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                    Exercise 3: Multi-class Classification
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Use full Iris dataset (3 classes)
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Change output layer to Dense(3, activation='softmax')</li>
                    <li>Change loss to 'sparse_categorical_crossentropy'</li>
                    <li>Use y = iris.target (don't convert to binary)</li>
                    <li>Understand: Softmax for multi-class problems</li>
                  </ul>
                </div>

                {/* Exercise 4 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-bold mb-3 text-orange-800 dark:text-orange-200">
                    Exercise 4: Dropout Regularization
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Add Dropout layers to prevent overfitting
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Add layers.Dropout(0.3) after each Dense layer</li>
                    <li>Dropout randomly drops 30% of neurons during training</li>
                    <li>Compare with/without dropout</li>
                    <li>Observe: Lower training accuracy, better generalization</li>
                  </ul>
                </div>

                {/* Exercise 5 */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                  <h3 className="text-xl font-bold mb-3 text-pink-800 dark:text-pink-200">
                    Exercise 5: Wine Dataset Challenge
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Train a model on the wine dataset
                  </p>
                  <CodeBlockR language="python">
{`from sklearn.datasets import load_wine

wine = load_wine()
X = wine.data  # 13 features
y = wine.target  # 3 classes

# Build and train your model!`}
                  </CodeBlockR>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70 mt-2">
                    <li>178 samples, 13 features, 3 wine classes</li>
                    <li>Design architecture for 13 inputs</li>
                    <li>Use softmax output (3 classes)</li>
                  </ul>
                </div>

                {/* Exercise 6 */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-xl font-bold mb-3 text-indigo-800 dark:text-indigo-200">
                    Exercise 6: YOUR Custom Dataset
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Ultimate Challenge:</strong> Use your own tracked data
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Load your health OR finance tracking data</li>
                    <li>Build a model to predict YOUR patterns</li>
                    <li>Interpret results specific to your life</li>
                    <li>This is where learning becomes REAL</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                  🎓 Learning Strategy
                </h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>1. Start Simple:</strong> Run the provided examples first. Understand each line.</p>
                  <p><strong>2. Modify Gradually:</strong> Change one parameter at a time. Observe the effect.</p>
                  <p><strong>3. Compare Results:</strong> Keep notes on accuracy, training time, behavior changes.</p>
                  <p><strong>4. Apply to Reality:</strong> The real learning happens when you use YOUR data.</p>
                  <p className="pt-3 font-semibold text-purple-600 dark:text-purple-400">
                    💡 Remember: Neural networks are universal function approximators. They adapt to ANY problem.
                    The same architecture that classifies flowers can predict your health patterns or spending behavior.
                    The tool is universal. The application is personal.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary & Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">🎉 Session 42 Complete: You've Unlocked Deep Learning</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What You've Mastered:</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Keras Sequential API for rapid model building</li>
                <li>✅ Dense layers, activation functions, optimizers</li>
                <li>✅ Binary classification from scratch</li>
                <li>✅ Model training, evaluation, and prediction</li>
                <li>✅ Real-world applications in Health & Finance</li>
                <li>✅ Model persistence (saving/loading)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Next Session Preview:</h3>
              <p className="text-sm mb-3">
                <strong>Session 43: Advanced Keras</strong> - Customization & Fine-tuning
              </p>
              <ul className="space-y-2 text-sm">
                <li>🔹 Regularization techniques (Dropout, L2)</li>
                <li>🔹 Callbacks (EarlyStopping, ModelCheckpoint)</li>
                <li>🔹 TensorBoard visualization</li>
                <li>🔹 Hyperparameter tuning with keras-tuner</li>
                <li>🔹 Transfer learning foundations</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-3">🚀 The Journey Ahead</p>
            <p className="text-sm leading-relaxed">
              You've just built your first neural networks. The same patterns you learned today power:
              <br />• Google's recommendation systems
              <br />• Tesla's Autopilot perception
              <br />• Medical diagnosis AI
              <br />• Financial fraud detection
              <br /><br />
              <strong>The difference?</strong> Scale and specialization. But the fundamentals are identical.
              You're now equipped with the building blocks that drive the AI revolution.
              <br /><br />
              <em className="text-white/80">
                "Deep learning for humans" isn't just Keras's motto—it's a promise.
                Complex AI is now accessible. The question is: what will YOU build?
              </em>
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => navigate('/advanced-machine-learning')}
              variant="secondary"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Advanced ML
            </Button>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              variant="secondary"
              className="flex-1"
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KerasSession42;
