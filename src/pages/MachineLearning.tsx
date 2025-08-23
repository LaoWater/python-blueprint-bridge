import React from 'react';
import { useTheme } from 'next-themes';
import EditablePageHeader from '@/components/EditablePageHeader';
import EditableCodeBlock from '@/components/EditableCodeBlock';
import TableOfContents from '@/components/TableOfContents';

const MachineLearning = () => {
  const { theme } = useTheme();

  const tocItems = [
    { id: 'introduction', title: 'The Intelligence Revolution' },
    { id: 'computer-vision', title: 'Computer Vision' },
    { id: 'ml-classic', title: 'Classical Machine Learning & NLP' },
    { id: 'deep-learning', title: 'Deep Learning with TensorFlow' },
    { id: 'next-chapter', title: 'Towards Advanced ML & Deployment' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <EditablePageHeader
        page="machine-learning"
        defaultTitle="Machine Learning"
        defaultSubtitle="From Classical Algorithms to Deep Neural Networks - Building Intelligent Systems"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents items={tocItems} />
          </div>
          
          <div className="flex-1 max-w-4xl">
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
                      Sesiunea 28 – OpenCV Avansat: Prelucrare de Imagini, Contururi și Segmentare
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
                      Sesiunea 29 – Dlib: Recunoaștere Facială Avansată și Tracking
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
                      Sesiunea 30-33 – Scikit-learn: From Basics to Production
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

            {/* Bridge to Next Chapter */}
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
                  <p className="text-lg leading-relaxed mb-6">
                    In our final chapter, we'll explore the cutting edge: deploying ML models at scale, 
                    building production MLOps pipelines, and creating AI systems that can learn and 
                    adapt in real-time. We'll cover distributed training, model optimization, edge 
                    deployment, and the infrastructure that powers modern AI applications.
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
        </div>
      </div>
    </div>
  );
};

export default MachineLearning;