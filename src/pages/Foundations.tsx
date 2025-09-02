import React, { useState, useEffect } from 'react';
import { useContent } from '../components/ContentProvider';
import { useNavigate } from 'react-router-dom';
import EditablePageHeader from '../components/EditablePageHeader';
import EditableContent from '../components/EditableContent';
import EditableCodeBlock from '../components/EditableCodeBlock';
import TableOfContents from '../components/TableOfContents';
import CourseNavigation from '../components/CourseNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Lightbulb, Wrench, ChevronRight, Play, CheckCircle2, Cpu, Zap } from 'lucide-react';
import pythonFoundationsHero from '../assets/python-foundations-hero.jpg';
import { Button } from '@/components/ui/button';

const Foundations = () => {
  const { getContent, loading } = useContent();
  const navigate = useNavigate();
  
  const [tocItems] = useState([
    { id: 'getting-started', title: 'Getting Started', sessions: 'Setup & Environment' },
    { id: 'weekly-sessions', title: 'Hello, World!', sessions: 'Sessions 1-5' },
    { id: 'oop-patterns', title: 'OOP & Design Patterns', sessions: 'Sessions 6-8' },
    { id: 'fundamentals', title: 'Advanced Fundamentals', sessions: 'Core Concepts' },
    { id: 'python-execution', title: 'How Python Executes', sessions: 'Performance & Parallelism' }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const installationContent = {
    overview: getContent('foundations', 'installation-overview'),
    pythonWindows: getContent('foundations', 'installation-python-windows'),
    pythonMac: getContent('foundations', 'installation-python-mac'),
    gitWindows: getContent('foundations', 'installation-git-windows'),
    gitMac: getContent('foundations', 'installation-git-mac'),
    verification: getContent('foundations', 'installation-verification'),
    devEnvironment: getContent('foundations', 'development-environment'),
  };

  const sessionContent = {
    session1: getContent('foundations', 'session-1'),
    session2: getContent('foundations', 'session-2'),
    session3: getContent('foundations', 'session-3'),
    session4: getContent('foundations', 'session-4'),
    session5: getContent('foundations', 'session-5'),
    session6: getContent('foundations', 'session-6'),
    session7: getContent('foundations', 'session-7'),
    session8: getContent('foundations', 'session-8'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Background */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pythonFoundationsHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <EditablePageHeader 
              page="foundations"
              defaultTitle="Python Foundations" 
              defaultSubtitle="Master Python from the ground up - from installation to advanced concepts"
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main content - Now much wider */}
        <div className="flex-1 min-w-0">
          
          {/* Getting Started Section */}
          <section id="getting-started" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Getting Started</h2>
                <p className="text-muted-foreground">Set up your Python development environment</p>
              </div>
            </div>

            <Card className="mb-6 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-green-600" />
                  Installation & Setup
                </CardTitle>
                <CardDescription>
                  Choose your operating system and follow the step-by-step installation guide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="python-windows">Python (Windows)</TabsTrigger>
                    <TabsTrigger value="python-mac">Python (Mac)</TabsTrigger>
                    <TabsTrigger value="git-windows">Git (Windows)</TabsTrigger>
                    <TabsTrigger value="git-mac">Git (Mac)</TabsTrigger>
                    <TabsTrigger value="verification">Verify</TabsTrigger>
                    <TabsTrigger value="editor">Code Editor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <EditableContent
                        type="description"
                        page="foundations"
                        section="installation-overview"
                        contentId={installationContent.overview?.id}
                        className="text-muted-foreground"
                      >
                        <p>{installationContent.overview?.description}</p>
                      </EditableContent>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-blue-200 dark:border-blue-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Code className="w-4 h-4 text-blue-600" />
                              Python
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">The programming language we'll be learning</p>
                            <Badge variant="secondary" className="mt-2">Required</Badge>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-purple-200 dark:border-purple-800">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Book className="w-4 h-4 text-purple-600" />
                              Git
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">Version control for tracking your code changes</p>
                            <Badge variant="secondary" className="mt-2">Recommended</Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="python-windows" className="mt-6">
                    <EditableContent
                      type="title"
                      page="foundations"
                      section="installation-python-windows"
                      contentId={installationContent.pythonWindows?.id}
                      className="text-xl font-semibold mb-4"
                    >
                      <h3>{installationContent.pythonWindows?.title}</h3>
                    </EditableContent>
                    
                    <EditableCodeBlock
                      page="foundations"
                      section="installation-python-windows"
                      code={installationContent.pythonWindows?.code || "# Installation steps will appear here"}
                      language="bash"
                    />
                  </TabsContent>
                  
                  <TabsContent value="python-mac" className="mt-6">
                    <EditableContent
                      type="title"
                      page="foundations"
                      section="installation-python-mac"
                      contentId={installationContent.pythonMac?.id}
                      className="text-xl font-semibold mb-4"
                    >
                      <h3>{installationContent.pythonMac?.title}</h3>
                    </EditableContent>
                    
                    <EditableCodeBlock
                      page="foundations"
                      section="installation-python-mac"
                      code={installationContent.pythonMac?.code || "# Installation steps will appear here"}
                      language="bash"
                    />
                  </TabsContent>
                  
                  <TabsContent value="git-windows" className="mt-6">
                    <EditableContent
                      type="title"
                      page="foundations"
                      section="installation-git-windows"
                      contentId={installationContent.gitWindows?.id}
                      className="text-xl font-semibold mb-4"
                    >
                      <h3>{installationContent.gitWindows?.title}</h3>
                    </EditableContent>
                    
                    <EditableCodeBlock
                      page="foundations"
                      section="installation-git-windows"
                      code={installationContent.gitWindows?.code || "# Installation steps will appear here"}
                      language="bash"
                    />
                  </TabsContent>
                  
                  <TabsContent value="git-mac" className="mt-6">
                    <EditableContent
                      type="title"
                      page="foundations"
                      section="installation-git-mac"
                      contentId={installationContent.gitMac?.id}
                      className="text-xl font-semibold mb-4"
                    >
                      <h3>{installationContent.gitMac?.title}</h3>
                    </EditableContent>
                    
                    <EditableCodeBlock
                      page="foundations"
                      section="installation-git-mac"
                      code={installationContent.gitMac?.code || "# Installation steps will appear here"}
                      language="bash"
                    />
                  </TabsContent>
                  
                  <TabsContent value="verification" className="mt-6">
                    <EditableContent
                      type="title"
                      page="foundations"
                      section="installation-verification"
                      contentId={installationContent.verification?.id}
                      className="text-xl font-semibold mb-4"
                    >
                      <h3>{installationContent.verification?.title}</h3>
                    </EditableContent>
                    
                    <EditableCodeBlock
                      page="foundations"
                      section="installation-verification"
                      code={installationContent.verification?.code || "# Verification steps will appear here"}
                      language="bash"
                    />
                    
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Success!</span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 mt-1">
                        If you see the expected output, your Python environment is ready for programming!
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="editor" className="mt-6">
                    <EditableContent
                      type="title"
                      page="foundations"
                      section="development-environment"
                      contentId={installationContent.devEnvironment?.id}
                      className="text-xl font-semibold mb-4"
                    >
                      <h3>{installationContent.devEnvironment?.title}</h3>
                    </EditableContent>
                    
                    <EditableCodeBlock
                      page="foundations"
                      section="development-environment"
                      code={installationContent.devEnvironment?.code || "# Code editor setup will appear here"}
                      language="bash"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Weekly Python Sessions */}
          <section id="weekly-sessions" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Weekly Python Sessions</h2>
                <p className="text-muted-foreground"></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Session 1 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 1</Badge>
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors">
                    {sessionContent.session1?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session1?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Code Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-1"
                      code={sessionContent.session1?.code || "# Session 1 content"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 2 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 2</Badge>
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-orange-600 transition-colors">
                    Decisions and Alternative Paths
                  </CardTitle>
                  <CardDescription>
                    Master if/else statements with real-world decision making
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer mb-4">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Code Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-2"
                      code={sessionContent.session2?.code || "# Session 2: if/else statements\nage = 18\nif age >= 18:\n    print('You can vote!')\nelse:\n    print('You cannot vote yet.')"}
                      language="python"
                    />
                  </details>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/artifacts/ifelse')}
                      className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      Open Artifact
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Session 3 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 3</Badge>
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-purple-600 transition-colors">
                    {sessionContent.session3?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session3?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Code Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-3"
                      code={sessionContent.session3?.code || "# Session 3 content"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 4 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 4</Badge>
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Book className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {sessionContent.session4?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session4?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Code Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-4"
                      code={sessionContent.session4?.code || "# Session 4 content"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 5 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 5</Badge>
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">
                    {sessionContent.session5?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session5?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Code Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-5"
                      code={sessionContent.session5?.code || "# Session 5 content"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* OOP & Design Patterns Section */}
          <section id="oop-patterns" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">OOP & Design Patterns</h2>
                <p className="text-muted-foreground">Advanced programming concepts and professional patterns</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Session 6 - OOP */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-violet-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 6</Badge>
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-violet-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-violet-600 transition-colors text-lg">
                    {sessionContent.session6?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session6?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View OOP Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-6"
                      code={sessionContent.session6?.code || "# OOP content"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 7 - Complete Project */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 7</Badge>
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-emerald-600 transition-colors text-lg">
                    {sessionContent.session7?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session7?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Complete Project
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-7"
                      code={sessionContent.session7?.code || "# Complete project"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>

              {/* Session 8 - Design Patterns */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-rose-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">Session 8</Badge>
                    <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-rose-600" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-rose-600 transition-colors text-lg">
                    {sessionContent.session8?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session8?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Design Patterns
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-8"
                      code={sessionContent.session8?.code || "# Design patterns"}
                      language="python"
                    />
                  </details>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Python Fundamentals - Story-Driven Approach */}
          <section id="fundamentals" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Python Fundamentals</h2>
              </div>
            </div>

            {/* The Philosophy */}
            <Card className="border-amber-200 dark:border-amber-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Book className="w-5 h-5" />
                  The Journey Begins: Understanding Python's Soul
                </CardTitle>
                <CardDescription className="text-lg">
                  Python is not just a programming language - it's a way of thinking about problems and solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <blockquote className="border-l-4 border-amber-500 pl-4 italic text-muted-foreground">
                    "Learn the Language - and you will be able to speak it in your Homeland.<br/>
                    Learn the Algorithms - and you will understand All Languages."
                  </blockquote>
                  
                  <p className="text-foreground">
                    In the vast landscape of system architectures, Python stands as a bridge between human thought and machine execution. 
                    Before we dive into algorithms and patterns, we must understand Python's unique characteristics - 
                    the very essence that makes it powerful in distributed systems, web applications, and data processing pipelines.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Chapter 1: The Tale of Memory and Identity */}
            <Card className="border-purple-200 dark:border-purple-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  The Tale of Memory and Identity
                </CardTitle>
                <CardDescription>
                  Understanding mutability through the lens of real-world system architecture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Imagine you're building a distributed system where thousands of users are updating a shared configuration. 
                    In this world, some objects are like <strong>immutable contracts</strong> - once signed, they cannot be changed. 
                    Others are like <strong>living documents</strong> that evolve in real-time.
                  </p>
                  
                  <p className="text-muted-foreground">
                    This is the fundamental distinction that shapes how Python manages memory, how objects behave, 
                    and why understanding this concept is crucial for building robust, scalable applications.
                  </p>
                </div>

                {/* Real-World Architecture Example */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">🏗️ Real-World Scenario: Microservices Configuration</h4>
                  <EditableCodeBlock
                    title="Configuration Management in Distributed Systems"
                    page="foundations"
                    section="config-story"
                    code={`# Imagine a microservice handling user preferences
# The service ID (immutable) vs user preferences (mutable)

class MicroserviceConfig:
    def __init__(self, service_id, initial_config):
        # Service ID is immutable - like a contract
        self._service_id = service_id  # String (immutable)
        
        # User preferences are mutable - they evolve
        self.user_preferences = initial_config  # Dict (mutable)
    
    @property
    def service_id(self):
        """Service ID cannot be changed once set"""
        return self._service_id
    
    def update_preference(self, user_id, key, value):
        """Preferences can be modified in-place"""
        if user_id not in self.user_preferences:
            self.user_preferences[user_id] = {}
        self.user_preferences[user_id][key] = value

# The Story Unfolds
config = MicroserviceConfig("user-pref-service-v1", {})

print(f"Service ID: {config.service_id}")
print(f"Initial config ID: {id(config.user_preferences)}")

# Add user preferences (modifying existing object)
config.update_preference("user123", "theme", "dark")
config.update_preference("user123", "notifications", True)

print(f"After updates ID: {id(config.user_preferences)}")  # Same object!
print(f"Preferences: {config.user_preferences}")

# What happens if we try to change the service_id?
# config.service_id = "new-service"  # This would fail!`}
                    language="python"
                  />
                </div>

                {/* The Memory Story */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-6 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">🧠 The Memory Story: Why This Matters</h4>
                  <EditableCodeBlock
                    title="Memory Behavior in Action"
                    page="foundations"
                    section="memory-story"
                    code={`# The Tale of Two Data Types: Immutable vs Mutable

# === IMMUTABLE: The Unchanging Contract ===
# When you "modify" an immutable object, Python creates a new one

api_endpoint = "https://api.v1.company.com"
print(f"Original endpoint ID: {id(api_endpoint)}")

# "Updating" the endpoint (but really creating a new string)
api_endpoint = api_endpoint.replace("v1", "v2")
print(f"New endpoint ID: {id(api_endpoint)}")  # Different ID!

# === MUTABLE: The Living Document ===
# When you modify a mutable object, it stays the same object

user_sessions = {"active": 0, "total": 0}
print(f"Sessions object ID: {id(user_sessions)}")

# Updating session count (modifying the same object)
user_sessions["active"] += 5
user_sessions["total"] += 5
print(f"Same sessions ID: {id(user_sessions)}")  # Same ID!

# === The Critical Insight for System Design ===
# This behavior affects how data flows through your application!

def dangerous_cache(cache_key, data, shared_cache={}):  # DANGER!
    """This function has a hidden trap - can you spot it?"""
    shared_cache[cache_key] = data
    return shared_cache

# Watch what happens...
cache1 = dangerous_cache("user1", {"name": "Alice"})
cache2 = dangerous_cache("user2", {"name": "Bob"})

print(f"Cache1: {cache1}")  # Contains BOTH users!
print(f"Cache2: {cache2}")  # Same object as cache1!
print(f"Same cache object? {cache1 is cache2}")  # True - SURPRISE!`}
                    language="python"
                  />
                </div>

                {/* The Safe Pattern */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">✅ The Safe Pattern: Building Robust Systems</h4>
                  <EditableCodeBlock
                    title="Production-Ready Patterns"
                    page="foundations"
                    section="safe-patterns"
                    code={`# How to handle mutability like a pro in production systems

class UserSessionManager:
    """A production-ready session manager that handles mutability correctly"""
    
    def __init__(self):
        self._sessions = {}  # Mutable, but encapsulated
    
    def create_session(self, user_id, initial_data=None):
        """Safe session creation with proper default handling"""
        # Never use mutable defaults! Create new dict each time
        session_data = initial_data.copy() if initial_data else {}
        
        # Add metadata that won't change (immutable-like behavior)
        session_data['created_at'] = time.time()
        session_data['session_id'] = f"sess_{user_id}_{int(time.time())}"
        
        self._sessions[user_id] = session_data
        return session_data.copy()  # Return a copy, not the original!
    
    def update_session(self, user_id, key, value):
        """Safe session updates"""
        if user_id in self._sessions:
            # Modify the existing session object
            self._sessions[user_id][key] = value
            return True
        return False
    
    def get_session_snapshot(self, user_id):
        """Return a snapshot (copy) to prevent external mutation"""
        session = self._sessions.get(user_id)
        return session.copy() if session else None

# Usage in a web application context
import time

# Initialize the manager
session_mgr = UserSessionManager()

# Create sessions for different users
alice_session = session_mgr.create_session("alice", {"role": "admin"})
bob_session = session_mgr.create_session("bob", {"role": "user"})

print(f"Alice session: {alice_session}")
print(f"Bob session: {bob_session}")

# Update Alice's session
session_mgr.update_session("alice", "last_action", "login")

# Get snapshots (safe copies)
alice_snapshot = session_mgr.get_session_snapshot("alice")
alice_snapshot["malicious_change"] = "hacker_was_here"  # This won't affect the real session!

print(f"Real Alice session: {session_mgr.get_session_snapshot('alice')}")
print(f"Modified snapshot: {alice_snapshot}")`}
                    language="python"
                  />
                </div>

                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                        The System Architecture Lesson
                      </h5>
                      <p className="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
                        Understanding mutability isn't just about Python syntax - it's about designing systems that behave predictably under load. 
                        In distributed systems, unexpected mutations can lead to race conditions, data corruption, and security vulnerabilities. 
                        Master this concept, and you'll build more robust, scalable applications.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </section>

          {/* Python Execution: How Python Works Under the Hood */}
          <section id="python-execution" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">How Python Executes Code</h2>
                <p className="text-muted-foreground">Understanding the interpreter and performance implications</p>
              </div>
            </div>

            {/* The Two-Step Dance */}
            <Card className="border-orange-200 dark:border-orange-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Zap className="w-5 h-5" />
                  The Two-Step Dance: Compile, Then Execute
                </CardTitle>
                <CardDescription className="text-lg">
                  Python isn't as straightforward as it seems - there's a hidden compilation step that affects everything.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Unlike languages like C++ that compile directly to machine code, Python follows a unique two-step process: 
                    <strong>first compilation to bytecode</strong>, then <strong>interpretation by the Python Virtual Machine (PVM)</strong>.
                  </p>
                  
                  <p className="text-muted-foreground">
                    This design choice gives Python its flexibility and cross-platform nature, but also introduces specific 
                    performance characteristics and limitations compared to fully compiled languages.
                  </p>
                </div>

                {/* The Process Visualization */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-6 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">🔄 The Execution Pipeline</h4>
                  <EditableCodeBlock
                    title="What Happens When You Run Python Code"
                    page="foundations"
                    section="execution-pipeline"
                    code={`# Step 1: Your Python source code
def calculate_user_score(activities, weights):
    """Calculate weighted score for user activities"""
    total_score = 0
    for activity, count in activities.items():
        weight = weights.get(activity, 1.0)
        total_score += count * weight
    return total_score

# Step 2: Python compiler creates bytecode (automatically)
# You can see this with the dis module:

import dis

print("=== BYTECODE GENERATED ===")
dis.dis(calculate_user_score)

# Step 3: Python Virtual Machine executes bytecode
# This is what actually runs when you call the function

activities = {"login": 10, "post": 5, "comment": 20}
weights = {"login": 1.0, "post": 2.5, "comment": 0.5}

result = calculate_user_score(activities, weights)
print(f"User score: {result}")

# Real-world implication: .pyc files
# Python saves compiled bytecode in __pycache__ directories
# This is why your app starts faster the second time!`}
                    language="python"

                  />
                </div>

                {/* Performance Implications */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 p-6 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">⚡ Performance Reality Check</h4>
                  <EditableCodeBlock
                    title="Why Python Has Parallelism Limitations"
                    page="foundations"
                    section="performance-reality"
                    code={`# The Global Interpreter Lock (GIL) - Python's Double-Edged Sword

import threading
import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def cpu_intensive_task(n):
    """A CPU-bound task that demonstrates GIL limitations"""
    count = 0
    for i in range(n):
        count += i * i
    return count

def measure_execution_time(func, *args):
    start = time.time()
    result = func(*args)
    end = time.time()
    return result, end - start

# Single-threaded execution
print("=== SINGLE THREAD ===")
result, time_taken = measure_execution_time(cpu_intensive_task, 1000000)
print(f"Time: {time_taken:.3f}s")

# Multi-threaded execution (limited by GIL for CPU tasks)
print("=== MULTIPLE THREADS (GIL Limited) ===")
start = time.time()
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(cpu_intensive_task, 250000) for _ in range(4)]
    results = [f.result() for f in futures]
end = time.time()
print(f"Time: {end - start:.3f}s")  # Not much faster!

# Multi-process execution (bypasses GIL)
print("=== MULTIPLE PROCESSES (GIL Bypassed) ===")
start = time.time()
with ProcessPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(cpu_intensive_task, 250000) for _ in range(4)]
    results = [f.result() for f in futures]
end = time.time()
print(f"Time: {end - start:.3f}s")  # Actually faster!

# Key Insight: Threading works great for I/O bound tasks!
import requests

def io_bound_task(url):
    """I/O bound tasks benefit from threading"""
    response = requests.get(url)
    return len(response.content)

# This WILL benefit from threading because threads can wait
# while others work (I/O doesn't need the GIL constantly)`}
                    language="python"

                  />
                </div>

                {/* Real-World Applications */}
                <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20 p-6 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">🏗️ Real-World Applications</h4>
                  <EditableCodeBlock
                    title="Choosing the Right Concurrency Strategy"
                    page="foundations"
                    section="concurrency-strategy"
                    code={`# Understanding when to use what in production systems

# === WEB SERVERS ===
# Python web frameworks like FastAPI and Django handle this well:

async def handle_user_request(user_id: str):
    """Async/await is perfect for I/O bound web operations"""
    # Fetch user data (I/O bound - great for async)
    user_data = await fetch_user_from_db(user_id)
    
    # Call external API (I/O bound - async shines here)
    preferences = await fetch_user_preferences_api(user_id)
    
    # Generate response (CPU light - no GIL issues)
    return build_response(user_data, preferences)

# === DATA PROCESSING ===
# For heavy computations, multiprocessing is your friend:

from multiprocessing import Pool
import pandas as pd

def process_large_dataset(filename):
    """CPU-intensive data processing"""
    df = pd.read_csv(filename)
    
    # Split data into chunks for parallel processing
    chunks = [df[i:i+1000] for i in range(0, len(df), 1000)]
    
    # Process chunks in parallel (bypasses GIL)
    with Pool() as pool:
        processed_chunks = pool.map(heavy_data_transformation, chunks)
    
    return pd.concat(processed_chunks)

# === MICROSERVICES ARCHITECTURE ===
# Python's strength: rapid development and deployment

class UserActivityService:
    """Microservice that leverages Python's strengths"""
    
    async def track_activity(self, user_id: str, activity: dict):
        """I/O bound - perfect for Python async"""
        await self.save_to_database(user_id, activity)
        await self.update_real_time_analytics(activity)
        await self.trigger_notifications(user_id, activity)
    
    def generate_insights(self, user_data: list):
        """CPU intensive - use multiprocessing for large datasets"""
        if len(user_data) > 10000:
            return self.parallel_insight_generation(user_data)
        else:
            return self.single_process_insights(user_data)

# Key Takeaway: Know your workload!
# - I/O bound? Use async/await or threading
# - CPU bound? Use multiprocessing
# - Mixed? Design your architecture accordingly`}
                    
                    language="python"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    The Bridge to Data Science
                  </h5>
                  <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                    Understanding Python's execution model is crucial as we move into data analysis and calculus. 
                    Libraries like NumPy and Pandas are optimized to work around Python's limitations, using compiled C code under the hood. 
                    This knowledge prepares you for the next chapter: <strong>Data & Calculus</strong>, where performance matters.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Sidebar with Navigation and TOC */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Course Navigation */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Continue Learning</h3>
              <CourseNavigation
                nextCourse={{
                  path: "/data-calculus",
                  title: "Data: Calculus"
                }}
              />
            </div>

            {/* Table of Contents */}
            <div className="bg-background border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">On This Page</h3>
              <TableOfContents items={tocItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundations;