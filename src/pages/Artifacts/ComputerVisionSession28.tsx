import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, Eye, Camera, Zap, Target, Lightbulb, Code, Copy, Activity, Heart, DollarSign, Layers, Image as ImageIcon, Box, Move, Scan } from 'lucide-react';

const ComputerVisionSession28 = () => {
  const navigate = useNavigate();

  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);

  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});
  const [copiedCode, setCopiedCode] = useState('');

  // Demo State
  const [activeDemo, setActiveDemo] = useState('');
  const [demoStep, setDemoStep] = useState(0);

  // Story chapters following the philosophy
  const storyChapters = [
    {
      title: "🍽️ The Need Arises",
      content: "You're tracking your health journey - sleep hours, workout intensity, meal quality. You've created beautiful Plotly visualizations and Streamlit dashboards.",
      details: "But then the question hits: What if I could just take a photo of my meal and have it analyzed automatically? What if my webcam could detect my posture during work?"
    },
    {
      title: "💡 The Realization",
      content: "Computer Vision isn't a random tool to learn - it's the inevitable answer to turning visual information into actionable data.",
      details: "Every meal photo, every workout video, every receipt scan is an opportunity to transform pixels into insights."
    },
    {
      title: "🔗 Everything Connects",
      content: "Data:Calculus (NumPy) - Images are just matrices. Data:Visualizing (Matplotlib) - Helps us see what filters do. Algorithms - Contour detection is graph traversal.",
      details: "Linear Algebra - Convolution filters are matrix operations. Every single session led here."
    },
    {
      title: "🎯 The Mission",
      content: "Today we won't just learn OpenCV functions. We'll understand how machines perceive and process visual information.",
      details: "From meal nutrition analysis to workout form checking, from receipt scanning to posture monitoring - Computer Vision applied to YOUR life."
    },
    {
      title: "🚀 Your Journey Begins",
      content: "Images as NumPy arrays → Filters as convolution → Edges as gradients → Contours as connected components → MediaPipe for production ML → Pixel algorithms for elegance.",
      details: "You're not a tool user. You're a vision engineer."
    }
  ];

  // Part 1: Images as NumPy Arrays
  const part1Content = {
    title: "Part 1: Images Are Just NumPy Arrays in Disguise",
    description: "Before anything fancy, understand what an image really is: a 3D NumPy array (height × width × color_channels)",
    realWorld: "Every CT scan, every satellite image, every photo on your phone is a matrix of numbers waiting to be processed",
    code: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load an image from your health tracking app (e.g., meal photo)
meal_image = cv2.imread('meal_photo.jpg')

# OpenCV reads in BGR, but we think in RGB
meal_rgb = cv2.cvtColor(meal_image, cv2.COLOR_BGR2RGB)

print(f"📸 Image shape: {meal_rgb.shape}")  # e.g., (1080, 1920, 3)
print(f"   Height: {meal_rgb.shape[0]} pixels")
print(f"   Width: {meal_rgb.shape[1]} pixels")
print(f"   Channels: {meal_rgb.shape[2]} (Red, Green, Blue)")
print(f"   Total data points: {meal_rgb.size} numbers!")

# This is just NumPy - everything you learned in Data:Calculus!
print(f"\\n🔢 Data type: {meal_rgb.dtype}")  # uint8 (0-255)
print(f"   Memory: {meal_rgb.nbytes / 1024 / 1024:.2f} MB")

# Extract a single pixel - it's just a vector!
center_pixel = meal_rgb[540, 960]  # middle of 1080p image
print(f"\\n🎨 Center pixel RGB: {center_pixel}")

# ====== The "AHA!" Moment: Different Color Spaces ======
# RGB: What humans see and cameras capture
rgb_image = meal_rgb.copy()

# Grayscale: Intensity only (great for detecting shapes)
gray_image = cv2.cvtColor(meal_rgb, cv2.COLOR_RGB2GRAY)
print(f"\\n🌓 Grayscale shape: {gray_image.shape}")  # (1080, 1920) - 2D only!

# HSV: Hue-Saturation-Value (great for color-based segmentation)
hsv_image = cv2.cvtColor(meal_rgb, cv2.COLOR_RGB2HSV)

# ====== Real Health App Use Case ======
def analyze_meal_variety(image_rgb):
    """Analyze color variety in meal - more colors = better nutrition"""
    hsv = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2HSV)
    hue_channel = hsv[:, :, 0]

    unique_hues = len(np.unique(hue_channel))
    variety_score = min(100, (unique_hues / 180) * 100)

    return {
        'variety_score': variety_score,
        'unique_colors': unique_hues,
        'recommendation': '✅ Great variety!' if variety_score > 60 else '⚠️ Add more colors'
    }

meal_analysis = analyze_meal_variety(meal_rgb)
print(f"\\n🥗 Meal Nutrition Analysis:")
print(f"   Color Variety Score: {meal_analysis['variety_score']:.1f}/100")
print(f"   {meal_analysis['recommendation']}")

print("\\n💡 See? Everything connects to Data:Calculus!")`
  };

  // Part 2: Filters & Edge Detection
  const part2Content = {
    title: "Part 2: Filters & Edge Detection - The Math Behind Instagram",
    description: "Filters are convolution operations - linear algebra in action! Instagram, medical imaging, autonomous vehicles all use these",
    realWorld: "Every Instagram filter, every Snapchat lens, every medical image enhancement uses these fundamental operations",
    code: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load image (health app context: workout form analysis)
workout_image = cv2.imread('workout_pose.jpg')
workout_rgb = cv2.cvtColor(workout_image, cv2.COLOR_BGR2RGB)

# ====== The Convolution Operation ======
# A filter/kernel is a small matrix that slides across the image

# Example: 3x3 blur kernel (averaging)
blur_kernel = np.ones((3, 3), np.float32) / 9
print("🔍 Blur Kernel (averages surrounding pixels):")
print(blur_kernel)

# ====== Common Filters Explained ======

# 1. GAUSSIAN BLUR - Removes noise, smooths image
gaussian = cv2.GaussianBlur(workout_rgb, (5, 5), 0)

# 2. BILATERAL FILTER - Edge-preserving smoothing
# Used in: Portrait mode, keeping subject sharp while blurring background
bilateral = cv2.bilateralFilter(workout_rgb, 9, 75, 75)

# 3. SHARPENING - Enhances edges
sharpen_kernel = np.array([[ 0, -1,  0],
                           [-1,  5, -1],
                           [ 0, -1,  0]])
sharpened = cv2.filter2D(workout_rgb, -1, sharpen_kernel)

# ====== Edge Detection - Finding Boundaries ======
gray = cv2.cvtColor(workout_rgb, cv2.COLOR_RGB2GRAY)

# CANNY - Multi-stage edge detection (best for most uses)
# Used in: Lane detection (autonomous vehicles), document scanning
canny = cv2.Canny(gray, 100, 200)

# ====== Real Health App Use Case: Posture Detection ======
def detect_workout_form_edges(image_rgb):
    """Detect body edges in workout video to analyze form"""
    gray = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)

    edge_percentage = (np.sum(edges > 0) / edges.size) * 100

    return {
        'edges': edges,
        'edge_density': edge_percentage,
        'body_detected': edge_percentage > 5,
        'form_clarity': 'Good' if 5 < edge_percentage < 15 else 'Reposition camera'
    }

form_analysis = detect_workout_form_edges(workout_rgb)
print(f"\\n🏋️ Workout Form Analysis:")
print(f"   Edge Density: {form_analysis['edge_density']:.2f}%")
print(f"   {form_analysis['form_clarity']}")

print("\\n💡 Convolution = Sliding dot product (matrix multiplication)")
print("   Filters = Small matrices encoding transformations")
print("\\n✨ You're mastering the MATHEMATICS of VISION!")`
  };

  // Part 3: Contours & Segmentation
  const part3Content = {
    title: "Part 3: Contours & Segmentation - Finding Objects in Images",
    description: "After detecting edges, we group them into meaningful objects. This is where computer vision becomes truly intelligent",
    realWorld: "Security systems, autonomous vehicles, medical imaging diagnostics all rely on contour detection",
    code: `import cv2
import numpy as np
from collections import deque
import time

# ====== REAL USE CASE: Home Security System ======
class SmartSecuritySystem:
    """Production-grade security monitoring"""

    def __init__(self):
        self.bg_subtractor = cv2.createBackgroundSubtractorMOG2(
            history=500,
            varThreshold=16,
            detectShadows=True
        )
        self.motion_history = deque(maxlen=30)

    def process_frame(self, frame):
        """Analyze frame for security threats"""
        original = frame.copy()

        # Step 1: Background subtraction
        fg_mask = self.bg_subtractor.apply(frame)

        # Step 2: Clean up noise with morphological operations
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, kernel)

        # Step 3: Find contours (connected components)
        contours, _ = cv2.findContours(
            fg_mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        # Step 4: Filter and analyze significant movements
        detected_objects = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < 500:
                continue

            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / float(h)

            # Classify object type
            object_type = 'Person' if area > 5000 and 0.3 < aspect_ratio < 3.0 else 'Object'

            detected_objects.append({
                'bbox': (x, y, w, h),
                'area': area,
                'type': object_type
            })

            # Draw on frame
            color = (0, 0, 255) if object_type == 'Person' else (0, 255, 0)
            cv2.rectangle(original, (x, y), (x + w, y + h), color, 2)
            cv2.putText(original, f"{object_type}: {area:.0f}px²",
                       (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        return original, detected_objects

# ====== HEALTH APP: Workout Rep Counter ======
class WorkoutRepCounter:
    """Count exercise reps using contour tracking"""

    def __init__(self):
        self.rep_count = 0
        self.prev_centroid_y = None
        self.movement_direction = None

    def detect_rep(self, frame):
        """Detect vertical movement (e.g., squats, jumping jacks)"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        if not contours:
            return self.rep_count, frame

        largest_contour = max(contours, key=cv2.contourArea)
        M = cv2.moments(largest_contour)

        if M["m00"] == 0:
            return self.rep_count, frame

        cy = int(M["m01"] / M["m00"])

        if self.prev_centroid_y is not None:
            movement = cy - self.prev_centroid_y

            if movement > 5:
                if self.movement_direction == 'up':
                    self.rep_count += 1
                    print(f"   ✅ Rep #{self.rep_count}")
                self.movement_direction = 'down'
            elif movement < -5:
                self.movement_direction = 'up'

        self.prev_centroid_y = cy

        cv2.drawContours(frame, [largest_contour], -1, (0, 255, 0), 2)
        cv2.putText(frame, f"Reps: {self.rep_count}", (50, 50),
                   cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)

        return self.rep_count, frame

print("\\n💡 Computer Vision = Math applied to Pixels")
print("   1. Images = NumPy arrays (Data:Calculus)")
print("   2. Filters = Convolution (Linear Algebra)")
print("   3. Edges = Gradients (Calculus)")
print("   4. Contours = Connected Components (Graph Theory)")
print("\\n🎯 You're mastering VISUAL INTELLIGENCE!")`
  };

  // Part 4: MediaPipe
  const part4Content = {
    title: "Part 4: MediaPipe - Google's Production-Ready Computer Vision",
    description: "Pre-trained models that work on ANY device. This is standing on giants' shoulders!",
    realWorld: "Google Fit, YouTube filters, Peloton, Apple Fitness+ all use similar pose estimation technology",
    code: `import cv2
import mediapipe as mp
import numpy as np

# ====== HEALTH APP: Workout Form Analyzer ======
class WorkoutFormAnalyzer:
    """Real-time workout form analysis using MediaPipe"""

    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_draw = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.squat_count = 0
        self.prev_state = None

    def calculate_angle(self, a, b, c):
        """Calculate angle between three points (landmarks)"""
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)

        radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
        angle = np.abs(radians * 180.0 / np.pi)

        if angle > 180.0:
            angle = 360 - angle

        return angle

    def analyze_squat_form(self, landmarks):
        """Analyze squat form quality"""
        # Get key landmarks
        left_hip = [landmarks[self.mp_pose.PoseLandmark.LEFT_HIP.value].x,
                   landmarks[self.mp_pose.PoseLandmark.LEFT_HIP.value].y]
        left_knee = [landmarks[self.mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                    landmarks[self.mp_pose.PoseLandmark.LEFT_KNEE.value].y]
        left_ankle = [landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                     landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

        knee_angle = self.calculate_angle(left_hip, left_knee, left_ankle)

        # Detect squat phases
        if knee_angle > 160:
            state = 'up'
        elif knee_angle < 90:
            state = 'down'
        else:
            state = 'middle'

        # Count rep
        if self.prev_state == 'down' and state == 'up':
            self.squat_count += 1

        self.prev_state = state

        # Form feedback
        feedback = []
        if state == 'down':
            if knee_angle > 100:
                feedback.append("⚠️ Go deeper!")
            else:
                feedback.append("✅ Good depth")

            if left_knee[0] > left_ankle[0]:
                feedback.append("⚠️ Knees too far forward")
            else:
                feedback.append("✅ Good knee position")

        return {
            'count': self.squat_count,
            'knee_angle': knee_angle,
            'state': state,
            'feedback': feedback
        }

# ====== HAND TRACKING: Finance Receipt Scanner ======
class ReceiptScanner:
    """Use hand tracking to guide receipt photo capture"""

    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5,
            max_num_hands=2
        )

    def detect_pinch_gesture(self, landmarks):
        """Detect pinch gesture (thumb + index finger close)"""
        thumb_tip = landmarks[4]
        index_tip = landmarks[8]

        distance = np.sqrt(
            (thumb_tip.x - index_tip.x)**2 +
            (thumb_tip.y - index_tip.y)**2
        )

        return distance < 0.05

print("\\n🚀 WHY MEDIAPIPE IS REVOLUTIONARY")
print("   Building pose estimation from scratch:")
print("     - Requires PhD-level ML expertise")
print("     - Years of training data collection")
print("     - Millions in compute resources")
print("   Using MediaPipe:")
print("     - 5 lines of code")
print("     - Works on ANY device")
print("     - Real-time performance (30+ FPS)")
print("\\n💡 This is the POWER of standing on giants' shoulders!")`
  };

  // Part 5: Pixel Difference
  const part5Content = {
    title: "Part 5: Pixel Difference Algorithms - When Simple is Powerful",
    description: "Sometimes you don't need complex ML - just comparing pixels reveals motion, changes, and events",
    realWorld: "Video compression (H.264, H.265), security systems, sports analysis all use pixel difference",
    code: `import cv2
import numpy as np
from collections import deque

# ====== ALGORITHM 1: Frame Differencing ======
class MotionDetector:
    """Detect motion using pixel difference between frames"""

    def __init__(self, threshold=25, min_area=500):
        self.prev_frame = None
        self.threshold = threshold
        self.min_area = min_area
        self.motion_history = deque(maxlen=30)

    def detect_motion(self, frame):
        """Compare current frame with previous frame"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (21, 21), 0)

        if self.prev_frame is None:
            self.prev_frame = gray
            return frame, 0

        # Calculate absolute difference
        frame_delta = cv2.absdiff(self.prev_frame, gray)

        # Threshold the difference
        thresh = cv2.threshold(frame_delta, self.threshold, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)

        # Find contours of moving regions
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        motion_detected = False
        for contour in contours:
            if cv2.contourArea(contour) < self.min_area:
                continue

            motion_detected = True
            (x, y, w, h) = cv2.boundingRect(contour)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        self.prev_frame = gray
        self.motion_history.append(1 if motion_detected else 0)
        motion_percentage = sum(self.motion_history) / len(self.motion_history) * 100

        return frame, motion_percentage

# ====== ALGORITHM 2: Image Subtraction for Change Detection ======
def detect_scene_changes(image1, image2):
    """Detect what changed between two images"""
    gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

    # Calculate absolute difference
    diff = cv2.absdiff(gray1, gray2)
    _, thresh = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    result = image2.copy()
    changes = []

    for contour in contours:
        if cv2.contourArea(contour) > 100:
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(result, (x, y), (x + w, y + h), (0, 0, 255), 2)
            changes.append({
                'location': (x, y, w, h),
                'area': cv2.contourArea(contour)
            })

    total_changed_pixels = np.sum(thresh > 0)
    change_percentage = (total_changed_pixels / thresh.size) * 100

    return {
        'result_image': result,
        'difference_map': diff,
        'changes': changes,
        'change_percentage': change_percentage
    }

# ====== REAL-WORLD USE CASE: Home Before/After Comparison ======
def compare_room_before_after(before_path, after_path):
    """Compare room before/after cleaning, renovation, etc."""
    before = cv2.imread(before_path)
    after = cv2.imread(after_path)

    analysis = detect_scene_changes(before, after)

    print(f"\\n📊 Change Analysis:")
    print(f"   Total changes detected: {len(analysis['changes'])}")
    print(f"   Change percentage: {analysis['change_percentage']:.2f}%")
    print(f"\\n   Use cases:")
    print(f"   🏠 Home organization progress tracking")
    print(f"   🏗️ Construction/renovation documentation")
    print(f"   📸 Insurance claim evidence")

print("\\n🎯 PIXEL DIFFERENCE: When Simple is Powerful")
print("   ✅ Fast (real-time performance)")
print("   ✅ Simple (understand the math completely)")
print("   ✅ Reliable (no model training needed)")
print("   ✅ Efficient (minimal compute resources)")
print("\\n💡 Sometimes the best solution is the simplest one!")`
  };

  const allParts = [part1Content, part2Content, part3Content, part4Content, part5Content];

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
    }, 3000);
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

  const toggleCodeExpansion = (index) => {
    setExpandedCode(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Computer Vision: Where Data Meets Sight
                </h1>
                <p className="text-sm text-muted-foreground">Session 28: Complete Computer Vision Journey</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Eye className="w-3 h-3 mr-1" />
                Interactive
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Camera className="w-3 h-3 mr-1" />
                Hands-on
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Origin Story Section */}
        <section className="mb-12">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Target className="w-5 h-5" />
                    The Need Came First - Not the Tool
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Computer Vision arose from real needs, not random curiosity
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={runOriginStory}
                    disabled={isStoryRunning}
                    className="bg-green-600 hover:bg-green-700 text-white"
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
                          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 opacity-100'
                          : 'bg-muted/20 border-muted opacity-30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= storyStep ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{chapter.title}</h4>
                          <p className="text-muted-foreground mb-2">{chapter.content}</p>
                          {index <= storyStep && (
                            <p className="text-sm bg-green-100 dark:bg-green-900/30 p-3 rounded italic">
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
                  <p className="text-muted-foreground">Click "Begin Journey" to start the Computer Vision story</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* The 5 Parts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">The Complete Journey: From Pixels to Intelligence</h2>
              <p className="text-muted-foreground">5 parts that transform you from beginner to vision engineer</p>
            </div>
          </div>

          <div className="grid gap-6">
            {allParts.map((part, index) => (
              <Card key={index} className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
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
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                          <p className="text-blue-700 dark:text-blue-300">{part.realWorld}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="practice" className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                          <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                            💡 Your Turn - Apply to YOUR Life:
                          </h5>
                          <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                            {index === 0 && (
                              <>
                                <li>• Load a photo of your meal and analyze the color variety</li>
                                <li>• Calculate RGB values of your favorite shirt</li>
                                <li>• Convert a family photo to different color spaces</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>• Apply blur and sharpen filters to your workout videos</li>
                                <li>• Detect edges in your room to plan furniture arrangement</li>
                                <li>• Create "Instagram-style" filters for your photos</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>• Build a motion detector for your home security</li>
                                <li>• Count reps in your workout videos automatically</li>
                                <li>• Track objects moving across your webcam view</li>
                              </>
                            )}
                            {index === 3 && (
                              <>
                                <li>• Check your squat form using pose estimation</li>
                                <li>• Scan receipts with pinch gestures</li>
                                <li>• Monitor your posture during work hours</li>
                              </>
                            )}
                            {index === 4 && (
                              <>
                                <li>• Compare before/after photos of room cleaning</li>
                                <li>• Detect motion in security camera footage</li>
                                <li>• Track changes in plant growth over time</li>
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
                🎯 Real Impact Projects: Build Tools You'll Actually Use
              </CardTitle>
              <CardDescription className="text-lg">
                These aren't just exercises - they're applications that improve your actual life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Health & Fitness Analyzer
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build a workout form checker that analyzes your squat depth, posture during work,
                    and automatically counts reps in exercise videos.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Real-time squat form analysis with MediaPipe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Posture monitoring during work hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Automatic rep counting for any exercise</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Finance Automation System
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a receipt scanner using hand gestures, meal photo analyzer for nutrition tracking,
                    and document scanner for expense management.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Pinch-to-scan receipt capture system</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Meal color variety analyzer for nutrition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Before/after progress visualization</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg">
                <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  🚀 The Bigger Picture:
                </h5>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Computer Vision isn't a separate domain - it's <strong>all your previous learning coming together</strong>.
                  The NumPy from Data:Calculus. The visualization from Matplotlib. The algorithms from Blueprints.
                  The linear algebra from Session 15. Every single session led here.
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
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-violet-800 dark:text-violet-200 mb-3">
                  🎓 Session 28 Complete: The Vision Journey
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  You've mastered how machines perceive and process visual information. Not by memorizing functions,
                  but by understanding the mathematics and philosophy behind Computer Vision.
                </p>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">🧠 What You Mastered:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Images as NumPy arrays</li>
                      <li>• Filters as convolution</li>
                      <li>• Edge detection as gradients</li>
                      <li>• Contours as connected components</li>
                      <li>• MediaPipe for production ML</li>
                      <li>• Pixel algorithms for elegance</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">💼 Real Applications Built:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Meal nutrition analyzer</li>
                      <li>• Workout form analyzer</li>
                      <li>• Receipt scanner</li>
                      <li>• Posture monitor</li>
                      <li>• Security system</li>
                      <li>• Before/after comparison</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg max-w-3xl mx-auto">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold">
                    "Computer Vision is not about learning a library - it's about understanding how mathematics transforms pixels into perception."
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    You're not a tool user. You're a vision engineer. 🎯
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
            <Badge variant="secondary">Session 28 Complete</Badge>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              Continue to Session 29
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionSession28;
