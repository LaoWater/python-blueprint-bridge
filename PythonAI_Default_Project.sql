-- ==============================================================
-- Blue Pigeon IDE - Python AI Education Default Project
-- Beginner-friendly structure aligned with educational goals
-- ==============================================================

-- Replace the default project structure function
CREATE OR REPLACE FUNCTION create_default_project_structure(project_uuid UUID)
RETURNS VOID AS $$
BEGIN
  -- Create main.py (root level - simple for beginners)
  INSERT INTO file_system_items (
    project_id, user_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), 'main.py', 'file', '/main.py',
    '# Welcome to Python & AI Programming! 🐍🤖
# Blue Pigeon - The Art of Programming

"""
Your First Python AI Project
=============================

This is where your Python journey begins! 
Let''s start with some fundamental concepts that lead to AI programming.

Key Learning Goals:
- Data manipulation and patterns
- Algorithm thinking 
- Problem solving approaches
- Foundation for machine learning
"""

import random

def analyze_data_pattern(numbers):
    """
    Analyze patterns in data - fundamental skill for AI!
    This function demonstrates pattern recognition basics.
    """
    print("🔍 Analyzing Data Patterns...")
    print(f"Data: {numbers}")
    print(f"Average: {sum(numbers) / len(numbers):.2f}")
    print(f"Max: {max(numbers)}, Min: {min(numbers)}")
    print(f"Range: {max(numbers) - min(numbers)}")
    
    # Find trends (basic pattern recognition)
    increasing = all(numbers[i] <= numbers[i + 1] for i in range(len(numbers) - 1))
    decreasing = all(numbers[i] >= numbers[i + 1] for i in range(len(numbers) - 1))
    
    if increasing:
        print("📈 Pattern: Increasing trend detected!")
    elif decreasing:
        print("📉 Pattern: Decreasing trend detected!")
    else:
        print("🔀 Pattern: Mixed/Random distribution")

def simple_prediction_game():
    """
    A fun introduction to prediction - the heart of AI!
    """
    print("\n🎯 Simple Prediction Challenge")
    print("Can you predict the pattern?")
    
    # Generate a simple pattern
    pattern = [i * 2 + 1 for i in range(5)]  # Odd numbers: 1,3,5,7,9
    print(f"Pattern so far: {pattern[:-1]}")
    
    user_guess = input(f"What comes next after {pattern[-2]}? ")
    
    try:
        guess = int(user_guess)
        if guess == pattern[-1]:
            print("🎉 Excellent! You found the pattern!")
            print("This is how AI works - finding patterns in data!")
        else:
            print(f"🤔 Good try! The answer was {pattern[-1]}")
            print("Pattern: Each number increases by 2 (odd numbers)")
    except ValueError:
        print("Please enter a number next time!")

def main():
    """
    Main function - your program starts here!
    """
    print("🐍 Welcome to Python & AI Programming!")
    print("=" * 50)
    print("Blue Pigeon - Learning the Art of Programming")
    print()
    
    # Example 1: Working with data (AI foundation)
    sample_data = [random.randint(1, 100) for _ in range(8)]
    analyze_data_pattern(sample_data)
    
    # Example 2: Pattern recognition game
    simple_prediction_game()
    
    print("\n✨ Great start! This is your foundation for AI programming.")
    print("🚀 Ready to explore more? Edit this file and experiment!")

if __name__ == "__main__":
    main()
', 'python', 1);

  -- Create README.md (essential for any project)
  INSERT INTO file_system_items (
    project_id, user_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), 'README.md', 'file', '/README.md',
    '# My First Python AI Project 🐍🤖

Welcome to your Python & AI programming journey with **Blue Pigeon**!

## What You''ll Learn

- **Python Fundamentals**: Variables, functions, data structures
- **Pattern Recognition**: The foundation of all AI systems
- **Data Analysis**: Working with numbers and finding insights
- **Problem Solving**: Algorithmic thinking approaches
- **AI Concepts**: Introduction to machine learning ideas

## Getting Started

1. Open `main.py` and run the program
2. Experiment with the code - change numbers, add new functions
3. Try the pattern recognition game
4. Explore `learning_notes.py` for more concepts

## Project Structure

```
📁 My Project
├── main.py           # Your main program (start here!)
├── README.md         # This file - project information
├── learning_notes.py # Additional concepts and examples
└── requirements.txt  # Python packages needed
```

