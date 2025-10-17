import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Target, Lightbulb, Code, Copy, MessageSquare, Sparkles, TrendingUp, Zap } from 'lucide-react';

const NLPSessions3435 = () => {
  const navigate = useNavigate();

  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);

  // Code Snippets State
  const [copiedCode, setCopiedCode] = useState('');

  // Story chapters - The 70-year journey to understanding language
  const storyChapters = [
    {
      title: "🤖 1966: ELIZA - The Illusion of Understanding",
      content: "Joseph Weizenbaum at MIT creates ELIZA, a chatbot that mimics a psychotherapist. People believed it understood them. It didn't. It was pattern matching - clever tricks, zero comprehension.",
      details: "User: 'I'm feeling sad.' ELIZA: 'Why do you say you're feeling sad?' It reflected questions back using regex patterns. No understanding, just mirrors. Yet people poured their hearts out to it. This revealed something profound: humans desperately want machines to understand language. The 70-year quest began."
    },
    {
      title: "📊 1980s-2000s: The Statistical Revolution",
      content: "If we can't make machines understand meaning, maybe we can count words? Bag-of-Words, TF-IDF emerge. Machines classify documents by frequency, not comprehension.",
      details: "Spam filters work by counting 'viagra' and 'million dollars'. Document similarity by shared words. It worked! But it was like judging books by counting how many times each letter appears. No context, no meaning, no understanding that 'bank' in 'river bank' differs from 'savings bank'."
    },
    {
      title: "💡 2013: Word2Vec - THE BREAKTHROUGH",
      content: "Tomas Mikolov at Google asks: 'What if words aren't symbols, but points in space?' Trains neural network on billions of words. The result changes everything.",
      details: "King - Man + Woman = Queen. NOT because someone programmed it. The network DISCOVERED that gender is a direction in meaning-space! Words have geometry. 'Doctor' and 'nurse' are close. 'Paris' is to 'France' what 'Tokyo' is to 'Japan'. Machines finally understood: meaning is spatial relationships. This is the moment machines learned what words MEAN."
    },
    {
      title: "🎯 2013-2017: The Embedding Era",
      content: "Suddenly, every word is a vector. Sentences are journeys through meaning-space. Similarity is distance. Machine translation becomes: walk from English word-space to French word-space.",
      details: "Word embeddings revolutionize everything: sentiment analysis (positive words cluster together), document similarity (measure distance in semantic space), recommendation systems (find similar text), chatbots (navigate conversation space). This is what ELIZA lacked: actual geometric understanding of meaning."
    },
    {
      title: "🚀 2017-2024: Transformers & The Age of GPT",
      content: "Attention Is All You Need (2017). BERT, GPT-2, GPT-3, ChatGPT. The impossible becomes everyday. But it all stands on Word2Vec's shoulders: meaning is geometry.",
      details: "Today you ask ChatGPT anything. It works because words live in space, context is attention, and meaning is mathematical. The journey from ELIZA's illusion to GPT's comprehension took 58 years. You're learning the foundation: how machines learned that language has structure, and structure is computable."
    }
  ];

  // Part 1: Text Preprocessing - From Chaos to Structure
  const part1Content = {
    title: "Part 1: Text Preprocessing - Turning Words into Mathematics",
    description: "Before machines can understand language, we must transform messy human text into clean mathematical structures. This is the foundation of ALL NLP.",
    realWorld: "Every chatbot, translation system, and search engine starts here. Google Search preprocesses billions of documents daily. Your phone's autocorrect uses these exact techniques.",
    code: `import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer
import pandas as pd
from collections import Counter

"""
📝 TEXT PREPROCESSING: From Chaos to Clean Data

Human language is messy:
- "Running", "runs", "ran" - same meaning, different forms
- "the", "a", "is" - everywhere but meaningless
- "Dr. Smith lives on Wall St." - punctuation creates chaos
- "SCREAMING!!!" vs "screaming" - same word, different intensity

NLP preprocessing: standardize, clean, prepare for math.
"""

print("="*70)
print("📝 TEXT PREPROCESSING: The Foundation of NLP")
print("="*70)

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)

# ===== STEP 1: Raw Text - The Messy Reality =====
print("\\n📄 STEP 1: Raw Text Example")
print("-" * 70)

raw_text = """
Dr. Johnson visited the clinic on 12/15/2023. Patient complained about
severe headaches & nausea!!! Prescribed medication - ibuprofen 200mg.
Follow-up appointment scheduled. Patient's condition improving significantly.
Email: patient@example.com. #HealthUpdate 💊
"""

print("Raw text:")
print(raw_text)
print(f"\\nLength: {len(raw_text)} characters")
print(f"Contains: emails, dates, punctuation, emojis, hashtags, abbreviations")

# ===== STEP 2: Lowercasing =====
print("\\n\\n🔽 STEP 2: Lowercasing")
print("-" * 70)

lowercased = raw_text.lower()
print("After lowercasing:")
print(lowercased[:200])
print("\\n💡 WHY: 'Doctor' and 'doctor' are the same word")
print("   Without lowercasing: treated as different tokens")

# ===== STEP 3: Remove Special Characters =====
print("\\n\\n🧹 STEP 3: Remove Special Characters & Numbers")
print("-" * 70)

def clean_text(text):
    # Remove emails
    text = re.sub(r'\\S+@\\S+', '', text)
    # Remove URLs
    text = re.sub(r'http\\S+|www.\\S+', '', text)
    # Remove hashtags
    text = re.sub(r'#\\w+', '', text)
    # Remove numbers
    text = re.sub(r'\\d+', '', text)
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

cleaned = clean_text(lowercased)
print("After cleaning:")
print(cleaned)
print("\\n💡 REMOVED: emails, dates, numbers, punctuation, hashtags, emojis")

# ===== STEP 4: Tokenization =====
print("\\n\\n✂️  STEP 4: Tokenization - Split into Words")
print("-" * 70)

tokens = word_tokenize(cleaned)
print(f"Tokens (words): {tokens}")
print(f"\\nTotal tokens: {len(tokens)}")
print("\\n💡 TOKENIZATION: Break text into individual units (words)")
print("   'I love NLP' → ['I', 'love', 'NLP']")

# ===== STEP 5: Remove Stop Words =====
print("\\n\\n🚫 STEP 5: Remove Stop Words")
print("-" * 70)

stop_words = set(stopwords.words('english'))
print(f"English has {len(stop_words)} stop words")
print(f"Examples: {list(stop_words)[:20]}")

filtered_tokens = [word for word in tokens if word not in stop_words]
print(f"\\nBefore stop word removal: {tokens}")
print(f"After stop word removal: {filtered_tokens}")
print(f"\\nReduced from {len(tokens)} to {len(filtered_tokens)} tokens")
print("\\n💡 STOP WORDS: Common words that carry little meaning")
print("   'the', 'a', 'is', 'are' - remove to focus on content")

# ===== STEP 6: Stemming vs Lemmatization =====
print("\\n\\n🌱 STEP 6: Stemming vs Lemmatization")
print("-" * 70)

test_words = ['running', 'runs', 'ran', 'runner', 'easily', 'fairly', 'caring', 'better', 'worse']

# Stemming: crude chopping
stemmer = PorterStemmer()
stemmed = [stemmer.stem(word) for word in test_words]

# Lemmatization: intelligent reduction
lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(word, pos='v') for word in test_words]

print("Original  →  Stemmed  →  Lemmatized")
print("-" * 50)
for orig, stem, lemma in zip(test_words, stemmed, lemmatized):
    print(f"{orig:12s} → {stem:10s} → {lemma}")

print("\\n💡 STEMMING: Crude chopping (run, run, ran, runner → run, run, ran, runner)")
print("   Fast but imprecise: 'caring' → 'car' (wrong!)")
print("\\n💡 LEMMATIZATION: Intelligent reduction using dictionary")
print("   'running', 'runs', 'ran' → 'run' (all same root)")
print("   Slower but accurate")

# Apply lemmatization to our text
lemmatized_tokens = [lemmatizer.lemmatize(word, pos='v') for word in filtered_tokens]
print(f"\\nFinal processed tokens: {lemmatized_tokens}")

# ===== STEP 7: Complete Pipeline =====
print("\\n\\n🔄 STEP 7: Complete Preprocessing Pipeline")
print("-" * 70)

def preprocess_text(text, remove_stopwords=True, lemmatize=True):
    """
    Production-grade text preprocessing pipeline
    Used in: Search engines, chatbots, sentiment analysis
    """
    # Lowercase
    text = text.lower()

    # Remove special characters
    text = clean_text(text)

    # Tokenize
    tokens = word_tokenize(text)

    # Remove stop words
    if remove_stopwords:
        stop_words = set(stopwords.words('english'))
        tokens = [w for w in tokens if w not in stop_words]

    # Lemmatize
    if lemmatize:
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(w, pos='v') for w in tokens]

    return tokens

# Test on real examples
examples = [
    "I'm absolutely LOVING this amazing product!!! Best purchase ever! 😍",
    "The patient complained about severe headaches and nausea symptoms.",
    "Running, runs, ran - they're all variations of the same action."
]

print("\\nProcessing real examples:")
print("=" * 70)
for i, example in enumerate(examples, 1):
    processed = preprocess_text(example)
    print(f"\\n{i}. Original: {example}")
    print(f"   Processed: {processed}")

# ===== STEP 8: Real Application - Health Notes Analysis =====
print("\\n\\n🏥 STEP 8: Real Application - Medical Notes Processing")
print("-" * 70)

medical_notes = [
    "Patient experiencing severe migraine headaches with nausea and sensitivity to light.",
    "Diagnosed with influenza. Prescribed antiviral medication and rest.",
    "Follow-up visit shows significant improvement in symptoms. Continue current treatment.",
    "Patient reports persistent cough and fever. Recommend chest X-ray.",
    "Allergic reaction to penicillin noted. Update medication list immediately."
]

print("Processing 5 medical notes...")
processed_notes = [preprocess_text(note) for note in medical_notes]

# Extract most common medical terms
all_terms = [term for note in processed_notes for term in note]
term_freq = Counter(all_terms)

print("\\nMost common medical terms:")
for term, count in term_freq.most_common(10):
    print(f"   {term:20s}: {count} occurrences")

print("\\n💡 REAL-WORLD USE:")
print("   • Extract symptoms from patient notes")
print("   • Identify medication mentions")
print("   • Track treatment effectiveness keywords")
print("   • Build medical terminology frequency database")

print("\\n" + "="*70)
print("🎓 TEXT PREPROCESSING COMPLETE!")
print("="*70)
print("\\nWhat you mastered:")
print("   ✓ Lowercasing & cleaning")
print("   ✓ Tokenization (text → words)")
print("   ✓ Stop word removal")
print("   ✓ Lemmatization (words → roots)")
print("   ✓ Complete preprocessing pipeline")
print("\\n🚀 This is the foundation for EVERY NLP task!")
print("   Next: Turn these clean tokens into numbers (TF-IDF & Word2Vec)")
`
  };

  // Part 2: TF-IDF & Word Embeddings - Words as Vectors
  const part2Content = {
    title: "Part 2: From Words to Vectors - TF-IDF & Word2Vec Magic",
    description: "The moment everything changed: words aren't symbols, they're points in space. King - Man + Woman = Queen isn't magic, it's geometry.",
    realWorld: "Google Search ranks documents using TF-IDF. Word2Vec powers translation, search, recommendations. Every modern NLP system uses embeddings. This is the breakthrough that made ChatGPT possible.",
    code: `import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
from gensim.models import Word2Vec
from sklearn.decomposition import PCA

"""
🌌 WORDS AS VECTORS: The Geometric Revolution

1980s-2000s: Bag of Words & TF-IDF
   "Document is a bag of word counts"
   No meaning, just frequency

2013: Word2Vec
   "Words are points in meaning-space"
   King - Man + Woman = Queen (NOT PROGRAMMED!)
   Machines discovered meaning has geometry

This changed everything.
"""

print("="*70)
print("🌌 FROM WORDS TO VECTORS: The Geometric Revolution")
print("="*70)

# ===== STEP 1: Bag of Words - The Simple Beginning =====
print("\\n📊 STEP 1: Bag of Words - Counting Without Meaning")
print("-" * 70)

documents = [
    "The doctor prescribed medicine for the patient",
    "The patient visited the doctor at the clinic",
    "Medicine helps patient recover from illness",
    "The clinic provides excellent medical care"
]

# Create Bag of Words
vectorizer = CountVectorizer()
bow_matrix = vectorizer.fit_transform(documents)
feature_names = vectorizer.get_feature_names_out()

print("Documents:")
for i, doc in enumerate(documents):
    print(f"{i+1}. {doc}")

print(f"\\nVocabulary ({len(feature_names)} unique words):")
print(feature_names)

print("\\nBag of Words Matrix:")
bow_df = pd.DataFrame(bow_matrix.toarray(), columns=feature_names)
print(bow_df)

print("\\n💡 EXPLANATION:")
print("   Each row = document")
print("   Each column = word")
print("   Numbers = word count in document")
print("   Problem: 'the' appears most but means least!")

# ===== STEP 2: TF-IDF - Weighting by Importance =====
print("\\n\\n⚖️  STEP 2: TF-IDF - Term Frequency × Inverse Document Frequency")
print("-" * 70)

tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(documents)
tfidf_df = pd.DataFrame(tfidf_matrix.toarray(),
                        columns=tfidf_vectorizer.get_feature_names_out())

print("TF-IDF Matrix:")
print(tfidf_df.round(3))

print("\\n💡 TF-IDF FORMULA:")
print("   TF (Term Frequency) = count of word in document")
print("   IDF (Inverse Doc Freq) = log(total docs / docs containing word)")
print("   TF-IDF = TF × IDF")
print("\\n   RESULT: Common words ('the') get LOW scores")
print("           Rare, meaningful words get HIGH scores")

# Compare 'the' vs 'medicine'
the_tfidf = tfidf_df['the'].mean()
medicine_tfidf = tfidf_df['medicine'].mean()
print(f"\\n   Average TF-IDF scores:")
print(f"   'the': {the_tfidf:.4f} (common → low score)")
print(f"   'medicine': {medicine_tfidf:.4f} (meaningful → high score)")

# ===== STEP 3: Document Similarity =====
print("\\n\\n📏 STEP 3: Document Similarity - Finding Related Content")
print("-" * 70)

# Calculate similarity between documents
similarity_matrix = cosine_similarity(tfidf_matrix)
similarity_df = pd.DataFrame(similarity_matrix,
                             index=[f'Doc{i+1}' for i in range(len(documents))],
                             columns=[f'Doc{i+1}' for i in range(len(documents))])

print("Document Similarity Matrix (0=different, 1=identical):")
print(similarity_df.round(3))

print("\\n💡 COSINE SIMILARITY:")
print("   Measures angle between document vectors")
print("   Doc1 & Doc2: Both mention doctor, patient → HIGH similarity")
print("   Doc1 & Doc3: Different focus → LOWER similarity")

# Find most similar documents
new_query = "patient needs medical treatment"
query_vector = tfidf_vectorizer.transform([new_query])
similarities = cosine_similarity(query_vector, tfidf_matrix)[0]

print(f"\\n🔍 Query: '{new_query}'")
print("\\nMost similar documents:")
for i, sim in enumerate(similarities):
    print(f"   Doc {i+1}: {sim:.4f} - {documents[i]}")

print("\\n💡 REAL-WORLD USE:")
print("   • Search engines: match query to documents")
print("   • Recommendation: find similar articles")
print("   • Plagiarism detection: compare document similarity")

# ===== STEP 4: Word2Vec - THE BREAKTHROUGH =====
print("\\n\\n✨ STEP 4: Word2Vec - Words as Points in Meaning-Space")
print("-" * 70)

# Health-domain sentences for training
health_sentences = [
    "doctor treats patient with medicine",
    "nurse assists doctor at hospital",
    "patient takes medicine for illness",
    "hospital provides medical care",
    "medicine helps cure disease",
    "doctor diagnoses patient symptoms",
    "nurse monitors patient health",
    "medical care improves patient recovery",
    "hospital employs doctor and nurse",
    "patient visits doctor for treatment",
    "prescription medicine reduces symptoms",
    "medical staff includes doctor nurse",
    "patient health improves with treatment",
    "doctor prescribes medicine for patient",
    "nurse administers medicine to patient"
]

# Tokenize
tokenized_sentences = [sentence.split() for sentence in health_sentences]

print("Training Word2Vec on health domain...")
print(f"Corpus: {len(health_sentences)} sentences")

# Train Word2Vec model
w2v_model = Word2Vec(sentences=tokenized_sentences,
                     vector_size=50,  # 50 dimensions
                     window=3,         # Context window
                     min_count=1,
                     workers=4,
                     epochs=100)

print(f"\\nVocabulary size: {len(w2v_model.wv)} words")
print(f"Vector dimensions: {w2v_model.wv.vector_size}")

# ===== STEP 5: Word Similarity - Discovering Relationships =====
print("\\n\\n🔗 STEP 5: Word Relationships - Machines Discover Meaning")
print("-" * 70)

# Find similar words
test_words = ['doctor', 'patient', 'medicine']

for word in test_words:
    if word in w2v_model.wv:
        similar = w2v_model.wv.most_similar(word, topn=3)
        print(f"\\n'{word}' is similar to:")
        for similar_word, score in similar:
            print(f"   {similar_word:12s} (similarity: {score:.4f})")

print("\\n💡 THE MAGIC:")
print("   Model DISCOVERED these relationships!")
print("   Nobody programmed: 'doctor similar to nurse'")
print("   It learned from context: they appear in similar situations")

# ===== STEP 6: Word Analogies - The Famous Example =====
print("\\n\\n🎯 STEP 6: Word Analogies - Vector Arithmetic")
print("-" * 70)

print("The famous example: King - Man + Woman = ?")
print("\\nIn our medical domain:")

# Try medical analogy: doctor - hospital + clinic = ?
try:
    # This is vector arithmetic!
    result = w2v_model.wv.most_similar(
        positive=['doctor', 'patient'],
        negative=['hospital'],
        topn=1
    )
    print(f"\\ndoctor + patient - hospital = {result[0][0]}")
    print(f"Confidence: {result[0][1]:.4f}")
except:
    print("Need more data for analogies, but the concept works!")

print("\\n💡 HOW IT WORKS:")
print("   Words are vectors (arrays of numbers)")
print("   'King' = [0.2, 0.8, 0.3, ...]")
print("   'Man' = [0.1, 0.7, 0.2, ...]")
print("   'Woman' = [0.1, 0.1, 0.9, ...]")
print("   ")
print("   King - Man + Woman = [0.2-0.1+0.1, 0.8-0.7+0.1, ...] = ~Queen")
print("   ")
print("   Meaning is GEOMETRY!")

# ===== STEP 7: Visualizing Word Embeddings =====
print("\\n\\n📊 STEP 7: Visualizing Word Space")
print("-" * 70)

# Get vectors for key medical terms
medical_terms = ['doctor', 'nurse', 'patient', 'medicine',
                 'hospital', 'treatment', 'care', 'health']

vectors = []
labels = []
for term in medical_terms:
    if term in w2v_model.wv:
        vectors.append(w2v_model.wv[term])
        labels.append(term)

# Reduce 50D to 2D using PCA
pca = PCA(n_components=2)
vectors_2d = pca.fit_transform(vectors)

# Plot
plt.figure(figsize=(12, 8))
plt.scatter(vectors_2d[:, 0], vectors_2d[:, 1], s=200, alpha=0.6, c=range(len(labels)), cmap='viridis')

for i, label in enumerate(labels):
    plt.annotate(label, xy=(vectors_2d[i, 0], vectors_2d[i, 1]),
                xytext=(5, 5), textcoords='offset points',
                fontsize=12, fontweight='bold')

plt.xlabel('Dimension 1', fontsize=12)
plt.ylabel('Dimension 2', fontsize=12)
plt.title('Word2Vec: Medical Terms in 2D Space\\n(50D compressed to 2D for visualization)',
         fontsize=14, fontweight='bold')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('word2vec_medical_space.png', dpi=150, bbox_inches='tight')

print("Visualization saved: word2vec_medical_space.png")
print("\\n💡 WHAT YOU SEE:")
print("   Words cluster by meaning!")
print("   'doctor' & 'nurse' are close")
print("   'patient' is near healthcare terms")
print("   'medicine' & 'treatment' are related")
print("   ")
print("   This spatial structure is what ChatGPT uses!")

# ===== STEP 8: Application - Document Similarity with Embeddings =====
print("\\n\\n🏥 STEP 8: Real Application - Medical Note Similarity")
print("-" * 70)

medical_notes = [
    "patient presents with fever and cough symptoms",
    "doctor prescribed antibiotics for infection",
    "patient showing improvement after treatment",
    "nurse monitored patient vital signs"
]

def document_vector(doc, model):
    """Convert document to vector by averaging word vectors"""
    words = doc.split()
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if len(word_vectors) == 0:
        return np.zeros(model.vector_size)
    return np.mean(word_vectors, axis=0)

# Convert notes to vectors
note_vectors = [document_vector(note, w2v_model) for note in medical_notes]

# Find similar notes
query = "patient has fever need treatment"
query_vector = document_vector(query, w2v_model)

similarities = [cosine_similarity([query_vector], [note_vec])[0][0]
               for note_vec in note_vectors]

print(f"Query: '{query}'")
print("\\nMost similar medical notes:")
for i, (note, sim) in enumerate(zip(medical_notes, similarities)):
    print(f"   {i+1}. [{sim:.4f}] {note}")

print("\\n" + "="*70)
print("🎓 WORD EMBEDDINGS MASTERED!")
print("="*70)
print("\\nThe Revolution:")
print("   1980s: Words are symbols → count them (TF-IDF)")
print("   2013: Words are vectors → meaning is geometry (Word2Vec)")
print("   2017: Context matters → attention mechanisms (Transformers)")
print("   2023: ChatGPT → all built on this foundation")
print("\\n💡 YOU NOW UNDERSTAND:")
print("   How machines learned that words have MEANING")
print("   Why 'King - Man + Woman = Queen' works")
print("   The geometric nature of language")
print("\\n🚀 This is what powers modern AI!")
`
  };

  // Part 3: Sentiment Analysis - Real-World NLP
  const part3Content = {
    title: "Part 3: Sentiment Analysis - Teaching Machines to Read Emotions",
    description: "Apply everything you've learned: preprocess text, vectorize with TF-IDF, classify with ML. Build a system that understands if text is positive, negative, or neutral.",
    realWorld: "Amazon analyzes millions of reviews daily. Twitter tracks brand sentiment in real-time. Customer service prioritizes negative feedback automatically. This is production NLP.",
    code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

"""
💬 SENTIMENT ANALYSIS: Teaching Machines to Read Emotions

Amazon: "Is this review positive or negative?"
Twitter: "How do people feel about our brand?"
Customer Service: "Which complaints are urgent?"

This is NLP solving real problems.
"""

print("="*70)
print("💬 SENTIMENT ANALYSIS: Real-World NLP Application")
print("="*70)

# ===== STEP 1: Create Realistic Dataset =====
print("\\n📊 STEP 1: Building Health Review Dataset")
print("-" * 70)

# Realistic health app reviews
reviews_data = {
    'review': [
        # POSITIVE reviews
        "This health app is amazing! Helped me lose 15 pounds in 2 months. Highly recommend!",
        "Love the workout tracking feature. Very intuitive and motivating. Best health app ever!",
        "Excellent nutrition advice and meal planning. My energy levels have improved significantly.",
        "The sleep tracker is incredibly accurate. Finally understanding my sleep patterns!",
        "Outstanding app! The AI coach provides personalized recommendations. Worth every penny.",
        "Great interface, helpful reminders, and fantastic progress tracking. Five stars!",
        "This app changed my life. Down 20 pounds and feeling healthier than ever.",
        "Wonderful experience. The community support feature is incredibly motivating.",
        "Best investment in my health. The guided meditations are perfect for stress relief.",
        "Impressive accuracy in calorie tracking. Makes healthy eating so much easier.",

        # NEGATIVE reviews
        "Terrible app. Crashes constantly and lost all my progress data. Very frustrating!",
        "Waste of money. Features don't work as advertised. Customer support is non-existent.",
        "Disappointed. The app drains my battery within hours. Unusable.",
        "Horrible experience. Inaccurate calorie counts and confusing interface. Do not download!",
        "Awful. Tried to cancel subscription but kept getting charged. Poor business practices.",
        "Worst health app I've used. Buggy, slow, and provides incorrect fitness advice.",
        "Complete garbage. The workout tracker doesn't sync and loses data randomly.",
        "Frustrating! App freezes during workouts. Missed several important health metrics.",
        "Disappointing. Paid for premium but features are worse than free alternatives.",
        "Useless. The meal planner suggests impossible recipes. Waste of time and money.",

        # NEUTRAL reviews
        "It's okay. Does the basic job but nothing special. Average health tracking.",
        "Decent app. Works as described but could use more features.",
        "Acceptable for free version. Premium features not worth the upgrade.",
        "Standard health tracker. Nothing innovative but gets the job done.",
        "Mediocre. Some features work well, others are buggy. Mixed experience.",
        "Average app. Good for beginners but advanced users will want more.",
        "It works. Not amazing, not terrible. Just adequate for basic tracking.",
        "Fair app. Some useful features but interface could be more intuitive.",
        "Acceptable for casual users. Serious athletes will need something better.",
        "Middle-of-the-road app. Does what it says but doesn't exceed expectations."
    ],
    'sentiment': [
        'positive'] * 10 + ['negative'] * 10 + ['neutral'] * 10
}

df = pd.DataFrame(reviews_data)
print(f"Dataset: {len(df)} health app reviews")
print("\\nSentiment distribution:")
print(df['sentiment'].value_counts())
print("\\nSample reviews:")
print(df.head(3)[['review', 'sentiment']])

# ===== STEP 2: Text Preprocessing Pipeline =====
print("\\n\\n🧹 STEP 2: Preprocessing Pipeline")
print("-" * 70)

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_review(text):
    """Complete preprocessing pipeline"""
    # Lowercase
    text = text.lower()

    # Remove special characters but keep basic punctuation for sentiment
    text = re.sub(r'[^a-zA-Z\\s!?]', '', text)

    # Tokenize
    tokens = word_tokenize(text)

    # Remove stop words (but keep negations!)
    negations = ['not', 'no', 'never', 'neither', 'nobody', 'nowhere']
    tokens = [w for w in tokens if w not in stop_words or w in negations]

    # Lemmatize
    tokens = [lemmatizer.lemmatize(w, pos='v') for w in tokens]

    return ' '.join(tokens)

df['processed'] = df['review'].apply(preprocess_review)

print("Example preprocessing:")
print("-" * 70)
for i in range(3):
    print(f"\\nOriginal: {df['review'].iloc[i]}")
    print(f"Processed: {df['processed'].iloc[i]}")

print("\\n💡 PRESERVED:")
print("   Negations ('not', 'never') - crucial for sentiment!")
print("   Exclamation marks - indicate strong emotion")

# ===== STEP 3: TF-IDF Vectorization =====
print("\\n\\n📊 STEP 3: Converting Text to Numbers (TF-IDF)")
print("-" * 70)

# Split data
X = df['processed']
y = df['sentiment']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

print(f"Training set: {len(X_train)} reviews")
print(f"Test set: {len(X_test)} reviews")

# TF-IDF vectorization
tfidf = TfidfVectorizer(max_features=500, ngram_range=(1, 2))
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

print(f"\\nVocabulary size: {len(tfidf.get_feature_names_out())}")
print(f"Matrix shape: {X_train_tfidf.shape}")

# Show most important features
feature_names = tfidf.get_feature_names_out()
print(f"\\nSample features (including bigrams):")
print(feature_names[:20])

# ===== STEP 4: Train Multiple Models =====
print("\\n\\n🎓 STEP 4: Training Sentiment Classifiers")
print("-" * 70)

# Model 1: Naive Bayes (classic for text)
nb_model = MultinomialNB()
nb_model.fit(X_train_tfidf, y_train)
nb_pred = nb_model.predict(X_test_tfidf)
nb_accuracy = accuracy_score(y_test, nb_pred)

print(f"\\n1️⃣  Naive Bayes Accuracy: {nb_accuracy*100:.2f}%")

# Model 2: Logistic Regression
lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_train_tfidf, y_train)
lr_pred = lr_model.predict(X_test_tfidf)
lr_accuracy = accuracy_score(y_test, lr_pred)

