# Admin RLS (Row Level Security) Fix

## Issue
Admins couldn't view student quiz attempts or responses in the Live Quiz Monitoring dashboard due to missing RLS policies. The database was blocking admin access to:
- `quiz_attempts` table
- `quiz_responses` table
- Quiz metadata tables

This caused the Live Monitoring feature to show 0 students even when students were actively taking quizzes.

## Root Cause
The quiz system tables had RLS policies that only allowed:
- Students to view their own attempts/responses
- Everyone to view active quizzes and questions

But there were **NO policies for admin access**, so admins (even with `admin_level > 0`) were treated as regular users and couldn't see other students' data.

## Solution
Created comprehensive admin RLS policies in:
`supabase/migrations/20251008_admin_rls_policies.sql`

### What the Migration Does:

#### 1. Quiz System Admin Policies
Adds full admin access to all quiz tables:

- **quizzes**: Admins can create, read, update, delete (all operations)
- **quiz_questions**: Admins can manage all questions
- **quiz_attempts**: Admins can view, update, and delete all student attempts
- **quiz_responses**: Admins can view, update, and delete all student responses

#### 2. Admin Detection
All policies use the same admin check:
```sql
EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.id = auth.uid()
  AND profiles.admin_level > 0
)
```

This means any user with `admin_level > 0` in the `profiles` table gets full access.

#### 3. Security Model
- **Students** (`admin_level = 0` or `NULL`): Can only see their own data
- **Admins** (`admin_level > 0`): Can see and manage ALL data
- **Public**: Can view active quizzes and questions only

## How to Apply the Migration

### Option 1: Via Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file: `supabase/migrations/20251008_admin_rls_policies.sql`
4. Copy the entire SQL content
5. Paste into the SQL Editor
6. Click **Run**

### Option 2: Via Supabase CLI (If installed)
```bash
supabase db push
```

### Option 3: Manual Application
1. Log into Supabase Studio
2. Go to SQL Editor
3. Run the SQL from `20251008_admin_rls_policies.sql`

## What This Fixes

### Before:
❌ Admin navigates to `/live-quiz`
❌ Live Monitoring shows "0 online" even with active students
❌ QuizResultsViewer shows "No quiz attempts yet"
❌ Console shows RLS policy violation errors

### After:
✅ Admin can see all student quiz attempts
✅ Live Monitoring displays active students in real-time
✅ Progress bars update as students answer questions
✅ Admin can view detailed results for any student
✅ Admin can update/delete attempts if needed

## Tables Affected

### Quiz System:
- `quizzes` - Quiz metadata
- `quiz_questions` - Question bank
- `quiz_attempts` - Student quiz attempts
- `quiz_responses` - Individual question answers

### Coding Test System:
Already has admin policies in place from `3-Oct-Lovable-latest-dbschema-load.sql`:
- `tests` - Test metadata ✅
- `test_questions` - Test questions ✅
- `test_submissions` - Code submissions ✅
- `test_student_questions` - Q&A system ✅

## Testing the Fix

### 1. Verify Admin User
Check your admin status:
```sql
SELECT id, username, admin_level
FROM profiles
WHERE id = auth.uid();
```
Ensure `admin_level > 0`.

### 2. Test Quiz Attempts Access
```sql
-- Should return ALL quiz attempts (not just your own)
SELECT * FROM quiz_attempts;
```

### 3. Test Quiz Responses Access
```sql
-- Should return ALL student responses
SELECT * FROM quiz_responses;
```

### 4. Test Live Monitoring
1. Have a student start a quiz at `/live-quiz`
2. Open admin view at `/live-quiz`
3. Go to "Live Monitoring" tab
4. Should see student appear in the grid
5. Watch progress update as student answers questions

### 5. Test Results Viewer
1. Go to "View Results" tab
2. Should see all quiz attempts
3. Click "View Details" on any attempt
4. Should see question-by-question breakdown

## Verification Queries

Run these in Supabase SQL Editor to verify policies are in place:

```sql
-- Check quiz_attempts policies
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'quiz_attempts';

-- Check quiz_responses policies
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'quiz_responses';

-- Should see policies like:
-- "Admins can view all quiz attempts"
-- "Admins can update quiz attempts"
-- "Admins can view all quiz responses"
-- etc.
```

## Policy Details

### Full Admin Permissions:

| Table | Select | Insert | Update | Delete |
|-------|--------|--------|--------|--------|
| quizzes | ✅ | ✅ | ✅ | ✅ |
| quiz_questions | ✅ | ✅ | ✅ | ✅ |
| quiz_attempts | ✅ | ❌ | ✅ | ✅ |
| quiz_responses | ✅ | ❌ | ✅ | ✅ |

*Note: Admins don't need INSERT on attempts/responses since students create those*

## Troubleshooting

### Still can't see student data?
1. Check your `admin_level`:
   ```sql
   SELECT admin_level FROM profiles WHERE id = auth.uid();
   ```
   Should be `> 0` (e.g., 1, 2, 3)

2. Verify policies were created:
   ```sql
   SELECT COUNT(*) FROM pg_policies
   WHERE tablename IN ('quiz_attempts', 'quiz_responses')
   AND policyname LIKE 'Admins%';
   ```
   Should return at least 6 policies

3. Check for policy conflicts:
   ```sql
   SELECT * FROM pg_policies
   WHERE tablename = 'quiz_attempts';
   ```
   Look for any USING clauses that might conflict

### Still seeing RLS errors?
- Clear browser cache
- Log out and log back in
- Check Supabase logs for specific error messages

## Impact on Existing Data

✅ **Safe Migration**: This migration only ADDS policies, doesn't modify existing data
✅ **No Downtime**: Can be applied while system is running
✅ **Backwards Compatible**: Student policies remain unchanged
✅ **No Data Loss**: No DELETE or DROP operations

## Related Files

- **Migration**: `supabase/migrations/20251008_admin_rls_policies.sql`
- **Components Fixed**:
  - `src/components/quiz/AdminQuizDashboard.tsx`
  - `src/components/quiz/LiveQuizMonitoring.tsx`
  - `src/components/quiz/QuizResultsViewer.tsx`
- **Documentation**:
  - `QUIZ_ADMIN_DASHBOARD.md` - Admin dashboard overview
  - `QUIZ_FOREIGN_KEY_FIX.md` - Previous foreign key fix

## Summary

This migration grants admin users (`admin_level > 0`) full access to quiz and test monitoring features by adding RLS policies that explicitly allow admins to view and manage student quiz attempts, responses, and related data. This enables the Live Quiz Monitoring dashboard to function correctly for admins while maintaining security for regular students.

🎉 **Status**: Ready to apply and test!
