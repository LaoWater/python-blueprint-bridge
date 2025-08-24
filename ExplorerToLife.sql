-- ==============================================================
-- Blue Pigeon IDE - Explorer Database Schema
-- File and Folder Management System with User Isolation
-- ==============================================================

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- ==============================================================
-- 1. PROJECTS TABLE
-- Each user can have multiple projects (workspaces)
-- ==============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT false, -- Only one active project per user
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT projects_name_user_unique UNIQUE(user_id, name),
  CONSTRAINT projects_name_not_empty CHECK (LENGTH(TRIM(name)) > 0)
);

-- RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- ==============================================================
-- 2. FILE_SYSTEM_ITEMS TABLE
-- Hierarchical structure for files and folders
-- ==============================================================
CREATE TABLE IF NOT EXISTS file_system_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Hierarchy
  parent_id UUID REFERENCES file_system_items(id) ON DELETE CASCADE,
  
  -- Item properties
  name VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('file', 'folder')),
  path TEXT NOT NULL, -- Full path for easy querying
  
  -- File specific
  content TEXT, -- File content (NULL for folders)
  language VARCHAR(50) DEFAULT 'plaintext', -- Programming language for syntax highlighting
  encoding VARCHAR(20) DEFAULT 'utf-8',
  
  -- Metadata
  size_bytes BIGINT DEFAULT 0,
  is_binary BOOLEAN DEFAULT false,
  is_readonly BOOLEAN DEFAULT false,
  is_hidden BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Sorting and organization
  sort_order INTEGER DEFAULT 0,
  
  -- Constraints
  CONSTRAINT fsi_name_not_empty CHECK (LENGTH(TRIM(name)) > 0),
  CONSTRAINT fsi_path_not_empty CHECK (LENGTH(TRIM(path)) > 0),
  CONSTRAINT fsi_content_only_for_files CHECK (
    (type = 'file') OR (type = 'folder' AND content IS NULL)
  ),
  CONSTRAINT fsi_parent_child_unique UNIQUE(parent_id, name, project_id),
  CONSTRAINT fsi_root_path_unique UNIQUE(project_id, path)
);

-- RLS for file_system_items
ALTER TABLE file_system_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own files" ON file_system_items
  FOR ALL USING (auth.uid() = user_id);

-- ==============================================================
-- 3. FILE_HISTORY TABLE
-- Version control for file changes
-- ==============================================================
CREATE TABLE IF NOT EXISTS file_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID NOT NULL REFERENCES file_system_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Version data
  version_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  change_description TEXT,
  
  -- Metadata
  size_bytes BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT fh_version_positive CHECK (version_number > 0),
  CONSTRAINT fh_file_version_unique UNIQUE(file_id, version_number)
);

-- RLS for file_history
ALTER TABLE file_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own file history" ON file_history
  FOR ALL USING (auth.uid() = user_id);

-- ==============================================================
-- 4. RECENT_FILES TABLE
-- Track recently opened files per user
-- ==============================================================
CREATE TABLE IF NOT EXISTS recent_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_id UUID NOT NULL REFERENCES file_system_items(id) ON DELETE CASCADE,
  
  -- Tracking
  last_opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  open_count INTEGER DEFAULT 1,
  
  -- Constraints
  CONSTRAINT rf_user_file_unique UNIQUE(user_id, file_id)
);

-- RLS for recent_files
ALTER TABLE recent_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own recent files" ON recent_files
  FOR ALL USING (auth.uid() = user_id);

-- ==============================================================
-- 5. INDEXES FOR PERFORMANCE
-- ==============================================================

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(user_id, is_active) WHERE is_active = true;

-- File system items indexes
CREATE INDEX IF NOT EXISTS idx_fsi_project_id ON file_system_items(project_id);
CREATE INDEX IF NOT EXISTS idx_fsi_user_id ON file_system_items(user_id);
CREATE INDEX IF NOT EXISTS idx_fsi_parent_id ON file_system_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_fsi_path ON file_system_items(project_id, path);
CREATE INDEX IF NOT EXISTS idx_fsi_type ON file_system_items(project_id, type);
CREATE INDEX IF NOT EXISTS idx_fsi_updated_at ON file_system_items(updated_at);