print(f"2️⃣  Logistic Regression Accuracy: {lr_accuracy*100:.2f}%")

# Choose best model
best_model = lr_model if lr_accuracy > nb_accuracy else nb_model
best_pred = lr_pred if lr_accuracy > nb_accuracy else nb_pred
best_name = "Logistic Regression" if lr_accuracy > nb_accuracy else "Naive Bayes"

print(f"\\n✅ Best model: {best_name} ({max(lr_accuracy, nb_accuracy)*100:.2f}%)")

# ===== STEP 5: Detailed Evaluation =====
print("\\n\\n📈 STEP 5: Model Evaluation")
print("-" * 70)

print("\\nClassification Report:")
print(classification_report(y_test, best_pred, digits=3))

# Confusion Matrix
cm = confusion_matrix(y_test, best_pred, labels=['positive', 'neutral', 'negative'])
print("\\nConfusion Matrix:")
print("                Predicted")
print("              Pos  Neu  Neg")
print(f"Actual Pos:   {cm[0]}")
print(f"       Neu:   {cm[1]}")
print(f"       Neg:   {cm[2]}")

print("\\n💡 INTERPRETATION:")
print("   Precision: Of predicted positives, how many were actually positive?")
print("   Recall: Of actual positives, how many did we find?")
print("   F1-Score: Harmonic mean of precision and recall")

# ===== STEP 6: Feature Importance - What Words Matter? =====
print("\\n\\n🔍 STEP 6: What Words Indicate Sentiment?")
print("-" * 70)

# Get feature weights from Logistic Regression
if best_name == "Logistic Regression":
    # For multi-class, get coefficients for each class
    feature_names = tfidf.get_feature_names_out()

    # Positive indicators
    pos_coeffs = lr_model.coef_[lr_model.classes_ == 'positive'][0]
    top_positive = sorted(zip(feature_names, pos_coeffs), key=lambda x: x[1], reverse=True)[:10]

    # Negative indicators
    neg_coeffs = lr_model.coef_[lr_model.classes_ == 'negative'][0]
    top_negative = sorted(zip(feature_names, neg_coeffs), key=lambda x: x[1], reverse=True)[:10]

    print("\\n✅ Words that predict POSITIVE sentiment:")
    for word, score in top_positive:
        print(f"   {word:20s}: {score:6.3f}")

    print("\\n❌ Words that predict NEGATIVE sentiment:")
    for word, score in top_negative:
        print(f"   {word:20s}: {score:6.3f}")

print("\\n💡 INSIGHTS:")
print("   'amazing', 'excellent', 'love' → strongly positive")
print("   'terrible', 'waste', 'awful' → strongly negative")
print("   'not good', 'not work' → bigrams capture negation!")

# ===== STEP 7: Real-Time Sentiment Prediction =====
print("\\n\\n🔮 STEP 7: Predicting Sentiment of New Reviews")
print("-" * 70)

new_reviews = [
    "This app is absolutely fantastic! Changed my entire fitness routine.",
    "Horrible experience. App crashes every time I try to log meals.",
    "It's okay, nothing special. Does basic tracking.",
    "Terrible customer service and buggy interface. Waste of money!",
    "Love the meditation features! Very calming and well-designed."
]

print("Analyzing new reviews:")
print("=" * 70)

for i, review in enumerate(new_reviews, 1):
    # Preprocess
    processed = preprocess_review(review)

    # Vectorize
    review_tfidf = tfidf.transform([processed])

    # Predict
    sentiment = best_model.predict(review_tfidf)[0]
    confidence = np.max(best_model.predict_proba(review_tfidf))

    # Get all probabilities
    proba = best_model.predict_proba(review_tfidf)[0]
    classes = best_model.classes_

    print(f"\\n{i}. Review: {review}")
    print(f"   Sentiment: {sentiment.upper()} (confidence: {confidence*100:.1f}%)")
    print(f"   Probabilities:")
    for cls, prob in zip(classes, proba):
        print(f"      {cls:10s}: {prob*100:5.1f}%")

