import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Eye, Video, Zap, Target, Shield, Clock, Activity, Camera, AlertTriangle, ChevronDown, ChevronUp, Code, Brain, Layers, Play, ArrowLeft } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const YOLOSessions3940 = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    part1: false,
    part2: false,
    part3: false,
    part4: false
  });

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const storyChapters = [
    {
      icon: "🚗",
      title: "2015: The Autonomous Driving Crisis",
      content: "Tesla's Autopilot team faces an impossible deadline. They need real-time object detection at 30 FPS.",
      details: "Traditional computer vision: R-CNN processes ONE image in 47 seconds. Fast R-CNN: 2.3 seconds. Still too slow. Autonomous vehicles need to detect pedestrians, cars, traffic signsall at once, 30 times per second. Miss one frame? Fatal accident. The industry needs a breakthrough. Engineers are desperate. Then Joseph Redmon publishes 'You Only Look Once' (2016) [https://arxiv.org/abs/1506.02640]. Same image: 0.022 seconds. 45 FPS. The automotive industry awakens."
    },
    {
      icon: "⚡",
      title: "The Paradigm Shift: One Shot, Everything",
      content: "Previous methods: look at image thousands of times (region proposals). YOLO: look ONCE, see EVERYTHING.",
      details: "R-CNN's approach: 1) Find 2,000 regions that might contain objects, 2) Run CNN on each region separately, 3) Classify each region. Total: 2,000+ forward passes. YOLO's insight: Divide image into grid (e.g., 7�7). Each cell predicts bounding boxes + class probabilities. Single neural network. One forward pass. All detections simultaneously. It's not just fasterit's architecturally different. Speed becomes intelligence."
    },
    {
      icon: "👁️",
      title: "2016-2018: YOLO v1-v3 - The Evolution",
      content: "From research paper to production reality. Each version solves real-world problems discovered in deployment.",
      details: "YOLOv1 (2016): Proof of concept. 45 FPS but struggles with small objects. YOLOv2 (2017): Batch normalization, anchor boxes, multi-scale training. Now detects small objects. 67 FPS. YOLOv3 (2018): Feature Pyramid Networksdetects at 3 scales simultaneously. Tiny objects to large vehicles. This is what Tesla uses. What security systems deploy. What your phone camera uses for portrait mode."
    },
    {
      icon: "🎯",
      title: "2020-2023: YOLOv4, v5, v8 - Production Mastery",
      content: "Open source meets industry. Ultralytics YOLOv5 becomes the most deployed object detection model in history.",
      details: "YOLOv4 (2020): Mosaic augmentation, self-adversarial training, 65 FPS. YOLOv5 (2020): PyTorch implementation, AutoAnchor, 140 FPS on GPU. Easy to train, easy to deploy. YOLOv8 (2023): Anchor-free, improved accuracy, exportable to mobile. Now: Warehouses use it for inventory. Hospitals for patient fall detection. Your personal health tracking? We're about to build that."
    },
    {
      icon: "🌍",
      title: "2024: YOLO Everywhere - Edge to Cloud",
      content: "From data centers to your pocket. YOLO runs on phones, drones, robots, satellites, surgical tools.",
      details: "The democratization: You can train a custom YOLO model on your laptop in hours, not weeks. Deploy it on Raspberry Pi for $50. Detect anything: workout form, meal portions, package deliveries, wildlife, manufacturing defects. Real-time object detection is no longer a luxury of tech giants. It's a tool available to anyone with curiosity and a camera. The question isn't 'Can machines see?' It's 'What do YOU want them to see for you?'"
    }
  ];

  const part1Content = {
    title: "Part 1: Understanding YOLO Architecture - How It Sees Everything at Once",
    description: "From 'Why is R-CNN so slow?' to understanding YOLO's single-shot detection architecture",
    code: `import numpy as np
import matplotlib.pyplot as plt
import cv2
from PIL import Image, ImageDraw

# ==========================================
# THE PROBLEM: Why Previous Object Detection Was Too Slow
# ==========================================

def demonstrate_detection_speed_crisis():
    """
    The Autonomous Driving Crisis (2015):

    R-CNN (2014):
      - Generate ~2,000 region proposals per image
      - Run CNN on EACH region separately
      - 47 seconds per image
      - For 30 FPS video: Need 1,410 seconds to process 1 second of video

    Fast R-CNN (2015):
      - Share CNN features across regions
      - 2.3 seconds per image
      - Still 13x slower than real-time

    The Need: Autonomous vehicles require:
      - 30 FPS minimum (0.033 seconds per frame)
      - Detect ALL objects simultaneously
      - Pedestrians, vehicles, signs, lanes
      - Miss one frame = potential accident

    YOLO (2016):
      - Single forward pass through network
      - 0.022 seconds per image
      - 45 FPS � Real-time possible!
    """

    print("=" * 80)
    print("THE REAL-TIME OBJECT DETECTION CRISIS")
    print("=" * 80)
    print()

    methods = {
        "R-CNN (2014)": {"time": 47.0, "fps": 0.021},
        "Fast R-CNN (2015)": {"time": 2.3, "fps": 0.43},
        "Faster R-CNN (2015)": {"time": 0.2, "fps": 5.0},
        "YOLO v1 (2016)": {"time": 0.022, "fps": 45.0},
        "YOLO v3 (2018)": {"time": 0.033, "fps": 30.0},
        "YOLO v5 (2020)": {"time": 0.007, "fps": 140.0},
        "YOLO v8 (2023)": {"time": 0.005, "fps": 200.0}
    }

    print(f"{'Method':<25} {'Time/Image':<15} {'FPS':<10} {'Real-time?':<15}")
    print("-" * 80)

    for method, stats in methods.items():
        realtime = " YES" if stats['fps'] >= 30 else "L NO"
        print(f"{method:<25} {stats['time']:<15.3f}s {stats['fps']:<10.1f} {realtime:<15}")

    print()
    print("=� THE BREAKTHROUGH:")
    print("   Instead of looking at 2,000+ regions separately...")
    print("   YOLO looks at the ENTIRE image ONCE")
    print("   Single neural network � All detections simultaneously")
    print()
    print("<� WHY IT MATTERS:")
    print("   " Autonomous vehicles: See pedestrians, cars, signs - all at once")
    print("   " Health monitoring: Track workout form in real-time")
    print("   " Security: Monitor multiple threats simultaneously")
    print("   " Finance: Scan receipts and documents instantly")
    print()

demonstrate_detection_speed_crisis()


# ==========================================
# YOLO ARCHITECTURE: The Grid-Based Detection System
# ==========================================

def visualize_yolo_grid_concept():
    """
    YOLO's Core Insight: Divide & Conquer

    1. Divide image into S � S grid (e.g., 7�7)
    2. Each grid cell predicts:
       - B bounding boxes (e.g., 2 boxes)
       - Confidence for each box
       - C class probabilities (e.g., 80 classes)

    3. Output tensor shape: S � S � (B * 5 + C)
       - For 7�7 grid, 2 boxes, 80 classes: 7 � 7 � 90

    This single tensor contains ALL detections!
    """

    print("=" * 80)
    print("YOLO GRID ARCHITECTURE")
    print("=" * 80)
    print()

    # Example: 7x7 grid, 2 bounding boxes per cell, 80 classes
    S = 7  # Grid size
    B = 2  # Bounding boxes per cell
    C = 80  # Number of classes (COCO dataset)

    print(f"Grid Configuration:")
    print(f"  " Image divided into {S}�{S} = {S*S} cells")
    print(f"  " Each cell predicts {B} bounding boxes")
    print(f"  " Each box predicts {C} class probabilities")
    print()

    # Each bounding box predicts: [x, y, w, h, confidence]
    box_params = 5
    cell_predictions = B * box_params + C

    print(f"Predictions per Cell:")
    print(f"  " Bounding boxes: {B} boxes � {box_params} params = {B * box_params}")
    print(f"    - (x, y): center coordinates")
    print(f"    - (w, h): width and height")
    print(f"    - confidence: P(object) � IOU")
    print(f"  " Class probabilities: {C} classes")
    print(f"  " Total per cell: {cell_predictions} values")
    print()

    total_predictions = S * S * cell_predictions
    print(f"Final Output Tensor:")
    print(f"  " Shape: {S} � {S} � {cell_predictions} = {total_predictions:,} predictions")
    print(f"  " This single tensor contains ALL objects in the image!")
    print()

    # Visualize the grid
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))

    # Create sample image
    img = np.random.rand(224, 224, 3)
    axes[0].imshow(img)
    axes[0].set_title('Original Image\\n(224�224 pixels)', fontsize=12, fontweight='bold')
    axes[0].axis('off')

    # Draw grid overlay
    cell_size = 224 // S
    for i in range(S + 1):
        axes[0].axhline(y=i * cell_size, color='cyan', linewidth=2, alpha=0.7)
        axes[0].axvline(x=i * cell_size, color='cyan', linewidth=2, alpha=0.7)

    # Visualize predictions
    axes[1].imshow(img)
    axes[1].set_title(f'YOLO Grid ({S}�{S})\\nEach cell predicts {B} boxes + {C} classes',
                     fontsize=12, fontweight='bold')
    axes[1].axis('off')

    # Draw sample bounding boxes in a few cells
    import matplotlib.patches as patches
    colors = ['red', 'yellow']

    for cell_i in [2, 3, 5]:
        for cell_j in [2, 4, 5]:
            for b in range(B):
                # Random box within cell
                cx = (cell_j + 0.5) * cell_size + np.random.randn() * 5
                cy = (cell_i + 0.5) * cell_size + np.random.randn() * 5
                w = cell_size * 0.8
                h = cell_size * 0.8

                rect = patches.Rectangle(
                    (cx - w/2, cy - h/2), w, h,
                    linewidth=2, edgecolor=colors[b], facecolor='none', alpha=0.7
                )
                axes[1].add_patch(rect)

    plt.tight_layout()
    plt.savefig('yolo_grid_architecture.png', dpi=300, bbox_inches='tight')
    print(" YOLO grid visualization saved: yolo_grid_architecture.png")
    print()

visualize_yolo_grid_concept()


# ==========================================
# YOLO PREDICTION: From Grid to Bounding Boxes
# ==========================================

class SimpleYOLOPredictor:
    """
    Simplified YOLO prediction logic

    This demonstrates how YOLO converts grid predictions to bounding boxes.
    Real YOLOv5/v8 use anchor boxes and more sophisticated non-max suppression.
    """

    def __init__(self, grid_size=7, num_boxes=2, num_classes=80, conf_threshold=0.5):
        self.S = grid_size
        self.B = num_boxes
        self.C = num_classes
        self.conf_threshold = conf_threshold

    def parse_predictions(self, predictions):
        """
        Convert YOLO output tensor to bounding boxes

        Input: predictions tensor [S, S, B*5 + C]
        Output: List of detected objects with [x, y, w, h, confidence, class]
        """
        detections = []

        for i in range(self.S):
            for j in range(self.S):
                cell_predictions = predictions[i, j]

                # Each cell predicts B bounding boxes
                for b in range(self.B):
                    # Extract box predictions: [x, y, w, h, confidence]
                    box_idx = b * 5
                    x, y, w, h, conf = cell_predictions[box_idx:box_idx+5]

                    # Convert from grid coordinates to image coordinates
                    # x, y are relative to cell, need to add cell offset
                    abs_x = (j + x) / self.S  # Normalize to [0, 1]
                    abs_y = (i + y) / self.S
                    abs_w = w
                    abs_h = h

                    # Only keep detections above confidence threshold
                    if conf > self.conf_threshold:
                        # Get class probabilities
                        class_probs = cell_predictions[self.B * 5:]
                        class_id = np.argmax(class_probs)
                        class_prob = class_probs[class_id]

                        # Final confidence = box confidence � class probability
                        final_conf = conf * class_prob

                        detections.append({
                            'bbox': [abs_x, abs_y, abs_w, abs_h],
                            'confidence': final_conf,
                            'class_id': class_id
                        })

        return detections

    def non_max_suppression(self, detections, iou_threshold=0.5):
        """
        Remove duplicate detections using Non-Maximum Suppression

        Multiple grid cells might detect the same object.
        NMS keeps only the highest confidence detection.
        """
        if len(detections) == 0:
            return []

        # Sort by confidence
        detections = sorted(detections, key=lambda x: x['confidence'], reverse=True)

        keep = []
        while len(detections) > 0:
            # Keep highest confidence detection
            best = detections[0]
            keep.append(best)
            detections = detections[1:]

            # Remove overlapping boxes
            detections = [
                d for d in detections
                if self.calculate_iou(best['bbox'], d['bbox']) < iou_threshold
            ]

        return keep

    def calculate_iou(self, box1, box2):
        """
        Calculate Intersection over Union (IoU)

        IoU = Area of Overlap / Area of Union
        Measures how much two boxes overlap (0 = no overlap, 1 = perfect overlap)
        """
        x1, y1, w1, h1 = box1
        x2, y2, w2, h2 = box2

        # Convert center coordinates to corner coordinates
        box1_x1, box1_y1 = x1 - w1/2, y1 - h1/2
        box1_x2, box1_y2 = x1 + w1/2, y1 + h1/2

        box2_x1, box2_y1 = x2 - w2/2, y2 - h2/2
        box2_x2, box2_y2 = x2 + w2/2, y2 + h2/2

        # Calculate intersection area
        inter_x1 = max(box1_x1, box2_x1)
        inter_y1 = max(box1_y1, box2_y1)
        inter_x2 = min(box1_x2, box2_x2)
        inter_y2 = min(box1_y2, box2_y2)

        if inter_x2 < inter_x1 or inter_y2 < inter_y1:
            return 0.0

        inter_area = (inter_x2 - inter_x1) * (inter_y2 - inter_y1)

        # Calculate union area
        box1_area = w1 * h1
        box2_area = w2 * h2
        union_area = box1_area + box2_area - inter_area

        return inter_area / union_area if union_area > 0 else 0.0


# Test YOLO prediction pipeline
print()
print("=" * 80)
print("YOLO PREDICTION PIPELINE")
print("=" * 80)
print()

# Create random predictions (simulating network output)
predictor = SimpleYOLOPredictor(grid_size=7, num_boxes=2, num_classes=80)
predictions = np.random.rand(7, 7, 2 * 5 + 80)

# Parse predictions
detections = predictor.parse_predictions(predictions)
print(f"Raw detections from grid: {len(detections)}")

# Apply Non-Maximum Suppression
final_detections = predictor.non_max_suppression(detections, iou_threshold=0.5)
print(f"After NMS: {len(final_detections)} unique objects detected")
print()

print("<� WHAT WE LEARNED:")
print("   1. YOLO divides image into grid � Each cell predicts objects")
print("   2. Single forward pass � All predictions simultaneously")
print("   3. Non-Max Suppression � Remove duplicate detections")
print("   4. Result: Fast, accurate, real-time object detection")
print()

print("=" * 80)
print("PART 1 COMPLETE: You understand YOLO's architecture.")
print("Now: Real applications with YOLOv8 and Ultralytics.")
print("=" * 80)
`
  };

  const part2Content = {
    title: "Part 2: YOLOv8 in Practice - Real-time Detection for Health & Finance",
    description: "From architecture to application: Building real-world detection systems",
    code: `import cv2
import numpy as np
from ultralytics import YOLO
import time
from collections import defaultdict, deque
import matplotlib.pyplot as plt
from datetime import datetime
import pandas as pd

# ==========================================
# SETUP: Installing and Loading YOLOv8
# ==========================================

"""
Installation:
    pip install ultralytics opencv-python pillow

YOLOv8 comes in 5 sizes:
    - YOLOv8n (nano):     3.2M params, 80 FPS (best for mobile/edge)
    - YOLOv8s (small):    11.2M params, 60 FPS
    - YOLOv8m (medium):   25.9M params, 45 FPS
    - YOLOv8l (large):    43.7M params, 30 FPS
    - YOLOv8x (xlarge):   68.2M params, 25 FPS (best accuracy)

For real-time applications: Use nano or small
For accuracy-critical applications: Use medium or large
"""

print("=" * 80)
print("YOLO v8: REAL-TIME OBJECT DETECTION")
print("=" * 80)
print()

# Load pre-trained YOLOv8 model (COCO dataset - 80 classes)
model = YOLO('yolov8n.pt')  # Nano model for speed

print(" YOLOv8n model loaded")
print(f"   " Model: YOLOv8 Nano")
print(f"   " Training: COCO dataset (80 object classes)")
print(f"   " Speed: ~80 FPS on GPU, ~30 FPS on CPU")
print()


# ==========================================
# HEALTH APPLICATION: Workout Form Analysis
# ==========================================

class WorkoutFormMonitor:
    """
    Real-time workout monitoring using YOLO

    Use Case: Personal trainer AI
    - Detect person in frame
    - Track workout equipment (dumbbells, yoga mat, etc.)
    - Count reps based on object movement
    - Monitor form consistency
    - Generate workout summaries

    Real-world: Used by fitness apps like Peloton, Mirror, Tempo
    """

    def __init__(self, model):
        self.model = model
        self.workout_log = []
        self.rep_count = 0
        self.equipment_detected = set()
        self.session_start = time.time()

        # COCO classes relevant to workouts
        self.workout_classes = {
            0: 'person',
            32: 'sports ball',
            33: 'baseball bat',
            34: 'baseball glove',
            35: 'skateboard',
            36: 'surfboard',
            37: 'tennis racket',
            # Note: COCO doesn't have dumbbells/kettlebells
            # For those, you'd train a custom model (Part 3)
        }

    def analyze_frame(self, frame):
        """
        Analyze single frame for workout monitoring

        Returns:
            - Annotated frame
            - Detection summary
            - Workout metrics
        """
        results = self.model(frame, conf=0.5, verbose=False)[0]

        detections = {
            'person_detected': False,
            'equipment': [],
            'bounding_boxes': [],
            'confidence_scores': []
        }

        # Parse detections
        for box in results.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            bbox = box.xyxy[0].cpu().numpy()  # [x1, y1, x2, y2]

            if class_id == 0:  # Person detected
                detections['person_detected'] = True

            if class_id in self.workout_classes:
                class_name = self.workout_classes[class_id]
                detections['equipment'].append(class_name)
                self.equipment_detected.add(class_name)

            detections['bounding_boxes'].append(bbox)
            detections['confidence_scores'].append(confidence)

        # Annotate frame
        annotated_frame = results.plot()

        # Add workout stats overlay
        session_duration = time.time() - self.session_start
        stats_text = [
            f"Session: {session_duration:.0f}s",
            f"Person: {'' if detections['person_detected'] else 'L'}",
            f"Equipment: {', '.join(set(detections['equipment'])) if detections['equipment'] else 'None'}"
        ]

        y_offset = 30
        for text in stats_text:
            cv2.putText(annotated_frame, text, (10, y_offset),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            y_offset += 30

        return annotated_frame, detections

    def generate_workout_summary(self):
        """Generate post-workout analysis"""
        duration = time.time() - self.session_start

        summary = {
            'duration_minutes': duration / 60,
            'equipment_used': list(self.equipment_detected),
            'frames_analyzed': len(self.workout_log),
            'avg_fps': len(self.workout_log) / duration if duration > 0 else 0
        }

        return summary


# ==========================================
# FINANCE APPLICATION: Receipt & Document Scanner
# ==========================================

class ReceiptScanner:
    """
    Intelligent receipt and document scanning using YOLO

    Use Case: Personal finance tracking
    - Detect documents/receipts in frame
    - Guide user to optimal capture position
    - Auto-capture when document is clear
    - Extract text regions for OCR
    - Categorize document type

    Real-world: Used by Expensify, Mint, banking apps
    """

    def __init__(self, model):
        self.model = model
        self.scanned_docs = []
        self.capture_queue = deque(maxlen=5)  # Stability checking

        # COCO classes for documents/items
        self.finance_classes = {
            0: 'person',
            73: 'book',
            84: 'book',
            # Note: For receipts specifically, custom training needed
            # COCO provides general document detection
        }

    def analyze_document(self, frame):
        """
        Analyze frame for document detection

        Returns guidance for optimal capture
        """
        results = self.model(frame, conf=0.6, verbose=False)[0]

        analysis = {
            'document_detected': False,
            'capture_ready': False,
            'guidance': [],
            'bounding_box': None
        }

        # Find largest document in frame
        max_area = 0
        best_box = None

        for box in results.boxes:
            bbox = box.xyxy[0].cpu().numpy()
            x1, y1, x2, y2 = bbox
            area = (x2 - x1) * (y2 - y1)

            if area > max_area:
                max_area = area
                best_box = bbox
                analysis['document_detected'] = True

        if analysis['document_detected']:
            analysis['bounding_box'] = best_box

            # Check capture conditions
            frame_h, frame_w = frame.shape[:2]
            x1, y1, x2, y2 = best_box

            # Document should fill 40-80% of frame
            doc_area_ratio = max_area / (frame_h * frame_w)

            if doc_area_ratio < 0.4:
                analysis['guidance'].append("Move closer")
            elif doc_area_ratio > 0.8:
                analysis['guidance'].append("Move farther")
            else:
                # Check if document is centered
                center_x = (x1 + x2) / 2
                center_y = (y1 + y2) / 2

                if abs(center_x - frame_w/2) > frame_w * 0.1:
                    analysis['guidance'].append("Center horizontally")
                elif abs(center_y - frame_h/2) > frame_h * 0.1:
                    analysis['guidance'].append("Center vertically")
                else:
                    # Perfect position - check stability
                    self.capture_queue.append(True)
                    if len(self.capture_queue) == 5 and all(self.capture_queue):
                        analysis['capture_ready'] = True
                        analysis['guidance'].append(" READY TO CAPTURE")

        else:
            analysis['guidance'].append("No document detected")

        return analysis

    def capture_document(self, frame, bbox):
        """Crop and save document region"""
        x1, y1, x2, y2 = map(int, bbox)
        cropped = frame[y1:x2, x1:x2]

        # In production: Send to OCR (Tesseract, Google Vision API)
        # Extract text, amounts, dates, merchant names

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"receipt_{timestamp}.jpg"
        cv2.imwrite(filename, cropped)

        self.scanned_docs.append({
            'timestamp': timestamp,
            'filename': filename,
            'bbox': bbox
        })

        return filename


# ==========================================
# REAL-TIME WEBCAM DEMO
# ==========================================

def run_health_monitor_demo(duration_seconds=30):
    """
    Live workout monitoring demo

    Press 'q' to quit
    Press 's' to save screenshot
    """
    print()
    print("=" * 80)
    print("HEALTH MONITORING DEMO: Workout Form Analysis")
    print("=" * 80)
    print()
    print("Starting webcam...")
    print("Press 'q' to quit, 's' to save screenshot")
    print()

    monitor = WorkoutFormMonitor(model)
    cap = cv2.VideoCapture(0)

    fps_queue = deque(maxlen=30)
    start_time = time.time()

    while True:
        frame_start = time.time()

        ret, frame = cap.read()
        if not ret:
            break

        # Analyze frame
        annotated_frame, detections = monitor.analyze_frame(frame)

        # Calculate FPS
        fps = 1.0 / (time.time() - frame_start)
        fps_queue.append(fps)
        avg_fps = np.mean(fps_queue)

        # Display FPS
        cv2.putText(annotated_frame, f"FPS: {avg_fps:.1f}", (10, frame.shape[0] - 10),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)

        cv2.imshow('Workout Monitor - YOLOv8', annotated_frame)

        # Log detection
        monitor.workout_log.append({
            'timestamp': time.time() - start_time,
            'detections': detections
        })

        # Handle keyboard input
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s'):
            cv2.imwrite(f'workout_frame_{int(time.time())}.jpg', annotated_frame)
            print("Screenshot saved!")

    cap.release()
    cv2.destroyAllWindows()

    # Generate summary
    summary = monitor.generate_workout_summary()
    print()
    print("=" * 80)
    print("WORKOUT SESSION SUMMARY")
    print("=" * 80)
    print(f"Duration: {summary['duration_minutes']:.1f} minutes")
    print(f"Equipment detected: {', '.join(summary['equipment_used']) if summary['equipment_used'] else 'None'}")
    print(f"Average FPS: {summary['avg_fps']:.1f}")
    print(f"Total frames: {summary['frames_analyzed']}")
    print()


def run_receipt_scanner_demo():
    """
    Live receipt scanning demo

    Position receipt in frame following guidance
    Auto-captures when stable
    """
    print()
    print("=" * 80)
    print("FINANCE APPLICATION: Smart Receipt Scanner")
    print("=" * 80)
    print()
    print("Starting webcam...")
    print("Position receipt in frame - follow on-screen guidance")
    print("Press 'q' to quit, 'c' to force capture")
    print()

    scanner = ReceiptScanner(model)
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Analyze frame
        analysis = scanner.analyze_document(frame)

        # Draw bounding box if document detected
        if analysis['document_detected']:
            x1, y1, x2, y2 = map(int, analysis['bounding_box'])
            color = (0, 255, 0) if analysis['capture_ready'] else (255, 165, 0)
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 3)

        # Display guidance
        y_offset = 30
        for guidance in analysis['guidance']:
            color = (0, 255, 0) if '' in guidance else (255, 255, 255)
            cv2.putText(frame, guidance, (10, y_offset),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
            y_offset += 40

        cv2.imshow('Receipt Scanner - YOLOv8', frame)

        # Auto-capture or manual capture
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif (key == ord('c') or analysis['capture_ready']) and analysis['document_detected']:
            filename = scanner.capture_document(frame, analysis['bounding_box'])
            print(f"=� Captured: {filename}")
            scanner.capture_queue.clear()  # Reset stability

    cap.release()
    cv2.destroyAllWindows()

    print()
    print(f"Total documents scanned: {len(scanner.scanned_docs)}")
    print()


# ==========================================
# CHOOSE YOUR DEMO
# ==========================================

print("=" * 80)
print("YOLO v8 REAL-TIME DEMOS")
print("=" * 80)
print()
print("Available demos:")
print("  1. Workout Form Monitor (Health)")
print("  2. Receipt Scanner (Finance)")
print()
print("Uncomment the demo you want to run:")
print()

# run_health_monitor_demo(duration_seconds=30)
# run_receipt_scanner_demo()

print("=" * 80)
print("PART 2 COMPLETE: You've built real-time detection systems.")
print("Next: Custom training for YOUR specific objects.")
print("=" * 80)
`
  };

  const part3Content = {
    title: "Part 3: Custom YOLO Training - Detecting YOUR Objects",
    description: "Train YOLO to detect anything: meal portions, workout equipment, receipts, products",
    code: `from ultralytics import YOLO
import os
from pathlib import Path
import yaml
import shutil
import random
from PIL import Image, ImageDraw
import numpy as np

# ==========================================
# THE NEED: Why Custom Training?
# ==========================================

"""
COCO dataset (80 classes): person, car, dog, laptop, etc.
Great for general detection, but missing:

For Health:
  - Specific food items (broccoli, chicken breast, protein shake)
  - Workout equipment (dumbbells, kettlebells, resistance bands)
  - Portion sizes (small/medium/large servings)
  - Exercise poses (squat, plank, push-up)

For Finance:
  - Receipt types (grocery, restaurant, gas station)
  - Currency notes and coins
  - Financial documents (invoices, bills, statements)
  - Product barcodes and price tags

Custom Training allows you to detect ANYTHING with just 100-500 labeled images!
"""

print("=" * 80)
print("CUSTOM YOLO TRAINING: Detect Anything You Want")
print("=" * 80)
print()


# ==========================================
# STEP 1: Dataset Preparation
# ==========================================

class YOLODatasetBuilder:
    """
    Prepare custom dataset for YOLO training

    YOLO training format:
    
       
          
             
             
          
             
       
          
             
             
          
             
       
    """

    def __init__(self, dataset_name, class_names):
        self.dataset_name = dataset_name
        self.class_names = class_names
        self.dataset_path = Path(f"datasets/{dataset_name}")

        self.setup_directories()

    def setup_directories(self):
        """Create YOLO dataset directory structure"""
        print(f"Setting up dataset: {self.dataset_name}")
        print(f"Classes: {', '.join(self.class_names)}")
        print()

        # Create directories
        dirs = [
            self.dataset_path / "images" / "train",
            self.dataset_path / "images" / "val",
            self.dataset_path / "labels" / "train",
            self.dataset_path / "labels" / "val"
        ]

        for dir_path in dirs:
            dir_path.mkdir(parents=True, exist_ok=True)

        print(f" Created directory structure at {self.dataset_path}")

    def create_data_yaml(self, train_path, val_path):
        """
        Create data.yaml configuration file

        This file tells YOLO where to find images and what classes to detect
        """
        data_config = {
            'path': str(self.dataset_path.absolute()),
            'train': str(train_path),
            'val': str(val_path),
            'nc': len(self.class_names),  # Number of classes
            'names': self.class_names
        }

        yaml_path = self.dataset_path / "data.yaml"
        with open(yaml_path, 'w') as f:
            yaml.dump(data_config, f, default_flow_style=False)

        print(f" Created {yaml_path}")
        return yaml_path

    def yolo_format_annotation(self, image_width, image_height, bbox, class_id):
        """
        Convert bounding box to YOLO format

        YOLO format: <class_id> <x_center> <y_center> <width> <height>
        All coordinates normalized to [0, 1]

        Input bbox: [x_min, y_min, x_max, y_max] in pixels
        Output: "class_id x_center y_center width height" (normalized)
        """
        x_min, y_min, x_max, y_max = bbox

        # Calculate center and dimensions
        x_center = (x_min + x_max) / 2.0 / image_width
        y_center = (y_min + y_max) / 2.0 / image_height
        width = (x_max - x_min) / image_width
        height = (y_max - y_min) / image_height

        # Format: class x_center y_center width height
        return f"{class_id} {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}"

    def add_labeled_image(self, image_path, annotations, split='train'):
        """
        Add image and its annotations to dataset

        annotations: List of (bbox, class_id) tuples
        bbox: [x_min, y_min, x_max, y_max]
        """
        # Open image to get dimensions
        img = Image.open(image_path)
        img_width, img_height = img.size

        # Copy image to dataset
        img_name = Path(image_path).name
        dest_img = self.dataset_path / "images" / split / img_name
        shutil.copy(image_path, dest_img)

        # Create label file
        label_name = Path(image_path).stem + ".txt"
        label_path = self.dataset_path / "labels" / split / label_name

        with open(label_path, 'w') as f:
            for bbox, class_id in annotations:
                yolo_line = self.yolo_format_annotation(img_width, img_height, bbox, class_id)
                f.write(yolo_line + '\\n')

        return dest_img, label_path


# ==========================================
# EXAMPLE: Health App - Meal Portion Detection
# ==========================================

def create_meal_portion_dataset():
    """
    Example: Train YOLO to detect meal portions

    Classes:
      0: small_portion
      1: medium_portion
      2: large_portion
      3: protein (chicken, fish, meat)
      4: vegetables (broccoli, salad, carrots)
      5: carbs (rice, pasta, bread)

    Use case: Automatic meal logging for calorie tracking
    """

    print("=" * 80)
    print("HEALTH APPLICATION: Meal Portion Detection Dataset")
    print("=" * 80)
    print()

    classes = ['small_portion', 'medium_portion', 'large_portion',
               'protein', 'vegetables', 'carbs']

    dataset = YOLODatasetBuilder('meal_portions', classes)

    # In real scenario:
    # 1. Collect 300-500 photos of meals
    # 2. Label using tools like LabelImg, Roboflow, or CVAT
    # 3. Export in YOLO format
    # 4. Split 80/20 into train/val

    print("=� Dataset Collection Tips:")
    print("   " Take photos from different angles")
    print("   " Various lighting conditions")
    print("   " Different plate sizes and colors")
    print("   " Mix of cuisines and meal types")
    print("   " Minimum 50 images per class")
    print()

    # Create data.yaml
    yaml_path = dataset.create_data_yaml('images/train', 'images/val')

    print(" Meal portion dataset ready for labeling!")
    print(f"   Next step: Use LabelImg or Roboflow to annotate images")
    print()

    return yaml_path


# ==========================================
# EXAMPLE: Finance App - Receipt Detection
# ==========================================

def create_receipt_detection_dataset():
    """
    Example: Train YOLO to detect receipt components

    Classes:
      0: receipt (full document)
      1: merchant_name
      2: total_amount
      3: date
      4: line_items
      5: payment_method

    Use case: Automatic expense tracking and categorization
    """

    print("=" * 80)
    print("FINANCE APPLICATION: Receipt Component Detection Dataset")
    print("=" * 80)
    print()

    classes = ['receipt', 'merchant_name', 'total_amount',
               'date', 'line_items', 'payment_method']

    dataset = YOLODatasetBuilder('receipt_components', classes)

    print("=� Dataset Collection Tips:")
    print("   " Scan receipts from various stores")
    print("   " Include different receipt formats")
    print("   " Capture in various lighting conditions")
    print("   " Some crumpled or slightly damaged receipts")
    print("   " Minimum 200 receipts (more is better)")
    print()

    yaml_path = dataset.create_data_yaml('images/train', 'images/val')

    print(" Receipt detection dataset ready for labeling!")
    print(f"   Next step: Use LabelImg or Roboflow to annotate receipts")
    print()

    return yaml_path


# ==========================================
# STEP 2: Training Custom YOLO Model
# ==========================================

class CustomYOLOTrainer:
    """
    Train custom YOLO model on your dataset

    Training process:
    1. Load pre-trained weights (transfer learning)
    2. Fine-tune on your custom dataset
    3. Validate and evaluate
    4. Export for deployment
    """

    def __init__(self, model_size='n'):
        """
        model_size options:
          'n' (nano): Fastest, good for edge devices
          's' (small): Balanced speed/accuracy
          'm' (medium): Better accuracy, slower
        """
        self.model_size = model_size
        self.model = YOLO(f'yolov8{model_size}.pt')  # Pre-trained COCO weights

    def train(self, data_yaml, epochs=100, imgsz=640, batch=16):
        """
        Train custom model

        Parameters:
          data_yaml: Path to data.yaml configuration
          epochs: Training iterations (100-300 typical)
          imgsz: Image size (640 standard, 320 for faster)
          batch: Batch size (adjust based on GPU memory)

        Transfer Learning:
          - Starts with COCO pre-trained weights
          - Already knows edges, shapes, objects
          - Only learns YOUR specific classes
          - Needs 10x less data than training from scratch
        """

        print("=" * 80)
        print(f"TRAINING CUSTOM YOLOv8{self.model_size.upper()} MODEL")
        print("=" * 80)
        print()
        print(f"Configuration:")
        print(f"  " Dataset: {data_yaml}")
        print(f"  " Epochs: {epochs}")
        print(f"  " Image size: {imgsz}�{imgsz}")
        print(f"  " Batch size: {batch}")
        print()
        print("Starting training...")
        print("(This will take 1-4 hours depending on dataset size and GPU)")
        print()

        # Train model
        results = self.model.train(
            data=data_yaml,
            epochs=epochs,
            imgsz=imgsz,
            batch=batch,
            patience=50,  # Early stopping
            save=True,
            device='0',  # GPU 0 (use 'cpu' if no GPU)
            workers=8,
            exist_ok=True,
            pretrained=True,  # Use transfer learning
            optimizer='AdamW',
            verbose=True,
            seed=42,
            deterministic=True,
            plots=True  # Generate training plots
        )

        print()
        print(" Training complete!")
        print(f"   Best model saved to: runs/detect/train/weights/best.pt")
        print()

        return results

    def validate(self, data_yaml, weights='best.pt'):
        """Validate model on test set"""
        metrics = self.model.val(
            data=data_yaml,
            weights=f'runs/detect/train/weights/{weights}'
        )

        print("=" * 80)
        print("VALIDATION METRICS")
        print("=" * 80)
        print(f"mAP@0.5: {metrics.box.map50:.3f}")
        print(f"mAP@0.5:0.95: {metrics.box.map:.3f}")
        print(f"Precision: {metrics.box.mp:.3f}")
        print(f"Recall: {metrics.box.mr:.3f}")
        print()

        return metrics

    def export_for_deployment(self, format='onnx'):
        """
        Export model for production deployment

        Formats:
          'onnx': Universal format (recommended)
          'torchscript': PyTorch deployment
          'coreml': iOS deployment
          'tflite': Android/mobile deployment
          'engine': TensorRT (NVIDIA GPUs)
        """
        print(f"Exporting model to {format.upper()} format...")

        self.model.export(format=format)

        print(f" Model exported: runs/detect/train/weights/best.{format}")
        print()


# ==========================================
# EXAMPLE TRAINING WORKFLOW
# ==========================================

def train_meal_portion_detector():
    """
    Complete workflow: Train meal portion detection model

    This is what you'd run after collecting and labeling your dataset
    """

    # Step 1: Create dataset (assuming images already labeled)
    data_yaml = create_meal_portion_dataset()

    # Step 2: Train model
    trainer = CustomYOLOTrainer(model_size='n')  # Nano for speed

    # Uncomment to actually train (requires labeled dataset)
    # results = trainer.train(
    #     data_yaml=data_yaml,
    #     epochs=100,
    #     imgsz=640,
    #     batch=16
    # )

    # Step 3: Validate
    # metrics = trainer.validate(data_yaml)

    # Step 4: Export for deployment
    # trainer.export_for_deployment(format='onnx')

    print("=" * 80)
    print("MEAL PORTION DETECTOR: Ready for Production")
    print("=" * 80)
    print()
    print("Next steps:")
    print("  1. Integrate into your health tracking app")
    print("  2. Point camera at meal � Auto-detect portions")
    print("  3. Estimate calories based on portion sizes")
    print("  4. Log to database � Daily nutrition tracking")
    print()


def train_receipt_detector():
    """
    Complete workflow: Train receipt component detector
    """

    data_yaml = create_receipt_detection_dataset()

    trainer = CustomYOLOTrainer(model_size='s')  # Small for accuracy

    # Uncomment to train
    # results = trainer.train(data_yaml, epochs=150)
    # metrics = trainer.validate(data_yaml)
    # trainer.export_for_deployment(format='onnx')

    print("=" * 80)
    print("RECEIPT DETECTOR: Ready for Production")
    print("=" * 80)
    print()
    print("Next steps:")
    print("  1. Integrate into expense tracking app")
    print("  2. Detect receipt � Extract text regions")
    print("  3. OCR on detected regions � Parse amounts, dates")
    print("  4. Auto-categorize expenses � Financial insights")
    print()


# ==========================================
# QUICK START GUIDE
# ==========================================

print("=" * 80)
print("CUSTOM YOLO TRAINING: Quick Start Guide")
print("=" * 80)
print()
print("Step 1: Collect Images")
print("  " 50-200 images per class minimum")
print("  " Diverse angles, lighting, backgrounds")
print()
print("Step 2: Label Images")
print("  " Use LabelImg: pip install labelimg")
print("  " Or use Roboflow (web-based, easier)")
print("  " Export in YOLO format")
print()
print("Step 3: Train Model")
print("  " Run: trainer.train(data_yaml, epochs=100)")
print("  " Monitor training: tensorboard --logdir runs")
print("  " Wait 1-4 hours for training to complete")
print()
print("Step 4: Deploy")
print("  " Export model: trainer.export_for_deployment()")
print("  " Integrate into your app")
print("  " Start detecting YOUR objects!")
print()

# Example workflows (uncomment to run)
# train_meal_portion_detector()
# train_receipt_detector()

print("=" * 80)
print("PART 3 COMPLETE: You can now train YOLO on anything.")
print("Final Part: Production deployment and optimization.")
print("=" * 80)
`
  };

  const part4Content = {
    title: "Part 4: Production Deployment - From Prototype to Real-World App",
    description: "Deploy YOLO at scale: Optimization, edge devices, cloud integration, monitoring",
    code: `import cv2
import numpy as np
from ultralytics import YOLO
import time
from collections import deque
import threading
import queue
from pathlib import Path
import json
from datetime import datetime
import requests

# ==========================================
# PRODUCTION OPTIMIZATION: Speed & Efficiency
# ==========================================

class OptimizedYOLODetector:
    """
    Production-ready YOLO detector with optimizations

    Optimizations:
    1. Model quantization (FP16/INT8)
    2. Batch processing
    3. Frame skipping for video
    4. Multi-threading
    5. GPU memory management
    6. Async processing pipeline
    """

    def __init__(self, model_path, device='cuda:0', fp16=True):
        """
        Load optimized model

        device: 'cuda:0' for GPU, 'cpu' for CPU
        fp16: Use half-precision (2x faster, minimal accuracy loss)
        """
        self.model = YOLO(model_path)
        self.device = device
        self.fp16 = fp16

        # Warm up model (first inference is slow)
        dummy_input = np.zeros((640, 640, 3), dtype=np.uint8)
        self.model(dummy_input, device=device, half=fp16, verbose=False)

        print(f" Model loaded: {model_path}")
        print(f"   Device: {device}")
        print(f"   FP16: {fp16}")

    def detect_single(self, image, conf=0.5):
        """Single image detection with optimization"""
        results = self.model(
            image,
            device=self.device,
            half=self.fp16,
            conf=conf,
            verbose=False
        )[0]

        return results

    def detect_batch(self, images, conf=0.5, batch_size=8):
        """
        Batch processing for multiple images

        Processes multiple images simultaneously for efficiency
        Useful for: Processing video frames, bulk image analysis
        """
        detections = []

        for i in range(0, len(images), batch_size):
            batch = images[i:i+batch_size]

            results = self.model(
                batch,
                device=self.device,
                half=self.fp16,
                conf=conf,
                verbose=False
            )

            detections.extend(results)

        return detections


# ==========================================
# VIDEO PROCESSING: Efficient Real-Time Detection
# ==========================================

class VideoStreamDetector:
    """
    Optimized video stream detection

    Techniques:
    - Frame skipping (process every Nth frame)
    - Async processing (detection doesn't block video)
    - Temporal smoothing (stable detections across frames)
    - Adaptive resolution (lower res when needed)
    """

    def __init__(self, model_path, skip_frames=2, buffer_size=4):
        self.detector = OptimizedYOLODetector(model_path)
        self.skip_frames = skip_frames
        self.frame_count = 0

        # Async processing
        self.frame_queue = queue.Queue(maxsize=buffer_size)
        self.result_queue = queue.Queue(maxsize=buffer_size)

        # Detection smoothing
        self.detection_history = deque(maxlen=5)

        # Start async processor
        self.processing = True
        self.processor_thread = threading.Thread(target=self._async_processor)
        self.processor_thread.daemon = True
        self.processor_thread.start()

    def _async_processor(self):
        """Background thread for detection processing"""
        while self.processing:
            try:
                frame = self.frame_queue.get(timeout=1)
                results = self.detector.detect_single(frame)
                self.result_queue.put(results)
            except queue.Empty:
                continue

    def process_frame(self, frame):
        """
        Process video frame with optimizations

        Returns:
          - results: Detection results (or None if frame skipped)
          - processed: Whether this frame was processed
        """
        self.frame_count += 1

        # Frame skipping: Only process every Nth frame
        if self.frame_count % (self.skip_frames + 1) != 0:
            return None, False

        # Send frame for async processing
        if not self.frame_queue.full():
            self.frame_queue.put(frame)

        # Get results if available
        try:
            results = self.result_queue.get_nowait()
            self.detection_history.append(results)
            return results, True
        except queue.Empty:
            # Use previous results if new ones not ready
            if len(self.detection_history) > 0:
                return self.detection_history[-1], False
            return None, False

    def stop(self):
        """Clean shutdown"""
        self.processing = False
        self.processor_thread.join(timeout=2)


# ==========================================
# HEALTH APP: Production Workout Tracker
# ==========================================

class ProductionWorkoutTracker:
    """
    Production-grade workout tracking system

    Features:
    - Real-time detection with optimizations
    - Cloud data sync
    - Offline operation
    - Performance monitoring
    - Error handling & recovery
    """

    def __init__(self, model_path, api_endpoint=None):
        self.detector = VideoStreamDetector(model_path, skip_frames=1)
        self.api_endpoint = api_endpoint

        # Session management
        self.session = {
            'start_time': datetime.now(),
            'exercises_detected': [],
            'reps_counted': 0,
            'frames_processed': 0,
            'avg_fps': 0
        }

        # Offline queue (sync when connection available)
        self.offline_queue = []

    def log_exercise_rep(self, exercise_type, confidence):
        """Log exercise repetition"""
        rep_data = {
            'timestamp': datetime.now().isoformat(),
            'exercise': exercise_type,
            'confidence': confidence,
            'session_id': id(self.session)
        }

        self.session['reps_counted'] += 1
        self.session['exercises_detected'].append(rep_data)

        # Try to sync to cloud
        if self.api_endpoint:
            try:
                response = requests.post(
                    f"{self.api_endpoint}/workouts/log",
                    json=rep_data,
                    timeout=1
                )
                if response.status_code != 200:
                    self.offline_queue.append(rep_data)
            except:
                # Network error - queue for later
                self.offline_queue.append(rep_data)

    def sync_offline_data(self):
        """Sync queued data when connection available"""
        if not self.api_endpoint or len(self.offline_queue) == 0:
            return

        try:
            response = requests.post(
                f"{self.api_endpoint}/workouts/bulk_sync",
                json=self.offline_queue,
                timeout=5
            )

            if response.status_code == 200:
                print(f" Synced {len(self.offline_queue)} offline entries")
                self.offline_queue.clear()
        except Exception as e:
            print(f"Sync failed: {e}")

    def get_session_summary(self):
        """Generate workout session summary"""
        duration = (datetime.now() - self.session['start_time']).total_seconds()

        return {
            'duration_minutes': duration / 60,
            'total_reps': self.session['reps_counted'],
            'exercises': len(self.session['exercises_detected']),
            'avg_fps': self.session['avg_fps'],
            'offline_pending': len(self.offline_queue)
        }


# ==========================================
# FINANCE APP: Production Receipt Scanner
# ==========================================

class ProductionReceiptScanner:
    """
    Production receipt scanning and OCR pipeline

    Pipeline:
    1. YOLO detects receipt and components
    2. Extract text regions
    3. OCR (Tesseract/Google Vision)
    4. Parse amounts, dates, merchants
    5. Categorize expense
    6. Sync to database
    """

    def __init__(self, model_path, ocr_api_key=None):
        self.detector = OptimizedYOLODetector(model_path)
        self.ocr_api_key = ocr_api_key

        # Receipt processing queue
        self.processing_queue = []

    def scan_receipt(self, image):
        """
        Full receipt processing pipeline

        Returns structured receipt data
        """
        # Step 1: Detect receipt components
        results = self.detector.detect_single(image, conf=0.6)

        receipt_data = {
            'timestamp': datetime.now().isoformat(),
            'detections': [],
            'extracted_text': {},
            'parsed_fields': {}
        }

        # Step 2: Extract detected regions
        for box in results.boxes:
            class_id = int(box.cls[0])
            class_name = results.names[class_id]
            bbox = box.xyxy[0].cpu().numpy()

            receipt_data['detections'].append({
                'class': class_name,
                'bbox': bbox.tolist(),
                'confidence': float(box.conf[0])
            })

            # Crop region for OCR
            x1, y1, x2, y2 = map(int, bbox)
            region = image[y1:y2, x1:x2]

            # Step 3: OCR on region
            text = self.ocr_region(region, class_name)
            receipt_data['extracted_text'][class_name] = text

        # Step 4: Parse structured fields
        receipt_data['parsed_fields'] = self.parse_receipt_fields(
            receipt_data['extracted_text']
        )

        return receipt_data

    def ocr_region(self, image_region, region_type):
        """
        OCR on image region

        Options:
        1. Tesseract (free, offline)
        2. Google Vision API (best accuracy, paid)
        3. AWS Textract (good for receipts, paid)
        """
        # Simplified - in production use actual OCR
        if self.ocr_api_key:
            # Use cloud OCR API
            return self._cloud_ocr(image_region)
        else:
            # Use local Tesseract
            return self._tesseract_ocr(image_region)

    def _tesseract_ocr(self, image):
        """Local Tesseract OCR"""
        try:
            import pytesseract
            text = pytesseract.image_to_string(image)
            return text.strip()
        except:
            return ""

    def _cloud_ocr(self, image):
        """Cloud OCR (Google Vision API example)"""
        # Placeholder - implement actual API call
        return "Mock OCR text"

    def parse_receipt_fields(self, extracted_text):
        """
        Parse structured fields from extracted text

        Uses regex + NLP to extract:
        - Total amount
        - Date
        - Merchant name
        - Payment method
        - Line items
        """
        import re

        fields = {
            'total': None,
            'date': None,
            'merchant': None,
            'category': None
        }

        # Simple parsing (in production use more sophisticated NLP)
        all_text = ' '.join(extracted_text.values())

        # Extract total amount
        amount_match = re.search(r'\\$?(\\d+\\.\\d{2})', all_text)
        if amount_match:
            fields['total'] = float(amount_match.group(1))

        # Extract date
        date_match = re.search(r'(\\d{1,2}/\\d{1,2}/\\d{2,4})', all_text)
        if date_match:
            fields['date'] = date_match.group(1)

        # Categorize based on merchant
        fields['category'] = self.categorize_expense(all_text)

        return fields

    def categorize_expense(self, text):
        """
        Auto-categorize expense based on merchant

        In production: Use ML classifier trained on historical data
        """
        text_lower = text.lower()

        categories = {
            'groceries': ['walmart', 'safeway', 'kroger', 'trader joe'],
            'dining': ['restaurant', 'cafe', 'pizza', 'burger'],
            'gas': ['shell', 'chevron', 'gas station', 'fuel'],
            'healthcare': ['pharmacy', 'cvs', 'walgreens', 'clinic'],
            'entertainment': ['cinema', 'movie', 'theater', 'netflix']
        }

        for category, keywords in categories.items():
            if any(keyword in text_lower for keyword in keywords):
                return category

        return 'other'


# ==========================================
# EDGE DEPLOYMENT: Mobile & Raspberry Pi
# ==========================================

class EdgeDeploymentGuide:
    """
    Guide for deploying YOLO on edge devices

    Edge Devices:
    - Smartphones (iOS/Android)
    - Raspberry Pi
    - NVIDIA Jetson
    - Intel NUC
    - Custom embedded systems
    """

    @staticmethod
    def export_for_mobile():
        """
        Export model for mobile deployment

        iOS: CoreML format
        Android: TensorFlow Lite
        """
        print("=" * 80)
        print("MOBILE DEPLOYMENT")
        print("=" * 80)
        print()

        model = YOLO('best.pt')

        # For iOS
        print("Exporting for iOS (CoreML)...")
        model.export(format='coreml')
        print(" iOS model: best.mlmodel")
        print()

        # For Android
        print("Exporting for Android (TFLite)...")
        model.export(format='tflite')
        print(" Android model: best.tflite")
        print()

        print("Integration:")
        print("  iOS: Use Vision framework or CoreML directly")
        print("  Android: Use TensorFlow Lite API")
        print()

    @staticmethod
    def raspberry_pi_setup():
        """
        Setup guide for Raspberry Pi deployment

        Requirements:
        - Raspberry Pi 4 (4GB+ RAM)
        - Camera module or USB webcam
        - Cooling (model runs hot)
        """
        print("=" * 80)
        print("RASPBERRY PI DEPLOYMENT")
        print("=" * 80)
        print()

        print("Step 1: Install Dependencies")
        print("  sudo apt-get update")
        print("  sudo apt-get install python3-opencv")
        print("  pip3 install ultralytics")
        print()

        print("Step 2: Optimize Model")
        print("  " Use YOLOv8n (nano) - smallest model")
        print("  " Reduce image size to 320�320")
        print("  " Skip frames (process every 3rd frame)")
        print("  " Expect ~10-15 FPS")
        print()

        print("Step 3: Run Detection")
        print("  python3 pi_detector.py")
        print()

    @staticmethod
    def jetson_deployment():
        """
        NVIDIA Jetson deployment (best for edge AI)

        Jetson devices:
        - Jetson Nano ($99): Entry level
        - Jetson Xavier NX ($399): Mid range
        - Jetson AGX Orin ($1,999): High performance
        """
        print("=" * 80)
        print("NVIDIA JETSON DEPLOYMENT")
        print("=" * 80)
        print()

        print("Advantages:")
        print("  " GPU acceleration (CUDA)")
        print("  " 30-60 FPS real-time detection")
        print("  " TensorRT optimization (2-3x faster)")
        print("  " Low power consumption")
        print()

        print("Setup:")
        print("  1. Flash JetPack (includes CUDA, cuDNN)")
        print("  2. Install PyTorch with CUDA support")
        print("  3. Export model to TensorRT:")
        print()
        print("     model = YOLO('best.pt')")
        print("     model.export(format='engine')  # TensorRT")
        print()
        print("  4. Run with TensorRT backend:")
        print("     detector = YOLO('best.engine')")
        print("     results = detector(frame)  # 2-3x faster!")
        print()


# ==========================================
# MONITORING & ANALYTICS
# ==========================================

class ProductionMonitoring:
    """
    Production monitoring and analytics

    Metrics to track:
    - Inference time (latency)
    - FPS (throughput)
    - Model accuracy (confidence scores)
    - Error rates
    - Resource usage (CPU/GPU/memory)
    """

    def __init__(self):
        self.metrics = {
            'inference_times': deque(maxlen=1000),
            'fps_history': deque(maxlen=100),
            'detections_per_frame': deque(maxlen=1000),
            'confidence_scores': deque(maxlen=1000)
        }

    def log_inference(self, inference_time, num_detections, confidences):
        """Log inference metrics"""
        self.metrics['inference_times'].append(inference_time)
        self.metrics['detections_per_frame'].append(num_detections)
        self.metrics['confidence_scores'].extend(confidences)

    def get_performance_report(self):
        """Generate performance report"""
        if len(self.metrics['inference_times']) == 0:
            return {}

        inference_times = list(self.metrics['inference_times'])

        return {
            'avg_inference_time_ms': np.mean(inference_times) * 1000,
            'p50_latency_ms': np.percentile(inference_times, 50) * 1000,
            'p95_latency_ms': np.percentile(inference_times, 95) * 1000,
            'p99_latency_ms': np.percentile(inference_times, 99) * 1000,
            'avg_fps': 1.0 / np.mean(inference_times) if np.mean(inference_times) > 0 else 0,
            'avg_detections_per_frame': np.mean(list(self.metrics['detections_per_frame'])),
            'avg_confidence': np.mean(list(self.metrics['confidence_scores']))
        }


# ==========================================
# PRODUCTION DEPLOYMENT CHECKLIST
# ==========================================

print("=" * 80)
print("PRODUCTION DEPLOYMENT CHECKLIST")
print("=" * 80)
print()
print(" Model Optimization:")
print("   " Quantize to FP16 or INT8")
print("   " Export to optimized format (ONNX/TensorRT)")
print("   " Benchmark on target hardware")
print()
print(" Performance:")
print("   " Implement frame skipping for video")
print("   " Use async processing")
print("   " Batch processing where possible")
print("   " Monitor latency and FPS")
print()
print(" Reliability:")
print("   " Handle camera disconnects gracefully")
print("   " Offline operation + sync when online")
print("   " Error logging and recovery")
print("   " Health checks and monitoring")
print()
print(" Scalability:")
print("   " Load balancing for multiple cameras")
print("   " Cloud processing for heavy workloads")
print("   " Edge processing for privacy/latency")
print("   " Data pipeline: detection � processing � storage")
print()
print(" Security & Privacy:")
print("   " Don't store sensitive video permanently")
print("   " Encrypt data in transit")
print("   " User consent for camera access")
print("   " GDPR/compliance considerations")
print()

print("=" * 80)
print("SESSIONS 39-40 COMPLETE!")
print("=" * 80)
print()
print("<� YOU NOW UNDERSTAND:")
print("   " Why YOLO revolutionized computer vision")
print("   " How to use YOLOv8 for real-time detection")
print("   " How to train custom models for YOUR needs")
print("   " How to deploy in production at scale")
print()
print("=� NEXT STEPS:")
print("   1. Collect images for YOUR use case")
print("   2. Train custom model (health, finance, etc.)")
print("   3. Deploy on edge device or cloud")
print("   4. Build real-world app that helps people")
print()
print("=� THE INSIGHT:")
print("   Computer vision is no longer magic.")
print("   It's a tool you can use to solve real problems.")
print("   The question is: What will YOU teach machines to see?")
print()
`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation Button */}
          <div className="mb-8">
            <Button
              onClick={() => window.location.href = '/machine-learning'}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Machine Learning Journey
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Eye className="w-16 h-16" />
            <div>
              <h1 className="text-5xl font-bold mb-2">Sessions 39-40: YOLO</h1>
              <p className="text-2xl opacity-90">Real-time Object Detection - Opening Machine Eyes</p>
            </div>
          </div>
          <p className="text-xl opacity-90 max-w-4xl">
            From "Can machines see in real-time?" to YOLO's revolutionary single-shot detection.
            Experience the journey from autonomous driving crisis to democratized computer vision for health and finance.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Story Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            The Story: From Crisis to Revolution
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {storyChapters.map((chapter, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  activeChapter === idx
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-2">{chapter.icon}</div>
                <div className="text-sm font-semibold">{chapter.title.split(':')[0]}</div>
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-6xl">{storyChapters[activeChapter].icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{storyChapters[activeChapter].title}</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                  {storyChapters[activeChapter].content}
                </p>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                  {storyChapters[activeChapter].details.split('. ').map((sentence, idx) => {
                    // Check if sentence contains a URL
                    const urlMatch = sentence.match(/\[([^\]]+)\]\(([^)]+)\)/);
                    if (urlMatch) {
                      const parts = sentence.split(/\[([^\]]+)\]\(([^)]+)\)/);
                      return (
                        <p key={idx}>
                          {parts[0]}
                          <a
                            href={urlMatch[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                          >
                            {urlMatch[1]}
                          </a>
                          {parts[3]}{sentence.endsWith('.') ? '' : '.'}
                        </p>
                      );
                    }
                    return sentence.trim() ? <p key={idx}>{sentence.trim()}.</p> : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-8 border border-amber-200 dark:border-amber-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-600" />
            The YOLO Revolution: Why It Changed Everything
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-blue-800 dark:text-blue-200">⚡ Speed: 2,000x Faster</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                R-CNN: 47 seconds per image<br/>
                YOLO: 0.022 seconds per image<br/>
                Result: Real-time autonomous driving becomes possible
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-green-800 dark:text-green-200">👁️ Architecture: One Look</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Previous: 2,000+ region proposals, sequential processing<br/>
                YOLO: Single neural network, one forward pass<br/>
                Result: Sees EVERYTHING simultaneously
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-purple-800 dark:text-purple-200">🎯 Accuracy: Global Context</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sees whole image at once � understands context<br/>
                Fewer background false positives<br/>
                Result: More reliable in real-world scenarios
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-indigo-800 dark:text-indigo-200">🌍 Democratization: Anyone Can Use It</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                YOLOv8: Train on laptop in hours<br/>
                Deploy on Raspberry Pi for $50<br/>
                Result: Computer vision for everyone
              </p>
            </div>
          </div>
        </div>

        {/* Real-World Applications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Target className="w-8 h-8 text-indigo-600" />
            Real-World Applications: Health & Finance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-8 border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">Health Applications</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">🏋️ </span>
                  <span><strong>Workout Form Analysis:</strong> Real-time posture detection, rep counting, form correction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">🏋️ </span>
                  <span><strong>Meal Portion Detection:</strong> Automatic calorie estimation, nutrition tracking, dietary compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">💊</span>
                  <span><strong>Medication Tracking:</strong> Pill identification, dosage verification, adherence monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">🏃</span>
                  <span><strong>Fall Detection:</strong> Elderly care monitoring, instant alerts, safety systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border-2 border-blue-300 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Finance Applications</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">🧾</span>
                  <span><strong>Receipt Scanning:</strong> Auto-capture, text extraction, expense categorization, instant logging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">📦</span>
                  <span><strong>Package Detection:</strong> Delivery tracking, inventory monitoring, asset management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">📄</span>
                  <span><strong>Document Verification:</strong> ID scanning, check deposit, form processing automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">🛒</span>
                  <span><strong>Product Detection:</strong> Price comparison, shopping assistance, loyalty programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Sections */}
        <div className="space-y-8">
          {/* Part 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('part1')}
              className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{part1Content.title}</h3>
                  <p className="text-blue-100">{part1Content.description}</p>
                </div>
              </div>
              {expandedSections.part1 ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>

            {expandedSections.part1 && (
              <div className="p-6">
                <div className="relative">
                  <Button
                    onClick={() => copyToClipboard(part1Content.code, 'part1')}
                    className="absolute top-4 right-4 z-10"
                    variant="secondary"
                    size="sm"
                  >
                    {copiedSection === 'part1' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <div className="max-h-[600px] overflow-y-auto">
                    <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0.5rem' }}>
                      {part1Content.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Part 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('part2')}
              className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <Camera className="w-8 h-8" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{part2Content.title}</h3>
                  <p className="text-green-100">{part2Content.description}</p>
                </div>
              </div>
              {expandedSections.part2 ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>

            {expandedSections.part2 && (
              <div className="p-6">
                <div className="relative">
                  <Button
                    onClick={() => copyToClipboard(part2Content.code, 'part2')}
                    className="absolute top-4 right-4 z-10"
                    variant="secondary"
                    size="sm"
                  >
                    {copiedSection === 'part2' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <div className="max-h-[600px] overflow-y-auto">
                    <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0.5rem' }}>
                      {part2Content.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Part 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('part3')}
              className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <Target className="w-8 h-8" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{part3Content.title}</h3>
                  <p className="text-purple-100">{part3Content.description}</p>
                </div>
              </div>
              {expandedSections.part3 ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>

            {expandedSections.part3 && (
              <div className="p-6">
                <div className="relative">
                  <Button
                    onClick={() => copyToClipboard(part3Content.code, 'part3')}
                    className="absolute top-4 right-4 z-10"
                    variant="secondary"
                    size="sm"
                  >
                    {copiedSection === 'part3' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <div className="max-h-[600px] overflow-y-auto">
                    <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0.5rem' }}>
                      {part3Content.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Part 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection('part4')}
              className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <Layers className="w-8 h-8" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{part4Content.title}</h3>
                  <p className="text-indigo-100">{part4Content.description}</p>
                </div>
              </div>
              {expandedSections.part4 ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>

            {expandedSections.part4 && (
              <div className="p-6">
                <div className="relative">
                  <Button
                    onClick={() => copyToClipboard(part4Content.code, 'part4')}
                    className="absolute top-4 right-4 z-10"
                    variant="secondary"
                    size="sm"
                  >
                    {copiedSection === 'part4' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <div className="max-h-[600px] overflow-y-auto">
                    <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0.5rem' }}>
                      {part4Content.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Reflection */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Eye className="w-10 h-10" />
            The Journey Complete: From Need to Vision
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              We began with a crisis: autonomous vehicles needed to see in real-time, but computer vision was too slow.
              YOLO's revolutionary insightlooking at the entire image oncetransformed impossibility into reality.
            </p>
            <p>
              What started as Tesla's engineering problem became everyone's opportunity. Today, you can train YOLO
              to detect anything: meal portions for health tracking, receipts for finance management, workout form
              for fitness optimization.
            </p>
            <p className="text-xl font-semibold border-l-4 border-white pl-4 italic">
              "Computer vision is no longer magic reserved for tech giants. It's a tool you can use to solve
              real problems in health, finance, and life. The only question is: What will YOU teach machines to see?"
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 rounded-full">✅ Real-time Detection: 45+ FPS</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">✅ Custom Training: 100-500 images</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">✅ Edge Deployment: $50 Raspberry Pi</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">✅ Production Ready: Monitoring & Scale</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => window.location.href = '/machine-learning'}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-6 text-lg"
          >
            ← Back to Machine Learning Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YOLOSessions3940;
