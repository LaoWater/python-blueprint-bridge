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
    { id: 'advanced-ml', title: 'Advanced ML: Keras Mastery', sessions: 'Sessions 42-47' },
    { id: 'deployment', title: 'Model Serving & Deployment', sessions: 'Sessions 48-50' },
    { id: 'next-chapter', title: 'The Future of AI', sessions: 'Conclusion' }
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

              <div className="space-y-8">
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

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                    Sesiunea 34-35 – NLP: Understanding Human Language
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

          {/* Advanced ML: Keras Mastery */}
          <section id="advanced-ml" className="mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Advanced ML: Keras Mastery - From Foundation to Ultra-Advanced
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Keras represents the democratization of deep learning - making sophisticated neural networks 
                accessible to developers worldwide. From Google's recommendation systems to Tesla's autopilot, 
                Keras powers the AI that shapes our world.
              </p>

              <div className="space-y-8">
                {/* Session 42 */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
                    Session 42 – Introduction to Keras: First Steps in Deep Learning
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The journey begins with understanding neural networks at their core. Keras abstracts 
                    complexity while maintaining the power to build production-grade AI systems.
                  </p>
                  <EditableCodeBlock
                    title="Building Your First Neural Network - House Price Prediction"
                    language="python"
                    code={`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

class KerasFoundation:
    """
    Foundation class for understanding Keras neural networks
    Real-world application: Real estate price prediction
    """
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.history = None
    
    def create_neural_network(self, input_shape):
        """Create a foundational neural network"""
        
        # Sequential model - the building blocks
        model = keras.Sequential([
            # Input layer - receives our features
            layers.Dense(128, activation='relu', input_shape=(input_shape,)),
            layers.Dropout(0.2),  # Prevent overfitting
            
            # Hidden layers - where the magic happens
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.2),
            
            layers.Dense(32, activation='relu'),
            
            # Output layer - single price prediction
            layers.Dense(1, activation='linear')
        ])
        
        # Compile the model - defining how it learns
        model.compile(
            optimizer='adam',           # How to update weights
            loss='mean_squared_error',  # What to minimize
            metrics=['mae']             # What to track
        )
        
        self.model = model
        return model
    
    def train_model(self, X_train, y_train, X_val, y_val, epochs=100):
        """Train the neural network with early stopping"""
        
        # Callbacks for smarter training
        callbacks = [
            keras.callbacks.EarlyStopping(
                monitor='val_loss',
                patience=15,
                restore_best_weights=True
            ),
            keras.callbacks.ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.5,
                patience=10,
                min_lr=0.0001
            )
        ]
        
        # Train the model
        self.history = self.model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val),
            epochs=epochs,
            batch_size=32,
            callbacks=callbacks,
            verbose=1
        )
        
        return self.history
    
    def evaluate_model(self, X_test, y_test):
        """Comprehensive model evaluation"""
        
        # Make predictions
        predictions = self.model.predict(X_test)
        
        # Calculate metrics
        mse = np.mean((y_test - predictions.flatten()) ** 2)
        mae = np.mean(np.abs(y_test - predictions.flatten()))
        
        # R-squared
        ss_res = np.sum((y_test - predictions.flatten()) ** 2)
        ss_tot = np.sum((y_test - np.mean(y_test)) ** 2)
        r_squared = 1 - (ss_res / ss_tot)
        
        results = {
            'mse': mse,
            'mae': mae,
            'rmse': np.sqrt(mse),
            'r_squared': r_squared
        }
        
        print("🏠 House Price Prediction Results:")
        print(f"📊 Mean Absolute Error: ${{results['mae']:,.2f}}")
        print(f"📈 R-squared Score: {{results['r_squared']:.3f}}")
        print(f"🎯 Root Mean Square Error: ${{results['rmse']:,.2f}}")
        
        return results
    
    def visualize_training(self):
        """Visualize training progress"""
        if self.history is None:
            print("❌ No training history available")
            return
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
        
        # Loss curves
        ax1.plot(self.history.history['loss'], label='Training Loss')
        ax1.plot(self.history.history['val_loss'], label='Validation Loss')
        ax1.set_title('Model Loss')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Loss')
        ax1.legend()
        
        # MAE curves
        ax2.plot(self.history.history['mae'], label='Training MAE')
        ax2.plot(self.history.history['val_mae'], label='Validation MAE')
        ax2.set_title('Model MAE')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('MAE')
        ax2.legend()
        
        plt.tight_layout()
        plt.show()

# Real-world application example
def main():
    # Create the foundation model
    keras_foundation = KerasFoundation()
    
    # Simulate real estate data (in production: from MLS, Zillow, etc.)
    np.random.seed(42)
    n_samples = 1000
    
    # Features: sqft, bedrooms, bathrooms, age, location_score
    X = np.random.randn(n_samples, 5)
    X[:, 0] = np.random.uniform(800, 4000, n_samples)  # Square footage
    X[:, 1] = np.random.randint(1, 6, n_samples)       # Bedrooms
    X[:, 2] = np.random.uniform(1, 4, n_samples)       # Bathrooms
    X[:, 3] = np.random.uniform(0, 50, n_samples)      # Age
    X[:, 4] = np.random.uniform(1, 10, n_samples)      # Location score
    
    # Target: house prices (simplified formula)
    y = (X[:, 0] * 150 +           # Price per sqft
         X[:, 1] * 10000 +         # Bedroom value
         X[:, 2] * 8000 +          # Bathroom value
         X[:, 3] * -500 +          # Age depreciation
         X[:, 4] * 15000 +         # Location premium
         np.random.normal(0, 20000, n_samples))  # Noise
    
    # Split data
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4, random_state=42)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)
    
    # Scale features
    keras_foundation.scaler.fit(X_train)
    X_train_scaled = keras_foundation.scaler.transform(X_train)
    X_val_scaled = keras_foundation.scaler.transform(X_val)
    X_test_scaled = keras_foundation.scaler.transform(X_test)
    
    print("🏗️ Building neural network...")
    model = keras_foundation.create_neural_network(input_shape=5)
    
    print("🎓 Training model...")
    history = keras_foundation.train_model(X_train_scaled, y_train, X_val_scaled, y_val)
    
    print("📊 Evaluating model...")
    results = keras_foundation.evaluate_model(X_test_scaled, y_test)
    
    # Visualize training progress
    keras_foundation.visualize_training()

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="keras-foundation"
                  />
                </div>

                {/* Session 43 */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                    Session 43 – Advanced Keras: Custom Networks & Fine-tuning
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Moving beyond basic architectures, we explore custom layers, advanced optimizers, 
                    and sophisticated training strategies used in production AI systems.
                  </p>
                  <EditableCodeBlock
                    title="Custom Neural Architecture for Time Series Forecasting"
                    language="python"
                    code={`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, Model
import numpy as np
from sklearn.preprocessing import MinMaxScaler

class AdvancedKerasArchitect:
    """
    Advanced Keras techniques for production systems
    Application: Stock price prediction with LSTM + Attention
    """
    
    def __init__(self, sequence_length=60, n_features=5):
        self.sequence_length = sequence_length
        self.n_features = n_features
        self.model = None
        self.scaler = MinMaxScaler()
    
    def create_attention_layer(self, hidden_units):
        """Custom attention mechanism"""
        class AttentionLayer(layers.Layer):
            def __init__(self, units):
                super(AttentionLayer, self).__init__()
                self.units = units
                self.W = layers.Dense(units)
                self.V = layers.Dense(1)
            
            def call(self, inputs):
                # inputs shape: (batch_size, time_steps, features)
                
                # Calculate attention scores
                score = self.V(tf.nn.tanh(self.W(inputs)))
                attention_weights = tf.nn.softmax(score, axis=1)
                
                # Apply attention weights
                context_vector = attention_weights * inputs
                context_vector = tf.reduce_sum(context_vector, axis=1)
                
                return context_vector, attention_weights
        
        return AttentionLayer(hidden_units)
    
    def build_advanced_model(self):
        """Build sophisticated time series model with attention"""
        
        # Input layer
        inputs = layers.Input(shape=(self.sequence_length, self.n_features))
        
        # LSTM layers with return_sequences=True for attention
        lstm1 = layers.LSTM(128, return_sequences=True, dropout=0.2)(inputs)
        lstm2 = layers.LSTM(64, return_sequences=True, dropout=0.2)(lstm1)
        
        # Custom attention mechanism
        attention_layer = self.create_attention_layer(64)
        context_vector, attention_weights = attention_layer(lstm2)
        
        # Dense layers for final prediction
        dense1 = layers.Dense(50, activation='relu')(context_vector)
        dense1 = layers.Dropout(0.3)(dense1)
        
        dense2 = layers.Dense(25, activation='relu')(dense1)
        
        # Output layer - predicting next day's price
        outputs = layers.Dense(1, activation='linear')(dense2)
        
        # Create model
        model = Model(inputs=inputs, outputs=outputs)
        
        # Advanced optimizer with custom parameters
        optimizer = keras.optimizers.Adam(
            learning_rate=0.001,
            beta_1=0.9,
            beta_2=0.999,
            epsilon=1e-07
        )
        
        # Compile with custom loss function
        model.compile(
            optimizer=optimizer,
            loss=self.custom_loss_function,
            metrics=['mae', self.directional_accuracy]
        )
        
        self.model = model
        return model
    
    def custom_loss_function(self, y_true, y_pred):
        """Custom loss that penalizes directional errors more"""
        mse = tf.keras.losses.mean_squared_error(y_true, y_pred)
        
        # Directional penalty
        true_direction = tf.sign(y_true[1:] - y_true[:-1])
        pred_direction = tf.sign(y_pred[1:] - y_pred[:-1])
        direction_penalty = tf.reduce_mean(tf.cast(true_direction != pred_direction, tf.float32))
        
        return mse + 0.1 * direction_penalty
    
    def directional_accuracy(self, y_true, y_pred):
        """Custom metric: percentage of correct directional predictions"""
        if tf.shape(y_true)[0] <= 1:
            return 0.0
        
        true_direction = tf.sign(y_true[1:] - y_true[:-1])
        pred_direction = tf.sign(y_pred[1:] - y_pred[:-1])
        
        correct_directions = tf.cast(true_direction == pred_direction, tf.float32)
        return tf.reduce_mean(correct_directions)
    
    def advanced_training_strategy(self, X_train, y_train, X_val, y_val):
        """Sophisticated training with multiple strategies"""
        
        # Learning rate scheduling
        lr_scheduler = keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=10,
            min_lr=1e-7,
            verbose=1
        )
        
        # Early stopping with restore best weights
        early_stopping = keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=20,
            restore_best_weights=True,
            verbose=1
        )
        
        # Model checkpointing
        checkpoint = keras.callbacks.ModelCheckpoint(
            'best_model.h5',
            monitor='val_loss',
            save_best_only=True,
            verbose=1
        )
        
        # Custom callback for dynamic batch size
        class DynamicBatchSize(keras.callbacks.Callback):
            def on_epoch_end(self, epoch, logs=None):
                if epoch > 0 and epoch % 20 == 0:
                    print(f"Epoch {epoch}: Adjusting training strategy...")
        
        callbacks = [lr_scheduler, early_stopping, checkpoint, DynamicBatchSize()]
        
        # Train with advanced strategy
        history = self.model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val),
            epochs=200,
            batch_size=32,
            callbacks=callbacks,
            verbose=1
        )
        
        return history
    
    def predict_with_uncertainty(self, X_test, n_samples=100):
        """Monte Carlo Dropout for uncertainty estimation"""
        
        # Enable dropout during inference
        predictions = []
        
        for _ in range(n_samples):
            # Predict with dropout enabled
            pred = self.model(X_test, training=True)
            predictions.append(pred.numpy())
        
        predictions = np.array(predictions)
        
        # Calculate statistics
        mean_prediction = np.mean(predictions, axis=0)
        std_prediction = np.std(predictions, axis=0)
        
        # Confidence intervals
        lower_bound = np.percentile(predictions, 2.5, axis=0)
        upper_bound = np.percentile(predictions, 97.5, axis=0)
        
        return {
            'mean': mean_prediction,
            'std': std_prediction,
            'lower_bound': lower_bound,
            'upper_bound': upper_bound,
            'all_predictions': predictions
        }

# Production deployment example
def main():
    print("🚀 Advanced Keras Architecture Demo")
    
    # Initialize advanced model
    architect = AdvancedKerasArchitect(sequence_length=60, n_features=5)
    
    # Build sophisticated model
    model = architect.build_advanced_model()
    print("🏗️ Advanced model architecture created")
    
    # Model summary
    print("📋 Model Architecture:")
    model.summary()
    
    # Simulate time series data
    np.random.seed(42)
    n_samples = 1000
    
    # Create synthetic stock data
    X = np.random.randn(n_samples, 60, 5)  # 60 timesteps, 5 features
    y = np.random.randn(n_samples, 1)      # Next day price
    
    # Split data
    split_point = int(0.8 * n_samples)
    X_train, X_val = X[:split_point], X[split_point:]
    y_train, y_val = y[:split_point], y[split_point:]
    
    print("📊 Training advanced model...")
    # Note: In actual use, uncomment the next line
    # history = architect.advanced_training_strategy(X_train, y_train, X_val, y_val)
    
    print("🎯 Model ready for production deployment!")

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="keras-advanced"
                  />
                </div>

                {/* Sessions 44-47 */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
                    Sessions 44-47 – Complete Keras Mastery: CNN, Transfer Learning & Ultra-Advanced
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The pinnacle of Keras mastery: building production-grade image classification systems 
                    with transfer learning, data augmentation, custom callbacks, and deployment strategies.
                  </p>
                  <EditableCodeBlock
                    title="Ultra-Advanced: Production Image Classification with Transfer Learning"
                    language="python"
                    code={`import tensorflow as tf
from tensorflow.keras.applications import EfficientNetV2B0
from tensorflow.keras.layers import *
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import AdamW
from tensorflow.keras.callbacks import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import tensorflow_addons as tfa
import numpy as np
import cv2
from pathlib import Path

class UltraAdvancedKerasSystem:
    """
    Ultra-advanced Keras system for production image classification
    Features: Transfer learning, data augmentation, mixed precision, model optimization
    """
    
    def __init__(self, num_classes=10, input_shape=(224, 224, 3)):
        self.num_classes = num_classes
        self.input_shape = input_shape
        self.model = None
        self.base_model = None
        
        # Enable mixed precision for faster training
        tf.keras.mixed_precision.set_global_policy('mixed_float16')
    
    def create_ultra_advanced_model(self):
        """Create state-of-the-art model with all advanced techniques"""
        
        # Load pre-trained EfficientNetV2 (state-of-the-art)
        base_model = EfficientNetV2B0(
            weights='imagenet',
            include_top=False,
            input_shape=self.input_shape,
            drop_connect_rate=0.2
        )
        
        # Freeze base model initially
        base_model.trainable = False
        self.base_model = base_model
        
        # Advanced data augmentation
        inputs = Input(shape=self.input_shape)
        
        # Augmentation pipeline
        x = RandomFlip("horizontal")(inputs)
        x = RandomRotation(0.15)(x)
        x = RandomZoom(0.1)(x)
        x = RandomTranslation(0.1, 0.1)(x)
        x = RandomContrast(0.1)(x)
        x = RandomBrightness(0.1)(x)
        
        # CutMix and MixUp augmentation (advanced)
        x = self.apply_cutmix(x)
        
        # Preprocessing for EfficientNet
        x = tf.keras.applications.efficientnet_v2.preprocess_input(x)
        
        # Base model
        x = base_model(x, training=False)
        
        # Advanced pooling
        x = GlobalAveragePooling2D()(x)
        
        # Attention mechanism
        x = self.create_squeeze_excitation_block(x, reduction=16)
        
        # Advanced regularization
        x = Dropout(0.3)(x)
        x = Dense(512, activation='swish')(x)
        x = BatchNormalization()(x)
        x = Dropout(0.2)(x)
        
        # Output with label smoothing
        outputs = Dense(self.num_classes, activation='softmax', dtype='float32')(x)
        
        model = Model(inputs, outputs)
        
        # Advanced optimizer with weight decay
        optimizer = AdamW(
            learning_rate=1e-3,
            weight_decay=1e-5,
            beta_1=0.9,
            beta_2=0.999
        )
        
        # Compile with label smoothing
        model.compile(
            optimizer=optimizer,
            loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
            metrics=['accuracy', 'top_k_categorical_accuracy']
        )
        
        self.model = model
        return model
    
    def create_squeeze_excitation_block(self, inputs, reduction=16):
        """Squeeze and Excitation attention mechanism"""
        se = GlobalAveragePooling2D()(inputs) if len(inputs.shape) == 4 else inputs
        se = Dense(inputs.shape[-1] // reduction, activation='relu')(se)
        se = Dense(inputs.shape[-1], activation='sigmoid')(se)
        
        if len(inputs.shape) == 4:
            se = Reshape((1, 1, inputs.shape[-1]))(se)
            return Multiply()([inputs, se])
        else:
            return Multiply()([inputs, se])
    
    def apply_cutmix(self, images, alpha=1.0):
        """Apply CutMix augmentation"""
        # Simplified CutMix implementation
        # In production, use tf.image operations
        return images  # Placeholder for actual CutMix
    
    def create_advanced_callbacks(self, model_name="ultra_advanced_model"):
        """Create comprehensive callback system"""
        
        callbacks = [
            # Advanced learning rate scheduling
            CosineRestartScheduler(
                first_restart_step=50,
                m_mul=1.5,
                t_mul=2.0,
                alpha=1e-6
            ),
            
            # Model checkpointing with best weights
            ModelCheckpoint(
                f'{model_name}_best.h5',
                monitor='val_accuracy',
                save_best_only=True,
                save_weights_only=False,
                mode='max',
                verbose=1
            ),
            
            # Early stopping with patience
            EarlyStopping(
                monitor='val_loss',
                patience=15,
                restore_best_weights=True,
                verbose=1
            ),
            
            # TensorBoard logging
            TensorBoard(
                log_dir=f'./logs/{model_name}',
                histogram_freq=1,
                write_graph=True,
                update_freq='epoch'
            ),
            
            # Custom callback for fine-tuning
            FineTuningCallback(self.base_model, unfreeze_epoch=30),
            
            # Model pruning for deployment
            # tfmot.sparsity.keras.UpdatePruningStep()
        ]
        
        return callbacks
    
    def train_with_advanced_strategy(self, train_ds, val_ds, epochs=100):
        """Ultra-advanced training strategy"""
        
        # Create callbacks
        callbacks = self.create_advanced_callbacks()
        
        # Progressive resizing strategy
        initial_epochs = 30
        
        print("🚀 Phase 1: Initial training with frozen backbone")
        
        # Phase 1: Train with frozen backbone
        history1 = self.model.fit(
            train_ds,
            validation_data=val_ds,
            epochs=initial_epochs,
            callbacks=callbacks[:3],  # Exclude fine-tuning callback
            verbose=1
        )
        
        print("🔓 Phase 2: Fine-tuning with unfrozen layers")
        
        # Phase 2: Unfreeze and fine-tune
        self.base_model.trainable = True
        
        # Lower learning rate for fine-tuning
        self.model.optimizer.learning_rate = 1e-5
        
        # Compile again with lower learning rate
        self.model.compile(
            optimizer=self.model.optimizer,
            loss=self.model.loss,
            metrics=self.model.metrics
        )
        
        # Continue training
        history2 = self.model.fit(
            train_ds,
            validation_data=val_ds,
            initial_epoch=initial_epochs,
            epochs=epochs,
            callbacks=callbacks,
            verbose=1
        )
        
        return history1, history2
    
    def optimize_for_deployment(self):
        """Optimize model for production deployment"""
        
        # Model quantization
        converter = tf.lite.TFLiteConverter.from_keras_model(self.model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        
        # Post-training quantization
        converter.target_spec.supported_types = [tf.float16]
        
        # Convert to TensorFlow Lite
        tflite_model = converter.convert()
        
        # Save optimized model
        with open('ultra_advanced_model.tflite', 'wb') as f:
            f.write(tflite_model)
        
        print("✅ Model optimized and saved for deployment")
        
        # Calculate model size
        original_size = self.model.count_params() * 4 / (1024 * 1024)  # MB
        optimized_size = len(tflite_model) / (1024 * 1024)  # MB
        compression_ratio = original_size / optimized_size
        
        print(f"📊 Original model: {original_size:.2f} MB")
        print(f"🗜️  Optimized model: {optimized_size:.2f} MB")
        print(f"⚡ Compression ratio: {compression_ratio:.2f}x")
        
        return tflite_model

class FineTuningCallback(Callback):
    """Custom callback for progressive fine-tuning"""
    
    def __init__(self, base_model, unfreeze_epoch=30):
        super().__init__()
        self.base_model = base_model
        self.unfreeze_epoch = unfreeze_epoch
    
    def on_epoch_begin(self, epoch, logs=None):
        if epoch == self.unfreeze_epoch:
            print(f"🔓 Unfreezing base model at epoch {epoch}")
            self.base_model.trainable = True
            
            # Reduce learning rate
            tf.keras.backend.set_value(
                self.model.optimizer.learning_rate, 
                1e-5
            )

class CosineRestartScheduler(Callback):
    """Cosine annealing with warm restarts"""
    
    def __init__(self, first_restart_step, m_mul=1.0, t_mul=2.0, alpha=0.0):
        super().__init__()
        self.first_restart_step = first_restart_step
        self.m_mul = m_mul
        self.t_mul = t_mul
        self.alpha = alpha
        
    def on_epoch_begin(self, epoch, logs=None):
        # Simplified cosine restart implementation
        # In production: implement full SGDR logic
        pass

# Production deployment example
def main():
    print("🚀 Ultra-Advanced Keras Production System")
    
    # Initialize ultra-advanced system
    system = UltraAdvancedKerasSystem(num_classes=10)
    
    # Create state-of-the-art model
    model = system.create_ultra_advanced_model()
    
    print("📋 Ultra-Advanced Model Architecture:")
    print(f"Parameters: {model.count_params():,}")
    print(f"Trainable parameters: {sum([tf.keras.backend.count_params(w) for w in model.trainable_weights]):,}")
    
    # Example data preparation (in production: real ImageDataGenerator)
    print("📊 Preparing production data pipeline...")
    
    # Simulate training completion
    print("✅ Model ready for ultra-advanced training!")
    print("🎯 Next: Deploy to production with TensorFlow Serving")

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="keras-ultra-advanced"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Model Serving & Deployment */}
          <section id="deployment" className="mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Model Serving & Deployment: From Lab to Production
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                The journey from trained model to production system requires sophisticated deployment strategies, 
                monitoring, and scaling. This is where AI transforms from research to real-world impact.
              </p>

              <div className="space-y-8">
                {/* Session 48 */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-800 dark:text-orange-200">
                    Session 48 – Model Optimization & Export for Production
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Before deployment, models must be optimized for production environments. This includes 
                    quantization, pruning, and format conversion for different deployment targets.
                  </p>
                  <EditableCodeBlock
                    title="Production Model Optimization Pipeline"
                    language="python"
                    code={`import tensorflow as tf
import tensorflow_model_optimization as tfmot
from tensorflow_model_optimization.python.core.sparsity.keras import prune
import numpy as np
import pickle
import json
from pathlib import Path

class ProductionModelOptimizer:
    """
    Comprehensive model optimization for production deployment
    Used by: Netflix, Uber, Google for serving billions of predictions
    """
    
    def __init__(self, model_path):
        self.model = tf.keras.models.load_model(model_path)
        self.optimized_models = {}
        self.benchmarks = {}
    
    def quantize_model(self, quantization_type='dynamic'):
        """Apply different types of quantization"""
        
        print("🔧 Starting model quantization...")
        
        if quantization_type == 'dynamic':
            # Dynamic range quantization (fastest)
            converter = tf.lite.TFLiteConverter.from_keras_model(self.model)
            converter.optimizations = [tf.lite.Optimize.DEFAULT]
            quantized_model = converter.convert()
            
        elif quantization_type == 'float16':
            # Float16 quantization (good balance)
            converter = tf.lite.TFLiteConverter.from_keras_model(self.model)
            converter.optimizations = [tf.lite.Optimize.DEFAULT]
            converter.target_spec.supported_types = [tf.float16]
            quantized_model = converter.convert()
            
        elif quantization_type == 'int8':
            # Integer quantization (smallest, needs calibration data)
            converter = tf.lite.TFLiteConverter.from_keras_model(self.model)
            converter.optimizations = [tf.lite.Optimize.DEFAULT]
            
            # Representative dataset for calibration
            def representative_data_gen():
                for _ in range(100):
                    # Use real calibration data in production
                    yield [np.random.random((1, 224, 224, 3)).astype(np.float32)]
            
            converter.representative_dataset = representative_data_gen
            converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
            converter.inference_input_type = tf.int8
            converter.inference_output_type = tf.int8
            
            quantized_model = converter.convert()
        
        self.optimized_models[f'quantized_{quantization_type}'] = quantized_model
        return quantized_model
    
    def prune_model(self, sparsity=0.5):
        """Apply magnitude-based pruning"""
        
        print(f"✂️  Pruning model with {sparsity*100}% sparsity...")
        
        # Define pruning schedule
        end_step = 1000  # Total training steps
        
        pruning_params = {
            'pruning_schedule': tfmot.sparsity.keras.PolynomialDecay(
                initial_sparsity=0.0,
                final_sparsity=sparsity,
                begin_step=200,
                end_step=end_step
            )
        }
        
        # Apply pruning to dense layers
        def apply_pruning_to_dense(layer):
            if isinstance(layer, tf.keras.layers.Dense):
                return tfmot.sparsity.keras.prune_low_magnitude(layer, **pruning_params)
            return layer
        
        # Clone and prune model
        pruned_model = tf.keras.models.clone_model(
            self.model,
            clone_function=apply_pruning_to_dense,
        )
        
        self.optimized_models['pruned'] = pruned_model
        return pruned_model
    
    def convert_to_tensorrt(self, precision='FP16'):
        """Convert to TensorRT for NVIDIA GPU deployment"""
        
        print(f"🚀 Converting to TensorRT with {precision} precision...")
        
        try:
            from tensorflow.python.compiler.tensorrt import trt_convert as trt
            
            # Save model in SavedModel format first
            saved_model_dir = "temp_saved_model"
            tf.saved_model.save(self.model, saved_model_dir)
            
            # Convert to TensorRT
            if precision == 'FP32':
                precision_mode = trt.TrtPrecisionMode.FP32
            elif precision == 'FP16':
                precision_mode = trt.TrtPrecisionMode.FP16
            else:  # INT8
                precision_mode = trt.TrtPrecisionMode.INT8
            
            conversion_params = trt.DEFAULT_TRT_CONVERSION_PARAMS._replace(
                precision_mode=precision_mode,
                maximum_cached_engines=100
            )
            
            converter = trt.TrtGraphConverterV2(
                input_saved_model_dir=saved_model_dir,
                conversion_params=conversion_params
            )
            
            converter.convert()
            converter.save("tensorrt_model")
            
            print("✅ TensorRT conversion completed")
            
        except ImportError:
            print("❌ TensorRT not available. Install tensorflow-tensorrt")
    
    def export_for_serving(self, export_path="production_model"):
        """Export model for TensorFlow Serving"""
        
        print("📦 Exporting for TensorFlow Serving...")
        
        # Create serving signature
        @tf.function
        def serving_fn(input_tensor):
            return {'predictions': self.model(input_tensor)}
        
        # Get concrete function
        concrete_fn = serving_fn.get_concrete_function(
            tf.TensorSpec(shape=[None, 224, 224, 3], dtype=tf.float32)
        )
        
        # Save with serving signature
        tf.saved_model.save(
            self.model,
            export_path,
            signatures={'serving_default': concrete_fn}
        )
        
        print(f"✅ Model exported to {export_path}")
        
        # Create model metadata
        metadata = {
            'model_name': 'production_classifier',
            'version': '1.0.0',
            'input_shape': [224, 224, 3],
            'num_classes': self.model.output_shape[-1],
            'preprocessing': 'imagenet_normalization',
            'created_at': str(tf.timestamp()),
            'framework': 'tensorflow',
            'optimization': 'standard'
        }
        
        with open(f"{export_path}/metadata.json", 'w') as f:
            json.dump(metadata, f, indent=2)
    
    def benchmark_models(self, test_data_shape=(1, 224, 224, 3)):
        """Benchmark different optimizations"""
        
        print("📊 Benchmarking model variants...")
        
        # Original model benchmark
        original_size = self.get_model_size(self.model)
        original_latency = self.measure_latency(self.model, test_data_shape)
        
        self.benchmarks['original'] = {
            'size_mb': original_size,
            'latency_ms': original_latency,
            'throughput_fps': 1000 / original_latency
        }
        
        # Benchmark quantized models
        for name, model_bytes in self.optimized_models.items():
            if 'quantized' in name:
                size_mb = len(model_bytes) / (1024 * 1024)
                # Benchmark TFLite model (simplified)
                latency_ms = original_latency * 0.6  # Typical speedup
                
                self.benchmarks[name] = {
                    'size_mb': size_mb,
                    'latency_ms': latency_ms,
                    'throughput_fps': 1000 / latency_ms,
                    'compression_ratio': original_size / size_mb
                }
        
        # Print benchmark results
        print("\\n📈 Benchmark Results:")
        print("=" * 80)
        for name, metrics in self.benchmarks.items():
            print(f"Model: {name}")
            print(f"  Size: {metrics['size_mb']:.2f} MB")
            print(f"  Latency: {metrics['latency_ms']:.2f} ms")
            print(f"  Throughput: {metrics['throughput_fps']:.1f} FPS")
            if 'compression_ratio' in metrics:
                print(f"  Compression: {metrics['compression_ratio']:.1f}x")
            print("-" * 40)
    
    def get_model_size(self, model):
        """Calculate model size in MB"""
        param_count = model.count_params()
        # Assume float32 parameters
        size_mb = (param_count * 4) / (1024 * 1024)
        return size_mb
    
    def measure_latency(self, model, input_shape, num_runs=100):
        """Measure model inference latency"""
        
        # Create dummy input
        dummy_input = tf.random.normal(input_shape)
        
        # Warmup
        for _ in range(10):
            _ = model(dummy_input)
        
        # Measure
        start_time = tf.timestamp()
        for _ in range(num_runs):
            _ = model(dummy_input)
        end_time = tf.timestamp()
        
        avg_latency_ms = ((end_time - start_time) * 1000) / num_runs
        return float(avg_latency_ms)

# Production optimization pipeline
def main():
    print("🏭 Production Model Optimization Pipeline")
    
    # Load trained model (replace with actual model path)
    # optimizer = ProductionModelOptimizer('trained_model.h5')
    
    print("🔧 Available optimizations:")
    print("1. Dynamic quantization (fastest deployment)")
    print("2. Float16 quantization (good balance)")
    print("3. Int8 quantization (smallest size)")
    print("4. Model pruning (remove redundant connections)")
    print("5. TensorRT conversion (NVIDIA GPU acceleration)")
    print("6. TensorFlow Serving export")
    
    # Example optimization workflow
    print("\\n⚡ Optimization workflow:")
    print("1. Quantize model for mobile deployment")
    print("2. Prune model for edge devices")
    print("3. Convert to TensorRT for GPU serving")
    print("4. Export for TensorFlow Serving")
    print("5. Benchmark all variants")
    
    print("\\n✅ Production optimization pipeline ready!")

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="model-optimization"
                  />
                </div>

                {/* Session 49 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
                    Session 49 – Deploy AI with Style: Streamlit, Flask & Hugging Face
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Transform your AI models into beautiful, interactive applications that users love. 
                    From rapid prototypes to production-ready web services.
                  </p>
                  <EditableCodeBlock
                    title="Multi-Platform AI Deployment Suite"
                    language="python"
                    code={`# 🎨 Streamlit Deployment - Beautiful AI Apps in Minutes

import streamlit as st
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import plotly.graph_objects as go
import plotly.express as px

# File: streamlit_ai_app.py
class StreamlitAIApp:
    """
    Beautiful AI application with Streamlit
    Perfect for: Demos, prototypes, internal tools
    """
    
    def __init__(self):
        self.model = None
        self.load_model()
    
    @st.cache_resource
    def load_model(_self):
        """Load model with caching for performance"""
        # In production: load your trained model
        # return tf.keras.models.load_model('production_model.h5')
        return None  # Placeholder
    
    def run_app(self):
        """Main Streamlit application"""
        
        # Beautiful header
        st.set_page_config(
            page_title="AI Vision Studio",
            page_icon="🎯",
            layout="wide",
            initial_sidebar_state="expanded"
        )
        
        # Custom CSS for styling
        st.markdown("""
        <style>
        .main-header {
            font-size: 3rem;
            color: #1f77b4;
            text-align: center;
            margin-bottom: 2rem;
        }
        .prediction-box {
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            padding: 1rem;
            border-radius: 10px;
            color: white;
            text-align: center;
        }
        </style>
        """, unsafe_allow_html=True)
        
        # Header
        st.markdown('<h1 class="main-header">🎯 AI Vision Studio</h1>', 
                   unsafe_allow_html=True)
        
        # Sidebar
        st.sidebar.title("🛠️ Controls")
        app_mode = st.sidebar.selectbox(
            "Choose App Mode",
            ["Image Classification", "Object Detection", "Style Transfer"]
        )
        
        if app_mode == "Image Classification":
            self.image_classification_interface()
        elif app_mode == "Object Detection":
            self.object_detection_interface()
        else:
            self.style_transfer_interface()
    
    def image_classification_interface(self):
        """Image classification interface"""
        
        col1, col2 = st.columns([1, 1])
        
        with col1:
            st.subheader("📸 Upload Image")
            uploaded_file = st.file_uploader(
                "Choose an image...",
                type=['jpg', 'jpeg', 'png'],
                help="Upload an image for classification"
            )
            
            if uploaded_file:
                # Display image
                image = Image.open(uploaded_file)
                st.image(image, caption="Uploaded Image", use_column_width=True)
                
                # Analysis button
                if st.button("🔍 Analyze Image", type="primary"):
                    with st.spinner("🧠 AI is thinking..."):
                        results = self.predict_image(image)
                        st.session_state['results'] = results
        
        with col2:
            st.subheader("🎯 Predictions")
            
            if 'results' in st.session_state:
                results = st.session_state['results']
                
                # Display top prediction
                st.markdown(f"""
                <div class="prediction-box">
                    <h2>{results['top_prediction']}</h2>
                    <h3>Confidence: {results['confidence']:.1%}</h3>
                </div>
                """, unsafe_allow_html=True)
                
                # Confidence chart
                fig = px.bar(
                    x=results['classes'],
                    y=results['probabilities'],
                    title="Prediction Confidence",
                    color=results['probabilities'],
                    color_continuous_scale="viridis"
                )
                st.plotly_chart(fig, use_container_width=True)
    
    def predict_image(self, image):
        """Mock prediction function"""
        # Simulate AI prediction
        classes = ['Cat', 'Dog', 'Car', 'Airplane', 'Ship']
        probabilities = np.random.dirichlet(np.ones(5))
        
        top_idx = np.argmax(probabilities)
        
        return {
            'top_prediction': classes[top_idx],
            'confidence': probabilities[top_idx],
            'classes': classes,
            'probabilities': probabilities.tolist()
        }

# 🌐 Flask API Deployment - Production Web Service

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io

# File: flask_ai_api.py
class FlaskAIAPI:
    """
    Production-ready Flask API for AI model serving
    Features: REST API, authentication, monitoring, scaling
    """
    
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.model = None
        self.setup_routes()
        self.setup_monitoring()
    
    def setup_routes(self):
        """Setup API routes"""
        
        @self.app.route('/health', methods=['GET'])
        def health_check():
            """Health check endpoint"""
            return jsonify({
                'status': 'healthy',
                'model_loaded': self.model is not None,
                'version': '1.0.0'
            })
        
        @self.app.route('/predict', methods=['POST'])
        def predict():
            """Main prediction endpoint"""
            try:
                # Parse request
                data = request.get_json()
                
                if 'image' not in data:
                    return jsonify({'error': 'No image provided'}), 400
                
                # Decode base64 image
                image_data = base64.b64decode(data['image'])
                image = Image.open(io.BytesIO(image_data))
                
                # Make prediction
                result = self.process_prediction(image)
                
                return jsonify({
                    'success': True,
                    'prediction': result['class'],
                    'confidence': float(result['confidence']),
                    'all_predictions': result['all_predictions'],
                    'processing_time_ms': result['processing_time']
                })
                
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': str(e)
                }), 500
        
        @self.app.route('/batch_predict', methods=['POST'])
        def batch_predict():
            """Batch prediction endpoint for high throughput"""
            try:
                data = request.get_json()
                images = data.get('images', [])
                
                if not images:
                    return jsonify({'error': 'No images provided'}), 400
                
                # Process batch
                results = []
                for img_data in images:
                    image_bytes = base64.b64decode(img_data)
                    image = Image.open(io.BytesIO(image_bytes))
                    result = self.process_prediction(image)
                    results.append(result)
                
                return jsonify({
                    'success': True,
                    'batch_size': len(results),
                    'results': results
                })
                
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': str(e)
                }), 500
    
    def process_prediction(self, image):
        """Process single image prediction"""
        import time
        start_time = time.time()
        
        # Simulate prediction
        classes = ['Cat', 'Dog', 'Car', 'Airplane', 'Ship']
        probabilities = np.random.dirichlet(np.ones(5))
        
        top_idx = np.argmax(probabilities)
        processing_time = (time.time() - start_time) * 1000
        
        return {
            'class': classes[top_idx],
            'confidence': probabilities[top_idx],
            'all_predictions': {cls: float(prob) for cls, prob in zip(classes, probabilities)},
            'processing_time': processing_time
        }
    
    def setup_monitoring(self):
        """Setup API monitoring and metrics"""
        
        @self.app.before_request
        def before_request():
            request.start_time = time.time()
        
        @self.app.after_request
        def after_request(response):
            # Log request metrics
            duration = time.time() - request.start_time
            
            # In production: send to monitoring system
            print(f"API Request: {request.method} {request.path} - "
                  f"{response.status_code} - {duration:.3f}s")
            
            return response
    
    def run(self, host='0.0.0.0', port=5000, debug=False):
        """Run Flask API"""
        self.app.run(host=host, port=port, debug=debug)

# 🤗 Hugging Face Deployment - Share with the World

from huggingface_hub import HfApi, Repository
import gradio as gr

class HuggingFaceDeployer:
    """
    Deploy AI models to Hugging Face Spaces
    Features: Public sharing, automatic scaling, beautiful UI
    """
    
    def __init__(self, model_name="ai-vision-demo"):
        self.model_name = model_name
        self.hf_api = HfApi()
    
    def create_gradio_interface(self):
        """Create beautiful Gradio interface"""
        
        def predict_with_gradio(image):
            """Gradio prediction function"""
            # Process image
            if image is None:
                return "No image uploaded", {}, None
            
            # Simulate prediction
            classes = ['Cat 🐱', 'Dog 🐶', 'Car 🚗', 'Airplane ✈️', 'Ship 🚢']
            probabilities = np.random.dirichlet(np.ones(5))
            
            # Create confidence dictionary
            confidence_dict = {cls: float(prob) for cls, prob in zip(classes, probabilities)}
            
            # Top prediction
            top_prediction = classes[np.argmax(probabilities)]
            
            return top_prediction, confidence_dict, image
        
        # Create interface
        demo = gr.Interface(
            fn=predict_with_gradio,
            inputs=[
                gr.Image(type="pil", label="Upload Image 📸")
            ],
            outputs=[
                gr.Textbox(label="Prediction 🎯"),
                gr.Label(label="Confidence Scores 📊"),
                gr.Image(label="Processed Image")
            ],
            title="🚀 AI Vision Studio",
            description="Upload an image and get instant AI-powered predictions!",
            article="Built with ❤️ using TensorFlow and Hugging Face",
            theme=gr.themes.Soft(),
            examples=[
                ["demo_cat.jpg"],
                ["demo_dog.jpg"],
                ["demo_car.jpg"]
            ]
        )
        
        return demo
    
    def deploy_to_spaces(self):
        """Deploy to Hugging Face Spaces"""
        
        print("🚀 Deploying to Hugging Face Spaces...")
        
        # Create app.py for Spaces
        app_code = '''
import gradio as gr
import numpy as np

def predict(image):
    """AI prediction function"""
    if image is None:
        return "No image uploaded", {}
    
    # Your model prediction here
    classes = ['Cat 🐱', 'Dog 🐶', 'Car 🚗', 'Airplane ✈️', 'Ship 🚢']
    probabilities = np.random.dirichlet(np.ones(5))
    
    confidence_dict = {cls: float(prob) for cls, prob in zip(classes, probabilities)}
    top_prediction = classes[np.argmax(probabilities)]
    
    return top_prediction, confidence_dict

demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil", label="Upload Image 📸"),
    outputs=[
        gr.Textbox(label="Prediction 🎯"),
        gr.Label(label="Confidence Scores 📊")
    ],
    title="🚀 AI Vision Studio",
    description="Upload an image and get instant AI-powered predictions!"
)

if __name__ == "__main__":
    demo.launch()
        '''
        
        # Create requirements.txt
        requirements = '''
gradio==3.50.0
numpy==1.24.3
tensorflow==2.13.0
Pillow==10.0.0
        '''
        
        print("📝 Created app.py and requirements.txt")
        print("🌐 Push to Hugging Face repository to deploy!")
        print(f"🔗 Your app will be available at: https://huggingface.co/spaces/YOUR_USERNAME/{self.model_name}")

# Usage Examples
def main():
    print("🎨 AI Deployment Suite - Choose Your Platform:")
    print("1. 📱 Streamlit - Beautiful prototypes")
    print("2. 🌐 Flask API - Production web service")
    print("3. 🤗 Hugging Face - Share with the world")
    
    # Example: Streamlit App
    print("\\n🚀 Starting Streamlit demo...")
    # streamlit_app = StreamlitAIApp()
    # streamlit_app.run_app()  # Run with: streamlit run streamlit_ai_app.py
    
    # Example: Flask API
    print("🌐 Flask API ready for production...")
    # flask_api = FlaskAIAPI()
    # flask_api.run(host='0.0.0.0', port=5000)
    
    # Example: Hugging Face Deployment
    print("🤗 Hugging Face deployment prepared...")
    # hf_deployer = HuggingFaceDeployer()
    # demo = hf_deployer.create_gradio_interface()
    # demo.launch(share=True)

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="ai-deployment-platforms"
                  />
                </div>

                {/* Session 50 */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-200">
                    Session 50 – Deploying & Scaling Deep Learning Apps (Advanced Level)
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Enterprise-grade deployment with Docker, Kubernetes, load balancing, and monitoring. 
                    This is how AI systems serve millions of users with millisecond response times.
                  </p>
                  <EditableCodeBlock
                    title="Enterprise Deep Learning Deployment Architecture"
                    language="python"
                    code={`# 🏗️ Production Deployment Architecture

import docker
import kubernetes
from prometheus_client import Counter, Histogram, generate_latest
import redis
import asyncio
import uvicorn
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import json
import time
from typing import List, Dict, Any

# === 🚀 FastAPI Production Server ===

class ProductionMLServer:
    """
    Enterprise-grade ML serving with FastAPI
    Features: Async processing, monitoring, caching, auto-scaling
    """
    
    def __init__(self):
        self.app = FastAPI(
            title="Production ML API",
            description="Enterprise deep learning serving platform",
            version="2.0.0"
        )
        
        # Metrics
        self.request_count = Counter('ml_requests_total', 'Total ML requests')
        self.request_duration = Histogram('ml_request_duration_seconds', 'Request duration')
        self.prediction_accuracy = Counter('ml_predictions_total', 'Total predictions', ['model_version'])
        
        # Redis for caching
        self.redis_client = redis.Redis(host='redis', port=6379, db=0)
        
        # Model registry
        self.models = {}
        self.load_models()
        
        self.setup_routes()
        self.setup_middleware()
    
    def load_models(self):
        """Load multiple model versions"""
        try:
            # Load production model
            self.models['v1'] = tf.keras.models.load_model('/models/production_v1.h5')
            
            # Load canary model for A/B testing
            self.models['v2'] = tf.keras.models.load_model('/models/canary_v2.h5')
            
            print("✅ Models loaded successfully")
        except Exception as e:
            print(f"❌ Model loading failed: {e}")
    
    def setup_middleware(self):
        """Setup production middleware"""
        
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        @self.app.middleware("http")
        async def add_process_time_header(request, call_next):
            start_time = time.time()
            response = await call_next(request)
            process_time = time.time() - start_time
            response.headers["X-Process-Time"] = str(process_time)
            return response
    
    def setup_routes(self):
        """Setup API routes"""
        
        @self.app.get("/health")
        async def health_check():
            """Health check for load balancer"""
            return {
                "status": "healthy",
                "models_loaded": len(self.models),
                "timestamp": time.time()
            }
        
        @self.app.get("/metrics")
        async def metrics():
            """Prometheus metrics endpoint"""
            return generate_latest()
        
        @self.app.post("/predict")
        async def predict(
            request: Dict[str, Any],
            background_tasks: BackgroundTasks
        ):
            """High-performance prediction endpoint"""
            
            with self.request_duration.time():
                self.request_count.inc()
                
                try:
                    # Extract data
                    image_data = request.get('image')
                    model_version = request.get('model_version', 'v1')
                    
                    # Check cache first
                    cache_key = f"prediction:{hash(str(image_data))}"
                    cached_result = self.redis_client.get(cache_key)
                    
                    if cached_result:
                        return json.loads(cached_result)
                    
                    # A/B testing logic
                    if model_version == 'auto':
                        model_version = self.select_model_for_ab_test()
                    
                    # Make prediction
                    result = await self.make_prediction(image_data, model_version)
                    
                    # Cache result
                    self.redis_client.setex(
                        cache_key, 
                        300,  # 5 minutes TTL
                        json.dumps(result)
                    )
                    
                    # Background logging
                    background_tasks.add_task(
                        self.log_prediction,
                        result,
                        model_version
                    )
                    
                    return result
                    
                except Exception as e:
                    raise HTTPException(status_code=500, detail=str(e))
        
        @self.app.post("/batch_predict")
        async def batch_predict(request: Dict[str, Any]):
            """Batch prediction for high throughput"""
            
            images = request.get('images', [])
            model_version = request.get('model_version', 'v1')
            
            # Process in parallel
            tasks = [
                self.make_prediction(img, model_version) 
                for img in images
            ]
            
            results = await asyncio.gather(*tasks)
            
            return {
                "predictions": results,
                "batch_size": len(results),
                "model_version": model_version
            }
    
    async def make_prediction(self, image_data: str, model_version: str):
        """Async prediction with error handling"""
        
        try:
            # Preprocess image (simplified)
            # In production: decode base64, resize, normalize
            processed_input = self.preprocess_image(image_data)
            
            # Get model
            model = self.models.get(model_version)
            if not model:
                raise ValueError(f"Model version {model_version} not found")
            
            # Predict
            prediction = model.predict(processed_input)
            
            # Post-process
            result = self.postprocess_prediction(prediction, model_version)
            
            # Update metrics
            self.prediction_accuracy.labels(model_version=model_version).inc()
            
            return result
            
        except Exception as e:
            print(f"Prediction error: {e}")
            raise
    
    def select_model_for_ab_test(self):
        """A/B testing model selection"""
        import random
        # 90% traffic to v1, 10% to v2
        return 'v2' if random.random() < 0.1 else 'v1'
    
    def preprocess_image(self, image_data: str):
        """Image preprocessing pipeline"""
        # Simplified preprocessing
        # In production: decode, resize, normalize
        return [[[[0.5, 0.5, 0.5]]]]  # Dummy input
    
    def postprocess_prediction(self, prediction, model_version):
        """Post-process model output"""
        return {
            "class": "demo_class",
            "confidence": float(prediction[0][0]) if len(prediction) > 0 else 0.5,
            "model_version": model_version,
            "timestamp": time.time()
        }
    
    async def log_prediction(self, result, model_version):
        """Background logging for analytics"""
        # In production: send to analytics platform
        print(f"Logged prediction: {result['class']} (v{model_version})")

# === 🐳 Docker Configuration ===

DOCKERFILE = '''
FROM tensorflow/tensorflow:2.13.0-gpu

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application
COPY . /app
WORKDIR /app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
'''

# === ☸️ Kubernetes Deployment ===

KUBERNETES_DEPLOYMENT = '''
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-api-deployment
  labels:
    app: ml-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-api
  template:
    metadata:
      labels:
        app: ml-api
    spec:
      containers:
      - name: ml-api
        image: your-registry/ml-api:latest
        ports:
        - containerPort: 8000
        env:
        - name: MODEL_PATH
          value: "/models"
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
            nvidia.com/gpu: 1
          limits:
            memory: "4Gi"
            cpu: "2000m"
            nvidia.com/gpu: 1
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ml-api-service
spec:
  selector:
    app: ml-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-api-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
'''

# === 📊 Monitoring & Observability ===

class MLMonitoringStack:
    """
    Comprehensive monitoring for ML systems
    Features: Metrics, logging, alerting, model drift detection
    """
    
    def __init__(self):
        self.setup_prometheus_metrics()
        self.setup_grafana_dashboards()
        self.setup_alerting()
    
    def setup_prometheus_metrics(self):
        """Define custom metrics for ML monitoring"""
        
        # Model performance metrics
        self.model_latency = Histogram(
            'model_inference_duration_seconds',
            'Model inference latency',
            ['model_version', 'endpoint']
        )
        
        self.model_accuracy = Counter(
            'model_predictions_total',
            'Total model predictions',
            ['model_version', 'predicted_class', 'confidence_bucket']
        )
        
        # System metrics
        self.gpu_utilization = Histogram(
            'gpu_utilization_percent',
            'GPU utilization percentage'
        )
        
        self.memory_usage = Histogram(
            'memory_usage_bytes',
            'Memory usage in bytes'
        )
    
    def setup_grafana_dashboards(self):
        """Grafana dashboard configuration"""
        
        dashboard_config = {
            "dashboard": {
                "title": "ML Production Monitoring",
                "panels": [
                    {
                        "title": "Request Rate",
                        "type": "graph",
                        "targets": [{"expr": "rate(ml_requests_total[5m])"}]
                    },
                    {
                        "title": "Model Latency",
                        "type": "graph", 
                        "targets": [{"expr": "histogram_quantile(0.95, model_inference_duration_seconds)"}]
                    },
                    {
                        "title": "Error Rate",
                        "type": "singlestat",
                        "targets": [{"expr": "rate(ml_errors_total[5m])"}]
                    },
                    {
                        "title": "Model Accuracy Distribution",
                        "type": "heatmap",
                        "targets": [{"expr": "model_predictions_total"}]
                    }
                ]
            }
        }
        
        return dashboard_config
    
    def setup_alerting(self):
        """Alert rules for production ML systems"""
        
        alert_rules = {
            "groups": [
                {
                    "name": "ml_alerts",
                    "rules": [
                        {
                            "alert": "HighErrorRate",
                            "expr": "rate(ml_errors_total[5m]) > 0.05",
                            "for": "2m",
                            "annotations": {
                                "summary": "ML API error rate is above 5%"
                            }
                        },
                        {
                            "alert": "HighLatency",
                            "expr": "histogram_quantile(0.95, model_inference_duration_seconds) > 1.0",
                            "for": "5m",
                            "annotations": {
                                "summary": "ML API latency is above 1 second"
                            }
                        },
                        {
                            "alert": "ModelDrift",
                            "expr": "model_accuracy_drift > 0.1",
                            "for": "10m",
                            "annotations": {
                                "summary": "Model performance has degraded significantly"
                            }
                        }
                    ]
                }
            ]
        }
        
        return alert_rules

# === 🚀 Deployment Orchestration ===

class DeploymentOrchestrator:
    """
    Orchestrate complex ML deployments
    Features: Blue-green deployment, canary releases, rollback
    """
    
    def __init__(self):
        self.docker_client = docker.from_env()
        self.k8s_client = None  # Initialize Kubernetes client
    
    def deploy_canary(self, new_model_version, traffic_percentage=10):
        """Deploy canary version with gradual traffic shift"""
        
        print(f"🚀 Deploying canary version {new_model_version}")
        print(f"📊 Routing {traffic_percentage}% traffic to canary")
        
        # Update Kubernetes deployment
        deployment_config = {
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "metadata": {"name": f"ml-api-canary-{new_model_version}"},
            "spec": {
                "replicas": max(1, int(3 * traffic_percentage / 100)),
                # ... rest of deployment config
            }
        }
        
        # Deploy canary
        # self.k8s_client.create_namespaced_deployment(
        #     namespace="production",
        #     body=deployment_config
        # )
        
        print("✅ Canary deployment successful")
    
    def blue_green_deployment(self, new_version):
        """Blue-green deployment for zero-downtime updates"""
        
        print(f"🔄 Starting blue-green deployment to version {new_version}")
        
        # Deploy green environment
        print("1. Deploying green environment...")
        # ... deployment logic
        
        # Health checks
        print("2. Running health checks...")
        # ... health check logic
        
        # Switch traffic
        print("3. Switching traffic to green...")
        # ... traffic switching logic
        
        # Cleanup old blue environment
        print("4. Cleaning up blue environment...")
        # ... cleanup logic
        
        print("✅ Blue-green deployment completed")
    
    def rollback_deployment(self, previous_version):
        """Emergency rollback to previous version"""
        
        print(f"🔴 Emergency rollback to version {previous_version}")
        
        # Immediate traffic switch
        # ... rollback logic
        
        print("✅ Rollback completed")

# === 📈 Usage Example ===

def main():
    print("🏭 Enterprise Deep Learning Deployment")
    print("=" * 50)
    
    print("🚀 Production ML Server starting...")
    server = ProductionMLServer()
    
    print("📊 Monitoring stack initialized...")
    monitoring = MLMonitoringStack()
    
    print("🔄 Deployment orchestrator ready...")
    orchestrator = DeploymentOrchestrator()
    
    print("\\n✅ Enterprise deployment architecture ready!")
    print("📋 Features enabled:")
    print("  - FastAPI async server")
    print("  - Redis caching")
    print("  - Prometheus metrics")
    print("  - Grafana dashboards")
    print("  - Kubernetes auto-scaling")
    print("  - Blue-green deployments")
    print("  - Canary releases")
    print("  - Automated rollbacks")
    
    # Start server
    # uvicorn.run(server.app, host="0.0.0.0", port=8000, workers=4)

if __name__ == "__main__":
    main()`}
                    page="machine-learning"
                    section="enterprise-deployment"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* The Future of AI */}
          <section id="next-chapter" className="mb-16">
            <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-8 border border-violet-200 dark:border-violet-800 shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                The Path Ahead: Advanced ML & Deployment
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  You've journeyed from Python fundamentals through data manipulation, visualization, 
                  and now machine learning. You've built systems that can see, understand language, 
                  and make intelligent decisions. But the revolution is just beginning.
                </p>
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 border border-violet-200 dark:border-violet-700">
                  <h3 className="text-xl font-semibold mb-4 text-violet-800 dark:text-violet-200">
                    What Awaits in Advanced ML & Deployment:
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🚀 <strong>MLOps & Production Pipelines:</strong> From notebook to production at scale</li>
                    <li>⚡ <strong>Model Optimization:</strong> Quantization, pruning, and edge deployment</li>
                    <li>🌐 <strong>Distributed Training:</strong> Training models across multiple GPUs and machines</li>
                    <li>📊 <strong>Model Monitoring:</strong> Detecting drift and maintaining performance</li>
                    <li>🔄 <strong>Continuous Learning:</strong> Models that improve over time</li>
                    <li>🏗️ <strong>AI Infrastructure:</strong> Building scalable AI systems</li>
                  </ul>
                </div>
                <blockquote className="border-l-4 border-violet-500 pl-6 italic text-xl text-muted-foreground mt-8">
                  "The goal is to turn data into information, and information into insight." - Carly Fiorina
                </blockquote>
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
                path: "/mastery", 
                title: "Mastery"
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
