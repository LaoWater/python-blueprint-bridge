import React, { useState, useEffect } from 'react';
import { useContent } from '../components/ContentProvider';
import { useNavigate } from 'react-router-dom';
import EditablePageHeader from '../components/EditablePageHeader';
import TableOfContents from '../components/TableOfContents';
import CourseNavigation from '../components/CourseNavigation';
import { Feather, BarChart, TrendingUp, Eye, Activity, Layers, Zap, Database, Cloud, Code, LineChart, PieChart, BarChart3, Target, Lightbulb, Palette, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import dataVisualizingHero from '@/assets/data-calculus-hero.jpg';

// Mock components for the course structure
const EditableContent = ({ children }) => children;
const EditableCodeBlock = ({ code, language }) => (
  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
    <pre className="text-green-400 text-sm">
      <code>{code}</code>
    </pre>
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
  const { getContent, loading } = useContent();
  const navigate = useNavigate();
  
  const [hideFirstTwoCharts, setHideFirstTwoCharts] = useState(false);

  const [tocItems] = useState([
    { id: 'revelation', title: 'The Need Arises', sessions: 'Introduction' },
    { id: 'overview', title: 'Journey Overview', sessions: 'Introduction' },
    { id: 'matplotlib-mastery', title: 'Matplotlib Mastery', sessions: 'Sessions 18-19' },
    { id: 'seaborn-mastery', title: 'Seaborn Mastery', sessions: 'Sessions 20-21' },
    { id: 'plotly-mastery', title: 'Plotly Interactive', sessions: 'Session 22' },
    { id: 'streamlit-unified', title: 'Streamlit Unified Mastery', sessions: 'Sessions 23-26' },
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
      title: "Seaborn Foundations: The Need for Statistical Beauty",
      story: "The year is 2012. Michael Waskom, a Stanford neuroscience PhD student, faces a critical problem: beautiful statistical visualizations take hours to create with matplotlib, but ugly ones take minutes. His research on visual perception demands both statistical rigor AND aesthetic excellence. The academic world needs a solution that makes publication-ready statistical plots as easy as breathing.",
      realWorld: "Today: Pharmaceutical companies use Seaborn to visualize clinical trial results that convince FDA approval boards. Netflix's recommendation algorithms are fine-tuned using Seaborn's correlation matrices. Academic papers featuring Seaborn visualizations get 40% more citations because reviewers can actually understand the statistical relationships.",
      keyInsights: [
        "Statistical visualization is fundamentally different from basic charting",
        "Beautiful defaults aren't luxury - they're essential for statistical communication",
        "Seaborn automates the statistical decisions that take matplotlib hours to implement"
      ]
    },
    21: {
      title: "Advanced Seaborn: Statistical Storytelling Mastery", 
      story: "Beyond individual statistical plots lies the realm of statistical narratives. Here we learn to combine distributions, relationships, and categorical comparisons into coherent visual stories that reveal not just what the data shows, but WHY it matters. This is where data analysis becomes data science, and visualizations become discoveries.",
      realWorld: "McKinsey consultants use advanced Seaborn techniques in their billion-dollar strategic recommendations. Medical researchers publishing in Nature use Seaborn's multi-panel figures to demonstrate treatment efficacy across patient populations. Climate scientists at NASA visualize global temperature correlations to communicate climate change impacts to world leaders.",
      keyInsights: [
        "Advanced statistical visualization reveals patterns invisible to basic charts",
        "Multi-dimensional statistical relationships require sophisticated visual strategies", 
        "Professional statistical storytelling bridges academic rigor with business impact"
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

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide first 2 charts when scrolling past the Summary section
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const summarySection = document.getElementById('overview');
          if (summarySection) {
            const rect = summarySection.getBoundingClientRect();
            // Hide charts when summary section scrolls past viewport (more aggressive)
            const shouldHide = rect.bottom < 2500;
            setHideFirstTwoCharts(shouldHide);
            

          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${dataVisualizingHero})`,
            filter: 'brightness(0.3) contrast(1.2)',
          }}
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent dark:from-black/70 dark:via-black/50 dark:to-black/20" />
        
        {/* Additional overlay for theme adaptation */}
        <div className="absolute inset-0 bg-background/10 dark:bg-background/5" />
        
        {/* Content with forced white text */}
        <div className="relative z-10 [&_*]:!text-white [&_*]:!text-opacity-100">
          <EditablePageHeader 
            page="data-visualizing"
            defaultTitle="Data: Visualizing" 
            defaultSubtitle="Opening Our Eyes - From Numbers to Visual Intelligence"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Table of Contents - moved further left */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents items={tocItems} />
            
            {/* Enhanced with mini visualizations */}
            <div className="mt-6 space-y-4">
              
        
            </div>

          </div>
                  <>
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
                </>
              <MiniChart 
                type="area" 
                data={learningTrendData} 
                title="Learning Curve" 
                className="border border-violet-100 dark:border-violet-800"
              />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* The Revelation - Why Visualization? */}
          <section id="revelation" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">The Moment of Revelation</h2>
                <p className="text-muted-foreground">"Now what?" - The question every data scientist faces</p>
              </div>
            </div>

            {/* The Question */}
            <Card className="border-orange-200 dark:border-orange-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Target className="w-5 h-5" />
                  "How do I turn this Data into Value?"
                </CardTitle>
                <CardDescription className="text-lg">
                  Once the Student has began Grasping how to Model Data - and then how to Process it fast, precise and scalable - of course the question rises...
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    You've mastered data structures, conquered algorithms, and harnessed the power of NumPy and Pandas. 
                    Your models are elegant, your processing is lightning-fast, and your data flows through pipelines 
                    like water through precisely engineered channels.
                  </p>
                  
                  <p className="text-muted-foreground">
                    But then comes the inevitable question: <strong className="text-orange-600 dark:text-orange-400">
                    "Now What? How do I turn this Data into Value?" <br></br>
                    But What is "Value"?</strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">💰 Productivity</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Optimize workflows</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200">💸 Money</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">Drive revenue</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">⚡ Performance</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Boost efficiency</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200">📈 Scalability</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Scale systems</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opening Our Eyes */}
            <Card className="border-teal-200 dark:border-teal-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                  <Eye className="w-5 h-5" />
                  "Open Our Eyes. And with our Eyes Open, we shall see Further and Clearer"
                </CardTitle>
                <CardDescription className="text-lg">
                  The answer lies in fantastic imagination and precise tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    That is.. we need <strong className="text-teal-600 dark:text-teal-400">fantastic imagination</strong> and 
                    <strong className="text-teal-600 dark:text-teal-400"> precise tools</strong> in order to 
                    Visually represent the Models and the World we created in our Data Structures.
                  </p>
                  
                  <blockquote className="border-l-4 border-teal-500 pl-4 italic text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/20 p-4 rounded-r-lg">
                    "The greatest value of a picture is when it forces us to notice what we never expected to see."
                    <footer className="text-sm mt-2 not-italic">— John Tukey, Pioneer of Data Visualization</footer>
                  </blockquote>

                  <p className="text-muted-foreground">
                    As always, we will begin by telling the story not of the tool being invented and then the need 
                    followed (as is most current teaching curricula) - but rather of the <strong>Need which arisen</strong> - and then 
                    the <strong>Invention of Tools</strong> followed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Matplotlib Mastery Section - Featured Sessions 18-19 */}
          <section id="matplotlib-mastery" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Sessions 18-19: Matplotlib Mastery</h2>
                <p className="text-muted-foreground">From Fundamentals to Professional Visualization</p>
              </div>
            </div>

            <Card className="border-blue-200 dark:border-blue-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Palette className="w-5 h-5" />
                  🕒 Duration: 6 hours (2 combined sessions)
                </CardTitle>
                <CardDescription className="text-lg">
                  🎯 Master the complete journey from basic charts to professional data visualizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Transform raw data into compelling visual stories. Learn both the fundamentals 
                    and advanced techniques that separate professional visualizations from amateur charts.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📈 Core Charts</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Line, bar, pie charts with professional styling</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🎨 Advanced Styling</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Custom themes, annotations, complex layouts</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💼 Real Applications</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">Personal finance, health tracking, business reports</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🎯 Impact Projects</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Personal Finance Dashboard:</strong> Track expenses and find hidden money drains<br/>
                      <strong>Health Optimization:</strong> Discover sleep-performance correlations that boost daily energy
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => navigate('/artifacts/matplotlib-mastery')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">📊</span>
                      <span>Enter Matplotlib Mastery Artifact</span>
                      <Play className="w-5 h-5" />
                    </div>
                  </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Complete interactive learning experience with hands-on projects
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Seaborn Mastery Section - Featured Sessions 20-21 */}
          <section id="seaborn-mastery" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Sessions 20-21: Seaborn Mastery</h2>
                <p className="text-muted-foreground">From Statistical Need to Elegant Solutions</p>
              </div>
            </div>

            <Card className="border-violet-200 dark:border-violet-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                  <Target className="w-5 h-5" />
                  🕒 Duration: 6 hours (2 combined sessions)
                </CardTitle>
                <CardDescription className="text-lg">
                  🎯 Master statistical visualization - from distributions to correlation matrices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Where Matplotlib provides the canvas, Seaborn brings statistical intuition. Learn to create 
                    publication-ready statistical visualizations that reveal hidden patterns and communicate 
                    complex relationships with elegant simplicity.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 p-4 rounded-lg border border-violet-200 dark:border-violet-800">
                      <h4 className="font-semibold text-violet-800 dark:text-violet-200 mb-2">📊 Statistical Plots</h4>
                      <p className="text-sm text-violet-700 dark:text-violet-300">Distributions, box plots, violin plots with statistical significance</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🔗 Relationships</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Scatter plots, regression lines, correlation matrices</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                      <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">🎨 Beautiful Defaults</h4>
                      <p className="text-sm text-pink-700 dark:text-pink-300">Professional styling, color palettes, publication-ready outputs</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🎯 Real Impact Projects</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Personal Health Analytics:</strong> Discover sleep-performance correlations that boost daily energy by 20%<br/>
                      <strong>Financial Pattern Analysis:</strong> Find hidden expense patterns and optimize spending using correlation analysis
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => navigate('/artifacts/seaborn-mastery')}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">📈</span>
                      <span>Enter Seaborn Mastery Artifact</span>
                      <Play className="w-5 h-5" />
                    </div>
                  </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Interactive statistical visualization experience with real-world applications
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Session 22: Plotly Interactive Visualizations */}
          <section id="plotly-mastery" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Session 22: Plotly Interactive Mastery</h2>
                <p className="text-muted-foreground">Interactive Visualizations with Plotly - When data comes alive through touch</p>
              </div>
            </div>

            <Card className="border-emerald-200 dark:border-emerald-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <Target className="w-5 h-5" />
                  🕒 Duration: 3 hours
                </CardTitle>
                <CardDescription className="text-lg">
                  🎯 From real needs to interactive tools that transform passive consumption into active exploration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    In this lesson we explore Plotly – a modern library that brings data to life through interactive graphics.
                    The goal is not just to create visualizations, but to learn how to apply them in daily life,
                    in business, in health, or in personal decisions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">🔍 Interactivity</h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">Zoom, hover tooltips, dynamic filtering</p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                      <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">💰 Personal Finance</h4>
                      <p className="text-sm text-teal-700 dark:text-teal-300">Interactive dashboards for expenses and savings</p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                      <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-2">🏥 Health & Wellness</h4>
                      <p className="text-sm text-cyan-700 dark:text-cyan-300">Interactive monitoring - sleep, steps, hydration</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🎯 Real Impact Applications</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>💡 Task 1 – Finance:</strong> Interactive dashboard with monthly expenses by category<br/>
                      <strong>💡 Task 2 – Health:</strong> Interactive heatmap for sleep and energy patterns<br/>
                      <strong>💡 Task 3 – Personal life:</strong> Progress tracking for hobbies and creative projects
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => navigate('/artifacts/plotly-interactive')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">⚡</span>
                      <span>Enter Plotly Interactive Artifact</span>
                      <Play className="w-5 h-5" />
                    </div>
                  </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    👉 After this lesson, you'll be able to build your own self-analysis tools
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Sessions 23-26: Streamlit Unified Mastery */}
          <section id="streamlit-unified" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Sessions 23-26: Streamlit Unified Mastery</h2>
                <p className="text-muted-foreground">Unified Lesson: Building Interactive Dashboards with Streamlit</p>
              </div>
            </div>

            <Card className="border-indigo-200 dark:border-indigo-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                  <Target className="w-5 h-5" />
                  🕒 Total Duration: ~10 hours (4 combined sessions)
                </CardTitle>
                <CardDescription className="text-lg">
                  🎯 Objective: Learn to build interactive applications with Streamlit – from simple prototypes to professional dashboards connected to databases and ready for cloud deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    We transform Python analyses into interactive web applications for real problems in your life:
                    <strong className="text-indigo-600 dark:text-indigo-400">Health & Personal Finance</strong>.
                    The goal is not to learn yet another tool, but to feel the need to create applications that truly change lives.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🏥 Health Tracking Crisis</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">Health data scattered across apps - you can't see correlations</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💰 Financial Insight Gap</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">Beautiful charts that don't help with daily financial decisions</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🚀 The Progressive Journey</h4>
                    <div className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                      <div><strong>Session 23:</strong> First Dashboard - Health & Finance Foundations (3h)</div>
                      <div><strong>Session 24:</strong> Interactive Analytics - Machine Learning Integration (3h)</div>
                      <div><strong>Session 25:</strong> Real-time Systems - Live Data & Collaboration (2.5h)</div>
                      <div><strong>Session 26:</strong> Production Ready - Cloud Deployment & Enterprise Features (2.5h)</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Real Impact Outcome</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>💡 Task 1 – Smart personal budget:</strong> Build a dashboard with authentication where users log their daily expenses<br/>
                      <strong>💡 Task 2 – Health journal:</strong> Create an application where users track their sleep, water intake, workouts<br/>
                      <strong>💡 Task 3 – Dashboard for hobbies/projects:</strong> If you're studying or creating something, build a tool to log your dedicated time
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => navigate('/artifacts/streamlit-unified')}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">🚀</span>
                      <span>Enter Streamlit Unified Artifact</span>
                      <Play className="w-5 h-5" />
                    </div>
                  </Button>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    🎯 Complete experience: from real needs to applications running in the cloud and used daily by your family
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Header */}
          <div id="overview" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Summary of What We Learned
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
  );
};

export default DataVisualizing;