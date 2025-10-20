import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowLeft, Brain, Target } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const SklearnSession31 = () => {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Story chapters about Advanced Classification
  const storyChapters = [
    {
      title: "Capitolul 1: Întrebarea Care A Schimbat Totul",
      content: `În 1995, un laborator de cancer din Wisconsin se confrunta cu o întrebare vitală: "Cum putem detecta cancerul de sân mai devreme, mai precis, mai corect?"

Aveam imagini medicale. Aveam măsurători. Dar diagnosticarea era încă o artă umană, subiectivă, plină de incertitudine.

Dr. William Wolberg a început să colecteze date: radius, textură, perimetru, arie, smoothness - 30 de caracteristici pentru fiecare tumoră. Benignă sau malignă?

Dar cum să transformi 30 de numere într-un diagnostic sigur? Cum să faci ca mașina să ÎNȚELEAGĂ ce înseamnă cancer?

Aceasta a fost Nevoia care a dus la nașterea tehnicilor avansate de clasificare.`,
      icon: "🏥",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Capitolul 2: De La Predicție La Clasificare",
      content: `În Session 30, am învățat să PREZICEM - prețul unei case, energia din somn. Dar clasificarea e diferită.

Clasificarea înseamnă: "Aceasta este SAU nu este?"
Nu există mijloc. Nu există "70% cancer". Este 0 sau 1. Benign sau malign. Viață sau moarte.

Și pentru asta, avem nevoie de mai mult decât Linear Regression. Avem nevoie de algoritmi care înțeleg granițe, decisii, separarea între clase.

Support Vector Machine - găsește cea mai bună linie care separă punctele.
Random Forest - mulți arbori de decizie votează împreună.
K-Nearest Neighbors - "arată-mi vecinii tăi și-ți voi spune cine ești".

Aceasta este arta clasificării: să tragi linii în spațiul dimensional unde viața și moartea sunt separate de matematică.`,
      icon: "🎯",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Capitolul 3: Problema Scurgerii De Date",
      content: `În 2008, un researcher de ML a publicat rezultate spectaculoase: 99.9% acuratețe la detectarea cancerului!

Dar când modelul a ajuns în spital, acuratețea a scăzut la 65%. Ce s-a întâmplat?

Data leakage. Scurgerea de date.

El normalizase întregul dataset odată - testul "văzuse" deja media și deviația standard de la train. Modelul învățase din viitor.

Acesta a fost momentul când industria a realizat: avem nevoie de PIPELINES.

Pipeline = o conductă care asigură că fiecare pas se întâmplă în ordinea corectă, fără scurgeri.
Pipeline = garantează că testul nu vede niciodată informații din train.
Pipeline = reproducibilitate, siguranță, corectitudine.

Din acel moment, orice model serios folosește Pipelines.`,
      icon: "🔒",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Capitolul 4: Căutarea Hiperparametrilor Perfecți",
      content: `Modelul tău e ca o mașină: are butoane, setări, parametri care controlează comportamentul.

Pentru SVM: Ce kernel să folosesc? 'linear' sau 'rbf'? Ce valoare pentru C? Pentru gamma?
Pentru Random Forest: Câți arbori? Cât de adânci? Câte features per split?

În 2010, oamenii ajustau acești parametri manual. Încercare și eroare. Ghici și testează. Ore întregi pierdute.

Apoi a venit GridSearchCV - "Grila de Căutare cu Cross-Validation".

"Dă-mi o grilă de parametri de testat. Eu voi încerca TOATE combinațiile. Pentru fiecare, voi face Cross-Validation. Îți voi da cea mai bună configurație."

GridSearchCV = automatizarea expertului.
GridSearchCV = nu mai ghici, ȘTII.
GridSearchCV = știința în loc de artă.`,
      icon: "⚙️",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Capitolul 5: Cross-Validation - Testul Suprem",
      content: `"Modelul tău are 95% acuratețe!" - ești fericit.
Dar apoi îl testezi pe date noi și acuratețea scade la 70%. De ce?

Overfitting. Modelul a memorat train set-ul, dar nu a învățat conceptul general.

Cross-Validation rezolvă asta: împarte datele în 5 părți (folds).
- Fold 1: test, restul train → măsoară acuratețea
- Fold 2: test, restul train → măsoară acuratețea
- ...
- Fold 5: test, restul train → măsoară acuratețea

Media celor 5 acuratețe = adevărata performanță a modelului.

Nu mai poți trișa. Nu mai poți memoriza. Cross-Validation îți spune adevărul dur.

Acesta este testul suprem al oricărui model de Machine Learning.`,
      icon: "✅",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStory < storyChapters.length - 1) {
      interval = setInterval(() => {
        setCurrentStory(prev => Math.min(prev + 1, storyChapters.length - 1));
      }, 3500);
    } else if (currentStory >= storyChapters.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStory]);

  const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
    <div className="relative group">
      {title && (
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
          {title}
        </div>
      )}
      <div className={`rounded-lg overflow-hidden border border-gray-700 ${title ? 'rounded-t-none' : ''}`}>
        <CodeBlockR language="python">{code}</CodeBlockR>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Navigation */}
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Clasificare Avansată, Pipelines & Tuning
                </h1>
                <p className="text-sm text-muted-foreground">Session 31: Advanced Classification with sklearn</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                <Brain className="w-3 h-3 mr-1" />
                Classification
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <Target className="w-3 h-3 mr-1" />
                Pipelines
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-lg">
              Session 31
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Clasificare Avansată, Pipelines & Tuning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            De la detectarea cancerului la construirea sistemelor de clasificare sigure și reproductibile
          </p>
        </div>

        {/* Origin Story - Collapsible */}
        <details open className="mb-12">
          <summary className="cursor-pointer list-none">
            <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-2 border-orange-200 dark:border-orange-700 shadow-2xl hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  📖 Povestea Clasificării Avansate
                </h2>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPlaying(!isPlaying);
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isPlaying ? 'Pauză' : 'Redare Auto'}
                  </Button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">(Click to collapse/expand)</span>
                </div>
              </div>
            </Card>
          </summary>

          <Card className="mt-4 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-2 border-orange-200 dark:border-orange-700">
            <div className="space-y-4">
            {storyChapters.map((chapter, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 transition-all duration-500 cursor-pointer ${
                  currentStory === index
                    ? 'border-orange-400 bg-orange-50/50 dark:bg-orange-900/10 shadow-lg scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-orange-300 hover:bg-orange-50/30'
                }`}
                onClick={() => setCurrentStory(index)}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{chapter.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {chapter.title}
                    </h3>
                    {currentStory === index && (
                      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                        {chapter.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

            <div className="flex gap-2 mt-6 justify-center">
              {storyChapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStory === index ? 'w-12 bg-orange-500' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </Card>
        </details>

        {/* Main Content */}
        <Tabs defaultValue="part1" className="space-y-8">
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger
              value="part1"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-red-200"
            >
              <span className="mr-2">🏥</span>
              Partea 1: Dataset Breast C.
            </TabsTrigger>
            <TabsTrigger
              value="part2"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-orange-200"
            >
              <span className="mr-2">⚖️</span>
              Partea 2: Trei Clasificatori
            </TabsTrigger>
            <TabsTrigger
              value="part3"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-purple-200"
            >
              <span className="mr-2">🔧</span>
              Partea 3: Pipelines
            </TabsTrigger>
            <TabsTrigger
              value="part4"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-green-200"
            >
              <span className="mr-2">⚙️</span>
              Partea 4: GridSearch
            </TabsTrigger>
          </TabsList>

          {/* Part 1: Breast Cancer Dataset */}
          <TabsContent value="part1">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-red-200 dark:border-red-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                🏥 Partea 1: Dataset-ul Breast Cancer - Nevoia Reală
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-300">
                    📊 Contexul Medical Real
                  </h3>
                  <p className="text-lg mb-4">
                    În 1995, Dr. William H. Wolberg de la University of Wisconsin a început să colecteze date despre tumori de sân.
                    Întrebarea lui: <strong>"Pot caracteristicile celulelor să ne spună dacă tumora este cancer?"</strong>
                  </p>
                  <ul className="space-y-2">
                    <li><strong>569 paciente</strong> - fiecare cu o poveste, o familie, o viață</li>
                    <li><strong>30 de caracteristici</strong> - radius, textură, perimetru, arie, smoothness</li>
                    <li><strong>2 clase</strong> - Malignă (cancer) sau Benignă (nu este cancer)</li>
                    <li><strong>Scopul</strong> - Diagnostic timpuriu, salvarea de vieți</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">
                    💡 De Ce Este Diferit De Session 30?
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Session 30 - Regression:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Prețul casei: 250.000€, 300.000€, 175.000€</li>
                        <li>• Valori continue - orice număr posibil</li>
                        <li>• Metrica: RMSE, R² Score</li>
                        <li>• Linear Regression, Random Forest Regressor</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-700 dark:text-red-300 mb-2">Session 31 - Classification:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Diagnostic: Malignă SAU Benignă</li>
                        <li>• Valori discrete - doar 0 sau 1</li>
                        <li>• Metrica: Acuratețe, Precision, Recall</li>
                        <li>• SVM, Random Forest Classifier, KNN</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="real">🏥 Aplicație Reală</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    title="Încărcarea și Explorarea Dataset-ului Breast Cancer"
                    code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ========================================
# PARTEA 1: ÎNCĂRCAREA DATASET-ULUI
# ========================================

# Încarcă dataset-ul breast cancer de la sklearn
cancer_data = load_breast_cancer()

print("📊 INFORMAȚII DESPRE DATASET:")
print(f"Număr de sample: {cancer_data.data.shape[0]}")
print(f"Număr de features: {cancer_data.data.shape[1]}")
print(f"Clase: {cancer_data.target_names}")
print()

# Creează DataFrame pentru o vizualizare mai bună
df = pd.DataFrame(cancer_data.data, columns=cancer_data.feature_names)
df['target'] = cancer_data.target

print("🔍 PRIMELE 5 RÂNDURI:")
print(df.head())
print()

# ========================================
# PARTEA 2: EXPLORAREA DATELOR
# ========================================

print("📈 STATISTICI DESCRIPTIVE:")
print(df.describe())
print()

# Verifică distribuția claselor
print("⚖️ DISTRIBUȚIA CLASELOR:")
print(f"Malignă (0): {sum(cancer_data.target == 0)} paciente")
print(f"Benignă (1): {sum(cancer_data.target == 1)} paciente")
print()

# Vizualizare: Distribuția primelor 4 features
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
features_to_plot = ['mean radius', 'mean texture', 'mean perimeter', 'mean area']

for idx, feature in enumerate(features_to_plot):
    ax = axes[idx // 2, idx % 2]

    # Histogramă pentru fiecare clasă
    df[df['target'] == 0][feature].hist(ax=ax, alpha=0.5, label='Malignă',
                                         color='red', bins=30)
    df[df['target'] == 1][feature].hist(ax=ax, alpha=0.5, label='Benignă',
                                         color='green', bins=30)

    ax.set_xlabel(feature)
    ax.set_ylabel('Frecvență')
    ax.set_title(f'Distribuția: {feature}')
    ax.legend()

plt.tight_layout()
plt.savefig('breast_cancer_features_distribution.png', dpi=300, bbox_inches='tight')
print("✅ Grafic salvat: breast_cancer_features_distribution.png")
print()

# ========================================
# PARTEA 3: PREGĂTIREA DATELOR
# ========================================

# Separare features (X) și target (y)
X = cancer_data.data
y = cancer_data.target

# Split în train și test (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("📦 SPLIT TRAIN-TEST:")
print(f"Training set: {X_train.shape[0]} sample")
print(f"Test set: {X_test.shape[0]} sample")
print()

# ========================================
# PARTEA 4: NORMALIZARE (CRUCIAL!)
# ========================================

# IMPORTANT: fit_transform() pe train, doar transform() pe test
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("🔧 NORMALIZARE COMPLETĂ:")
print(f"Înainte - Mean prima feature train: {X_train[:, 0].mean():.2f}")
print(f"După - Mean prima feature train: {X_train_scaled[:, 0].mean():.2f}")
print(f"După - Std prima feature train: {X_train_scaled[:, 0].std():.2f}")
print()

# Vizualizare: Efect normalizare
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Înainte de normalizare
ax1.boxplot([X_train[:, i] for i in range(5)], labels=cancer_data.feature_names[:5])
ax1.set_title('Înainte de Normalizare', fontsize=14, fontweight='bold')
ax1.set_ylabel('Valoare')
ax1.tick_params(axis='x', rotation=45)

# După normalizare
ax2.boxplot([X_train_scaled[:, i] for i in range(5)], labels=cancer_data.feature_names[:5])
ax2.set_title('După Normalizare (StandardScaler)', fontsize=14, fontweight='bold')
ax2.set_ylabel('Valoare Normalizată')
ax2.tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.savefig('normalization_effect.png', dpi=300, bbox_inches='tight')
print("✅ Grafic salvat: normalization_effect.png")

# ========================================
# DE CE NORMALIZARE?
# ========================================
print("""
🎯 DE CE ESTE NORMALIZAREA CRUCIALĂ?

1. SCARA DIFERITĂ A FEATURES:
   - 'mean radius': 6-28 (diferență de ~22)
   - 'mean area': 143-2501 (diferență de ~2358)

   Fără normalizare, 'mean area' ar domina modelul!

2. ALGORITMI SENSIBILI:
   - SVM: bazat pe distanțe → trebuie scale similar
   - KNN: distanța Euclideană → trebuie scale similar
   - Neural Networks: converge mai repede cu date normalizate

3. INTERPRETARE:
   - După normalizare: toate features au contribuție echitabilă
   - Coeficienții modelului sunt comparabili

🔒 REGULA DE AUR: fit_transform() DOAR pe TRAIN!
   - Test set-ul NU TREBUIE să influențeze media/std
   - Altfel → DATA LEAKAGE → rezultate false
""")`}
                  />
                </TabsContent>

                <TabsContent value="real" className="mt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
                      🏥 Aplicație În Lumea Reală: Sistem De Diagnostic Medical
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-red-700 dark:text-red-300">
                          📋 Fluxul De Lucru În Spital
                        </h4>
                        <ol className="space-y-3">
                          <li className="flex items-start gap-3">
                            <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                            <div>
                              <strong>Biopsie Fine Needle Aspiration (FNA)</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Doctorul extrage probe de celule din tumoare</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                            <div>
                              <strong>Analiză Imagini Digitale</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Imagini sunt procesate → se extrag 30 de features numerice</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                            <div>
                              <strong>Model ML Face Predicția</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Features → StandardScaler → Classifier → Probabilitate malignitate</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                            <div>
                              <strong>Decizie Medicală</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Doctorul primește raport → combină cu experiența clinică → diagnostic final</p>
                            </div>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                          ✅ Impactul În Viața Reală
                        </h4>
                        <ul className="space-y-2">
                          <li><strong>Diagnostic mai rapid:</strong> De la zile la minute</li>
                          <li><strong>Obiectivitate:</strong> Reduce variabilitatea umană între doctori</li>
                          <li><strong>Second opinion:</strong> Confirmă sau contestă diagnosticul uman</li>
                          <li><strong>Salvare de vieți:</strong> Detectare timpurie = șanse mai mari de supraviețuire</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
                        <h4 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-300">
                          ⚠️ Considerații Etice
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• ML este un <strong>asistent</strong>, nu înlocuitor pentru doctor</li>
                          <li>• Trebuie să înțelegem când modelul greșește (Confusion Matrix)</li>
                          <li>• False Negative (cancer ratat) = mult mai grav decât False Positive</li>
                          <li>• Transparența: doctorul trebuie să înțeleagă de ce modelul zice "malignă"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                      ✍️ Exercițiu Practic: Construiește-ți Propriul Explorer
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 1: Analiza Corelațiilor</h4>
                        <p className="mb-4">Creează o hartă de corelații (heatmap) pentru primele 10 features și identifică care sunt cele mai corelate cu target-ul.</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Hint: folosește seaborn</p>
                          <p>correlation_matrix = df.iloc[:, :11].corr()</p>
                          <p>sns.heatmap(correlation_matrix, annot=True, ...)</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 2: Feature Importance Vizualizare</h4>
                        <p className="mb-4">Creează scatter plot pentru cele mai importante 2 features, colorând punctele după clasă (malignă/benignă).</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Hint: 'mean radius' și 'mean texture' sunt bune de început</p>
                          <p>plt.scatter(malign_data['mean radius'], ...)</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 3: Data Leakage Simulation</h4>
                        <p className="mb-4">Încearcă să normalizezi GREȘIT (fit_transform pe întreg dataset) și vezi diferența de performanță.</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Varianta GREȘITĂ (pentru experiment):</p>
                          <p>X_scaled_wrong = scaler.fit_transform(X)</p>
                          <p># Apoi split în train/test</p>
                          <p># Compară cu varianta corectă!</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-sm">
                          <strong>💡 Sfat:</strong> Rulează fiecare exercițiu și salvează graficele.
                          Compară rezultatele cu colegii. Discută ce ai descoperit!
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* Part 2: Three Classifiers Comparison */}
          <TabsContent value="part2">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-orange-200 dark:border-orange-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ⚖️ Partea 2: Trei Clasificatori - Cine Este Cel Mai Bun?
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-orange-700 dark:text-orange-300">
                    🤔 De Ce Avem Nevoie De Mai Mulți Algoritmi?
                  </h3>
                  <p className="text-lg mb-4">
                    Fiecare algoritm de clasificare "vede" datele diferit. Nu există un algoritm perfect pentru toate problemele.
                    <br /><strong>No Free Lunch Theorem</strong>: "Nu există un algoritm care să fie cel mai bun pentru toate task-urile."
                  </p>
                  <p className="text-lg">
                    De aceea, vom compara <strong>3 algoritmi fundamentali</strong> și vom învăța când să folosim fiecare.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">
                      1️⃣ Support Vector Machine (SVM)
                    </h4>
                    <ul className="text-sm space-y-2">
                      <li><strong>Idee:</strong> Găsește hiperplanul optimal care separă clasele</li>
                      <li><strong>Când:</strong> Date cu multe dimensiuni, separare clară</li>
                      <li><strong>Avantaj:</strong> Funcționează excelent cu date complexe</li>
                      <li><strong>Dezavantaj:</strong> Lent pe dataset-uri mari</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-3 text-green-700 dark:text-green-300">
                      2️⃣ Random Forest
                    </h4>
                    <ul className="text-sm space-y-2">
                      <li><strong>Idee:</strong> Mulți arbori de decizie votează împreună</li>
                      <li><strong>Când:</strong> Date cu relații non-lineare</li>
                      <li><strong>Avantaj:</strong> Robust, greu de overfit, feature importance</li>
                      <li><strong>Dezavantaj:</strong> Mai greu de interpretat decât un singur arbore</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-300">
                      3️⃣ K-Nearest Neighbors (KNN)
                    </h4>
                    <ul className="text-sm space-y-2">
                      <li><strong>Idee:</strong> "Arată-mi vecinii tăi și-ți voi spune cine ești"</li>
                      <li><strong>Când:</strong> Date cu grupuri bine definite</li>
                      <li><strong>Avantaj:</strong> Simplu, intuitiv, no training phase</li>
                      <li><strong>Dezavantaj:</strong> Lent la predicție, sensibil la scale</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="results">📊 Rezultate & Analiză</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    title="Comparație Între Trei Clasificatori"
                    code={`import numpy as np
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Presupunem că avem deja X_train_scaled, X_test_scaled, y_train, y_test

# ========================================
# MODEL 1: SUPPORT VECTOR MACHINE (SVM)
# ========================================

print("=" * 60)
print("🔵 MODEL 1: SUPPORT VECTOR MACHINE (SVM)")
print("=" * 60)

# Creează și antrenează modelul SVM
svm_model = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)
svm_model.fit(X_train_scaled, y_train)

# Predicții
svm_predictions = svm_model.predict(X_test_scaled)

# Evaluare
svm_accuracy = accuracy_score(y_test, svm_predictions)
print(f"\\n✅ Acuratețe SVM: {svm_accuracy:.4f} ({svm_accuracy * 100:.2f}%)")

print("\\n📋 Classification Report SVM:")
print(classification_report(y_test, svm_predictions,
                          target_names=['Malignă', 'Benignă']))

# Confusion Matrix
svm_cm = confusion_matrix(y_test, svm_predictions)
print("\\n🎯 Confusion Matrix SVM:")
print(svm_cm)

# ========================================
# MODEL 2: RANDOM FOREST
# ========================================

print("\\n" + "=" * 60)
print("🟢 MODEL 2: RANDOM FOREST")
print("=" * 60)

# Creează și antrenează Random Forest
rf_model = RandomForestClassifier(n_estimators=100, max_depth=10,
                                 random_state=42, n_jobs=-1)
rf_model.fit(X_train_scaled, y_train)

# Predicții
rf_predictions = rf_model.predict(X_test_scaled)

# Evaluare
rf_accuracy = accuracy_score(y_test, rf_predictions)
print(f"\\n✅ Acuratețe Random Forest: {rf_accuracy:.4f} ({rf_accuracy * 100:.2f}%)")

print("\\n📋 Classification Report Random Forest:")
print(classification_report(y_test, rf_predictions,
                          target_names=['Malignă', 'Benignă']))

# Confusion Matrix
rf_cm = confusion_matrix(y_test, rf_predictions)
print("\\n🎯 Confusion Matrix Random Forest:")
print(rf_cm)

# Feature Importance (bonus pentru Random Forest)
print("\\n⭐ TOP 10 CELE MAI IMPORTANTE FEATURES:")
feature_importance = pd.DataFrame({
    'feature': cancer_data.feature_names,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

print(feature_importance.head(10))

# ========================================
# MODEL 3: K-NEAREST NEIGHBORS (KNN)
# ========================================

print("\\n" + "=" * 60)
print("🟣 MODEL 3: K-NEAREST NEIGHBORS (KNN)")
print("=" * 60)

# Creează și antrenează KNN
knn_model = KNeighborsClassifier(n_neighbors=5, metric='euclidean')
knn_model.fit(X_train_scaled, y_train)

# Predicții
knn_predictions = knn_model.predict(X_test_scaled)

# Evaluare
knn_accuracy = accuracy_score(y_test, knn_predictions)
print(f"\\n✅ Acuratețe KNN: {knn_accuracy:.4f} ({knn_accuracy * 100:.2f}%)")

print("\\n📋 Classification Report KNN:")
print(classification_report(y_test, knn_predictions,
                          target_names=['Malignă', 'Benignă']))

# Confusion Matrix
knn_cm = confusion_matrix(y_test, knn_predictions)
print("\\n🎯 Confusion Matrix KNN:")
print(knn_cm)

# ========================================
# COMPARAȚIE FINALĂ
# ========================================

print("\\n" + "=" * 60)
print("📊 COMPARAȚIE FINALĂ")
print("=" * 60)

comparison = pd.DataFrame({
    'Model': ['SVM', 'Random Forest', 'KNN'],
    'Acuratețe': [svm_accuracy, rf_accuracy, knn_accuracy]
}).sort_values('Acuratețe', ascending=False)

print(comparison)
print(f"\\n🏆 CÂȘTIGĂTORUL: {comparison.iloc[0]['Model']} cu {comparison.iloc[0]['Acuratețe']:.4f}")

# ========================================
# VIZUALIZARE: CONFUSION MATRICES
# ========================================

fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# SVM
disp1 = ConfusionMatrixDisplay(confusion_matrix=svm_cm,
                               display_labels=['Malignă', 'Benignă'])
disp1.plot(ax=axes[0], cmap='Blues', values_format='d')
axes[0].set_title(f'SVM\\nAcuratețe: {svm_accuracy:.4f}', fontsize=14, fontweight='bold')

# Random Forest
disp2 = ConfusionMatrixDisplay(confusion_matrix=rf_cm,
                               display_labels=['Malignă', 'Benignă'])
disp2.plot(ax=axes[1], cmap='Greens', values_format='d')
axes[1].set_title(f'Random Forest\\nAcuratețe: {rf_accuracy:.4f}', fontsize=14, fontweight='bold')

# KNN
disp3 = ConfusionMatrixDisplay(confusion_matrix=knn_cm,
                               display_labels=['Malignă', 'Benignă'])
disp3.plot(ax=axes[2], cmap='Purples', values_format='d')
axes[2].set_title(f'KNN\\nAcuratețe: {knn_accuracy:.4f}', fontsize=14, fontweight='bold')

plt.tight_layout()
plt.savefig('classifiers_confusion_matrices.png', dpi=300, bbox_inches='tight')
print("\\n✅ Grafic salvat: classifiers_confusion_matrices.png")

# ========================================
# ÎNȚELEGEREA METRICILOR
# ========================================

print("""
\\n📚 ÎNȚELEGEREA METRICILOR DE CLASIFICARE:

1. ACCURACY (Acuratețe):
   - (TP + TN) / Total
   - Câte predicții corecte din total
   - ⚠️ Poate fi înșelătoare cu clase imbalanced!

2. PRECISION (Precizie):
   - TP / (TP + FP)
   - Din ce am zis că e pozitiv, câte chiar sunt?
   - Important când False Positive e costisitor

3. RECALL (Sensitivitate):
   - TP / (TP + FN)
   - Din toate pozitivele reale, câte am găsit?
   - Important când False Negative e costisitor

4. F1-SCORE:
   - 2 * (Precision * Recall) / (Precision + Recall)
   - Medie armonică între Precision și Recall
   - Bună pentru evaluare overall

🏥 PENTRU DETECTAREA CANCERULUI:
   - RECALL e crucial! (nu vrem să ratăm cancer = False Negative)
   - False Negative (cancer ratat) >> False Positive (alarmă falsă)
""")`}
                  />
                </TabsContent>

                <TabsContent value="results" className="mt-6">
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                        📊 Rezultate Tipice Pe Dataset-ul Breast Cancer
                      </h3>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-orange-100 dark:bg-orange-900/30">
                              <th className="border p-3 text-left">Model</th>
                              <th className="border p-3 text-center">Acuratețe</th>
                              <th className="border p-3 text-center">Precision (Malignă)</th>
                              <th className="border p-3 text-center">Recall (Malignă)</th>
                              <th className="border p-3 text-center">F1-Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                              <td className="border p-3 font-semibold">SVM</td>
                              <td className="border p-3 text-center">97.4%</td>
                              <td className="border p-3 text-center">95.2%</td>
                              <td className="border p-3 text-center">95.2%</td>
                              <td className="border p-3 text-center">0.95</td>
                            </tr>
                            <tr className="hover:bg-green-50 dark:hover:bg-green-900/20">
                              <td className="border p-3 font-semibold">Random Forest</td>
                              <td className="border p-3 text-center">96.5%</td>
                              <td className="border p-3 text-center">93.8%</td>
                              <td className="border p-3 text-center">93.8%</td>
                              <td className="border p-3 text-center">0.94</td>
                            </tr>
                            <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
                              <td className="border p-3 font-semibold">KNN</td>
                              <td className="border p-3 text-center">95.6%</td>
                              <td className="border p-3 text-center">92.3%</td>
                              <td className="border p-3 text-center">92.3%</td>
                              <td className="border p-3 text-center">0.92</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6 mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                          🏆 Câștigător: SVM - Dar De Ce?
                        </h4>
                        <ul className="space-y-2">
                          <li><strong>1. Separare Liniară în Spațiu Transformat:</strong> Kernel RBF transformă datele într-un spațiu unde clasele sunt separabile liniar</li>
                          <li><strong>2. Robustețe La Outliers:</strong> SVM se concentrează pe "support vectors" (punctele de la graniță), nu pe toate datele</li>
                          <li><strong>3. Performanță Cu Date De Dimensionalitate Mare:</strong> 30 features = high-dimensional space unde SVM excelează</li>
                          <li><strong>4. Regularizare Automată:</strong> Parametrul C controlează tradeoff-ul între margin width și classificare corectă</li>
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-500">
                          <h4 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300">
                            ❌ Când SVM Nu Este Ideal
                          </h4>
                          <ul className="text-sm space-y-1">
                            <li>• Dataset-uri FOARTE mari (&gt;100K samples) - prea lent</li>
                            <li>• Când interpretabilitatea e crucială</li>
                            <li>• Când vrei feature importance (Random Forest e mai bun)</li>
                            <li>• Real-time prediction cu latență critică</li>
                          </ul>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
                          <h4 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
                            ✅ Când Random Forest E Preferabil
                          </h4>
                          <ul className="text-sm space-y-1">
                            <li>• Vrei feature importance scores</li>
                            <li>• Relații non-lineare complexe</li>
                            <li>• Mai puțin tuning de hyperparametri</li>
                            <li>• Predicții mai rapide decât SVM</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                      <h4 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
                        🔍 Analiza Confusion Matrix - Ce Înseamnă Numerele?
                      </h4>

                      <div className="bg-white dark:bg-gray-800 rounded p-4 mb-4">
                        <pre className="text-sm">
{`Confusion Matrix SVM:
                 Predicted
                 Malignă  Benignă
Actual Malignă    40        2      ← 2 False Negatives (PERICOL!)
       Benignă     1       71      ← 1 False Positive (alarmă falsă)
`}
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-red-600 dark:text-red-400 mb-2">⚠️ False Negatives (2 cazuri)</h5>
                          <p className="text-sm">
                            Tumori maligne clasificate greșit ca benigne. <strong>FOARTE PERICULOS!</strong>
                            Pacientul pleacă acasă fără tratament.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">⚠️ False Positives (1 caz)</h5>
                          <p className="text-sm">
                            Tumori benigne clasificate greșit ca maligne. Mai puțin grav - vor face teste suplimentare și vor descoperi adevărul.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                      ✍️ Exerciții Practice: Devino Expert În Clasificare
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                          Experimentează Cu Hyperparametri KNN
                        </h4>
                        <p className="mb-3">Testează KNN cu diferite valori pentru n_neighbors: [1, 3, 5, 7, 9, 11, 15, 20]</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <p>for k in [1, 3, 5, 7, 9, 11, 15, 20]:</p>
                          <p>    knn = KNeighborsClassifier(n_neighbors=k)</p>
                          <p>    # antrenează și evaluează</p>
                          <p>    # salvează acuratețea</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Întrebări:</strong> Ce valoare k dă cea mai bună acuratețe? De ce k=1 poate avea probleme? Ce se întâmplă cu k foarte mare?
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                          Compară Kernels Pentru SVM
                        </h4>
                        <p className="mb-3">Testează SVM cu kernel='linear', kernel='rbf', kernel='poly'</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <p>for kernel in ['linear', 'rbf', 'poly']:</p>
                          <p>    svm = SVC(kernel=kernel, C=1.0)</p>
                          <p>    # antrenează și compară rezultate</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Observă:</strong> Care kernel dă cele mai bune rezultate pe acest dataset? Gândește-te la geometria datelor!
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                          Vizualizează Feature Importance Pentru Random Forest
                        </h4>
                        <p className="mb-3">Creează un bar chart cu top 15 cele mai importante features</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <p>importances = rf_model.feature_importances_</p>
                          <p>indices = np.argsort(importances)[::-1][:15]</p>
                          <p># creează bar plot cu matplotlib/seaborn</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Analizează:</strong> Care features sunt cele mai importante pentru diagnostic? Are sens medical?
                        </p>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-sm">
                          <strong>🎯 Provocare Finală:</strong> Combină tot ce ai învățat și creează un raport PDF cu:
                          <br />• Comparație între cei 3 algoritmi
                          <br />• Confusion matrices vizualizate
                          <br />• Analiza feature importance
                          <br />• Recomandarea ta: care model ai folosi în producție și de ce?
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* Part 3: Pipelines */}
          <TabsContent value="part3">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-purple-200 dark:border-purple-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                🔧 Partea 3: Pipelines - Evită Data Leakage!
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-6 mb-6 border-l-4 border-red-500">
                  <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-300">
                    ⚠️ Problema: Data Leakage - Crima Tăcută A ML
                  </h3>
                  <p className="text-lg mb-4">
                    Imaginează-ți: Dai un examen, dar ai văzut deja răspunsurile înainte. Vei avea 100%, dar nu ai învățat nimic.
                  </p>
                  <p className="text-lg">
                    <strong>Data Leakage</strong> = când modelul "vede" informații din test set în timpul antrenamentului.
                    <br />Rezultat: Acuratețe excelentă pe test, dar performanță dezastruoasă pe date noi reale!
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                    💡 Soluția: Pipeline - Conduita Sigură
                  </h3>
                  <p className="text-lg mb-4">
                    Un <strong>Pipeline</strong> este ca o linie de asamblare: fiecare pas se execută în ordinea corectă, fără scurgeri.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-4">
                    <p className="font-mono text-sm">
                      Pipeline = [ StandardScaler() → Classifier() ]
                    </p>
                    <p className="mt-2">
                      Când faci <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">pipeline.fit(X_train, y_train)</code>:
                    </p>
                    <ol className="mt-2 space-y-1">
                      <li>1. StandardScaler învață media și std DOAR din X_train</li>
                      <li>2. Transformă X_train folosind acele valori</li>
                      <li>3. Classifier se antrenează pe X_train transformat</li>
                    </ol>
                    <p className="mt-2">
                      Când faci <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">pipeline.predict(X_test)</code>:
                    </p>
                    <ol className="mt-2 space-y-1">
                      <li>1. StandardScaler transformă X_test cu media/std învățate din train</li>
                      <li>2. Classifier face predicția</li>
                      <li>3. <strong className="text-green-600 dark:text-green-400">ZERO data leakage!</strong></li>
                    </ol>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="wrong">❌ Exemplu GREȘIT</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    title="Construirea Pipelines Sigure"
                    code={`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score

# Presupunem că avem X_train, X_test, y_train, y_test (NON-scaled!)

# ========================================
# PIPELINE 1: SVM CU STANDARD SCALER
# ========================================

print("=" * 60)
print("🔵 PIPELINE 1: StandardScaler → SVM")
print("=" * 60)

# Creează pipeline-ul
svm_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42))
])

# Antrenează pipeline-ul (scalare + antrenare într-un singur pas!)
svm_pipeline.fit(X_train, y_train)

# Predicție (scalare + predicție automat!)
svm_pred = svm_pipeline.predict(X_test)
svm_accuracy = accuracy_score(y_test, svm_pred)

print(f"\\n✅ Acuratețe SVM Pipeline: {svm_accuracy:.4f}")
print(f"\\n📋 Pași în pipeline: {[name for name, _ in svm_pipeline.steps]}")

# ========================================
# PIPELINE 2: RANDOM FOREST
# ========================================

print("\\n" + "=" * 60)
print("🟢 PIPELINE 2: StandardScaler → Random Forest")
print("=" * 60)

rf_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, max_depth=10,
                                         random_state=42))
])

rf_pipeline.fit(X_train, y_train)
rf_pred = rf_pipeline.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_pred)

print(f"\\n✅ Acuratețe Random Forest Pipeline: {rf_accuracy:.4f}")

# ========================================
# PIPELINE 3: KNN
# ========================================

print("\\n" + "=" * 60)
print("🟣 PIPELINE 3: StandardScaler → KNN")
print("=" * 60)

knn_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', KNeighborsClassifier(n_neighbors=5))
])

knn_pipeline.fit(X_train, y_train)
knn_pred = knn_pipeline.predict(X_test)
knn_accuracy = accuracy_score(y_test, knn_pred)

print(f"\\n✅ Acuratețe KNN Pipeline: {knn_accuracy:.4f}")

# ========================================
# BENEFICIILE PIPELINE-URILOR
# ========================================

print("\\n" + "=" * 60)
print("🎯 BENEFICIILE PIPELINE-URILOR")
print("=" * 60)

print("""
1. 🔒 ZERO DATA LEAKAGE:
   - Scaler învață DOAR din train
   - Test nu influențează niciodată transformările

2. 📝 COD MAI CURAT:
   - fit() și predict() într-un singur apel
   - Nu mai ai nevoie de variabile separate pentru scaled data

3. 🔄 REPRODUCIBILITATE:
   - Întregul workflow într-un singur obiect
   - Poți salva pipeline-ul și îl folosești identic mai târziu

4. 🚀 DEPLOYMENT MAI UȘOR:
   - Un singur obiect de salvat: pickle.dump(pipeline, file)
   - În producție: pickle.load() → pipeline.predict()

5. 🛠️ COMPATIBIL CU GRIDSERCHCV:
   - Poți optimiza hyperparametri pentru TOȚI pașii
   - Cross-validation corectă automat
""")

# ========================================
# SALVARE ȘI ÎNCĂRCARE PIPELINE
# ========================================

print("\\n" + "=" * 60)
print("💾 SALVARE ȘI ÎNCĂRCARE PIPELINE")
print("=" * 60)

import joblib

# Salvează cel mai bun pipeline
best_pipeline = svm_pipeline
joblib.dump(best_pipeline, 'breast_cancer_classifier_pipeline.pkl')
print("\\n✅ Pipeline salvat: breast_cancer_classifier_pipeline.pkl")

# Încarcă pipeline-ul
loaded_pipeline = joblib.load('breast_cancer_classifier_pipeline.pkl')
print("✅ Pipeline încărcat cu succes!")

# Testează că funcționează identic
loaded_pred = loaded_pipeline.predict(X_test)
loaded_accuracy = accuracy_score(y_test, loaded_pred)
print(f"\\n🔍 Acuratețe pipeline încărcat: {loaded_accuracy:.4f}")
print(f"✅ Match cu original: {loaded_accuracy == svm_accuracy}")

# ========================================
# PREDICȚIE PE DATE NOI (SIMULARE)
# ========================================

print("\\n" + "=" * 60)
print("🏥 PREDICȚIE PE DATE NOI - SIMULARE SPITAL")
print("=" * 60)

# Simulează un pacient nou (30 features)
new_patient = np.array([cancer_data.data[0]])  # folosim prima sample ca exemplu

print("\\n📋 Date pacient nou (primele 5 features):")
print(new_patient[0][:5])

# Predicție cu pipeline (scalare automată!)
prediction = loaded_pipeline.predict(new_patient)
prediction_proba = loaded_pipeline.predict_proba(new_patient)

diagnosis = "Malignă 🔴" if prediction[0] == 0 else "Benignă 🟢"
confidence = max(prediction_proba[0]) * 100

print(f"\\n🏥 DIAGNOSTIC: {diagnosis}")
print(f"📊 Confidence: {confidence:.2f}%")
print(f"\\n📈 Probabilități:")
print(f"   - Malignă: {prediction_proba[0][0] * 100:.2f}%")
print(f"   - Benignă: {prediction_proba[0][1] * 100:.2f}%")

if prediction[0] == 0:
    print("\\n⚠️ RECOMANDARE: Consultare oncolog urgentă + biopsie suplimentară")
else:
    print("\\n✅ RECOMANDARE: Control de rutină peste 6 luni")

# ========================================
# CROSS-VALIDATION CU PIPELINE
# ========================================

print("\\n" + "=" * 60)
print("🔄 CROSS-VALIDATION CU PIPELINE (5-Fold)")
print("=" * 60)

# Cross-validation pe SVM pipeline
cv_scores = cross_val_score(svm_pipeline, X_train, y_train, cv=5, scoring='accuracy')

print(f"\\n📊 Scoruri pentru fiecare fold:")
for i, score in enumerate(cv_scores, 1):
    print(f"   Fold {i}: {score:.4f}")

print(f"\\n✅ Media: {cv_scores.mean():.4f} (±{cv_scores.std():.4f})")
print(f"\\n💡 Interpretare:")
print(f"   - Modelul are ~{cv_scores.mean() * 100:.2f}% acuratețe pe date nevăzute")
print(f"   - Variație mică ({cv_scores.std():.4f}) = model stabil!")

print("""
\\n🎓 DE CE CROSS-VALIDATION?
   - Un singur test set poate fi norocos/nenorocos
   - CV testează pe 5 părți diferite → estimare mai realistă
   - Detectează overfitting: dacă train score >> CV score
""")

`}
                  />
                </TabsContent>

                <TabsContent value="wrong" className="mt-6">
                  <div className="space-y-6">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-500">
                      <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-300">
                        ❌ COD GREȘIT - Data Leakage Clasic
                      </h3>

                      <CodeBlock
                        title="⚠️ NU FACE AȘA! (Data Leakage)"
                        code={`# ❌❌❌ GREȘIT! NU FACE AȘA! ❌❌❌

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Presupunem că avem X (features) și y (target)

# ❌ GREȘEALĂ: Scalezi ÎNAINTE de train-test split!
scaler = StandardScaler()
X_scaled_wrong = scaler.fit_transform(X)  # ← AICI E PROBLEMA!

# Acum faci split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled_wrong, y, test_size=0.2, random_state=42
)

# Antrenezi modelul
model = SVC()
model.fit(X_train, y_train)

# Testezi
accuracy = model.score(X_test, y_test)
print(f"Acuratețe: {accuracy:.4f}")  # Va fi UMFLATĂ artificial!

# ========================================
# DE CE ESTE GREȘIT?
# ========================================

print("""
🚨 PROBLEMA CU CODUL DE MAI SUS:

1. StandardScaler a calculat media și std pe ÎNTREG dataset-ul
   - A "văzut" și datele din test set
   - Test set-ul a influențat transformarea

2. Când normalizezi test set-ul:
   - Folosești media/std care INCLUDE datele de test
   - E ca și cum ai copia la examen!

3. Rezultat:
   - Acuratețe optimistă pe test (poate +2-5%)
   - Când pui modelul în producție pe date NEFINITE:
     * Performanța scade dramatic
     * Încrederea în model = distrusă
     * Potențial risc pentru pacienți (în cazul nostru medical)

4. În concluzie:
   - Modelul nu generalizează cum credeai
   - Ai luat decizii de business greșite
   - Reputația sistemului de ML = compromisă
""")`}
                      />
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-500">
                      <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
                        ✅ COD CORECT - Folosește Pipeline
                      </h3>

                      <CodeBlock
                        title="✅ CORECT! Așa DA!"
                        code={`# ✅✅✅ CORECT! ASA DA! ✅✅✅

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Presupunem că avem X (features) și y (target)

# ✅ CORECT: Mai întâi faci split pe date NON-scaled
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ✅ Creează Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', SVC())
])

# ✅ Fit pe train (scaler învață DOAR din train!)
pipeline.fit(X_train, y_train)

# ✅ Predict pe test (scaler transformă cu parametrii din train)
accuracy = pipeline.score(X_test, y_test)
print(f"Acuratețe: {accuracy:.4f}")  # Acuratețe REALISTĂ!

# ========================================
# DE CE ESTE CORECT?
# ========================================

print("""
✅ DE CE FUNCȚIONEAZĂ CORECT:

1. Split ÎNAINTE de orice transformare:
   - Test set rămâne complet nevăzut
   - Nu influențează nicio statistică

2. Pipeline.fit(X_train, y_train):
   - StandardScaler.fit(X_train) → învață media/std DOAR din train
   - StandardScaler.transform(X_train) → transformă train
   - SVC.fit(X_train_transformed, y_train) → antrenează

3. Pipeline.predict(X_test):
   - StandardScaler.transform(X_test) → folosește media/std din TRAIN
   - SVC.predict(X_test_transformed) → predicție

4. Rezultat:
   - Acuratețe REALISTĂ
   - Performanța în producție = aproape de test
   - Model de încredere
   - Decizii de business corecte

5. Bonus:
   - Cod mai curat
   - Deployment mai ușor
   - Cross-validation corectă automat
""")`}
                      />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
                      <h4 className="text-xl font-semibold mb-3 text-yellow-700 dark:text-yellow-300">
                        🎓 Lecția Învățată
                      </h4>
                      <p className="text-lg mb-4">
                        <strong>REGULA DE AUR:</strong> Test set-ul trebuie să fie 100% nevăzut până la evaluarea finală!
                      </p>
                      <ul className="space-y-2">
                        <li><strong>• Train set:</strong> învață media, std, parametri, tot ce vrei</li>
                        <li><strong>• Validation set:</strong> (dacă îl folosești) ajustează hyperparametri</li>
                        <li><strong>• Test set:</strong> DOAR evaluare finală, ZERO influență asupra modelului</li>
                      </ul>
                      <p className="mt-4 text-sm italic">
                        "Data leakage este ca și cum ți-ai construi casa pe nisip - arată bine până la prima furtună."
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                      ✍️ Exercițiu: Detectează Data Leakage!
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">🔍 Exercițiul 1: Cod Review</h4>
                        <p className="mb-3">Citește următorul cod și identifică TOATE problemele de data leakage:</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <pre>{`# Cod de analizat:
df = load_data()
df_filled = df.fillna(df.mean())  # ← Problema 1?
X = df_filled.drop('target', axis=1)
y = df_filled['target']
X_scaled = StandardScaler().fit_transform(X)  # ← Problema 2?
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)
model = RandomForestClassifier()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)`}</pre>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Întrebări:</strong> Câte probleme de leakage sunt? Cum le-ai repara cu Pipeline?
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">🛠️ Exercițiul 2: Construiește Pipeline Complex</h4>
                        <p className="mb-3">Creează un pipeline care:</p>
                        <ul className="list-disc list-inside space-y-2 mb-3">
                          <li>Umple valorile lipsă cu median pentru features numerice</li>
                          <li>Normalizează cu StandardScaler</li>
                          <li>Aplică PCA (reduce la 15 componente)</li>
                          <li>Antrenează Random Forest</li>
                        </ul>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Hint: Pipeline poate avea oricâți pași</p>
                          <p>from sklearn.impute import SimpleImputer</p>
                          <p>from sklearn.decomposition import PCA</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📊 Exercițiul 3: Compară Performance</h4>
                        <p className="mb-3">Rulează același model în 2 moduri și compară:</p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li><strong>Varianta 1:</strong> Scalare ÎNAINTE de split (greșit)</li>
                          <li><strong>Varianta 2:</strong> Pipeline (corect)</li>
                        </ol>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Observă:</strong> Cu cât diferă acuratețea? Explică de ce!
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* Part 4: GridSearchCV */}
          <TabsContent value="part4">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-green-200 dark:border-green-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                ⚙️ Partea 4: GridSearchCV - Găsește Setările Perfecte
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
                    🎯 Problema Hyperparametrilor
                  </h3>
                  <p className="text-lg mb-4">
                    Fiecare algoritm de ML are "butoane" care controlează comportamentul:
                  </p>
                  <ul className="space-y-2">
                    <li><strong>SVM:</strong> kernel ('linear', 'rbf', 'poly'), C (0.1, 1, 10), gamma (0.001, 0.01, 0.1)</li>
                    <li><strong>Random Forest:</strong> n_estimators (50, 100, 200), max_depth (5, 10, 20), min_samples_split</li>
                    <li><strong>KNN:</strong> n_neighbors (3, 5, 7, 9), weights ('uniform', 'distance'), metric ('euclidean', 'manhattan')</li>
                  </ul>
                  <p className="text-lg mt-4">
                    Cum găsim combinația perfectă? <strong>GridSearchCV!</strong>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                    🔍 Ce Face GridSearchCV?
                  </h4>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                      <div>
                        <strong>Primește o grilă de parametri:</strong>
                        <p className="text-sm">Ex: C=[0.1, 1, 10], kernel=['linear', 'rbf'] → 6 combinații</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                      <div>
                        <strong>Pentru FIECARE combinație:</strong>
                        <p className="text-sm">Rulează Cross-Validation (ex: 5-fold)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                      <div>
                        <strong>Calculează score-ul mediu:</strong>
                        <p className="text-sm">Media acurateței pe toate cele 5 folduri</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                      <div>
                        <strong>Returnează cea mai bună combinație:</strong>
                        <p className="text-sm">Parametrii care au dat cel mai mare score</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="results">📊 Analiza Rezultatelor</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    title="GridSearchCV - Optimizare Automată De Hyperparametri"
                    code={`from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd

# Presupunem că avem X_train, X_test, y_train, y_test

# ========================================
# GRIDSEARCHCV PENTRU SVM
# ========================================

print("=" * 60)
print("🔵 GRIDSEARCHCV PENTRU SVM")
print("=" * 60)

# Creează pipeline
svm_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', SVC(random_state=42))
])

# Definește grila de parametri
# NOTĂ: Pentru pipeline, folosim 'classifier__parametru'
param_grid_svm = {
    'classifier__C': [0.1, 1, 10, 100],
    'classifier__kernel': ['linear', 'rbf'],
    'classifier__gamma': ['scale', 0.001, 0.01, 0.1]
}

print(f"\\n📊 Număr total de combinații: {len(param_grid_svm['classifier__C']) * len(param_grid_svm['classifier__kernel']) * len(param_grid_svm['classifier__gamma'])}")
print("\\n🔍 Parametri de testat:")
for param, values in param_grid_svm.items():
    print(f"   {param}: {values}")

# Creează GridSearchCV
grid_search_svm = GridSearchCV(
    estimator=svm_pipeline,
    param_grid=param_grid_svm,
    cv=5,  # 5-fold cross-validation
    scoring='accuracy',
    n_jobs=-1,  # folosește toate核心ele CPU
    verbose=2  # afișează progres
)

print("\\n⏳ Antrenare în curs... (poate dura câteva minute)")
grid_search_svm.fit(X_train, y_train)

# Rezultate
print("\\n" + "=" * 60)
print("✅ ANTRENARE COMPLETĂ!")
print("=" * 60)

print(f"\\n🏆 CELE MAI BUNE PARAMETRI:")
for param, value in grid_search_svm.best_params_.items():
    print(f"   {param}: {value}")

print(f"\\n📊 Cel mai bun score (CV): {grid_search_svm.best_score_:.4f}")

# Testează pe test set
test_score = grid_search_svm.score(X_test, y_test)
print(f"📊 Score pe test set: {test_score:.4f}")

# ========================================
# GRIDSEARCHCV PENTRU RANDOM FOREST
# ========================================

print("\\n" + "=" * 60)
print("🟢 GRIDSEARCHCV PENTRU RANDOM FOREST")
print("=" * 60)

rf_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(random_state=42))
])

param_grid_rf = {
    'classifier__n_estimators': [50, 100, 200],
    'classifier__max_depth': [5, 10, 20, None],
    'classifier__min_samples_split': [2, 5, 10],
    'classifier__min_samples_leaf': [1, 2, 4]
}

print(f"\\n📊 Număr total de combinații: {len(param_grid_rf['classifier__n_estimators']) * len(param_grid_rf['classifier__max_depth']) * len(param_grid_rf['classifier__min_samples_split']) * len(param_grid_rf['classifier__min_samples_leaf'])}")

grid_search_rf = GridSearchCV(
    estimator=rf_pipeline,
    param_grid=param_grid_rf,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=1
)

print("\\n⏳ Antrenare Random Forest...")
grid_search_rf.fit(X_train, y_train)

print(f"\\n🏆 CELE MAI BUNE PARAMETRI:")
for param, value in grid_search_rf.best_params_.items():
    print(f"   {param}: {value}")

print(f"\\n📊 Cel mai bun score (CV): {grid_search_rf.best_score_:.4f}")
print(f"📊 Score pe test set: {grid_search_rf.score(X_test, y_test):.4f}")

# ========================================
# GRIDSEARCHCV PENTRU KNN
# ========================================

print("\\n" + "=" * 60)
print("🟣 GRIDSEARCHCV PENTRU KNN")
print("=" * 60)

knn_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', KNeighborsClassifier())
])

param_grid_knn = {
    'classifier__n_neighbors': [3, 5, 7, 9, 11, 15],
    'classifier__weights': ['uniform', 'distance'],
    'classifier__metric': ['euclidean', 'manhattan', 'minkowski']
}

print(f"\\n📊 Număr total de combinații: {len(param_grid_knn['classifier__n_neighbors']) * len(param_grid_knn['classifier__weights']) * len(param_grid_knn['classifier__metric'])}")

grid_search_knn = GridSearchCV(
    estimator=knn_pipeline,
    param_grid=param_grid_knn,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

print("\\n⏳ Antrenare KNN...")
grid_search_knn.fit(X_train, y_train)

print(f"\\n🏆 CELE MAI BUNE PARAMETRI:")
for param, value in grid_search_knn.best_params_.items():
    print(f"   {param}: {value}")

print(f"\\n📊 Cel mai bun score (CV): {grid_search_knn.best_score_:.4f}")
print(f"📊 Score pe test set: {grid_search_knn.score(X_test, y_test):.4f}")

# ========================================
# COMPARAȚIE FINALĂ
# ========================================

print("\\n" + "=" * 60)
print("🏆 COMPARAȚIE FINALĂ - DUPĂ TUNING")
print("=" * 60)

comparison_results = pd.DataFrame({
    'Model': ['SVM (tuned)', 'Random Forest (tuned)', 'KNN (tuned)'],
    'CV Score': [
        grid_search_svm.best_score_,
        grid_search_rf.best_score_,
        grid_search_knn.best_score_
    ],
    'Test Score': [
        grid_search_svm.score(X_test, y_test),
        grid_search_rf.score(X_test, y_test),
        grid_search_knn.score(X_test, y_test)
    ]
}).sort_values('Test Score', ascending=False)

print(comparison_results)
print(f"\\n🥇 CÂȘTIGĂTORUL: {comparison_results.iloc[0]['Model']}")
print(f"   CV Score: {comparison_results.iloc[0]['CV Score']:.4f}")
print(f"   Test Score: {comparison_results.iloc[0]['Test Score']:.4f}")

# ========================================
# SALVARE MODEL FINAL
# ========================================

print("\\n" + "=" * 60)
print("💾 SALVARE MODEL FINAL")
print("=" * 60)

import joblib

# Salvează cel mai bun model (presupunem că e SVM)
best_model = grid_search_svm.best_estimator_
joblib.dump(best_model, 'breast_cancer_best_model.pkl')

print("\\n✅ Model salvat: breast_cancer_best_model.pkl")
print(f"\\nℹ️ Modelul salvat include:")
print("   1. StandardScaler cu parametrii antrenați")
print("   2. SVM cu hyperparametri optimizați")
print("   3. Gata de deployment în producție!")

# ========================================
# ANALIZĂ DETALIATĂ REZULTATE GRIDSEARCH
# ========================================

print("\\n" + "=" * 60)
print("📊 ANALIZA DETALIATĂ - TOP 10 COMBINAȚII SVM")
print("=" * 60)

cv_results = pd.DataFrame(grid_search_svm.cv_results_)
top_10 = cv_results.nsmallest(10, 'rank_test_score')[
    ['params', 'mean_test_score', 'std_test_score', 'rank_test_score']
]

print(top_10.to_string(index=False))

print("""
\\n💡 INTERPRETARE:
   - mean_test_score: Media acurateței pe 5 folduri
   - std_test_score: Deviația standard (variabilitate)
   - rank_test_score: Ranking (1 = cel mai bun)

   🎯 Căutăm: score mare + std mic = model stabil și performant!
""")`}
                  />
                </TabsContent>

                <TabsContent value="results" className="mt-6">
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                        📊 Rezultate Tipice După GridSearchCV
                      </h3>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-green-100 dark:bg-green-900/30">
                              <th className="border p-3 text-left">Model</th>
                              <th className="border p-3 text-center">Înainte Tuning</th>
                              <th className="border p-3 text-center">După Tuning</th>
                              <th className="border p-3 text-center">Îmbunătățire</th>
                              <th className="border p-3 text-left">Parametri Optimi</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-3 font-semibold">SVM</td>
                              <td className="border p-3 text-center">97.4%</td>
                              <td className="border p-3 text-center">98.2%</td>
                              <td className="border p-3 text-center text-green-600 font-bold">+0.8%</td>
                              <td className="border p-3 text-sm">C=10, kernel='rbf', gamma=0.01</td>
                            </tr>
                            <tr>
                              <td className="border p-3 font-semibold">Random Forest</td>
                              <td className="border p-3 text-center">96.5%</td>
                              <td className="border p-3 text-center">97.8%</td>
                              <td className="border p-3 text-center text-green-600 font-bold">+1.3%</td>
                              <td className="border p-3 text-sm">n_estimators=200, max_depth=10</td>
                            </tr>
                            <tr>
                              <td className="border p-3 font-semibold">KNN</td>
                              <td className="border p-3 text-center">95.6%</td>
                              <td className="border p-3 text-center">96.9%</td>
                              <td className="border p-3 text-center text-green-600 font-bold">+1.3%</td>
                              <td className="border p-3 text-sm">n_neighbors=7, weights='distance'</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                          🔍 Ce Am Descoperit?
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold mb-2">1️⃣ SVM: C=10, kernel='rbf', gamma=0.01</p>
                            <ul className="text-sm space-y-1 ml-4">
                              <li>• <strong>C=10:</strong> Regularizare moderată (nu prea strictă, nu prea permisivă)</li>
                              <li>• <strong>kernel='rbf':</strong> Datele sunt separabile nonlinear (cercuri, curbe)</li>
                              <li>• <strong>gamma=0.01:</strong> Influență moderată a fiecărui punct de date</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">2️⃣ Random Forest: n_estimators=200, max_depth=10</p>
                            <ul className="text-sm space-y-1 ml-4">
                              <li>• <strong>200 arbori:</strong> Ensemble mai robust decât 50 sau 100</li>
                              <li>• <strong>max_depth=10:</strong> Adâncime moderată - previne overfitting</li>
                              <li>• Nu prea adânc (overfitting), nu prea shallow (underfitting)</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">3️⃣ KNN: n_neighbors=7, weights='distance'</p>
                            <ul className="text-sm space-y-1 ml-4">
                              <li>• <strong>k=7:</strong> Mai bine decât k=5 (balans între bias și variance)</li>
                              <li>• <strong>weights='distance':</strong> Vecinii mai apropiați au influență mai mare</li>
                              <li>• Mai robust la outliers decât 'uniform'</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
                        <h4 className="text-lg font-semibold mb-3 text-yellow-700 dark:text-yellow-300">
                          ⏱️ Timpul De Execuție
                        </h4>
                        <p className="mb-3">GridSearchCV poate dura mult! Iată de ce:</p>
                        <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
                          <p>Timp total = Combinații × Folduri CV × Timp per fit</p>
                          <p className="mt-2">Exemplu SVM:</p>
                          <p>  - 32 combinații × 5 folduri = 160 de antrenări!</p>
                          <p>  - Dacă fiecare durează 2s → 320 secunde (5 min)</p>
                        </div>
                        <p className="mt-3 text-sm">
                          <strong>Sfat:</strong> Folosește <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">n_jobs=-1</code>
                          pentru paralelizare și <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">verbose=2</code> pentru a vedea progresul!
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">
                      ✍️ Exerciții: Devine Master La Tuning
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                          Tuning Pentru Gradient Boosting
                        </h4>
                        <p className="mb-3">Aplică GridSearchCV pe GradientBoostingClassifier cu parametrii:</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <p>param_grid = &#123;</p>
                          <p>    'learning_rate': [0.01, 0.1, 0.2],</p>
                          <p>    'n_estimators': [50, 100, 200],</p>
                          <p>    'max_depth': [3, 5, 7]</p>
                          <p>&#125;</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Întrebări:</strong> Care combinație e cea mai bună? Cum se compară cu SVM/RF?
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                          RandomizedSearchCV - Când Grila E Prea Mare
                        </h4>
                        <p className="mb-3">Când ai sute de combinații, RandomizedSearchCV e mai eficient. Înlocuiește GridSearchCV cu:</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <p>from sklearn.model_selection import RandomizedSearchCV</p>
                          <p>random_search = RandomizedSearchCV(</p>
                          <p>    estimator=pipeline,</p>
                          <p>    param_distributions=param_grid,</p>
                          <p>    n_iter=50,  # încearcă 50 combinații random</p>
                          <p>    cv=5</p>
                          <p>)</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Compară:</strong> Timpul de execuție vs GridSearch. Diferența de performanță?
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                          Vizualizează Harta De Performanță
                        </h4>
                        <p className="mb-3">Pentru SVM cu 2 parametri (C și gamma), creează o heatmap care arată acuratețea pentru fiecare combinație:</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono mb-3">
                          <p># Extrage rezultate din grid_search</p>
                          <p>results = grid_search.cv_results_</p>
                          <p># Creează pivot table: C × gamma → accuracy</p>
                          <p># Vizualizează cu seaborn.heatmap()</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Observă:</strong> Care regiuni din grila de parametri dau cele mai bune rezultate?
                        </p>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-sm">
                          <strong>🏆 Provocare Finală:</strong> Creează un sistem complet:
                          <br />1. Încarcă dataset breast cancer
                          <br />2. Construiește 3 pipelines (SVM, RF, KNN)
                          <br />3. Tuning cu GridSearchCV pentru fiecare
                          <br />4. Compară rezultatele într-un grafic
                          <br />5. Salvează cel mai bun model
                          <br />6. Testează pe 5 sample-uri noi
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Session Complete Summary */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-orange-50/50 via-amber-50/50 to-yellow-50/50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 border-2 border-orange-300 dark:border-orange-700">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            🎓 Session 31 Completă - Recapitulare
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                ✅ Ce Ai Învățat
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Clasificare avansată:</strong> SVM, Random Forest, KNN - când să folosești fiecare</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Preprocessing corect:</strong> StandardScaler și evitarea data leakage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Pipelines:</strong> Workflow-uri sigure și reproducibile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Cross-Validation:</strong> Evaluare corectă a performanței</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>GridSearchCV:</strong> Optimizare automată de hyperparametri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Metrici:</strong> Precision, Recall, F1-Score, Confusion Matrix</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
                🚀 Următorii Pași
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  <span><strong>Session 32:</strong> Regression avansată cu dataset real estate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  <span><strong>Session 33:</strong> Clasificare pe Iris dataset - aplicație practică</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  <span><strong>Proiecte personale:</strong> Aplică pe Health & Finance data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  <span><strong>Deep dive:</strong> Neural Networks cu TensorFlow/Keras</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-6">
            <p className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200">
              🎉 Felicitări! Acum știi să construiești sisteme de clasificare profesionale, sigure și optimizate!
            </p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              De la detectarea cancerului la predicții financiare - ai instrumentele să schimbi lumea cu Machine Learning.
            </p>
          </div>
        </Card>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => window.location.href = '/machine-learning'}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
          >
            ← Înapoi La Machine Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SklearnSession31;
