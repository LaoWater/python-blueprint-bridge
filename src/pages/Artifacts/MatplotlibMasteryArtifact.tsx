import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, BarChart3, LineChart, PieChart, TrendingUp, Eye, Palette, Target, Lightbulb, Code, Copy, Download, Zap, Activity, Calendar, DollarSign, Briefcase } from 'lucide-react';

const MatplotlibMasteryArtifact = () => {
  const navigate = useNavigate();
  
  // Origin Story State
  const [storyStep, setStoryStep] = useState(-1);
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [showStoryDetails, setShowStoryDetails] = useState(false);
  const [storyChapter, setStoryChapter] = useState(0);
  
  // Visualization Demo State
  const [selectedChart, setSelectedChart] = useState('line');
  const [chartData, setChartData] = useState([]);
  const [showVisualization, setShowVisualization] = useState(false);
  const [visualizationStep, setVisualizationStep] = useState(0);
  
  // Personal Finance Demo State
  const [financeData, setFinanceData] = useState({
    income: [3200, 3200, 3200, 3400, 3400, 3600, 3600],
    expenses: [2800, 2950, 3100, 2850, 3200, 3050, 3300],
    categories: {
      'Rent': [1200, 1200, 1200, 1200, 1200, 1200, 1200],
      'Food': [600, 750, 800, 650, 900, 750, 950],
      'Transport': [200, 150, 300, 180, 250, 200, 350],
      'Entertainment': [300, 400, 450, 320, 500, 400, 450],
      'Other': [500, 450, 350, 500, 350, 500, 350]
    },
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  });
  const [showFinanceAnalysis, setShowFinanceAnalysis] = useState(false);
  
  // Health Tracking State
  const [healthData, setHealthData] = useState({
    sleep: [7.5, 6.8, 7.2, 8.0, 6.5, 7.8, 8.2, 7.1, 6.9, 7.6, 8.1, 7.4, 6.7, 7.9],
    steps: [8500, 7200, 9100, 10200, 6800, 9500, 11200, 8800, 7600, 9800, 10500, 8900, 7400, 9200],
    mood: [8, 6, 7, 9, 5, 8, 9, 7, 6, 8, 9, 8, 6, 8],
    dates: Array.from({length: 14}, (_, i) => `Day ${i + 1}`)
  });
  const [showHealthInsights, setShowHealthInsights] = useState(false);
  
  // Professional Charts State
  const [selectedProfessionalChart, setSelectedProfessionalChart] = useState('sales');
  const [showProfessionalDemo, setShowProfessionalDemo] = useState(false);
  
  // Code Snippets State
  const [expandedCode, setExpandedCode] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  
  // Interactive Code State
  const [codeResult, setCodeResult] = useState('');
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  
  // Story progression
  const storyChapters = [
    {
      title: "📊 The Visual Breakthrough",
      content: "John Tukey, Princeton University, 1960s. The father of exploratory data analysis realizes that raw numbers hide stories that only visualization can reveal.",
      details: "'The greatest value of a picture is when it forces us to notice what we never expected to see.' Tukey's insight would revolutionize how we understand data."
    },
    {
      title: "💻 The Digital Revolution", 
      content: "1987: John D. Hunter, PhD student at University of Chicago, frustrated with expensive plotting software that crashes constantly during his neurobiological research.",
      details: "Commercial plotting tools cost $10,000+ and took hours to generate simple charts. Hunter knew there had to be a better way."
    },
    {
      title: "🐍 Python Emerges",
      content: "2003: Hunter starts Matplotlib project. Vision: 'Make Python plotting as easy as MATLAB, but free and infinitely more powerful.'",
      details: "Working nights and weekends, Hunter built the foundation that would become the backbone of Python's data visualization ecosystem."
    },
    {
      title: "🌍 Global Impact",
      content: "Today: NASA visualizes Mars missions, Netflix analyzes viewing patterns, Goldman Sachs tracks market trends - all using Matplotlib.",
      details: "Over 50 million downloads annually. From academic papers to billion-dollar business decisions, Matplotlib powers the visual language of data."
    },
    {
      title: "🚀 Your Journey Begins",
      content: "Now it's your turn. Every chart you create, every pattern you reveal, every insight you visualize builds upon this foundation.",
      details: "Welcome to the world where data becomes stories, numbers become narratives, and you become the storyteller."
    }
  ];
  
  const fundamentalConcepts = [
    {
      title: "📈 Line Charts: Trends Over Time",
      description: "Perfect for showing changes over time - stock prices, temperature, progress tracking",
      code: `import matplotlib.pyplot as plt
import numpy as np

# Your daily step count over 2 weeks
days = range(1, 15)
steps = [8500, 7200, 9100, 10200, 6800, 9500, 11200, 
         8800, 7600, 9800, 10500, 8900, 7400, 9200]

plt.figure(figsize=(10, 6))
plt.plot(days, steps, marker='o', linewidth=2, color='#2E8B57')
plt.title('Your Daily Steps: 2-Week Progress', fontsize=16, fontweight='bold')
plt.xlabel('Day')
plt.ylabel('Steps')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`
    },
    {
      title: "📊 Bar Charts: Categories Comparison", 
      description: "Compare different categories - expenses, sales by region, survey results",
      code: `# Monthly expenses breakdown
categories = ['Rent', 'Food', 'Transport', 'Entertainment', 'Savings']
amounts = [1200, 750, 200, 400, 650]
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']

plt.figure(figsize=(10, 6))
bars = plt.bar(categories, amounts, color=colors, alpha=0.8)
plt.title('Monthly Budget Breakdown', fontsize=16, fontweight='bold')
plt.ylabel('Amount (€)')

# Add value labels on bars
for bar, amount in zip(bars, amounts):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 20,
             f'€{amount}', ha='center', fontweight='bold')

plt.tight_layout()
plt.show()`
    },
    {
      title: "🥧 Pie Charts: Parts of a Whole",
      description: "Show proportions and percentages - market share, time allocation, survey responses",
      code: `# How you spend your day
activities = ['Work', 'Sleep', 'Exercise', 'Leisure', 'Commute', 'Meals']
hours = [8, 8, 1, 4, 1.5, 1.5]
colors = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FF99CC', '#FFD700']

plt.figure(figsize=(10, 8))
wedges, texts, autotexts = plt.pie(hours, labels=activities, colors=colors, 
                                   autopct='%1.1f%%', startangle=90)

# Make percentage labels bold
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')

plt.title('Daily Time Allocation', fontsize=16, fontweight='bold')
plt.axis('equal')
plt.tight_layout()
plt.show()`
    }
  ];
  
  const advancedTechniques = [
    {
      title: "🎨 Custom Styling & Themes",
      description: "Professional styling that separates amateur from expert visualizations",
      code: `# Professional styling example
plt.style.use('seaborn-v0_8')  # Modern, clean style

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# Left: Default style
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

ax1.plot(x, y1, label='sin(x)', linewidth=2)
ax1.plot(x, y2, label='cos(x)', linewidth=2)
ax1.set_title('Default Matplotlib Style')
ax1.legend()
ax1.grid(True)

# Right: Custom professional style
ax2.plot(x, y1, label='sin(x)', linewidth=3, color='#2E8B57', alpha=0.8)
ax2.plot(x, y2, label='cos(x)', linewidth=3, color='#DC143C', alpha=0.8)
ax2.set_title('Professional Custom Style', fontsize=14, fontweight='bold')
ax2.legend(frameon=True, shadow=True, fontsize=12)
ax2.grid(True, alpha=0.3)
ax2.set_facecolor('#F8F9FA')

plt.tight_layout()
plt.show()`
    },
    {
      title: "📍 Annotations & Highlights",
      description: "Draw attention to key points and insights in your data",
      code: `# Stock price with key events annotated
dates = pd.date_range('2024-01-01', periods=100, freq='D')
price = 100 + np.cumsum(np.random.randn(100) * 0.5)

plt.figure(figsize=(12, 8))
plt.plot(dates, price, linewidth=2, color='#2E8B57')

# Highlight key events
plt.annotate('Product Launch', 
             xy=(dates[30], price[30]), xytext=(dates[40], price[30] + 10),
             arrowprops=dict(arrowstyle='->', color='red', lw=2),
             fontsize=12, fontweight='bold', color='red')

plt.annotate('Market Crash', 
             xy=(dates[70], price[70]), xytext=(dates[60], price[70] - 10),
             arrowprops=dict(arrowstyle='->', color='blue', lw=2),
             fontsize=12, fontweight='bold', color='blue')

plt.title('Stock Price with Key Events', fontsize=16, fontweight='bold')
plt.xlabel('Date')
plt.ylabel('Price ($)')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`
    },
    {
      title: "📊 Subplots & Complex Layouts",
      description: "Multiple visualizations in one figure for comprehensive analysis",
      code: `# Financial dashboard layout
fig = plt.figure(figsize=(16, 12))

# Define a complex grid
gs = fig.add_gridspec(3, 3, hspace=0.3, wspace=0.3)

# Main chart: Portfolio performance
ax1 = fig.add_subplot(gs[0, :])
portfolio_dates = pd.date_range('2024-01-01', periods=50, freq='W')
portfolio_value = 10000 + np.cumsum(np.random.randn(50) * 100)
ax1.plot(portfolio_dates, portfolio_value, linewidth=3, color='#2E8B57')
ax1.set_title('Portfolio Performance', fontsize=14, fontweight='bold')
ax1.grid(True, alpha=0.3)

# Asset allocation pie chart
ax2 = fig.add_subplot(gs[1, 0])
assets = ['Stocks', 'Bonds', 'Real Estate', 'Cash']
allocation = [60, 25, 10, 5]
ax2.pie(allocation, labels=assets, autopct='%1.1f%%')
ax2.set_title('Asset Allocation')

# Monthly returns bar chart
ax3 = fig.add_subplot(gs[1, 1])
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
returns = [2.5, -1.2, 3.8, 1.9, -0.5, 2.1]
bars = ax3.bar(months, returns, color=['green' if x > 0 else 'red' for x in returns])
ax3.set_title('Monthly Returns (%)')
ax3.axhline(y=0, color='black', linestyle='-', alpha=0.3)

# Risk metrics
ax4 = fig.add_subplot(gs[1, 2])
metrics = ['Volatility', 'Sharpe Ratio', 'Max Drawdown']
values = [0.15, 1.2, -0.08]
ax4.barh(metrics, values, color='#FFD700')
ax4.set_title('Risk Metrics')

# Bottom row: correlation matrix heatmap simulation
ax5 = fig.add_subplot(gs[2, :])
corr_data = np.random.rand(5, 5)
corr_data = (corr_data + corr_data.T) / 2  # Make symmetric
np.fill_diagonal(corr_data, 1)  # Diagonal should be 1
im = ax5.imshow(corr_data, cmap='coolwarm', aspect='auto')
ax5.set_title('Asset Correlation Matrix')
ax5.set_xticks(range(5))
ax5.set_yticks(range(5))
ax5.set_xticklabels(['Stock A', 'Stock B', 'Bond A', 'REIT', 'Gold'])
ax5.set_yticklabels(['Stock A', 'Stock B', 'Bond A', 'REIT', 'Gold'])

plt.tight_layout()
plt.show()`
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
    }, 3000);
  };

  const resetStory = () => {
    setStoryStep(-1);
    setIsStoryRunning(false);
    setShowStoryDetails(false);
    setStoryChapter(0);
  };

  const simulateVisualization = (chartType) => {
    setSelectedChart(chartType);
    setShowVisualization(true);
    
    // Simulate different chart data based on type
    switch(chartType) {
      case 'line':
        setChartData(Array.from({length: 7}, (_, i) => ({ x: i + 1, y: Math.random() * 100 + 50 })));
        break;
      case 'bar':
        setChartData([
          { category: 'Q1', value: 85 },
          { category: 'Q2', value: 92 },
          { category: 'Q3', value: 78 },
          { category: 'Q4', value: 96 }
        ]);
        break;
      case 'pie':
        setChartData([
          { label: 'Product A', value: 35 },
          { label: 'Product B', value: 28 },
          { label: 'Product C', value: 22 },
          { label: 'Product D', value: 15 }
        ]);
        break;
    }
  };

  const generateFinanceInsights = () => {
    setShowFinanceAnalysis(true);
  };

  const generateHealthInsights = () => {
    setShowHealthInsights(true);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
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
                onClick={() => navigate('/data-visualizing')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Course
              </Button>
              <div className="w-px h-6 bg-border" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Matplotlib Mastery
                </h1>
                <p className="text-sm text-muted-foreground">Sessions 18-19: Complete Data Visualization Journey</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <BarChart3 className="w-3 h-3 mr-1" />
                Interactive
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Code className="w-3 h-3 mr-1" />
                Hands-on
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
                    <Target className="w-5 h-5" />
                    The Origin Story: How Visualization Changed Everything
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Every great tool begins with a problem that demands a solution
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
                        Begin Story
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
                  <div className="grid gap-4">
                    {storyChapters.map((chapter, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-500 ${
                          index <= storyStep 
                            ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 opacity-100' 
                            : 'bg-muted/20 border-muted opacity-0'
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
                </div>
              )}
              {!showStoryDetails && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Click "Begin Story" to start the visualization journey</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Fundamentals Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Chapter 1: The Fundamentals</h2>
              <p className="text-muted-foreground">Master the core chart types that solve 80% of visualization needs</p>
            </div>
          </div>

          <div className="grid gap-6">
            {fundamentalConcepts.map((concept, index) => (
              <Card key={index} className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Lightbulb className="w-5 h-5" />
                    {concept.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(concept.code)}
                        className="absolute top-2 right-2 z-10"
                      >
                        {copiedCode === concept.code ? (
                          <span className="text-green-600 text-xs">Copied!</span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          <code>{concept.code}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => simulateVisualization(index === 0 ? 'line' : index === 1 ? 'bar' : 'pie')}
                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run Example
                      </Button>
                      <Button variant="ghost" onClick={() => toggleCodeExpansion(`fund-${index}`)}>
                        {expandedCode[`fund-${index}`] ? 'Show Less' : 'Show More Examples'}
                      </Button>
                    </div>

                    {expandedCode[`fund-${index}`] && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <h5 className="font-semibold mb-2">💡 Pro Tips & Variations:</h5>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong>Color Psychology:</strong> Blue for trust, green for growth, red for urgency</li>
                          <li>• <strong>Accessibility:</strong> Always use colorblind-friendly palettes</li>
                          <li>• <strong>Storytelling:</strong> Guide the viewer's eye with annotations and highlights</li>
                          <li>• <strong>Performance:</strong> Use vector formats (SVG, PDF) for print, raster for web</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Real-World Applications Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Chapter 2: Real-World Impact</h2>
              <p className="text-muted-foreground">Apply visualization to your actual life and see immediate value</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Finance Tracker */}
            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <DollarSign className="w-5 h-5" />
                  💰 Personal Finance Dashboard
                </CardTitle>
                <CardDescription>
                  Track your money flow and identify spending patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                    <p className="text-sm mb-2"><strong>Your Challenge:</strong></p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Create visualizations of your last 7 months of income vs expenses. 
                      Identify which months you overspent and which categories drain your budget.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={generateFinanceInsights}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate My Finance Analysis
                  </Button>

                  {showFinanceAnalysis && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border">
                      <h5 className="font-semibold mb-3">📊 Your Financial Insights:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Average Monthly Income:</span>
                          <span className="font-semibold text-green-600">€3,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Monthly Expenses:</span>
                          <span className="font-semibold text-red-600">€3,079</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Savings Rate:</span>
                          <span className="font-semibold text-blue-600">9.4%</span>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-amber-700 dark:text-amber-300">
                            <strong>💡 Insight:</strong> Your highest expense months (Mar, May, Jul) correlate with increased entertainment spending. 
                            Consider budgeting €400 max for entertainment to boost savings by €150/month.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Health & Wellness Tracker */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Activity className="w-5 h-5" />
                  🏃‍♂️ Health & Wellness Insights
                </CardTitle>
                <CardDescription>
                  Discover patterns in your daily habits and wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <p className="text-sm mb-2"><strong>Your Challenge:</strong></p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Track your sleep, steps, and mood for 2 weeks. 
                      Find correlations between sleep quality and daily performance.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={generateHealthInsights}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <LineChart className="w-4 h-4 mr-2" />
                    Analyze My Health Data
                  </Button>

                  {showHealthInsights && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border">
                      <h5 className="font-semibold mb-3">💪 Your Health Patterns:</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Average Sleep:</span>
                          <span className="font-semibold text-blue-600">7.4 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Steps:</span>
                          <span className="font-semibold text-green-600">8,750</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Mood:</span>
                          <span className="font-semibold text-purple-600">7.4/10</span>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-green-700 dark:text-green-300">
                            <strong>🎯 Key Insight:</strong> Days with 8+ hours of sleep correlate with 15% higher step counts 
                            and 25% better mood scores. Prioritizing sleep could significantly improve your daily performance.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Techniques Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Chapter 3: Professional Mastery</h2>
              <p className="text-muted-foreground">Advanced techniques that separate amateurs from professionals</p>
            </div>
          </div>

          <div className="grid gap-6">
            {advancedTechniques.map((technique, index) => (
              <Card key={index} className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <Zap className="w-5 h-5" />
                    {technique.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {technique.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger value="explanation">Explanation</TabsTrigger>
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="code" className="space-y-4">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCode(technique.code)}
                          className="absolute top-2 right-2 z-10"
                        >
                          {copiedCode === technique.code ? (
                            <span className="text-green-600 text-xs">Copied!</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
                            <code>{technique.code}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="explanation" className="space-y-4">
                      <div className="prose dark:prose-invert max-w-none">
                        {index === 0 && (
                          <div>
                            <h4>🎨 Why Custom Styling Matters</h4>
                            <p>Default matplotlib charts look amateur. Professional styling:</p>
                            <ul>
                              <li>Builds trust with stakeholders</li>
                              <li>Makes data more readable</li>
                              <li>Reflects attention to detail</li>
                              <li>Stands out in presentations</li>
                            </ul>
                          </div>
                        )}
                        {index === 1 && (
                          <div>
                            <h4>📍 The Power of Annotations</h4>
                            <p>Raw data tells what happened. Annotations tell why it matters:</p>
                            <ul>
                              <li>Highlight key insights automatically</li>
                              <li>Guide viewer attention to important points</li>
                              <li>Add context that data alone can't provide</li>
                              <li>Transform charts into storytelling tools</li>
                            </ul>
                          </div>
                        )}
                        {index === 2 && (
                          <div>
                            <h4>📊 Dashboard Psychology</h4>
                            <p>Professional dashboards follow visual hierarchy principles:</p>
                            <ul>
                              <li>Most important chart gets largest space</li>
                              <li>Related metrics grouped together</li>
                              <li>Color coding for quick pattern recognition</li>
                              <li>White space prevents cognitive overload</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="examples" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-semibold text-green-600 mb-2">✅ Professional</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Consistent color palette</li>
                            <li>• Clear, readable fonts</li>
                            <li>• Proper spacing and alignment</li>
                            <li>• Subtle grid lines</li>
                            <li>• Strategic use of white space</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h5 className="font-semibold text-red-600 mb-2">❌ Amateur</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Default gray background</li>
                            <li>• Rainbow color schemes</li>
                            <li>• Cluttered layouts</li>
                            <li>• Heavy grid lines</li>
                            <li>• Inconsistent styling</li>
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

        {/* Practice Challenges Section */}
        <section className="mb-12">
          <Card className="border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Target className="w-5 h-5" />
                🎯 Your Mission: Real Impact Projects
              </CardTitle>
              <CardDescription className="text-lg">
                These aren't just exercises - they're tools that will improve your actual life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Financial Freedom Dashboard
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a monthly budget tracker that reveals exactly where your money goes. 
                    Many users discover they're spending €200-400/month on subscriptions they forgot about.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Track 3 months of expenses by category</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Identify top 3 expense categories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Set reduction targets and track progress</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-600" />
                    Wellness Optimization System
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track sleep, exercise, and mood for 30 days. Find the optimal sleep-performance correlation 
                    that could boost your daily energy by 20-30%.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Daily sleep quality vs energy levels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Exercise impact on mood and productivity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Identify optimal sleep-wake cycles</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg">
                <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  🚀 Success Stories from Previous Students:
                </h5>
                <div className="text-sm space-y-2">
                  <p><strong>"Saved €300/month"</strong> - Maria discovered unused subscriptions through expense visualization</p>
                  <p><strong>"Lost 15kg in 6 months"</strong> - Alexandru found his optimal sleep-exercise correlation</p>
                  <p><strong>"25% productivity boost"</strong> - Elena optimized her daily schedule using time-tracking charts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Button variant="outline" onClick={() => navigate('/data-visualizing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course Overview
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Sessions 18-19 Complete</Badge>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Continue to Advanced Topics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatplotlibMasteryArtifact;