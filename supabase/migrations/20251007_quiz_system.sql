-- Quiz System Database Schema
-- Supports multiple quizzes, questions, user attempts, and detailed response tracking

-- ============================================================================
-- QUIZZES TABLE
-- Stores quiz metadata (title, description, difficulty, chapter coverage)
-- ============================================================================
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  chapters TEXT[], -- Array of chapter names covered (e.g., ['intro', 'loops', 'functions'])
  total_questions INTEGER DEFAULT 0,
  passing_score INTEGER DEFAULT 70, -- Percentage needed to pass
  time_limit_minutes INTEGER, -- Optional time limit
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- QUESTIONS TABLE
-- Stores individual quiz questions with multiple choice answers
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('theoretical', 'code_snippet', 'multiple_choice')),
  question_text TEXT NOT NULL,
  code_snippet TEXT, -- Optional code for code-based questions
  options JSONB NOT NULL, -- Array of answer options: [{"id": "a", "text": "answer1"}, ...]
  correct_answer TEXT NOT NULL, -- The correct option id (e.g., "a", "b", "c", "d")
  explanation TEXT, -- Explanation shown after answering
  points INTEGER DEFAULT 1,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  chapter TEXT, -- Which chapter this question relates to
  order_index INTEGER, -- Order of question in quiz
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- USER QUIZ ATTEMPTS TABLE
-- Tracks each time a user starts/completes a quiz
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score INTEGER, -- Final score (0-100 percentage)
  correct_answers INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  time_spent_seconds INTEGER, -- Total time spent on quiz
  passed BOOLEAN, -- Whether user passed based on passing_score
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- USER RESPONSES TABLE
-- Stores individual question responses for each attempt
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  user_answer TEXT NOT NULL, -- The option id selected by user
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER, -- Time spent on this specific question
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_order ON quiz_questions(quiz_id, order_index);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_quiz ON quiz_attempts(user_id, quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_attempt_id ON quiz_responses(attempt_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_question_id ON quiz_responses(question_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Quizzes: Everyone can view active quizzes
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quizzes are viewable by everyone" ON quizzes
  FOR SELECT USING (is_active = true);

-- Quiz Questions: Everyone can view questions for active quizzes
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone" ON quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quizzes
      WHERE quizzes.id = quiz_questions.quiz_id
      AND quizzes.is_active = true
    )
  );

-- Quiz Attempts: Users can view/create their own attempts
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own attempts" ON quiz_attempts
  FOR UPDATE USING (auth.uid() = user_id);

-- Quiz Responses: Users can view/create their own responses
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own responses" ON quiz_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts
      WHERE quiz_attempts.id = quiz_responses.attempt_id
      AND quiz_attempts.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can create their own responses" ON quiz_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM quiz_attempts
      WHERE quiz_attempts.id = quiz_responses.attempt_id
      AND quiz_attempts.user_id = auth.uid()
    )
  );

-- ============================================================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_quiz_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quizzes_timestamp
  BEFORE UPDATE ON quizzes
  FOR EACH ROW EXECUTE FUNCTION update_quiz_timestamp();

CREATE TRIGGER update_quiz_questions_timestamp
  BEFORE UPDATE ON quiz_questions
  FOR EACH ROW EXECUTE FUNCTION update_quiz_timestamp();

CREATE TRIGGER update_quiz_attempts_timestamp
  BEFORE UPDATE ON quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION update_quiz_timestamp();

-- ============================================================================
-- INITIAL DATA: Phase I Quiz - Python Fundamentals (Chapters 1-7)
-- ============================================================================

-- Insert Phase I Quiz
INSERT INTO quizzes (id, title, description, difficulty, chapters, total_questions, passing_score, time_limit_minutes)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Python Fundamentals - Phase I',
  'Test your knowledge of Python basics including introduction, variables, loops, conditionals, functions, data structures, and file handling.',
  'easy',
  ARRAY['Introduction to Python', 'Variables & Data Types', 'Control Flow - Loops', 'Control Flow - Conditionals', 'Functions', 'Data Structures', 'File Handling'],
  20,
  70,
  30
);

-- Insert Questions for Phase I Quiz
-- Chapter 1: Introduction to Python
INSERT INTO quiz_questions (quiz_id, question_type, question_text, code_snippet, options, correct_answer, explanation, points, difficulty, chapter, order_index)
VALUES
  -- Question 1
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'What is Python primarily known for in the programming world?',
    NULL,
    '[
      {"id": "a", "text": "Low-level system programming"},
      {"id": "b", "text": "Readable syntax and versatility across domains"},
      {"id": "c", "text": "Fastest execution speed"},
      {"id": "d", "text": "Only suitable for web development"}
    ]',
    'b',
    'Python is known for its clean, readable syntax and versatility - used in web development, data science, AI, automation, and more.',
    1,
    'easy',
    'Introduction to Python',
    1
  ),

  -- Question 2
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this code print?',
    'print("Hello, " + "World!")',
    '[
      {"id": "a", "text": "Hello, World!"},
      {"id": "b", "text": "Hello, +World!"},
      {"id": "c", "text": "Error"},
      {"id": "d", "text": "HelloWorld!"}
    ]',
    'a',
    'The + operator concatenates strings in Python, joining them together with the result "Hello, World!"',
    1,
    'easy',
    'Introduction to Python',
    2
  ),

  -- Chapter 2: Variables & Data Types
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'Which of the following is NOT a valid variable name in Python?',
    NULL,
    '[
      {"id": "a", "text": "my_variable"},
      {"id": "b", "text": "_private_var"},
      {"id": "c", "text": "2nd_variable"},
      {"id": "d", "text": "variable2"}
    ]',
    'c',
    'Variable names cannot start with a number. They must begin with a letter or underscore.',
    1,
    'easy',
    'Variables & Data Types',
    3
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What is the data type of x after this code?',
    'x = 5\nx = str(x)',
    '[
      {"id": "a", "text": "int"},
      {"id": "b", "text": "str"},
      {"id": "c", "text": "float"},
      {"id": "d", "text": "bool"}
    ]',
    'b',
    'The str() function converts the integer 5 to a string "5", so x becomes a string type.',
    1,
    'easy',
    'Variables & Data Types',
    4
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this code output?',
    'x = 10\ny = 3\nprint(x // y)',
    '[
      {"id": "a", "text": "3.33"},
      {"id": "b", "text": "3"},
      {"id": "c", "text": "4"},
      {"id": "d", "text": "3.0"}
    ]',
    'b',
    'The // operator performs floor division, returning only the integer part of the division (10 ÷ 3 = 3).',
    1,
    'easy',
    'Variables & Data Types',
    5
  ),

  -- Chapter 3: Control Flow - Loops
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'What is the main difference between a for loop and a while loop?',
    NULL,
    '[
      {"id": "a", "text": "for loops are faster"},
      {"id": "b", "text": "for loops iterate over sequences, while loops continue until a condition is false"},
      {"id": "c", "text": "while loops cannot be infinite"},
      {"id": "d", "text": "There is no difference"}
    ]',
    'b',
    'For loops iterate over sequences (like lists, ranges), while loops run as long as a condition remains true.',
    1,
    'easy',
    'Control Flow - Loops',
    6
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'How many times will "Hello" be printed?',
    'for i in range(5):\n    print("Hello")',
    '[
      {"id": "a", "text": "4"},
      {"id": "b", "text": "5"},
      {"id": "c", "text": "6"},
      {"id": "d", "text": "Infinite"}
    ]',
    'b',
    'range(5) generates numbers from 0 to 4 (5 numbers total), so the loop executes 5 times.',
    1,
    'easy',
    'Control Flow - Loops',
    7
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this code print?',
    'for i in range(3):\n    if i == 1:\n        break\n    print(i)',
    '[
      {"id": "a", "text": "0 1 2"},
      {"id": "b", "text": "0"},
      {"id": "c", "text": "1"},
      {"id": "d", "text": "0 2"}
    ]',
    'b',
    'The loop prints 0, then when i becomes 1, the break statement exits the loop immediately.',
    1,
    'easy',
    'Control Flow - Loops',
    8
  ),

  -- Chapter 4: Control Flow - Conditionals
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'What keyword is used to check an additional condition after an if statement?',
    NULL,
    '[
      {"id": "a", "text": "else"},
      {"id": "b", "text": "elif"},
      {"id": "c", "text": "elseif"},
      {"id": "d", "text": "then"}
    ]',
    'b',
    'Python uses "elif" (short for "else if") to check additional conditions after an if statement.',
    1,
    'easy',
    'Control Flow - Conditionals',
    9
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this code print?',
    'x = 15\nif x > 20:\n    print("A")\nelif x > 10:\n    print("B")\nelse:\n    print("C")',
    '[
      {"id": "a", "text": "A"},
      {"id": "b", "text": "B"},
      {"id": "c", "text": "C"},
      {"id": "d", "text": "A B"}
    ]',
    'b',
    'x is 15, which is not > 20, but is > 10, so the elif condition is true and "B" is printed.',
    1,
    'easy',
    'Control Flow - Conditionals',
    10
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What is the result of this code?',
    'result = "Even" if 8 % 2 == 0 else "Odd"\nprint(result)',
    '[
      {"id": "a", "text": "Even"},
      {"id": "b", "text": "Odd"},
      {"id": "c", "text": "True"},
      {"id": "d", "text": "False"}
    ]',
    'a',
    'This is a ternary operator. 8 % 2 equals 0, so the condition is true and "Even" is assigned to result.',
    1,
    'easy',
    'Control Flow - Conditionals',
    11
  ),

  -- Chapter 5: Functions
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'What keyword is used to define a function in Python?',
    NULL,
    '[
      {"id": "a", "text": "function"},
      {"id": "b", "text": "def"},
      {"id": "c", "text": "func"},
      {"id": "d", "text": "define"}
    ]',
    'b',
    'Python uses the "def" keyword to define functions.',
    1,
    'easy',
    'Functions',
    12
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this function return?',
    'def multiply(a, b):\n    return a * b\n\nresult = multiply(4, 5)',
    '[
      {"id": "a", "text": "9"},
      {"id": "b", "text": "20"},
      {"id": "c", "text": "45"},
      {"id": "d", "text": "None"}
    ]',
    'b',
    'The function multiplies 4 * 5 and returns 20.',
    1,
    'easy',
    'Functions',
    13
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What happens when this function is called?',
    'def greet(name="Guest"):\n    print(f"Hello, {name}!")\n\ngreet()',
    '[
      {"id": "a", "text": "Error - missing argument"},
      {"id": "b", "text": "Hello, !"},
      {"id": "c", "text": "Hello, Guest!"},
      {"id": "d", "text": "Hello, name!"}
    ]',
    'c',
    'The function has a default parameter value "Guest", so calling greet() without arguments uses this default.',
    1,
    'easy',
    'Functions',
    14
  ),

  -- Chapter 6: Data Structures
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'Which data structure is ordered, mutable, and allows duplicate elements?',
    NULL,
    '[
      {"id": "a", "text": "Set"},
      {"id": "b", "text": "Tuple"},
      {"id": "c", "text": "List"},
      {"id": "d", "text": "Dictionary"}
    ]',
    'c',
    'Lists are ordered, mutable (changeable), and allow duplicate elements. Sets don''t allow duplicates, tuples are immutable.',
    1,
    'easy',
    'Data Structures',
    15
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this code output?',
    'my_list = [1, 2, 3, 4, 5]\nprint(my_list[2])',
    '[
      {"id": "a", "text": "1"},
      {"id": "b", "text": "2"},
      {"id": "c", "text": "3"},
      {"id": "d", "text": "4"}
    ]',
    'c',
    'Python uses zero-based indexing. Index [2] refers to the third element, which is 3.',
    1,
    'easy',
    'Data Structures',
    16
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What does this code return?',
    'person = {"name": "Alice", "age": 30}\nprint(person.get("name"))',
    '[
      {"id": "a", "text": "Alice"},
      {"id": "b", "text": "30"},
      {"id": "c", "text": "name"},
      {"id": "d", "text": "None"}
    ]',
    'a',
    'The .get() method retrieves the value associated with the key "name", which is "Alice".',
    1,
    'easy',
    'Data Structures',
    17
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'code_snippet',
    'What will this code print?',
    'my_tuple = (1, 2, 3)\nmy_tuple[0] = 5\nprint(my_tuple)',
    '[
      {"id": "a", "text": "(5, 2, 3)"},
      {"id": "b", "text": "(1, 2, 3)"},
      {"id": "c", "text": "Error"},
      {"id": "d", "text": "None"}
    ]',
    'c',
    'Tuples are immutable, so attempting to modify an element raises a TypeError.',
    1,
    'easy',
    'Data Structures',
    18
  ),

  -- Chapter 7: File Handling
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'Which mode opens a file for reading in Python?',
    NULL,
    '[
      {"id": "a", "text": "w"},
      {"id": "b", "text": "r"},
      {"id": "c", "text": "a"},
      {"id": "d", "text": "x"}
    ]',
    'b',
    'The "r" mode opens a file for reading. "w" is for writing, "a" for appending, "x" for creating.',
    1,
    'easy',
    'File Handling',
    19
  ),

  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'theoretical',
    'What is the advantage of using "with" statement when opening files?',
    NULL,
    '[
      {"id": "a", "text": "Makes file operations faster"},
      {"id": "b", "text": "Automatically closes the file even if an error occurs"},
      {"id": "c", "text": "Allows multiple files to be opened"},
      {"id": "d", "text": "Enables file encryption"}
    ]',
    'b',
    'The "with" statement ensures the file is properly closed after use, even if an exception occurs.',
    1,
    'easy',
    'File Handling',
    20
  );

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- SELECT * FROM quizzes;
-- SELECT * FROM quiz_questions WHERE quiz_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' ORDER BY order_index;
