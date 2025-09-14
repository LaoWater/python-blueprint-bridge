-- Create missing get_user_teams function
CREATE OR REPLACE FUNCTION public.get_user_teams(p_project_id TEXT)
RETURNS TABLE (
  team_id TEXT,
  team_name TEXT,
  team_icon TEXT,
  team_color_scheme TEXT,
  joined_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pt.id as team_id,
    pt.name as team_name,
    pt.icon as team_icon,
    pt.color_scheme as team_color_scheme,
    pp.created_at as joined_at
  FROM project_participants pp
  JOIN project_teams pt ON pp.team_id = pt.id
  WHERE pp.project_id = p_project_id::uuid
    AND pp.user_id = auth.uid()
    AND pp.status = 'active';
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_user_teams(TEXT) TO authenticated;