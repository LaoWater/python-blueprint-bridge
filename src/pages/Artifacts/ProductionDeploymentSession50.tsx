import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Globe, Container, Network, Cloud, ArrowLeft, ChevronDown, ChevronUp, Server, Shield, Zap, TrendingUp, Users, Activity, Target, Heart, DollarSign, Box, Layers, Scale, GitBranch } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';
import { useNavigate } from 'react-router-dom';

const ProductionDeploymentSession50 = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    simpleContainer: false,
    flaskDocker: false,
    dockerCompose: false,
    kubernetes: false,
    realWorld: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const storyChapters = [
    {
      icon: "📦",
      title: "2006: The Pizza Shop Problem",
      content: "A developer's app works on their laptop. It breaks on the server. 'But it works on my machine!' becomes the most expensive sentence in software.",
      details: (
        <div className="space-y-3">
          <p><strong>The Classic Developer Nightmare:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>You build an amazing Flask app for your health tracker</li>
            <li>Works perfectly on your MacBook with Python 3.11</li>
            <li>Deploy to server running Python 3.8 → crashes</li>
            <li>Different library versions, different OS, different everything</li>
          </ul>
          <p className="pt-3"><strong>The Real Cost:</strong></p>
          <p className="italic text-muted-foreground">
            Spotify engineers spend 30% of their time debugging environment issues, not building features.
            Netflix loses millions when deployment fails because of dependency mismatches.
          </p>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-3">
            <p className="text-sm font-semibold text-red-800 dark:text-red-200">
              The pizza metaphor: Imagine ordering a pizza. The chef makes it perfect in their kitchen.
              But when delivered, the box is different, temperature changed, toppings shifted.
              <strong className="block mt-2">What if you could ship the entire kitchen, not just the pizza?</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      icon: "🐳",
      title: "2013: Docker Changes Everything",
      content: "Solomon Hykes demos Docker at PyCon. 'It works on my machine' becomes 'It works in this container.' Deployment revolutionized.",
      details: (
        <div className="space-y-3">
          <p><strong>The Docker Promise:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Package everything:</strong> Your app + Python + libraries + OS dependencies</li>
            <li><strong>Ship the environment:</strong> Works identically everywhere</li>
            <li><strong>Lightweight:</strong> Not a full VM, just isolated processes</li>
            <li><strong>Reproducible:</strong> Build once, run anywhere</li>
          </ul>
          <p className="pt-3"><strong>The Impact:</strong></p>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Before Docker:</strong> "Sorry, we can't deploy your ML model. It needs Python 3.9, TensorFlow 2.10, CUDA 11.2, libsm6, and 17 other dependencies. That breaks our production environment."
            </p>
            <p className="text-sm">
              <strong>After Docker:</strong> "Here's my container. It has everything. Just run it."
            </p>
          </div>
          <p className="pt-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
            Docker adoption: 0% (2013) → 80% of Fortune 500 companies (2024)
          </p>
        </div>
      )
    },
    {
      icon: "☸️",
      title: "2014-2015: Google's Secret Weapon Goes Public",
      content: "Google runs 2 billion containers per week using Borg. They open-source the concepts as Kubernetes. Container orchestration born.",
      details: (
        <div className="space-y-3">
          <p><strong>The Problem Docker Didn't Solve:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>You have 1 container → Docker is perfect</li>
            <li>You have 100 containers → Manual management nightmare</li>
            <li>What if a container crashes? Who restarts it?</li>
            <li>How do you update 100 containers without downtime?</li>
            <li>How do you balance traffic across containers?</li>
          </ul>
          <p className="pt-3"><strong>Kubernetes (K8s) Solves This:</strong></p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
              <p className="text-sm font-semibold mb-2">🔄 Self-Healing</p>
              <p className="text-xs">Container crashed? K8s automatically restarts it. No human intervention.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
              <p className="text-sm font-semibold mb-2">⚖️ Load Balancing</p>
              <p className="text-xs">Distributes traffic intelligently across all healthy containers.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
              <p className="text-sm font-semibold mb-2">📈 Auto-Scaling</p>
              <p className="text-xs">Traffic spike? K8s spawns more containers. Traffic drops? Scales down.</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-3">
              <p className="text-sm font-semibold mb-2">🔄 Zero-Downtime Updates</p>
              <p className="text-xs">Update your app without taking it offline. Rolling deployments.</p>
            </div>
          </div>
          <p className="pt-3 text-purple-600 dark:text-purple-400 font-semibold italic">
            "Kubernetes is like having a datacenter manager who never sleeps, never makes mistakes, and scales infinitely."
          </p>
        </div>
      )
    },
    {
      icon: "🌍",
      title: "2015-2024: Cloud Native Era",
      content: "AWS, Google Cloud, Azure build managed Kubernetes. Solo developers deploy global-scale applications. The barrier to scaling disappears.",
      details: (
        <div className="space-y-3">
          <p><strong>The Cloud Revolution:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>AWS ECS/EKS:</strong> Amazon's container services</li>
            <li><strong>Google Cloud Run:</strong> Deploy containers with one command</li>
            <li><strong>Azure AKS:</strong> Microsoft's managed Kubernetes</li>
            <li><strong>DigitalOcean App Platform:</strong> Simple container hosting</li>
          </ul>
          <p className="pt-3"><strong>What This Means for YOU:</strong></p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <p className="font-semibold mb-2">Your Health Tracker App Journey:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside ml-2">
              <li>Develop locally with Flask + ML model</li>
              <li>Containerize with Docker → works everywhere</li>
              <li>Deploy to Cloud Run → global availability in minutes</li>
              <li>Auto-scales from 0 to 1000s of users</li>
              <li>Pay only for actual usage</li>
            </ol>
            <p className="text-xs italic mt-3 text-muted-foreground">
              What took Netflix 1000 engineers and $millions in infrastructure...
              you can do with $5/month and 50 lines of config.
            </p>
          </div>
        </div>
      )
    },
    {
      icon: "🚀",
      title: "2024: Your Turn to Deploy at Scale",
      content: "Today: Learn the exact same tools used by Netflix, Spotify, and Airbnb. Deploy your health tracker and finance app globally.",
      details: (
        <div className="space-y-3">
          <p className="text-lg font-semibold">The Power Is Now In YOUR Hands:</p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="font-semibold text-green-800 dark:text-green-200 mb-2">🏥 Health Applications You'll Deploy:</p>
              <ul className="text-sm space-y-1">
                <li>• Workout tracker (Dockerized Flask API)</li>
                <li>• Meal classifier (Keras model in container)</li>
                <li>• Sleep predictor (Kubernetes deployment)</li>
                <li>• Global health dashboard (Multi-region K8s)</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Finance Applications You'll Deploy:</p>
              <ul className="text-sm space-y-1">
                <li>• Expense API (Docker container)</li>
                <li>• Budget dashboard (Containerized Streamlit)</li>
                <li>• Receipt OCR service (K8s with auto-scaling)</li>
                <li>• Multi-region financial analytics</li>
              </ul>
            </div>
          </div>

          <p className="pt-4 text-lg font-bold text-purple-600 dark:text-purple-400">
            This Session: From "works on my laptop" to "serves millions globally"
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p className="text-sm">
              <strong>💡 The Dharma Approach:</strong> We won't dive straight into Kubernetes YAML.
              We'll grow naturally: simple Docker container → multi-container app → orchestration → global scale.
              Each step builds understanding. Each example uses YOUR real project code.
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-4">
            <Container className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Session 50: Enterprise Scaling
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Docker, Kubernetes & Global Infrastructure
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From "It works on my machine" to "It works for millions of users worldwide"
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>~4-5 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Production-Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Container className="h-4 w-4" />
              <span>Enterprise Scale</span>
            </div>
          </div>
        </div>

        {/* Story Mode */}
        <div className="mb-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              The Story: When Your App Needs to Serve the World
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
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span className="mr-2">{chapter.icon}</span>
                Chapter {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Chapter Content */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
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
        </div>

        {/* Learning Path Overview */}
        <div className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800 dark:text-indigo-200">
            🗺️ Our Journey: From Simple Container to Global Scale
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                <h3 className="font-semibold">Your First Container</h3>
              </div>
              <p className="text-sm text-muted-foreground">Start with a simple "Hello World" Docker container. Understand images, containers, and why this solves "works on my machine."</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">2</div>
                <h3 className="font-semibold">Dockerize Flask API</h3>
              </div>
              <p className="text-sm text-muted-foreground">Package your health tracker Flask API. Create Dockerfile, build image, run container. Access your API from anywhere.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">3</div>
                <h3 className="font-semibold">Multi-Container with Compose</h3>
              </div>
              <p className="text-sm text-muted-foreground">Connect Flask API + Redis + PostgreSQL. Learn Docker Compose for managing multiple services together.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold">4</div>
                <h3 className="font-semibold">Containerize ML Model</h3>
              </div>
              <p className="text-sm text-muted-foreground">Package your Keras model in a container. Handle large files, optimize image size, serve predictions reliably.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">5</div>
                <h3 className="font-semibold">Kubernetes Basics</h3>
              </div>
              <p className="text-sm text-muted-foreground">Deploy to local K8s (Minikube). Learn Pods, Deployments, Services. Auto-healing and scaling concepts.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 font-bold">6</div>
                <h3 className="font-semibold">Cloud Deployment</h3>
              </div>
              <p className="text-sm text-muted-foreground">Deploy to real cloud (GCP Cloud Run, AWS ECS). From localhost:5000 to https://yourapp.com. Global scale achieved.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-sm">
              <strong>🎯 Key Philosophy:</strong> Each step is RUNNABLE on your machine first. Each example uses YOUR actual project code (health tracker, finance app).
              By the end, you'll have deployed real applications that can serve millions.
              <br/><br/>
              <strong>Prerequisites:</strong> You've completed Sessions 48-49 (Flask/Streamlit basics, model deployment).
              You have Docker installed (<code className="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">docker --version</code> works).
            </p>
          </div>
        </div>

        {/* SECTION 1: Your First Container */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('simpleContainer')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
              <Box className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Step 1: Your First Docker Container
            </h2>
            {expandedSections.simpleContainer ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.simpleContainer && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                  🎯 The Need: Understanding Containers
                </h3>
                <p className="text-sm mb-3">
                  Before we containerize your ML models and APIs, we need to understand the fundamental concept:
                  <strong> What IS a container, and why does it solve the "works on my machine" problem?</strong>
                </p>
                <p className="text-sm mb-3">
                  A container is like a shipping container for code. Just as shipping containers revolutionized global trade
                  by standardizing how goods are transported, Docker containers standardize how code runs.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">What We're Building:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>A simple Python script in a container</li>
                    <li>Understanding: Image vs Container</li>
                    <li>Basic Docker commands</li>
                    <li>The foundation for ALL deployment</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Installation Check</h3>
                <CodeBlockR language="bash">
{`# Verify Docker is installed
docker --version
# Should show: Docker version 20.x or higher

# Test Docker installation
docker run hello-world

# This downloads a tiny test image and runs it
# If you see "Hello from Docker!" - you're ready!

# On Mac/Windows: Install Docker Desktop
# On Linux: sudo apt install docker.io (Ubuntu/Debian)
#           sudo yum install docker (CentOS/RHEL)`}
                </CodeBlockR>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example 1: Simple Python Container</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Let's start with the simplest possible containerized Python application.
                  This demonstrates the core concepts before we add complexity.
                </p>

                <p className="text-sm font-semibold mb-2">Step 1: Create your Python script</p>
                <CodeBlockR language="python">
{`# hello_docker.py
print("Hello from inside a Docker container!")
print("This Python script is completely isolated.")
print("It has its own Python version, its own libraries.")
print("It will run EXACTLY the same on any machine.")`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 2: Create a Dockerfile</p>
                <p className="text-sm text-muted-foreground mb-2">
                  A Dockerfile is a recipe that tells Docker how to build your container image.
                </p>
                <CodeBlockR language="dockerfile">
{`# Dockerfile
# This is the "recipe" for building your container

# Start from official Python image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy your Python script into the container
COPY hello_docker.py .

# Command to run when container starts
CMD ["python", "hello_docker.py"]

# That's it! This simple file creates an isolated environment.`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 3: Build and Run</p>
                <CodeBlockR language="bash">
{`# Build the Docker image (creates the blueprint)
docker build -t my-first-container .

# Explanation:
#   docker build    = build an image
#   -t my-first-container = tag it with this name
#   .               = look for Dockerfile in current directory

# Run the container (creates a running instance)
docker run my-first-container

# You'll see:
# Hello from inside a Docker container!
# This Python script is completely isolated.
# ...

# 🎉 Congratulations! You just ran code in a container!`}
                </CodeBlockR>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">✅ What Just Happened:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside ml-2">
                    <li><strong>Image Created:</strong> Docker built a snapshot containing Python 3.11 + your script</li>
                    <li><strong>Container Launched:</strong> Docker created an isolated environment from that image</li>
                    <li><strong>Script Ran:</strong> Inside its own filesystem, process space, network</li>
                    <li><strong>Container Exited:</strong> Script finished, container stopped (but image remains)</li>
                  </ol>
                  <p className="text-sm mt-3 font-semibold">
                    🔑 Key Insight: You can send this image to ANYONE. They run the exact same code in the exact same environment.
                    No "it works on my machine" ever again.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example 2: Interactive Container</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Now let's create a container you can interact with. This is useful for debugging
                  and understanding how containers isolate environments.
                </p>
                <CodeBlockR language="bash">
{`# Run Ubuntu container with interactive shell
docker run -it ubuntu:22.04 bash

# Now you're INSIDE the container!
# Try these commands:

whoami          # Shows you're root user
pwd             # You're in /
ls              # See container filesystem
python3 --version  # Check Python version
apt update && apt install -y python3-pip  # Install packages
pip install numpy  # Install Python libraries

# Everything you install EXISTS ONLY IN THIS CONTAINER
# Exit the container:
exit

# The container stops. If you run it again, it's fresh (changes lost)
# That's the point - containers are ephemeral and reproducible!`}
                </CodeBlockR>

                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">💡 Understanding Images vs Containers:</p>
                  <ul className="text-sm space-y-2">
                    <li>
                      <strong>Image:</strong> A blueprint/template. Like a class in OOP. Read-only.
                      Example: <code>python:3.11-slim</code>
                    </li>
                    <li>
                      <strong>Container:</strong> A running instance of an image. Like an object instantiated from a class.
                      Example: <code>docker run python:3.11-slim</code> creates a container from that image.
                    </li>
                    <li>
                      <strong>Analogy:</strong> Image = recipe. Container = actual dish cooked from that recipe.
                      You can create infinite containers from one image.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Essential Docker Commands</h3>
                <CodeBlockR language="bash">
{`# List all images on your machine
docker images

# List running containers
docker ps

# List ALL containers (including stopped ones)
docker ps -a

# Stop a running container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# Remove an image
docker rmi <image-name>

# See logs from a container
docker logs <container-id>

# Execute command in running container
docker exec -it <container-id> bash

# Clean up stopped containers
docker container prune

# Clean up unused images
docker image prune

# Nuclear option: remove EVERYTHING
docker system prune -a
# Use with caution! This deletes all containers, images, networks, etc.`}
                </CodeBlockR>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>🎯 What You Just Learned:</strong><br/>
                  You understand the foundation of modern deployment. Every application you'll deploy—
                  from simple Flask APIs to complex ML models—uses these exact concepts. The complexity comes
                  from what you PUT in the container, not how containers work.
                  <br/><br/>
                  <strong>Next:</strong> Let's containerize your Flask API from Session 48.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Dockerize Flask API */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('flaskDocker')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />
              Step 2: Dockerize Your Flask API
            </h2>
            {expandedSections.flaskDocker ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.flaskDocker && (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                  🎯 The Need: Deploy Your Health Tracker API
                </h3>
                <p className="text-sm mb-3">
                  In Session 48, you built a Flask API that serves health/finance data. It works on your laptop.
                  Now you want to deploy it to a server, share it with friends, or run it on a Raspberry Pi.
                </p>
                <p className="text-sm mb-3">
                  <strong>The Problem:</strong> Your laptop has Python 3.11, Flask 2.3, and specific library versions.
                  The server has Python 3.8 and different versions. Your API breaks.
                </p>
                <p className="text-sm mb-3 font-semibold text-green-700 dark:text-green-300">
                  The Solution: Container + your Flask app = Works anywhere.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example: Health Tracker API (Containerized)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  We'll take the Flask API from Session 48 and containerize it. This is a REAL working example.
                </p>

                <p className="text-sm font-semibold mb-2">Step 1: Your Flask App</p>
                <CodeBlockR language="python">
{`# app.py - Health Tracker API
from flask import Flask, jsonify, request
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Simulated health data (in production, this comes from a database)
health_data = {
    "sleep_hours": [7.5, 6.8, 8.2, 7.0, 6.5],
    "workout_minutes": [45, 30, 60, 0, 40],
    "calories": [2100, 2300, 1950, 2400, 2000],
    "water_liters": [2.5, 2.0, 3.0, 1.8, 2.2]
}

@app.route('/')
def home():
    return jsonify({
        "message": "Health Tracker API - Dockerized!",
        "version": "1.0",
        "endpoints": ["/health", "/stats", "/predict"]
    })

@app.route('/health')
def get_health():
    """Get current health metrics"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "latest": {
            "sleep": health_data["sleep_hours"][-1],
            "workout": health_data["workout_minutes"][-1],
            "calories": health_data["calories"][-1],
            "water": health_data["water_liters"][-1]
        }
    })

@app.route('/stats')
def get_stats():
    """Calculate health statistics"""
    return jsonify({
        "averages": {
            "sleep": round(np.mean(health_data["sleep_hours"]), 2),
            "workout": round(np.mean(health_data["workout_minutes"]), 2),
            "calories": round(np.mean(health_data["calories"]), 2),
            "water": round(np.mean(health_data["water_liters"]), 2)
        },
        "trends": {
            "sleep_improving": health_data["sleep_hours"][-1] > np.mean(health_data["sleep_hours"]),
            "active_days": sum(1 for w in health_data["workout_minutes"] if w > 0)
        }
    })

@app.route('/predict', methods=['POST'])
def predict_fatigue():
    """Simple fatigue predictor based on sleep and workout"""
    data = request.json
    sleep = data.get('sleep_hours', 7)
    workout = data.get('workout_minutes', 0)

    # Simple heuristic (in Session 48, you'd use your ML model here)
    fatigue_score = max(0, min(100, 50 - (sleep - 7) * 10 + workout / 2))

    return jsonify({
        "fatigue_score": round(fatigue_score, 1),
        "recommendation": "Rest" if fatigue_score > 70 else "Active" if fatigue_score < 30 else "Moderate"
    })

if __name__ == '__main__':
    # Important: listen on 0.0.0.0 (not localhost) for Docker
    app.run(host='0.0.0.0', port=5000, debug=False)`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 2: Requirements File</p>
                <CodeBlockR language="text">
{`# requirements.txt
# List all Python dependencies your app needs
flask==3.0.0
numpy==1.24.3
gunicorn==21.2.0

# In production, we use gunicorn instead of Flask's dev server
# It's more robust and can handle multiple requests simultaneously`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 3: Dockerfile</p>
                <CodeBlockR language="dockerfile">
{`# Dockerfile for Flask Health Tracker API
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (Docker layer caching optimization)
# If requirements.txt doesn't change, Docker reuses this layer
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Expose port 5000
EXPOSE 5000

# Use gunicorn for production (more robust than flask dev server)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]

# workers=2: Run 2 processes to handle concurrent requests
# In production, set workers = (2 × CPU cores) + 1`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 4: Build and Run</p>
                <CodeBlockR language="bash">
{`# Build the Docker image
docker build -t health-tracker-api .

# This takes ~1-2 minutes first time
# Docker downloads Python image, installs dependencies

# Run the container
docker run -d -p 5000:5000 --name health-api health-tracker-api

# Explanation:
#   -d                = detached mode (runs in background)
#   -p 5000:5000      = map port 5000 on host to port 5000 in container
#   --name health-api = give container a friendly name
#   health-tracker-api = the image to use

# Check it's running
docker ps

# Test the API
curl http://localhost:5000
curl http://localhost:5000/health
curl http://localhost:5000/stats

# Or open in browser: http://localhost:5000

# View logs
docker logs health-api

# Stop the container
docker stop health-api

# Remove the container
docker rm health-api`}
                </CodeBlockR>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">🚀 What You Just Achieved:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>Your Flask API is now containerized</li>
                    <li>It includes Python 3.11, Flask, NumPy, and Gunicorn</li>
                    <li>This container will run identically on:
                      <ul className="list-circle list-inside ml-6 mt-1">
                        <li>Your laptop (Mac/Windows/Linux)</li>
                        <li>AWS EC2 server</li>
                        <li>Google Cloud</li>
                        <li>Your friend's Raspberry Pi</li>
                        <li>A Kubernetes cluster serving millions of users</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-sm mt-3 font-semibold">
                    🔑 This is exactly how Spotify, Netflix, and Uber deploy their APIs.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Optimization: Smaller Image Size</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your image is probably ~200MB. For production, smaller is better (faster downloads, less storage cost).
                  Let's optimize.
                </p>
                <CodeBlockR language="dockerfile">
{`# Dockerfile.optimized
FROM python:3.11-slim

# Install only system dependencies we need
RUN apt-get update && apt-get install -y --no-install-recommends \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy only necessary files
COPY app.py .

# Don't run as root (security best practice)
RUN useradd -m appuser
USER appuser

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]

# Build with: docker build -f Dockerfile.optimized -t health-api:optimized .
# This image will be smaller and more secure`}
                </CodeBlockR>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>🎯 What You Just Learned:</strong><br/>
                  You've containerized a real Flask API. This is production-grade deployment. Add a database connection,
                  environment variables for secrets, and you have what billion-dollar companies use.
                  <br/><br/>
                  <strong>Exercise:</strong> Containerize your finance API from Session 48. Same process!
                  <br/><br/>
                  <strong>Next:</strong> Let's orchestrate multiple containers together with Docker Compose.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Docker Compose - Multi-Container Applications */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('dockerCompose')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <Network className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              Step 3: Docker Compose - Multi-Container Systems
            </h2>
            {expandedSections.dockerCompose ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.dockerCompose && (
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">
                  🎯 The Need: Real Apps Need Multiple Services
                </h3>
                <p className="text-sm mb-3">
                  Your Flask API works great in a container. But real applications need more:
                </p>
                <ul className="text-sm list-disc list-inside ml-4 space-y-1">
                  <li><strong>Database:</strong> PostgreSQL to store health/finance data persistently</li>
                  <li><strong>Cache:</strong> Redis for fast session storage and rate limiting</li>
                  <li><strong>API:</strong> Your Flask application</li>
                  <li><strong>Worker:</strong> Background tasks for ML predictions</li>
                </ul>
                <p className="text-sm mt-3 font-semibold text-purple-700 dark:text-purple-300">
                  Managing 4 containers manually? Nightmare. Docker Compose: Define once, run all together.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example: Health Tracker with Database & Cache</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Let's build a complete system: Flask API + PostgreSQL + Redis. All managed with one command.
                </p>

                <p className="text-sm font-semibold mb-2">Step 1: Enhanced Flask App (with database)</p>
                <CodeBlockR language="python">
{`# app_full.py - Health Tracker with PostgreSQL and Redis
from flask import Flask, jsonify, request
import psycopg2
import redis
import os
import json
from datetime import datetime

app = Flask(__name__)

# Database connection (from environment variables)
def get_db():
    return psycopg2.connect(
        host=os.environ.get('DB_HOST', 'db'),
        database=os.environ.get('DB_NAME', 'healthdb'),
        user=os.environ.get('DB_USER', 'postgres'),
        password=os.environ.get('DB_PASSWORD', 'secretpassword')
    )

# Redis connection
cache = redis.Redis(
    host=os.environ.get('REDIS_HOST', 'redis'),
    port=6379,
    decode_responses=True
)

@app.route('/')
def home():
    return jsonify({
        "message": "Health Tracker API - Full Stack!",
        "version": "2.0",
        "services": {
            "database": "PostgreSQL",
            "cache": "Redis",
            "api": "Flask"
        }
    })

@app.route('/health/log', methods=['POST'])
def log_health():
    """Store health data in database"""
    data = request.json

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO health_logs (user_id, sleep_hours, workout_minutes, calories, water_liters, logged_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        data.get('user_id', 1),
        data.get('sleep_hours'),
        data.get('workout_minutes'),
        data.get('calories'),
        data.get('water_liters'),
        datetime.now()
    ))

    log_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    # Clear cache to force recalculation of stats
    cache.delete('health_stats')

    return jsonify({"id": log_id, "message": "Health data logged!"})

@app.route('/health/stats')
def get_stats():
    """Get health statistics (with Redis caching)"""

    # Try to get from cache first
    cached = cache.get('health_stats')
    if cached:
        return jsonify(json.loads(cached))

    # Cache miss - calculate from database
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            AVG(sleep_hours) as avg_sleep,
            AVG(workout_minutes) as avg_workout,
            AVG(calories) as avg_calories,
            AVG(water_liters) as avg_water,
            COUNT(*) as total_logs
        FROM health_logs
        WHERE logged_at > NOW() - INTERVAL '7 days'
    """)

    row = cur.fetchone()
    stats = {
        "averages": {
            "sleep": round(float(row[0] or 0), 2),
            "workout": round(float(row[1] or 0), 2),
            "calories": round(float(row[2] or 0), 2),
            "water": round(float(row[3] or 0), 2)
        },
        "total_logs": row[4],
        "cached": False
    }

    cur.close()
    conn.close()

    # Cache for 5 minutes
    cache.setex('health_stats', 300, json.dumps(stats))

    return jsonify(stats)

@app.route('/health/init-db', methods=['POST'])
def init_db():
    """Initialize database schema (run once)"""
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS health_logs (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            sleep_hours DECIMAL(4,2),
            workout_minutes INTEGER,
            calories INTEGER,
            water_liters DECIMAL(4,2),
            logged_at TIMESTAMP NOT NULL
        )
    """)

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Database initialized!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 2: Updated Requirements</p>
                <CodeBlockR language="text">
{`# requirements.txt
flask==3.0.0
gunicorn==21.2.0
psycopg2-binary==2.9.9
redis==5.0.1`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 3: Docker Compose Configuration</p>
                <p className="text-sm text-muted-foreground mb-2">
                  This single file defines ALL services and how they connect.
                </p>
                <CodeBlockR language="yaml">
{`# docker-compose.yml
version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    container_name: health_db
    environment:
      POSTGRES_DB: healthdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
    volumes:
      # Persist data even when container stops
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: health_redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  # Flask API
  api:
    build: .
    container_name: health_api
    environment:
      DB_HOST: db
      DB_NAME: healthdb
      DB_USER: postgres
      DB_PASSWORD: secretpassword
      REDIS_HOST: redis
    ports:
      - "5000:5000"
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:

# Network is automatically created
# All services can communicate using service names as hostnames`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 4: Run Everything with One Command</p>
                <CodeBlockR language="bash">
{`# Start all services (builds if needed)
docker-compose up -d

# Docker Compose will:
# 1. Create a network
# 2. Start PostgreSQL container
# 3. Start Redis container
# 4. Build and start your Flask API
# 5. Connect them all together

# Watch logs from all services
docker-compose logs -f

# Or watch specific service
docker-compose logs -f api

# Initialize the database (run once)
curl -X POST http://localhost:5000/health/init-db

# Test the full stack!
curl -X POST http://localhost:5000/health/log \\
  -H "Content-Type: application/json" \\
  -d '{
    "sleep_hours": 7.5,
    "workout_minutes": 45,
    "calories": 2100,
    "water_liters": 2.5
  }'

# Get statistics (first call hits database, subsequent calls hit cache)
curl http://localhost:5000/health/stats

# Stop everything
docker-compose down

# Stop AND remove data volumes
docker-compose down -v`}
                </CodeBlockR>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">✅ What You Just Achieved:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li><strong>Multi-Service Architecture:</strong> API, Database, Cache working together</li>
                    <li><strong>Service Discovery:</strong> Containers find each other by name (api → db, api → redis)</li>
                    <li><strong>Data Persistence:</strong> Database survives container restarts</li>
                    <li><strong>Health Checks:</strong> System waits for services to be ready</li>
                    <li><strong>One Command:</strong> <code>docker-compose up</code> starts entire stack</li>
                  </ul>
                  <p className="text-sm mt-3 font-semibold">
                    🔑 This is a production-grade architecture. Add monitoring and backups, you have what startups run on.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>🎯 What You Just Learned:</strong><br/>
                  Docker Compose orchestrates multiple containers. Perfect for development and small-scale production.
                  But what happens when you need 100 containers across 10 servers? That's where Kubernetes enters.
                  <br/><br/>
                  <strong>Exercise:</strong> Add a 4th service: a worker container that processes ML predictions in the background.
                  <br/><br/>
                  <strong>Next:</strong> Kubernetes - Enterprise-grade orchestration for massive scale.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: Kubernetes Basics */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('kubernetes')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
              <Scale className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              Step 4: Kubernetes - From Hundreds to Millions
            </h2>
            {expandedSections.kubernetes ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.kubernetes && (
            <div className="space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-800 dark:text-indigo-200">
                  🎯 The Need: When Docker Compose Isn't Enough
                </h3>
                <p className="text-sm mb-3">
                  <strong>Scenario:</strong> Your health tracker goes viral. 10,000 users hit your API simultaneously.
                </p>
                <ul className="text-sm list-disc list-inside ml-4 space-y-1">
                  <li>Docker Compose runs on ONE machine. What if that machine crashes?</li>
                  <li>You need 50 API containers across 10 servers. Manual management? Impossible.</li>
                  <li>Traffic spikes at 7am (morning workouts). You need auto-scaling.</li>
                  <li>Zero-downtime deploys. Users should never see "Service Unavailable"</li>
                </ul>
                <p className="text-sm mt-3 font-semibold text-indigo-700 dark:text-indigo-300">
                  Kubernetes: Google's solution to managing 2 billion containers per week. Now yours.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Installing Kubernetes Locally (Minikube)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Before deploying to cloud K8s, let's run it locally to understand the concepts.
                </p>
                <CodeBlockR language="bash">
{`# Install Minikube (single-node Kubernetes cluster on your laptop)
# Mac:
brew install minikube kubectl

# Windows:
choco install minikube kubernetes-cli

# Linux:
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start Minikube
minikube start

# This takes 2-3 minutes - downloads Kubernetes and starts a VM

# Verify installation
kubectl version
kubectl get nodes

# You should see one node: "minikube Ready"`}
                </CodeBlockR>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Kubernetes Concepts (Simplified)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p className="font-semibold mb-2">📦 Pod</p>
                    <p className="text-sm">Smallest unit. Contains 1+ containers. Like a "house" for your container.</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <p className="font-semibold mb-2">🚀 Deployment</p>
                    <p className="text-sm">Manages Pods. Says "I want 5 replicas of my API always running." K8s ensures it.</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <p className="font-semibold mb-2">🌐 Service</p>
                    <p className="text-sm">Stable network endpoint. Pods come/go (dynamic IPs). Service provides fixed address.</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <p className="font-semibold mb-2">💾 ConfigMap/Secret</p>
                    <p className="text-sm">Store configuration (ConfigMap) and sensitive data (Secret) separately from code.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Example: Deploy Health Tracker to Kubernetes</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  We'll deploy the same Flask API, but now Kubernetes manages it with auto-healing and scaling.
                </p>

                <p className="text-sm font-semibold mb-2">Step 1: Build and Push Docker Image</p>
                <CodeBlockR language="bash">
{`# Build image
docker build -t health-tracker-api:v1 .

# For Minikube, use Minikube's Docker daemon
eval $(minikube docker-env)
docker build -t health-tracker-api:v1 .

# For cloud deployment, push to registry:
# docker tag health-tracker-api:v1 gcr.io/your-project/health-api:v1
# docker push gcr.io/your-project/health-api:v1`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 2: Kubernetes Deployment Configuration</p>
                <CodeBlockR language="yaml">
{`# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: health-api
  labels:
    app: health-tracker
spec:
  replicas: 3  # Run 3 copies of your API
  selector:
    matchLabels:
      app: health-tracker
  template:
    metadata:
      labels:
        app: health-tracker
    spec:
      containers:
      - name: api
        image: health-tracker-api:v1
        ports:
        - containerPort: 5000
        env:
        - name: ENVIRONMENT
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 3

---
apiVersion: v1
kind: Service
metadata:
  name: health-api-service
spec:
  selector:
    app: health-tracker
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
  type: LoadBalancer  # Exposes service externally`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 3: Deploy to Kubernetes</p>
                <CodeBlockR language="bash">
{`# Apply configuration
kubectl apply -f k8s-deployment.yaml

# Watch pods being created
kubectl get pods -w

# You'll see something like:
# health-api-7d8f9c5b6-abcde   1/1     Running   0          10s
# health-api-7d8f9c5b6-fghij   1/1     Running   0          10s
# health-api-7d8f9c5b6-klmno   1/1     Running   0          10s

# Check deployment status
kubectl get deployments

# Check service
kubectl get services

# Get service URL (Minikube)
minikube service health-api-service --url

# Test the API
curl $(minikube service health-api-service --url)/health`}
                </CodeBlockR>

                <p className="text-sm font-semibold mb-2 mt-4">Step 4: Experience Kubernetes Magic</p>
                <CodeBlockR language="bash">
{`# 1. AUTO-HEALING: Kill a pod
kubectl get pods  # Note pod names
kubectl delete pod health-api-7d8f9c5b6-abcde

# Watch Kubernetes IMMEDIATELY create a replacement
kubectl get pods -w
# Kubernetes ensures 3 replicas ALWAYS running

# 2. SCALING: Increase to 10 replicas
kubectl scale deployment health-api --replicas=10

# Watch new pods spawn
kubectl get pods

# 3. ROLLING UPDATE: Deploy new version with ZERO downtime
# Update image version
kubectl set image deployment/health-api api=health-tracker-api:v2

# Kubernetes gradually replaces old pods with new ones
# Users never experience downtime
kubectl rollout status deployment/health-api

# 4. ROLLBACK: New version has bugs? Instant rollback
kubectl rollout undo deployment/health-api

# 5. VIEW LOGS: From all pods
kubectl logs -l app=health-tracker --tail=50

# 6. AUTO-SCALING: Scale based on CPU usage
kubectl autoscale deployment health-api --min=3 --max=50 --cpu-percent=70
# If CPU > 70%, Kubernetes spawns more pods automatically`}
                </CodeBlockR>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">🚀 What You Just Achieved:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li><strong>High Availability:</strong> 3 replicas → if one crashes, others handle traffic</li>
                    <li><strong>Auto-Healing:</strong> Pod dies → K8s restarts it automatically</li>
                    <li><strong>Load Balancing:</strong> Service distributes traffic across all healthy pods</li>
                    <li><strong>Zero-Downtime Deploys:</strong> Rolling updates keep service online</li>
                    <li><strong>Auto-Scaling:</strong> Traffic spike → more pods spawn automatically</li>
                  </ul>
                  <p className="text-sm mt-3 font-semibold">
                    🔑 This is how Netflix, Spotify, Airbnb, and every modern company deploys at scale.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>🎯 What You Just Learned:</strong><br/>
                  Kubernetes orchestrates containers at massive scale. What took 1000 engineers at Netflix,
                  you just did with YAML files. This is the power of cloud-native infrastructure.
                  <br/><br/>
                  <strong>Exercise:</strong> Add a PostgreSQL deployment and connect your API to it in Kubernetes.
                  <br/><br/>
                  <strong>Next:</strong> Deploy to REAL cloud (GCP/AWS) and serve millions globally.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: Cloud Deployment & Global Scale */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('realWorld')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center gap-3">
              <Cloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Step 5: Cloud Deployment - Serve the World
            </h2>
            {expandedSections.realWorld ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.realWorld && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                  🎯 The Final Step: From localhost:5000 to the World
                </h3>
                <p className="text-sm mb-3">
                  You've built, containerized, and orchestrated your application. Now comes the ultimate moment:
                  deploying to real cloud infrastructure where millions can access it.
                </p>
                <p className="text-sm mb-3 font-semibold text-blue-700 dark:text-blue-300">
                  We'll explore three paths: Simple (Cloud Run), Intermediate (Cloud Functions), Advanced (GKE/EKS).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Option 1: Google Cloud Run (Simplest)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Cloud Run: Deploy containers with one command. Fully managed, auto-scales from 0 to 1000s, pay only for requests.
                </p>
                <CodeBlockR language="bash">
{`# Prerequisites: Install Google Cloud CLI
# https://cloud.google.com/sdk/docs/install

# 1. Authenticate
gcloud auth login

# 2. Set project
gcloud config set project YOUR-PROJECT-ID

# 3. Deploy your container in ONE COMMAND
gcloud run deploy health-tracker \\
  --source . \\
  --region us-central1 \\
  --allow-unauthenticated

# That's it! Cloud Run:
# - Builds your Docker image
# - Pushes to Google Container Registry
# - Deploys to Cloud Run
# - Gives you a URL: https://health-tracker-xxx-uc.a.run.app

# Your API is now globally accessible!
# curl https://health-tracker-xxx-uc.a.run.app/health

# Features you get automatically:
# ✅ HTTPS certificate (secure)
# ✅ Auto-scaling (0 to millions)
# ✅ Global CDN
# ✅ Load balancing
# ✅ DDoS protection
# ✅ Pay only for actual usage

# Update your app (zero downtime)
gcloud run deploy health-tracker --source .

# View logs
gcloud run logs read health-tracker

# Estimated cost: FREE for first 2 million requests/month
# Then: $0.00002 per request (= $2 per 100,000 requests)`}
                </CodeBlockR>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">✅ Perfect For:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>APIs and microservices</li>
                    <li>ML model serving</li>
                    <li>Startups and MVPs</li>
                    <li>Apps with variable traffic</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Option 2: AWS Elastic Container Service (ECS)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  AWS ECS: Similar to Cloud Run, but in AWS ecosystem. Great if you're already on AWS.
                </p>
                <CodeBlockR language="bash">
{`# Prerequisites: Install AWS CLI and configure
aws configure

# 1. Create ECR repository (container registry)
aws ecr create-repository --repository-name health-tracker

# 2. Build and push Docker image
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin \\
  YOUR-ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com

docker build -t health-tracker .
docker tag health-tracker:latest \\
  YOUR-ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/health-tracker:latest
docker push YOUR-ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/health-tracker:latest

# 3. Create ECS task definition (defines your container)
# Create file: task-definition.json
cat > task-definition.json << 'EOF'
{
  "family": "health-tracker",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [{
    "name": "api",
    "image": "YOUR-ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/health-tracker:latest",
    "portMappings": [{"containerPort": 5000}]
  }]
}
EOF

aws ecs register-task-definition --cli-input-json file://task-definition.json

# 4. Create ECS cluster and service (using AWS Console is easier for first time)
# Or use AWS Copilot CLI for simpler deployment:
brew install aws/tap/copilot-cli
copilot init  # Interactive setup
copilot deploy

# Your API is now on: https://your-app.region.elb.amazonaws.com`}
                </CodeBlockR>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Option 3: Managed Kubernetes (GKE/EKS)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For enterprise scale, full control, and complex architectures. More complex but ultimate power.
                </p>
                <CodeBlockR language="bash">
{`# Google Kubernetes Engine (GKE)
# 1. Create cluster
gcloud container clusters create health-cluster \\
  --zone us-central1-a \\
  --num-nodes 3 \\
  --machine-type n1-standard-2

# 2. Get credentials
gcloud container clusters get-credentials health-cluster --zone us-central1-a

# 3. Deploy your application
kubectl apply -f k8s-deployment.yaml

# 4. Expose with Load Balancer
kubectl expose deployment health-api \\
  --type LoadBalancer \\
  --port 80 \\
  --target-port 5000

# Get external IP
kubectl get services

# Your API is now at: http://<EXTERNAL-IP>/

# --- OR ---

# Amazon Elastic Kubernetes Service (EKS)
# 1. Create cluster
eksctl create cluster \\
  --name health-cluster \\
  --region us-east-1 \\
  --nodes 3 \\
  --node-type t3.medium

# 2. Deploy (same kubectl commands as above)
kubectl apply -f k8s-deployment.yaml`}
                </CodeBlockR>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">🏢 Enterprise Features:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li><strong>Multi-Region:</strong> Deploy across continents for low latency</li>
                    <li><strong>Advanced Networking:</strong> VPCs, private clusters, service mesh</li>
                    <li><strong>Monitoring:</strong> Prometheus, Grafana, distributed tracing</li>
                    <li><strong>CI/CD:</strong> GitOps with ArgoCD, automated deployments</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Real-World Production Checklist</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>HTTPS/TLS certificates</li>
                      <li>Secrets management (not in code!)</li>
                      <li>Authentication & authorization</li>
                      <li>Rate limiting</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Observability
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Logging (structured logs)</li>
                      <li>Metrics (Prometheus)</li>
                      <li>Distributed tracing</li>
                      <li>Alerts & dashboards</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Performance
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Caching (Redis/CDN)</li>
                      <li>Database connection pooling</li>
                      <li>Async processing (Celery/RQ)</li>
                      <li>Load testing</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      DevOps
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>CI/CD pipelines</li>
                      <li>Automated testing</li>
                      <li>Database backups</li>
                      <li>Disaster recovery plan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                  🎉 Congratulations! You've Reached Production Mastery
                </h3>
                <p className="text-sm mb-3">
                  Your journey: From <code>print("Hello World")</code> to deploying globally-scaled, containerized,
                  auto-healing, auto-scaling applications that can serve millions.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">What You Can Deploy Now:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>🏥 <strong>Health Tracker:</strong> ML-powered workout & nutrition analysis app</li>
                    <li>💰 <strong>Finance Dashboard:</strong> Real-time expense tracking with predictions</li>
                    <li>🤖 <strong>ML Model APIs:</strong> Serve Keras/TensorFlow models at scale</li>
                    <li>📊 <strong>Data Dashboards:</strong> Interactive Streamlit apps for stakeholders</li>
                    <li>🌍 <strong>Global Services:</strong> Multi-region, high-availability systems</li>
                  </ul>
                </div>
                <p className="text-sm mt-4 italic font-semibold">
                  The same infrastructure used by Fortune 500 companies is now in YOUR hands.
                  What will you build?
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Final Summary */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            🏆 Session 50 Complete: You Are Production-Ready
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🐳</div>
              <p className="font-semibold mb-1">Docker Mastery</p>
              <p className="text-xs text-muted-foreground">Containerize any application. "Works on my machine" solved forever.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">☸️</div>
              <p className="font-semibold mb-1">Kubernetes Power</p>
              <p className="text-xs text-muted-foreground">Orchestrate at scale. Auto-healing, auto-scaling, zero-downtime deploys.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">☁️</div>
              <p className="font-semibold mb-1">Cloud Deployment</p>
              <p className="text-xs text-muted-foreground">GCP, AWS, Azure. Serve millions globally. Enterprise-grade infrastructure.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-sm text-center">
              <strong>🚀 What's Next?</strong><br/>
              Take your health tracker or finance app from Session 48-49. Containerize it. Deploy it to Cloud Run or ECS.
              Share the URL with friends. You've just deployed production infrastructure used by billion-dollar companies.
              <br/><br/>
              <strong>The Art of Programming:</strong> It's not about memorizing Docker commands or K8s YAML.
              It's about understanding WHY these tools exist, WHAT problems they solve, and WHEN to use each.
              You now have that understanding.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductionDeploymentSession50;
