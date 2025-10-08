-- ============================================
-- Test Platform Database Schema
-- Phase 2: Simplified Core Tables
-- ============================================

-- Drop existing objects (for clean reinstall)
-- Uncomment the section below if you need to revert changes


-- Drop policies
DROP POLICY IF EXISTS "Admins edit all submissions" ON test_submissions;
DROP POLICY IF EXISTS "Admins view all submissions" ON test_submissions;
DROP POLICY IF EXISTS "Students manage own submissions" ON test_submissions;
DROP POLICY IF EXISTS "Admins can manage tests" ON tests;
DROP POLICY IF EXISTS "Students can view live tests" ON tests;

-- Drop indexes
DROP INDEX IF EXISTS idx_test_submissions_student_test;
DROP INDEX IF EXISTS idx_test_submissions_active;
DROP INDEX IF EXISTS idx_tests_status;

-- Drop tables (CASCADE will drop dependent objects)
DROP TABLE IF EXISTS test_student_questions CASCADE;
DROP TABLE IF EXISTS test_submissions CASCADE;
DROP TABLE IF EXISTS test_questions CASCADE;
DROP TABLE IF EXISTS tests CASCADE;


-- ============================================
-- CORE TABLES
-- ============================================


-- 1. Tests table
CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id),
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, live, closed
  time_limit_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ
);

-- 2. Test questions
CREATE TABLE test_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  starter_code TEXT,
  points INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Student submissions & real-time editor state (COMBINED!)
CREATE TABLE test_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id),
  
  -- Editor state (updated every 1-2 seconds)
  code_content TEXT NOT NULL DEFAULT '',
  cursor_position JSONB, -- {line, column}
  last_edited_by UUID REFERENCES profiles(id), -- student or admin
  last_edit_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Submission tracking
  is_active BOOLEAN DEFAULT true,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  
  -- Security tracking
  tab_switches INTEGER DEFAULT 0,
  copy_paste_attempts INTEGER DEFAULT 0,
  
  -- Grading
  score INTEGER,
  status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, submitted, graded
  teacher_note TEXT, -- Admin can leave notes visible to student
  
  UNIQUE(student_id, question_id) -- One submission per student per question
);

-- 4. Admin questions asked during live test
CREATE TABLE test_student_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id),
  question_text TEXT NOT NULL,
  admin_response TEXT,
  responded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_tests_status ON tests(status);
CREATE INDEX idx_test_submissions_active ON test_submissions(is_active) WHERE is_active = true;
CREATE INDEX idx_test_submissions_student_test ON test_submissions(student_id, test_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_student_questions ENABLE ROW LEVEL SECURITY;

-- Students can view live tests
CREATE POLICY "Students can view live tests"
  ON tests FOR SELECT
  USING (status = 'live');

-- Admins can manage all tests
CREATE POLICY "Admins can manage tests"
  ON tests FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.admin_level > 0
  ));

-- Students can view questions for live tests
CREATE POLICY "Students can view live test questions"
  ON test_questions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM tests 
    WHERE tests.id = test_questions.test_id AND tests.status = 'live'
  ));

-- Admins can manage all questions
CREATE POLICY "Admins can manage questions"
  ON test_questions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.admin_level > 0
  ));

-- Students can only view/edit their own submissions
CREATE POLICY "Students manage own submissions"
  ON test_submissions FOR ALL
  USING (student_id = auth.uid());

-- Admins can view all submissions (for live monitoring)
CREATE POLICY "Admins view all submissions"
  ON test_submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.admin_level > 0
  ));

-- Admins can edit all submissions (for grading and notes)
CREATE POLICY "Admins edit all submissions"
  ON test_submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.admin_level > 0
  ));

-- Students can ask questions during their tests
CREATE POLICY "Students can ask questions"
  ON test_student_questions FOR INSERT
  WITH CHECK (student_id = auth.uid());

-- Students can view their own questions
CREATE POLICY "Students view own questions"
  ON test_student_questions FOR SELECT
  USING (student_id = auth.uid());

-- Admins can view and respond to all questions
CREATE POLICY "Admins manage all questions"
  ON test_student_questions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.admin_level > 0
  ));

-- ============================================
-- REAL-TIME SETUP (Optional - for instant updates)
-- ============================================

-- Enable realtime for live monitoring
ALTER PUBLICATION supabase_realtime ADD TABLE test_submissions;
ALTER TABLE test_submissions REPLICA IDENTITY FULL;

-- Also enable realtime for questions (admin notification)
ALTER PUBLICATION supabase_realtime ADD TABLE test_student_questions;
ALTER TABLE test_student_questions REPLICA IDENTITY FULL;

-- ============================================
-- CREATED OBJECTS REFERENCE (for rollback)
-- ============================================

/*
TABLES CREATED:
- tests
- test_questions
- test_submissions
- test_student_questions

INDEXES CREATED:
- idx_tests_status
- idx_test_submissions_active
- idx_test_submissions_student_test

POLICIES CREATED:
- Students can view live tests
- Admins can manage tests
- Students can view live test questions
- Admins can manage questions
- Students manage own submissions
- Admins view all submissions
- Admins edit all submissions
- Students can ask questions
- Students view own questions
- Admins manage all questions

REALTIME ENABLED FOR:
- test_submissions
- test_student_questions
*/

