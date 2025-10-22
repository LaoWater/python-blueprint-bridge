import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Globe, Zap, Cloud, Server, Users, Heart, DollarSign, Activity, Target, ArrowLeft, ChevronDown, ChevronUp, Package, Database, Shield, TrendingUp } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';
import { useNavigate } from 'react-router-dom';

const ProductionDeploymentSessions48_49 = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    simpleFlask: false,
    simpleStreamlit: false,
    flaskAPI: false,
    streamlitData: false,
    simpleMlModel: false,
    productionDl: false,
    huggingFace: false,
    healthProjects: false,
    financeProjects: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const storyChapters = [
    {
      icon: "💡",
      title: "2010: The Model That Never Saw Sunlight",
      content: "A machine learning researcher builds a cancer detection model with 96% accuracy. It lives on their laptop. Zero patients helped.",
      details: (
        <div className="space-y-3">
          <p><strong>The Silent Achievement:</strong> A Stanford PhD student spends 6 months perfecting a melanoma detection model.</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>96.3% accuracy on test data</li>
            <li>Could save thousands of lives annually</li>
            <li>Published in a prestigious journal</li>
            <li><strong className="text-red-600 dark:text-red-400">Problem: Only works on the researcher's laptop</strong></li>
          </ul>
          <p className="pt-3"><strong>The Brutal Reality:</strong></p>
          <p className="italic text-muted-foreground">
            "The model is brilliant. But hospitals can't use it. Doctors can't access it.
            Patients can't benefit from it. It's a masterpiece locked in a vault."
          </p>
          <p className="pt-3 text-lg font-semibold text-red-600 dark:text-red-400">
            A model that can't be deployed is a model that doesn't exist.
          </p>
        </div>
      )
    },
    {
      icon: "🚧",
      title: "The Deployment Wall: Where Data Scientists Hit Reality",
      content: "2012-2015: Data scientists build amazing models. Then hand them to engineers who say 'this will take 6 months to deploy.'",
      details: (
        <div className="space-y-3">
          <p><strong>The Traditional Process:</strong></p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Step 1:</strong> Data scientist trains model (3 months)<br/>
              <strong>Step 2:</strong> Write documentation (2 weeks)<br/>
              <strong>Step 3:</strong> Hand to software engineers (1 week meetings)<br/>
              <strong>Step 4:</strong> Engineers rewrite in production language (2-3 months)<br/>
              <strong>Step 5:</strong> DevOps sets up infrastructure (1 month)<br/>
              <strong>Step 6:</strong> Security review (1 month)<br/>
              <strong>Step 7:</strong> Deploy to production (2 weeks)<br/>
              <strong className="text-red-600 dark:text-red-400">Total: 7-9 months from model to production</strong>
            </p>
          </div>
          <p className="pt-3"><strong>The Frustration:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Models become outdated during deployment</li>
            <li>Lost in translation between teams</li>
            <li>Slow iteration cycles kill innovation</li>
            <li>Startups can't compete with this timeline</li>
          </ul>
          <p className="pt-3 text-blue-600 dark:text-blue-400 font-semibold italic">
            "What if data scientists could deploy their own models in hours, not months?"
          </p>
        </div>
      )
    },
    {
      icon: "<",
      title: "2012-2018: The Web Framework Revolution",
      content: "Flask democratizes web development. Streamlit makes data apps trivial. The deployment barrier starts crumbling.",
      details: (
        <div className="space-y-3">
          <p><strong>Flask (2010):</strong> Armin Ronacher creates a micro-framework</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Web API in 5 lines of code</li>
            <li>Python-native (no context switching)</li>
            <li>Perfect for ML model APIs</li>
          </ul>
          <p className="pt-3"><strong>Streamlit (2019):</strong> Three ex-Google engineers solve UI problem</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Interactive data apps without HTML/CSS/JS</li>
            <li>Pure Python from model to interface</li>
            <li>Deployment in one command</li>
            <li><strong>From Jupyter notebook to production web app in 30 minutes</strong></li>
          </ul>
          <p className="pt-3 text-green-600 dark:text-green-400 font-semibold">
            The gap between "model trained" and "model deployed" collapsed from months to hours.
          </p>
        </div>
      )
    },
    {
      icon: ">",
      title: "2016-2024: Hugging Face Changes Everything",
      content: "Model hosting becomes as easy as git push. NLP models that took weeks to deploy now launch in 5 minutes.",
      details: (
        <div className="space-y-3">
          <p><strong>The Problem Hugging Face Solved:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Every team rebuilding model serving infrastructure</li>
            <li>Model sharing through email/Dropbox</li>
            <li>No standardized deployment format</li>
            <li>GPU infrastructure expensive and complex</li>
          </ul>
          <p className="pt-3"><strong>The Solution:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Model Hub:</strong> Git for AI models</li>
            <li><strong>Inference API:</strong> Deploy with zero infrastructure</li>
            <li><strong>Spaces:</strong> Host ML demos for free</li>
            <li><strong>Transformers Library:</strong> Standardized model interface</li>
          </ul>
          <p className="pt-3 text-purple-600 dark:text-purple-400 font-semibold italic">
            "Upload your model. Share a URL. That's deployment."
          </p>
        </div>
      )
    },
    {
      icon: "🚀",
      title: "2024: Your TurnFrom Local Models to Global Impact",
      content: "Today: A solo developer can deploy AI to millions. Your health tracker. Your finance advisor. Real code. Real impact.",
      details: (
        <div className="space-y-3">
          <p className="text-lg font-semibold">The Power Is Now In YOUR Hands:</p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="font-semibold text-green-800 dark:text-green-200 mb-2">🏥 Health Applications You'll Deploy:</p>
              <ul className="text-sm space-y-1">
                <li>• Workout fatigue predictor (Flask API)</li>
                <li>• Nutrition pattern analyzer (Streamlit)</li>
                <li>• Sleep quality forecaster (deployed model)</li>
                <li>• Meal photo classifier (Hugging Face)</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Finance Applications You'll Deploy:</p>
              <ul className="text-sm space-y-1">
                <li>• Spending pattern API (Flask)</li>
                <li>• Budget dashboard (Streamlit)</li>
                <li>• Expense category predictor (deployed model)</li>
                <li>• Receipt text extractor (Hugging Face OCR)</li>
              </ul>
            </div>
          </div>

          <p className="pt-4 text-lg font-bold text-purple-600 dark:text-purple-400">
            This Session: We start with "Hello World" and end with production AI systems.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p className="text-sm">
              <strong>💡 The Dharma Approach:</strong> We won't dive straight into "deploy your deep learning model."
              We'll grow naturallysimple Flask app → data API → simple ML → production DL → cloud deployment.
              Each step builds understanding. Each example connects to YOUR real projects.
            </p>
          </div>
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-4">
            <Rocket className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sessions 48-49: Production Deployment & Global Scaling
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From Jupyter Notebook to Production: Deploy Your AI Models to the World
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>~4-5 hours total</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Real-World Deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Production-Ready</span>
            </div>
          </div>
        </div>

        {/* Story Mode */}
        <div className="mb-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Story: Models That Change Lives Must First Reach Lives
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
        </div>

        {/* Learning Path Overview */}
        <div className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-purple-800 dark:text-purple-200">
            =� Our Journey: From "Hello World" to Production AI
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                <h3 className="font-semibold">Simple Flask App</h3>
              </div>
              <p className="text-sm text-muted-foreground">Start with a basic "Hello World" web server. Understand HTTP, routes, and responses.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">2</div>
                <h3 className="font-semibold">Simple Streamlit App</h3>
              </div>
              <p className="text-sm text-muted-foreground">Build an interactive data viewer. No HTML/CSSpure Python UI.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">3</div>
                <h3 className="font-semibold">Flask API with Data</h3>
              </div>
              <p className="text-sm text-muted-foreground">Create a REST API that serves your health/finance data. Real queries, real responses.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold">4</div>
                <h3 className="font-semibold">Streamlit Dashboard</h3>
              </div>
              <p className="text-sm text-muted-foreground">Build interactive dashboards with charts, filters, and real-time data updates.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">5</div>
                <h3 className="font-semibold">Deploy Simple ML</h3>
              </div>
              <p className="text-sm text-muted-foreground">Serve a scikit-learn model via Flask. Handle predictions, preprocessing, and responses.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 font-bold">6</div>
                <h3 className="font-semibold">Production Deep Learning</h3>
              </div>
              <p className="text-sm text-muted-foreground">Deploy Keras/TensorFlow models with proper error handling, logging, and optimization.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">7</div>
                <h3 className="font-semibold">Hugging Face & Cloud Deployment</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Host models on Hugging Face Spaces. Deploy to Streamlit Cloud. From localhost to global access in minutes.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-sm">
              <strong>🎯 Key Philosophy:</strong> Each step is RUNNABLE. Each example uses YOUR project data.
              By the end, you'll have deployed real applications solving real problems you care about.
            </p>
          </div>
        </div>

        {/* SECTION 1: Simple Flask Application */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('simpleFlask')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
              <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Step 1: Your First Web Server (Flask Basics)
            </h2>
            {expandedSections.simpleFlask ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.simpleFlask && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                  🎯 The Need: Understanding Web Communication
                </h3>
                <p className="text-sm mb-3">
                  Before we deploy AI models, we need to understand the fundamental question:
                  <strong> How does a user's browser talk to your Python code?</strong>
                </p>
                <p className="text-sm mb-3">
                  Every deployed modelwhether it's GPT-4, Google Translate, or your health tracker
                  works through a web server. Let's build one from scratch to understand how.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">What We're Building:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>A web server that responds to HTTP requests</li>
                    <li>Multiple routes (like pages on a website)</li>
                    <li>Dynamic responses based on user input</li>
                    <li>The foundation for all ML deployment</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Installation</h3>
                <CodeBlockR language="bash">
{`# Install Flask - the micro web framework
pip install flask

# Verify installation
python -c "import flask; print(f'Flask {flask.__version__} is ready!')"

# That's it! Flask is lightweight and powerful.`}
                </CodeBlockR>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example 1: Hello World Web Server</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The simplest possible web server. This is the foundation of EVERYTHING—
                  from simple APIs to complex AI systems.
                </p>
                <CodeBlockR language="python">
{`# app_hello.py
from flask import Flask

# Create a Flask application instance
app = Flask(__name__)

# Define a route - what happens when someone visits '/'
@app.route('/')
def hello():
    return "Hello, World! Your first web server is running!"

# Run the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)

# 🚀 To run: python app_hello.py
# < Then visit: http://localhost:5000 in your browser`}
                </CodeBlockR>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">✅ What Just Happened:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside ml-2">
                    <li>Flask created a web server on your computer</li>
                    <li>It listens on port 5000 for incoming requests</li>
                    <li>When someone visits <code>http://localhost:5000</code>, Flask calls your <code>hello()</code> function</li>
                    <li>Your function returns text, which Flask sends back to the browser</li>
                  </ol>
                  <p className="text-sm mt-3 italic">
                    <strong>This is deployment fundamentals.</strong> Every API, every ML service,
                    every web application works this wayrequests come in, your code runs, responses go out.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example 2: Multiple Routes & Dynamic Content</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Now let's add multiple "endpoints" (URLs) and make our responses dynamic.
                  This is how real APIs workdifferent routes do different things.
                </p>
                <CodeBlockR language="python">
{`# app_routes.py
from flask import Flask, request
from datetime import datetime

app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return """
    <h1>Welcome to Your API!</h1>
    <p>Available routes:</p>
    <ul>
        <li><a href="/hello/YourName">/hello/YourName</a> - Personalized greeting</li>
        <li><a href="/time">/time</a> - Current server time</li>
        <li><a href="/health">/health</a> - Health data example</li>
        <li><a href="/finance">/finance</a> - Finance data example</li>
    </ul>
    """

# Dynamic route with parameter
@app.route('/hello/<name>')
def hello_name(name):
    return f"<h1>Hello, {name}!</h1><p>Welcome to deployment mastery.</p>"

# Time endpoint
@app.route('/time')
def get_time():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return {
        "timestamp": current_time,
        "message": "Current server time",
        "timezone": "Server local time"
    }

# Health data simulation
@app.route('/health')
def health_data():
    # This simulates data you might calculate from your health tracking
    return {
        "status": "healthy",
        "metrics": {
            "sleep_hours": 7.5,
            "workout_completed": True,
            "calories": 2100,
            "water_intake_liters": 2.3
        },
        "message": "Today's health snapshot"
    }

# Finance data simulation
@app.route('/finance')
def finance_data():
    # This simulates data from your finance tracking
    return {
        "status": "on_budget",
        "metrics": {
            "daily_spending": 45.30,
            "budget_remaining": 354.70,
            "savings_goal_progress": 0.68  # 68% toward goal
        },
        "message": "Today's financial snapshot"
    }

if __name__ == '__main__':
    app.run(debug=True, port=5000)

# =� Run: python app_routes.py
# < Try:
#   http://localhost:5000/hello/Alice
#   http://localhost:5000/time
#   http://localhost:5000/health
#   http://localhost:5000/finance`}
                </CodeBlockR>

                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">💡 Key Concepts Unlocked:</p>
                  <ul className="text-sm space-y-2">
                    <li>
                      <strong>Routes (`@app.route()`):</strong> Different URLs trigger different functions.
                      Like having different rooms in a houseeach does something specific.
                    </li>
                    <li>
                      <strong>Dynamic Parameters (`&lt;name&gt;`):</strong> Capture values from the URL.
                      <code>/hello/Alice</code> passes "Alice" to your function.
                    </li>
                    <li>
                      <strong>JSON Responses:</strong> When you return a dictionary, Flask automatically
                      converts it to JSONthe language of APIs.
                    </li>
                    <li>
                      <strong>The Pattern:</strong> URL → Function → Response. This is how ALL web services work,
                      from Twitter's API to OpenAI's GPT endpoints.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>🎯 What You Just Learned:</strong><br/>
                  You've built the foundation of EVERY deployed application. When you deploy a Keras model later,
                  you'll use this exact pattern: a route receives input, your model processes it, Flask returns the prediction.
                  <br/><br/>
                  <strong>Next:</strong> Let's see how Streamlit makes interactive UIs even simpler.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Simple Streamlit Application */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('simpleStreamlit')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              Step 2: Interactive Data Apps (Streamlit Basics)
            </h2>
            {expandedSections.simpleStreamlit ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.simpleStreamlit && (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                  🎯 The Need: Data Scientists Who Can't Build UIs
                </h3>
                <p className="text-sm mb-3">
                  Flask is powerful, but what if you want buttons, sliders, charts, and file uploads?
                  Traditionally, you'd need to learn HTML, CSS, JavaScript... but that's weeks of learning
                  before you can show your analysis to stakeholders.
                </p>
                <p className="text-sm mb-3 font-semibold text-green-700 dark:text-green-300">
                  Streamlit's Promise: Write Python. Get a beautiful, interactive web app. No frontend code.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">Perfect For:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>Internal dashboards (show your team insights)</li>
                    <li>ML model demos (let users interact with predictions)</li>
                    <li>Data exploration tools (filters, charts, tables)</li>
                    <li>Prototypes that look production-ready in hours</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Installation</h3>
                <CodeBlockR language="bash">
{`# Install Streamlit
pip install streamlit

# Verify with demo app
streamlit hello

# This will open a browser showing Streamlit's built-in demo!
# Press Ctrl+C in terminal to stop it.`}
                </CodeBlockR>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example 1: Hello Streamlit</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The simplest Streamlit app. Notice how easy it is to add text, headers, and even code blocks.
                </p>
                <CodeBlockR language="python">
{`# app_streamlit_hello.py
import streamlit as st

# Set page configuration (optional but nice)
st.set_page_config(
    page_title="Hello Streamlit",
    page_icon="👋",
    layout="wide"
)

# Title and text
st.title("👋 Hello, Streamlit!")
st.write("Welcome to your first interactive data app.")

# Headers of different sizes
st.header("This is a header")
st.subheader("This is a subheader")

# Different text formats
st.text("Plain text.")
st.markdown("**Bold text** and *italic text* using Markdown!")

# Code block
st.code("""
def hello_world():
    print("Hello from Streamlit!")
""", language="python")

# Success/info/warning/error messages
st.success(" Success! Your app is running.")
st.info("9 Info: Streamlit auto-refreshes when you save your script.")
st.warning("� Warning example.")
st.error("❌ Error example.")

# Divider
st.divider()

# Balloons animation (just for fun!)
if st.button("🎈 Celebrate!"):
    st.balloons()
    st.write("You clicked the button!")

# 🚀 To run: streamlit run app_streamlit_hello.py
# < Automatically opens in browser at http://localhost:8501`}
                </CodeBlockR>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">✨ What Makes Streamlit Special:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li><strong>No HTML/CSS:</strong> Pure Python creates beautiful interfaces</li>
                    <li><strong>Auto-reload:</strong> Save your script → browser refreshes automatically</li>
                    <li><strong>Widgets built-in:</strong> Buttons, sliders, file uploadsone line of code</li>
                    <li><strong>Charts integrated:</strong> Works seamlessly with matplotlib, plotly, altair</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example 2: Interactive Widgets</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Let's add interactivitysliders, inputs, selections. This is where Streamlit shines.
                </p>
                <CodeBlockR language="python">
{`# app_streamlit_interactive.py
import streamlit as st
from datetime import date

st.set_page_config(page_title="Interactive Demo", page_icon="🎮", layout="wide")

st.title("<� Interactive Streamlit Widgets")
st.write("Move sliders, type in boxes, select optionssee instant updates!")

st.divider()

# Text input
name = st.text_input("What's your name?", value="Friend")
st.write(f"Hello, **{name}**! 👋")

# Number input
age = st.number_input("Your age:", min_value=1, max_value=120, value=25)
st.write(f"You are {age} years old.")

# Slider
hours = st.slider("Hours of sleep last night:", 0, 12, 7)
if hours < 6:
    st.error("😴 That's not enough sleep!")
elif hours <= 8:
    st.success("😊 Good sleep!")
else:
    st.info("😴 That's a lot of sleep!")

# Select box
exercise = st.selectbox(
    "What exercise did you do today?",
    ["None", "Running", "Gym", "Yoga", "Swimming", "Cycling"]
)
st.write(f"You chose: **{exercise}**")

# Multi-select
goals = st.multiselect(
    "What are your health goals?",
    ["Weight loss", "Muscle gain", "Better sleep", "Stress reduction", "Flexibility"],
    default=["Better sleep"]
)
st.write(f"Your goals: {', '.join(goals)}")

# Date input
selected_date = st.date_input("Select a date:", date.today())
st.write(f"You selected: {selected_date}")

# Checkbox
agree = st.checkbox("I agree to track my progress consistently")
if agree:
    st.success("✅ Great! Consistency is key.")

# Radio buttons
meal_type = st.radio("Last meal:", ["Breakfast", "Lunch", "Dinner", "Snack"])
st.write(f"You had: **{meal_type}**")

st.divider()

# Summary
st.subheader("📊 Summary of Your Inputs")
st.json({
    "name": name,
    "age": age,
    "sleep_hours": hours,
    "exercise": exercise,
    "goals": goals,
    "date": str(selected_date),
    "meal": meal_type
})

# 🚀 To run: streamlit run app_streamlit_interactive.py`}
                </CodeBlockR>

                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">💡 The Power of Interactivity:</p>
                  <ul className="text-sm space-y-2">
                    <li>
                      <strong>Reactive Updates:</strong> Change a slider → entire app re-runs → instant visual feedback.
                      This is how you make data exploration intuitive.
                    </li>
                    <li>
                      <strong>No State Management Needed:</strong> In traditional web apps, you'd manually track
                      what the user selected. Streamlit does it automatically.
                    </li>
                    <li>
                      <strong>Perfect for ML Demos:</strong> Imagine these sliders as model parameters
                      users adjust them, your model re-predicts, results update instantly.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>🎯 What You Just Learned:</strong><br/>
                  Streamlit lets you build professional-looking data apps in minutes. Later, you'll use these
                  same widgets to let users upload images for your image classifier, or adjust model parameters
                  in real-time.
                  <br/><br/>
                  <strong>Next:</strong> Let's combine Flask with real data to build proper APIs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Continue button for next sections */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold mb-3 text-center">🚀 Ready for More?</h3>
          <p className="text-center text-muted-foreground mb-4">
            We've laid the foundation. Now we'll build APIs with real data, deploy ML models, and eventually push to production.
          </p>
          <p className="text-center text-sm text-muted-foreground italic">
            (More sections coming as we continue building this artifact together...)
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductionDeploymentSessions48_49;
