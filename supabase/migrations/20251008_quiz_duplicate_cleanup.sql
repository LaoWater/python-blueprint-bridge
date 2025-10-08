-- ============================================================================
-- QUIZ DUPLICATE ATTEMPT CLEANUP
-- Auto-delete old incomplete attempts when student starts new quiz
-- Admin can manually delete duplicates for completed attempts
-- ============================================================================

-- ============================================================================
-- FUNCTION: Clean up old incomplete attempts for same user/quiz
-- Called automatically when a new attempt is created
-- ============================================================================
CREATE OR REPLACE FUNCTION cleanup_old_quiz_attempts()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete old INCOMPLETE attempts for the same user and quiz
  -- Keep only the newest attempt (which is the one being inserted)
  DELETE FROM quiz_attempts
  WHERE user_id = NEW.user_id
    AND quiz_id = NEW.quiz_id
    AND id != NEW.id
    AND is_completed = false;  -- Only delete incomplete attempts

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: Auto-cleanup on new quiz attempt
-- Fires AFTER INSERT to clean up old incomplete attempts
-- ============================================================================
DROP TRIGGER IF EXISTS trigger_cleanup_quiz_attempts ON quiz_attempts;

CREATE TRIGGER trigger_cleanup_quiz_attempts
  AFTER INSERT ON quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_old_quiz_attempts();

-- ============================================================================
-- FUNCTION: Admin manual cleanup of duplicate attempts
-- Keeps only the LATEST attempt per user per quiz (based on created_at)
-- Can be called for completed attempts as well
-- ============================================================================
CREATE OR REPLACE FUNCTION admin_cleanup_duplicate_attempts(
  p_user_id UUID,
  p_quiz_id UUID
)
RETURNS TABLE(deleted_count INTEGER) AS $$
DECLARE
  v_deleted_count INTEGER;
BEGIN
  -- Delete all attempts EXCEPT the latest one (highest created_at)
  WITH latest_attempt AS (
    SELECT id
    FROM quiz_attempts
    WHERE user_id = p_user_id
      AND quiz_id = p_quiz_id
    ORDER BY created_at DESC
    LIMIT 1
  )
  DELETE FROM quiz_attempts
  WHERE user_id = p_user_id
    AND quiz_id = p_quiz_id
    AND id NOT IN (SELECT id FROM latest_attempt);

  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

  RETURN QUERY SELECT v_deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- FUNCTION: Get users with duplicate attempts (for admin UI)
-- Returns list of users who have multiple attempts for same quiz
-- ============================================================================
CREATE OR REPLACE FUNCTION get_users_with_duplicate_attempts()
RETURNS TABLE(
  user_id UUID,
  quiz_id UUID,
  username TEXT,
  quiz_title TEXT,
  attempt_count BIGINT,
  latest_attempt_at TIMESTAMPTZ,
  has_completed BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qa.user_id,
    qa.quiz_id,
    p.username,
    q.title AS quiz_title,
    COUNT(qa.id) AS attempt_count,
    MAX(qa.created_at) AS latest_attempt_at,
    BOOL_OR(qa.is_completed) AS has_completed
  FROM quiz_attempts qa
  LEFT JOIN profiles p ON p.id = qa.user_id
  LEFT JOIN quizzes q ON q.id = qa.quiz_id
  GROUP BY qa.user_id, qa.quiz_id, p.username, q.title
  HAVING COUNT(qa.id) > 1
  ORDER BY attempt_count DESC, latest_attempt_at DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VERIFICATION & TESTING
-- ============================================================================

-- Test 1: Check for existing duplicates
-- SELECT * FROM get_users_with_duplicate_attempts();

-- Test 2: Manually clean up specific user's duplicates (admin function)
-- SELECT * FROM admin_cleanup_duplicate_attempts('user-uuid-here', 'quiz-uuid-here');

-- Test 3: Insert a new attempt and verify old incomplete ones are deleted
-- INSERT INTO quiz_attempts (user_id, quiz_id, total_questions, is_completed)
-- VALUES ('test-user-id', 'test-quiz-id', 10, false);

-- ============================================================================
-- NOTES
-- ============================================================================
--
-- Auto-Cleanup Behavior:
-- - Triggers when student starts a NEW quiz attempt
-- - Only deletes INCOMPLETE attempts (is_completed = false)
-- - Keeps the newest attempt (the one just created)
-- - Prevents duplicate "in progress" attempts in Live Monitoring
--
-- Manual Admin Cleanup:
-- - Function: admin_cleanup_duplicate_attempts(user_id, quiz_id)
-- - Keeps ONLY the latest attempt (by created_at)
-- - Works on both completed and incomplete attempts
-- - Cascades to delete associated quiz_responses (via FK)
--
-- Security:
-- - Auto-cleanup: Runs automatically, no permissions needed
-- - Manual cleanup: Should be called by admin UI only
-- - RLS policies still apply to quiz_attempts table
--
-- Edge Cases Handled:
-- ✅ Student abandons quiz and starts new one → Old one deleted
-- ✅ Student refreshes page during quiz → Keeps current attempt
-- ✅ Student has multiple completed attempts → Manual cleanup only
-- ✅ Responses are deleted via CASCADE when attempt deleted
