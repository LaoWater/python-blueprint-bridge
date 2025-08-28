import React, { useState } from 'react';
import { Feather, BarChart, TrendingUp, Eye, Activity, Layers, Zap, Database, Cloud, Code, LineChart, PieChart, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

// Mock components for the course structure
const EditableContent = ({ children }) => children;
const EditableCodeBlock = ({ code, language }) => (
  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
    <pre className="text-green-400 text-sm">
      <code>{code}</code>
    </pre>
  </div>
);

const TableOfContents = ({ items }) => (
  <Card className="sticky top-6">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium text-muted-foreground">On this page</CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </CardContent>
  </Card>
);

const CourseNavigation = ({ previousCourse, nextCourse }) => (
  <div className="flex justify-between items-center mt-12 pt-8 border-t">
    <div>
      {previousCourse && (
        <a href={previousCourse.path} className="text-violet-600 hover:text-violet-700 transition-colors">
          ← {previousCourse.title}
        </a>
      )}
    </div>
    <div>
      {nextCourse && (
        <a href={nextCourse.path} className="text-violet-600 hover:text-violet-700 transition-colors">
          {nextCourse.title} →
        </a>
      )}
    </div>
  </div>
);

// Sample data for visualizations
const sessionProgressData = [
  { session: 'S18', completion: 95, engagement: 88 },
  { session: 'S19', completion: 87, engagement: 92 },
  { session: 'S20', completion: 92, engagement: 85 },
  { session: 'S21', completion: 78, engagement: 90 },
  { session: 'S22', completion: 85, engagement: 87 },
  { session: 'S23', completion: 90, engagement: 94 },
  { session: 'S24', completion: 88, engagement: 91 },
  { session: 'S25', completion: 82, engagement: 89 },
  { session: 'S26', completion: 79, engagement: 86 },
  { session: 'S27', completion: 73, engagement: 83 },
];

const skillDistributionData = [
  { name: 'Matplotlib', value: 25, color: '#8b5cf6' },
  { name: 'Seaborn', value: 20, color: '#a855f7' },
  { name: 'Plotly', value: 20, color: '#9333ea' },
  { name: 'Streamlit', value: 25, color: '#7c3aed' },
  { name: 'Deployment', value: 10, color: '#6d28d9' },
];

const learningTrendData = [
  { week: 'W1', visualization: 20, dashboards: 5 },
  { week: 'W2', visualization: 35, dashboards: 10 },
  { week: 'W3', visualization: 55, dashboards: 15 },
  { week: 'W4', visualization: 70, dashboards: 30 },
  { week: 'W5', visualization: 85, dashboards: 50 },
  { week: 'W6', visualization: 90, dashboards: 70 },
  { week: 'W7', visualization: 95, dashboards: 85 },
];

const MiniChart = ({ type, data, title, className = "" }) => {
  const chartHeight = 120;
  
  if (type === 'line') {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-3 ${className}`}>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <RechartsLineChart data={data}>
            <Line type="monotone" dataKey="completion" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="engagement" stroke="#a855f7" strokeWidth={2} dot={false} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  if (type === 'area') {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-3 ${className}`}>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisualization" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDashboards" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="visualization" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVisualization)" />
            <Area type="monotone" dataKey="dashboards" stroke="#a855f7" fillOpacity={1} fill="url(#colorDashboards)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  if (type === 'pie') {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-3 ${className}`}>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  return null;
};

const DataVisualizing = () => {
  const [tocItems] = useState([
    { id: 'overview', title: 'Journey Overview', sessions: 'Introduction' },
    { id: 'data-visualization', title: 'Data Visualization', sessions: 'Sessions 18-22' },
    { id: 'dashboards-apps', title: 'Dashboards & Apps', sessions: 'Sessions 23-27' },
  ]);

  const [sessionContent] = useState({
    18: {
      title: "Matplotlib Fundamentals: From Data Points to Visual Stories",
      story: "In the digital age, data without visualization is like a book written in invisible ink. Every Fortune 500 company relies on visual storytelling to make million-dollar decisions. Today, we enter the world where pixels become insights, and charts become the language of business intelligence.",
      realWorld: "Financial analysts at Goldman Sachs use Matplotlib to visualize market trends that guide billion-dollar investments. Netflix uses similar visualizations to understand viewing patterns and decide which shows to produce next.",
      keyInsights: [
        "Matplotlib is the foundation of Python's visualization ecosystem",
        "Every chart tells a story - the question is whether it's the right story",
        "Visual perception psychology drives effective chart design"
      ]
    },
    19: {
      title: "Advanced Matplotlib: Professional Visualization Techniques", 
      story: "Beyond basic charts lies the realm of professional data visualization. Here, we learn the subtle art of visual communication - how color, typography, and layout can transform raw numbers into compelling narratives that drive business decisions.",
      realWorld: "The New York Times' data visualization team uses advanced Matplotlib techniques to create award-winning infographics. NASA scientists visualize space mission data to detect patterns invisible to the naked eye.",
      keyInsights: [
        "Custom styling separates amateur from professional visualizations",
        "Animation and interactivity enhance data storytelling",
        "Mathematical precision in visual design builds trust"
      ]
    },
    20: {
      title: "Statistical Visualization with Seaborn: Beauty Meets Analytics",
      story: "Where Matplotlib provides the canvas, Seaborn brings the artist's intuition. Built specifically for statistical visualization, it transforms complex statistical relationships into elegant, publication-ready graphics that reveal hidden patterns in data.",
      realWorld: "Pharmaceutical companies use Seaborn to visualize clinical trial results. E-commerce giants like Amazon analyze customer behavior patterns using Seaborn's sophisticated statistical plots.",
      keyInsights: [
        "Statistical visualization requires domain-specific tools",
        "Seaborn automates complex statistical plotting decisions",
        "Beautiful defaults accelerate exploratory data analysis"
      ]
    },
    21: {
      title: "Advanced Seaborn: Statistical Mastery in Visualization",
      story: "At this level, visualization becomes statistical storytelling. We explore advanced techniques that reveal correlation, causation, and prediction patterns - the holy grail of data science that separates insights from mere observations.",
      realWorld: "Medical researchers use advanced Seaborn techniques to visualize treatment efficacy across different patient populations. Climate scientists visualize global temperature patterns to understand climate change impacts.",
      keyInsights: [
        "Multi-dimensional data requires sophisticated visualization strategies",
        "Statistical significance can be communicated visually",
        "Advanced plots bridge the gap between analysis and presentation"
      ]
    },
    22: {
      title: "Interactive Visualizations with Plotly: Web-Scale Data Stories",
      story: "The web democratized information; interactive visualizations democratize data exploration. Plotly transforms static charts into dynamic, web-ready experiences where users become data explorers, not passive consumers.",
      realWorld: "Tesla's engineers use interactive Plotly dashboards to monitor vehicle performance across their global fleet. Financial institutions create real-time trading dashboards that update every millisecond.",
      keyInsights: [
        "Interactivity transforms viewers into active data explorers",
        "Web-based visualizations scale to global audiences",
        "Real-time data requires responsive visualization frameworks"
      ]
    },
    23: {
      title: "Interactive Dashboards with Streamlit: From Code to Application",
      story: "The boundary between data scientist and application developer dissolves here. Streamlit enables us to transform Python scripts into full-featured web applications, making our analyses accessible to non-technical stakeholders who drive business decisions.",
      realWorld: "Startups use Streamlit to create investor-ready dashboards that showcase their business metrics. Healthcare organizations build patient monitoring dashboards that doctors can use without technical training.",
      keyInsights: [
        "Streamlit democratizes web application development for data scientists",
        "Real-time dashboards enable immediate decision-making",
        "User experience design principles apply to data applications"
      ]
    },
    24: {
      title: "Advanced Streamlit with Machine Learning: Predictive Applications",
      story: "Here, visualization meets prediction. We build applications that don't just show what happened, but predict what will happen. This is where data science becomes artificial intelligence, and dashboards become crystal balls.",
      realWorld: "Retail companies build demand forecasting applications that predict inventory needs. Healthcare systems create diagnostic assistance tools that help doctors make faster, more accurate decisions.",
      keyInsights: [
        "Machine learning models need intuitive interfaces for adoption",
        "Real-time prediction requires optimized model deployment",
        "Trust in AI systems depends on transparent visualization"
      ]
    },
    25: {
      title: "Professional Dashboards: Enterprise-Grade Data Applications",
      story: "At the enterprise level, dashboards become mission-critical infrastructure. They must handle massive datasets, serve thousands of users, and maintain uptime that rivals banking systems. This is visualization at scale.",
      realWorld: "Airlines use professional dashboards to manage flight operations across continents. Supply chain companies monitor global logistics in real-time to prevent disruptions that could cost millions.",
      keyInsights: [
        "Enterprise dashboards require robust architecture and scalability",
        "Performance optimization becomes critical at scale",
        "Security and access control are paramount in business applications"
      ]
    },
    26: {
      title: "Streamlit Integration & Cloud Deployment: Global Scale Solutions",
      story: "The final step in our visualization journey: deploying our creations to the cloud where they can serve global audiences. We learn to integrate with databases, implement authentication, and ensure our applications can scale from startup to enterprise.",
      realWorld: "Global consulting firms deploy Streamlit applications that serve clients across continents. Government agencies use cloud-deployed dashboards to provide transparent public services to millions of citizens.",
      keyInsights: [
        "Cloud deployment democratizes access to data applications",
        "Database integration enables real-time data connectivity",
        "Authentication and security protect sensitive business data"
      ]
    },
    27: {
      title: "LeetCode Python Exercises: Algorithmic Foundation for AI",
      story: "As we prepare for the next chapter - Machine Learning - we must strengthen our algorithmic foundation. LeetCode problems aren't just coding exercises; they're the building blocks of the algorithms that power modern AI systems.",
      realWorld: "FAANG companies use LeetCode-style problems to identify engineers who can optimize machine learning algorithms. The same problem-solving patterns appear in neural network optimization and data structure design for AI systems.",
      keyInsights: [
        "Algorithmic thinking is fundamental to machine learning implementation",
        "Optimization techniques learned here apply to AI model performance",
        "Problem-solving patterns bridge traditional programming and AI development"
      ]
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-12">
          {/* Table of Contents - moved further left */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
              
              {/* Enhanced with mini visualizations */}
              <div className="mt-6 space-y-4">
                <MiniChart 
                  type="line" 
                  data={sessionProgressData.slice(0, 5)} 
                  title="Session Progress" 
                  className="border border-violet-100 dark:border-violet-800"
                />
                <MiniChart 
                  type="pie" 
                  data={skillDistributionData} 
                  title="Skill Coverage" 
                  className="border border-violet-100 dark:border-violet-800"
                />
                <MiniChart 
                  type="area" 
                  data={learningTrendData} 
                  title="Learning Curve" 
                  className="border border-violet-100 dark:border-violet-800"
                />
              </div>
            </div>
          </div>

          {/* Main Content - unchanged width */}
          <div className="flex-1 max-w-4xl">
            {/* Header */}
            <div id="overview" className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart className="text-white w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Data: Visualizing
                  </h1>
                  <p className="text-lg text-muted-foreground">From Data Points to Visual Intelligence</p>
                </div>
              </div>

              <Card className="mb-8 border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Eye className="w-8 h-8 text-violet-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-violet-800 dark:text-violet-200">The Visual Intelligence Journey</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        "Data is the new oil, but visualization is the refinery." As we continue our Python mastery journey, 
                        we enter the realm where numbers become narratives, patterns become predictions, and static data 
                        transforms into dynamic intelligence. This chapter bridges pure computation with human insight, 
                        preparing us for the AI revolution that follows.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                          Visual Intelligence
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Interactive Dashboards
                        </Badge>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          Real-time Applications
                        </Badge>
                      </div>
                    </div>
                    {/* Mini progress visualization in header */}
                    <div className="w-32 h-20 bg-white dark:bg-gray-900 rounded-lg p-2 border border-violet-100 dark:border-violet-800">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={learningTrendData.slice(0, 4)}>
                          <defs>
                            <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="visualization" stroke="#8b5cf6" fill="url(#miniGradient)" strokeWidth={1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced skills overview with charts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-violet-100 dark:border-violet-800 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <LineChart className="w-5 h-5 text-violet-600" />
                      <p className="font-medium text-violet-800 dark:text-violet-200">Sessions 18-22</p>
                    </div>
                    <p className="text-sm text-violet-700 dark:text-violet-300">Visualization Mastery</p>
                    <div className="mt-2 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={sessionProgressData.slice(0, 5)}>
                          <Line type="monotone" dataKey="completion" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-100 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <p className="font-medium text-purple-800 dark:text-purple-200">Sessions 23-27</p>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Dashboard Applications</p>
                    <div className="mt-2 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={sessionProgressData.slice(5)}>
                          <Bar dataKey="engagement" fill="#a855f7" radius={[2, 2, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-100 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <PieChart className="w-5 h-5 text-indigo-600" />
                      <p className="font-medium text-indigo-800 dark:text-indigo-200">Full Journey</p>
                    </div>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">Complete Coverage</p>
                    <div className="mt-2 h-16 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={skillDistributionData.slice(0, 3)}
                            cx="50%"
                            cy="50%"
                            innerRadius={8}
                            outerRadius={24}
                            dataKey="value"
                          >
                            {skillDistributionData.slice(0, 3).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Data Visualization Section */}
            <section id="data-visualization" className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-violet-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Vizualizare de Date</h2>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <p className="flex-1 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  The art and science of transforming raw data into compelling visual stories that drive decisions, 
                  reveal insights, and communicate complex patterns to both technical and non-technical audiences.
                </p>
                
                {/* Inline mini chart */}
                <div className="w-48 h-24 bg-white dark:bg-gray-900 rounded-lg p-3 border border-violet-100 dark:border-violet-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sessionProgressData.slice(0, 5)}>
                      <defs>
                        <linearGradient id="sectionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="completion" stroke="#8b5cf6" fill="url(#sectionGradient)" strokeWidth={2} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sessions 18-22 */}
              <div className="grid gap-6">
                {[18, 19, 20, 21, 22].map((sessionNum) => (
                  <Card key={sessionNum} id={`session-${sessionNum}`} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-violet-100 dark:border-violet-800">
                    <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-violet-800 dark:text-violet-200">
                          Sesiunea {sessionNum} – {sessionContent[sessionNum]?.title}
                        </CardTitle>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-8 bg-white dark:bg-gray-900 rounded border border-violet-200 dark:border-violet-700 p-1">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsLineChart data={[
                                { value: sessionProgressData[sessionNum - 18]?.completion || 0 },
                                { value: (sessionProgressData[sessionNum - 18]?.completion || 0) * 0.9 },
                                { value: sessionProgressData[sessionNum - 18]?.completion || 0 },
                              ]}>
                                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={1} dot={false} />
                              </RechartsLineChart>
                            </ResponsiveContainer>
                          </div>
                          <Badge className="bg-violet-600 text-white">Published</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Tabs defaultValue="story" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-4">
                          <TabsTrigger value="story">Story</TabsTrigger>
                          <TabsTrigger value="real-world">Real World</TabsTrigger>
                          <TabsTrigger value="code">Code</TabsTrigger>
                          <TabsTrigger value="insights">Insights</TabsTrigger>
                        </TabsList>
                        
                         <TabsContent value="story" className="space-y-4">
                           <EditableContent>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {sessionContent[sessionNum]?.story || ""}
                            </p>
                          </EditableContent>
                        </TabsContent>
                        
                        <TabsContent value="real-world" className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Activity className="w-6 h-6 text-violet-600 mt-1" />
                             <EditableContent>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {sessionContent[sessionNum]?.realWorld || ""}
                              </p>
                            </EditableContent>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="code" className="space-y-4">
                          <EditableCodeBlock
                             code={`# Session ${sessionNum} - ${sessionContent[sessionNum]?.title}
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import pandas as pd
import numpy as np

# Professional visualization example
def create_professional_visualization():
    # Generate sample data
    data = pd.DataFrame({
        'x': np.random.randn(1000),
        'y': np.random.randn(1000),
        'category': np.random.choice(['A', 'B', 'C'], 1000)
    })
    
    # Create publication-ready plot
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.scatterplot(data=data, x='x', y='y', hue='category', ax=ax)
    plt.title('Professional Data Visualization', fontsize=16, fontweight='bold')
    plt.show()

create_professional_visualization()`}
                             language="python"
                          />
                        </TabsContent>
                        
                        <TabsContent value="insights" className="space-y-4">
                          <div className="space-y-3">
                            {sessionContent[sessionNum]?.keyInsights.map((insight, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-violet-600 mt-0.5" />
                                <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Dashboards & Apps Section */}
            <section id="dashboards-apps" className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboards & Apps cu Streamlit</h2>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <p className="flex-1 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Transform your data science code into production-ready web applications that serve real users, 
                  handle real-time data, and integrate with enterprise systems. This is where analysis becomes application.
                </p>
                
                {/* Inline mini chart for dashboards section */}
                <div className="w-48 h-24 bg-white dark:bg-gray-900 rounded-lg p-3 border border-purple-100 dark:border-purple-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={sessionProgressData.slice(5)}>
                      <Bar dataKey="engagement" fill="#a855f7" radius={[2, 2, 0, 0]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sessions 23-27 */}
              <div className="grid gap-6">
                {[23, 24, 25, 26, 27].map((sessionNum) => (
                  <Card key={sessionNum} id={`session-${sessionNum}`} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-100 dark:border-purple-800">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                          Sesiunea {sessionNum} – {sessionContent[sessionNum]?.title}
                        </CardTitle>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-8 bg-white dark:bg-gray-900 rounded border border-purple-200 dark:border-purple-700 p-1">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsBarChart data={[
                                { value: sessionProgressData[sessionNum - 18]?.engagement || 0 },
                              ]}>
                                <Bar dataKey="value" fill="#a855f7" radius={[1, 1, 0, 0]} />
                              </RechartsBarChart>
                            </ResponsiveContainer>
                          </div>
                          <Badge className="bg-purple-600 text-white">Published</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Tabs defaultValue="story" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-4">
                          <TabsTrigger value="story">Story</TabsTrigger>
                          <TabsTrigger value="real-world">Real World</TabsTrigger>
                          <TabsTrigger value="code">Code</TabsTrigger>
                          <TabsTrigger value="insights">Insights</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="story" className="space-y-4">
                           <EditableContent>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {sessionContent[sessionNum]?.story || ""}
                            </p>
                          </EditableContent>
                        </TabsContent>
                        
                        <TabsContent value="real-world" className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Database className="w-6 h-6 text-purple-600 mt-1" />
                             <EditableContent>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {sessionContent[sessionNum]?.realWorld || ""}
                              </p>
                            </EditableContent>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="code" className="space-y-4">
                          <EditableCodeBlock
                             code={`# Session ${sessionNum} - ${sessionContent[sessionNum]?.title}
import streamlit as st
import pandas as pd
import plotly.express as px
import numpy as np

# Professional Streamlit application example
def main():
    st.set_page_config(
        page_title="Professional Dashboard",
        page_icon="📊",
        layout="wide"
    )
    
    st.title("${sessionContent[sessionNum]?.title}")
    
    # Sample interactive dashboard
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Real-time Data")
        data = pd.DataFrame({
            'timestamp': pd.date_range('2024-01-01', periods=100, freq='D'),
            'value': np.random.randn(100).cumsum()
        })
        
        fig = px.line(data, x='timestamp', y='value', 
                     title='Live Data Stream')
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("Interactive Controls")
        threshold = st.slider("Threshold", 0.0, 10.0, 5.0)
        filtered_data = data[data['value'] > threshold]
        st.write(f"Data points above threshold: {len(filtered_data)}")

if __name__ == "__main__":
    main()`}
                             language="python"
                          />
                        </TabsContent>
                        
                        <TabsContent value="insights" className="space-y-4">
                          <div className="space-y-3">
                            {sessionContent[sessionNum]?.keyInsights.map((insight, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Cloud className="w-5 h-5 text-purple-600 mt-0.5" />
                                <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Enhanced Final Progress Section */}
            <Card className="mb-8 border-gradient-to-r from-violet-200 to-purple-200 dark:from-violet-800 dark:to-purple-800 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Code className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-violet-800 dark:text-violet-200">The Bridge to AI</h3>
                        <p className="text-violet-600 dark:text-violet-400">Your Foundation for Machine Learning Mastery</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      With visualization mastery achieved, we've built the essential bridge between raw computation and human insight. 
                      Every chart you create, every dashboard you build, and every interactive application you deploy strengthens 
                      your foundation for the next chapter: <strong>Machine Learning</strong>. The patterns you've learned to visualize 
                      will become the patterns you'll teach machines to recognize.
                    </p>
                  </div>
                  
                  {/* Completion visualization */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-violet-200 dark:border-violet-700">
                    <h4 className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-3">Journey Completion</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={learningTrendData}>
                        <defs>
                          <linearGradient id="completionGradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="completionGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value, name) => [
                            `${value}%`, 
                            name === 'visualization' ? 'Visualization Skills' : 'Dashboard Skills'
                          ]}
                          labelFormatter={(week) => `Week ${week.slice(1)}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="visualization" 
                          stroke="#8b5cf6" 
                          fillOpacity={1} 
                          fill="url(#completionGradient1)" 
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="dashboards" 
                          stroke="#a855f7" 
                          fillOpacity={1} 
                          fill="url(#completionGradient2)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Course Navigation */}
            <CourseNavigation
              previousCourse={{
                path: "/data-calculus",
                title: "Data: Calculus"
              }}
              nextCourse={{
                path: "/machine-learning",
                title: "Machine Learning"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizing;