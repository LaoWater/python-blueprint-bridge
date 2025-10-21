import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Camera, AlertTriangle, Navigation, Eye, Activity, Target, ArrowLeft, ChevronDown, ChevronUp, Clock, Layers, Download, Cpu, Zap } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';
import { useNavigate } from 'react-router-dom';

const KerasSession46 = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    foundation: false,
    objectdetection: false,
    dataprep: false,
    modelarchitecture: false,
    realtime: false,
    deployment: false,
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
      icon: "🚗",
      title: "2004: The DARPA Grand Challenge - Vision Fails",
      content: "Stanford Racing Team attempts autonomous desert navigation. Cameras feed pixels to algorithms. Result: Crashes into fence after 200 meters. The problem? Traditional computer vision can't understand 'drivable surface' from raw pixels.",
      details: (
        <div className="space-y-3">
          <p><strong>The Brutal Reality:</strong> Autonomous driving is HARD. A human driver makes 200 perception decisions per second. How do you teach a machine to do that?</p>
          <p><strong>Traditional Vision Failures:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Lane Detection:</strong> Hand-coded Canny edge detection fails in shadows, rain, snow</li>
            <li><strong>Object Recognition:</strong> Template matching can't handle orientation changes</li>
            <li><strong>Depth Estimation:</strong> Stereo vision breaks with camera calibration errors</li>
            <li><strong>Result:</strong> 90% of teams failed to complete the 2004 course</li>
          </ul>
          <p className="pt-2"><strong>The Core Problem:</strong> Rules-based vision is brittle. Reality has infinite edge cases.</p>
          <p className="text-red-600 dark:text-red-400 font-semibold">The industry needed perception that LEARNS patterns from data, not hand-coded rules.</p>
        </div>
      )
    },
    {
      icon: "💡",
      title: "2012-2015: Deep Learning Breaks Through - AlexNet to Driving",
      content: "After AlexNet wins ImageNet 2012, researchers realize: CNNs that recognize cats can recognize pedestrians, vehicles, lanes. The same transfer learning that works for photos works for driving.",
      details: (
        <div className="space-y-3">
          <p><strong>The Insight:</strong> A CNN trained on ImageNet already learned:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Edges & Shapes:</strong> Detects vehicle contours, lane markings</li>
            <li><strong>Textures:</strong> Distinguishes road surface from grass, gravel, curbs</li>
            <li><strong>Object Recognition:</strong> Cars, pedestrians, traffic signs, bicycles</li>
            <li><strong>Spatial Reasoning:</strong> Understands object positions and distances</li>
          </ul>
          <p className="pt-2 text-blue-600 dark:text-blue-400 font-semibold italic">
            "The same VGG16 that classifies dog breeds can classify 'pedestrian ahead' with fine-tuning."
          </p>
          <p className="pt-2"><strong>The Transfer Learning Strategy for Autonomous Vehicles:</strong></p>
          <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>Start with ImageNet pre-trained CNN (VGG16, ResNet50)</li>
            <li>Fine-tune on driving datasets (KITTI, Waymo Open, BDD100K)</li>
            <li>Specialize for perception tasks: object detection, lane finding, depth estimation</li>
            <li>Deploy to vehicle compute platform (NVIDIA Jetson, Tesla FSD Computer)</li>
          </ol>
        </div>
      )
    },
    {
      icon: "🏆",
      title: "2016: Tesla Autopilot - Vision-First Autonomy",
      content: "Tesla deploys Autopilot in production vehicles. Pure vision-based lane keeping and adaptive cruise control. Millions of miles driven. Deep learning CNNs replace LiDAR and hand-coded rules.",
      details: (
        <div className="space-y-3">
          <p><strong>Tesla's Vision-First Approach:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>8 cameras:</strong> 360° coverage around vehicle</li>
            <li><strong>HydraNet architecture:</strong> Multi-task CNN (lanes + objects + depth from single backbone)</li>
            <li><strong>Transfer learning:</strong> Pre-trained on ImageNet, fine-tuned on billions of Tesla miles</li>
            <li><strong>Real-time:</strong> 36 FPS inference on custom hardware</li>
          </ul>
          <p className="pt-2"><strong>Key Capabilities:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Lane detection in rain, snow, faded markings</li>
            <li>Vehicle tracking up to 250 meters ahead</li>
            <li>Pedestrian & cyclist detection with motion prediction</li>
            <li>Traffic sign & signal recognition</li>
            <li>Depth estimation from monocular cameras (no LiDAR needed)</li>
          </ul>
          <p className="pt-2 text-green-600 dark:text-green-400 font-semibold">
            Vision-based deep learning made production autonomous driving economically feasible.
          </p>
        </div>
      )
    },
    {
      icon: "🚀",
      title: "2018-2024: Democratization - Raspberry Pi Autonomous Cars",
      content: "What required $200K of LiDAR in 2010 now runs on a $35 Raspberry Pi with a camera. MobileNet transfer learning enables real-time perception on edge devices.",
      details: (
        <div className="space-y-3">
          <p><strong>The Hardware Evolution:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>2010:</strong> DARPA cars used Velodyne LiDAR ($75K), high-end GPUs ($10K), rack servers</li>
            <li><strong>2016:</strong> Tesla Autopilot compute ($500-1K per vehicle)</li>
            <li><strong>2020:</strong> NVIDIA Jetson Nano ($99) runs real-time perception</li>
            <li><strong>2024:</strong> Raspberry Pi 4 ($35) + Camera ($15) = working autonomous prototype</li>
          </ul>
          <p className="pt-2"><strong>Hobbyist & Research Projects:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>DonkeyCar:</strong> Open-source autonomous RC car (MobileNet on Raspberry Pi)</li>
            <li><strong>F1/10:</strong> University autonomous racing platform</li>
            <li><strong>Comma.ai openpilot:</strong> Open-source driving assistance</li>
            <li><strong>DIY self-driving:</strong> Thousands of GitHub repos with transfer learning approaches</li>
          </ul>
          <p className="pt-2 text-purple-600 dark:text-purple-400 font-semibold">
            Transfer learning made autonomous vehicle perception accessible to students, hobbyists, and small teams.
          </p>
        </div>
      )
    },
    {
      icon: "🎯",
      title: "TODAY: YOUR Autonomous Perception System",
      content: "From Tesla's billion-dollar vision stack to YOUR local prototype. Same principles. Same transfer learning. Scaled to run on your laptop or Raspberry Pi.",
      details: (
        <div className="space-y-3">
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            What We're Building Today:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>🚗 <strong>Lane Detection:</strong> Identify drivable area from camera feed</li>
            <li>🚙 <strong>Vehicle Detection:</strong> Locate and track cars ahead</li>
            <li>🚶 <strong>Pedestrian Detection:</strong> Identify people near vehicle path</li>
            <li>🚦 <strong>Traffic Sign Recognition:</strong> Classify stop signs, yield, speed limits</li>
            <li>⚡ <strong>Real-time Inference:</strong> 15-30 FPS on CPU, 60+ FPS on GPU</li>
          </ul>
          <p className="pt-3 text-lg font-semibold text-green-600 dark:text-green-400">
            The Transfer Learning Stack:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Backbone:</strong> MobileNetV2 or ResNet50 (pre-trained on ImageNet)</li>
            <li><strong>Detection Head:</strong> Custom layers for bounding box prediction</li>
            <li><strong>Dataset:</strong> KITTI (autonomous driving benchmark) - free & open</li>
            <li><strong>Training Time:</strong> 2-6 hours on free Google Colab</li>
            <li><strong>Deployment:</strong> TensorFlow Lite for edge devices</li>
          </ul>
          <p className="pt-3 text-lg italic">
            <strong>What You'll Have:</strong> A working autonomous vehicle perception system running locally on your machine.
            Not a simulation. Not a toy. Real computer vision detecting real objects in driving scenarios.
          </p>
          <p className="pt-3 font-semibold text-orange-600 dark:text-orange-400">
            The same architecture that powers Tesla Autopilot's perception... now running in YOUR environment.
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-4">
            <Car className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Session 46: Autonomous Vehicle Perception
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building Real-Time Vision Systems: From Tesla's Autopilot to YOUR Local Prototype
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>~4 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Advanced</span>
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
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              The Origin Story: How Machines Learned to Drive
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
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span className="mr-2">{chapter.icon}</span>
                Chapter {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Chapter Content */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
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
              <strong>💡 The Dharma Approach:</strong> Autonomous vehicles weren't invented because someone wanted to build cool robots.
              They emerged because <em>humans kill 40,000+ people per year in car accidents in the US alone</em>, and
              <em>90% of crashes are caused by human error</em>. The <strong>NEED</strong> came first (safer transportation).
              The <strong>TOOL</strong> followed (vision-based deep learning). We build solutions because we understand the problems they solve.
            </p>
          </div>
        </div>

        {/* Perception Foundation */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('foundation')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              Autonomous Perception Foundation: What the Car Must "See"
            </h2>
            {expandedSections.foundation ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.foundation && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                  The Perception Stack: From Pixels to Driving Decisions
                </h3>
                <p className="text-foreground/80 mb-4">
                  <strong>The Challenge:</strong> A human driver processes visual information at incredible speed—
                  identifying lanes, vehicles, pedestrians, traffic signs, road conditions—all while predicting motion and planning actions.
                  We need to teach a neural network to do the same.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-blue-300 dark:border-blue-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Navigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-bold text-sm text-blue-700 dark:text-blue-300">1. Lane Detection & Segmentation</h4>
                    </div>
                    <p className="text-xs text-foreground/70 mb-2">
                      <strong>Task:</strong> Identify drivable surface, lane markings, road boundaries
                    </p>
                    <p className="text-xs text-foreground/70">
                      <strong>CNN Approach:</strong> Semantic segmentation—classify each pixel as road/lane/other.
                      Output: Pixel-wise mask showing where the car can drive.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h4 className="font-bold text-sm text-green-700 dark:text-green-300">2. Object Detection</h4>
                    </div>
                    <p className="text-xs text-foreground/70 mb-2">
                      <strong>Task:</strong> Locate and classify vehicles, pedestrians, cyclists, traffic signs
                    </p>
                    <p className="text-xs text-foreground/70">
                      <strong>CNN Approach:</strong> Object detection—output bounding boxes + class labels.
                      Models: YOLO, SSD, Faster R-CNN (all use CNN backbones).
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <h4 className="font-bold text-sm text-orange-700 dark:text-orange-300">3. Depth Estimation</h4>
                    </div>
                    <p className="text-xs text-foreground/70 mb-2">
                      <strong>Task:</strong> Estimate distance to objects (critical for collision avoidance)
                    </p>
                    <p className="text-xs text-foreground/70">
                      <strong>CNN Approach:</strong> Monocular depth estimation—predict depth map from single camera.
                      Tesla's approach: Learn depth from stereo pairs during training, deploy monocular.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300">4. Motion Prediction</h4>
                    </div>
                    <p className="text-xs text-foreground/70 mb-2">
                      <strong>Task:</strong> Predict where vehicles/pedestrians will move next
                    </p>
                    <p className="text-xs text-foreground/70">
                      <strong>CNN Approach:</strong> Temporal CNNs or RNNs—analyze video sequences to predict future positions.
                      Critical for safe path planning.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2 text-purple-800 dark:text-purple-200">Our Focus Today: Object Detection with Transfer Learning</p>
                  <div className="space-y-2 text-xs text-foreground/70">
                    <p>
                      We'll build a <strong>real-time object detection system</strong> that identifies vehicles, pedestrians, and traffic signs
                      from camera feeds. This is the foundation of autonomous perception—once you can detect objects, you can:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Track their motion over time (Kalman filters, SORT algorithm)</li>
                      <li>Estimate their distance (depth networks or stereo vision)</li>
                      <li>Predict their future positions (temporal models)</li>
                      <li>Plan safe trajectories around them (path planning algorithms)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Preparation */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('dataprep')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <Download className="h-8 w-8 text-green-600 dark:text-green-400" />
              Dataset Setup: KITTI Autonomous Driving Benchmark
            </h2>
            {expandedSections.dataprep ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.dataprep && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
                  KITTI: The Gold Standard for Autonomous Driving Research
                </h3>
                <p className="text-foreground/80 mb-4">
                  <strong>What is KITTI?</strong> Created by Karlsruhe Institute of Technology and Toyota, KITTI is the most widely-used
                  benchmark for autonomous driving perception. It provides real driving scenarios with high-quality labels.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-300">Dataset Contents:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-xs text-foreground/70">
                      <li>7,481 training images from forward-facing camera</li>
                      <li>7,518 test images (labels withheld for competition)</li>
                      <li>Object classes: Car, Van, Truck, Pedestrian, Cyclist, Tram</li>
                      <li>Bounding box annotations with occlusion/truncation flags</li>
                      <li>3D object locations and dimensions (LiDAR data)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-300">Why KITTI?</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-xs text-foreground/70">
                      <li>Real-world driving scenarios (urban, highway, rural)</li>
                      <li>Challenging conditions (shadows, occlusions, varied lighting)</li>
                      <li>Standardized benchmark (compare with state-of-the-art)</li>
                      <li>Free and open-source</li>
                      <li>Used by major AV companies (research validation)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlockR language="bash">
{`# ==========================================
# STEP-BY-STEP: Download KITTI Dataset
# ==========================================

# OPTION 1: Direct Download (Recommended)
# ----------------------------------------
# Visit: http://www.cvlibs.net/datasets/kitti/eval_object.php?obj_benchmark=2d

# Download these files:
# 1. Left color images (training): 12 GB
#    https://s3.eu-central-1.amazonaws.com/avg-kitti/data_object_image_2.zip
#
# 2. Training labels:
#    https://s3.eu-central-1.amazonaws.com/avg-kitti/data_object_label_2.zip

# OPTION 2: Use wget (Linux/Mac)
# --------------------------------
mkdir -p ~/datasets/kitti
cd ~/datasets/kitti

# Download images
wget https://s3.eu-central-1.amazonaws.com/avg-kitti/data_object_image_2.zip

# Download labels
wget https://s3.eu-central-1.amazonaws.com/avg-kitti/data_object_label_2.zip

# Extract
unzip data_object_image_2.zip
unzip data_object_label_2.zip

# ==========================================
# EXPECTED DIRECTORY STRUCTURE
# ==========================================

# After extraction, you should have:
# ~/datasets/kitti/
#   training/
#     image_2/
#       000000.png
#       000001.png
#       ... (7,481 images)
#     label_2/
#       000000.txt
#       000001.txt
#       ... (7,481 label files)

# ==========================================
# OPTION 3: Use Sample Subset (Quick Start)
# ==========================================

# If you want to start immediately without the full 12GB download,
# we'll create a function to download just 100 sample images:

# This will be handled in the Python code below

# ==========================================
# VERIFY DOWNLOAD
# ==========================================

ls -lh ~/datasets/kitti/training/image_2/ | head -10
# Should show .png files

ls -lh ~/datasets/kitti/training/label_2/ | head -10
# Should show .txt files

echo "Total images:"
ls ~/datasets/kitti/training/image_2/*.png | wc -l
# Should output: 7481

echo "Total labels:"
ls ~/datasets/kitti/training/label_2/*.txt | wc -l
# Should output: 7481`}
              </CodeBlockR>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-200">
                  📊 Understanding KITTI Label Format
                </h4>
                <p className="text-sm text-foreground/80 mb-3">
                  Each .txt file contains one line per object in the image. Here's what each column means:
                </p>
                <CodeBlockR language="python">
{`# Example label file: 000000.txt
# Format: type truncated occluded alpha bbox_left bbox_top bbox_right bbox_bottom ...
#
# Pedestrian 0.00 0 -0.20 712.40 143.00 810.73 307.92 1.89 0.48 1.20 1.84 1.47 8.41 0.01
# |          |    |  |     |                              |
# |          |    |  |     |                              3D dimensions (we'll skip these)
# |          |    |  |     Bounding box: (x1, y1, x2, y2)
# |          |    |  Observation angle
# |          |    Occlusion level (0=visible, 1=partly, 2=largely, 3=unknown)
# |          Truncation level (0.0 to 1.0, how much is cut off by image border)
# Object type: Car, Van, Truck, Pedestrian, Person_sitting, Cyclist, Tram, Misc, DontCare

# For object detection, we care about:
# - type: The class label
# - bbox: The bounding box coordinates (x1, y1, x2, y2)
# - occluded: Filter out heavily occluded objects (optional)
# - truncated: Filter out heavily truncated objects (optional)`}
                </CodeBlockR>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                  <p className="text-sm">
                    <strong>💡 Pro Tip:</strong> For this tutorial, we'll focus on 3 main classes: <strong>Car</strong>, <strong>Pedestrian</strong>, and <strong>Cyclist</strong>.
                    These are the most important for autonomous driving perception. We'll filter out other classes and heavily occluded objects
                    to create a cleaner training set.
                  </p>
                </div>
              </div>

              <CodeBlockR language="python">
{`# ==========================================
# PYTHON: Load and Visualize KITTI Dataset
# ==========================================

import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image
import urllib.request
from pathlib import Path

# ==========================================
# CONFIGURATION
# ==========================================

# Set your KITTI dataset path
KITTI_DIR = os.path.expanduser("~/datasets/kitti")
TRAIN_IMG_DIR = os.path.join(KITTI_DIR, "training/image_2")
TRAIN_LABEL_DIR = os.path.join(KITTI_DIR, "training/label_2")

# Classes we care about for autonomous driving
CLASSES = ['Car', 'Pedestrian', 'Cyclist']
CLASS_TO_ID = {cls: idx for idx, cls in enumerate(CLASSES)}
ID_TO_CLASS = {idx: cls for cls, idx in CLASS_TO_ID.items()}

print("="*70)
print("KITTI DATASET LOADER")
print("="*70)
print(f"Dataset directory: {KITTI_DIR}")
print(f"Classes: {CLASSES}")
print()

# ==========================================
# HELPER FUNCTION: Parse KITTI Label File
# ==========================================

def parse_kitti_label(label_path, filter_classes=True, min_height=25):
    """
    Parse KITTI label file and extract bounding boxes.

    Args:
        label_path: Path to .txt label file
        filter_classes: Only keep objects in CLASSES list
        min_height: Minimum bounding box height (filter tiny objects)

    Returns:
        List of dicts with keys: class_name, class_id, bbox (x1, y1, x2, y2)
    """
    if not os.path.exists(label_path):
        return []

    objects = []

    with open(label_path, 'r') as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) < 15:
                continue

            obj_type = parts[0]
            truncated = float(parts[1])
            occluded = int(parts[2])

            # Bounding box: left, top, right, bottom
            bbox = [float(x) for x in parts[4:8]]
            x1, y1, x2, y2 = bbox

            # Filter by class
            if filter_classes and obj_type not in CLASSES:
                continue

            # Filter heavily occluded (keep 0, 1; skip 2, 3)
            if occluded >= 2:
                continue

            # Filter heavily truncated (keep < 0.5)
            if truncated > 0.5:
                continue

            # Filter tiny objects
            height = y2 - y1
            if height < min_height:
                continue

            objects.append({
                'class_name': obj_type,
                'class_id': CLASS_TO_ID.get(obj_type, -1),
                'bbox': bbox,
                'truncated': truncated,
                'occluded': occluded
            })

    return objects

# ==========================================
# HELPER FUNCTION: Visualize Image with Boxes
# ==========================================

def visualize_kitti_sample(image_path, label_path, save_path=None):
    """
    Visualize KITTI image with bounding box annotations.
    """
    # Load image
    img = Image.open(image_path)

    # Parse labels
    objects = parse_kitti_label(label_path)

    # Plot
    fig, ax = plt.subplots(1, 1, figsize=(14, 8))
    ax.imshow(img)

    # Color map for classes
    colors = {
        'Car': 'blue',
        'Pedestrian': 'red',
        'Cyclist': 'green'
    }

    # Draw bounding boxes
    for obj in objects:
        x1, y1, x2, y2 = obj['bbox']
        class_name = obj['class_name']
        color = colors.get(class_name, 'yellow')

        # Draw rectangle
        rect = patches.Rectangle(
            (x1, y1), x2 - x1, y2 - y1,
            linewidth=2,
            edgecolor=color,
            facecolor='none'
        )
        ax.add_patch(rect)

        # Add label
        ax.text(
            x1, y1 - 5,
            class_name,
            color='white',
            fontsize=10,
            fontweight='bold',
            bbox=dict(facecolor=color, alpha=0.7, edgecolor='none', pad=2)
        )

    ax.axis('off')
    ax.set_title(f"KITTI Sample: {os.path.basename(image_path)}", fontsize=14, fontweight='bold')

    plt.tight_layout()

    if save_path:
        plt.savefig(save_path, dpi=150, bbox_inches='tight')
        print(f"Saved visualization: {save_path}")

    plt.show()

    return len(objects)

# ==========================================
# CHECK IF DATASET EXISTS
# ==========================================

if os.path.exists(TRAIN_IMG_DIR) and os.path.exists(TRAIN_LABEL_DIR):
    print("✅ KITTI dataset found!")

    # Count files
    num_images = len([f for f in os.listdir(TRAIN_IMG_DIR) if f.endswith('.png')])
    num_labels = len([f for f in os.listdir(TRAIN_LABEL_DIR) if f.endswith('.txt')])

    print(f"   Images: {num_images}")
    print(f"   Labels: {num_labels}")
    print()

    # Visualize a few samples
    print("="*70)
    print("VISUALIZING SAMPLE IMAGES")
    print("="*70)

    sample_ids = ['000000', '000010', '000050', '000100']

    for sample_id in sample_ids:
        img_path = os.path.join(TRAIN_IMG_DIR, f"{sample_id}.png")
        label_path = os.path.join(TRAIN_LABEL_DIR, f"{sample_id}.txt")

        if os.path.exists(img_path) and os.path.exists(label_path):
            print(f"\\nVisualizing: {sample_id}")
            num_objects = visualize_kitti_sample(
                img_path,
                label_path,
                save_path=f"kitti_sample_{sample_id}.png"
            )
            print(f"  Objects detected: {num_objects}")

else:
    print("⚠️  KITTI dataset not found at:", KITTI_DIR)
    print()
    print("Please download the dataset following the instructions above.")
    print("Or we can work with a small sample for demonstration...")
    print()
    print("Creating sample subset from public KITTI images...")

    # For tutorial purposes, we'll show how to work with images
    # In practice, you'd download the full dataset

print()
print("="*70)
print("DATASET STATISTICS")
print("="*70)

if os.path.exists(TRAIN_LABEL_DIR):
    # Count objects per class
    class_counts = {cls: 0 for cls in CLASSES}
    total_objects = 0
    images_with_objects = 0

    for label_file in os.listdir(TRAIN_LABEL_DIR):
        if not label_file.endswith('.txt'):
            continue

        label_path = os.path.join(TRAIN_LABEL_DIR, label_file)
        objects = parse_kitti_label(label_path)

        if objects:
            images_with_objects += 1

        for obj in objects:
            class_counts[obj['class_name']] += 1
            total_objects += 1

    print(f"Total images: {num_images}")
    print(f"Images with objects (after filtering): {images_with_objects}")
    print(f"Total objects: {total_objects}")
    print()
    print("Class distribution:")
    for cls in CLASSES:
        count = class_counts[cls]
        percentage = (count / total_objects * 100) if total_objects > 0 else 0
        print(f"  {cls:15s}: {count:6d} ({percentage:5.2f}%)")

    print()
    print("✅ Dataset ready for training!")
else:
    print("Waiting for dataset download...")

# ==========================================
# NEXT STEPS
# ==========================================

print()
print("="*70)
print("NEXT: BUILD OBJECT DETECTION MODEL")
print("="*70)
print("""
Now that we understand the KITTI dataset, we'll:

1. Build a CNN-based object detector using transfer learning
2. Fine-tune on KITTI for vehicle/pedestrian detection
3. Deploy for real-time inference
4. Test on driving videos

Continue to the next section to build the model!
""")`}
              </CodeBlockR>
            </div>
          )}
        </div>

        {/* Model Architecture Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('modelarchitecture')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
              <Layers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Building the Detection Model: MobileNet + Detection Head
            </h2>
            {expandedSections.modelarchitecture ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.modelarchitecture && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
                  Architecture Strategy: Feature Extraction + Object Detection
                </h3>
                <p className="text-foreground/80 mb-4">
                  We'll use a proven approach: <strong>MobileNetV2 backbone</strong> (pre-trained on ImageNet) + <strong>custom detection head</strong> (trained on KITTI).
                  This gives us real-time performance while maintaining accuracy.
                </p>
              </div>

              <CodeBlockR language="python">
{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
import numpy as np
import cv2

# ==========================================
# OBJECT DETECTION MODEL ARCHITECTURE
# ==========================================

print("="*70)
print("BUILDING AUTONOMOUS VEHICLE PERCEPTION MODEL")
print("="*70)
print()

# Configuration
IMG_HEIGHT = 224
IMG_WIDTH = 224
NUM_CLASSES = len(CLASSES)  # Car, Pedestrian, Cyclist
BATCH_SIZE = 16

# ==========================================
# MOBILENETV2 BACKBONE (FEATURE EXTRACTOR)
# ==========================================

# Load pre-trained MobileNetV2
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)
)

# Freeze base model initially
base_model.trainable = False

print("✅ MobileNetV2 backbone loaded")
print(f"   Parameters: {base_model.count_params():,}")
print(f"   Output shape: {base_model.output_shape}")
print()

# ==========================================
# SIMPLIFIED DETECTION HEAD
# ==========================================
# For this tutorial, we'll build a classification + bounding box regression model
# Production systems use YOLO, SSD, or Faster R-CNN architectures

def build_detection_model():
    """
    Build object detection model with:
    - MobileNetV2 backbone for feature extraction
    - Classification head (which object class)
    - Bounding box regression head (where is the object)
    """

    # Input layer
    inputs = keras.Input(shape=(IMG_HEIGHT, IMG_WIDTH, 3))

    # Feature extraction with MobileNetV2
    x = base_model(inputs, training=False)

    # Global pooling
    x = layers.GlobalAveragePooling2D()(x)

    # Dense layers for learning
    x = layers.Dense(256, activation='relu')(x)
    x = layers.Dropout(0.3)(x)
    x = layers.Dense(128, activation='relu')(x)
    x = layers.Dropout(0.3)(x)

    # Classification head: which class?
    class_output = layers.Dense(
        NUM_CLASSES,
        activation='softmax',
        name='class_output'
    )(x)

    # Bounding box regression head: where is the object?
    # Output: [x1, y1, x2, y2] normalized to [0, 1]
    bbox_output = layers.Dense(
        4,
        activation='sigmoid',  # Normalize to [0, 1]
        name='bbox_output'
    )(x)

    # Build model with multiple outputs
    model = keras.Model(
        inputs=inputs,
        outputs={
            'class': class_output,
            'bbox': bbox_output
        },
        name='AV_Perception_Model'
    )

    return model

# Build the model
model = build_detection_model()

print("="*70)
print("MODEL ARCHITECTURE")
print("="*70)
model.summary()
print()

# ==========================================
# COMPILE MODEL WITH MULTIPLE LOSSES
# ==========================================

# Since we have two outputs, we need two losses
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss={
        'class': 'sparse_categorical_crossentropy',  # Classification loss
        'bbox': 'mean_squared_error'  # Bounding box regression loss
    },
    loss_weights={
        'class': 1.0,  # Weight for classification loss
        'bbox': 5.0    # Higher weight for bbox (more important for detection)
    },
    metrics={
        'class': ['accuracy'],
        'bbox': ['mae']  # Mean absolute error for bbox
    }
)

print("✅ Model compiled with multi-task learning")
print("   Classification loss: categorical_crossentropy")
print("   Bounding box loss: mean_squared_error (weighted 5x)")
print()

# ==========================================
# DATA GENERATOR FOR KITTI
# ==========================================

class KITTIDataGenerator(keras.utils.Sequence):
    """
    Data generator for KITTI object detection.
    Loads images and labels on-the-fly during training.
    """

    def __init__(self, image_ids, image_dir, label_dir,
                 batch_size=16, img_size=(224, 224),
                 shuffle=True, augment=False):
        self.image_ids = image_ids
        self.image_dir = image_dir
        self.label_dir = label_dir
        self.batch_size = batch_size
        self.img_size = img_size
        self.shuffle = shuffle
        self.augment = augment
        self.on_epoch_end()

    def __len__(self):
        return int(np.ceil(len(self.image_ids) / self.batch_size))

    def __getitem__(self, index):
        # Get batch indices
        batch_ids = self.image_ids[
            index * self.batch_size:(index + 1) * self.batch_size
        ]

        # Generate batch
        X, y_class, y_bbox = self._generate_batch(batch_ids)

        return X, {'class': y_class, 'bbox': y_bbox}

    def on_epoch_end(self):
        if self.shuffle:
            np.random.shuffle(self.image_ids)

    def _generate_batch(self, batch_ids):
        batch_images = []
        batch_classes = []
        batch_bboxes = []

        for img_id in batch_ids:
            # Load image
            img_path = os.path.join(self.image_dir, f"{img_id}.png")
            img = cv2.imread(img_path)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            orig_h, orig_w = img.shape[:2]

            # Resize to model input size
            img_resized = cv2.resize(img, self.img_size)
            img_normalized = img_resized / 255.0

            # Load labels
            label_path = os.path.join(self.label_dir, f"{img_id}.txt")
            objects = parse_kitti_label(label_path)

            # For simplicity, take the first object (or largest)
            # Production systems handle multiple objects per image
            if objects:
                # Pick the largest object by bbox area
                obj = max(objects, key=lambda o: (o['bbox'][2] - o['bbox'][0]) * (o['bbox'][3] - o['bbox'][1]))

                # Normalize bbox to [0, 1]
                x1, y1, x2, y2 = obj['bbox']
                bbox_norm = [
                    x1 / orig_w,
                    y1 / orig_h,
                    x2 / orig_w,
                    y2 / orig_h
                ]
                class_id = obj['class_id']
            else:
                # No object: background class and zero bbox
                bbox_norm = [0.0, 0.0, 0.0, 0.0]
                class_id = 0  # Default to first class

            batch_images.append(img_normalized)
            batch_classes.append(class_id)
            batch_bboxes.append(bbox_norm)

        return (
            np.array(batch_images, dtype=np.float32),
            np.array(batch_classes, dtype=np.int32),
            np.array(batch_bboxes, dtype=np.float32)
        )

# ==========================================
# PREPARE TRAINING/VALIDATION SPLIT
# ==========================================

# Get all image IDs
all_image_ids = [f.replace('.png', '') for f in os.listdir(TRAIN_IMG_DIR) if f.endswith('.png')]
all_image_ids.sort()

# Split 80/20
split_idx = int(len(all_image_ids) * 0.8)
train_ids = all_image_ids[:split_idx]
val_ids = all_image_ids[split_idx:]

print("="*70)
print("DATASET SPLIT")
print("="*70)
print(f"Total images: {len(all_image_ids)}")
print(f"Training: {len(train_ids)}")
print(f"Validation: {len(val_ids)}")
print()

# Create generators
train_gen = KITTIDataGenerator(
    train_ids, TRAIN_IMG_DIR, TRAIN_LABEL_DIR,
    batch_size=BATCH_SIZE,
    shuffle=True,
    augment=True
)

val_gen = KITTIDataGenerator(
    val_ids, TRAIN_IMG_DIR, TRAIN_LABEL_DIR,
    batch_size=BATCH_SIZE,
    shuffle=False,
    augment=False
)

print(f"✅ Data generators created")
print(f"   Training batches per epoch: {len(train_gen)}")
print(f"   Validation batches: {len(val_gen)}")
print()

# ==========================================
# CALLBACKS FOR TRAINING
# ==========================================

callbacks = [
    EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        'av_perception_best.keras',
        monitor='val_class_accuracy',
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

# ==========================================
# TRAIN THE MODEL
# ==========================================

print("="*70)
print("TRAINING AUTONOMOUS VEHICLE PERCEPTION MODEL")
print("="*70)
print("Expected training time:")
print("  - CPU: ~2-4 hours")
print("  - GPU: ~20-40 minutes")
print("="*70)
print()

# Stage 1: Train with frozen backbone
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=30,
    callbacks=callbacks,
    verbose=1
)

print()
print("✅ Stage 1 training complete (frozen backbone)")
print()

# ==========================================
# STAGE 2: FINE-TUNING (OPTIONAL)
# ==========================================

print("="*70)
print("STAGE 2: FINE-TUNING LAST LAYERS")
print("="*70)

# Unfreeze last 30 layers of MobileNetV2
base_model.trainable = True
fine_tune_at = len(base_model.layers) - 30

for layer in base_model.layers[:fine_tune_at]:
    layer.trainable = False

print(f"Unfreezing last {len(base_model.layers) - fine_tune_at} layers")
print()

# Recompile with lower learning rate
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-5),  # 100x lower
    loss={
        'class': 'sparse_categorical_crossentropy',
        'bbox': 'mean_squared_error'
    },
    loss_weights={
        'class': 1.0,
        'bbox': 5.0
    },
    metrics={
        'class': ['accuracy'],
        'bbox': ['mae']
    }
)

# Fine-tune
history_ft = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=10,
    callbacks=callbacks,
    verbose=1
)

print()
print("✅ Fine-tuning complete")
print()

# ==========================================
# SAVE FINAL MODEL
# ==========================================

model.save('av_perception_final.keras')
print("Final model saved: av_perception_final.keras")
print()`}
              </CodeBlockR>
            </div>
          )}
        </div>

        {/* Real-Time Inference Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('realtime')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
              <Camera className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              Real-Time Inference: Testing on Driving Videos
            </h2>
            {expandedSections.realtime ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.realtime && (
            <div className="space-y-6">
              <CodeBlockR language="python">
{`# ==========================================
# REAL-TIME INFERENCE PIPELINE
# ==========================================

import cv2
import time

# Load trained model
model = keras.models.load_model('av_perception_final.keras')

print("="*70)
print("REAL-TIME AUTONOMOUS VEHICLE PERCEPTION")
print("="*70)
print()

# ==========================================
# INFERENCE FUNCTION
# ==========================================

def detect_objects(image, model, conf_threshold=0.5):
    """
    Run object detection on a single image.

    Returns:
        List of detections: [(class_name, confidence, bbox), ...]
    """
    # Preprocess
    img_h, img_w = image.shape[:2]
    img_resized = cv2.resize(image, (IMG_HEIGHT, IMG_WIDTH))
    img_normalized = img_resized / 255.0
    img_batch = np.expand_dims(img_normalized, axis=0)

    # Inference
    predictions = model.predict(img_batch, verbose=0)

    # Extract predictions
    class_probs = predictions['class'][0]
    bbox_norm = predictions['bbox'][0]

    # Get predicted class
    class_id = np.argmax(class_probs)
    confidence = class_probs[class_id]
    class_name = ID_TO_CLASS[class_id]

    # Skip low-confidence detections
    if confidence < conf_threshold:
        return []

    # Denormalize bbox to original image size
    x1 = int(bbox_norm[0] * img_w)
    y1 = int(bbox_norm[1] * img_h)
    x2 = int(bbox_norm[2] * img_w)
    y2 = int(bbox_norm[3] * img_h)

    return [(class_name, confidence, (x1, y1, x2, y2))]

# ==========================================
# DRAW DETECTIONS
# ==========================================

def draw_detections(image, detections):
    """Draw bounding boxes and labels on image."""
    colors = {
        'Car': (0, 0, 255),        # Red
        'Pedestrian': (255, 0, 0), # Blue
        'Cyclist': (0, 255, 0)     # Green
    }

    for class_name, confidence, (x1, y1, x2, y2) in detections:
        color = colors.get(class_name, (255, 255, 0))

        # Draw bbox
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)

        # Draw label
        label = f"{class_name}: {confidence:.2f}"
        (label_w, label_h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
        cv2.rectangle(image, (x1, y1 - label_h - 10), (x1 + label_w, y1), color, -1)
        cv2.putText(image, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    return image

# ==========================================
# PROCESS VIDEO FILE
# ==========================================

def process_video(video_path, output_path='output_detected.mp4'):
    """
    Process a video file and save with detections.

    Download sample driving videos:
    - KITTI raw data: http://www.cvlibs.net/datasets/kitti/raw_data.php
    - YouTube dashcam footage (use youtube-dl)
    """
    cap = cv2.VideoCapture(video_path)

    # Get video properties
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    frame_count = 0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    start_time = time.time()

    print(f"Processing video: {video_path}")
    print(f"Total frames: {total_frames}")
    print(f"Resolution: {width}x{height} @ {fps} FPS")
    print()

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Run detection
        detections = detect_objects(frame, model)

        # Draw results
        frame_with_detections = draw_detections(frame.copy(), detections)

        # Add FPS counter
        elapsed = time.time() - start_time
        current_fps = frame_count / elapsed if elapsed > 0 else 0
        cv2.putText(
            frame_with_detections,
            f"FPS: {current_fps:.1f}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

        # Write frame
        out.write(frame_with_detections)
        frame_count += 1

        # Progress
        if frame_count % 30 == 0:
            progress = (frame_count / total_frames) * 100
            print(f"Progress: {progress:.1f}% | FPS: {current_fps:.1f} | Detections: {len(detections)}")

    cap.release()
    out.release()

    print()
    print(f"✅ Video processing complete!")
    print(f"   Output saved: {output_path}")
    print(f"   Average FPS: {frame_count / elapsed:.1f}")

# ==========================================
# PROCESS WEBCAM (LIVE)
# ==========================================

def process_webcam():
    """
    Run real-time detection on webcam feed.
    Press 'q' to quit.
    """
    cap = cv2.VideoCapture(0)  # 0 = default webcam

    print("Starting webcam detection...")
    print("Press 'q' to quit")
    print()

    fps_counter = []

    while True:
        start = time.time()

        ret, frame = cap.read()
        if not ret:
            break

        # Run detection
        detections = detect_objects(frame, model)

        # Draw results
        frame_with_detections = draw_detections(frame.copy(), detections)

        # Calculate FPS
        elapsed = time.time() - start
        fps = 1.0 / elapsed
        fps_counter.append(fps)

        # Show FPS
        avg_fps = np.mean(fps_counter[-30:])  # 30-frame average
        cv2.putText(
            frame_with_detections,
            f"FPS: {avg_fps:.1f}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

        # Display
        cv2.imshow('AV Perception - Press q to quit', frame_with_detections)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    print(f"\\nAverage FPS: {np.mean(fps_counter):.1f}")

# ==========================================
# EXAMPLE USAGE
# ==========================================

# Process KITTI test images
print("="*70)
print("TESTING ON KITTI VALIDATION SET")
print("="*70)

sample_ids = ['000000', '000010', '000050', '000100', '000200']

for sample_id in sample_ids:
    img_path = os.path.join(TRAIN_IMG_DIR, f"{sample_id}.png")

    if os.path.exists(img_path):
        # Load image
        img = cv2.imread(img_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Detect
        start = time.time()
        detections = detect_objects(img, model)
        inference_time = (time.time() - start) * 1000  # ms

        # Draw
        img_with_detections = draw_detections(img.copy(), detections)

        # Save
        output_path = f"detection_result_{sample_id}.png"
        cv2.imwrite(output_path, cv2.cvtColor(img_with_detections, cv2.COLOR_RGB2BGR))

        print(f"Sample {sample_id}:")
        print(f"  Detections: {len(detections)}")
        print(f"  Inference time: {inference_time:.1f} ms")
        print(f"  Saved: {output_path}")
        print()

print("✅ All samples processed!")
print()

# ==========================================
# INSTRUCTIONS FOR VIDEO TESTING
# ==========================================

print("="*70)
print("VIDEO PROCESSING INSTRUCTIONS")
print("="*70)
print("""
To test on driving videos:

1. DOWNLOAD SAMPLE VIDEO:
   - KITTI raw data (with videos):
     http://www.cvlibs.net/datasets/kitti/raw_data.php

   - Or use YouTube dashcam footage:
     youtube-dl "https://www.youtube.com/watch?v=VIDEO_ID"

2. RUN VIDEO PROCESSING:
   process_video('path/to/your/video.mp4', 'output_with_detections.mp4')

3. LIVE WEBCAM (if you have a webcam):
   process_webcam()

EXPECTED PERFORMANCE:
- CPU: 10-20 FPS (sufficient for testing)
- GPU: 60-100 FPS (real-time capable)
- Raspberry Pi 4: 5-10 FPS (after TFLite optimization)
""")`}
              </CodeBlockR>
            </div>
          )}
        </div>

        {/* Deployment Section */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('deployment')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              Edge Deployment: From Laptop to Raspberry Pi
            </h2>
            {expandedSections.deployment ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.deployment && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                  Deploying to Edge Devices: The Final Mile
                </h3>
                <p className="text-foreground/80 mb-4">
                  Converting your Keras model to TensorFlow Lite enables deployment on edge devices like Raspberry Pi,
                  NVIDIA Jetson, or mobile phones—essential for real autonomous vehicle applications.
                </p>
              </div>

              <CodeBlockR language="python">
{`# ==========================================
# CONVERT TO TENSORFLOW LITE
# ==========================================

import tensorflow as tf

print("="*70)
print("CONVERTING MODEL TO TENSORFLOW LITE")
print("="*70)
print()

# Load the trained model
model = keras.models.load_model('av_perception_final.keras')

# ==========================================
# STANDARD TFLITE CONVERSION
# ==========================================

converter = tf.lite.TFLiteConverter.from_keras_model(model)

# Basic optimization
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Convert
tflite_model = converter.convert()

# Save
tflite_path = 'av_perception.tflite'
with open(tflite_path, 'wb') as f:
    f.write(tflite_model)

print(f"✅ TFLite model saved: {tflite_path}")
print(f"   Size: {len(tflite_model) / (1024**2):.2f} MB")
print()

# ==========================================
# QUANTIZED INT8 MODEL (FOR RASPBERRY PI)
# ==========================================

def representative_dataset_gen():
    """
    Generator for calibration data (needed for int8 quantization).
    Uses a subset of training images.
    """
    for img_id in train_ids[:100]:  # Use 100 samples
        img_path = os.path.join(TRAIN_IMG_DIR, f"{img_id}.png")
        img = cv2.imread(img_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (IMG_HEIGHT, IMG_WIDTH))
        img = img / 255.0
        img = np.expand_dims(img, axis=0).astype(np.float32)
        yield [img]

# Create quantized converter
converter_int8 = tf.lite.TFLiteConverter.from_keras_model(model)
converter_int8.optimizations = [tf.lite.Optimize.DEFAULT]
converter_int8.representative_dataset = representative_dataset_gen

# Enable full integer quantization
converter_int8.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter_int8.inference_input_type = tf.uint8
converter_int8.inference_output_type = tf.uint8

# Convert
tflite_quantized = converter_int8.convert()

# Save
tflite_quant_path = 'av_perception_int8.tflite'
with open(tflite_quant_path, 'wb') as f:
    f.write(tflite_quantized)

print(f"✅ Quantized TFLite model saved: {tflite_quant_path}")
print(f"   Size: {len(tflite_quantized) / (1024**2):.2f} MB")
print(f"   Size reduction: {(1 - len(tflite_quantized) / len(tflite_model)) * 100:.1f}%")
print()

# ==========================================
# TFLITE INFERENCE EXAMPLE
# ==========================================

class TFLiteObjectDetector:
    """Wrapper for TFLite model inference."""

    def __init__(self, model_path):
        # Load TFLite model
        self.interpreter = tf.lite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()

        # Get input and output details
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

        print(f"TFLite model loaded: {model_path}")
        print(f"  Input shape: {self.input_details[0]['shape']}")
        print(f"  Outputs: {len(self.output_details)}")

    def detect(self, image):
        """Run inference on image."""
        # Preprocess
        img_h, img_w = image.shape[:2]
        img_resized = cv2.resize(image, (IMG_HEIGHT, IMG_WIDTH))
        img_normalized = (img_resized / 255.0).astype(np.float32)
        img_batch = np.expand_dims(img_normalized, axis=0)

        # Set input tensor
        self.interpreter.set_tensor(self.input_details[0]['index'], img_batch)

        # Run inference
        self.interpreter.invoke()

        # Get outputs
        # Note: Output order may differ from Keras model
        # Check output_details to map correctly
        class_probs = self.interpreter.get_tensor(self.output_details[0]['index'])[0]
        bbox_norm = self.interpreter.get_tensor(self.output_details[1]['index'])[0]

        # Get predicted class
        class_id = np.argmax(class_probs)
        confidence = class_probs[class_id]

        # Denormalize bbox
        x1 = int(bbox_norm[0] * img_w)
        y1 = int(bbox_norm[1] * img_h)
        x2 = int(bbox_norm[2] * img_w)
        y2 = int(bbox_norm[3] * img_h)

        return class_id, confidence, (x1, y1, x2, y2)

# Test TFLite model
print("="*70)
print("TESTING TFLITE MODEL")
print("="*70)

detector = TFLiteObjectDetector(tflite_path)

# Test on sample image
test_img_path = os.path.join(TRAIN_IMG_DIR, "000000.png")
test_img = cv2.imread(test_img_path)
test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)

# Time inference
start = time.time()
class_id, confidence, bbox = detector.detect(test_img)
inference_time = (time.time() - start) * 1000

print(f"Detection result:")
print(f"  Class: {ID_TO_CLASS[class_id]}")
print(f"  Confidence: {confidence:.3f}")
print(f"  BBox: {bbox}")
print(f"  Inference time: {inference_time:.1f} ms")
print()

# ==========================================
# RASPBERRY PI DEPLOYMENT INSTRUCTIONS
# ==========================================

print("="*70)
print("RASPBERRY PI DEPLOYMENT")
print("="*70)
print("""
1. SETUP RASPBERRY PI:

   # Update system
   sudo apt-get update
   sudo apt-get upgrade

   # Install dependencies
   sudo apt-get install python3-pip python3-opencv
   pip3 install tensorflow tflite-runtime numpy

2. TRANSFER MODEL:

   # Copy the quantized model to Raspberry Pi
   scp av_perception_int8.tflite pi@raspberrypi.local:~/

3. RUN ON RASPBERRY PI:

   # Use the TFLiteObjectDetector class above
   # Connect USB webcam or Raspberry Pi Camera Module
   # Expected performance: 5-10 FPS on RPi 4

4. OPTIMIZE FURTHER:

   - Use Coral USB Accelerator (TPU): 30+ FPS
   - Use NVIDIA Jetson Nano: 60+ FPS
   - Multi-threading for camera capture + inference

5. HARDWARE SETUP:

   Raspberry Pi 4 (4GB+) + Camera Module v2
   Total cost: ~$80

   vs.

   Professional AV dev kit with LiDAR: $10,000+

   Transfer learning made autonomous perception AFFORDABLE.
""")`}
              </CodeBlockR>
            </div>
          )}
        </div>

        {/* Practical Exercises */}
        <div className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
          <button
            onClick={() => toggleSection('exercises')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎯 Practical Exercises: Build YOUR AV Perception System
            </h2>
            {expandedSections.exercises ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections.exercises && (
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Apply everything you've learned to build real autonomous vehicle perception systems.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Exercise 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-200">
                    Exercise 1: Full KITTI Training
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Train complete model on full KITTI dataset
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Download full KITTI dataset (12GB)</li>
                    <li>Train for 50+ epochs with data augmentation</li>
                    <li>Achieve &gt;85% validation accuracy</li>
                    <li>Test on KITTI test set</li>
                    <li>Compare with baseline (no transfer learning)</li>
                  </ul>
                </div>

                {/* Exercise 2 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-200">
                    Exercise 2: Multi-Object Detection
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Extend to detect ALL objects in image (not just largest)
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Modify data generator for multiple objects</li>
                    <li>Implement YOLO-style grid predictions</li>
                    <li>Add non-maximum suppression (NMS)</li>
                    <li>Handle overlapping detections</li>
                    <li>Test on complex multi-object scenes</li>
                  </ul>
                </div>

                {/* Exercise 3 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">
                    Exercise 3: Video Processing Pipeline
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Build end-to-end video processing system
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Download dashcam footage from YouTube</li>
                    <li>Process entire video with detections</li>
                    <li>Add object tracking (SORT algorithm)</li>
                    <li>Measure and display FPS</li>
                    <li>Optimize for real-time performance</li>
                  </ul>
                </div>

                {/* Exercise 4 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-bold mb-3 text-orange-800 dark:text-orange-200">
                    Exercise 4: Raspberry Pi Deployment
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Deploy to Raspberry Pi with camera
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Convert model to quantized TFLite</li>
                    <li>Setup Raspberry Pi 4 + Camera Module</li>
                    <li>Implement real-time camera capture</li>
                    <li>Achieve 5-10 FPS inference</li>
                    <li>Build simple dashboard display</li>
                  </ul>
                </div>

                {/* Exercise 5 */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                  <h3 className="text-xl font-bold mb-3 text-pink-800 dark:text-pink-200">
                    Exercise 5: Custom Dataset
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Train on YOUR local driving environment
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Record dashcam footage from your commute</li>
                    <li>Label 200+ images (use LabelImg tool)</li>
                    <li>Fine-tune KITTI model on your data</li>
                    <li>Test on your local roads</li>
                    <li>Analyze performance on familiar routes</li>
                  </ul>
                </div>

                {/* Exercise 6 */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-xl font-bold mb-3 text-indigo-800 dark:text-indigo-200">
                    Exercise 6: Lane Detection Integration
                  </h3>
                  <p className="text-sm text-foreground/80 mb-3">
                    <strong>Task:</strong> Add lane detection to perception stack
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-foreground/70">
                    <li>Implement semantic segmentation for lanes</li>
                    <li>Use separate CNN or multi-task model</li>
                    <li>Overlay lane markings on detections</li>
                    <li>Combine with object detection output</li>
                    <li>Build complete perception dashboard</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-bold mb-3 text-yellow-800 dark:text-yellow-200">
                  🎓 The Complete AV Perception Journey
                </h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p><strong>Week 1:</strong> Master KITTI dataset, train initial model (Exercises 1-2)</p>
                  <p><strong>Week 2:</strong> Video processing and optimization (Exercise 3)</p>
                  <p><strong>Week 3:</strong> Edge deployment on Raspberry Pi (Exercise 4)</p>
                  <p><strong>Week 4:</strong> Custom dataset and integration (Exercises 5-6)</p>
                  <p className="pt-3 font-semibold text-purple-600 dark:text-purple-400">
                    💡 End Goal: A working autonomous vehicle perception prototype running on YOUR hardware,
                    detecting objects in YOUR environment, ready for integration into path planning and control systems.
                    This is the foundation of real self-driving systems—you just built it.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">🚗 Session 46 Complete: Autonomous Vehicle Perception Mastery</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What You've Mastered:</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ KITTI dataset for autonomous driving</li>
                <li>✅ MobileNetV2 transfer learning for detection</li>
                <li>✅ Multi-task learning (classification + bbox regression)</li>
                <li>✅ Real-time inference pipeline (10-60+ FPS)</li>
                <li>✅ TensorFlow Lite edge deployment</li>
                <li>✅ Production-ready autonomous perception system</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Next Session Preview:</h3>
              <p className="text-sm mb-3">
                <strong>Session 47:</strong> Advanced Deep Learning Topics
              </p>
              <ul className="space-y-2 text-sm">
                <li>🔹 Generative Adversarial Networks (GANs)</li>
                <li>🔹 Attention mechanisms & Transformers</li>
                <li>🔹 Neural Architecture Search (NAS)</li>
                <li>🔹 Model interpretability & explainability</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-3">🚀 From DARPA to YOUR Desktop</p>
            <p className="text-sm leading-relaxed">
              You've just built the same perception stack that powers autonomous vehicles worldwide.
              <br /><br />
              <strong>The Evolution:</strong>
              <br />• 2004: DARPA teams with $10M budgets fail at 200 meters
              <br />• 2012: Deep learning proves viability with ImageNet
              <br />• 2016: Tesla deploys vision-first Autopilot to production
              <br />• 2024: YOU build real-time AV perception on a $35 Raspberry Pi
              <br /><br />
              <strong>The Impact:</strong> Transfer learning democratized autonomous vehicle development.
              What required PhD teams and million-dollar compute clusters now runs in a weekend tutorial on free Google Colab.
              <br /><br />
              <em className="text-white/80">
                "The machines don't need perfect vision. They need safe-enough perception, fast enough to act.
                Deep learning achieved that. Transfer learning made it accessible. Today, you built it."
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

export default KerasSession46;
