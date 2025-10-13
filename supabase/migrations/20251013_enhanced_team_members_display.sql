-- ==============================================================
-- Enhanced Team Members Display
-- Optimized function to fetch all teams with their members in one call
-- ==============================================================

-- Create an enhanced function to get all teams with members for a project
-- This reduces API calls by fetching everything in one query
CREATE OR REPLACE FUNCTION get_project_teams_with_members(p_project_id UUID)
RETURNS TABLE (
  team_id UUID,
  team_name VARCHAR(255),
  team_description TEXT,
  team_icon VARCHAR(50),
  team_color_scheme VARCHAR(50),
  team_max_members INTEGER,
  team_current_members INTEGER,
  team_difficulty_stars INTEGER,
  team_mission TEXT,
  team_tasks JSONB,
  team_vibe TEXT,
  team_sort_order INTEGER,
  members JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pt.id as team_id,
    pt.name as team_name,
    pt.description as team_description,
    pt.icon as team_icon,
    pt.color_scheme as team_color_scheme,
    pt.max_members as team_max_members,
    pt.current_members as team_current_members,
    pt.difficulty_stars as team_difficulty_stars,
    pt.mission as team_mission,
    pt.tasks as team_tasks,
    pt.team_vibe as team_vibe,
    pt.sort_order as team_sort_order,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'user_id', pp.user_id,
            'username', prof.username,
            'role', pp.role,
            'joined_at', pp.joined_at,
            'contribution_score', pp.contribution_score,
            'admin_level', prof.admin_level,
            'avatar_url', prof.avatar_url
          )
          ORDER BY pp.joined_at ASC
        )
        FROM project_participants pp
        JOIN profiles prof ON pp.user_id = prof.id
        WHERE pp.team_id = pt.id
          AND pp.status = 'active'
      ),
      '[]'::jsonb
    ) as members
  FROM project_teams pt
  WHERE pt.project_id = p_project_id
  ORDER BY pt.sort_order;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create a function to get user's memberships across all teams in a project
CREATE OR REPLACE FUNCTION get_user_all_team_memberships(p_project_id UUID)
RETURNS TABLE (
  team_id UUID,
  team_name VARCHAR(255),
  team_icon VARCHAR(50),
  team_color_scheme VARCHAR(50),
  joined_at TIMESTAMP WITH TIME ZONE,
  role VARCHAR(50),
  contribution_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pt.id as team_id,
    pt.name as team_name,
    pt.icon as team_icon,
    pt.color_scheme as team_color_scheme,
    pp.joined_at,
    pp.role,
    pp.contribution_score
  FROM project_participants pp
  JOIN project_teams pt ON pp.team_id = pt.id
  WHERE pp.user_id = auth.uid()
    AND pp.project_id = p_project_id
    AND pp.status = 'active'
  ORDER BY pp.joined_at;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Add avatar_url column to profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url TEXT;
  END IF;
END $$;

-- Create a function to generate avatar initials or URL
CREATE OR REPLACE FUNCTION get_user_avatar_data(p_username VARCHAR(255), p_avatar_url TEXT)
RETURNS JSONB AS $$
DECLARE
  initials TEXT;
  name_parts TEXT[];
BEGIN
  -- If avatar URL exists, return it
  IF p_avatar_url IS NOT NULL AND p_avatar_url != '' THEN
    RETURN jsonb_build_object(
      'type', 'url',
      'value', p_avatar_url
    );
  END IF;

  -- Generate initials from username
  name_parts := string_to_array(p_username, ' ');

  IF array_length(name_parts, 1) >= 2 THEN
    initials := upper(substring(name_parts[1] from 1 for 1)) || upper(substring(name_parts[2] from 1 for 1));
  ELSE
    initials := upper(substring(p_username from 1 for 2));
  END IF;

  RETURN jsonb_build_object(
    'type', 'initials',
    'value', initials
  );
END;
$$ language 'plpgsql' IMMUTABLE;

-- Update the get_team_members function to include avatar data
CREATE OR REPLACE FUNCTION get_team_members(p_team_id UUID)
RETURNS TABLE (
  user_id UUID,
  username VARCHAR(255),
  role VARCHAR(50),
  joined_at TIMESTAMP WITH TIME ZONE,
  contribution_score INTEGER,
  admin_level INTEGER,
  avatar_url TEXT,
  avatar_data JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pp.user_id,
    prof.username,
    pp.role,
    pp.joined_at,
    pp.contribution_score,
    prof.admin_level,
    prof.avatar_url,
    get_user_avatar_data(prof.username, prof.avatar_url) as avatar_data
  FROM project_participants pp
  JOIN profiles prof ON pp.user_id = prof.id
  WHERE pp.team_id = p_team_id
    AND pp.status = 'active'
  ORDER BY pp.joined_at ASC;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_project_teams_with_members(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_all_team_memberships(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_avatar_data(VARCHAR, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_team_members(UUID) TO authenticated;

-- Create an index for faster team member lookups
CREATE INDEX IF NOT EXISTS idx_project_participants_team_status
  ON project_participants(team_id, status)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_project_participants_user_project_status
  ON project_participants(user_id, project_id, status)
  WHERE status = 'active';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Enhanced team members display created successfully!';
  RAISE NOTICE '📊 New function: get_project_teams_with_members(project_id)';
  RAISE NOTICE '👥 Returns all teams with their complete member lists in ONE call';
  RAISE NOTICE '🎨 Includes avatar support (URL or generated initials)';
  RAISE NOTICE '⚡ Optimized indexes added for faster queries';
  RAISE NOTICE '🚀 No more thousands of API requests - everything in one go!';
END;
$$;
