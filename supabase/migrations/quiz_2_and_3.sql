-- ============================================================================
-- QUIZ 2 & 3: Additional Python Assessment Quizzes
-- Quiz 2: Python Fundamentals - Phase II (Easy)
-- Quiz 3: Object-Oriented Python - Phase I (Medium)
-- ============================================================================
--- Quiz_questions.JSON

DEFINITIE OBIECT JSON - "Ce asteapta Baza de date BluePigeon de la noi ca sa se potriveasca cu architectura sa?"
quiz_questions (quiz_id, question_type, question_text, code_snippet, options, correct_answer, explanation, points, difficulty, chapter, order_index)
quiz_personal_questions = [
  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this code output?',
    'text = "hello world"
print(text.upper())',
    '[
      {"id": "a", "text": "hello world"},
      {"id": "b", "text": "HELLO WORLD"},
      {"id": "c", "text": "Hello World"},
      {"id": "d", "text": "Error"}
    ]',
    'b',
    'The .upper() method converts all characters in a string to uppercase.',
    1,
    'easy',
    'String Methods',
    1
  ),

  (
    'QuizID',
    'theoretical',     --- ATENTEI theoretical sau code_snippet daca implica cod
    'What is the main advantage of list comprehensions over traditional loops?',
    NULL,
    '[
      {"id": "a", "text": "They are always faster"},
      {"id": "b", "text": "They are more concise and readable for simple transformations"},
      {"id": "c", "text": "They use less memory"},
      {"id": "d", "text": "They can handle more data"}
    ]',
    'b',
    'List comprehensions provide a concise, readable syntax for creating lists from existing sequences.',
    1,
    'easy',
    'List Comprehensions',
    7
  )
]

-- ============================================================================
-- QUIZ 2: Python Fundamentals - Phase II
-- Topics: String Methods, List Comprehensions, Exception Handling, Modules
-- ============================================================================

INSERT INTO quizzes (id, title, description, difficulty, chapters, total_questions, passing_score, time_limit_minutes)
VALUES (
  'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
  'Python Fundamentals - Phase II',
  'Build on your Python basics with string manipulation, list comprehensions, error handling, and module usage. Perfect for reinforcing fundamental concepts.',
  'easy',
  ARRAY['String Methods', 'List Comprehensions', 'Exception Handling', 'Modules & Imports', 'Basic Algorithms'],
  20,
  70,
  30
);

-- Insert Questions for Quiz 2 (Phase II)

-- Chapter: String Methods
INSERT INTO quiz_questions (quiz_id, question_type, question_text, code_snippet, options, correct_answer, explanation, points, difficulty, chapter, order_index)
VALUES
  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this code output?',
    'text = "hello world"
print(text.upper())',
    '[
      {"id": "a", "text": "hello world"},
      {"id": "b", "text": "HELLO WORLD"},
      {"id": "c", "text": "Hello World"},
      {"id": "d", "text": "Error"}
    ]',
    'b',
    'The .upper() method converts all characters in a string to uppercase.',
    1,
    'easy',
    'String Methods',
    1
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What does this code return?',
    'text = "  Python  "
result = text.strip()
print(len(result))',
    '[
      {"id": "a", "text": "12"},
      {"id": "b", "text": "10"},
      {"id": "c", "text": "6"},
      {"id": "d", "text": "8"}
    ]',
    'c',
    'The .strip() method removes leading and trailing whitespace. "Python" has 6 characters.',
    1,
    'easy',
    'String Methods',
    2
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this output?',
    'words = "apple,banana,cherry"
fruits = words.split(",")
print(len(fruits))',
    '[
      {"id": "a", "text": "1"},
      {"id": "b", "text": "2"},
      {"id": "c", "text": "3"},
      {"id": "d", "text": "19"}
    ]',
    'c',
    'The .split(",") method splits the string by commas, creating a list of 3 elements.',
    1,
    'easy',
    'String Methods',
    3
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What is the result?',
    'name = "python"
