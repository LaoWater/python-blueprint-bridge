import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DeepLearningSession36 = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const storyChapters = [
    {
      title: "🧠 1943: The Mathematical Brain",
      content: "Warren McCulloch (neurophysiologist) and Walter Pitts (mathematician) publish 'A Logical Calculus of Ideas Immanent in Nervous Activity'",
      details: "McCulloch observed: 'Neurons either fire or they don't. Binary. Like logic gates.' Pitts realized: 'If we model this with math, we can compute ANYTHING a brain can compute.' They created the first artificial neuron: weighted inputs, threshold, binary output. The seed was planted."
    },
    {
      title: "⚡ 1958: The Perceptron Dream",
      content: "Frank Rosenblatt at Cornell builds the Perceptron - a machine that LEARNS from examples",
      details: "New York Times headline: 'New Navy Device Learns By Doing.' Rosenblatt demonstrated pattern recognition - the machine adjusted its own weights to classify images. The dream: 'This is the embryo of an electronic computer that will be able to walk, talk, see, write, reproduce itself and be conscious of its existence.'"
    },
    {
      title: "❄️ 1969: The AI Winter",
      content: "Marvin Minsky and Seymour Papert publish 'Perceptrons' - proving fundamental limitations",
      details: "The XOR problem: A single perceptron cannot learn XOR (exclusive OR). It's linearly inseparable. Funding dried up. Researchers abandoned neural networks for 15 years. The field fell silent. But the math didn't care about funding - the solution was waiting to be found."
    },
    {
      title: "🔥 1986: Backpropagation Renaissance",
      content: "Rumelhart, Hinton, and Williams rediscover backpropagation: the chain rule saves AI",
      details: "The insight: Stack perceptrons in LAYERS. Use the calculus chain rule to propagate errors backward through the network. Suddenly, the XOR problem is trivial. Multiple layers can learn ANY pattern. The neuron was 43 years old. The architecture was born."
    },
    {
      title: "🏆 2012: ImageNet Moment - AlexNet",
      content: "Geoffrey Hinton's team wins ImageNet with a deep neural network, crushing traditional computer vision",
      details: "Error rate dropped from 26% to 15%. The revolution: GPUs + Big Data + Deep Layers. Every tech company noticed. The AI spring began. Your NumPy arrays become weights. Your calculus becomes gradients. Your code becomes intelligence. This is where it all converged."
    }
  ];

  const part1Content = {
    title: "Part 1: The Neuron - From Biology to Mathematics",
    description: "Understanding the fundamental building block: the artificial neuron (perceptron)",
    code: `import numpy as np
import matplotlib.pyplot as plt

# ==========================================
# THE ARTIFICIAL NEURON - McCulloch & Pitts
# ==========================================

class Neuron:
    """
    A single artificial neuron.

    Biology → Math:
    - Dendrites (inputs) → x1, x2, ..., xn
    - Synaptic weights → w1, w2, ..., wn
    - Cell body (soma) → weighted sum + bias
    - Axon (output) → activation function
    """

    def __init__(self, n_inputs):
        # Initialize small random weights (Xavier initialization concept)
        self.weights = np.random.randn(n_inputs) * 0.1
        self.bias = np.random.randn() * 0.1

    def forward(self, inputs, activation='sigmoid'):
        """
        Forward propagation through the neuron.

        z = w·x + b  (Linear Algebra: dot product)
        a = σ(z)     (Activation function)
        """
        # Step 1: Weighted sum (your Linear Algebra in action)
        z = np.dot(self.weights, inputs) + self.bias

        # Step 2: Activation function (introduces non-linearity)
        if activation == 'sigmoid':
            a = 1 / (1 + np.exp(-z))  # Squashes to [0, 1]
        elif activation == 'relu':
            a = np.maximum(0, z)       # Rectified Linear Unit
        elif activation == 'tanh':
            a = np.tanh(z)             # Squashes to [-1, 1]
        else:
            a = z                      # Linear (no activation)

        return a, z  # Return both activation and pre-activation

# ==========================================
# ACTIVATION FUNCTIONS VISUALIZED
# ==========================================

def visualize_activations():
    """Why do we need activation functions? Let's see."""

    z = np.linspace(-5, 5, 200)

    sigmoid = 1 / (1 + np.exp(-z))
    relu = np.maximum(0, z)
    tanh = np.tanh(z)

    fig, axes = plt.subplots(1, 3, figsize=(15, 4))

    # Sigmoid
    axes[0].plot(z, sigmoid, 'b-', linewidth=2)
    axes[0].set_title('Sigmoid: σ(z) = 1/(1+e^(-z))', fontsize=12, fontweight='bold')
    axes[0].set_xlabel('z (weighted sum)')
    axes[0].set_ylabel('activation')
    axes[0].grid(True, alpha=0.3)
    axes[0].axhline(y=0.5, color='r', linestyle='--', alpha=0.5, label='Decision boundary')
    axes[0].legend()

    # ReLU
    axes[1].plot(z, relu, 'g-', linewidth=2)
    axes[1].set_title('ReLU: max(0, z)', fontsize=12, fontweight='bold')
    axes[1].set_xlabel('z (weighted sum)')
    axes[1].set_ylabel('activation')
    axes[1].grid(True, alpha=0.3)
    axes[1].axvline(x=0, color='r', linestyle='--', alpha=0.5, label='Activation threshold')
    axes[1].legend()

    # Tanh
    axes[2].plot(z, tanh, 'orange', linewidth=2)
    axes[2].set_title('Tanh: (e^z - e^(-z))/(e^z + e^(-z))', fontsize=12, fontweight='bold')
    axes[2].set_xlabel('z (weighted sum)')
    axes[2].set_ylabel('activation')
    axes[2].grid(True, alpha=0.3)
    axes[2].axhline(y=0, color='r', linestyle='--', alpha=0.5, label='Zero crossing')
    axes[2].legend()

    plt.tight_layout()
    plt.savefig('activation_functions.png', dpi=300, bbox_inches='tight')
    print("✅ Activation functions visualized")
    print()
    print("WHY NON-LINEAR ACTIVATIONS?")
    print("Without them: stacking neurons = still just linear transformation")
    print("With them: universal approximation - can learn ANY pattern")

visualize_activations()

# ==========================================
# MANUAL AND GATE - 1943 Style
# ==========================================

def demo_and_gate():
    """
    McCulloch-Pitts 1943: Let's build an AND gate with a neuron.

    Truth table:
    x1 | x2 | output
    ---|----+-------
    0  | 0  | 0
    0  | 1  | 0
    1  | 0  | 0
    1  | 1  | 1
    """

    # Manual weights that solve AND
    neuron = Neuron(n_inputs=2)
    neuron.weights = np.array([0.5, 0.5])  # Both inputs matter equally
    neuron.bias = -0.7                      # High threshold

    print("=" * 50)
    print("MANUAL AND GATE (1943 McCulloch-Pitts style)")
    print("=" * 50)

    test_cases = [
        ([0, 0], 0),
        ([0, 1], 0),
        ([1, 0], 0),
        ([1, 1], 1)
    ]

    print(f"\\nWeights: {neuron.weights}")
    print(f"Bias: {neuron.bias}")
    print(f"\\nTesting AND gate:")
    print(f"{'x1':<5} {'x2':<5} {'Expected':<10} {'Got':<10} {'Raw output':<15}")
    print("-" * 50)

    for inputs, expected in test_cases:
        activation, z = neuron.forward(inputs, activation='sigmoid')
        prediction = 1 if activation > 0.5 else 0

        print(f"{inputs[0]:<5} {inputs[1]:<5} {expected:<10} {prediction:<10} {activation:.4f}")

    print("\\n✅ The neuron learned logic! (Actually, we hand-coded it)")
    print("Next: Make it LEARN the weights itself...")

demo_and_gate()

# ==========================================
# LEARNING: ADJUST WEIGHTS FROM EXAMPLES
# ==========================================

def train_and_gate_from_scratch():
    """
    1958 Rosenblatt: The Perceptron Learning Rule

    If prediction is wrong:
        weights += learning_rate * error * input
        bias += learning_rate * error

    Simple. Elegant. Revolutionary.
    """

    # Training data for AND gate
    X_train = np.array([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ])

    y_train = np.array([0, 0, 0, 1])  # Expected outputs

    # Initialize random neuron
    neuron = Neuron(n_inputs=2)
    learning_rate = 0.1
    epochs = 20

    print("\\n" + "=" * 50)
    print("TRAINING AND GATE FROM RANDOM WEIGHTS")
    print("=" * 50)

    print(f"\\nInitial weights: {neuron.weights}")
    print(f"Initial bias: {neuron.bias}")

    # Training loop
    for epoch in range(epochs):
        total_error = 0

        for i in range(len(X_train)):
            # Forward pass
            inputs = X_train[i]
            target = y_train[i]

            activation, z = neuron.forward(inputs, activation='sigmoid')
            prediction = 1 if activation > 0.5 else 0

            # Calculate error
            error = target - activation
            total_error += abs(error)

            # Update weights (gradient descent, simplified)
            neuron.weights += learning_rate * error * inputs
            neuron.bias += learning_rate * error

        if epoch % 5 == 0:
            print(f"Epoch {epoch:2d}: Total Error = {total_error:.4f}")

    print(f"\\nFinal weights: {neuron.weights}")
    print(f"Final bias: {neuron.bias}")

    # Test learned neuron
    print("\\nTesting learned AND gate:")
    print(f"{'x1':<5} {'x2':<5} {'Expected':<10} {'Predicted':<10}")
    print("-" * 40)

    for i in range(len(X_train)):
        activation, _ = neuron.forward(X_train[i], activation='sigmoid')
        prediction = 1 if activation > 0.5 else 0

        print(f"{X_train[i][0]:<5} {X_train[i][1]:<5} {y_train[i]:<10} {prediction:<10}")

    print("\\n✅ IT LEARNED! The machine adjusted its own weights!")
    print("This is 1958. This is the Perceptron. This is the beginning.")

train_and_gate_from_scratch()

# ==========================================
# THE LIMITATION: XOR PROBLEM (1969)
# ==========================================

def demonstrate_xor_failure():
    """
    XOR truth table:
    x1 | x2 | output
    ---|----+-------
    0  | 0  | 0
    0  | 1  | 1
    1  | 0  | 1
    1  | 1  | 0

    A single perceptron CANNOT learn this.
    It's linearly inseparable.
    This killed AI research for 15 years.
    """

    X_train = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y_train = np.array([0, 1, 1, 0])  # XOR pattern

    neuron = Neuron(n_inputs=2)
    learning_rate = 0.1
    epochs = 100

    print("\\n" + "=" * 50)
    print("TRYING TO LEARN XOR (This will fail)")
    print("=" * 50)

    for epoch in range(0, epochs, 20):
        for i in range(len(X_train)):
            activation, z = neuron.forward(X_train[i], activation='sigmoid')
            error = y_train[i] - activation
            neuron.weights += learning_rate * error * X_train[i]
            neuron.bias += learning_rate * error

        # Check accuracy
        correct = 0
        for i in range(len(X_train)):
            activation, _ = neuron.forward(X_train[i], activation='sigmoid')
            prediction = 1 if activation > 0.5 else 0
            if prediction == y_train[i]:
                correct += 1

        accuracy = correct / len(X_train) * 100
        print(f"Epoch {epoch:3d}: Accuracy = {accuracy:.1f}%")

    print("\\n❌ Single neuron CANNOT learn XOR")
    print("Minsky & Papert proved this in 1969")
    print("Solution: MULTIPLE LAYERS (next part!)")

demonstrate_xor_failure()

print("\\n" + "=" * 70)
print("PART 1 COMPLETE: You've built neurons. You've seen them learn.")
print("You've hit the XOR wall. Now you need... DEPTH.")
print("=" * 70)
`
  };

  const part2Content = {
    title: "Part 2: Backpropagation - The Chain Rule Saves AI",
    description: "Multi-layer networks and the mathematics of learning",
    code: `import numpy as np
import matplotlib.pyplot as plt

# ==========================================
# MULTI-LAYER NEURAL NETWORK
# ==========================================

class NeuralNetwork:
    """
    A simple 2-layer neural network (1 hidden layer).

    Architecture:
    Input Layer → Hidden Layer → Output Layer
       (2)     →      (3)      →     (1)

    This solves XOR. This ends the AI winter.
    """

    def __init__(self, input_size, hidden_size, output_size):
        # Layer 1: Input → Hidden
        self.W1 = np.random.randn(input_size, hidden_size) * 0.5
        self.b1 = np.zeros((1, hidden_size))

        # Layer 2: Hidden → Output
        self.W2 = np.random.randn(hidden_size, output_size) * 0.5
        self.b2 = np.zeros((1, output_size))

        # For storing intermediate values (needed for backprop)
        self.z1 = None
        self.a1 = None
        self.z2 = None
        self.a2 = None

    def sigmoid(self, z):
        """Sigmoid activation function."""
        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))  # Clip for numerical stability

    def sigmoid_derivative(self, z):
        """Derivative of sigmoid: σ'(z) = σ(z) * (1 - σ(z))"""
        s = self.sigmoid(z)
        return s * (1 - s)

    def forward(self, X):
        """
        Forward propagation through the network.

        Layer 1:
            z1 = X @ W1 + b1
            a1 = sigmoid(z1)

        Layer 2:
            z2 = a1 @ W2 + b2
            a2 = sigmoid(z2)
        """
        # Hidden layer
        self.z1 = X @ self.W1 + self.b1
        self.a1 = self.sigmoid(self.z1)

        # Output layer
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = self.sigmoid(self.z2)

        return self.a2

    def backward(self, X, y, learning_rate):
        """
        Backpropagation: The Chain Rule in Action

        Goal: Compute ∂Loss/∂W for each weight

        Chain rule:
            ∂Loss/∂W2 = ∂Loss/∂a2 × ∂a2/∂z2 × ∂z2/∂W2
            ∂Loss/∂W1 = ∂Loss/∂a2 × ∂a2/∂z2 × ∂z2/∂a1 × ∂a1/∂z1 × ∂z1/∂W1

        This is your CALCULUS becoming LEARNING.
        """
        m = X.shape[0]  # Number of samples

        # ============================================
        # STEP 1: Output layer gradients
        # ============================================

        # Loss = 1/2 * (y - a2)^2  (Mean Squared Error)
        # ∂Loss/∂a2 = -(y - a2)
        dLoss_da2 = -(y - self.a2)

        # ∂a2/∂z2 = sigmoid'(z2)
        da2_dz2 = self.sigmoid_derivative(self.z2)

        # Combine: ∂Loss/∂z2
        delta2 = dLoss_da2 * da2_dz2

        # ∂z2/∂W2 = a1  (from z2 = a1 @ W2 + b2)
        dLoss_dW2 = self.a1.T @ delta2 / m
        dLoss_db2 = np.sum(delta2, axis=0, keepdims=True) / m

        # ============================================
        # STEP 2: Hidden layer gradients (BACKPROP!)
        # ============================================

        # ∂Loss/∂a1 = ∂Loss/∂z2 × ∂z2/∂a1 = delta2 @ W2.T
        dLoss_da1 = delta2 @ self.W2.T

        # ∂a1/∂z1 = sigmoid'(z1)
        da1_dz1 = self.sigmoid_derivative(self.z1)

        # Combine: ∂Loss/∂z1
        delta1 = dLoss_da1 * da1_dz1

        # ∂z1/∂W1 = X
        dLoss_dW1 = X.T @ delta1 / m
        dLoss_db1 = np.sum(delta1, axis=0, keepdims=True) / m

        # ============================================
        # STEP 3: Gradient descent update
        # ============================================

        self.W2 -= learning_rate * dLoss_dW2
        self.b2 -= learning_rate * dLoss_db2
        self.W1 -= learning_rate * dLoss_dW1
        self.b1 -= learning_rate * dLoss_db1

    def train(self, X, y, epochs, learning_rate):
        """Training loop with loss tracking."""
        losses = []

        for epoch in range(epochs):
            # Forward pass
            predictions = self.forward(X)

            # Calculate loss
            loss = np.mean((y - predictions) ** 2)
            losses.append(loss)

            # Backward pass
            self.backward(X, y, learning_rate)

            # Print progress
            if epoch % 500 == 0:
                accuracy = np.mean((predictions > 0.5) == y) * 100
                print(f"Epoch {epoch:4d}: Loss = {loss:.6f}, Accuracy = {accuracy:.1f}%")

        return losses

# ==========================================
# SOLVING XOR WITH NEURAL NETWORK
# ==========================================

def solve_xor():
    """
    1986: The XOR problem is TRIVIAL with backpropagation.
    Two layers. Chain rule. Done.
    """

    print("=" * 60)
    print("SOLVING XOR WITH MULTI-LAYER NETWORK (1986 Renaissance)")
    print("=" * 60)
    print()

    # XOR data
    X = np.array([[0, 0],
                  [0, 1],
                  [1, 0],
                  [1, 1]])

    y = np.array([[0],
                  [1],
                  [1],
                  [0]])

    # Create network: 2 inputs → 3 hidden → 1 output
    nn = NeuralNetwork(input_size=2, hidden_size=3, output_size=1)

    # Train
    print("Training neural network on XOR...")
    print()
    losses = nn.train(X, y, epochs=5000, learning_rate=0.5)

    # Test
    print()
    print("=" * 60)
    print("FINAL RESULTS:")
    print("=" * 60)
    predictions = nn.forward(X)

    print(f"\\n{'x1':<5} {'x2':<5} {'Expected':<10} {'Predicted':<12} {'Raw Output':<15}")
    print("-" * 60)
    for i in range(len(X)):
        pred_class = 1 if predictions[i, 0] > 0.5 else 0
        print(f"{X[i, 0]:<5} {X[i, 1]:<5} {y[i, 0]:<10} {pred_class:<12} {predictions[i, 0]:.6f}")

    accuracy = np.mean((predictions > 0.5) == y) * 100
    print(f"\\nAccuracy: {accuracy:.1f}%")

    # Plot loss curve
    plt.figure(figsize=(10, 5))
    plt.plot(losses, linewidth=2)
    plt.title('XOR Training Loss Over Time', fontsize=14, fontweight='bold')
    plt.xlabel('Epoch')
    plt.ylabel('Mean Squared Error')
    plt.grid(True, alpha=0.3)
    plt.savefig('xor_training_loss.png', dpi=300, bbox_inches='tight')
    print("\\n✅ Loss curve saved: xor_training_loss.png")

    print()
    print("🎉 XOR SOLVED! The 1969 AI Winter is over.")
    print("Backpropagation + Multi-layer = Universal Approximation")
    print("Any pattern. Any function. Just add more neurons.")

solve_xor()

# ==========================================
# VISUALIZING DECISION BOUNDARIES
# ==========================================

def visualize_decision_boundary():
    """
    Let's SEE how the network learned to separate XOR.
    This is geometry. This is your Linear Algebra visualized.
    """

    # Train a network
    X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y = np.array([[0], [1], [1], [0]])

    nn = NeuralNetwork(input_size=2, hidden_size=4, output_size=1)
    nn.train(X, y, epochs=5000, learning_rate=0.5)

    # Create mesh grid
    h = 0.01
    x_min, x_max = -0.5, 1.5
    y_min, y_max = -0.5, 1.5
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))

    # Predict for each point in mesh
    mesh_input = np.c_[xx.ravel(), yy.ravel()]
    Z = nn.forward(mesh_input)
    Z = Z.reshape(xx.shape)

    # Plot
    plt.figure(figsize=(10, 8))

    # Contour plot (decision boundary)
    plt.contourf(xx, yy, Z, levels=20, cmap='RdYlBu', alpha=0.8)
    plt.colorbar(label='Network Output')

    # Plot XOR points
    colors = ['red' if label == 0 else 'blue' for label in y.flatten()]
    plt.scatter(X[:, 0], X[:, 1], c=colors, s=200, edgecolors='black', linewidth=2)

    # Labels
    for i, (x1, x2) in enumerate(X):
        plt.annotate(f'({x1},{x2})→{y[i,0]}',
                    xy=(x1, x2),
                    xytext=(10, 10),
                    textcoords='offset points',
                    fontsize=10,
                    fontweight='bold')

    plt.title('XOR Decision Boundary - Neural Network', fontsize=14, fontweight='bold')
    plt.xlabel('x1')
    plt.ylabel('x2')
    plt.grid(True, alpha=0.3)
    plt.savefig('xor_decision_boundary.png', dpi=300, bbox_inches='tight')
    print("\\n✅ Decision boundary visualized: xor_decision_boundary.png")
    print()
    print("Notice: The boundary is NON-LINEAR")
    print("A single perceptron could never draw this curve")
    print("But with hidden layers, we bend space itself")

visualize_decision_boundary()

print("\\n" + "=" * 70)
print("PART 2 COMPLETE: You've mastered backpropagation.")
print("You've seen the chain rule become learning.")
print("You've solved XOR. You've ended the AI winter.")
print("Now: Real applications with TensorFlow.")
print("=" * 70)
`
  };

  const part3Content = {
    title: "Part 3: First TensorFlow Network - Real Applications",
    description: "From theory to production: Health & Finance neural networks",
    code: `import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# ==========================================
# APPLICATION 1: HEALTH - DISEASE PREDICTION
# ==========================================

def health_disease_prediction():
    """
    HEALTH PROJECT: Predict disease risk from symptoms & vitals

    Features: Age, Blood Pressure, Cholesterol, BMI, Glucose, Family History
    Target: Disease Risk (0 = Low, 1 = High)

    This is your Linear Algebra (weights) + Calculus (gradients) +
    NumPy (data) converging into MEDICAL AI.
    """

    print("=" * 70)
    print("HEALTH APPLICATION: Disease Risk Prediction Neural Network")
    print("=" * 70)
    print()

    # Simulated patient data
    np.random.seed(42)
    n_patients = 1000

    # Features
    age = np.random.randint(20, 80, n_patients)
    bp_systolic = np.random.randint(90, 180, n_patients)
    cholesterol = np.random.randint(150, 300, n_patients)
    bmi = np.random.uniform(18, 40, n_patients)
    glucose = np.random.randint(70, 200, n_patients)
    family_history = np.random.choice([0, 1], n_patients)  # 0=No, 1=Yes

    # Create risk (complex non-linear relationship)
    risk_score = (
        (age - 20) * 0.02 +
        (bp_systolic - 90) * 0.01 +
        (cholesterol - 150) * 0.005 +
        (bmi - 18) * 0.05 +
        (glucose - 70) * 0.008 +
        family_history * 0.5 +
        np.random.randn(n_patients) * 0.1  # Noise
    )

    # Binary classification (threshold at median)
    disease_risk = (risk_score > np.median(risk_score)).astype(int)

    # Create DataFrame
    df = pd.DataFrame({
        'age': age,
        'bp_systolic': bp_systolic,
        'cholesterol': cholesterol,
        'bmi': bmi,
        'glucose': glucose,
        'family_history': family_history,
        'disease_risk': disease_risk
    })

    print("Patient Dataset:")
    print(df.head(10))
    print(f"\\nDataset shape: {df.shape}")
    print(f"High risk patients: {disease_risk.sum()} ({disease_risk.mean()*100:.1f}%)")
    print()

    # Prepare data
    X = df.drop('disease_risk', axis=1).values
    y = df['disease_risk'].values

    # Split into train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Standardize features (important for neural networks!)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("Data Preparation:")
    print(f"Training samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")
    print(f"Features: {X.shape[1]}")
    print()

    # ==========================================
    # BUILD NEURAL NETWORK WITH TENSORFLOW
    # ==========================================

    print("Building Neural Network Architecture...")
    print()

    model = keras.Sequential([
        # Input layer (6 features)
        keras.layers.Dense(16, activation='relu', input_shape=(6,), name='hidden_layer_1'),
        keras.layers.Dense(8, activation='relu', name='hidden_layer_2'),
        keras.layers.Dense(1, activation='sigmoid', name='output_layer')
    ])

    # Display architecture
    model.summary()
    print()

    # Compile model
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='binary_crossentropy',
        metrics=['accuracy']
    )

    print("Model compiled with:")
    print("  Optimizer: Adam (adaptive learning rate)")
    print("  Loss: Binary Cross-Entropy (better than MSE for classification)")
    print("  Metrics: Accuracy")
    print()

    # Train model
    print("Training neural network...")
    print()

    history = model.fit(
        X_train_scaled, y_train,
        epochs=50,
        batch_size=32,
        validation_split=0.2,
        verbose=0
    )

    # Evaluate
    print("=" * 70)
    print("EVALUATION RESULTS")
    print("=" * 70)

    train_loss, train_acc = model.evaluate(X_train_scaled, y_train, verbose=0)
    test_loss, test_acc = model.evaluate(X_test_scaled, y_test, verbose=0)

    print(f"\\nTraining Accuracy: {train_acc*100:.2f}%")
    print(f"Test Accuracy: {test_acc*100:.2f}%")
    print()

    # Make predictions
    predictions = model.predict(X_test_scaled[:5], verbose=0)

    print("Sample Predictions:")
    print(f"{'Patient':<8} {'Age':<5} {'BP':<5} {'Chol':<6} {'BMI':<6} {'Gluc':<6} {'FamHist':<8} {'Pred Risk':<10} {'Actual':<8}")
    print("-" * 80)

    for i in range(5):
        patient_data = X_test[i]
        pred_prob = predictions[i, 0]
        pred_class = 1 if pred_prob > 0.5 else 0
        actual = y_test[i]

        print(f"{i+1:<8} {patient_data[0]:<5.0f} {patient_data[1]:<5.0f} {patient_data[2]:<6.0f} " +
              f"{patient_data[3]:<6.1f} {patient_data[4]:<6.0f} {patient_data[5]:<8.0f} " +
              f"{pred_prob*100:<10.1f}% {actual:<8}")

    # Plot training history
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    # Accuracy
    ax1.plot(history.history['accuracy'], label='Training', linewidth=2)
    ax1.plot(history.history['val_accuracy'], label='Validation', linewidth=2)
    ax1.set_title('Model Accuracy Over Time', fontsize=12, fontweight='bold')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # Loss
    ax2.plot(history.history['loss'], label='Training', linewidth=2)
    ax2.plot(history.history['val_loss'], label='Validation', linewidth=2)
    ax2.set_title('Model Loss Over Time', fontsize=12, fontweight='bold')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Loss')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig('health_disease_nn_training.png', dpi=300, bbox_inches='tight')
    print("\\n✅ Training curves saved: health_disease_nn_training.png")

    print()
    print("🏥 HEALTH AI DEPLOYED!")
    print("This network can predict disease risk from patient vitals")
    print("Your calculus gradients just became medical intelligence")

health_disease_prediction()

# ==========================================
# APPLICATION 2: FINANCE - CREDIT RISK
# ==========================================

def finance_credit_risk():
    """
    FINANCE PROJECT: Predict loan default risk

    Features: Income, Age, Debt-to-Income, Credit Score, Loan Amount, Employment Years
    Target: Default Risk (0 = Safe, 1 = Risky)

    This is the same mathematics. Different domain.
    Same convergence of Linear Algebra + Calculus.
    """

    print()
    print("=" * 70)
    print("FINANCE APPLICATION: Credit Risk Neural Network")
    print("=" * 70)
    print()

    # Simulated loan application data
    np.random.seed(42)
    n_applications = 1200

    # Features
    income = np.random.uniform(20000, 150000, n_applications)
    age = np.random.randint(18, 70, n_applications)
    debt_to_income = np.random.uniform(0, 0.8, n_applications)
    credit_score = np.random.randint(300, 850, n_applications)
    loan_amount = np.random.uniform(5000, 50000, n_applications)
    employment_years = np.random.randint(0, 30, n_applications)

    # Create default risk (non-linear relationship)
    risk_score = (
        -income / 50000 +
        debt_to_income * 3 +
        (850 - credit_score) / 100 +
        loan_amount / 10000 +
        -employment_years * 0.05 +
        np.random.randn(n_applications) * 0.2
    )

    default_risk = (risk_score > np.median(risk_score)).astype(int)

    # Create DataFrame
    df = pd.DataFrame({
        'income': income,
        'age': age,
        'debt_to_income': debt_to_income,
        'credit_score': credit_score,
        'loan_amount': loan_amount,
        'employment_years': employment_years,
        'default_risk': default_risk
    })

    print("Loan Applications Dataset:")
    print(df.head(10))
    print(f"\\nDataset shape: {df.shape}")
    print(f"Risky applications: {default_risk.sum()} ({default_risk.mean()*100:.1f}%)")
    print()

    # Prepare data
    X = df.drop('default_risk', axis=1).values
    y = df['default_risk'].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Standardize
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Build model
    print("Building Credit Risk Neural Network...")
    print()

    model = keras.Sequential([
        keras.layers.Dense(32, activation='relu', input_shape=(6,)),
        keras.layers.Dropout(0.2),  # Regularization to prevent overfitting
        keras.layers.Dense(16, activation='relu'),
        keras.layers.Dropout(0.2),
        keras.layers.Dense(8, activation='relu'),
        keras.layers.Dense(1, activation='sigmoid')
    ])

    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy', keras.metrics.AUC(name='auc')]
    )

    model.summary()
    print()

    # Train
    print("Training credit risk model...")
    history = model.fit(
        X_train_scaled, y_train,
        epochs=40,
        batch_size=32,
        validation_split=0.2,
        verbose=0
    )

    # Evaluate
    print()
    print("=" * 70)
    print("CREDIT RISK MODEL EVALUATION")
    print("=" * 70)

    test_loss, test_acc, test_auc = model.evaluate(X_test_scaled, y_test, verbose=0)

    print(f"\\nTest Accuracy: {test_acc*100:.2f}%")
    print(f"Test AUC: {test_auc:.4f}")
    print()

    # Sample predictions
    predictions = model.predict(X_test_scaled[:5], verbose=0)

    print("Sample Loan Application Predictions:")
    print(f"{'App':<5} {'Income':<10} {'Age':<5} {'DTI':<6} {'Credit':<8} {'Loan Amt':<10} {'Risk %':<10} {'Decision':<10}")
    print("-" * 85)

    for i in range(5):
        app_data = X_test[i]
        pred_prob = predictions[i, 0]
        decision = "RISKY" if pred_prob > 0.5 else "SAFE"

        print(f"{i+1:<5} ${app_data[0]:<9.0f} {app_data[1]:<5.0f} {app_data[2]:<6.2f} " +
              f"{app_data[3]:<8.0f} ${app_data[4]:<9.0f} {pred_prob*100:<10.1f}% {decision:<10}")

    print()
    print("💰 FINANCE AI DEPLOYED!")
    print("Neural network predicting credit risk for loan approvals")
    print("Same backpropagation. Same chain rule. Different billions.")

finance_credit_risk()

print()
print("=" * 80)
print("SESSION 36 COMPLETE - THE CONVERGENCE")
print("=" * 80)
print()
print("You started with:")
print("  📐 Linear Algebra → Became weight matrices")
print("  📊 Calculus → Became gradient descent")
print("  🐍 NumPy → Became data pipelines")
print("  🧮 Pandas → Became feature engineering")
print()
print("You built:")
print("  🧠 Neurons → From McCulloch-Pitts 1943")
print("  🔗 Networks → From Rosenblatt 1958")
print("  🔄 Backprop → From Rumelhart 1986")
print("  🚀 TensorFlow → Production ML 2012+")
print()
print("You deployed:")
print("  🏥 Health: Disease risk prediction")
print("  💰 Finance: Credit risk assessment")
print()
print("This is not magic. This is mathematics.")
print("This is not memorization. This is understanding.")
print("This is why you learned the foundations.")
print()
print("Next: Deeper networks. CNNs. RNNs. Transformers.")
print("But you have the core. Everything else is architecture.")
print()
print("🎓 You've mastered Deep Learning fundamentals.")
print("=" * 80)
`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
            Session 36: Introduction to Deep Learning & Neural Networks
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From "How do brains compute?" to backpropagation's elegant solution.
            This is the convergence: your Linear Algebra becomes weights, your Calculus becomes learning,
            your code becomes intelligence.
          </p>
        </div>

        {/* Origin Story Section */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            The Deep Learning Origin Story: 1943-2012
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Deep Learning didn't emerge from a single eureka moment. It's a 69-year saga of
            brilliant insights, devastating failures, and mathematical resurrection.
            From the first artificial neuron to AlexNet's ImageNet victory, this is the story
            of how we learned to teach machines to learn.
          </p>

          {/* Animated Chapter Navigation */}
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {storyChapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveChapter(index)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeChapter === index
                    ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Chapter {index + 1}
              </button>
            ))}
          </div>

          {/* Chapter Content */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500 transform transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {storyChapters[activeChapter].title}
            </h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {storyChapters[activeChapter].content}
            </p>
            <div className="bg-white/70 rounded-lg p-4 italic text-gray-800 border-l-2 border-orange-400">
              {storyChapters[activeChapter].details}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🎯 The Pattern:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every breakthrough came from asking: "What if we could make math act more like biology?"
              McCulloch-Pitts gave us the neuron. Rosenblatt made it learn. Minsky showed its limits.
              Backpropagation shattered those limits. AlexNet proved depth wins.
              <span className="font-bold text-orange-700"> This is convergence: Biology → Math → Code → Intelligence.</span>
            </p>
          </div>
        </div>

        {/* Part 1: The Neuron */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">🧠</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {part1Content.title}
              </h2>
              <p className="text-lg text-gray-600">
                {part1Content.description}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative">
            <Button
              onClick={() => copyToClipboard(part1Content.code, 'part1')}
              className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700"
              size="sm"
            >
              {copiedSection === 'part1' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>

            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '0.9rem'
              }}
            >
              {part1Content.code}
            </SyntaxHighlighter>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              💡 What You Just Built:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Artificial neuron from scratch (McCulloch-Pitts 1943)</li>
              <li>Activation functions: Sigmoid, ReLU, Tanh (why non-linearity matters)</li>
              <li>Manual AND gate (hand-coded weights)</li>
              <li>Learning AND gate from examples (Perceptron Learning Rule 1958)</li>
              <li>XOR failure demonstration (Minsky's 1969 limitation)</li>
            </ul>
            <p className="mt-4 text-gray-700 font-medium">
              You've lived through 26 years of AI history (1943-1969) in executable code.
            </p>
          </div>
        </div>

        {/* Part 2: Backpropagation */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">🔥</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {part2Content.title}
              </h2>
              <p className="text-lg text-gray-600">
                {part2Content.description}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative">
            <Button
              onClick={() => copyToClipboard(part2Content.code, 'part2')}
              className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700"
              size="sm"
            >
              {copiedSection === 'part2' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>

            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '0.9rem'
              }}
            >
              {part2Content.code}
            </SyntaxHighlighter>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🎓 The Calculus-to-Learning Bridge:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Chain Rule</strong>: ∂Loss/∂W = ∂Loss/∂a × ∂a/∂z × ∂z/∂W</li>
              <li><strong>Gradient Descent</strong>: W_new = W_old - learning_rate × gradient</li>
              <li><strong>Multi-layer Networks</strong>: XOR solved in 5000 epochs</li>
              <li><strong>Decision Boundary Visualization</strong>: Seeing non-linear separation</li>
              <li><strong>Universal Approximation</strong>: Any function, just add neurons</li>
            </ul>
            <p className="mt-4 text-gray-700 font-medium">
              This is 1986. The AI winter ends. Backpropagation becomes the foundation of modern AI.
            </p>
          </div>
        </div>

        {/* Part 3: TensorFlow Applications */}
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

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 relative">
            <Button
              onClick={() => copyToClipboard(part3Content.code, 'part3')}
              className="absolute top-4 right-4 bg-orange-600 hover:bg-orange-700"
              size="sm"
            >
              {copiedSection === 'part3' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>

            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '0.9rem'
              }}
            >
              {part3Content.code}
            </SyntaxHighlighter>
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              🏆 Production Deep Learning:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">🏥 Health Application:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Disease risk from patient vitals</li>
                  <li>6 features: Age, BP, Cholesterol, BMI, Glucose, Family History</li>
                  <li>2-layer network: 16→8→1 neurons</li>
                  <li>Binary classification: High/Low risk</li>
                  <li>Training accuracy: ~85%+</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">💰 Finance Application:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Credit risk prediction for loans</li>
                  <li>6 features: Income, Age, DTI, Credit Score, Loan Amount, Employment</li>
                  <li>3-layer network with Dropout: 32→16→8→1</li>
                  <li>Binary classification: Safe/Risky</li>
                  <li>AUC metric for imbalanced data</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-gray-700 font-medium">
              Same mathematics. Different domains. This is the power of universal approximation.
            </p>
          </div>
        </div>

        {/* The Convergence Summary */}
        <div className="bg-gradient-to-br from-red-100 via-orange-100 to-pink-100 rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🌟 The Convergence: Everything You've Learned
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-5 shadow">
              <h3 className="font-bold text-lg text-blue-700 mb-3">📐 Linear Algebra</h3>
              <p className="text-gray-700 text-sm">
                Your matrices became <strong>weight matrices</strong>.
                Your dot products became <strong>neuron activations</strong>.
                Your transformations became <strong>network layers</strong>.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow">
              <h3 className="font-bold text-lg text-green-700 mb-3">📊 Calculus</h3>
              <p className="text-gray-700 text-sm">
                Your derivatives became <strong>gradients</strong>.
                Your chain rule became <strong>backpropagation</strong>.
                Your optimization became <strong>learning itself</strong>.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow">
              <h3 className="font-bold text-lg text-purple-700 mb-3">🐍 NumPy & Pandas</h3>
              <p className="text-gray-700 text-sm">
                Your arrays became <strong>tensors</strong>.
                Your DataFrames became <strong>feature engineering</strong>.
                Your code became <strong>production ML</strong>.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">
              🎯 What You Can Do Now:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Build neurons from scratch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Implement backpropagation manually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Solve XOR and linearly inseparable problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Understand activation functions deeply</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Deploy TensorFlow production models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Apply neural networks to Health & Finance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Visualize decision boundaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Understand the 69-year history of Deep Learning</span>
                </li>
              </ul>
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
            className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 hover:from-red-700 hover:via-orange-700 hover:to-pink-700 text-white px-8 py-6 text-lg"
          >
            Continue to Advanced Deep Learning →
          </Button>
        </div>

      </div>
    </div>
  );
};

export default DeepLearningSession36;
