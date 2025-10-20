import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Target, Eye, Activity, Calendar, DollarSign, Briefcase, Heart, Brain, TrendingUp, BarChart3, LineChart, PieChart, Lightbulb, Coffee, Moon, Droplets, Footprints, Copy, Code, Download } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

const PlotlyInteractiveArtifact = () => {
  const navigate = useNavigate();
  
  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);
  const [storyChapter, setStoryChapter] = useState(0);
  
  // Demo States
  const [activeDemo, setActiveDemo] = useState('finance');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoverData, setHoverData] = useState(null);
  const [chartView, setChartView] = useState('overview');
  const [animationStep, setAnimationStep] = useState(0);
  const [filterEnabled, setFilterEnabled] = useState({
    income: true,
    expenses: true,
    savings: true
  });
  const [drillDownCategory, setDrillDownCategory] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [alertsVisible, setAlertsVisible] = useState(true);
  
  // Enhanced Finance Data with realistic amounts and interesting variations
  const [financeData] = useState({
    months: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // More realistic income with freelance work, bonuses, and economic challenges
    income: [850, 650, 900, 1200, 750, 950, 1100, 800, 650, 750, 1300, 950],
    expenses: {
      // Steady rent with one increase
      'Locuință': [350, 350, 350, 350, 380, 380, 380, 380, 380, 380, 380, 380],
      // Food varies with eating out vs cooking, tight months
      'Mâncare': [180, 120, 250, 160, 140, 200, 220, 160, 90, 180, 280, 320],
      // Transport varies with travel, bike repairs, car issues
      'Transport': [60, 30, 120, 45, 80, 55, 40, 35, 50, 85, 110, 150],
      // Entertainment: economy in tough months, splurge in good ones
      'Entertainment': [80, 20, 150, 120, 40, 110, 180, 60, 15, 90, 250, 300],
      // Health: regular + unexpected doctor visits, gym
      'Sănătate': [35, 45, 80, 65, 25, 70, 30, 55, 120, 90, 45, 85],
      // Education: course payments, books, online subscriptions
      'Educație': [40, 80, 45, 95, 120, 150, 60, 180, 200, 160, 90, 50],
      // Others: varied unexpected expenses, repairs, gifts
      'Altele': [75, 45, 60, 120, 85, 95, 110, 140, 70, 150, 180, 200]
    },
    targets: {
      'Locuință': 380,
      'Mâncare': 200,
      'Transport': 80,
      'Entertainment': 120,
      'Sănătate': 60,
      'Educație': 100,
      'Altele': 100
    },
    hiddenInsights: [
      "😰 Feb & Sep: luni critice cu venit sub €700 - construiește un fond de urgență!",
      "🎉 Nov: bonus major de €1300 - perfect pentru plăți în avans sau investiții",
      "🍽️ Dec: explozie mâncare €320 (+78% vs medie) - sărbătorile costă!",
      "📚 Educație: între €40-200/lună - investiția ta în skill-uri se vede în Nov",
      "🚗 Transport: variază 5x (€30-150) - optimizează cu abonamente lunare",
      "💸 Entertainment: de la €15 la €300 - emoțional spending correlat cu venitul",
      "🏠 Locuință: majorare €30 în Mai - negociază sau caută alternative"
    ],
    monthlyTargets: [900, 850, 950, 1000, 850, 950, 1050, 900, 800, 900, 1100, 1000],
    savingsGoal: [80, 50, 100, 150, 50, 100, 120, 80, 50, 80, 200, 100]
  });

  // Health Data
  const [healthData] = useState({
    days: Array.from({length: 14}, (_, i) => `Ziua ${i + 1}`),
    sleep: [7.5, 6.8, 7.2, 8.0, 6.5, 7.8, 8.2, 7.1, 6.9, 7.6, 8.1, 7.4, 6.7, 7.9],
    steps: [8500, 7200, 9100, 10200, 6800, 9500, 11200, 8800, 7600, 9800, 10500, 8900, 7400, 9200],
    water: [2.1, 1.8, 2.5, 2.8, 1.5, 2.3, 3.0, 2.2, 1.9, 2.6, 2.9, 2.4, 1.7, 2.5],
    mood: [8, 6, 7, 9, 5, 8, 9, 7, 6, 8, 9, 8, 6, 8],
    energy: [7, 5, 6, 9, 4, 8, 9, 6, 5, 8, 9, 7, 5, 7],
    correlations: [
      "8+ ore de somn → +23% energie, +15% pași",
      "2.5L+ apă → +18% mood, +12% energie",
      "10k+ pași → +20% calitate somn următoarea noapte"
    ]
  });

  // Personal Projects Data
  const [projectData] = useState({
    weeks: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
    coding: [5, 8, 12, 15, 20, 18, 25, 22],
    writing: [2, 3, 1, 4, 6, 8, 5, 9],
    exercise: [3, 4, 6, 5, 8, 7, 9, 8],
    learning: [10, 12, 8, 15, 18, 16, 20, 19],
    insights: [
      "Coding consistency crește cu 340% în 8 săptămâni",
      "Writing are cele mai mari fluctuații - necesită rutină",
      "Learning și Exercise se influențează mutual pozitiv"
    ]
  });

  // Story progression
  const storyChapters = [
    {
      title: "🕰️ Toamna 2012, Montreal",
      content: "Alex C. Johnson și echipa Plotly se confruntau cu frustrarea prezentărilor statice. Datele financiare erau perfect analizate în Matplotlib, dar imposibil de explorat în timp real.",
      details: "'Clickează aici să vezi mai mult' nu exista. Știau că viitorul vizualizării trebuie să fie interactiv, nu doar informativ."
    },
    {
      title: "💡 Revelația Interactivității", 
      content: "Prima întrebare: 'De ce să arătăm datele când putem să le lăsăm pe oameni să le exploreze?' Răspunsul: pentru că atingerea datelor revelează pattern-uri ascunse.",
      details: "JavaScript + Python = democratizarea explorării datelor. Oricine poate deveni data detective cu un click."
    },
    {
      title: "🌐 Web-ul Devine Laboratorul",
      content: "2013: Plotly.js lansează vizualizarea interactivă în browser. Deodată, dashboard-urile nu mai sunt doar rapoarte - devin instrumente de descoperire.",
      details: "Hover pentru detalii, zoom pentru focus, filtrare pentru claritate. Datele devin jucărie inteligentă."
    },
    {
      title: "💰 Aplicații în Viața Reală",
      content: "Tesla monitorizează flota globală în timp real. Google Analytics transformă click-urile în călătorii interactive. Dar cel mai important: TU poți să-ți explorezi propriile date.",
      details: "Finanțele tale, sănătatea ta, progresul tău - toate devin interactive lab-uri de auto-descoperire."
    },
    {
      title: "🚀 Tu Ești Următorul Explorer",
      content: "Astăzi începi să transformi numerele statice în experiențe interactive. Fiecare hover, fiecare zoom, fiecare filtrare te aduce mai aproape de înțelegerea ta.",
      details: "Welcome to your personal data universe. Pregătește-te să descoperi corelații pe care nu le știai că exist."
    }
  ];

  const plotlyFeatures = [
    {
      title: "🔍 Hover Tooltips",
      description: "Detalii instant la trecerea mouse-ului",
      example: "Treci mouse-ul peste orice punct pentru context complet",
      color: "emerald"
    },
    {
      title: "🔍 Zoom & Pan", 
      description: "Explorează date la orice nivel de detaliu",
      example: "Zoom în perioadele critice, pan pentru trend-uri",
      color: "teal"
    },
    {
      title: "🎛️ Filtrare Dinamică",
      description: "Selectează și compară doar ce te interesează", 
      example: "Click pe legende pentru a ascunde/arăta categorii",
      color: "cyan"
    },
    {
      title: "📊 Multiple Views",
      description: "Combină multiple perspective într-un dashboard",
      example: "Line + Bar + Heatmap = insight complet",
      color: "blue"
    }
  ];

  const realWorldProjects = [
    {
      title: "💰 Personal Finance Intelligence",
      description: "Dashboard interactiv care revelează pattern-urile tale de cheltuieli",
      features: [
        "Hover pe categorii pentru breakdown detaliat",
        "Zoom în lunile critice cu cheltuieli mari", 
        "Filtrare pe tipuri de expenses pentru insight-uri",
        "Trend predicție bazată pe ultimele 6 luni"
      ],
      impact: "Utilizatorii descoperă în medie €200-400/lună în cheltuieli optimizabile",
      color: "green"
    },
    {
      title: "🏥 Health & Wellness Tracker",
      description: "Monitorizare interactivă pentru somn, activitate și stare de spirit",
      features: [
        "Heatmap interactiv pentru pattern-ele de somn",
        "Corelații live între hidratare și energie",
        "Zoom în zilele cu performance ridicat",
        "Predicții pentru optimizarea rutinei"
      ],
      impact: "20% îmbunătățire în calitatea somnului prin vizualizarea pattern-urilor",
      color: "blue"
    },
    {
      title: "🎯 Personal Projects Progress",
      description: "Track progresul în hobby-uri, învățare și proiecte creative",
      features: [
        "Timeline interactiv pentru fiecare proiect",
        "Corelații între activități diferite",
        "Filtrare pe perioade productive",
        "Insights pentru consistență optimă"
      ],
      impact: "340% creștere în consistența proiectelor prin vizualizare",
      color: "purple"
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const runOriginStory = () => {
    setIsStoryRunning(true);
    setStoryStep(0);
    setShowStoryDetails(true);
    setStoryChapter(0);
    
    const interval = setInterval(() => {
      setStoryStep((prev) => {
        if (prev >= storyChapters.length - 1) {
          setIsStoryRunning(false);
          clearInterval(interval);
          return prev;
        }
        setStoryChapter(prev + 1);
        return prev + 1;
      });
    }, 4000);
  };

  const resetStory = () => {
    setStoryStep(-1);
    setIsStoryRunning(false);
    setShowStoryDetails(false);
    setStoryChapter(0);
  };

  // Advanced Finance Analytics Functions
  const calculateTotalExpenses = (monthIndex) => {
    return Object.values(financeData.expenses).reduce((sum, category) => sum + category[monthIndex], 0);
  };

  const calculateSavings = (monthIndex) => {
    return financeData.income[monthIndex] - calculateTotalExpenses(monthIndex);
  };

  const getDisplayMonths = () => {
    const months = financeData.months;
    switch(selectedTimeframe) {
      case '3months': return months.slice(-3);
      case '6months': return months.slice(-6);
      default: return months.slice(-6);
    }
  };

  const getFilteredData = () => {
    const displayMonths = getDisplayMonths();
    const startIndex = financeData.months.length - displayMonths.length;
    
    return {
      months: displayMonths,
      income: financeData.income.slice(startIndex),
      expenses: Object.fromEntries(
        Object.entries(financeData.expenses).map(([cat, values]) => [cat, values.slice(startIndex)])
      ),
      targets: financeData.targets,
      savingsGoal: financeData.savingsGoal.slice(startIndex)
    };
  };

  const getCategoryInsights = (category) => {
    const categoryData = financeData.expenses[category];
    const avg = categoryData.reduce((a, b) => a + b, 0) / categoryData.length;
    const max = Math.max(...categoryData);
    const min = Math.min(...categoryData);
    const variance = ((max - min) / avg * 100).toFixed(0);
    const target = financeData.targets[category];
    const currentVsTarget = ((categoryData[categoryData.length - 1] / target - 1) * 100).toFixed(0);
    
    return {
      average: avg.toFixed(0),
      variance,
      currentVsTarget: Number(currentVsTarget),
      recommendation: Number(currentVsTarget) > 20 ? 
        `⚠️ Peste target cu ${currentVsTarget}% - necesită optimizare` :
        Number(currentVsTarget) > 0 ? 
        `⚡ Ușor peste target cu ${currentVsTarget}%` :
        `✅ Sub target cu ${Math.abs(Number(currentVsTarget))}% - excelent!`
    };
  };

  const getSmartInsights = () => {
    const data = getFilteredData();
    const insights = [];
    
    // Trend Analysis
    const recentSavings = data.months.map((_, i) => data.income[i] - calculateTotalExpenses(financeData.months.length - data.months.length + i));
    const savingsTrend = recentSavings[recentSavings.length - 1] - recentSavings[0];
    
    if (savingsTrend > 100) {
      insights.push({
        type: 'success',
        icon: '📈',
        title: 'Savings Trend Pozitiv',
        message: `Economiile tale cresc cu €${savingsTrend.toFixed(0)} vs perioada precedentă!`
      });
    } else if (savingsTrend < -100) {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Savings în Declin',
        message: `Economiile scad cu €${Math.abs(savingsTrend).toFixed(0)} - reviziește bugetul`
      });
    }

    // Category Analysis
    Object.entries(data.expenses).forEach(([category, values]) => {
      const target = data.targets[category];
      const current = values[values.length - 1];
      const overspend = ((current / target - 1) * 100);
      
      if (overspend > 30) {
        insights.push({
          type: 'danger',
          icon: '🚨',
          title: `${category} Alert`,
          message: `Peste target cu ${overspend.toFixed(0)}% - acțiune imediată necesară!`
        });
      }
    });

    return insights.slice(0, 4); // Limit to 4 insights
  };

  const getHealthCorrelation = (sleepHours) => {
    if (sleepHours >= 8) return { energy: "Mare", mood: "Excelent", color: "text-green-600" };
    if (sleepHours >= 7) return { energy: "Bună", mood: "Bun", color: "text-yellow-600" };
    return { energy: "Scăzută", mood: "Redus", color: "text-red-600" };
  };

  // Interactive State Management
  const [hoveredExpense, setHoveredExpense] = useState(null);
  const [selectedHealthDay, setSelectedHealthDay] = useState(null);
  const [zoomedPeriod, setZoomedPeriod] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showInsights, setShowInsights] = useState(true);

  // Animation and Live Updates
  const triggerAnimation = () => {
    setAnimationStep(0);
    const interval = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Smart Filter Toggle
  const toggleFilter = (filterType) => {
    setFilterEnabled(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
    triggerAnimation();
  };

  // Category Drill Down
  const handleCategoryClick = (category) => {
    setDrillDownCategory(drillDownCategory === category ? null : category);
    setChartView(drillDownCategory === category ? 'overview' : 'drilldown');
  };

  // Month Selection and Details
  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(selectedMonth === monthIndex ? null : monthIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/data-visualizing')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Data Visualizing
            </Button>
            <Badge className="bg-white/20 text-white">Session 22</Badge>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Plotly Interactive Mastery</h1>
              <p className="text-xl text-white/90">Vizualizări Interactive cu Plotly - Când datele iau viață prin atingere</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Origin Story Section */}
        <Card className="mb-8 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Target className="w-5 h-5" />
              Povestea Originilor: De ce s-a născut Plotly?
            </CardTitle>
            <CardDescription>
              Necesitatea care a creat interactivitatea în vizualizare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Button
                onClick={runOriginStory}
                disabled={isStoryRunning}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isStoryRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Story Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Origin Story
                  </>
                )}
              </Button>
              <Button
                onClick={resetStory}
                variant="outline"
                className="border-emerald-600 text-emerald-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {showStoryDetails && (
              <div className="space-y-4">
                {storyChapters.slice(0, storyStep + 1).map((chapter, index) => (
                  <Card key={index} className={`transition-all duration-500 ${index === storyStep ? 'border-emerald-500 shadow-lg' : 'border-gray-200'}`}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                        {chapter.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {chapter.content}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {chapter.details}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plotly Features Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-600" />
              Ce aduce în plus interactivitatea?
            </CardTitle>
            <CardDescription>
              Transformă consumul pasiv în explorare activă
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plotlyFeatures.map((feature, index) => (
                <Card key={index} className={`border-${feature.color}-200 dark:border-${feature.color}-800 hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-4">
                    <h4 className={`font-semibold text-${feature.color}-700 dark:text-${feature.color}-300 mb-2`}>
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {feature.description}
                    </p>
                    <p className={`text-xs text-${feature.color}-600 dark:text-${feature.color}-400 italic`}>
                      {feature.example}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Aplicații Reale Interactive
            </CardTitle>
            <CardDescription>
              Explorează datele tale cu Plotly - Hover, Click, Zoom pentru insight-uri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeDemo} onValueChange={setActiveDemo}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="finance" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Finanțe
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Sănătate
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Proiecte
                </TabsTrigger>
              </TabsList>

              {/* Finance Demo - FULLY INTERACTIVE */}
              <TabsContent value="finance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardHeader>
                        <CardTitle className="text-green-700 dark:text-green-300 flex items-center gap-2">
                          💰 Dashboard Finanțe Interactive
                          <Badge className={`ml-2 ${animationStep > 0 ? 'bg-green-500' : 'bg-gray-400'} text-white`}>
                            {animationStep > 0 ? 'LIVE' : 'STATIC'}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Completamente interactiv - toate butoanele funcționează! Hover, click, filtrează, zoom
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Interactive Controls */}
                        <div className="mb-6 space-y-4">
                          {/* Timeframe Selector */}
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border">
                            <label className="font-medium text-sm">📊 Perioadă:</label>
                            <div className="flex gap-2">
                              {[
                                { key: '3months', label: '3 Luni', months: 3 },
                                { key: '6months', label: '6 Luni', months: 6 }
                              ].map(option => (
                                <Button
                                  key={option.key}
                                  size="sm"
                                  variant={selectedTimeframe === option.key ? 'default' : 'outline'}
                                  onClick={() => {
                                    setSelectedTimeframe(option.key);
                                    triggerAnimation();
                                  }}
                                  className={`transition-all duration-300 ${
                                    selectedTimeframe === option.key 
                                      ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                                      : 'hover:bg-green-50'
                                  }`}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </div>
                            <div className="ml-auto text-sm text-gray-600">
                              Afișez: <strong>{getDisplayMonths().length} luni</strong>
                            </div>
                          </div>

                          {/* Live Filters */}
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border">
                            <label className="font-medium text-sm">🎛️ Filtre Live:</label>
                            <div className="flex gap-2">
                              {[
                                { key: 'income', label: '💰 Venituri', color: 'green' },
                                { key: 'expenses', label: '💸 Cheltuieli', color: 'red' },
                                { key: 'savings', label: '💎 Economii', color: 'blue' }
                              ].map(filter => (
                                <Button
                                  key={filter.key}
                                  size="sm"
                                  variant={filterEnabled[filter.key] ? 'default' : 'outline'}
                                  onClick={() => toggleFilter(filter.key)}
                                  className={`transition-all duration-500 ${
                                    filterEnabled[filter.key]
                                      ? `bg-${filter.color}-600 text-white shadow-lg transform scale-105` 
                                      : 'opacity-50 hover:opacity-100'
                                  }`}
                                >
                                  {filter.label}
                                </Button>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setComparisonMode(!comparisonMode);
                                triggerAnimation();
                              }}
                              className={`ml-auto ${comparisonMode ? 'bg-orange-500 text-white' : ''}`}
                            >
                              {comparisonMode ? '📊 Comparație ON' : '📈 Activează Comparație'}
                            </Button>
                          </div>
                        </div>

                        {/* Interactive Chart Area */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg border relative overflow-hidden">
                          {/* Animation Overlay */}
                          {animationStep > 0 && animationStep < 100 && (
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 z-10 flex items-center justify-center">
                              <div className="text-center">
                                <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                <p className="text-sm font-medium">Actualizare date interactive...</p>
                              </div>
                            </div>
                          )}

                          <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold flex items-center gap-2">
                                {chartView === 'overview' ? '📊 Overview Financiar' : `🔍 Deep Dive: ${drillDownCategory}`}
                                {selectedMonth !== null && <Badge className="bg-blue-500 text-white">Luna selectată: {getFilteredData().months[selectedMonth]}</Badge>}
                              </h4>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => {
                                    setZoomedPeriod(zoomedPeriod === 'recent' ? null : 'recent');
                                    triggerAnimation();
                                  }}
                                  className={zoomedPeriod === 'recent' ? 'bg-blue-500 text-white' : ''}
                                >
                                  {zoomedPeriod === 'recent' ? '🔍 Zoomed' : '🔍 Zoom Recent'}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => {
                                    setZoomedPeriod(null);
                                    setSelectedMonth(null);
                                    setDrillDownCategory(null);
                                    setChartView('overview');
                                    triggerAnimation();
                                  }}
                                >
                                  <RotateCcw className="w-4 h-4 mr-1" />
                                  Reset
                                </Button>
                              </div>
                            </div>
                            
                            {/* Dynamic Chart Display */}
                            {chartView === 'overview' ? (
                              <div className="space-y-4">
                                {/* Main Bar Chart */}
                                <div className={`grid gap-2 h-64 transition-all duration-500 ${zoomedPeriod === 'recent' ? 'grid-cols-3' : `grid-cols-${getDisplayMonths().length}`}`}>
                                  {getFilteredData().months.map((month, index) => {
                                    const displayIndex = financeData.months.length - getDisplayMonths().length + index;
                                    const income = getFilteredData().income[index];
                                    const totalExpenses = calculateTotalExpenses(displayIndex);
                                    const savings = calculateSavings(displayIndex);
                                    const isSelected = selectedMonth === index;
                                    
                                    if (zoomedPeriod === 'recent' && index < getFilteredData().months.length - 3) return null;
                                    
                                    return (
                                      <div 
                                        key={month} 
                                        className={`flex flex-col justify-end items-center space-y-2 cursor-pointer group transition-all duration-300 ${
                                          isSelected ? 'transform scale-105 bg-blue-100 dark:bg-blue-900/20 rounded-lg p-2' : ''
                                        }`}
                                        onClick={() => handleMonthClick(index)}
                                      >
                                        <div className="flex flex-col justify-end h-full w-full space-y-1 relative">
                                          {/* Income bar */}
                                          {filterEnabled.income && (
                                            <div
                                              className={`bg-green-500 w-full rounded-t hover:bg-green-600 cursor-pointer transition-all duration-300 group-hover:shadow-lg ${
                                                isSelected ? 'ring-2 ring-green-400' : ''
                                              }`}
                                              style={{ 
                                                height: `${(income / 1500) * 100}%`,
                                                opacity: animationStep > 50 ? 1 : 0.3,
                                                transform: `scaleY(${animationStep / 100})`
                                              }}
                                              onMouseEnter={() => setHoveredExpense({ 
                                                type: 'income', 
                                                month, 
                                                value: income,
                                                index: displayIndex,
                                                savings: savings
                                              })}
                                              onMouseLeave={() => setHoveredExpense(null)}
                                            />
                                          )}
                                          
                                          {/* Expenses bar */}
                                          {filterEnabled.expenses && (
                                            <div
                                              className={`bg-red-400 w-full hover:bg-red-500 cursor-pointer transition-all duration-300 group-hover:shadow-lg ${
                                                isSelected ? 'ring-2 ring-red-400' : ''
                                              }`}
                                              style={{ 
                                                height: `${(totalExpenses / 1500) * 100}%`,
                                                opacity: animationStep > 30 ? 1 : 0.3,
                                                transform: `scaleY(${animationStep / 100})`
                                              }}
                                              onMouseEnter={() => setHoveredExpense({ 
                                                type: 'expenses', 
                                                month, 
                                                value: totalExpenses,
                                                index: displayIndex,
                                                breakdown: Object.fromEntries(
                                                  Object.entries(financeData.expenses).map(([cat, values]) => [cat, values[displayIndex]])
                                                )
                                              })}
                                              onMouseLeave={() => setHoveredExpense(null)}
                                            />
                                          )}
                                          
                                          {/* Savings indicator */}
                                          {filterEnabled.savings && savings > 0 && (
                                            <div
                                              className={`bg-blue-500 w-full rounded-t hover:bg-blue-600 cursor-pointer transition-all duration-300 group-hover:shadow-lg ${
                                                isSelected ? 'ring-2 ring-blue-400' : ''
                                              }`}
                                              style={{ 
                                                height: `${(savings / 400) * 100}%`,
                                                opacity: animationStep > 70 ? 1 : 0.3,
                                                transform: `scaleY(${animationStep / 100})`
                                              }}
                                              onMouseEnter={() => setHoveredExpense({ 
                                                type: 'savings', 
                                                month, 
                                                value: savings,
                                                index: displayIndex,
                                                percentage: ((savings / income) * 100).toFixed(1)
                                              })}
                                              onMouseLeave={() => setHoveredExpense(null)}
                                            />
                                          )}
                                        </div>
                                        <span className={`text-xs text-center font-medium transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                                          {month}
                                        </span>
                                        {/* Quick stats */}
                                        <div className="text-xs text-center space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <div className="text-green-600">€{income}</div>
                                          <div className="text-red-500">-€{totalExpenses}</div>
                                          {savings > 0 && <div className="text-blue-600">+€{savings}</div>}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Category Breakdown (clickable) */}
                                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                                  <h5 className="font-medium mb-3 flex items-center gap-2">
                                    🏷️ Categorii Cheltuieli 
                                    <span className="text-xs text-gray-500">(Click pentru drill-down)</span>
                                  </h5>
                                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {Object.entries(getFilteredData().expenses).map(([category, values]) => {
                                      const latestValue = values[values.length - 1];
                                      const target = financeData.targets[category];
                                      const isOverTarget = latestValue > target;
                                      const isSelected = drillDownCategory === category;
                                      
                                      return (
                                        <div
                                          key={category}
                                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                            isSelected 
                                              ? 'bg-blue-500 text-white transform scale-105' 
                                              : isOverTarget 
                                                ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                                                : 'bg-green-50 border-green-200 hover:bg-green-100'
                                          }`}
                                          onClick={() => handleCategoryClick(category)}
                                        >
                                          <div className="text-center">
                                            <div className="text-xs font-medium mb-1">{category}</div>
                                            <div className={`text-sm font-bold ${
                                              isSelected ? 'text-white' : isOverTarget ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                              €{latestValue}
                                            </div>
                                            <div className={`text-xs ${
                                              isSelected ? 'text-white/80' : 'text-gray-500'
                                            }`}>
                                              Target: €{target}
                                            </div>
                                            {isOverTarget && !isSelected && (
                                              <div className="text-xs text-red-500 font-medium">
                                                +{((latestValue/target - 1) * 100).toFixed(0)}%
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Drill-down view for selected category */
                              <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                                    📊 Analiza detaliată: {drillDownCategory}
                                  </h5>
                                  {(() => {
                                    const insights = getCategoryInsights(drillDownCategory);
                                    return (
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                          <div className="text-sm text-gray-600">Media</div>
                                          <div className="text-lg font-bold text-blue-600">€{insights.average}</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-sm text-gray-600">Variație</div>
                                          <div className="text-lg font-bold text-orange-600">{insights.variance}%</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-sm text-gray-600">vs Target</div>
                                          <div className={`text-lg font-bold ${Number(insights.currentVsTarget) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {Number(insights.currentVsTarget) > 0 ? '+' : ''}{insights.currentVsTarget}%
                                          </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                          <div className="text-xs text-gray-600 mb-1">Recomandare</div>
                                          <div className="text-xs p-2 bg-white dark:bg-gray-700 rounded border">
                                            {insights.recommendation}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                                
                                {/* Category trend line */}
                                <div className="h-32 flex items-end justify-between gap-1 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                                  {financeData.expenses[drillDownCategory].map((value, index) => {
                                    const month = financeData.months[index];
                                    const target = financeData.targets[drillDownCategory];
                                    const height = (value / (target * 1.5)) * 100;
                                    const isOverTarget = value > target;
                                    
                                    return (
                                      <div key={month} className="flex flex-col items-center gap-1 flex-1">
                                        <div
                                          className={`w-full rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer ${
                                            isOverTarget ? 'bg-red-400' : 'bg-green-400'
                                          }`}
                                          style={{ height: `${height}%` }}
                                          onMouseEnter={() => setHoveredExpense({
                                            type: 'category',
                                            category: drillDownCategory,
                                            month,
                                            value,
                                            target,
                                            isOverTarget
                                          })}
                                          onMouseLeave={() => setHoveredExpense(null)}
                                        />
                                        <span className="text-xs text-gray-500 transform -rotate-45 origin-center">
                                          {month}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Enhanced Hover Tooltip */}
                            {hoveredExpense && (
                              <div className="absolute top-4 right-4 p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-xl z-20 min-w-64 transform transition-all duration-200 pointer-events-none">
                                <div className="space-y-2">
                                  <p className="font-semibold flex items-center gap-2">
                                    {hoveredExpense.type === 'income' && '💰 Venit'}
                                    {hoveredExpense.type === 'expenses' && '💸 Cheltuieli'}
                                    {hoveredExpense.type === 'savings' && '💎 Economii'}
                                    {hoveredExpense.type === 'category' && `🏷️ ${hoveredExpense.category}`}
                                    <Badge className="bg-blue-500 text-white">{hoveredExpense.month}</Badge>
                                  </p>
                                  
                                  <p className="text-2xl font-bold text-green-600">
                                    €{hoveredExpense.value?.toLocaleString()}
                                  </p>
                                  
                                  {/* Contextual information */}
                                  {hoveredExpense.type === 'savings' && (
                                    <p className="text-sm text-blue-600">
                                      {hoveredExpense.percentage}% din venit economisit
                                    </p>
                                  )}
                                  
                                  {hoveredExpense.type === 'category' && (
                                    <div className="space-y-1">
                                      <p className="text-sm">Target: €{hoveredExpense.target}</p>
                                      <p className={`text-sm font-medium ${hoveredExpense.isOverTarget ? 'text-red-600' : 'text-green-600'}`}>
                                        {hoveredExpense.isOverTarget ? '⚠️ Peste target' : '✅ Sub target'}
                                      </p>
                                    </div>
                                  )}
                                  
                                  {hoveredExpense.breakdown && (
                                    <div className="mt-3 pt-3 border-t">
                                      <p className="text-sm font-medium mb-2">Breakdown categorii:</p>
                                      <div className="space-y-1 max-h-32 overflow-y-auto">
                                        {Object.entries(hoveredExpense.breakdown).map(([cat, val]) => (
                                          <div key={cat} className="flex justify-between text-xs">
                                            <span>{cat}:</span>
                                            <span className="font-medium">€{String(val)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <p className="text-xs text-gray-500 mt-2">
                                    💡 Click pe lună pentru selecție, click pe categorii pentru drill-down
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Interactive Legend */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t">
                              {filterEnabled.income && (
                                <Badge 
                                  className="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors"
                                  onClick={() => toggleFilter('income')}
                                >
                                  💰 Venituri
                                </Badge>
                              )}
                              {filterEnabled.expenses && (
                                <Badge 
                                  className="bg-red-400 text-white cursor-pointer hover:bg-red-500 transition-colors"
                                  onClick={() => toggleFilter('expenses')}
                                >
                                  💸 Cheltuieli
                                </Badge>
                              )}
                              {filterEnabled.savings && (
                                <Badge 
                                  className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors"
                                  onClick={() => toggleFilter('savings')}
                                >
                                  💎 Economii
                                </Badge>
                              )}
                              <span className="text-sm text-gray-600 ml-2 flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                Toate elementele sunt interactive - hover, click, filtrează!
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Insights Panel */}
                  <div className="space-y-4">
                    {/* Smart Insights */}
                    <Card className="border-amber-200 dark:border-amber-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-amber-700 dark:text-amber-300 text-lg flex items-center gap-2">
                          🤖 AI Insights Live
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowInsights(!showInsights);
                              triggerAnimation();
                            }}
                            className="ml-auto h-6"
                          >
                            {showInsights ? <Eye className="w-3 h-3" /> : <Eye className="w-3 h-3 opacity-50" />}
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                        {showInsights && getSmartInsights().map((insight, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg border transition-all duration-500 hover:shadow-md cursor-pointer ${
                              insight.type === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-950/20' :
                              insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20' :
                              'bg-red-50 border-red-200 dark:bg-red-950/20'
                            }`}
                            style={{ 
                              opacity: animationStep > (index * 25) ? 1 : 0.3,
                              transform: `translateY(${animationStep > (index * 25) ? 0 : 10}px)`
                            }}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-lg">{insight.icon}</span>
                              <div className="flex-1">
                                <div className={`font-medium text-sm mb-1 ${
                                  insight.type === 'success' ? 'text-green-700 dark:text-green-300' :
                                  insight.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                                  'text-red-700 dark:text-red-300'
                                }`}>
                                  {insight.title}
                                </div>
                                <p className={`text-xs ${
                                  insight.type === 'success' ? 'text-green-600 dark:text-green-400' :
                                  insight.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                  'text-red-600 dark:text-red-400'
                                }`}>
                                  {insight.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Static insights for comparison */}
                        <div className="pt-3 mt-4 border-t border-amber-200">
                          <h6 className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-2">📊 Pattern Analysis:</h6>
                          {financeData.hiddenInsights.slice(0, 3).map((insight, index) => (
                            <div key={index} className="p-2 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-100 mb-2 last:mb-0">
                              <p className="text-xs text-amber-700 dark:text-amber-300">
                                {insight}
                              </p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-2 mt-4 border-t border-amber-200">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            💡 <strong>Interactive Magic:</strong> Insights se actualizează în timp real based pe filtrele și perioada selectată
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-blue-700 dark:text-blue-300 text-lg">
                          ⚡ Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            setSelectedTimeframe('6months');
                            setChartView('overview');
                            triggerAnimation();
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Vezi 6 Luni
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            // Find highest expense category
                            const lastMonthExpenses = Object.entries(financeData.expenses).map(([cat, values]) => [cat, values[values.length - 1]]);
                            const highest = lastMonthExpenses.reduce((max, current) => current[1] > max[1] ? current : max);
                            handleCategoryClick(highest[0]);
                          }}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Analiza categoria top
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            setFilterEnabled({ income: false, expenses: true, savings: false });
                            triggerAnimation();
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Focus doar cheltuieli
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            setFilterEnabled({ income: true, expenses: true, savings: true });
                            setSelectedTimeframe('6months');
                            setChartView('overview');
                            setDrillDownCategory(null);
                            setSelectedMonth(null);
                            triggerAnimation();
                          }}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset complet
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Health Demo */}
              <TabsContent value="health" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader>
                        <CardTitle className="text-blue-700 dark:text-blue-300">
                          🏥 Health & Wellness Interactive Tracker
                        </CardTitle>
                        <CardDescription>
                          Hover pentru corelații, click pe zile pentru deep-dive
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-lg border">
                          <div className="space-y-4">
                            <h4 className="font-semibold mb-4">Corelații Somn → Energie → Activitate (14 zile)</h4>
                            
                            {/* Simulated Health Heatmap/Timeline */}
                            <div className="grid grid-cols-7 gap-2 mb-6">
                              {healthData.days.slice(0, 14).map((day, index) => {
                                const sleepHours = healthData.sleep[index];
                                const correlation = getHealthCorrelation(sleepHours);
                                
                                return (
                                  <div
                                    key={day}
                                    className="p-2 border rounded-lg cursor-pointer hover:shadow-md transition-all"
                                    style={{
                                      backgroundColor: sleepHours >= 8 ? '#dcfce7' : sleepHours >= 7 ? '#fef3c7' : '#fee2e2'
                                    }}
                                    onClick={() => setSelectedHealthDay({ day, index, ...correlation })}
                                  >
                                    <div className="text-center">
                                      <div className="text-xs font-medium">{day}</div>
                                      <div className="flex items-center justify-center gap-1 mt-1">
                                        <Moon className="w-3 h-3" />
                                        <span className="text-xs">{sleepHours}h</span>
                                      </div>
                                      <div className="flex items-center justify-center gap-1">
                                        <Footprints className="w-3 h-3" />
                                        <span className="text-xs">{(healthData.steps[index] / 1000).toFixed(0)}k</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Selected Day Details */}
                            {selectedHealthDay && (
                              <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                                <h5 className="font-semibold mb-2">📊 {selectedHealthDay.day} - Analiză Detaliată</h5>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm"><Moon className="w-4 h-4 inline mr-1" />Somn: {healthData.sleep[selectedHealthDay.index]}h</p>
                                    <p className="text-sm"><Footprints className="w-4 h-4 inline mr-1" />Pași: {healthData.steps[selectedHealthDay.index].toLocaleString()}</p>
                                    <p className="text-sm"><Droplets className="w-4 h-4 inline mr-1" />Apă: {healthData.water[selectedHealthDay.index]}L</p>
                                  </div>
                                  <div>
                                    <p className={`text-sm ${selectedHealthDay.color}`}>
                                      <Brain className="w-4 h-4 inline mr-1" />Energie: {selectedHealthDay.energy}
                                    </p>
                                    <p className={`text-sm ${selectedHealthDay.color}`}>
                                      <Heart className="w-4 h-4 inline mr-1" />Mood: {selectedHealthDay.mood}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-2 italic">
                                  💡 Click pe alte zile pentru comparație
                                </p>
                              </div>
                            )}

                            {/* Interactive Legend */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-200 rounded"></div>
                                <span className="text-xs">8+ ore somn</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                                <span className="text-xs">7-8 ore somn</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-200 rounded"></div>
                                <span className="text-xs">&lt;7 ore somn</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="border-cyan-200 dark:border-cyan-800">
                      <CardHeader>
                        <CardTitle className="text-cyan-700 dark:text-cyan-300 text-lg">
                          🔬 Corelații Descoperite
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {healthData.correlations.map((correlation, index) => (
                          <div key={index} className="p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200">
                            <div className="flex items-start gap-2">
                              <Activity className="w-4 h-4 text-cyan-600 mt-0.5" />
                              <p className="text-sm text-cyan-700 dark:text-cyan-300">
                                {correlation}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-2 mt-4 border-t border-cyan-200">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            📊 <strong>Pattern recognition:</strong> Interactive exploration revelează corelații ascunse în rutina ta
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Projects Demo */}
              <TabsContent value="projects" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardHeader>
                        <CardTitle className="text-purple-700 dark:text-purple-300">
                          🎯 Personal Projects Progress Tracker
                        </CardTitle>
                        <CardDescription>
                          Timeline interactiv pentru hobby-uri și învățare continuă
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 p-6 rounded-lg border">
                          <div className="space-y-4">
                            <h4 className="font-semibold mb-4">Progress Timeline - 8 Săptămâni</h4>
                            
                            {/* Simulated Multi-line Chart */}
                            <div className="relative h-48 border-l border-b border-gray-300">
                              {/* Y-axis labels */}
                              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 -ml-8">
                                <span>30h</span>
                                <span>20h</span>
                                <span>10h</span>
                                <span>0h</span>
                              </div>
                              
                              {/* Chart area */}
                              <div className="h-full w-full relative">
                                {projectData.weeks.map((week, index) => (
                                  <div
                                    key={week}
                                    className="absolute bottom-0 flex flex-col items-center cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded p-2 transition-colors"
                                    style={{ left: `${(index / (projectData.weeks.length - 1)) * 90}%` }}
                                  >
                                    {/* Data points */}
                                    <div className="relative h-44 flex flex-col justify-end">
                                      <div
                                        className="w-2 bg-blue-500 rounded-t mb-1"
                                        style={{ height: `${(projectData.coding[index] / 30) * 100}%` }}
                                        title={`Coding: ${projectData.coding[index]}h`}
                                      />
                                      <div
                                        className="w-2 bg-green-500 rounded-t mb-1"
                                        style={{ height: `${(projectData.learning[index] / 30) * 100}%` }}
                                        title={`Learning: ${projectData.learning[index]}h`}
                                      />
                                      <div
                                        className="w-2 bg-orange-500 rounded-t mb-1"
                                        style={{ height: `${(projectData.exercise[index] / 30) * 100}%` }}
                                        title={`Exercise: ${projectData.exercise[index]}h`}
                                      />
                                      <div
                                        className="w-2 bg-purple-500 rounded-t"
                                        style={{ height: `${(projectData.writing[index] / 30) * 100}%` }}
                                        title={`Writing: ${projectData.writing[index]}h`}
                                      />
                                    </div>
                                    <span className="text-xs mt-1">{week}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Interactive Legend */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t">
                              <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 rounded">
                                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                <span className="text-sm">💻 Coding</span>
                              </div>
                              <div className="flex items-center gap-2 cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded">
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                                <span className="text-sm">📚 Learning</span>
                              </div>
                              <div className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 p-1 rounded">
                                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                                <span className="text-sm">🏃 Exercise</span>
                              </div>
                              <div className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 p-1 rounded">
                                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                <span className="text-sm">✍️ Writing</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="border-indigo-200 dark:border-indigo-800">
                      <CardHeader>
                        <CardTitle className="text-indigo-700 dark:text-indigo-300 text-lg">
                          📈 Growth Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {projectData.insights.map((insight, index) => (
                          <div key={index} className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200">
                            <div className="flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-indigo-600 mt-0.5" />
                              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                                {insight}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-2 mt-4 border-t border-indigo-200">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            🎯 <strong>Consistency tracking:</strong> Vizualizarea progress-ului motivează continuarea proiectelor
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Real-World Projects Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              Construiește-ți Propriile Instrumente Interactive
            </CardTitle>
            <CardDescription>
              3 proiecte practice care îți vor transforma viața prin vizualizare interactivă
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldProjects.map((project, index) => (
                <Card key={index} className={`border-${project.color}-200 dark:border-${project.color}-800 hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className={`text-${project.color}-700 dark:text-${project.color}-300 text-lg`}>
                      {project.title}
                    </CardTitle>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">🛠️ Features Interactive:</h5>
                      <ul className="text-sm space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`p-3 bg-${project.color}-50 dark:bg-${project.color}-950/20 rounded-lg border border-${project.color}-200`}>
                      <p className={`text-sm text-${project.color}-700 dark:text-${project.color}-300 font-medium`}>
                        💡 Impact: {project.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Implementation Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-gray-600" />
              Implementare Plotly - De la Static la Interactive
            </CardTitle>
            <CardDescription>
              Cod real pentru transformarea visualizărilor tale în experiențe interactive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Setup</TabsTrigger>
                <TabsTrigger value="finance">Finance Dashboard</TabsTrigger>
                <TabsTrigger value="health">Health Tracker</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <CodeBlockR language="python">{`# 🚀 Primul tău grafic Plotly interactiv
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

# Data realistă pentru finante personale
df = pd.DataFrame({
    'Luna': ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun'],
    'Venituri': [850, 650, 900, 1200, 750, 950],  # Freelance + venit variabil
    'Cheltuieli': [820, 590, 875, 1030, 720, 870]  # Spending urmat de income patterns
})

# Grafic interactiv cu hover tooltips
fig = px.bar(df, x='Luna', y=['Venituri', 'Cheltuieli'],
             title='💰 Finanțele Tale Interactive',
             hover_data={'value': ':,.0f€'},  # Format custom pentru hover
             color_discrete_map={'Venituri': '#10B981', 'Cheltuieli': '#EF4444'})

# Configurări pentru interactivitate maximă
fig.update_layout(
    hovermode='x unified',  # Hover pe întreaga coloană
    xaxis_title="Luna",
    yaxis_title="Suma (€)",
    legend_title="Categorie"
)

# Adaugă annotations pentru insight-uri
fig.add_annotation(
    x="Mar", y=3100,
    text="📈 Luna cu cele mai mari cheltuieli!",
    showarrow=True,
    arrowhead=2,
    arrowcolor="red"
)

# Show cu toate feature-urile interactive
fig.show()

# 💡 MAGIA: Fiecare element devine interactiv automat!
# - Hover pentru detalii
# - Click pe legend pentru hide/show
# - Zoom cu scroll wheel
# - Pan cu drag
# - Download ca PNG/HTML`}</CodeBlockR>
                </div>
              </TabsContent>

              <TabsContent value="finance">
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <CodeBlockR language="python">{`# 💰 Dashboard Finanțe Complet cu Plotly
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np

# Data reală de tracking financiar
expense_data = {
    'Locuinta': [1200, 1200, 1250, 1250, 1250, 1300],
    'Mancare': [680, 750, 820, 650, 900, 780],
    'Transport': [200, 150, 300, 180, 250, 220],
    'Entertainment': [300, 450, 500, 320, 600, 420],
    'Sanatate': [120, 80, 150, 200, 100, 180]
}

months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun']

# Subplot-uri pentru dashboard complet
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=('📊 Trend Cheltuieli', '🥧 Breakdown Categorii', 
                   '📈 Comparație cu Buget', '⚠️ Alertă Categorii'),
    specs=[[{"type": "scatter"}, {"type": "pie"}],
           [{"type": "bar"}, {"type": "scatter"}]]
)

# 1. Trend line interactiv pentru fiecare categorie
for category, values in expense_data.items():
    fig.add_trace(
        go.Scatter(x=months, y=values, name=category,
                  mode='lines+markers',
                  line=dict(width=3),
                  hovertemplate='%{fullData.name}<br>%{y}€<br><extra></extra>'),
        row=1, col=1
    )

# 2. Pie chart interactiv pentru ultima lună
last_month_total = {cat: vals[-1] for cat, vals in expense_data.items()}
fig.add_trace(
    go.Pie(values=list(last_month_total.values()),
           labels=list(last_month_total.keys()),
           name="Breakdown Iun",
           hovertemplate='%{label}<br>€%{value}<br>%{percent}<extra></extra>'),
    row=1, col=2
)

# 3. Comparație cu bugetul planificat
budget = {'Locuinta': 1300, 'Mancare': 700, 'Transport': 200, 
          'Entertainment': 400, 'Sanatate': 150}

categories = list(budget.keys())
actual = [expense_data[cat][-1] for cat in categories]
planned = list(budget.values())

fig.add_trace(go.Bar(x=categories, y=planned, name='Buget Planificat',
                    marker_color='lightblue'), row=2, col=1)
fig.add_trace(go.Bar(x=categories, y=actual, name='Cheltuit Real',
                    marker_color='darkred'), row=2, col=1)

# 4. Alertă pentru categoriile cu creștere > 20%
growth_rates = []
alert_categories = []
for cat in categories:
    if len(expense_data[cat]) >= 2:
        growth = ((expense_data[cat][-1] - expense_data[cat][-2]) / expense_data[cat][-2]) * 100
        growth_rates.append(growth)
        if growth > 20:
            alert_categories.append(cat)

fig.add_trace(
    go.Scatter(x=categories, y=growth_rates, 
              mode='markers+text',
              marker=dict(size=15, color=['red' if cat in alert_categories else 'green' 
                                        for cat in categories]),
              text=[f'{rate:.1f}%' for rate in growth_rates],
              textposition="top center",
              name='Creștere %'),
    row=2, col=2
)

# Layout pentru dashboard profesional
fig.update_layout(
    title_text="💰 Personal Finance Intelligence Dashboard",
    title_x=0.5,
    height=800,
    showlegend=True,
    hovermode='closest'
)

# Configurări specifice pentru fiecare subplot
fig.update_xaxes(title_text="Luna", row=2, col=1)
fig.update_yaxes(title_text="Suma (€)", row=2, col=1)
fig.update_xaxes(title_text="Categorie", row=2, col=2)
fig.update_yaxes(title_text="Creștere (%)", row=2, col=2)

fig.show()

# 🎯 REZULTAT: Dashboard complet interactiv care revelează:
# - Trend-uri pentru fiecare categorie de cheltuieli
# - Breakdown vizual pentru luna curentă
# - Comparație cu bugetul planificat
# - Alertă automată pentru categoriile problematice
# 
# 💡 BONUS: Salvează ca HTML pentru acces permanent
fig.write_html("finance_dashboard.html")`}</CodeBlockR>
                </div>
              </TabsContent>

              <TabsContent value="health">
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <CodeBlockR language="python">{`# 🏥 Health & Wellness Interactive Tracker
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Generarea de date realiste pentru 2 săptămâni
dates = [datetime.now() - timedelta(days=13-i) for i in range(14)]
date_strings = [d.strftime('%d/%m') for d in dates]

# Data de health tracking
health_metrics = {
    'sleep_hours': [7.5, 6.8, 7.2, 8.0, 6.5, 7.8, 8.2, 7.1, 6.9, 7.6, 8.1, 7.4, 6.7, 7.9],
    'steps': [8500, 7200, 9100, 10200, 6800, 9500, 11200, 8800, 7600, 9800, 10500, 8900, 7400, 9200],
    'water_liters': [2.1, 1.8, 2.5, 2.8, 1.5, 2.3, 3.0, 2.2, 1.9, 2.6, 2.9, 2.4, 1.7, 2.5],
    'mood_score': [8, 6, 7, 9, 5, 8, 9, 7, 6, 8, 9, 8, 6, 8],
    'energy_level': [7, 5, 6, 9, 4, 8, 9, 6, 5, 8, 9, 7, 5, 7]
}

# Creare dashboard cu 3 secțiuni
fig = make_subplots(
    rows=3, cols=2,
    subplot_titles=('🌙 Sleep Quality Heatmap', '👥 Correlations Matrix',
                   '🚶 Daily Activity Timeline', '💧 Hydration vs Energy',
                   '😊 Mood & Sleep Connection', '📊 Weekly Summary'),
    specs=[[{"type": "scatter"}, {"type": "scatter"}],
           [{"colspan": 2}, None],
           [{"type": "scatter"}, {"type": "bar"}]],
    vertical_spacing=0.08,
    horizontal_spacing=0.1
)

# 1. Sleep Quality Heatmap (simulat ca scatter cu culori)
sleep_colors = ['red' if h < 7 else 'yellow' if h < 8 else 'green' 
               for h in health_metrics['sleep_hours']]

fig.add_trace(
    go.Scatter(x=date_strings, y=['Sleep Quality']*14,
              mode='markers',
              marker=dict(size=25, color=health_metrics['sleep_hours'],
                         colorscale='RdYlGn', cmin=6, cmax=9,
                         colorbar=dict(title="Ore Somn")),
              text=[f'{h}h' for h in health_metrics['sleep_hours']],
              textposition="middle center",
              hovertemplate='Data: %{x}<br>Somn: %{text}<br><extra></extra>',
              name='Sleep Quality'),
    row=1, col=1
)

# 2. Correlation Matrix (sleep vs energy)
fig.add_trace(
    go.Scatter(x=health_metrics['sleep_hours'], y=health_metrics['energy_level'],
              mode='markers+text',
              marker=dict(size=12, color='blue', opacity=0.6),
              text=date_strings,
              textposition="top center",
              hovertemplate='Somn: %{x}h<br>Energie: %{y}/10<br>Data: %{text}<extra></extra>',
              name='Sleep vs Energy'),
    row=1, col=2
)

# Linie de trend pentru corelație
z = np.polyfit(health_metrics['sleep_hours'], health_metrics['energy_level'], 1)
p = np.poly1d(z)
fig.add_trace(
    go.Scatter(x=health_metrics['sleep_hours'], 
              y=p(health_metrics['sleep_hours']),
              mode='lines',
              line=dict(color='red', dash='dash'),
              name='Trend Line',
              hoverinfo='skip'),
    row=1, col=2
)

# 3. Daily Activity Timeline (full width)
fig.add_trace(
    go.Scatter(x=date_strings, y=health_metrics['steps'],
              mode='lines+markers',
              line=dict(color='purple', width=3),
              marker=dict(size=8),
              name='Steps Daily',
              hovertemplate='Data: %{x}<br>Pași: %{y:,}<br><extra></extra>'),
    row=2, col=1
)

# Target line pentru pași
fig.add_trace(
    go.Scatter(x=date_strings, y=[10000]*14,
              mode='lines',
              line=dict(color='green', dash='dash'),
              name='Target: 10k steps',
              hoverinfo='skip'),
    row=2, col=1
)

# 4. Hydration vs Energy scatter
fig.add_trace(
    go.Scatter(x=health_metrics['water_liters'], y=health_metrics['energy_level'],
              mode='markers',
              marker=dict(size=15, color=health_metrics['mood_score'],
                         colorscale='Blues', cmin=5, cmax=9),
              text=date_strings,
              hovertemplate='Apă: %{x}L<br>Energie: %{y}/10<br>Mood: %{marker.color}/10<br>Data: %{text}<extra></extra>',
              name='Water vs Energy'),
    row=3, col=1
)

# 5. Weekly Summary Bar Chart
weeks = ['Săpt 1', 'Săpt 2']
week1_avg = {
    'Sleep': np.mean(health_metrics['sleep_hours'][:7]),
    'Steps': np.mean(health_metrics['steps'][:7]) / 1000,  # în mii
    'Water': np.mean(health_metrics['water_liters'][:7]),
    'Mood': np.mean(health_metrics['mood_score'][:7])
}
week2_avg = {
    'Sleep': np.mean(health_metrics['sleep_hours'][7:]),
    'Steps': np.mean(health_metrics['steps'][7:]) / 1000,
    'Water': np.mean(health_metrics['water_liters'][7:]),
    'Mood': np.mean(health_metrics['mood_score'][7:])
}

metrics = list(week1_avg.keys())
fig.add_trace(go.Bar(x=metrics, y=list(week1_avg.values()),
                    name='Săptămâna 1', marker_color='lightblue'), row=3, col=2)
fig.add_trace(go.Bar(x=metrics, y=list(week2_avg.values()),
                    name='Săptămâna 2', marker_color='darkblue'), row=3, col=2)

# Layout pentru dashboard profesional
fig.update_layout(
    title_text="🏥 Personal Health Intelligence Dashboard",
    title_x=0.5,
    height=1000,
    showlegend=True,
    hovermode='closest'
)

# Update axes pentru claritate
fig.update_yaxes(title_text="Pași", row=2, col=1)
fig.update_xaxes(title_text="Data", row=2, col=1)
fig.update_xaxes(title_text="Ore Somn", row=1, col=2)
fig.update_yaxes(title_text="Nivel Energie", row=1, col=2)
fig.update_xaxes(title_text="Apă (L)", row=3, col=1)
fig.update_yaxes(title_text="Energie", row=3, col=1)

fig.show()

# 🎯 REZULTAT: Dashboard de sănătate complet care revelează:
# - Pattern-uri de somn cu vizualizare tip heatmap
# - Corelații clare între somn și energie
# - Timeline activitate zilnică vs. target-uri
# - Relația dintre hidratare și starea de spirit
# - Comparații săptămânale pentru progress tracking
#
# 💡 INSIGHT MAGIC: Interactivitatea revelează corelații ascunse!
# Hover pe orice punct pentru context complet

# 🔬 BONUS: Calculează corelația automată
correlation_sleep_energy = np.corrcoef(health_metrics['sleep_hours'], 
                                      health_metrics['energy_level'])[0,1]
print(f"🔍 Corelația Somn-Energie: {correlation_sleep_energy:.3f}")
print("💡 Insight: Somn de calitate = Energie ridicată!")

# Salvează dashboard-ul pentru tracking continuu
fig.write_html("health_dashboard.html")
print("✅ Dashboard salvat ca 'health_dashboard.html'")`}</CodeBlockR>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Notebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final Section */}
        <Card className="border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                🎓 Session 22 Completată cu Succes!
              </h3>
              
              <p className="text-lg text-emerald-700 dark:text-emerald-300 max-w-2xl mx-auto">
                Acum știi să transformi datele statice în experiențe interactive care revelează insight-uri ascunse. 
                Ai învățat nu doar să folosești Plotly, ci să <strong>construiești instrumente de auto-analiză</strong> 
                care îți vor îmbunătăți efectiv viața.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                    💰 Finanțe Optimizate
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dashboard-uri care revelează €200-400/lună în economii
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                    🏥 Sănătate Îmbunătățită
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Corelații care îți cresc energia cu 20%
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                    🎯 Progres Accelerat
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    340% creștere în consistența proiectelor
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  🚀 <strong>Următoarea aventură:</strong> Cu aceste fundamente interactive, 
                  ești gata să construiești aplicații Streamlit complete care vor transforma 
                  analiza ta într-o experiență web profesională!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/data-visualizing')}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Data Visualizing
          </Button>
          
          <Button
            onClick={() => navigate('/artifacts/streamlit-dashboards')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center gap-2"
          >
            Next: Streamlit Dashboards
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlotlyInteractiveArtifact;
