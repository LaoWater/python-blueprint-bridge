-- ==============================================================
-- Blue Pigeon Group Projects - RLS Policy Fix
-- Fixing infinite recursion in project_participants policies
-- ==============================================================

-- Drop the problematic policies
DROP POLICY IF EXISTS "Users can view project participants" ON project_participants;
DROP POLICY IF EXISTS "Users can join projects" ON project_participants;
DROP POLICY IF EXISTS "Users can update their own participation" ON project_participants;

-- Create simplified, non-recursive policies for project_participants
-- Users can view all project participants (no recursion)
CREATE POLICY "Users can view all project participants" ON project_participants
  FOR SELECT USING (true);

-- Users can only insert their own participation records
CREATE POLICY "Users can insert their own participation" ON project_participants
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can only update their own participation records
CREATE POLICY "Users can update their own participation" ON project_participants
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Users can only delete their own participation records
CREATE POLICY "Users can delete their own participation" ON project_participants
  FOR DELETE USING (user_id = auth.uid());

-- Also simplify project_tasks policies to avoid potential recursion
DROP POLICY IF EXISTS "Team members can view their team tasks" ON project_tasks;
DROP POLICY IF EXISTS "Team members can manage tasks" ON project_tasks;

-- Create simplified policies for project_tasks
CREATE POLICY "Users can view all project tasks" ON project_tasks
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their assigned tasks" ON project_tasks
  FOR ALL USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level >= 2
    )
  );

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'RLS policies fixed! Infinite recursion resolved.';
  RAISE NOTICE 'Project participants policies updated to be non-recursive.';
  RAISE NOTICE 'Project tasks policies simplified.';
END;
$$;