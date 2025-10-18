import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Activity,
  DollarSign,
  Sparkles,
  Radio,
  Brain,
  Camera,
  Map,
  Layers,
  Cpu,
  BarChart,
  Github
} from 'lucide-react';

const narrativeMoments = [
  {
    title: '🚦 The Need Appears on the Dashboard',
    description:
      'Our Health & Personal Finance dashboards glow with insights, yet the story feels delayed. The spikes in the "late-night rideshare expenses" chart and the dips in our "outdoor workout adherence" timeline hide behind spreadsheets. We need the moment of context, not a post-mortem.',
    anchor:
      'Borrow the telemetry mindset from Tesla: decisions improve when perception happens before the KPI changes. The question is not "Can we run YOLO?" -- it is "How can real-time vision prevent the next anomaly?"'
  },
  {
    title: '🧠 From Need to Architecture',
    description:
      'We reverse the usual tutorial flow. Instead of starting with a model, we start with the missing feedback loops: spotting distracted driving during late Deliveroo shifts, monitoring grocery cart composition for nutrition goals, flagging a gym rep that risks injury.',
    anchor:
      'This roadmap demands real-time detection (≥30 FPS), small edge deployments (Jetson Nano, iPhone), and seamless logging into our analytics stack. YOLO enters because it satisfies those constraints, not because it is trendy.'
  },
  {
    title: '🛠️ Tools Answer the Call',
    description:
      'Only after the need is clear do we open the toolkit. The "open-your-eyes" project becomes our lab: data collection utilities, training scripts, and streaming overlays. The tool is justified by the mission.',
    anchor:
      'Sessions 39-40 will layer YOLO on top of the Data:Visualizing and Machine Learning pillars -- NumPy for tensors, Plotly for dashboards, Streamlit for pilots, TensorFlow experience for optimization intuition.'
  }
];

const sessionPaths = [
  {
    id: 'session39',
    title: 'Session 39 · Perception Is Prevention',
    subtitle: 'Prototype real-time vision to answer a financial safety question.',
    bullets: [
      'Scenario: Late-night gig workers want automatic alerts when rideshare customers forget items, preventing reimbursement loss.',
      'Data source: Dashcam feed piped through our Streamlit control room. Health dashboard already tracks driver fatigue; we now see the scene.',
      'Outcome: Produce structured events (`object`, `confidence`, `timestamp`, `frame_meta`) saved to Supabase so Plotly timelines reflect the present moment.'
    ],
    codeTitle: 'Real-time YOLOv8 Inference with Context Logging',
    code: `"""
Session 39 core loop.
Need -> Perception: detect forgotten items in rideshare vehicles and log the context.
We deliberately integrate with our existing analytics stack instead of demo-only prints.

Prerequisites:
  pip install ultralytics opencv-python pandas supabase
  export SUPABASE_URL=... SUPABASE_SERVICE_KEY=...
"""

import os
import cv2
import pandas as pd
from datetime import datetime
from ultralytics import YOLO
from supabase import create_client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

model = YOLO("yolov8n.pt")  # lightweight for Jetson / MacBook fans run

OBJECTS_OF_INTEREST = {"backpack", "handbag", "suitcase", "bottle", "cell phone"}

def log_event(event: dict) -> None:
    """Persist YOLO events so our Plotly dashboards stay real-time."""
    supabase.table("vehicle_object_events").insert(event).execute()

def stream_detection(source: str = "dashcam.mp4"):
    cap = cv2.VideoCapture(source)
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open video source: {source}")

    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"📹 Streaming at ~{fps:.1f} FPS")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        annotated_frame = frame
        for result in model.track(frame, stream=True, iou=0.5, conf=0.35):
            annotated_frame = result.plot()
            for box in result.boxes:
                cls = model.names[int(box.cls)]
                if cls not in OBJECTS_OF_INTEREST:
                    continue

                event = {
                    "detected_object": cls,
                    "confidence": float(box.conf),
                    "timestamp": datetime.utcnow().isoformat(),
                    "frame_reference": int(cap.get(cv2.CAP_PROP_POS_FRAMES)),
                    "driver_id": "driver_23",  # our analytics joins on this
                    "context": {
                        "source": source,
                        "camera_fps": fps,
                        "session": "S39-YOLO-prototype"
                    }
                }
                log_event(event)

        # Optional render for operator feedback
        cv2.imshow("Session39: Cab Guardian", annotated_frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    stream_detection("dashcam.mp4")`
  },
  {
    id: 'session40',
    title: 'Session 40 · From Prototype to Pilot',
    subtitle: 'Tune YOLO for Health & Finance intelligence loops.',
    bullets: [
      'Need #1 · Health Coach Cam: Count risky kettlebell reps and notify the physical therapist inside our Streamlit dashboard.',
      'Need #2 · Financial Clarity Cam: Detect receipts and itemize line items before they hit our budgeting spreadsheet.',
      'Result: Two specialized heads on top of YOLO -- one for movement quality (pose + object fusion), one for document triage. Deployment checklists ensure the models ship where the need lives.'
    ],
    codeTitle: 'Fine-tuning YOLO & Surfacing Live Metrics',
    code: `"""
Session 40 expands Session 39's loop:
  1. Fine-tune YOLO on our labeled scenarios using the 'open-your-eyes' conventions.
  2. Push metrics back into our Data:Visualizing layer.
"""

from pathlib import Path
from ultralytics import YOLO
import plotly.express as px
import pandas as pd

PROJECT_ROOT = Path("open-your-eyes")  # cloned repo with data pipelines
DATA_YAML = PROJECT_ROOT / "datasets" / "health_finance_combo.yaml"

# 1. Launch training (runs inside the open-your-eyes repo tooling)
def train_custom_model():
    """
    We keep training orchestrations declarative.
    The YAML describes train/val directories, classes, and augmentation policy.
    """
    if not DATA_YAML.exists():
        raise FileNotFoundError("Label the dataset first: see Session 40 checklist.")

    yolo = YOLO("yolov8m.pt")  # resize if Jetson (use 'n' or 's')
    results = yolo.train(
        data=str(DATA_YAML),
        epochs=80,
        imgsz=960,
        batch=16,
        project="trained-models",
        name="yolo-health-finance-v1",
        patience=15,
        device=0,  # fallback to CPU if CUDA not available
        optimizer="AdamW",
        lr0=1e-3
    )
    print(results)

# 2. Generate live KPIs for our dashboards
def create_live_kpis(events_csv: Path):
    """
    Convert raw YOLO events into Plotly visuals consumed by Data:Visualizing dashboards.
    """
    df = pd.read_csv(events_csv, parse_dates=["timestamp"])
    df["hour"] = df["timestamp"].dt.hour

    fig = px.histogram(
        df,
        x="hour",
        color="detected_object",
        title="Incidents per Hour · Session 40 Pilot",
        nbins=24,
        text_auto=True,
    )
    fig.update_layout(template="plotly_dark")
    fig.write_html("dist/reports/session40_incidents.html")
    print("✨ KPI dashboard refreshed -> dist/reports/session40_incidents.html")

def export_model_for_edge():
    """
    Ensure the model travels. Convert to ONNX / CoreML for mobile and NVIDIA TensorRT for cars.
    """
    yolo = YOLO("trained-models/yolo-health-finance-v1/weights/best.pt")
    yolo.export(format="onnx", opset=12)
    yolo.export(format="engine", half=True, device=0)  # TensorRT for NVIDIA Drive / Jetson
    yolo.export(format="coreml", int8=True)  # iOS Health Coach app

if __name__ == "__main__":
    train_custom_model()
    create_live_kpis(Path("dist/events/session40_events.csv"))
    export_model_for_edge()`
  }
];

