import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, User, Lock, Scan, Eye, Target, Lightbulb, Heart, DollarSign, Layers, Shield, Fingerprint, Brain } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const DlibSession29 = () => {
  const navigate = useNavigate();

  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);

  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});

  // Story chapters following the NEED-first philosophy
  const storyChapters = [
    {
      title: "🔐 The Security Need",
      content: "You've built computer vision tools to analyze meals and workouts. Now you want secure access to your personal health dashboard - no passwords to remember or type.",
      details: "Your phone unlocks with your face. Your bank verifies you through facial recognition. Video calls automatically frame your face. These aren't random features - they're responses to a fundamental need: Who is this person, and how do I track them securely?"
    },
    {
      title: "💡 The Pattern Recognition",
      content: "Face recognition isn't magic - it's mathematics. Find 68 specific landmarks on a face → Convert them to a 128-dimensional vector → Compare vectors using distance metrics.",
      details: "It's LINEAR ALGEBRA meeting COMPUTER VISION. Everything you learned in Data:Calculus (vectors, distances), Blueprints (algorithms), and Session 28 (image processing) converges here."
    },
    {
      title: "🔗 Building on Giants' Shoulders",
      content: "OpenCV taught us pixels, filters, and contours. Now Dlib gives us pre-trained models that took PhD researchers YEARS to develop and millions in compute resources.",
      details: "We don't need to train models from scratch. We leverage decades of research to solve TODAY's problems. This is the power of modern programming - standing on giants' shoulders."
    },
    {
      title: "🎯 Real-World Applications",
      content: "From securing your expense tracking app to verifying identity for financial transactions. From monitoring focus during work to gesture-controlled interfaces.",
      details: "Health: Focus monitoring, fatigue detection, emotion tracking. Finance: Biometric authentication, identity verification, gesture-controlled receipt scanning. Every application answers a REAL NEED."
    },
    {
      title: "🚀 Production Ready Today",
      content: "Unlike training custom models (expensive, months of work, huge datasets), Dlib provides production-ready models that work IMMEDIATELY.",
      details: "Face detection → 68-point landmarks → Face recognition → Real-time tracking → Gesture detection. You're not just learning a library. You're mastering identity verification and human-computer interaction."
    }
  ];

  // Part 1: Face Detection
  const part1Content = {
    title: "Part 1: Face Detection - Finding Faces in Images",
    description: "Before we can analyze faces, we need to find them. Dlib's HOG-based and CNN-based detectors are battle-tested in production",
    realWorld: "Facebook photo tagging, iPhone Face ID, Zoom auto-framing, security cameras all start with face detection",
    code: `import dlib
import cv2
import numpy as np
import matplotlib.pyplot as plt

# ====== Dlib's Face Detector ======
# HOG (Histogram of Oriented Gradients) - Fast, works on CPU
detector_hog = dlib.get_frontal_face_detector()

# CNN-based detector - More accurate, requires GPU for real-time
# detector_cnn = dlib.cnn_face_detection_model_v1('mmod_human_face_detector.dat')

def detect_faces_in_image(image_path):
    """
    Detect all faces in an image
    Use case: Security system, photo organization, attendance tracking
    """
    # Load image
    image = cv2.imread(image_path)
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Detect faces (returns list of rectangles)
    faces = detector_hog(rgb_image, 1)  # 1 = upsample image 1 time (finds smaller faces)

    print(f"\\n👤 Found {len(faces)} face(s) in image")

    # Draw rectangles around detected faces
    for i, face_rect in enumerate(faces):
        x, y, w, h = face_rect.left(), face_rect.top(), face_rect.width(), face_rect.height()

        cv2.rectangle(rgb_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(rgb_image, f"Person {i+1}", (x, y - 10),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        print(f"   Face {i+1}: Position ({x}, {y}), Size {w}x{h}px")

    return rgb_image, faces

# ====== Real-World Use Case: Attendance System ======
class AttendanceSystem:
    """
    Automatic attendance tracking using face detection
    Use: Schools, offices, gyms, co-working spaces
    """

    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.attendance_log = []

    def check_attendance(self, image_path, timestamp):
        """Check who's present in the image"""
        image = cv2.imread(image_path)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Detect faces
        faces = self.detector(rgb, 1)

        attendance_record = {
            'timestamp': timestamp,
            'people_count': len(faces),
            'face_locations': [(f.left(), f.top(), f.width(), f.height()) for f in faces]
        }

        self.attendance_log.append(attendance_record)

        print(f"\\n📸 Attendance Check at {timestamp}")
        print(f"   Detected: {len(faces)} person(s)")

        return attendance_record

    def generate_report(self):
        """Generate attendance summary"""
        total_checks = len(self.attendance_log)
        avg_attendance = np.mean([log['people_count'] for log in self.attendance_log])

        return {
            'total_checks': total_checks,
            'average_attendance': avg_attendance,
            'peak_attendance': max([log['people_count'] for log in self.attendance_log])
        }

# ====== Health App: Focus Monitoring ======
def monitor_focus_session(video_path):
    """
    Monitor if person is present and focused during work session
    Use: Productivity tracking, study sessions, remote work monitoring
    """
    detector = dlib.get_frontal_face_detector()
    cap = cv2.VideoCapture(video_path)

    focus_metrics = {
        'total_frames': 0,
        'face_detected_frames': 0,
        'looking_away_frames': 0
    }

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        focus_metrics['total_frames'] += 1

        # Detect face every 10 frames (optimize performance)
        if focus_metrics['total_frames'] % 10 == 0:
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            faces = detector(rgb, 0)  # 0 = no upsampling (faster)

            if len(faces) > 0:
                focus_metrics['face_detected_frames'] += 1
            else:
                focus_metrics['looking_away_frames'] += 1

    cap.release()

    # Calculate focus score
    focus_percentage = (focus_metrics['face_detected_frames'] /
                       (focus_metrics['face_detected_frames'] + focus_metrics['looking_away_frames'])) * 100

    print(f"\\n🎯 Focus Session Analysis:")
    print(f"   Focus Score: {focus_percentage:.1f}%")
    print(f"   Present: {focus_metrics['face_detected_frames']} checks")
    print(f"   Away: {focus_metrics['looking_away_frames']} checks")

    return focus_metrics

print("\\n💡 Face Detection is the FOUNDATION of all facial analysis")
print("   No face detection → No landmarks → No recognition → No tracking")
print("\\n🎯 Master the foundation, master everything that follows!")`
  };

  // Part 2: 68-Point Facial Landmarks
  const part2Content = {
    title: "Part 2: 68-Point Facial Landmarks - Understanding Facial Geometry",
    description: "After detecting a face, we need to understand its geometry. 68 landmarks map eyes, nose, mouth, jawline - the foundation of recognition",
    realWorld: "Snapchat filters, face swaps, makeup apps, emotion detection, gaze tracking all rely on facial landmarks",
    code: `import dlib
import cv2
import numpy as np
from collections import OrderedDict

# ====== Load the 68-point landmark predictor ======
# Download from: http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
detector = dlib.get_frontal_face_detector()

# ====== Understanding the 68 Landmarks ======
FACIAL_LANDMARKS_68 = OrderedDict([
    ("jaw", (0, 17)),           # Jawline
    ("right_eyebrow", (17, 22)), # Right eyebrow
    ("left_eyebrow", (22, 27)),  # Left eyebrow
    ("nose_bridge", (27, 31)),   # Nose bridge
    ("nose_tip", (31, 36)),      # Nose tip
    ("right_eye", (36, 42)),     # Right eye
    ("left_eye", (42, 48)),      # Left eye
    ("mouth_outer", (48, 60)),   # Outer mouth
    ("mouth_inner", (60, 68))    # Inner mouth
])

def extract_facial_landmarks(image_path):
    """
    Extract 68 facial landmarks from image
    Each landmark is an (x, y) coordinate
    """
    image = cv2.imread(image_path)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Detect faces
    faces = detector(rgb, 1)

    if len(faces) == 0:
        print("❌ No faces detected")
        return None

    # Get landmarks for first face
    face_rect = faces[0]
    landmarks = predictor(rgb, face_rect)

    # Convert to NumPy array (68 points, each with x,y)
    coords = np.zeros((68, 2), dtype=int)
    for i in range(68):
        coords[i] = (landmarks.part(i).x, landmarks.part(i).y)

    print(f"\\n🎯 Extracted 68 facial landmarks")
    print(f"   Shape: {coords.shape}")
    print(f"   Left eye center: {coords[36:42].mean(axis=0).astype(int)}")
    print(f"   Right eye center: {coords[42:48].mean(axis=0).astype(int)}")
    print(f"   Nose tip: {coords[33]}")
    print(f"   Mouth center: {coords[48:68].mean(axis=0).astype(int)}")

    return coords, rgb, face_rect

def draw_landmarks(image, landmarks, color=(0, 255, 0)):
    """Visualize the 68 landmarks on image"""
    for (x, y) in landmarks:
        cv2.circle(image, (x, y), 2, color, -1)
    return image

# ====== Health App: Fatigue Detection ======
class FatigueDetector:
    """
    Detect fatigue using Eye Aspect Ratio (EAR)
    Use: Driver safety, workout safety, productivity monitoring
    """

    def __init__(self):
        self.detector = detector
        self.predictor = predictor
        self.EAR_THRESHOLD = 0.25  # Below this = eyes closing
        self.CONSECUTIVE_FRAMES = 20  # Frames before alert
        self.blink_counter = 0

    def eye_aspect_ratio(self, eye_points):
        """
        Calculate Eye Aspect Ratio
        EAR = (||p2-p6|| + ||p3-p5||) / (2 * ||p1-p4||)
        Where p1-p6 are eye landmark points
        """
        # Vertical eye distances
        A = np.linalg.norm(eye_points[1] - eye_points[5])
        B = np.linalg.norm(eye_points[2] - eye_points[4])

        # Horizontal eye distance
        C = np.linalg.norm(eye_points[0] - eye_points[3])

        ear = (A + B) / (2.0 * C)
        return ear

    def detect_fatigue(self, frame):
        """Analyze frame for signs of fatigue"""
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = self.detector(rgb, 0)

        if len(faces) == 0:
            return frame, "No face detected"

        landmarks = self.predictor(rgb, faces[0])

        # Extract eye landmarks
        left_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(42, 48)])
        right_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(36, 42)])

        # Calculate EAR for both eyes
        left_ear = self.eye_aspect_ratio(left_eye)
        right_ear = self.eye_aspect_ratio(right_eye)
        avg_ear = (left_ear + right_ear) / 2.0

        # Check for fatigue
        status = "Alert"
        color = (0, 255, 0)

        if avg_ear < self.EAR_THRESHOLD:
            self.blink_counter += 1
            if self.blink_counter >= self.CONSECUTIVE_FRAMES:
                status = "⚠️ FATIGUE DETECTED"
                color = (0, 0, 255)
        else:
            self.blink_counter = 0

        # Draw visualization
        cv2.putText(frame, f"EAR: {avg_ear:.2f}", (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        cv2.putText(frame, status, (10, 60),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

        return frame, status

# ====== Finance App: Document Signing Verification ======
def verify_face_orientation(landmarks):
    """
    Verify person is looking at camera (for secure document signing)
    Use: Banking apps, legal document signing, identity verification
    """
    # Calculate face orientation using nose and eye positions
    nose_tip = landmarks[33]
    left_eye = landmarks[36:42].mean(axis=0)
    right_eye = landmarks[42:48].mean(axis=0)

    # Calculate angles
    eye_center = (left_eye + right_eye) / 2
    nose_to_eye_dist = np.linalg.norm(nose_tip - eye_center)

    # Check horizontal symmetry (is face centered?)
    left_dist = np.linalg.norm(nose_tip - left_eye)
    right_dist = np.linalg.norm(nose_tip - right_eye)
    symmetry_ratio = min(left_dist, right_dist) / max(left_dist, right_dist)

    is_frontal = symmetry_ratio > 0.85  # Face is looking at camera

    verification_result = {
        'is_frontal_view': is_frontal,
        'symmetry_score': symmetry_ratio,
        'verification_status': '✅ Verified' if is_frontal else '❌ Look at camera',
        'ready_for_signing': is_frontal
    }

    print(f"\\n📄 Document Signing Verification:")
    print(f"   Symmetry Score: {symmetry_ratio:.2f}")
    print(f"   Status: {verification_result['verification_status']}")

    return verification_result

# ====== Emotion Detection (Basic) ======
def detect_smile(landmarks):
    """
    Simple smile detection using mouth aspect ratio
    Use: Mood tracking, customer satisfaction, photo capture timing
    """
    mouth_outer = landmarks[48:60]

    # Mouth width (horizontal distance)
    mouth_width = np.linalg.norm(mouth_outer[0] - mouth_outer[6])

    # Mouth height (vertical distance)
    mouth_height = np.linalg.norm(mouth_outer[3] - mouth_outer[9])

    # Smile ratio
    smile_ratio = mouth_width / mouth_height

    is_smiling = smile_ratio > 3.0  # Threshold for smile

    return {
        'is_smiling': is_smiling,
        'smile_intensity': min(100, (smile_ratio - 2.0) * 50),  # 0-100 scale
        'mood': '😊 Happy' if is_smiling else '😐 Neutral'
    }

print("\\n💡 68 Landmarks = The Language of Faces")
print("   Eyes → Fatigue detection, gaze tracking")
print("   Mouth → Emotion, speech detection")
print("   Jawline → Face shape, gender classification")
print("   Nose → Face orientation, 3D pose estimation")
print("\\n🎯 Master landmarks, unlock infinite applications!")`
  };

  // Part 3: Face Recognition
  const part3Content = {
    title: "Part 3: Face Recognition - Converting Faces to Mathematical Vectors",
    description: "The magic: Convert any face to a 128-dimensional vector. Same person = similar vectors. Different people = different vectors.",
    realWorld: "iPhone Face ID, Facebook photo tagging, airport security, banking authentication all use face encoding and comparison",
    code: `import dlib
import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

# ====== Load Required Models ======
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

# Face recognition model (ResNet-based, trained on millions of faces)
face_rec_model = dlib.face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')

def get_face_encoding(image_path):
    """
    Convert a face to a 128-dimensional vector
    This is the CORE of face recognition
    """
    image = cv2.imread(image_path)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Detect face
    faces = detector(rgb, 1)
    if len(faces) == 0:
        print("❌ No face detected")
        return None

    # Get landmarks
    landmarks = predictor(rgb, faces[0])

    # Compute 128D face encoding (descriptor)
    face_encoding = np.array(face_rec_model.compute_face_descriptor(rgb, landmarks))

    print(f"\\n🔢 Face Encoding Generated:")
    print(f"   Shape: {face_encoding.shape}")  # (128,)
    print(f"   Type: {face_encoding.dtype}")   # float64
    print(f"   First 5 values: {face_encoding[:5]}")
    print(f"\\n💡 This 128D vector UNIQUELY represents this person's face!")

    return face_encoding

def compare_faces(encoding1, encoding2, threshold=0.6):
    """
    Compare two face encodings
    Distance < threshold → Same person
    Distance > threshold → Different person
    """
    # Euclidean distance (most common for face recognition)
    euclidean_dist = np.linalg.norm(encoding1 - encoding2)

    # Cosine similarity (alternative metric)
    cosine_sim = cosine_similarity([encoding1], [encoding2])[0][0]

    is_same_person = euclidean_dist < threshold

    result = {
        'euclidean_distance': euclidean_dist,
        'cosine_similarity': cosine_sim,
        'is_same_person': is_same_person,
        'confidence': 1 - (euclidean_dist / 1.0)  # Convert to 0-1 scale
    }

    print(f"\\n🔍 Face Comparison:")
    print(f"   Euclidean Distance: {euclidean_dist:.4f}")
    print(f"   Cosine Similarity: {cosine_sim:.4f}")
    print(f"   Result: {'✅ SAME PERSON' if is_same_person else '❌ DIFFERENT PERSON'}")
    print(f"   Confidence: {result['confidence']:.1%}")

    return result

# ====== Production Face Recognition System ======
class FaceRecognitionSystem:
    """
    Production-grade face recognition for authentication
    Use: Banking apps, access control, attendance systems
    """

    def __init__(self, distance_threshold=0.6):
        self.detector = detector
        self.predictor = predictor
        self.face_rec_model = face_rec_model
        self.threshold = distance_threshold

        # Database of known faces (in production: PostgreSQL, MongoDB, etc.)
        self.known_faces = {}  # {name: encoding}
        self.face_metadata = {}  # {name: {last_seen, access_level, etc.}}

    def register_person(self, name, image_path, metadata=None):
        """Register a new person in the system"""
        image = cv2.imread(image_path)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        faces = self.detector(rgb, 1)

        if len(faces) != 1:
            print(f"❌ Error: Expected 1 face, found {len(faces)}")
            return False

        # Get face encoding
        landmarks = self.predictor(rgb, faces[0])
        encoding = np.array(self.face_rec_model.compute_face_descriptor(rgb, landmarks))

        # Store in database
        self.known_faces[name] = encoding
        self.face_metadata[name] = metadata or {'registered_date': 'today'}

        print(f"✅ {name} registered successfully")
        print(f"   Encoding shape: {encoding.shape}")
        print(f"   Total registered: {len(self.known_faces)} person(s)")

        return True

    def authenticate(self, image_path):
        """
        Authenticate a person against the database
        Returns: name, confidence, metadata
        """
        image = cv2.imread(image_path)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        faces = self.detector(rgb, 1)

        if len(faces) == 0:
            return {'status': 'no_face', 'authenticated': False}

        # Get encoding for detected face
        landmarks = self.predictor(rgb, faces[0])
        unknown_encoding = np.array(self.face_rec_model.compute_face_descriptor(rgb, landmarks))

        # Compare with all known faces
        best_match = None
        best_distance = float('inf')

        for name, known_encoding in self.known_faces.items():
            distance = np.linalg.norm(unknown_encoding - known_encoding)

            if distance < best_distance:
                best_distance = distance
                best_match = name

        # Check if match is good enough
        if best_distance < self.threshold:
            return {
                'status': 'authenticated',
                'name': best_match,
                'confidence': 1 - (best_distance / 1.0),
                'distance': best_distance,
                'metadata': self.face_metadata[best_match],
                'authenticated': True
            }
        else:
            return {
                'status': 'unknown',
                'distance': best_distance,
                'authenticated': False
            }

    def batch_identify(self, image_path):
        """
        Identify all faces in an image
        Use: Group photos, event attendance, security monitoring
        """
        image = cv2.imread(image_path)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        faces = self.detector(rgb, 1)

        results = []

        for i, face_rect in enumerate(faces):
            landmarks = self.predictor(rgb, face_rect)
            encoding = np.array(self.face_rec_model.compute_face_descriptor(rgb, landmarks))

            # Find best match
            best_match = "Unknown"
            best_distance = float('inf')

            for name, known_encoding in self.known_faces.items():
                distance = np.linalg.norm(encoding - known_encoding)
                if distance < best_distance and distance < self.threshold:
                    best_distance = distance
                    best_match = name

            results.append({
                'face_number': i + 1,
                'name': best_match,
                'bbox': (face_rect.left(), face_rect.top(), face_rect.width(), face_rect.height()),
                'confidence': 1 - (best_distance / 1.0) if best_match != "Unknown" else 0
            })

        return results

# ====== Finance Application: Secure Payment Authentication ======
class SecurePaymentAuth:
    """
    Facial authentication for financial transactions
    Use: Banking apps, payment platforms, crypto wallets
    """

    def __init__(self):
        self.face_system = FaceRecognitionSystem(distance_threshold=0.5)  # Stricter for finance

    def authorize_transaction(self, user_id, live_image_path, transaction_amount):
        """
        Authorize financial transaction using facial recognition
        Requires: Live image verification, registered user match
        """
        # Authenticate user
        auth_result = self.face_system.authenticate(live_image_path)

        if not auth_result['authenticated']:
            return {
                'authorized': False,
                'reason': 'Face authentication failed',
                'transaction_status': 'DENIED'
            }

        # Additional checks for high-value transactions
        if transaction_amount > 1000 and auth_result['confidence'] < 0.85:
            return {
                'authorized': False,
                'reason': 'Confidence too low for high-value transaction',
                'transaction_status': 'REQUIRES_2FA',
                'confidence': auth_result['confidence']
            }

        return {
            'authorized': True,
            'user': auth_result['name'],
            'confidence': auth_result['confidence'],
            'transaction_status': 'APPROVED',
            'transaction_id': f"TXN_{user_id}_{int(transaction_amount)}"
        }

# ====== Example Usage ======
def demo_face_recognition():
    """Complete face recognition demo"""

    # Initialize system
    system = FaceRecognitionSystem()

    # Register users (in production: bulk import from HR/user database)
    system.register_person("Alice", "users/alice_001.jpg",
                          metadata={'access_level': 'admin', 'employee_id': 'E001'})
    system.register_person("Bob", "users/bob_001.jpg",
                          metadata={'access_level': 'user', 'employee_id': 'E002'})

    # Authenticate new image
    result = system.authenticate("verify/unknown_person.jpg")

    if result['authenticated']:
        print(f"\\n✅ AUTHENTICATION SUCCESSFUL")
        print(f"   Welcome back, {result['name']}!")
        print(f"   Confidence: {result['confidence']:.1%}")
    else:
        print(f"\\n❌ AUTHENTICATION FAILED")
        print(f"   Status: {result['status']}")

print("\\n💡 Face Recognition = Linear Algebra in Action")
print("   128D vectors → Distance metrics → Identity verification")
print("   Same concepts as Data:Calculus, now applied to SECURITY!")
print("\\n🔐 You're mastering the mathematics of IDENTITY!")`
  };

  // Part 4: Real-time Face Tracking
  const part4Content = {
    title: "Part 4: Real-Time Face Tracking - Following Faces Across Video Frames",
    description: "Video is just a sequence of images. Track faces across frames for video conferencing, surveillance, and interactive applications",
    realWorld: "Zoom auto-framing, Instagram filters, TikTok effects, security cameras tracking suspects",
    code: `import dlib
import cv2
import numpy as np
from collections import deque

# ====== Dlib's Correlation Tracker ======
# Efficient tracking algorithm that follows objects between frames
# Much faster than detecting every frame!

class FaceTracker:
    """
    Real-time face tracking system
    Use: Video conferencing, surveillance, interactive installations
    """

    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.trackers = []
        self.face_ids = []
        self.next_face_id = 0

        # Performance optimization
        self.detect_every_n_frames = 10  # Detect new faces every N frames
        self.frame_count = 0

    def start_tracking_face(self, frame, face_rect):
        """Initialize tracker for a detected face"""
        tracker = dlib.correlation_tracker()
        tracker.start_track(frame, face_rect)

        self.trackers.append(tracker)
        self.face_ids.append(self.next_face_id)
        self.next_face_id += 1

        return self.next_face_id - 1

    def track_faces(self, video_path):
        """Track all faces in a video"""
        cap = cv2.VideoCapture(video_path)

        tracking_data = {
            'face_positions': {},  # {face_id: [(x, y, w, h, frame_num), ...]}
            'face_durations': {}   # {face_id: num_frames}
        }

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            self.frame_count += 1

            # Update existing trackers
            active_trackers = []
            active_ids = []

            for tracker, face_id in zip(self.trackers, self.face_ids):
                tracker.update(rgb)
                pos = tracker.get_position()

                # Convert to integer coordinates
                x = int(pos.left())
                y = int(pos.top())
                w = int(pos.width())
                h = int(pos.height())

                # Check if tracking is still valid (face not left frame)
                if 0 <= x < frame.shape[1] and 0 <= y < frame.shape[0]:
                    active_trackers.append(tracker)
                    active_ids.append(face_id)

                    # Record position
                    if face_id not in tracking_data['face_positions']:
                        tracking_data['face_positions'][face_id] = []
                        tracking_data['face_durations'][face_id] = 0

                    tracking_data['face_positions'][face_id].append((x, y, w, h, self.frame_count))
                    tracking_data['face_durations'][face_id] += 1

                    # Draw tracking box
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    cv2.putText(frame, f"ID: {face_id}", (x, y - 10),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

            self.trackers = active_trackers
            self.face_ids = active_ids

            # Detect new faces periodically
            if self.frame_count % self.detect_every_n_frames == 0:
                faces = self.detector(rgb, 0)  # No upsampling for speed

                for face_rect in faces:
                    # Check if this is a new face (not already tracked)
                    is_new = True
                    for tracker in self.trackers:
                        tracked_pos = tracker.get_position()

                        # Calculate overlap
                        overlap = self.calculate_overlap(face_rect, tracked_pos)
                        if overlap > 0.5:  # Already tracking this face
                            is_new = False
                            break

                    if is_new:
                        face_id = self.start_tracking_face(rgb, face_rect)
                        print(f"🆕 New face detected: ID {face_id}")

            # Display frame
            cv2.imshow('Face Tracking', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        return tracking_data

    def calculate_overlap(self, rect1, rect2):
        """Calculate IoU (Intersection over Union) between two rectangles"""
        x1_1, y1_1 = rect1.left(), rect1.top()
        x2_1, y2_1 = rect1.right(), rect1.bottom()

        x1_2, y1_2 = int(rect2.left()), int(rect2.top())
        x2_2, y2_2 = int(rect2.right()), int(rect2.bottom())

        # Calculate intersection
        x1_i = max(x1_1, x1_2)
        y1_i = max(y1_1, y1_2)
        x2_i = min(x2_1, x2_2)
        y2_i = min(y2_1, y2_2)

        if x2_i < x1_i or y2_i < y1_i:
            return 0.0

        intersection = (x2_i - x1_i) * (y2_i - y1_i)
        area1 = (x2_1 - x1_1) * (y2_1 - y1_1)
        area2 = (x2_2 - x1_2) * (y2_2 - y1_2)
        union = area1 + area2 - intersection

        return intersection / union if union > 0 else 0

# ====== Health Application: Posture Monitoring ======
class PostureMonitor:
    """
    Monitor head position to detect poor posture
    Use: Ergonomics, productivity, health tracking
    """

    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

        # Calibration (baseline good posture)
        self.baseline_nose_y = None
        self.posture_history = deque(maxlen=100)

    def calibrate(self, frame):
        """Calibrate baseline posture (user sits properly)"""
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = self.detector(rgb, 1)

        if len(faces) > 0:
            landmarks = self.predictor(rgb, faces[0])
            nose_tip = (landmarks.part(33).x, landmarks.part(33).y)
            self.baseline_nose_y = nose_tip[1]
            print(f"✅ Posture calibrated at Y: {self.baseline_nose_y}")
            return True
        return False

    def monitor_posture(self, video_source=0):
        """Real-time posture monitoring"""
        cap = cv2.VideoCapture(video_source)

        print("\\n🪑 Posture Monitor Active")
        print("   Press 'c' to calibrate good posture")
        print("   Press 'q' to quit")

        poor_posture_alert_frames = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            faces = self.detector(rgb, 0)

            if len(faces) > 0 and self.baseline_nose_y is not None:
                landmarks = self.predictor(rgb, faces[0])
                nose_tip = (landmarks.part(33).x, landmarks.part(33).y)

                # Calculate deviation from baseline
                y_deviation = nose_tip[1] - self.baseline_nose_y

                # Determine posture quality
                posture_status = "Good"
                color = (0, 255, 0)

                if y_deviation > 50:  # Head too low (slouching)
                    posture_status = "⚠️ SLOUCHING"
                    color = (0, 165, 255)  # Orange
                    poor_posture_alert_frames += 1
                elif y_deviation < -30:  # Head too high (straining)
                    posture_status = "⚠️ HEAD HIGH"
                    color = (0, 255, 255)  # Yellow
                else:
                    poor_posture_alert_frames = 0

                # Alert after sustained poor posture
                if poor_posture_alert_frames > 150:  # ~5 seconds at 30fps
                    cv2.putText(frame, "TAKE A BREAK!", (50, 100),
                               cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)

                # Draw visualization
                cv2.circle(frame, nose_tip, 5, color, -1)
                cv2.putText(frame, f"Posture: {posture_status}", (10, 30),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
                cv2.putText(frame, f"Deviation: {y_deviation:.0f}px", (10, 60),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

            cv2.imshow('Posture Monitor', frame)

            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('c'):
                self.calibrate(frame)

        cap.release()
        cv2.destroyAllWindows()

# ====== Finance Application: Focus Time Tracking ======
class FocusTimeTracker:
    """
    Track time spent focused on screen for productivity billing
    Use: Freelance time tracking, productivity consulting, work-from-home monitoring
    """

    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.focused_time = 0
        self.away_time = 0
        self.last_detection_time = None

    def track_focus_session(self, duration_minutes=25):  # Pomodoro timer
        """Track a focus session (Pomodoro technique)"""
        cap = cv2.VideoCapture(0)

        import time
        start_time = time.time()
        end_time = start_time + (duration_minutes * 60)

        print(f"\\n⏱️ Focus Session Started: {duration_minutes} minutes")

        while time.time() < end_time:
            ret, frame = cap.read()
            if not ret:
                break

            current_time = time.time()
            elapsed = current_time - start_time
            remaining = end_time - current_time

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            faces = self.detector(rgb, 0)

            # Check if person is present
            if len(faces) > 0:
                self.focused_time += 1
                status = "✅ FOCUSED"
                color = (0, 255, 0)
            else:
                self.away_time += 1
                status = "⚠️ AWAY"
                color = (0, 0, 255)

            # Calculate focus percentage
            total_frames = self.focused_time + self.away_time
            focus_percentage = (self.focused_time / total_frames * 100) if total_frames > 0 else 0

            # Display info
            cv2.putText(frame, status, (10, 30),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
            cv2.putText(frame, f"Focus: {focus_percentage:.1f}%", (10, 60),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"Time: {int(remaining)}s", (10, 90),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

            cv2.imshow('Focus Time Tracker', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        # Generate report
        total_time = self.focused_time + self.away_time
        focus_rate = (self.focused_time / total_time * 100) if total_time > 0 else 0

        report = {
            'duration_minutes': duration_minutes,
            'focus_percentage': focus_rate,
            'billable_time': (focus_rate / 100) * duration_minutes,
            'quality_score': 'Excellent' if focus_rate > 85 else 'Good' if focus_rate > 70 else 'Needs Improvement'
        }

        print(f"\\n📊 Focus Session Report:")
        print(f"   Focus Percentage: {focus_rate:.1f}%")
        print(f"   Billable Time: {report['billable_time']:.1f} minutes")
        print(f"   Quality: {report['quality_score']}")

        return report

print("\\n💡 Tracking = Detection + Memory")
print("   Detection finds faces → Tracking follows them")
print("   Much faster than detecting every frame!")
print("\\n🎯 Real-time applications demand EFFICIENCY!")`
  };

  // Part 5: Gesture & Expression Detection
  const part5Content = {
    title: "Part 5: Gesture & Expression Detection - Interactive Computer Vision",
    description: "Beyond just detecting faces - understanding expressions, head poses, and hand gestures for interactive applications",
    realWorld: "TikTok filters, Snapchat lenses, hands-free controls, emotion AI, accessibility features",
    code: `import dlib
import cv2
import numpy as np
from scipy.spatial import distance as dist

# ====== Advanced Landmark Analysis ======

class ExpressionDetector:
    """
    Detect facial expressions using landmark geometry
    Use: Emotion AI, customer satisfaction, mental health monitoring
    """

    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

    def mouth_aspect_ratio(self, mouth_points):
        """Calculate Mouth Aspect Ratio (MAR) for smile/expression detection"""
        # Vertical distances
        A = dist.euclidean(mouth_points[2], mouth_points[10])  # 51 to 59
        B = dist.euclidean(mouth_points[4], mouth_points[8])   # 53 to 57

        # Horizontal distance
        C = dist.euclidean(mouth_points[0], mouth_points[6])   # 49 to 55

        mar = (A + B) / (2.0 * C)
        return mar

    def eyebrow_height(self, eyebrow_points, eye_points):
        """Measure eyebrow elevation (surprise, focus)"""
        eyebrow_center = np.mean(eyebrow_points, axis=0)
        eye_center = np.mean(eye_points, axis=0)

        height = eyebrow_center[1] - eye_center[1]
        return height

    def detect_expression(self, frame):
        """Detect facial expression in real-time"""
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = self.detector(rgb, 0)

        if len(faces) == 0:
            return frame, "No face detected"

        landmarks = self.predictor(rgb, faces[0])

        # Extract landmark groups
        mouth = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(48, 68)])
        left_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(36, 42)])
        right_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(42, 48)])
        left_eyebrow = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(17, 22)])
        right_eyebrow = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(22, 27)])

        # Calculate metrics
        mar = self.mouth_aspect_ratio(mouth)
        left_brow_height = abs(self.eyebrow_height(left_eyebrow, left_eye))
        right_brow_height = abs(self.eyebrow_height(right_eyebrow, right_eye))
        avg_brow_height = (left_brow_height + right_brow_height) / 2

        # Classify expression
        expression = "Neutral"
        emoji = "😐"

        if mar > 0.4:
            expression = "Happy/Smiling"
            emoji = "😊"
        elif mar < 0.2 and avg_brow_height < 15:
            expression = "Sad/Frowning"
            emoji = "😔"
        elif avg_brow_height > 25:
            expression = "Surprised"
            emoji = "😮"

        # Draw visualization
        cv2.putText(frame, f"{emoji} {expression}", (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        cv2.putText(frame, f"MAR: {mar:.2f}", (10, 60),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        return frame, expression

# ====== Head Pose Estimation ======
class HeadPoseEstimator:
    """
    Estimate head pose (pitch, yaw, roll) for gaze tracking
    Use: Driver attention monitoring, accessibility, AR/VR
    """

    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

        # 3D model points of a generic face
        self.model_points = np.array([
            (0.0, 0.0, 0.0),             # Nose tip
            (0.0, -330.0, -65.0),        # Chin
            (-225.0, 170.0, -135.0),     # Left eye left corner
            (225.0, 170.0, -135.0),      # Right eye right corner
            (-150.0, -150.0, -125.0),    # Left mouth corner
            (150.0, -150.0, -125.0)      # Right mouth corner
        ])

    def get_head_pose(self, frame):
        """Calculate head pose angles"""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.detector(gray, 0)

        if len(faces) == 0:
            return frame, None

        landmarks = self.predictor(gray, faces[0])

        # 2D image points from landmarks
        image_points = np.array([
            (landmarks.part(30).x, landmarks.part(30).y),     # Nose tip
            (landmarks.part(8).x, landmarks.part(8).y),       # Chin
            (landmarks.part(36).x, landmarks.part(36).y),     # Left eye left corner
            (landmarks.part(45).x, landmarks.part(45).y),     # Right eye right corner
            (landmarks.part(48).x, landmarks.part(48).y),     # Left mouth corner
            (landmarks.part(54).x, landmarks.part(54).y)      # Right mouth corner
        ], dtype="double")

        # Camera internals
        size = frame.shape
        focal_length = size[1]
        center = (size[1] / 2, size[0] / 2)
        camera_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1]
        ], dtype="double")

        dist_coeffs = np.zeros((4, 1))  # Assuming no lens distortion

        # Solve PnP
        success, rotation_vector, translation_vector = cv2.solvePnP(
            self.model_points, image_points, camera_matrix, dist_coeffs,
            flags=cv2.SOLVEPNP_ITERATIVE
        )

        # Convert rotation vector to angles
        rotation_mat, _ = cv2.Rodrigues(rotation_vector)
        pose_mat = cv2.hconcat((rotation_mat, translation_vector))
        _, _, _, _, _, _, euler_angles = cv2.decomposeProjectionMatrix(pose_mat)

        pitch, yaw, roll = euler_angles.flatten()[:3]

        # Interpret head pose
        direction = "Center"
        if yaw < -10:
            direction = "Looking Right"
        elif yaw > 10:
            direction = "Looking Left"

        if pitch < -10:
            direction += " / Looking Down"
        elif pitch > 10:
            direction += " / Looking Up"

        # Draw visualization
        cv2.putText(frame, f"Head: {direction}", (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(frame, f"Yaw: {yaw:.1f} Pitch: {pitch:.1f}", (10, 60),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        return frame, {'pitch': pitch, 'yaw': yaw, 'roll': roll, 'direction': direction}

# ====== Gesture-Based Control ======
class GestureController:
    """
    Hands-free gesture control using head movements
    Use: Accessibility, cooking apps, workout apps, presentation control
    """

    def __init__(self):
        self.pose_estimator = HeadPoseEstimator()
        self.gesture_history = []

    def detect_gesture(self, frame):
        """Detect head gesture commands"""
        frame, pose_data = self.pose_estimator.get_head_pose(frame)

        if pose_data is None:
            return frame, None

        yaw = pose_data['yaw']
        pitch = pose_data['pitch']

        gesture = None

        # Define gesture thresholds
        if yaw < -20:
            gesture = "SWIPE_LEFT"
        elif yaw > 20:
            gesture = "SWIPE_RIGHT"
        elif pitch < -15:
            gesture = "SCROLL_DOWN"
        elif pitch > 15:
            gesture = "SCROLL_UP"

        if gesture:
            self.gesture_history.append(gesture)

            # Display gesture
            cv2.putText(frame, f"Gesture: {gesture}", (10, 90),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)

        return frame, gesture

# ====== Health Application: Mental Health Monitoring ======
class MoodTracker:
    """
    Track mood over time using expression detection
    Use: Mental health apps, wellness tracking, therapy support
    """

    def __init__(self):
        self.expression_detector = ExpressionDetector()
        self.mood_log = []

    def track_mood_session(self, duration_seconds=60):
        """Track mood during a session"""
        import time

        cap = cv2.VideoCapture(0)
        start_time = time.time()

        expression_counts = {
            'Happy/Smiling': 0,
            'Neutral': 0,
            'Sad/Frowning': 0,
            'Surprised': 0
        }

        print(f"\\n😊 Mood Tracking Session: {duration_seconds}s")

        while time.time() - start_time < duration_seconds:
            ret, frame = cap.read()
            if not ret:
                break

            frame, expression = self.expression_detector.detect_expression(frame)

            if expression in expression_counts:
                expression_counts[expression] += 1

            cv2.imshow('Mood Tracker', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        # Calculate mood distribution
        total = sum(expression_counts.values())
        mood_distribution = {k: (v / total * 100) if total > 0 else 0
                            for k, v in expression_counts.items()}

        # Determine overall mood
        dominant_mood = max(mood_distribution, key=mood_distribution.get)
        mood_score = mood_distribution.get('Happy/Smiling', 0) - mood_distribution.get('Sad/Frowning', 0)

        report = {
            'dominant_mood': dominant_mood,
            'mood_score': mood_score,
            'distribution': mood_distribution,
            'recommendation': self.get_wellness_recommendation(mood_score)
        }

        print(f"\\n📊 Mood Report:")
        print(f"   Dominant Mood: {dominant_mood}")
        print(f"   Mood Score: {mood_score:.1f}")
        print(f"   Recommendation: {report['recommendation']}")

        return report

    def get_wellness_recommendation(self, mood_score):
        """Generate wellness recommendations based on mood"""
        if mood_score > 30:
            return "✅ Great mood! Keep up the positive energy."
        elif mood_score > 0:
            return "😊 Good mood. Consider activities you enjoy."
        elif mood_score > -30:
            return "😐 Neutral mood. Try a short walk or listen to music."
        else:
            return "💙 Consider reaching out to friends or practicing self-care."

# ====== Finance Application: Gesture-Controlled Receipt Scanner ======
class GestureReceiptScanner:
    """
    Scan receipts using head nod gesture (hands full of shopping)
    Use: Expense tracking, budgeting apps, financial management
    """

    def __init__(self):
        self.gesture_controller = GestureController()
        self.capture_cooldown = 0

    def scan_with_gesture(self):
        """Gesture-controlled receipt scanning"""
        cap = cv2.VideoCapture(0)

        print("\\n📸 Gesture-Controlled Receipt Scanner")
        print("   Nod DOWN to capture receipt")
        print("   Look LEFT/RIGHT to navigate")

        captured_images = []

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame, gesture = self.gesture_controller.detect_gesture(frame)

            if gesture == "SCROLL_DOWN" and self.capture_cooldown == 0:
                # Capture receipt
                captured_images.append(frame.copy())
                self.capture_cooldown = 30  # 1 second cooldown at 30fps

                cv2.putText(frame, "✅ CAPTURED!", (frame.shape[1]//2 - 100, frame.shape[0]//2),
                           cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)
                print(f"✅ Receipt captured! Total: {len(captured_images)}")

            if self.capture_cooldown > 0:
                self.capture_cooldown -= 1

            # Display instruction
            cv2.putText(frame, f"Receipts: {len(captured_images)}", (10, frame.shape[0] - 20),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

            cv2.imshow('Gesture Receipt Scanner', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        return captured_images

print("\\n💡 Expressions + Gestures = Human-Computer Interaction")
print("   Landmarks → Geometry → Expressions → Meaningful interaction")
print("   Head pose → Gestures → Hands-free control")
print("\\n🎯 You're mastering the INTERFACE between humans and machines!")`
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


  const toggleCodeExpansion = (index: number) => {
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dlib: Advanced Facial Recognition & Tracking
                </h1>
                <p className="text-sm text-muted-foreground">Session 29: From Face Detection to Identity Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Shield className="w-3 h-3 mr-1" />
                Security
              </Badge>
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                <Fingerprint className="w-3 h-3 mr-1" />
                Biometrics
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Origin Story Section */}
        <section className="mb-12">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <Target className="w-5 h-5" />
                    The Need Came First - Not the Tool
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Face recognition arose from real security needs, not academic curiosity
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={runOriginStory}
                    disabled={isStoryRunning}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
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
                          ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 opacity-100'
                          : 'bg-muted/20 border-muted opacity-30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= storyStep ? 'bg-purple-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{chapter.title}</h4>
                          <p className="text-muted-foreground mb-2">{chapter.content}</p>
                          {index <= storyStep && (
                            <p className="text-sm bg-purple-100 dark:bg-purple-900/30 p-3 rounded italic">
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
                  <p className="text-muted-foreground">Click "Begin Journey" to start the Dlib face recognition story</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* The 5 Parts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">The Complete Journey: From Detection to Recognition</h2>
              <p className="text-muted-foreground">5 parts that transform you from beginner to biometric engineer</p>
            </div>
          </div>

          <div className="grid gap-6">
            {allParts.map((part, index) => (
              <Card key={index} className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
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
                      <div className="rounded-lg overflow-hidden border border-gray-700">
                        <CodeBlockR language="python">{part.code}</CodeBlockR>
                      </div>
                    </TabsContent>

                    <TabsContent value="explanation" className="space-y-4">
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                          <p className="text-purple-700 dark:text-purple-300">{part.realWorld}</p>
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
                                <li>• Build an attendance system for your study group</li>
                                <li>• Create focus monitoring for productivity tracking</li>
                                <li>• Detect faces in your family photos automatically</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>• Implement fatigue detection for safe driving</li>
                                <li>• Create emotion tracking for mood journaling</li>
                                <li>• Build posture monitoring for ergonomic workspace</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>• Secure your personal finance app with face auth</li>
                                <li>• Build identity verification for document signing</li>
                                <li>• Create photo auto-tagging for family albums</li>
                              </>
                            )}
                            {index === 3 && (
                              <>
                                <li>• Track focus time for productivity billing</li>
                                <li>• Monitor posture during work-from-home sessions</li>
                                <li>• Build video conferencing auto-framing</li>
                              </>
                            )}
                            {index === 4 && (
                              <>
                                <li>• Create gesture-controlled recipe viewer (hands full)</li>
                                <li>• Build mood tracking for mental wellness</li>
                                <li>• Implement hands-free receipt scanner for shopping</li>
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
          <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
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
                    Health & Wellness Monitor
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build a comprehensive wellness system that monitors focus, fatigue, posture, and mood
                    for holistic health tracking and burnout prevention.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Real-time fatigue detection for safety</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Posture monitoring with ergonomic alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Mood tracking for mental health awareness</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Secure Finance System
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a biometric authentication system for financial apps with gesture-controlled
                    interfaces and productivity time tracking for billing.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Face authentication for secure transactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Gesture-controlled receipt scanning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Focus time tracking for productivity billing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg">
                <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  🚀 The Bigger Picture:
                </h5>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Dlib isn't separate from what you learned - it's <strong>everything converging</strong>.
                  The NumPy arrays from Data:Calculus. The linear algebra from Session 15. The image processing from Session 28.
                  The algorithmic thinking from Blueprints. Every session led here. You're not learning face recognition -
                  you're mastering the intersection of mathematics, computer vision, and human-computer interaction.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Session Complete */}
        <section className="mb-12">
          <Card className="border-pink-200 dark:border-pink-800 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-3">
                  🎓 Session 29 Complete: The Identity Intelligence Journey
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  You've mastered how machines recognize and track human faces. Not by memorizing functions,
                  but by understanding the mathematics and real-world needs behind facial recognition.
                </p>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🧠 What You Mastered:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Face detection with HOG & CNN</li>
                      <li>• 68-point facial landmarks</li>
                      <li>• 128D face encoding & comparison</li>
                      <li>• Real-time face tracking</li>
                      <li>• Expression & gesture detection</li>
                      <li>• Head pose estimation</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">💼 Real Applications Built:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Attendance tracking system</li>
                      <li>• Fatigue detection for safety</li>
                      <li>• Secure payment authentication</li>
                      <li>• Posture & focus monitoring</li>
                      <li>• Mood tracking for wellness</li>
                      <li>• Gesture-controlled interfaces</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-lg max-w-3xl mx-auto">
                  <p className="text-indigo-800 dark:text-indigo-200 font-semibold">
                    "Face recognition is not about learning a library - it's about understanding how linear algebra,
                    computer vision, and security needs converge to create identity intelligence."
                  </p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2">
                    You're not a tool user. You're a biometric engineer. 🎯
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
            <Badge variant="secondary">Session 29 Complete</Badge>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Continue to Session 30
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DlibSession29;
