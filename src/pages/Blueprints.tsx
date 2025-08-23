import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useContent } from '@/components/ContentProvider';
import { Link } from 'react-router-dom';
import TableOfContents from '../components/TableOfContents';
import EditablePageHeader from '../components/EditablePageHeader';
import EditableCodeBlock from '../components/EditableCodeBlock';
import EditableContent from '../components/EditableContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { seedInitialContent } from '@/migrations/initialContentData';
import { ArrowRight, Code, BookOpen, Zap, Target } from 'lucide-react';
import blueprintsHero from '@/assets/blueprints-hero.jpg';
import blueprintsFoundation from '@/assets/blueprints-foundation.jpg';

const Blueprints = () => {
  const { isAdmin } = useAuth();
  const { content, loading, getContent } = useContent();
  const [tocItems, setTocItems] = useState([
    { id: 'python-essentials', title: 'Python Essentials' },
    { id: 'variables-basic-types', title: 'Variables & Basic Types' },
    { id: 'collections', title: 'Collections' },
    { id: 'control-flow', title: 'Control Flow' },
    { id: 'functions', title: 'Functions' },
    { id: 'string-manipulation', title: 'String Manipulation' },
    { id: 'file-handling', title: 'File Handling' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'list-comprehensions', title: 'List Comprehensions' },
    { id: 'mastery-path', title: 'Advanced Blueprints' }
  ]);

  // Initialize content if admin and content is empty
  useEffect(() => {
    if (isAdmin && !loading && Object.keys(content).length === 0) {
      seedInitialContent();
    }
  }, [isAdmin, loading, content]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create a staggered animation effect for the sections
  useEffect(() => {
    const sections = document.querySelectorAll('.concept-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <EditablePageHeader 
        page="blueprints" 
        defaultTitle="Development Blueprints" 
        defaultSubtitle="Architectural patterns and essential code structures for building robust Python applications."
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${blueprintsHero})` }}
        />
        <div className="relative bg-gradient-to-br from-background via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                The Blueprint Collection
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Master the architectural patterns and coding structures that form the foundation of professional Python development. 
                From essential syntax to advanced design patterns, these blueprints guide your journey from beginner to expert.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-600" />
                      Essential Blueprints
                    </CardTitle>
                    <CardDescription>
                      Core Python patterns and syntax structures for everyday development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Variables, collections, control flow, functions, and essential patterns that every Python developer needs to master.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('python-essentials')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore Essentials
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Advanced Blueprints
                    </CardTitle>
                    <CardDescription>
                      Professional patterns for complex applications and system architecture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Metaclasses, descriptors, concurrency patterns, and advanced architectural designs for production systems.
                    </p>
                    <Link to="/blueprints_mastery">
                      <Button variant="outline" size="sm">
                        Advanced Patterns <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContents items={tocItems} />
        </div>
        
        {/* Main content */}
        <div className="flex-grow max-w-4xl">
          {/* Introduction Section */}
          <section id="python-essentials" className="concept-card mb-16">
            <div 
              className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-5"
                style={{ backgroundImage: `url(${blueprintsFoundation})` }}
              />
              <div className="relative">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Python Essentials: The Foundation Blueprints
                </h2>
                <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                  Every master architect begins with understanding the fundamental building blocks. These essential 
                  Python blueprints provide the structural patterns you'll use in every project, from simple scripts 
                  to enterprise applications.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">Syntax Mastery</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Clean, Pythonic code patterns</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <Zap className="w-8 h-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold text-purple-800 dark:text-purple-200">Performance</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Efficient algorithms and structures</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <Target className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="font-semibold text-green-800 dark:text-green-200">Best Practices</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">Industry-standard approaches</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-muted-foreground">
                  "The blueprint is the bridge between imagination and reality. Master the patterns, 
                  and you master the craft." - Software Architecture Principles
                </blockquote>
              </div>
            </div>
          </section>

          <section id="variables-basic-types" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="variables-basic-types" 
              contentId={getContent('blueprints', 'variables-basic-types')?.id}
              className="concept-title"
            >
              <h2>Variables & Basic Types</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="variables-basic-types" 
              contentId={getContent('blueprints', 'variables-basic-types')?.id}
              className="mb-4"
            >
              <p>The foundation of all data manipulation - Python's dynamic typing system provides flexibility without sacrificing clarity.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Variable Declaration Blueprint" 
              code={`# No type declarations required - Python infers types dynamically
name = "Python"  # string
age = 30         # integer
price = 19.99    # float
is_valid = True  # boolean (note the capitalization)

# Multiple assignment pattern
x, y, z = 1, 2, 3

# Type checking for debugging and validation
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>
print(type(price)) # <class 'float'>

# Type hints for better code documentation (Python 3.5+)
def calculate_tax(price: float, rate: float) -> float:
    return price * rate

# Modern type annotation pattern
from typing import Union, Optional, List

def process_user_data(
    user_id: int, 
    name: str, 
    email: Optional[str] = None,
    tags: List[str] = None
) -> dict:
    """
    Blueprint for type-safe function definitions
    Provides clarity and enables better IDE support
    """
    if tags is None:
        tags = []
    
    return {
        "id": user_id,
        "name": name,
        "email": email,
        "tags": tags
    }`}
              page="blueprints"
              section="variables-basic-types"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Dynamic foundation with optional type contracts</div>
            <p className="use-case">Use for flexible variable assignments with optional type safety for larger codebases.</p>
          </section>

          
          <section id="collections" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="collections" 
              contentId={getContent('blueprints', 'collections')?.id}
              className="concept-title"
            >
              <h2>Collection Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="collections" 
              contentId={getContent('blueprints', 'collections')?.id}
              className="mb-4"
            >
              <p>Master the fundamental data structures that power every Python application.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="List Operations Blueprint"
              code={`# Creating and manipulating lists - the workhorse of Python
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Indexing and slicing patterns
first = numbers[0]      # 1
last = numbers[-1]      # 5
subset = numbers[1:4]   # [2, 3, 4]
reversed_list = numbers[::-1]  # [5, 4, 3, 2, 1]

# Essential list methods for data manipulation
numbers.append(6)        # Add to end
numbers.insert(1, 10)    # Insert at position
popped = numbers.pop()   # Remove and return last
numbers.remove(10)       # Remove first occurrence
length = len(numbers)    # Get size

# List comprehension blueprint - Pythonic data transformation
squares = [x**2 for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]
processed = [func(x) for x in data if condition(x)]

# Advanced list patterns
from collections import deque
# Use deque for efficient front/back operations
queue = deque([1, 2, 3])
queue.appendleft(0)     # Add to front efficiently
queue.popleft()         # Remove from front efficiently`}
              page="blueprints"
              section="collections-lists"
            />
            
            <EditableCodeBlock
              title="Dictionary Patterns Blueprint"
              code={`# Dictionary - key-value mapping for fast lookups
user = {
    "name": "Alice",
    "age": 28,
    "is_admin": False,
    "permissions": ["read", "write"]
}

# Safe access patterns
name = user.get("name", "Unknown")  # Default if key missing
role = user.get("role", "User")     # Safe fallback

# Dictionary methods for data processing
keys = user.keys()          # All keys
values = user.values()      # All values
items = user.items()        # Key-value pairs

# Dictionary comprehensions for data transformation
squares = {x: x*x for x in range(6)}
filtered = {k: v for k, v in data.items() if condition(v)}

# Advanced dictionary patterns
from collections import defaultdict, Counter

# Auto-initializing dictionary
groups = defaultdict(list)
groups['category1'].append('item')  # No KeyError

# Counting pattern
counts = Counter(['apple', 'banana', 'apple', 'cherry'])
print(counts['apple'])  # 2`}
              page="blueprints"
              section="collections-dictionaries"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Structured data containers with efficient access patterns</div>
            <p className="use-case">Essential for organizing and manipulating data in any Python application.</p>
          </section>

          {/* Mastery Path Section */}
          <section id="mastery-path" className="concept-card">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-border">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Ready for Advanced Blueprints?
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                You've mastered the essential patterns. Now dive into the advanced architectural blueprints that 
                separate senior developers from the rest. Discover metaclasses, descriptors, concurrency patterns, 
                and the sophisticated designs used in production systems.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                    Advanced Patterns
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Metaclasses & Class Factories</li>
                    <li>• Descriptors & Property Systems</li>
                    <li>• Advanced Decorators</li>
                    <li>• Abstract Base Classes</li>
                  </ul>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-800 dark:text-indigo-200">
                    Production Systems
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Concurrency & Parallelism</li>
                    <li>• Testing Frameworks</li>
                    <li>• Package Architecture</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/blueprints_mastery">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Explore Advanced Blueprints <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Blueprints;