print(name.replace("p", "P"))',
    '[
      {"id": "a", "text": "Python"},
      {"id": "b", "text": "python"},
      {"id": "c", "text": "PYTHON"},
      {"id": "d", "text": "Error"}
    ]',
    'a',
    'The .replace() method replaces the first argument with the second. Only the lowercase "p" is replaced with "P".',
    1,
    'easy',
    'String Methods',
    4
  ),

  -- Chapter: List Comprehensions
  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this list comprehension produce?',
    'numbers = [1, 2, 3, 4, 5]
result = [x * 2 for x in numbers]
print(result)',
    '[
      {"id": "a", "text": "[1, 2, 3, 4, 5]"},
      {"id": "b", "text": "[2, 4, 6, 8, 10]"},
      {"id": "c", "text": "[1, 4, 9, 16, 25]"},
      {"id": "d", "text": "[0, 2, 4, 6, 8]"}
    ]',
    'b',
    'List comprehension multiplies each element by 2, resulting in [2, 4, 6, 8, 10].',
    1,
    'easy',
    'List Comprehensions',
    5
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What does this code output?',
    'numbers = [1, 2, 3, 4, 5, 6]
evens = [x for x in numbers if x % 2 == 0]
print(evens)',
    '[
      {"id": "a", "text": "[1, 3, 5]"},
      {"id": "b", "text": "[2, 4, 6]"},
      {"id": "c", "text": "[1, 2, 3, 4, 5, 6]"},
      {"id": "d", "text": "[]"}
    ]',
    'b',
    'The list comprehension filters for even numbers only (where x % 2 == 0), resulting in [2, 4, 6].',
    1,
    'easy',
    'List Comprehensions',
    6
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'theoretical',
    'What is the main advantage of list comprehensions over traditional loops?',
    NULL,
    '[
      {"id": "a", "text": "They are always faster"},
      {"id": "b", "text": "They are more concise and readable for simple transformations"},
      {"id": "c", "text": "They use less memory"},
      {"id": "d", "text": "They can handle more data"}
    ]',
    'b',
    'List comprehensions provide a concise, readable syntax for creating lists from existing sequences.',
    1,
    'easy',
    'List Comprehensions',
    7
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will be printed?',
    'words = ["hello", "world", "python"]
lengths = [len(word) for word in words]
print(lengths)',
    '[
      {"id": "a", "text": "[5, 5, 6]"},
      {"id": "b", "text": "[5, 5, 5]"},
      {"id": "c", "text": "[3, 5, 6]"},
      {"id": "d", "text": "Error"}
    ]',
    'a',
    'The comprehension calculates the length of each word: "hello"=5, "world"=5, "python"=6.',
    1,
    'easy',
    'List Comprehensions',
    8
  ),

  -- Chapter: Exception Handling
  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'theoretical',
    'Which keyword is used to catch exceptions in Python?',
    NULL,
    '[
      {"id": "a", "text": "catch"},
      {"id": "b", "text": "except"},
      {"id": "c", "text": "error"},
      {"id": "d", "text": "handle"}
    ]',
    'b',
    'Python uses the "except" keyword to catch and handle exceptions.',
    1,
    'easy',
    'Exception Handling',
    9
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this code print?',
    'try:
    result = 10 / 2
    print(result)
except ZeroDivisionError:
    print("Error")',
    '[
      {"id": "a", "text": "5.0"},
      {"id": "b", "text": "Error"},
      {"id": "c", "text": "10"},
      {"id": "d", "text": "Nothing"}
    ]',
    'a',
    'The division 10/2 is valid and returns 5.0. No exception occurs, so the except block is skipped.',
    1,
    'easy',
    'Exception Handling',
    10
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What happens when this runs?',
    'try:
    x = int("hello")
except ValueError:
    print("Invalid conversion")',
    '[
      {"id": "a", "text": "Prints: Invalid conversion"},
      {"id": "b", "text": "Prints: hello"},
      {"id": "c", "text": "Program crashes"},
      {"id": "d", "text": "Returns None"}
    ]',
    'a',
    'Converting "hello" to an integer raises a ValueError, which is caught and handled by printing the message.',
    1,
    'easy',
    'Exception Handling',
    11
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'theoretical',
    'What is the purpose of the "finally" block in exception handling?',
    NULL,
    '[
      {"id": "a", "text": "To execute code only if an error occurs"},
      {"id": "b", "text": "To execute code regardless of whether an exception occurred"},
      {"id": "c", "text": "To prevent all errors"},
      {"id": "d", "text": "To log error messages"}
    ]',
    'b',
    'The "finally" block always executes, whether an exception occurred or not. It is often used for cleanup operations.',
    1,
    'easy',
    'Exception Handling',
    12
  ),

  -- Chapter: Modules & Imports
  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'theoretical',
    'What keyword is used to import a module in Python?',
    NULL,
    '[
      {"id": "a", "text": "include"},
      {"id": "b", "text": "require"},
      {"id": "c", "text": "import"},
      {"id": "d", "text": "use"}
    ]',
    'c',
    'Python uses the "import" keyword to bring modules into your program.',
    1,
    'easy',
    'Modules & Imports',
    13
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What does this import statement do?',
    'from math import sqrt
result = sqrt(16)',
    '[
      {"id": "a", "text": "Imports the entire math module"},
      {"id": "b", "text": "Imports only the sqrt function from math"},
      {"id": "c", "text": "Creates an error"},
      {"id": "d", "text": "Imports all functions from math"}
    ]',
    'b',
    'The "from module import function" syntax imports only specific functions, not the entire module.',
    1,
    'easy',
    'Modules & Imports',
    14
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this code print?',
    'import random
random.seed(42)
print(random.randint(1, 10))',
    '[
      {"id": "a", "text": "Always the same number"},
      {"id": "b", "text": "A random number between 1-10"},
      {"id": "c", "text": "42"},
      {"id": "d", "text": "Error"}
    ]',
    'a',
    'Setting a seed ensures the random number generator produces the same sequence every time, making the output reproducible.',
    1,
    'easy',
    'Modules & Imports',
    15
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'theoretical',
    'What does the "as" keyword do in import statements?',
    NULL,
    '[
      {"id": "a", "text": "Imports all functions"},
      {"id": "b", "text": "Creates an alias for the module or function"},
      {"id": "c", "text": "Prevents import errors"},
      {"id": "d", "text": "Makes imports faster"}
    ]',
    'b',
    'The "as" keyword creates an alias (shorthand name) for imported modules or functions, like "import numpy as np".',
    1,
    'easy',
    'Modules & Imports',
    16
  ),

  -- Chapter: Basic Algorithms
  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What does this function do?',
    'def find_max(numbers):
    max_val = numbers[0]
    for num in numbers:
        if num > max_val:
            max_val = num
    return max_val',
    '[
      {"id": "a", "text": "Finds the minimum value"},
      {"id": "b", "text": "Finds the maximum value"},
      {"id": "c", "text": "Sorts the list"},
      {"id": "d", "text": "Counts elements"}
    ]',
    'b',
    'This algorithm iterates through the list to find and return the largest value.',
    1,
    'easy',
    'Basic Algorithms',
    17
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this code print?',
    'def is_palindrome(text):
    return text == text[::-1]

print(is_palindrome("radar"))',
    '[
      {"id": "a", "text": "True"},
      {"id": "b", "text": "False"},
      {"id": "c", "text": "radar"},
      {"id": "d", "text": "Error"}
    ]',
    'a',
    'The function checks if a string equals its reverse. "radar" reversed is still "radar", so it returns True.',
    1,
    'easy',
    'Basic Algorithms',
    18
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What does this algorithm calculate?',
    'def calculate(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)',
    '[
      {"id": "a", "text": "Sum of numbers"},
      {"id": "b", "text": "Average of numbers"},
      {"id": "c", "text": "Maximum value"},
      {"id": "d", "text": "Count of numbers"}
    ]',
    'b',
    'This algorithm calculates the average by summing all numbers and dividing by the count.',
    1,
    'easy',
    'Basic Algorithms',
    19
  ),

  (
    'b2c3d4e5-f6a7-4901-bcde-ef2345678901',
    'code_snippet',
    'What will this search algorithm return?',
    'def linear_search(lst, target):
    for i, val in enumerate(lst):
        if val == target:
            return i
    return -1

result = linear_search([10, 20, 30, 40], 30)',
    '[
      {"id": "a", "text": "0"},
      {"id": "b", "text": "1"},
      {"id": "c", "text": "2"},
      {"id": "d", "text": "-1"}
    ]',
    'c',
    'Linear search finds the target value 30 at index 2 (third position) in the list.',
    1,
    'easy',
    'Basic Algorithms',
    20
  );

-- ============================================================================
-- QUIZ 3: Object-Oriented Python - Phase I
-- Topics: Classes, Encapsulation, Inheritance, Polymorphism, Magic Methods
-- ============================================================================

INSERT INTO quizzes (id, title, description, difficulty, chapters, total_questions, passing_score, time_limit_minutes)
VALUES (
  'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
  'Object-Oriented Python - Phase I',
  'Master the fundamentals of Object-Oriented Programming in Python. Learn about classes, objects, encapsulation, inheritance, and polymorphism.',
  'medium',
  ARRAY['Classes & Objects', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Magic Methods'],
  18,
  75,
  35
);

-- Insert Questions for Quiz 3 (OOP Phase I)

INSERT INTO quiz_questions (quiz_id, question_type, question_text, code_snippet, options, correct_answer, explanation, points, difficulty, chapter, order_index)
VALUES
  -- Chapter: Classes & Objects
  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this code print?',
    'class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says Woof!"

buddy = Dog("Buddy")
print(buddy.bark())',
    '[
      {"id": "a", "text": "Buddy says Woof!"},
      {"id": "b", "text": "Woof!"},
      {"id": "c", "text": "Error"},
      {"id": "d", "text": "None"}
    ]',
    'a',
    'The __init__ method initializes the name attribute, and bark() returns a formatted string using that name.',
    1,
    'medium',
    'Classes & Objects',
    1
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'theoretical',
    'What is the purpose of the __init__ method in a Python class?',
    NULL,
    '[
      {"id": "a", "text": "To delete objects"},
      {"id": "b", "text": "To initialize object attributes when created"},
      {"id": "c", "text": "To define class variables"},
      {"id": "d", "text": "To create static methods"}
    ]',
    'b',
    'The __init__ method is the constructor that initializes an object''s attributes when an instance is created.',
    1,
    'medium',
    'Classes & Objects',
    2
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What does this code demonstrate?',
    'class Counter:
    count = 0

    def __init__(self):
        Counter.count += 1

c1 = Counter()
c2 = Counter()
print(Counter.count)',
    '[
      {"id": "a", "text": "0"},
      {"id": "b", "text": "1"},
      {"id": "c", "text": "2"},
      {"id": "d", "text": "Error"}
    ]',
    'c',
    'The class variable "count" is shared across all instances. Creating two Counter objects increments it twice.',
    1,
    'medium',
    'Classes & Objects',
    3
  ),

  -- Chapter: Encapsulation
  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'theoretical',
    'What naming convention indicates a private attribute in Python?',
    NULL,
    '[
      {"id": "a", "text": "private_attribute"},
      {"id": "b", "text": "_attribute"},
      {"id": "c", "text": "__attribute"},
      {"id": "d", "text": "attribute_private"}
    ]',
    'c',
    'Double underscore prefix (__attribute) triggers name mangling, making it harder to access from outside the class.',
    1,
    'medium',
    'Encapsulation',
    4
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this code output?',
    'class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        self.__balance += amount

account = BankAccount(100)
account.deposit(50)
print(account.get_balance())',
    '[
      {"id": "a", "text": "100"},
      {"id": "b", "text": "150"},
      {"id": "c", "text": "50"},
      {"id": "d", "text": "Error"}
    ]',
    'b',
    'The private __balance starts at 100, deposit adds 50, and get_balance returns 150.',
    1,
    'medium',
    'Encapsulation',
    5
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What happens when you try to access the private attribute directly?',
    'class Person:
    def __init__(self, age):
        self.__age = age

p = Person(25)
print(p.__age)',
    '[
      {"id": "a", "text": "Prints: 25"},
      {"id": "b", "text": "Prints: None"},
      {"id": "c", "text": "AttributeError"},
      {"id": "d", "text": "Prints: __age"}
    ]',
    'c',
    'Private attributes with double underscore cannot be accessed directly from outside the class, causing an AttributeError.',
    1,
    'medium',
    'Encapsulation',
    6
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What is the benefit of this approach?',
    'class Temperature:
    def __init__(self):
        self.__celsius = 0

    @property
    def celsius(self):
        return self.__celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self.__celsius = value',
    '[
      {"id": "a", "text": "Faster execution"},
      {"id": "b", "text": "Validates data before setting the attribute"},
      {"id": "c", "text": "Uses less memory"},
      {"id": "d", "text": "Makes code shorter"}
    ]',
    'b',
    'Property setters allow validation logic to ensure data integrity, preventing invalid values like temperatures below absolute zero.',
    1,
    'medium',
    'Encapsulation',
    7
  ),

  -- Chapter: Inheritance
  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'theoretical',
    'What is the main purpose of inheritance in OOP?',
    NULL,
    '[
      {"id": "a", "text": "To make code run faster"},
      {"id": "b", "text": "To reuse code and create hierarchical relationships"},
      {"id": "c", "text": "To hide implementation details"},
      {"id": "d", "text": "To create multiple instances"}
    ]',
    'b',
    'Inheritance allows child classes to reuse code from parent classes and establish "is-a" relationships.',
    1,
    'medium',
    'Inheritance',
    8
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this code print?',
    'class Animal:
    def speak(self):
        return "Some sound"

class Cat(Animal):
    def speak(self):
        return "Meow"

c = Cat()
print(c.speak())',
    '[
      {"id": "a", "text": "Some sound"},
      {"id": "b", "text": "Meow"},
      {"id": "c", "text": "Error"},
      {"id": "d", "text": "None"}
    ]',
    'b',
    'The Cat class overrides the speak() method from Animal, so it returns "Meow".',
    1,
    'medium',
    'Inheritance',
    9
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What does super() do in this context?',
    'class Vehicle:
    def __init__(self, brand):
        self.brand = brand

class Car(Vehicle):
    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model

c = Car("Toyota", "Camry")
print(c.brand)',
    '[
      {"id": "a", "text": "Error"},
      {"id": "b", "text": "None"},
      {"id": "c", "text": "Toyota"},
      {"id": "d", "text": "Camry"}
    ]',
    'c',
    'super().__init__(brand) calls the parent class constructor, initializing the brand attribute with "Toyota".',
    1,
    'medium',
    'Inheritance',
    10
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this inheritance structure produce?',
    'class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

r = Rectangle(5, 4)
print(r.area())',
    '[
      {"id": "a", "text": "0"},
      {"id": "b", "text": "9"},
      {"id": "c", "text": "20"},
      {"id": "d", "text": "Error"}
    ]',
    'c',
    'Rectangle overrides area() to calculate width * height, returning 5 * 4 = 20.',
    1,
    'medium',
    'Inheritance',
    11
  ),

  -- Chapter: Polymorphism
  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'theoretical',
    'What is polymorphism in object-oriented programming?',
    NULL,
    '[
      {"id": "a", "text": "Having multiple constructors"},
      {"id": "b", "text": "The ability of different classes to be treated through the same interface"},
      {"id": "c", "text": "Hiding private attributes"},
      {"id": "d", "text": "Creating class hierarchies"}
    ]',
    'b',
    'Polymorphism allows objects of different classes to be treated uniformly through a common interface, with each implementing behavior differently.',
    1,
    'medium',
    'Polymorphism',
    12
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this code output?',
    'class Bird:
    def move(self):
        return "Fly"

class Fish:
    def move(self):
        return "Swim"

class Dog:
    def move(self):
        return "Run"

