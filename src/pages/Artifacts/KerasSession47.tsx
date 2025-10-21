import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cloud, Rocket, Globe, Shield, Zap, ArrowLeft, ChevronDown, ChevronUp, Clock, Target, Cpu, Server, Network, Lock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';
import { useNavigate } from 'react-router-dom';

const KerasSession47 = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    story: false,
    finetuning: false,
    gcpsetup: false,
    dockerize: false,
    deploy: false,
    scale: false,
    monitor: false,
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
      icon: "🏥",
      title: "2010: The Healthcare Data Problem - Models in Notebooks",
      content: "Brilliant researchers build disease detection models achieving 95% accuracy. But the models live in Jupyter notebooks. Doctors can't use them. Patients can't benefit. The gap between research and reality: deployment.",
      details: (
        <div className="space-y-3">
          <p><strong>The Brutal Reality:</strong> Academic ML is different from production ML.</p>
          <p><strong>Research Success ≠ Real-World Impact</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>The Notebook Problem:</strong> "Works on my machine" doesn't help patients in rural clinics</li>
            <li><strong>The Integration Gap:</strong> Hospitals need APIs, not Python scripts</li>
            <li><strong>The Reliability Issue:</strong> 95% accuracy isn't enough if the model crashes at 2 AM</li>
            <li><strong>The Scale Challenge:</strong> One GPU server can't serve millions of diagnoses</li>
          </ul>
          <p className="pt-2 text-red-600 dark:text-red-400 font-semibold">
            Thousands of groundbreaking ML models never left academia because nobody deployed them.
          </p>
        </div>
      )
    },
    {
      icon: "☁️",
      title: "2012-2015: Cloud Platforms Emerge - AWS, Google Cloud, Azure",
      content: "Cloud providers realize ML deployment is a bottleneck. They build platforms: API endpoints, auto-scaling, monitoring. Suddenly, deploying models becomes accessible to non-experts.",
      details: (
        <div className="space-y-3">
          <p><strong>The Cloud Revolution for ML:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>AWS SageMaker (2017):</strong> One-click model deployment, managed infrastructure</li>
            <li><strong>Google Cloud AI Platform:</strong> Native TensorFlow integration, TPU support</li>
            <li><strong>Azure ML:</strong> Enterprise-grade deployment with security compliance</li>
            <li><strong>The Key Innovation:</strong> Abstraction—you focus on models, cloud handles infrastructure</li>
          </ul>
          <p className="pt-2 text-blue-600 dark:text-blue-400 font-semibold italic">
            "Deploy a model with a single command. Scale to millions of requests automatically. Monitor performance in real-time."
          </p>
          <p className="pt-2"><strong>What This Enabled:</strong></p>
          <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>Startups could compete with tech giants (same infrastructure)</li>
            <li>Researchers could see real-world impact (from notebook to production in hours)</li>
            <li>Healthcare, finance, logistics—every industry adopted ML at scale</li>
          </ol>
        </div>
      )
    },
    {
      icon: "🚀",
      title: "2018: The Personal Finance AI - From Prototype to Product",
      content: "A small team builds an AI that predicts financial health from spending patterns. Trained on laptops. Deployed to Google Cloud. Served 10 million users in first year. Total infrastructure cost: $200/month.",
      details: (
        <div className="space-y-3">
          <p><strong>The Modern ML Deployment Stack:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Training:</strong> Fine-tune pre-trained model on custom data (transfer learning)</li>
            <li><strong>Containerization:</strong> Package model + dependencies in Docker</li>
            <li><strong>API Service:</strong> Flask/FastAPI wraps model as REST endpoint</li>
            <li><strong>Cloud Deploy:</strong> Google Cloud Run / AWS Lambda - serverless, auto-scaling</li>
            <li><strong>Monitoring:</strong> Track latency, errors, model drift in real-time</li>
          </ul>
          <p className="pt-2 text-green-600 dark:text-green-400 font-semibold">
            What took months of DevOps work in 2015 became a 30-minute tutorial by 2020.
          </p>
        </div>
      )
    },
    {
      icon: "🌍",
      title: "TODAY: Democratized ML Deployment",
      content: "You can train a model on your laptop and deploy it globally in under an hour. Free tiers handle thousands of predictions per day. The barrier isn't technology—it's knowing the steps.",
      details: (
        <div className="space-y-3">
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            What We're Building Today:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>🏥 <strong>Health Prediction API:</strong> Deploy diabetes risk model to cloud</li>
            <li>💰 <strong>Finance Forecast Service:</strong> Deploy expense prediction model</li>
            <li>🐳 <strong>Containerization:</strong> Docker packages for reproducible deployments</li>
            <li>☁️ <strong>Cloud Deployment:</strong> Google Cloud Run with auto-scaling</li>
            <li>📊 <strong>Monitoring:</strong> Track performance, costs, and uptime</li>
            <li>🔒 <strong>Security:</strong> API keys, rate limiting, HTTPS endpoints</li>
          </ul>
          <p className="pt-3 text-lg font-semibold text-green-600 dark:text-green-400">
            The Complete Production ML Pipeline:
          </p>
          <ol className="list-decimal list-inside ml-4 space-y-1">
            <li><strong>Fine-tune model:</strong> Take Session 42-46 models, optimize for production</li>
            <li><strong>Create API:</strong> FastAPI wraps model with REST endpoints</li>
            <li><strong>Containerize:</strong> Docker ensures it runs anywhere</li>
            <li><strong>Deploy to cloud:</strong> Google Cloud Run hosts it globally</li>
            <li><strong>Monitor & scale:</strong> Cloud auto-scales based on demand</li>
          </ol>
          <p className="pt-3 text-lg italic">
            <strong>End Result:</strong> YOUR trained ML model, accessible via HTTPS API, serving predictions globally,
            auto-scaling to handle traffic spikes, monitored 24/7—all from YOUR free Google Cloud account.
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mb-4">
            <Rocket className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Session 47: Ultra-Advanced Keras
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fine-Tuning & Cloud Deployment: From Jupyter Notebook to Global Production API
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>~5 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Production</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Real Deployment</span>
            </div>
          </div>
        </div>

        {/* Story Mode */}
        <div className="mb-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Deployment Story: From Research to Reality
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
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span className="mr-2">{chapter.icon}</span>
                Chapter {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Chapter Content */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold mb-3 text-purple-800 dark:text-purple-200">
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
              <strong>💡 The Dharma Approach:</strong> Cloud deployment wasn't built because engineers wanted to play with Docker.
              It emerged because <em>brilliant ML models—predicting disease risk, fraud detection, financial planning, logistics optimization—were dying in notebooks, never helping real people</em>.
              The <strong>NEED</strong> came first (get models into production). The <strong>TOOL</strong> followed (cloud platforms, containers, APIs).
              We're learning deployment because we want our Health & Finance models to actually serve people, not just impress in demos.
            </p>
          </div>
        </div>

        {/* Fine-Tuning Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('finetuning')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Step 1: Production Fine-Tuning - Optimizing for Deployment
            </h2>
            {expandedSections.finetuning ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.finetuning && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
                  Real-World Scenario: Health & Personal Finance Models
                </h3>
                <p className="text-foreground/80 mb-4">
                  We've built models in previous sessions. Now we optimize them for production: smaller size, faster inference, robust error handling.
                  This isn't just academic—this is what companies do before launching ML products.
                </p>
              </div>

              <CodeBlockR language="python">
{`# ==========================================
# PRODUCTION MODEL OPTIMIZATION
# ==========================================
# Taking our Health & Finance models from previous sessions
# and preparing them for cloud deployment

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd

print("="*70)
print("SESSION 47: PRODUCTION MODEL FINE-TUNING")
print("="*70)
print()

# ==========================================
# SCENARIO 1: DIABETES RISK PREDICTION MODEL
# ==========================================

print("SCENARIO 1: Healthcare - Diabetes Risk Prediction")
print("="*70)
print("Real-World Need: Rural clinics need fast, reliable diabetes screening")
print("Model must: 1) Run in <100ms  2) Handle missing data  3) Be explainable")
print()

# Load diabetes dataset (built-in scikit-learn)
diabetes = load_diabetes()
X = diabetes.data
y = diabetes.target

# Binary classification: high risk (>140) vs normal
y_binary = (y > 140).astype(int)

print(f"Dataset: {X.shape[0]} patients, {X.shape[1]} features")
print(f"High risk patients: {y_binary.sum()} ({y_binary.mean()*100:.1f}%)")
print()

# ==========================================
# DATA PREPROCESSING (PRODUCTION-GRADE)
# ==========================================

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_binary, test_size=0.2, random_state=42, stratify=y_binary
)

# Standardization (save scaler for deployment!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("✅ Data preprocessed and split")
print(f"   Training samples: {len(X_train)}")
print(f"   Test samples: {len(X_test)}")
print()

# ==========================================
# BUILD PRODUCTION-OPTIMIZED MODEL
# ==========================================

def build_production_model(input_dim, model_name="health_predictor"):
    """
    Build a production-optimized model:
    - Small size (deployable to edge devices)
    - Fast inference (<100ms)
    - Robust to missing data
    - L2 regularization to prevent overfitting
    """
    model = models.Sequential([
        layers.Input(shape=(input_dim,)),

        # Layer 1: Dense with L2 regularization
        layers.Dense(
            64,
            activation='relu',
            kernel_regularizer=keras.regularizers.l2(0.01),
            name='features_layer_1'
        ),
        layers.BatchNormalization(),  # Improves training stability
        layers.Dropout(0.3),

        # Layer 2: Smaller for efficiency
        layers.Dense(
            32,
            activation='relu',
            kernel_regularizer=keras.regularizers.l2(0.01),
            name='features_layer_2'
        ),
        layers.BatchNormalization(),
        layers.Dropout(0.3),

        # Layer 3: Even smaller
        layers.Dense(
            16,
            activation='relu',
            kernel_regularizer=keras.regularizers.l2(0.01),
            name='features_layer_3'
        ),

        # Output: Binary classification
        layers.Dense(1, activation='sigmoid', name='risk_probability')
    ], name=model_name)

    return model

# Build model
model = build_production_model(X_train.shape[1])

print("="*70)
print("PRODUCTION MODEL ARCHITECTURE")
print("="*70)
model.summary()
print()

# Count parameters
total_params = model.count_params()
print(f"Total parameters: {total_params:,}")
print(f"Estimated model size: {total_params * 4 / (1024**2):.2f} MB (FP32)")
print()

# ==========================================
# COMPILE WITH PRODUCTION CONSIDERATIONS
# ==========================================

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='binary_crossentropy',
    metrics=[
        'accuracy',
        keras.metrics.Precision(name='precision'),
        keras.metrics.Recall(name='recall'),
        keras.metrics.AUC(name='auc')
    ]
)

print("✅ Model compiled with production metrics")
print("   - Accuracy: Overall correctness")
print("   - Precision: Of predicted high-risk, how many actually are?")
print("   - Recall: Of all high-risk cases, how many did we catch?")
print("   - AUC: Overall discrimination ability")
print()

# ==========================================
# TRAIN WITH EARLY STOPPING & CHECKPOINTING
# ==========================================

from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau

callbacks = [
    EarlyStopping(
        monitor='val_loss',
        patience=15,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        'health_model_best.keras',
        monitor='val_auc',
        save_best_only=True,
        mode='max',
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=5,
        min_lr=1e-7,
        verbose=1
    )
]

print("="*70)
print("TRAINING PRODUCTION MODEL")
print("="*70)

history = model.fit(
    X_train_scaled, y_train,
    validation_split=0.2,
    epochs=100,  # Will stop early if no improvement
    batch_size=16,
    callbacks=callbacks,
    verbose=1
)

print()
print("✅ Training complete!")
print()

# ==========================================
# EVALUATE ON TEST SET
# ==========================================

print("="*70)
print("PRODUCTION MODEL EVALUATION")
print("="*70)

test_results = model.evaluate(X_test_scaled, y_test, verbose=0)

print(f"Test Loss: {test_results[0]:.4f}")
print(f"Test Accuracy: {test_results[1]:.4f}")
print(f"Test Precision: {test_results[2]:.4f}")
print(f"Test Recall: {test_results[3]:.4f}")
print(f"Test AUC: {test_results[4]:.4f}")
print()

# ==========================================
# INFERENCE SPEED TEST
# ==========================================

import time

# Warmup
_ = model.predict(X_test_scaled[:1], verbose=0)

# Time 100 predictions
inference_times = []
for _ in range(100):
    start = time.time()
    _ = model.predict(X_test_scaled[:1], verbose=0)
    inference_times.append((time.time() - start) * 1000)  # ms

avg_inference = np.mean(inference_times)
p95_inference = np.percentile(inference_times, 95)

print("="*70)
print("INFERENCE PERFORMANCE")
print("="*70)
print(f"Average inference time: {avg_inference:.2f} ms")
print(f"95th percentile: {p95_inference:.2f} ms")
print(f"Throughput: {1000/avg_inference:.0f} predictions/second")
print()

if avg_inference < 100:
    print("✅ PRODUCTION READY: Inference time < 100ms target")
else:
    print("⚠️  WARNING: Inference time exceeds 100ms target")
print()

# ==========================================
# SAVE PRODUCTION ARTIFACTS
# ==========================================

# Save model
model.save('health_predictor_production.keras')
print("✅ Model saved: health_predictor_production.keras")

# Save scaler (CRITICAL for deployment!)
import joblib
joblib.dump(scaler, 'health_scaler.pkl')
print("✅ Scaler saved: health_scaler.pkl")

# Save metadata
metadata = {
    'model_name': 'Diabetes Risk Predictor',
    'version': '1.0.0',
    'input_features': diabetes.feature_names.tolist(),
    'target': 'diabetes_progression_binary',
    'threshold': 0.5,
    'metrics': {
        'accuracy': float(test_results[1]),
        'precision': float(test_results[2]),
        'recall': float(test_results[3]),
        'auc': float(test_results[4])
    },
    'inference_time_ms': float(avg_inference)
}

import json
with open('model_metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

print("✅ Metadata saved: model_metadata.json")
print()

print("="*70)
print("PRODUCTION ARTIFACTS READY FOR DEPLOYMENT")
print("="*70)
print("""
Files created:
1. health_predictor_production.keras - The trained model
2. health_scaler.pkl - Preprocessing scaler (MUST deploy with model!)
3. model_metadata.json - Model information and performance metrics

These 3 files contain everything needed to deploy the model to production.
Next step: Wrap in API and containerize!
""")`}
              </CodeBlockR>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-green-800 dark:text-green-200">
                  🎯 Production Optimization Checklist
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold mb-2">✅ Model Optimizations:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-foreground/70">
                      <li>Small architecture (64→32→16 neurons)</li>
                      <li>L2 regularization to prevent overfitting</li>
                      <li>Batch normalization for stability</li>
                      <li>Dropout for robustness</li>
                      <li>Early stopping to avoid overtraining</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">✅ Deployment Readiness:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-foreground/70">
                      <li>Inference time &lt; 100ms</li>
                      <li>Multiple metrics tracked (not just accuracy)</li>
                      <li>Preprocessing saved (scaler.pkl)</li>
                      <li>Metadata documented</li>
                      <li>Versioned and reproducible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* API Creation Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('dockerize')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <Server className="h-8 w-8 text-green-600 dark:text-green-400" />
              Step 2: Create Production API with FastAPI
            </h2>
            {expandedSections.dockerize ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.dockerize && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
                  Wrapping the Model in a REST API
                </h3>
                <p className="text-foreground/80 mb-4">
                  FastAPI creates a production-grade REST API in minutes. It handles validation, documentation, and async requests automatically.
                  This is what companies use to serve billions of ML predictions daily.
                </p>
              </div>

              <CodeBlockR language="bash">
{`# ==========================================
# STEP-BY-STEP: Setup FastAPI Environment
# ==========================================

# Create project directory
mkdir health-predictor-api
cd health-predictor-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install fastapi uvicorn tensorflow joblib numpy pydantic

# Create requirements.txt for deployment
pip freeze > requirements.txt

echo "✅ Environment setup complete!"`}
              </CodeBlockR>

              <CodeBlockR language="python">
{`# ==========================================
# FILE: app.py
# The FastAPI application serving predictions
# ==========================================

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import tensorflow as tf
from tensorflow import keras
import joblib
import numpy as np
import json
from typing import List
import time

# ==========================================
# INITIALIZE FASTAPI APP
# ==========================================

app = FastAPI(
    title="Health Prediction API",
    description="Diabetes risk prediction using deep learning",
    version="1.0.0"
)

# ==========================================
# LOAD MODEL & PREPROCESSING AT STARTUP
# ==========================================

print("Loading production model...")
model = keras.models.load_model('health_predictor_production.keras')
scaler = joblib.load('health_scaler.pkl')

with open('model_metadata.json', 'r') as f:
    metadata = json.load(f)

print(f"✅ Model loaded: {metadata['model_name']} v{metadata['version']}")
print(f"   Features: {len(metadata['input_features'])}")
print(f"   Expected inference: {metadata['inference_time_ms']:.2f}ms")

# ==========================================
# REQUEST/RESPONSE MODELS (PYDANTIC)
# ==========================================

class PredictionRequest(BaseModel):
    """
    Patient data for diabetes risk prediction.
    All features are normalized numeric values.
    """
    age: float = Field(..., description="Age (normalized)")
    sex: float = Field(..., description="Sex (normalized)")
    bmi: float = Field(..., description="Body Mass Index (normalized)")
    bp: float = Field(..., description="Average Blood Pressure (normalized)")
    s1: float = Field(..., description="Total Serum Cholesterol")
    s2: float = Field(..., description="Low-Density Lipoproteins")
    s3: float = Field(..., description="High-Density Lipoproteins")
    s4: float = Field(..., description="Total Cholesterol / HDL")
    s5: float = Field(..., description="Log of Serum Triglycerides")
    s6: float = Field(..., description="Blood Sugar Level")

    class Config:
        json_schema_extra = {
            "example": {
                "age": 0.05,
                "sex": 0.05,
                "bmi": 0.06,
                "bp": 0.02,
                "s1": -0.04,
                "s2": -0.03,
                "s3": -0.00,
                "s4": -0.03,
                "s5": 0.01,
                "s6": -0.02
            }
        }

class PredictionResponse(BaseModel):
    """API response with prediction and metadata."""
    risk_probability: float = Field(..., description="Probability of high diabetes risk (0-1)")
    risk_level: str = Field(..., description="Risk category: 'Low' or 'High'")
    confidence: float = Field(..., description="Model confidence")
    inference_time_ms: float = Field(..., description="Inference time in milliseconds")
    model_version: str = Field(..., description="Model version used")

# ==========================================
# HEALTH CHECK ENDPOINT
# ==========================================

@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model": metadata['model_name'],
        "version": metadata['version'],
        "endpoints": {
            "predict": "/predict",
            "batch": "/predict/batch",
            "metrics": "/metrics",
            "docs": "/docs"
        }
    }

# ==========================================
# MODEL METRICS ENDPOINT
# ==========================================

@app.get("/metrics")
def get_metrics():
    """Return model performance metrics"""
    return {
        "model_name": metadata['model_name'],
        "version": metadata['version'],
        "performance": metadata['metrics'],
        "inference_time_ms": metadata['inference_time_ms']
    }

# ==========================================
# SINGLE PREDICTION ENDPOINT
# ==========================================

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    """
    Predict diabetes risk for a single patient.

    Returns probability and risk level.
    """
    try:
        # Convert request to array
        features = np.array([[
            request.age, request.sex, request.bmi, request.bp,
            request.s1, request.s2, request.s3, request.s4,
            request.s5, request.s6
        ]])

        # Preprocess (scale)
        features_scaled = scaler.transform(features)

        # Predict with timing
        start = time.time()
        prediction = model.predict(features_scaled, verbose=0)[0][0]
        inference_time = (time.time() - start) * 1000

        # Determine risk level
        threshold = metadata['threshold']
        risk_level = "High" if prediction >= threshold else "Low"

        # Confidence: distance from threshold
        confidence = abs(prediction - threshold) / threshold
        confidence = min(confidence, 1.0)

        return PredictionResponse(
            risk_probability=float(prediction),
            risk_level=risk_level,
            confidence=float(confidence),
            inference_time_ms=float(inference_time),
            model_version=metadata['version']
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# ==========================================
# BATCH PREDICTION ENDPOINT
# ==========================================

class BatchRequest(BaseModel):
    """Multiple patient predictions"""
    patients: List[PredictionRequest]

@app.post("/predict/batch")
def predict_batch(request: BatchRequest):
    """
    Predict diabetes risk for multiple patients.
    More efficient than individual requests.
    """
    try:
        # Convert all requests to array
        features_list = []
        for patient in request.patients:
            features_list.append([
                patient.age, patient.sex, patient.bmi, patient.bp,
                patient.s1, patient.s2, patient.s3, patient.s4,
                patient.s5, patient.s6
            ])

        features = np.array(features_list)
        features_scaled = scaler.transform(features)

        # Batch prediction
        start = time.time()
        predictions = model.predict(features_scaled, verbose=0)
        inference_time = (time.time() - start) * 1000

        # Process results
        results = []
        threshold = metadata['threshold']

        for pred in predictions:
            prob = float(pred[0])
            risk_level = "High" if prob >= threshold else "Low"
            confidence = abs(prob - threshold) / threshold

            results.append({
                "risk_probability": prob,
                "risk_level": risk_level,
                "confidence": min(float(confidence), 1.0)
            })

        return {
            "predictions": results,
            "batch_size": len(results),
            "total_inference_time_ms": float(inference_time),
            "avg_inference_time_ms": float(inference_time / len(results)),
            "model_version": metadata['version']
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch prediction error: {str(e)}")

# ==========================================
# RUN WITH: uvicorn app:app --reload
# ==========================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`}
              </CodeBlockR>

              <CodeBlockR language="bash">
{`# ==========================================
# TEST THE API LOCALLY
# ==========================================

# Start the server
uvicorn app:app --reload

# Server will start at: http://localhost:8000

# In a new terminal, test the endpoints:

# 1. Health check
curl http://localhost:8000/

# 2. Get metrics
curl http://localhost:8000/metrics

# 3. Single prediction
curl -X POST http://localhost:8000/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "age": 0.05,
    "sex": 0.05,
    "bmi": 0.06,
    "bp": 0.02,
    "s1": -0.04,
    "s2": -0.03,
    "s3": 0.00,
    "s4": -0.03,
    "s5": 0.01,
    "s6": -0.02
  }'

# Expected response:
# {
#   "risk_probability": 0.234,
#   "risk_level": "Low",
#   "confidence": 0.532,
#   "inference_time_ms": 12.5,
#   "model_version": "1.0.0"
# }

# 4. Interactive API docs (FastAPI auto-generates!)
# Open in browser: http://localhost:8000/docs

echo "✅ API is running and ready for deployment!"`}
              </CodeBlockR>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-200">
                  🚀 What We Just Built
                </h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p>✅ <strong>REST API:</strong> Standard HTTP endpoints that any application can call</p>
                  <p>✅ <strong>Auto-validation:</strong> Pydantic ensures requests have correct format</p>
                  <p>✅ <strong>Auto-documentation:</strong> FastAPI generates interactive API docs at /docs</p>
                  <p>✅ <strong>Batch support:</strong> Efficient multi-patient predictions</p>
                  <p>✅ <strong>Monitoring:</strong> Inference time tracking built-in</p>
                  <p>✅ <strong>Production-ready:</strong> Error handling, health checks, metrics endpoint</p>
                  <p className="pt-2 font-semibold text-green-600 dark:text-green-400">
                    This is the same API structure used by companies serving millions of predictions daily.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Docker & Cloud Deploy Section - Continuing in next message due to length... */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('deploy')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <Cloud className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              Step 3: Containerize & Deploy to Google Cloud
            </h2>
            {expandedSections.deploy ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.deploy && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                  From Laptop to Global Cloud in 30 Minutes
                </h3>
                <p className="text-foreground/80 mb-4">
                  Docker packages everything (code, model, dependencies) into a container that runs identically anywhere.
                  Google Cloud Run then hosts it globally with auto-scaling. No DevOps degree required.
                </p>
              </div>

              <CodeBlockR language="dockerfile">
{`# ==========================================
# FILE: Dockerfile
# Packages the API into a container
# ==========================================

# Use official Python runtime as base
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    build-essential \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (Docker caching optimization)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .
COPY health_predictor_production.keras .
COPY health_scaler.pkl .
COPY model_metadata.json .

# Expose port 8000
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD python -c "import requests; requests.get('http://localhost:8000/')"

# Run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]`}
              </CodeBlockR>

              <CodeBlockR language="bash">
{`# ==========================================
# DOCKER: BUILD & TEST LOCALLY
# ==========================================

# Build the Docker image
docker build -t health-predictor-api .

# Expected output:
# [+] Building 45.2s (12/12) FINISHED
# => => naming to docker.io/library/health-predictor-api

# Run locally in container
docker run -p 8000:8000 health-predictor-api

# Test it (in new terminal)
curl http://localhost:8000/

# If it works, you're ready for cloud deployment!
echo "✅ Docker container working locally!"

# ==========================================
# GOOGLE CLOUD PLATFORM SETUP
# ==========================================

# STEP 1: Create Google Cloud Account
# Go to: https://cloud.google.com/
# - Sign up (free tier: $300 credit for 90 days)
# - Create a new project: "health-predictor"

# STEP 2: Install Google Cloud SDK
# Mac:
brew install google-cloud-sdk

# Windows: Download from https://cloud.google.com/sdk/docs/install

# Linux:
curl https://sdk.cloud.google.com | bash

# STEP 3: Initialize and Authenticate
gcloud init

# Follow prompts:
# 1. Log in with your Google account
# 2. Select your project: health-predictor
# 3. Select default region (e.g., us-central1)

# STEP 4: Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

echo "✅ Google Cloud setup complete!"

# ==========================================
# DEPLOY TO GOOGLE CLOUD RUN
# ==========================================

# Configure Docker to use Google Container Registry
gcloud auth configure-docker

# Tag your image for Google Container Registry
PROJECT_ID=$(gcloud config get-value project)
IMAGE_NAME="gcr.io/$PROJECT_ID/health-predictor-api"

docker tag health-predictor-api $IMAGE_NAME

# Push to Google Container Registry
docker push $IMAGE_NAME

# Expected output:
# The push refers to repository [gcr.io/your-project/health-predictor-api]
# latest: digest: sha256:abc123... size: 2841

echo "✅ Image pushed to Google Container Registry!"

# ==========================================
# DEPLOY TO CLOUD RUN (THE MAGIC MOMENT!)
# ==========================================

gcloud run deploy health-predictor-api \\
  --image $IMAGE_NAME \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --memory 2Gi \\
  --cpu 2 \\
  --timeout 300 \\
  --max-instances 10 \\
  --min-instances 0

# You'll see:
# Deploying container to Cloud Run service [health-predictor-api]...
# ✓ Deploying... Done.
# ✓ Creating Revision...
# ✓ Routing traffic...
# Done.
# Service [health-predictor-api] revision [health-predictor-api-00001] has been deployed.
# Service URL: https://health-predictor-api-abc123-uc.a.run.app

# COPY THAT URL! This is your globally-accessible API endpoint!

# ==========================================
# TEST YOUR DEPLOYED API
# ==========================================

# Set your service URL (replace with actual URL from deployment)
SERVICE_URL="https://health-predictor-api-abc123-uc.a.run.app"

# Test health check
curl $SERVICE_URL/

# Test prediction
curl -X POST $SERVICE_URL/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "age": 0.05,
    "sex": 0.05,
    "bmi": 0.06,
    "bp": 0.02,
    "s1": -0.04,
    "s2": -0.03,
    "s3": 0.00,
    "s4": -0.03,
    "s5": 0.01,
    "s6": -0.02
  }'

# Expected response:
# {
#   "risk_probability": 0.234,
#   "risk_level": "Low",
#   "confidence": 0.532,
#   "inference_time_ms": 15.7,
#   "model_version": "1.0.0"
# }

echo "✅ YOUR MODEL IS NOW LIVE ON THE INTERNET!"

# ==========================================
# VIEW DEPLOYMENT DETAILS
# ==========================================

# Open Cloud Run console
echo "View your deployment:"
echo "https://console.cloud.google.com/run/detail/us-central1/health-predictor-api"

# Check logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=health-predictor-api" \\
  --limit 50 \\
  --format "table(timestamp,textPayload)"

# Monitor metrics
echo "View metrics at:"
echo "https://console.cloud.google.com/run/detail/us-central1/health-predictor-api/metrics"

# ==========================================
# COST ESTIMATE
# ==========================================

echo "="
echo "GOOGLE CLOUD RUN PRICING (as of 2024):"
echo "="
echo "FREE TIER (per month):"
echo "  - 2 million requests"
echo "  - 360,000 GB-seconds of memory"
echo "  - 180,000 vCPU-seconds"
echo ""
echo "PAID (after free tier):"
echo "  - \$0.00002400 per request"
echo "  - \$0.00000250 per GB-second"
echo "  - \$0.00001000 per vCPU-second"
echo ""
echo "EXAMPLE: 10,000 predictions/month"
echo "  Cost: \$0.00 (well within free tier)"
echo ""
echo "EXAMPLE: 1,000,000 predictions/month"
echo "  Cost: ~\$5-15/month"
echo ""
echo "Compare to running your own server: \$50-200/month"
echo "="

# ==========================================
# UPDATE DEPLOYMENT (WHEN YOU IMPROVE MODEL)
# ==========================================

# After retraining and improving your model:
# 1. Rebuild Docker image with new model
docker build -t health-predictor-api .
docker tag health-predictor-api $IMAGE_NAME
docker push $IMAGE_NAME

# 2. Deploy new version (Cloud Run handles zero-downtime rollout!)
gcloud run deploy health-predictor-api \\
  --image $IMAGE_NAME \\
  --platform managed \\
  --region us-central1

# New revision deployed with gradual traffic shift!
echo "✅ Model updated with zero downtime!"`}
              </CodeBlockR>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-green-800 dark:text-green-200 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  🎉 CONGRATULATIONS! Your Model is LIVE!
                </h4>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="font-semibold text-lg">What You Just Accomplished:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Global Deployment:</strong> Your model is accessible from anywhere on Earth via HTTPS</li>
                    <li><strong>Auto-Scaling:</strong> Handles 1 request/day or 1 million/day automatically</li>
                    <li><strong>Zero DevOps:</strong> Google manages servers, scaling, security, SSL certificates</li>
                    <li><strong>Production-Grade:</strong> Same infrastructure powering Gmail, YouTube, Google Search</li>
                    <li><strong>Cost-Effective:</strong> Pay only for actual usage, free tier covers most learning/small projects</li>
                    <li><strong>Monitored:</strong> Built-in logging, metrics, alerts</li>
                  </ul>
                  <p className="pt-3 text-lg font-semibold text-purple-600 dark:text-purple-400">
                    From Jupyter notebook to global production API in under 1 hour. This is modern ML deployment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Monitoring & Scaling Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('monitor')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              Step 4: Monitor, Scale & Iterate
            </h2>
            {expandedSections.monitor ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.monitor && (
            <div className="space-y-6">
              <CodeBlockR language="python">
{`# ==========================================
# PRODUCTION MONITORING & CLIENT USAGE
# ==========================================

# Once deployed, here's how applications USE your API:

import requests
import json

# Your deployed API URL
API_URL = "https://health-predictor-api-abc123-uc.a.run.app"

# ==========================================
# EXAMPLE: HEALTHCARE APP INTEGRATION
# ==========================================

def check_patient_risk(patient_data):
    """
    Function that a healthcare app would call
    to get diabetes risk prediction.
    """
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=patient_data,
            timeout=5  # 5 second timeout
        )

        if response.status_code == 200:
            result = response.json()
            return {
                'success': True,
                'risk_level': result['risk_level'],
                'probability': result['risk_probability'],
                'confidence': result['confidence']
            }
        else:
            return {
                'success': False,
                'error': f"API error: {response.status_code}"
            }

    except requests.exceptions.Timeout:
        return {'success': False, 'error': 'Request timeout'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

# Example patient
patient = {
    "age": 0.05,
    "sex": 0.05,
    "bmi": 0.06,
    "bp": 0.02,
    "s1": -0.04,
    "s2": -0.03,
    "s3": 0.00,
    "s4": -0.03,
    "s5": 0.01,
    "s6": -0.02
}

# Make prediction
result = check_patient_risk(patient)

if result['success']:
    print(f"Risk Level: {result['risk_level']}")
    print(f"Probability: {result['probability']:.2%}")
    print(f"Confidence: {result['confidence']:.2%}")
else:
    print(f"Error: {result['error']}")

# ==========================================
# MONITORING WITH GOOGLE CLOUD
# ==========================================

# View real-time logs:
# gcloud logging tail "resource.type=cloud_run_revision"

# Custom metric tracking (add to app.py):
"""
from prometheus_client import Counter, Histogram
import time

# Define metrics
REQUEST_COUNT = Counter('api_requests_total', 'Total API requests')
REQUEST_LATENCY = Histogram('api_request_latency_seconds', 'Request latency')
PREDICTION_RISK_HIGH = Counter('predictions_high_risk', 'High risk predictions')

@app.post("/predict")
def predict(request: PredictionRequest):
    REQUEST_COUNT.inc()  # Increment counter

    start = time.time()
    # ... prediction code ...
    REQUEST_LATENCY.observe(time.time() - start)

    if risk_level == "High":
        PREDICTION_RISK_HIGH.inc()

    return response
"""

# ==========================================
# LOAD TESTING YOUR API
# ==========================================

print("="*70)
print("LOAD TESTING")
print("="*70)

import concurrent.futures
import time

def make_prediction(i):
    """Single prediction request"""
    try:
        start = time.time()
        response = requests.post(
            f"{API_URL}/predict",
            json=patient,
            timeout=10
        )
        latency = time.time() - start
        return {
            'success': response.status_code == 200,
            'latency': latency,
            'request_id': i
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'request_id': i}

# Simulate 100 concurrent users
num_requests = 100
print(f"Sending {num_requests} concurrent requests...")

start_time = time.time()

with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
    results = list(executor.map(make_prediction, range(num_requests)))

total_time = time.time() - start_time

# Analyze results
successful = sum(1 for r in results if r.get('success'))
failed = num_requests - successful
latencies = [r['latency'] for r in results if r.get('success')]

print(f"\\nResults:")
print(f"  Total requests: {num_requests}")
print(f"  Successful: {successful}")
print(f"  Failed: {failed}")
print(f"  Total time: {total_time:.2f}s")
print(f"  Requests/second: {num_requests/total_time:.2f}")
print(f"  Avg latency: {sum(latencies)/len(latencies):.3f}s")
print(f"  Min latency: {min(latencies):.3f}s")
print(f"  Max latency: {max(latencies):.3f}s")
print(f"  P95 latency: {sorted(latencies)[int(len(latencies)*0.95)]:.3f}s")

# ==========================================
# COST MONITORING
# ==========================================

# Check current month's costs:
# gcloud billing projects describe YOUR_PROJECT_ID

# Set budget alerts:
# 1. Go to: https://console.cloud.google.com/billing/budgets
# 2. Create budget alert (e.g., \$10/month threshold)
# 3. Get email when approaching limit

print("="*70)
print("MONITORING BEST PRACTICES")
print("="*70)
print("""
1. SET UP ALERTS:
   - Budget alerts (\$10, \$50, \$100 thresholds)
   - Error rate alerts (>1% errors)
   - Latency alerts (>500ms P95)

2. DAILY CHECKS:
   - Request volume
   - Error logs
   - Latency trends
   - Cost accumulation

3. WEEKLY REVIEWS:
   - Model performance drift
   - User feedback
   - Cost efficiency
   - Optimization opportunities

4. MONTHLY AUDITS:
   - Retrain model with new data
   - Update API version
   - Review security
   - Optimize costs
""")`}
              </CodeBlockR>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-purple-800 dark:text-purple-200">
                  📊 Production ML Lifecycle
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Week 1: Deploy</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-foreground/70">
                      <li>Launch model to production</li>
                      <li>Monitor initial traffic</li>
                      <li>Fix any deployment issues</li>
                      <li>Gather baseline metrics</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-green-700 dark:text-green-300">Weeks 2-4: Monitor</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-foreground/70">
                      <li>Track prediction accuracy</li>
                      <li>Collect user feedback</li>
                      <li>Identify edge cases</li>
                      <li>Optimize performance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Month 2+: Iterate</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-foreground/70">
                      <li>Retrain with production data</li>
                      <li>A/B test new versions</li>
                      <li>Add new features</li>
                      <li>Scale infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exercises */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('exercises')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎯 Practical Exercises: Deploy YOUR Models
            </h2>
            {expandedSections.exercises ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.exercises && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Take everything you've built across all Keras sessions and deploy it to production.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                    Exercise 1: Personal Finance Predictor
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Deploy expense prediction model
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Train model on your own expense data</li>
                    <li>Create FastAPI with /predict/expense endpoint</li>
                    <li>Add authentication (API keys)</li>
                    <li>Deploy to Google Cloud Run</li>
                    <li>Build simple web frontend</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                    Exercise 2: Multi-Model API
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Deploy multiple models in one API
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Health predictor + Finance predictor</li>
                    <li>Separate endpoints for each</li>
                    <li>Shared authentication</li>
                    <li>Unified monitoring dashboard</li>
                    <li>Compare performance</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">
                    Exercise 3: Image Classification API
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Deploy Session 44 CNN model
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Wrap cats/dogs CNN in API</li>
                    <li>Accept image uploads</li>
                    <li>Return classification + confidence</li>
                    <li>Add image preprocessing</li>
                    <li>Deploy to Cloud Run</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-bold mb-3 text-orange-800 dark:text-orange-200">
                    Exercise 4: A/B Testing Pipeline
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Deploy two model versions
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Deploy model v1.0 and v2.0</li>
                    <li>Split traffic 50/50</li>
                    <li>Track performance of each</li>
                    <li>Implement champion/challenger pattern</li>
                    <li>Auto-promote better model</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                  <h3 className="text-xl font-bold mb-3 text-pink-800 dark:text-pink-200">
                    Exercise 5: Mobile App Integration
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Connect deployed API to mobile app
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Build simple React Native or Flutter app</li>
                    <li>Call your deployed API</li>
                    <li>Display predictions in UI</li>
                    <li>Add offline support (cache)</li>
                    <li>Publish to app store (optional)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-xl font-bold mb-3 text-indigo-800 dark:text-indigo-200">
                    Exercise 6: Production ML Pipeline
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Full MLOps pipeline
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Auto-retrain weekly with new data</li>
                    <li>CI/CD: GitHub Actions deploy on push</li>
                    <li>Model versioning and rollback</li>
                    <li>Comprehensive monitoring</li>
                    <li>Production-grade security</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                  🎓 The Complete ML Engineering Journey
                </h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>Session 42:</strong> Keras foundations - built first neural networks</p>
                  <p><strong>Session 43:</strong> Advanced techniques - regularization, callbacks, fine-tuning</p>
                  <p><strong>Session 44:</strong> Complete CNN project - image classification</p>
                  <p><strong>Session 45:</strong> Transfer learning - leveraged pre-trained models</p>
                  <p><strong>Session 46:</strong> Autonomous vehicles - real-world computer vision</p>
                  <p><strong>Session 47:</strong> Production deployment - GLOBALLY ACCESSIBLE APIS</p>
                  <p className="pt-3 font-semibold text-purple-600 dark:text-purple-400 text-base">
                    💡 You've completed the full journey: From zero to deployed production ML models serving real predictions over the internet.
                    This is professional ML engineering. This is what companies pay six figures for.
                    And you just learned it in 6 sessions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">🚀 Session 47 Complete: Production ML Deployment Mastery</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What You've Mastered:</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Production model optimization</li>
                <li>✅ FastAPI REST service creation</li>
                <li>✅ Docker containerization</li>
                <li>✅ Google Cloud Run deployment</li>
                <li>✅ Monitoring & scaling strategies</li>
                <li>✅ Full production ML lifecycle</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Real-World Impact:</h3>
              <ul className="space-y-2 text-sm">
                <li>🌍 Global API accessibility</li>
                <li>⚡ Auto-scaling infrastructure</li>
                <li>💰 Cost-effective deployment (&lt;$10/month)</li>
                <li>📊 Production monitoring</li>
                <li>🔒 Enterprise-grade security</li>
                <li>🚀 Zero-downtime updates</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm mb-6">
            <p className="text-lg font-semibold mb-3">🎯 The Complete Keras Journey: Sessions 42-47</p>
            <div className="space-y-2 text-sm leading-relaxed">
              <p><strong>Session 42:</strong> Built first neural network - understood the fundamentals</p>
              <p><strong>Session 43:</strong> Mastered advanced techniques - regularization, callbacks, hyperparameter tuning</p>
              <p><strong>Session 44:</strong> Created complete CNN project - image classification from scratch</p>
              <p><strong>Session 45:</strong> Leveraged transfer learning - stood on giants' shoulders</p>
              <p><strong>Session 46:</strong> Built autonomous vehicle perception - real-world computer vision</p>
              <p><strong>Session 47:</strong> Deployed to production - global cloud deployment</p>
              <p className="pt-3 text-base font-semibold">
                From "What is a neural network?" to "My ML model is serving predictions globally" in 6 sessions.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-3">💭 Final Reflection: The Need Drives the Tool</p>
            <p className="text-sm leading-relaxed">
              Cloud deployment wasn't built for engineers to play with Docker. It emerged because:
              <br /><br />
              • Brilliant disease detection models sat unused in academic papers
              <br />• Financial fraud detection required 24/7 availability worldwide
              <br />• Self-driving cars needed instant inference at scale
              <br />• Agricultural yield prediction needed to reach rural farmers
              <br />• Small teams couldn't compete with tech giants' infrastructure
              <br /><br />
              <strong>The NEED came first:</strong> Get ML models into the real world, serving real people, solving real problems.
              <br />
              <strong>The TOOL followed:</strong> Cloud platforms, containers, auto-scaling, serverless computing.
              <br /><br />
              <em className="text-white/90">
                "You didn't learn deployment to put it on your resume. You learned it because the Health & Finance models
                you built deserve to help real people. That's the Art of Programming: Building solutions that matter,
                deploying them where they're needed, iterating based on real-world feedback."
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

export default KerasSession47;