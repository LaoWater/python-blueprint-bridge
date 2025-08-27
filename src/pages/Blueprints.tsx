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
                    <Link to="/git-blueprints">
                        <Button variant="outline" size="sm" className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40">
                          Git Commands <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
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

          <section id="control-flow" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="control-flow" 
              contentId={getContent('blueprints', 'control-flow')?.id}
              className="concept-title"
            >
              <h2>Control Flow Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="control-flow" 
              contentId={getContent('blueprints', 'control-flow')?.id}
              className="mb-4"
            >
              <p>Master the decision-making patterns that control program execution flow and logic branching.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Conditional Logic Patterns"
              code={`# Basic conditional blueprints
# Professional tip: Use early returns to reduce nesting depth
def process_user_request(user, action):
    """Clean conditional logic with early returns - production pattern"""
    
    # Guard clauses - fail fast pattern
    if not user:
        return {"error": "User not provided", "status": 400}
    
    if not user.is_authenticated:
        return {"error": "Authentication required", "status": 401}
    
    if not user.has_permission(action):
        return {"error": "Insufficient permissions", "status": 403}
    
    # Main business logic - only when all conditions pass
    return execute_action(user, action)

# Advanced conditional patterns using walrus operator (Python 3.8+)
def validate_and_process_data(data):
    """Modern Python conditional patterns"""
    
    # Walrus operator for assignment within conditions
    if (cleaned := clean_data(data)) and len(cleaned) > 0:
        return process_data(cleaned)
    
    # Match-case pattern (Python 3.10+) - cleaner than if-elif chains
    match data.get('type'):
        case 'user':
            return process_user_data(data)
        case 'order':
            return process_order_data(data)
        case 'product':
            return process_product_data(data)
        case _:  # Default case
            return {"error": "Unknown data type"}

# Professional error handling with conditional logic
def safe_divide(a, b):
    """Production-ready division with comprehensive error handling"""
    try:
        # Type validation
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise TypeError("Arguments must be numbers")
        
        # Business logic validation
        if b == 0:
            raise ValueError("Division by zero not allowed")
        
        # Edge case handling
        if abs(b) < 1e-10:  # Very small numbers
            raise ValueError("Division by very small number may cause precision issues")
        
        return a / b
        
    except (TypeError, ValueError) as e:
        # Log error in production
        logger.error(f"Division error: {e}")
        return None`}
              page="blueprints"
              section="control-flow"
            />
            
            <EditableCodeBlock
              title="Loop Patterns & Iteration"
              code={`# Professional loop patterns for data processing
def process_large_dataset(data):
    """Efficient loop patterns for production systems"""
    
    # Enumerate for index tracking - avoid manual counters
    for index, item in enumerate(data):
        if index % 1000 == 0:  # Progress reporting
            print(f"Processed {index} items")
        
        process_item(item)
    
    # Zip for parallel iteration - clean and efficient
    names = ["Alice", "Bob", "Charlie"]
    ages = [25, 30, 35]
    for name, age in zip(names, ages):
        create_user(name, age)
    
    # Dictionary iteration patterns - modern Python style
    user_data = {"name": "Alice", "age": 25, "city": "NYC"}
    
    # Iterate over key-value pairs (preferred)
    for key, value in user_data.items():
        validate_field(key, value)
    
    # When you only need values
    for value in user_data.values():
        sanitize_value(value)

# Advanced iteration with itertools - production patterns
from itertools import islice, chain, groupby

def batch_process_data(data, batch_size=100):
    """Process data in batches - memory efficient for large datasets"""
    iterator = iter(data)
    while batch := list(islice(iterator, batch_size)):
        # Process each batch
        yield process_batch(batch)

def group_data_by_category(data):
    """Group data efficiently - used in analytics and reporting"""
    # Sort first (required for groupby)
    sorted_data = sorted(data, key=lambda x: x['category'])
    
    for category, group in groupby(sorted_data, key=lambda x: x['category']):
        group_list = list(group)
        yield category, group_list

# Professional loop control patterns
def robust_data_processor(items):
    """Production loop with proper error handling and logging"""
    processed = 0
    errors = 0
    
    for item in items:
        try:
            # Process item
            result = complex_processing(item)
            processed += 1
            
            # Early termination on critical conditions
            if result.critical_error:
                logger.critical(f"Critical error processing {item.id}")
                break
                
        except ProcessingError as e:
            errors += 1
            logger.warning(f"Failed to process {item.id}: {e}")
            
            # Skip to next item - don't let one failure stop everything
            continue
            
        except Exception as e:
            # Unexpected errors - log and potentially stop
            logger.error(f"Unexpected error: {e}")
            if errors > 10:  # Circuit breaker pattern
                logger.error("Too many errors, stopping processing")
                break
    
    return {"processed": processed, "errors": errors}`}
              page="blueprints"
              section="control-flow-loops"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Clean control structures with robust error handling</div>
            <p className="use-case">Essential for building reliable applications with proper validation, error handling, and efficient data processing.</p>
          </section>

          <section id="functions" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="functions" 
              contentId={getContent('blueprints', 'functions')?.id}
              className="concept-title"
            >
              <h2>Function Design Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="functions" 
              contentId={getContent('blueprints', 'functions')?.id}
              className="mb-4"
            >
              <p>Master the art of function design - from simple utilities to complex functional programming patterns.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Professional Function Patterns"
              code={`# Function signature patterns - production best practices
from typing import Optional, List, Dict, Callable, Union
from functools import wraps
import logging

def process_payment(
    amount: float,
    currency: str = "USD",
    payment_method: str = "card",
    metadata: Optional[Dict] = None,
    callback: Optional[Callable] = None
) -> Dict[str, Union[str, float, bool]]:
    """
    Professional function design principles:
    1. Clear, descriptive name
    2. Type hints for all parameters and return
    3. Sensible defaults
    4. Optional parameters last
    5. Comprehensive docstring
    6. Single responsibility
    """
    if metadata is None:
        metadata = {}
    
    # Input validation
    if amount <= 0:
        raise ValueError("Amount must be positive")
    
    if currency not in ["USD", "EUR", "GBP"]:
        raise ValueError(f"Unsupported currency: {currency}")
    
    # Main business logic
    transaction_id = generate_transaction_id()
    success = charge_payment(amount, currency, payment_method)
    
    result = {
        "transaction_id": transaction_id,
        "amount": amount,
        "currency": currency,
        "success": success,
        "metadata": metadata
    }
    
    # Optional callback execution
    if callback and callable(callback):
        callback(result)
    
    return result

# Advanced parameter patterns
def flexible_api_call(*args, **kwargs):
    """
    *args: Accept variable number of positional arguments
    **kwargs: Accept variable number of keyword arguments
    Professional tip: Use these sparingly and document well
    """
    # Process positional arguments
    if args:
        primary_data = args[0]
        additional_data = args[1:] if len(args) > 1 else []
    
    # Process keyword arguments
    options = {
        "timeout": kwargs.get("timeout", 30),
        "retries": kwargs.get("retries", 3),
        "debug": kwargs.get("debug", False)
    }
    
    # Extract known parameters, pass unknown ones through
    api_params = {k: v for k, v in kwargs.items() 
                  if k not in ["timeout", "retries", "debug"]}
    
    return make_request(primary_data, options, api_params)

# Higher-order functions - functions that work with other functions
def create_validator(min_length: int, max_length: int) -> Callable[[str], bool]:
    """Factory function that creates validation functions"""
    
    def validator(value: str) -> bool:
        return min_length <= len(value) <= max_length
    
    # Add metadata to the function for debugging
    validator.min_length = min_length
    validator.max_length = max_length
    validator.__name__ = f"length_validator_{min_length}_{max_length}"
    
    return validator

# Usage: Create specific validators
email_validator = create_validator(5, 100)
password_validator = create_validator(8, 64)

def with_retry(max_attempts: int = 3, delay: float = 1.0):
    """Decorator factory for adding retry logic to functions"""
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        time.sleep(delay)
                        logging.warning(f"Attempt {attempt + 1} failed, retrying...")
                    else:
                        logging.error(f"All {max_attempts} attempts failed")
            
            # Re-raise the last exception if all attempts failed
            raise last_exception
        
        return wrapper
    return decorator

# Professional function composition patterns
def compose(*functions):
    """Compose functions right to left - functional programming pattern"""
    return lambda x: reduce(lambda acc, func: func(acc), reversed(functions), x)

# Example: data processing pipeline
clean_data = lambda x: x.strip().lower()
validate_email = lambda x: x if "@" in x else None
format_email = lambda x: f"<{x}>" if x else None

# Compose functions into a pipeline
email_processor = compose(format_email, validate_email, clean_data)

# Usage
result = email_processor("  ALICE@EXAMPLE.COM  ")  # "<alice@example.com>"`}
              page="blueprints"
              section="functions"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Clean function design with proper typing and composition</div>
            <p className="use-case">Foundation for building maintainable, testable, and reusable code components in any application.</p>
          </section>

          <section id="string-manipulation" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="string-manipulation" 
              contentId={getContent('blueprints', 'string-manipulation')?.id}
              className="concept-title"
            >
              <h2>String Processing Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="string-manipulation" 
              contentId={getContent('blueprints', 'string-manipulation')?.id}
              className="mb-4"
            >
              <p>Master text processing patterns for data cleaning, parsing, and user input handling in production systems.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Production String Processing"
              code={`import re
from typing import List, Optional, Dict
import unicodedata

class TextProcessor:
    """Professional text processing patterns used in production systems"""
    
    @staticmethod
    def clean_user_input(text: str) -> str:
        """
        Robust input cleaning for user-generated content
        Production tip: Always sanitize user input
        """
        if not isinstance(text, str):
            return ""
        
        # Remove leading/trailing whitespace
        text = text.strip()
        
        # Normalize unicode characters (handle accents, special chars)
        text = unicodedata.normalize('NFKD', text)
        
        # Remove or replace problematic characters
        text = re.sub(r'[^\w\s\-_.@]', '', text)
        
        # Collapse multiple whitespace into single space
        text = re.sub(r'\s+', ' ', text)
        
        return text
    
    @staticmethod
    def extract_emails(text: str) -> List[str]:
        """Extract valid email addresses from text"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        return re.findall(email_pattern, text)
    
    @staticmethod
    def parse_name_components(full_name: str) -> Dict[str, str]:
        """
        Parse full name into components - common in user management systems
        Production note: Handle edge cases and international names
        """
        if not full_name or not full_name.strip():
            return {"first": "", "middle": "", "last": ""}
        
        # Clean and split
        parts = full_name.strip().split()
        
        if len(parts) == 1:
            return {"first": parts[0], "middle": "", "last": ""}
        elif len(parts) == 2:
            return {"first": parts[0], "middle": "", "last": parts[1]}
        else:
            # Handle multiple middle names
            return {
                "first": parts[0],
                "middle": " ".join(parts[1:-1]),
                "last": parts[-1]
            }

# Advanced string formatting patterns
def format_currency(amount: float, currency: str = "USD") -> str:
    """Production-ready currency formatting with locale support"""
    
    currency_symbols = {
        "USD": "$", "EUR": "€", "GBP": "£", "JPY": "¥"
    }
    
    symbol = currency_symbols.get(currency, currency)
    
    # Format with proper decimal places
    if currency == "JPY":  # Yen doesn't use decimals
        return f"{symbol}{amount:,.0f}"
    else:
        return f"{symbol}{amount:,.2f}"

# Modern string formatting with f-strings (Python 3.6+)
def generate_user_report(user: dict) -> str:
    """
    Modern string formatting patterns for reports and templates
    Production tip: f-strings are fastest for string interpolation
    """
    
    # Multi-line f-string with expressions
    report = f"""
    USER REPORT
    ===========
    Name: {user['name'].title()}
    Email: {user['email'].lower()}
    Status: {'ACTIVE' if user.get('active', False) else 'INACTIVE'}
    Last Login: {user.get('last_login', 'Never').strftime('%Y-%m-%d') if user.get('last_login') else 'Never'}
    Account Value: {format_currency(user.get('balance', 0.0))}
    
    Summary: User {user['name']} has {'an active' if user.get('active') else 'an inactive'} account
    with {len(user.get('orders', []))} orders.
    """
    
    return report.strip()

# Professional text search and replacement patterns
def smart_replace(text: str, replacements: Dict[str, str], case_sensitive: bool = False) -> str:
    """
    Intelligent text replacement with multiple patterns
    Used in template engines and content management systems
    """
    
    # Sort by length (longest first) to avoid partial replacements
    sorted_replacements = sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True)
    
    result = text
    for old, new in sorted_replacements:
        if case_sensitive:
            result = result.replace(old, new)
        else:
            # Case-insensitive replacement using regex
            pattern = re.escape(old)
            result = re.sub(pattern, new, result, flags=re.IGNORECASE)
    
    return result

# Template processing - production pattern for dynamic content
class SimpleTemplate:
    """
    Simple but robust template processor for dynamic content generation
    Production note: For complex templating, use Jinja2 or similar
    """
    
    def __init__(self, template: str):
        self.template = template
        # Find all variables in format {variable_name}
        self.variables = set(re.findall(r'\{(\w+)\}', template))
    
    def render(self, context: Dict[str, str]) -> str:
        """Render template with provided context"""
        result = self.template
        
        for var in self.variables:
            placeholder = f"{{{var}}}"
            value = context.get(var, f"[MISSING: {var}]")
            result = result.replace(placeholder, str(value))
        
        return result
    
    def get_required_variables(self) -> List[str]:
        """Return list of required template variables"""
        return list(self.variables)

# Usage examples
template = SimpleTemplate("Hello {name}, your balance is {balance}.")
rendered = template.render({"name": "Alice", "balance": "$1,234.56"})

# Professional string validation patterns
def validate_and_format_phone(phone: str) -> Optional[str]:
    """
    Validate and format phone numbers - production pattern
    Returns standardized format or None if invalid
    """
    
    # Remove all non-digit characters
    digits = re.sub(r'\D', '', phone)
    
    # US phone number validation (adjust for your locale)
    if len(digits) == 10:
        # Format: (XXX) XXX-XXXX
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    elif len(digits) == 11 and digits[0] == '1':
        # Format: +1 (XXX) XXX-XXXX
        return f"+1 ({digits[1:4]}) {digits[4:7]}-{digits[7:]}"
    else:
        return None  # Invalid format`}
              page="blueprints"
              section="string-manipulation"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Robust text processing with validation and formatting</div>
            <p className="use-case">Critical for user input handling, data cleaning, report generation, and content management systems.</p>
          </section>

          <section id="file-handling" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="file-handling" 
              contentId={getContent('blueprints', 'file-handling')?.id}
              className="concept-title"
            >
              <h2>File & Data Persistence Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="file-handling" 
              contentId={getContent('blueprints', 'file-handling')?.id}
              className="mb-4"
            >
              <p>Professional patterns for file I/O, data persistence, and working with various file formats in production systems.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Production File Operations"
              code={`import json
import csv
import pathlib
from contextlib import contextmanager
from typing import Generator, List, Dict, Any, Optional
import tempfile
import shutil
import logging

class FileManager:
    """Professional file handling patterns for production systems"""
    
    @staticmethod
    @contextmanager
    def safe_file_operation(filepath: str, mode: str = 'r', encoding: str = 'utf-8'):
        """
        Context manager for safe file operations with proper error handling
        Production pattern: Always use context managers for file operations
        """
        file_obj = None
        try:
            file_obj = open(filepath, mode, encoding=encoding)
            yield file_obj
        except IOError as e:
            logging.error(f"File operation failed for {filepath}: {e}")
            raise
        finally:
            if file_obj and not file_obj.closed:
                file_obj.close()
    
    @staticmethod
    def read_large_file_in_chunks(filepath: str, chunk_size: int = 8192) -> Generator[str, None, None]:
        """
        Memory-efficient reading of large files
        Production tip: Never load large files entirely into memory
        """
        with FileManager.safe_file_operation(filepath, 'r') as file:
            while True:
                chunk = file.read(chunk_size)
                if not chunk:
                    break
                yield chunk
    
    @staticmethod
    def atomic_write(filepath: str, content: str, encoding: str = 'utf-8') -> bool:
        """
        Atomic file writing - prevents corruption if process is interrupted
        Production pattern: Critical for configuration files and data integrity
        """
        path = pathlib.Path(filepath)
        temp_path = path.with_suffix(path.suffix + '.tmp')
        
        try:
            # Write to temporary file first
            with open(temp_path, 'w', encoding=encoding) as temp_file:
                temp_file.write(content)
                temp_file.flush()  # Ensure data is written to disk
            
            # Atomic move - this operation is atomic on most filesystems
            temp_path.replace(path)
            return True
            
        except Exception as e:
            # Cleanup temporary file if operation failed
            if temp_path.exists():
                temp_path.unlink()
            logging.error(f"Atomic write failed for {filepath}: {e}")
            return False

# Professional JSON handling patterns
class JSONProcessor:
    """Production-ready JSON processing with error handling and validation"""
    
    @staticmethod
    def safe_load(filepath: str) -> Optional[Dict[str, Any]]:
        """Load JSON with comprehensive error handling"""
        try:
            with FileManager.safe_file_operation(filepath, 'r') as file:
                return json.load(file)
        except json.JSONDecodeError as e:
            logging.error(f"Invalid JSON in {filepath}: {e}")
            return None
        except FileNotFoundError:
            logging.warning(f"JSON file not found: {filepath}")
            return None
    
    @staticmethod
    def safe_save(data: Dict[str, Any], filepath: str, indent: int = 2) -> bool:
        """Save JSON with atomic writing and formatting"""
        try:
            json_content = json.dumps(data, indent=indent, ensure_ascii=False)
            return FileManager.atomic_write(filepath, json_content)
        except TypeError as e:
            logging.error(f"Data not JSON serializable: {e}")
            return False

# CSV processing patterns for data analysis
class CSVProcessor:
    """Professional CSV handling for data processing and ETL operations"""
    
    @staticmethod
    def read_csv_with_validation(filepath: str, required_columns: List[str]) -> List[Dict[str, str]]:
        """
        Read CSV with column validation - production pattern for data pipelines
        """
        try:
            with FileManager.safe_file_operation(filepath, 'r') as file:
                reader = csv.DictReader(file)
                
                # Validate required columns exist
                if not all(col in reader.fieldnames for col in required_columns):
                    missing = set(required_columns) - set(reader.fieldnames or [])
                    raise ValueError(f"Missing required columns: {missing}")
                
                # Read and validate each row
                data = []
                for row_num, row in enumerate(reader, start=2):  # Start at 2 (header is row 1)
                    try:
                        # Validate row data
                        validated_row = CSVProcessor._validate_row(row, required_columns)
                        data.append(validated_row)
                    except ValueError as e:
                        logging.warning(f"Row {row_num} validation failed: {e}")
                        continue  # Skip invalid rows
                
                return data
                
        except Exception as e:
            logging.error(f"CSV processing failed for {filepath}: {e}")
            return []
    
    @staticmethod
    def _validate_row(row: Dict[str, str], required_columns: List[str]) -> Dict[str, str]:
        """Validate and clean a single CSV row"""
        validated = {}
        
        for col in required_columns:
            value = row.get(col, '').strip()
            if not value:
                raise ValueError(f"Required column '{col}' is empty")
            validated[col] = value
        
        # Add optional columns
        for col, value in row.items():
            if col not in required_columns:
                validated[col] = value.strip()
        
        return validated
    
    @staticmethod
    def write_csv_safely(data: List[Dict[str, Any]], filepath: str, columns: Optional[List[str]] = None) -> bool:
        """Write CSV with proper error handling and column ordering"""
        if not data:
            logging.warning("No data to write to CSV")
            return False
        
        try:
            # Determine columns if not provided
            if columns is None:
                columns = list(data[0].keys())
            
            # Create CSV content
            output = []
            with tempfile.NamedTemporaryFile(mode='w', delete=False, newline='', encoding='utf-8') as temp_file:
                writer = csv.DictWriter(temp_file, fieldnames=columns)
                writer.writeheader()
                writer.writerows(data)
                temp_file_path = temp_file.name
            
            # Atomic move to final location
            shutil.move(temp_file_path, filepath)
            return True
            
        except Exception as e:
            logging.error(f"CSV write failed for {filepath}: {e}")
            return False

# Configuration file patterns
class ConfigManager:
    """Production configuration management with multiple formats"""
    
    def __init__(self, config_dir: str = "config"):
        self.config_dir = pathlib.Path(config_dir)
        self.config_dir.mkdir(exist_ok=True)
    
    def load_config(self, name: str) -> Dict[str, Any]:
        """Load configuration with fallback to defaults"""
        config_file = self.config_dir / f"{name}.json"
        default_file = self.config_dir / f"{name}.default.json"
        
        # Try to load main config
        config = JSONProcessor.safe_load(str(config_file))
        
        if config is None:
            # Fallback to default config
            config = JSONProcessor.safe_load(str(default_file))
            
            if config is None:
                logging.warning(f"No configuration found for {name}, using empty config")
                config = {}
        
        return config
    
    def save_config(self, name: str, config: Dict[str, Any]) -> bool:
        """Save configuration with backup"""
        config_file = self.config_dir / f"{name}.json"
        backup_file = self.config_dir / f"{name}.backup.json"
        
        # Create backup if config exists
        if config_file.exists():
            shutil.copy2(config_file, backup_file)
        
        return JSONProcessor.safe_save(config, str(config_file))

# Usage examples for production systems
def process_data_files(input_dir: str, output_dir: str):
    """Example: Process multiple data files with error handling"""
    input_path = pathlib.Path(input_dir)
    output_path = pathlib.Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    # Process each CSV file in the directory
    for csv_file in input_path.glob("*.csv"):
        try:
            # Load and validate data
            data = CSVProcessor.read_csv_with_validation(
                str(csv_file), 
                required_columns=["id", "name", "email"]
            )
            
            # Process data (example transformation)
            processed_data = [
                {
                    **row,
                    "processed_date": datetime.now().isoformat(),
                    "status": "processed"
                }
                for row in data
            ]
            
            # Save processed data
            output_file = output_path / f"processed_{csv_file.name}"
            CSVProcessor.write_csv_safely(processed_data, str(output_file))
            
            logging.info(f"Successfully processed {csv_file.name}")
            
        except Exception as e:
            logging.error(f"Failed to process {csv_file.name}: {e}")`}
              page="blueprints"
              section="file-handling"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Robust file operations with error handling and data integrity</div>
            <p className="use-case">Essential for data processing, configuration management, logging, and any application that persists data to files.</p>
          </section>

          <section id="error-handling" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="error-handling" 
              contentId={getContent('blueprints', 'error-handling')?.id}
              className="concept-title"
            >
              <h2>Error Handling & Resilience Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="error-handling" 
              contentId={getContent('blueprints', 'error-handling')?.id}
              className="mb-4"
            >
              <p>Master production-grade error handling patterns that make applications robust, debuggable, and self-healing.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Production Error Handling Patterns"
              code={`import logging
import traceback
from functools import wraps
from typing import Optional, Callable, Any, Type
from contextlib import contextmanager
import time

# Custom exception hierarchy - foundation of good error handling
class ApplicationError(Exception):
    """Base application exception with enhanced error context"""
    
    def __init__(self, message: str, error_code: str = None, context: dict = None):
        super().__init__(message)
        self.message = message
        self.error_code = error_code or self.__class__.__name__
        self.context = context or {}
        self.timestamp = time.time()
    
    def to_dict(self) -> dict:
        """Convert exception to dictionary for logging/API responses"""
        return {
            "error_type": self.__class__.__name__,
            "error_code": self.error_code,
            "message": self.message,
            "context": self.context,
            "timestamp": self.timestamp
        }

class ValidationError(ApplicationError):
    """Data validation failures"""
    pass

class BusinessLogicError(ApplicationError):
    """Business rule violations"""
    pass

class ExternalServiceError(ApplicationError):
    """External API/service failures"""
    pass

class ConfigurationError(ApplicationError):
    """Configuration and setup issues"""
    pass

# Production error handling patterns
class ErrorHandler:
    """Centralized error handling for production systems"""
    
    def __init__(self, logger: logging.Logger):
        self.logger = logger
    
    def handle_error(self, error: Exception, context: str = "", reraise: bool = True) -> Optional[dict]:
        """
        Centralized error handling with proper logging and context
        Production pattern: Always log errors with context
        """
        error_info = {
            "error_type": type(error).__name__,
            "message": str(error),
            "context": context,
            "traceback": traceback.format_exc()
        }
        
        # Log based on error severity
        if isinstance(error, ApplicationError):
            # Application errors are expected - log as warning with context
            self.logger.warning(f"Application error in {context}: {error.to_dict()}")
        elif isinstance(error, (FileNotFoundError, PermissionError)):
            # System errors - log as error
            self.logger.error(f"System error in {context}: {error_info}")
        else:
            # Unexpected errors - log as critical
            self.logger.critical(f"Unexpected error in {context}: {error_info}")
        
        if reraise:
            raise
        
        return error_info

# Retry mechanism with exponential backoff
def with_retry(
    max_attempts: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
    backoff_factor: float = 2.0,
    retry_exceptions: tuple = (ExternalServiceError,)
):
    """
    Production retry decorator with exponential backoff
    Critical for external service calls and unreliable operations
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                
                except retry_exceptions as e:
                    last_exception = e
                    
                    if attempt < max_attempts - 1:
                        # Calculate delay with exponential backoff
                        delay = min(base_delay * (backoff_factor ** attempt), max_delay)
                        
                        logging.warning(
                            f"Attempt {attempt + 1} failed for {func.__name__}: {e}. "
                            f"Retrying in {delay:.2f} seconds..."
                        )
                        
                        time.sleep(delay)
                    else:
                        logging.error(f"All {max_attempts} attempts failed for {func.__name__}")
                
                except Exception as e:
                    # Don't retry non-retryable exceptions
                    logging.error(f"Non-retryable error in {func.__name__}: {e}")
                    raise
            
            # Re-raise the last exception after all attempts failed
            raise last_exception
        
        return wrapper
    return decorator

# Circuit breaker pattern for system resilience
class CircuitBreaker:
    """
    Circuit breaker pattern for preventing cascade failures
    Production pattern: Protect systems from downstream failures
    """
    
    def __init__(self, failure_threshold: int = 5, timeout: int = 60, expected_exception: Type[Exception] = Exception):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.expected_exception = expected_exception
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
    
    def __call__(self, func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            if self.state == "OPEN":
                if time.time() - self.last_failure_time >= self.timeout:
                    self.state = "HALF_OPEN"
                    logging.info(f"Circuit breaker HALF_OPEN for {func.__name__}")
                else:
                    raise ExternalServiceError(
                        f"Circuit breaker OPEN for {func.__name__}",
                        error_code="CIRCUIT_BREAKER_OPEN",
                        context={"state": self.state, "failure_count": self.failure_count}
                    )
            
            try:
                result = func(*args, **kwargs)
                
                # Success - reset circuit breaker
                if self.state == "HALF_OPEN":
                    self.state = "CLOSED"
                    self.failure_count = 0
                    logging.info(f"Circuit breaker CLOSED for {func.__name__}")
                
                return result
                
            except self.expected_exception as e:
                self.failure_count += 1
                
                if self.failure_count >= self.failure_threshold:
                    self.state = "OPEN"
                    self.last_failure_time = time.time()
                    logging.error(f"Circuit breaker OPEN for {func.__name__} after {self.failure_count} failures")
                
                raise e
        
        return wrapper

# Context manager for safe resource handling
@contextmanager
def safe_operation(operation_name: str, cleanup_func: Optional[Callable] = None):
    """
    Context manager for safe operations with guaranteed cleanup
    Production pattern: Ensure resources are always cleaned up
    """
    logger = logging.getLogger(__name__)
    logger.info(f"Starting operation: {operation_name}")
    
    try:
        yield
        logger.info(f"Operation completed successfully: {operation_name}")
        
    except Exception as e:
        logger.error(f"Operation failed: {operation_name} - {e}")
        raise
        
    finally:
        if cleanup_func:
            try:
                cleanup_func()
                logger.info(f"Cleanup completed for: {operation_name}")
            except Exception as cleanup_error:
                logger.error(f"Cleanup failed for {operation_name}: {cleanup_error}")

# Production example: Robust API call with all patterns
class APIClient:
    """Production API client with comprehensive error handling"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.error_handler = ErrorHandler(self.logger)
    
    @with_retry(max_attempts=3, retry_exceptions=(ExternalServiceError,))
    @CircuitBreaker(failure_threshold=5, timeout=30, expected_exception=ExternalServiceError)
    def call_external_api(self, endpoint: str, data: dict = None) -> dict:
        """
        Production API call with retry, circuit breaker, and error handling
        """
        try:
            # Input validation
            if not endpoint:
                raise ValidationError("Endpoint cannot be empty", "INVALID_ENDPOINT")
            
            # Simulate API call
            response = self._make_request(endpoint, data)
            
            # Response validation
            if not response.get("success"):
                raise ExternalServiceError(
                    "API call failed",
                    "API_CALL_FAILED",
                    {"endpoint": endpoint, "response": response}
                )
            
            return response
            
        except ValidationError:
            # Re-raise validation errors without modification
            raise
            
        except ExternalServiceError:
            # Re-raise external service errors for retry logic
            raise
            
        except Exception as e:
            # Wrap unexpected errors
            raise ExternalServiceError(
                f"Unexpected error calling {endpoint}",
                "UNEXPECTED_API_ERROR",
                {"original_error": str(e)}
            ) from e
    
    def _make_request(self, endpoint: str, data: dict) -> dict:
        """Simulate HTTP request - replace with actual HTTP client"""
        import random
        
        # Simulate various failure scenarios
        if random.random() < 0.1:  # 10% failure rate
            raise ConnectionError("Network error")
        
        if random.random() < 0.05:  # 5% API error rate
            return {"success": False, "error": "API error"}
        
        return {"success": True, "data": f"Response from {endpoint}"}

# Usage example with complete error handling
def process_user_data(user_id: int):
    """Example function demonstrating production error handling patterns"""
    
    api_client = APIClient()
    
    try:
        with safe_operation("user_data_processing", cleanup_func=lambda: logging.info("Processing cleanup")):
            
            # Validate input
            if user_id <= 0:
                raise ValidationError(
                    "User ID must be positive",
                    "INVALID_USER_ID",
                    {"provided_id": user_id}
                )
            
            # Call external service with full error handling
            user_data = api_client.call_external_api(f"/users/{user_id}")
            
            # Process data with business logic validation
            if not user_data.get("data", {}).get("active"):
                raise BusinessLogicError(
                    "Cannot process inactive user",
                    "INACTIVE_USER",
                    {"user_id": user_id}
                )
            
            return {"status": "success", "user_data": user_data}
            
    except ApplicationError as e:
        # Application errors are expected and handled gracefully
        return {"status": "error", "error": e.to_dict()}
        
    except Exception as e:
        # Unexpected errors are logged and wrapped
        logging.critical(f"Unexpected error processing user {user_id}: {e}")
        return {
            "status": "error",
            "error": {
                "error_type": "UnexpectedError",
                "message": "An unexpected error occurred",
                "error_code": "UNEXPECTED_ERROR"
            }
        }`}
              page="blueprints"
              section="error-handling"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Comprehensive error handling with resilience and recovery</div>
            <p className="use-case">Critical for production systems, external service integration, and building fault-tolerant applications.</p>
          </section>

          <section id="list-comprehensions" className="concept-card">
            <EditableContent 
              type="title" 
              page="blueprints" 
              section="list-comprehensions" 
              contentId={getContent('blueprints', 'list-comprehensions')?.id}
              className="concept-title"
            >
              <h2>Advanced Comprehension Blueprints</h2>
            </EditableContent>
            
            <EditableContent 
              type="description" 
              page="blueprints" 
              section="list-comprehensions" 
              contentId={getContent('blueprints', 'list-comprehensions')?.id}
              className="mb-4"
            >
              <p>Master Python's most powerful data transformation patterns for clean, efficient, and readable data processing.</p>
            </EditableContent>
            
            <EditableCodeBlock
              title="Production Comprehension Patterns"
              code={`from typing import List, Dict, Set, Any, Optional
from collections import defaultdict
import itertools

# Advanced list comprehension patterns for data processing
def process_sales_data(sales_records: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Production data processing using advanced comprehensions
    Real-world pattern: Transform and analyze business data efficiently
    """
    
    # Basic filtering and transformation
    high_value_sales = [
        {**sale, "commission": sale["amount"] * 0.05}
        for sale in sales_records
        if sale["amount"] > 1000 and sale["status"] == "completed"
    ]
    
    # Nested comprehension for hierarchical data
    sales_by_region_and_product = {
        region: {
            product: [sale for sale in region_sales if sale["product"] == product]
            for product in {sale["product"] for sale in region_sales}
        }
        for region, region_sales in {
            region: [sale for sale in sales_records if sale["region"] == region]
            for region in {sale["region"] for sale in sales_records}
        }.items()
    }
    
    # Advanced filtering with multiple conditions
    recent_premium_customers = [
        sale["customer_id"]
        for sale in sales_records
        if (
            sale["amount"] > 5000 and
            sale["customer_tier"] == "premium" and
            sale["date"].year == 2024
        )
    ]
    
    return {
        "high_value_sales": high_value_sales,
        "sales_by_region": sales_by_region_and_product,
        "premium_customers": list(set(recent_premium_customers))
    }

# Dictionary comprehensions for data transformation and analysis
def analyze_user_behavior(user_activities: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Production analytics using dictionary comprehensions
    Pattern: Extract insights from user activity data
    """
    
    # User activity summary with calculated metrics
    user_metrics = {
        user_id: {
            "total_sessions": len(activities),
            "total_time": sum(activity["duration"] for activity in activities),
            "average_session": sum(activity["duration"] for activity in activities) / len(activities),
            "most_common_action": max(
                (activity["action"] for activity in activities),
                key=lambda action: sum(1 for a in activities if a["action"] == action)
            )
        }
        for user_id, activities in {
            user_id: [
                activity for activity in user_activities 
                if activity["user_id"] == user_id
            ]
            for user_id in {activity["user_id"] for activity in user_activities}
        }.items()
        if len(activities) > 0  # Only users with activities
    }
    
    # Feature flags based on user behavior
    user_features = {
        user_id: {
            "is_power_user": metrics["total_sessions"] > 50,
            "is_engaged": metrics["average_session"] > 300,  # 5+ minutes
            "feature_flags": [
                "advanced_analytics" if metrics["total_sessions"] > 100 else None,
                "beta_features" if metrics["is_engaged"] else None,
                "premium_support" if metrics["total_time"] > 10000 else None
            ]
        }
        for user_id, metrics in user_metrics.items()
    }
    
    # Clean up None values from feature flags
    for user_id in user_features:
        user_features[user_id]["feature_flags"] = [
            flag for flag in user_features[user_id]["feature_flags"] if flag is not None
        ]
    
    return {"user_metrics": user_metrics, "user_features": user_features}

# Set comprehensions for advanced data analysis
def data_quality_analysis(datasets: List[Dict[str, Any]]) -> Dict[str, Set]:
    """
    Data quality analysis using set comprehensions
    Production pattern: Identify data quality issues across datasets
    """
    
    # Find all unique values for each field across datasets
    all_fields = {
        field
        for dataset in datasets
        for record in dataset.get("records", [])
        for field in record.keys()
    }
    
    # Identify missing fields per dataset
    missing_fields_per_dataset = {
        dataset["name"]: all_fields - {
            field
            for record in dataset.get("records", [])
            for field in record.keys()
        }
        for dataset in datasets
    }
    
    # Find datasets with data quality issues
    problematic_datasets = {
        dataset["name"]
        for dataset in datasets
        if (
            len(dataset.get("records", [])) == 0 or  # Empty dataset
            any(
                len([v for v in record.values() if v is not None]) == 0  # All null record
                for record in dataset.get("records", [])
            ) or
            len(missing_fields_per_dataset[dataset["name"]]) > len(all_fields) * 0.5  # Missing > 50% fields
        )
    }
    
    return {
        "all_fields": all_fields,
        "missing_fields": missing_fields_per_dataset,
        "problematic_datasets": problematic_datasets
    }

# Generator expressions for memory-efficient processing
def process_large_dataset_efficiently(data_source):
    """
    Memory-efficient data processing using generator expressions
    Production pattern: Handle large datasets without memory overflow
    """
    
    # Generator expression for lazy evaluation
    processed_records = (
        {
            "id": record["id"],
            "processed_value": record["value"] * 1.1,  # Apply transformation
            "category": categorize_value(record["value"]),
            "timestamp": record.get("timestamp", "unknown")
        }
        for record in data_source
        if record.get("value") is not None and record["value"] > 0
    )
    
    # Chain multiple generators for complex processing pipeline
    validated_records = (
        record for record in processed_records
        if validate_record(record)
    )
    
    enriched_records = (
        {**record, "enriched_data": enrich_record(record)}
        for record in validated_records
    )
    
    return enriched_records  # Returns generator, not list

# Advanced comprehension with error handling
def robust_data_transformation(raw_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Production data transformation with error handling in comprehensions
    Pattern: Handle malformed data gracefully while processing
    """
    
    def safe_transform(record):
        """Safely transform a record, returning None if transformation fails"""
        try:
            return {
                "id": int(record["id"]),
                "value": float(record["value"]),
                "processed": True,
                "errors": []
            }
        except (KeyError, ValueError, TypeError) as e:
            return {
                "id": record.get("id", "unknown"),
                "value": None,
                "processed": False,
                "errors": [str(e)]
            }
    
    # Transform data with error tracking
    transformed_data = [safe_transform(record) for record in raw_data]
    
    # Separate successful and failed transformations
    successful_records = [
        record for record in transformed_data
        if record["processed"]
    ]
    
    failed_records = [
        record for record in transformed_data
        if not record["processed"]
    ]
    
    # Summary statistics using comprehensions
    summary = {
        "total_records": len(raw_data),
        "successful": len(successful_records),
        "failed": len(failed_records),
        "success_rate": len(successful_records) / len(raw_data) if raw_data else 0,
        "average_value": (
            sum(record["value"] for record in successful_records) / len(successful_records)
            if successful_records else 0
        ),
        "unique_error_types": {
            error
            for record in failed_records
            for error in record["errors"]
        }
    }
    
    return {
        "successful_records": successful_records,
        "failed_records": failed_records,
        "summary": summary
    }

# Real-world example: E-commerce analytics
def ecommerce_analytics(orders: List[Dict[str, Any]], products: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Complete e-commerce analytics using all comprehension types
    Production example: Generate business insights from order data
    """
    
    # Product lookup for enrichment
    product_lookup = {product["id"]: product for product in products}
    
    # Enrich orders with product information
    enriched_orders = [
        {
            **order,
            "product_name": product_lookup.get(order["product_id"], {}).get("name", "Unknown"),
            "product_category": product_lookup.get(order["product_id"], {}).get("category", "Unknown"),
            "profit_margin": order["amount"] - product_lookup.get(order["product_id"], {}).get("cost", 0)
        }
        for order in orders
        if order["status"] == "completed"
    ]
    
    # Analytics using various comprehension patterns
    analytics = {
        # Revenue by category
        "revenue_by_category": {
            category: sum(
                order["amount"]
                for order in enriched_orders
                if order["product_category"] == category
            )
            for category in {order["product_category"] for order in enriched_orders}
        },
        
        # Top customers by value
        "top_customers": {
            customer_id: {
                "total_spent": sum(order["amount"] for order in customer_orders),
                "order_count": len(customer_orders),
                "average_order": sum(order["amount"] for order in customer_orders) / len(customer_orders)
            }
            for customer_id, customer_orders in {
                customer_id: [
                    order for order in enriched_orders
                    if order["customer_id"] == customer_id
                ]
                for customer_id in {order["customer_id"] for order in enriched_orders}
            }.items()
            if len(customer_orders) >= 3  # Minimum 3 orders
        },
        
        # Product performance metrics
        "product_performance": [
            {
                "product_id": product_id,
                "product_name": product_orders[0]["product_name"],
                "units_sold": len(product_orders),
                "total_revenue": sum(order["amount"] for order in product_orders),
                "total_profit": sum(order["profit_margin"] for order in product_orders),
                "average_profit_margin": (
                    sum(order["profit_margin"] for order in product_orders) / len(product_orders)
                )
            }
            for product_id, product_orders in {
                product_id: [
                    order for order in enriched_orders
                    if order["product_id"] == product_id
                ]
                for product_id in {order["product_id"] for order in enriched_orders}
            }.items()
            if len(product_orders) > 0
        ]
    }
    
    return analytics

# Helper functions for examples
def categorize_value(value): return "high" if value > 100 else "low"
def validate_record(record): return record.get("processed_value", 0) > 0
def enrich_record(record): return {"enrichment": "data"}`}
              page="blueprints"
              section="list-comprehensions"
            />
            
            <div className="analogy-badge">Blueprint Pattern: Efficient data transformation with functional programming principles</div>
            <p className="use-case">Essential for data analysis, ETL processes, analytics, and any data-intensive Python application requiring clean, efficient transformations.</p>
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
