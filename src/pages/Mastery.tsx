
import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';

const Mastery = () => {
  const [tocItems, setTocItems] = useState([
    { id: 'metaclasses', title: 'Metaclasses' },
    { id: 'advanced-decorators', title: 'Advanced Decorators' },
    { id: 'descriptors', title: 'Descriptors' },
    { id: 'advanced-oop', title: 'Advanced OOP' },
    { id: 'concurrency', title: 'Concurrency & Parallelism' },
    { id: 'c-interface', title: 'Python C API & ctypes' },
    { id: 'regex', title: 'Advanced Regular Expressions' },
    { id: 'advanced-stdlib', title: 'Advanced Standard Library' },
    { id: 'testing', title: 'Testing Frameworks' },
    { id: 'packaging', title: 'Packaging & Distribution' }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Mastering the Craft" 
        subtitle="Advanced Python features and techniques for expert developers."
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Main content */}
        <div className="flex-grow max-w-4xl">
          <section id="metaclasses" className="concept-card">
            <h2 className="concept-title">Metaclasses</h2>
            <p className="mb-4">Classes that define how other classes are created - the "class of a class".</p>
            
            <CodeBlock
              title="Basic Metaclass Example"
              code={`# Metaclass: A class that defines how other classes are created
# Regular class creation process:
# type(name, bases, attrs) -> class

# Simple metaclass
class Meta(type):
    def __new__(mcs, name, bases, attrs):
        # Add a new attribute to any class using this metaclass
        attrs['added_by_meta'] = 42
        print(f"Creating class {name}")
        return super().__new__(mcs, name, bases, attrs)
    
    def __init__(cls, name, bases, attrs):
        print(f"Initializing class {name}")
        super().__init__(name, bases, attrs)

# Using the metaclass
class MyClass(metaclass=Meta):
    def __init__(self, value):
        self.value = value

# The metaclass executes during class definition
instance = MyClass(10)
print(instance.added_by_meta)  # 42

# Practical example: Registry of subclasses
class PluginRegistry(type):
    plugins = {}
    
    def __new__(mcs, name, bases, attrs):
        cls = super().__new__(mcs, name, bases, attrs)
        # Register every class except the base Plugin class
        if name != "Plugin":
            mcs.plugins[name] = cls
        return cls

class Plugin(metaclass=PluginRegistry):
    def run(self):
        raise NotImplementedError

class AudioPlugin(Plugin):
    def run(self):
        return "Processing audio"

class VideoPlugin(Plugin):
    def run(self):
        return "Processing video"

# Access all plugins through the registry
print(PluginRegistry.plugins)
# Run a specific plugin
plugin = PluginRegistry.plugins["AudioPlugin"]()
print(plugin.run())  # "Processing audio"`}
            />
            <div className="analogy-badge">Similar to: Class factories, annotation processors</div>
            <p className="use-case">Use metaclasses for framework-level tasks: class registries, API enforcement, or adding class-wide behaviors.</p>
          </section>
          
          <section id="advanced-decorators" className="concept-card">
            <h2 className="concept-title">Advanced Decorators</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Class Decorators</h3>
            <CodeBlock
              title="Decorating Classes"
              code={`# Class decorator function
def add_greeting(cls):
    # Add a new method to the class
    cls.greet = lambda self: f"Hello from {self.__class__.__name__}"
    return cls

@add_greeting
class Person:
    def __init__(self, name):
        self.name = name

# Now Person instances have a greet method
p = Person("Alice")
print(p.greet())  # "Hello from Person"

# More practical class decorator: singleton
def singleton(cls):
    instances = {}
    
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    # Replace cls with the wrapper function
    return get_instance

@singleton
class DatabaseConnection:
    def __init__(self, db_url):
        print(f"Connecting to {db_url}")
        self.db_url = db_url

# Only creates one instance
db1 = DatabaseConnection("postgres://localhost:5432")
db2 = DatabaseConnection("postgres://localhost:5432")  # No new connection
print(db1 is db2)  # True`}
            />
            <p className="use-case">Use class decorators to modify or enhance class behavior without subclassing.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Method and Function Decorators with Parameters</h3>
            <CodeBlock
              title="Parameterized Decorators"
              code={`# Decorator with parameters
def rate_limit(max_calls, period):
    def decorator(func):
        calls = []
        
        def wrapper(*args, **kwargs):
            now = time.time()
            # Remove old calls (beyond the time period)
            calls[:] = [call for call in calls if now - call < period]
            
            if len(calls) >= max_calls:
                raise Exception(f"Rate limit exceeded: {max_calls} calls per {period}s")
                
            calls.append(now)
            return func(*args, **kwargs)
            
        return wrapper
    return decorator

# Using the parameterized decorator
@rate_limit(max_calls=2, period=60)
def api_request(endpoint):
    print(f"Requesting data from {endpoint}")
    return {"data": "..."}

# Will allow 2 calls within 60 seconds
api_request("/users")
api_request("/orders")
# api_request("/products")  # Would raise Exception

# Stacking multiple decorators
def log_args(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        return func(*args, **kwargs)
    return wrapper

def log_result(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_result      # Applied second (closest to function name is applied first)
@log_args        # Applied first
def calculate(a, b):
    return a + b

calculate(10, 20)
# Output:
# Calling calculate with args=(10, 20), kwargs={}
# calculate returned 30`}
            />
            <div className="analogy-badge">Similar to: Higher-order functions, middleware patterns</div>
            <p className="use-case">Use decorators with parameters for configurable behavior modification of functions and methods.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Preserving Function Metadata</h3>
            <CodeBlock
              title="Using functools.wraps"
              code={`from functools import wraps

def verbose(func):
    @wraps(func)  # Preserves name, docstring, etc.
    def wrapper(*args, **kwargs):
        """This is wrapper documentation"""
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@verbose
def square(x):
    """Return the square of x."""
    return x * x

# Without @wraps, these would show wrapper's info
print(square.__name__)      # "square" (not "wrapper")
print(square.__doc__)       # "Return the square of x."

# Practical application: Memoization decorator
def memoize(func):
    cache = {}
    
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# First call computes, subsequent calls use cached value
print(fibonacci(30))  # Fast computation due to memoization`}
            />
            <p className="use-case">Always use @wraps from functools when writing decorators to preserve function metadata.</p>
          </section>
          
          <section id="descriptors" className="concept-card">
            <h2 className="concept-title">Descriptors</h2>
            <p className="mb-4">Python's mechanism for creating managed attributes with custom access behavior.</p>
            
            <CodeBlock
              title="How Descriptors Work"
              code={`# A descriptor is an object with any of these methods:
# __get__, __set__, __delete__

class Validator:
    def __init__(self, name=None, **kwargs):
        self.name = name
        for key, value in kwargs.items():
            setattr(self, key, value)
            
    def __set__(self, instance, value):
        instance.__dict__[self.name] = value
        
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__[self.name]
    
class OneOf(Validator):
    def __init__(self, *options, **kwargs):
        self.options = set(options)
        super().__init__(**kwargs)
        
    def __set__(self, instance, value):
        if value not in self.options:
            raise ValueError(f"Expected value to be one of {self.options}, got {value}")
        super().__set__(instance, value)

class Number(Validator):
    def __init__(self, minvalue=None, maxvalue=None, **kwargs):
        self.minvalue = minvalue
        self.maxvalue = maxvalue
        super().__init__(**kwargs)
        
    def __set__(self, instance, value):
        if not isinstance(value, (int, float)):
            raise TypeError(f"Expected a number, got {type(value).__name__}")
        if self.minvalue is not None and value < self.minvalue:
            raise ValueError(f"Expected value >= {self.minvalue}, got {value}")
        if self.maxvalue is not None and value > self.maxvalue:
            raise ValueError(f"Expected value <= {self.maxvalue}, got {value}")
        super().__set__(instance, value)

# Using descriptors for attribute validation
class Product:
    name = Validator(name="name")
    price = Number(minvalue=0, name="price")
    category = OneOf("electronics", "clothing", "food", name="category")
    
    def __init__(self, name, price, category):
        self.name = name
        self.price = price
        self.category = category

# Creating a product with valid attributes
laptop = Product("Laptop", 999.99, "electronics")
print(laptop.price)     # 999.99
print(laptop.category)  # "electronics"

# Will raise validation errors
try:
    laptop.price = -50
except ValueError as e:
    print(str(e))      # "Expected value >= 0, got -50"
    
try:
    laptop.category = "furniture"
except ValueError as e:
    print(str(e))      # "Expected value to be one of {'electronics', 'clothing', 'food'}, got furniture"`}
            />
            <div className="analogy-badge">Similar to: Property system in languages like C#</div>
            <p className="use-case">Use descriptors for creating reusable attribute validation, type checking, or computed properties.</p>
          </section>
          
          <section id="advanced-oop" className="concept-card">
            <h2 className="concept-title">Advanced OOP</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Mixins</h3>
            <CodeBlock
              title="Mixin Classes"
              code={`# Mixin classes provide methods to other classes without inheritance
class JSONSerializableMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class CSVSerializableMixin:
    def to_csv(self):
        return ",".join(str(v) for v in self.__dict__.values())

class LoggableMixin:
    def log(self, message):
        print(f"[LOG] {self.__class__.__name__}: {message}")

# Using mixins for composition
class User(JSONSerializableMixin, LoggableMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.log("User created")

# Using the mixin methods
user = User("Alice", "alice@example.com")
print(user.to_json())  # {"name": "Alice", "email": "alice@example.com"}
user.log("Profile updated")  # [LOG] User: Profile updated`}
            />
            <div className="analogy-badge">Similar to: Interface implementation, traits</div>
            <p className="use-case">Use mixins to share behavior between unrelated classes without full inheritance hierarchy.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Abstract Base Classes</h3>
            <CodeBlock
              title="ABCs for Interface Definition"
              code={`from abc import ABC, abstractmethod

# Abstract base class defining an interface
class Shape(ABC):
    @abstractmethod
    def area(self):
        """Calculate area of the shape."""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Calculate perimeter of the shape."""
        pass
    
    def describe(self):
        """Non-abstract method with default implementation."""
        return f"This shape has area {self.area()} and perimeter {self.perimeter()}"

# Concrete implementations
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

# Cannot instantiate abstract class
try:
    shape = Shape()
except TypeError as e:
    print(str(e))  # "Can't instantiate abstract class Shape with abstract methods area, perimeter"

# Using concrete implementations
circle = Circle(5)
print(circle.area())      # ~78.54
print(circle.describe())  # "This shape has area 78.54 and perimeter 31.42"

# Checking if a class implements an interface
print(issubclass(Circle, Shape))      # True
print(isinstance(circle, Shape))      # True`}
            />
            <div className="analogy-badge">Similar to: Interfaces in languages like Java</div>
            <p className="use-case">Use ABCs to define interfaces, enforce implementation contracts, and document expected behavior.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Special Methods</h3>
            <CodeBlock
              title="Magic Methods for Custom Behavior"
              code={`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # String representation
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    # Mathematical operations
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __rmul__(self, scalar):
        return self.__mul__(scalar)
    
    # Comparison
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    # Container behavior
    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError("Vector index out of range")
    
    # Length
    def __len__(self):
        return 2
    
    # Make object callable
    def __call__(self, *args):
        return self.x * args[0] + self.y * args[1]
    
    # Context manager protocol
    def __enter__(self):
        print("Vector context entered")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Vector context exited")

# Using the customized behavior
v1 = Vector(1, 2)
v2 = Vector(3, 4)

# Operators
v3 = v1 + v2        # Vector(4, 6)
v4 = v1 * 3         # Vector(3, 6)
v5 = 2 * v1         # Vector(2, 4) (uses __rmul__)

# Comparisons
print(v1 == Vector(1, 2))  # True

# Container behavior 
x = v1[0]           # 1
y = v1[1]           # 2

# Length
print(len(v1))      # 2

# Callable
dot_product = v1(3, 4)  # 1*3 + 2*4 = 11

# Context manager
with Vector(5, 6) as v:
    print(v)        # Vector(5, 6)
    # Exits context automatically`}
            />
            <div className="analogy-badge">Similar to: Operator overloading, interfaces in other languages</div>
            <p className="use-case">Implement special methods to make your objects behave like native Python types with intuitive syntax.</p>
          </section>
          
          <section id="concurrency" className="concept-card">
            <h2 className="concept-title">Concurrency & Parallelism</h2>
            <p className="mb-4">Python offers several models for concurrent and parallel execution.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Threading</h3>
            <CodeBlock
              title="Threading Module"
              code={`import threading
import time

# Function to be run in threads
def worker(name, delay):
    print(f"Thread {name} starting")
    time.sleep(delay)
    print(f"Thread {name} finished after {delay}s")

# Creating and starting threads
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(i, i+1))
    threads.append(t)
    t.start()

# Wait for all threads to complete
for t in threads:
    t.join()

print("All threads completed")

# Note: Due to Python's Global Interpreter Lock (GIL),
# threads cannot execute Python code in parallel, but are
# useful for I/O-bound tasks that release the GIL

# Thread-safe data structures
from queue import Queue
from threading import Thread

# Creating a thread-safe queue
q = Queue()

# Producer function
def producer():
    for i in range(10):
        q.put(i)
        print(f"Produced: {i}")
        time.sleep(0.5)

# Consumer function
def consumer():
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Consumed: {item}")
        q.task_done()

# Start producer and consumer threads
prod_thread = Thread(target=producer)
cons_thread = Thread(target=consumer)
prod_thread.start()
cons_thread.start()

# Wait for producer to finish
prod_thread.join()
q.put(None)  # Signal consumer to exit
cons_thread.join()`}
            />
            <div className="analogy-badge">Similar to: java.lang.Thread, std::thread in C++</div>
            <p className="use-case">Use threading for I/O-bound tasks (network, file operations) where threads wait for external resources.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Multiprocessing</h3>
            <CodeBlock
              title="Multiprocessing Module"
              code={`from multiprocessing import Process, Pool
import os
import time

# Function to be executed in separate processes
def cpu_bound(number):
    return sum(i * i for i in range(number))

# Serial execution
def run_serial():
    start = time.time()
    results = [cpu_bound(n) for n in [5_000_000, 4_000_000, 3_000_000]]
    end = time.time()
    print(f"Serial execution time: {end - start:.2f}s")

# Parallel execution with Process
def run_processes():
    start = time.time()
    processes = []
    numbers = [5_000_000, 4_000_000, 3_000_000]
    
    for number in numbers:
        p = Process(target=cpu_bound, args=(number,))
        processes.append(p)
        p.start()
        
    for p in processes:
        p.join()
        
    end = time.time()
    print(f"Process-based execution time: {end - start:.2f}s")

# Parallel execution with Pool
def run_pool():
    start = time.time()
    pool = Pool()
    numbers = [5_000_000, 4_000_000, 3_000_000]
    results = pool.map(cpu_bound, numbers)
    pool.close()
    pool.join()
    end = time.time()
    print(f"Pool-based execution time: {end - start:.2f}s")

# Run the different methods
if __name__ == "__main__":
    run_serial()
    run_processes()
    run_pool()

# Sharing data between processes with shared memory
from multiprocessing import Value, Array

def increment_counter(counter):
    with counter.get_lock():
        counter.value += 1

def process_with_shared_data():
    # Shared integer
    counter = Value('i', 0)
    processes = []
    
    for _ in range(10):
        p = Process(target=increment_counter, args=(counter,))
        processes.append(p)
        p.start()
        
    for p in processes:
        p.join()
        
    print(f"Final counter value: {counter.value}")`}
            />
            <div className="analogy-badge">Similar to: Process-based concurrency in other languages</div>
            <p className="use-case">Use multiprocessing for CPU-bound tasks that benefit from parallel execution on multiple cores.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Asyncio</h3>
            <CodeBlock
              title="Async/Await with asyncio"
              code={`# Python 3.7+ asyncio syntax
import asyncio
import time

# Coroutine definition
async def say_after(delay, message):
    await asyncio.sleep(delay)
    print(message)

# Running coroutines sequentially
async def sequential():
    start = time.time()
    await say_after(1, "Hello")
    await say_after(2, "World")
    end = time.time()
    print(f"Sequential execution time: {end - start:.2f}s")  # ~3s

# Running coroutines concurrently
async def concurrent():
    start = time.time()
    task1 = asyncio.create_task(say_after(1, "Hello"))
    task2 = asyncio.create_task(say_after(2, "World"))
    
    # Wait for both tasks to complete
    await task1
    await task2
    
    end = time.time()
    print(f"Concurrent execution time: {end - start:.2f}s")  # ~2s

# Running multiple coroutines with gather
async def gather_example():
    start = time.time()
    # gather combines multiple awaitables into a single one
    await asyncio.gather(
        say_after(1, "Hello"),
        say_after(2, "World"),
        say_after(3, "Async")
    )
    end = time.time()
    print(f"Gather execution time: {end - start:.2f}s")  # ~3s

# Practical example: Asynchronous HTTP requests
async def fetch_url(url):
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def fetch_multiple_urls():
    urls = [
        "https://python.org",
        "https://github.com",
        "https://stackoverflow.com"
    ]
    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)
    for url, result in zip(urls, results):
        print(f"{url}: {len(result)} bytes")

# Run the event loop
asyncio.run(sequential())
asyncio.run(concurrent())
asyncio.run(gather_example())`}
            />
            <div className="analogy-badge">Similar to: async/await in JavaScript, C#</div>
            <p className="use-case">Use asyncio for I/O-bound tasks where you need high concurrency without the overhead of threads.</p>
          </section>
          
          <section id="c-interface" className="concept-card">
            <h2 className="concept-title">Python C API & ctypes</h2>
            <p className="mb-4">Interfacing Python with C libraries and code.</p>
            
            <CodeBlock
              title="Using ctypes"
              code={`import ctypes

# Load a C library
# On Windows: libc = ctypes.cdll.msvcrt
# On Unix-like systems:
libc = ctypes.CDLL(None)  # Load the standard C library

# Call a C function
libc.printf(b"Hello from C!\\n")

# Define argument and result types
libc.time.argtypes = [ctypes.POINTER(ctypes.c_long)]
libc.time.restype = ctypes.c_long

# Call time() function
current_time = libc.time(None)
print(f"Current time: {current_time}")

# Working with structs
class Point(ctypes.Structure):
    _fields_ = [
        ("x", ctypes.c_int),
        ("y", ctypes.c_int)
    ]

# Create and use a struct
p = Point(10, 20)
print(f"Point: ({p.x}, {p.y})")

# Create and pass arrays
array_type = ctypes.c_int * 5
values = array_type(1, 2, 3, 4, 5)
for i in range(5):
    print(values[i])

# More complex example: calling a math function
import math
from ctypes import c_double

# Define a function pointer type for a math function
CFUNCTYPE = ctypes.CFUNCTYPE(c_double, c_double)

# Create a callback function for integration
def my_function(x):
    return x * x

# Convert Python function to C function pointer
c_func = CFUNCTYPE(my_function)

# Define a simple numerical integration function in C-style
def integrate(func, a, b, steps):
    width = (b - a) / steps
    sum_val = 0.0
    for i in range(steps):
        x = a + (i + 0.5) * width
        sum_val += func(x) * width
    return sum_val

# Use the integration function
result = integrate(c_func, 0, 1, 1000)
print(f"Integral of x^2 from 0 to 1: {result}")
print(f"Exact value: {1/3}")`}
            />
            <div className="analogy-badge">Similar to: JNI in Java, P/Invoke in C#</div>
            <p className="use-case">Use ctypes to call C libraries when you need performance-critical operations or access to system APIs.</p>
          </section>
          
          <section id="regex" className="concept-card">
            <h2 className="concept-title">Advanced Regular Expressions</h2>
            <p className="mb-4">Powerful pattern matching and text processing with Python's re module.</p>
            
            <CodeBlock
              title="Complex Regex Patterns"
              code={`import re

# Basic regex patterns review
text = "Contact us at info@example.com or support@company.co.uk"
emails = re.findall(r'[\\w.+-]+@[\\w-]+\\.[\\w.-]+', text)
print(emails)  # ['info@example.com', 'support@company.co.uk']

# Named groups for better readability
pattern = r'(?P<name>\\w+)\\s(?P<surname>\\w+)'
match = re.search(pattern, "John Smith")
if match:
    print(match.group('name'))    # John
    print(match.group('surname')) # Smith
    print(match.groupdict())      # {'name': 'John', 'surname': 'Smith'}

# Lookahead and lookbehind assertions
# Find words followed by a number, without including the number
text = "apple1 banana2 cherry3"
matches = re.findall(r'\\w+(?=\\d)', text)
print(matches)  # ['apple', 'banana', 'cherry']

# Find numbers preceded by 'version', without including 'version'
text = "version1.0, model2.5, version3.1"
matches = re.findall(r'(?<=version)\\d+\\.\\d+', text)
print(matches)  # ['1.0', '3.1']

# Negative lookahead: words not followed by a digit
matches = re.findall(r'\\w+(?!\\d)', text)
print(matches)  # Words not directly followed by a digit

# Greedy vs non-greedy matching
text = "<div>Content 1</div><div>Content 2</div>"
greedy = re.findall(r'<div>(.*)</div>', text)
non_greedy = re.findall(r'<div>(.*?)</div>', text)
print(greedy)      # ['Content 1</div><div>Content 2']
print(non_greedy)  # ['Content 1', 'Content 2']

# Flags for advanced matching
multiline = """Line 1
Line 2
Line 3"""

# Without MULTILINE flag, ^ matches start of string only
print(re.findall(r'^Line', multiline))  # ['Line']

# With MULTILINE flag, ^ matches at start of each line
print(re.findall(r'^Line', multiline, re.MULTILINE))  # ['Line', 'Line', 'Line']

# Case-insensitive matching
print(re.findall(r'python', 'Python is great', re.IGNORECASE))  # ['Python']

# Verbose mode for complex patterns with comments
phone_regex = re.compile(r'''
    \\(\\d{3}\\)     # Area code
    [ \\-]?          # Optional space or dash
    \\d{3}           # First 3 digits
    -                # Separator
    \\d{4}           # Last 4 digits
    ''', re.VERBOSE)

matches = phone_regex.findall("Call (123)-456-7890 or (999)-888-7777")
print(matches)  # ['(123)-456-7890', '(999)-888-7777']

# Compiled patterns for better performance
word_pattern = re.compile(r'\\b\\w+\\b')
text = "This is a test of the regex system."

# Pre-compiled pattern is more efficient for repeated use
words = word_pattern.findall(text)
print(words)  # ['This', 'is', 'a', 'test', 'of', 'the', 'regex', 'system']`}
            />
            <div className="analogy-badge">Similar to: RegEx in most languages</div>
            <p className="use-case">Use advanced regex features for complex text parsing, data extraction, and validation.</p>
          </section>
          
          <section id="advanced-stdlib" className="concept-card">
            <h2 className="concept-title">Advanced Standard Library</h2>
            <p className="mb-4">Lesser-known but powerful modules from Python's standard library.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">functools</h3>
            <CodeBlock
              title="Higher-Order Functions with functools"
              code={`from functools import reduce, partial, lru_cache, singledispatch

# reduce: Apply a function cumulatively
numbers = [1, 2, 3, 4, 5]
sum_all = reduce(lambda x, y: x + y, numbers)
print(sum_all)  # 15

factorial = reduce(lambda x, y: x * y, range(1, 6))
print(factorial)  # 120

# partial: Create new function with fixed arguments
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(4))  # 16
print(cube(4))    # 64

# lru_cache: Memoization decorator
@lru_cache(maxsize=128)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# First call computes, subsequent calls use cached value
print(fibonacci(30))  # Fast computation due to caching

# singledispatch: Function overloading based on type
@singledispatch
def process(arg):
    return f"Default: {arg}"

@process.register
def _(arg: int):
    return f"Processing integer: {arg}"

@process.register
def _(arg: list):
    return f"Processing list with {len(arg)} items"

@process.register(str)  # Alternative syntax
def _(arg):
    return f"Processing string of length {len(arg)}"

print(process(10))         # "Processing integer: 10"
print(process([1, 2, 3]))  # "Processing list with 3 items"
print(process("hello"))    # "Processing string of length 5"
print(process(1.5))        # "Default: 1.5"`}
            />
            <p className="use-case">Use functools for function transformations, memoization, and type-based dispatch.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">itertools</h3>
            <CodeBlock
              title="Advanced Iteration with itertools"
              code={`from itertools import (
    cycle, islice, chain, combinations, permutations, 
    product, groupby, count, accumulate
)

# Infinite iterators with slicing
cycler = cycle(["red", "green", "blue"])
print(list(islice(cycler, 7)))  # ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# Chaining multiple iterables
combined = chain([1, 2], [3, 4], [5, 6])
print(list(combined))  # [1, 2, 3, 4, 5, 6]

# Combinations and permutations
print(list(combinations("ABC", 2)))  # [('A', 'B'), ('A', 'C'), ('B', 'C')]
print(list(permutations("ABC", 2)))  # [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# Cartesian product
print(list(product("AB", "12")))  # [('A', '1'), ('A', '2'), ('B', '1'), ('B', '2')]

# Grouping data
animals = ["cat", "dog", "cow", "duck", "deer"]
grouped = groupby(sorted(animals), key=lambda x: x[0])
for key, group in grouped:
    print(key, ":", list(group))
    # c : ['cat', 'cow']
    # d : ['deer', 'dog', 'duck']

# Counting with a start value
for i in islice(count(10, 5), 5):  # Start at 10, step by 5, take 5 items
    print(i)  # 10, 15, 20, 25, 30

# Running totals (like cumulative sum)
print(list(accumulate([1, 2, 3, 4, 5])))  # [1, 3, 6, 10, 15]
print(list(accumulate([1, 2, 3, 4, 5], lambda x, y: x * y)))  # [1, 2, 6, 24, 120]`}
            />
            <p className="use-case">Use itertools for efficient iterators, combinatorics, and data transformations.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">More Advanced Modules</h3>
            <CodeBlock
              title="Other Powerful Standard Modules"
              code={`# dataclasses: Clean class definitions (Python 3.7+)
from dataclasses import dataclass, field

@dataclass(frozen=True)  # Immutable class
class Point:
    x: int
    y: int
    name: str = "Point"  # Default value
    history: list = field(default_factory=list)  # Mutable default
    
    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(f"{p.name} is at ({p.x}, {p.y})")  # "Point is at (3, 4)"
print(p.distance_from_origin())  # 5.0

# heapq: Heap queue algorithm
import heapq

# Create a heap from a list
numbers = [10, 5, 20, 15, 30]
heapq.heapify(numbers)  # Transform list into a heap
print(numbers)  # [5, 10, 20, 15, 30]

# Pop smallest items in order
print(heapq.heappop(numbers))  # 5
print(heapq.heappop(numbers))  # 10

# Priority queue with heapq
tasks = [(4, 'Read documentation'), (2, 'Fix critical bug'), (5, 'Write tests')]
heapq.heapify(tasks)
while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"Do: {task} (priority: {priority})")

# contextlib: Context manager utilities
from contextlib import contextmanager, suppress, redirect_stdout
import io

# Redirect stdout temporarily
f = io.StringIO()
with redirect_stdout(f):
    print("This will be captured")
output = f.getvalue()
print(f"Captured: {output}")  # "Captured: This will be captured\\n"

# Suppress specific exceptions
with suppress(FileNotFoundError):
    with open('nonexistent.txt') as f:
        content = f.read()
        # No exception is raised if file doesn't exist

# enum: Enumeration types
from enum import Enum, auto

class Color(Enum):
    RED = auto()
    GREEN = auto()
    BLUE = auto()

print(Color.RED)        # Color.RED
print(Color.RED.name)   # RED
print(Color.RED.value)  # 1
print(list(Color))      # [Color.RED, Color.GREEN, Color.BLUE]`}
            />
            <p className="use-case">Explore these advanced standard library modules for code that's more concise, maintainable, and efficient.</p>
          </section>
          
          <section id="testing" className="concept-card">
            <h2 className="concept-title">Testing Frameworks</h2>
            <p className="mb-4">Python's testing tools for reliable, maintainable code.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">unittest</h3>
            <CodeBlock
              title="Built-in unittest Framework"
              code={`import unittest

# Function to test
def add(a, b):
    return a + b

# Test case class
class TestAddFunction(unittest.TestCase):
    def test_add_positive_numbers(self):
        self.assertEqual(add(1, 2), 3)
        
    def test_add_negative_numbers(self):
        self.assertEqual(add(-1, -1), -2)
        
    def test_add_mixed_numbers(self):
        self.assertEqual(add(-1, 1), 0)
        
    def test_add_zero(self):
        self.assertEqual(add(5, 0), 5)
    
    # Setup and teardown methods
    def setUp(self):
        # Called before each test
        print("Setting up test case")
    
    def tearDown(self):
        # Called after each test
        print("Tearing down test case")
    
    @classmethod
    def setUpClass(cls):
        # Called before all tests in this class
        print("Setting up test class")
    
    @classmethod
    def tearDownClass(cls):
        # Called after all tests in this class
        print("Tearing down test class")
    
    # Assertions examples
    def test_assertions(self):
        self.assertTrue(1 < 2)
        self.assertFalse(1 > 2)
        self.assertIs(None, None)
        self.assertIsNot(1, 2)
        self.assertIn('a', 'abc')
        self.assertNotIn('d', 'abc')
        self.assertIsInstance('abc', str)
        self.assertRaises(ValueError, int, 'abc')
        
        # Context manager style for assertRaises
        with self.assertRaises(ZeroDivisionError):
            x = 1 / 0

# Running tests
if __name__ == '__main__':
    unittest.main()`}
            />
            <div className="analogy-badge">Similar to: JUnit in Java, testing frameworks in other languages</div>
            <p className="use-case">Use unittest for a full-featured testing framework included in Python's standard library.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">pytest</h3>
            <CodeBlock
              title="Modern pytest Framework"
              code={`# pytest - modern Python testing framework
# Install: pip install pytest
import pytest

# Simple tests
def test_add():
    assert 1 + 1 == 2

def test_zero_division():
    with pytest.raises(ZeroDivisionError):
        1 / 0

# Parameterized testing
@pytest.mark.parametrize("input_val, expected", [
    (2, 4),
    (3, 9),
    (4, 16),
    (-2, 4),
    (0, 0)
])
def test_square(input_val, expected):
    assert input_val ** 2 == expected

# Fixtures for setup and shared resources
@pytest.fixture
def sample_data():
    data = {'key1': 'value1', 'key2': 'value2'}
    # Setup
    yield data
    # Teardown (code after yield runs after test completes)
    data.clear()

def test_with_fixture(sample_data):
    assert 'key1' in sample_data
    assert sample_data['key1'] == 'value1'

# Fixture with scope
@pytest.fixture(scope="module")
def database_connection():
    # Connect to test database
    print("Connecting to test database")
    conn = {"status": "connected"}
    yield conn
    # Disconnect after all tests in module
    print("Disconnecting from test database")

def test_database_query(database_connection):
    assert database_connection["status"] == "connected"

# Marking tests
@pytest.mark.slow
def test_slow_operation():
    # Slow test
    import time
    time.sleep(0.1)
    assert True

# Running tests with markers: pytest -m slow
# Skipping tests
@pytest.mark.skip(reason="Not implemented yet")
def test_future_feature():
    assert False  # Won't run

# Conditionally skipping
@pytest.mark.skipif(
    sys.version_info < (3, 9),
    reason="Requires Python 3.9 or higher"
)
def test_new_feature():
    assert True  # Only runs on Python 3.9+

# Run with: pytest -v test_file.py`}
            />
            <p className="use-case">Use pytest for modern, concise testing with powerful fixtures, parameterization, and plugins.</p>
          </section>
          
          <section id="packaging" className="concept-card">
            <h2 className="concept-title">Packaging & Distribution</h2>
            <p className="mb-4">Preparing Python code for distribution and reuse.</p>
            
            <CodeBlock
              title="Creating and Distributing Packages"
              code={`# Basic project structure
"""
my_package/
├── setup.py
├── README.md
├── LICENSE
├── my_package/
│   ├── __init__.py
│   ├── module1.py
│   └── module2.py
└── tests/
    ├── __init__.py
    ├── test_module1.py
    └── test_module2.py
"""

# setup.py example
"""
from setuptools import setup, find_packages

# Read README for long description
with open("README.md") as f:
    long_description = f.read()

setup(
    name="my_package",
    version="0.1.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A short description of your package",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/my_package",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
    install_requires=[
        "requests>=2.25.0",
        "numpy>=1.19.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0.0",
            "black>=21.5b2",
        ],
    },
    entry_points={
        "console_scripts": [
            "my-command=my_package.module1:main_function",
        ],
    },
)
"""

# Modern pyproject.toml approach (Python 3.8+)
"""
[build-system]
requires = ["setuptools>=42", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my_package"
version = "0.1.0"
authors = [
    {name = "Your Name", email = "your.email@example.com"},
]
description = "A short description of your package"
readme = "README.md"
requires-python = ">=3.8"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
]
dependencies = [
    "requests>=2.25.0",
    "numpy>=1.19.0",
]

[project.urls]
"Homepage" = "https://github.com/yourusername/my_package"
"Bug Tracker" = "https://github.com/yourusername/my_package/issues"

[project.scripts]
my-command = "my_package.module1:main_function"

[project.optional-dependencies]
dev = ["pytest>=6.0.0", "black>=21.5b2"]
"""

# Commands to package and publish
"""
# Build distribution packages
python -m pip install --upgrade build
python -m build

# Local installation for testing
pip install -e .

# Upload to PyPI
python -m pip install --upgrade twine
python -m twine upload dist/*
"""

# __init__.py for controlled imports
"""
# my_package/__init__.py

# Define what's accessible via 'from my_package import *'
__all__ = ['function_a', 'ClassA', 'ClassB']

# Import key components to make them available at package level
from .module1 import function_a, ClassA
from .module2 import ClassB

# Package metadata
__version__ = '0.1.0'
__author__ = 'Your Name'
"""

# Creating and using virtual environments
"""
# Creating a virtual environment
python -m venv myenv

# Activating the environment
# Windows: myenv\\Scripts\\activate
# Unix/MacOS: source myenv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Freezing dependencies
pip freeze > requirements.txt
"""`}
            />
            <div className="analogy-badge">Similar to: Maven in Java, npm in JavaScript</div>
            <p className="use-case">Use proper packaging to make your Python code reusable, distributable, and version-controlled.</p>
          </section>
          
          <div className="mt-12 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium mb-2">Next steps in your Python journey</h3>
            <p className="text-gray-700">
              Now that you've explored advanced Python concepts, here are some suggestions for further learning:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Explore domain-specific libraries like NumPy, Pandas, and PyTorch</li>
              <li>Contribute to open-source Python projects</li>
              <li>Design your own Python package following best practices</li>
              <li>Dive deeper into Python internals and CPython source code</li>
            </ul>
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

export default Mastery;
