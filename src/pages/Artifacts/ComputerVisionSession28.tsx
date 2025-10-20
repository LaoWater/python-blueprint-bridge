import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, Eye, Camera, Zap, Target, Lightbulb, Code, Activity, Heart, DollarSign, Layers, Image as ImageIcon, Box, Move, Scan, Brain } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const ComputerVisionSession28 = () => {
  const navigate = useNavigate();

  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);

  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});

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

# ====== OPENCV VISUAL LEARNING LAB ======
# This script breaks down what OpenCV actually DOES to your images

def show_processing_pipeline(image_path):
    """
    Demonstrates OpenCV operations step-by-step with visual output.
    Use a photo with objects/people for best results!
    """
    
    # Load your image
    img = cv2.imread(image_path)
    if img is None:
        print(f"❌ Could not load image: {image_path}")
        print("💡 Try: 'example.jpg', 'photo.png', or full path like '/Users/you/Pictures/photo.jpg'")
        return
    
    # Convert BGR (OpenCV default) to RGB (for matplotlib)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    print(f"\n📸 Image loaded: {img.shape[1]}x{img.shape[0]} pixels")
    print(f"   Data type: {img.dtype} (values 0-255)")
    print(f"   Memory: {img.nbytes / 1024:.1f} KB\n")
    
    # ====== PIPELINE STAGE 1: Color Spaces ======
    print("🎨 STAGE 1: Understanding Color Spaces")
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    print(f"   Original: 3 channels (B,G,R) = {img.shape}")
    print(f"   Grayscale: 1 channel = {gray.shape}")
    print(f"   HSV: Hue, Saturation, Value (better for color detection)\n")
    
    # ====== PIPELINE STAGE 2: Edge Detection (Calculus!) ======
    print("📐 STAGE 2: Edge Detection = Finding Gradients")
    
    # Blur first to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Canny edge detection (finds where brightness changes rapidly)
    edges = cv2.Canny(blurred, threshold1=50, threshold2=150)
    
    print(f"   Gaussian Blur: Smooths noise using 2D Gaussian function")
    print(f"   Canny Algorithm: Finds edges using derivative (gradient)")
    print(f"   Math: Edge = where ∂I/∂x or ∂I/∂y is large\n")
    
    # ====== PIPELINE STAGE 3: Morphological Operations ======
    print("🔧 STAGE 3: Morphological Operations (Shape Processing)")
    
    # Create binary image (threshold)
    _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    # Morphology kernels
    kernel_small = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    kernel_large = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    
    morph_open = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_small)
    morph_close = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel_large)
    
    print(f"   Erosion: Shrinks bright regions (removes small noise)")
    print(f"   Dilation: Expands bright regions (fills gaps)")
    print(f"   Opening: Erosion → Dilation (removes noise)")
    print(f"   Closing: Dilation → Erosion (fills holes)\n")
    
    # ====== PIPELINE STAGE 4: Contour Detection ======
    print("🎯 STAGE 4: Contour Detection (Graph Theory)")
    
    contours, hierarchy = cv2.findContours(
        morph_close, 
        cv2.RETR_EXTERNAL, 
        cv2.CHAIN_APPROX_SIMPLE
    )
    
    # Draw all contours on original image
    contour_img = img_rgb.copy()
    cv2.drawContours(contour_img, contours, -1, (0, 255, 0), 2)
    
    # Analyze significant contours
    significant_contours = [c for c in contours if cv2.contourArea(c) > 500]
    
    print(f"   Found {len(contours)} total contours")
    print(f"   Significant contours (>500px²): {len(significant_contours)}")
    print(f"   Algorithm: Traces connected components (like flood fill)\n")
    
    # ====== PIPELINE STAGE 5: Object Analysis ======
    print("📊 STAGE 5: Object Analysis & Feature Extraction")
    
    analysis_img = img_rgb.copy()
    
    for i, contour in enumerate(significant_contours[:10]):  # Analyze top 10
        # Bounding box
        x, y, w, h = cv2.boundingRect(contour)
        
        # Calculate features
        area = cv2.contourArea(contour)
        perimeter = cv2.arcLength(contour, True)
        
        # Moments (for centroid)
        M = cv2.moments(contour)
        if M["m00"] != 0:
            cx = int(M["m10"] / M["m00"])
            cy = int(M["m01"] / M["m00"])
        else:
            cx, cy = x + w//2, y + h//2
        
        # Circularity (how round is it?)
        circularity = 4 * np.pi * area / (perimeter ** 2) if perimeter > 0 else 0
        
        # Draw analysis
        color = tuple(np.random.randint(100, 255, 3).tolist())
        cv2.rectangle(analysis_img, (x, y), (x+w, y+h), color, 2)
        cv2.circle(analysis_img, (cx, cy), 5, (255, 0, 0), -1)
        
        cv2.putText(analysis_img, f"#{i+1}", (x, y-10), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
        
        print(f"   Object #{i+1}:")
        print(f"      Area: {area:.0f} px² | Perimeter: {perimeter:.0f} px")
        print(f"      Circularity: {circularity:.2f} (1.0 = perfect circle)")
        print(f"      Aspect Ratio: {w/h:.2f} | Center: ({cx}, {cy})")
    
    # ====== CREATE VISUAL COMPARISON ======
    fig, axes = plt.subplots(3, 3, figsize=(15, 15))
    fig.suptitle('OpenCV Processing Pipeline - What Happens to Your Image', 
                 fontsize=16, fontweight='bold')
    
    # Row 1: Color spaces
    axes[0, 0].imshow(img_rgb)
    axes[0, 0].set_title('Original Image\n(RGB Color Space)', fontweight='bold')
    axes[0, 0].axis('off')
    
    axes[0, 1].imshow(gray, cmap='gray')
    axes[0, 1].set_title('Grayscale\n(1 channel: luminance)', fontweight='bold')
    axes[0, 1].axis('off')
    
    axes[0, 2].imshow(hsv)
    axes[0, 2].set_title('HSV Color Space\n(Hue-Saturation-Value)', fontweight='bold')
    axes[0, 2].axis('off')
    
    # Row 2: Edge detection
    axes[1, 0].imshow(blurred, cmap='gray')
    axes[1, 0].set_title('Gaussian Blur\n(Noise Reduction)', fontweight='bold')
    axes[1, 0].axis('off')
    
    axes[1, 1].imshow(edges, cmap='gray')
    axes[1, 1].set_title('Canny Edges\n(Gradient Detection)', fontweight='bold')
    axes[1, 1].axis('off')
    
    axes[1, 2].imshow(binary, cmap='gray')
    axes[1, 2].set_title('Binary Threshold\n(Otsu\'s Method)', fontweight='bold')
    axes[1, 2].axis('off')
    
    # Row 3: Morphology and contours
    axes[2, 0].imshow(morph_open, cmap='gray')
    axes[2, 0].set_title('Morphological Opening\n(Noise Removal)', fontweight='bold')
    axes[2, 0].axis('off')
    
    axes[2, 1].imshow(contour_img)
    axes[2, 1].set_title(f'Contour Detection\n({len(contours)} objects found)', fontweight='bold')
    axes[2, 1].axis('off')
    
    axes[2, 2].imshow(analysis_img)
    axes[2, 2].set_title('Object Analysis\n(Features Extracted)', fontweight='bold')
    axes[2, 2].axis('off')
    
    plt.tight_layout()
    plt.savefig('opencv_pipeline_output.png', dpi=150, bbox_inches='tight')
    print(f"\n✅ Pipeline complete! Saved to: opencv_pipeline_output.png")
    plt.show()
    
    return img_rgb, analysis_img


# ====== BONUS: Real-time Color Detection ======
def color_object_detector(image_path, target_color='red'):
    """
    Shows how OpenCV detects specific colors using HSV color space.
    Try: 'red', 'green', 'blue', 'yellow'
    """
    img = cv2.imread(image_path)
    if img is None:
        return
    
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Define color ranges in HSV
    color_ranges = {
        'red': ([0, 100, 100], [10, 255, 255]),
        'green': ([40, 40, 40], [80, 255, 255]),
        'blue': ([100, 100, 100], [130, 255, 255]),
        'yellow': ([20, 100, 100], [30, 255, 255])
    }
    
    if target_color not in color_ranges:
        print(f"Color '{target_color}' not available. Try: {list(color_ranges.keys())}")
        return
    
    lower, upper = color_ranges[target_color]
    mask = cv2.inRange(hsv, np.array(lower), np.array(upper))
    
    # Apply mask to image
    result = cv2.bitwise_and(img, img, mask=mask)
    
    # Find contours of colored objects
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    detection_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    for contour in contours:
        if cv2.contourArea(contour) > 500:
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(detection_img, (x, y), (x+w, y+h), (255, 0, 0), 3)
    
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    axes[0].set_title('Original')
    axes[0].axis('off')
    
    axes[1].imshow(mask, cmap='gray')
    axes[1].set_title(f'{target_color.title()} Color Mask')
    axes[1].axis('off')
    
    axes[2].imshow(detection_img)
    axes[2].set_title(f'Detected {target_color.title()} Objects: {len(contours)}')
    axes[2].axis('off')
    
    plt.tight_layout()
    plt.show()


# ====== RUN THE LAB ======
if __name__ == "__main__":
    print("\n" + "="*60)
    print("🎓 OPENCV VISUAL LEARNING LAB")
    print("="*60)
    print("\n📌 Instructions:")
    print("   1. Use a photo with clear objects/people")
    print("   2. Run: show_processing_pipeline('your_photo.jpg')")
    print("   3. Bonus: color_object_detector('photo.jpg', 'red')")
    print("\n💡 Good test images:")
    print("   - Room photo with furniture")
    print("   - Outdoor scene with people")
    print("   - Objects on a table")
    print("   - Download a sample: https://unsplash.com/photos/")
    print("\n" + "="*60)
    
    # Example usage (uncomment and replace with your image):
    show_processing_pipeline('dubai-chocolate.jpg')
    # color_object_detector('example.jpg', 'blue')`
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
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

# ====== INTERACTIVE IMAGE DIFFERENCE ANALYZER ======
# See EXACTLY what changed between two images!

def visualize_difference_math(img1, img2):
    """
    Show the actual mathematics behind image differencing.
    This is what OpenCV does under the hood!
    """
    print("\n" + "="*70)
    print("🔬 THE MATH BEHIND IMAGE DIFFERENCING")
    print("="*70)
    
    # Get small regions to show pixel values
    h, w = img1.shape[:2]
    sample_y, sample_x = h//2, w//2
    region_size = 5
    
    # Extract small regions
    region1 = img1[sample_y:sample_y+region_size, sample_x:sample_x+region_size, 0]
    region2 = img2[sample_y:sample_y+region_size, sample_x:sample_x+region_size, 0]
    
    print(f"\n📍 Sample Region at pixel ({sample_x}, {sample_y}):")
    print(f"\nImage 1 (Before) - Pixel Values:")
    print(region1)
    print(f"\nImage 2 (After) - Pixel Values:")
    print(region2)
    print(f"\nAbsolute Difference = |Image2 - Image1|:")
    diff_region = np.abs(region2.astype(int) - region1.astype(int))
    print(diff_region)
    
    print(f"\n💡 Algorithm:")
    print(f"   For each pixel (x,y):")
    print(f"   difference[x,y] = |pixel2[x,y] - pixel1[x,y]|")
    print(f"   if difference[x,y] > threshold:")
    print(f"       mark as CHANGED")
    print(f"   else:")
    print(f"       mark as UNCHANGED")
    print("\n" + "="*70)


def compare_two_images(image1_path, image2_path, threshold=30, min_area=100):
    """
    Compare two images and show what changed.
    Perfect for: before/after photos, spot-the-difference, change detection
    
    Args:
        image1_path: Path to first image (before)
        image2_path: Path to second image (after)
        threshold: Pixel difference threshold (0-255, default=30)
        min_area: Minimum changed area in pixels (default=100)
    """
    
    # Load images
    img1 = cv2.imread(image1_path)
    img2 = cv2.imread(image2_path)
    
    if img1 is None or img2 is None:
        print(f"❌ Could not load images!")
        print(f"   Image 1: {image1_path}")
        print(f"   Image 2: {image2_path}")
        return
    
    # Ensure same size
    if img1.shape != img2.shape:
        print(f"⚠️  Resizing images to match...")
        height = min(img1.shape[0], img2.shape[0])
        width = min(img1.shape[1], img2.shape[1])
        img1 = cv2.resize(img1, (width, height))
        img2 = cv2.resize(img2, (width, height))
    
    print(f"\n📸 Images loaded: {img1.shape[1]}x{img1.shape[0]} pixels")
    
    # Show the actual math
    visualize_difference_math(img1, img2)
    
    # Convert to grayscale
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    
    # Calculate absolute difference
    diff = cv2.absdiff(gray1, gray2)
    
    # Apply threshold
    _, thresh = cv2.threshold(diff, threshold, 255, cv2.THRESH_BINARY)
    
    # Clean up noise with morphological operations
    kernel = np.ones((3, 3), np.uint8)
    thresh_clean = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
    thresh_clean = cv2.morphologyEx(thresh_clean, cv2.MORPH_CLOSE, kernel)
    
    # Find contours (changed regions)
    contours, _ = cv2.findContours(thresh_clean, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Analyze changes
    significant_changes = []
    result_img = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
    
    for i, contour in enumerate(contours):
        area = cv2.contourArea(contour)
        if area < min_area:
            continue
        
        x, y, w, h = cv2.boundingRect(contour)
        
        # Calculate change intensity
        roi_diff = diff[y:y+h, x:x+w]
        avg_intensity = np.mean(roi_diff)
        
        significant_changes.append({
            'id': i+1,
            'bbox': (x, y, w, h),
            'area': area,
            'intensity': avg_intensity
        })
        
        # Draw on result
        color = (255, 0, 0) if avg_intensity > 50 else (255, 165, 0)
        cv2.rectangle(result_img, (x, y), (x+w, y+h), color, 2)
        cv2.putText(result_img, f"#{i+1}", (x, y-5),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
    
    # Calculate statistics
    total_changed_pixels = np.sum(thresh > 0)
    total_pixels = thresh.size
    change_percentage = (total_changed_pixels / total_pixels) * 100
    
    print(f"\n📊 CHANGE ANALYSIS:")
    print(f"   Threshold used: {threshold} (pixel difference)")
    print(f"   Total changed pixels: {total_changed_pixels:,} / {total_pixels:,}")
    print(f"   Overall change: {change_percentage:.2f}%")
    print(f"   Significant regions found: {len(significant_changes)}")
    
    if significant_changes:
        print(f"\n   Top changes:")
        for change in sorted(significant_changes, key=lambda x: x['area'], reverse=True)[:5]:
            x, y, w, h = change['bbox']
            print(f"      #{change['id']}: {int(change['area'])} px² at ({x},{y})")
            print(f"               Intensity: {change['intensity']:.1f}/255")
    
    # Create visualization
    fig = plt.figure(figsize=(18, 12))
    
    # Row 1: Original images
    ax1 = plt.subplot(3, 3, 1)
    ax1.imshow(cv2.cvtColor(img1, cv2.COLOR_BGR2RGB))
    ax1.set_title('Image 1: BEFORE', fontsize=14, fontweight='bold')
    ax1.axis('off')
    
    ax2 = plt.subplot(3, 3, 2)
    ax2.imshow(cv2.cvtColor(img2, cv2.COLOR_BGR2RGB))
    ax2.set_title('Image 2: AFTER', fontsize=14, fontweight='bold')
    ax2.axis('off')
    
    ax3 = plt.subplot(3, 3, 3)
    ax3.imshow(result_img)
    ax3.set_title(f'Changes Detected: {len(significant_changes)}', fontsize=14, fontweight='bold', color='red')
    ax3.axis('off')
    
    # Row 2: Processing steps
    ax4 = plt.subplot(3, 3, 4)
    ax4.imshow(gray1, cmap='gray')
    ax4.set_title('Grayscale Before', fontsize=12, fontweight='bold')
    ax4.axis('off')
    
    ax5 = plt.subplot(3, 3, 5)
    ax5.imshow(gray2, cmap='gray')
    ax5.set_title('Grayscale After', fontsize=12, fontweight='bold')
    ax5.axis('off')
    
    ax6 = plt.subplot(3, 3, 6)
    diff_colored = cv2.applyColorMap(diff, cv2.COLORMAP_JET)
    ax6.imshow(cv2.cvtColor(diff_colored, cv2.COLOR_BGR2RGB))
    ax6.set_title('Difference Heatmap\n(Hot=Changed, Cool=Same)', fontsize=12, fontweight='bold')
    ax6.axis('off')
    
    # Row 3: Analysis
    ax7 = plt.subplot(3, 3, 7)
    ax7.imshow(diff, cmap='hot')
    ax7.set_title('Raw Difference\n(Brighter=More Change)', fontsize=12, fontweight='bold')
    ax7.axis('off')
    
    ax8 = plt.subplot(3, 3, 8)
    ax8.imshow(thresh, cmap='gray')
    ax8.set_title(f'Binary Threshold\n(Threshold={threshold})', fontsize=12, fontweight='bold')
    ax8.axis('off')
    
    ax9 = plt.subplot(3, 3, 9)
    ax9.imshow(thresh_clean, cmap='gray')
    ax9.set_title('Cleaned Regions\n(Noise Removed)', fontsize=12, fontweight='bold')
    ax9.axis('off')
    
    plt.suptitle('IMAGE DIFFERENCE DETECTION - Visual Pipeline', 
                 fontsize=16, fontweight='bold', y=0.98)
    
    plt.tight_layout()
    plt.savefig('difference_analysis.png', dpi=150, bbox_inches='tight')
    print(f"\n✅ Analysis saved to: difference_analysis.png")
    plt.show()
    
    return {
        'changes': significant_changes,
        'change_percentage': change_percentage,
        'difference_map': diff,
        'threshold_map': thresh
    }


def create_test_images_from_photo(image_path):
    """
    Create a before/after pair from ONE image by adding changes.
    Great for learning when you don't have two separate photos!
    """
    img = cv2.imread(image_path)
    if img is None:
        print(f"❌ Could not load: {image_path}")
        return
    
    print("\n🎨 Creating test image pair...")
    
    # Create "before" image
    before = img.copy()
    
    # Create "after" image with modifications
    after = img.copy()
    h, w = after.shape[:2]
    
    # Add some changes
    # Change 1: Draw rectangle
    cv2.rectangle(after, (w//4, h//4), (w//2, h//2), (0, 255, 0), -1)
    
    # Change 2: Add circle
    cv2.circle(after, (3*w//4, h//4), 50, (255, 0, 0), -1)
    
    # Change 3: Add text
    cv2.putText(after, "CHANGED!", (w//2-100, 3*h//4), 
               cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 4)
    
    # Change 4: Blur a region
    roi = after[h//2:3*h//4, w//4:w//2]
    blurred_roi = cv2.GaussianBlur(roi, (51, 51), 0)
    after[h//2:3*h//4, w//4:w//2] = blurred_roi
    
    # Save test images
    cv2.imwrite('test_before.jpg', before)
    cv2.imwrite('test_after.jpg', after)
    
    print(f"✅ Created test images:")
    print(f"   test_before.jpg")
    print(f"   test_after.jpg")
    print(f"\nNow run: compare_two_images('test_before.jpg', 'test_after.jpg')")
    
    return 'test_before.jpg', 'test_after.jpg'


def interactive_threshold_demo(image1_path, image2_path):
    """
    Shows how different thresholds affect change detection.
    Helps you understand the threshold parameter!
    """
    img1 = cv2.imread(image1_path)
    img2 = cv2.imread(image2_path)
    
    if img1 is None or img2 is None:
        print("❌ Could not load images")
        return
    
    if img1.shape != img2.shape:
        height = min(img1.shape[0], img2.shape[0])
        width = min(img1.shape[1], img2.shape[1])
        img1 = cv2.resize(img1, (width, height))
        img2 = cv2.resize(img2, (width, height))
    
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    diff = cv2.absdiff(gray1, gray2)
    
    # Test different thresholds
    thresholds = [10, 20, 30, 50, 75, 100]
    
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))
    fig.suptitle('How Threshold Affects Change Detection', fontsize=16, fontweight='bold')
    
    for idx, thresh_val in enumerate(thresholds):
        _, thresh = cv2.threshold(diff, thresh_val, 255, cv2.THRESH_BINARY)
        changed_pixels = np.sum(thresh > 0)
        change_pct = (changed_pixels / thresh.size) * 100
        
        ax = axes[idx // 3, idx % 3]
        ax.imshow(thresh, cmap='gray')
        ax.set_title(f'Threshold = {thresh_val}\n{change_pct:.2f}% changed', 
                    fontweight='bold')
        ax.axis('off')
    
    plt.tight_layout()
    plt.savefig('threshold_comparison.png', dpi=150, bbox_inches='tight')
    print(f"\n✅ Threshold comparison saved to: threshold_comparison.png")
    plt.show()


# ====== MAIN USAGE ======
if __name__ == "__main__":
    print("\n" + "="*70)
    print("🔍 IMAGE DIFFERENCE DETECTION LAB")
    print("="*70)
    print("\n📚 What you'll learn:")
    print("   • How pixel subtraction works mathematically")
    print("   • Why thresholding matters")
    print("   • Real applications: security, quality control, change tracking")
    
    print("\n" + "="*70)
    print("🎯 QUICK START OPTIONS:")
    print("="*70)
    
    print("\n1️⃣  Compare two existing images:")
    print("    compare_two_images('before.jpg', 'after.jpg')")
    
    print("\n2️⃣  Create test images from one photo:")
    print("    create_test_images_from_photo('your_photo.jpg')")
    
    print("\n3️⃣  Understand threshold parameter:")
    print("    interactive_threshold_demo('before.jpg', 'after.jpg')")
    
    print("\n" + "="*70)
    print("💡 BEST PRACTICES:")
    print("="*70)
    print("   • Use images taken from same angle/lighting")
    print("   • Start with threshold=30 (adjust 10-50 for subtle changes)")
    print("   • min_area removes tiny noise (try 50-500)")
    print("   • Good test: take 2 photos of your desk, move something")
    
    print("\n" + "="*70)
    print("🏠 REAL-WORLD APPLICATIONS:")
    print("="*70)
    print("   📦 Warehouse: Detect missing inventory")
    print("   🏗️  Construction: Document progress")
    print("   🔒 Security: Spot intrusions")
    print("   🎮 Gaming: Spot-the-difference games")
    print("   📸 Photography: Before/after edits")
    print("   🏥 Medical: Compare X-rays/scans")
    
    print("\n" + "="*70)
    
    # Example: Uncomment to run
    create_test_images_from_photo('dubai-chocolate.jpg')
    compare_two_images('test_before.jpg', 'test_after.jpg', threshold=30)`

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
              <React.Fragment key={index}>
                <Card className="border-blue-200 dark:border-blue-800">
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
                        <div className="rounded-lg overflow-hidden border border-gray-700">
                          <CodeBlockR language="python">{part.code}</CodeBlockR>
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

                {/* Layer 2 Artifact: sklearn Discovery after Part 1 */}
                {index === 0 && (
                  <Card className="border-2 border-gradient-to-r from-green-400 to-blue-500 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-green-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            🔬 Deep Dive: The Birth of sklearn
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            Interactive Story - How a simple meal analysis problem led to discovering the entire ML ecosystem
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            <strong>The Problem:</strong> Counting unique pixels gave 97.2% variety score for EVERYTHING.
                            We needed intelligent color grouping - that's where sklearn's K-Means clustering entered the story.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            This interactive artifact tells the complete journey: from naive pixel counting → manual clustering attempts →
                            discovering K-Means → unlocking sklearn's full ecosystem.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Step-by-step problem evolution</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Visual demonstrations</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span>Real code comparisons</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Gateway to ML universe</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => navigate('/artifacts/layer2/sklearn-discovery')}
                          className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600 hover:from-green-600 hover:via-blue-600 hover:to-indigo-700 text-white font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
                        >
                          <div className="flex items-center justify-center gap-3 text-lg">
                            <Brain className="w-6 h-6" />
                            <span>Enter sklearn Discovery Journey</span>
                            <Zap className="w-5 h-5" />
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Layer 2 Artifact: Filters & Edges Lab after Part 2 */}
                {index === 1 && (
                  <Card className="border-2 border-gradient-to-r from-purple-400 to-pink-500 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-indigo-950/30 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            🎨 Interactive Lab: Convolution Playground
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            See filters transform images in real-time - upload your own photos and experiment!
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            <strong>Experience Convolution:</strong> Don't just read about filters - watch them work!
                            Upload your meal photos, workout images, or any picture and see how kernels transform pixels.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Experiment with blur, sharpen, edge detection, emboss - with interactive sliders to control kernel size
                            and thresholds. See the math behind Instagram filters come alive!
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Upload your own images</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span>Real-time filter preview</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span>Interactive kernel visualization</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                            <span>Understand convolution math</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => navigate('/artifacts/layer2/filters-and-edges')}
                          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-700 text-white font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
                        >
                          <div className="flex items-center justify-center gap-3 text-lg">
                            <ImageIcon className="w-6 h-6" />
                            <span>Enter Convolution Lab</span>
                            <Scan className="w-5 h-5" />
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Layer 2 Artifact: Contours & Segmentation Lab after Part 3 */}
                {index === 2 && (
                  <Card className="border-2 border-gradient-to-r from-orange-400 to-red-500 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/30 dark:via-red-950/30 dark:to-pink-950/30 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            🎯 Interactive Lab: Contours & Motion Detection
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            Find objects, separate them, track motion - see how security systems and rep counters actually work!
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            <strong>See Objects Come to Life:</strong> Upload photos of coins, toys, or fruits and watch the algorithm
                            find each object, draw contours, and count them automatically!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Three modes: <strong className="text-orange-600">Contour Detection</strong> (find & outline objects),
                            <strong className="text-blue-600"> Color Segmentation</strong> (separate by color),
                            <strong className="text-red-600"> Motion Tracking</strong> (animated demo showing how it works with video).
                          </p>
                        </div>

                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                            📸 Best Images to Upload:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-yellow-700 dark:text-yellow-300">
                            <div>• Coins on dark surface</div>
                            <div>• Colorful Lego blocks</div>
                            <div>• Fruits in a bowl</div>
                            <div>• Phone on desk</div>
                            <div>• Hand tools organized</div>
                            <div>• Keys on table</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span>Object detection & counting</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Color-based segmentation</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span>Simulated motion tracking</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Adjustable thresholds</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => navigate('/artifacts/layer2/contours-segmentation')}
                          className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 text-white font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
                        >
                          <div className="flex items-center justify-center gap-3 text-lg">
                            <Target className="w-6 h-6" />
                            <span>Enter Contours & Segmentation Lab</span>
                            <Move className="w-5 h-5" />
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Layer 2 Artifact: MediaPipe Lab after Part 4 */}
                {index === 3 && (
                  <Card className="border-2 border-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            🚀 Production Lab: MediaPipe Solutions
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            Google's battle-tested ML models - pose estimation, hand tracking, face mesh. Standing on giants' shoulders!
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                          <p className="text-muted-foreground mb-3">
                            <strong>The Power of Pre-trained Models:</strong> Building pose estimation from scratch requires PhD-level expertise,
                            years of training data, and millions in compute. MediaPipe gives it to you in 5 lines of code!
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Explore three production-ready solutions: <strong className="text-blue-600">Pose Estimation</strong> (33 body landmarks for fitness apps),
                            <strong className="text-green-600"> Hand Tracking</strong> (21 landmarks for gesture control),
                            <strong className="text-purple-600"> Face Mesh</strong> (468 landmarks for AR filters).
                          </p>
                        </div>

                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            🎯 What You'll Discover:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-blue-700 dark:text-blue-300">
                            <div>• Why MediaPipe changes everything</div>
                            <div>• Real code examples (Python)</div>
                            <div>• Production use cases</div>
                            <div>• Cross-platform magic</div>
                            <div>• From scratch vs MediaPipe</div>
                            <div>• Install & get started</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Pose: 33 landmarks</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Hands: 21 per hand</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Face: 468 points</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 rounded-lg border-l-4 border-amber-500">
                          <p className="text-sm text-amber-800 dark:text-amber-200">
                            <strong>💡 Real Applications:</strong> Google Fit, Peloton, Apple Fitness+ (pose), Snap/Instagram filters (face),
                            Sign language recognition (hands). This is production-grade ML anyone can use!
                          </p>
                        </div>

                        <Button
                          onClick={() => navigate('/artifacts/layer2/mediapipe-lab')}
                          className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
                        >
                          <div className="flex items-center justify-center gap-3 text-lg">
                            <Zap className="w-6 h-6" />
                            <span>Enter MediaPipe Lab</span>
                            <Activity className="w-5 h-5" />
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </React.Fragment>
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
