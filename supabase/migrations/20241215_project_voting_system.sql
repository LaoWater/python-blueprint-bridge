-- ==============================================================
-- Project Voting System Migration
-- Adds voting functionality for group projects
-- ==============================================================

-- Create project_votes table
CREATE TABLE IF NOT EXISTS project_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES group_projects(id) ON DELETE CASCADE,
  vote_type VARCHAR(20) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one vote per user per project
  UNIQUE(user_id, project_id)
);

-- Add vote counts to group_projects table
ALTER TABLE group_projects
ADD COLUMN IF NOT EXISTS votes_up INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS votes_down INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS vote_score INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_votes_user_id ON project_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_project_votes_project_id ON project_votes(project_id);
CREATE INDEX IF NOT EXISTS idx_project_votes_created_at ON project_votes(created_at);

-- Enable RLS
ALTER TABLE project_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_votes
CREATE POLICY "Users can view all votes" ON project_votes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own votes" ON project_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" ON project_votes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes" ON project_votes
  FOR DELETE USING (auth.uid() = user_id);

-- Function to update vote counts
CREATE OR REPLACE FUNCTION update_project_vote_counts()
RETURNS TRIGGER AS $$
DECLARE
  target_project_id UUID;
  up_count INTEGER;
  down_count INTEGER;
  total_score INTEGER;
BEGIN
  -- Determine which project_id to update
  IF TG_OP = 'DELETE' THEN
    target_project_id := OLD.project_id;
  ELSE
    target_project_id := NEW.project_id;
  END IF;

  -- Calculate vote counts
  SELECT
    COALESCE(SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN vote_type = 'down' THEN 1 ELSE 0 END), 0)
  INTO up_count, down_count
  FROM project_votes
  WHERE project_id = target_project_id;

  -- Calculate total score (up votes - down votes)
  total_score := up_count - down_count;

  -- Update the group_projects table
  UPDATE group_projects
  SET
    votes_up = up_count,
    votes_down = down_count,
    vote_score = total_score,
    updated_at = NOW()
  WHERE id = target_project_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for vote count updates
DROP TRIGGER IF EXISTS trigger_update_vote_counts ON project_votes;
CREATE TRIGGER trigger_update_vote_counts
  AFTER INSERT OR UPDATE OR DELETE ON project_votes
  FOR EACH ROW EXECUTE FUNCTION update_project_vote_counts();

-- ==============================================================
-- RPC Functions for voting
-- ==============================================================

-- Function to cast or update a vote
CREATE OR REPLACE FUNCTION cast_project_vote(
  p_project_id UUID,
  p_vote_type VARCHAR(20)
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_result JSONB;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;

  -- Validate vote type
  IF p_vote_type NOT IN ('up', 'down') THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid vote type. Must be "up" or "down"'
    );
  END IF;

  -- Insert or update vote (upsert)
  INSERT INTO project_votes (user_id, project_id, vote_type)
  VALUES (v_user_id, p_project_id, p_vote_type)
  ON CONFLICT (user_id, project_id)
  DO UPDATE SET
    vote_type = p_vote_type,
    updated_at = NOW();

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Vote cast successfully'
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove a vote
CREATE OR REPLACE FUNCTION remove_project_vote(p_project_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;

  DELETE FROM project_votes
  WHERE user_id = v_user_id AND project_id = p_project_id;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Vote removed successfully'
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's vote for a project
CREATE OR REPLACE FUNCTION get_user_project_vote(p_project_id UUID)
RETURNS TABLE(vote_type VARCHAR(20), voted_at TIMESTAMP WITH TIME ZONE) AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT pv.vote_type, pv.created_at
  FROM project_votes pv
  WHERE pv.user_id = v_user_id AND pv.project_id = p_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================
-- Enhanced leave team function
-- ==============================================================

-- Update the existing leave_project_team function to be more robust
CREATE OR REPLACE FUNCTION leave_project_team(
  p_project_id UUID,
  p_team_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_participant_id UUID;
  v_result JSONB;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;

  -- Check if user is actually in the team
  SELECT id INTO v_participant_id
  FROM project_participants
  WHERE user_id = v_user_id
    AND project_id = p_project_id
    AND team_id = p_team_id
    AND status = 'active';

  IF v_participant_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'You are not a member of this team'
    );
  END IF;

  -- Remove user from team
  UPDATE project_participants
  SET
    status = 'left',
    updated_at = NOW()
  WHERE id = v_participant_id;

  -- Update team member count
  UPDATE project_teams
  SET
    current_members = GREATEST(0, current_members - 1),
    updated_at = NOW()
  WHERE id = p_team_id;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Successfully left the team',
    'team_id', p_team_id
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================
-- Initialize vote counts for existing projects
-- ==============================================================

-- Update existing projects with zero vote counts
UPDATE group_projects
SET
  votes_up = 0,
  votes_down = 0,
  vote_score = 0
WHERE votes_up IS NULL OR votes_down IS NULL OR vote_score IS NULL;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Project voting system migration completed successfully!';
  RAISE NOTICE 'Features added:';
  RAISE NOTICE '- Project voting (up/down votes)';
  RAISE NOTICE '- Vote count tracking';
  RAISE NOTICE '- Enhanced team leave functionality';
  RAISE NOTICE '- RPC functions for voting operations';
END;
$$;