import React, { useState, useEffect } from 'react';
import { useContent } from '../components/ContentProvider';
import EditablePageHeader from '../components/EditablePageHeader';
import EditableContent from '../components/EditableContent';
import EditableCodeBlock from '../components/EditableCodeBlock';
import TableOfContents from '../components/TableOfContents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Lightbulb, Wrench, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Foundations = () => {
  const { getContent, loading } = useContent();
  
  const [tocItems] = useState([
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'weekly-sessions', title: 'Weekly Python Sessions' },
    { id: 'oop-patterns', title: 'OOP & Design Patterns' },
    { id: 'fundamentals', title: 'Advanced Fundamentals' }
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
      <EditablePageHeader 
        page="foundations"
        defaultTitle="Python Foundations" 
        defaultSubtitle="Master Python from the ground up - from installation to advanced concepts"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main content */}
        <div className="flex-grow max-w-4xl">
          
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
                <p className="text-muted-foreground">Complete Python curriculum with real-world examples</p>
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
                    {sessionContent.session2?.title}
                  </CardTitle>
                  <CardDescription>
                    {sessionContent.session2?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-primary hover:text-primary/80 mb-3">
                      View Code Examples
                    </summary>
                    <EditableCodeBlock
                      page="foundations"
                      section="session-2"
                      code={sessionContent.session2?.code || "# Session 2 content"}
                      language="python"
                    />
                  </details>
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

          {/* Legacy content - keeping the advanced concepts */}
          <section id="fundamentals" className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Python Fundamentals</h2>
                <p className="text-muted-foreground">Deep understanding of Python's unique characteristics</p>
              </div>
            </div>

            {/* Mutability Section */}
            <Card className="concept-card border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="concept-title">Mutability & Immutability</CardTitle>
                <CardDescription>Understanding which objects can be changed after creation and which cannot.</CardDescription>
              </CardHeader>
              <CardContent>
                <EditableCodeBlock
                  title="Mutable vs Immutable Types"
                  page="foundations"
                  section="mutability-demo"
                  code={`# Immutable types: int, float, bool, str, tuple, frozenset
# Mutable types: list, dict, set

# Immutable example - strings
name = "Python"
print(id(name))  # Check the object's identity
name = name + " Programming"  # Creates a NEW string object
print(id(name))  # Different ID

# Mutable example - lists
numbers = [1, 2, 3]
print(id(numbers))  # Check the object's identity
numbers.append(4)   # Modifies the SAME list object
print(id(numbers))  # Same ID

# Avoiding mutable default arguments
def bad_practice(new_item, items=[]):  # items is created ONCE
    items.append(new_item)
    return items

print(bad_practice("a"))  # ["a"]
print(bad_practice("b"))  # ["a", "b"] - Surprise!

# Better approach
def good_practice(new_item, items=None):
    if items is None:
        items = []
    items.append(new_item)
    return items`}
                />
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Key Point:</strong> Understanding mutability is crucial for avoiding unexpected behavior, especially in function parameters.
                  </p>
                </div>
              </CardContent>
            </Card>
            
          </section>
        </div>

        {/* Table of Contents Sidebar */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-8">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundations;
