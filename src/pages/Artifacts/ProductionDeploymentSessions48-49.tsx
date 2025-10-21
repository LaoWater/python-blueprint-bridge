import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, DollarSign, Workflow, Server, Rocket, Sparkles, Terminal, Shield, BarChart3, ArrowLeft, Globe2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlockR } from '@/components/CodeBlockR';

type CodeBlockProps = {
  title?: string;
  code: string;
  language?: string;
  filename?: string;
  runnableBadge?: string;
};

const CodeBlock = ({ title, code, language = 'python', filename = '', runnableBadge }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      {(title || runnableBadge || filename) && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 text-slate-100">
          <div className="flex items-center gap-3">
            {filename && <span className="font-mono text-xs text-amber-300">{filename}</span>}
            {title && <span className="text-sm font-medium">{title}</span>}
          </div>
          <div className="flex items-center gap-2">
            {runnableBadge && (
              <span className="px-2 py-1 text-[10px] uppercase tracking-wide bg-emerald-500/80 text-white rounded-full">
                {runnableBadge}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-slate-200 hover:text-white hover:bg-slate-800"
              onClick={copyToClipboard}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      )}
      <CodeBlockR language={language}>{code}</CodeBlockR>
    </div>
  );
};

const sections = [
  { id: 'intro', title: 'The Deployment Mindset', icon: Sparkles },
  { id: 'need', title: 'Real Need: Health + Finance', icon: Workflow },
  { id: 'starter-app', title: 'Step 1: Deploy Anything', icon: Terminal },
  { id: 'health-model', title: 'Step 2: Train the Health Brain', icon: Heart },
  { id: 'finance-signal', title: 'Step 3: Add Money Signals', icon: DollarSign },
  { id: 'flask-api', title: 'Step 4: Serve with Flask', icon: Server },
  { id: 'streamlit-front', title: 'Step 5: Human Interface', icon: BarChart3 },
  { id: 'huggingface', title: 'Step 6: Global Scale (Hugging Face)', icon: Globe2 },
  { id: 'ops', title: 'Production Checklist', icon: Shield }
];

const storyBeats = [
  'Remember Sessions 18-27: we learned to see data. Now people must experience it.',
  'Machine Learning gave us predictions. Deployment turns predictions into decisions.',
  'Tools never come first. Needs from Health & Finance teams shaped every line of code.',
  'We deploy progressively: prototype → API → experience → global access.'
];

