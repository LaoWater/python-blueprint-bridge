# Blue Pigeon Testing System

## Overview
A comprehensive proctored testing environment for coding assessments with real-time monitoring, anti-cheat measures, and admin supervision capabilities.

## Features

### 🎓 Student Features
- **Secure Code Editor**: Anti-cheat measures including:
  - Copy/paste blocking
  - Alt-tab detection and warnings
  - Right-click context menu disabled
  - Auto-save every 2 seconds
- **Test Interface**:
  - Clear instructions display
  - Time remaining countdown
  - Real-time save indicators
  - Submit functionality
- **Instructor Messages**: Receive help and warnings from instructors in real-time
- **Test History**: View past submissions and scores

### 👨‍🏫 Admin Features
- **Test Creation**:
  - Title, description, and detailed instructions
  - Starter code templates
  - Test cases for auto-grading (optional)
  - Time limits and scheduling (opens/closes dates)
  - Alt-tab warning thresholds
  - Partial submission settings

- **Test Management**:
  - Draft → Open → Closed workflow
  - View all tests and their status
  - Delete tests (cascades to submissions)

- **Live Monitoring Dashboard**:
  - Real-time grid view of all active students
  - Live code preview (updates every 5 seconds)
  - Activity indicators (green/yellow/red based on last activity)
  - Alt-tab violation counters
  - Keystroke count tracking

- **Intervention System**:
  - Send messages to students during test
  - Three intervention types:
    - 💬 Message (general communication)
    - 💡 Code Hint (helpful guidance)
    - ⚠️ Warning (disciplinary)
  - View full student code in dialog
  - Mark sessions as "viewing" (student sees indicator)
  - All interventions logged with code snapshots

### 📊 Statistics Dashboard
- Total tests created
- Active tests count
- Students currently online
- Pending grading queue

## Database Schema

### Tables Created
1. **tests** - Test definitions and configuration
2. **test_submissions** - Final student submissions
3. **test_editor_sessions** - Real-time editor state for monitoring
4. **test_admin_interventions** - Log of admin interactions

### Key Features
- Row Level Security (RLS) policies for data protection
- Real-time subscriptions via Supabase Realtime
- Automatic timestamp updates
- Helper functions for monitoring and statistics

## Installation

### 1. Run Database Migration
```bash
# In Supabase SQL Editor or via CLI
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/migrations/test-system.sql
```

Or via Supabase Dashboard:
1. Go to SQL Editor
2. Paste contents of `supabase/migrations/test-system.sql`
3. Run the migration

### 2. Enable Realtime
Ensure Supabase Realtime is enabled for:
- `test_editor_sessions`
- `test_admin_interventions`
- `test_submissions`

### 3. Update TypeScript Types
After running migrations, update Supabase types:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
```

## Usage Guide

### For Admins

#### Creating a Test
1. Navigate to `/test` (admin dashboard loads automatically)
2. Click **Create Test** tab
3. Fill in:
   - Test title and description
   - Detailed instructions
   - Starter code (optional)
   - Time limit (minutes)
   - Max alt-tab warnings
   - Schedule (optional: opens/closes dates)
   - Test cases for auto-grading (optional)
4. Click **Create Test (Draft)**
5. Test is created in "draft" status

#### Opening a Test
1. Go to **Manage Tests** tab
2. Find your test
3. Click the three-dot menu → **Open Test**
4. Test becomes available to students

#### Live Monitoring
1. Go to **Live Monitoring** tab
2. Select the test from dropdown
3. View grid of active students showing:
   - Real-time code preview
   - Last activity timestamp
   - Activity status (green/yellow/red)
   - Alt-tab violations
   - Submission status
4. Click **View Full** to see complete code
5. Click **Help** to send intervention messages

#### Sending Help/Warnings
1. In Live Monitoring, click **Help** on a student card
2. Select intervention type:
   - Message (general)
   - Code Hint (guidance)
   - Warning (disciplinary)
3. Type your message
4. Click **Send Intervention**
5. Student receives notification immediately

#### Closing a Test
1. **Manage Tests** tab → Find test → **Close Test**
2. All active sessions are ended
3. Students can no longer submit

### For Students

#### Taking a Test
1. Navigate to `/test`
2. View available tests
3. Read the warning about rules
4. Click **Start Test**
5. Acknowledge anti-cheat rules

#### During Test
- Code is auto-saved every 2 seconds
- Time remaining is displayed prominently
- **DO NOT**:
  - Alt-tab (triggers warnings)
  - Copy/paste (blocked)
  - Right-click (disabled)
- **Can**:
  - View instructions (collapsible at bottom)
  - Exit test (work is saved)
  - Submit early

#### Receiving Help
- Instructor messages appear as toast notifications
- Messages also show in right sidebar (if any)
- Click **Got it!** to acknowledge

#### Submitting
1. Review your code
2. Click **Submit Test**
3. Confirm submission
4. Cannot edit after submission

## Anti-Cheat Measures

### Active Protections
1. **Paste Blocking**: `onPaste` event prevented
2. **Copy Blocking**: `onCopy` event prevented
3. **Context Menu**: Right-click disabled via `onContextMenu`
4. **Alt-Tab Detection**: `visibilitychange` API monitors focus
5. **Activity Tracking**: All violations logged to database
6. **Session Monitoring**: Real-time updates to admin

### Warning System
- Alt-tab triggers immediate warning overlay
- Counter increments and syncs to database
- Configurable threshold per test (default: 3 warnings)
- Admin sees violation count in monitoring dashboard

### Data Logging
Every suspicious activity is logged with:
- Timestamp
- Activity type (alt_tab, paste_attempt)
- Count
- Stored in `suspicious_activity_log` JSON field

## Real-Time Architecture

### Supabase Channels
1. **`admin_interventions`** channel:
   - Listens for INSERT on `test_admin_interventions`
   - Filters by `student_id`
   - Student receives instant toast notification

2. **`test_sessions`** channel:
   - Monitors `test_editor_sessions` updates
   - Admin dashboard refreshes grid
   - Polls every 5 seconds for fallback

### Auto-Save Flow
```
Student types → Debounce 2s → Update submission + session → Admin sees change
```

## API & Helper Functions

### Database Functions

#### `get_live_test_monitoring(test_uuid)`
Returns real-time data for admin dashboard:
- Student username
- Current code
- Last activity timestamp
- Alt-tab count
- Keystrokes
- Submission status

#### `get_active_test_for_student(student_uuid)`
Returns active test for student:
- Test ID and title
- Submission ID
- Time remaining (calculated)

#### `auto_close_expired_tests()`
Closes tests past their `closes_at` timestamp

## Security Considerations

### RLS Policies
- Students can only view/edit their own submissions
- Admins (admin_level > 0) can view all
- Interventions require admin role to create
- Tests filtered by status for students

### Best Practices
1. **Admin Verification**: Always verify `admin_level` in profiles table
2. **Test Scheduling**: Use `opens_at`/`closes_at` for controlled access
3. **Session Cleanup**: Monitor `test_editor_sessions` for stale sessions
4. **Audit Trail**: `test_admin_interventions` provides complete interaction log

## Troubleshooting

### Students Not Appearing in Monitor
- Check test status is "open"
- Verify student started test (created submission)
- Ensure Realtime is enabled on tables
- Check browser console for subscription errors

### Auto-Save Not Working
- Verify student has active submission
- Check network tab for Supabase requests
- Ensure RLS policies allow UPDATE
- Confirm `updated_at` trigger is active

### Interventions Not Received
- Check Realtime channel subscription
- Verify student_id filter matches
- Ensure browser supports Realtime (WebSockets)
- Check Supabase project Realtime settings

### Alt-Tab Not Detected
- Only works when tab loses focus
- Browser must support `visibilitychange` API
- Some browsers may have privacy settings blocking this
- Test in Chrome/Firefox for best compatibility

## Performance Optimization

### Recommendations
- **Concurrent Students**: Limit to 20-30 per test session
- **Code Length**: Monitor for very long submissions (>10,000 chars)
- **Polling Interval**: Adjust from 5s to 10s if database load high
- **Session Cleanup**: Run periodic cleanup of old `test_editor_sessions`

### Monitoring Queries
```sql
-- Find stale sessions (no activity > 1 hour)
SELECT * FROM test_editor_sessions
WHERE last_activity < NOW() - INTERVAL '1 hour'
AND is_active = true;

-- Submission statistics
SELECT
  t.title,
  COUNT(*) as total_submissions,
  AVG(alt_tab_count) as avg_violations
FROM test_submissions ts
JOIN tests t ON t.id = ts.test_id
GROUP BY t.id, t.title;
```

## Future Enhancements

### Potential Features
- [ ] Auto-grading with test case execution
- [ ] Code similarity detection (plagiarism)
- [ ] Video proctoring integration
- [ ] Mobile device blocking
- [ ] Submission replay (keystroke playback)
- [ ] Analytics dashboard (performance trends)
- [ ] Batch interventions (message all students)
- [ ] Test templates library

### Known Limitations
- Copy-paste can be bypassed via browser DevTools (advanced users)
- Alt-tab detection doesn't work if browser window is minimized
- No camera/screen recording (requires separate integration)
- Code execution requires separate Python sandbox

## Support

For issues or feature requests:
1. Check this README first
2. Review Supabase logs for errors
3. Inspect browser console for client-side issues
4. Check RLS policies if permission errors occur

## License
Part of Blue Pigeon educational platform - See main project README for license details.
