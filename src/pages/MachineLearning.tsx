import React from 'react';
import { useTheme } from 'next-themes';
import EditablePageHeader from '@/components/EditablePageHeader';
import EditableCodeBlock from '@/components/EditableCodeBlock';
import TableOfContents from '@/components/TableOfContents';
import CourseNavigation from '@/components/CourseNavigation';
import mlHeroImage from '@/assets/ml-hero-blue.jpg';

const MachineLearning = () => {
  const { theme } = useTheme();

  const tocItems = [
    { id: 'introduction', title: 'The Intelligence Revolution', sessions: 'Philosophy & Overview' },
    { id: 'computer-vision', title: 'Computer Vision', sessions: 'Sessions 28-29' },
    { id: 'ml-classic', title: 'Classical Machine Learning & NLP', sessions: 'Sessions 30-35' },
    { id: 'deep-learning', title: 'Deep Learning with TensorFlow', sessions: 'Sessions 36-40' },
    { id: 'next-chapter', title: 'The Road to Advanced ML', sessions: 'What\'s Next' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 50, 0.3), rgba(0, 20, 80, 0.5)), url(${mlHeroImage})`
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Machine Learning
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            From Classical Algorithms to Deep Neural Networks - The Honor of Building Intelligent Systems
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main content - Keep wide and clean */}
        <div className="flex-grow min-w-0 max-w-none">
          {/* Introduction Section */}
          <section id="introduction" className="mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                The Intelligence Revolution: From Algorithms to Awareness
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  We stand at the threshold of the most profound technological revolution in human history. 
                  After mastering the language of Python, understanding data structures, and wielding the power 
                  of numerical computation and visualization, we now embark on the ultimate journey: teaching machines to think.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Machine Learning is not just about algorithms—it's about creating systems that can perceive, 
                  understand, and make decisions. From enabling cars to see the road ahead, to understanding 
                  human language, to recognizing patterns invisible to the human eye, we're building the 
                  foundation of artificial intelligence.
                </p>
                
                {/* Neural Networks Foundation */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-xl border border-blue-200 dark:border-blue-800 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">🧠 Um, What Is a Neural Network?</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    It's a technique for building a computer program that learns from data. It is based very loosely on how we think the human brain works. 
                    First, a collection of software "neurons" are created and connected together, allowing them to send messages to each other. 
                    Next, the network is asked to solve a problem, which it attempts to do over and over, each time strengthening the connections 
                    that lead to success and diminishing those that lead to failure.
                  </p>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg border border-blue-300 dark:border-blue-700 mb-6">
                    <h4 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">🚀 Experience Neural Networks in Action</h4>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      Want to see how neural networks actually work? Try the interactive TensorFlow Playground where you can build, 
                      modify, and watch a neural network learn to classify data points in real-time!
                    </p>
                    
                    <a 
                      href="https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,2&seed=0.53678&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 no-underline"
                    >
                      🎯 Open TensorFlow Playground
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Parameters to Explore:</h5>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                          <li><strong>Learning Rate:</strong> How fast the network learns (0.001-1.0)</li>
                          <li><strong>Activation:</strong> ReLU, Tanh, Sigmoid - neuron response functions</li>
                          <li><strong>Hidden Layers:</strong> Network depth and complexity</li>
                          <li><strong>Batch Size:</strong> How many examples to learn from at once</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">What You'll See:</h5>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                          <li><strong>Blue/Orange Points:</strong> Data to classify</li>
                          <li><strong>Background Color:</strong> Network's decision boundary</li>
                          <li><strong>Loss Graph:</strong> How well the network is learning</li>
                          <li><strong>Neurons:</strong> Each circle shows learned features</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">
                    For deeper understanding: Michael Nielsen's <em>Neural Networks and Deep Learning</em> provides excellent foundations, 
                    while <em>Deep Learning</em> by Goodfellow, Bengio, and Courville offers comprehensive technical depth.
                  </p>
                </div>

                <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-muted-foreground">
                  "The question is not whether machines think but whether men do. The mystery which surrounds 
                  a thinking machine already surrounds a thinking man." - B.F. Skinner
                </blockquote>
              </div>
            </div>
          </section>

          {/* Computer Vision Section */}
          <section id="computer-vision" className="mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Computer Vision: Teaching Machines to See
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Before neural networks dominated the field, computer vision relied on carefully crafted algorithms
                to detect edges, find contours, and recognize patterns. Understanding these fundamentals gives us
                insight into how machines process visual information.
              </p>

              {/* Featured Artifact - Session 28 */}
              <div className="mb-12 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border-2 border-green-300 dark:border-green-700 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">👁️</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Session 28: Computer Vision - Where Data Meets Sight
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      From pixels to intelligence. OpenCV is nothing but great Data:Calculus (pixel Vectors), Data Models,
                      Imagination and Visualizing it. Experience the full journey from need to solution.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                        OpenCV Advanced
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        MediaPipe
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                        Pixel Algorithms
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                        Interactive Story
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/artifacts/computer-vision-session28'}
                  className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600 hover:from-green-600 hover:via-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Enter Computer Vision Session 28 Artifact</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏥 Health Applications</h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Meal variety analyzer for nutrition tracking</li>
                      <li>• Workout form analysis with MediaPipe</li>
                      <li>• Posture monitoring & rep counting</li>
                      <li>• Progress tracking with before/after comparison</li>
                    </ul>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Finance Applications</h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Receipt scanning with gesture control</li>
                      <li>• Security system with motion detection</li>
                      <li>• Document processing & automation</li>
                      <li>• Contour detection for expense tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Featured Artifact - Session 29 */}
              <div className="mb-12 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 rounded-xl p-8 border-2 border-purple-300 dark:border-purple-700 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">🔐</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Session 29: Dlib - Face Recognition & Biometric Intelligence
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      From detecting faces to recognizing identity. Dlib is the convergence of Linear Algebra (128D vectors),
                      Computer Vision (landmarks), and Security. Your phone unlocks with your face - here's how it works.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                        Face Detection
                      </span>
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium">
                        68 Landmarks
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                        Face Recognition
                      </span>
                      <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 rounded-full text-sm font-medium">
                        Interactive Story
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/artifacts/dlib-session29'}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Enter Dlib Session 29 Artifact</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🏥 Health Applications</h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Fatigue detection for workout safety</li>
                      <li>• Posture monitoring for ergonomic health</li>
                      <li>• Mood tracking for mental wellness</li>
                      <li>• Focus monitoring for productivity</li>
                    </ul>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">💰 Finance Applications</h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Biometric authentication for banking</li>
                      <li>• Secure payment verification</li>
                      <li>• Gesture-controlled receipt scanning</li>
                      <li>• Focus time tracking for billing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <details className="space-y-8 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10 rounded-lg border border-green-200 dark:border-green-800">
                <summary className="cursor-pointer p-6 hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                  <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                    📚 Additional Code Examples & Implementation Details
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">(Click to expand)</span>
                </summary>

                <div className="px-6 pb-6 space-y-8">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
                      Session 28 – Advanced OpenCV: Image Processing, Contours & Segmentation
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      In autonomous vehicles, computer vision processes thousands of frames per second to identify
                      lane markings, traffic signs, and obstacles. OpenCV provides the foundational tools for this
                      real-time visual processing.
                    </p>
                    <EditableCodeBlock
                      title="Real-time Object Detection Pipeline"
                      language="python"
                      code={`import cv2
import numpy as np

# Initialize camera for real-time processing
cap = cv2.VideoCapture(0)

# Create background subtractor for motion detection
backSub = cv2.createBackgroundSubtractorMOG2()

def process_security_frame(frame):
    """
    Production-grade security system processing
    Used in: Airports, banks, industrial facilities
    """
    # Convert to different color spaces for analysis
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Background subtraction for motion detection
    fg_mask = backSub.apply(frame)
    
    # Morphological operations to clean noise
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, kernel)
    
    # Find contours of moving objects
    contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Filter and analyze significant movements
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 1000:  # Minimum area threshold
            # Calculate bounding rectangle
            x, y, w, h = cv2.boundingRect(contour)
            
            # Draw detection rectangle
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            
            # Add confidence and area information
            cv2.putText(frame, f'Motion: {area:.0f}px²', 
                       (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
    
    return frame, len([c for c in contours if cv2.contourArea(c) > 1000])

# Real-time processing loop
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    processed_frame, motion_count = process_security_frame(frame)
    
    # Display results
    cv2.imshow('Security System - Motion Detection', processed_frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`}
                    page="machine-learning"
                    section="opencv-advanced"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
                    Session 29 – Dlib: Advanced Facial Recognition & Tracking
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Modern authentication systems use facial recognition for secure access control. 
                    Dlib's pre-trained models enable production-ready face detection and landmark estimation.
                  </p>
                  <EditableCodeBlock
                    title="Enterprise Face Recognition System"
                    language="python"
                    code={`import dlib
import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class FaceRecognitionSystem:
    """
    Production-grade face recognition system
    Used in: Corporate security, banking, access control
    """
    
    def __init__(self):
        # Initialize dlib's face detector and predictor
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
        self.face_rec_model = dlib.face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')
        
        # Database of known faces (in production: database/cloud storage)
        self.known_faces = {}
        self.face_encodings = {}
    
    def extract_face_encoding(self, image, face_rect):
        """Extract 128-dimensional face encoding"""
        # Get facial landmarks
        landmarks = self.predictor(image, face_rect)
        
        # Compute face encoding
        face_encoding = np.array(self.face_rec_model.compute_face_descriptor(image, landmarks))
        return face_encoding
    
    def register_employee(self, name, image_path):
        """Register new employee in the system"""
        image = cv2.imread(image_path)
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Detect faces
        faces = self.detector(rgb_image)
        
        if len(faces) == 1:
            # Extract encoding for the single detected face
            encoding = self.extract_face_encoding(rgb_image, faces[0])
            self.face_encodings[name] = encoding
            print(f"✅ Employee {name} registered successfully")
            return True
        else:
            print(f"❌ Error: Expected 1 face, found {len(faces)}")
            return False
    
    def authenticate_person(self, image, threshold=0.6):
        """Authenticate person against known database"""
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        faces = self.detector(rgb_image)
        
        results = []
        
        for face_rect in faces:
            # Extract encoding for detected face
            unknown_encoding = self.extract_face_encoding(rgb_image, face_rect)
            
            # Compare with all known faces
            best_match = None
            best_similarity = 0
            
            for name, known_encoding in self.face_encodings.items():
                # Calculate cosine similarity
                similarity = cosine_similarity(
                    [unknown_encoding], [known_encoding]
                )[0][0]
                
                if similarity > best_similarity and similarity > threshold:
                    best_similarity = similarity
                    best_match = name
            
            # Convert dlib rectangle to OpenCV format
            x, y, w, h = face_rect.left(), face_rect.top(), face_rect.width(), face_rect.height()
            
            results.append({
                'name': best_match or 'Unknown',
                'confidence': best_similarity,
                'bbox': (x, y, w, h),
                'authenticated': best_match is not None
            })
        
        return results

# Usage in production environment
def main():
    system = FaceRecognitionSystem()
    
    # Register employees (in production: bulk import from HR database)
    system.register_employee("John_Doe", "employees/john_doe.jpg")
    system.register_employee("Jane_Smith", "employees/jane_smith.jpg")
    
    # Real-time authentication
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Authenticate persons in frame
        results = system.authenticate_person(frame)
        
        # Draw results
        for result in results:
            x, y, w, h = result['bbox']
            color = (0, 255, 0) if result['authenticated'] else (0, 0, 255)
            
            # Draw bounding box
            cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
            
            # Draw name and confidence
            label = f"{result['name']} ({result['confidence']:.2f})"
            cv2.putText(frame, label, (x, y - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
        
        cv2.imshow('Face Recognition System', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="dlib-face-recognition"
                  />
                </div>
                </div>
              </details>
            </div>
          </section>

          {/* Classical ML Section */}
          <section id="ml-classic" className="mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Classical Machine Learning & NLP: The Foundation of Intelligence
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Before deep learning revolutionized AI, classical machine learning algorithms powered countless
                real-world applications. Understanding these fundamentals is crucial for choosing the right
                approach for each problem.
              </p>

              <div className="space-y-8">
                {/* Featured Artifact - Session 30 */}
                <div className="mb-12 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 rounded-xl p-8 border-2 border-orange-300 dark:border-orange-700 shadow-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl">🤖</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Session 30: Introduction to Scikit-learn - The Moment Machines Started Learning
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        From the question "How do I make data PREDICT?" to building your first ML model. Experience the complete journey
                        from need to solution with real Health & Finance projects.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                          sklearn Origins
                        </span>
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
                          Math Foundations
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                          First ML Model
                        </span>
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                          Interactive Story
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = '/artifacts/sklearn-session30'}
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Enter Scikit-learn Session 30 Artifact</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">💰 Personal Finance Applications</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• House price prediction - Should I buy this apartment?</li>
                        <li>• Expense category prediction</li>
                        <li>• Investment return forecasting</li>
                        <li>• Budget optimization with ML</li>
                      </ul>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🏥 Health Applications</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• Energy level prediction from sleep data</li>
                        <li>• Workout performance forecasting</li>
                        <li>• Nutrition impact analysis</li>
                        <li>• Health metric trend prediction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Artifact - Session 31 */}
                <div className="mb-12 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-red-900/20 dark:via-pink-900/20 dark:to-purple-900/20 rounded-xl p-8 border-2 border-red-300 dark:border-red-700 shadow-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl">🏥</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                        Session 31: Advanced Classification, Pipelines & Tuning
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        From "How do we detect cancer?" to building secure, optimized classification systems.
                        Learn SVM, Random Forest, KNN, Pipelines, and GridSearchCV with real medical applications.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                          Breast Cancer Dataset
                        </span>
                        <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium">
                          SVM, RF, KNN
                        </span>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                          Pipelines & Data Leakage
                        </span>
                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                          GridSearchCV
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = '/artifacts/sklearn-session31'}
                    className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Enter Scikit-learn Session 31 Artifact</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🏥 Health: Cancer Detection</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• Breast cancer classification (malignant vs benign)</li>
                        <li>• Medical decision support systems</li>
                        <li>• Understanding diagnostic metrics (Recall critical!)</li>
                        <li>• Building trust in ML predictions</li>
                      </ul>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">🔒 Advanced Techniques</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• Pipelines prevent data leakage</li>
                        <li>• Cross-validation for reliable evaluation</li>
                        <li>• GridSearchCV for hyperparameter tuning</li>
                        <li>• Production-ready deployment strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Additional sklearn sessions collapsed */}
                <details className="space-y-8 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                  <summary className="cursor-pointer p-6 hover:bg-orange-50/50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                    <span className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                      📚 Sessions 31-33: Advanced Scikit-learn & Additional Code Examples
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">(Click to expand)</span>
                  </summary>

                  <div className="px-6 pb-6 space-y-8">
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-orange-800 dark:text-orange-200">
                        Sessions 30-33 – Scikit-learn: From Basics to Production
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Netflix uses machine learning to predict which movies you'll enjoy. Banks use it to detect
                        fraudulent transactions. E-commerce platforms use it to optimize pricing. Scikit-learn
                        provides the tools to build these systems.
                      </p>
                      <EditableCodeBlock
                        title="Production ML Pipeline - Real Estate Price Prediction"
                        language="python"
                        code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

class RealEstatePricingModel:
    """
    Production-grade real estate pricing system
    Used by: Zillow, Redfin, real estate agencies
    """
    
    def __init__(self):
        self.pipeline = None
        self.feature_names = None
        self.model_metadata = {}
    
    def create_features(self, df):
        """Advanced feature engineering for real estate"""
        df = df.copy()
        
        # Location-based features
        df['price_per_sqft'] = df['price'] / (df['sqft_living'] + 1)
        df['total_rooms'] = df['bedrooms'] + df['bathrooms']
        df['age'] = 2024 - df['yr_built']
        df['renovated'] = (df['yr_renovated'] > 0).astype(int)
        
        # Neighborhood statistics (in production: real-time market data)
        neighborhood_stats = df.groupby('zipcode').agg({
            'price': ['mean', 'median', 'std'],
            'sqft_living': 'mean'
        }).round(2)
        
        neighborhood_stats.columns = ['neighborhood_avg_price', 'neighborhood_median_price', 
                                    'neighborhood_price_std', 'neighborhood_avg_sqft']
        
        df = df.merge(neighborhood_stats, left_on='zipcode', right_index=True, how='left')
        
        # Market indicators
        df['above_neighborhood_avg'] = (df['price'] > df['neighborhood_avg_price']).astype(int)
        df['luxury_indicator'] = ((df['price'] > df['neighborhood_avg_price'] * 1.5) & 
                                 (df['sqft_living'] > df['neighborhood_avg_sqft'] * 1.2)).astype(int)
        
        return df
    
    def predict_price(self, property_features):
        """Predict price for a new property"""
        if self.pipeline is None:
            raise ValueError("Model must be trained first!")
        
        # Ensure all required features are present
        prediction = self.pipeline.predict([property_features])
        confidence = self.calculate_prediction_confidence(property_features)
        
        return {
            'predicted_price': prediction[0],
            'confidence': confidence,
            'price_range': (prediction[0] * 0.9, prediction[0] * 1.1)
        }
    
    def calculate_prediction_confidence(self, features):
        """Calculate prediction confidence based on training data similarity"""
        # Simplified confidence calculation
        # In production: use prediction intervals or ensemble uncertainty
        return np.random.uniform(0.75, 0.95)  # Placeholder

# Example usage in production
def main():
    # Load real estate data (in production: from MLS, Zillow API, etc.)
    df = pd.read_csv('house_sales.csv')
    
    # Initialize and train model
    pricing_model = RealEstatePricingModel()
    
    # Example prediction for new property
    new_property = [2000, 7000, 2, 3, 2, 0, 3, 7, 8, 10, 0, 5, 450000, 425000]
    result = pricing_model.predict_price(new_property)
    
    print("🏠 Predicted Price:", result['predicted_price'])
    print("📊 Confidence:", result['confidence'])
    print("💰 Price Range:", result['price_range'])


if __name__ == "__main__":
    main()`}
                        page="machine-learning"
                        section="sklearn-production"
                      />
                    </div>
                  </div>
                </details>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                    Sessions 34-35 – NLP: Understanding Human Language
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Customer service chatbots, sentiment analysis for brand monitoring, and document 
                    classification systems all rely on Natural Language Processing to understand and 
                    respond to human language.
                  </p>
                  <EditableCodeBlock
                    title="Enterprise Sentiment Analysis System"
                    language="python"
                    code={`import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import classification_report
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

class SentimentAnalysisSystem:
    """
    Production sentiment analysis for customer feedback
    Used by: Amazon, Yelp, social media monitoring platforms
    """
    
    def __init__(self):
        # Download required NLTK data
        nltk.download('stopwords', quiet=True)
        nltk.download('punkt', quiet=True)
        nltk.download('wordnet', quiet=True)
        
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        self.vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2))
        self.model = None
        
    def preprocess_text(self, text):
        """Advanced text preprocessing pipeline"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs, mentions, hashtags
        text = re.sub(r'http\\S+|www\\S+|https\\S+', '', text, flags=re.MULTILINE)
        text = re.sub(r'@\\w+|#\\w+', '', text)
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and short words
        tokens = [token for token in tokens 
                 if token not in self.stop_words and len(token) > 2]
        
        # Lemmatize
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens]
        
        return ' '.join(tokens)
    
    def predict_sentiment(self, text):
        """Predict sentiment for new text"""
        if self.model is None:
            raise ValueError("Model must be trained first!")
        
        # Preprocess text
        processed_text = self.preprocess_text(text)
        
        if not processed_text:
            return {
                'sentiment': 'neutral',
                'confidence': 0.5,
                'probabilities': {'positive': 0.33, 'neutral': 0.34, 'negative': 0.33}
            }
        
        # Vectorize
        text_vector = self.vectorizer.transform([processed_text])
        
        # Predict
        prediction = self.model.predict(text_vector)[0]
        probabilities = self.model.predict_proba(text_vector)[0]
        
        # Get class labels
        classes = self.model.classes_
        
        # Create probability dictionary
        prob_dict = dict(zip(classes, probabilities))
        confidence = max(probabilities)
        
        return {
            'sentiment': prediction,
            'confidence': confidence,
            'probabilities': prob_dict,
            'processed_text': processed_text
        }
    
    def analyze_customer_feedback(self, feedback_list):
        """Analyze batch of customer feedback"""
        results = []
        
        for feedback in feedback_list:
            result = self.predict_sentiment(feedback)
            results.append({
                'original_text': feedback,
                'sentiment': result['sentiment'],
                'confidence': result['confidence'],
                'needs_attention': (result['sentiment'] == 'negative' and 
                                  result['confidence'] > 0.8)
            })
        
        # Summary statistics
        sentiments = [r['sentiment'] for r in results]
        summary = {
            'total_reviews': len(results),
            'positive': sentiments.count('positive'),
            'negative': sentiments.count('negative'),
            'neutral': sentiments.count('neutral'),
            'high_priority_issues': len([r for r in results if r['needs_attention']]),
            'overall_sentiment_score': (sentiments.count('positive') - sentiments.count('negative')) / len(sentiments)
        }
        
        return results, summary

# Production usage example
def main():
    # Initialize system
    sentiment_system = SentimentAnalysisSystem()
    
    # Analyze new customer feedback
    new_feedback = [
        "This product is absolutely amazing! Best purchase I've made all year.",
        "Terrible quality, broke after one week. Very disappointed.",
        "It's okay, does what it's supposed to do.",
        "Customer service was unhelpful and rude. Will not buy again!"
    ]
    
    results, summary = sentiment_system.analyze_customer_feedback(new_feedback)
    
    print("🔍 Feedback Analysis Results:")
    for result in results:
        print(f"📝 '{result['original_text'][:50]}...'")
        print(f"   Sentiment: {result['sentiment']}")
        if result['needs_attention']:
            print("   ⚠️  HIGH PRIORITY - Needs immediate attention!")

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="nlp-sentiment"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Deep Learning Section */}
          <section id="deep-learning" className="mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Deep Learning with TensorFlow: Neural Networks Revolution
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Deep learning has revolutionized computer vision, enabling systems that can diagnose diseases 
                from medical images, enable autonomous vehicles, and create art. TensorFlow provides the 
                infrastructure to build these powerful neural networks.
              </p>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-red-800 dark:text-red-200">
                    Sesiunea 36-38 – CNN & Transfer Learning
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Medical imaging AI systems use Convolutional Neural Networks to detect cancer, fractures, 
                    and other conditions. Transfer learning allows us to leverage pre-trained models for 
                    specialized applications.
                  </p>
                  <EditableCodeBlock
                    title="Medical Image Classification with Transfer Learning"
                    language="python"
                    code={`import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import numpy as np
import cv2

class MedicalImageClassifier:
    """
    Production medical imaging AI system
    Used in: Hospitals, diagnostic centers, telemedicine
    """
    
    def __init__(self, num_classes=3, input_shape=(224, 224, 3)):
        self.num_classes = num_classes  # e.g., Normal, Pneumonia, COVID-19
        self.input_shape = input_shape
        self.model = None
        self.class_names = ['Normal', 'Pneumonia', 'COVID-19']
        
    def build_model(self):
        """Build transfer learning model for medical imaging"""
        
        # Load pre-trained EfficientNet
        base_model = EfficientNetB0(
            weights='imagenet',
            include_top=False,
            input_shape=self.input_shape
        )
        
        # Freeze base model layers initially
        base_model.trainable = False
        
        # Add custom classification head
        inputs = tf.keras.Input(shape=self.input_shape)
        
        # Data augmentation for medical images
        x = tf.keras.layers.RandomFlip("horizontal")(inputs)
        x = tf.keras.layers.RandomRotation(0.1)(x)
        x = tf.keras.layers.RandomZoom(0.1)(x)
        
        # Preprocessing for EfficientNet
        x = tf.keras.applications.efficientnet.preprocess_input(x)
        
        # Base model
        x = base_model(x, training=False)
        
        # Classification head
        x = GlobalAveragePooling2D()(x)
        x = Dropout(0.3)(x)
        x = Dense(512, activation='relu')(x)
        x = Dropout(0.2)(x)
        outputs = Dense(self.num_classes, activation='softmax')(x)
        
        model = Model(inputs, outputs)
        
        # Compile model
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='categorical_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        
        self.model = model
        return model
    
    def predict_diagnosis(self, image_path, return_confidence=True):
        """Predict medical diagnosis from chest X-ray"""
        
        if self.model is None:
            raise ValueError("Model must be built and trained first!")
        
        # Preprocess image
        image = self.preprocess_image(image_path)
        
        # Make prediction
        predictions = self.model.predict(image, verbose=0)
        predicted_class = np.argmax(predictions[0])
        confidence = predictions[0][predicted_class]
        
        # Get class probabilities
        class_probabilities = {
            class_name: float(prob) 
            for class_name, prob in zip(self.class_names, predictions[0])
        }
        
        # Generate medical report
        diagnosis = self.class_names[predicted_class]
        
        # Risk assessment
        risk_level = "HIGH" if confidence > 0.9 and diagnosis != "Normal" else "MEDIUM" if confidence > 0.7 else "LOW"
        
        result = {
            'diagnosis': diagnosis,
            'confidence': float(confidence),
            'risk_level': risk_level,
            'class_probabilities': class_probabilities,
            'recommendations': self.get_medical_recommendations(diagnosis, confidence)
        }
        
        if return_confidence:
            return result
        else:
            return diagnosis
    
    def get_medical_recommendations(self, diagnosis, confidence):
        """Generate medical recommendations based on diagnosis"""
        recommendations = []
        
        if diagnosis == "Normal":
            recommendations.append("✅ No abnormalities detected in chest X-ray")
            recommendations.append("📅 Continue routine check-ups as recommended")
        
        elif diagnosis == "Pneumonia":
            recommendations.append("⚠️ Pneumonia detected - immediate medical attention required")
            recommendations.append("💊 Antibiotic treatment may be necessary")
            recommendations.append("🏥 Consider hospitalization if severe symptoms present")
            
        elif diagnosis == "COVID-19":
            recommendations.append("🦠 COVID-19 pneumonia pattern detected")
            recommendations.append("🔬 Confirm with RT-PCR test")
            recommendations.append("🏠 Isolation and monitoring required")
            recommendations.append("🏥 Monitor oxygen levels closely")
        
        if confidence < 0.8:
            recommendations.append("🔍 Low confidence - consider additional imaging")
            recommendations.append("👨‍⚕️ Radiologist review recommended")
        
        return recommendations

# Production deployment example
def main():
    # Initialize medical AI system
    classifier = MedicalImageClassifier()
    
    # Build model architecture
    model = classifier.build_model()
    print(f"📋 Model built with parameters")
    
    # Analyze new chest X-ray
    image_path = "chest_xray_001.jpg"
    
    # Generate diagnosis
    result = classifier.predict_diagnosis(image_path)
    print(f"🩺 Diagnosis: {result['diagnosis']}")
    print(f"⚠️  Risk Level: {result['risk_level']}")

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="tensorflow-medical"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
                    Sesiunea 39-40 – YOLO: Real-time Object Detection
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Autonomous vehicles, security systems, and industrial automation rely on real-time 
                    object detection. YOLO (You Only Look Once) enables processing thousands of frames 
                    per second for critical applications.
                  </p>
                  <EditableCodeBlock
                    title="Production YOLO Object Detection System"
                    language="python"
                    code={`import tensorflow as tf
import cv2
import numpy as np
from collections import defaultdict
import time

class YOLODetectionSystem:
    """
    Production YOLO object detection system
    Used in: Autonomous vehicles, security systems, retail analytics
    """
    
    def __init__(self, model_path='yolov5s.h5', confidence_threshold=0.5):
        self.model = None
        self.confidence_threshold = confidence_threshold
        self.nms_threshold = 0.4
        self.input_size = 640
        
        # COCO class names (80 objects)
        self.class_names = [
            'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck',
            'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench',
            'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra',
            'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee'
        ]
        
        # Colors for visualization
        self.colors = np.random.randint(0, 255, size=(len(self.class_names), 3), dtype=np.uint8)
    
    def detect_objects(self, image):
        """Detect objects in image"""
        orig_shape = image.shape
        
        # Preprocess
        processed_image, scale, x_offset, y_offset = self.preprocess_image(image)
        input_batch = np.expand_dims(processed_image, axis=0)
        
        # Run inference
        start_time = time.time()
        # predictions = self.model.predict(input_batch, verbose=0)
        inference_time = time.time() - start_time
        
        # Simulate detections for demo
        detections = [
            {'class': 'person', 'confidence': 0.95, 'bbox': [100, 50, 200, 400]},
            {'class': 'car', 'confidence': 0.87, 'bbox': [300, 200, 500, 350]},
            {'class': 'bicycle', 'confidence': 0.73, 'bbox': [50, 100, 150, 250]}
        ]
        
        return detections, inference_time
    
    def analyze_traffic_scene(self, detections):
        """Analyze traffic scene for autonomous driving"""
        analysis = {
            'vehicles': [],
            'pedestrians': [],
            'traffic_signs': [],
            'safety_alerts': []
        }
        
        vehicle_classes = ['car', 'truck', 'bus', 'motorcycle', 'bicycle']
        traffic_classes = ['traffic light', 'stop sign']
        
        for det in detections:
            if det['class'] in vehicle_classes:
                analysis['vehicles'].append(det)
            elif det['class'] == 'person':
                analysis['pedestrians'].append(det)
            elif det['class'] in traffic_classes:
                analysis['traffic_signs'].append(det)
        
        # Generate safety alerts
        if len(analysis['pedestrians']) > 0:
            analysis['safety_alerts'].append("⚠️ Pedestrians detected - reduce speed")
        
        if len(analysis['vehicles']) > 3:
            analysis['safety_alerts'].append("🚗 Heavy traffic detected")
        
        return analysis
    
    def real_time_detection(self, source=0):
        """Real-time object detection from camera"""
        cap = cv2.VideoCapture(source)
        
        print("🎥 Starting real-time detection (press 'q' to quit)")
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            # Detect objects
            detections, inference_time = self.detect_objects(frame)
            
            # Analyze scene for autonomous driving
            traffic_analysis = self.analyze_traffic_scene(detections)
            
            # Display performance info
            fps = 1.0 / inference_time if inference_time > 0 else 0
            cv2.putText(frame, f"FPS: {fps:.1f}", (10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            
            # Show frame
            cv2.imshow('YOLO Real-time Detection', frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()

# Production deployment
def main():
    # Initialize YOLO system
    detector = YOLODetectionSystem()
    
    # Real-time detection
    detector.real_time_detection(source=0)  # Use webcam

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="yolo-detection"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* The Road to Advanced ML */}
          <section id="next-chapter" className="mb-16">
            <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-8 border border-violet-200 dark:border-violet-800 shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Ready for Advanced Machine Learning?
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  You've mastered the fundamentals of machine learning - computer vision, NLP, and deep learning with TensorFlow. 
                  Now you're ready to dive into advanced ML architectures, production deployment, and enterprise-scale AI systems.
                </p>
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 border border-violet-200 dark:border-violet-700">
                  <h3 className="text-xl font-semibold mb-4 text-violet-800 dark:text-violet-200">
                    Advanced ML Awaits You:
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🧠 <strong>Keras Deep Learning:</strong> From foundation to ultra-advanced architectures</li>
                    <li>🔧 <strong>Custom Neural Networks:</strong> Build sophisticated models from scratch</li>
                    <li>📸 <strong>Transfer Learning:</strong> Leverage pre-trained models for powerful applications</li>
                    <li>🚀 <strong>Production Deployment:</strong> Flask, Streamlit, and cloud deployment strategies</li>
                    <li>📊 <strong>MLOps & Monitoring:</strong> Professional ML pipeline management</li>
                    <li>⚡ <strong>Scaling & Optimization:</strong> Enterprise-grade AI systems</li>
                  </ul>
                </div>
                <div className="mt-8 flex justify-center">
                  <a 
                    href="/advanced-machine-learning" 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Continue to Advanced ML & Deployment →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation - Compact and positioned better */}
        <div className="hidden lg:block w-72">
          <div className="space-y-4">
            <CourseNavigation 
              previousCourse={{
                path: "/data-visualizing",
                title: "Data Visualizing"
              }}
              nextCourse={{
                path: "/advanced-machine-learning", 
                title: "Advanced ML"
              }}
            />
            
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineLearning;
