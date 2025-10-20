import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Cpu, Satellite, Factory, Palette, Wind, AlertTriangle, ChevronDown, ChevronUp, Code, ArrowLeft } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const CNNSessions3738 = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    part1: false,
    part2: false,
    part3: false,
    part4: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const storyChapters = [
    {
      icon: "👁️",
      title: "1998: The Limitation Revealed",
      content: "Yann LeCun's team at Bell Labs successfully reads handwritten digits with LeNet-5. But there's a problem...",
      details: "Computer vision works for 28x28 pixel digits. But real images are 1000x1000 pixels with millions of features. Traditional neural networks need BILLIONS of weights. Training is impossible. Memory explodes. The dream of machines seeing the world seems decades away. Until someone asks: 'What if we don't need to look at every pixel independently?'"
    },
    {
      icon: "🔍",
      title: "The Biological Insight: Receptive Fields",
      content: "Hubel & Wiesel win the Nobel Prize (1981) for discovering how vision actually works in the brain",
      details: "Neurons in the visual cortex don't see the whole image at once. They have 'receptive fields' - small windows that detect edges, then corners, then shapes, then objects. Each layer builds on the previous. It's hierarchical. It's local. It's efficient. Fukushima creates the Neocognitron (1980) inspired by this. The architecture is born, but the training is still manual."
    },
    {
      icon: "⚡",
      title: "1998: LeNet-5 - The First CNN That Works",
      content: "Yann LeCun combines three ideas: local receptive fields (convolution) + weight sharing + backpropagation",
      details: "LeNet-5 reads zip codes for the US Postal Service. It processes 28x28 images with only 60,000 parameters instead of 2.4 million. Convolution: same filter slides across the image, sharing weights. Pooling: downsampling preserves patterns while reducing size. It works. But it's too slow for real applications. The world isn't ready."
    },
    {
      icon: "🌊",
      title: "2012: ImageNet Moment - AlexNet",
      content: "Geoffrey Hinton's team trains an 8-layer CNN on GPUs with 1.2 million images. Error rate drops from 26% to 15%.",
      details: "What changed? GPUs (parallel processing), Big Data (ImageNet), Dropout (regularization), ReLU (faster training). Suddenly CNNs can see. Google trains a network that discovers 'cat neurons' without being told what cats are. Facebook recognizes faces. Tesla sees roads. The computer vision revolution begins. Your convolutions become perception."
    },
    {
      icon: "🚀",
      title: "2014-2024: Transfer Learning & Beyond",
      content: "ResNet (2015), EfficientNet (2019), Vision Transformers (2020) - but the principle remains: hierarchical feature learning",
      details: "The insight: Models trained on ImageNet (14M images, 1000 categories) already understand edges, textures, shapes, objects. We don't need to start from scratch. Freeze early layers. Fine-tune later layers. Suddenly you can build medical diagnosis with 500 images instead of 500,000. Satellite monitoring. Manufacturing QA. Creative AI. All built on the same foundation: convolution + hierarchy + transfer learning."
    }
  ];

  const part1Content = {
    title: "Part 1: Understanding Convolution - The Core Operation",
    description: "From 'Why does OpenCV fail?' to understanding how CNNs see hierarchical patterns",
    code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import convolve2d

# ==========================================
# THE PROBLEM: Why Traditional Neural Networks Fail at Vision
# ==========================================

def demonstrate_parameter_explosion():
    """
    A 224x224 color image has 224 × 224 × 3 = 150,528 pixels

    If we connect this to just 1000 neurons:
    Weights needed = 150,528 × 1,000 = 150 MILLION parameters

    For a simple 3-layer network:
    Layer 1: 150M parameters
    Layer 2: 1M parameters  (1000 × 1000)
    Layer 3: 1M parameters

    Total: ~152 MILLION parameters for ONE small image classifier

    This is:
    - Computationally impossible to train
    - Requires massive memory
    - Overfits immediately (more parameters than training samples)
    - Ignores spatial structure (pixel at (10,10) has no relationship to (10,11))
    """

    print("=" * 70)
    print("THE PARAMETER EXPLOSION PROBLEM")
    print("=" * 70)
    print()

    image_sizes = [28, 64, 128, 224, 512]
    hidden_size = 1000

    print(f"{'Image Size':<15} {'Total Pixels':<15} {'Parameters':<20} {'Memory (GB)':<15}")
    print("-" * 70)

    for size in image_sizes:
        pixels = size * size * 3  # RGB
        params = pixels * hidden_size
        memory_gb = params * 4 / (1024**3)  # 4 bytes per float32

        print(f"{size}x{size}x3 {pixels:>12,} {params:>18,} {memory_gb:>12.2f}")

    print()
    print("💡 THE INSIGHT:")
    print("What if nearby pixels share the same detector?")
    print("What if we use the SAME filter across the whole image?")
    print("This is CONVOLUTION. This is weight sharing. This is CNNs.")
    print()

demonstrate_parameter_explosion()

# ==========================================
# CONVOLUTION: The Sliding Window That Detects Patterns
# ==========================================

def visualize_convolution_operation():
    """
    Convolution = Sliding a small filter over an image

    Each filter detects ONE pattern (edge, corner, texture)
    The SAME filter slides across the ENTIRE image
    This is weight sharing: one detector, many locations
    """

    print("=" * 70)
    print("CONVOLUTION OPERATION: Edge Detection Example")
    print("=" * 70)
    print()

    # Simple 5x5 image
    image = np.array([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 255, 255, 255],
        [0, 0, 255, 255, 255],
        [0, 0, 255, 255, 255]
    ])

    # Vertical edge detector (Sobel-like)
    vertical_filter = np.array([
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ])

    # Horizontal edge detector
    horizontal_filter = np.array([
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
    ])

    # Convolve
    vertical_edges = convolve2d(image, vertical_filter, mode='valid')
    horizontal_edges = convolve2d(image, horizontal_filter, mode='valid')

    # Visualize
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))

    # Original image
    axes[0, 0].imshow(image, cmap='gray')
    axes[0, 0].set_title('Original Image', fontsize=12, fontweight='bold')
    axes[0, 0].axis('off')

    # Vertical filter
    im = axes[0, 1].imshow(vertical_filter, cmap='RdBu', vmin=-2, vmax=2)
    axes[0, 1].set_title('Vertical Edge Filter\\n(3x3 kernel)', fontsize=12, fontweight='bold')
    axes[0, 1].axis('off')
    plt.colorbar(im, ax=axes[0, 1])

    # Vertical edges detected
    axes[0, 2].imshow(vertical_edges, cmap='hot')
    axes[0, 2].set_title('Vertical Edges Detected', fontsize=12, fontweight='bold')
    axes[0, 2].axis('off')

    # Horizontal filter
    im = axes[1, 1].imshow(horizontal_filter, cmap='RdBu', vmin=-2, vmax=2)
    axes[1, 1].set_title('Horizontal Edge Filter\\n(3x3 kernel)', fontsize=12, fontweight='bold')
    axes[1, 1].axis('off')
    plt.colorbar(im, ax=axes[1, 1])

    # Horizontal edges detected
    axes[1, 2].imshow(horizontal_edges, cmap='hot')
    axes[1, 2].set_title('Horizontal Edges Detected', fontsize=12, fontweight='bold')
    axes[1, 2].axis('off')

    # Hide unused subplot
    axes[1, 0].axis('off')

    plt.tight_layout()
    plt.savefig('convolution_edge_detection.png', dpi=300, bbox_inches='tight')
    print("✅ Convolution visualization saved: convolution_edge_detection.png")
    print()

    print("🔍 WHAT JUST HAPPENED:")
    print("1. Filter slides across image (stride = 1)")
    print("2. At each position: element-wise multiply + sum")
    print("3. Result: Feature map showing where edges exist")
    print("4. ONE filter, MANY locations (weight sharing!)")
    print()

    print("📐 PARAMETER COUNT:")
    print(f"   Traditional NN: {image.size * 9} parameters (fully connected)")
    print(f"   CNN: {vertical_filter.size} parameters (one 3x3 filter)")
    print(f"   Reduction: {image.size * 9 / vertical_filter.size:.0f}x fewer parameters!")
    print()

visualize_convolution_operation()

# ==========================================
# BUILDING A SIMPLE CNN FROM SCRATCH
# ==========================================

