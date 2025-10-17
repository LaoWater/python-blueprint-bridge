import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check, Play, Pause, ArrowLeft, Home, BarChart3 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SklearnSession32 = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Story chapters about Real Estate ML
  const storyChapters = [
    {
      title: "Capitolul 1: Întrebarea Care Costă Sute De Mii",
      content: `București, 2024. Ai economisit timp de 5 ani. 80.000€ în cont. Ești gata să cumperi primul tău apartament.

Agent imobiliar: "Acest apartament costă 120.000€. E o ofertă excelentă!"

Tu te gândești: "Dar chiar ESTE o ofertă bună? Sau este supraevaluat? Cum știu?"

Începi să cauți comparații:
- Același cartier, 3 camere, etaj 2: 115.000€
- Cartier vecin, 3 camere, etaj 5: 105.000€
- Același bloc, etaj diferit: 130.000€

Dar sunt ATÂT de multe variabile: zona, etajul, mp, anul construcției, balcon, parcare...

Cum le pui pe toate împreună? Cum ȘTII că faci alegerea corectă?

Aceasta este problema care a dus la nașterea Real Estate Price Prediction cu Machine Learning.`,
      icon: "🏠",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Capitolul 2: Datele Lipsă - Realitatea Din Teren",
      content: `Începi să colectezi date de pe OLX, Imobiliare.ro, Storia. 500 de apartamente. Euforic, deschizi Excel-ul.

Apoi vezi:
- Apartament 1: zona "Floreasca", camere: 3, mp: ?, an: 2010
- Apartament 2: zona ?, camere: 2, mp: 65, an: ?
- Apartament 3: zona "Pipera", camere: 3, mp: 80, balcon: ?

Datele sunt INCOMPLETE. Welcome to real world!

În Session 30, datele erau perfecte. În Session 31, Breast Cancer dataset-ul era curat.

Dar în lumea reală? 30-40% din date au valori lipsă.

Anunțurile sunt incomplete. Proprietarii nu completează tot. Unii blochează informații strategic.

Întrebare: Arunci acele rânduri? WRONG! Ai pierde 40% din informație!

Soluția: SimpleImputer - completează strategic valorile lipsă.
- Features numerice → completeaza cu media
- Features categorice → completează cu cel mai frecvent

Acesta este primul pas spre un model de ML profesionist.`,
      icon: "❓",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Capitolul 3: Mixul Features - Numere ȘI Categorii",
      content: `Dataset-ul tău are:

Numerical features:
- suprafata: 45, 67, 82 (mp)
- etaj: 1, 3, 7
- an_constructie: 1985, 2010, 2021

Categorical features:
- zona: "Floreasca", "Pipera", "Militari"
- balcon: "da", "nu"
- parcare: "da", "nu"

Problema: Modelul de ML lucrează DOAR cu numere. Cum transformi "Floreasca" în număr?

OneHotEncoder salvează ziua:
- zona_Floreasca: 1 sau 0
- zona_Pipera: 1 sau 0
- zona_Militari: 1 sau 0

Dar aici vine complexitatea:
- Features numerice → SimpleImputer(mean) → StandardScaler
- Features categorice → SimpleImputer(most_frequent) → OneHotEncoder

Cum le aplici pe AMBELE în același timp, CORECT, fără data leakage?

ColumnTransformer! Una dintre cele mai puternice tool-uri din sklearn.

Definești transformări diferite pentru coloane diferite. Sklearn aplică corect, în ordine, fără greșeli.`,
      icon: "🔀",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Capitolul 4: Trei Modele, Trei Perspective",
      content: `Acum ai datele curate. Pipeline-ul gata. E timpul să construiești modelul.

Dar CARE model?

Linear Regression spune: "Relația e simplă, liniară. Adună coefficients, get price."
- Rapid, interpretabil
- Funcționează când relațiile sunt aproximativ liniare
- Baseline perfect

Ridge Regression spune: "Lasă-mă să adaug regularizare. Prevent overfitting."
- L2 penalty pentru coefficienți mari
- GridSearchCV găsește alpha optimal
- Mai robust decât Linear simplu

Random Forest spune: "Lăsați-mă să văd toate pattern-urile non-lineare."
- 100 de arbori votează împreună
- Capturează relații complexe
- Feature importance gratis

Compari toate 3. Vezi care performează cel mai bine.

Nu există "modelul perfect" - există modelul POTRIVIT pentru datele tale.

Acesta este gândirea unui ML Engineer profesionist.`,
      icon: "⚖️",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Capitolul 5: Vizualizarea - Adevărul Din Grafice",
      content: `Modelul zice: "R² Score = 0.87". Sounds good?

DAR ce înseamnă asta în PRACTICĂ?

Prediction vs Actual plot:
- X-axis: Prețul real al apartamentului
- Y-axis: Prețul prezis de model
- Linie perfectă y=x: unde ar trebui să fie toate punctele

Interpretare:
- Punct pe linie → predicție perfectă
- Punct deasupra → model supraevaluează (crezi că e mai scump)
- Punct dedesubt → model subevaluează (crezi că e mai ieftin)

Residuals plot:
- Diferența: predicted - actual
- Distribuție normală centrată pe 0 = GOOD
- Skewed = model are bias
- Heavy tails = outlieri care confundă modelul

Acestea NU sunt "graphs fancy". Sunt INSTRUMENTE de diagnostic.

Ei îți spun UNDE modelul greșește și DE CE.

Cu ele, transformi ML din "black box" în "understood system".

Și atunci, poți face o decizie informată: "Apartamentul de 120.000€? Modelul meu zice că ar trebui să fie 110.000€. Negociez!"`,
      icon: "📊",
      gradient: "from-red-500 to-orange-500"
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

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, id, title }: { code: string; id: string; title?: string }) => (
    <div className="relative group">
      {title && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
          {title}
        </div>
      )}
      <div className="relative">
        <Button
          onClick={() => copyToClipboard(code, id)}
          className="absolute top-2 right-2 z-10 bg-gray-800/80 hover:bg-gray-700/80 opacity-0 group-hover:opacity-100 transition-opacity"
          size="sm"
          variant="secondary"
        >
          {copiedCode === id ? (
            <span className="text-green-400 text-xs flex items-center gap-1">
              <Check className="h-4 w-4" /> Copied!
            </span>
          ) : (
            <Copy className="h-4 w-4 text-gray-300" />
          )}
        </Button>
        <div className={`rounded-lg overflow-hidden border border-gray-700 ${title ? 'rounded-t-none' : ''}`}>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              maxHeight: '32rem',
              borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem',
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: '#6e7681',
              userSelect: 'none',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Proiect Regression Avansat - Prețuri Imobiliare
                </h1>
                <p className="text-sm text-muted-foreground">Session 32: Advanced Real Estate Price Prediction</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Home className="w-3 h-3 mr-1" />
                Real Estate
              </Badge>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                <BarChart3 className="w-3 h-3 mr-1" />
                Regression
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 text-lg">
              Session 32
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Proiect Regression Avansat - Prețuri Imobiliare
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            De la "Ar trebui să cumpăr acest apartament?" la construirea unui sistem complet de predicție ML
          </p>
        </div>

        {/* Origin Story - Collapsible */}
        <details open className="mb-12">
          <summary className="cursor-pointer list-none">
            <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-2 border-blue-200 dark:border-blue-700 shadow-2xl hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  📖 Povestea Real Estate ML
                </h2>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPlaying(!isPlaying);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isPlaying ? 'Pauză' : 'Redare Auto'}
                  </Button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">(Click to collapse/expand)</span>
                </div>
              </div>
            </Card>
          </summary>

          <Card className="mt-4 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-2 border-blue-200 dark:border-blue-700">
            <div className="space-y-4">
            {storyChapters.map((chapter, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 transition-all duration-500 cursor-pointer ${
                  currentStory === index
                    ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/10 shadow-lg scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-blue-300 hover:bg-blue-50/30'
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
                    currentStory === index ? 'w-12 bg-blue-500' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </Card>
        </details>

        {/* Main Content - Will continue in next message due to length */}
        <Tabs defaultValue="part1" className="space-y-8">
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger
              value="part1"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-blue-200"
            >
              <span className="mr-2">📊</span>
              Partea 1: Date & Explorare
            </TabsTrigger>
            <TabsTrigger
              value="part2"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-purple-200"
            >
              <span className="mr-2">🔧</span>
              Partea 2: Pipeline Complex
            </TabsTrigger>
            <TabsTrigger
              value="part3"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-green-200"
            >
              <span className="mr-2">🤖</span>
              Partea 3: Trei Modele
            </TabsTrigger>
            <TabsTrigger
              value="part4"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white py-3 rounded-lg border-2 border-orange-200"
            >
              <span className="mr-2">📈</span>
              Partea 4: Vizualizări
            </TabsTrigger>
          </TabsList>

          {/* Part 1: Data Exploration */}
          <TabsContent value="part1">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-blue-200 dark:border-blue-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📊 Partea 1: Date Realiste & Explorare
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                    🏠 Dataset-ul Real Estate Românesc
                  </h3>
                  <p className="text-lg mb-4">
                    Spre deosebire de Session 30 și 31 (unde dataset-urile erau curate), în lumea reală datele sunt MESSY:
                  </p>
                  <ul className="space-y-2">
                    <li><strong>Valori lipsă</strong> - 30-40% din anunțuri au informații incomplete</li>
                    <li><strong>Mix de tipuri</strong> - Numerical (mp, etaj) + Categorical (zona, balcon)</li>
                    <li><strong>Outlieri</strong> - Penthouse-uri de lux distorsionează media</li>
                    <li><strong>Inconsistențe</strong> - "Floreasca" vs "floreasca" vs "FLOREASCA"</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
                    💡 De Ce Este Diferit?
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Session 30:</p>
                      <p>Date simple, curate, regression de bază</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Session 31:</p>
                      <p>Dataset medical curat, classification avansată</p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Session 32:</p>
                      <p>Date messy, preprocessing complex, end-to-end</p>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="real">🏠 Aplicație Reală</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    id="data-exploration"
                    title="Crearea și Explorarea Dataset-ului Real Estate"
                    code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split

# ========================================
# PARTEA 1: CREAREA DATASET-ULUI REALIST
# ========================================

# Creăm un dataset care simulează datele de pe OLX/Imobiliare.ro
np.random.seed(42)
n_samples = 500

# Zone din București cu prețuri diferite
zone = ['Floreasca', 'Pipera', 'Militari', 'Drumul Taberei', 'Titan',
        'Vitan', 'Berceni', 'Pantelimon']
zone_prices = {
    'Floreasca': 2000, 'Pipera': 1900, 'Militari': 1200,
    'Drumul Taberei': 1300, 'Titan': 1100, 'Vitan': 1150,
    'Berceni': 900, 'Pantelimon': 950
}

data = {
    'zona': np.random.choice(zone, n_samples),
    'suprafata': np.random.randint(35, 120, n_samples),
    'numar_camere': np.random.randint(1, 5, n_samples),
    'etaj': np.random.randint(0, 11, n_samples),
    'an_constructie': np.random.randint(1970, 2024, n_samples),
    'balcon': np.random.choice(['da', 'nu'], n_samples),
    'parcare': np.random.choice(['da', 'nu'], n_samples)
}

df = pd.DataFrame(data)

# Calculăm prețul bazat pe features (cu variație realistă)
df['pret'] = df.apply(lambda row:
    zone_prices[row['zona']] * row['suprafata'] +
    row['numar_camere'] * 5000 +
    (2024 - row['an_constructie']) * -200 +
    (10000 if row['balcon'] == 'da' else 0) +
    (15000 if row['parcare'] == 'da' else 0) +
    np.random.normal(0, 15000),
    axis=1
)

# Rotunjim prețurile
df['pret'] = df['pret'].round(-3)  # Rotunjim la mii

print("📊 DATASET CREAT:")
print(f"Număr de apartamente: {len(df)}")
print(f"\\nPrimele 5 rânduri:")
print(df.head())

# ========================================
# PARTEA 2: INTRODUCEREA VALORILOR LIPSĂ
# ========================================

# Simulăm missing values (ca în realitate!)
missing_indices_suprafata = np.random.choice(df.index, size=int(0.15 * len(df)), replace=False)
df.loc[missing_indices_suprafata, 'suprafata'] = np.nan

missing_indices_etaj = np.random.choice(df.index, size=int(0.10 * len(df)), replace=False)
df.loc[missing_indices_etaj, 'etaj'] = np.nan

missing_indices_zona = np.random.choice(df.index, size=int(0.08 * len(df)), replace=False)
df.loc[missing_indices_zona, 'zona'] = np.nan

missing_indices_balcon = np.random.choice(df.index, size=int(0.12 * len(df)), replace=False)
df.loc[missing_indices_balcon, 'balcon'] = np.nan

print("\\n❓ VALORI LIPSĂ INTRODUSE:")
print(df.isnull().sum())
print(f"\\nProcent total missing: {df.isnull().sum().sum() / (len(df) * len(df.columns)) * 100:.1f}%")

# ========================================
# PARTEA 3: EXPLORAREA DATELOR
# ========================================

print("\\n🔍 STATISTICI DESCRIPTIVE:")
print(df.describe())

# Verifică distribuția prețurilor
print("\\n💰 DISTRIBUȚIA PREȚURILOR:")
print(f"Min: {df['pret'].min():,.0f} €")
print(f"Max: {df['pret'].max():,.0f} €")
print(f"Medie: {df['pret'].mean():,.0f} €")
print(f"Mediană: {df['pret'].median():,.0f} €")

# Verifică distribuția pe zone
print("\\n🏘️ PREȚURI MEDII PE ZONE:")
print(df.groupby('zona')['pret'].mean().sort_values(ascending=False).round(0))

# ========================================
# PARTEA 4: VIZUALIZĂRI EXPLORATORII
# ========================================

fig, axes = plt.subplots(2, 2, figsize=(15, 12))

# 1. Distribuția prețurilor
axes[0, 0].hist(df['pret'].dropna(), bins=50, color='skyblue', edgecolor='black', alpha=0.7)
axes[0, 0].axvline(df['pret'].mean(), color='red', linestyle='--', linewidth=2, label=f'Medie: {df["pret"].mean():,.0f}€')
axes[0, 0].axvline(df['pret'].median(), color='green', linestyle='--', linewidth=2, label=f'Mediană: {df["pret"].median():,.0f}€')
axes[0, 0].set_xlabel('Preț (€)', fontsize=12)
axes[0, 0].set_ylabel('Frecvență', fontsize=12)
axes[0, 0].set_title('Distribuția Prețurilor Apartamentelor', fontsize=14, fontweight='bold')
axes[0, 0].legend()
axes[0, 0].grid(alpha=0.3)

# 2. Preț vs Suprafață
axes[0, 1].scatter(df['suprafata'], df['pret'], alpha=0.5, color='coral')
axes[0, 1].set_xlabel('Suprafață (mp)', fontsize=12)
axes[0, 1].set_ylabel('Preț (€)', fontsize=12)
axes[0, 1].set_title('Preț în Funcție de Suprafață', fontsize=14, fontweight='bold')
axes[0, 1].grid(alpha=0.3)

# 3. Prețuri medii pe zone
zone_avg = df.groupby('zona')['pret'].mean().sort_values()
axes[1, 0].barh(zone_avg.index, zone_avg.values, color='lightgreen', edgecolor='black')
axes[1, 0].set_xlabel('Preț Mediu (€)', fontsize=12)
axes[1, 0].set_title('Prețuri Medii pe Zone', fontsize=14, fontweight='bold')
axes[1, 0].grid(axis='x', alpha=0.3)

# 4. Heatmap missing values
missing_data = df.isnull().sum().sort_values(ascending=False)
missing_percent = (missing_data / len(df) * 100).round(1)
axes[1, 1].barh(missing_data.index, missing_percent.values, color='indianred', edgecolor='black')
axes[1, 1].set_xlabel('Procent Missing (%)', fontsize=12)
axes[1, 1].set_title('Valori Lipsă pe Coloane', fontsize=14, fontweight='bold')
axes[1, 1].grid(axis='x', alpha=0.3)

plt.tight_layout()
plt.savefig('real_estate_exploration.png', dpi=300, bbox_inches='tight')
print("\\n✅ Grafic salvat: real_estate_exploration.png")

# ========================================
# PARTEA 5: SALVAREA DATASET-ULUI
# ========================================

df.to_csv('apartamente_bucuresti.csv', index=False)
print("\\n✅ Dataset salvat: apartamente_bucuresti.csv")

print("""
\\n🎯 CE AM ÎNVĂȚAT:

1. CREAREA DATASET-ULUI REALIST:
   - Zone cu prețuri diferite
   - Variație naturală în date
   - Multiple features (numerical + categorical)

2. MISSING VALUES (cum în realitate!):
   - 15% missing în suprafață
   - 10% missing în etaj
   - 8% missing în zonă
   - 12% missing în balcon

3. EXPLORAREA DATELOR:
   - Statistici descriptive
   - Distribuții
   - Corelații vizuale
   - Identificarea pattern-urilor

4. VIZUALIZĂRI:
   - Histograme pentru distribuții
   - Scatter plots pentru relații
   - Bar charts pentru comparații
   - Missing value analysis

🚀 URMĂTORUL PAS: ColumnTransformer pentru preprocessing!
""")`}
                  />
                </TabsContent>

                <TabsContent value="real" className="mt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                      🏠 Aplicație În Lumea Reală: Platformă Imobiliară
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                          📋 Scenariul Utilizatorului
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                            <div>
                              <strong>User intră pe platformă:</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">"Vreau să cumpăr apartament în Floreasca, 3 camere"</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                            <div>
                              <strong>Platformă colectează preferințe:</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Zonă, număr camere, etaj dorit, buget maxim</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                            <div>
                              <strong>ML Model procesează:</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Features → Pipeline → Predicție preț just</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                            <div>
                              <strong>Rezultat pentru user:</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400">"Preț estimat: 125.000€ ± 8.000€. Apartamentele similare se vând între 117K-133K."</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                          ✅ Valoarea Adăugată
                        </h4>
                        <ul className="space-y-2">
                          <li><strong>Pentru Cumpărător:</strong> Știe dacă prețul cerut e just sau supraevaluat</li>
                          <li><strong>Pentru Vânzător:</strong> Setează preț competitiv bazat pe market reality</li>
                          <li><strong>Pentru Agent:</strong> Credibilitate prin prețuri data-driven</li>
                          <li><strong>Pentru Platformă:</strong> Trust și utilizatori fideli</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
                        <h4 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-300">
                          ⚠️ Provocări Reale
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Date inconsistente (typos în nume zone)</li>
                          <li>• Missing values (anunțuri incomplete)</li>
                          <li>• Outlieri (penthouse-uri luxury)</li>
                          <li>• Piața dinamică (prețurile se schimbă)</li>
                          <li>• Features noi (lift, renovare recentă)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                      ✍️ Exercițiu Practic
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 1: Extinde Dataset-ul</h4>
                        <p className="mb-4">Adaugă features noi: 'tip_apartament' (garsonieră/decomandat/semidecomandat) și 'orientare' (N/S/E/V)</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Hint: folosește np.random.choice()</p>
                          <p>df['tip_apartament'] = np.random.choice([...], n_samples)</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 2: Analiză Corelații</h4>
                        <p className="mb-4">Creează o matrice de corelații și identifică care feature are cea mai puternică corelație cu prețul</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Hint: selectează doar numerical features</p>
                          <p>numerical_df = df.select_dtypes(include=[np.number])</p>
                          <p>sns.heatmap(numerical_df.corr(), annot=True)</p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 3: Feature Engineering</h4>
                        <p className="mb-4">Creează o nouă feature 'pret_per_mp' și vizualizează cum variază pe zone</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p>df['pret_per_mp'] = df['pret'] / df['suprafata']</p>
                          <p>df.groupby('zona')['pret_per_mp'].mean().plot(kind='bar')</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* Part 2: Column Transformer Pipeline */}
          <TabsContent value="part2">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-purple-200 dark:border-purple-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🔧 Partea 2: ColumnTransformer - Pipeline Complex
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                    🤔 Problema: Două Tipuri De Features
                  </h3>
                  <p className="text-lg mb-4">
                    Dataset-ul nostru are DOUĂ tipuri diferite de features, fiecare necesitând preprocessing diferit:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-4">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📊 Numerical Features:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <code>suprafata</code> (35-120 mp)</li>
                        <li>• <code>numar_camere</code> (1-4)</li>
                        <li>• <code>etaj</code> (0-10)</li>
                        <li>• <code>an_constructie</code> (1970-2024)</li>
                      </ul>
                      <p className="mt-3 text-sm font-semibold text-blue-600">→ SimpleImputer(mean) + StandardScaler</p>
                    </div>

                    <div className="bg-pink-50 dark:bg-pink-900/20 rounded p-4">
                      <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">🏷️ Categorical Features:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <code>zona</code> ("Floreasca", "Pipera"...)</li>
                        <li>• <code>balcon</code> ("da", "nu")</li>
                        <li>• <code>parcare</code> ("da", "nu")</li>
                      </ul>
                      <p className="mt-3 text-sm font-semibold text-pink-600">→ SimpleImputer(most_frequent) + OneHotEncoder</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                    🎯 Soluția: ColumnTransformer
                  </h4>
                  <p className="mb-3">
                    ColumnTransformer aplică transformări DIFERITE pe coloane DIFERITE, toate în același timp, corect, fără data leakage!
                  </p>
                  <p className="text-sm italic">
                    "One transformer to rule them all, one pipeline to bind them!"
                  </p>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="visual">📊 Vizualizare Pipeline</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    id="column-transformer"
                    title="ColumnTransformer - Preprocessing Complex"
                    code={`import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split

# Încarcă dataset-ul
df = pd.read_csv('apartamente_bucuresti.csv')

# ========================================
# PARTEA 1: SEPARAREA FEATURES & TARGET
# ========================================

# Features (X) și Target (y)
X = df.drop('pret', axis=1)
y = df['pret']

print("📊 STRUCTURA DATELOR:")
print(f"Features (X): {X.shape}")
print(f"Target (y): {y.shape}")
print(f"\\nColoane în X:\\n{X.columns.tolist()}")

# ========================================
# PARTEA 2: IDENTIFICAREA TIPURILOR
# ========================================

# Identifică automat coloanele numerice și categorice
numerical_features = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_features = X.select_dtypes(include=['object']).columns.tolist()

print(f"\\n🔢 NUMERICAL FEATURES ({len(numerical_features)}):")
print(numerical_features)

print(f"\\n🏷️ CATEGORICAL FEATURES ({len(categorical_features)}):")
print(categorical_features)

# ========================================
# PARTEA 3: CREAREA TRANSFORMERS
# ========================================

# Transformer pentru features numerice
numerical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),    # Completează cu media
    ('scaler', StandardScaler())                     # Normalizează
])

# Transformer pentru features categorice
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),  # Completează cu cel mai frecvent
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))  # Encodare
])

print("\\n✅ TRANSFORMERS CREAȚI:")
print("  1. Numerical: SimpleImputer(mean) → StandardScaler")
print("  2. Categorical: SimpleImputer(most_frequent) → OneHotEncoder")

# ========================================
# PARTEA 4: COLUMN TRANSFORMER
# ========================================

# Combinăm transformers-ii folosind ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ],
    remainder='drop'  # Drop orice altă coloană nespecificată
)

print("\\n🔧 COLUMN TRANSFORMER CREAT!")
print(f"  - Va procesa {len(numerical_features)} numerical features")
print(f"  - Va procesa {len(categorical_features)} categorical features")

# ========================================
# PARTEA 5: TRAIN-TEST SPLIT
# ========================================

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\\n📦 TRAIN-TEST SPLIT:")
print(f"Training set: {X_train.shape[0]} apartamente ({X_train.shape[0]/len(X)*100:.1f}%)")
print(f"Test set: {X_test.shape[0]} apartamente ({X_test.shape[0]/len(X)*100:.1f}%)")

# ========================================
# PARTEA 6: FIT & TRANSFORM
# ========================================

# Fit preprocessor pe training data
X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)

print(f"\\n🎯 PREPROCESSING COMPLET:")
print(f"  Înainte: {X_train.shape} → După: {X_train_processed.shape}")
print(f"  Features create: {X_train_processed.shape[1]}")

# ========================================
# PARTEA 7: ÎNȚELEGEREA OUTPUT-ULUI
# ========================================

# Obține numele features după OneHotEncoding
feature_names = []

# Numerical features (same names)
feature_names.extend(numerical_features)

# Categorical features (get encoded names from OneHotEncoder)
cat_encoder = preprocessor.named_transformers_['cat']['onehot']
cat_feature_names = cat_encoder.get_feature_names_out(categorical_features)
feature_names.extend(cat_feature_names)

print(f"\\n📋 TOATE FEATURES DUPĂ PREPROCESSING ({len(feature_names)}):")
for i, name in enumerate(feature_names[:20], 1):  # Afișăm primele 20
    print(f"  {i}. {name}")
if len(feature_names) > 20:
    print(f"  ... și {len(feature_names) - 20} mai multe")

# Exemplu: Cum arată o singură observație după preprocessing
print(f"\\n🔍 EXEMPLU - PRIMA OBSERVAȚIE TRAIN:")
print(f"Înainte (primele 5 features):\\n{X_train.iloc[0][:5]}")
print(f"\\nDupă preprocessing (primele 10 values):\\n{X_train_processed[0][:10]}")

# ========================================
# CE SE ÎNTÂMPLĂ ÎN SPATE?
# ========================================

print("""
\\n💡 CE FACE COLUMN TRANSFORMER:

1. PENTRU NUMERICAL FEATURES:
   - suprafata: 75 mp (cu missing) → impute cu mean → scale cu StandardScaler → 0.42
   - etaj: 3 → scale → -0.15
   - numar_camere: 2 → scale → 0.38

2. PENTRU CATEGORICAL FEATURES:
   - zona: "Floreasca" → OneHotEncoder → [0,0,0,1,0,0,0,0]
   - balcon: "da" → OneHotEncoder → [1,0]
   - parcare: "nu" → OneHotEncoder → [0,1]

3. CONCATENEAZĂ TOT:
   [0.42, -0.15, 0.38, ..., 0,0,0,1,0,0,0,0, 1,0, 0,1]

4. REZULTAT:
   - Vector numeric complet
   - Gata pentru ML model
   - ZERO data leakage (test folosește parametrii din train!)

🚀 URMĂTORUL PAS: Antrenarea modelelor!
""")`}
                  />
                </TabsContent>

                <TabsContent value="visual" className="mt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                      📊 Vizualizare: Fluxul ColumnTransformer
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">
                          📥 INPUT: Date Raw
                        </h4>
                        <div className="bg-white dark:bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b-2">
                                <th className="p-2">zona</th>
                                <th className="p-2">suprafata</th>
                                <th className="p-2">camere</th>
                                <th className="p-2">balcon</th>
                                <th className="p-2">pret</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-2 text-pink-500">Floreasca</td>
                                <td className="p-2 text-blue-500">75</td>
                                <td className="p-2 text-blue-500">2</td>
                                <td className="p-2 text-pink-500">da</td>
                                <td className="p-2 text-green-500">145000</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 text-pink-500">Pipera</td>
                                <td className="p-2 text-red-500">NaN</td>
                                <td className="p-2 text-blue-500">3</td>
                                <td className="p-2 text-pink-500">da</td>
                                <td className="p-2 text-green-500">178000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="text-4xl">⬇️</div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                          <h4 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">
                            🔢 Pipeline Numerical
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-gray-800 rounded p-3">
                              <p className="text-sm font-semibold mb-1">1. SimpleImputer (mean)</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">suprafata: NaN → 78.5 (media)</p>
                            </div>
                            <div className="text-center text-2xl">↓</div>
                            <div className="bg-white dark:bg-gray-800 rounded p-3">
                              <p className="text-sm font-semibold mb-1">2. StandardScaler</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">suprafata: 78.5 → 0.42</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-6">
                          <h4 className="text-lg font-semibold mb-3 text-pink-700 dark:text-pink-300">
                            🏷️ Pipeline Categorical
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-gray-800 rounded p-3">
                              <p className="text-sm font-semibold mb-1">1. SimpleImputer (most_frequent)</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">zona: NaN → "Floreasca"</p>
                            </div>
                            <div className="text-center text-2xl">↓</div>
                            <div className="bg-white dark:bg-gray-800 rounded p-3">
                              <p className="text-sm font-semibold mb-1">2. OneHotEncoder</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">zona: "Floreasca" → [0,0,1,0,0]</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="text-4xl">⬇️</div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">
                          📤 OUTPUT: Vector Numeric Complet
                        </h4>
                        <div className="bg-white dark:bg-gray-900 rounded p-4 font-mono text-sm">
                          <p className="text-green-600">[0.42, -0.15, 0.38, 0.22, 0,0,1,0,0, 1,0, 1,0]</p>
                          <p className="text-xs text-gray-500 mt-2">↑ Gata pentru ML model!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* Part 3: Three Models Comparison */}
          <TabsContent value="part3">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-green-200 dark:border-green-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                🤖 Partea 3: Trei Modele - Trei Perspective
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
                    ⚖️ Compararea Modelelor De Regression
                  </h3>
                  <p className="text-lg mb-4">
                    Nu există "modelul perfect universal". Există modelul POTRIVIT pentru datele tale.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-4 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">1️⃣ Linear Regression</h4>
                      <p className="text-sm mb-2"><strong>Filosofie:</strong> Relația e simplă și liniară</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">✅ Rapid, interpretabil, baseline perfect</p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-4 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">2️⃣ Ridge Regression</h4>
                      <p className="text-sm mb-2"><strong>Filosofie:</strong> Previne overfitting cu regularizare</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">✅ L2 penalty, GridSearch pentru alpha</p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">3️⃣ Random Forest</h4>
                      <p className="text-sm mb-2"><strong>Filosofie:</strong> Capturează pattern-uri non-lineare</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">✅ 100 arbori, feature importance gratis</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
                    🎯 Metodologia Comparării
                  </h4>
                  <ol className="space-y-2">
                    <li><strong>1. Train fiecare model</strong> pe aceleași date de training</li>
                    <li><strong>2. Predict</strong> pe același test set</li>
                    <li><strong>3. Calculează metrici</strong>: R², RMSE, MAE</li>
                    <li><strong>4. Compară rezultatele</strong> și alege cel mai bun</li>
                  </ol>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="metrics">📊 Metrici Explicate</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    id="three-models"
                    title="Trei Modele De Regression - Comparație Completă"
                    code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt

# Presupunem că avem X_train_processed, X_test_processed, y_train, y_test
# din partea anterioară (după ColumnTransformer)

# ========================================
# MODEL 1: LINEAR REGRESSION (BASELINE)
# ========================================

print("=" * 60)
print("MODEL 1: LINEAR REGRESSION")
print("=" * 60)

# Creează și antrenează modelul
lr_model = LinearRegression()
lr_model.fit(X_train_processed, y_train)

# Predicții
y_train_pred_lr = lr_model.predict(X_train_processed)
y_test_pred_lr = lr_model.predict(X_test_processed)

# Evaluare
r2_train_lr = r2_score(y_train, y_train_pred_lr)
r2_test_lr = r2_score(y_test, y_test_pred_lr)
rmse_test_lr = np.sqrt(mean_squared_error(y_test, y_test_pred_lr))
mae_test_lr = mean_absolute_error(y_test, y_test_pred_lr)

print(f"\\n📊 REZULTATE LINEAR REGRESSION:")
print(f"  R² Train: {r2_train_lr:.4f}")
print(f"  R² Test:  {r2_test_lr:.4f}")
print(f"  RMSE:     {rmse_test_lr:,.0f} €")
print(f"  MAE:      {mae_test_lr:,.0f} €")

# ========================================
# MODEL 2: RIDGE REGRESSION + GRID SEARCH
# ========================================

print("\\n" + "=" * 60)
print("MODEL 2: RIDGE REGRESSION (cu GridSearchCV)")
print("=" * 60)

# Definește parametrii pentru Grid Search
param_grid = {
    'alpha': [0.1, 1, 10, 100, 1000]
}

# Creează Ridge cu GridSearchCV
ridge = Ridge()
grid_search = GridSearchCV(
    ridge,
    param_grid,
    cv=5,  # 5-fold cross-validation
    scoring='neg_mean_squared_error',
    n_jobs=-1
)

# Antrenează cu Grid Search
grid_search.fit(X_train_processed, y_train)

# Best model
best_ridge = grid_search.best_estimator_
best_alpha = grid_search.best_params_['alpha']

print(f"\\n🔍 GRID SEARCH RESULTS:")
print(f"  Best alpha: {best_alpha}")
print(f"  Best CV score: {-grid_search.best_score_:,.0f} (MSE)")

# Predicții cu best model
y_train_pred_ridge = best_ridge.predict(X_train_processed)
y_test_pred_ridge = best_ridge.predict(X_test_processed)

# Evaluare
r2_train_ridge = r2_score(y_train, y_train_pred_ridge)
r2_test_ridge = r2_score(y_test, y_test_pred_ridge)
rmse_test_ridge = np.sqrt(mean_squared_error(y_test, y_test_pred_ridge))
mae_test_ridge = mean_absolute_error(y_test, y_test_pred_ridge)

print(f"\\n📊 REZULTATE RIDGE REGRESSION:")
print(f"  R² Train: {r2_train_ridge:.4f}")
print(f"  R² Test:  {r2_test_ridge:.4f}")
print(f"  RMSE:     {rmse_test_ridge:,.0f} €")
print(f"  MAE:      {mae_test_ridge:,.0f} €")

# ========================================
# MODEL 3: RANDOM FOREST REGRESSOR
# ========================================

print("\\n" + "=" * 60)
print("MODEL 3: RANDOM FOREST REGRESSOR")
print("=" * 60)

# Creează și antrenează Random Forest
rf_model = RandomForestRegressor(
    n_estimators=100,    # 100 de arbori
    max_depth=15,        # Limită adâncime pentru a preveni overfitting
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)

rf_model.fit(X_train_processed, y_train)

# Predicții
y_train_pred_rf = rf_model.predict(X_train_processed)
y_test_pred_rf = rf_model.predict(X_test_processed)

# Evaluare
r2_train_rf = r2_score(y_train, y_train_pred_rf)
r2_test_rf = r2_score(y_test, y_test_pred_rf)
rmse_test_rf = np.sqrt(mean_squared_error(y_test, y_test_pred_rf))
mae_test_rf = mean_absolute_error(y_test, y_test_pred_rf)

print(f"\\n📊 REZULTATE RANDOM FOREST:")
print(f"  R² Train: {r2_train_rf:.4f}")
print(f"  R² Test:  {r2_test_rf:.4f}")
print(f"  RMSE:     {rmse_test_rf:,.0f} €")
print(f"  MAE:      {mae_test_rf:,.0f} €")

# ========================================
# COMPARAȚIE FINALĂ
# ========================================

print("\\n" + "=" * 60)
print("📊 COMPARAȚIE FINALĂ - TOATE MODELELE")
print("=" * 60)

# Creează tabel comparativ
comparison = pd.DataFrame({
    'Model': ['Linear Regression', 'Ridge Regression', 'Random Forest'],
    'R² Train': [r2_train_lr, r2_train_ridge, r2_train_rf],
    'R² Test': [r2_test_lr, r2_test_ridge, r2_test_rf],
    'RMSE (€)': [rmse_test_lr, rmse_test_ridge, rmse_test_rf],
    'MAE (€)': [mae_test_lr, mae_test_ridge, mae_test_rf]
})

print("\\n" + comparison.to_string(index=False))

# Identifică best model
best_model_idx = comparison['R² Test'].idxmax()
best_model_name = comparison.loc[best_model_idx, 'Model']

print(f"\\n🏆 BEST MODEL: {best_model_name}")
print(f"   R² Test: {comparison.loc[best_model_idx, 'R² Test']:.4f}")
print(f"   RMSE: {comparison.loc[best_model_idx, 'RMSE (€)']:,.0f} €")

# ========================================
# VIZUALIZARE COMPARAȚIE
# ========================================

fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# 1. Comparație R² scores
models = comparison['Model']
r2_train_scores = comparison['R² Train']
r2_test_scores = comparison['R² Test']

x = np.arange(len(models))
width = 0.35

axes[0].bar(x - width/2, r2_train_scores, width, label='R² Train', color='lightblue', edgecolor='black')
axes[0].bar(x + width/2, r2_test_scores, width, label='R² Test', color='coral', edgecolor='black')
axes[0].set_xlabel('Model', fontsize=12)
axes[0].set_ylabel('R² Score', fontsize=12)
axes[0].set_title('Comparație R² Scores', fontsize=14, fontweight='bold')
axes[0].set_xticks(x)
axes[0].set_xticklabels(models, rotation=15, ha='right')
axes[0].legend()
axes[0].grid(axis='y', alpha=0.3)
axes[0].set_ylim(0, 1)

# 2. Comparație RMSE
rmse_scores = comparison['RMSE (€)']
colors = ['lightblue', 'lightgreen', 'coral']
axes[1].bar(models, rmse_scores, color=colors, edgecolor='black')
axes[1].set_xlabel('Model', fontsize=12)
axes[1].set_ylabel('RMSE (€)', fontsize=12)
axes[1].set_title('Comparație RMSE (Lower is Better)', fontsize=14, fontweight='bold')
axes[1].set_xticklabels(models, rotation=15, ha='right')
axes[1].grid(axis='y', alpha=0.3)

# Adaugă valori pe bare
for i, v in enumerate(rmse_scores):
    axes[1].text(i, v + max(rmse_scores)*0.02, f'{v:,.0f}€', ha='center', fontweight='bold')

plt.tight_layout()
plt.savefig('models_comparison.png', dpi=300, bbox_inches='tight')
print("\\n✅ Grafic salvat: models_comparison.png")

# ========================================
# INTERPRETARE & CONCLUZII
# ========================================

print("""
\\n💡 INTERPRETARE REZULTATE:

1. R² SCORE (0 to 1, higher is better):
   - Măsoară cât de bine modelul explică variația în preț
   - R² = 0.85 înseamnă: modelul explică 85% din variația prețurilor
   - Compară Train vs Test pentru a detecta overfitting

2. RMSE (Root Mean Squared Error):
   - Eroarea medie în unități de preț (€)
   - RMSE = 15.000€ înseamnă: predicțiile greșesc în medie cu ±15.000€
   - Sensibil la outlieri (errori mari sunt penalizate mai mult)

3. MAE (Mean Absolute Error):
   - Eroarea medie absolută în preț
   - MAE = 12.000€ înseamnă: deviația absolută medie este 12.000€
   - Mai robust la outlieri decât RMSE

🎯 ALEGEREA MODELULUI:
   - Dacă Train R² >> Test R² → Overfitting
   - Dacă ambele R² sunt similare → Good generalization
   - Alege modelul cu cel mai bun R² Test și RMSE mic

🚀 URMĂTORUL PAS: Vizualizarea predicțiilor!
""")`}
                  />
                </TabsContent>

                <TabsContent value="metrics" className="mt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                      📊 Metrici De Evaluare - Explained
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                          📈 R² Score (R-Squared)
                        </h4>
                        <p className="mb-3"><strong>Formula:</strong> R² = 1 - (SS_res / SS_tot)</p>
                        <p className="mb-3"><strong>Range:</strong> 0 to 1 (higher is better)</p>
                        <div className="bg-white dark:bg-gray-900 rounded p-4">
                          <p className="font-semibold mb-2">Interpretare:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>R² = 0.90</strong> → Modelul explică 90% din variație (EXCELLENT)</li>
                            <li>• <strong>R² = 0.75</strong> → Modelul explică 75% din variație (GOOD)</li>
                            <li>• <strong>R² = 0.50</strong> → Modelul explică 50% din variație (MEDIOCRE)</li>
                            <li>• <strong>R² = 0.20</strong> → Modelul explică 20% din variație (POOR)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
                          📏 RMSE (Root Mean Squared Error)
                        </h4>
                        <p className="mb-3"><strong>Formula:</strong> RMSE = √(Σ(y_pred - y_actual)² / n)</p>
                        <p className="mb-3"><strong>Unități:</strong> Aceleași ca target-ul (€)</p>
                        <div className="bg-white dark:bg-gray-900 rounded p-4">
                          <p className="font-semibold mb-2">Exemplu Real:</p>
                          <div className="text-sm space-y-2">
                            <p>Preț real: 120.000€</p>
                            <p>Preț prezis: 110.000€</p>
                            <p>Error: 10.000€</p>
                            <p className="mt-3"><strong>RMSE = 15.000€</strong> înseamnă:</p>
                            <p className="text-gray-600 dark:text-gray-400">"În medie, predicțiile mele greșesc cu ±15.000€"</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                          📐 MAE (Mean Absolute Error)
                        </h4>
                        <p className="mb-3"><strong>Formula:</strong> MAE = Σ|y_pred - y_actual| / n</p>
                        <p className="mb-3"><strong>Unități:</strong> Aceleași ca target-ul (€)</p>
                        <div className="bg-white dark:bg-gray-900 rounded p-4">
                          <p className="font-semibold mb-2">Diferența față de RMSE:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• <strong>MAE:</strong> Eroarea absolută medie (mai robustă la outlieri)</li>
                            <li>• <strong>RMSE:</strong> Penalizează mai mult erorile mari</li>
                            <li>• Dacă RMSE mai mare decat MAE → Multe outlieri în predicții</li>
                            <li>• Dacă RMSE ≈ MAE → Erori consistente</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
                        <h4 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-300">
                          ⚠️ Train vs Test - Detectarea Overfitting
                        </h4>
                        <div className="text-sm space-y-2">
                          <p><strong>Scenariu 1: HEALTHY</strong></p>
                          <p className="text-green-600">R² Train: 0.87 | R² Test: 0.85</p>
                          <p className="text-xs">✅ Model generalizează bine</p>

                          <p className="mt-3"><strong>Scenariu 2: OVERFITTING</strong></p>
                          <p className="text-red-600">R² Train: 0.99 | R² Test: 0.65</p>
                          <p className="text-xs">❌ Modelul a memorat training data</p>

                          <p className="mt-3"><strong>Scenariu 3: UNDERFITTING</strong></p>
                          <p className="text-orange-600">R² Train: 0.45 | R² Test: 0.42</p>
                          <p className="text-xs">⚠️ Modelul prea simplu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                      ✍️ Exercițiu Practic
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 1: GradientBoostingRegressor</h4>
                        <p className="mb-4">Adaugă un al 4-lea model: GradientBoostingRegressor și compară cu cele 3 existente</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p>from sklearn.ensemble import GradientBoostingRegressor</p>
                          <p className="mt-2">gb_model = GradientBoostingRegressor(</p>
                          <p>    n_estimators=100,</p>
                          <p>    learning_rate=0.1,</p>
                          <p>    max_depth=5,</p>
                          <p>    random_state=42</p>
                          <p>)</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Întrebare:</strong> Este mai bun decât Random Forest? De ce?
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 2: Hyperparameter Tuning pentru Random Forest</h4>
                        <p className="mb-4">Folosește GridSearchCV pentru a optimiza hyperparametrii Random Forest</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p>param_grid_rf = </p>
                          <p>    'n_estimators': [50, 100, 200],</p>
                          <p>    'max_depth': [10, 15, 20, None],</p>
                          <p>    'min_samples_split': [2, 5, 10]</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Provocare:</strong> Îmbunătățește R² Test cu minimum 2%
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 3: Feature Importance Analysis</h4>
                        <p className="mb-4">Extrage și vizualizează top 10 cele mai importante features din Random Forest</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p>importances = rf_model.feature_importances_</p>
                          <p>feature_importance_df = pd.DataFrame(</p>
                          <p>    'feature': feature_names,</p>
                          <p>    'importance': importances</p>
                          <p>).sort_values('importance', ascending=False)</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Întrebare:</strong> Care feature influențează cel mai mult prețul?
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* Part 4: Visualizations */}
          <TabsContent value="part4">
            <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-2 border-orange-200 dark:border-orange-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                📈 Partea 4: Vizualizări & Diagnostic
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-orange-700 dark:text-orange-300">
                    🔍 De Ce Vizualizări?
                  </h3>
                  <p className="text-lg mb-4">
                    Metricile numerice (R², RMSE) spun "cât de bine". Vizualizările spun "UNDE și DE CE" modelul greșește.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-4">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📊 Prediction vs Actual</h4>
                      <p className="text-sm">Arată visual cât de aproape sunt predicțiile de realitate</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        <strong>Ideal:</strong> Toate punctele pe linia diagonală y=x
                      </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 rounded p-4">
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">📉 Residuals Analysis</h4>
                      <p className="text-sm">Distribuția erorilor - găsește pattern-uri în greșeli</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        <strong>Ideal:</strong> Distribuție normală centrată pe 0
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-3 text-orange-800 dark:text-orange-200">
                    💡 Ce Cauți În Grafice
                  </h4>
                  <ul className="space-y-2">
                    <li><strong>Punct pe linie perfectă (y=x)</strong> → Predicție perfectă</li>
                    <li><strong>Punct deasupra liniei</strong> → Model SUPRAEVALUEAZĂ (crede că e mai scump)</li>
                    <li><strong>Punct dedesubt</strong> → Model SUBEVALUEAZĂ (crede că e mai ieftin)</li>
                    <li><strong>Spread mare</strong> → Variance mare în predicții</li>
                  </ul>
                </div>
              </div>

              <Tabs defaultValue="code" className="mt-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="code">💻 Cod Complet</TabsTrigger>
                  <TabsTrigger value="interpret">🧠 Interpretare</TabsTrigger>
                  <TabsTrigger value="practice">✍️ Exercițiu</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-6">
                  <CodeBlock
                    id="visualizations"
                    title="Vizualizări Avansate - Prediction vs Actual & Residuals"
                    code={`import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from scipy import stats

# Presupunem că avem predicțiile din partea anterioară
# y_test, y_test_pred_lr, y_test_pred_ridge, y_test_pred_rf

# ========================================
# FIGURA 1: PREDICTION VS ACTUAL (3 MODELE)
# ========================================

fig, axes = plt.subplots(1, 3, figsize=(18, 5))

models_predictions = [
    ('Linear Regression', y_test_pred_lr, 'blue'),
    ('Ridge Regression', y_test_pred_ridge, 'purple'),
    ('Random Forest', y_test_pred_rf, 'green')
]

for idx, (model_name, predictions, color) in enumerate(models_predictions):
    ax = axes[idx]

    # Scatter plot: actual vs predicted
    ax.scatter(y_test, predictions, alpha=0.5, color=color, edgecolors='black', s=50)

    # Linia perfectă y=x
    min_val = min(y_test.min(), predictions.min())
    max_val = max(y_test.max(), predictions.max())
    ax.plot([min_val, max_val], [min_val, max_val], 'r--', linewidth=2, label='Perfect Prediction')

    # Labels și titlu
    ax.set_xlabel('Preț Real (€)', fontsize=12)
    ax.set_ylabel('Preț Prezis (€)', fontsize=12)
    ax.set_title(f'{model_name}\\nPrediction vs Actual', fontsize=13, fontweight='bold')

    # Calculează R² pentru display
    from sklearn.metrics import r2_score
    r2 = r2_score(y_test, predictions)
    ax.text(0.05, 0.95, f'R² = {r2:.3f}', transform=ax.transAxes,
            fontsize=11, verticalalignment='top',
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

    ax.legend(loc='lower right')
    ax.grid(alpha=0.3)

plt.tight_layout()
plt.savefig('prediction_vs_actual.png', dpi=300, bbox_inches='tight')
print("✅ Grafic salvat: prediction_vs_actual.png")

# ========================================
# FIGURA 2: RESIDUALS ANALYSIS
# ========================================

fig, axes = plt.subplots(2, 3, figsize=(18, 10))

for idx, (model_name, predictions, color) in enumerate(models_predictions):
    # Calculează residuals
    residuals = y_test - predictions

    # Plot 1: Residuals vs Predicted (detectează heterocedasticitate)
    ax1 = axes[0, idx]
    ax1.scatter(predictions, residuals, alpha=0.5, color=color, edgecolors='black', s=50)
    ax1.axhline(y=0, color='red', linestyle='--', linewidth=2)
    ax1.set_xlabel('Preț Prezis (€)', fontsize=11)
    ax1.set_ylabel('Residuals (€)', fontsize=11)
    ax1.set_title(f'{model_name}\\nResiduals vs Predicted', fontsize=12, fontweight='bold')
    ax1.grid(alpha=0.3)

    # Plot 2: Distribution of Residuals (verifică normalitatea)
    ax2 = axes[1, idx]
    ax2.hist(residuals, bins=30, color=color, alpha=0.7, edgecolor='black')

    # Suprapune curba normală
    mu, sigma = residuals.mean(), residuals.std()
    x = np.linspace(residuals.min(), residuals.max(), 100)
    ax2.plot(x, stats.norm.pdf(x, mu, sigma) * len(residuals) * (residuals.max()-residuals.min())/30,
             'r-', linewidth=2, label='Normal Distribution')

    # Linie verticală la 0
    ax2.axvline(x=0, color='black', linestyle='--', linewidth=2, alpha=0.7)

    ax2.set_xlabel('Residuals (€)', fontsize=11)
    ax2.set_ylabel('Frecvență', fontsize=11)
    ax2.set_title(f'{model_name}\\nDistribuția Residuals', fontsize=12, fontweight='bold')
    ax2.legend()
    ax2.grid(alpha=0.3)

    # Adaugă statistici
    ax2.text(0.05, 0.95, f'Mean: {mu:,.0f}€\\nStd: {sigma:,.0f}€',
             transform=ax2.transAxes, fontsize=9, verticalalignment='top',
             bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

plt.tight_layout()
plt.savefig('residuals_analysis.png', dpi=300, bbox_inches='tight')
print("✅ Grafic salvat: residuals_analysis.png")

# ========================================
# FIGURA 3: FEATURE IMPORTANCE (RANDOM FOREST)
# ========================================

# Doar Random Forest are feature_importances_
importances = rf_model.feature_importances_

# Creează DataFrame pentru sortare
feature_importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': importances
}).sort_values('importance', ascending=False)

# Selectează top 15
top_features = feature_importance_df.head(15)

# Plot
plt.figure(figsize=(12, 8))
colors_gradient = plt.cm.RdYlGn(np.linspace(0.3, 0.9, len(top_features)))
plt.barh(top_features['feature'], top_features['importance'], color=colors_gradient, edgecolor='black')
plt.xlabel('Importance', fontsize=13)
plt.ylabel('Feature', fontsize=13)
plt.title('Top 15 Feature Importance - Random Forest Regressor', fontsize=15, fontweight='bold')
plt.gca().invert_yaxis()
plt.grid(axis='x', alpha=0.3)

# Adaugă valori pe bare
for i, (idx, row) in enumerate(top_features.iterrows()):
    plt.text(row['importance'] + 0.005, i, f"{row['importance']:.3f}",
             va='center', fontweight='bold', fontsize=9)

plt.tight_layout()
plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight')
print("✅ Grafic salvat: feature_importance.png")

# ========================================
# RAPORT FINAL - DIAGNOSTIC
# ========================================

print("""
\\n📊 INTERPRETAREA VIZUALIZĂRILOR:

1. PREDICTION VS ACTUAL:
   ✓ Puncte aproape de linia roșie = predicții bune
   ✗ Puncte departe de linie = erori mari
   → Verifică: sunt erorile aleatorii sau sistematice?

2. RESIDUALS VS PREDICTED:
   ✓ Residuals random scatter around 0 = GOOD (homoscedasticity)
   ✗ Pattern în residuals (funnel shape) = BAD (heteroscedasticity)
   → Dacă vezi funnel: modelul greșește mai mult la prețuri mari/mici

3. DISTRIBUȚIA RESIDUALS:
   ✓ Distribuție normală centrată pe 0 = IDEAL
   ✗ Skewed la stânga/dreapta = Bias sistematic
   ✗ Heavy tails = Multe outlieri
   → Normal distribution = model capturează bine pattern-urile

4. FEATURE IMPORTANCE:
   → Identifică ce features sunt cele mai importante
   → Poate elimina features irelevante
   → Poate sugera noi features de creat

🎯 ACȚIUNI BAZATE PE GRAFICE:

Dacă vezi:
  • Funnel shape în residuals → Log transform la target
  • Skewed residuals → Verifică outlieri
  • Low R² dar residuals OK → Adaugă mai multe features
  • Train R² >> Test R² → Reduce complexity (regularization)

🏆 CONCLUZIE:
   Metricile spun "CÂT DE BINE".
   Vizualizările spun "UNDE și DE CE".
   Împreună = COMPLETE MODEL DIAGNOSTIC.
""")`}
                  />
                </TabsContent>

                <TabsContent value="interpret" className="mt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                      🧠 Ghid De Interpretare Vizualizări
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                          📍 Pattern #1: Perfect Model
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-2">Prediction vs Actual:</p>
                            <p className="text-sm text-green-600">✅ Toate punctele pe linia y=x</p>
                            <p className="text-sm text-green-600">✅ Spread minim</p>
                            <p className="text-sm text-green-600">✅ R² aproape de 1</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Residuals:</p>
                            <p className="text-sm text-green-600">✅ Random scatter around 0</p>
                            <p className="text-sm text-green-600">✅ Distribuție normală</p>
                            <p className="text-sm text-green-600">✅ No pattern visible</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-yellow-700 dark:text-yellow-300">
                          ⚠️ Pattern #2: Systematic Bias
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-2">Cum arată:</p>
                            <p className="text-sm text-orange-600">⚠️ Toate punctele DEASUPRA liniei y=x</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              <strong>Interpretare:</strong> Modelul SUPRAEVALUEAZĂ consistent
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Rezolvare:</p>
                            <p className="text-sm">• Verifică feature engineering</p>
                            <p className="text-sm">• Poate ai nevoie de target transformation</p>
                            <p className="text-sm">• Sau features importante lipsesc</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-red-700 dark:text-red-300">
                          🚨 Pattern #3: Heteroscedasticity (Funnel Shape)
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-2">Cum arată:</p>
                            <p className="text-sm text-red-600">❌ Residuals formează "pâlnie"</p>
                            <p className="text-sm text-red-600">❌ Spread crește cu valorile prezise</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              <strong>Interpretare:</strong> Variance neuniformă - erori mai mari la prețuri mari
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Rezolvare:</p>
                            <p className="text-sm">• Log transform la target: log(pret)</p>
                            <p className="text-sm">• Sau weighted regression</p>
                            <p className="text-sm">• Sau robust regression models</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
                          📊 Pattern #4: Outlieri Vizibili
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-2">Cum arată:</p>
                            <p className="text-sm text-purple-600">⚠️ Câteva puncte FOARTE departe de linie</p>
                            <p className="text-sm text-purple-600">⚠️ Heavy tails în distribuția residuals</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Ce faci:</p>
                            <p className="text-sm">• Identifică outlieri: top 5% residuals</p>
                            <p className="text-sm">• Investighează: sunt erori sau cazuri reale?</p>
                            <p className="text-sm">• Decide: elimini sau folosești robust models?</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                          🎯 Exemplu Practic: Interpretare Completă
                        </h4>
                        <div className="bg-white dark:bg-gray-900 rounded p-4 text-sm space-y-3">
                          <p><strong>Scenariul:</strong> Vezi că Random Forest are:</p>
                          <ul className="ml-4 space-y-1">
                            <li>✅ R² Test = 0.88 (GOOD)</li>
                            <li>⚠️ Dar punctele în Prediction vs Actual arată spread mai mare la prețuri &gt; 200.000€</li>
                            <li>⚠️ Residuals formează ușoară pâlnie</li>
                          </ul>

                          <p className="mt-4"><strong>Interpretare:</strong></p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Modelul funcționează bine în general, DAR are probleme cu apartamentele scumpe (luxury segment).
                            Posibil că nu ai suficiente exemple de apartamente &gt;200K în training data.
                          </p>

                          <p className="mt-4"><strong>Acțiune:</strong></p>
                          <p className="text-green-700">
                            → Colectează mai multe date pentru segmentul luxury<br/>
                            → SAU creează model separat pentru apartamente &gt; 200K€<br/>
                            → SAU folosește log transform: log(pret)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-6">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                      ✍️ Exercițiu Practic
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 1: Identifică Outlieri</h4>
                        <p className="mb-4">Identifică top 10 apartamente cu cele mai mari erori absolute și analizează-le</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p># Calculează erori absolute</p>
                          <p>errors = np.abs(y_test - y_test_pred_rf)</p>
                          <p>error_df = pd.DataFrame({'{'}
                            'actual': y_test, 'predicted': y_test_pred_rf, 'error': errors
                          {'}'})</p>
                          <p>top_errors = error_df.nlargest(10, 'error')</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Întrebare:</strong> Ce au în comun apartamentele cu cele mai mari erori?
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 2: Log Transformation</h4>
                        <p className="mb-4">Încearcă să antrenezi modelul cu log(pret) în loc de pret</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p>y_train_log = np.log(y_train)</p>
                          <p>y_test_log = np.log(y_test)</p>
                          <p className="mt-2"># Antrenează modelul pe y_train_log</p>
                          <p># Apoi exponențiază predicțiile: np.exp(predictions)</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Provocare:</strong> Compară RMSE înainte și după log transform
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-3">📝 Sarcină 3: Prediction Intervals</h4>
                        <p className="mb-4">Creează intervale de încredere pentru predicții (±1 std deviation)</p>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm font-mono">
                          <p>residuals_std = np.std(y_test - y_test_pred_rf)</p>
                          <p>lower_bound = y_test_pred_rf - 1.96 * residuals_std</p>
                          <p>upper_bound = y_test_pred_rf + 1.96 * residuals_std</p>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <strong>Rezultat:</strong> "Apartament prezis: 125.000€ ± 12.000€ (95% confidence)"
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
        <Card className="mt-12 p-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-2 border-green-300 dark:border-green-700">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎉 Session 32 Complete!
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Ai masterizat un proiect COMPLET de Machine Learning Regression!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                ✅ Ce Ai Învățat
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <strong>Date Realiste:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Crearea și curățarea datelor messy cu missing values</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <strong>ColumnTransformer:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Preprocessing complex pentru numerical + categorical features</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <strong>3 Modele:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Linear Regression, Ridge (GridSearch), Random Forest</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <strong>Vizualizări:</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Prediction vs Actual, Residuals, Feature Importance</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                🚀 Skills Unlocked
              </h3>
              <div className="space-y-3">
                <div className="bg-green-100 dark:bg-green-900/30 rounded p-3">
                  <p className="font-semibold text-green-700 dark:text-green-300">✓ End-to-End ML Project</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">De la date raw la model deployment-ready</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-3">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">✓ Advanced Preprocessing</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Pipelines, imputation, encoding, scaling</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded p-3">
                  <p className="font-semibold text-purple-700 dark:text-purple-300">✓ Model Comparison</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Systematic evaluation cu multiple metrici</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded p-3">
                  <p className="font-semibold text-orange-700 dark:text-orange-300">✓ Diagnostic Avanzat</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Interpretare vizualizări și debugging ML</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-300">
              💡 Diferența față de Sessiunile Anterioare
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded p-4">
                <p className="font-semibold text-blue-600 mb-2">Session 30:</p>
                <p className="text-gray-600 dark:text-gray-400">Basics - linear regression simplu, date curate, o singură metrica</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-4">
                <p className="font-semibold text-purple-600 mb-2">Session 31:</p>
                <p className="text-gray-600 dark:text-gray-400">Classification avansată cu pipelines, cross-validation, multiple modele</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-4">
                <p className="font-semibold text-green-600 mb-2">Session 32:</p>
                <p className="text-gray-600 dark:text-gray-400">END-TO-END regression project cu date messy, preprocessing complex, complete diagnostic</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-3 text-yellow-700 dark:text-yellow-300">
              🎯 Următorii Pași
            </h3>
            <ol className="space-y-2">
              <li><strong>1. Practică cu propriul dataset:</strong> Găsește date de pe Kaggle (house prices, car prices) și aplică tot ce ai învățat</li>
              <li><strong>2. Experimentează cu hyperparameters:</strong> Încearcă GridSearchCV pe toate cele 3 modele</li>
              <li><strong>3. Feature Engineering:</strong> Creează features noi (vârstă apartament = 2024 - an_constructie, preț/mp, etc.)</li>
              <li><strong>4. Deploy:</strong> Salvează best model cu joblib și creează o aplicație simplă cu Streamlit</li>
              <li><strong>5. Session 33:</strong> Classification pe Iris dataset - consolidare și comparație</li>
            </ol>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              De la "Ar trebui să cumpăr acest apartament?"
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              La "Am un sistem ML care prezice prețuri cu 88% acuratețe!"
            </p>
            <p className="text-3xl">🏠 → 🤖 → 📊 → 🎉</p>
          </div>
        </Card>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => window.location.href = '/machine-learning'}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 text-lg"
          >
            ← Înapoi La Machine Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SklearnSession32;