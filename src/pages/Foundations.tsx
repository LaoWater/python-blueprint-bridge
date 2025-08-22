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
    { id: 'python-basics', title: 'Python Basics' },
    { id: 'core-concepts', title: 'Core Concepts' },
    { id: 'fundamentals', title: 'Python Fundamentals' },
    { id: 'advanced-topics', title: 'Advanced Topics' }
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

          {/* Python Basics Section */}
          <section id="python-basics" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Python Basics</h2>
                <p className="text-muted-foreground">Learn the fundamental building blocks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Variables & Data Types
                    <ChevronRight className="w-4 h-4" />
                  </CardTitle>
                  <CardDescription>
                    Strings, numbers, booleans, and basic operations
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Input & Output
                    <ChevronRight className="w-4 h-4" />
                  </CardTitle>
                  <CardDescription>
                    Getting user input and displaying results
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Core Concepts Section */}
          <section id="core-concepts" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Core Concepts</h2>
                <p className="text-muted-foreground">Essential programming concepts</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Control Flow</CardTitle>
                  <CardDescription>if/else, loops, and logic</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Functions</CardTitle>
                  <CardDescription>Reusable code blocks</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Collections</CardTitle>
                  <CardDescription>Lists, dictionaries, sets</CardDescription>
                </CardHeader>
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
