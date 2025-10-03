-- ==============================================================
-- Blue Pigeon Testing Platform - Database Schema
-- Phase 1: Foundation Tables with RLS and Real-time Support
-- ==============================================================

-- 1. TESTS TABLE - Test metadata and configuration
CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'closed')),
  time_limit_minutes INTEGER,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TEST QUESTIONS
CREATE TABLE IF NOT EXISTS test_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  starter_code TEXT,
  points INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(test_id, question_number)
);

-- 3. TEST SUBMISSIONS - Combined submissions + editor state
CREATE TABLE IF NOT EXISTS test_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  code_content TEXT NOT NULL DEFAULT '',
  cursor_position JSONB,
  last_edited_by UUID REFERENCES profiles(id),
  last_edit_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  tab_switches INTEGER DEFAULT 0,
  copy_paste_attempts INTEGER DEFAULT 0,
  score INTEGER,
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'graded')),
  teacher_note TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, question_id)
);

-- 4. STUDENT QUESTIONS
CREATE TABLE IF NOT EXISTS test_student_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  admin_response TEXT,
  responded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at TIMESTAMPTZ
);

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_tests_status ON tests(status);
CREATE INDEX IF NOT EXISTS idx_tests_created_by ON tests(created_by);
CREATE INDEX IF NOT EXISTS idx_test_questions_test_id ON test_questions(test_id);
CREATE INDEX IF NOT EXISTS idx_test_submissions_active ON test_submissions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_test_submissions_student_test ON test_submissions(student_id, test_id);
CREATE INDEX IF NOT EXISTS idx_test_submissions_test_active ON test_submissions(test_id, is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_student_questions_test ON test_student_questions(test_id);

-- 6. RLS POLICIES
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_student_questions ENABLE ROW LEVEL SECURITY;

-- Students can view live tests
CREATE POLICY "Students can view live tests" ON tests FOR SELECT USING (status = 'live');

-- Admins can manage all tests
CREATE POLICY "Admins can manage tests" ON tests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
);

-- Students can view questions for live tests
CREATE POLICY "Students can view questions for live tests" ON test_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM tests WHERE tests.id = test_questions.test_id AND tests.status = 'live')
);

-- Admins can manage all questions
CREATE POLICY "Admins can manage questions" ON test_questions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
);

-- Students can manage own submissions
CREATE POLICY "Students can view own submissions" ON test_submissions FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can create submissions" ON test_submissions FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can update own submissions" ON test_submissions FOR UPDATE USING (student_id = auth.uid());

-- Admins can view and update all submissions
CREATE POLICY "Admins can view all submissions" ON test_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
);
CREATE POLICY "Admins can update submissions" ON test_submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
);

-- Student questions policies
CREATE POLICY "Students can view own questions" ON test_student_questions FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can ask questions" ON test_student_questions FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Admins can view all questions" ON test_student_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
);
CREATE POLICY "Admins can answer questions" ON test_student_questions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
);

-- 7. TRIGGERS
CREATE OR REPLACE FUNCTION update_tests_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tests_updated_at_trigger BEFORE UPDATE ON tests FOR EACH ROW EXECUTE FUNCTION update_tests_updated_at();

CREATE OR REPLACE FUNCTION update_submissions_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER submissions_updated_at_trigger BEFORE UPDATE ON test_submissions FOR EACH ROW EXECUTE FUNCTION update_submissions_updated_at();

-- 8. REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE test_submissions;
ALTER TABLE test_submissions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE test_student_questions;
ALTER TABLE test_student_questions REPLICA IDENTITY FULL;