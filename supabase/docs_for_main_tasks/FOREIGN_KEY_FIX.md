# Foreign Key Ambiguity Fix

## Issue
Supabase returned error `PGRST201`: "Could not embed because more than one relationship was found for 'test_submissions' and 'profiles'"

## Root Cause
The `test_submissions` table has multiple foreign keys referencing the `profiles` table:
1. `student_id` → `profiles(id)`
2. `graded_by` → `profiles(id)`

When using `.select('*, profiles(username)')`, Supabase doesn't know which relationship to use.

## Solution
Use explicit foreign key names in the select statement:

### Before (Ambiguous):
```typescript
.select('*, profiles(username)')
.select('*, tests(*)')
```

### After (Explicit):
```typescript
.select('*, profiles!test_submissions_student_id_fkey(username)')
.select('*, tests!test_submissions_test_id_fkey(*)')
```

## Files Fixed

### 1. SubmissionsViewer.tsx
- Line 69: `profiles!test_submissions_student_id_fkey(username)`
- Added DialogDescription for accessibility

### 2. StudentTestView.tsx
- Line 73: `tests!test_submissions_test_id_fkey(*)`
- Line 299: `tests!test_submissions_test_id_fkey(*)`

### 3. LiveMonitoringGrid.tsx
- Line 116: `profiles!test_editor_sessions_student_id_fkey(id, username)`

## How to Find Foreign Key Names

### Method 1: Supabase Dashboard
1. Go to Database → Tables
2. Select your table (e.g., `test_submissions`)
3. Click "Foreign Keys" tab
4. Copy the constraint name

### Method 2: SQL Query
```sql
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'test_submissions';
```

### Method 3: Error Message
When Supabase returns PGRST201, check the `details` field:
```json
{
  "details": [
    "test_submissions_student_id_fkey",
    "test_submissions_graded_by_fkey"
  ]
}
```

## Testing

### Test Submissions Viewer:
1. Admin → Manage Tests → View Submissions
2. Should load without "PGRST201" error
3. Student usernames should display correctly

### Test Student View:
1. Student starts a test
2. No console errors about profile relationships
3. Completed tests section loads with test titles

### Test Live Monitoring:
1. Admin → Live Monitoring
2. Students appear with usernames (not "Unknown")
3. No foreign key errors in console

## Best Practice
Always use explicit foreign key names when:
- Table has multiple FKs to same target table
- Using PostgREST/Supabase embedding
- Dealing with self-referential relationships

## Status
✅ All foreign key ambiguities resolved
✅ Accessibility warnings fixed (DialogDescription added)
✅ System ready for testing