animals = [Bird(), Fish(), Dog()]
for animal in animals:
    print(animal.move())',
    '[
      {"id": "a", "text": "Error - incompatible types"},
      {"id": "b", "text": "Fly Swim Run (each on new line)"},
      {"id": "c", "text": "All print same value"},
      {"id": "d", "text": "Nothing prints"}
    ]',
    'b',
    'Polymorphism allows each object to respond to move() differently, printing Fly, Swim, and Run respectively.',
    1,
    'medium',
    'Polymorphism',
    13
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What design principle does this demonstrate?',
    'class PaymentProcessor:
    def process(self, amount):
        pass

class CreditCard(PaymentProcessor):
    def process(self, amount):
        return f"Charged ${amount} to credit card"

class PayPal(PaymentProcessor):
    def process(self, amount):
        return f"Sent ${amount} via PayPal"

def checkout(processor, amount):
    return processor.process(amount)',
    '[
      {"id": "a", "text": "Encapsulation"},
      {"id": "b", "text": "Polymorphism through interface"},
      {"id": "c", "text": "Abstraction only"},
      {"id": "d", "text": "Multiple inheritance"}
    ]',
    'b',
    'This demonstrates polymorphism - the checkout function works with any PaymentProcessor subclass through a common interface.',
    1,
    'medium',
    'Polymorphism',
    14
  ),

  -- Chapter: Magic Methods
  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this code print?',
    'class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return f"{self.title} ({self.pages} pages)"

b = Book("Python Basics", 250)
print(b)',
    '[
      {"id": "a", "text": "Book object memory address"},
      {"id": "b", "text": "Python Basics (250 pages)"},
      {"id": "c", "text": "Error"},
      {"id": "d", "text": "None"}
    ]',
    'b',
    'The __str__ magic method defines how an object is converted to a string when printed.',
    1,
    'medium',
    'Magic Methods',
    15
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What does the __len__ magic method enable?',
    'class Playlist:
    def __init__(self):
        self.songs = []

    def add_song(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

p = Playlist()
p.add_song("Song 1")
p.add_song("Song 2")
print(len(p))',
    '[
      {"id": "a", "text": "Error - len() not supported"},
      {"id": "b", "text": "Prints: 2"},
      {"id": "c", "text": "Prints: Playlist"},
      {"id": "d", "text": "Returns None"}
    ]',
    'b',
    'The __len__ magic method allows the built-in len() function to work with custom objects.',
    1,
    'medium',
    'Magic Methods',
    16
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What will this comparison return?',
    'class Person:
    def __init__(self, age):
        self.age = age

    def __eq__(self, other):
        return self.age == other.age

p1 = Person(25)
p2 = Person(25)
print(p1 == p2)',
    '[
      {"id": "a", "text": "False"},
      {"id": "b", "text": "True"},
      {"id": "c", "text": "Error"},
      {"id": "d", "text": "None"}
    ]',
    'b',
    'The __eq__ magic method defines custom equality comparison. Both persons have age 25, so it returns True.',
    1,
    'medium',
    'Magic Methods',
    17
  ),

  (
    'c3d4e5f6-a7b8-4012-cdef-ef3456789012',
    'code_snippet',
    'What does this magic method accomplish?',
    'class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2
print(f"({v3.x}, {v3.y})")',
    '[
      {"id": "a", "text": "(2, 3)"},
      {"id": "b", "text": "(4, 5)"},
      {"id": "c", "text": "(6, 8)"},
      {"id": "d", "text": "Error - cannot add objects"}
    ]',
    'c',
    'The __add__ magic method overloads the + operator to add vector components: (2+4, 3+5) = (6, 8).',
    1,
    'medium',
    'Magic Methods',
    18
  );

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Uncomment to verify the data was inserted correctly
-- SELECT * FROM quizzes WHERE id IN ('b2c3d4e5-f6a7-8901-bcde-fg2345678901', 'c3d4e5f6-a7b8-9012-cdef-gh3456789012');
-- SELECT * FROM quiz_questions WHERE quiz_id = 'b2c3d4e5-f6a7-8901-bcde-fg2345678901' ORDER BY order_index;
-- SELECT * FROM quiz_questions WHERE quiz_id = 'c3d4e5f6-a7b8-9012-cdef-gh3456789012' ORDER BY order_index;