const ProductionDeploymentSessions4849 = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('intro');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % storyBeats.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const markComplete = (sectionId: string) => {
    setCompletedSections((prev) => {
      if (prev.includes(sectionId)) {
        return prev;
      }
      return [...prev, sectionId];
    });
  };

  const sectionProgress = (completedSections.length / sections.length) * 100;

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'intro':
        return (
          <Card className="bg-gradient-to-br from-indigo-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 border-indigo-100 dark:border-indigo-900/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-indigo-900 dark:text-indigo-100">
                Deployment as Continuation of Learning
              </CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                Sessions 48-49 tie together the journey: Data visualizations (Sessions 18-27) taught us to see,
                Machine Learning (Sessions 28-47) taught us to infer. Deployment is how stakeholders feel the value.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-700 dark:text-indigo-200">
                    <Sparkles className="w-5 h-5" /> Dharma of Deployment
                  </h3>
                  <p className="mt-2 text-sm leading-6">
                    We never start from frameworks. We start from the living pulse of our projects:
                    a cardiology clinic tracking recovery and a family finance coach building trust.
                    The tool enters only when the need demands reliability, repeatability, and reach.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-700 dark:text-indigo-200">
                    <Workflow className="w-5 h-5" /> Path We Walk Today
                  </h3>
                  <ol className="mt-2 space-y-2 list-decimal list-inside text-sm leading-6">
                    <li>Start tiny: deploy a simple notes API to prove we can ship.</li>
                    <li>Add intelligence: train a Keras model that merges health + finance signals.</li>
                    <li>Serve insight: Streamlit for conversation, Flask for endpoints, Hugging Face for reach.</li>
                  </ol>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-indigo-200 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200">
                  Sessions 48-49 • Deploy AI: Streamlit, Flask, Hugging Face
                </Badge>
                <Badge className="bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200">
                  Health & Personal Finance Case
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      case 'need':
        return (
          <Card className="border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-emerald-950/40 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 text-2xl">
                <Workflow className="w-6 h-6" /> Real Needs Before Tools
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Two teams knocked on our door with spreadsheets, questions, and anxiety. We listened first.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 bg-white/80 dark:bg-slate-900/80">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                    <Heart className="w-5 h-5" /> Cardio Recovery Unit
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6">
                    <li>• Nurses track morning vitals, mood, sleep, and exercise adherence.</li>
                    <li>• They need a risk score by noon to prioritize doctor rounds.</li>
                    <li>• Present workflow: manual spreadsheets, inconsistent thresholds, last-minute scrambles.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 bg-white/80 dark:bg-slate-900/80">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                    <DollarSign className="w-5 h-5" /> Financial Wellness Coach
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6">
                    <li>• Families log expenses, savings habits, and stress levels weekly.</li>
                    <li>• Coaches need quick alerts for clients drifting toward risky spending.</li>
                    <li>• Current setup: PDF exports from budgeting apps, gut-feel interventions.</li>
                  </ul>
                </div>
              </div>
              <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-100/60 dark:bg-emerald-900/40">
                <h4 className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-100">
                  Listening Outcome
                </h4>
                <p className="mt-2 text-sm leading-6">
                  Stakeholders did not ask for “a Flask app”. They asked for triage that never misses a patient,
                  and dashboards that speak the language of trust. Deployment is our promise to keep that rhythm daily.
                </p>
              </div>
            </CardContent>
          </Card>
        );
      case 'starter-app':
        return (
          <Card className="border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Step 1 — Prove We Can Ship Anything
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Before tensors, we deploy a tiny Notes API. Stakeholders watch us deliver in hours, not weeks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <p className="text-sm leading-6">
                Health + Finance teams join a 30-minute call. We open a shell, scaffold a Flask microservice, push to Render/railway.
                Confidence grows: “if they can deploy this today, our risk model next week is realistic.”
              </p>
              <Tabs defaultValue="server" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800">
                  <TabsTrigger value="server">Flask Microservice</TabsTrigger>
                  <TabsTrigger value="client">Smoke Test Client</TabsTrigger>
                  <TabsTrigger value="deploy">Deploy Command</TabsTrigger>
                </TabsList>
                <TabsContent value="server" className="mt-4">
                  <CodeBlock
                    title="Minimal deployable Flask app"
                    filename="services/notes/app.py"
                    runnableBadge="python -m flask run"
                    code={`from flask import Flask, jsonify, request

def create_app():
  app = Flask(__name__)
  notes = []

  @app.get("/healthz")
  def healthcheck():
    return {"status": "ok"}, 200

  @app.get("/notes")
  def list_notes():
    return jsonify(notes), 200

  @app.post("/notes")
  def add_note():
    payload = request.get_json(force=True)
    note = {
      "id": len(notes) + 1,
      "text": payload.get("text", ""),
      "author": payload.get("author", "unknown")
    }
    notes.append(note)
    return note, 201

  return app

app = create_app()`}
                  />
                </TabsContent>
                <TabsContent value="client" className="mt-4">
                  <CodeBlock
                    language="bash"
                    title="Quick smoke test"
                    filename="terminal"
                    code={`# 1. Start the server
export FLASK_APP=services.notes.app
flask run --reload

# 2. Create a note
curl -X POST http://127.0.0.1:5000/notes \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Rounds at 08:30. Prep vitals report.", "author": "nurse.lia"}'

# 3. Fetch notes
curl http://127.0.0.1:5000/notes`}
                  />
                </TabsContent>
                <TabsContent value="deploy" className="mt-4">
                  <CodeBlock
                    language="bash"
                    title="Render one-off deploy"
                    code={`# Render (free tier) deployment
render blueprint init
render blueprint deploy

# Or Railway
railway up

# Or Hugging Face Space (Gradio/Flask template)
pip install huggingface_hub
huggingface-cli login
huggingface-cli repo create notes-api --type=space --sdk=static
git push hf notes-api`}
                  />
                </TabsContent>
              </Tabs>
              <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm leading-6">
                <strong>Lesson reinforced:</strong> Deployment muscles build trust. Teams see uptime dashboards,
                and we earn permission to touch their sensitive data.
              </div>
            </CardContent>
          </Card>
        );
      case 'health-model':
        return (
          <Card className="border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50 via-white to-slate-50 dark:from-slate-950 dark:via-rose-950/40 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-900 dark:text-rose-200 text-2xl">
                <Heart className="w-6 h-6" /> Step 2 — Train the Health Brain
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                We move from prototype to purpose. Keras builds a risk score that honors real-world constraints.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-800">
                  <h3 className="font-semibold text-rose-700 dark:text-rose-200">Data Without Download Dramas</h3>
                  <p className="mt-2 text-sm leading-6">
                    We tap into <code>sklearn.datasets.load_diabetes</code>. It ships with scikit-learn, so any teammate can
                    reproduce training with <code>pip install scikit-learn tensorflow joblib pandas</code>.
                    Health metrics (glucose, BMI, age) become input. We engineer a categorical recovery label.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-800">
                  <h3 className="font-semibold text-rose-700 dark:text-rose-200">Pipeline Commitments</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6">
                    <li>• Same normalization in training and inference (save scaler with joblib).</li>
                    <li>• Model saved as <code>models/health_risk_model.keras</code> to keep optimizer state.</li>
                    <li>• Feature schema locked in <code>models/feature_schema.json</code> for runtime validation.</li>
                  </ul>
                </div>
              </div>
              <CodeBlock
                title="Train and persist the cardio recovery model"
                filename="pipelines/train_health_model.py"
                runnableBadge="python pipelines/train_health_model.py"
                code={`"""Train Keras model predicting cardio recovery risk tiers."""
import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, KBinsDiscretizer
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks

ROOT = Path(__file__).resolve().parents[1]
MODEL_DIR = ROOT / "models"
MODEL_DIR.mkdir(exist_ok=True)

def load_dataset():
  raw = load_diabetes(as_frame=True)
  df = raw.frame.copy()
  df["baseline_score"] = df["target"]
  risk_encoder = KBinsDiscretizer(n_bins=3, encode="ordinal", strategy="quantile")
  df["risk_tier"] = risk_encoder.fit_transform(df[["baseline_score"]]).astype(int)
  df.drop(columns=["target", "baseline_score"], inplace=True)
  schema = {"features": df.drop(columns=["risk_tier"]).columns.tolist(), "label": "risk_tier"}
  return df, schema

def build_model(input_dim: int) -> tf.keras.Model:
  model = models.Sequential([
    layers.Input(shape=(input_dim,)),
    layers.Normalization(),
    layers.Dense(64, activation="relu"),
    layers.Dropout(0.2),
    layers.Dense(32, activation="relu"),
    layers.Dropout(0.1),
    layers.Dense(3, activation="softmax")
  ])
  model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
  return model

def main():
  df, schema = load_dataset()
  X = df.drop(columns=["risk_tier"]).to_numpy()
  y = df["risk_tier"].to_numpy()

  X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

  scaler = StandardScaler()
  X_train_scaled = scaler.fit_transform(X_train)
  X_val_scaled = scaler.transform(X_val)

  model = build_model(X_train.shape[1])
  norm_layer = model.layers[0]
  norm_layer.adapt(X_train_scaled)

  early_stop = callbacks.EarlyStopping(patience=8, restore_best_weights=True, monitor="val_accuracy")

  history = model.fit(
    X_train_scaled,
    y_train,
    validation_data=(X_val_scaled, y_val),
    epochs=120,
    batch_size=32,
    callbacks=[early_stop],
    verbose=2
  )

  model.save(MODEL_DIR / "health_risk_model.keras")
  joblib.dump(scaler, MODEL_DIR / "health_scaler.joblib")
  (MODEL_DIR / "feature_schema.json").write_text(json.dumps(schema, indent=2))
  np.save(MODEL_DIR / "training_history.npy", history.history)

if __name__ == "__main__":
  main()`}
              />
              <div className="p-4 rounded-lg bg-rose-100/70 dark:bg-rose-900/40 text-sm leading-6">
                <strong>Deliverable to stakeholders:</strong> we demo a CLI that prints the three-tier risk level given CSV input.
                No UI yet, but value already visible: nurses confirm thresholds make sense.
              </div>
            </CardContent>
          </Card>
        );
      case 'finance-signal':
        return (
          <Card className="border-amber-200 dark:border-amber-700 bg-gradient-to-br from-amber-50 via-white to-slate-50 dark:from-slate-950 dark:via-amber-950/40 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-200 text-2xl">
                <DollarSign className="w-6 h-6" /> Step 3 — Fuse Financial Signals
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Health is not isolated. Burnout correlates with finances. We engineer a joint feature set.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-800 bg-white/80 dark:bg-slate-900/80">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-200">Personal Finance Mini-Data</h3>
                  <p className="mt-2 text-sm leading-6">
                    We craft a lightweight CSV (<code>data/finance_snapshot.csv</code>) with weekly signals:
                    savings rate, discretionary spend, debt ratio, stress self-report (1-5). Coaches fill it out manually at first.
                    Later we automate ingestion from budgeting tools.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-800 bg-white/80 dark:bg-slate-900/80">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-200">Dataset Checklist</h3>
                  <ol className="mt-3 space-y-2 text-sm leading-6 list-decimal list-inside">
                    <li>Create <code>data/finance_snapshot.csv</code> with headers:
                      <code>client_id,week,savings_rate,spend_ratio,debt_ratio,stress_level</code>.</li>
                    <li>Populate 12 weeks per client. Stress scale (1 calm → 5 overwhelmed).</li>
                    <li>Run the script below to join with health features by <code>client_id</code>.</li>
                  </ol>
                </div>
              </div>
              <CodeBlock
                title="Blend health tensor with finance context"
                filename="pipelines/build_wellbeing_dataset.py"
                runnableBadge="python pipelines/build_wellbeing_dataset.py"
                code={`"""Create joined dataset for unified wellbeing score."""
import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
MODEL_DIR = ROOT / "models"
MODEL_DIR.mkdir(exist_ok=True)

def load_health_embeddings():
  history = np.load(MODEL_DIR / "training_history.npy", allow_pickle=True).item()
  health_features = pd.DataFrame(history["accuracy"], columns=["health_confidence"])
  health_features["client_id"] = health_features.index
  return health_features

def load_finance():
  finance_path = DATA_DIR / "finance_snapshot.csv"
  if not finance_path.exists():
    template = DATA_DIR / "finance_snapshot_template.csv"
    template.parent.mkdir(exist_ok=True)
    template.write_text(
      "client_id,week,savings_rate,spend_ratio,debt_ratio,stress_level\\n"
      "C001,2024-01-05,0.42,0.65,0.38,3\\n"
      "C001,2024-01-12,0.40,0.68,0.39,4\\n"
      "C002,2024-01-05,0.28,0.92,0.55,5\\n"
      "C002,2024-01-12,0.30,0.87,0.54,4\\n"
    )
    raise FileNotFoundError(
      "\\nPlease create data/finance_snapshot.csv based on data/finance_snapshot_template.csv.\\n"
      "Copy the template, duplicate rows for each client, and rerun this script."
    )
  finance = pd.read_csv(finance_path)
  latest = finance.sort_values("week").groupby("client_id").tail(1)
  return latest

def build_dataset():
  health = load_health_embeddings()
  finance = load_finance()
  merged = pd.merge(finance, health, on="client_id", how="inner")

  engineered = merged.assign(
    wellbeing_score=lambda df: (
      0.4 * (1 - df["stress_level"] / 5)
      + 0.3 * df["savings_rate"]
      + 0.2 * (1 - df["spend_ratio"])
      + 0.1 * df["health_confidence"]
    )
  )

  scaler = MinMaxScaler()
  engineered["wellbeing_scaled"] = scaler.fit_transform(engineered[["wellbeing_score"]])
  joblib.dump(scaler, MODEL_DIR / "wellbeing_scaler.joblib")
  engineered.to_csv(DATA_DIR / "joined_wellbeing.csv", index=False)
  (MODEL_DIR / "wellbeing_schema.json").write_text(json.dumps({
    "target": "wellbeing_scaled",
    "features": ["savings_rate", "spend_ratio", "debt_ratio", "stress_level", "health_confidence"]
  }, indent=2))

if __name__ == "__main__":
  build_dataset()`}
              />
              <div className="p-4 rounded-lg bg-amber-100/70 dark:bg-amber-900/40 text-sm leading-6">
                <strong>Outcome:</strong> Finance coaches now see the same clients as the health team.
                Shared language (“wellbeing score”) emerges before any UI. Cross-team alignment unlocked.
              </div>
            </CardContent>
          </Card>
        );
      case 'flask-api':
        return (
          <Card className="border-sky-200 dark:border-sky-800 bg-gradient-to-br from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-sky-950/40 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-900 dark:text-sky-200 text-2xl">
                <Server className="w-6 h-6" /> Step 4 — Serve Insights with Flask
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                This API is the bridge. Streamlit, mobile apps, or schedulers all talk to it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-800">
                  <h3 className="font-semibold text-sky-700 dark:text-sky-200">Core Endpoints</h3>
                  <ul className="mt-2 text-sm space-y-2 leading-6">
                    <li>• <code>POST /predict/health</code> → single patient risk tier.</li>
                    <li>• <code>POST /predict/wellbeing</code> → combined wellbeing score.</li>
                    <li>• <code>GET /schema</code> → JSON schema for client validation.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-800">
                  <h3 className="font-semibold text-sky-700 dark:text-sky-200">Security Notes</h3>
                  <ul className="mt-2 text-sm space-y-2 leading-6">
                    <li>• Use API keys (.env) before exposing beyond internal VPN.</li>
                    <li>• Log predictions without storing raw health metrics.</li>
                    <li>• Enable CORS only for approved Streamlit domains.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-800">
                  <h3 className="font-semibold text-sky-700 dark:text-sky-200">Runbook</h3>
                  <p className="text-sm leading-6">
                    Create <code>.env</code> with <code>FLASK_ENV=production</code>,
                    <code>MODEL_DIR=models</code>, <code>API_KEY=replace-me</code>. Start with <code>gunicorn wsgi:app</code>.
                  </p>
                </div>
              </div>
              <CodeBlock
                title="Production-ready Flask inference service"
                filename="services/wellbeing_api/app.py"
                runnableBadge="gunicorn wsgi:app --bind 0.0.0.0:8000"
                code={`import json
import os
from pathlib import Path
from typing import List

import joblib
import numpy as np
from flask import Flask, jsonify, request, abort
from tensorflow import keras

MODEL_DIR = Path(os.getenv("MODEL_DIR", "models"))
API_KEY = os.getenv("API_KEY")

def load_artifacts():
  model = keras.models.load_model(MODEL_DIR / "health_risk_model.keras")
  scaler = joblib.load(MODEL_DIR / "health_scaler.joblib")
  wellbeing_scaler = joblib.load(MODEL_DIR / "wellbeing_scaler.joblib")
  schema = json.loads((MODEL_DIR / "feature_schema.json").read_text())
  wellbeing_schema = json.loads((MODEL_DIR / "wellbeing_schema.json").read_text())
  return model, scaler, wellbeing_scaler, schema, wellbeing_schema

model, scaler, wellbeing_scaler, schema, wellbeing_schema = load_artifacts()

def enforce_api_key(req):
  if API_KEY and req.headers.get("X-API-Key") != API_KEY:
    abort(401, description="Invalid API key.")

def parse_payload(expected_features: List[str], payload: dict):
  missing = [feature for feature in expected_features if feature not in payload]
  if missing:
    abort(400, description=f"Missing features: {missing}")
  ordered = [payload[feature] for feature in expected_features]
  return np.array(ordered, dtype=np.float32).reshape(1, -1)

def create_app():
  app = Flask(__name__)

  @app.get("/healthz")
  def healthcheck():
    return {"status": "ok"}, 200

  @app.get("/schema")
  def schema_view():
    return jsonify({"health": schema, "wellbeing": wellbeing_schema})

  @app.post("/predict/health")
  def predict_health():
    enforce_api_key(request)
    payload = request.get_json(force=True)
    features = parse_payload(schema["features"], payload)
    scaled = scaler.transform(features)
    probabilities = model.predict(scaled, verbose=0)[0].tolist()
    tier = int(np.argmax(probabilities))
    return jsonify({"risk_tier": tier, "probabilities": probabilities})

  @app.post("/predict/wellbeing")
  def predict_wellbeing():
    enforce_api_key(request)
    payload = request.get_json(force=True)
    features = parse_payload(wellbeing_schema["features"], payload)
    wellbeing_score = float(payload.get("wellbeing_score", 0.0))
    scaled_score = float(wellbeing_scaler.transform([[wellbeing_score]]).item())
    return jsonify({
      "wellbeing_score": wellbeing_score,
      "wellbeing_scaled": scaled_score,
      "recommendations": [
        "Schedule a coaching call" if scaled_score < 0.4 else "Maintain weekly check-in",
        "Share stress coping plan" if payload.get("stress_level", 3) >= 4 else "Celebrate progress"
      ]
    })

  return app

app = create_app()`}
              />
              <div className="p-4 rounded-lg bg-sky-100/70 dark:bg-sky-900/40 text-sm leading-6">
                <strong>Tip:</strong> keep <code>wsgi.py</code> as a thin wrapper importing <code>app</code>.
                Deploy behind a reverse proxy (Nginx/TLS) when exposing to the internet.
              </div>
            </CardContent>
          </Card>
        );
      case 'streamlit-front':
        return (
          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 via-white to-slate-50 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-200 text-2xl">
                <BarChart3 className="w-6 h-6" /> Step 5 — Streamlit Conversation Layer
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                We learned to build dashboards in Data:Visualizing. Now we let teams talk to the model.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-800">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-200">UX Commitments</h3>
                  <ul className="mt-2 text-sm space-y-2 leading-6">
                    <li>• Coach-friendly copy (“How worried should we be?”).</li>
                    <li>• Health + finance inputs side by side; show trends with Plotly sparklines.</li>
                    <li>• “Why” explanations (weights) using SHAP later in Session 50.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-800">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-200">Run Instructions</h3>
                  <ol className="mt-2 text-sm space-y-2 leading-6 list-decimal list-inside">
                    <li><code>pip install streamlit requests plotly</code></li>
                    <li>Create <code>.streamlit/secrets.toml</code> with <code>api_url</code> &amp; <code>api_key</code>.</li>
                    <li>Launch via <code>streamlit run app.py</code>. Share local URL for review.</li>
                  </ol>
                </div>
              </div>
              <CodeBlock
                title="Streamlit front-end connecting to Flask API"
                filename="apps/streamlit_app.py"
                runnableBadge="streamlit run apps/streamlit_app.py"
                code={`import os
import requests
import streamlit as st
import plotly.graph_objects as go

st.set_page_config(page_title="Wellbeing Radar", page_icon="🧭", layout="wide")

API_URL = st.secrets.get("api_url", os.getenv("API_URL", "http://localhost:8000"))
API_KEY = st.secrets.get("api_key", os.getenv("API_KEY"))
HEADERS = {"X-API-Key": API_KEY} if API_KEY else {}

st.title("🧭 Wellbeing Radar Dashboard")
st.caption("Sessions 48-49 • Streamlit + Flask + Keras")

with st.sidebar:
  st.header("Patient / Client Inputs")
  col1, col2 = st.columns(2)
  with col1:
    bmi = st.slider("BMI", min_value=18.0, max_value=38.0, value=26.5, step=0.1)
    bp = st.slider("Blood Pressure", min_value=60, max_value=200, value=102)
    s1 = st.slider("Serum TC", min_value=-0.1, max_value=0.2, value=0.05)
  with col2:
    savings_rate = st.slider("Savings Rate", min_value=0.0, max_value=1.0, value=0.35)
    spend_ratio = st.slider("Spend Ratio", min_value=0.0, max_value=1.5, value=0.7)
    stress_level = st.slider("Stress Level (1-5)", min_value=1, max_value=5, value=3)

  if st.button("Run Assessment", use_container_width=True):
    with st.spinner("Calling wellbeing API..."):
      payload = {
        "bmi": bmi,
        "bp": bp,
        "s1": s1,
        "s2": 0.03,
        "s3": -0.04,
        "s4": 0.02,
        "s5": 0.01,
        "s6": 0.05
      }
      health_resp = requests.post(f"{API_URL}/predict/health", json=payload, headers=HEADERS, timeout=10)
      wellbeing_payload = {
        "savings_rate": savings_rate,
        "spend_ratio": spend_ratio,
        "debt_ratio": 0.45,
        "stress_level": stress_level,
        "health_confidence": 0.8,
        "wellbeing_score": 0.5
      }
      wellbeing_resp = requests.post(f"{API_URL}/predict/wellbeing", json=wellbeing_payload, headers=HEADERS, timeout=10)
      if health_resp.ok and wellbeing_resp.ok:
        st.session_state["health"] = health_resp.json()
        st.session_state["wellbeing"] = wellbeing_resp.json()
      else:
        st.error("API returned an error. Check logs.")

if "health" in st.session_state and "wellbeing" in st.session_state:
  col1, col2 = st.columns([2, 1])
  with col1:
    st.subheader("Risk Tier Overview")
    tier = st.session_state["health"]["risk_tier"]
    probs = st.session_state["health"]["probabilities"]
    fig = go.Figure(go.Bar(
      x=[f"Tier {i}" for i in range(len(probs))],
      y=probs,
      marker_color=["#22c55e", "#facc15", "#ef4444"]
    ))
    fig.update_layout(height=320, margin=dict(l=0, r=0, t=30, b=0))
    st.plotly_chart(fig, use_container_width=True)
  with col2:
    st.subheader("Recommendations")
    for rec in st.session_state["wellbeing"]["recommendations"]:
      st.write(f"✅ {rec}")
    st.metric(
      "Scaled Wellbeing",
      value=f"{st.session_state['wellbeing']['wellbeing_scaled']:.2f}",
      delta="Stable" if st.session_state["wellbeing"]["wellbeing_scaled"] >= 0.5 else "- Attention"
    )
else:
  st.info("Feed inputs on the left and click **Run Assessment** to generate insights.")`}
              />
              <div className="p-4 rounded-lg bg-purple-100/70 dark:bg-purple-900/40 text-sm leading-6">
                <strong>Stakeholder reaction:</strong> Nurses start each day with Streamlit open on a tablet.
                Finance coaches screenshot recommendations during Zoom calls. Adoption happened before we said “production”.
              </div>
            </CardContent>
          </Card>
        );
      case 'huggingface':
        return (
          <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-white to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 text-2xl">
                <Globe2 className="w-6 h-6" /> Step 6 — Hugging Face for Global Access
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Once internal pilots succeed, we need a place where partners can spin up demos instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-800">
                  <h3 className="font-semibold text-indigo-700 dark:text-indigo-200">Why Hugging Face Spaces?</h3>
                  <ul className="mt-2 text-sm space-y-2 leading-6">
                    <li>• Free tier handles demos; scaling knobs via upgraded hardware.</li>
                    <li>• Built-in CI (Space pulls from Git repo on push).</li>
                    <li>• OAuth + secret management for API keys.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-800">
                  <h3 className="font-semibold text-indigo-700 dark:text-indigo-200">Space Layout</h3>
                  <p className="text-sm leading-6">
                    Folder <code>space_app/</code> with <code>app.py</code> (Streamlit),
                    <code>requirements.txt</code>, <code>README.md</code>, <code>models/</code> (weights).
                    Add <code>spaces.yaml</code> to pin hardware (CPU small).
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-800">
                  <h3 className="font-semibold text-indigo-700 dark:text-indigo-200">Secrets Setup</h3>
                  <p className="text-sm leading-6">
                    In the Space settings, add <code>API_URL</code> pointing to the Flask service and <code>API_KEY</code>.
                    Spaces expose them as environment variables automatically.
                  </p>
                </div>
              </div>
              <CodeBlock
                language="bash"
                title="Create and push Hugging Face Space"
                code={`huggingface-cli login
git clone https://huggingface.co/spaces/your-org/wellbeing-radar
cd wellbeing-radar

# Copy Streamlit app + models
cp -r ../apps/streamlit_app.py app.py
cp ../models/health_risk_model.keras models/
cp ../models/health_scaler.joblib models/
cp ../models/wellbeing_scaler.joblib models/

cat <<'EOF' > requirements.txt
streamlit==1.32.0
tensorflow==2.15.0
scikit-learn==1.3.0
joblib==1.3.2
plotly==5.19.0
requests==2.31.0
EOF

git add .
git commit -m "Deploy wellbeing radar Streamlit app"
git push`}
              />
              <div className="p-4 rounded-lg bg-indigo-100/70 dark:bg-indigo-900/40 text-sm leading-6">
                <strong>Launch ritual:</strong> share the Space URL in the clinic’s Slack.
                Doctors in satellite hospitals launch the same UI without installing Python.
              </div>
            </CardContent>
          </Card>
        );
      case 'ops':
        return (
          <Card className="border-slate-300 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-200 text-2xl">
                <Shield className="w-6 h-6" /> Production Checklist
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Before calling Session 49 done, we honor operations, monitoring, and storytelling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700 dark:text-slate-200">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">Ops Dashboard</h3>
                  <ul className="mt-2 text-sm space-y-2 leading-6">
                    <li>• Uptime ping every 60s (Better Stack, UptimeRobot).</li>
                    <li>• Logs streamed to Papertrail (HIPAA-safe) with redaction middleware.</li>
                    <li>• Model drift notebook scheduled weekly — compare percentile shift.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">Communication Rituals</h3>
                  <ul className="mt-2 text-sm space-y-2 leading-6">
                    <li>• Monday: publish wellbeing trends screenshot (Streamlit export).</li>
                    <li>• Wednesday: triage clinic slack thread → ensures adoption feedback loop.</li>
                    <li>• Friday: finance & health retro — update backlog, capture testimonials.</li>
                  </ul>
                </div>
              </div>
              <Tabs defaultValue="infra">
                <TabsList className="bg-slate-100 dark:bg-slate-800">
                  <TabsTrigger value="infra">Infrastructure</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="handoff">Handoff Checklist</TabsTrigger>
                </TabsList>
                <TabsContent value="infra" className="mt-4 text-sm leading-6">
                  <ul className="space-y-2">
                    <li>• Containerize Flask API (<code>docker build -t wellbeing-api .</code>, expose port 8000).</li>
                    <li>• Use Terraform or Pulumi to provision managed Postgres if persistence grows.</li>
                    <li>• Configure CDN in front of Hugging Face Space if traffic spikes (Cloudflare).</li>
                  </ul>
                </TabsContent>
                <TabsContent value="security" className="mt-4 text-sm leading-6">
                  <ul className="space-y-2">
                    <li>• Rotate <code>API_KEY</code> monthly, store in 1Password / Doppler.</li>
                    <li>• Encrypt model artifacts at rest (AWS KMS / GCP KMS) when moving to managed storage.</li>
                    <li>• Add rate-limiting middleware (Flask-Limiter) before public launch.</li>
                  </ul>
                </TabsContent>
                <TabsContent value="handoff" className="mt-4 text-sm leading-6">
                  <ul className="space-y-2">
                    <li>• README with step-by-step: train → package → deploy (mirrors this artifact).</li>
                    <li>• “Day in the life” runbook for on-call analyst.</li>
                    <li>• Video walkthrough stored in shared knowledge base.</li>
                  </ul>
                </TabsContent>
              </Tabs>
              <div className="p-4 rounded-lg bg-slate-200/70 dark:bg-slate-800/50 text-sm leading-6">
                <strong>Next session preview (50):</strong> we automate retraining triggers, add SHAP explanations,
                and benchmark latency under load. Deployment becomes a living system, not a one-off push.
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 opacity-90" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 text-white">
          <div className="flex items-center justify-between mb-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/machine-learning')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Machine Learning
            </Button>
            <Badge className="bg-white/20 text-white border border-white/30">Sessions 48-49</Badge>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight">
              Deploy AI: From Listening Rooms to Global Scaling
            </h1>
            <p className="mt-4 text-lg text-indigo-100">
              We bind Computer Vision, Keras intuition, and storytelling into production-grade experiences.
              Tools follow the heartbeat of our Health and Finance partners.
            </p>
          </div>
          <div className="mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur">
              <Rocket className="w-4 h-4" />
              <span className="text-sm text-indigo-100">
                {storyBeats[storyIndex]}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          <aside>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Journey Navigator</CardTitle>
                <CardDescription className="text-sm">
                  Progress: {completedSections.length} / {sections.length} sections explored
                </CardDescription>
                <Progress value={sectionProgress} className="mt-3" />
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = currentSection === section.id;
                  const isDone = completedSections.includes(section.id);
                  return (
                    <Button
                      key={section.id}
                      variant={isActive ? 'default' : 'ghost'}
                      className={`w-full justify-start gap-2 ${isDone ? 'text-emerald-600 dark:text-emerald-300' : ''}`}
                      onClick={() => setCurrentSection(section.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.title}</span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-6">
            {renderSectionContent()}
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-500/20"
                onClick={() => markComplete(currentSection)}
              >
                Mark “{sections.find((s) => s.id === currentSection)?.title}” as completed
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductionDeploymentSessions4849;
