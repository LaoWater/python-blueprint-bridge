-- ============================================================================
-- ADMIN RLS POLICIES FOR QUIZ AND TEST SYSTEMS
-- This migration adds admin-level access policies for all quiz and test tables
-- Admins (admin_level > 0) get full read/write access to monitor and manage:
-- - Quiz system (quizzes, questions, attempts, responses)
-- - Coding test system (tests, questions, submissions, student questions)
-- ============================================================================

-- ============================================================================
-- QUIZ SYSTEM ADMIN POLICIES
-- ============================================================================

-- QUIZZES: Admins can create, view, update, and delete all quizzes
CREATE POLICY "Admins can manage all quizzes" ON quizzes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- QUIZ QUESTIONS: Admins can manage all questions
CREATE POLICY "Admins can manage all quiz questions" ON quiz_questions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- QUIZ ATTEMPTS: Admins can view and modify all student attempts
CREATE POLICY "Admins can view all quiz attempts" ON quiz_attempts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

CREATE POLICY "Admins can update quiz attempts" ON quiz_attempts
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

CREATE POLICY "Admins can delete quiz attempts" ON quiz_attempts
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- QUIZ RESPONSES: Admins can view all student responses
CREATE POLICY "Admins can view all quiz responses" ON quiz_responses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

CREATE POLICY "Admins can update quiz responses" ON quiz_responses
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

CREATE POLICY "Admins can delete quiz responses" ON quiz_responses
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level > 0
    )
  );

-- ============================================================================
-- CODING TEST SYSTEM - VERIFY ADMIN POLICIES EXIST
-- Note: These should already exist from 3-Oct-Lovable-latest-dbschema-load.sql
-- This section documents what should be in place for tests/submissions
-- ============================================================================

-- The following policies should already exist:
-- 1. "Admins can manage tests" ON tests FOR ALL
-- 2. "Admins can manage questions" ON test_questions FOR ALL
-- 3. "Admins can view all submissions" ON test_submissions FOR SELECT
-- 4. "Admins can update submissions" ON test_submissions FOR UPDATE
-- 5. "Admins can view all questions" ON test_student_questions FOR SELECT
-- 6. "Admins can answer questions" ON test_student_questions FOR UPDATE

-- If any are missing, they can be added here:
-- Uncomment and run if needed:

-- CREATE POLICY IF NOT EXISTS "Admins can delete test submissions" ON test_submissions
--   FOR DELETE
--   USING (
--     EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
--   );

-- CREATE POLICY IF NOT EXISTS "Admins can manage student questions" ON test_student_questions
--   FOR ALL
--   USING (
--     EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
--   );

-- ============================================================================
-- VERIFICATION QUERIES
-- Run these to verify admin can access all data:
-- ============================================================================

-- Check quiz system access:
-- SELECT * FROM quizzes;
-- SELECT * FROM quiz_questions;
-- SELECT * FROM quiz_attempts;
-- SELECT * FROM quiz_responses;

-- Check test system access:
-- SELECT * FROM tests;
-- SELECT * FROM test_questions;
-- SELECT * FROM test_submissions;
-- SELECT * FROM test_student_questions;

-- ============================================================================
-- NOTES
-- ============================================================================
--
-- Admin Detection:
-- - All policies check: EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.admin_level > 0)
-- - This means any user with admin_level > 0 gets full access
--
-- Security:
-- - Students can still only see their own attempts/responses/submissions
-- - Admins bypass all restrictions to monitor and manage
-- - Regular users (admin_level = 0 or NULL) follow existing student policies
--
-- Real-time Monitoring:
-- - Admins can now query quiz_attempts and quiz_responses for live monitoring
-- - Combined with Supabase subscriptions, this enables the Live Monitoring feature
-- - No additional realtime table additions needed (subscriptions work with RLS)
