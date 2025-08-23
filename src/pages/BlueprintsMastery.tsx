import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Cog, Zap, Target } from 'lucide-react';
import blueprintsMastery from '@/assets/blueprints-mastery.jpg';

const BlueprintsMastery = () => {
  const [tocItems, setTocItems] = useState([
    { id: 'introduction', title: 'Advanced Architecture' },
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
        title="Advanced Development Blueprints" 
        subtitle="Master-level architectural patterns and techniques for building enterprise Python systems."
      /> 
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${blueprintsMastery})` }}
        />
        <div className="relative bg-gradient-to-br from-background via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <Link to="/blueprints">
                <Button variant="outline" size="sm" className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Essential Blueprints
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Master-Level Blueprints
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Advanced architectural patterns used in production systems, frameworks, and enterprise applications. 
                These blueprints separate expert developers from the rest.
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <FileText className="w-8 h-8 text-purple-600 mb-2 mx-auto" />
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">Meta-Programming</h3>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Code that writes code</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                  <Cog className="w-8 h-8 text-indigo-600 mb-2 mx-auto" />
                  <h3 className="font-semibold text-indigo-800 dark:text-indigo-200">System Design</h3>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">Enterprise patterns</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <Zap className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Performance</h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Optimization techniques</p>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                  <Target className="w-8 h-8 text-cyan-600 mb-2 mx-auto" />
                  <h3 className="font-semibold text-cyan-800 dark:text-cyan-200">Production</h3>
                  <p className="text-xs text-cyan-700 dark:text-cyan-300">Real-world systems</p>
                </div>
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
          {/* Introduction */}
          <section id="introduction" className="concept-card mb-16">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-border shadow-lg">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Advanced Architecture: Building Systems That Scale
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  You've mastered the essential blueprints. Now we venture into the realm of advanced architectural 
                  patterns—the sophisticated designs that power frameworks like Django, Flask, and AsyncIO. These 
                  patterns separate library authors from library users, framework creators from framework consumers.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  This is where Python's true power emerges: metaclasses that modify class creation, descriptors 
                  that control attribute access, concurrency patterns that harness multiple cores, and testing 
                  frameworks that ensure system reliability. These are the blueprints of production systems.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-muted-foreground">
                  "The difference between a good developer and a great one is not just knowing the patterns, 
                  but understanding when and why to apply them." - Software Architecture Principles
                </blockquote>
              </div>
            </div>
          </section>

          <section id="metaclasses" className="concept-card">
            <h2 className="concept-title">Metaclass Blueprints</h2>
            <p className="mb-4">The ultimate meta-programming pattern: classes that control how other classes are created and behave.</p>
            
            <CodeBlock
              title="Production Metaclass Patterns"
              code={`# Metaclass Blueprint: Registry Pattern for Plugin Systems
class PluginRegistry(type):
    """
    Metaclass that automatically registers plugins
    Used in frameworks like Django's model system
    """
    plugins = {}
    
    def __new__(mcs, name, bases, attrs):
        cls = super().__new__(mcs, name, bases, attrs)
        
        # Auto-register all classes except base classes
        if name != "Plugin" and any(issubclass(base, Plugin) for base in bases if hasattr(base, '__name__')):
            mcs.plugins[name] = cls
            cls._plugin_name = name
            
        return cls
    
    def __init__(cls, name, bases, attrs):
        super().__init__(name, bases, attrs)
        
        # Validate plugin interface
        if hasattr(cls, 'execute') and name != "Plugin":
            if not callable(getattr(cls, 'execute')):
                raise TypeError(f"Plugin {name} must implement callable 'execute' method")

class Plugin(metaclass=PluginRegistry):
    """Base plugin class - all plugins inherit from this"""
    
    def execute(self, *args, **kwargs):
        raise NotImplementedError("Plugins must implement execute method")
    
    @classmethod
    def get_all_plugins(cls):
        return PluginRegistry.plugins

# Automatic registration in action
class DataProcessorPlugin(Plugin):
    def execute(self, data):
        return [item.upper() for item in data]

class ValidationPlugin(Plugin):
    def execute(self, data):
        return all(isinstance(item, str) for item in data)

# Framework usage - plugins are automatically discovered
print(Plugin.get_all_plugins())
# Access any plugin by name
processor = PluginRegistry.plugins["DataProcessorPlugin"]()
result = processor.execute(["hello", "world"])  # ["HELLO", "WORLD"]

# Advanced Metaclass: ORM-like Field Validation
class ModelMeta(type):
    def __new__(mcs, name, bases, attrs):
        # Collect field definitions
        fields = {}
        for key, value in list(attrs.items()):
            if isinstance(value, Field):
                fields[key] = value
                value.name = key
                # Remove field definition from class attrs
                del attrs[key]
        
        attrs['_fields'] = fields
        cls = super().__new__(mcs, name, bases, attrs)
        return cls

class Field:
    def __init__(self, field_type=str, required=True, default=None):
        self.field_type = field_type
        self.required = required
        self.default = default
        self.name = None
    
    def __get__(self, obj, owner):
        if obj is None:
            return self
        return obj.__dict__.get(self.name, self.default)
    
    def __set__(self, obj, value):
        if value is None and self.required:
            raise ValueError(f"Field {self.name} is required")
        if value is not None and not isinstance(value, self.field_type):
            raise TypeError(f"Field {self.name} must be {self.field_type.__name__}")
        obj.__dict__[self.name] = value

class Model(metaclass=ModelMeta):
    def __init__(self, **kwargs):
        # Initialize all fields
        for name, field in self._fields.items():
            setattr(self, name, kwargs.get(name, field.default))

# Usage - automatic field validation
class User(Model):
    name = Field(str, required=True)
    age = Field(int, required=False, default=0)
    email = Field(str, required=True)

user = User(name="Alice", email="alice@example.com")
print(user.name)  # Alice
# user.age = "invalid"  # Raises TypeError`}
            />
            <div className="analogy-badge">Advanced Pattern: Framework-level class factories and automatic registration</div>
            <p className="use-case">Use metaclasses for framework development, plugin systems, and enforcing class-level contracts across inheritance hierarchies.</p>
          </section>
          
          <section id="advanced-decorators" className="concept-card">
            <h2 className="concept-title">Advanced Decorator Blueprints</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Production Decorator Patterns</h3>

            <CodeBlock
              title="Enterprise-Level Decorators"
              code={`from functools import wraps, lru_cache
import time
import threading
from typing import Callable, Any

# Thread-safe rate limiting decorator
class RateLimiter:
    def __init__(self, max_calls: int, time_window: int):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = {}
        self.lock = threading.Lock()
    
    def __call__(self, func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            with self.lock:
                now = time.time()
                
                # Clean old entries
                self.calls = {
                    timestamp: count 
                    for timestamp, count in self.calls.items() 
                    if now - timestamp < self.time_window
                }
                
                # Count current calls
                current_calls = sum(self.calls.values())
                
                if current_calls >= self.max_calls:
                    raise Exception(f"Rate limit exceeded: {self.max_calls} calls per {self.time_window}s")
                
                # Record this call
                self.calls[now] = self.calls.get(now, 0) + 1
                
            return func(*args, **kwargs)
        return wrapper

# Circuit breaker pattern for resilient systems
class CircuitBreaker:
    def __init__(self, failure_threshold: int = 3, timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
    
    def __call__(self, func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            if self.state == "OPEN":
                if time.time() - self.last_failure_time >= self.timeout:
                    self.state = "HALF_OPEN"
                else:
                    raise Exception("Circuit breaker is OPEN - service unavailable")
            
            try:
                result = func(*args, **kwargs)
                # Success - reset circuit breaker
                if self.state == "HALF_OPEN":
                    self.state = "CLOSED"
                    self.failure_count = 0
                return result
                
            except Exception as e:
                self.failure_count += 1
                if self.failure_count >= self.failure_threshold:
                    self.state = "OPEN"
                    self.last_failure_time = time.time()
                raise e
                
        return wrapper

# Distributed cache decorator with Redis-like interface
class DistributedCache:
    def __init__(self, expiry: int = 300, key_prefix: str = "cache"):
        self.expiry = expiry
        self.key_prefix = key_prefix
        self.storage = {}  # In production: Redis/Memcached
    
    def __call__(self, func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Generate cache key from function name and arguments
            cache_key = f"{self.key_prefix}:{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            # Check cache
            if cache_key in self.storage:
                data, timestamp = self.storage[cache_key]
                if time.time() - timestamp < self.expiry:
                    return data
                else:
                    del self.storage[cache_key]
            
            # Execute function and cache result
            result = func(*args, **kwargs)
            self.storage[cache_key] = (result, time.time())
            return result
            
        return wrapper

# Usage examples in production
@RateLimiter(max_calls=10, time_window=60)
@CircuitBreaker(failure_threshold=3, timeout=30)
@DistributedCache(expiry=300)
def external_api_call(endpoint: str) -> dict:
    """
    Production API call with rate limiting, circuit breaking, and caching
    """
    # Simulate API call
    import random
    if random.random() < 0.1:  # 10% failure rate
        raise Exception("API call failed")
    
    return {"data": f"Response from {endpoint}", "timestamp": time.time()}

# Advanced decorator: Performance monitoring
def performance_monitor(track_memory=False):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            import psutil
            import os
            
            # Track performance metrics
            process = psutil.Process(os.getpid())
            start_time = time.time()
            start_memory = process.memory_info().rss if track_memory else 0
            
            try:
                result = func(*args, **kwargs)
                success = True
            except Exception as e:
                result = None
                success = False
                raise
            finally:
                end_time = time.time()
                end_memory = process.memory_info().rss if track_memory else 0
                
                # Log performance data
                metrics = {
                    "function": func.__name__,
                    "execution_time": end_time - start_time,
                    "success": success,
                }
                
                if track_memory:
                    metrics["memory_delta"] = end_memory - start_memory
                
                print(f"Performance: {metrics}")
            
            return result
        return wrapper
    return decorator

@performance_monitor(track_memory=True)
def cpu_intensive_task(n: int) -> int:
    """Example function with performance monitoring"""
    return sum(i * i for i in range(n))`}
            />
            <div className="analogy-badge">Production Pattern: Enterprise middleware and cross-cutting concerns</div>
            <p className="use-case">Use advanced decorators for resilience patterns, performance monitoring, security, and distributed system concerns.</p>
          </section>

          <section id="advanced-oop" className="concept-card">
            <h2 className="concept-title">Advanced Object-Oriented Blueprints</h2>
            <p className="mb-4">Master-level OOP patterns including Abstract Base Classes, multiple inheritance, and design patterns used in enterprise systems.</p>
            
            <CodeBlock
              title="Advanced OOP Architecture Patterns"
              code={`from abc import ABC, abstractmethod, abstractproperty
from typing import Protocol, runtime_checkable, TypeVar, Generic
from dataclasses import dataclass, field
from enum import Enum, auto
import weakref

# Abstract Base Classes - Production Foundation Pattern
class DataProcessor(ABC):
    """
    Abstract base class defining the contract for data processors
    Production pattern: Ensures consistent interfaces across implementations
    """
    
    @abstractmethod
    def process(self, data: Any) -> Any:
        """Process the input data and return transformed result"""
        pass
    
    @abstractmethod
    def validate(self, data: Any) -> bool:
        """Validate input data before processing"""
        pass
    
    @property
    @abstractmethod
    def supported_formats(self) -> List[str]:
        """Return list of supported data formats"""
        pass
    
    # Concrete method with default implementation
    def pipeline_process(self, data: Any) -> Any:
        """Template method pattern - defines processing pipeline"""
        if not self.validate(data):
            raise ValueError("Data validation failed")
        
        return self.process(data)

# Multiple inheritance with method resolution order considerations
class LoggingMixin:
    """Mixin for adding logging capabilities to any class"""
    
    def __init__(self, *args, **kwargs):
        # Important: Call super() to maintain MRO
        super().__init__(*args, **kwargs)
        self._logger = logging.getLogger(self.__class__.__name__)
    
    def log_operation(self, operation: str, *args, **kwargs):
        """Log an operation with context"""
        self._logger.info(f"Operation: {operation}", extra={
            "class": self.__class__.__name__,
            "args": args,
            "kwargs": kwargs
        })

class CachingMixin:
    """Mixin for adding caching capabilities"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._cache = {}
    
    def cached_operation(self, key: str, operation: Callable, *args, **kwargs):
        """Execute operation with caching"""
        if key not in self._cache:
            self._cache[key] = operation(*args, **kwargs)
        return self._cache[key]
    
    def clear_cache(self):
        """Clear all cached results"""
        self._cache.clear()

# Production implementation with multiple inheritance
class JSONDataProcessor(LoggingMixin, CachingMixin, DataProcessor):
    """
    Concrete implementation with multiple inheritance
    Production note: Order matters for MRO (Method Resolution Order)
    """
    
    def __init__(self, cache_enabled: bool = True):
        # Initialize all parent classes
        super().__init__()
        self.cache_enabled = cache_enabled
    
    def validate(self, data: Any) -> bool:
        """Validate JSON data structure"""
        try:
            if isinstance(data, str):
                json.loads(data)
            elif isinstance(data, dict):
                return True
            else:
                return False
            return True
        except json.JSONDecodeError:
            return False
    
    def process(self, data: Any) -> Dict[str, Any]:
        """Process JSON data with logging and caching"""
        self.log_operation("process", data_type=type(data).__name__)
        
        if self.cache_enabled:
            cache_key = f"process_{hash(str(data))}"
            return self.cached_operation(cache_key, self._do_process, data)
        
        return self._do_process(data)
    
    def _do_process(self, data: Any) -> Dict[str, Any]:
        """Internal processing implementation"""
        if isinstance(data, str):
            parsed = json.loads(data)
        else:
            parsed = data
        
        # Transform data (example processing)
        return {
            "processed": True,
            "original_keys": list(parsed.keys()) if isinstance(parsed, dict) else [],
            "record_count": len(parsed) if isinstance(parsed, (list, dict)) else 1,
            "processed_at": datetime.now().isoformat()
        }
    
    @property
    def supported_formats(self) -> List[str]:
        return ["json", "dict"]

# Protocol-based typing for duck typing (Python 3.8+)
@runtime_checkable
class Drawable(Protocol):
    """Protocol defining drawable objects - modern Python typing"""
    
    def draw(self) -> str:
        """Draw the object and return its representation"""
        ...
    
    def get_area(self) -> float:
        """Calculate and return the area"""
        ...

# Factory pattern with enum-based type system
class ShapeType(Enum):
    CIRCLE = auto()
    RECTANGLE = auto()
    TRIANGLE = auto()

@dataclass
class Circle:
    """Circle implementation using dataclass for cleaner code"""
    radius: float
    color: str = "black"
    
    def draw(self) -> str:
        return f"Drawing {self.color} circle with radius {self.radius}"
    
    def get_area(self) -> float:
        return 3.14159 * self.radius ** 2

@dataclass
class Rectangle:
    width: float
    height: float
    color: str = "black"
    
    def draw(self) -> str:
        return f"Drawing {self.color} rectangle {self.width}x{self.height}"
    
    def get_area(self) -> float:
        return self.width * self.height

class ShapeFactory:
    """Factory pattern for creating shapes with validation"""
    
    @staticmethod
    def create_shape(shape_type: ShapeType, **kwargs) -> Drawable:
        """Create shape with type safety and validation"""
        
        shapes = {
            ShapeType.CIRCLE: Circle,
            ShapeType.RECTANGLE: Rectangle,
        }
        
        if shape_type not in shapes:
            raise ValueError(f"Unsupported shape type: {shape_type}")
        
        shape_class = shapes[shape_type]
        
        try:
            shape = shape_class(**kwargs)
            # Validate that the created object implements Drawable protocol
            if not isinstance(shape, Drawable):
                raise TypeError(f"Shape {shape_class.__name__} doesn't implement Drawable protocol")
            
            return shape
            
        except TypeError as e:
            raise ValueError(f"Invalid parameters for {shape_type.name}: {e}")

# Observer pattern for event-driven architecture
class EventPublisher:
    """Publisher in observer pattern - used in event-driven systems"""
    
    def __init__(self):
        self._observers = weakref.WeakSet()  # Use weak references to prevent memory leaks
    
    def add_observer(self, observer):
        """Add an observer to the publisher"""
        self._observers.add(observer)
    
    def remove_observer(self, observer):
        """Remove an observer from the publisher"""
        self._observers.discard(observer)
    
    def notify_observers(self, event_type: str, data: Any = None):
        """Notify all observers of an event"""
        for observer in list(self._observers):  # Create list to avoid modification during iteration
            try:
                observer.handle_event(event_type, data)
            except Exception as e:
                # Log error but don't let one observer failure affect others
                logging.error(f"Observer {observer} failed to handle event {event_type}: {e}")

class DataAnalyzer:
    """Observer that reacts to data events"""
    
    def __init__(self, name: str):
        self.name = name
        self.processed_events = []
    
    def handle_event(self, event_type: str, data: Any):
        """Handle incoming events"""
        if event_type == "data_processed":
            self.processed_events.append(data)
            print(f"Analyzer {self.name} processed data: {data}")

# Generic classes for type-safe containers
T = TypeVar('T')

class Repository(Generic[T]):
    """Generic repository pattern for data access"""
    
    def __init__(self, entity_type: Type[T]):
        self.entity_type = entity_type
        self._storage: Dict[str, T] = {}
    
    def save(self, entity: T, key: str) -> None:
        """Save entity with type checking"""
        if not isinstance(entity, self.entity_type):
            raise TypeError(f"Expected {self.entity_type.__name__}, got {type(entity).__name__}")
        
        self._storage[key] = entity
    
    def get(self, key: str) -> Optional[T]:
        """Retrieve entity by key"""
        return self._storage.get(key)
    
    def list_all(self) -> List[T]:
        """List all entities"""
        return list(self._storage.values())

# Usage example combining all patterns
@dataclass
class User:
    id: str
    name: str
    email: str
    created_at: datetime = field(default_factory=datetime.now)

def demonstrate_advanced_oop():
    """Demonstrate advanced OOP patterns in a cohesive example"""
    
    # Generic repository
    user_repo = Repository[User](User)
    user = User("1", "Alice", "alice@example.com")
    user_repo.save(user, "1")
    
    # Factory pattern
    circle = ShapeFactory.create_shape(ShapeType.CIRCLE, radius=5.0, color="red")
    rectangle = ShapeFactory.create_shape(ShapeType.RECTANGLE, width=10.0, height=5.0)
    
    # Observer pattern
    publisher = EventPublisher()
    analyzer1 = DataAnalyzer("Primary")
    analyzer2 = DataAnalyzer("Secondary")
    
    publisher.add_observer(analyzer1)
    publisher.add_observer(analyzer2)
    
    # Multiple inheritance with mixins
    processor = JSONDataProcessor(cache_enabled=True)
    
    # Process data and notify observers
    data = {"user_id": "1", "action": "login"}
    result = processor.pipeline_process(data)
    publisher.notify_observers("data_processed", result)
    
    return {
        "user": user_repo.get("1"),
        "shapes": [circle.draw(), rectangle.draw()],
        "processing_result": result,
        "analyzer_events": {
            "analyzer1": len(analyzer1.processed_events),
            "analyzer2": len(analyzer2.processed_events)
        }
    }`}
            />
            <div className="analogy-badge">Master Pattern: Enterprise OOP architecture with design patterns and type safety</div>
            <p className="use-case">Essential for large-scale applications, frameworks, and systems requiring robust object-oriented design with maintainability and extensibility.</p>
          </section>

          <section id="concurrency" className="concept-card">
            <h2 className="concept-title">Concurrency & Parallelism Blueprints</h2>
            <p className="mb-4">
              <strong>Production Reality:</strong> Python's Global Interpreter Lock (GIL) prevents true thread parallelism for CPU-bound tasks. 
              Threading is effective for I/O-bound operations, while multiprocessing achieves true parallelism by using separate processes.
            </p>
            
            <CodeBlock
              title="Production Concurrency Patterns"
              code={`import asyncio
import threading
import multiprocessing
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import queue
import time
from typing import List, Callable, Any, Optional
import logging

# Threading for I/O-bound tasks (GIL is released during I/O)
class ThreadSafeTaskProcessor:
    """
    Thread-safe task processing for I/O-bound operations
    Production note: Perfect for API calls, database queries, file operations
    """
    
    def __init__(self, max_workers: int = 10):
        self.max_workers = max_workers
        self.results_queue = queue.Queue()
        self.lock = threading.Lock()
        self.processed_count = 0
    
    def process_io_tasks(self, tasks: List[Callable], *args, **kwargs) -> List[Any]:
        """
        Process I/O-bound tasks concurrently using thread pool
        GIL Reality: Threads work well here because I/O operations release the GIL
        """
        results = []
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all tasks
            future_to_task = {
                executor.submit(task, *args, **kwargs): task 
                for task in tasks
            }
            
            # Collect results as they complete
            for future in as_completed(future_to_task):
                try:
                    result = future.result(timeout=30)  # 30 second timeout
                    results.append(result)
                    
                    # Thread-safe counter update
                    with self.lock:
                        self.processed_count += 1
                        
                except Exception as e:
                    logging.error(f"Task failed: {e}")
                    results.append(None)
        
        return results
    
    def worker_thread(self, task_queue: queue.Queue, results_queue: queue.Queue):
        """Worker thread pattern for continuous processing"""
        while True:
            try:
                # Get task with timeout to allow graceful shutdown
                task, args, kwargs = task_queue.get(timeout=1)
                
                if task is None:  # Poison pill for shutdown
                    break
                
                # Process task
                result = task(*args, **kwargs)
                results_queue.put(result)
                
                # Mark task as done
                task_queue.task_done()
                
            except queue.Empty:
                continue
            except Exception as e:
                logging.error(f"Worker thread error: {e}")
                results_queue.put(None)
                task_queue.task_done()

# Multiprocessing for CPU-bound tasks (bypasses GIL)
class CPUBoundProcessor:
    """
    Multiprocessing for CPU-intensive tasks that bypass the GIL
    Production note: Use for mathematical computations, data processing, image manipulation
    """
    
    def __init__(self, max_processes: Optional[int] = None):
        self.max_processes = max_processes or multiprocessing.cpu_count()
    
    def parallel_compute(self, data_chunks: List[Any], compute_func: Callable) -> List[Any]:
        """
        True parallel processing using separate processes
        GIL Reality: Each process has its own Python interpreter and GIL
        """
        
        with ProcessPoolExecutor(max_workers=self.max_processes) as executor:
            # Submit all chunks for parallel processing
            futures = [executor.submit(compute_func, chunk) for chunk in data_chunks]
            
            results = []
            for future in as_completed(futures):
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    logging.error(f"Process failed: {e}")
                    results.append(None)
        
        return results
    
    def map_reduce_pattern(self, data: List[Any], mapper: Callable, reducer: Callable, chunk_size: int = 100) -> Any:
        """
        MapReduce pattern for large dataset processing
        Production pattern: Divide work, process in parallel, combine results
        """
        
        # Split data into chunks
        chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
        
        # Map phase - process chunks in parallel
        with ProcessPoolExecutor(max_workers=self.max_processes) as executor:
            mapped_results = list(executor.map(mapper, chunks))
        
        # Reduce phase - combine results
        final_result = mapped_results[0]
        for result in mapped_results[1:]:
            final_result = reducer(final_result, result)
        
        return final_result

# Async/await for I/O-bound concurrent operations
class AsyncIOProcessor:
    """
    Modern async/await patterns for high-concurrency I/O operations
    Production note: Best for web scraping, API calls, database operations
    """
    
    def __init__(self, max_concurrent: int = 100):
        self.max_concurrent = max_concurrent
        self.semaphore = asyncio.Semaphore(max_concurrent)
    
    async def fetch_data(self, url: str, session) -> Optional[dict]:
        """Async HTTP request with rate limiting"""
        async with self.semaphore:  # Limit concurrent requests
            try:
                async with session.get(url) as response:
                    return await response.json()
            except Exception as e:
                logging.error(f"Failed to fetch {url}: {e}")
                return None
    
    async def process_urls_concurrently(self, urls: List[str]) -> List[Optional[dict]]:
        """
        Process multiple URLs concurrently with aiohttp
        Production pattern: High-concurrency I/O without threading overhead
        """
        import aiohttp
        
        async with aiohttp.ClientSession() as session:
            # Create tasks for all URLs
            tasks = [self.fetch_data(url, session) for url in urls]
            
            # Wait for all tasks to complete
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Handle exceptions in results
            processed_results = []
            for result in results:
                if isinstance(result, Exception):
                    logging.error(f"Task failed with exception: {result}")
                    processed_results.append(None)
                else:
                    processed_results.append(result)
            
            return processed_results
    
    async def producer_consumer_pattern(self, data_source: List[Any], consumer_func: Callable):
        """
        Async producer-consumer pattern for streaming data processing
        """
        # Create a queue for communication
        queue = asyncio.Queue(maxsize=50)  # Bounded queue for backpressure
        
        async def producer():
            """Produce items and put them in the queue"""
            for item in data_source:
                await queue.put(item)
                await asyncio.sleep(0.01)  # Simulate production delay
            
            # Signal completion
            await queue.put(None)
        
        async def consumer(consumer_id: int):
            """Consume items from the queue"""
            while True:
                item = await queue.get()
                
                if item is None:
                    # Put the sentinel back for other consumers
                    await queue.put(None)
                    break
                
                try:
                    await consumer_func(item, consumer_id)
                except Exception as e:
                    logging.error(f"Consumer {consumer_id} failed to process item: {e}")
                finally:
                    queue.task_done()
        
        # Start producer and multiple consumers
        producer_task = asyncio.create_task(producer())
        consumer_tasks = [
            asyncio.create_task(consumer(i)) 
            for i in range(3)  # 3 concurrent consumers
        ]
        
        # Wait for producer to finish
        await producer_task
        
        # Wait for all items to be processed
        await queue.join()
        
        # Cancel consumer tasks
        for task in consumer_tasks:
            task.cancel()

# Production example combining all patterns
class DataPipelineProcessor:
    """
    Production data pipeline using appropriate concurrency patterns
    Real-world example: Processing large datasets with mixed I/O and CPU operations
    """
    
    def __init__(self):
        self.thread_processor = ThreadSafeTaskProcessor(max_workers=20)
        self.cpu_processor = CPUBoundProcessor()
        self.async_processor = AsyncIOProcessor(max_concurrent=50)
    
    def process_data_pipeline(self, data_sources: List[str], transform_func: Callable) -> dict:
        """
        Complete data processing pipeline with optimal concurrency patterns
        """
        
        # Step 1: Fetch data from multiple sources (I/O-bound - use threads)
        def fetch_data_source(source_url: str) -> List[dict]:
            # Simulate API call or database query
            time.sleep(0.1)  # I/O simulation
            return [{"source": source_url, "data": f"data_from_{source_url}"}]
        
        print("Step 1: Fetching data from sources (ThreadPoolExecutor)...")
        raw_data_sets = self.thread_processor.process_io_tasks(
            [lambda src=source: fetch_data_source(src) for source in data_sources]
        )
        
        # Flatten results
        all_raw_data = []
        for dataset in raw_data_sets:
            if dataset:
                all_raw_data.extend(dataset)
        
        # Step 2: Transform data (CPU-bound - use processes)
        print("Step 2: Transforming data (ProcessPoolExecutor)...")
        
        def cpu_intensive_transform(data_chunk: List[dict]) -> List[dict]:
            # Simulate CPU-intensive transformation
            transformed = []
            for item in data_chunk:
                # Simulate complex computation
                result = {
                    **item,
                    "transformed": True,
                    "computed_value": sum(ord(c) for c in str(item)) % 1000
                }
                transformed.append(result)
            return transformed
        
        # Split data into chunks for parallel processing
        chunk_size = max(1, len(all_raw_data) // self.cpu_processor.max_processes)
        data_chunks = [
            all_raw_data[i:i + chunk_size] 
            for i in range(0, len(all_raw_data), chunk_size)
        ]
        
        transformed_chunks = self.cpu_processor.parallel_compute(
            data_chunks, 
            cpu_intensive_transform
        )
        
        # Flatten transformed results
        transformed_data = []
        for chunk in transformed_chunks:
            if chunk:
                transformed_data.extend(chunk)
        
        # Step 3: Save results (I/O-bound - could use async for high concurrency)
        print("Step 3: Saving results (ThreadPoolExecutor)...")
        
        def save_result(data_item: dict) -> bool:
            # Simulate saving to database or file
            time.sleep(0.05)  # I/O simulation
            return True
        
        save_results = self.thread_processor.process_io_tasks(
            [lambda item=item: save_result(item) for item in transformed_data]
        )
        
        return {
            "sources_processed": len(data_sources),
            "records_fetched": len(all_raw_data),
            "records_transformed": len(transformed_data),
            "records_saved": sum(1 for r in save_results if r),
            "processing_summary": {
                "fetch_method": "ThreadPoolExecutor (I/O-bound)",
                "transform_method": "ProcessPoolExecutor (CPU-bound)",
                "save_method": "ThreadPoolExecutor (I/O-bound)"
            }
        }

# Usage examples
def demonstrate_concurrency_patterns():
    """Demonstrate when to use each concurrency pattern"""
    
    # Example data
    data_sources = [f"https://api.example.com/data/{i}" for i in range(10)]
    
    # Initialize pipeline
    pipeline = DataPipelineProcessor()
    
    # Process using optimal concurrency patterns
    results = pipeline.process_data_pipeline(data_sources, lambda x: x)
    
    print("Processing Results:")
    for key, value in results.items():
        print(f"  {key}: {value}")
    
    return results

# Key takeaways for production use:
"""
CONCURRENCY PATTERN SELECTION GUIDE:

1. I/O-BOUND TASKS (File operations, HTTP requests, Database queries):
   - Use ThreadPoolExecutor or async/await
   - GIL is released during I/O operations
   - High concurrency with low overhead

2. CPU-BOUND TASKS (Mathematical computations, Data processing):
   - Use ProcessPoolExecutor for true parallelism
   - Each process has its own GIL
   - Higher overhead but true parallel execution

3. MIXED WORKLOADS:
   - Combine patterns based on operation type
   - Use async/await for coordinating different types of work
   - Consider process pools for CPU work, thread pools for I/O

4. ASYNC/AWAIT:
   - Best for high-concurrency I/O operations
   - Single-threaded but highly efficient
   - Perfect for web servers, API clients, real-time systems

PRODUCTION CONSIDERATIONS:
- Always set timeouts and handle exceptions
- Use bounded queues to prevent memory issues
- Monitor resource usage (CPU, memory, file descriptors)
- Consider backpressure mechanisms for high-throughput systems
- Test under realistic load conditions
"""`}
            />
            <div className="analogy-badge">Master Pattern: Production-ready concurrency with GIL awareness and optimal pattern selection</div>
            <p className="use-case">Critical for high-performance applications, data processing pipelines, web scrapers, and any system requiring concurrent or parallel execution.</p>
          </section>

          <section id="c-interface" className="concept-card">
            <h2 className="concept-title">Python C API & ctypes Blueprints</h2>
            <p className="mb-4">Interface with C libraries and system APIs for performance-critical operations and legacy system integration.</p>
            
            <CodeBlock
              title="C Integration Patterns"
              code={`import ctypes
import ctypes.util
from ctypes import CDLL, c_int, c_double, c_char_p, c_void_p, Structure, POINTER, byref
import os
import platform
from typing import Optional, List, Any

# Production C library interface patterns
class MathLibraryInterface:
    """
    Professional interface to C math libraries
    Production pattern: Safe C library integration with error handling
    """
    
    def __init__(self):
        self.lib = None
        self._load_library()
        self._setup_function_signatures()
    
    def _load_library(self):
        """Load C library with cross-platform support"""
        try:
            # Try platform-specific library loading
            if platform.system() == "Windows":
                # Load Windows DLL
                lib_path = ctypes.util.find_library("msvcrt")
                self.lib = ctypes.CDLL(lib_path) if lib_path else None
            elif platform.system() == "Darwin":
                # Load macOS dylib
                self.lib = ctypes.CDLL("libm.dylib")
            else:
                # Load Linux shared library
                self.lib = ctypes.CDLL("libm.so.6")
            
            if not self.lib:
                raise OSError("Could not load math library")
                
        except OSError as e:
            raise RuntimeError(f"Failed to load C math library: {e}")
    
    def _setup_function_signatures(self):
        """Define C function signatures for type safety"""
        if not self.lib:
            return
        
        # Define pow function: double pow(double base, double exponent)
        self.lib.pow.argtypes = [c_double, c_double]
        self.lib.pow.restype = c_double
        
        # Define sqrt function: double sqrt(double x)
        self.lib.sqrt.argtypes = [c_double]
        self.lib.sqrt.restype = c_double
    
    def power(self, base: float, exponent: float) -> float:
        """Safe interface to C pow function"""
        if not self.lib:
            raise RuntimeError("Math library not loaded")
        
        try:
            result = self.lib.pow(c_double(base), c_double(exponent))
            return float(result)
        except Exception as e:
            raise RuntimeError(f"C function call failed: {e}")
    
    def square_root(self, value: float) -> float:
        """Safe interface to C sqrt function"""
        if not self.lib:
            raise RuntimeError("Math library not loaded")
        
        if value < 0:
            raise ValueError("Cannot compute square root of negative number")
        
        try:
            result = self.lib.sqrt(c_double(value))
            return float(result)
        except Exception as e:
            raise RuntimeError(f"C function call failed: {e}")

# Custom C structures for complex data exchange
class Point(Structure):
    """C structure representation for geometric points"""
    _fields_ = [
        ("x", c_double),
        ("y", c_double)
    ]
    
    def __init__(self, x: float = 0.0, y: float = 0.0):
        super().__init__()
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

class Rectangle(Structure):
    """Complex C structure with nested structures"""
    _fields_ = [
        ("top_left", Point),
        ("bottom_right", Point),
        ("area", c_double)
    ]
    
    def __init__(self, x1: float, y1: float, x2: float, y2: float):
        super().__init__()
        self.top_left = Point(x1, y1)
        self.bottom_right = Point(x2, y2)
        self.area = abs(x2 - x1) * abs(y2 - y1)

# High-performance array processing with C
class ArrayProcessor:
    """
    High-performance array operations using C libraries
    Production pattern: Bypass Python loops for numerical computations
    """
    
    def __init__(self):
        self.lib = None
        self._load_numeric_library()
    
    def _load_numeric_library(self):
        """Load optimized numeric library (e.g., Intel MKL, OpenBLAS)"""
        try:
            # Try to load optimized BLAS library
            blas_lib = ctypes.util.find_library("blas")
            if blas_lib:
                self.lib = ctypes.CDLL(blas_lib)
            else:
                # Fallback to standard library
                self.lib = ctypes.CDLL(None)  # Load current process symbols
                
        except Exception as e:
            print(f"Warning: Could not load numeric library: {e}")
    
    def process_array_in_c(self, data: List[float], operation: str) -> List[float]:
        """
        Process arrays using C for performance
        Production note: 10-100x faster than Python loops for large arrays
        """
        if not data:
            return []
        
        # Convert Python list to C array
        array_type = c_double * len(data)
        c_array = array_type(*data)
        
        # Perform operation based on type
        if operation == "square":
            self._square_array_inplace(c_array, len(data))
        elif operation == "double":
            self._double_array_inplace(c_array, len(data))
        else:
            raise ValueError(f"Unsupported operation: {operation}")
        
        # Convert back to Python list
        return [c_array[i] for i in range(len(data))]
    
    def _square_array_inplace(self, array: ctypes.Array, size: int):
        """Square all elements in array (in-place C operation)"""
        for i in range(size):
            array[i] = array[i] * array[i]
    
    def _double_array_inplace(self, array: ctypes.Array, size: int):
        """Double all elements in array (in-place C operation)"""
        for i in range(size):
            array[i] = array[i] * 2.0

# System-level operations using ctypes
class SystemInterface:
    """
    System-level operations and OS API access
    Production pattern: Direct system calls for advanced functionality
    """
    
    def __init__(self):
        self.system = platform.system()
        self._setup_system_interface()
    
    def _setup_system_interface(self):
        """Setup platform-specific system interfaces"""
        if self.system == "Windows":
            self.kernel32 = ctypes.windll.kernel32
            self.user32 = ctypes.windll.user32
        else:
            self.libc = ctypes.CDLL("libc.so.6")
    
    def get_process_id(self) -> int:
        """Get current process ID using system calls"""
        if self.system == "Windows":
            return self.kernel32.GetCurrentProcessId()
        else:
            return self.libc.getpid()
    
    def allocate_memory(self, size: int) -> Optional[int]:
        """
        Allocate memory using system calls
        Production warning: Manual memory management - use with caution
        """
        if self.system == "Windows":
            # Windows: VirtualAlloc
            ptr = self.kernel32.VirtualAlloc(
                None,  # Let system choose address
                size,  # Size in bytes
                0x1000,  # MEM_COMMIT
                0x04   # PAGE_READWRITE
            )
            return ptr if ptr else None
        else:
            # Unix: malloc
            ptr = self.libc.malloc(size)
            return ptr if ptr else None
    
    def free_memory(self, ptr: int):
        """Free allocated memory"""
        if not ptr:
            return
        
        if self.system == "Windows":
            self.kernel32.VirtualFree(ptr, 0, 0x8000)  # MEM_RELEASE
        else:
            self.libc.free(ptr)

# Production example: Performance-critical image processing
class ImageProcessor:
    """
    Example: High-performance image processing using C libraries
    Production use case: Real-time image/video processing
    """
    
    def __init__(self):
        self.lib = self._load_image_library()
    
    def _load_image_library(self):
        """Load optimized image processing library"""
        try:
            # Try to load OpenCV or similar C library
            lib_name = None
            
            if platform.system() == "Windows":
                lib_name = "opencv_core"
            else:
                lib_name = "libopencv_core.so"
            
            lib_path = ctypes.util.find_library(lib_name)
            if lib_path:
                return ctypes.CDLL(lib_path)
            else:
                print(f"Warning: Could not find {lib_name}, using fallback")
                return None
                
        except Exception as e:
            print(f"Could not load image library: {e}")
            return None
    
    def process_image_data(self, image_data: List[int], width: int, height: int) -> List[int]:
        """
        Process image data using C for performance
        Production pattern: Critical for real-time image processing
        """
        if not image_data or len(image_data) != width * height:
            raise ValueError("Invalid image data dimensions")
        
        # Convert to C array for processing
        array_type = c_int * len(image_data)
        c_image = array_type(*image_data)
        
        # Apply image processing operations
        self._apply_brightness_filter(c_image, len(image_data), 1.2)
        
        # Convert back to Python
        return [c_image[i] for i in range(len(image_data))]
    
    def _apply_brightness_filter(self, image_array: ctypes.Array, size: int, factor: float):
        """Apply brightness filter in C for performance"""
        for i in range(size):
            # Clamp values to prevent overflow
            new_value = int(image_array[i] * factor)
            image_array[i] = min(255, max(0, new_value))

# Production usage examples
def demonstrate_c_integration():
    """Demonstrate production C integration patterns"""
    
    print("=== C Library Integration Demo ===")
    
    # Math library interface
    math_lib = MathLibraryInterface()
    
    try:
        result = math_lib.power(2.0, 3.0)
        print(f"2^3 = {result}")
        
        sqrt_result = math_lib.square_root(16.0)
        print(f"sqrt(16) = {sqrt_result}")
        
    except Exception as e:
        print(f"Math library error: {e}")
    
    # Structure usage
    rect = Rectangle(0.0, 0.0, 10.0, 5.0)
    print(f"Rectangle: {rect.top_left} to {rect.bottom_right}, area = {rect.area}")
    
    # Array processing
    processor = ArrayProcessor()
    data = [1.0, 2.0, 3.0, 4.0, 5.0]
    
    squared_data = processor.process_array_in_c(data, "square")
    print(f"Squared array: {squared_data}")
    
    # System interface
    sys_interface = SystemInterface()
    pid = sys_interface.get_process_id()
    print(f"Current process ID: {pid}")
    
    # Memory allocation example (be careful with this in production!)
    memory_ptr = sys_interface.allocate_memory(1024)
    if memory_ptr:
        print(f"Allocated memory at address: 0x{memory_ptr:x}")
        sys_interface.free_memory(memory_ptr)
        print("Memory freed successfully")
    
    return True

# Production considerations and best practices
"""
C INTEGRATION BEST PRACTICES:

1. ERROR HANDLING:
   - Always check for null pointers and error codes
   - Wrap C calls in try-catch blocks
   - Validate inputs before passing to C functions

2. MEMORY MANAGEMENT:
   - Be extremely careful with manual memory allocation
   - Always pair malloc/free or VirtualAlloc/VirtualFree
   - Consider using Python's memory management when possible

3. TYPE SAFETY:
   - Always define function signatures with argtypes and restype
   - Use appropriate ctypes for data conversion
   - Validate data sizes and types

4. PERFORMANCE:
   - Use C integration for CPU-intensive operations only
   - Profile to ensure C calls provide significant speedup
   - Consider NumPy/Cython as alternatives

5. PORTABILITY:
   - Handle platform differences (Windows/Linux/macOS)
   - Use ctypes.util.find_library() for library discovery
   - Test on all target platforms

6. DEBUGGING:
   - C errors can crash Python interpreter
   - Use debugging tools like gdb or Visual Studio debugger
   - Add extensive logging around C calls

WHEN TO USE C INTEGRATION:
✓ Performance-critical numerical computations
✓ Interfacing with existing C libraries
✓ System-level operations not available in Python
✓ Real-time processing requirements

WHEN NOT TO USE:
✗ Simple operations that Python handles well
✗ When pure Python libraries exist (NumPy, SciPy)
✗ Prototype development (use after optimization phase)
✗ When team lacks C/systems programming experience
"""`}
            />
            <div className="analogy-badge">Master Pattern: Safe C library integration for performance-critical operations</div>
            <p className="use-case">Essential for high-performance computing, system programming, legacy library integration, and performance-critical applications.</p>
          </section>

          <section id="regex" className="concept-card">
            <h2 className="concept-title">Advanced Regular Expression Blueprints</h2>
            <p className="mb-4">Master complex pattern matching, text parsing, and data extraction for production text processing systems.</p>
            
            <CodeBlock
              title="Production Regex Patterns"
              code={`import re
from typing import List, Dict, Optional, Pattern, Match, NamedTuple, Iterator
import functools
from dataclasses import dataclass

# Production regex patterns for common use cases
class RegexLibrary:
    """
    Production-grade regex patterns for common validation and parsing tasks
    Pattern library used in enterprise applications
    """
    
    # Email validation (RFC 5322 compliant)
    EMAIL = re.compile(
        r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    )
    
    # Phone number (flexible international format)
    PHONE = re.compile(
        r'^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$'
    )
    
    # URL validation with protocol support
    URL = re.compile(
        r'^https?://(?:[-\w.])+(?:[:\d]+)?(?:/(?:[\w/_.])*(?:\?(?:[\w&=%.])*)?(?:#(?:\w))*)?$'
    )
    
    # Credit card number (basic format validation)
    CREDIT_CARD = re.compile(
        r'^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$'
    )
    
    # IP address (IPv4)
    IPV4 = re.compile(
        r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
    )
    
    # SQL injection detection patterns
    SQL_INJECTION = re.compile(
        r"(?:')|(?:--)|(?:;)|(?:\|)|(?:\*)|(?:%)|(?:union)|(?:select)|(?:insert)|(?:delete)|(?:update)|(?:drop)",
        re.IGNORECASE
    )

# Advanced regex compilation and caching
class CompiledRegexCache:
    """
    Production pattern: Compiled regex caching for performance
    Critical for high-throughput text processing systems
    """
    
    def __init__(self, max_cache_size: int = 100):
        self.max_cache_size = max_cache_size
        self._cache: Dict[str, Pattern] = {}
        self._usage_count: Dict[str, int] = {}
    
    def get_pattern(self, pattern: str, flags: int = 0) -> Pattern:
        """Get compiled regex pattern with caching"""
        cache_key = f"{pattern}:{flags}"
        
        if cache_key in self._cache:
            self._usage_count[cache_key] += 1
            return self._cache[cache_key]
        
        # Compile new pattern
        compiled_pattern = re.compile(pattern, flags)
        
        # Cache management
        if len(self._cache) >= self.max_cache_size:
            # Remove least used pattern
            least_used = min(self._usage_count.keys(), key=lambda k: self._usage_count[k])
            del self._cache[least_used]
            del self._usage_count[least_used]
        
        self._cache[cache_key] = compiled_pattern
        self._usage_count[cache_key] = 1
        
        return compiled_pattern
    
    def clear_cache(self):
        """Clear the regex cache"""
        self._cache.clear()
        self._usage_count.clear()

# Advanced pattern matching with named groups
@dataclass
class LogEntry:
    """Structured log entry from regex parsing"""
    timestamp: str
    level: str
    message: str
    source: Optional[str] = None
    request_id: Optional[str] = None

class LogParser:
    """
    Production log parsing using advanced regex patterns
    Real-world use case: Analyzing application logs for monitoring and debugging
    """
    
    def __init__(self):
        self.regex_cache = CompiledRegexCache()
        
        # Complex log pattern with named groups
        self.log_pattern = self.regex_cache.get_pattern(
            r'(?P<timestamp>\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\s+'
            r'\[(?P<level>DEBUG|INFO|WARNING|ERROR|CRITICAL)\]\s+'
            r'(?:\[(?P<source>\w+)\]\s+)?'
            r'(?:\[RequestID:\s*(?P<request_id>[a-f0-9-]+)\]\s+)?'
            r'(?P<message>.*)',
            re.IGNORECASE
        )
        
        # Error pattern for extracting stack traces
        self.error_pattern = self.regex_cache.get_pattern(
            r'(?P<error_type>\w+Error):\s*(?P<error_message>.*?)(?:\s+at\s+(?P<location>.*?))?$',
            re.MULTILINE | re.DOTALL
        )
    
    def parse_log_line(self, line: str) -> Optional[LogEntry]:
        """Parse a single log line into structured data"""
        match = self.log_pattern.match(line.strip())
        
        if not match:
            return None
        
        return LogEntry(
            timestamp=match.group('timestamp'),
            level=match.group('level'),
            message=match.group('message'),
            source=match.group('source'),
            request_id=match.group('request_id')
        )
    
    def extract_errors(self, log_content: str) -> List[Dict[str, str]]:
        """Extract error information from log content"""
        errors = []
        
        for match in self.error_pattern.finditer(log_content):
            error_info = {
                'type': match.group('error_type'),
                'message': match.group('error_message'),
                'location': match.group('location') or 'Unknown'
            }
            errors.append(error_info)
        
        return errors

# Text extraction and parsing for data processing
class DataExtractor:
    """
    Advanced text extraction patterns for data processing
    Production use case: Extracting structured data from unstructured text
    """
    
    def __init__(self):
        self.regex_cache = CompiledRegexCache()
    
    def extract_financial_data(self, text: str) -> Dict[str, List[str]]:
        """Extract financial information from text"""
        
        # Currency amounts with various formats
        currency_pattern = self.regex_cache.get_pattern(
            r'(?:USD|EUR|GBP|\$|€|£)\s*(?:[\d,]+\.?\d*)|(?:[\d,]+\.?\d*)\s*(?:USD|EUR|GBP|\$|€|£)',
            re.IGNORECASE
        )
        
        # Percentage values
        percentage_pattern = self.regex_cache.get_pattern(
            r'(?:\d+\.?\d*)\s*%'
        )
        
        # Stock symbols
        stock_pattern = self.regex_cache.get_pattern(
            r'\b[A-Z]{1,5}\b(?:\.[A-Z]{1,2})?'  # Basic stock symbol pattern
        )
        
        # Date patterns (multiple formats)
        date_pattern = self.regex_cache.get_pattern(
            r'(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(?:\d{4}-\d{2}-\d{2})|(?:[A-Z][a-z]{2}\s+\d{1,2},?\s+\d{4})',
            re.IGNORECASE
        )
        
        return {
            'currencies': currency_pattern.findall(text),
            'percentages': percentage_pattern.findall(text),
            'stocks': stock_pattern.findall(text),
            'dates': date_pattern.findall(text)
        }
    
    def extract_contact_info(self, text: str) -> Dict[str, List[str]]:
        """Extract contact information from text"""
        
        # Email addresses
        emails = RegexLibrary.EMAIL.findall(text)
        
        # Phone numbers with capture groups
        phone_pattern = self.regex_cache.get_pattern(
            r'(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})'
        )
        phones = ['-'.join(match) for match in phone_pattern.findall(text)]
        
        # URLs
        urls = RegexLibrary.URL.findall(text)
        
        # Addresses (basic pattern)
        address_pattern = self.regex_cache.get_pattern(
            r'\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Drive|Dr|Lane|Ln)\.?',
            re.IGNORECASE
        )
        addresses = address_pattern.findall(text)
        
        return {
            'emails': emails,
            'phones': phones,
            'urls': urls,
            'addresses': addresses
        }

# Advanced regex operations for text processing
class TextProcessor:
    """
    Production text processing using advanced regex operations
    Pattern: Complex text transformations and cleaning
    """
    
    def __init__(self):
        self.regex_cache = CompiledRegexCache()
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text using regex patterns"""
        
        # Remove HTML tags
        html_pattern = self.regex_cache.get_pattern(r'<[^>]*>')
        text = html_pattern.sub('', text)
        
        # Normalize whitespace
        whitespace_pattern = self.regex_cache.get_pattern(r'\s+')
        text = whitespace_pattern.sub(' ', text)
        
        # Remove special characters but keep punctuation
        special_chars_pattern = self.regex_cache.get_pattern(r'[^\w\s\.\,\!\?\;\:]')
        text = special_chars_pattern.sub('', text)
        
        return text.strip()
    
    def extract_sentences(self, text: str) -> List[str]:
        """Extract sentences using advanced regex patterns"""
        
        # Complex sentence boundary detection
        sentence_pattern = self.regex_cache.get_pattern(
            r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\!|\?)\s+(?=[A-Z])',
            re.MULTILINE
        )
        
        sentences = sentence_pattern.split(text)
        return [sentence.strip() for sentence in sentences if sentence.strip()]
    
    def mask_sensitive_data(self, text: str) -> str:
        """Mask sensitive information in text"""
        
        # Mask credit card numbers
        cc_pattern = self.regex_cache.get_pattern(
            r'\b(?:\d{4}[-\s]?){3}\d{4}\b'
        )
        text = cc_pattern.sub(lambda m: f"****-****-****-{m.group()[-4:]}", text)
        
        # Mask SSN
        ssn_pattern = self.regex_cache.get_pattern(
            r'\b\d{3}-\d{2}-\d{4}\b'
        )
        text = ssn_pattern.sub('***-**-****', text)
        
        # Mask email addresses
        email_pattern = self.regex_cache.get_pattern(
            r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        )
        text = email_pattern.sub(lambda m: f"***@{m.group().split('@')[1]}", text)
        
        return text
    
    def find_and_replace_with_context(self, text: str, pattern: str, replacement: str, context_size: int = 50) -> List[Dict[str, str]]:
        """Find and replace with context information for validation"""
        
        compiled_pattern = self.regex_cache.get_pattern(pattern)
        replacements = []
        
        for match in compiled_pattern.finditer(text):
            start, end = match.span()
            
            # Extract context
            context_start = max(0, start - context_size)
            context_end = min(len(text), end + context_size)
            
            before_context = text[context_start:start]
            after_context = text[end:context_end]
            
            replacement_info = {
                'original': match.group(),
                'replacement': replacement,
                'before_context': before_context,
                'after_context': after_context,
                'position': start
            }
            
            replacements.append(replacement_info)
        
        return replacements

# Performance monitoring for regex operations
class RegexProfiler:
    """
    Production pattern: Monitor regex performance for optimization
    Critical for high-throughput text processing systems
    """
    
    def __init__(self):
        self.performance_data = {}
    
    def profile_regex(self, pattern: str, flags: int = 0):
        """Decorator to profile regex performance"""
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                import time
                
                start_time = time.time()
                result = func(*args, **kwargs)
                end_time = time.time()
                
                # Record performance data
                execution_time = end_time - start_time
                pattern_key = f"{pattern}:{flags}"
                
                if pattern_key not in self.performance_data:
                    self.performance_data[pattern_key] = {
                        'total_time': 0,
                        'call_count': 0,
                        'average_time': 0
                    }
                
                data = self.performance_data[pattern_key]
                data['total_time'] += execution_time
                data['call_count'] += 1
                data['average_time'] = data['total_time'] / data['call_count']
                
                return result
            return wrapper
        return decorator
    
    def get_performance_report(self) -> Dict[str, Dict[str, float]]:
        """Get performance report for all monitored patterns"""
        return self.performance_data.copy()

# Production usage examples
def demonstrate_advanced_regex():
    """Demonstrate advanced regex patterns in production scenarios"""
    
    # Sample log data
    log_data = """
    2024-01-15 10:30:45 [INFO] [UserService] [RequestID: 12345-abcd-6789] User login successful
    2024-01-15 10:31:02 [ERROR] [DatabaseService] Connection timeout after 30 seconds
    2024-01-15 10:31:15 [WARNING] [PaymentService] [RequestID: 98765-efgh-4321] Payment validation failed
    """
    
    # Parse logs
    parser = LogParser()
    for line in log_data.strip().split('\n'):
        entry = parser.parse_log_line(line)
        if entry:
            print(f"Parsed: {entry}")
    
    # Extract financial data
    financial_text = "The company reported revenue of $1.2M, up 15.5% from last quarter. Stock AAPL rose 3.2%."
    extractor = DataExtractor()
    financial_data = extractor.extract_financial_data(financial_text)
    print(f"Financial data: {financial_data}")
    
    # Text processing
    processor = TextProcessor()
    dirty_text = "<p>Hello   world! This is a test... #hashtag @mention</p>"
    clean_text = processor.clean_text(dirty_text)
    print(f"Cleaned text: {clean_text}")
    
    # Mask sensitive data
    sensitive_text = "My SSN is 123-45-6789 and credit card is 4532-1234-5678-9012"
    masked_text = processor.mask_sensitive_data(sensitive_text)
    print(f"Masked text: {masked_text}")
    
    return True

# Production best practices summary
"""
ADVANCED REGEX BEST PRACTICES:

1. PERFORMANCE:
   - Compile and cache regex patterns
   - Use raw strings (r"pattern") to avoid escaping issues
   - Profile regex performance in production
   - Consider alternatives for simple string operations

2. MAINTAINABILITY:
   - Use named groups for complex patterns
   - Document complex regex patterns thoroughly
   - Break complex patterns into smaller, testable parts
   - Use regex comments ((?#comment)) for documentation

3. SECURITY:
   - Validate input size to prevent ReDoS attacks
   - Use timeout for regex operations in production
   - Sanitize user input before regex processing
   - Be careful with user-provided regex patterns

4. RELIABILITY:
   - Test regex patterns with edge cases
   - Handle regex compilation errors gracefully
   - Use appropriate flags (IGNORECASE, MULTILINE, etc.)
   - Validate regex results before using them

WHEN TO USE ADVANCED REGEX:
✓ Complex text parsing and extraction
✓ Log analysis and monitoring systems
✓ Data validation and cleaning
✓ Natural language processing tasks

WHEN TO AVOID:
✗ Simple string operations (use str methods)
✗ Parsing structured data (use proper parsers)
✗ Performance-critical loops (cache compiled patterns)
✗ User-facing error messages (regex errors are cryptic)
"""`}
            />
            <div className="analogy-badge">Master Pattern: Production regex patterns for complex text processing and data extraction</div>
            <p className="use-case">Essential for log analysis, data extraction, text processing, validation systems, and any application requiring sophisticated pattern matching.</p>
          </section>

          <section id="advanced-stdlib" className="concept-card">
            <h2 className="concept-title">Advanced Standard Library Blueprints</h2>
            <p className="mb-4">Master Python's powerful built-in modules for professional applications - from collections to concurrent programming.</p>
            
            <CodeBlock
              title="Production Standard Library Patterns"
              code={`import collections
import itertools
import functools
import operator
import heapq
import bisect
from collections import defaultdict, Counter, deque, namedtuple, OrderedDict, ChainMap
from functools import lru_cache, partial, singledispatch, wraps
from itertools import chain, combinations, permutations, product, groupby, islice
from operator import itemgetter, attrgetter, methodcaller
import weakref
import contextvars
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Callable, Iterator

# Advanced collections patterns for production systems
class ProductionDataStructures:
    """
    Advanced data structure patterns using collections module
    Production pattern: Optimized data structures for specific use cases
    """
    
    def __init__(self):
        # LRU Cache implementation using OrderedDict
        self.cache = collections.OrderedDict()
        self.cache_size = 100
        
        # Counter for analytics and frequency analysis
        self.event_counter = collections.Counter()
        
        # Deque for efficient queue operations
        self.task_queue = collections.deque()
        
        # ChainMap for configuration management
        self.config = collections.ChainMap()
    
    def lru_cache_manual(self, key: str, value: Any = None) -> Any:
        """
        Manual LRU cache implementation using OrderedDict
        Production pattern: Custom cache with specific eviction policies
        """
        if value is not None:
            # Store value
            if key in self.cache:
                # Move to end (most recently used)
                self.cache.move_to_end(key)
            else:
                self.cache[key] = value
                # Remove oldest if cache is full
                if len(self.cache) > self.cache_size:
                    self.cache.popitem(last=False)  # Remove oldest (FIFO)
        
        # Retrieve value
        if key in self.cache:
            # Move to end (mark as recently used)
            self.cache.move_to_end(key)
            return self.cache[key]
        
        return None
    
    def analytics_counter(self, event: str, count: int = 1):
        """
        Efficient event counting for analytics
        Production pattern: Real-time metrics collection
        """
        self.event_counter[event] += count
    
    def get_top_events(self, n: int = 10) -> List[tuple]:
        """Get top N events by frequency"""
        return self.event_counter.most_common(n)
    
    def task_queue_operations(self):
        """
        Efficient queue operations using deque
        Production pattern: Task scheduling and processing
        """
        # Add tasks to both ends efficiently
        self.task_queue.append("normal_priority_task")
        self.task_queue.appendleft("high_priority_task")
        
        # Process tasks from appropriate end
        high_priority = self.task_queue.popleft() if self.task_queue else None
        normal_task = self.task_queue.pop() if self.task_queue else None
        
        return high_priority, normal_task
    
    def layered_configuration(self, user_config: dict, default_config: dict):
        """
        Layered configuration using ChainMap
        Production pattern: Configuration inheritance and overrides
        """
        # Create configuration hierarchy
        self.config = collections.ChainMap(
            user_config,      # Highest priority
            {},               # Environment variables
            default_config    # Defaults
        )
        
        return dict(self.config)  # Flatten for usage

# Advanced itertools patterns for data processing
class DataProcessor:
    """
    Advanced data processing using itertools
    Production pattern: Memory-efficient data transformations
    """
    
    @staticmethod
    def chunk_data(data: List[Any], chunk_size: int) -> Iterator[List[Any]]:
        """
        Chunk data into smaller pieces using itertools
        Production pattern: Process large datasets in manageable chunks
        """
        iterator = iter(data)
        while True:
            chunk = list(itertools.islice(iterator, chunk_size))
            if not chunk:
                break
            yield chunk
    
    @staticmethod
    def flatten_nested_data(nested_data: List[List[Any]]) -> Iterator[Any]:
        """
        Flatten nested data structures efficiently
        Production pattern: Data normalization and flattening
        """
        return itertools.chain.from_iterable(nested_data)
    
    @staticmethod
    def group_data_by_key(data: List[Dict[str, Any]], key: str) -> Dict[str, List[Dict[str, Any]]]:
        """
        Group data by key using itertools.groupby
        Production pattern: Data aggregation and grouping
        """
        # Sort data by the grouping key first (required for groupby)
        sorted_data = sorted(data, key=operator.itemgetter(key))
        
        grouped = {}
        for key_value, group in itertools.groupby(sorted_data, key=operator.itemgetter(key)):
            grouped[key_value] = list(group)
        
        return grouped
    
    @staticmethod
    def sliding_window(iterable: List[Any], window_size: int) -> Iterator[tuple]:
        """
        Create sliding window over data
        Production pattern: Time series analysis and pattern detection
        """
        iterators = itertools.tee(iterable, window_size)
        for i, it in enumerate(iterators):
            # Advance each iterator by i steps
            for _ in range(i):
                next(it, None)
        
        return zip(*iterators)
    
    @staticmethod
    def combine_data_sources(*sources) -> Iterator[tuple]:
        """
        Combine multiple data sources efficiently
        Production pattern: Data fusion and correlation
        """
        return itertools.product(*sources)

# Advanced functools patterns for optimization
class OptimizedFunctions:
    """
    Function optimization patterns using functools
    Production pattern: Performance optimization and caching
    """
    
    def __init__(self):
        self.call_count = 0
    
    @lru_cache(maxsize=128)
    def expensive_computation(self, n: int) -> int:
        """
        Cached expensive computation
        Production pattern: Automatic memoization for pure functions
        """
        # Simulate expensive computation
        result = sum(i * i for i in range(n))
        return result
    
    @functools.singledispatch
    def process_data(self, data):
        """
        Single dispatch for polymorphic functions
        Production pattern: Type-based function dispatch
        """
        raise NotImplementedError(f"Unsupported type: {type(data)}")
    
    @process_data.register
    def _(self, data: list):
        """Process list data"""
        return {"type": "list", "length": len(data), "sum": sum(data) if all(isinstance(x, (int, float)) for x in data) else None}
    
    @process_data.register
    def _(self, data: dict):
        """Process dictionary data"""
        return {"type": "dict", "keys": len(data), "values": list(data.values())}
    
    @process_data.register
    def _(self, data: str):
        """Process string data"""
        return {"type": "string", "length": len(data), "words": len(data.split())}
    
    def create_partial_function(self, base_func: Callable, *args, **kwargs):
        """
        Create partial functions for configuration
        Production pattern: Function factories and configuration
        """
        return functools.partial(base_func, *args, **kwargs)
    
    def performance_monitor(self, func: Callable) -> Callable:
        """
        Function decorator for performance monitoring
        Production pattern: Non-invasive performance tracking
        """
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            import time
            start_time = time.time()
            result = func(*args, **kwargs)
            end_time = time.time()
            
            self.call_count += 1
            execution_time = end_time - start_time
            
            print(f"Function {func.__name__} executed in {execution_time:.4f}s (call #{self.call_count})")
            return result
        
        return wrapper

# Advanced heapq patterns for priority systems
class PrioritySystem:
    """
    Priority queue system using heapq
    Production pattern: Task scheduling and priority management
    """
    
    def __init__(self):
        self._heap = []
        self._entry_finder = {}  # mapping of tasks to entries
        self._counter = itertools.count()  # unique sequence count
        self._REMOVED = '<removed-task>'  # placeholder for removed tasks
    
    def add_task(self, task: str, priority: int = 0):
        """
        Add a new task or update the priority of an existing task
        Production pattern: Priority queue with task updates
        """
        if task in self._entry_finder:
            self.remove_task(task)
        
        count = next(self._counter)
        entry = [priority, count, task]
        self._entry_finder[task] = entry
        heapq.heappush(self._heap, entry)
    
    def remove_task(self, task: str):
        """Mark an existing task as REMOVED"""
        entry = self._entry_finder.pop(task)
        entry[-1] = self._REMOVED
    
    def pop_task(self) -> Optional[str]:
        """Remove and return the lowest priority task"""
        while self._heap:
            priority, count, task = heapq.heappop(self._heap)
            if task is not self._REMOVED:
                del self._entry_finder[task]
                return task
        return None
    
    def peek_task(self) -> Optional[tuple]:
        """Peek at the next task without removing it"""
        while self._heap:
            priority, count, task = self._heap[0]
            if task is not self._REMOVED:
                return (priority, task)
            heapq.heappop(self._heap)  # Remove the invalid entry
        return None

# Advanced bisect patterns for sorted data
class SortedDataManager:
    """
    Efficient sorted data operations using bisect
    Production pattern: Maintaining sorted collections for fast lookups
    """
    
    def __init__(self):
        self._data = []
        self._keys = []
    
    def insert_item(self, key: Any, value: Any):
        """Insert item maintaining sort order"""
        index = bisect.bisect_left(self._keys, key)
        self._keys.insert(index, key)
        self._data.insert(index, value)
    
    def find_item(self, key: Any) -> Optional[Any]:
        """Find item by key using binary search"""
        index = bisect.bisect_left(self._keys, key)
        if index < len(self._keys) and self._keys[index] == key:
            return self._data[index]
        return None
    
    def find_range(self, min_key: Any, max_key: Any) -> List[tuple]:
        """Find all items in key range"""
        left_index = bisect.bisect_left(self._keys, min_key)
        right_index = bisect.bisect_right(self._keys, max_key)
        
        return [(self._keys[i], self._data[i]) for i in range(left_index, right_index)]
    
    def get_percentile(self, percentile: float) -> Optional[Any]:
        """Get value at specific percentile"""
        if not self._data:
            return None
        
        index = int(len(self._data) * percentile / 100)
        index = min(index, len(self._data) - 1)
        return self._data[index]

# Weak references for memory management
class CacheWithWeakRefs:
    """
    Cache implementation using weak references
    Production pattern: Avoid memory leaks in caching systems
    """
    
    def __init__(self):
        self._cache = weakref.WeakValueDictionary()
        self._callbacks = weakref.WeakKeyDictionary()
    
    def cache_object(self, key: str, obj: Any, callback: Optional[Callable] = None):
        """Cache object with optional cleanup callback"""
        if callback:
            # Register cleanup callback
            self._callbacks[obj] = callback
            weakref.ref(obj, lambda ref: callback(key))
        
        self._cache[key] = obj
    
    def get_cached_object(self, key: str) -> Optional[Any]:
        """Retrieve cached object"""
        return self._cache.get(key)
    
    def cache_stats(self) -> Dict[str, int]:
        """Get cache statistics"""
        return {
            "cached_objects": len(self._cache),
            "registered_callbacks": len(self._callbacks)
        }

# Context variables for async context management
# Note: This requires Python 3.7+
import contextvars

request_id = contextvars.ContextVar('request_id', default='unknown')
user_context = contextvars.ContextVar('user_context', default={})

class ContextManager:
    """
    Context management for async applications
    Production pattern: Request-scoped data in async environments
    """
    
    @staticmethod
    def set_request_context(req_id: str, user_data: dict):
        """Set context for current request"""
        request_id.set(req_id)
        user_context.set(user_data)
    
    @staticmethod
    def get_current_context() -> Dict[str, Any]:
        """Get current context data"""
        return {
            "request_id": request_id.get(),
            "user": user_context.get()
        }
    
    @staticmethod
    def log_with_context(message: str):
        """Log message with context information"""
        context = ContextManager.get_current_context()
        print(f"[{context['request_id']}] [{context['user'].get('id', 'anonymous')}] {message}")

# Production usage examples
def demonstrate_advanced_stdlib():
    """Demonstrate advanced standard library patterns"""
    
    print("=== Advanced Standard Library Demo ===")
    
    # Data structures
    ds = ProductionDataStructures()
    
    # LRU Cache
    ds.lru_cache_manual("key1", "value1")
    ds.lru_cache_manual("key2", "value2")
    cached_value = ds.lru_cache_manual("key1")
    print(f"Cached value: {cached_value}")
    
    # Analytics counter
    ds.analytics_counter("page_view", 5)
    ds.analytics_counter("user_login", 2)
    ds.analytics_counter("page_view", 3)
    top_events = ds.get_top_events(5)
    print(f"Top events: {top_events}")
    
    # Data processing
    data = [{"category": "A", "value": 1}, {"category": "B", "value": 2}, {"category": "A", "value": 3}]
    grouped = DataProcessor.group_data_by_key(data, "category")
    print(f"Grouped data: {grouped}")
    
    # Sliding window
    time_series = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    windows = list(DataProcessor.sliding_window(time_series, 3))
    print(f"Sliding windows: {windows[:5]}")  # Show first 5 windows
    
    # Optimized functions
    optimizer = OptimizedFunctions()
    
    # Single dispatch
    list_result = optimizer.process_data([1, 2, 3, 4, 5])
    dict_result = optimizer.process_data({"a": 1, "b": 2})
    string_result = optimizer.process_data("hello world")
    
    print(f"List processing: {list_result}")
    print(f"Dict processing: {dict_result}")
    print(f"String processing: {string_result}")
    
    # Priority system
    priority_system = PrioritySystem()
    priority_system.add_task("low_priority", 10)
    priority_system.add_task("high_priority", 1)
    priority_system.add_task("medium_priority", 5)
    
    next_task = priority_system.pop_task()
    print(f"Next task to process: {next_task}")
    
    # Sorted data manager
    sorted_manager = SortedDataManager()
    sorted_manager.insert_item(5, "five")
    sorted_manager.insert_item(2, "two")
    sorted_manager.insert_item(8, "eight")
    sorted_manager.insert_item(1, "one")
    
    found_item = sorted_manager.find_item(5)
    range_items = sorted_manager.find_range(2, 6)
    print(f"Found item: {found_item}")
    print(f"Range items: {range_items}")
    
    return True

# Performance and best practices summary
"""
ADVANCED STANDARD LIBRARY BEST PRACTICES:

1. COLLECTIONS MODULE:
   - Use Counter for frequency analysis and statistics
   - Use deque for efficient queue operations (O(1) append/pop on both ends)
   - Use defaultdict to avoid KeyError and simplify code
   - Use OrderedDict when insertion order matters (Python 3.7+ dicts are ordered)
   - Use ChainMap for configuration hierarchies

2. ITERTOOLS MODULE:
   - Use itertools for memory-efficient data processing
   - Combine itertools functions for complex data transformations
   - Use tee() carefully - it can consume significant memory
   - groupby() requires sorted input for meaningful results

3. FUNCTOOLS MODULE:
   - Use lru_cache for expensive pure functions
   - Use singledispatch for polymorphic behavior without inheritance
   - Use partial for function factories and configuration
   - Use wraps to preserve function metadata in decorators

4. HEAPQ MODULE:
   - Perfect for priority queues and top-k problems
   - More efficient than sorting for partial ordering
   - Use with custom comparison for complex priority logic

5. BISECT MODULE:
   - Maintain sorted sequences efficiently
   - Use for binary search in sorted data
   - Excellent for percentile calculations and range queries

PERFORMANCE CONSIDERATIONS:
- Collections.deque: O(1) append/pop operations on both ends
- heapq: O(log n) insert/extract, O(n) creation from list
- bisect: O(log n) search, O(n) insert (due to list shifting)
- lru_cache: O(1) average case, but memory overhead
- Counter: Optimized for counting operations

MEMORY MANAGEMENT:
- Use weak references to avoid circular references
- Be careful with itertools.tee() - it stores intermediate results
- Clear caches periodically in long-running applications
- Consider using __slots__ for memory-critical classes

PRODUCTION USAGE:
✓ Data processing pipelines
✓ Caching and optimization
✓ Priority and scheduling systems
✓ Configuration management
✓ Analytics and monitoring
✓ Memory-efficient data structures
"""`}
            />
            <div className="analogy-badge">Master Pattern: Advanced standard library usage for high-performance production systems</div>
            <p className="use-case">Essential for building efficient, scalable applications using Python's powerful built-in modules for data processing, caching, and system optimization.</p>
          </section>

          <section id="testing" className="concept-card">
            <h2 className="concept-title">Testing Framework Blueprints</h2>
            <p className="mb-4">Master comprehensive testing strategies from unit tests to integration testing for production-grade applications.</p>
            
            <CodeBlock
              title="Production Testing Patterns"
              code={`import unittest
import pytest
from unittest.mock import Mock, patch, MagicMock, call
import tempfile
import os
from dataclasses import dataclass
from typing import List, Dict, Any, Optional
import time
import threading
import asyncio

# Production test patterns using unittest and pytest
class TestFixturePatterns:
    """
    Professional test fixture patterns for reliable testing
    Production pattern: Consistent test environment setup and teardown
    """
    
    @pytest.fixture(scope="session")
    def database_connection(self):
        """
        Session-scoped fixture for expensive setup
        Production pattern: Share expensive resources across tests
        """
        # Setup: Create test database connection
        connection = self._create_test_database()
        yield connection
        # Teardown: Clean up database
        self._cleanup_test_database(connection)
    
    @pytest.fixture(scope="function")
    def clean_database(self, database_connection):
        """
        Function-scoped fixture for clean state per test
        Production pattern: Ensure test isolation
        """
        # Setup: Clear all tables
        self._clear_all_tables(database_connection)
        yield database_connection
        # Teardown: Clear tables after test
        self._clear_all_tables(database_connection)
    
    @pytest.fixture
    def temp_file(self):
        """
        Temporary file fixture with automatic cleanup
        Production pattern: Safe file operations in tests
        """
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as temp:
            temp_path = temp.name
        
        yield temp_path
        
        # Cleanup
        if os.path.exists(temp_path):
            os.unlink(temp_path)
    
    @pytest.fixture
    def mock_external_service(self):
        """
        Mock external service for isolated testing
        Production pattern: Avoid external dependencies in tests
        """
        with patch('requests.get') as mock_get:
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {"status": "success"}
            yield mock_get

# Advanced mocking patterns for complex systems
class MockingPatterns:
    """
    Advanced mocking strategies for production testing
    Pattern: Isolate units under test from dependencies
    """
    
    def test_complex_service_interaction(self):
        """
        Test complex service interactions with comprehensive mocking
        Production pattern: Mock entire subsystems for unit testing
        """
        # Create a mock service with multiple methods
        mock_payment_service = Mock()
        mock_payment_service.validate_payment.return_value = True
        mock_payment_service.process_payment.return_value = {
            "transaction_id": "12345",
            "status": "completed"
        }
        mock_payment_service.send_receipt.return_value = True
        
        # Mock external API calls
        with patch('requests.post') as mock_post:
            mock_post.return_value.status_code = 200
            mock_post.return_value.json.return_value = {"success": True}
            
            # Test the actual business logic
            order_processor = OrderProcessor(mock_payment_service)
            result = order_processor.process_order({
                "amount": 100.0,
                "currency": "USD",
                "customer_id": "cust_123"
            })
            
            # Verify the mock interactions
            mock_payment_service.validate_payment.assert_called_once()
            mock_payment_service.process_payment.assert_called_once()
            mock_payment_service.send_receipt.assert_called_once()
            
            # Verify the actual HTTP call
            mock_post.assert_called_once()
            
            assert result["status"] == "success"
    
    def test_with_side_effects(self):
        """
        Test with side effects and state changes
        Production pattern: Simulate complex behaviors and failures
        """
        # Mock with side effects for different call scenarios
        mock_api = Mock()
        
        # First call succeeds, second fails, third succeeds
        mock_api.fetch_data.side_effect = [
            {"data": "success"},
            ConnectionError("Network error"),
            {"data": "retry_success"}
        ]
        
        service = DataService(mock_api)
        
        # Test first call
        result1 = service.get_data_with_retry("endpoint1")
        assert result1 == {"data": "success"}
        
        # Test retry mechanism
        result2 = service.get_data_with_retry("endpoint2")
        assert result2 == {"data": "retry_success"}
        
        # Verify the retry happened
        assert mock_api.fetch_data.call_count == 3
    
    def test_context_manager_mocking(self):
        """
        Test context managers and resource management
        Production pattern: Test resource cleanup and error handling
        """
        mock_file = MagicMock()
        mock_file.__enter__.return_value = mock_file
        mock_file.read.return_value = "test data"
        
        with patch('builtins.open', return_value=mock_file):
            file_processor = FileProcessor()
            result = file_processor.process_file("test.txt")
            
            # Verify file operations
            mock_file.__enter__.assert_called_once()
            mock_file.__exit__.assert_called_once()
            mock_file.read.assert_called_once()
            
            assert result == "PROCESSED: test data"

# Property-based testing for robust validation
class PropertyBasedTesting:
    """
    Property-based testing patterns using hypothesis
    Production pattern: Test with generated data to find edge cases
    """
    
    def test_data_processing_properties(self):
        """
        Test data processing with property-based testing
        Production pattern: Verify invariants across input space
        """
        # Note: This would use hypothesis in a real implementation
        # from hypothesis import given, strategies as st
        
        # @given(st.lists(st.integers(min_value=0, max_value=1000)))
        def test_sum_property(numbers):
            """Test that sum is always >= max element"""
            if numbers:
                result = sum(numbers)
                max_element = max(numbers)
                assert result >= max_element
        
        # Test with various generated inputs
        test_cases = [
            [1, 2, 3],
            [100, 200, 50],
            [0, 0, 0],
            [1000],
            []
        ]
        
        for test_case in test_cases:
            test_sum_property(test_case)
    
    def test_serialization_roundtrip(self):
        """
        Test serialization/deserialization roundtrip property
        Production pattern: Ensure data integrity through transformations
        """
        test_objects = [
            {"name": "test", "value": 42},
            {"complex": {"nested": [1, 2, 3]}},
            {"empty": {}},
            {"unicode": "测试"}
        ]
        
        serializer = DataSerializer()
        
        for obj in test_objects:
            # Roundtrip property: deserialize(serialize(x)) == x
            serialized = serializer.serialize(obj)
            deserialized = serializer.deserialize(serialized)
            assert deserialized == obj

# Integration testing patterns
class IntegrationTestPatterns:
    """
    Integration testing strategies for production systems
    Pattern: Test component interactions and system behavior
    """
    
    @pytest.mark.integration
    def test_database_integration(self, database_connection):
        """
        Test actual database integration
        Production pattern: Test real database interactions
        """
        # Test repository layer with real database
        user_repo = UserRepository(database_connection)
        
        # Create test user
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "age": 30
        }
        
        user_id = user_repo.create_user(user_data)
        assert user_id is not None
        
        # Retrieve and verify
        retrieved_user = user_repo.get_user(user_id)
        assert retrieved_user["name"] == user_data["name"]
        assert retrieved_user["email"] == user_data["email"]
        
        # Update user
        updated_data = {"age": 31}
        user_repo.update_user(user_id, updated_data)
        
        updated_user = user_repo.get_user(user_id)
        assert updated_user["age"] == 31
        
        # Delete user
        user_repo.delete_user(user_id)
        deleted_user = user_repo.get_user(user_id)
        assert deleted_user is None
    
    @pytest.mark.integration
    def test_api_integration(self):
        """
        Test API endpoint integration
        Production pattern: Test full request/response cycle
        """
        # Test with test client or actual HTTP calls
        client = TestClient()
        
        # Test user creation endpoint
        response = client.post("/users", json={
            "name": "Integration Test User",
            "email": "integration@test.com"
        })
        
        assert response.status_code == 201
        user_id = response.json()["id"]
        
        # Test user retrieval endpoint
        response = client.get(f"/users/{user_id}")
        assert response.status_code == 200
        
        user_data = response.json()
        assert user_data["name"] == "Integration Test User"
        
        # Test user update endpoint
        response = client.put(f"/users/{user_id}", json={
            "name": "Updated Integration User"
        })
        assert response.status_code == 200
        
        # Verify update
        response = client.get(f"/users/{user_id}")
        updated_user = response.json()
        assert updated_user["name"] == "Updated Integration User"

# Performance testing patterns
class PerformanceTestPatterns:
    """
    Performance testing strategies for production systems
    Pattern: Ensure system performance meets requirements
    """
    
    def test_function_performance(self):
        """
        Test function execution time
        Production pattern: Ensure critical paths meet performance SLAs
        """
        data_processor = DataProcessor()
        large_dataset = list(range(100000))
        
        start_time = time.time()
        result = data_processor.process_large_dataset(large_dataset)
        end_time = time.time()
        
        execution_time = end_time - start_time
        
        # Assert performance requirement (e.g., < 1 second)
        assert execution_time < 1.0, f"Processing took {execution_time:.2f}s, expected < 1.0s"
        assert len(result) == len(large_dataset)
    
    def test_memory_usage(self):
        """
        Test memory usage patterns
        Production pattern: Ensure memory efficiency
        """
        import psutil
        import os
        
        process = psutil.Process(os.getpid())
        
        # Measure initial memory
        initial_memory = process.memory_info().rss
        
        # Perform memory-intensive operation
        memory_intensive_service = MemoryIntensiveService()
        result = memory_intensive_service.process_data(list(range(100000)))
        
        # Measure peak memory
        peak_memory = process.memory_info().rss
        memory_increase = peak_memory - initial_memory
        
        # Assert memory usage is within acceptable limits (e.g., < 100MB)
        max_allowed_memory = 100 * 1024 * 1024  # 100MB
        assert memory_increase < max_allowed_memory, f"Memory usage increased by {memory_increase / 1024 / 1024:.2f}MB"
        
        # Clean up and verify memory is released
        del result
        del memory_intensive_service
        
        # Force garbage collection
        import gc
        gc.collect()
    
    def test_concurrent_performance(self):
        """
        Test performance under concurrent load
        Production pattern: Ensure thread safety and performance under load
        """
        concurrent_service = ConcurrentService()
        
        def worker_task(worker_id):
            """Worker function for concurrent testing"""
            results = []
            for i in range(100):
                result = concurrent_service.thread_safe_operation(f"worker_{worker_id}_task_{i}")
                results.append(result)
            return results
        
        # Test with multiple threads
        threads = []
        start_time = time.time()
        
        for i in range(10):  # 10 concurrent workers
            thread = threading.Thread(target=worker_task, args=(i,))
            threads.append(thread)
            thread.start()
        
        # Wait for all threads to complete
        for thread in threads:
            thread.join()
        
        end_time = time.time()
        total_time = end_time - start_time
        
        # Assert concurrent performance (should be faster than sequential)
        assert total_time < 5.0, f"Concurrent execution took {total_time:.2f}s, expected < 5.0s"

# Async testing patterns
class AsyncTestPatterns:
    """
    Testing patterns for asynchronous code
    Pattern: Test async/await functionality properly
    """
    
    @pytest.mark.asyncio
    async def test_async_service(self):
        """
        Test async service methods
        Production pattern: Test asynchronous operations
        """
        async_service = AsyncDataService()
        
        # Test async data fetching
        result = await async_service.fetch_data("test_endpoint")
        assert result is not None
        
        # Test multiple concurrent requests
        tasks = [
            async_service.fetch_data(f"endpoint_{i}")
            for i in range(5)
        ]
        
        results = await asyncio.gather(*tasks)
        assert len(results) == 5
        assert all(result is not None for result in results)
    
    @pytest.mark.asyncio
    async def test_async_error_handling(self):
        """
        Test async error handling patterns
        Production pattern: Ensure proper exception handling in async code
        """
        async_service = AsyncDataService()
        
        # Test that async exceptions are properly raised
        with pytest.raises(ConnectionError):
            await async_service.fetch_data("invalid_endpoint")
        
        # Test timeout handling
        with pytest.raises(asyncio.TimeoutError):
            await asyncio.wait_for(
                async_service.slow_operation(),
                timeout=1.0
            )

# Test organization and configuration
class TestConfiguration:
    """
    Test configuration and organization patterns
    Production pattern: Scalable test suite organization
    """
    
    # pytest.ini configuration example
    PYTEST_CONFIG = """
    [tool:pytest]
    testpaths = tests
    python_files = test_*.py *_test.py
    python_classes = Test*
    python_functions = test_*
    addopts = 
        --strict-markers
        --strict-config
        --verbose
        --tb=short
        --cov=src
        --cov-report=term-missing
        --cov-report=html
        --cov-fail-under=80
    
    markers =
        unit: Unit tests
        integration: Integration tests
        slow: Slow running tests
        external: Tests requiring external services
    """
    
    @classmethod
    def configure_test_environment(cls):
        """
        Configure test environment
        Production pattern: Consistent test environment setup
        """
        # Set test environment variables
        os.environ["ENV"] = "test"
        os.environ["DATABASE_URL"] = "sqlite:///test.db"
        os.environ["API_BASE_URL"] = "http://localhost:8000"
        
        # Configure logging for tests
        import logging
        logging.basicConfig(level=logging.WARNING)
        
        # Disable external service calls
        os.environ["DISABLE_EXTERNAL_CALLS"] = "true"

# Mock classes for examples (would be real implementations)
class OrderProcessor:
    def __init__(self, payment_service):
        self.payment_service = payment_service
    
    def process_order(self, order_data):
        # Business logic implementation
        if self.payment_service.validate_payment(order_data):
            result = self.payment_service.process_payment(order_data)
            self.payment_service.send_receipt(order_data["customer_id"])
            return {"status": "success", "transaction": result}
        return {"status": "failed"}

class DataService:
    def __init__(self, api):
        self.api = api
    
    def get_data_with_retry(self, endpoint):
        max_retries = 3
        for attempt in range(max_retries):
            try:
                return self.api.fetch_data(endpoint)
            except ConnectionError:
                if attempt == max_retries - 1:
                    raise
                continue

# Production testing best practices summary
"""
PRODUCTION TESTING BEST PRACTICES:

1. TEST ORGANIZATION:
   - Separate unit, integration, and end-to-end tests
   - Use clear naming conventions (test_*, Test*)
   - Group related tests in classes
   - Use markers for test categorization

2. FIXTURES AND SETUP:
   - Use appropriate fixture scopes (function, class, module, session)
   - Ensure proper cleanup in fixtures
   - Mock external dependencies
   - Create reusable test utilities

3. MOCKING STRATEGIES:
   - Mock at the boundary of your system
   - Use side_effects for complex behaviors
   - Verify mock interactions with assertions
   - Mock time, randomness, and external services

4. ASSERTION PATTERNS:
   - Use descriptive assertion messages
   - Test both positive and negative cases
   - Verify state changes and side effects
   - Use appropriate assertion methods

5. PERFORMANCE TESTING:
   - Set realistic performance benchmarks
   - Test under realistic load conditions
   - Monitor memory usage and resource consumption
   - Test concurrent and async scenarios

6. ASYNC TESTING:
   - Use proper async test decorators
   - Test timeout scenarios
   - Verify concurrent behavior
   - Handle async exceptions properly

TESTING PYRAMID:
- Unit Tests (70%): Fast, isolated, numerous
- Integration Tests (20%): Component interactions
- End-to-End Tests (10%): Full system scenarios

CONTINUOUS INTEGRATION:
- Run tests on every commit
- Use different test suites for different stages
- Fail fast on test failures
- Generate coverage reports

PRODUCTION CONSIDERATIONS:
- Test in environment similar to production
- Use test databases with realistic data
- Test error scenarios and edge cases
- Maintain test data isolation
- Regular test maintenance and updates
"""`}
            />
            <div className="analogy-badge">Master Pattern: Comprehensive testing strategies for production-grade applications</div>
            <p className="use-case">Essential for building reliable, maintainable applications with confidence in code quality, performance, and correctness.</p>
          </section>

          <section id="packaging" className="concept-card">
            <h2 className="concept-title">Packaging & Distribution Blueprints</h2>
            <p className="mb-4">Master the complete lifecycle of Python package development, from project structure to PyPI distribution and dependency management.</p>
            
            <CodeBlock
              title="Production Package Development"
              code={`# Project structure for professional Python packages
"""
my_package/
├── README.md
├── LICENSE
├── pyproject.toml          # Modern Python packaging (PEP 518)
├── setup.py               # Legacy support (optional)
├── MANIFEST.in            # Include additional files
├── requirements.txt       # Development dependencies
├── requirements-dev.txt   # Development-only dependencies
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml         # Continuous integration
├── docs/
│   ├── conf.py
│   ├── index.rst
│   └── api.rst
├── tests/
│   ├── __init__.py
│   ├── test_core.py
│   └── conftest.py
└── src/
    └── my_package/
        ├── __init__.py
        ├── core.py
        ├── utils.py
        ├── cli.py
        └── py.typed       # Type hint marker
"""

# Modern pyproject.toml configuration
PYPROJECT_TOML = '''
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-package"
version = "1.0.0"
description = "A professional Python package"
readme = "README.md"
license = {file = "LICENSE"}
authors = [
    {name = "Your Name", email = "your.email@example.com"}
]
maintainers = [
    {name = "Your Name", email = "your.email@example.com"}
]
classifiers = [
    "Development Status :: 5 - Production/Stable",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.8",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Topic :: Software Development :: Libraries :: Python Modules",
]
keywords = ["python", "package", "example"]
requires-python = ">=3.8"
dependencies = [
    "requests>=2.25.0",
    "click>=8.0.0",
    "pydantic>=1.8.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "pytest-cov>=4.0.0",
    "black>=22.0.0",
    "isort>=5.10.0",
    "mypy>=0.991",
    "flake8>=5.0.0",
    "pre-commit>=2.20.0",
]
docs = [
    "sphinx>=5.0.0",
    "sphinx-rtd-theme>=1.0.0",
    "myst-parser>=0.18.0",
]
test = [
    "pytest>=7.0.0",
    "pytest-cov>=4.0.0",
    "pytest-mock>=3.8.0",
]

[project.urls]
Homepage = "https://github.com/username/my-package"
Documentation = "https://my-package.readthedocs.io"
Repository = "https://github.com/username/my-package.git"
Issues = "https://github.com/username/my-package/issues"
Changelog = "https://github.com/username/my-package/blob/main/CHANGELOG.md"

[project.scripts]
my-cli = "my_package.cli:main"

[project.entry-points."my_package.plugins"]
plugin1 = "my_package.plugins:Plugin1"

[tool.setuptools]
package-dir = {"" = "src"}

[tool.setuptools.packages.find]
where = ["src"]

[tool.setuptools.package-data]
my_package = ["*.json", "*.yaml", "*.txt"]

[tool.black]
line-length = 88
target-version = ["py38", "py39", "py310", "py311"]
include = '\\.pyi?$'
extend-exclude = '''
/(
  # directories
  \\.eggs
  | \\.git
  | \\.hg
  | \\.mypy_cache
  | \\.tox
  | \\.venv
  | build
  | dist
)/
'''

[tool.isort]
profile = "black"
multi_line_output = 3
line_length = 88
known_first_party = ["my_package"]

[tool.mypy]
python_version = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
check_untyped_defs = true
disallow_untyped_decorators = true
no_implicit_optional = true
warn_redundant_casts = true
warn_unused_ignores = true
warn_no_return = true
warn_unreachable = true
strict_equality = true

[[tool.mypy.overrides]]
module = "tests.*"
disallow_untyped_defs = false

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = "test_*.py"
python_classes = "Test*"
python_functions = "test_*"
addopts = [
    "--strict-markers",
    "--strict-config",
    "--cov=my_package",
    "--cov-report=term-missing",
    "--cov-report=html",
    "--cov-fail-under=80",
]
markers = [
    "slow: marks tests as slow",
    "integration: marks tests as integration tests",
]

[tool.coverage.run]
source = ["src"]
omit = [
    "*/tests/*",
    "*/test_*",
    "*/__pycache__/*",
]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "if self.debug:",
    "if settings.DEBUG",
    "raise AssertionError",
    "raise NotImplementedError",
    "if 0:",
    "if __name__ == .__main__.:",
    "class .*\\bProtocol\\):",
    "@(abc\\.)?abstractmethod",
]
'''

# Professional __init__.py structure
INIT_PY_TEMPLATE = '''
"""
My Package - A professional Python package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A comprehensive example of professional Python package structure.

Basic usage:
   >>> from my_package import core
   >>> result = core.process_data("example")
   >>> print(result)

:copyright: (c) 2024 by Your Name.
:license: MIT, see LICENSE for more details.
"""

# Version management
__version__ = "1.0.0"
__version_info__ = tuple(int(i) for i in __version__.split("."))

# Public API - carefully curated exports
from .core import (
    DataProcessor,
    ProcessingError,
    process_data,
    validate_input,
)
from .utils import (
    ConfigManager,
    Logger,
    retry_on_failure,
)

# Define what gets imported with "from my_package import *"
__all__ = [
    # Core functionality
    "DataProcessor",
    "ProcessingError", 
    "process_data",
    "validate_input",
    
    # Utilities
    "ConfigManager",
    "Logger",
    "retry_on_failure",
    
    # Metadata
    "__version__",
    "__version_info__",
]

# Package-level configuration
import logging
logging.getLogger(__name__).addHandler(logging.NullHandler())

# Lazy imports for performance (if needed)
def _get_advanced_processor():
    """Lazy import for optional heavy dependencies"""
    try:
        from .advanced import AdvancedProcessor
        return AdvancedProcessor
    except ImportError as e:
        raise ImportError(
            "Advanced processor requires additional dependencies. "
            "Install with: pip install my-package[advanced]"
        ) from e

# Make lazy imports available
import sys
sys.modules[__name__ + ".advanced_processor"] = _get_advanced_processor
'''

# CLI development with Click
CLI_TEMPLATE = '''
import click
import sys
from typing import Optional
from pathlib import Path

from . import __version__
from .core import DataProcessor, ProcessingError
from .utils import ConfigManager, Logger

@click.group()
@click.version_option(version=__version__)
@click.option('--config', '-c', type=click.Path(exists=True), 
              help='Configuration file path')
@click.option('--verbose', '-v', is_flag=True, 
              help='Enable verbose output')
@click.pass_context
def cli(ctx: click.Context, config: Optional[str], verbose: bool):
    """
    My Package CLI - Professional command-line interface
    
    A comprehensive CLI for package functionality.
    """
    # Ensure context object exists
    ctx.ensure_object(dict)
    
    # Setup configuration
    config_manager = ConfigManager()
    if config:
        config_manager.load_from_file(config)
    
    # Setup logging
    logger = Logger()
    if verbose:
        logger.set_level("DEBUG")
    
    # Store in context for subcommands
    ctx.obj['config'] = config_manager
    ctx.obj['logger'] = logger
    ctx.obj['verbose'] = verbose

@cli.command()
@click.argument('input_file', type=click.Path(exists=True))
@click.argument('output_file', type=click.Path())
@click.option('--format', '-f', 
              type=click.Choice(['json', 'yaml', 'csv']),
              default='json',
              help='Output format')
@click.option('--batch-size', '-b', type=int, default=1000,
              help='Processing batch size')
@click.pass_context
def process(ctx: click.Context, input_file: str, output_file: str, 
           format: str, batch_size: int):
    """
    Process data from input file to output file
    
    INPUT_FILE: Path to input data file
    OUTPUT_FILE: Path to output data file
    """
    logger = ctx.obj['logger']
    config = ctx.obj['config']
    
    try:
        logger.info(f"Processing {input_file} -> {output_file}")
        
        # Initialize processor with configuration
        processor = DataProcessor(
            config=config.get_processing_config(),
            batch_size=batch_size
        )
        
        # Process the file
        with click.progressbar(
            length=Path(input_file).stat().st_size,
            label='Processing data'
        ) as bar:
            
            result = processor.process_file(
                input_file, 
                output_file, 
                format=format,
                progress_callback=bar.update
            )
        
        logger.info(f"Processing completed. Processed {result['records']} records")
        click.echo(click.style("✓ Processing successful!", fg='green'))
        
    except ProcessingError as e:
        logger.error(f"Processing failed: {e}")
        click.echo(click.style(f"✗ Error: {e}", fg='red'), err=True)
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        click.echo(click.style(f"✗ Unexpected error: {e}", fg='red'), err=True)
        sys.exit(1)

@cli.command()
@click.option('--output', '-o', type=click.Path(), 
              help='Output file for configuration template')
def init_config(output: Optional[str]):
    """Generate a configuration template"""
    config_manager = ConfigManager()
    template = config_manager.generate_template()
    
    if output:
        Path(output).write_text(template)
        click.echo(f"Configuration template written to {output}")
    else:
        click.echo(template)

@cli.command()
@click.option('--check-dependencies', is_flag=True,
              help='Check if all dependencies are available')
def doctor(check_dependencies: bool):
    """Diagnose package installation and configuration"""
    
    click.echo("Package Diagnostics")
    click.echo("==================")
    
    # Check Python version
    python_version = sys.version_info
    min_version = (3, 8)
    
    if python_version >= min_version:
        click.echo(click.style(f"✓ Python {python_version.major}.{python_version.minor}.{python_version.micro}", fg='green'))
    else:
        click.echo(click.style(f"✗ Python {python_version.major}.{python_version.minor} (minimum: {min_version[0]}.{min_version[1]})", fg='red'))
    
    # Check dependencies
    if check_dependencies:
        dependencies = ['requests', 'click', 'pydantic']
        for dep in dependencies:
            try:
                __import__(dep)
                click.echo(click.style(f"✓ {dep}", fg='green'))
            except ImportError:
                click.echo(click.style(f"✗ {dep} (missing)", fg='red'))
    
    click.echo("\\nDiagnostics completed!")

def main():
    """Entry point for the CLI"""
    cli()

if __name__ == '__main__':
    main()
'''

# Distribution and publishing patterns
PUBLISHING_WORKFLOW = '''
# .github/workflows/publish.yml
name: Publish to PyPI

on:
  release:
    types: [published]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10", "3.11"]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4

    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -e .[dev,test]
    
    - name: Run tests
      run: |
        pytest
    
    - name: Run linting
      run: |
        black --check .
        isort --check-only .
        flake8 .
        mypy src/

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: "3.10"
    
    - name: Install build dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build twine
    
    - name: Build package
      run: python -m build
    
    - name: Check package
      run: twine check dist/*
    
    - name: Upload to PyPI
      env:
        TWINE_USERNAME: __token__
        TWINE_PASSWORD: __password__
      run: twine upload dist/*
'''

# Advanced packaging patterns
class PackageManager:
    """
    Advanced package management patterns
    Production pattern: Automate package lifecycle
    """
    
    def __init__(self, package_root: Path):
        self.package_root = Path(package_root)
        self.pyproject_path = self.package_root / "pyproject.toml"
    
    def bump_version(self, part: str = "patch"):
        """
        Bump package version automatically
        Production pattern: Semantic versioning automation
        """
        import toml
        
        # Read current version
        with open(self.pyproject_path) as f:
            config = toml.load(f)
        
        current_version = config["project"]["version"]
        major, minor, patch = map(int, current_version.split("."))
        
        # Bump version based on part
        if part == "major":
            major += 1
            minor = 0
            patch = 0
        elif part == "minor":
            minor += 1
            patch = 0
        elif part == "patch":
            patch += 1
        else:
            raise ValueError(f"Invalid version part: {part}")
        
        new_version = f"{major}.{minor}.{patch}"
        
        # Update pyproject.toml
        config["project"]["version"] = new_version
        with open(self.pyproject_path, "w") as f:
            toml.dump(config, f)
        
        # Update __init__.py
        init_file = self.package_root / "src" / "my_package" / "__init__.py"
        if init_file.exists():
            content = init_file.read_text()
            updated_content = re.sub(
                r'__version__ = "[^"]*"',
                f'__version__ = "{new_version}"',
                content
            )
            init_file.write_text(updated_content)
        
        return new_version
    
    def validate_package(self):
        """
        Validate package structure and configuration
        Production pattern: Pre-release validation
        """
        errors = []
        warnings = []
        
        # Check required files
        required_files = [
            "README.md",
            "LICENSE",
            "pyproject.toml",
            "src/my_package/__init__.py"
        ]
        
        for file_path in required_files:
            if not (self.package_root / file_path).exists():
                errors.append(f"Missing required file: {file_path}")
        
        # Check pyproject.toml structure
        if self.pyproject_path.exists():
            import toml
            try:
                config = toml.load(self.pyproject_path)
                
                # Check required fields
                required_fields = [
                    "project.name",
                    "project.version", 
                    "project.description",
                    "project.authors"
                ]
                
                for field in required_fields:
                    keys = field.split(".")
                    current = config
                    try:
                        for key in keys:
                            current = current[key]
                    except KeyError:
                        errors.append(f"Missing required field in pyproject.toml: {field}")
                
            except Exception as e:
                errors.append(f"Invalid pyproject.toml: {e}")
        
        # Check __init__.py exports
        init_file = self.package_root / "src" / "my_package" / "__init__.py"
        if init_file.exists():
            content = init_file.read_text()
            if "__all__" not in content:
                warnings.append("__init__.py should define __all__ for explicit exports")
            if "__version__" not in content:
                warnings.append("__init__.py should define __version__")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings
        }
    
    def build_package(self, clean: bool = True):
        """
        Build package for distribution
        Production pattern: Automated package building
        """
        import subprocess
        import shutil
        
        # Clean previous builds
        if clean:
            dist_dir = self.package_root / "dist"
            if dist_dir.exists():
                shutil.rmtree(dist_dir)
            
            build_dir = self.package_root / "build"
            if build_dir.exists():
                shutil.rmtree(build_dir)
        
        # Build package
        result = subprocess.run(
            ["python", "-m", "build"],
            cwd=self.package_root,
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            raise RuntimeError(f"Build failed: {result.stderr}")
        
        return {
            "success": True,
            "output": result.stdout,
            "files": list((self.package_root / "dist").glob("*"))
        }

# Production packaging best practices summary
"""
PRODUCTION PACKAGING BEST PRACTICES:

1. PROJECT STRUCTURE:
   - Use src/ layout for better isolation
   - Include comprehensive README and LICENSE
   - Use pyproject.toml for modern packaging
   - Organize tests separately from source code

2. VERSION MANAGEMENT:
   - Follow semantic versioning (MAJOR.MINOR.PATCH)
   - Single source of truth for version numbers
   - Automate version bumping
   - Tag releases in version control

3. DEPENDENCIES:
   - Pin dependency versions for reproducibility
   - Separate dev dependencies from runtime dependencies
   - Use optional dependencies for optional features
   - Regular dependency updates and security scanning

4. QUALITY ASSURANCE:
   - Comprehensive test coverage (>80%)
   - Code formatting with black and isort
   - Type checking with mypy
   - Linting with flake8 or ruff
   - Pre-commit hooks for quality gates

5. DOCUMENTATION:
   - Comprehensive README with usage examples
   - API documentation with docstrings
   - Sphinx documentation for complex packages
   - Changelog for version history

6. DISTRIBUTION:
   - Build wheels and source distributions
   - Automate publishing with CI/CD
   - Test on multiple Python versions
   - Security scanning before release

7. CLI DEVELOPMENT:
   - Use Click for robust CLI interfaces
   - Comprehensive help text and examples
   - Progress bars for long operations
   - Proper error handling and exit codes

SECURITY CONSIDERATIONS:
- Use API tokens for PyPI publishing
- Sign releases with GPG keys
- Scan dependencies for vulnerabilities
- Never include secrets in package

MAINTENANCE:
- Regular dependency updates
- Monitor package usage and issues
- Deprecation warnings for breaking changes
- Long-term support planning

DISTRIBUTION CHANNELS:
- PyPI for public packages
- Private registries for internal packages
- GitHub releases for source code
- Docker images for containerized applications
"""

# Example usage
def demonstrate_packaging():
    """Demonstrate professional packaging patterns"""
    
    # Package validation
    package_manager = PackageManager("/path/to/package")
    validation_result = package_manager.validate_package()
    
    if validation_result["valid"]:
        print("✓ Package structure is valid")
        
        # Bump version
        new_version = package_manager.bump_version("patch")
        print(f"Version bumped to: {new_version}")
        
        # Build package
        build_result = package_manager.build_package()
        print(f"Package built successfully: {build_result['files']}")
        
    else:
        print("✗ Package validation failed:")
        for error in validation_result["errors"]:
            print(f"  - {error}")
    
    return validation_result
'''`}
            />
            <div className="analogy-badge">Master Pattern: Professional package development, distribution, and maintenance lifecycle</div>
            <p className="use-case">Essential for creating, distributing, and maintaining Python packages, libraries, and applications for production use and open-source distribution.</p>
          </section>

          {/* Continue with other advanced sections... */}
          <section id="descriptors" className="concept-card">
            <h2 className="concept-title">Descriptor Protocol Blueprints</h2>
            <p className="mb-4">The foundation of Python's attribute system - used by properties, methods, and advanced frameworks.</p>
            
            <CodeBlock
              title="Advanced Descriptor Patterns"
              code={`# Production-grade descriptors for data validation and ORM-like behavior
class TypedAttribute:
    """
    Descriptor for type-safe attributes with validation
    Used in frameworks like SQLAlchemy and Django ORM
    """
    def __init__(self, name, expected_type, validator=None, default=None):
        self.name = name
        self.expected_type = expected_type
        self.validator = validator
        self.default = default
        self.storage_name = f"_{name}"
    
    def __get__(self, obj, owner):
        if obj is None:
            return self
        return getattr(obj, self.storage_name, self.default)
    
    def __set__(self, obj, value):
        # Type checking
        if value is not None and not isinstance(value, self.expected_type):
            raise TypeError(f"{self.name} must be {self.expected_type.__name__}, got {type(value).__name__}")
        
        # Custom validation
        if self.validator and value is not None:
            if not self.validator(value):
                raise ValueError(f"Validation failed for {self.name}: {value}")
        
        setattr(obj, self.storage_name, value)
    
    def __delete__(self, obj):
        if hasattr(obj, self.storage_name):
            delattr(obj, self.storage_name)

# Database-like computed fields
class ComputedField:
    """
    Descriptor for computed/derived fields
    Automatically recalculates when dependencies change
    """
    def __init__(self, computation_func, dependencies):
        self.computation_func = computation_func
        self.dependencies = dependencies
        self.cache = {}
    
    def __get__(self, obj, owner):
        if obj is None:
            return self
        
        obj_id = id(obj)
        
        # Check if any dependencies changed
        current_values = tuple(getattr(obj, dep) for dep in self.dependencies)
        
        if obj_id not in self.cache or self.cache[obj_id][0] != current_values:
            # Recompute
            result = self.computation_func(obj)
            self.cache[obj_id] = (current_values, result)
        
        return self.cache[obj_id][1]

# Lazy loading descriptor for expensive operations
class LazyProperty:
    """
    Descriptor for lazy-loaded properties
    Value computed only once, on first access
    """
    def __init__(self, func):
        self.func = func
        self.name = func.__name__
        self.__doc__ = func.__doc__
    
    def __get__(self, obj, owner):
        if obj is None:
            return self
        
        # Check if already computed
        attr_name = f"_lazy_{self.name}"
        if hasattr(obj, attr_name):
            return getattr(obj, attr_name)
        
        # Compute and cache
        value = self.func(obj)
        setattr(obj, attr_name, value)
        return value

# Example: Advanced model with multiple descriptor types
class User:
    # Type-safe attributes with validation
    username = TypedAttribute(
        "username", 
        str, 
        validator=lambda x: len(x) >= 3 and x.isalnum(),
        default=""
    )
    
    age = TypedAttribute(
        "age", 
        int, 
        validator=lambda x: 0 <= x <= 150,
        default=0
    )
    
    email = TypedAttribute(
        "email", 
        str, 
        validator=lambda x: "@" in x and "." in x.split("@")[1],
        default=""
    )
    
    # Computed field that depends on other attributes
    display_name = ComputedField(
        lambda self: f"{self.username} ({self.age})",
        dependencies=["username", "age"]
    )
    
    def __init__(self, username, age, email):
        self.username = username
        self.age = age
        self.email = email
    
    @LazyProperty
    def profile_data(self):
        """Expensive operation - only computed when needed"""
        print("Computing expensive profile data...")
        # Simulate expensive computation
        import time
        time.sleep(0.1)
        return {
            "username": self.username,
            "age_group": "adult" if self.age >= 18 else "minor",
            "email_domain": self.email.split("@")[1] if "@" in self.email else "unknown"
        }

# Usage examples
user = User("alice123", 25, "alice@example.com")
print(user.display_name)  # "alice123 (25)" - computed automatically
user.age = 26
print(user.display_name)  # "alice123 (26)" - recomputed because age changed

# Lazy property computed only once
print(user.profile_data)  # Computes and caches
print(user.profile_data)  # Uses cached value

# Validation in action
try:
    user.username = "ab"  # Too short
except ValueError as e:
    print(f"Validation error: {e}")

try:
    user.email = "invalid-email"  # No @ or domain
except ValueError as e:
    print(f"Validation error: {e}")`}
            />
            <div className="analogy-badge">Advanced Pattern: Attribute lifecycle management and validation systems</div>
            <p className="use-case">Use descriptors for building ORMs, data validation frameworks, and sophisticated attribute management systems.</p>
          </section>

          {/* Add more advanced sections... */}
          <section id="concurrency" className="concept-card">
            <h2 className="concept-title">Concurrency & Parallelism Blueprints</h2>
            <p className="mb-4">Master async/await, threading, multiprocessing, and concurrent.futures for high-performance applications.</p>
            
            <CodeBlock
              title="Production Concurrency Patterns"
              code={`import asyncio
import concurrent.futures
import threading
import time
from typing import List, Callable, Any

# Async/await pattern for I/O-bound operations
class AsyncWebScraper:
    """
    Production-grade async web scraper
    Handles thousands of concurrent requests efficiently
    """
    
    def __init__(self, max_concurrent=100):
        self.session = None
        self.semaphore = asyncio.Semaphore(max_concurrent)
    
    async def __aenter__(self):
        import aiohttp
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_url(self, url: str) -> dict:
        """Fetch single URL with rate limiting"""
        async with self.semaphore:
            try:
                async with self.session.get(url) as response:
                    content = await response.text()
                    return {
                        "url": url,
                        "status": response.status,
                        "length": len(content),
                        "success": True
                    }
            except Exception as e:
                return {
                    "url": url,
                    "error": str(e),
                    "success": False
                }
    
    async def fetch_many(self, urls: List[str]) -> List[dict]:
        """Fetch multiple URLs concurrently"""
        tasks = [self.fetch_url(url) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)

# Producer-Consumer pattern with queues
class AsyncTaskProcessor:
    """
    Async task processing system
    Used for background job processing, message queues
    """
    
    def __init__(self, max_workers=10):
        self.queue = asyncio.Queue()
        self.workers = []
        self.max_workers = max_workers
        self.running = False
    
    async def add_task(self, task_func: Callable, *args, **kwargs):
        """Add task to processing queue"""
        await self.queue.put((task_func, args, kwargs))
    
    async def worker(self, worker_id: int):
        """Worker coroutine that processes tasks"""
        while self.running:
            try:
                # Wait for task with timeout
                task_func, args, kwargs = await asyncio.wait_for(
                    self.queue.get(), timeout=1.0
                )
                
                # Process task
                start_time = time.time()
                try:
                    result = await task_func(*args, **kwargs)
                    print(f"Worker {worker_id}: Task completed in {time.time() - start_time:.2f}s")
                except Exception as e:
                    print(f"Worker {worker_id}: Task failed: {e}")
                finally:
                    self.queue.task_done()
                    
            except asyncio.TimeoutError:
                continue  # No tasks available, continue loop
    
    async def start(self):
        """Start worker pool"""
        self.running = True
        self.workers = [
            asyncio.create_task(self.worker(i)) 
            for i in range(self.max_workers)
        ]
    
    async def stop(self):
        """Stop worker pool gracefully"""
        self.running = False
        await asyncio.gather(*self.workers, return_exceptions=True)

# CPU-bound tasks with multiprocessing
class ParallelProcessor:
    """
    Multiprocessing for CPU-intensive tasks
    Bypasses GIL limitations for true parallelism
    """
    
    @staticmethod
    def cpu_intensive_task(data: List[int]) -> int:
        """Example CPU-intensive function"""
        return sum(x * x for x in data)
    
    def process_parallel(self, data_chunks: List[List[int]], max_workers=None) -> List[int]:
        """Process data chunks in parallel"""
        with concurrent.futures.ProcessPoolExecutor(max_workers=max_workers) as executor:
            # Submit all tasks
            futures = [
                executor.submit(self.cpu_intensive_task, chunk) 
                for chunk in data_chunks
            ]
            
            # Collect results as they complete
            results = []
            for future in concurrent.futures.as_completed(futures):
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    print(f"Task failed: {e}")
                    results.append(0)
            
            return results

# Thread-safe shared state
class ThreadSafeCounter:
    """
    Thread-safe counter with advanced features
    Used in monitoring, statistics, rate limiting
    """
    
    def __init__(self):
        self._value = 0
        self._lock = threading.RLock()
        self._condition = threading.Condition(self._lock)
    
    def increment(self, amount=1):
        """Thread-safe increment"""
        with self._lock:
            self._value += amount
            self._condition.notify_all()
    
    def decrement(self, amount=1):
        """Thread-safe decrement"""
        with self._lock:
            self._value -= amount
            self._condition.notify_all()
    
    def wait_for_value(self, target_value, timeout=None):
        """Wait until counter reaches target value"""
        with self._condition:
            return self._condition.wait_for(
                lambda: self._value >= target_value,
                timeout=timeout
            )
    
    @property
    def value(self):
        """Thread-safe value access"""
        with self._lock:
            return self._value

# Usage examples
async def main():
    # Async web scraping
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2", 
        "https://httpbin.org/delay/1"
    ]
    
    async with AsyncWebScraper(max_concurrent=2) as scraper:
        results = await scraper.fetch_many(urls)
        print(f"Scraped {len(results)} URLs")
    
    # Async task processing
    processor = AsyncTaskProcessor(max_workers=3)
    await processor.start()
    
    # Add some example tasks
    async def example_task(task_id):
        await asyncio.sleep(1)
        return f"Task {task_id} completed"
    
    for i in range(5):
        await processor.add_task(example_task, i)
    
    # Wait for all tasks and stop
    await processor.queue.join()
    await processor.stop()

# Run the async example
# asyncio.run(main())

# CPU-bound processing example
def parallel_example():
    # Generate test data
    data = [list(range(i * 1000, (i + 1) * 1000)) for i in range(4)]
    
    processor = ParallelProcessor()
    results = processor.process_parallel(data, max_workers=2)
    print(f"Parallel processing results: {results}")

# Thread-safe counter example
def threading_example():
    counter = ThreadSafeCounter()
    
    def worker():
        for _ in range(100):
            counter.increment()
    
    # Start multiple threads
    threads = [threading.Thread(target=worker) for _ in range(5)]
    for t in threads:
        t.start()
    
    # Wait for completion
    for t in threads:
        t.join()
    
    print(f"Final counter value: {counter.value}")  # Should be 500`}
            />
            <div className="analogy-badge">Production Pattern: Scalable concurrent systems and parallel processing</div>
            <p className="use-case">Use these patterns for web scrapers, API services, data processing pipelines, and high-throughput applications.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlueprintsMastery;