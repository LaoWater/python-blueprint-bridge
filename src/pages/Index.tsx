
import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';

const Index = () => {
  const [tocItems, setTocItems] = useState([
    { id: 'variables-basic-types', title: 'Variables & Basic Types' },
    { id: 'collections', title: 'Collections' },
    { id: 'control-flow', title: 'Control Flow' },
    { id: 'functions', title: 'Functions' },
    { id: 'string-manipulation', title: 'String Manipulation' },
    { id: 'file-handling', title: 'File Handling' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'list-comprehensions', title: 'List Comprehensions' }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Python Launchpad" 
        subtitle="Essential syntax for common tasks, presented as direct Python equivalents to familiar concepts."
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Main content */}
        <div className="flex-grow max-w-4xl">
          <section id="variables-basic-types" className="concept-card">
            <h2 className="concept-title">Variables & Basic Types</h2>
            <p className="mb-4">Python uses dynamic typing - no type declarations needed.</p>
            
            <CodeBlock
              title="Variable Declaration" 
              code={`# No type declarations required
name = "Python"  # string
age = 30         # integer
price = 19.99    # float
is_valid = True  # boolean (note the capitalization)

# Multiple assignment
x, y, z = 1, 2, 3

# Type checking
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>
print(type(price)) # <class 'float'>`}
            />
            
            <div className="analogy-badge">Similar to: var in JavaScript, auto in C++</div>
            <p className="use-case">Use for quick variable assignments without verbose type declarations.</p>
          </section>
          
          <section id="collections" className="concept-card">
            <h2 className="concept-title">Collections</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Lists</h3>
            <CodeBlock
              title="Creating and Working with Lists"
              code={`# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Accessing elements (0-indexed)
first = numbers[0]      # 1
last = numbers[-1]      # 5

# Slicing [start:end:step] (end is exclusive)
subset = numbers[1:4]   # [2, 3, 4]
reversed_list = numbers[::-1]  # [5, 4, 3, 2, 1]

# Common methods
numbers.append(6)        # [1, 2, 3, 4, 5, 6]
numbers.insert(1, 10)    # [1, 10, 2, 3, 4, 5, 6]
popped = numbers.pop()   # popped = 6, numbers = [1, 10, 2, 3, 4, 5]
numbers.remove(10)       # [1, 2, 3, 4, 5]
length = len(numbers)    # 5`}
            />
            <div className="analogy-badge">Similar to: ArrayList in Java, vector in C++</div>
            <p className="use-case">Use for ordered collections of items that may change during program execution.</p>

            <h3 className="text-lg font-medium mb-2 mt-4">Tuples</h3>
            <CodeBlock
              title="Creating and Working with Tuples"
              code={`# Creating tuples (immutable lists)
point = (10, 20)
person = ("John", 30, "Developer")

# Accessing elements (same as lists)
name = person[0]    # "John"

# Unpacking tuples
x, y = point        # x = 10, y = 20
name, age, job = person  # name = "John", age = 30, job = "Developer"

# Single-element tuple needs trailing comma
singleton = (1,)    # Tuple with one element
not_tuple = (1)     # This is just an integer in parentheses

# Common use: returning multiple values from functions
def get_dimensions():
    return (1920, 1080)  # Returns a tuple
    
width, height = get_dimensions()`}
            />
            <div className="analogy-badge">Similar to: Immutable lists, std::tuple in C++</div>
            <p className="use-case">Use for immutable sequences, multiple return values, or when data shouldn't change.</p>

            <h3 className="text-lg font-medium mb-2 mt-4">Dictionaries</h3>
            <CodeBlock
              title="Creating and Working with Dictionaries"
              code={`# Creating dictionaries (key-value pairs)
user = {
    "name": "Alice",
    "age": 28,
    "is_admin": False
}

# Accessing values
name = user["name"]          # "Alice"
# Safe access with get (provides default if key doesn't exist)
role = user.get("role", "User")  # "User" (default value)

# Adding or updating entries
user["email"] = "alice@example.com"
user["age"] = 29

# Removing entries
del user["is_admin"]

# Dictionary methods
keys = user.keys()          # dict_keys(['name', 'age', 'email'])
values = user.values()      # dict_values(['Alice', 29, 'alice@example.com'])
items = user.items()        # dict_items([('name', 'Alice'), ('age', 29), ('email', 'alice@example.com')])

# Dictionary comprehensions
squares = {x: x*x for x in range(6)}  # {0:0, 1:1, 2:4, 3:9, 4:16, 5:25}`}
            />
            <div className="analogy-badge">Similar to: HashMap in Java, map in C++, Object in JavaScript</div>
            <p className="use-case">Use for key-value mappings, fast lookups, and representing structured data.</p>

            <h3 className="text-lg font-medium mb-2 mt-4">Sets</h3>
            <CodeBlock
              title="Creating and Working with Sets"
              code={`# Creating sets (unordered collections of unique elements)
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 2, 3, 3, 4])  # Creates {1, 2, 3, 4}

# Adding and removing elements
fruits.add("orange")        # {"apple", "banana", "cherry", "orange"}
fruits.remove("banana")     # {"apple", "cherry", "orange"}
# discard() doesn't raise an error if item doesn't exist
fruits.discard("kiwi")      # No error

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
union = a | b               # {1, 2, 3, 4, 5, 6}
intersection = a & b        # {3, 4}
difference = a - b          # {1, 2}
symmetric_diff = a ^ b      # {1, 2, 5, 6}

# Testing membership
is_present = "apple" in fruits  # True`}
            />
            <div className="analogy-badge">Similar to: HashSet in Java, std::set in C++</div>
            <p className="use-case">Use for eliminating duplicates, membership testing, and mathematical set operations.</p>
          </section>
          
          <section id="control-flow" className="concept-card">
            <h2 className="concept-title">Control Flow</h2>

            <h3 className="text-lg font-medium mb-2 mt-4">if/elif/else Statements</h3>
            <CodeBlock
              title="Conditional Logic"
              code={`# Basic if-elif-else structure
age = 20
if age < 18:
    print("Minor")
elif age < 21:
    print("Young adult")
else:
    print("Adult")

# Shorthand if-else (ternary operator)
status = "Adult" if age >= 18 else "Minor"

# Multiple conditions
if age >= 18 and age <= 65:  # can also use: if 18 <= age <= 65:
    print("Working age")
    
# Truthiness: empty collections, 0, None, and False are False
username = ""
if username:
    print("Username provided")  # Won't execute with empty string
    
# is vs == (identity vs equality)
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True (equal content)
print(a is b)  # False (different objects)`}
            />
            <div className="analogy-badge">Similar to: Conditional statements in most languages</div>
            <p className="use-case">Use for decision-making and branching logic in your program.</p>

            <h3 className="text-lg font-medium mb-2 mt-4">For Loops</h3>
            <CodeBlock
              title="Iteration with For Loops"
              code={`# Iterating through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterating with index using enumerate()
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Iterating over a range
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 6):   # 2, 3, 4, 5
    print(i)
    
for i in range(1, 10, 2):  # 1, 3, 5, 7, 9 (step of 2)
    print(i)

# Iterating over a dictionary
user = {"name": "Alice", "age": 28}
for key in user:
    print(f"{key}: {user[key]}")

# More explicit dictionary iteration
for key, value in user.items():
    print(f"{key}: {value}")`}
            />
            <div className="analogy-badge">Similar to: for-each loops, iterators in other languages</div>
            <p className="use-case">Use for iterating over sequences (lists, tuples, dictionaries, etc.).</p>

            <h3 className="text-lg font-medium mb-2 mt-4">While Loops</h3>
            <CodeBlock
              title="While Loop Examples"
              code={`# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# With break and continue
num = 0
while True:  # Infinite loop
    num += 1
    if num == 3:
        continue  # Skip the rest of this iteration
    if num > 5:
        break     # Exit the loop
    print(num)    # Prints 1, 2, 4, 5

# while-else (else runs if no break occurs)
attempts = 0
while attempts < 3:
    password = input("Enter password: ")
    if password == "secret":
        print("Access granted")
        break
    attempts += 1
else:
    print("Access denied")`}
            />
            <div className="analogy-badge">Similar to: while loops in other languages</div>
            <p className="use-case">Use for repeated execution while a condition is true, especially when the number of iterations is unknown.</p>
          </section>
          
          <section id="functions" className="concept-card">
            <h2 className="concept-title">Functions</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Basic Function Definition</h3>
            <CodeBlock
              title="Defining and Calling Functions"
              code={`# Basic function definition
def greet(name):
    return f"Hello, {name}!"

# Calling the function
message = greet("Alice")  # "Hello, Alice!"

# Function with default parameters
def power(x, exponent=2):
    return x ** exponent

square = power(4)      # 16 (uses default exponent=2)
cube = power(4, 3)     # 64 (overrides default)

# Function with multiple returns
def get_user_info():
    return "Alice", 30, "Developer"
    
name, age, job = get_user_info()  # Unpacks the returned tuple

# Docstrings for documentation
def divide(a, b):
    """
    Divide a by b and return the result.
    
    Args:
        a: The dividend
        b: The divisor
        
    Returns:
        The quotient a/b
        
    Raises:
        ZeroDivisionError: If b is zero
    """
    return a / b`}
            />
            <div className="analogy-badge">Similar to: Functions in most languages</div>
            <p className="use-case">Use for organizing code into reusable, named blocks.</p>
            
            <h3 className="text-lg font-medium mb-2 mt-4">Arguments and Parameters</h3>
            <CodeBlock
              title="Advanced Function Arguments"
              code={`# Positional vs. keyword arguments
def create_profile(name, age, job):
    return f"{name}, {age}, {job}"

# Different calling styles, same result:
profile1 = create_profile("Alice", 30, "Developer")              # Positional
profile2 = create_profile(name="Alice", age=30, job="Developer")  # Keyword
profile3 = create_profile("Alice", job="Developer", age=30)       # Mixed

# Variable positional arguments (*args)
def sum_all(*numbers):
    return sum(numbers)

total = sum_all(1, 2, 3, 4, 5)  # 15

# Variable keyword arguments (**kwargs)
def build_person(**attributes):
    return attributes

person = build_person(name="Alice", age=30, height=165, job="Developer")
# Returns {'name': 'Alice', 'age': 30, 'height': 165, 'job': 'Developer'}

# Combining all argument types
def setup_user(username, password, *roles, active=True, **profile):
    return {
        "username": username,
        "password": password,
        "roles": roles,
        "active": active,
        "profile": profile
    }

user = setup_user(
    "alice",
    "secret123",
    "admin", "editor",   # roles (packed into a tuple)
    active=False,        # override default
    email="alice@example.com",
    location="New York"  # packed into profile dict
)`}
            />
            <div className="analogy-badge">Similar to: rest parameters in JS, varargs in Java</div>
            <p className="use-case">Use for flexible function interfaces, especially when the number of arguments varies.</p>
          </section>
          
          <section id="string-manipulation" className="concept-card">
            <h2 className="concept-title">String Manipulation</h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4">String Formatting</h3>
            <CodeBlock
              title="String Formatting Options"
              code={`name = "Alice"
age = 30

# f-strings (Python 3.6+, recommended)
greeting = f"Hello, {name}! You are {age} years old."

# Expression evaluation in f-strings
calculation = f"5 + 10 = {5 + 10}"
formatted_number = f"Pi: {3.14159:.2f}"  # "Pi: 3.14"

# str.format() method
greeting2 = "Hello, {}! You are {} years old.".format(name, age)
greeting3 = "Hello, {name}! You are {age} years old.".format(name=name, age=age)

# %-formatting (older style)
greeting4 = "Hello, %s! You are %d years old." % (name, age)`}
            />
            <div className="analogy-badge">Similar to: template literals in JS, string.Format in C#</div>
            <p className="use-case">Use f-strings for readable string interpolation and formatting.</p>

            <h3 className="text-lg font-medium mb-2 mt-4">Common String Methods</h3>
            <CodeBlock
              title="String Methods"
              code={`text = "  Hello, World!  "

# String methods
upper = text.upper()              # "  HELLO, WORLD!  "
lower = text.lower()              # "  hello, world!  "
stripped = text.strip()           # "Hello, World!"
replaced = text.replace("World", "Python")  # "  Hello, Python!  "

# Splitting and joining
words = "apple,banana,orange".split(",")  # ["apple", "banana", "orange"]
joined = "-".join(words)                 # "apple-banana-orange"

# Checking content
starts = text.startswith("  Hello")      # True
ends = text.endswith("!")                # True
contains = "World" in text               # True
position = text.find("World")            # 9 (index of first occurrence)

# String methods don't modify the original string
print(text)  # still "  Hello, World!  "`}
            />
            <div className="analogy-badge">Similar to: String methods in most languages</div>
            <p className="use-case">Use to manipulate and transform string content without modifying the original.</p>
          </section>
          
          <section id="file-handling" className="concept-card">
            <h2 className="concept-title">File Handling</h2>
            <CodeBlock
              title="Reading and Writing Files"
              code={`# Writing to a file
with open("example.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Python file handling is easy.")

# Reading an entire file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)  # Entire file contents

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())  # Remove trailing newline

# Reading all lines into a list
with open("example.txt", "r") as file:
    lines = file.readlines()
    # lines = ["Hello, World!\\n", "Python file handling is easy."]

# Appending to a file
with open("example.txt", "a") as file:
    file.write("\\nAppending new content.")`}
            />
            <div className="analogy-badge">Similar to: FileReader/FileWriter in Java, std::fstream in C++</div>
            <p className="use-case">Use the with statement for automatic resource management when working with files.</p>

            <h3 className="text-lg font-medium mb-2 mt-4">Working with File Paths</h3>
            <CodeBlock
              title="File Path Handling"
              code={`import os
from pathlib import Path  # Modern approach (Python 3.4+)

# Using os.path (works across Python versions)
current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_dir, "data", "config.json")
file_exists = os.path.exists(file_path)
file_name = os.path.basename(file_path)  # "config.json"
dir_name = os.path.dirname(file_path)    # path to directory

# Using pathlib (more object-oriented, Python 3.4+)
path = Path("data") / "config.json"  # Path object
absolute = path.absolute()           # Get absolute path
file_exists = path.exists()          # Check existence
parent_dir = path.parent             # Get parent directory
file_name = path.name                # "config.json"
stem = path.stem                     # "config"
suffix = path.suffix                 # ".json"`}
            />
            <div className="analogy-badge">Similar to: Path handling in Java, std::filesystem in C++17</div>
            <p className="use-case">Use pathlib for modern, object-oriented path manipulation in Python 3.4+.</p>
          </section>
          
          <section id="error-handling" className="concept-card">
            <h2 className="concept-title">Error Handling</h2>
            <CodeBlock
              title="Try-Except Blocks"
              code={`# Basic try-except
try:
    x = 10 / 0  # This will raise a ZeroDivisionError
except ZeroDivisionError:
    print("Cannot divide by zero")

# Handling multiple exceptions
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("Invalid input. Please enter a number.")
except ZeroDivisionError:
    print("Cannot divide by zero")

# Capturing the exception object
try:
    with open("nonexistent.txt", "r") as file:
        content = file.read()
except FileNotFoundError as error:
    print(f"Error: {error}")

# try-except-else-finally
try:
    number = int(input("Enter a positive number: "))
    if number < 0:
        raise ValueError("Number must be positive")
except ValueError as error:
    print(f"Error: {error}")
else:
    # Runs if no exceptions were raised
    print(f"You entered: {number}")
finally:
    # Always runs, regardless of whether an exception occurred
    print("End of input processing")`}
            />
            <div className="analogy-badge">Similar to: try-catch blocks in many languages</div>
            <p className="use-case">Use to gracefully handle expected errors rather than letting programs crash.</p>
          </section>
          
          <section id="list-comprehensions" className="concept-card">
            <h2 className="concept-title">List Comprehensions</h2>
            <CodeBlock
              title="List Comprehensions and Transformations"
              code={`# Basic list comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]  # [1, 4, 9, 16, 25]

# With conditional filtering
even_squares = [x**2 for x in numbers if x % 2 == 0]  # [4, 16]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Set and dictionary comprehensions
unique_squares = {x**2 for x in numbers}  # {1, 4, 9, 16, 25}
square_map = {x: x**2 for x in numbers}   # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Alternative using map() and lambda
squares_alt = list(map(lambda x: x**2, numbers))

# Alternative using filter() and map()
even_squares_alt = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))`}
            />
            <div className="analogy-badge">Similar to: LINQ in C#, Stream API in Java, Array.map in JS</div>
            <p className="use-case">Use for concise, readable transformations and filtering of collections.</p>
          </section>
          
          <div className="mt-12 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium mb-2">Ready for more?</h3>
            <p className="text-gray-700">
              Head to the <a href="/foundations" className="text-python-blue hover:underline">Pythonic Foundations</a> page
              to learn more about Python's unique features and idiomatic patterns.
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

export default Index;