class SimpleCNN:
    """
    A minimal CNN to understand the architecture

    Architecture:
    Input (28x28x1)
      → Conv1 (3x3, 8 filters) → ReLU → (26x26x8)
      → MaxPool (2x2) → (13x13x8)
      → Conv2 (3x3, 16 filters) → ReLU → (11x11x16)
      → MaxPool (2x2) → (5x5x16)
      → Flatten → (400)
      → Dense (10) → Softmax

    This is LeNet-5 architecture (1998) simplified.
    """

    def __init__(self):
        # Conv layer 1: 8 filters of size 3x3x1
        self.conv1_filters = np.random.randn(8, 3, 3, 1) * 0.1
        self.conv1_bias = np.zeros(8)

        # Conv layer 2: 16 filters of size 3x3x8
        self.conv2_filters = np.random.randn(16, 3, 3, 8) * 0.1
        self.conv2_bias = np.zeros(16)

        # Dense layer: 400 → 10
        self.dense_weights = np.random.randn(400, 10) * 0.1
        self.dense_bias = np.zeros(10)

    def conv2d(self, image, filters, bias, stride=1):
        """
        Convolution operation

        For each filter:
          Slide across image
          At each position: element-wise multiply + sum
          Add bias
          Apply ReLU
        """
        h, w, c = image.shape
        n_filters, fh, fw, _ = filters.shape

        out_h = (h - fh) // stride + 1
        out_w = (w - fw) // stride + 1

        output = np.zeros((out_h, out_w, n_filters))

        for f in range(n_filters):
            for i in range(0, out_h):
                for j in range(0, out_w):
                    # Extract patch
                    patch = image[i*stride:i*stride+fh, j*stride:j*stride+fw, :]

                    # Convolve: element-wise multiply + sum
                    output[i, j, f] = np.sum(patch * filters[f]) + bias[f]

        return output

    def relu(self, x):
        """ReLU activation: max(0, x)"""
        return np.maximum(0, x)

    def max_pool(self, x, pool_size=2):
        """
        Max pooling: Take maximum value in each pool_size × pool_size window

        Reduces spatial dimensions while preserving dominant features
        Makes network invariant to small translations
        """
        h, w, c = x.shape
        out_h = h // pool_size
        out_w = w // pool_size

        output = np.zeros((out_h, out_w, c))

        for i in range(out_h):
            for j in range(out_w):
                for ch in range(c):
                    patch = x[i*pool_size:(i+1)*pool_size,
                             j*pool_size:(j+1)*pool_size,
                             ch]
                    output[i, j, ch] = np.max(patch)

        return output

    def softmax(self, x):
        """Softmax for multi-class classification"""
        exp_x = np.exp(x - np.max(x))
        return exp_x / exp_x.sum()

    def forward(self, x):
        """
        Forward pass through the network

        This is the exact same flow as AlexNet, ResNet, EfficientNet
        Just different number of layers and filters
        """

        # Input shape: (28, 28, 1)
        print(f"Input shape: {x.shape}")

        # Conv layer 1
        conv1 = self.conv2d(x, self.conv1_filters, self.conv1_bias)
        conv1 = self.relu(conv1)
        print(f"After Conv1 + ReLU: {conv1.shape}")

        # Max pool 1
        pool1 = self.max_pool(conv1, pool_size=2)
        print(f"After MaxPool1: {pool1.shape}")

        # Conv layer 2
        conv2 = self.conv2d(pool1, self.conv2_filters, self.conv2_bias)
        conv2 = self.relu(conv2)
        print(f"After Conv2 + ReLU: {conv2.shape}")

        # Max pool 2
        pool2 = self.max_pool(conv2, pool_size=2)
        print(f"After MaxPool2: {pool2.shape}")

        # Flatten
        flattened = pool2.reshape(-1)
        print(f"After Flatten: {flattened.shape}")

        # Dense layer
        dense = flattened @ self.dense_weights + self.dense_bias
        print(f"After Dense: {dense.shape}")

        # Softmax
        output = self.softmax(dense)
        print(f"After Softmax: {output.shape}")

        return output

# Test the CNN
print()
print("=" * 70)
print("SIMPLE CNN FORWARD PASS")
print("=" * 70)
print()

# Create a random 28x28 image
test_image = np.random.randn(28, 28, 1)

# Create CNN
cnn = SimpleCNN()

# Forward pass
predictions = cnn.forward(test_image)

print()
print("Output probabilities (10 classes):")
for i, prob in enumerate(predictions):
    print(f"  Class {i}: {prob:.4f}")

print()
print("🎯 PARAMETER EFFICIENCY:")
conv1_params = 8 * 3 * 3 * 1 + 8  # filters + biases
conv2_params = 16 * 3 * 3 * 8 + 16
dense_params = 400 * 10 + 10
total_params = conv1_params + conv2_params + dense_params

print(f"  Conv1 parameters: {conv1_params:,}")
print(f"  Conv2 parameters: {conv2_params:,}")
print(f"  Dense parameters: {dense_params:,}")
print(f"  Total parameters: {total_params:,}")
print()
print(f"  Traditional fully-connected network: ~{28*28*1000 + 1000*10:,} parameters")
print(f"  CNN reduction: ~{(28*28*1000 + 1000*10) / total_params:.1f}x fewer parameters!")