## Key Programming Concepts

### 🧠 Pattern Recognition
The ability to identify patterns is crucial for AI. In this project, you''ll:
- Analyze data trends
- Predict sequences
- Recognize mathematical patterns

### 📊 Data Analysis
Learn to work with data like an AI system:
- Calculate averages and ranges  
- Find maximum and minimum values
- Detect trends and patterns

### 🎯 Problem Solving
Develop algorithmic thinking:
- Break problems into smaller parts
- Think step-by-step
- Test and refine solutions

## Next Steps

1. **Experiment**: Modify the code in `main.py`
2. **Create**: Add your own functions and experiments
3. **Learn**: Study the patterns in the code
4. **Practice**: Try solving new problems

## Blue Pigeon Philosophy

> "Like a pigeon carrying essential messages across vast distances, 
> Blue Pigeon carries the core patterns and principles needed to master programming."

Focus on understanding **why** code works, not just **what** it does. This foundation will serve you well in AI and machine learning!

---

**Happy Coding! 🚀**  
*Remember: Every expert was once a beginner.*
', 'markdown', 2);

  -- Create learning_notes.py (additional educational content)
  INSERT INTO file_system_items (
    project_id, user_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), 'learning_notes.py', 'file', '/learning_notes.py',
    '# Learning Notes - Python & AI Concepts 📚
# Blue Pigeon Educational Content

"""
FUNDAMENTAL CONCEPTS FOR AI PROGRAMMING
======================================

This file contains key concepts that will help you understand
the building blocks of artificial intelligence programming.
"""

# =============================================================================
# 1. WORKING WITH DATA (The Foundation of AI)
# =============================================================================

def data_types_demo():
    """Understanding different types of data"""
    print("📊 Data Types in Python")
    print("-" * 30)
    
    # Numbers (crucial for AI calculations)
    age = 25
    temperature = 23.5
    print(f"Integer: {age} (type: {type(age).__name__})")
    print(f"Float: {temperature} (type: {type(temperature).__name__})")
    
    # Text (used for processing language in AI)
    message = "Hello, AI world!"
    print(f"String: {message} (type: {type(message).__name__})")
    
    # Lists (collections of data - very important in AI)
    numbers = [1, 2, 3, 4, 5]
    names = ["Alice", "Bob", "Charlie"]
    print(f"List of numbers: {numbers}")
    print(f"List of names: {names}")

# =============================================================================
# 2. PATTERN RECOGNITION (Core AI Skill)
# =============================================================================

def find_patterns_in_sequence(sequence):
    """
    Practice pattern recognition - fundamental for AI
    """
    print(f"\n🔍 Analyzing sequence: {sequence}")
    
    # Check for arithmetic progression (constant difference)
    if len(sequence) > 1:
        differences = [sequence[i+1] - sequence[i] for i in range(len(sequence)-1)]
        if all(d == differences[0] for d in differences):
            print(f"✅ Arithmetic progression found! Common difference: {differences[0]}")
        else:
            print("❌ Not an arithmetic progression")
    
    # Check for geometric progression (constant ratio)
    if len(sequence) > 1 and all(x != 0 for x in sequence[:-1]):
        ratios = [sequence[i+1] / sequence[i] for i in range(len(sequence)-1)]
        if all(abs(r - ratios[0]) < 0.001 for r in ratios):  # Allow small floating point differences
            print(f"✅ Geometric progression found! Common ratio: {ratios[0]:.3f}")
        else:
            print("❌ Not a geometric progression")

# =============================================================================
# 3. SIMPLE AI CONCEPTS
# =============================================================================

def simple_classifier(number):
    """
    A basic classifier - fundamental AI concept
    This function ''learns'' to classify numbers into categories
    """
    if number < 0:
        return "Negative"
    elif number == 0:
        return "Zero"
    elif number < 10:
        return "Small Positive"
    elif number < 100:
        return "Medium Positive"
    else:
        return "Large Positive"

def basic_recommendation_system(user_preferences, available_items):
    """
    Simple recommendation system - like Netflix or Spotify!
    This is a basic version of how AI recommendations work
    """
    print("🎯 Basic Recommendation System")
    print(f"Your preferences: {user_preferences}")
    print(f"Available items: {available_items}")
    
    # Simple matching algorithm
    recommendations = []
    for item in available_items:
        for preference in user_preferences:
            if preference.lower() in item.lower():
                if item not in recommendations:
                    recommendations.append(item)
    
    print(f"Recommendations for you: {recommendations}")
    return recommendations

# =============================================================================
# 4. DATA ANALYSIS BASICS
# =============================================================================

def analyze_student_grades(grades):
    """
    Analyze student performance data
    This demonstrates basic data analysis used in AI
    """
    print("\n📈 Student Grade Analysis")
    print(f"Grades: {grades}")
    
    # Basic statistics
    average = sum(grades) / len(grades)
    highest = max(grades)
    lowest = min(grades)
    
    print(f"Average grade: {average:.1f}")
    print(f"Highest grade: {highest}")
    print(f"Lowest grade: {lowest}")
    
    # Grade distribution
    a_grades = sum(1 for g in grades if g >= 90)
    b_grades = sum(1 for g in grades if 80 <= g < 90)
    c_grades = sum(1 for g in grades if 70 <= g < 80)
    below_c = sum(1 for g in grades if g < 70)
    
    print(f"Grade distribution: A({a_grades}), B({b_grades}), C({c_grades}), Below C({below_c})")

# =============================================================================
# 5. PRACTICE EXERCISES
# =============================================================================

def practice_exercises():
    """
    Try these exercises to improve your AI thinking!
    """
    print("\n🏋️ Practice Exercises")
    print("=" * 40)
    
    # Exercise 1: Pattern Recognition
    print("Exercise 1: What''s the next number?")
    sequence1 = [2, 4, 6, 8]
    print(f"Sequence: {sequence1} -> ?")
    find_patterns_in_sequence(sequence1)
    
    # Exercise 2: Classification
    print("\nExercise 2: Number Classification")
    test_numbers = [5, -3, 0, 42, 150]
    for num in test_numbers:
        category = simple_classifier(num)
        print(f"{num} is classified as: {category}")
    
    # Exercise 3: Recommendations
    print("\nExercise 3: Movie Recommendations")
    user_likes = ["action", "adventure"]
    movies = ["Action Hero", "Romantic Comedy", "Adventure Quest", "Horror Night", "Action Adventure"]
    basic_recommendation_system(user_likes, movies)
    
    # Exercise 4: Data Analysis
    print("\nExercise 4: Grade Analysis")
    class_grades = [85, 92, 78, 88, 94, 76, 89, 95, 82, 90]
    analyze_student_grades(class_grades)

# =============================================================================
# MAIN DEMONSTRATION
# =============================================================================

if __name__ == "__main__":
    print("🎓 Blue Pigeon - Learning Notes")
    print("Python & AI Programming Concepts")
    print("=" * 50)
    
    # Run all demonstrations
    data_types_demo()
    practice_exercises()
    
    print("\n✨ Congratulations!")
    print("You''ve explored fundamental concepts that power AI systems!")
    print("🚀 Keep practicing and experimenting!")
', 'python', 3);

  -- Create requirements.txt (industry standard)
  INSERT INTO file_system_items (
    project_id, user_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), 'requirements.txt', 'file', '/requirements.txt',
    '# Python packages for this project
# Blue Pigeon - Python AI Introduction

# Core packages (these come with Python)
# - random (for generating sample data)
# - math (for mathematical operations)

# Future AI packages (install when ready for advanced topics):
# numpy>=1.21.0          # For numerical computing
# pandas>=1.3.0          # For data manipulation 
# matplotlib>=3.4.0      # For data visualization
# scikit-learn>=1.0.0    # For machine learning
# jupyter>=1.0.0         # For interactive notebooks

# Note: This project uses only built-in Python packages
# No installation needed - just run main.py!
', 'text', 4);

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution permission
GRANT EXECUTE ON FUNCTION create_default_project_structure(UUID) TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '================================================';
  RAISE NOTICE 'Python AI Default Project Structure Created!';
  RAISE NOTICE '================================================';
  RAISE NOTICE 'New projects will now include:';
  RAISE NOTICE '- main.py (beginner-friendly Python AI intro)';
  RAISE NOTICE '- README.md (comprehensive project guide)';
  RAISE NOTICE '- learning_notes.py (educational concepts)';
  RAISE NOTICE '- requirements.txt (industry standard)';
  RAISE NOTICE '';
  RAISE NOTICE 'Aligned with Blue Pigeon educational philosophy!';
  RAISE NOTICE '================================================';
END;
$$;