# Quiz Duplicate Attempts - Auto Cleanup System

## Problem Statement

### Issue
Students with multiple quiz attempts for the same quiz caused problems:
1. **Live Monitoring Issues**: Multiple incomplete attempts appeared as separate "active" students
2. **Confusing UI**: Students abandoned quizzes and started new ones, leaving orphaned incomplete attempts
3. **Data Clutter**: Duplicate attempts made it hard to see actual student progress
4. **Admin Overhead**: Manual cleanup was needed to maintain data integrity

### Real-World Scenario
```
Student John:
- Starts Quiz A → Creates attempt #1 (incomplete)
- Refreshes page or closes browser
- Starts Quiz A again → Creates attempt #2 (incomplete)
- Admin sees 2 "active" Johns in Live Monitoring ❌
```

## Solution: Two-Tier Cleanup System

### 1. Automatic Cleanup (Students)
**When it happens**: Automatically when student starts a NEW quiz attempt
**What it does**: Deletes old INCOMPLETE attempts for same user/quiz
**Keeps**: Only the newest attempt (the one just created)

### 2. Manual Cleanup (Admins)
**When it happens**: Admin clicks "Delete Duplicates" button
**What it does**: Deletes ALL duplicates except the latest
**Works on**: Both completed and incomplete attempts

---

## Database Implementation

### Migration File
`supabase/migrations/20251008_quiz_duplicate_cleanup.sql`

### 1. Auto-Cleanup Function
```sql
CREATE OR REPLACE FUNCTION cleanup_old_quiz_attempts()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete old INCOMPLETE attempts for same user/quiz
  DELETE FROM quiz_attempts
  WHERE user_id = NEW.user_id
    AND quiz_id = NEW.quiz_id
    AND id != NEW.id
    AND is_completed = false;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Behavior**:
- Triggers AFTER INSERT on `quiz_attempts`
- Only deletes `is_completed = false` attempts
- Keeps the newly created attempt
- Cascades to delete associated `quiz_responses` (via FK)

### 2. Auto-Cleanup Trigger
```sql
CREATE TRIGGER trigger_cleanup_quiz_attempts
  AFTER INSERT ON quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_old_quiz_attempts();
```

### 3. Admin Manual Cleanup Function
```sql
CREATE OR REPLACE FUNCTION admin_cleanup_duplicate_attempts(
  p_user_id UUID,
  p_quiz_id UUID
)
RETURNS TABLE(deleted_count INTEGER) AS $$
-- Deletes all attempts except the latest (by created_at)
-- Works on both completed and incomplete attempts
$$
```

### 4. Duplicate Detection Function
```sql
CREATE OR REPLACE FUNCTION get_users_with_duplicate_attempts()
RETURNS TABLE(
  user_id UUID,
  quiz_id UUID,
  username TEXT,
  quiz_title TEXT,
  attempt_count BIGINT,
  latest_attempt_at TIMESTAMPTZ,
  has_completed BOOLEAN
)
-- Returns list of users with multiple attempts
```

---

## UI Components

### New Component: DuplicateAttemptsManager
**Location**: `src/components/quiz/DuplicateAttemptsManager.tsx`

**Features**:
- ✅ Table view of all users with duplicate attempts
- ✅ Shows attempt count, status, latest attempt time
- ✅ "Delete Duplicates" button for each user
- ✅ Confirmation dialog before deletion
- ✅ Refresh button to reload data
- ✅ Loading states and error handling

**How it works**:
1. Calls `get_users_with_duplicate_attempts()` to fetch duplicates
2. Displays in table with key info
3. Admin clicks "Delete Duplicates"
4. Confirmation dialog warns which attempts will be deleted
5. Calls `admin_cleanup_duplicate_attempts(user_id, quiz_id)`
6. Shows toast notification with deletion count
7. Refreshes the list

### Integration with AdminQuizDashboard
**Updated**: `src/components/quiz/AdminQuizDashboard.tsx`

**Changes**:
- Added new "Manage Duplicates" tab
- Updated tabs from 2 to 3 columns
- Imported `DuplicateAttemptsManager` component

**Tab Structure**:
```
[View Results] [Live Monitoring] [Manage Duplicates]
```

---

## User Flows

### Auto-Cleanup Flow (Student)
```
1. Student opens /live-quiz
2. Clicks "Start Quiz"
3. System creates new quiz_attempt (INSERT)
4. Trigger fires automatically
5. Deletes any old INCOMPLETE attempts for same student/quiz
6. Student sees only current attempt
7. Admin sees only current attempt in Live Monitoring ✅
```

### Manual Cleanup Flow (Admin)
```
1. Admin opens /live-quiz
2. Navigates to "Manage Duplicates" tab
3. Sees table of users with multiple attempts
4. Clicks "Delete Duplicates" for specific user
5. Confirmation dialog shows:
   - Student name
   - Quiz title
   - How many attempts will be deleted
   - Warning that only latest is kept
6. Admin confirms
7. System deletes duplicates
8. Toast shows "Deleted X duplicate attempts"
9. Table refreshes
```

---

## Examples

### Example 1: Student Abandons Quiz
**Before Auto-Cleanup**:
```
quiz_attempts table:
| id  | user_id | quiz_id | is_completed | created_at          |
|-----|---------|---------|--------------|---------------------|
| 001 | john    | quiz-1  | false        | 2024-01-01 10:00:00 |
| 002 | john    | quiz-1  | false        | 2024-01-01 10:15:00 |

Admin sees: 2 active Johns in Live Monitoring
```

**After Auto-Cleanup**:
```
quiz_attempts table:
| id  | user_id | quiz_id | is_completed | created_at          |
|-----|---------|---------|--------------|---------------------|
| 002 | john    | quiz-1  | false        | 2024-01-01 10:15:00 |

Admin sees: 1 active John in Live Monitoring ✅
```

### Example 2: Student Has Multiple Completed Attempts
**Scenario**: Student retook quiz multiple times (all completed)

**Before Manual Cleanup**:
```
quiz_attempts table:
| id  | user_id | quiz_id | is_completed | score | created_at          |
|-----|---------|---------|--------------|-------|---------------------|
| 001 | sarah   | quiz-1  | true         | 65    | 2024-01-01 10:00:00 |
| 002 | sarah   | quiz-1  | true         | 78    | 2024-01-01 11:00:00 |
| 003 | sarah   | quiz-1  | true         | 92    | 2024-01-01 12:00:00 |

Duplicate Manager shows: Sarah - 3 attempts - Has Completed
```

**After Admin Clicks "Delete Duplicates"**:
```
quiz_attempts table:
| id  | user_id | quiz_id | is_completed | score | created_at          |
|-----|---------|---------|--------------|-------|---------------------|
| 003 | sarah   | quiz-1  | true         | 92    | 2024-01-01 12:00:00 |

Only the LATEST attempt (highest score, most recent) is kept
```

---

## Safety Features

### Auto-Cleanup Safety
✅ **Only incomplete attempts**: Never deletes completed quizzes automatically
✅ **Same user/quiz only**: Won't affect other students or quizzes
✅ **Keeps newest**: Always preserves the current attempt
✅ **Cascade deletes**: Removes orphaned quiz_responses automatically

### Manual Cleanup Safety
✅ **Confirmation dialog**: Admin must confirm before deletion
✅ **Shows impact**: Displays how many attempts will be deleted
✅ **Latest preserved**: Always keeps most recent attempt
✅ **Admin only**: Requires admin privileges to execute
✅ **Toast feedback**: Shows success/error messages

### Edge Cases Handled
| Scenario | Behavior |
|----------|----------|
| Student has 1 attempt | No deletion (nothing to clean) |
| Student completes quiz, starts new one | Auto-deletes old completed attempt ❌ NOPE! Only deletes incomplete |
| Student refreshes during quiz | Keeps current attempt, no duplicates created |
| Multiple students, same quiz | Each student's cleanup is isolated |
| Orphaned responses | Deleted via CASCADE when attempt deleted |
| Admin deletes while student active | Latest attempt preserved, student unaffected |

---

## Testing

### Test Auto-Cleanup
```sql
-- 1. Create first attempt
INSERT INTO quiz_attempts (user_id, quiz_id, total_questions, is_completed)
VALUES ('test-user', 'test-quiz', 10, false);
-- Result: 1 attempt exists

-- 2. Create second attempt (trigger fires)
INSERT INTO quiz_attempts (user_id, quiz_id, total_questions, is_completed)
VALUES ('test-user', 'test-quiz', 10, false);
-- Result: Only 2nd attempt exists, 1st deleted automatically ✅

-- 3. Complete the quiz
UPDATE quiz_attempts SET is_completed = true WHERE user_id = 'test-user';

-- 4. Create third attempt
INSERT INTO quiz_attempts (user_id, quiz_id, total_questions, is_completed)
VALUES ('test-user', 'test-quiz', 10, false);
-- Result: Both 2nd (completed) and 3rd (incomplete) exist
-- Trigger only deletes INCOMPLETE attempts ✅
```

### Test Manual Cleanup
```sql
-- 1. Check for duplicates
SELECT * FROM get_users_with_duplicate_attempts();
-- Should show user with multiple attempts

