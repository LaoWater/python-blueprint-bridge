-- ==============================================================
-- Add deliverables and required_skills to get_project_teams_with_members
-- ==============================================================

-- Update the function to include deliverables and required_skills
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
  team_deliverables JSONB,
  team_required_skills JSONB,
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
    pt.deliverables as team_deliverables,
    pt.required_skills as team_required_skills,
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

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_project_teams_with_members(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_project_teams_with_members(UUID) TO anon;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Updated get_project_teams_with_members to include deliverables and required_skills!';
  RAISE NOTICE '📦 Teams now return deliverables array';
  RAISE NOTICE '🎯 Teams now return required_skills array';
END;
$$;