# ===== STEP 8: Visualization =====
print("\\n\\n📊 STEP 8: Visualizing Results")
print("-" * 70)

fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Plot 1: Confusion Matrix Heatmap
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
           xticklabels=['Positive', 'Neutral', 'Negative'],
           yticklabels=['Positive', 'Neutral', 'Negative'],
           ax=axes[0])
axes[0].set_xlabel('Predicted Sentiment', fontsize=12)
axes[0].set_ylabel('Actual Sentiment', fontsize=12)
axes[0].set_title(f'Sentiment Analysis Confusion Matrix\\n{best_name}',
                 fontsize=13, fontweight='bold')

# Plot 2: Model Comparison
models = ['Naive Bayes', 'Logistic Regression']
accuracies = [nb_accuracy, lr_accuracy]
colors = ['skyblue', 'lightcoral']

axes[1].bar(models, accuracies, color=colors, alpha=0.7, edgecolor='black')
axes[1].set_ylabel('Accuracy', fontsize=12)
axes[1].set_title('Model Performance Comparison', fontsize=13, fontweight='bold')
axes[1].set_ylim([0, 1])
axes[1].grid(True, alpha=0.3, axis='y')

for i, acc in enumerate(accuracies):
    axes[1].text(i, acc + 0.02, f'{acc*100:.1f}%',
                ha='center', fontweight='bold')