const YOLOSessions3940 = () => {
  const navigate = useNavigate();
  const [activeStory, setActiveStory] = useState(0);
  const [activeSession, setActiveSession] = useState('session39');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-12">
        <div className="flex items-center gap-4 mb-10">
          <Button
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800/60"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Badge className="bg-emerald-500/20 border border-emerald-400 text-emerald-200">
            Sessions 39-40
          </Badge>
          <Badge className="bg-sky-500/20 border border-sky-400 text-sky-200">
            Real-time Perception
          </Badge>
          <Badge className="bg-orange-500/20 border border-orange-400 text-orange-200">
            Health · Finance
          </Badge>
        </div>

        <Card className="bg-slate-900/70 border-slate-800 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Sessions 39-40 · YOLO: Real-time Object Detection
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg leading-relaxed">
              We extend the Machine Learning journey from perception theory to road-ready intelligence.
              The focus is on why real-time vision matters to our Health & Personal Finance missions --
              we build prototypes that prevent loss, protect bodies, and feed dashboards in seconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="grid md:grid-cols-3 gap-4">
              {narrativeMoments.map((moment, index) => (
                <div
                  key={moment.title}
                  className={`rounded-xl border p-5 transition-all ${
                    activeStory === index
                      ? 'border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                      : 'border-slate-700 bg-slate-900/40 hover:border-slate-500'
                  }`}
                  onMouseEnter={() => setActiveStory(index)}
                >
                  <h3 className="text-xl font-semibold mb-3 text-emerald-200">{moment.title}</h3>
                  <p className="text-sm text-slate-300 mb-3">{moment.description}</p>
                  <p className="text-xs text-slate-400 italic">{moment.anchor}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/80 border-slate-800">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Car className="h-6 w-6 text-emerald-300" />
                    <CardTitle className="text-2xl text-white">Car Intelligence Thread</CardTitle>
                  </div>
                  <CardDescription className="text-slate-300">
                    Autonomous vehicle systems are our north star for responsiveness. We translate the same
                    pattern -- perception -&gt; decision -&gt; action -- into our domains.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p>• <strong className="text-emerald-200">Perception</strong> · YOLOv8 with 30-60 FPS on Jetson, iPhone, or laptop.</p>
                  <p>• <strong className="text-emerald-200">Prediction</strong> · Fuse YOLO bounding boxes with our fatigue scores and expense anomalies.</p>
                  <p>• <strong className="text-emerald-200">Action</strong> · Alert via Streamlit, log to Supabase, update Plotly graphs within one heartbeat.</p>
                  <p className="italic text-slate-400">
                    The tool exists because the dashboard needed context before the KPI bent; this is the same
                    philosophy Tesla, Waymo, and Cruise apply to road safety.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/80 border-slate-800">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Layers className="h-6 w-6 text-cyan-300" />
                    <CardTitle className="text-2xl text-white">From Pixels to KPIs</CardTitle>
                  </div>
                  <CardDescription className="text-slate-300">
                    Every detection is translated into the language of Data:Visualizing. Metrics stay actionable.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p>• Each YOLO event writes to our Supabase warehouse with rich metadata.</p>
                  <p>• Plotly dashboards ingest the stream to update during live coaching calls.</p>
                  <p>• TensorFlow experience grounds the optimization -- we understand why YOLO layers are efficient.</p>
                  <p className="italic text-slate-400">
                    We tell the story with code, not slides: the data pipeline is the narrative.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeSession} onValueChange={setActiveSession} className="w-full">
              <TabsList className="bg-slate-800/70 border border-slate-700">
                <TabsTrigger value="session39" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  Session 39 · Prototype
                </TabsTrigger>
                <TabsTrigger value="session40" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  Session 40 · Pilot
                </TabsTrigger>
              </TabsList>
              {sessionPaths.map((session) => (
                <TabsContent
                  key={session.id}
                  value={session.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mt-4 space-y-6"
                >
                  <div>
                    <h3 className="text-3xl font-semibold text-emerald-200 mb-2">{session.title}</h3>
                    <p className="text-slate-300 text-sm uppercase tracking-wide">{session.subtitle}</p>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {session.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <Sparkles className="h-4 w-4 text-emerald-400 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl border border-slate-700 bg-slate-950/70">
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-800">
                      <CodeBlockIcon sessionId={session.id} />
                      <p className="font-semibold text-slate-200">{session.codeTitle}</p>
                    </div>
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0 0 12px 12px',
                        background: 'rgba(10, 10, 15, 0.95)'
                      }}
                      showLineNumbers
                    >
                      {session.code}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-emerald-200">
                    <Activity className="h-4 w-4" />
                    Health Coach Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-slate-300">
                  <p>• Detect asymmetrical squats; nudge user before injury.</p>
                  <p>• Recognize hydration levels by spotting forgotten water bottles.</p>
                  <p>• Track workout density with YOLO events plotted over heart-rate zones.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-emerald-200">
                    <DollarSign className="h-4 w-4" />
                    Finance Guardian Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-slate-300">
                  <p>• Spot receipts instantly, tie them to transactions, and alert if invoices leave the office.</p>
                  <p>• Track retail shelf compliance for partner stores to prevent revenue leakage.</p>
                  <p>• Monitor cash handling with privacy-aware masking to satisfy compliance.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-emerald-200">
                    <Radio className="h-4 w-4" />
                    Session 40 Deployment Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-slate-300">
                  <p>1. Capture 200–400 labeled frames per scenario (Roboflow or Label Studio).</p>
                  <p>2. Run `python tools/split_dataset.py --ratio 0.8` inside <code>open-your-eyes</code>.</p>
                  <p>3. Fine-tune YOLO, export ONNX/TensorRT, push to Streamlit edge agent.</p>
                  <p>4. Validate metrics inside <code>dist/reports/session40_incidents.html</code>.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-slate-200" />
                <p className="font-semibold text-slate-200">Repo Anchor · open-your-eyes</p>
              </div>
              <p className="text-slate-300 text-sm">
                The <code>github.com/LaoWater/open-your-eyes</code> repository provides the scaffolding for these sessions:
                dataset templates, augmentation scripts, and streaming dashboards. We adapt it to our mission, extending the
                training configuration with health and finance personas to prove the need-first philosophy.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Button
                onClick={() => navigate('/machine-learning')}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500"
              >
                <Brain className="h-4 w-4" />
                Return to Machine Learning Journey
              </Button>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Camera className="h-4 w-4 text-emerald-300" />
                <span>Next milestone: integrate YOLO events with Streamlit + Supabase real-time listeners.</span>
              </div>
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
                onClick={() => navigate('/artifacts/cnn-sessions37-38')}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Revisit Sessions 37-38
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CodeBlockIcon = ({ sessionId }: { sessionId: string }) => {
  if (sessionId === 'session39') {
    return <Map className="h-4 w-4 text-emerald-300" />;
  }
  if (sessionId === 'session40') {
    return <Cpu className="h-4 w-4 text-emerald-300" />;
  }
  return <BarChart className="h-4 w-4 text-emerald-300" />;
};

export default YOLOSessions3940;
