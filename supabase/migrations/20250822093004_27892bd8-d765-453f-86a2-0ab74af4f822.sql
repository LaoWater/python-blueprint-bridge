-- Add comprehensive Python curriculum content
INSERT INTO public.content (page, section, title, description, code) VALUES

-- Session 1: Welcome to Python World
('foundations', 'session-1', 'Session 1: Welcome to the Python World!', 'Your first steps into Python programming with practical examples', 'print("Welcome to Python!")

# Your first Python program
name = input("What''s your name? ")
age = int(input("How old are you? "))

print(f"Hello {name}! You are {age} years old.")
print(f"In 10 years, you''ll be {age + 10} years old!")

# Real-world example: Simple calculator
print("\n--- Simple Calculator ---")
num1 = float(input("Enter first number: "))
operation = input("Enter operation (+, -, *, /): ")
num2 = float(input("Enter second number: "))

if operation == "+":
    result = num1 + num2
elif operation == "-":
    result = num1 - num2
elif operation == "*":
    result = num1 * num2
elif operation == "/":
    result = num1 / num2 if num2 != 0 else "Cannot divide by zero!"
else:
    result = "Invalid operation"

print(f"Result: {result}")'),

-- Session 2: Decisions and Alternative Paths
('foundations', 'session-2', 'Session 2: Decisions and Alternative Paths', 'Master if/else statements with real-world decision making', '# Real-world example: Student Grade System
score = int(input("Enter your exam score (0-100): "))

if score >= 90:
    grade = "A"
    message = "Excellent work!"
elif score >= 80:
    grade = "B"
    message = "Good job!"
elif score >= 70:
    grade = "C"
    message = "You passed!"
elif score >= 60:
    grade = "D"
    message = "You need to improve"
else:
    grade = "F"
    message = "You failed. Try again!"

print(f"Grade: {grade} - {message}")

# Real-world example: ATM Machine Logic
balance = 1000
pin = "1234"

entered_pin = input("Enter your PIN: ")
if entered_pin == pin:
    print(f"Welcome! Your balance is ${balance}")
    
    amount = float(input("How much would you like to withdraw? $"))
    if amount <= balance:
        balance -= amount
        print(f"Transaction successful! New balance: ${balance}")
    else:
        print("Insufficient funds!")
else:
    print("Invalid PIN. Access denied!")

# Nested conditions: Weather app
temperature = int(input("Enter temperature in Celsius: "))
is_raining = input("Is it raining? (yes/no): ").lower() == "yes"

if temperature > 25:
    if is_raining:
        clothing = "Light jacket and umbrella"
    else:
        clothing = "T-shirt and shorts"
elif temperature > 15:
    if is_raining:
        clothing = "Jacket and umbrella"
    else:
        clothing = "Light sweater"
else:
    if is_raining:
        clothing = "Heavy coat and umbrella"
    else:
        clothing = "Warm coat"

print(f"Recommended clothing: {clothing}")'),

-- Session 3: Loops and Repetition
('foundations', 'session-3', 'Session 3: While & For Loops - The Secret of Repetition', 'Master loops with practical automation examples', '# Real-world example: Password attempts
max_attempts = 3
attempts = 0
correct_password = "python123"

while attempts < max_attempts:
    password = input(f"Enter password (Attempt {attempts + 1}/{max_attempts}): ")
    if password == correct_password:
        print("Access granted! Welcome!")
        break
    else:
        attempts += 1
        if attempts < max_attempts:
            print(f"Wrong password. {max_attempts - attempts} attempts left.")
        else:
            print("Account locked. Too many failed attempts.")

# Real-world example: Shopping cart total
shopping_cart = [19.99, 5.50, 12.25, 8.75, 15.00]
total = 0

print("Shopping Cart:")
for i, price in enumerate(shopping_cart, 1):
    print(f"Item {i}: ${price}")
    total += price

print(f"Total: ${total:.2f}")

# Apply discount if total > $50
if total > 50:
    discount = total * 0.1
    final_total = total - discount
    print(f"10% discount applied! You save ${discount:.2f}")
    print(f"Final total: ${final_total:.2f}")

# Real-world example: Number guessing game
import random

secret_number = random.randint(1, 100)
guesses = 0
max_guesses = 7

print("Guess the number between 1 and 100!")
print(f"You have {max_guesses} attempts.")

while guesses < max_guesses:
    guess = int(input("Enter your guess: "))
    guesses += 1
    
    if guess == secret_number:
        print(f"Congratulations! You found it in {guesses} attempts!")
        break
    elif guess < secret_number:
        print("Too low!")
    else:
        print("Too high!")
    
    remaining = max_guesses - guesses
    if remaining > 0:
        print(f"Attempts remaining: {remaining}")
    else:
        print(f"Game over! The number was {secret_number}")'),

-- Session 4: Collections
('foundations', 'session-4', 'Session 4: Collections - Lists, Tuples, Sets, Dictionaries', 'Master Python collections with real-world data management', '# Real-world example: Student Management System
students = []  # List to store student data

# Adding students
students.append({"name": "Alice", "age": 20, "grades": [85, 92, 78]})
students.append({"name": "Bob", "age": 19, "grades": [90, 88, 95]})
students.append({"name": "Charlie", "age": 21, "grades": [76, 82, 89]})

print("=== Student Management System ===")

# Display all students
for student in students:
    avg_grade = sum(student["grades"]) / len(student["grades"])
    print(f"{student[''name'']} (Age: {student[''age'']}) - Average: {avg_grade:.1f}")

# Real-world example: Inventory Management
inventory = {
    "laptops": {"price": 999.99, "stock": 15},
    "mice": {"price": 25.50, "stock": 50},
    "keyboards": {"price": 75.00, "stock": 30},
    "monitors": {"price": 250.00, "stock": 8}
}

print("\n=== Inventory Management ===")
print("Current Inventory:")
total_value = 0

for item, details in inventory.items():
    item_value = details["price"] * details["stock"]
    total_value += item_value
    print(f"{item.capitalize()}: ${details[''price'']} x {details[''stock'']} = ${item_value:.2f}")

print(f"Total Inventory Value: ${total_value:.2f}")

# Real-world example: Email validation using sets
valid_domains = {"gmail.com", "yahoo.com", "outlook.com", "company.com"}
emails = ["user@gmail.com", "boss@company.com", "spam@suspicious.com", "friend@yahoo.com"]

print("\n=== Email Validation ===")
for email in emails:
    domain = email.split("@")[1] if "@" in email else ""
    if domain in valid_domains:
        print(f"✓ {email} - Valid")
    else:
        print(f"✗ {email} - Invalid domain")

# Real-world example: Shopping cart with tuple coordinates
# Tuple for immutable product info (id, name, price)
products = [
    (1, "Laptop", 999.99),
    (2, "Mouse", 25.50),
    (3, "Keyboard", 75.00)
]

cart = []
print("\n=== Online Store ===")
for product_id, name, price in products:
    print(f"{product_id}. {name} - ${price}")

# Add items to cart
cart.append((1, 2))  # Product ID 1, Quantity 2
cart.append((3, 1))  # Product ID 3, Quantity 1

# Calculate total
total_cost = 0
for item_id, quantity in cart:
    for product_id, name, price in products:
        if product_id == item_id:
            cost = price * quantity
            total_cost += cost
            print(f"Added: {quantity}x {name} = ${cost:.2f}")

print(f"Cart Total: ${total_cost:.2f}")'),

-- Session 5: Functions
('foundations', 'session-5', 'Session 5: Functions - The Superpower of Python', 'Create reusable, powerful functions with real-world applications', '# Real-world example: Banking System Functions
def create_account(name, initial_deposit=0):
    """Create a new bank account"""
    account = {
        "name": name,
        "balance": initial_deposit,
        "transactions": [f"Account opened with ${initial_deposit}"]
    }
    return account

def deposit(account, amount):
    """Deposit money into account"""
    if amount > 0:
        account["balance"] += amount
        account["transactions"].append(f"Deposited ${amount}")
        return f"${amount} deposited. New balance: ${account[''balance'']}"
    return "Invalid deposit amount"

def withdraw(account, amount):
    """Withdraw money from account"""
    if amount > 0 and amount <= account["balance"]:
        account["balance"] -= amount
        account["transactions"].append(f"Withdrew ${amount}")
        return f"${amount} withdrawn. New balance: ${account[''balance'']}"
    return "Invalid withdrawal amount or insufficient funds"

def get_statement(account):
    """Get account statement"""
    print(f"\n=== Account Statement for {account[''name'']} ===")
    print(f"Current Balance: ${account[''balance'']}")
    print("Recent Transactions:")
    for transaction in account["transactions"][-5:]:  # Last 5 transactions
        print(f"  - {transaction}")

# Using the banking system
alice_account = create_account("Alice Johnson", 1000)
print(deposit(alice_account, 500))
print(withdraw(alice_account, 200))
get_statement(alice_account)

# Real-world example: Data Analysis Functions
def analyze_sales_data(sales):
    """Analyze sales data and return insights"""
    if not sales:
        return "No sales data available"
    
    total_sales = sum(sales)
    average_sale = total_sales / len(sales)
    max_sale = max(sales)
    min_sale = min(sales)
    
    return {
        "total": total_sales,
        "average": round(average_sale, 2),
        "highest": max_sale,
        "lowest": min_sale,
        "transactions": len(sales)
    }

def generate_report(data, month):
    """Generate a formatted sales report"""
    analysis = analyze_sales_data(data)
    
    print(f"\n=== Sales Report for {month} ===")
    print(f"Total Sales: ${analysis[''total'']:,.2f}")
    print(f"Average Sale: ${analysis[''average'']:,.2f}")
    print(f"Highest Sale: ${analysis[''highest'']:,.2f}")
    print(f"Lowest Sale: ${analysis[''lowest'']:,.2f}")
    print(f"Total Transactions: {analysis[''transactions'']}")
    
    # Performance indicator
    if analysis["average"] > 100:
        print("📈 Above average performance!")
    else:
        print("📉 Below average performance")

# Example usage
january_sales = [150, 200, 80, 300, 120, 250, 180]
generate_report(january_sales, "January 2024")

# Real-world example: Password Generator with customization
import random
import string

def generate_password(length=8, include_symbols=True, include_numbers=True):
    """Generate a secure password with custom options"""
    characters = string.ascii_letters  # a-z, A-Z
    
    if include_numbers:
        characters += string.digits  # 0-9
    
    if include_symbols:
        characters += "!@#$%^&*"
    
    password = "".join(random.choice(characters) for _ in range(length))
    
    # Password strength indicator
    strength = "Weak"
    if length >= 12 and include_symbols and include_numbers:
        strength = "Very Strong"
    elif length >= 8 and (include_symbols or include_numbers):
        strength = "Strong"
    elif length >= 6:
        strength = "Medium"
    
    return {
        "password": password,
        "strength": strength,
        "length": length
    }

# Generate different types of passwords
passwords = [
    generate_password(12, True, True),
    generate_password(8, False, True),
    generate_password(6, False, False)
]

print("\n=== Password Generator ===")
for i, pwd_info in enumerate(passwords, 1):
    print(f"Password {i}: {pwd_info[''password'']} (Strength: {pwd_info[''strength'']})")'),

-- Session 6: OOP Basics
('foundations', 'session-6', 'Session 6: Object-Oriented Programming (OOP) in Python', 'Master classes, objects, and OOP principles with real-world examples', '# Real-world example: Car Dealership System
class Car:
    """A class representing a car in a dealership"""
    
    def __init__(self, make, model, year, price, mileage=0):
        self.make = make
        self.model = model
        self.year = year
        self.price = price
        self.mileage = mileage
        self.is_sold = False
    
    def drive(self, miles):
        """Add miles to the car"""
        self.mileage += miles
        return f"Drove {miles} miles. Total mileage: {self.mileage}"
    
    def sell(self, discount=0):
        """Sell the car with optional discount"""
        if self.is_sold:
            return "Car already sold!"
        
        final_price = self.price * (1 - discount)
        self.is_sold = True
        return f"Car sold for ${final_price:,.2f}!"
    
    def get_info(self):
        """Get car information"""
        status = "SOLD" if self.is_sold else "AVAILABLE"
        return f"{self.year} {self.make} {self.model} - ${self.price:,} - {self.mileage} miles [{status}]"

# Create car objects
cars = [
    Car("Toyota", "Camry", 2023, 28000),
    Car("Honda", "Civic", 2022, 25000, 15000),
    Car("BMW", "X5", 2023, 65000)
]

print("=== Car Dealership Inventory ===")
for car in cars:
    print(car.get_info())

# Sell a car with discount
print(f"\n{cars[1].sell(0.1)}")  # 10% discount
print(cars[1].get_info())

# Real-world example: Banking System with OOP
class BankAccount:
    """A bank account class with transaction history"""
    
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self.balance = initial_balance
        self.transaction_history = []
        self._add_transaction(f"Account opened with ${initial_balance}")
    
    def _add_transaction(self, description):
        """Private method to add transaction to history"""
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
        self.transaction_history.append(f"{timestamp}: {description}")
    
    def deposit(self, amount):
        """Deposit money into account"""
        if amount > 0:
            self.balance += amount
            self._add_transaction(f"Deposited ${amount}")
            return f"Deposited ${amount}. New balance: ${self.balance}"
        return "Invalid deposit amount"
    
    def withdraw(self, amount):
        """Withdraw money from account"""
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            self._add_transaction(f"Withdrew ${amount}")
            return f"Withdrew ${amount}. New balance: ${self.balance}"
        return "Invalid withdrawal or insufficient funds"
    
    def get_balance(self):
        """Get current balance"""
        return f"Current balance: ${self.balance}"
    
    def get_statement(self):
        """Get account statement"""
        print(f"\n=== Statement for {self.account_holder} ===")
        print(f"Current Balance: ${self.balance}")
        print("Transaction History:")
        for transaction in self.transaction_history[-10:]:  # Last 10 transactions
            print(f"  {transaction}")

# Create and use bank accounts
alice_account = BankAccount("Alice Johnson", 1000)
bob_account = BankAccount("Bob Smith", 500)

print("=== Banking System Demo ===")
print(alice_account.deposit(200))
print(alice_account.withdraw(150))
alice_account.get_statement()

# Real-world example: Employee Management System
class Employee:
    """Employee class with salary and department management"""
    
    total_employees = 0  # Class variable
    
    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary
        self.is_active = True
        Employee.total_employees += 1
    
    def give_raise(self, percentage):
        """Give employee a raise"""
        if self.is_active:
            old_salary = self.salary
            self.salary *= (1 + percentage / 100)
            return f"{self.name} received a {percentage}% raise! Salary: ${old_salary:,.2f} → ${self.salary:,.2f}"
        return f"{self.name} is not an active employee"
    
    def terminate(self):
        """Terminate employee"""
        if self.is_active:
            self.is_active = False
            Employee.total_employees -= 1
            return f"{self.name} has been terminated"
        return f"{self.name} is already terminated"
    
    def get_info(self):
        """Get employee information"""
        status = "Active" if self.is_active else "Terminated"
        return f"{self.name} - {self.department} - ${self.salary:,.2f} [{status}]"
    
    @classmethod
    def get_total_employees(cls):
        """Get total number of active employees"""
        return f"Total active employees: {cls.total_employees}"

# Create employees
employees = [
    Employee("Alice Johnson", "Engineering", 85000),
    Employee("Bob Smith", "Marketing", 65000),
    Employee("Charlie Brown", "Sales", 55000)
]

print("\n=== Employee Management System ===")
for emp in employees:
    print(emp.get_info())

print(f"\n{Employee.get_total_employees()}")

# Give raises and demonstrate methods
print(f"\n{employees[0].give_raise(10)}")
print(employees[0].get_info())'),

-- Session 7: OOP Project
('foundations', 'session-7', 'Session 7: Complete OOP Project - Course Management System', 'Build a complete course management system with Trainers and Students', '# Complete OOP Project: Course Management System

class Person:
    """Base class for all people in the system"""
    
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
        self.id = self._generate_id()
    
    def _generate_id(self):
        """Generate a unique ID"""
        import random
        return f"ID{random.randint(1000, 9999)}"
    
    def get_info(self):
        """Get basic person information"""
        return f"{self.name} ({self.email}) - Age: {self.age}"

class Student(Person):
    """Student class inheriting from Person"""
    
    def __init__(self, name, email, age):
        super().__init__(name, email, age)
        self.enrolled_courses = []
        self.grades = {}
    
    def enroll_course(self, course):
        """Enroll in a course"""
        if course not in self.enrolled_courses:
            self.enrolled_courses.append(course)
            self.grades[course.course_id] = []
            return f"{self.name} enrolled in {course.title}"
        return f"{self.name} is already enrolled in {course.title}"
    
    def add_grade(self, course_id, grade):
        """Add a grade for a course"""
        if course_id in self.grades:
            if 0 <= grade <= 100:
                self.grades[course_id].append(grade)
                return f"Grade {grade} added for course {course_id}"
            return "Grade must be between 0 and 100"
        return "Student not enrolled in this course"
    
    def get_average_grade(self, course_id):
        """Calculate average grade for a course"""
        if course_id in self.grades and self.grades[course_id]:
            return sum(self.grades[course_id]) / len(self.grades[course_id])
        return 0
    
    def get_transcript(self):
        """Get student transcript"""
        transcript = f"\n=== Transcript for {self.name} ===\n"
        for course in self.enrolled_courses:
            avg_grade = self.get_average_grade(course.course_id)
            transcript += f"Course: {course.title} - Average: {avg_grade:.1f}\n"
        return transcript

class Trainer(Person):
    """Trainer class inheriting from Person"""
    
    def __init__(self, name, email, age, specialization):
        super().__init__(name, email, age)
        self.specialization = specialization
        self.courses_taught = []
        self.salary = 0
    
    def assign_course(self, course):
        """Assign a course to the trainer"""
        if course not in self.courses_taught:
            self.courses_taught.append(course)
            course.trainer = self
            return f"{self.name} assigned to teach {course.title}"
        return f"{self.name} is already teaching {course.title}"
    
    def grade_student(self, student, course_id, grade):
        """Grade a student in a course"""
        # Check if trainer teaches this course
        teaching_course = any(course.course_id == course_id for course in self.courses_taught)
        if teaching_course:
            return student.add_grade(course_id, grade)
        return "Trainer is not teaching this course"
    
    def get_teaching_load(self):
        """Get trainer''s teaching load"""
        if not self.courses_taught:
            return f"{self.name} is not teaching any courses"
        
        load_info = f"\n=== {self.name}''s Teaching Load ===\n"
        load_info += f"Specialization: {self.specialization}\n"
        load_info += "Courses:\n"
        for course in self.courses_taught:
            load_info += f"  - {course.title} ({len(course.students)} students)\n"
        return load_info

class Course:
    """Course class"""
    
    def __init__(self, title, course_code, duration_weeks):
        self.title = title
        self.course_code = course_code
        self.course_id = f"{course_code}_{self._generate_course_id()}"
        self.duration_weeks = duration_weeks
        self.students = []
        self.trainer = None
        self.is_active = True
    
    def _generate_course_id(self):
        """Generate unique course ID"""
        import random
        return random.randint(100, 999)
    
    def add_student(self, student):
        """Add student to course"""
        if student not in self.students and self.is_active:
            self.students.append(student)
            return student.enroll_course(self)
        return "Cannot add student to course"
    
    def remove_student(self, student):
        """Remove student from course"""
        if student in self.students:
            self.students.remove(student)
            if self.course_id in student.grades:
                del student.grades[self.course_id]
            return f"{student.name} removed from {self.title}"
        return "Student not in course"
    
    def get_course_info(self):
        """Get course information"""
        trainer_name = self.trainer.name if self.trainer else "No trainer assigned"
        status = "Active" if self.is_active else "Inactive"
        
        info = f"\n=== Course: {self.title} ===\n"
        info += f"Code: {self.course_code} | ID: {self.course_id}\n"
        info += f"Duration: {self.duration_weeks} weeks\n"
        info += f"Trainer: {trainer_name}\n"
        info += f"Students: {len(self.students)}\n"
        info += f"Status: {status}\n"
        return info
    
    def get_class_average(self):
        """Calculate class average"""
        if not self.students:
            return 0
        
        total_average = 0
        students_with_grades = 0
        
        for student in self.students:
            avg = student.get_average_grade(self.course_id)
            if avg > 0:
                total_average += avg
                students_with_grades += 1
        
        return total_average / students_with_grades if students_with_grades > 0 else 0

class CourseManagementSystem:
    """Main system to manage courses, students, and trainers"""
    
    def __init__(self):
        self.courses = []
        self.students = []
        self.trainers = []
    
    def add_course(self, title, course_code, duration_weeks):
        """Add a new course"""
        course = Course(title, course_code, duration_weeks)
        self.courses.append(course)
        return f"Course {title} created with ID: {course.course_id}"
    
    def add_student(self, name, email, age):
        """Add a new student"""
        student = Student(name, email, age)
        self.students.append(student)
        return f"Student {name} added with ID: {student.id}"
    
    def add_trainer(self, name, email, age, specialization):
        """Add a new trainer"""
        trainer = Trainer(name, email, age, specialization)
        self.trainers.append(trainer)
        return f"Trainer {name} added with ID: {trainer.id}"
    
    def enroll_student_in_course(self, student_id, course_id):
        """Enroll a student in a course"""
        student = self.find_student(student_id)
        course = self.find_course(course_id)
        
        if student and course:
            return course.add_student(student)
        return "Student or course not found"
    
    def assign_trainer_to_course(self, trainer_id, course_id):
        """Assign trainer to course"""
        trainer = self.find_trainer(trainer_id)
        course = self.find_course(course_id)
        
        if trainer and course:
            return trainer.assign_course(course)
        return "Trainer or course not found"
    
    def find_student(self, student_id):
        """Find student by ID"""
        return next((s for s in self.students if s.id == student_id), None)
    
    def find_trainer(self, trainer_id):
        """Find trainer by ID"""
        return next((t for t in self.trainers if t.id == trainer_id), None)
    
    def find_course(self, course_id):
        """Find course by ID"""
        return next((c for c in self.courses if c.course_id == course_id), None)
    
    def generate_system_report(self):
        """Generate comprehensive system report"""
        report = "\n" + "="*50
        report += "\n        COURSE MANAGEMENT SYSTEM REPORT"
        report += "\n" + "="*50
        
        report += f"\nTotal Courses: {len(self.courses)}"
        report += f"\nTotal Students: {len(self.students)}"
        report += f"\nTotal Trainers: {len(self.trainers)}"
        
        report += "\n\nCOURSE DETAILS:"
        for course in self.courses:
            report += course.get_course_info()
            if course.students:
                class_avg = course.get_class_average()
                report += f"Class Average: {class_avg:.1f}\n"
        
        return report

# Demonstration of the Course Management System
print("=== Course Management System Demo ===")

# Create the system
cms = CourseManagementSystem()

# Add courses
print(cms.add_course("Python Programming", "PY101", 12))
print(cms.add_course("Data Science Fundamentals", "DS201", 16))
print(cms.add_course("Web Development", "WD301", 14))

# Add trainers
print(cms.add_trainer("Dr. Alice Smith", "alice@email.com", 35, "Python Programming"))
print(cms.add_trainer("Prof. Bob Johnson", "bob@email.com", 42, "Data Science"))

# Add students
print(cms.add_student("Emma Wilson", "emma@email.com", 22))
print(cms.add_student("James Brown", "james@email.com", 24))
print(cms.add_student("Sofia Garcia", "sofia@email.com", 21))

# Get IDs for demonstration (in real system, you''d store these)
python_course = cms.courses[0]
trainer_alice = cms.trainers[0]
student_emma = cms.students[0]
student_james = cms.students[1]

# Assign trainer to course
print(cms.assign_trainer_to_course(trainer_alice.id, python_course.course_id))

# Enroll students in courses
print(cms.enroll_student_in_course(student_emma.id, python_course.course_id))
print(cms.enroll_student_in_course(student_james.id, python_course.course_id))

# Add some grades
trainer_alice.grade_student(student_emma, python_course.course_id, 95)
trainer_alice.grade_student(student_emma, python_course.course_id, 88)
trainer_alice.grade_student(student_james, python_course.course_id, 92)
trainer_alice.grade_student(student_james, python_course.course_id, 85)

# Generate reports
print(student_emma.get_transcript())
print(trainer_alice.get_teaching_load())
print(cms.generate_system_report())'),

-- Session 8: Design Patterns
('foundations', 'session-8', 'Session 8: Design Patterns - Factory, Singleton, Builder', 'Master essential design patterns with practical Python implementations', '# Design Patterns in Python: Factory, Singleton, Builder

# 1. FACTORY PATTERN - Vehicle Manufacturing System
class Vehicle:
    """Base vehicle class"""
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def start_engine(self):
        return f"{self.make} {self.model} engine started!"
    
    def get_info(self):
        return f"{self.__class__.__name__}: {self.make} {self.model}"

class Car(Vehicle):
    """Car implementation"""
    def __init__(self, make, model, doors=4):
        super().__init__(make, model)
        self.doors = doors
        self.vehicle_type = "Car"
    
    def open_trunk(self):
        return f"{self.make} {self.model} trunk opened"

class Motorcycle(Vehicle):
    """Motorcycle implementation"""
    def __init__(self, make, model, engine_size):
        super().__init__(make, model)
        self.engine_size = engine_size
        self.vehicle_type = "Motorcycle"
    
    def wheelie(self):
        return f"{self.make} {self.model} doing a wheelie!"

class Truck(Vehicle):
    """Truck implementation"""
    def __init__(self, make, model, payload_capacity):
        super().__init__(make, model)
        self.payload_capacity = payload_capacity
        self.vehicle_type = "Truck"
    
    def load_cargo(self, weight):
        if weight <= self.payload_capacity:
            return f"Loaded {weight}kg cargo into {self.make} {self.model}"
        return f"Cannot load {weight}kg - exceeds capacity of {self.payload_capacity}kg"

class VehicleFactory:
    """Factory class to create different types of vehicles"""
    
    @staticmethod
    def create_vehicle(vehicle_type, make, model, **kwargs):
        """Create vehicle based on type"""
        vehicle_types = {
            "car": Car,
            "motorcycle": Motorcycle,
            "truck": Truck
        }
        
        vehicle_class = vehicle_types.get(vehicle_type.lower())
        if vehicle_class:
            return vehicle_class(make, model, **kwargs)
        else:
            raise ValueError(f"Unknown vehicle type: {vehicle_type}")

# Factory Pattern Demo
print("=== FACTORY PATTERN DEMO ===")

# Create different vehicles using factory
vehicles = [
    VehicleFactory.create_vehicle("car", "Toyota", "Camry", doors=4),
    VehicleFactory.create_vehicle("motorcycle", "Harley", "Davidson", engine_size=1200),
    VehicleFactory.create_vehicle("truck", "Ford", "F-150", payload_capacity=1000)
]

for vehicle in vehicles:
    print(vehicle.get_info())
    print(vehicle.start_engine())

# Test specific methods
print(vehicles[0].open_trunk())  # Car method
print(vehicles[1].wheelie())     # Motorcycle method
print(vehicles[2].load_cargo(800))  # Truck method

# 2. SINGLETON PATTERN - Database Connection Manager
class DatabaseConnection:
    """Singleton class for database connection management"""
    
    _instance = None
    _connection = None
    
    def __new__(cls):
        """Ensure only one instance exists"""
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        """Initialize connection if not already done"""
        if self._connection is None:
            self._connection = self._create_connection()
    
    def _create_connection(self):
        """Simulate database connection creation"""
        import random
        connection_id = f"DB_CONN_{random.randint(1000, 9999)}"
        print(f"Creating new database connection: {connection_id}")
        return {
            "connection_id": connection_id,
            "host": "localhost",
            "database": "company_db",
            "status": "connected"
        }
    
    def execute_query(self, query):
        """Execute a database query"""
        if self._connection["status"] == "connected":
            return f"Executing query on {self._connection[''connection_id'']}: {query}"
        return "Database not connected"
    
    def get_connection_info(self):
        """Get connection information"""
        return self._connection
    
    def close_connection(self):
        """Close database connection"""
        if self._connection:
            connection_id = self._connection["connection_id"]
            self._connection["status"] = "disconnected"
            return f"Connection {connection_id} closed"
        return "No connection to close"

# Singleton Pattern Demo
print("\n=== SINGLETON PATTERN DEMO ===")

# Create multiple "instances" - should all be the same object
db1 = DatabaseConnection()
db2 = DatabaseConnection()
db3 = DatabaseConnection()

print(f"db1 id: {id(db1)}")
print(f"db2 id: {id(db2)}")
print(f"db3 id: {id(db3)}")
print(f"All instances are the same object: {db1 is db2 is db3}")

# All instances share the same connection
print(db1.execute_query("SELECT * FROM users"))
print(db2.execute_query("SELECT * FROM products"))
print(f"Connection info: {db3.get_connection_info()}")

# 3. BUILDER PATTERN - Computer Configuration System
class Computer:
    """Computer class to be built"""
    def __init__(self):
        self.cpu = None
        self.ram = None
        self.storage = None
        self.gpu = None
        self.motherboard = None
        self.power_supply = None
        self.case = None
        self.price = 0
    
    def get_specs(self):
        """Get computer specifications"""
        specs = "\n=== Computer Specifications ===\n"
        specs += f"CPU: {self.cpu}\n"
        specs += f"RAM: {self.ram}\n"
        specs += f"Storage: {self.storage}\n"
        specs += f"GPU: {self.gpu}\n"
        specs += f"Motherboard: {self.motherboard}\n"
        specs += f"Power Supply: {self.power_supply}\n"
        specs += f"Case: {self.case}\n"
        specs += f"Total Price: ${self.price:,}\n"
        return specs

class ComputerBuilder:
    """Builder class for creating computers"""
    
    def __init__(self):
        self.computer = Computer()
    
    def set_cpu(self, cpu, price):
        """Set CPU component"""
        self.computer.cpu = cpu
        self.computer.price += price
        return self
    
    def set_ram(self, ram, price):
        """Set RAM component"""
        self.computer.ram = ram
        self.computer.price += price
        return self
    
    def set_storage(self, storage, price):
        """Set storage component"""
        self.computer.storage = storage
        self.computer.price += price
        return self
    
    def set_gpu(self, gpu, price):
        """Set GPU component"""
        self.computer.gpu = gpu
        self.computer.price += price
        return self
    
    def set_motherboard(self, motherboard, price):
        """Set motherboard component"""
        self.computer.motherboard = motherboard
        self.computer.price += price
        return self
    
    def set_power_supply(self, power_supply, price):
        """Set power supply component"""
        self.computer.power_supply = power_supply
        self.computer.price += price
        return self
    
    def set_case(self, case, price):
        """Set case component"""
        self.computer.case = case
        self.computer.price += price
        return self
    
    def build(self):
        """Build and return the computer"""
        # Validate that essential components are present
        essential_components = [self.computer.cpu, self.computer.ram, 
                              self.computer.storage, self.computer.motherboard]
        
        if not all(essential_components):
            raise ValueError("Missing essential components (CPU, RAM, Storage, Motherboard)")
        
        return self.computer

class ComputerDirector:
    """Director class with predefined computer configurations"""
    
    @staticmethod
    def build_gaming_pc():
        """Build a high-end gaming computer"""
        return (ComputerBuilder()
                .set_cpu("Intel i9-13900K", 600)
                .set_ram("32GB DDR5-5600", 400)
                .set_storage("1TB NVMe SSD", 150)
                .set_gpu("RTX 4080 16GB", 1200)
                .set_motherboard("ASUS ROG Z790", 300)
                .set_power_supply("850W 80+ Gold", 150)
                .set_case("NZXT H7 RGB", 200)
                .build())
    
    @staticmethod
    def build_office_pc():
        """Build a basic office computer"""
        return (ComputerBuilder()
                .set_cpu("Intel i5-13400", 200)
                .set_ram("16GB DDR4-3200", 100)
                .set_storage("512GB SSD", 80)
                .set_gpu("Integrated Graphics", 0)
                .set_motherboard("MSI B660M", 100)
                .set_power_supply("450W 80+ Bronze", 80)
                .set_case("Fractal Core 1000", 60)
                .build())
    
    @staticmethod
    def build_workstation():
        """Build a professional workstation"""
        return (ComputerBuilder()
                .set_cpu("AMD Ryzen 9 7950X", 700)
                .set_ram("64GB DDR5-5200", 800)
                .set_storage("2TB NVMe SSD", 300)
                .set_gpu("RTX A6000 48GB", 4500)
                .set_motherboard("ASUS Creator X670E", 500)
                .set_power_supply("1000W 80+ Platinum", 250)
                .set_case("Fractal Define 7 XL", 250)
                .build())

# Builder Pattern Demo
print("\n=== BUILDER PATTERN DEMO ===")

# Build predefined configurations
gaming_pc = ComputerDirector.build_gaming_pc()
office_pc = ComputerDirector.build_office_pc()
workstation = ComputerDirector.build_workstation()

print("GAMING PC:")
print(gaming_pc.get_specs())

print("OFFICE PC:")
print(office_pc.get_specs())

print("WORKSTATION:")
print(workstation.get_specs())

# Build custom configuration
print("CUSTOM BUILD:")
custom_pc = (ComputerBuilder()
             .set_cpu("AMD Ryzen 7 7700X", 400)
             .set_ram("32GB DDR5-5200", 350)
             .set_storage("1TB NVMe SSD", 150)
             .set_gpu("RTX 4070 12GB", 800)
             .set_motherboard("MSI X670E", 250)
             .set_power_supply("750W 80+ Gold", 120)
             .set_case("Lian Li O11 Dynamic", 180)
             .build())

print(custom_pc.get_specs())

# Demonstrate pattern benefits
print("\n=== DESIGN PATTERNS SUMMARY ===")
print("✓ Factory Pattern: Creates objects without specifying exact classes")
print("✓ Singleton Pattern: Ensures only one instance of a class exists")
print("✓ Builder Pattern: Constructs complex objects step by step")
print("\nThese patterns solve common programming problems and make code more:")
print("• Maintainable • Flexible • Reusable • Testable")');