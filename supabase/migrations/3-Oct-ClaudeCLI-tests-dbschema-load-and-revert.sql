-- Blue Pigeon Testing System
-- Migration for creating test infrastructure with real-time monitoring




-- =============================================
-- TESTS TABLE
-- Admin creates and manages tests
-- =============================================
CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT NOT NULL,
  starter_code TEXT,
  test_cases JSONB DEFAULT '[]'::jsonb,

  -- Test configuration
  time_limit_minutes INTEGER DEFAULT 60,
  max_alt_tab_warnings INTEGER DEFAULT 3,
  allow_partial_submission BOOLEAN DEFAULT true,

  -- Status management
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed', 'archived')),
  opens_at TIMESTAMP WITH TIME ZONE,
  closes_at TIMESTAMP WITH TIME ZONE,

  -- Ownership
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_time_range CHECK (opens_at IS NULL OR closes_at IS NULL OR opens_at < closes_at)
);

-- =============================================
-- TEST SUBMISSIONS
-- Student final submissions
-- =============================================
CREATE TABLE IF NOT EXISTS test_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Submission content
  code_content TEXT NOT NULL,

  -- Timing
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE,

  -- Status
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'graded', 'flagged')),

  -- Anti-cheat metrics
  alt_tab_count INTEGER DEFAULT 0,
  paste_attempt_count INTEGER DEFAULT 0,
  suspicious_activity_log JSONB DEFAULT '[]'::jsonb,

  -- Grading
  final_score NUMERIC(5, 2),
  auto_graded_score NUMERIC(5, 2),
  manual_graded_score NUMERIC(5, 2),
  feedback TEXT,
  graded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  graded_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- One submission per student per test
  CONSTRAINT unique_student_test UNIQUE (test_id, student_id)
);

-- =============================================
-- REAL-TIME EDITOR SESSIONS
-- Live monitoring of student code as they type
-- =============================================
CREATE TABLE IF NOT EXISTS test_editor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  submission_id UUID REFERENCES test_submissions(id) ON DELETE CASCADE,

  -- Live editor state
  current_code TEXT,
  cursor_position JSONB DEFAULT '{"line": 0, "column": 0}'::jsonb,

  -- Activity tracking
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  keystrokes_count INTEGER DEFAULT 0,

  -- Connection status
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  disconnection_count INTEGER DEFAULT 0,

  -- Admin interaction
  admin_viewing BOOLEAN DEFAULT false,
  admin_intervention JSONB DEFAULT '[]'::jsonb,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- One active session per student per test
  CONSTRAINT unique_active_session UNIQUE (test_id, student_id)
);

-- =============================================
-- ADMIN INTERVENTIONS LOG
-- Track all admin interactions with students
-- =============================================
CREATE TABLE IF NOT EXISTS test_admin_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Intervention details
  intervention_type VARCHAR(50) NOT NULL CHECK (intervention_type IN ('message', 'code_hint', 'warning', 'time_extension', 'flag')),
  content TEXT NOT NULL,

  -- Context
  student_code_snapshot TEXT,
  student_acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_tests_status ON tests(status);
CREATE INDEX idx_tests_created_by ON tests(created_by);
CREATE INDEX idx_tests_opens_closes ON tests(opens_at, closes_at);

CREATE INDEX idx_submissions_test ON test_submissions(test_id);
CREATE INDEX idx_submissions_student ON test_submissions(student_id);
CREATE INDEX idx_submissions_status ON test_submissions(status);
CREATE INDEX idx_submissions_test_status ON test_submissions(test_id, status);

CREATE INDEX idx_sessions_test ON test_editor_sessions(test_id);
CREATE INDEX idx_sessions_student ON test_editor_sessions(student_id);
CREATE INDEX idx_sessions_active ON test_editor_sessions(test_id, is_active);
CREATE INDEX idx_sessions_last_activity ON test_editor_sessions(last_activity);

CREATE INDEX idx_interventions_test ON test_admin_interventions(test_id);
CREATE INDEX idx_interventions_student ON test_admin_interventions(student_id);
CREATE INDEX idx_interventions_admin ON test_admin_interventions(admin_id);

-- =============================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tests_updated_at BEFORE UPDATE ON tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER submissions_updated_at BEFORE UPDATE ON test_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER sessions_updated_at BEFORE UPDATE ON test_editor_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_editor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_admin_interventions ENABLE ROW LEVEL SECURITY;

-- TESTS POLICIES
-- Admins can do everything
CREATE POLICY "Admins can manage all tests"
  ON tests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- Students can view open tests
CREATE POLICY "Students can view open tests"
  ON tests FOR SELECT
  USING (
    status = 'open'
    AND (opens_at IS NULL OR opens_at <= NOW())
    AND (closes_at IS NULL OR closes_at >= NOW())
  );

-- SUBMISSIONS POLICIES
-- Students can view and update their own submissions
CREATE POLICY "Students can manage own submissions"
  ON test_submissions FOR ALL
  USING (student_id = auth.uid());

-- Admins can view all submissions for their tests
CREATE POLICY "Admins can view all submissions"
  ON test_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tests
      JOIN profiles ON profiles.id = auth.uid()
      WHERE tests.id = test_submissions.test_id
      AND profiles.admin_level > 0
    )
  );

-- EDITOR SESSIONS POLICIES
-- Students can manage their own sessions
CREATE POLICY "Students can manage own sessions"
  ON test_editor_sessions FOR ALL
  USING (student_id = auth.uid());

-- Admins can view all sessions for monitoring
CREATE POLICY "Admins can view all sessions"
  ON test_editor_sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- Admins can update sessions for intervention
CREATE POLICY "Admins can update sessions for intervention"
  ON test_editor_sessions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- INTERVENTIONS POLICIES
-- Students can view interventions directed at them
CREATE POLICY "Students can view their interventions"
  ON test_admin_interventions FOR SELECT
  USING (student_id = auth.uid());

-- Students can acknowledge interventions
CREATE POLICY "Students can acknowledge interventions"
  ON test_admin_interventions FOR UPDATE
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Admins can create and view all interventions
CREATE POLICY "Admins can manage interventions"
  ON test_admin_interventions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Auto-close expired tests
CREATE OR REPLACE FUNCTION auto_close_expired_tests()
RETURNS void AS $$
BEGIN
  UPDATE tests
  SET status = 'closed'
  WHERE status = 'open'
  AND closes_at IS NOT NULL
  AND closes_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- Get active test for student
CREATE OR REPLACE FUNCTION get_active_test_for_student(student_uuid UUID)
RETURNS TABLE (
  test_id UUID,
  test_title VARCHAR,
  submission_id UUID,
  time_remaining_minutes INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.title,
    ts.id,
    GREATEST(0, t.time_limit_minutes - EXTRACT(EPOCH FROM (NOW() - ts.started_at))/60)::INTEGER
  FROM tests t
  LEFT JOIN test_submissions ts ON ts.test_id = t.id AND ts.student_id = student_uuid
  WHERE t.status = 'open'
  AND ts.status = 'in_progress'
  AND (t.closes_at IS NULL OR t.closes_at >= NOW());
END;
$$ LANGUAGE plpgsql;

-- Get live monitoring data for admin
CREATE OR REPLACE FUNCTION get_live_test_monitoring(test_uuid UUID)
RETURNS TABLE (
  student_id UUID,
  student_username VARCHAR,
  current_code TEXT,
  last_activity TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN,
  alt_tab_count INTEGER,
  keystrokes_count INTEGER,
  submission_status VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.username,
    tes.current_code,
    tes.last_activity,
    tes.is_active,
    COALESCE(ts.alt_tab_count, 0),
    tes.keystrokes_count,
    COALESCE(ts.status, 'not_started')
  FROM profiles p
  JOIN test_editor_sessions tes ON tes.student_id = p.id
  LEFT JOIN test_submissions ts ON ts.student_id = p.id AND ts.test_id = test_uuid
  WHERE tes.test_id = test_uuid
  ORDER BY tes.last_activity DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- REALTIME PUBLICATION (for Supabase Realtime)
-- =============================================
-- This allows Supabase Realtime to broadcast changes
-- Enable realtime for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE test_editor_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE test_admin_interventions;
ALTER PUBLICATION supabase_realtime ADD TABLE test_submissions;

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================
COMMENT ON TABLE tests IS 'Admin-created coding tests with time limits and anti-cheat rules';
COMMENT ON TABLE test_submissions IS 'Final student submissions with grading and anti-cheat metrics';
COMMENT ON TABLE test_editor_sessions IS 'Real-time editor state for live admin monitoring';
COMMENT ON TABLE test_admin_interventions IS 'Log of all admin interactions with students during tests';

COMMENT ON FUNCTION get_live_test_monitoring IS 'Returns real-time monitoring data for admin dashboard';
COMMENT ON FUNCTION get_active_test_for_student IS 'Gets the currently active test for a student with time remaining';




---- REVERTING SCHEMAS:

-- ============================================
-- COMPLETE REVERT SCRIPT - BOTH SCHEMAS
-- Execute in order to cleanly remove everything
-- ============================================

-- ============================================
-- PART 1: REVERT SCHEMA 1 (Simplified Schema)
-- ============================================

COMMENT ON TABLE test_student_questions IS NULL;
COMMENT ON TABLE test_submissions IS NULL;
COMMENT ON TABLE test_questions IS NULL;
COMMENT ON TABLE tests IS NULL;

-- Remove from realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS test_student_questions;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS test_submissions;

-- Drop all policies (Schema 1)
DROP POLICY IF EXISTS "Admins manage all questions" ON test_student_questions;
DROP POLICY IF EXISTS "Students view own questions" ON test_student_questions;
DROP POLICY IF EXISTS "Students can ask questions" ON test_student_questions;
DROP POLICY IF EXISTS "Admins edit all submissions" ON test_submissions;
DROP POLICY IF EXISTS "Admins view all submissions" ON test_submissions;
DROP POLICY IF EXISTS "Students manage own submissions" ON test_submissions;
DROP POLICY IF EXISTS "Admins can manage questions" ON test_questions;
DROP POLICY IF EXISTS "Students can view live test questions" ON test_questions;
DROP POLICY IF EXISTS "Admins can manage tests" ON tests;
DROP POLICY IF EXISTS "Students can view live tests" ON tests;

-- Disable RLS (Schema 1)
ALTER TABLE IF EXISTS test_student_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS test_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS test_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tests DISABLE ROW LEVEL SECURITY;

-- Drop indexes (Schema 1)
DROP INDEX IF EXISTS idx_test_submissions_student_test;
DROP INDEX IF EXISTS idx_test_submissions_active;
DROP INDEX IF EXISTS idx_tests_status;

-- Drop tables (Schema 1) - in correct order due to foreign keys
DROP TABLE IF EXISTS test_student_questions CASCADE;
DROP TABLE IF EXISTS test_submissions CASCADE;
DROP TABLE IF EXISTS test_questions CASCADE;
DROP TABLE IF EXISTS tests CASCADE;

-- ============================================
-- PART 2: REVERT SCHEMA 2 (Blue Pigeon System)
-- ============================================

-- Remove comments
COMMENT ON FUNCTION get_live_test_monitoring IS NULL;
COMMENT ON FUNCTION get_active_test_for_student IS NULL;
COMMENT ON TABLE test_admin_interventions IS NULL;
COMMENT ON TABLE test_editor_sessions IS NULL;
COMMENT ON TABLE test_submissions IS NULL;
COMMENT ON TABLE tests IS NULL;

-- Remove from realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS test_submissions;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS test_admin_interventions;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS test_editor_sessions;

-- Drop all helper functions
DROP FUNCTION IF EXISTS get_live_test_monitoring(UUID);
DROP FUNCTION IF EXISTS get_active_test_for_student(UUID);
DROP FUNCTION IF EXISTS auto_close_expired_tests();

-- Drop all triggers
DROP TRIGGER IF EXISTS sessions_updated_at ON test_editor_sessions;
DROP TRIGGER IF EXISTS submissions_updated_at ON test_submissions;
DROP TRIGGER IF EXISTS tests_updated_at ON tests;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop all policies (Schema 2)
DROP POLICY IF EXISTS "Admins can manage interventions" ON test_admin_interventions;
DROP POLICY IF EXISTS "Students can acknowledge interventions" ON test_admin_interventions;
DROP POLICY IF EXISTS "Students can view their interventions" ON test_admin_interventions;

DROP POLICY IF EXISTS "Admins can update sessions for intervention" ON test_editor_sessions;
DROP POLICY IF EXISTS "Admins can view all sessions" ON test_editor_sessions;
DROP POLICY IF EXISTS "Students can manage own sessions" ON test_editor_sessions;

DROP POLICY IF EXISTS "Admins can view all submissions" ON test_submissions;
DROP POLICY IF EXISTS "Students can manage own submissions" ON test_submissions;

DROP POLICY IF EXISTS "Students can view open tests" ON tests;
DROP POLICY IF EXISTS "Admins can manage all tests" ON tests;

-- Disable RLS (Schema 2)
ALTER TABLE IF EXISTS test_admin_interventions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS test_editor_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS test_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tests DISABLE ROW LEVEL SECURITY;

-- Drop all indexes (Schema 2)
DROP INDEX IF EXISTS idx_interventions_admin;
DROP INDEX IF EXISTS idx_interventions_student;
DROP INDEX IF EXISTS idx_interventions_test;

DROP INDEX IF EXISTS idx_sessions_last_activity;
DROP INDEX IF EXISTS idx_sessions_active;
DROP INDEX IF EXISTS idx_sessions_student;
DROP INDEX IF EXISTS idx_sessions_test;

DROP INDEX IF EXISTS idx_submissions_test_status;
DROP INDEX IF EXISTS idx_submissions_status;
DROP INDEX IF EXISTS idx_submissions_student;
DROP INDEX IF EXISTS idx_submissions_test;

DROP INDEX IF EXISTS idx_tests_opens_closes;
DROP INDEX IF EXISTS idx_tests_created_by;
DROP INDEX IF EXISTS idx_tests_status;

-- Drop all tables (Schema 2) - in correct order due to foreign keys
DROP TABLE IF EXISTS test_admin_interventions CASCADE;
DROP TABLE IF EXISTS test_editor_sessions CASCADE;
DROP TABLE IF EXISTS test_submissions CASCADE;
DROP TABLE IF EXISTS tests CASCADE;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check remaining tables
DO $$
DECLARE
  table_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename LIKE 'test%';
  
  IF table_count > 0 THEN
    RAISE NOTICE '⚠️  WARNING: % test-related tables still exist', table_count;
    RAISE NOTICE 'Run: SELECT tablename FROM pg_tables WHERE schemaname = ''public'' AND tablename LIKE ''test%%'';';
  ELSE
    RAISE NOTICE '✅ All test-related tables removed successfully';
  END IF;
END $$;

-- Check remaining functions
DO $$
DECLARE
  function_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO function_count
  FROM pg_proc 
  JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid
  WHERE pg_namespace.nspname = 'public'
  AND (proname LIKE '%test%' OR proname LIKE '%auto_close%' OR proname = 'update_updated_at_column');
  
  IF function_count > 0 THEN
    RAISE NOTICE '⚠️  WARNING: % test-related functions still exist', function_count;
  ELSE
    RAISE NOTICE '✅ All test-related functions removed successfully';
  END IF;
END $$;

-- Check remaining indexes
DO $$
DECLARE
  index_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO index_count
  FROM pg_indexes
  WHERE schemaname = 'public'
  AND (indexname LIKE 'idx_test%' OR indexname LIKE 'idx_submission%' OR indexname LIKE 'idx_session%' OR indexname LIKE 'idx_intervention%');
  
  IF index_count > 0 THEN
    RAISE NOTICE '⚠️  WARNING: % test-related indexes still exist', index_count;
  ELSE
    RAISE NOTICE '✅ All test-related indexes removed successfully';
  END IF;
END $$;

-- Final success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '✅ REVERT COMPLETED SUCCESSFULLY';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE 'Both Schema 1 and Schema 2 have been completely removed.';
  RAISE NOTICE 'Database is now clean and ready for fresh installation.';
  RAISE NOTICE '';
END $$;