-- 2. Manual cleanup
SELECT * FROM admin_cleanup_duplicate_attempts('user-id', 'quiz-id');
-- Returns: {deleted_count: 2} (if had 3 attempts)

-- 3. Verify
SELECT * FROM quiz_attempts WHERE user_id = 'user-id' AND quiz_id = 'quiz-id';
-- Should only show 1 attempt (the latest)
```

### UI Testing Checklist
- [ ] Student starts quiz → Old incomplete attempts deleted
- [ ] Student completes quiz → No auto-deletion
- [ ] Student starts new quiz after completion → Old completed NOT deleted
- [ ] Admin sees "Manage Duplicates" tab
- [ ] Duplicates table shows users with multiple attempts
- [ ] "Delete Duplicates" button works
- [ ] Confirmation dialog appears
- [ ] Deletion count shown in toast
- [ ] Table refreshes after deletion
- [ ] No duplicates remain after cleanup

---

## Performance Impact

### Database Operations
- **Auto-Cleanup**: Runs on INSERT (minimal overhead)
- **Trigger Execution**: Microseconds for typical case (1-2 old attempts)
- **Manual Cleanup**: Admin-initiated, not in critical path
- **Cascade Deletes**: Handled efficiently by PostgreSQL

### Expected Load
- **Auto-Cleanup**: Once per quiz start (low frequency)
- **Manual Cleanup**: Rare (only when admin notices duplicates)
- **No polling**: No continuous database queries
- **Indexed columns**: user_id, quiz_id already indexed

---

## Migration Application

### Via Supabase Dashboard
1. Go to Supabase SQL Editor
2. Open `20251008_quiz_duplicate_cleanup.sql`
3. Copy entire content
4. Paste and execute
5. Verify with: `SELECT * FROM get_users_with_duplicate_attempts();`

### Rollback (if needed)
```sql
-- Remove trigger
DROP TRIGGER IF EXISTS trigger_cleanup_quiz_attempts ON quiz_attempts;

-- Remove functions
DROP FUNCTION IF EXISTS cleanup_old_quiz_attempts();
DROP FUNCTION IF EXISTS admin_cleanup_duplicate_attempts(UUID, UUID);
DROP FUNCTION IF EXISTS get_users_with_duplicate_attempts();
```

---

## Monitoring

### Check for Duplicates
```sql
SELECT * FROM get_users_with_duplicate_attempts();
```

### View Cleanup History
```sql
-- Check recent quiz attempts per user
SELECT user_id, quiz_id, COUNT(*) as attempt_count
FROM quiz_attempts
GROUP BY user_id, quiz_id
HAVING COUNT(*) > 1;
```

### Verify Auto-Cleanup Working
```sql
-- Check for multiple incomplete attempts (should be 0)
SELECT user_id, quiz_id, COUNT(*) as incomplete_count
FROM quiz_attempts
WHERE is_completed = false
GROUP BY user_id, quiz_id
HAVING COUNT(*) > 1;
```

---

## Related Files

### Database
- `supabase/migrations/20251008_quiz_duplicate_cleanup.sql` - Migration
- `supabase/migrations/20251008_admin_rls_policies.sql` - Admin RLS policies

### Frontend
- `src/components/quiz/DuplicateAttemptsManager.tsx` - New component
- `src/components/quiz/AdminQuizDashboard.tsx` - Updated with new tab
- `src/pages/LiveQuizPage.tsx` - Student quiz interface

### Documentation
- `QUIZ_ADMIN_DASHBOARD.md` - Admin dashboard overview
- `ADMIN_RLS_FIX.md` - RLS policies documentation
- `QUIZ_FOREIGN_KEY_FIX.md` - Foreign key fix documentation

---

## Summary

### What Was Built
✅ Auto-delete old incomplete attempts when student starts new quiz
✅ Admin UI to manually delete duplicates (completed or incomplete)
✅ Detection function to find users with multiple attempts
✅ Safe deletion with confirmation dialogs
✅ Comprehensive error handling and user feedback

### Problem Solved
❌ **Before**: Students with abandoned quizzes showed as multiple active users
✅ **After**: Only current attempt appears, clean data, accurate monitoring

### Key Benefits
1. **Clean Live Monitoring**: Only see actual active students
2. **Accurate Stats**: No inflated attempt counts
3. **Better UX**: Students don't see old abandoned attempts
4. **Admin Control**: Manual cleanup for edge cases
5. **Automatic**: Zero maintenance for normal flow

🎉 **Status**: Complete and ready to use!
