-- Admin Team Management RLS Policies
-- This migration adds Row Level Security policies to allow admins to manage project teams

-- First, enable RLS on project_teams if not already enabled
ALTER TABLE project_teams ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Everyone can view project_teams" ON project_teams;
DROP POLICY IF EXISTS "Admins can insert project_teams" ON project_teams;
DROP POLICY IF EXISTS "Admins can update project_teams" ON project_teams;
DROP POLICY IF EXISTS "Admins can delete project_teams" ON project_teams;

-- Policy 1: Everyone can view teams (SELECT)
-- All authenticated users can see team information
CREATE POLICY "Everyone can view project_teams"
ON project_teams
FOR SELECT
TO authenticated
USING (true);

-- Policy 2: Admins can create teams (INSERT)
-- Only users with admin_level > 0 can create new teams
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

-- Policy 3: Admins can update teams (UPDATE)
-- Only users with admin_level > 0 can modify teams
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
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.admin_level > 0
  )
);

-- Policy 4: Admins can delete teams (DELETE)
-- Only users with admin_level > 0 can delete teams
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

-- Add helpful comment
COMMENT ON TABLE project_teams IS 'Project teams with admin-only modification rights. All authenticated users can view, only admins (admin_level > 0) can create, update, or delete.';

-- Verify policies are in place
DO $$
BEGIN
  RAISE NOTICE 'Admin team management policies created successfully!';
  RAISE NOTICE 'Policies in place:';
  RAISE NOTICE '  - SELECT: All authenticated users';
  RAISE NOTICE '  - INSERT: Admins only (admin_level > 0)';
  RAISE NOTICE '  - UPDATE: Admins only (admin_level > 0)';
  RAISE NOTICE '  - DELETE: Admins only (admin_level > 0)';
END $$;