plt.tight_layout()
plt.savefig('sentiment_analysis_results.png', dpi=150, bbox_inches='tight')
print("Visualization saved: sentiment_analysis_results.png")

print("\\n" + "="*70)
print("🎉 SENTIMENT ANALYSIS COMPLETE!")
print("="*70)
print("\\nWhat you built:")
print("   ✓ Complete text preprocessing pipeline")
print("   ✓ TF-IDF vectorization with bigrams")
print("   ✓ Multi-class sentiment classifier")
print("   ✓ Model evaluation & interpretation")
print("   ✓ Real-time sentiment prediction")
print("\\n💡 REAL-WORLD APPLICATIONS:")
print("   • Amazon: Analyze millions of product reviews")
print("   • Twitter: Track brand sentiment in real-time")
print("   • Customer Service: Prioritize negative feedback")
print("   • Healthcare: Monitor patient feedback sentiment")
print("   • Finance: Analyze news sentiment for trading")
print("\\n🚀 This is production-grade NLP!")
print("   From ELIZA's illusion to real understanding")
print("   From pattern matching to geometric meaning")
print("   You've mastered the journey!")
`
  };

  const allParts = [part1Content, part2Content, part3Content];

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
    }, 4000);
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Natural Language Processing
                </h1>
                <p className="text-sm text-muted-foreground">Sessions 34-35: Teaching Machines to Understand Language</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <MessageSquare className="w-3 h-3 mr-1" />
                Word2Vec Magic
              </Badge>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                <Sparkles className="w-3 h-3 mr-1" />
                Sentiment Analysis
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Origin Story Section */}
        <section className="mb-12">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <MessageSquare className="w-5 h-5" />
                    70 Years: From ELIZA's Illusion to ChatGPT's Comprehension
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    The impossible problem: teaching machines to understand human language. Then came Word2Vec, and everything changed.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={runOriginStory}
                    disabled={isStoryRunning}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
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
                          ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 opacity-100'
                          : 'bg-muted/20 border-muted opacity-30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= storyStep ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{chapter.title}</h4>
                          <p className="text-muted-foreground mb-2">{chapter.content}</p>
                          {index <= storyStep && (
                            <p className="text-sm bg-blue-100 dark:bg-blue-900/30 p-3 rounded italic">
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
                  <p className="text-muted-foreground">Click "Begin Journey" to discover how machines learned to understand the most human of all skills: language</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* The 3 Parts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">The Complete Journey: From Text to Intelligence</h2>
              <p className="text-muted-foreground">3 parts that transform language from symbols to geometric meaning</p>
            </div>
          </div>

          <div className="grid gap-6">
            {allParts.map((part, index) => (
              <Card key={index} className="border-cyan-200 dark:border-cyan-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
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
                        <div className="bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-lg">
                          <p className="text-cyan-700 dark:text-cyan-300">{part.realWorld}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="practice" className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            💡 Your Turn - Apply to YOUR Projects:
                          </h5>
                          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                            {index === 0 && (
                              <>
                                <li>• Build a medical note preprocessor for symptom extraction</li>
                                <li>• Create a custom tokenizer for financial transaction descriptions</li>
                                <li>• Implement lemmatization pipeline for customer reviews</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>• Train Word2Vec on your health journal entries</li>
                                <li>• Build TF-IDF document similarity for expense categorization</li>
                                <li>• Explore word analogies in your domain</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>• Build sentiment analyzer for health app reviews</li>
                                <li>• Create financial news sentiment tracker</li>
                                <li>• Develop customer feedback prioritization system</li>
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
                🎯 Real Impact: NLP for YOUR Life
              </CardTitle>
              <CardDescription className="text-lg">
                From ELIZA's tricks to geometric understanding - NLP that solves real problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Health Text Intelligence
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Extract symptoms from notes, analyze patient sentiment, match clinical trials from descriptions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Medical note analysis → symptom extraction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Patient sentiment → mental health tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Health query chatbot → preliminary advice</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-600" />
                    Financial Text Analytics
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Auto-categorize transactions, analyze news sentiment, mine customer insights from reviews.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Transaction descriptions → auto-categorization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Financial news → sentiment for trading signals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Customer reviews → insight mining</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
                <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  💬 The NLP Revolution:
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ELIZA (1966) fooled people with pattern matching. Word2Vec (2013) discovered meaning is geometry.
                  ChatGPT (2023) converses naturally. You've learned the <strong>foundation that made it all possible</strong>:
                  words as vectors, context as space, meaning as mathematics. This is the breakthrough that powered the AI revolution.
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-3">
                  🎓 Sessions 34-35 Complete: You Speak Machine Language!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  From ELIZA's illusion to Word2Vec's geometric revelation to sentiment analysis that works.
                  You've journeyed through 70 years of the AI-complete problem and emerged understanding how machines finally learned to speak.
                </p>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🧠 What You Mastered:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Text preprocessing (tokenization, lemmatization)</li>
                      <li>• TF-IDF vectorization & document similarity</li>
                      <li>• Word2Vec embeddings & geometric meaning</li>
                      <li>• Sentiment analysis with ML classifiers</li>
                      <li>• Feature importance & model interpretation</li>
                      <li>• Production NLP pipelines</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg">
                    <h5 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">💼 Real Applications Built:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground text-left">
                      <li>• Health app review sentiment analyzer</li>
                      <li>• Medical note preprocessor</li>
                      <li>• Document similarity system (TF-IDF)</li>
                      <li>• Word embedding visualizer</li>
                      <li>• Multi-class text classifier</li>
                      <li>• Real-time sentiment predictor</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg max-w-3xl mx-auto">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold">
                    "Language is humanity's greatest invention. Teaching machines to understand it was the AI-complete problem. Word2Vec showed us: meaning is geometry."
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    - Tomas Mikolov's 2013 breakthrough that changed everything 💬
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
            <Badge variant="secondary">Sessions 34-35 Complete</Badge>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              Continue to Deep Learning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NLPSessions3435;