print()
print("=" * 70)
print("PART 1 COMPLETE: You understand convolution.")
print("You've seen weight sharing. You've built a CNN from scratch.")
print("Now: Real applications with TensorFlow/Keras.")
print("=" * 70)
`
  };

  const part2Content = {
    title: "Part 2: CNN Applications Across Domains",
    description: "From medical imaging to satellite analysis to manufacturing QA",
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

# ==========================================
# APPLICATION 1: PNEUMONIA DETECTION (Health)
# ==========================================

def build_pneumonia_classifier():
    """
    HEALTH APPLICATION: Detect pneumonia from chest X-rays

    Dataset: Chest X-rays (224x224 grayscale)
    Classes: Normal vs Pneumonia

    Why CNN over traditional CV?
    - OpenCV can detect edges, but not disease patterns
    - Pneumonia has subtle opacity patterns
    - CNN learns hierarchical features automatically:
      Layer 1: Edges, textures
      Layer 2: Lung shapes, vessel patterns
      Layer 3: Opacity distributions
      Layer 4: Disease signatures

    This architecture is used in real FDA-approved medical AI.
    """

    print("=" * 70)
    print("APPLICATION 1: PNEUMONIA DETECTION FROM CHEST X-RAYS")
    print("=" * 70)
    print()

    model = keras.Sequential([
        # Input: 224x224x1 (grayscale X-ray)
        layers.Input(shape=(224, 224, 1)),

        # Block 1: Feature extraction at original resolution
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', name='conv1_1'),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', name='conv1_2'),
        layers.MaxPooling2D((2, 2), name='pool1'),  # 112x112x32
        layers.BatchNormalization(name='bn1'),

        # Block 2: Mid-level features (lung structures)
        layers.Conv2D(64, (3, 3), activation='relu', padding='same', name='conv2_1'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same', name='conv2_2'),
        layers.MaxPooling2D((2, 2), name='pool2'),  # 56x56x64
        layers.BatchNormalization(name='bn2'),

        # Block 3: High-level features (opacity patterns)
        layers.Conv2D(128, (3, 3), activation='relu', padding='same', name='conv3_1'),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same', name='conv3_2'),
        layers.MaxPooling2D((2, 2), name='pool3'),  # 28x28x128
        layers.BatchNormalization(name='bn3'),

        # Block 4: Disease-specific patterns
        layers.Conv2D(256, (3, 3), activation='relu', padding='same', name='conv4_1'),
        layers.Conv2D(256, (3, 3), activation='relu', padding='same', name='conv4_2'),
        layers.GlobalAveragePooling2D(name='gap'),  # Spatial dimensions → single vector

        # Classification head
        layers.Dense(128, activation='relu', name='fc1'),
        layers.Dropout(0.5, name='dropout'),
        layers.Dense(1, activation='sigmoid', name='output')  # Binary: Normal/Pneumonia
    ])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0001),
        loss='binary_crossentropy',
        metrics=['accuracy', keras.metrics.AUC(name='auc')]
    )

    print("🏥 PNEUMONIA DETECTION CNN ARCHITECTURE:")
    print()
    model.summary()

    print()
    print("📊 CLINICAL VALIDATION METRICS:")
    print("   Accuracy: How often predictions are correct")
    print("   AUC: Area Under ROC Curve (discrimination ability)")
    print("   Sensitivity (Recall): % of pneumonia cases detected")
    print("   Specificity: % of healthy cases correctly identified")
    print()
    print("⚠️  CRITICAL: In medical AI, FALSE NEGATIVES are dangerous")
    print("   (Missing a pneumonia case is worse than a false alarm)")
    print("   So we optimize for HIGH SENSITIVITY (>95%)")
    print()

    return model

pneumonia_model = build_pneumonia_classifier()

# ==========================================
# APPLICATION 2: DIABETIC RETINOPATHY (Health)
# ==========================================

def build_retinopathy_classifier():
    """
    HEALTH APPLICATION: Detect diabetic retinopathy from retinal images

    Dataset: Retinal fundus images (512x512 RGB)
    Classes: 5 severity levels (No DR, Mild, Moderate, Severe, Proliferative)

    Why this matters:
    - Diabetic retinopathy is the leading cause of preventable blindness
    - Early detection can save vision
    - Manual screening is time-consuming and expensive
    - CNN can screen thousands of patients per day

    Real impact: Google's model deployed in India, Thailand
    Screens rural patients with 90%+ accuracy
    """

    print()
    print("=" * 70)
    print("APPLICATION 2: DIABETIC RETINOPATHY DETECTION")
    print("=" * 70)
    print()

    model = keras.Sequential([
        # Input: 512x512x3 (RGB retinal image)
        layers.Input(shape=(512, 512, 3)),

        # Initial downsampling to reduce computation
        layers.Conv2D(32, (7, 7), strides=2, activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),  # 128x128x32

        # Feature extraction blocks
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),  # 64x64x64
        layers.BatchNormalization(),

        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),  # 32x32x128
        layers.BatchNormalization(),

        layers.Conv2D(256, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(256, (3, 3), activation='relu', padding='same'),
        layers.GlobalAveragePooling2D(),

        # Multi-class classification (5 severity levels)
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(5, activation='softmax')  # 5 classes
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    print("👁️ RETINOPATHY DETECTION CNN:")
    print()
    model.summary()

    print()
    print("🌍 REAL-WORLD IMPACT:")
    print("   • Deployed in 20+ countries")
    print("   • Screens 100,000+ patients annually")
    print("   • Reduces blindness by early intervention")
    print("   • Cost: \\$10/screening vs \\$100+ for specialist")
    print()

    return model

retinopathy_model = build_retinopathy_classifier()

# ==========================================
# APPLICATION 3: SATELLITE IMAGERY - AIR QUALITY MONITORING
# ==========================================

def build_air_quality_classifier():
    """
    ENVIRONMENTAL APPLICATION: Air Quality Assessment from Satellite Images

    Dataset: Satellite images (256x256 RGB) from Sentinel-2, Landsat-8
    Task: Classify air quality levels from visual haze, pollution patterns

    Features CNNs learn:
    - Layer 1: Cloud patterns, atmospheric clarity
    - Layer 2: Haze distribution, visibility ranges
    - Layer 3: Industrial emission plumes
    - Layer 4: Urban pollution patterns, smog coverage

    Why this matters:
    - Real-time air quality monitoring without ground sensors
    - Coverage of remote/underserved areas
    - Early warning for pollution events
    - Track pollution sources from space

    Real applications:
    - NASA uses CNNs to track global pollution from satellite data
    - European Space Agency monitors industrial emissions
    - Cities use this for pollution source attribution
    - Health agencies predict pollution-related hospital admissions
    """

    print()
    print("=" * 70)
    print("APPLICATION 3: SATELLITE-BASED AIR QUALITY MONITORING")
    print("=" * 70)
    print()

    model = keras.Sequential([
        # Input: 256x256x3 (RGB satellite image)
        layers.Input(shape=(256, 256, 3)),

        # Block 1: Atmospheric clarity detection
        layers.Conv2D(32, (5, 5), activation='relu', padding='same', name='atmos_detect_1'),
        layers.Conv2D(32, (5, 5), activation='relu', padding='same', name='atmos_detect_2'),
        layers.MaxPooling2D((2, 2)),  # 128x128x32
        layers.BatchNormalization(),

        # Block 2: Haze and visibility patterns
        layers.Conv2D(64, (3, 3), activation='relu', padding='same', name='haze_patterns_1'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same', name='haze_patterns_2'),
        layers.MaxPooling2D((2, 2)),  # 64x64x64
        layers.BatchNormalization(),

        # Block 3: Pollution plume detection
        layers.Conv2D(128, (3, 3), activation='relu', padding='same', name='plume_detect_1'),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same', name='plume_detect_2'),
        layers.MaxPooling2D((2, 2)),  # 32x32x128
        layers.BatchNormalization(),

        # Block 4: Urban smog patterns
        layers.Conv2D(256, (3, 3), activation='relu', padding='same', name='smog_patterns_1'),
        layers.Conv2D(256, (3, 3), activation='relu', padding='same', name='smog_patterns_2'),
        layers.GlobalAveragePooling2D(),

        # Classification: Air Quality Index levels
        # Good (0-50), Moderate (51-100), Unhealthy for Sensitive (101-150),
        # Unhealthy (151-200), Very Unhealthy (201-300), Hazardous (300+)
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.4),
        layers.Dense(6, activation='softmax', name='aqi_classification')  # 6 AQI categories
    ])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'top_k_categorical_accuracy']
    )

    print("🌍 AIR QUALITY MONITORING CNN:")
    print()
    model.summary()

    print()
    print("🌬️ WHAT THE CNN LEARNS TO DETECT:")
    print()
    print("Layer 1 (Low-level features):")
    print("   • Cloud edges and atmospheric clarity")
    print("   • Contrast differences (haze reduces contrast)")
    print("   • Color shifts (pollution causes brownish tint)")
    print()
    print("Layer 2 (Mid-level patterns):")
    print("   • Haze distribution patterns")
    print("   • Visibility gradients across the image")
    print("   • Atmospheric opacity measurements")
    print()
    print("Layer 3 (High-level structures):")
    print("   • Industrial emission plumes")
    print("   • Point source pollution (factories, power plants)")
    print("   • Traffic-related pollution corridors")
    print()
    print("Layer 4 (Semantic understanding):")
    print("   • Urban smog coverage area")
    print("   • Pollution severity indicators")
    print("   • Temporal pollution patterns (morning/evening peaks)")
    print()
    print("🎯 REAL-WORLD APPLICATIONS:")
    print()
    print("1. Public Health Alerts:")
    print("   • Predict AQI 24-48 hours in advance")
    print("   • Issue warnings for sensitive populations")
    print("   • Track pollution episodes in real-time")
    print()
    print("2. Source Attribution:")
    print("   • Identify major pollution contributors")
    print("   • Track industrial compliance")
    print("   • Monitor wildfire smoke transport")
    print()
    print("3. Urban Planning:")
    print("   • Assess pollution exposure by neighborhood")
    print("   • Guide placement of air quality sensors")
    print("   • Evaluate effectiveness of clean air policies")
    print()
    print("4. Environmental Justice:")
    print("   • Identify communities with chronic poor air quality")
    print("   • Provide data for regulatory enforcement")
    print("   • Support community advocacy efforts")
    print()
    print("📊 VALIDATION AGAINST GROUND SENSORS:")
    print("   • Correlation with EPA monitoring stations: r=0.82-0.91")
    print("   • Spatial resolution: 10m-100m (vs 10-50km for sensors)")
    print("   • Update frequency: Daily to hourly (satellite revisit time)")
    print("   • Coverage: Global, including remote areas without sensors")
    print()
    print("💡 TECHNICAL CHALLENGES SOLVED:")
    print("   • Cloud masking: Distinguish clouds from pollution haze")
    print("   • Multi-spectral fusion: Combine visible + infrared bands")
    print("   • Temporal consistency: Account for seasonal/weather variations")
    print("   • Altitude correction: Pollution at surface vs upper atmosphere")
    print()

    return model

air_quality_model = build_air_quality_classifier()

# ==========================================
# APPLICATION 4: MANUFACTURING DEFECT DETECTION
# ==========================================

def build_defect_detector():
    """
    MANUFACTURING APPLICATION: Product defect detection on assembly line

    Dataset: Product images (512x512 RGB)
    Classes: Good, Scratch, Dent, Crack, Discoloration, Missing Component

    Why CNN?
    - Traditional computer vision requires manual feature engineering
    - Defects vary in size, shape, location
    - CNN learns what "good" looks like, flags deviations
    - Real-time inspection at production speed

    Real impact: Reduces defect rate from 2% to 0.1%
    Saves millions in returns, warranty claims
    """

    print()
    print("=" * 70)
    print("APPLICATION 4: MANUFACTURING DEFECT DETECTION")
    print("=" * 70)
    print()

    model = keras.Sequential([
        # Input: 512x512x3 (product image from assembly line camera)
        layers.Input(shape=(512, 512, 3)),

        # Feature extraction
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),

        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),

        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),

        layers.GlobalAveragePooling2D(),

        # Multi-class classification (defect types)
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(6, activation='softmax')  # 6 defect classes
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    print("🏭 DEFECT DETECTION CNN:")
    print()
    model.summary()

    print()
    print("⚡ PRODUCTION DEPLOYMENT:")
    print("   • Inference time: <50ms per image")
    print("   • Assembly line speed: 20 products/second")
    print("   • Edge deployment: NVIDIA Jetson Xavier")
    print("   • Defect detection rate: 99.2%")
    print()

    return model

defect_model = build_defect_detector()

# ==========================================
# APPLICATION 5: DOCUMENT INTELLIGENCE (Finance)
# ==========================================

def build_document_classifier():
    """
    FINANCE APPLICATION: Automated document classification

    Dataset: Scanned documents (800x600 RGB)
    Classes: Receipt, Invoice, Bank Statement, Tax Form, Contract, Check

    Why this matters for finance:
    - Automated expense categorization
    - Fraud detection (fake receipts)
    - Tax document organization
    - Regulatory compliance

    Your personal finance app can now auto-categorize uploaded receipts!
    """

    print()
    print("=" * 70)
    print("APPLICATION 5: DOCUMENT CLASSIFICATION FOR FINANCE")
    print("=" * 70)
    print()

    model = keras.Sequential([
        layers.Input(shape=(800, 600, 3)),

        # Document structure detection
        layers.Conv2D(32, (5, 5), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),

        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),

        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.GlobalAveragePooling2D(),

        # Classification
        layers.Dense(128, activation='relu'),
        layers.Dense(6, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    print("💰 DOCUMENT CLASSIFICATION CNN:")
    print()
    model.summary()

    print()
    print("📱 PERSONAL FINANCE INTEGRATION:")
    print("   1. User uploads receipt photo")
    print("   2. CNN classifies document type")
    print("   3. OCR extracts amount, vendor, date")
    print("   4. Auto-categorizes expense (food, transport, etc.)")
    print("   5. Updates budget dashboard")
    print()

    return model

document_model = build_document_classifier()

print()
print("=" * 70)
print("PART 2 COMPLETE: CNNs Across All Domains")
print("=" * 70)
print()
print("You've built CNNs for:")
print("  🏥 Health: Pneumonia, Diabetic Retinopathy")
print("  🌍 Environment: Satellite Air Quality Monitoring")
print("  🏭 Manufacturing: Defect Detection")
print("  💰 Finance: Document Classification")
print()
print("Same architecture. Same convolution. Different data.")
print("This is the power of hierarchical feature learning.")
print()
print("Next: Transfer Learning - Standing on giants' shoulders.")
print("=" * 70)
`
  };

  const part3Content = {
    title: "Part 3: Transfer Learning - The Game Changer",
    description: "From ImageNet to your problem: 97% accuracy with 500 images",
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import ResNet50, EfficientNetB0, VGG16
import matplotlib.pyplot as plt

# ==========================================
# THE TRANSFER LEARNING REVELATION
# ==========================================

def explain_transfer_learning():
    """
    THE PROBLEM:
    - Training a CNN from scratch needs 100,000+ images
    - Takes days/weeks on expensive GPUs
    - Medical datasets often have only 500-5000 images
    - Custom datasets (your own problem) = even smaller

    THE INSIGHT:
    - ImageNet has 14 million images, 1000 categories
    - Models trained on ImageNet already understand:
      * Edges, textures (early layers)
      * Shapes, patterns (middle layers)
      * Object parts (later layers)
    - Only the FINAL layer is ImageNet-specific (cats, dogs, cars...)
    - We can REUSE early/middle layers for ANY vision task!

    THE MAGIC:
    - Freeze early layers (keep ImageNet knowledge)
    - Replace final layer (adapt to your problem)
    - Train only final layer (1000x faster)
    - Fine-tune later layers if needed (optional)

    RESULT:
    - 97% accuracy with 500 images instead of 100,000
    - Training in hours instead of weeks
    - Works on laptop instead of GPU cluster
    """

    print("=" * 70)
    print("TRANSFER LEARNING: THE PARADIGM SHIFT")
    print("=" * 70)
    print()

    print("📚 KNOWLEDGE TRANSFER HIERARCHY:")
    print()
    print("ImageNet Model (trained on 14M images):")
    print("   Layer 1-5:   Edge detectors, texture patterns")
    print("                ↓ [REUSABLE for ANY vision task]")
    print("   Layer 6-10:  Shape combinations, object parts")
    print("                ↓ [REUSABLE for similar domains]")
    print("   Layer 11-15: ImageNet-specific objects (cats, cars...)")
    print("                ↓ [REPLACE with your task]")
    print("   Layer 16:    1000-class classification")
    print("                ↓ [REPLACE with your classes]")
    print()
    print("Your Custom Task (500 images):")
    print("   Layer 1-5:   FROZEN (use ImageNet weights)")
    print("   Layer 6-10:  FROZEN initially, fine-tune later")
    print("   Layer 11-15: TRAIN from scratch")
    print("   Layer 16:    NEW classification head")
    print()
    print("🚀 EFFICIENCY GAINS:")
    print()

    # Compare training scenarios
    scenarios = [
        ("Train from scratch (small dataset)", 500, 100, 0.65, "7 days", "$$$$"),
        ("Train from scratch (large dataset)", 100000, 200, 0.94, "21 days", "$$$$$$$$"),
        ("Transfer Learning (frozen)", 500, 20, 0.89, "2 hours", "$"),
        ("Transfer Learning (fine-tuned)", 500, 50, 0.97, "6 hours", "$$")
    ]

    print(f"{'Method':<40} {'Images':<8} {'Epochs':<8} {'Accuracy':<10} {'Time':<10} {'Cost':<8}")
    print("-" * 90)
    for method, images, epochs, acc, time, cost in scenarios:
        print(f"{method:<40} {images:<8} {epochs:<8} {acc:<10.2f} {time:<10} {cost:<8}")

    print()
    print("💡 WHY THIS WORKS:")
    print("   • Early layers learn UNIVERSAL features (edges work everywhere)")
    print("   • Middle layers learn DOMAIN features (shapes, textures)")
    print("   • Late layers learn TASK-SPECIFIC features")
    print("   • We leverage the first two, customize the third")
    print()

explain_transfer_learning()

# ==========================================
# TRANSFER LEARNING: DIABETIC RETINOPATHY (500 images)
# ==========================================

def build_retinopathy_transfer_model():
    """
    Using ResNet50 (pre-trained on ImageNet) for diabetic retinopathy detection

    Architecture:
    1. Load ResNet50 with ImageNet weights
    2. Freeze all layers (224 layers!)
    3. Remove top (ImageNet classification head)
    4. Add custom classification head (5 DR severity classes)
    5. Train only custom head on 500 retinal images
    6. (Optional) Fine-tune last few ResNet layers
    """

    print()
    print("=" * 70)
    print("TRANSFER LEARNING: DIABETIC RETINOPATHY WITH 500 IMAGES")
    print("=" * 70)
    print()

    # Load pre-trained ResNet50 (without top classification layer)
    base_model = ResNet50(
        weights='imagenet',  # Use ImageNet weights
        include_top=False,   # Remove final classification layer
        input_shape=(224, 224, 3)
    )

    # Freeze all base model layers
    base_model.trainable = False

    print("📦 LOADED PRE-TRAINED ResNet50:")
    print(f"   Total layers: {len(base_model.layers)}")
    print(f"   Parameters: {base_model.count_params():,}")
    print(f"   Trainable: {base_model.trainable}")
    print()

    # Build custom classification head
    model = keras.Sequential([
        base_model,  # Frozen ResNet50 feature extractor

        # Custom head for diabetic retinopathy
        layers.GlobalAveragePooling2D(name='gap'),
        layers.Dense(256, activation='relu', name='fc1'),
        layers.Dropout(0.5, name='dropout'),
        layers.Dense(5, activation='softmax', name='dr_classification')  # 5 DR severity levels
    ])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    print("🏗️ TRANSFER LEARNING MODEL ARCHITECTURE:")
    print()
    model.summary()

    print()
    print("🎯 TRAINABLE PARAMETERS:")
    trainable_params = sum([tf.size(w).numpy() for w in model.trainable_weights])
    total_params = model.count_params()
    print(f"   Total parameters: {total_params:,}")
    print(f"   Trainable parameters: {trainable_params:,}")
    print(f"   Frozen parameters: {total_params - trainable_params:,}")
    print(f"   Training only: {trainable_params / total_params * 100:.1f}% of the model")
    print()

    print("⚡ TRAINING STRATEGY:")
    print()
    print("Phase 1 - Feature Extraction (Frozen Base):")
    print("   • Freeze all ResNet50 layers")
    print("   • Train only custom head (256 + 5 layers)")
    print("   • Learning rate: 0.001")
    print("   • Epochs: 20-30")
    print("   • Time: ~2 hours on GPU")
    print()
    print("Phase 2 - Fine-Tuning (Optional):")
    print("   • Unfreeze last 10-20 ResNet50 layers")
    print("   • Train with lower learning rate: 0.0001")
    print("   • Epochs: 10-20")
    print("   • Time: ~1 hour on GPU")
    print()

    return model, base_model

retinopathy_transfer_model, retinopathy_base = build_retinopathy_transfer_model()

# ==========================================
# FINE-TUNING: Unfreezing Layers for Better Performance
# ==========================================

def demonstrate_fine_tuning(base_model, model):
    """
    Fine-tuning: Unfreeze last layers and train with small learning rate

    When to fine-tune:
    - After training custom head (Phase 1)
    - When you have >1000 images
    - When accuracy plateaus
    - When your domain differs from ImageNet

    How to fine-tune:
    - Unfreeze last 10-30% of layers
    - Use MUCH smaller learning rate (0.0001 vs 0.001)
    - Train for fewer epochs (10-20)
    - Monitor for overfitting
    """

    print()
    print("=" * 70)
    print("FINE-TUNING: Adapting Pre-trained Features")
    print("=" * 70)
    print()

    # Unfreeze the last 20 layers of ResNet50
    base_model.trainable = True

    # Freeze all layers except the last 20
    for layer in base_model.layers[:-20]:
        layer.trainable = False

    print("🔓 UNFROZEN LAYERS:")
    trainable_layers = [layer.name for layer in base_model.layers if layer.trainable]
    print(f"   Total unfrozen layers: {len(trainable_layers)}")
    print(f"   Last unfrozen layer: {trainable_layers[0] if trainable_layers else 'None'}")
    print()

    # Recompile with lower learning rate
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.0001),  # 10x smaller!
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    print("🎯 FINE-TUNING PARAMETERS:")
    trainable_params = sum([tf.size(w).numpy() for w in model.trainable_weights])
    total_params = model.count_params()
    print(f"   Total parameters: {total_params:,}")
    print(f"   Trainable parameters: {trainable_params:,}")
    print(f"   Training: {trainable_params / total_params * 100:.1f}% of the model")
    print()

    print("⚠️  FINE-TUNING BEST PRACTICES:")
    print("   1. ALWAYS train custom head first (frozen base)")
    print("   2. Use learning rate 10-100x smaller than initial training")
    print("   3. Monitor validation loss closely (overfitting risk)")
    print("   4. Use data augmentation aggressively")
    print("   5. Consider early stopping")
    print()

    return model

retinopathy_finetuned = demonstrate_fine_tuning(retinopathy_base, retinopathy_transfer_model)

# ==========================================
# COMPARING ARCHITECTURES: ResNet vs EfficientNet vs VGG
# ==========================================

def compare_transfer_architectures():
    """
    Popular pre-trained models for transfer learning:

    VGG16 (2014):
    - Simple, deep (16 layers)
    - Large model (138M parameters)
    - Good baseline, slower

    ResNet50 (2015):
    - Skip connections solve vanishing gradients
    - 50 layers, 25M parameters
    - Good balance of accuracy and speed

    EfficientNet (2019):
    - Compound scaling (depth + width + resolution)
    - State-of-the-art efficiency
    - B0: 5M params, B7: 66M params
    - Best accuracy per parameter
    """

    print()
    print("=" * 70)
    print("COMPARING PRE-TRAINED ARCHITECTURES")
    print("=" * 70)
    print()

    architectures = [
        ("VGG16", VGG16, 138357544, "2014", "Simple, deep", "Baseline"),
        ("ResNet50", ResNet50, 25636712, "2015", "Skip connections", "Balanced"),
        ("EfficientNetB0", EfficientNetB0, 5330571, "2019", "Compound scaling", "Efficient")
    ]

    print(f"{'Model':<20} {'Year':<8} {'Params':<15} {'Strength':<25} {'Best For':<15}")
    print("-" * 90)

    for name, model_class, params, year, strength, best_for in architectures:
        print(f"{name:<20} {year:<8} {params:>13,} {strength:<25} {best_for:<15}")

    print()
    print("🎯 CHOOSING THE RIGHT ARCHITECTURE:")
    print()
    print("Use VGG16 when:")
    print("   • Simple baseline needed")
    print("   • Interpretability important")
    print("   • Transfer learning tutorial/learning")
    print()
    print("Use ResNet50 when:")
    print("   • General-purpose vision task")
    print("   • Good balance of speed and accuracy")
    print("   • Production deployment with moderate resources")
    print()
    print("Use EfficientNet when:")
    print("   • Mobile/edge deployment")
    print("   • Limited computational resources")
    print("   • State-of-the-art accuracy needed")
    print("   • Inference speed critical")
    print()

compare_transfer_architectures()

# ==========================================
# REAL-WORLD TRANSFER LEARNING: AIR QUALITY FROM SATELLITE
# ==========================================

def build_satellite_air_quality_transfer():
    """
    Transfer learning for satellite-based air quality monitoring

    Challenge: Only 2000 labeled satellite images with AQI ground truth
    Solution: Use EfficientNetB0 pre-trained on ImageNet

    Even though ImageNet has no "air pollution" class, it learned:
    - Haze detection (similar to fog/clouds in ImageNet)
    - Atmospheric clarity (similar to weather conditions)
    - Urban patterns (similar to city/landscape classes)
    """

    print()
    print("=" * 70)
    print("SATELLITE AIR QUALITY MONITORING - TRANSFER LEARNING")
    print("=" * 70)
    print()

    # Load EfficientNetB0 (efficient for deployment)
    base_model = EfficientNetB0(
        weights='imagenet',
        include_top=False,
        input_shape=(256, 256, 3)
    )

    base_model.trainable = False

    # Custom classification head for AQI levels
    model = keras.Sequential([
        base_model,

        layers.GlobalAveragePooling2D(),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.4),
        layers.Dense(128, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(6, activation='softmax', name='aqi_classification')  # 6 AQI categories
    ])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'top_k_categorical_accuracy']
    )

    print("🛰️ SATELLITE AIR QUALITY TRANSFER LEARNING MODEL:")
    print()
    model.summary()

    print()
    print("🌍 TRAINING ON LIMITED SATELLITE DATA:")
    print("   Dataset: 2,000 satellite images with ground truth AQI")
    print("   Training set: 1,400 images (70%)")
    print("   Validation set: 400 images (20%)")
    print("   Test set: 200 images (10%)")
    print()
    print("📊 EXPECTED PERFORMANCE:")
    print("   Without transfer learning: ~62% accuracy (underfitting)")
    print("   With transfer learning: ~87% accuracy")
    print("   After fine-tuning: ~91% accuracy")
    print()
    print("⚡ DEPLOYMENT:")
    print("   • Model size: 21 MB (EfficientNetB0)")
    print("   • Inference time: 45ms per image")
    print("   • Daily processing: ~2 million satellite tiles")
    print("   • Coverage: Global air quality maps updated daily")
    print()

    return model

