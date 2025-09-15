-- ==============================================================
-- Blue Pigeon Group Projects - Multi-Team Membership Update
-- Allow users to join up to 3 teams and increase max members
-- ==============================================================

-- Update DJ Blue project max participants to 25
UPDATE group_projects
SET max_participants = 25
WHERE name LIKE '%DJ Blue%';

-- Remove the unique constraint that prevents users from joining multiple teams
ALTER TABLE project_participants
DROP CONSTRAINT IF EXISTS pp_user_project_unique;

-- Add a new constraint to allow up to 3 team memberships per project
-- First, let's create a function to check team count
CREATE OR REPLACE FUNCTION check_user_team_limit()
RETURNS TRIGGER AS $$
DECLARE
  team_count INTEGER;
BEGIN
  -- Count active team memberships for this user in this project
  SELECT COUNT(*)
  INTO team_count
  FROM project_participants
  WHERE user_id = NEW.user_id
    AND project_id = NEW.project_id
    AND team_id IS NOT NULL
    AND status = 'active';

  -- Allow up to 3 teams
  IF team_count >= 3 THEN
    RAISE EXCEPTION 'User can join maximum 3 teams per project';
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to enforce 3-team limit
CREATE TRIGGER check_team_limit_trigger
  BEFORE INSERT OR UPDATE ON project_participants
  FOR EACH ROW
  WHEN (NEW.team_id IS NOT NULL AND NEW.status = 'active')
  EXECUTE FUNCTION check_user_team_limit();

-- Update RPC function to handle multiple team memberships
CREATE OR REPLACE FUNCTION join_project_team(
  p_project_id UUID,
  p_team_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  user_uuid UUID;
  project_exists BOOLEAN;
  team_has_space BOOLEAN := true;
  user_team_count INTEGER := 0;
  existing_membership BOOLEAN := false;
  result JSONB;
BEGIN
  -- Get current user
  user_uuid := auth.uid();

  IF user_uuid IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- Check if project exists
  SELECT EXISTS(SELECT 1 FROM group_projects WHERE id = p_project_id AND status = 'active')
  INTO project_exists;

  IF NOT project_exists THEN
    RETURN jsonb_build_object('success', false, 'error', 'Project not found or not active');
  END IF;

  -- Check if user is already in this specific team
  SELECT EXISTS(
    SELECT 1 FROM project_participants
    WHERE user_id = user_uuid
    AND project_id = p_project_id
    AND team_id = p_team_id
    AND status = 'active'
  ) INTO existing_membership;

  IF existing_membership THEN
    RETURN jsonb_build_object('success', false, 'error', 'Already a member of this team');
  END IF;

  -- Check team space (if team specified)
  IF p_team_id IS NOT NULL THEN
    SELECT (current_members < max_members)
    INTO team_has_space
    FROM project_teams
    WHERE id = p_team_id;

    IF NOT team_has_space THEN
      RETURN jsonb_build_object('success', false, 'error', 'Team is full');
    END IF;
  END IF;

  -- Check user's current team count
  SELECT COUNT(*)
  INTO user_team_count
  FROM project_participants
  WHERE user_id = user_uuid
    AND project_id = p_project_id
    AND team_id IS NOT NULL
    AND status = 'active';

  IF user_team_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', 'You can join maximum 3 teams per project');
  END IF;

  -- Insert new team membership (don't update existing - allow multiple teams)
  INSERT INTO project_participants (project_id, user_id, team_id, status)
  VALUES (p_project_id, user_uuid, p_team_id, 'active');

  RETURN jsonb_build_object('success', true, 'message', 'Successfully joined team');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create function to leave a specific team
CREATE OR REPLACE FUNCTION leave_project_team(
  p_project_id UUID,
  p_team_id UUID
)
RETURNS JSONB AS $$
DECLARE
  user_uuid UUID;
  membership_exists BOOLEAN := false;
BEGIN
  -- Get current user
  user_uuid := auth.uid();

  IF user_uuid IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- Check if user is in this team
  SELECT EXISTS(
    SELECT 1 FROM project_participants
    WHERE user_id = user_uuid
    AND project_id = p_project_id
    AND team_id = p_team_id
    AND status = 'active'
  ) INTO membership_exists;

  IF NOT membership_exists THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not a member of this team');
  END IF;

  -- Remove from team (set status to inactive instead of deleting)
  UPDATE project_participants
  SET status = 'inactive', updated_at = NOW()
  WHERE user_id = user_uuid
    AND project_id = p_project_id
    AND team_id = p_team_id
    AND status = 'active';

  RETURN jsonb_build_object('success', true, 'message', 'Successfully left team');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Update function to get user's teams for a project
CREATE OR REPLACE FUNCTION get_user_teams(p_project_id UUID)
RETURNS TABLE (
  team_id UUID,
  team_name VARCHAR(255),
  team_icon VARCHAR(50),
  team_color_scheme VARCHAR(50),
  joined_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pt.id as team_id,
    pt.name as team_name,
    pt.icon as team_icon,
    pt.color_scheme as team_color_scheme,
    pp.joined_at
  FROM project_participants pp
  JOIN project_teams pt ON pp.team_id = pt.id
  WHERE pp.user_id = auth.uid()
    AND pp.project_id = p_project_id
    AND pp.status = 'active'
  ORDER BY pp.joined_at;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Multi-team membership enabled successfully!';
  RAISE NOTICE 'Users can now join up to 3 teams per project';
  RAISE NOTICE 'DJ Blue project max participants increased to 25';
  RAISE NOTICE 'Added leave_project_team and get_user_teams functions';
END;
$$;