
import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';

const Foundations = () => {
  const [tocItems, setTocItems] = useState([
    { id: 'mutability', title: 'Mutability & Immutability' },
    { id: 'memory-identity', title: 'Memory & Identity' },
    { id: 'execution-model', title: 'Python\'s Execution Model' },
    { id: 'pythonic-idioms', title: 'Pythonic Idioms' },
    { id: 'functions-advanced', title: 'Deeper into Functions' },
    { id: 'modules-packages', title: 'Modules & Packages' },
    { id: 'oop-python', title: 'Object-Oriented Python' }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Pythonic Foundations" 
        subtitle="Understanding Python's unique characteristics and idiomatic patterns."
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Main content */}
        <div className="flex-grow max-w-4xl">
          <section id="mutability" className="concept-card">
            <h2 className="concept-title">Mutability & Immutability</h2>
            <p className="mb-4">Understanding which objects can be changed after creation and which cannot.</p>
            
            <CodeBlock
              title="Mutable vs Immutable Types"
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

# Immutability and function arguments
def add_to_list(items, new_item):
    items.append(new_item)  # Modifies the original list
    return items

my_list = [1, 2, 3]
add_to_list(my_list, 4)
print(my_list)  # [1, 2, 3, 4] - original list was modified

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
            <div className="analogy-badge">Similar to: final in Java, const in C++</div>
            <p className="use-case">Understanding mutability is crucial for avoiding unexpected behavior, especially in function parameters.</p>
          </section>
          
          <section id="memory-identity" className="concept-card">
            <h2 className="concept-title">Memory & Identity</h2>
            
            <CodeBlock
              title="Object Identity and Memory Management"
              code={`# Object identity with id()
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(id(a))  # Some memory address
print(id(b))  # Different memory address
print(id(c))  # Same as id(a)

# Identity vs Equality
print(a == b)  # True - same content
print(a is b)  # False - different objects
print(a is c)  # True - same object

# Identity of small integers (implementation detail)
# CPython caches small integers (-5 to 256)
x = 5
y = 5
print(x is y)  # True, same object due to caching

big_x = 1000
big_y = 1000
print(big_x is big_y)  # May be False, separate objects

# Identity of string literals (implementation detail)
s1 = "hello"
s2 = "hello"
print(s1 is s2)  # True, may be interned by Python

# Memory reference counting (CPython implementation)
import sys
x = [1, 2, 3]
print(sys.getrefcount(x) - 1)  # Count of references to x (minus one for the getrefcount call itself)

y = x  # Add another reference
print(sys.getrefcount(x) - 1)  # Reference count increased`}
            />
            <div className="analogy-badge">Similar to: Object reference in Java/C#, pointers in C++</div>
            <p className="use-case">Understanding object identity helps debug reference issues and optimize memory usage.</p>
          </section>
          
          <section id="execution-model" className="concept-card">
            <h2 className="concept-title">Python's Execution Model</h2>
            
            <CodeBlock
              title="How Python Code Runs"
              code={`# Python is interpreted, but actually compiles to bytecode first
# .pyc files contain this compiled bytecode

# Looking at the bytecode (Python's "machine code")
def example_function(x, y):
    z = x + y
    return z ** 2

import dis
dis.dis(example_function)  # Displays bytecode operations

# Python's execution lifecycle:
# 1. Source code is parsed
# 2. Compiled to bytecode (.pyc files)
# 3. Executed by Python Virtual Machine (PVM)

# Finding where modules are loaded from
import sys
print(sys.path)  # List of directories Python searches for modules

# Examining loaded modules
print(sys.modules.keys())  # All currently loaded modules

# Python's import system
import importlib
math = importlib.import_module('math')  # Dynamic import`}
            />
            <div className="analogy-badge">Similar to: JVM bytecode in Java</div>
            <p className="use-case">Understanding Python's execution model helps with debugging, optimization, and extending Python itself.</p>
          </section>
          
          <section id="pythonic-idioms" className="concept-card">
            <h2 className="concept-title">Pythonic Idioms & Best Practices</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">enumerate() for Elegant Iteration</h3>
            <CodeBlock
              title="Using enumerate()"
              code={`# Without enumerate
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# With enumerate - much cleaner
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
    
# With custom start index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}: {fruit}")  # 1: apple, 2: banana, 3: cherry`}
            />
            <p className="use-case">Use enumerate() whenever you need both indices and values during iteration.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">zip() for Parallel Iteration</h3>
            <CodeBlock
              title="Using zip()"
              code={`# Parallel iteration with zip
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
jobs = ["Developer", "Designer", "Manager"]

# Without zip
for i in range(len(names)):
    print(f"{names[i]} is {ages[i]} years old and works as a {jobs[i]}")

# With zip - much cleaner
for name, age, job in zip(names, ages, jobs):
    print(f"{name} is {age} years old and works as a {job}")
    
# Handling uneven lengths
names_longer = ["Alice", "Bob", "Charlie", "Dave"]
# Regular zip stops at shortest sequence
for name, age in zip(names_longer, ages):
    print(name, age)  # Only processes first 3 items

# zip_longest from itertools to handle uneven lengths
from itertools import zip_longest
for name, age in zip_longest(names_longer, ages, fillvalue=0):
    print(name, age)  # Uses fillvalue for missing values`}
            />
            <p className="use-case">Use zip() to iterate over multiple sequences simultaneously, creating clean parallel loops.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Generators for Memory Efficiency</h3>
            <CodeBlock
              title="Using Generators"
              code={`# Generator function using yield
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

# Using the generator
for number in count_up_to(5):
    print(number)  # Prints 1, 2, 3, 4, 5
    
# Generator expressions
squares = (x**2 for x in range(10))  # Generator, not list
print(squares)  # <generator object ...>

# Process values one at a time without storing all in memory
for square in squares:
    print(square)
    
# Comparing memory usage
import sys
list_comp = [x**2 for x in range(10000)]
gen_exp = (x**2 for x in range(10000))

print(sys.getsizeof(list_comp))  # Much larger
print(sys.getsizeof(gen_exp))    # Very small`}
            />
            <div className="analogy-badge">Similar to: Iterators in Java, C++, yield in C#</div>
            <p className="use-case">Use generators when working with large datasets to reduce memory usage, especially for one-time processing.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Context Managers (with statement)</h3>
            <CodeBlock
              title="Context Managers Beyond Files"
              code={`# Common use with files (auto-closes)
with open("example.txt", "r") as file:
    content = file.read()
# file is automatically closed here

# Other standard library context managers
from contextlib import suppress
with suppress(FileNotFoundError):
    with open("nonexistent.txt") as f:
        content = f.read()
    # No exception raised if file not found

# Time measurement context manager
import time
from contextlib import contextmanager

@contextmanager
def timer():
    start = time.time()
    try:
        yield  # This is where the with-block's body executes
    finally:
        end = time.time()
        print(f"Elapsed time: {end - start:.2f} seconds")

# Using our custom context manager
with timer():
    # Code to measure
    sum(i**2 for i in range(1000000))`}
            />
            <div className="analogy-badge">Similar to: try-with-resources in Java, RAII in C++</div>
            <p className="use-case">Use context managers for automatic resource management and setup/teardown operations.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">EAFP vs LBYL Coding Styles</h3>
            <CodeBlock
              title="Python's EAFP Preference"
              code={`# LBYL: "Look Before You Leap"
if "key" in my_dict:
    value = my_dict["key"]
else:
    value = "default"
    
# EAFP: "Easier to Ask Forgiveness than Permission"
try:
    value = my_dict["key"]
except KeyError:
    value = "default"

# Another example: LBYL style
import os
if os.path.exists("file.txt"):
    with open("file.txt") as f:
        content = f.read()
else:
    content = ""
    
# EAFP style - generally preferred in Python
try:
    with open("file.txt") as f:
        content = f.read()
except FileNotFoundError:
    content = ""`}
            />
            <div className="analogy-badge">Unlike: The defensive checking common in Java/C++</div>
            <p className="use-case">Use EAFP (try/except) for cleaner code, especially when exceptions are expected in normal operation.</p>
          </section>
          
          <section id="functions-advanced" className="concept-card">
            <h2 className="concept-title">Deeper into Functions</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Closures</h3>
            <CodeBlock
              title="Functions That Remember Their Environment"
              code={`# Simple closure example
def make_multiplier(factor):
    # Inner function has access to the parent's scope
    def multiply(number):
        return number * factor  # factor is from the outer scope
    return multiply

# Create specific multiplier functions
double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15

# Closures remember values even after outer function finishes
print(double.__closure__)  # Contains a reference to the factor value

# Practical use: Creating configurable functions
def create_logger(log_level):
    def logger(message):
        print(f"[{log_level}] {message}")
    return logger

info = create_logger("INFO")
error = create_logger("ERROR")

info("Operation succeeded")   # [INFO] Operation succeeded
error("Connection failed")    # [ERROR] Connection failed`}
            />
            <div className="analogy-badge">Similar to: Closures in JavaScript, lambdas in Java/C++</div>
            <p className="use-case">Use closures to create specialized functions with pre-configured behavior.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Decorators</h3>
            <CodeBlock
              title="Function Decorators"
              code={`# Basic decorator
def timing_decorator(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.6f} seconds")
        return result
    return wrapper

# Using the decorator
@timing_decorator
def calculate_sum(n):
    return sum(i for i in range(n))

# This is equivalent to:
# calculate_sum = timing_decorator(calculate_sum)

result = calculate_sum(1000000)  # Will print timing info

# Decorator with arguments
def repeat(n=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(n=3)
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Returns ["Hello, Alice!", "Hello, Alice!", "Hello, Alice!"]

# Multiple decorators (applied bottom to top)
@timing_decorator
@repeat(n=2)
def complex_operation(x):
    return x ** 2

# Equivalent to:
# complex_operation = timing_decorator(repeat(n=2)(complex_operation))`}
            />
            <div className="analogy-badge">Similar to: Aspect-oriented programming, Java annotations</div>
            <p className="use-case">Use decorators to add reusable behaviors like logging, timing, caching, or validation to functions.</p>
          </section>
          
          <section id="modules-packages" className="concept-card">
            <h2 className="concept-title">Modules & Packages</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Importing Techniques</h3>
            <CodeBlock
              title="Import Statements"
              code={`# Basic import
import math
print(math.sqrt(16))  # 4.0

# Import with alias
import numpy as np
print(np.array([1, 2, 3]))

# Import specific items
from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)

# Import all (generally discouraged)
from math import *
print(sqrt(16))  # No math. prefix needed, but can lead to name conflicts

# Conditional imports
try:
    import specialized_lib
    use_specialized = True
except ImportError:
    use_specialized = False

# Dynamic imports
module_name = "math"
module = __import__(module_name)
print(module.sqrt(16))

# More flexible dynamic imports
import importlib
module = importlib.import_module(module_name)
print(module.sqrt(16))`}
            />
            <p className="use-case">Use explicit imports (e.g., from module import specific_item) for clarity, but avoid wildcard imports.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Creating Modules and Packages</h3>
            <CodeBlock
              title="Module & Package Structure"
              code={`# Structure of a module (single file)
# mymodule.py
def func1():
    return "Hello from func1"

def func2():
    return "Hello from func2"

PI = 3.14159

if __name__ == "__main__":
    # Code that runs when module is executed directly
    print("Module running as main script")
    print(func1())

# Using the module elsewhere
import mymodule
print(mymodule.func1())
print(mymodule.PI)

# Package structure (directory with multiple modules)
"""
mypackage/
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
"""

# __init__.py content (makes directory a package)
# Can be empty or contain initialization code
from .module1 import important_function
from .module2 import AnotherClass
__version__ = "0.1"

# Importing from packages
import mypackage
from mypackage import module1
from mypackage.subpackage import module3
from mypackage.subpackage.module3 import specific_function`}
            />
            <div className="analogy-badge">Similar to: Java packages, C++ namespaces</div>
            <p className="use-case">Use packages to organize related modules into a cohesive library with a clear structure.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Standard Library Highlights</h3>
            <CodeBlock
              title="Python Standard Library Gems"
              code={`# Collections: specialized container types
from collections import Counter, defaultdict, namedtuple

# Count word frequency
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
word_counts = Counter(words)
print(word_counts)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(word_counts.most_common(2))  # [('apple', 3), ('banana', 2)]

# Dictionary with default values
fruit_colors = defaultdict(lambda: "unknown")
fruit_colors["apple"] = "red"
print(fruit_colors["apple"])    # "red"
print(fruit_colors["banana"])   # "unknown" (default value)

# Named tuples (lightweight classes)
Person = namedtuple('Person', ['name', 'age', 'job'])
alice = Person("Alice", 30, "Developer")
print(alice.name)  # "Alice"
print(alice[0])    # "Alice" (also works like a regular tuple)

# itertools: combinatorial functions
from itertools import combinations, permutations, cycle, islice

# All possible pairs from a list
teams = ["A", "B", "C", "D"]
for match in combinations(teams, 2):
    print(f"Match: {match[0]} vs {match[1]}")

# Round-robin cycling through items
colors = cycle(["red", "green", "blue"])
print(list(islice(colors, 5)))  # ['red', 'green', 'blue', 'red', 'green']

# datetime: date and time functions
from datetime import datetime, timedelta
now = datetime.now()
one_week_ago = now - timedelta(days=7)
formatted = now.strftime("%Y-%m-%d %H:%M:%S")

# json: parsing and generating JSON
import json
data = {"name": "Alice", "age": 30, "skills": ["Python", "JavaScript"]}
json_string = json.dumps(data, indent=2)
parsed_data = json.loads(json_string)

# random: random numbers and selections
import random
print(random.random())           # Float between 0 and 1
print(random.randint(1, 100))    # Integer between 1 and 100
print(random.choice(["a", "b", "c"]))  # Random selection
random.shuffle(teams)            # Shuffle list in place`}
            />
            <p className="use-case">Python's "batteries-included" standard library has solutions for most common programming tasks.</p>
          </section>
          
          <section id="oop-python" className="concept-card">
            <h2 className="concept-title">Object-Oriented Python</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Class Definition</h3>
            <CodeBlock
              title="Classes and Instances"
              code={`# Basic class definition
class Person:
    # Class variable (shared by all instances)
    species = "Human"
    
    # Constructor method
    def __init__(self, name, age):
        # Instance variables (unique to each instance)
        self.name = name
        self.age = age
    
    # Instance method
    def greet(self):
        return f"Hello, my name is {self.name}"
    
    # Instance method with parameters
    def celebrate_birthday(self):
        self.age += 1
        return f"Happy {self.age}th Birthday, {self.name}!"
        
    # String representation
    def __str__(self):
        return f"{self.name}, {self.age} years old"
    
    # Representation (for debugging)
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

# Creating instances
alice = Person("Alice", 30)
bob = Person("Bob", 25)

# Accessing instance variables and methods
print(alice.name)        # "Alice"
print(alice.greet())     # "Hello, my name is Alice"
print(alice)             # Calls __str__: "Alice, 30 years old"

# Accessing class variables
print(Person.species)    # "Human"
print(alice.species)     # "Human"

# Modifying instance and class variables
alice.name = "Alicia"
Person.species = "Homo Sapiens"  # Changes for all instances
print(bob.species)      # "Homo Sapiens"`}
            />
            <div className="analogy-badge">Similar to: Classes in most OOP languages</div>
            <p className="use-case">Use classes to create reusable blueprints for objects with related data and behavior.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Inheritance</h3>
            <CodeBlock
              title="Class Inheritance"
              code={`# Base class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError("Subclasses must implement this")
    
    def introduce(self):
        return f"I am {self.name}, and I can {self.speak()}"

# Derived classes
class Dog(Animal):
    def speak(self):
        return "bark"
    
    # Additional method specific to Dog
    def fetch(self, item):
        return f"{self.name} fetched the {item}"

class Cat(Animal):
    def speak(self):
        return "meow"
    
    # Additional method specific to Cat
    def scratch(self):
        return f"{self.name} is scratching"

# Creating instances
fido = Dog("Fido")
whiskers = Cat("Whiskers")

# Using inherited and overridden methods
print(fido.introduce())       # "I am Fido, and I can bark"
print(whiskers.introduce())   # "I am Whiskers, and I can meow"

# Using class-specific methods
print(fido.fetch("ball"))     # "Fido fetched the ball"
print(whiskers.scratch())     # "Whiskers is scratching"

# Checking inheritance
print(isinstance(fido, Dog))     # True
print(isinstance(fido, Animal))  # True
print(isinstance(fido, Cat))     # False`}
            />
            <div className="analogy-badge">Similar to: Inheritance in other OOP languages</div>
            <p className="use-case">Use inheritance to create specialized versions of classes while reusing common functionality.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Properties</h3>
            <CodeBlock
              title="Properties for Controlled Attribute Access"
              code={`class Person:
    def __init__(self, first_name, last_name, age):
        self._first_name = first_name
        self._last_name = last_name
        self._age = age
    
    # Property for full name
    @property
    def full_name(self):
        return f"{self._first_name} {self._last_name}"
    
    # Getter for age
    @property
    def age(self):
        return self._age
    
    # Setter for age with validation
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value
    
    # Deleter for age
    @age.deleter
    def age(self):
        print("Age attribute deleted")
        self._age = None
    
    # Alternative way to define properties (older style)
    def get_first_name(self):
        return self._first_name
    
    def set_first_name(self, value):
        self._first_name = value
    
    # Creating the property with the older method
    first_name = property(get_first_name, set_first_name)

# Using properties
person = Person("John", "Smith", 30)

# Getter
print(person.full_name)  # "John Smith" (computed on-the-fly)
print(person.age)        # 30

# Setter
person.age = 31
print(person.age)        # 31

# Validation
try:
    person.age = -5      # Raises ValueError
except ValueError as e:
    print(str(e))        # "Age cannot be negative"

# Deleter
del person.age
print(person.age)        # None`}
            />
            <div className="analogy-badge">Similar to: Properties in C#, getters/setters in Java</div>
            <p className="use-case">Use properties to add validation, computed values, or special behavior when attributes are accessed or modified.</p>
          </section>
          
          <div className="mt-12 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium mb-2">Ready for more advanced topics?</h3>
            <p className="text-gray-700">
              Continue to <a href="/mastery" className="text-python-blue hover:underline">Mastering the Craft</a> for advanced Python concepts like metaclasses, descriptors, and concurrency.
            </p>
          </div>
        </div>
        
        {/* Sidebar with Table of Contents */}
        <div className="hidden xl:block w-64 ml-8">
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </div>
  );
};

export default Foundations;