-- File history indexes
CREATE INDEX IF NOT EXISTS idx_fh_file_id ON file_history(file_id);
CREATE INDEX IF NOT EXISTS idx_fh_created_at ON file_history(file_id, created_at);

-- Recent files indexes
CREATE INDEX IF NOT EXISTS idx_rf_user_id ON recent_files(user_id);
CREATE INDEX IF NOT EXISTS idx_rf_last_opened ON recent_files(user_id, last_opened_at);

-- ==============================================================
-- 6. FUNCTIONS AND TRIGGERS
-- ==============================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_system_items_updated_at 
  BEFORE UPDATE ON file_system_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure only one active project per user
CREATE OR REPLACE FUNCTION ensure_one_active_project()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    -- Deactivate all other projects for this user
    UPDATE projects 
    SET is_active = false 
    WHERE user_id = NEW.user_id AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for one active project
CREATE TRIGGER ensure_one_active_project_trigger
  AFTER INSERT OR UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION ensure_one_active_project();

-- Function to maintain file paths and hierarchy
CREATE OR REPLACE FUNCTION update_file_paths()
RETURNS TRIGGER AS $$
DECLARE
  parent_path TEXT := '';
BEGIN
  -- If this item has a parent, get the parent's path
  IF NEW.parent_id IS NOT NULL THEN
    SELECT path INTO parent_path
    FROM file_system_items
    WHERE id = NEW.parent_id;
    
    -- Build the new path
    NEW.path = parent_path || '/' || NEW.name;
  ELSE
    -- Root level item
    NEW.path = '/' || NEW.name;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to maintain paths
CREATE TRIGGER update_file_paths_trigger
  BEFORE INSERT OR UPDATE ON file_system_items
  FOR EACH ROW EXECUTE FUNCTION update_file_paths();

-- Function to create file history entry
CREATE OR REPLACE FUNCTION create_file_history_entry()
RETURNS TRIGGER AS $$
DECLARE
  next_version INTEGER;
BEGIN
  -- Only create history for files, not folders
  IF NEW.type = 'file' AND (TG_OP = 'INSERT' OR OLD.content != NEW.content) THEN
    -- Get the next version number
    SELECT COALESCE(MAX(version_number), 0) + 1 
    INTO next_version
    FROM file_history 
    WHERE file_id = NEW.id;
    
    -- Insert history entry
    INSERT INTO file_history (
      file_id, user_id, version_number, content, 
      size_bytes, change_description
    ) VALUES (
      NEW.id, NEW.user_id, next_version, NEW.content,
      LENGTH(NEW.content), 
      CASE 
        WHEN TG_OP = 'INSERT' THEN 'File created'
        ELSE 'File updated'
      END
    );
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for file history
CREATE TRIGGER create_file_history_trigger
  AFTER INSERT OR UPDATE ON file_system_items
  FOR EACH ROW EXECUTE FUNCTION create_file_history_entry();

-- Function to update recent files
CREATE OR REPLACE FUNCTION update_recent_files()
RETURNS TRIGGER AS $$
BEGIN
  -- Only track files, not folders
  IF NEW.type = 'file' THEN
    INSERT INTO recent_files (user_id, file_id, last_opened_at, open_count)
    VALUES (NEW.user_id, NEW.id, NEW.last_accessed_at, 1)
    ON CONFLICT (user_id, file_id) 
    DO UPDATE SET 
      last_opened_at = NEW.last_accessed_at,
      open_count = recent_files.open_count + 1;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for recent files
CREATE TRIGGER update_recent_files_trigger
  AFTER UPDATE OF last_accessed_at ON file_system_items
  FOR EACH ROW EXECUTE FUNCTION update_recent_files();

-- ==============================================================
-- 7. HELPER FUNCTIONS FOR COMMON OPERATIONS
-- ==============================================================

-- Function to get file tree for a project
CREATE OR REPLACE FUNCTION get_file_tree(project_uuid UUID)
RETURNS TABLE (
  id UUID,
  parent_id UUID,
  name VARCHAR(255),
  type VARCHAR(10),
  path TEXT,
  size_bytes BIGINT,
  updated_at TIMESTAMP WITH TIME ZONE,
  sort_order INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    fsi.id, fsi.parent_id, fsi.name, fsi.type, 
    fsi.path, fsi.size_bytes, fsi.updated_at, fsi.sort_order
  FROM file_system_items fsi
  WHERE fsi.project_id = project_uuid
    AND fsi.user_id = auth.uid()
  ORDER BY fsi.type DESC, fsi.sort_order, fsi.name;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Function to create a default project structure
CREATE OR REPLACE FUNCTION create_default_project_structure(project_uuid UUID)
RETURNS VOID AS $$
DECLARE
  src_folder_id UUID;
  tests_folder_id UUID;
BEGIN
  -- Create src folder
  INSERT INTO file_system_items (project_id, user_id, name, type, path, sort_order)
  VALUES (project_uuid, auth.uid(), 'src', 'folder', '/src', 1)
  RETURNING id INTO src_folder_id;
  
  -- Create tests folder
  INSERT INTO file_system_items (project_id, user_id, name, type, path, sort_order)
  VALUES (project_uuid, auth.uid(), 'tests', 'folder', '/tests', 2)
  RETURNING id INTO tests_folder_id;
  
  -- Create main.py in src
  INSERT INTO file_system_items (
    project_id, user_id, parent_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), src_folder_id, 'main.py', 'file', '/src/main.py',
    '# Welcome to Blue Pigeon IDE
# The Art of Programming - Practice your algorithmic thinking

def fibonacci_sequence(n):
    """Generate fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        next_num = sequence[i-1] + sequence[i-2]
        sequence.append(next_num)
    
    return sequence

def main():
    print("Blue Pigeon IDE - Algorithmic Patterns")
    print("=====================================")
    
    # Example: Generate first 10 fibonacci numbers
    fib_numbers = fibonacci_sequence(10)
    print(f"First 10 Fibonacci numbers: {fib_numbers}")
    
    # Pattern recognition: What pattern do you see?
    print("\\nPattern Analysis:")
    for i, num in enumerate(fib_numbers):
        if i > 0:
            ratio = num / fib_numbers[i-1] if fib_numbers[i-1] != 0 else 0
            print(f"F({i}) = {num}, Ratio: {ratio:.4f}")

if __name__ == "__main__":
    main()
', 'python', 1);
  
  -- Create utils.py in src
  INSERT INTO file_system_items (
    project_id, user_id, parent_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), src_folder_id, 'utils.py', 'file', '/src/utils.py',
    '# Utility functions for Blue Pigeon projects
# Helper functions for common programming patterns

def is_prime(n):
    """Check if a number is prime"""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def factorial(n):
    """Calculate factorial recursively"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def binary_search(arr, target):
    """Binary search implementation"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
', 'python', 2);

  -- Create algorithms.py in src
  INSERT INTO file_system_items (
    project_id, user_id, parent_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), src_folder_id, 'algorithms.py', 'file', '/src/algorithms.py',
    '# Core algorithms and data structures
# Essential patterns every programmer should master

class Stack:
    """Stack implementation using list"""
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0

def quicksort(arr):
    """Quicksort algorithm implementation"""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

def merge_sort(arr):
    """Merge sort algorithm implementation"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    """Helper function for merge sort"""
    result = []
    i, j = 0, 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
', 'python', 3);

  -- Create test file
  INSERT INTO file_system_items (
    project_id, user_id, parent_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), tests_folder_id, 'test_main.py', 'file', '/tests/test_main.py',
    '# Test cases for main.py functions
import unittest
import sys
import os

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../src"))

from main import fibonacci_sequence

class TestFibonacci(unittest.TestCase):
    
    def test_fibonacci_empty(self):
        """Test fibonacci with 0 terms"""
        self.assertEqual(fibonacci_sequence(0), [])
    
    def test_fibonacci_single(self):
        """Test fibonacci with 1 term"""
        self.assertEqual(fibonacci_sequence(1), [0])
    
    def test_fibonacci_two(self):
        """Test fibonacci with 2 terms"""
        self.assertEqual(fibonacci_sequence(2), [0, 1])
    
    def test_fibonacci_sequence(self):
        """Test fibonacci sequence generation"""
        expected = [0, 1, 1, 2, 3, 5, 8, 13]
        self.assertEqual(fibonacci_sequence(8), expected)

if __name__ == "__main__":
    unittest.main()
', 'python', 1);

  -- Create README.md
  INSERT INTO file_system_items (
    project_id, user_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), 'README.md', 'file', '/README.md',
    '# Blue Pigeon Project

Welcome to your Blue Pigeon programming project! This is where you practice **The Art of Programming** through algorithmic thinking and pattern recognition.

## Project Structure

```
/
├── src/
│   ├── main.py          # Main application entry point
│   ├── utils.py         # Utility functions and helpers
│   └── algorithms.py    # Core algorithms and data structures
├── tests/
│   └── test_main.py     # Unit tests
└── README.md            # This file
```

## Getting Started

1. Explore the code in the `src/` directory
2. Run the main program: `python src/main.py`
3. Run tests: `python -m unittest tests/test_main.py`
4. Experiment with the algorithms and add your own!

## Philosophy

Blue Pigeon emphasizes:
- **Algorithmic Intuition** - Understanding patterns over memorization
- **Blueprint Mastery** - Learning essential programming patterns
- **Pattern Recognition** - Seeing underlying structures
- **AI-Era Programming** - Conceptual understanding in an AI-driven world

Happy coding! 🕊️💙
', 'markdown', 3);

  -- Create requirements.txt
  INSERT INTO file_system_items (
    project_id, user_id, name, type, path, content, language, sort_order
  ) VALUES (
    project_uuid, auth.uid(), 'requirements.txt', 'file', '/requirements.txt',
    '# Blue Pigeon Project Dependencies
# Add your Python packages here

# Development dependencies
pytest>=7.0.0
black>=22.0.0
flake8>=4.0.0

# Add your project dependencies below:
# numpy>=1.21.0
# pandas>=1.3.0
# requests>=2.28.0
', 'text', 4);

END;
$$ language 'plpgsql' SECURITY DEFINER;

-- ==============================================================
-- 8. SAMPLE DATA (Optional - for testing)
-- ==============================================================

-- This will be handled by the application, but here's an example
-- of how to create a sample project:

/*
-- Example: Create a sample project (run after authentication)
DO $$
DECLARE
  sample_project_id UUID;
BEGIN
  -- Only run if we have a user (this would normally be done by the app)
  IF auth.uid() IS NOT NULL THEN
    INSERT INTO projects (user_id, name, description, is_active)
    VALUES (auth.uid(), 'My First Project', 'A sample Blue Pigeon project', true)
    RETURNING id INTO sample_project_id;
    
    -- Create default structure
    PERFORM create_default_project_structure(sample_project_id);
  END IF;
END;
$$;
*/

-- ==============================================================
-- SETUP COMPLETE
-- ==============================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Blue Pigeon Explorer database schema created successfully!';
  RAISE NOTICE 'Tables created: projects, file_system_items, file_history, recent_files';
  RAISE NOTICE 'Row Level Security (RLS) enabled for all tables';
  RAISE NOTICE 'Helper functions and triggers configured';
  RAISE NOTICE 'Ready for Blue Pigeon IDE Explorer integration!';
END;
$$;