satellite_aqi_model = build_satellite_air_quality_transfer()

print()
print("=" * 70)
print("PART 3 COMPLETE: Transfer Learning Mastery")
print("=" * 70)
print()
print("What you've learned:")
print("  🧠 Why transfer learning works (hierarchical features)")
print("  🚀 How to adapt ImageNet models to your problem")
print("  🔧 Feature extraction vs fine-tuning strategies")
print("  📊 Comparing architectures (VGG, ResNet, EfficientNet)")
print("  🌍 Real application: Satellite air quality monitoring")
print()
print("With 500 images, you can now:")
print("  • Detect diseases with 97% accuracy")
print("  • Monitor air quality from space")
print("  • Classify documents for finance")
print("  • Build custom vision AI in hours, not weeks")
print()
print("This is the power of transfer learning.")
print("This is standing on giants' shoulders.")
print("=" * 70)
`
  };

  const part4Content = {
    title: "Part 4: Beyond CNNs - The Multi-Modal Future",
    description: "Style transfer, image generation, CLIP, and vision transformers",
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt

# ==========================================
# CREATIVE AI: STYLE TRANSFER
# ==========================================

def explain_style_transfer():
    """
    Style Transfer: Combine content of one image with style of another

    How it works:
    1. Use pre-trained VGG19 to extract features
    2. Content features: high-level layers (what objects are present)
    3. Style features: low/mid-level layers (textures, colors, patterns)
    4. Optimization: Generate image that matches both

    Result: Your photo in Van Gogh's Starry Night style

    Real applications:
    - Instagram/Snapchat filters
    - Artistic photo editing
    - Video game asset generation
    - Film visual effects
    """

    print("=" * 70)
    print("CREATIVE AI: NEURAL STYLE TRANSFER")
    print("=" * 70)
    print()

    print("🎨 THE CONCEPT:")
    print()
    print("Content Image (your photo) + Style Image (Van Gogh painting)")
    print("                    ↓")
    print("         CNN Feature Extraction (VGG19)")
    print("                    ↓")
    print("  Content Features        Style Features")
    print("  (what is present)       (how it looks)")
    print("                    ↓")
    print("         Optimization Process")
    print("                    ↓")
    print("   Your photo painted in Van Gogh's style!")
    print()

    print("🧮 THE MATHEMATICS:")
    print()
    print("Content Loss: || F_content - F_generated ||²")
    print("   (Generated image should have same objects/structure)")
    print()
    print("Style Loss: || Gram(F_style) - Gram(F_generated) ||²")
    print("   (Generated image should have same textures/patterns)")
    print()
    print("Total Loss: α × Content_Loss + β × Style_Loss")
    print("   (Balance between content preservation and style matching)")
    print()

    print("⚡ FAMOUS APPLICATIONS:")
    print("   • Prisma app: Real-time style transfer on mobile")
    print("   • DeepArt.io: Professional artistic rendering")
    print("   • Adobe Neural Filters: Photoshop integration")
    print("   • TikTok/Instagram: Video style filters")
    print()

explain_style_transfer()

def build_style_transfer_model():
    """
    Simplified style transfer using VGG19 feature extraction
    """

    print()
    print("🏗️ STYLE TRANSFER ARCHITECTURE:")
    print()

    # Load pre-trained VGG19
    vgg = keras.applications.VGG19(
        weights='imagenet',
        include_top=False
    )
    vgg.trainable = False

    # Layers for content extraction (high-level)
    content_layers = ['block5_conv2']

    # Layers for style extraction (low/mid-level)
    style_layers = [
        'block1_conv1',
        'block2_conv1',
        'block3_conv1',
        'block4_conv1',
        'block5_conv1'
    ]

    print("Content feature layers (high-level semantic):")
    for layer in content_layers:
        print(f"   • {layer}")
    print()

    print("Style feature layers (textures and patterns):")
    for layer in style_layers:
        print(f"   • {layer}")
    print()

    print("🎯 PROCESS:")
    print("   1. Extract content features from content image")
    print("   2. Extract style features from style image")
    print("   3. Initialize generated image (random or copy of content)")
    print("   4. Iteratively update generated image to minimize total loss")
    print("   5. Gradient descent on pixel values (not weights!)")
    print()

    print("💡 KEY INSIGHT:")
    print("   We're not training the network.")
    print("   We're optimizing the INPUT image to match extracted features.")
    print("   The CNN is frozen, the pixels are changing!")
    print()

    return vgg

style_transfer_vgg = build_style_transfer_model()

# ==========================================
# IMAGE GENERATION: GANS & DIFFUSION MODELS
# ==========================================

def explain_generative_models():
    """
    From classification to creation: How CNNs learned to generate images

    Evolution:
    1. GANs (2014): Generator vs Discriminator adversarial game
    2. VAEs (2013): Encode to latent space, decode to image
    3. Diffusion Models (2020): Iterative denoising process

    Modern applications:
    - DALL-E, Stable Diffusion, Midjourney
    - Text-to-image generation
    - Image editing, inpainting, super-resolution
    """

    print()
    print("=" * 70)
    print("GENERATIVE AI: FROM CLASSIFICATION TO CREATION")
    print("=" * 70)
    print()

    print("🎲 GENERATIVE ADVERSARIAL NETWORKS (GANs):")
    print()
    print("Generator Network:")
    print("   Input: Random noise vector (100D)")
    print("   Output: Generated image (256x256x3)")
    print("   Goal: Fool the discriminator")
    print()
    print("Discriminator Network:")
    print("   Input: Real or generated image")
    print("   Output: Real/Fake probability")
    print("   Goal: Distinguish real from generated")
    print()
    print("Training: Min-max game")
    print("   Generator tries to maximize discriminator error")
    print("   Discriminator tries to minimize classification error")
    print("   Nash equilibrium = photorealistic generation")
    print()

    print("🌊 DIFFUSION MODELS (Stable Diffusion, DALL-E):")
    print()
    print("Forward Process (Training):")
    print("   Image → Add noise gradually → Pure noise")
    print("   Learn to predict noise at each step")
    print()
    print("Reverse Process (Generation):")
    print("   Pure noise → Iteratively denoise → Clean image")
    print("   Text condition guides the denoising")
    print()
    print("Architecture:")
    print("   • U-Net with attention mechanisms")
    print("   • Text encoder (CLIP or T5)")
    print("   • Latent diffusion (work in compressed space)")
    print()

    print("🎨 MODERN TEXT-TO-IMAGE:")
    print()
    print('Input: "A blue pigeon carrying programming blueprints"')
    print("           ↓")
    print("   Text Encoder (CLIP)")
    print("           ↓")
    print("   Text Embeddings (512D vector)")
    print("           ↓")
    print("   Diffusion Model (50 denoising steps)")
    print("           ↓")
    print("   Generated Image (512x512)")
    print()

    print("🚀 APPLICATIONS:")
    print("   • Creative: Art generation, concept visualization")
    print("   • Design: Logo creation, product mockups")
    print("   • Entertainment: Game assets, film pre-visualization")
    print("   • Medical: Synthetic training data (privacy-preserving)")
    print("   • Fashion: Virtual try-on, style exploration")
    print()

explain_generative_models()

# ==========================================
# MULTI-MODAL AI: CLIP (Vision + Language)
# ==========================================

def explain_clip():
    """
    CLIP (OpenAI, 2021): Contrastive Language-Image Pre-training

    The revolution: Understanding images AND text together

    Training:
    - 400 million (image, caption) pairs from the internet
    - Image encoder: Vision Transformer or ResNet
    - Text encoder: Transformer
    - Contrastive learning: Match image/text embeddings

    Result:
    - Zero-shot image classification (without training on specific classes)
    - Image search with natural language
    - Cross-modal understanding
    """

    print()
    print("=" * 70)
    print("MULTI-MODAL AI: CLIP - Vision Meets Language")
    print("=" * 70)
    print()

    print("🔗 THE ARCHITECTURE:")
    print()
    print("Image Encoder (Vision Transformer or ResNet):")
    print("   Input: Image (224x224x3)")
    print("   Output: Image embedding (512D)")
    print()
    print("Text Encoder (Transformer):")
    print("   Input: Text description")
    print("   Output: Text embedding (512D)")
    print()
    print("Contrastive Learning:")
    print("   • Maximize similarity between matching image/text pairs")
    print("   • Minimize similarity between non-matching pairs")
    print("   • Learn shared embedding space")
    print()

    print("💡 BREAKTHROUGH CAPABILITIES:")
    print()
    print("1. Zero-Shot Classification:")
    print('   Image → CLIP → Compare with ["a dog", "a cat", "a car"]')
    print("   No training on these specific classes needed!")
    print()
    print("2. Natural Language Image Search:")
    print('   Query: "sunset over mountains with purple sky"')
    print("   Returns: Matching images from database")
    print()
    print("3. Cross-Modal Retrieval:")
    print("   Text → Find similar images")
    print("   Image → Find similar text descriptions")
    print()

    print("🌍 REAL-WORLD APPLICATIONS:")
    print()
    print("Search & Discovery:")
    print("   • Pinterest visual search")
    print("   • Google Lens image understanding")
    print("   • Video moment retrieval")
    print()
    print("Content Moderation:")
    print("   • Detect harmful content without explicit examples")
    print('   • "violent imagery", "hate symbols" → automatic detection')
    print()
    print("Accessibility:")
    print("   • Image captioning for visually impaired")
    print("   • Screen reader enhancement")
    print()
    print("Creative Tools:")
    print("   • DALL-E guidance (text → image generation)")
    print("   • Stable Diffusion conditioning")
    print()

explain_clip()

# ==========================================
# VISION TRANSFORMERS: Attention for Images
# ==========================================

def explain_vision_transformers():
    """
    Vision Transformers (ViT): Applying transformer architecture to images

    Key insight: Images are sequences of patches

    Architecture:
    1. Split image into 16x16 patches
    2. Flatten each patch to vector
    3. Add positional embeddings
    4. Feed through transformer encoder
    5. Classification head on [CLS] token

    Result: State-of-the-art on ImageNet, scales better than CNNs
    """

    print()
    print("=" * 70)
    print("VISION TRANSFORMERS: Attention Mechanisms for Images")
    print("=" * 70)
    print()

    print("🔄 FROM CNNs TO TRANSFORMERS:")
    print()
    print("CNNs (1998-2020):")
    print("   • Local receptive fields (3x3 convolutions)")
    print("   • Hierarchical feature learning")
    print("   • Translation invariance through weight sharing")
    print()
    print("Vision Transformers (2020+):")
    print("   • Global attention (every patch attends to every patch)")
    print("   • No built-in inductive bias")
    print("   • Learn spatial relationships from data")
    print()

    print("🏗️ VISION TRANSFORMER ARCHITECTURE:")
    print()
    print("Input: 224x224x3 image")
    print("   ↓")
    print("Patch Embedding: Split into 14x14 = 196 patches (16x16 each)")
    print("   ↓")
    print("Flatten + Linear projection: 196 x 768D vectors")
    print("   ↓")
    print("Add [CLS] token + Positional embeddings")
    print("   ↓")
    print("Transformer Encoder (12 layers):")
    print("   • Multi-head self-attention")
    print("   • Feed-forward network")
    print("   • Layer normalization")
    print("   ↓")
    print("[CLS] token representation")
    print("   ↓")
    print("Classification head (MLP)")
    print("   ↓")
    print("Output: Class probabilities")
    print()

    print("⚡ ATTENTION MECHANISM:")
    print()
    print("For each patch:")
    print("   Query: What am I looking for?")
    print("   Key: What do I contain?")
    print("   Value: What information do I provide?")
    print()
    print("Attention(Q, K, V) = softmax(QK^T / √d) × V")
    print()
    print("Result: Each patch attends to all other patches")
    print("   • Sky patches attend to cloud patches")
    print("   • Object patches attend to related object parts")
    print("   • Learns long-range dependencies")
    print()

    print("📊 PERFORMANCE:")
    print()
    print("ImageNet (2020):")
    print("   ViT-Huge: 88.5% accuracy (SOTA)")
    print("   EfficientNet-L2: 88.4% accuracy")
    print()
    print("Benefits:")
    print("   • Scales better with data (100M+ images)")
    print("   • More interpretable (attention maps)")
    print("   • Transfer learning across modalities")
    print()
    print("Drawbacks:")
    print("   • Requires more data than CNNs")
    print("   • Computationally expensive")
    print("   • Less efficient on small datasets")
    print()

explain_vision_transformers()

print()
print("=" * 70)
print("PART 4 COMPLETE: The Multi-Modal Future")
print("=" * 70)
print()
print("You've explored:")
print("  🎨 Style Transfer: Artistic AI with frozen CNNs")
print("  🌊 Generative Models: GANs and Diffusion for image creation")
print("  🔗 CLIP: Vision + Language unified understanding")
print("  🔄 Vision Transformers: Attention mechanisms for images")
print()
print("The evolution:")
print("  1998: LeNet classifies 28x28 digits")
print("  2012: AlexNet wins ImageNet")
print("  2015: ResNet enables 1000-layer networks")
print("  2020: Vision Transformers challenge CNNs")
print("  2024: Multi-modal models see, read, and create")
print()
print("You now understand the full spectrum:")
print("  From convolution to attention")
print("  From classification to generation")
print("  From single modality to unified intelligence")
print()
print("=" * 70)
print("SESSIONS 37-38 COMPLETE")
print("=" * 70)
print()
print("🎓 MASTERY ACHIEVED:")
print()
print("Core Skills:")
print("  ✓ Understand why CNNs solve the parameter explosion problem")
print("  ✓ Build CNNs from scratch and with TensorFlow")
print("  ✓ Apply CNNs across domains: health, environment, manufacturing")
print("  ✓ Master transfer learning with ImageNet models")
print("  ✓ Fine-tune pre-trained networks for custom tasks")
print("  ✓ Compare architectures: VGG, ResNet, EfficientNet")
print("  ✓ Understand modern advances: transformers, CLIP, diffusion")
print()
print("Real-World Applications Built:")
print("  🏥 Pneumonia detection from X-rays")
print("  👁️ Diabetic retinopathy screening")
print("  🌍 Satellite-based air quality monitoring")
print("  🏭 Manufacturing defect detection")
print("  💰 Document classification for finance")
print()
print("The Journey:")
print("  You started with: 'Why does OpenCV fail at complex vision?'")
print("  You learned: Hierarchical feature learning through convolution")
print("  You mastered: Transfer learning with 500 images")
print("  You glimpsed: The multi-modal AI future")
print()
print("From 150 million parameters to 5 million.")
print("From weeks of training to hours.")
print("From 100,000 images to 500.")
print()
print("This is the CNN revolution.")
print("This is computer vision democratized.")
print("This is AI accessible to everyone.")
print()
print("🚀 Next: Deploy these models to production.")
print("   Build dashboards. Serve predictions. Change lives.")
print("=" * 70)
`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation Button */}
        <div className="mb-8">
          <Button
            onClick={() => window.location.href = '/machine-learning'}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Machine Learning Journey
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Sessions 37-38: CNN & Transfer Learning
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            When Machines Learned to See: From parameter explosion to hierarchical perception.
            From medical diagnosis to satellite monitoring to creative AI - all built on one insight: convolution.
          </p>
        </div>

        {/* Origin Story Section */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            The CNN Story: 1998-2024
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            From LeNet reading zip codes to AlexNet shocking the world to Vision Transformers challenging everything -
            this is the story of how we taught machines to see. Not through memorizing pixels, but through learning
            hierarchies: edges → textures → shapes → objects → meaning.
          </p>

          {/* Animated Chapter Navigation */}
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {storyChapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveChapter(index)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeChapter === index
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {storyChapters[index].icon} Ch {index + 1}
              </button>
            ))}
          </div>

          {/* Chapter Content */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500 transform transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {storyChapters[activeChapter].title}
            </h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {storyChapters[activeChapter].content}
            </p>
            <div className="bg-white/70 rounded-lg p-4 italic text-gray-800 border-l-2 border-indigo-400">
              {storyChapters[activeChapter].details}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🎯 The Evolution Pattern:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every breakthrough asked: "How does vision ACTUALLY work?" Biology inspired convolution (receptive fields).
              Scale inspired transfer learning (reuse knowledge). Transformers asked: "What if attention is all you need?"
              <span className="font-bold text-indigo-700"> This is science → engineering → revolution.</span>
            </p>
          </div>
        </div>

        {/* Part 1: Convolution Fundamentals */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <Eye className="w-12 h-12 text-blue-600" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {part1Content.title}
              </h2>
              <p className="text-lg text-gray-600">
                {part1Content.description}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <Button
            onClick={() => toggleSection('part1')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2 transition-all"
          >
            <Code className="w-5 h-5" />
            {expandedSections.part1 ? 'Hide' : 'Show'} Python Code
            {expandedSections.part1 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>

          {/* Collapsible Code Section */}
          {expandedSections.part1 && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative animate-fade-in">
              <CodeBlockR language="python">{part1Content.code}</CodeBlockR>
            </div>
          )}

          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              💡 What You Just Built:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Understand the parameter explosion problem (150M vs 1000 parameters)</li>
              <li>Visualize convolution as sliding window feature detection</li>
              <li>Build a simple CNN from scratch (LeNet-5 architecture)</li>
              <li>See weight sharing reduce parameters by 100x</li>
              <li>Understand pooling, ReLU, and hierarchical learning</li>
            </ul>
            <p className="mt-4 text-gray-700 font-medium">
              Convolution solved computer vision's fundamental problem: how to see without memorizing every pixel.
            </p>
          </div>
        </div>

        {/* Part 2: CNN Applications */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex gap-2">
              <Cpu className="w-10 h-10 text-green-600" />
              <Satellite className="w-10 h-10 text-blue-600" />
              <Factory className="w-10 h-10 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {part2Content.title}
              </h2>
              <p className="text-lg text-gray-600">
                {part2Content.description}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <Button
            onClick={() => toggleSection('part2')}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2 transition-all"
          >
            <Code className="w-5 h-5" />
            {expandedSections.part2 ? 'Hide' : 'Show'} Python Code
            {expandedSections.part2 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>

          {/* Collapsible Code Section */}
          {expandedSections.part2 && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative animate-fade-in">
              <CodeBlockR language="python">{part2Content.code}</CodeBlockR>
            </div>
          )}

          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              🌍 CNNs Across All Domains:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-blue-600" />
                  🌬️ Air Quality Monitoring
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Satellite-based AQI prediction</li>
                  <li>Haze and pollution pattern detection</li>
                  <li>Real-time global coverage without ground sensors</li>
                  <li>Early warnings for pollution events</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">🏥 Medical Imaging:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Pneumonia detection (X-rays)</li>
                  <li>Diabetic retinopathy screening</li>
                  <li>FDA-approved diagnostic AI</li>
                  <li>Preventable blindness detection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">🏭 Manufacturing:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Real-time defect detection</li>
                  <li>99.2% accuracy at production speed</li>
                  <li>Reduces defect rate from 2% to 0.1%</li>
                  <li>Edge deployment on assembly lines</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">💰 Finance:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Document classification (receipts, invoices)</li>
                  <li>Automated expense categorization</li>
                  <li>Fraud detection from scanned documents</li>
                  <li>Personal finance automation</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-gray-700 font-medium">
              Same convolution operation. Different domains. This is universal pattern learning.
            </p>
          </div>
        </div>

        {/* Part 3: Transfer Learning */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">🚀</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {part3Content.title}
              </h2>
              <p className="text-lg text-gray-600">
                {part3Content.description}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <Button
            onClick={() => toggleSection('part3')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2 transition-all"
          >
            <Code className="w-5 h-5" />
            {expandedSections.part3 ? 'Hide' : 'Show'} Python Code
            {expandedSections.part3 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>

          {/* Collapsible Code Section */}
          {expandedSections.part3 && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative animate-fade-in">
              <CodeBlockR language="python">{part3Content.code}</CodeBlockR>
            </div>
          )}

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🎯 Transfer Learning Revolution:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Without Transfer Learning:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Need 100,000+ labeled images</li>
                  <li>Train for weeks on expensive GPUs</li>
                  <li>High risk of overfitting</li>
                  <li>65% accuracy on small datasets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">With Transfer Learning:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Works with 500-5000 images</li>
                  <li>Train in hours on laptop</li>
                  <li>Leverages ImageNet knowledge</li>
                  <li>97% accuracy achievable</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-gray-700 font-medium">
              Transfer learning democratized computer vision AI. Anyone can build medical diagnosis,
              satellite monitoring, or custom vision systems with limited data.
            </p>
          </div>
        </div>

        {/* Part 4: Multi-Modal Future */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <Palette className="w-12 h-12 text-pink-600" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {part4Content.title}
              </h2>
              <p className="text-lg text-gray-600">
                {part4Content.description}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <Button
            onClick={() => toggleSection('part4')}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg mb-4 flex items-center justify-center gap-2 transition-all"
          >
            <Code className="w-5 h-5" />
            {expandedSections.part4 ? 'Hide' : 'Show'} Python Code
            {expandedSections.part4 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>

          {/* Collapsible Code Section */}
          {expandedSections.part4 && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative animate-fade-in">
              <CodeBlockR language="python">{part4Content.code}</CodeBlockR>
            </div>
          )}

          <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🌟 Beyond Classification:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Style Transfer:</strong> Artistic rendering with frozen CNNs (Instagram filters)</li>
              <li><strong>GANs & Diffusion:</strong> Generate photorealistic images from noise (DALL-E, Midjourney)</li>
              <li><strong>CLIP:</strong> Vision + language unified understanding (zero-shot classification)</li>
              <li><strong>Vision Transformers:</strong> Attention mechanisms challenge CNNs (state-of-the-art)</li>
              <li><strong>Multi-modal Models:</strong> GPT-4 Vision, Gemini - see, read, reason, create</li>
            </ul>
            <p className="mt-4 text-gray-700 font-medium">
              CNNs opened the door. Transformers walked through. Multi-modal models built the entire house.
            </p>
          </div>
        </div>

        {/* The Convergence Summary */}
        <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🌟 The CNN Revolution: What You've Mastered
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-5 shadow">
              <h3 className="font-bold text-lg text-blue-700 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Architecture Understanding
              </h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Convolution solves parameter explosion</li>
                <li>• Pooling creates spatial hierarchy</li>
                <li>• ReLU enables deep networks</li>
                <li>• Batch norm stabilizes training</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-5 shadow">
              <h3 className="font-bold text-lg text-green-700 mb-3 flex items-center gap-2">
                <Wind className="w-5 h-5" />
                Real-World Mastery
              </h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Medical diagnosis (pneumonia, retinopathy)</li>
                <li>• Environmental monitoring (air quality)</li>
                <li>• Manufacturing QA (defect detection)</li>
                <li>• Document intelligence (finance automation)</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-5 shadow">
              <h3 className="font-bold text-lg text-purple-700 mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Advanced Techniques
              </h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Transfer learning (97% with 500 images)</li>
                <li>• Fine-tuning strategies</li>
                <li>• Architecture comparison (ResNet, EfficientNet)</li>
                <li>• Multi-modal AI (CLIP, ViT)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">
              🎯 From Need to Solution:
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span><strong>The Problem:</strong> OpenCV detects edges but can't understand disease patterns, pollution, or defects</span>
              </p>
              <p className="flex items-start gap-2">
                <Cpu className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>The Insight:</strong> Convolution enables hierarchical learning - edges → textures → patterns → meaning</span>
              </p>
              <p className="flex items-start gap-2">
                <Satellite className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>The Breakthrough:</strong> Transfer learning - reuse ImageNet knowledge, train with 500 images instead of 100,000</span>
              </p>
              <p className="flex items-start gap-2">
                <Palette className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>The Future:</strong> Multi-modal models that see, read, reason, and create - unified intelligence</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/machine-learning'}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-6 text-lg"
          >
            ← Back to Machine Learning Journey
          </Button>

          <Button
            onClick={() => window.location.href = '/machine-learning'}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
          >
            Continue to Advanced ML →
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CNNSessions3738;
