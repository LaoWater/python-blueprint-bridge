import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Sparkles, TrendingUp, Zap, Heart, DollarSign, Activity, Target, ArrowLeft, ChevronDown, ChevronUp, Clock, Layers, Download } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';
import { useNavigate } from 'react-router-dom';

const KerasSession45 = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    foundation: false,
    vgg16: false,
    mobilenet: false,
    health: false,
    finance: false,
    finetuning: false,
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
      icon: "⏰",
      title: "2014: The Startup Constraint",
      content: "An agricultural tech startup needs crop disease detection AI. Training a CNN from scratch requires: 1 million labeled images, 2 months of GPU training, $50,000 in compute costs. They have: 5,000 images, 2 weeks, $5,000.",
      details: (
        <div className="space-y-3">
          <p><strong>The Reality Check:</strong> Building deep learning systems from scratch is a luxury only Google, Facebook, and academia can afford.</p>
          <p><strong>The Economics:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Data Collection:</strong> $200-500 per agricultural image with expert labels</li>
            <li><strong>Training Time:</strong> 2-4 weeks on high-end GPUs ($10K-50K compute cost)</li>
            <li><strong>Iteration Cycles:</strong> Need 5-10 attempts to get architecture right</li>
            <li><strong>Total Cost:</strong> $100K-500K for a single custom CNN</li>
          </ul>
          <p className="pt-2"><strong>The Startup Dilemma:</strong> We can't compete on resources. We can't wait months. We need results NOW.</p>
          <p className="text-red-600 dark:text-red-400 font-semibold">The industry needed a way to bootstrap deep learning WITHOUT starting from zero.</p>
        </div>
      )
    },
    {
      icon: "💡",
      title: "The Insight: Knowledge Transfer from ImageNet",
      content: "Researchers discovered: A CNN trained on 1.2M general images (ImageNet) already knows edges, textures, shapes. We can REUSE these features for specialized tasks.",
      details: (
        <div className="space-y-3">
          <p><strong>The Breakthrough Observation (2014):</strong> Early CNN layers learn universal visual features—edges, textures, gradients. These are useful for ANY image task, not just ImageNet.</p>
          <p><strong>The Transfer Learning Hypothesis:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Layer 1-3 (Early):</strong> General features (edges, colors) → Universal across ALL image tasks</li>
            <li><strong>Layer 4-7 (Middle):</strong> Moderate features (textures, patterns) → Mostly transferable</li>
            <li><strong>Layer 8+ (Deep):</strong> Task-specific features (dog faces, car wheels) → Needs adaptation</li>
          </ul>
          <p className="pt-2 text-blue-600 dark:text-blue-400 font-semibold italic">
            "Why spend 2 months learning edges when ImageNet models already learned them perfectly?"
          </p>
          <p className="pt-2"><strong>The Strategy:</strong></p>
          <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>Take a pre-trained CNN (e.g., VGG16 trained on ImageNet)</li>
            <li>Remove the final classification layer (1000 ImageNet classes)</li>
            <li>Add YOUR custom classifier (your specific task)</li>
            <li>Train ONLY your custom layers (10-100x faster)</li>
          </ol>
        </div>
      )
    },
    {
      icon: "🚀",
      title: "2015-2017: Transfer Learning Democratizes AI",
      content: "PlantVillage achieves 99% crop disease detection accuracy with just 10,000 images and 1 week of training. Before: impossible. After transfer learning: achievable.",
      details: (
        <div className="space-y-3">
          <p><strong>The PlantVillage Agricultural AI (2016):</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Approach:</strong> Fine-tuned InceptionV3 (pre-trained on ImageNet) on plant disease images</li>
            <li><strong>Data:</strong> 54,306 images of healthy and diseased crop leaves (vs millions needed from scratch)</li>
            <li><strong>Training Time:</strong> ~1 week (vs ~2-3 months from scratch)</li>
            <li><strong>Result:</strong> 99.35% accuracy on 38 disease classes across 14 crop species</li>
          </ul>
          <p className="pt-2"><strong>Why It Worked:</strong> ImageNet taught the network to understand visual patterns. Transfer learning adapted those patterns to agricultural images in days, not months.</p>
          <p className="pt-2 text-green-600 dark:text-green-400 font-semibold">
            Transfer learning made production-grade AI accessible to teams with limited data and budgets.
          </p>
        </div>
      )
    },
    {
      icon: "📱",
      title: "2018-2020: Mobile AI Explosion - MobileNet Era",
      content: "Your phone can now recognize objects in real-time. How? MobileNet—a transfer learning model optimized for mobile devices, running at 30 FPS on your smartphone.",
      details: (
        <div className="space-y-3">
          <p><strong>The Mobile Constraint:</strong> Phones have limited CPU/GPU power. Traditional CNNs (VGG16: 138M parameters) are too heavy.</p>
          <p><strong>MobileNet Innovation (Google, 2017):</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Depthwise separable convolutions:</strong> 90% fewer parameters, same accuracy</li>
            <li><strong>Size:</strong> ~4M parameters (vs VGG16's 138M)</li>
            <li><strong>Speed:</strong> Real-time inference on mobile CPUs</li>
            <li><strong>Accuracy:</strong> 70% top-1 on ImageNet (good enough for most apps)</li>
          </ul>
          <p className="pt-2"><strong>Real-World Applications:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Google Lens: Visual search on your phone</li>
            <li>Snapchat filters: Real-time face detection</li>
            <li>Food tracking apps: Instant meal recognition</li>
            <li>Receipt scanners: Extract text and amounts from photos</li>
          </ul>
          <p className="pt-2 text-purple-600 dark:text-purple-400 font-semibold">
            YOUR mobile apps can now leverage the same pre-trained models that power billion-dollar products.
          </p>
        </div>
      )
    },
    {
      icon: "🎯",
      title: "2024: YOUR Turn - Personal AI with Transfer Learning",
      content: "From agricultural diagnostics to YOUR health photo tracking. From mobile apps to YOUR finance receipt scanner. Transfer learning makes custom AI accessible to EVERYONE.",
      details: (
        <div className="space-y-3">
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            YOUR Health Vision AI:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>🍎 <strong>Food Recognition:</strong> Fine-tune MobileNet on your meals → automatic nutrition tracking</li>
            <li>🏋️ <strong>Exercise Form Checker:</strong> Detect proper squat/deadlift form from selfie videos</li>
            <li>📊 <strong>Progress Tracking:</strong> Analyze body composition changes from weekly photos</li>
            <li>💊 <strong>Pill Identifier:</strong> Recognize medications from photos (safety check)</li>
          </ul>
          <p className="pt-3 text-lg font-semibold text-green-600 dark:text-green-400">
            YOUR Finance Vision AI:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>🧾 <strong>Receipt Scanner:</strong> Extract amount, vendor, category from crumpled receipts</li>
            <li>🏪 <strong>Store Logo Detection:</strong> Auto-categorize spending by merchant logos</li>
            <li>💳 <strong>Card Recognition:</strong> Identify which credit card from photos (spending tracker)</li>
            <li>📄 <strong>Bill Classifier:</strong> Utilities vs subscriptions vs one-time purchases</li>
          </ul>
          <p className="pt-3 text-lg italic">
            <strong>The Resources YOU Need:</strong>
            <br />• 100-1000 images (not millions!)
            <br />• Few hours of training (not weeks!)
            <br />• Standard laptop or free Google Colab (not $50K GPU cluster!)
          </p>
          <p className="pt-3 font-semibold text-orange-600 dark:text-orange-400">
            The same transfer learning that powers billion-dollar companies... now powers YOUR personal projects.
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full mb-4">
            <Rocket className="h-12 w-12 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Session 45: Transfer Learning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Standing on Giants' Shoulders: Build Production AI in Hours, Not Months
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>~3 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Intermediate-Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Production Ready</span>
            </div>
          </div>
        </div>

        {/* Story Mode */}
        <div className="mb-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              The Origin Story: Why Train from Scratch When Giants Already Did?
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
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span className="mr-2">{chapter.icon}</span>
                Chapter {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Chapter Content */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <h3 className="text-2xl font-bold mb-3 text-orange-800 dark:text-orange-200">
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
              <strong>💡 The Dharma Approach:</strong> Transfer learning wasn't invented because someone thought "reusing weights sounds cool."
              It emerged because <em>real teams couldn't afford 4-month training cycles and millions in compute costs</em>.
              Startups needed to compete with Google—but had 1% of the resources. The <strong>CONSTRAINT</strong> came first.
              The <strong>INNOVATION</strong> followed. Now you can build production AI with a laptop and a weekend.
            </p>
          </div>
        </div>

        {/* Transfer Learning Foundation */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('foundation')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
              <Layers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Transfer Learning Foundation: The Strategy
            </h2>
            {expandedSections.foundation ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.foundation && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
                  How Transfer Learning Works: The Three-Step Process
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
                    <div className="text-2xl mb-2">📥</div>
                    <h4 className="font-bold text-sm mb-2 text-green-700 dark:text-green-300">Step 1: Load Pre-trained Model</h4>
                    <p className="text-xs text-foreground/70">
                      Download a CNN already trained on 1.2M ImageNet images (VGG16, ResNet50, MobileNet).
                      These models already understand edges, textures, shapes—universal visual features.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
                    <div className="text-2xl mb-2">🔨</div>
                    <h4 className="font-bold text-sm mb-2 text-orange-700 dark:text-orange-300">Step 2: Replace Classifier</h4>
                    <p className="text-xs text-foreground/70">
                      Remove the ImageNet classification head (1000 classes). Add YOUR custom classifier
                      (e.g., 5 food categories, or 2 classes: receipt vs non-receipt).
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-700">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-bold text-sm mb-2 text-purple-700 dark:text-purple-300">Step 3: Fine-Tune (Optional)</h4>
                    <p className="text-xs text-foreground/70">
                      Option A: Train only your classifier (fast). Option B: Unfreeze last few CNN layers and
                      fine-tune them on your data (better accuracy, slower).
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2 text-blue-800 dark:text-blue-200">Why This Works: Feature Hierarchy</p>
                  <div className="space-y-2 text-xs text-foreground/70">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-green-600 dark:text-green-400">Layer 1-3:</span>
                      <span>Generic features (edges, gradients, colors) → <strong>100% reusable</strong> across ALL tasks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-blue-600 dark:text-blue-400">Layer 4-6:</span>
                      <span>Moderate features (textures, patterns) → <strong>80% reusable</strong> (slight adaptation helps)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-purple-600 dark:text-purple-400">Layer 7+:</span>
                      <span>Task-specific (ImageNet object parts) → <strong>Need replacement</strong> for your custom task</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                  🎓 The Economics: Why Transfer Learning Wins
                </h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80">
                  <div>
                    <p className="font-semibold text-red-600 dark:text-red-400 mb-2">Training from Scratch:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
                      <li>Data needed: 1M+ labeled images</li>
                      <li>Training time: 2-4 weeks on GPUs</li>
                      <li>Compute cost: $10K-50K</li>
                      <li>Iterations: 5-10 architecture attempts</li>
                      <li><strong>Total: $50K-250K, 3-6 months</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Transfer Learning:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
                      <li>Data needed: 100-10K labeled images</li>
                      <li>Training time: 1-4 hours on laptop/Colab</li>
                      <li>Compute cost: $0-50 (Colab is free!)</li>
                      <li>Iterations: Fast experiments, instant feedback</li>
                      <li><strong>Total: $0-500, 1-7 days</strong></li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm mt-4 font-semibold text-center text-orange-600 dark:text-orange-400">
                  Transfer learning makes deep learning accessible to individuals and small teams.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* VGG16 Transfer Learning Example */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('vgg16')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <Download className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              Transfer Learning with VGG16: Complete Example
            </h2>
            {expandedSections.vgg16 ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.vgg16 && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Let's use VGG16 (pre-trained on ImageNet) to build a custom image classifier with minimal data.
                We'll classify food images into 5 categories for a health tracking app.
              </p>

              <CodeBlockR language="python">
{`import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

# ==========================================
# STEP 1: LOAD PRE-TRAINED VGG16
# ==========================================

print("="*70)
print("LOADING VGG16 PRE-TRAINED MODEL")
print("="*70)

# Load VGG16 without top classification layer
base_model = VGG16(
    weights='imagenet',        # Pre-trained on ImageNet
    include_top=False,         # Remove final 1000-class classifier
    input_shape=(224, 224, 3)  # VGG16 expects 224x224 RGB images
)

print(f"VGG16 loaded successfully!")
print(f"Total layers: {len(base_model.layers)}")
print(f"Total parameters: {base_model.count_params():,}")
print()

# ==========================================
# STEP 2: FREEZE BASE MODEL LAYERS
# ==========================================

# Freeze all VGG16 layers (don't train them)
for layer in base_model.layers:
    layer.trainable = False

print("VGG16 layers frozen (weights won't change during training)")
print("Why? These layers already learned universal visual features from ImageNet")
print()

# ==========================================
# STEP 3: ADD CUSTOM CLASSIFICATION HEAD
# ==========================================

# Build your custom classifier on top of VGG16
model = keras.Sequential([
    base_model,  # Pre-trained VGG16 (frozen)

    # Your custom layers:
    layers.Flatten(),
    # VGG16 output: (7, 7, 512) → Flatten to (25088,)

    layers.Dense(256, activation='relu', name='custom_dense1'),
    # Learn task-specific combinations of VGG16 features

    layers.Dropout(0.5, name='custom_dropout'),
    # Regularization to prevent overfitting on small dataset

    layers.Dense(5, activation='softmax', name='output')
    # 5 food categories (modify for YOUR classes)
], name='VGG16_FoodClassifier')

print("="*70)
print("CUSTOM MODEL ARCHITECTURE")
print("="*70)
model.summary()
print()

# ==========================================
# KEY INSIGHT: Parameter Comparison
# ==========================================

trainable_params = sum([np.prod(var.shape) for var in model.trainable_variables])
total_params = model.count_params()
frozen_params = total_params - trainable_params

print("="*70)
print("PARAMETER BREAKDOWN")
print("="*70)
print(f"Total parameters:     {total_params:,}")
print(f"Frozen (VGG16):       {frozen_params:,} ({frozen_params/total_params*100:.1f}%)")
print(f"Trainable (Custom):   {trainable_params:,} ({trainable_params/total_params*100:.1f}%)")
print()
print("You're only training 1-5% of the total parameters!")
print("This is WHY transfer learning is so fast.")
print()

# ==========================================
# COMPILE MODEL
# ==========================================

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.0001),  # Lower LR for fine-tuning
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# ==========================================
# DATA PREPARATION INSTRUCTIONS
# ==========================================

print("="*70)
print("DATA PREPARATION GUIDE")
print("="*70)
print("""
To use this model, organize your images like this:

food_data/
   train/
      healthy_protein/
         chicken1.jpg
         fish2.jpg
      healthy_carbs/
         rice1.jpg
         oatmeal2.jpg
      healthy_fats/
         avocado1.jpg
         nuts2.jpg
      processed_food/
         chips1.jpg
         candy2.jpg
      fast_food/
         burger1.jpg
         pizza2.jpg
   validation/
      healthy_protein/
         ...
      healthy_carbs/
         ...
      (same structure)

DATASET OPTIONS:

1. USE SAMPLE DATASET (Recommended for Learning):
   - Food-101 (Kaggle): https://www.kaggle.com/dansbecker/food-101
   - Download, extract 5 categories you want to track

2. CREATE YOUR OWN:
   - Take 20-50 photos per food category with your phone
   - Split: 80% train, 20% validation
   - Augmentation will multiply your effective dataset size

3. USE EXISTING FOOD DATASET:
   - Google "food image dataset" or check Kaggle
   - Many free datasets available for nutrition tracking

STEP-BY-STEP SETUP:

1. Create folder structure above
2. Add at least 20 images per category to train/
3. Add at least 5 images per category to validation/
4. Run the data generator code below
""")
print()

# ==========================================
# DATA GENERATORS WITH AUGMENTATION
# ==========================================

# IMPORTANT: Update these paths to YOUR data directory
TRAIN_DIR = 'food_data/train'
VAL_DIR = 'food_data/validation'
IMG_SIZE = (224, 224)  # VGG16 input size
BATCH_SIZE = 32

# Training data augmentation (increase effective dataset size)
train_datagen = ImageDataGenerator(
    rescale=1./255,              # Normalize to [0, 1]
    rotation_range=20,           # Rotate images ±20 degrees
    width_shift_range=0.2,       # Shift horizontally
    height_shift_range=0.2,      # Shift vertically
    horizontal_flip=True,        # Random horizontal flip
    zoom_range=0.2,              # Random zoom
    fill_mode='nearest'          # Fill empty pixels after transforms
)

# Validation data (no augmentation, only rescaling)
val_datagen = ImageDataGenerator(rescale=1./255)

# UNCOMMENT THESE LINES WHEN YOUR DATA IS READY:

# train_generator = train_datagen.flow_from_directory(
#     TRAIN_DIR,
#     target_size=IMG_SIZE,
#     batch_size=BATCH_SIZE,
#     class_mode='categorical'
# )

# val_generator = val_datagen.flow_from_directory(
#     VAL_DIR,
#     target_size=IMG_SIZE,
#     batch_size=BATCH_SIZE,
#     class_mode='categorical'
# )

# print(f"Found {train_generator.samples} training images")
# print(f"Found {val_generator.samples} validation images")
# print(f"Classes: {train_generator.class_indices}")
# print()

# ==========================================
# CALLBACKS FOR PROFESSIONAL TRAINING
# ==========================================

callbacks = [
    EarlyStopping(
        monitor='val_accuracy',
        patience=5,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        'best_food_classifier.keras',
        monitor='val_accuracy',
        save_best_only=True,
        mode='max',
        verbose=1
    )
]

# ==========================================
# TRAINING (UNCOMMENT WHEN DATA IS READY)
# ==========================================

# print("="*70)
# print("TRAINING FOOD CLASSIFIER")
# print("="*70)
# print("Expected time: 10-30 minutes on CPU, 2-5 minutes on GPU")
# print("="*70)
# print()

# history = model.fit(
#     train_generator,
#     epochs=20,
#     validation_data=val_generator,
#     callbacks=callbacks,
#     verbose=1
# )

# ==========================================
# ALTERNATIVE: DEMO WITH MNIST (NO SETUP NEEDED)
# ==========================================

print("="*70)
print("DEMO: TRANSFER LEARNING ON MNIST (No data download needed)")
print("="*70)
print("Since you may not have food images ready, let's demonstrate")
print("transfer learning on Fashion-MNIST (built-in dataset)")
print()

from tensorflow.keras.datasets import fashion_mnist

# Load Fashion-MNIST
(x_train, y_train), (x_test, y_test) = fashion_mnist.load_data()

# Preprocess for VGG16 (needs RGB, not grayscale)
x_train_rgb = np.stack([x_train]*3, axis=-1)  # Convert grayscale to RGB
x_test_rgb = np.stack([x_test]*3, axis=-1)

# Resize to 224x224 (VGG16 input size)
from tensorflow.image import resize

x_train_resized = resize(x_train_rgb, (224, 224)).numpy() / 255.0
x_test_resized = resize(x_test_rgb, (224, 224)).numpy() / 255.0

# Use subset for speed (first 10,000 images)
x_train_subset = x_train_resized[:10000]
y_train_subset = keras.utils.to_categorical(y_train[:10000], 10)
x_test_subset = x_test_resized[:2000]
y_test_subset = keras.utils.to_categorical(y_test[:2000], 10)

# Build model for 10 classes (Fashion-MNIST)
demo_model = keras.Sequential([
    base_model,
    layers.Flatten(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

demo_model.compile(
    optimizer=keras.optimizers.Adam(0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("Training on Fashion-MNIST subset (10,000 images)...")
print("This demonstrates transfer learning speed even on CPU")
print()

history_demo = demo_model.fit(
    x_train_subset, y_train_subset,
    epochs=5,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

test_loss, test_acc = demo_model.evaluate(x_test_subset, y_test_subset, verbose=0)

print()
print("="*70)
print("DEMO RESULTS")
print("="*70)
print(f"Test Accuracy: {test_acc:.4f} ({test_acc*100:.2f}%)")
print()
print("🎯 Key Takeaway:")
print("   Even with just 5 epochs and 10K images, transfer learning")
print("   achieves good accuracy (typically 85-90% on Fashion-MNIST)")
print()
print("   With YOUR food images, expect similar rapid convergence!")
print()

# ==========================================
# MAKING PREDICTIONS ON NEW IMAGES
# ==========================================

print("="*70)
print("USING THE MODEL FOR PREDICTIONS")
print("="*70)
print("""
Once trained, use your model like this:

from tensorflow.keras.preprocessing import image
import numpy as np

# Load and preprocess a new image
img_path = 'path/to/your/food_photo.jpg'
img = image.load_img(img_path, target_size=(224, 224))
img_array = image.img_to_array(img) / 255.0
img_batch = np.expand_dims(img_array, axis=0)  # Add batch dimension

# Predict
predictions = model.predict(img_batch)
predicted_class = np.argmax(predictions[0])
confidence = predictions[0][predicted_class]

class_names = ['healthy_protein', 'healthy_carbs', 'healthy_fats',
               'processed_food', 'fast_food']

print(f"Prediction: {class_names[predicted_class]}")
print(f"Confidence: {confidence*100:.1f}%")

# For health tracking app:
if predicted_class in [0, 1, 2]:  # Healthy categories
    print("✅ Healthy food detected - logging to your nutrition tracker")
else:
    print("⚠️  Processed food detected - consider healthier alternatives")
""")

# ==========================================
# SAVE MODEL FOR DEPLOYMENT
# ==========================================

demo_model.save('vgg16_transfer_demo.keras')
print("Demo model saved: vgg16_transfer_demo.keras")
print()

print("="*70)
print("KEY INSIGHTS: TRANSFER LEARNING")
print("="*70)
print("""
1. SPEED:
   - Training from scratch: 2-4 weeks
   - Transfer learning: 1-4 hours
   - 100-500x speedup!

2. DATA EFFICIENCY:
   - From scratch needs: 100K-1M images
   - Transfer learning needs: 100-10K images
   - 10-1000x less data required

3. WHEN IT WORKS BEST:
   - Your images are similar to ImageNet (natural images, objects)
   - You have limited labeled data (common in real-world)
   - You need fast iteration and experimentation

4. WHEN TO TRAIN FROM SCRATCH:
   - Your images are VERY different (satellite imagery, microscopy, specialized domains)
   - You have millions of labeled examples
   - You have weeks of GPU time available

5. PRODUCTION TIP:
   - Start with transfer learning (fast iteration)
   - Once you prove the concept works, THEN consider from-scratch training
   - Most production systems use transfer learning or fine-tuning
""")`}
              </CodeBlockR>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-green-800 dark:text-green-200">
                  🎯 What Just Happened: The Magic Explained
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p><strong>VGG16 Pre-trained Layers:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
                    <li><strong>Block 1 (2 conv layers):</strong> Learned edge detectors → Work on ANY images</li>
                    <li><strong>Block 2 (2 conv layers):</strong> Learned texture detectors → Still universal</li>
                    <li><strong>Block 3 (3 conv layers):</strong> Learned pattern combinations → Mostly universal</li>
                    <li><strong>Block 4-5 (6 conv layers):</strong> Learned high-level features → We freeze these too</li>
                  </ul>
                  <p className="pt-3"><strong>Your Custom Layers:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
                    <li><strong>Dense(256):</strong> Learns how to combine VGG16 features for YOUR task</li>
                    <li><strong>Dropout(0.5):</strong> Prevents overfitting on your small dataset</li>
                    <li><strong>Dense(5, softmax):</strong> Final classification for YOUR categories</li>
                  </ul>
                  <p className="pt-3 font-semibold text-blue-600 dark:text-blue-400">
                    Result: You only train ~1-5% of parameters, but get 90%+ of full-training accuracy in 1% of the time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MobileNet for Mobile Deployment */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('mobilenet')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              MobileNet: Transfer Learning for Mobile & Web
            </h2>
            {expandedSections.mobilenet ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.mobilenet && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800">
                <h3 className="text-xl font-semibold mb-3 text-cyan-800 dark:text-cyan-200">
                  Why MobileNet? Deploy AI on Phones, Not Just Servers
                </h3>
                <p className="text-foreground/80 mb-4">
                  <strong>The Problem with VGG16:</strong> 138M parameters, 528MB model file, too slow for mobile phones.
                </p>
                <p className="text-foreground/80 mb-4">
                  <strong>MobileNet Solution:</strong> 4.2M parameters (97% smaller!), 16MB model file, runs at 30 FPS on phone CPU.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-cyan-200 dark:border-cyan-700">
                    <p className="font-semibold text-sm mb-2 text-red-600 dark:text-red-400">VGG16 (Desktop/Server)</p>
                    <ul className="text-xs space-y-1 text-foreground/70">
                      <li>• 138M parameters</li>
                      <li>• 528MB model size</li>
                      <li>• ~5 FPS on mobile CPU</li>
                      <li>• High accuracy (72% ImageNet)</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-green-200 dark:border-green-700">
                    <p className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">MobileNet (Mobile/Edge)</p>
                    <ul className="text-xs space-y-1 text-foreground/70">
                      <li>• 4.2M parameters</li>
                      <li>• 16MB model size</li>
                      <li>• ~30 FPS on mobile CPU</li>
                      <li>• Good accuracy (70% ImageNet)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlockR language="python">
{`from tensorflow.keras.applications import MobileNetV2

# ==========================================
# MOBILENET TRANSFER LEARNING
# ==========================================

print("="*70)
print("MOBILENET V2 - MOBILE-OPTIMIZED TRANSFER LEARNING")
print("="*70)

# Load MobileNetV2 (much smaller than VGG16)
mobile_base = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3),
    alpha=1.0  # Width multiplier (1.0 = full model, 0.5 = half size)
)

# Freeze base model
mobile_base.trainable = False

# Build classifier
mobile_model = keras.Sequential([
    mobile_base,
    layers.GlobalAveragePooling2D(),  # More efficient than Flatten
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(5, activation='softmax')  # YOUR custom classes
], name='MobileNet_Classifier')

print(f"MobileNetV2 parameters: {mobile_base.count_params():,}")
print(f"Total model parameters: {mobile_model.count_params():,}")
print(f"Model size: ~{mobile_model.count_params() * 4 / 1024 / 1024:.1f} MB (32-bit floats)")
print()

mobile_model.compile(
    optimizer=keras.optimizers.Adam(0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("="*70)
print("MOBILENET ADVANTAGES")
print("="*70)
print("""
1. DEPLOYMENT TARGETS:
   ✅ Mobile apps (iOS, Android)
   ✅ Web browsers (TensorFlow.js)
   ✅ Raspberry Pi / Edge devices
   ✅ Real-time video processing

2. USE CASES:
   🍎 Food recognition in nutrition tracking apps
   📸 Real-time receipt scanning
   🏃 Exercise form detection from phone camera
   💊 Pill identification on the go

3. PERFORMANCE:
   - Inference: 30-60ms per image on mobile CPU
   - Battery: Minimal drain (optimized operations)
   - Accuracy: 2-3% lower than VGG16, but still excellent

4. WHEN TO USE:
   - Deploying to mobile/web
   - Real-time video processing needed
   - Limited compute resources
   - Model size matters (app download size)
""")

# ==========================================
# MOBILENET DEMO: QUICK TRAINING
# ==========================================

print("="*70)
print("QUICK MOBILENET DEMO")
print("="*70)

# Use Fashion-MNIST again for demo (no data prep needed)
x_train_mobile = x_train_resized[:5000]  # Smaller subset for speed
y_train_mobile = keras.utils.to_categorical(y_train[:5000], 10)

mobile_demo = keras.Sequential([
    mobile_base,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax')
])

mobile_demo.compile(
    optimizer=keras.optimizers.Adam(0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("Training MobileNet (5,000 images, 3 epochs)...")
print("Notice how FAST this trains compared to VGG16!")
print()

history_mobile = mobile_demo.fit(
    x_train_mobile, y_train_mobile,
    epochs=3,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

mobile_test_loss, mobile_test_acc = mobile_demo.evaluate(
    x_test_subset, y_test_subset, verbose=0
)

print()
print("="*70)
print("MOBILENET DEMO RESULTS")
print("="*70)
print(f"Test Accuracy: {mobile_test_acc:.4f} ({mobile_test_acc*100:.2f}%)")
print()
print("Comparison:")
print(f"  VGG16 demo accuracy:      ~{test_acc*100:.1f}%")
print(f"  MobileNet demo accuracy:  ~{mobile_test_acc*100:.1f}%")
print(f"  Accuracy difference:      ~{abs(test_acc - mobile_test_acc)*100:.1f}%")
print()
print("🎯 The trade-off: MobileNet is 30x smaller and 10x faster,")
print("   with only 2-3% accuracy loss. Worth it for mobile deployment!")
print()

# Save mobile model
mobile_demo.save('mobilenet_transfer_demo.keras')
print("MobileNet model saved: mobilenet_transfer_demo.keras")

# ==========================================
# CONVERTING TO MOBILE FORMATS
# ==========================================

print()
print("="*70)
print("DEPLOYING TO MOBILE/WEB")
print("="*70)
print("""
After training, convert your Keras model for deployment:

1. TENSORFLOW LITE (Mobile: iOS, Android):

   import tensorflow as tf

   # Convert to TFLite
   converter = tf.lite.TFLiteConverter.from_keras_model(mobile_model)
   converter.optimizations = [tf.lite.Optimize.DEFAULT]  # Quantization
   tflite_model = converter.convert()

   # Save
   with open('model.tflite', 'wb') as f:
       f.write(tflite_model)

   # Result: ~4MB file, runs on phone at 30+ FPS

2. TENSORFLOW.JS (Web Browsers):

   # Install: pip install tensorflowjs
   import tensorflowjs as tfjs

   tfjs.converters.save_keras_model(mobile_model, 'web_model/')

   # Use in web app:
   // JavaScript
   const model = await tf.loadLayersModel('web_model/model.json');
   const prediction = model.predict(imageTensor);

3. COREML (iOS Native):

   # Install: pip install coremltools
   import coremltools as ct

   coreml_model = ct.convert(mobile_model)
   coreml_model.save('model.mlmodel')

   # Integrate in Swift iOS app

YOUR REAL-WORLD WORKFLOW:
1. Train with MobileNet transfer learning (Keras, this notebook)
2. Test accuracy on your validation set
3. Convert to target platform (TFLite, TF.js, CoreML)
4. Deploy to production app
5. Monitor real-world performance
6. Iterate and improve with new data
""")`}
              </CodeBlockR>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-purple-800 dark:text-purple-200">
                  📱 Real-World Mobile AI Examples
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Health Apps:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-xs text-foreground/70">
                      <li><strong>MyFitnessPal:</strong> Food recognition from photos</li>
                      <li><strong>Foodvisor:</strong> Instant nutrition estimation</li>
                      <li><strong>Ada Health:</strong> Symptom checker with image analysis</li>
                      <li><strong>Plantix:</strong> Plant disease identification from leaf photos</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Finance Apps:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-xs text-foreground/70">
                      <li><strong>Expensify:</strong> Receipt scanning and extraction</li>
                      <li><strong>Mint:</strong> Document categorization</li>
                      <li><strong>Mobile banking:</strong> Check deposit via photo</li>
                      <li><strong>Veryfi:</strong> Receipt OCR and categorization</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm mt-4 font-semibold text-center text-orange-600 dark:text-orange-400">
                  All powered by MobileNet transfer learning. Now YOU can build the same.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Health Application: Food Classifier */}
        <div className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl p-8 border border-green-200 dark:border-green-800 shadow-lg">
          <button
            onClick={() => toggleSection('health')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-200">
                🏥 Real-World Health: Nutrition Tracking with Food Recognition
              </h2>
            </div>
            {expandedSections.health ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.health && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                  The Need: Auto-Log Meals from Photos
                </h3>
                <p className="text-foreground/80 mb-4">
                  You take a photo of your meal. Your phone instantly recognizes the food type, estimates
                  calories, and logs it to MyFitnessPal. No manual entry. No searching databases.
                  Just point, shoot, and track.
                </p>
                <p className="text-foreground/70 text-sm">
                  <strong>The Challenge:</strong> Manual food logging has 80% abandonment rate after 1 week.
                  People stop because it's tedious. Computer vision solves this.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-200">
                  🎯 Quick Implementation Guide
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <p className="font-semibold">Step 1: Get Food Dataset</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-xs">
                      <li><strong>Food-101:</strong> Download from Kaggle (101 food categories, 101K images)</li>
                      <li><strong>Your Custom Set:</strong> Photo your meals for 2 weeks (~100-200 images)</li>
                      <li>Select 5-10 categories you eat most often</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Step 2: Transfer Learn with MobileNet</p>
                    <p className="text-xs mt-1">Use the MobileNet code from above, train on your food images (1-2 hours on laptop)</p>
                  </div>
                  <div>
                    <p className="font-semibold">Step 3: Convert to Mobile</p>
                    <CodeBlockR language="bash">
{`# Convert to TensorFlow Lite for mobile
tensorflowjs_converter --input_format=keras \\
  mobilenet_food.keras \\
  ./food_model_web/

# Now deployable to web app or mobile app`}
                    </CodeBlockR>
                  </div>
                  <div>
                    <p className="font-semibold">Step 4: Integrate with Nutrition API</p>
                    <p className="text-xs mt-1">
                      Once you detect food type, query nutrition APIs (Nutritionix, USDA) for calorie/macro data
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                  <p className="text-sm">
                    <strong>💡 Real Impact:</strong> MyFitnessPal, LoseIt, and Foodvisor all use similar food recognition.
                    You're building the same tech that serves millions of users. Start with 5 food categories
                    (your most common meals), achieve 85%+ accuracy in a weekend.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Finance Application: Receipt Scanner */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-8 border border-blue-200 dark:border-blue-800 shadow-lg">
          <button
            onClick={() => toggleSection('finance')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                💰 Real-World Finance: Smart Receipt Categorization
              </h2>
            </div>
            {expandedSections.finance ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.finance && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                  The Need: Instant Receipt Categorization
                </h3>
                <p className="text-foreground/80 mb-4">
                  Photo a crumpled receipt. Your phone identifies: grocery store vs restaurant vs gas station vs
                  shopping. Auto-categorizes the expense. No typing. No dropdowns. Just snap and done.
                </p>
                <p className="text-foreground/70 text-sm">
                  <strong>The Challenge:</strong> Manual expense categorization takes 2-5 minutes per receipt.
                  With 20-30 receipts/month, that's 1+ hour of tedious work. Vision AI does it in 1 second.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-green-800 dark:text-green-200">
                  🎯 Implementation Strategy
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <p className="font-semibold">Step 1: Collect Receipt Data</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-xs">
                      <li>Photo ALL receipts for 1 month (~50-100 receipts)</li>
                      <li>Organize into folders: Groceries, Dining, Gas, Shopping, Utilities, Other</li>
                      <li>Each category should have 15+ examples</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Step 2: Train Classifier</p>
                    <CodeBlockR language="python">
{`# Use VGG16 for higher accuracy (receipts need detail)
base = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base.trainable = False

model = keras.Sequential([
    base,
    layers.Flatten(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(6, activation='softmax')  # 6 spending categories
])

# Train on your receipt images
# Expected accuracy: 85-95% after 10-20 epochs`}
                    </CodeBlockR>
                  </div>
                  <div>
                    <p className="font-semibold">Step 3: Enhance with OCR (Optional)</p>
                    <p className="text-xs mt-1">
                      Use Tesseract OCR or Google Vision API to extract dollar amounts from classified receipts.
                      Combine category (from CNN) + amount (from OCR) = full expense entry.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Step 4: Deploy to Mobile</p>
                    <p className="text-xs mt-1">
                      Convert to TFLite, integrate into budget tracking app. Point phone at receipt → instant categorization.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                  <p className="text-sm">
                    <strong>💡 Production Example:</strong> Expensify uses receipt vision AI and charges $5-10/month.
                    You just built 80% of their core tech. Scale it to classify YOUR spending patterns with custom categories
                    (work expenses vs personal, essential vs discretionary, etc.).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fine-Tuning Advanced Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('finetuning')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              Advanced: Fine-Tuning for Maximum Accuracy
            </h2>
            {expandedSections.finetuning ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.finetuning && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
                  Two-Stage Training: Feature Extraction → Fine-Tuning
                </h3>
                <p className="text-foreground/80 mb-4">
                  <strong>Stage 1:</strong> Train only your custom classifier (base frozen) → Fast, prevents catastrophic forgetting
                </p>
                <p className="text-foreground/80 mb-4">
                  <strong>Stage 2:</strong> Unfreeze last few base layers, fine-tune with VERY low learning rate → Adapts features to your specific domain
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">Why Two Stages?</p>
                  <p className="text-xs text-foreground/70 mb-2">
                    If you unfreeze base layers immediately with random classifier weights, gradients will be huge and
                    destroy the carefully learned ImageNet features. Train classifier FIRST to get reasonable weights,
                    THEN fine-tune base layers gently.
                  </p>
                </div>
              </div>

              <CodeBlockR language="python">
{`# ==========================================
# TWO-STAGE FINE-TUNING STRATEGY
# ==========================================

print("="*70)
print("FINE-TUNING STRATEGY")
print("="*70)

# STAGE 1: Train classifier only (we already did this above)
print("✅ Stage 1 Complete: Trained custom classifier")
print("   Base model frozen, classifier learned to use VGG16 features")
print()

# ==========================================
# STAGE 2: SELECTIVE FINE-TUNING
# ==========================================

print("Starting Stage 2: Fine-tuning last layers...")
print()

# Unfreeze the base model
mobile_base.trainable = True

# Freeze early layers, fine-tune only last layers
# MobileNetV2 has 155 layers - let's fine-tune last 30
fine_tune_at = len(mobile_base.layers) - 30

for layer in mobile_base.layers[:fine_tune_at]:
    layer.trainable = False

print(f"MobileNetV2 total layers: {len(mobile_base.layers)}")
print(f"Frozen layers: {fine_tune_at}")
print(f"Fine-tuning layers: {len(mobile_base.layers) - fine_tune_at}")
print()

# Count parameters
trainable_count = sum([np.prod(var.shape) for var in mobile_model.trainable_variables])
total_count = mobile_model.count_params()

print(f"Trainable parameters: {trainable_count:,} ({trainable_count/total_count*100:.1f}%)")
print(f"Frozen parameters: {total_count - trainable_count:,}")
print()

# ==========================================
# RECOMPILE WITH LOWER LEARNING RATE
# ==========================================
# CRITICAL: Use 10-100x lower learning rate for fine-tuning

mobile_model.compile(
    optimizer=keras.optimizers.Adam(1e-5),  # 10x lower than before (was 1e-4)
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("Recompiled with learning rate: 1e-5 (10x lower)")
print("Why? Prevent destroying pre-trained features with large updates")
print()

# ==========================================
# FINE-TUNING TRAINING
# ==========================================

# UNCOMMENT when you have real data:

# print("="*70)
# print("STAGE 2: FINE-TUNING")
# print("="*70)
# print("Training with unfrozen layers (slower, but higher accuracy)")
# print()

# history_finetune = mobile_model.fit(
#     train_generator,
#     epochs=10,  # Fewer epochs than Stage 1
#     validation_data=val_generator,
#     callbacks=callbacks,
#     verbose=1
# )

# test_loss_ft, test_acc_ft = mobile_model.evaluate(
#     val_generator, verbose=0
# )

# print()
# print("="*70)
# print("FINE-TUNING RESULTS")
# print("="*70)
# print(f"After Stage 1 (frozen base): {test_acc:.4f}")
# print(f"After Stage 2 (fine-tuned):  {test_acc_ft:.4f}")
# print(f"Improvement: {(test_acc_ft - test_acc)*100:.2f} percentage points")
# print()

# ==========================================
# EXPECTED IMPROVEMENTS
# ==========================================

print("="*70)
print("EXPECTED FINE-TUNING IMPROVEMENTS")
print("="*70)
print("""
TYPICAL RESULTS:

Stage 1 (Frozen base, train classifier):
  - Accuracy: 85-90% (depending on dataset)
  - Training time: 1-2 hours
  - Good for: Quick prototyping, limited data

Stage 2 (Fine-tune last layers):
  - Accuracy: 90-95% (+3-5 percentage points)
  - Training time: 2-4 hours
  - Good for: Production models, when accuracy matters

WHEN TO FINE-TUNE:
  ✅ Your data is significantly different from ImageNet
  ✅ You have at least 1K images per class
  ✅ You need maximum accuracy (production system)
  ✅ You have GPU available (fine-tuning is slower)

WHEN TO SKIP FINE-TUNING:
  ❌ Your data is similar to ImageNet (natural images)
  ❌ You have very limited data (<100 images/class)
  ❌ Stage 1 accuracy is already sufficient
  ❌ You need fast iteration/prototyping
""")

# ==========================================
# FINE-TUNING BEST PRACTICES
# ==========================================

print()
print("="*70)
print("FINE-TUNING BEST PRACTICES")
print("="*70)
print("""
1. LEARNING RATE:
   - Stage 1 (frozen): 1e-4 or 1e-3
   - Stage 2 (fine-tune): 1e-5 or 1e-6 (10-100x lower!)
   - Too high LR = destroy pre-trained features
   - Too low LR = no improvement, slow convergence

2. LAYER SELECTION:
   - Only unfreeze LAST layers (top of network)
   - Early layers = generic features (edges) → keep frozen
   - Late layers = task-specific → adapt these
   - Typical: Unfreeze last 10-30% of base model

3. TRAINING EPOCHS:
   - Stage 1: 10-20 epochs
   - Stage 2: 5-15 epochs (fewer, with EarlyStopping)
   - Fine-tuning converges faster than Stage 1

4. DATA AUGMENTATION:
   - Critical for Stage 2 (prevents overfitting)
   - Use rotation, flip, zoom, color jitter
   - Don't overdo it (unrealistic transforms hurt)

5. MONITORING:
   - Watch validation accuracy closely
   - If val_acc drops → learning rate too high
   - Use EarlyStopping to prevent overfitting
   - TensorBoard helps visualize fine-tuning dynamics
""")

# ==========================================
# SAVE FINE-TUNED MODEL
# ==========================================

mobile_model.save('mobilenet_finetuned.keras')
print()
print("Fine-tuned model saved: mobilenet_finetuned.keras")
print()

print("="*70)
print("DEPLOYMENT CHECKLIST")
print("="*70)
print("""
After fine-tuning, your model is ready for production:

☑ Model trained and validated
☑ Test accuracy meets requirements
☑ Model saved in Keras format
☑ Convert to deployment format (TFLite, TF.js, CoreML)
☑ Test inference speed on target device
☑ Implement error handling and logging
☑ Monitor real-world performance
☑ Collect edge cases for retraining

YOUR CONTINUOUS IMPROVEMENT LOOP:
1. Deploy initial model (Stage 1 transfer learning)
2. Collect real-world data and errors
3. Retrain with new data
4. Fine-tune for improved accuracy (Stage 2)
5. A/B test new model vs old
6. Deploy better model
7. Repeat
""")`}
              </CodeBlockR>

              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-orange-800 dark:text-orange-200">
                  ⚠️ Common Fine-Tuning Mistakes to Avoid
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-700 rounded p-3">
                    <p className="font-semibold text-red-700 dark:text-red-300 mb-1">❌ Mistake 1: Unfreezing all layers at once</p>
                    <p className="text-xs text-foreground/70">Result: Catastrophic forgetting - destroys ImageNet features, accuracy crashes</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">✅ Fix: Unfreeze only last 10-30% of layers</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-700 rounded p-3">
                    <p className="font-semibold text-red-700 dark:text-red-300 mb-1">❌ Mistake 2: Using same learning rate as Stage 1</p>
                    <p className="text-xs text-foreground/70">Result: Large weight updates destroy pre-trained patterns</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">✅ Fix: Use 10-100x lower LR (1e-5 or 1e-6)</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-700 rounded p-3">
                    <p className="font-semibold text-red-700 dark:text-red-300 mb-1">❌ Mistake 3: Fine-tuning before training classifier</p>
                    <p className="text-xs text-foreground/70">Result: Random classifier weights create massive gradients that break base model</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">✅ Fix: Always train classifier first (Stage 1), then fine-tune (Stage 2)</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-700 rounded p-3">
                    <p className="font-semibold text-red-700 dark:text-red-300 mb-1">❌ Mistake 4: Not using data augmentation</p>
                    <p className="text-xs text-foreground/70">Result: Overfitting on small dataset, poor generalization</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">✅ Fix: Use ImageDataGenerator with rotation, flip, zoom</p>
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
              🎯 Practical Exercises: Build YOUR Custom AI
            </h2>
            {expandedSections.exercises ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.exercises && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Time to apply transfer learning to YOUR real projects. Each exercise builds practical skills.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Exercise 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3 mb-3">
                    <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-200">
                        Exercise 1: Health Food Classifier
                      </h3>
                      <p className="text-sm text-foreground/80 mb-3">
                        <strong>Task:</strong> Build a mobile food classifier for nutrition tracking
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70 ml-4">
                    <li>Use MobileNetV2 (mobile deployment)</li>
                    <li>Categories: Protein, Carbs, Fats, Processed, Fast Food</li>
                    <li>Collect 20-50 phone photos per category</li>
                    <li>Train classifier, test on new meal photos</li>
                    <li>Convert to TFLite for Android/iOS app</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <p className="text-xs font-semibold text-blue-800 dark:text-blue-200">
                      💡 Real Application: Auto-log meals to MyFitnessPal from photos
                    </p>
                  </div>
                </div>

                {/* Exercise 2 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3 mb-3">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-green-800 dark:text-green-200">
                        Exercise 2: Receipt Scanner
                      </h3>
                      <p className="text-sm text-foreground/80 mb-3">
                        <strong>Task:</strong> Classify spending categories from receipt photos
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70 ml-4">
                    <li>Use VGG16 or MobileNet</li>
                    <li>Categories: Groceries, Dining, Shopping, Utilities, Gas</li>
                    <li>Photo your receipts over 2 weeks (~100 images)</li>
                    <li>Train model to auto-categorize expenses</li>
                    <li>Bonus: Extract amount using OCR (Tesseract)</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded">
                    <p className="text-xs font-semibold text-green-800 dark:text-green-200">
                      💡 Real Application: Auto-categorize spending from bank photos
                    </p>
                  </div>
                </div>

                {/* Exercise 3 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">
                    Exercise 3: Compare VGG16 vs MobileNet
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Train both models on same data, compare trade-offs
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Use Food-101 dataset (Kaggle, 5 classes)</li>
                    <li>Train VGG16 transfer model</li>
                    <li>Train MobileNetV2 transfer model</li>
                    <li>Compare: accuracy, training time, model size, inference speed</li>
                    <li>Analyze: When is MobileNet's speed worth the accuracy drop?</li>
                  </ul>
                </div>

                {/* Exercise 4 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-bold mb-3 text-orange-800 dark:text-orange-200">
                    Exercise 4: Fine-Tuning Experiment
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Measure fine-tuning improvement
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Stage 1: Train classifier only (frozen base)</li>
                    <li>Record validation accuracy</li>
                    <li>Stage 2: Fine-tune last 20 layers</li>
                    <li>Record new validation accuracy</li>
                    <li>Analyze: Was fine-tuning worth the extra time?</li>
                  </ul>
                </div>

                {/* Exercise 5 */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                  <h3 className="text-xl font-bold mb-3 text-pink-800 dark:text-pink-200">
                    Exercise 5: Data Augmentation Impact
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Prove augmentation prevents overfitting
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Train model WITHOUT augmentation</li>
                    <li>Train model WITH augmentation (rotation, flip, zoom)</li>
                    <li>Compare: train vs validation accuracy gap</li>
                    <li>Smaller gap = less overfitting = augmentation working</li>
                  </ul>
                </div>

                {/* Exercise 6 */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-xl font-bold mb-3 text-indigo-800 dark:text-indigo-200">
                    Exercise 6: YOUR Custom Project
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Ultimate Challenge:</strong> Build production-ready custom classifier
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Choose YOUR problem (health, finance, hobby)</li>
                    <li>Collect 100-500 images across categories</li>
                    <li>Transfer learn from MobileNet or VGG16</li>
                    <li>Fine-tune for maximum accuracy</li>
                    <li>Deploy to mobile/web</li>
                    <li>Use in real life for 1 week, iterate based on errors</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                  🎓 Learning Strategy for Exercises
                </h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>Week 1:</strong> Exercises 1-3 (build understanding, compare models)</p>
                  <p><strong>Week 2:</strong> Exercises 4-5 (advanced techniques, optimization)</p>
                  <p><strong>Week 3:</strong> Exercise 6 (YOUR custom project, real deployment)</p>
                  <p className="pt-3 font-semibold text-purple-600 dark:text-purple-400">
                    💡 The Goal: By end of Week 3, you have a DEPLOYED custom AI solving a real problem in your life.
                    Not a tutorial. Not a toy. A production system YOU built, YOU own, YOU iterate on.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary & Next Steps */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">🎉 Session 45 Complete: Transfer Learning Mastery</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What You've Mastered:</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Transfer learning fundamentals & philosophy</li>
                <li>✅ VGG16 transfer learning for high accuracy</li>
                <li>✅ MobileNet transfer learning for mobile deployment</li>
                <li>✅ Two-stage training: feature extraction + fine-tuning</li>
                <li>✅ Model deployment to TFLite, TF.js, CoreML</li>
                <li>✅ Production-ready workflows for real applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Next Session Preview:</h3>
              <p className="text-sm mb-3">
                <strong>Session 46:</strong> Advanced Transfer Learning Project
              </p>
              <ul className="space-y-2 text-sm">
                <li>🔹 Multi-modal models (image + text)</li>
                <li>🔹 Advanced callbacks & monitoring</li>
                <li>🔹 Production deployment strategies</li>
                <li>🔹 Continuous learning from user feedback</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-3">🚀 The Transfer Learning Revolution</p>
            <p className="text-sm leading-relaxed">
              You've just unlocked the secret that powers 90% of production computer vision systems.
              <br /><br />
              <strong>The same transfer learning you learned today:</strong>
              <br />• Powers agricultural diagnostics helping farmers worldwide
              <br />• Enables billion-dollar fintech apps
              <br />• Runs on your smartphone in real-time
              <br />• Costs $0-50 instead of $50K-500K to develop
              <br /><br />
              <strong>The paradigm shift:</strong> Deep learning is no longer reserved for Google-sized teams.
              Transfer learning democratized AI. A solo developer with a laptop can now build production-grade
              vision systems in a weekend.
              <br /><br />
              <em className="text-white/80">
                "Standing on giants' shoulders" isn't just a metaphor—it's your competitive advantage.
                ImageNet already learned edges, textures, shapes. You just teach it YOUR specific task.
                What will you build?
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

export default KerasSession45;
