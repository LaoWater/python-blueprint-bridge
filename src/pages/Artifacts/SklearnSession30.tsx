import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, Brain, TrendingUp, Target, Lightbulb, Code, Copy, Home, Heart, Calculator, Zap, Activity, BarChart3 } from 'lucide-react';

const SklearnSession30 = () => {
  const navigate = useNavigate();

  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);

  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});
  const [copiedCode, setCopiedCode] = useState('');

  // Story chapters following the philosophy
  const storyChapters = [
    {
      title: "❓ The Question That Changed Everything",
      content: "2007. David Cournapeau, neuroscience PhD student at INRIA, analyzing EEG brain signals. NumPy processes data perfectly. Pandas organizes it. Matplotlib visualizes it beautifully.",
      details: "But then the inevitable question: 'I can see the patterns... but how do I make it PREDICT? How do I make the computer LEARN from this data?'"
    },
    {
      title: "💡 The Missing Piece",
      content: "MATLAB had it. R had it. But Python - the language taking over science - was missing a comprehensive machine learning library.",
      details: "You could write algorithms from scratch. But every researcher was reinventing k-means, linear regression, SVMs. The scientific community needed a unified, battle-tested ML toolkit."
    },
    {
      title: "🔗 Standing on Giants' Shoulders",
      content: "Scikit-learn wasn't built in isolation. It emerged from real needs: NumPy for computation, SciPy for algorithms, Matplotlib for visualization.",
      details: "David saw it: Python had ALL the pieces for machine learning. It just needed someone to connect them with a consistent, intuitive API. That's how sklearn was born."
    },
    {
      title: "🎯 The Philosophy: Consistency Over Cleverness",
      content: "Every sklearn model follows the same pattern: .fit() to learn, .predict() to apply, .score() to evaluate. Whether it's linear regression or deep neural networks.",
      details: "This consistency means: learn one model, understand them all. The API itself teaches machine learning concepts."
    },
    {
      title: "🚀 Your Journey Begins",
      content: "Today, you'll discover sklearn not as 'another library to learn' but as the natural answer to a question you've been building toward: How do I make data predict the future?",
      details: "From house prices to health metrics, from classification to regression - you're about to unlock the power of machine learning."
    }
  ];

  // Part 1: Math Foundations
  const part1Content = {
    title: "Part 1: Math Foundations - The Language of Learning",
    description: "Before sklearn, understand the mathematics that makes machines learn. These aren't abstract concepts - they're the physics of prediction",
    realWorld: "Every neural network, every recommendation system, every AI uses these mathematical principles",
    code: `import numpy as np
import matplotlib.pyplot as plt

"""
🧮 MATHEMATICAL FOUNDATIONS OF MACHINE LEARNING

Before we use sklearn, let's understand the MATH that powers it.
These concepts aren't theoretical - they're what makes machines learn!
"""

# ===== CONCEPT 1: DERIVATIVES = "How fast is it changing?" =====
print("="*70)
print("📐 DERIVATIVES: The Foundation of Learning")
print("="*70)

def simple_function(x):
    """A simple quadratic function: f(x) = x²"""
    return x ** 2

def derivative_at_point(x, h=0.0001):
    """
    Calculate derivative using limit definition
    This is what calculus actually computes!
    """
    # Derivative = (f(x+h) - f(x)) / h as h approaches 0
    return (simple_function(x + h) - simple_function(x)) / h

# Test at x = 3
x_point = 3
slope = derivative_at_point(x_point)

print(f"\\nAt x = {x_point}:")
print(f"   f(x) = {simple_function(x_point)}")
print(f"   Derivative (slope) = {slope:.4f}")
print(f"   Analytical derivative = {2*x_point}")  # For f(x)=x², derivative is 2x

print("\\n💡 WHY THIS MATTERS FOR ML:")
print("   In machine learning, the 'function' is your model's error")
print("   The derivative tells us: 'Should I increase or decrease parameters?'")
print("   This is literally how neural networks learn!")

# ===== CONCEPT 2: GRADIENT DESCENT = "Rolling Down Hill" =====
print("\\n" + "="*70)
print("⛰️  GRADIENT DESCENT: How Machines Find Best Fit")
print("="*70)

def loss_function(w):
    """
    A loss function: measures how 'wrong' our model is
    Goal: find w that minimizes this!
    """
    return (w - 5)**2 + 10  # Minimum at w = 5

def gradient_of_loss(w):
    """Derivative of loss function"""
    return 2 * (w - 5)

# Gradient Descent Algorithm
w = 0  # Start at random point
learning_rate = 0.1
history = [w]

print(f"\\nStarting at w = {w}")
print(f"   Loss: {loss_function(w):.4f}\\n")

for step in range(20):
    # Calculate gradient (direction of steepest ascent)
    grad = gradient_of_loss(w)

    # Move OPPOSITE to gradient (descent!)
    w = w - learning_rate * grad
    history.append(w)

    if step % 5 == 0:
        print(f"Step {step:2d}: w = {w:.4f}, Loss = {loss_function(w):.4f}")

print(f"\\n✅ Converged to w = {w:.4f} (true minimum: 5.0)")
print(f"   Final loss: {loss_function(w):.4f}")

print("\\n💡 THIS IS LITERALLY HOW SKLEARN TRAINS MODELS:")
print("   1. Start with random parameters")
print("   2. Calculate how wrong you are (loss)")
print("   3. Calculate derivative (gradient)")
print("   4. Update parameters in opposite direction")
print("   5. Repeat until convergence")

# ===== CONCEPT 3: COSINE SIMILARITY = "How similar are two things?" =====
print("\\n" + "="*70)
print("📏 COSINE SIMILARITY: Measuring Similarity in High Dimensions")
print("="*70)

def cosine_similarity(vec1, vec2):
    """
    Measures similarity between two vectors
    Result: -1 (opposite) to +1 (identical)
    """
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    return dot_product / (norm1 * norm2)

# Example: Movie preferences
# Features: [Action, Comedy, Drama, Horror, Romance]
user_a = np.array([5, 2, 1, 0, 3])  # Loves action & romance
user_b = np.array([4, 1, 2, 0, 4])  # Similar taste!
user_c = np.array([1, 5, 4, 3, 1])  # Prefers comedy & drama

sim_ab = cosine_similarity(user_a, user_b)
sim_ac = cosine_similarity(user_a, user_c)

print("\\nMovie Preference Vectors:")
print(f"   User A: {user_a} (Action & Romance fan)")
print(f"   User B: {user_b} (Similar taste)")
print(f"   User C: {user_c} (Comedy & Drama fan)")

print(f"\\nSimilarity Scores:")
print(f"   A vs B: {sim_ab:.4f} → Similar!")
print(f"   A vs C: {sim_ac:.4f} → Different")

print("\\n💡 REAL-WORLD USES:")
print("   • Netflix: 'Users similar to you watched...'")
print("   • Spotify: Song recommendation")
print("   • Document similarity")
print("   • Face recognition (compare face vectors)")

# ===== CONCEPT 4: DISTANCE METRICS = "How far apart are they?" =====
print("\\n" + "="*70)
print("📐 DISTANCE METRICS: Different Ways to Measure 'Distance'")
print("="*70)

def euclidean_distance(p1, p2):
    """Straight-line distance (like measuring with a ruler)"""
    return np.sqrt(np.sum((p1 - p2)**2))

def manhattan_distance(p1, p2):
    """City-block distance (like walking on a grid)"""
    return np.sum(np.abs(p1 - p2))

# Example: Two houses with features [sqm, price_k, age_years]
house_a = np.array([80, 200, 5])   # 80m², 200k€, 5 years old
house_b = np.array([82, 205, 6])   # Similar house
house_c = np.array([120, 350, 1])  # Different house

euclidean_ab = euclidean_distance(house_a, house_b)
euclidean_ac = euclidean_distance(house_a, house_c)

manhattan_ab = manhattan_distance(house_a, house_b)
manhattan_ac = manhattan_distance(house_a, house_c)

print("\\nHouse Comparison:")
print(f"   House A: {house_a} (80m², 200k, 5yr)")
print(f"   House B: {house_b} (Similar)")
print(f"   House C: {house_c} (Luxury)")

print(f"\\nEuclidean Distance:")
print(f"   A → B: {euclidean_ab:.2f} (close)")
print(f"   A → C: {euclidean_ac:.2f} (far)")

print(f"\\nManhattan Distance:")
print(f"   A → B: {manhattan_ab:.2f}")
print(f"   A → C: {manhattan_ac:.2f}")

print("\\n💡 WHEN TO USE WHICH:")
print("   Euclidean: Default for most ML (k-NN, k-Means)")
print("   Manhattan: Grid-based problems, city distances")
print("   Cosine: High-dimensional data, text, recommendations")

# ===== VISUALIZATION: Gradient Descent in Action =====
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Left plot: Loss function with descent path
w_range = np.linspace(-2, 12, 100)
loss_range = loss_function(w_range)

axes[0].plot(w_range, loss_range, 'b-', linewidth=2, label='Loss Function')
axes[0].plot(history, [loss_function(w) for w in history],
            'ro-', markersize=4, linewidth=1.5, label='Gradient Descent Path')
axes[0].axvline(x=5, color='g', linestyle='--', alpha=0.5, label='True Minimum')
axes[0].set_xlabel('Parameter w', fontsize=12)
axes[0].set_ylabel('Loss', fontsize=12)
axes[0].set_title('Gradient Descent: Rolling Down to Minimum', fontsize=14, fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Right plot: Cosine similarity visualization
angles = np.linspace(0, 2*np.pi, 100)
unit_circle_x = np.cos(angles)
unit_circle_y = np.sin(angles)

# User vectors (normalized for visualization)
user_a_norm = user_a[:2] / np.linalg.norm(user_a[:2])  # Use first 2 dims
user_b_norm = user_b[:2] / np.linalg.norm(user_b[:2])
user_c_norm = user_c[:2] / np.linalg.norm(user_c[:2])

axes[1].plot(unit_circle_x, unit_circle_y, 'k--', alpha=0.3)
axes[1].arrow(0, 0, user_a_norm[0], user_a_norm[1], head_width=0.05,
             head_length=0.05, fc='red', ec='red', linewidth=2, label='User A')
axes[1].arrow(0, 0, user_b_norm[0], user_b_norm[1], head_width=0.05,
             head_length=0.05, fc='blue', ec='blue', linewidth=2, label='User B')
axes[1].arrow(0, 0, user_c_norm[0], user_c_norm[1], head_width=0.05,
             head_length=0.05, fc='green', ec='green', linewidth=2, label='User C')
axes[1].set_xlabel('Dimension 1 (e.g., Action)', fontsize=12)
axes[1].set_ylabel('Dimension 2 (e.g., Comedy)', fontsize=12)
axes[1].set_title('Cosine Similarity: Angle Between Vectors', fontsize=14, fontweight='bold')
axes[1].legend()
axes[1].grid(True, alpha=0.3)
axes[1].axis('equal')

plt.tight_layout()
plt.savefig('ml_math_foundations.png', dpi=150, bbox_inches='tight')
print("\\n✅ Visualization saved: ml_math_foundations.png")

print("\\n" + "="*70)
print("🎓 YOU NOW UNDERSTAND THE MATH BEHIND ML!")
print("="*70)
print("   Derivatives → Tell us which direction to optimize")
print("   Gradient Descent → The algorithm that finds best fit")
print("   Cosine Similarity → Measures similarity in high dimensions")
print("   Distance Metrics → Foundation of clustering & classification")
print("\\n🚀 NOW you're ready for sklearn - with UNDERSTANDING, not memorization!")
`
  };

  // Part 2: First ML Model
  const part2Content = {
    title: "Part 2: Your First ML Model - House Price Prediction",
    description: "Build a model that predicts apartment prices. Not as an exercise, but as a tool you'd actually use when buying property",
    realWorld: "Zillow, Redfin, and every real estate platform uses these exact principles to estimate property values",
    code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import matplotlib.pyplot as plt

"""
🏠 REAL-WORLD PROJECT: Should I Buy This Apartment?

You're apartment hunting. The realtor shows you a 75m² place for 180,000€.
Is that a good deal? Let's build a model that predicts fair prices!
"""

print("="*70)
print("🏠 HOUSE PRICE PREDICTION: Your First ML Model")
print("="*70)

# ===== STEP 1: Create Realistic Dataset =====
print("\\n📊 STEP 1: Loading Housing Data")
print("-" * 70)

# Real housing data from your city (simulated but realistic)
np.random.seed(42)
n_houses = 200

# Generate realistic features
square_meters = np.random.uniform(40, 150, n_houses)
distance_center = np.random.uniform(1, 20, n_houses)  # km from city center
floor_level = np.random.randint(0, 10, n_houses)
age_years = np.random.uniform(0, 50, n_houses)
has_parking = np.random.choice([0, 1], n_houses, p=[0.3, 0.7])

# Price formula (what we're trying to learn!)
# Base: 2500€/m² + location penalty - age penalty + parking bonus
base_price_per_sqm = 2500
price = (
    base_price_per_sqm * square_meters
    - distance_center * 3000  # Further from center = cheaper
    + floor_level * 2000       # Higher floor = slightly more expensive
    - age_years * 500          # Older = cheaper
    + has_parking * 15000      # Parking adds value
    + np.random.normal(0, 15000, n_houses)  # Random variation
)

# Create DataFrame
df = pd.DataFrame({
    'square_meters': square_meters,
    'distance_km': distance_center,
    'floor': floor_level,
    'age_years': age_years,
    'has_parking': has_parking,
    'price': price
})

print(f"Loaded {len(df)} apartments from the market")
print("\\nFirst 5 listings:")
print(df.head())

print("\\n📈 Quick Statistics:")
print(df.describe()[['square_meters', 'price']].round(2))

# ===== STEP 2: Split Data (The Golden Rule) =====
print("\\n✂️  STEP 2: Train-Test Split")
print("-" * 70)

# Separate features (X) from target (y)
X = df[['square_meters', 'distance_km', 'floor', 'age_years', 'has_parking']]
y = df['price']

# Split: 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training set: {len(X_train)} apartments")
print(f"Test set: {len(X_test)} apartments")
print("\\n💡 WHY SPLIT?")
print("   Training data: Teach the model")
print("   Test data: Evaluate on unseen data (simulates real world)")
print("   → Never test on training data! That's cheating!")

# ===== STEP 3: Train the Model =====
print("\\n🎓 STEP 3: Training Linear Regression Model")
print("-" * 70)

# Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

print("✅ Model trained!")
print("\\nWhat did it learn?")
print(f"   Coefficient for square_meters: {model.coef_[0]:.2f}€/m²")
print(f"   → Each extra m² adds {model.coef_[0]:.2f}€ to price")
print(f"\\n   Coefficient for distance_km: {model.coef_[1]:.2f}€/km")
print(f"   → Each km further from center subtracts {abs(model.coef_[1]):.2f}€")
print(f"\\n   Coefficient for parking: {model.coef_[4]:.2f}€")
print(f"   → Parking adds ~{model.coef_[4]/1000:.1f}k€ to value")

print(f"\\n   Intercept (base price): {model.intercept_:.2f}€")

# ===== STEP 4: Make Predictions =====
print("\\n🔮 STEP 4: Making Predictions")
print("-" * 70)

y_pred = model.predict(X_test)

# Show some examples
print("\\nReal vs Predicted (first 5 test cases):")
print("-" * 50)
for i in range(5):
    actual = y_test.iloc[i]
    predicted = y_pred[i]
    error = abs(actual - predicted)
    error_pct = (error / actual) * 100

    print(f"\\nApartment {i+1}:")
    print(f"   {X_test.iloc[i]['square_meters']:.0f}m², "
          f"{X_test.iloc[i]['distance_km']:.1f}km from center, "
          f"Floor {X_test.iloc[i]['floor']}, "
          f"{X_test.iloc[i]['age_years']:.0f} years old")
    print(f"   Actual price:    {actual:>10,.0f}€")
    print(f"   Predicted price: {predicted:>10,.0f}€")
    print(f"   Error: {error:,.0f}€ ({error_pct:.1f}%)")

# ===== STEP 5: Evaluate Model =====
print("\\n📊 STEP 5: Model Evaluation")
print("-" * 70)

# Calculate metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\\n📏 Evaluation Metrics:")
print(f"   RMSE (Root Mean Squared Error): {rmse:,.0f}€")
print(f"      → Average prediction error: ±{rmse:,.0f}€")
print(f"\\n   MAE (Mean Absolute Error): {mae:,.0f}€")
print(f"      → Typical error: {mae:,.0f}€")
print(f"\\n   R² Score: {r2:.4f}")
print(f"      → Model explains {r2*100:.2f}% of price variation")

print("\\n💡 WHAT DO THESE MEAN?")
print(f"   RMSE = {rmse/1000:.1f}k€: On average, predictions are off by this much")
print(f"   R² = {r2:.2f}: Close to 1.0 is excellent (1.0 = perfect predictions)")
print(f"   MAE = {mae/1000:.1f}k€: Typical error in real-world terms")

# ===== STEP 6: The Real Test =====
print("\\n🎯 STEP 6: The Real-World Test")
print("-" * 70)
print("\\nYou found an apartment:")
print("   • 75m², 3km from center, Floor 4, 10 years old, with parking")
print("   • Asking price: 180,000€")
print("\\nIs it a good deal?")

new_apartment = np.array([[75, 3, 4, 10, 1]])  # Features as array
predicted_price = model.predict(new_apartment)[0]

print(f"\\n   Model's fair price: {predicted_price:,.0f}€")
print(f"   Asking price: 180,000€")
difference = predicted_price - 180000
if difference > 0:
    print(f"   → {difference:,.0f}€ BELOW fair value! ✅ Good deal!")
else:
    print(f"   → {abs(difference):,.0f}€ ABOVE fair value! ⚠️ Overpriced!")

# ===== VISUALIZATION =====
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Left: Actual vs Predicted
axes[0].scatter(y_test, y_pred, alpha=0.6, s=50)
axes[0].plot([y_test.min(), y_test.max()],
            [y_test.min(), y_test.max()],
            'r--', linewidth=2, label='Perfect Prediction')
axes[0].set_xlabel('Actual Price (€)', fontsize=12)
axes[0].set_ylabel('Predicted Price (€)', fontsize=12)
axes[0].set_title('Actual vs Predicted Prices', fontsize=14, fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Right: Residuals (errors)
residuals = y_test - y_pred
axes[1].scatter(y_pred, residuals, alpha=0.6, s=50)
axes[1].axhline(y=0, color='r', linestyle='--', linewidth=2)
axes[1].set_xlabel('Predicted Price (€)', fontsize=12)
axes[1].set_ylabel('Residual (Actual - Predicted)', fontsize=12)
axes[1].set_title('Residual Plot: Are Errors Random?', fontsize=14, fontweight='bold')
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('house_price_prediction.png', dpi=150, bbox_inches='tight')
print("\\n✅ Visualization saved: house_price_prediction.png")

print("\\n" + "="*70)
print("🎉 CONGRATULATIONS! You built a working ML model!")
print("="*70)
print("\\nWhat you just did:")
print("   1. Loaded and explored real-world data")
print("   2. Split data (train/test - the golden rule)")
print("   3. Trained a Linear Regression model")
print("   4. Made predictions on new data")
print("   5. Evaluated performance (RMSE, R², MAE)")
print("   6. Applied it to a real decision (buy apartment?)")
print("\\n💡 This exact process scales to:")
print("   • Predicting stock prices")
print("   • Diagnosing diseases")
print("   • Recommending products")
print("   • Optimizing ad spend")
print("\\n🚀 You're not just learning sklearn - you're learning to make")
print("   data-driven decisions that could save you thousands of euros!")
`
  };

  // Part 3: Health Prediction
  const part3Content = {
    title: "Part 3: Health Prediction - Will I Have Energy Tomorrow?",
    description: "Predict your energy levels based on sleep, exercise, and nutrition. Machine learning applied to YOUR daily life",
    realWorld: "Fitness apps like Whoop, Oura Ring, and Apple Health use similar models to predict recovery and performance",
    code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

"""
⚡ HEALTH PREDICTION: Will Tomorrow Be a High-Energy Day?

You track: sleep hours, workout intensity, water intake, screen time before bed.
Question: Can ML predict tomorrow's energy level (1-10)?
Answer: Absolutely! Let's build it.
"""

print("="*70)
print("⚡ HEALTH ENERGY PREDICTION: ML for Your Wellbeing")
print("="*70)

# ===== STEP 1: Create Health Dataset =====
print("\\n📊 STEP 1: Your Health Tracking Data")
print("-" * 70)

np.random.seed(42)
n_days = 180  # 6 months of tracking

# Generate realistic health data
sleep_hours = np.random.normal(7, 1.2, n_days)  # Average 7hrs, std 1.2
sleep_hours = np.clip(sleep_hours, 4, 10)  # Realistic range

workout_mins = np.random.choice([0, 30, 45, 60, 90], n_days, p=[0.2, 0.3, 0.2, 0.2, 0.1])
water_liters = np.random.normal(2.0, 0.5, n_days)
water_liters = np.clip(water_liters, 0.5, 4)

screen_before_bed = np.random.uniform(0, 180, n_days)  # minutes
stress_level = np.random.uniform(1, 10, n_days)
meal_quality = np.random.uniform(1, 10, n_days)  # 1-10 nutrition score

# Energy formula (what we want to learn!)
energy_level = (
    sleep_hours * 0.8               # Sleep is crucial
    + workout_mins * 0.02           # Exercise helps (diminishing returns)
    + water_liters * 0.5            # Hydration matters
    - screen_before_bed * 0.01      # Screen time hurts sleep quality
    - stress_level * 0.3            # Stress drains energy
    + meal_quality * 0.4            # Nutrition fuels you
    + np.random.normal(0, 0.5, n_days)  # Daily variation
)

# Normalize to 1-10 scale
energy_level = np.clip(energy_level, 1, 10)

# Create DataFrame
df = pd.DataFrame({
    'sleep_hours': sleep_hours,
    'workout_mins': workout_mins,
    'water_liters': water_liters,
    'screen_before_bed_mins': screen_before_bed,
    'stress_level': stress_level,
    'meal_quality_score': meal_quality,
    'energy_level': energy_level
})

print(f"Analyzing {len(df)} days of health data")
print("\\nSample week:")
print(df.head(7).round(2))

print("\\n📈 Your Health Averages:")
stats = df[['sleep_hours', 'workout_mins', 'water_liters', 'energy_level']].describe()
print(stats.loc[['mean', 'min', 'max']].round(2))

# ===== STEP 2: Feature Engineering =====
print("\\n🔧 STEP 2: Feature Engineering")
print("-" * 70)

# Create derived features
df['sleep_quality'] = df['sleep_hours'] - (df['screen_before_bed_mins'] / 60)
df['exercise_hydration'] = df['workout_mins'] * df['water_liters'] / 100
df['wellness_score'] = df['meal_quality_score'] - df['stress_level']

print("Created 3 derived features:")
print("   • sleep_quality: sleep - (screen_time/60)")
print("   • exercise_hydration: combined workout & water effect")
print("   • wellness_score: nutrition - stress")

# ===== STEP 3: Train-Test Split =====
print("\\n✂️  STEP 3: Preparing Data")
print("-" * 70)

feature_cols = ['sleep_hours', 'workout_mins', 'water_liters',
                'screen_before_bed_mins', 'stress_level', 'meal_quality_score',
                'sleep_quality', 'exercise_hydration', 'wellness_score']

X = df[feature_cols]
y = df['energy_level']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training days: {len(X_train)}")
print(f"Test days: {len(X_test)}")

# ===== STEP 4: Compare Models =====
print("\\n🎓 STEP 4: Training & Comparing Models")
print("-" * 70)

# Model 1: Linear Regression
model_lr = LinearRegression()
model_lr.fit(X_train, y_train)
y_pred_lr = model_lr.predict(X_test)
r2_lr = r2_score(y_test, y_pred_lr)
rmse_lr = np.sqrt(mean_squared_error(y_test, y_pred_lr))

print("\\n1️⃣  Linear Regression:")
print(f"   R² Score: {r2_lr:.4f}")
print(f"   RMSE: {rmse_lr:.4f} energy points")

# Model 2: Random Forest (more complex, can capture non-linear patterns)
model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
model_rf.fit(X_train, y_train)
y_pred_rf = model_rf.predict(X_test)
r2_rf = r2_score(y_test, y_pred_rf)
rmse_rf = np.sqrt(mean_squared_error(y_test, y_pred_rf))

print("\\n2️⃣  Random Forest:")
print(f"   R² Score: {r2_rf:.4f}")
print(f"   RMSE: {rmse_rf:.4f} energy points")

if r2_rf > r2_lr:
    print("\\n   ✅ Random Forest performs better!")
    print("   → Health patterns are non-linear (expected!)")
    best_model = model_rf
    best_pred = y_pred_rf
else:
    print("\\n   ✅ Linear model is sufficient!")
    best_model = model_lr
    best_pred = y_pred_lr

# ===== STEP 5: Feature Importance =====
print("\\n🔍 STEP 5: What Matters Most for Energy?")
print("-" * 70)

if hasattr(best_model, 'feature_importances_'):
    importance = pd.DataFrame({
        'feature': feature_cols,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)

    print("\\nTop factors affecting your energy:")
    for idx, row in importance.head(5).iterrows():
        print(f"   {row['feature']:25s}: {row['importance']*100:5.2f}%")
else:
    # For linear regression, use coefficients
    coefficients = pd.DataFrame({
        'feature': feature_cols,
        'coefficient': best_model.coef_
    }).sort_values('coefficient', ascending=False, key=abs)

    print("\\nTop factors affecting your energy:")
    for idx, row in coefficients.head(5).iterrows():
        impact = "↑ Increases" if row['coefficient'] > 0 else "↓ Decreases"
        print(f"   {row['feature']:25s}: {impact} energy")

# ===== STEP 6: Actionable Insights =====
print("\\n💡 STEP 6: Actionable Recommendations")
print("-" * 70)

# Calculate optimal conditions from training data
optimal_conditions = X_train[y_train == y_train.max()].iloc[0]

print("\\n🌟 Your BEST day profile (from historical data):")
print(f"   Sleep: {optimal_conditions['sleep_hours']:.1f} hours")
print(f"   Workout: {optimal_conditions['workout_mins']:.0f} minutes")
print(f"   Water: {optimal_conditions['water_liters']:.1f} liters")
print(f"   Screen before bed: {optimal_conditions['screen_before_bed_mins']:.0f} min")
print(f"   Stress level: {optimal_conditions['stress_level']:.1f}/10")
print(f"   Meal quality: {optimal_conditions['meal_quality_score']:.1f}/10")

# ===== STEP 7: Tomorrow's Prediction =====
print("\\n🔮 STEP 7: Predict Tomorrow's Energy")
print("-" * 70)

print("\\nToday's stats:")
today = {
    'sleep_hours': 6.5,
    'workout_mins': 30,
    'water_liters': 1.8,
    'screen_before_bed_mins': 90,
    'stress_level': 7,
    'meal_quality_score': 6
}

for key, value in today.items():
    print(f"   {key}: {value}")

# Calculate derived features
today['sleep_quality'] = today['sleep_hours'] - (today['screen_before_bed_mins'] / 60)
today['exercise_hydration'] = today['workout_mins'] * today['water_liters'] / 100
today['wellness_score'] = today['meal_quality_score'] - today['stress_level']

today_features = np.array([[today[col] for col in feature_cols]])
predicted_energy = best_model.predict(today_features)[0]

print(f"\\n   Predicted energy tomorrow: {predicted_energy:.1f}/10")

if predicted_energy < 5:
    print("   ⚠️  LOW energy predicted!")
    print("\\n   💪 Recommendations:")
    print("      • Aim for 8+ hours sleep tonight")
    print("      • Reduce screen time before bed (<30min)")
    print("      • Stay hydrated (2.5L+ water)")
    print("      • Light workout tomorrow (30min)")
elif predicted_energy < 7:
    print("   😐 MEDIUM energy predicted")
    print("\\n   💪 To boost it:")
    print("      • Sleep 7-8 hours")
    print("      • 45min workout")
    print("      • Manage stress (meditation?)")
else:
    print("   ✅ HIGH energy predicted!")
    print("   → Great day for intense workout or important tasks!")

# ===== VISUALIZATION =====
fig, axes = plt.subplots(2, 2, figsize=(15, 12))

# Top left: Actual vs Predicted
axes[0, 0].scatter(y_test, best_pred, alpha=0.6)
axes[0, 0].plot([y_test.min(), y_test.max()],
               [y_test.min(), y_test.max()],
               'r--', linewidth=2)
axes[0, 0].set_xlabel('Actual Energy Level', fontsize=11)
axes[0, 0].set_ylabel('Predicted Energy Level', fontsize=11)
axes[0, 0].set_title('Energy Prediction Accuracy', fontsize=13, fontweight='bold')
axes[0, 0].grid(True, alpha=0.3)

# Top right: Sleep vs Energy
axes[0, 1].scatter(df['sleep_hours'], df['energy_level'], alpha=0.5, s=30)
z = np.polyfit(df['sleep_hours'], df['energy_level'], 1)
p = np.poly1d(z)
axes[0, 1].plot(df['sleep_hours'].sort_values(),
               p(df['sleep_hours'].sort_values()),
               "r-", linewidth=2, label=f'Trend')
axes[0, 1].set_xlabel('Sleep Hours', fontsize=11)
axes[0, 1].set_ylabel('Energy Level', fontsize=11)
axes[0, 1].set_title('Sleep Impact on Energy', fontsize=13, fontweight='bold')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

# Bottom left: Workout vs Energy
workout_groups = df.groupby('workout_mins')['energy_level'].mean()
axes[1, 0].bar(workout_groups.index, workout_groups.values, color='skyblue', alpha=0.7)
axes[1, 0].set_xlabel('Workout Duration (minutes)', fontsize=11)
axes[1, 0].set_ylabel('Average Energy Level', fontsize=11)
axes[1, 0].set_title('Exercise Impact on Energy', fontsize=13, fontweight='bold')
axes[1, 0].grid(True, alpha=0.3, axis='y')

# Bottom right: Feature Importance
if hasattr(best_model, 'feature_importances_'):
    importance_plot = importance.head(6)
    axes[1, 1].barh(importance_plot['feature'], importance_plot['importance'], color='coral')
    axes[1, 1].set_xlabel('Importance', fontsize=11)
    axes[1, 1].set_title('What Matters Most for Energy?', fontsize=13, fontweight='bold')
    axes[1, 1].grid(True, alpha=0.3, axis='x')

plt.tight_layout()
plt.savefig('health_energy_prediction.png', dpi=150, bbox_inches='tight')
print("\\n✅ Visualization saved: health_energy_prediction.png")

print("\\n" + "="*70)
print("🎉 YOU BUILT AN AI HEALTH COACH!")
print("="*70)
print("\\nWhat you can do with this:")
print("   • Optimize sleep for maximum energy")
print("   • Plan workouts on predicted high-energy days")
print("   • Understand personal health patterns")
print("   • Make data-driven wellness decisions")
print("\\n💡 This is REAL machine learning applied to YOUR life!")
print("   Not abstract exercises - actual tools you'll use daily.")
`
  };

  const allParts = [part1Content, part2Content, part3Content];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const runOriginStory = () => {
    setIsStoryRunning(true);
    setStoryStep(0);
    setShowStoryDetails(true);

    const interval = setInterval(() => {
      setStoryStep((prev) => {
        if (prev >= storyChapters.length - 1) {
          setIsStoryRunning(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3500);
  };

  const resetStory = () => {
    setStoryStep(-1);
    setIsStoryRunning(false);
    setShowStoryDetails(false);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/machine-learning')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Course
              </Button>
              <div className="w-px h-6 bg-border" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Introduction to Scikit-learn
                </h1>
                <p className="text-sm text-muted-foreground">Session 30: How Machines Learn to Predict</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                <Brain className="w-3 h-3 mr-1" />
                ML Foundations
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                <Calculator className="w-3 h-3 mr-1" />
                Math + Code
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Origin Story Section */}
        <section className="mb-12">
          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <Target className="w-5 h-5" />
                    The Need Came First - Not the Tool
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    How David Cournapeau's PhD struggles gave birth to sklearn - and changed Python forever
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={runOriginStory}
                    disabled={isStoryRunning}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {isStoryRunning ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Begin Journey
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetStory}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {showStoryDetails && (
                <div className="space-y-4">
                  {storyChapters.map((chapter, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-500 ${
                        index <= storyStep
                          ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 opacity-100'
                          : 'bg-muted/20 border-muted opacity-30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= storyStep ? 'bg-orange-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{chapter.title}</h4>
                          <p className="text-muted-foreground mb-2">{chapter.content}</p>
                          {index <= storyStep && (
                            <p className="text-sm bg-orange-100 dark:bg-orange-900/30 p-3 rounded italic">
                              {chapter.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!showStoryDetails && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Click "Begin Journey" to discover how sklearn emerged from real scientific needs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* The 3 Parts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">The Complete Journey: From Math to Models</h2>
              <p className="text-muted-foreground">3 parts that transform you from learner to ML practitioner</p>
            </div>
          </div>

          <div className="grid gap-6">
            {allParts.map((part, index) => (
              <Card key={index} className="border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <Lightbulb className="w-5 h-5" />
                    {part.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {part.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger value="explanation">Real World</TabsTrigger>
                      <TabsTrigger value="practice">Practice</TabsTrigger>
                    </TabsList>

                    <TabsContent value="code" className="space-y-4">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCode(part.code)}
                          className="absolute top-2 right-2 z-10"
                        >
                          {copiedCode === part.code ? (
                            <span className="text-green-600 text-xs">Copied!</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                          <pre className="text-green-400 text-sm">
                            <code>{part.code}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="explanation" className="space-y-4">
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                          <p className="text-amber-700 dark:text-amber-300">{part.realWorld}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="practice" className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            💡 Your Turn - Apply to YOUR Projects:
                          </h5>
                          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                            {index === 0 && (
                              <>
                                <li>• Implement gradient descent for a simple loss function</li>
                                <li>• Calculate cosine similarity between your music preferences and friends'</li>
                                <li>• Compare Euclidean vs Manhattan distance for route planning</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>• Build a car price predictor using local market data</li>
                                <li>• Predict rent prices in your city based on location and size</li>
                                <li>• Analyze which features matter most for prices in your area</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>• Track your own health data and predict tomorrow's energy</li>
                                <li>• Build a model for optimal workout timing based on sleep</li>
                                <li>• Predict mood from daily habits (sleep, exercise, nutrition)</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Real Impact Projects */}
        <section className="mb-12">
          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Target className="w-5 h-5" />
                🎯 Real Impact Projects: ML for YOUR Life
              </CardTitle>
              <CardDescription className="text-lg">
                These models solve actual problems in your health and finances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-600" />
                    Personal Finance Optimizer
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Predict fair apartment prices, avoid overpaying, optimize investment decisions using ML models trained on real market data.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>House price prediction → Save thousands on property</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Expense category prediction → Auto-categorize spending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Investment forecasting → Data-driven portfolio decisions</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Health Intelligence System
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Predict energy levels, optimize sleep and workout timing, understand personal health patterns with machine learning.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Energy prediction → Plan high-performance days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Sleep optimization → Wake up refreshed consistently</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Workout timing → Exercise when you'll perform best</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
                <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  🚀 The sklearn Philosophy:
                </h5>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You're not memorizing functions. You're learning <strong>the science of prediction</strong>.
                  Every model follows the same pattern: <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">fit()</code> to learn,
                  <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded mx-1">predict()</code> to apply,
                  <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">score()</code> to evaluate.
                  Master this once, use it everywhere.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Session Complete */}
        <section className="mb-12">
          <Card className="border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-3">
                  🎓 Session 30 Complete: Welcome to Machine Learning!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  You've crossed the threshold. Not by memorizing sklearn functions, but by understanding
                  the mathematics, philosophy, and real-world applications that make machines learn.
                </p>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">🧠 What You Mastered:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Derivatives & gradient descent</li>
                      <li>• Cosine similarity & distance metrics</li>
                      <li>• Train-test split methodology</li>
                      <li>• Linear regression from scratch</li>
                      <li>• Model evaluation (RMSE, R², MAE)</li>
                      <li>• Feature engineering & importance</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">💼 Real Applications Built:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• House price predictor</li>
                      <li>• Energy level forecaster</li>
                      <li>• Health pattern analyzer</li>
                      <li>• Feature importance decoder</li>
                      <li>• Model comparison framework</li>
                      <li>• Gradient descent visualizer</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg max-w-3xl mx-auto">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold">
                    "Machine Learning is not about libraries - it's about teaching computers to learn from experience, just like humans do."
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    You're not a tool user. You're a machine learning engineer. 🎯
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Button variant="outline" onClick={() => navigate('/machine-learning')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Machine Learning Overview
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Session 30 Complete</Badge>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              Continue to Session 31
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SklearnSession30;
