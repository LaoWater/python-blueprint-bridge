# Testing Admin UI - Step by Step Guide

## Current Status

I've added **debug indicators** to the WellnessOracle component that will show you exactly what's happening with admin permissions.

## What to Look For

When you navigate to the **Group Projects** page and click on **Wellness Oracle**, you'll see:

### Debug Info Box (Yellow/Red)

At the top of the Teams section, you'll see a colored box showing:

```
Debug: isAdmin = TRUE/FALSE | admin_level = X | profile exists = YES/NO
```

**This will tell us:**
1. Whether `isAdmin` is being set correctly
2. What your `admin_level` value is in the database
3. Whether your profile is being loaded at all

### If isAdmin = TRUE (You ARE an Admin)
You should see:
- Yellow debug box with your admin info
- **"Admin Edit Mode"** button (gray, with Settings icon)
- When you click it → button turns orange/yellow
- **"Create New Team"** button appears (green)
- Edit (blue) and Delete (red) buttons on each team card

### If isAdmin = FALSE (You are NOT an Admin)
You'll see:
- Red box saying "Admin controls hidden: Not an admin user"
- No admin buttons anywhere

## How to Fix Admin Access

### Step 1: Check Your User's Admin Level

Open your Supabase dashboard and run this query:

```sql
-- Check current admin level
SELECT id, username, admin_level
FROM profiles
WHERE id = auth.uid();

-- If you need to set yourself as admin:
UPDATE profiles
SET admin_level = 1
WHERE id = auth.uid();
```

### Step 2: Verify You're Logged In

1. Check browser console for the debug log:
   ```
   🔍 WellnessOracle Debug: { isAdmin: ..., profile: ..., adminLevel: ... }
   ```

2. Make sure you're logged in (check if profile exists)

### Step 3: Refresh the Page

After updating admin_level in database:
1. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
2. Or sign out and sign back in
3. Navigate to Group Projects → Wellness Oracle → Teams tab

## Testing the Admin Features

Once you see the admin buttons:

### Test 1: Toggle Admin Mode
1. Click "Admin Edit Mode" button
2. Button should turn orange/yellow
3. "Create New Team" button should appear
4. Edit/Delete buttons should appear on team cards

### Test 2: Edit a Team
1. Enable admin mode
2. Click blue Edit button on any team
3. Modal should open with all team fields
4. Change the team name
5. Click "Save Changes"
6. Toast notification should appear
7. Team name should update on the card

### Test 3: Create a Team
1. Enable admin mode
2. Click "Create New Team" (green button)
3. Fill in required fields (Name and Mission)
4. Add a task or two
5. Click "Create Team"
6. New team should appear in the grid

### Test 4: Delete a Team
1. Enable admin mode
2. Click red Delete button on a team WITHOUT members
3. Confirm the deletion dialog
4. Team should disappear
5. Try to delete a team WITH members → should show error

## Troubleshooting

### Debug shows: isAdmin = FALSE, admin_level = undefined
**Problem**: Profile not loaded or doesn't exist
**Fix**:
```sql
-- Check if profile exists
SELECT * FROM profiles WHERE id = auth.uid();

-- If missing, create it:
INSERT INTO profiles (id, admin_level)
VALUES (auth.uid(), 1);
```

### Debug shows: isAdmin = FALSE, admin_level = 0
**Problem**: You exist but aren't an admin
**Fix**:
```sql
UPDATE profiles SET admin_level = 1 WHERE id = auth.uid();
```

### Debug shows: isAdmin = TRUE but buttons don't work
**Problem**: JavaScript errors or database permissions
**Fix**:
1. Check browser console for errors
2. Check Supabase logs
3. Verify RLS policies allow updates

### Buttons appear but modal doesn't open
**Problem**: Modal state issue
**Fix**: Check console for errors, refresh page

## Database Permissions (RLS Policies)

Make sure these policies exist in Supabase:

```sql
-- Allow admins to update teams
CREATE POLICY "Admins can update project_teams"
ON project_teams
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.admin_level > 0
  )
);

-- Allow admins to insert teams
CREATE POLICY "Admins can insert project_teams"
ON project_teams
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.admin_level > 0
  )
);

-- Allow admins to delete teams
CREATE POLICY "Admins can delete project_teams"
ON project_teams
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.admin_level > 0
  )
);

-- Everyone can read teams
CREATE POLICY "Everyone can view project_teams"
ON project_teams
FOR SELECT
TO authenticated
USING (true);
```

## Next Steps After Testing

Once you confirm everything works:

1. **Remove Debug Code**: Delete the yellow/red debug boxes from WellnessOracle.tsx
2. **Remove Console Logs**: Remove the `console.log` statements
3. **Apply to Other Projects**: Use the same pattern for AIStudyBuddy and DJ Blue
4. **Add Database Policies**: Ensure RLS policies are in place

## Quick Start Commands

```bash
# Rebuild with debug info
npm run build:dev

# Start dev server
npm run dev

# Check for errors
npm run lint
```

## Expected Behavior Summary

| User Type | What They See |
|-----------|---------------|
| Regular User (admin_level = 0) | Normal team cards, no admin buttons |
| Admin User (admin_level > 0) | Normal view + "Admin Edit Mode" button |
| Admin in Edit Mode | All buttons: Toggle, Create, Edit, Delete |

## Contact/Issues

If something isn't working:
1. Take a screenshot of the debug box
2. Check browser console for errors
3. Check Supabase logs for database errors
4. Verify your admin_level in the database
