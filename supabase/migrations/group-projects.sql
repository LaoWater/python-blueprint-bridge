-- ==============================================================
-- Blue Pigeon Group Projects - Database Schema
-- Managing collaborative programming projects with team assignments
-- ==============================================================

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- ==============================================================
-- 1. GROUP_PROJECTS TABLE
-- Stores master project information for group collaborations
-- ==============================================================
CREATE TABLE IF NOT EXISTS group_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  project_type VARCHAR(50) NOT NULL DEFAULT 'programming', -- programming, ai, web, mobile, etc.
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  max_participants INTEGER DEFAULT 50,
  current_participants INTEGER DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'archived')),

  -- Project timeline
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  -- Project data
  project_data JSONB DEFAULT '{}', -- Store project-specific configuration, requirements, etc.

  -- Metadata
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT gp_name_not_empty CHECK (LENGTH(TRIM(name)) > 0),
  CONSTRAINT gp_participant_count_valid CHECK (current_participants >= 0 AND current_participants <= max_participants)
);

-- ==============================================================
-- 2. PROJECT_TEAMS TABLE
-- Defines teams/roles within each group project
-- ==============================================================
CREATE TABLE IF NOT EXISTS project_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES group_projects(id) ON DELETE CASCADE,

  -- Team information
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- Lucide icon name for UI
  color_scheme VARCHAR(50), -- CSS gradient classes for styling

  -- Team requirements
  max_members INTEGER DEFAULT 5,
  current_members INTEGER DEFAULT 0,
  required_skills JSONB DEFAULT '[]', -- Array of required skill tags
  difficulty_stars INTEGER NOT NULL CHECK (difficulty_stars >= 1 AND difficulty_stars <= 5),

  -- Team responsibilities
  mission TEXT NOT NULL,
  tasks JSONB DEFAULT '[]', -- Array of task descriptions
  deliverables JSONB DEFAULT '[]', -- Array of expected deliverables

  -- Team personality/vibe
  team_vibe TEXT, -- Fun description of the team's role

  -- Sorting and organization
  sort_order INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT pt_name_not_empty CHECK (LENGTH(TRIM(name)) > 0),
  CONSTRAINT pt_mission_not_empty CHECK (LENGTH(TRIM(mission)) > 0),
  CONSTRAINT pt_member_count_valid CHECK (current_members >= 0 AND current_members <= max_members),
  CONSTRAINT pt_project_team_name_unique UNIQUE(project_id, name)
);

-- ==============================================================
-- 3. PROJECT_PARTICIPANTS TABLE
-- Tracks user participation in group projects and team assignments
-- ==============================================================
CREATE TABLE IF NOT EXISTS project_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES group_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES project_teams(id) ON DELETE SET NULL,

  -- Participation details
  role VARCHAR(50) DEFAULT 'member', -- member, team_lead, project_admin
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'inactive', 'completed')),

  -- User preferences and skills
  preferred_skills JSONB DEFAULT '[]', -- Skills the user wants to work on
  experience_level INTEGER DEFAULT 1 CHECK (experience_level >= 1 AND experience_level <= 5),

  -- Participation tracking
  contribution_score INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Metadata
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT pp_user_project_unique UNIQUE(user_id, project_id),
  CONSTRAINT pp_contribution_score_valid CHECK (contribution_score >= 0)
);

-- ==============================================================
-- 4. PROJECT_TASKS TABLE
-- Individual tasks within teams with assignment tracking
-- ==============================================================
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES project_teams(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES group_projects(id) ON DELETE CASCADE,

  -- Task information
  title VARCHAR(255) NOT NULL,
  description TEXT,
  task_type VARCHAR(50) DEFAULT 'development', -- development, research, design, testing, documentation
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

  -- Task status and progress
  status VARCHAR(20) NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed', 'blocked')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),

  -- Assignment
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  estimated_hours INTEGER,
  actual_hours INTEGER DEFAULT 0,

  -- Dependencies and requirements
  depends_on JSONB DEFAULT '[]', -- Array of task IDs this task depends on
  required_skills JSONB DEFAULT '[]',
  deliverables JSONB DEFAULT '[]',

  -- Timeline
  due_date TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT ptask_title_not_empty CHECK (LENGTH(TRIM(title)) > 0),
  CONSTRAINT ptask_hours_valid CHECK (actual_hours >= 0 AND (estimated_hours IS NULL OR estimated_hours > 0))
);

-- ==============================================================
-- 5. RLS POLICIES
-- ==============================================================

-- Enable RLS on all tables
ALTER TABLE group_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;

-- Group Projects - Public read, admin create/update
CREATE POLICY "Anyone can view group projects" ON group_projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage group projects" ON group_projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level >= 2
    )
  );

-- Project Teams - Public read, admins and project creators can manage
CREATE POLICY "Anyone can view project teams" ON project_teams
  FOR SELECT USING (true);

CREATE POLICY "Admins and project creators can manage teams" ON project_teams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level >= 2
    ) OR
    EXISTS (
      SELECT 1 FROM group_projects gp
      WHERE gp.id = project_teams.project_id
      AND gp.created_by = auth.uid()
    )
  );

-- Project Participants - Users can see participants of projects they're in
CREATE POLICY "Users can view project participants" ON project_participants
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_participants pp2
      WHERE pp2.project_id = project_participants.project_id
      AND pp2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join projects" ON project_participants
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own participation" ON project_participants
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Project Tasks - Team members and admins can manage
CREATE POLICY "Team members can view their team tasks" ON project_tasks
  FOR SELECT USING (
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_participants pp
      WHERE pp.team_id = project_tasks.team_id
      AND pp.user_id = auth.uid()
      AND pp.status = 'active'
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level >= 2
    )
  );

CREATE POLICY "Team members can manage tasks" ON project_tasks
  FOR ALL USING (
    created_by = auth.uid() OR
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM project_participants pp
      WHERE pp.team_id = project_tasks.team_id
      AND pp.user_id = auth.uid()
      AND pp.status = 'active'
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_level >= 2
    )
  );

-- ==============================================================
-- 6. INDEXES FOR PERFORMANCE
-- ==============================================================

-- Group Projects indexes
CREATE INDEX IF NOT EXISTS idx_group_projects_status ON group_projects(status);
CREATE INDEX IF NOT EXISTS idx_group_projects_type ON group_projects(project_type);
CREATE INDEX IF NOT EXISTS idx_group_projects_created_by ON group_projects(created_by);

-- Project Teams indexes
CREATE INDEX IF NOT EXISTS idx_project_teams_project_id ON project_teams(project_id);
CREATE INDEX IF NOT EXISTS idx_project_teams_sort_order ON project_teams(project_id, sort_order);

-- Project Participants indexes
CREATE INDEX IF NOT EXISTS idx_project_participants_project_id ON project_participants(project_id);
CREATE INDEX IF NOT EXISTS idx_project_participants_user_id ON project_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_project_participants_team_id ON project_participants(team_id);
CREATE INDEX IF NOT EXISTS idx_project_participants_status ON project_participants(status);

-- Project Tasks indexes
CREATE INDEX IF NOT EXISTS idx_project_tasks_team_id ON project_tasks(team_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_assigned_to ON project_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_project_tasks_status ON project_tasks(status);
CREATE INDEX IF NOT EXISTS idx_project_tasks_due_date ON project_tasks(due_date);

-- ==============================================================
-- 7. FUNCTIONS AND TRIGGERS
-- ==============================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_group_projects_updated_at
  BEFORE UPDATE ON group_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_teams_updated_at
  BEFORE UPDATE ON project_teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_participants_updated_at
  BEFORE UPDATE ON project_participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_tasks_updated_at
  BEFORE UPDATE ON project_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update participant counts
CREATE OR REPLACE FUNCTION update_participant_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update current_members for team
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    IF NEW.team_id IS NOT NULL THEN
      UPDATE project_teams
      SET current_members = (
        SELECT COUNT(*)
        FROM project_participants
        WHERE team_id = NEW.team_id
        AND status = 'active'
      )
      WHERE id = NEW.team_id;
    END IF;

    -- Update current_participants for project
    UPDATE group_projects
    SET current_participants = (
      SELECT COUNT(*)
      FROM project_participants
      WHERE project_id = NEW.project_id
      AND status = 'active'
    )
    WHERE id = NEW.project_id;
  END IF;

  -- Handle deletion
  IF TG_OP = 'DELETE' THEN
    IF OLD.team_id IS NOT NULL THEN
      UPDATE project_teams
      SET current_members = (
        SELECT COUNT(*)
        FROM project_participants
        WHERE team_id = OLD.team_id
        AND status = 'active'
      )
      WHERE id = OLD.team_id;
    END IF;

    UPDATE group_projects
    SET current_participants = (
      SELECT COUNT(*)
      FROM project_participants
      WHERE project_id = OLD.project_id
      AND status = 'active'
    )
    WHERE id = OLD.project_id;

    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for participant counts
CREATE TRIGGER update_participant_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON project_participants
  FOR EACH ROW EXECUTE FUNCTION update_participant_counts();

-- ==============================================================
-- 8. RPC FUNCTIONS FOR APPLICATION USE
-- ==============================================================

-- Function to get all users with their profiles (for assignment)
CREATE OR REPLACE FUNCTION get_available_users()
RETURNS TABLE (
  id UUID,
  username TEXT,
  admin_level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    COALESCE(p.username, 'User') as username,
    p.admin_level,
    p.created_at
  FROM profiles p
  ORDER BY p.username;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Function to get project details with teams and participants
CREATE OR REPLACE FUNCTION get_project_details(project_uuid UUID)
RETURNS TABLE (
  project_id UUID,
  project_name VARCHAR(255),
  project_description TEXT,
  project_status VARCHAR(20),
  team_id UUID,
  team_name VARCHAR(255),
  team_description TEXT,
  team_icon VARCHAR(50),
  team_color_scheme VARCHAR(50),
  team_mission TEXT,
  team_tasks JSONB,
  team_vibe TEXT,
  difficulty_stars INTEGER,
  max_members INTEGER,
  current_members INTEGER,
  sort_order INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    gp.id as project_id,
    gp.name as project_name,
    gp.description as project_description,
    gp.status as project_status,
    pt.id as team_id,
    pt.name as team_name,
    pt.description as team_description,
    pt.icon as team_icon,
    pt.color_scheme as team_color_scheme,
    pt.mission as team_mission,
    pt.tasks as team_tasks,
    pt.team_vibe as team_vibe,
    pt.difficulty_stars,
    pt.max_members,
    pt.current_members,
    pt.sort_order
  FROM group_projects gp
  LEFT JOIN project_teams pt ON gp.id = pt.project_id
  WHERE gp.id = project_uuid
  ORDER BY pt.sort_order, pt.name;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Function to join a project team
CREATE OR REPLACE FUNCTION join_project_team(
  p_project_id UUID,
  p_team_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  user_uuid UUID;
  project_exists BOOLEAN;
  team_has_space BOOLEAN := true;
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

  -- Check if team has space (if team specified)
  IF p_team_id IS NOT NULL THEN
    SELECT (current_members < max_members)
    INTO team_has_space
    FROM project_teams
    WHERE id = p_team_id;

    IF NOT team_has_space THEN
      RETURN jsonb_build_object('success', false, 'error', 'Team is full');
    END IF;
  END IF;

  -- Insert or update participation
  INSERT INTO project_participants (project_id, user_id, team_id, status)
  VALUES (p_project_id, user_uuid, p_team_id, 'active')
  ON CONFLICT (user_id, project_id)
  DO UPDATE SET
    team_id = p_team_id,
    status = 'active',
    updated_at = NOW();

  RETURN jsonb_build_object('success', true, 'message', 'Successfully joined project');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Function to get team members for a specific team
CREATE OR REPLACE FUNCTION get_team_members(p_team_id UUID)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  role VARCHAR(50),
  joined_at TIMESTAMP WITH TIME ZONE,
  contribution_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pp.user_id,
    COALESCE(p.username, 'User') as username,
    pp.role,
    pp.joined_at,
    pp.contribution_score
  FROM project_participants pp
  LEFT JOIN profiles p ON pp.user_id = p.id
  WHERE pp.team_id = p_team_id
  AND pp.status = 'active'
  ORDER BY pp.joined_at;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- ==============================================================
-- 9. SEED DATA FOR DJ BLUE PROJECT
-- ==============================================================

-- Insert DJ Blue Group Project
INSERT INTO group_projects (
  name,
  description,
  project_type,
  difficulty_level,
  max_participants,
  status,
  project_data
) VALUES (
  'DJ Blue: Mood Detection Group AI',
  'A collaborative AI system that listens to conversations, detects the mood, and plays perfect background music. Eight specialized teams work together to create magic that understands human emotion and responds with sound.',
  'ai',
  4,
  50,
  'active',
  '{
    "technologies": ["Python", "AI", "Speech Recognition", "Music", "Real-time Processing"],
    "duration_weeks": 4,
    "learning_objectives": ["Team Collaboration", "AI Integration", "Real-time Systems", "Audio Processing"],
    "project_url": "https://github.com/blue-pigeon/dj-blue"
  }'
);

-- Get the project ID for team insertion
DO $$
DECLARE
  dj_blue_project_id UUID;
BEGIN
  SELECT id INTO dj_blue_project_id
  FROM group_projects
  WHERE name = 'DJ Blue: Mood Detection Group AI';

  -- Insert all 8 teams for DJ Blue project
  INSERT INTO project_teams (project_id, name, description, icon, color_scheme, max_members, required_skills, difficulty_stars, mission, tasks, team_vibe, sort_order) VALUES
  (dj_blue_project_id, 'The Listeners', 'Record conversations with a simple Python script', 'Mic', 'from-purple-400 to-pink-400', 3, '["Python", "Audio Recording"]', 2, 'Record conversations with a simple Python script', '["Press record, save as MP3", "Split audio every 10 minutes", "Name files with timestamps", "Keep a backup folder"]', 'You''re the ears of the system! 👂', 1),

  (dj_blue_project_id, 'The Music Librarians', 'Organize our music collection', 'FileAudio', 'from-blue-400 to-cyan-400', 3, '["Organization", "File Management"]', 1, 'Organize our music collection', '["Collect 50+ MP3 songs", "Create mood folders (Happy, Chill, Party, Focus)", "Make a simple spreadsheet of songs", "Test all files play correctly"]', 'You''re the heart of the playlist! 💿', 2),

  (dj_blue_project_id, 'The Translators', 'Turn audio into text we can read', 'Brain', 'from-green-400 to-emerald-400', 4, '["Python", "APIs", "Speech Recognition"]', 3, 'Turn audio into text we can read', '["Use Whisper or Google Speech API", "Save transcripts as text files", "Handle errors gracefully", "Keep the last 3 transcripts"]', 'You''re the bridge to understanding! 🌉', 3),

  (dj_blue_project_id, 'The Mood Readers', 'Feel the vibe of the conversation', 'Sparkles', 'from-yellow-400 to-orange-400', 4, '["Python", "AI APIs", "Sentiment Analysis"]', 4, 'Feel the vibe of the conversation', '["Send transcript to ChatGPT", "Ask: ''What''s the mood? Scale 1-10 energy?''", "Get back: mood type + energy level", "Remember the last 3 moods"]', 'You''re the soul of the system! ✨', 4),

  (dj_blue_project_id, 'The DJs', 'Pick the perfect next songs', 'Headphones', 'from-indigo-400 to-purple-400', 4, '["Python", "Algorithm Design", "Music Theory"]', 3, 'Pick the perfect next songs', '["Match mood to music genre", "Pick 3 songs for the queue", "Avoid repeating recent songs", "Smooth energy transitions"]', 'You''re the taste makers! 🎵', 5),

  (dj_blue_project_id, 'The Sound Engineers', 'Play music smoothly', 'Volume2', 'from-red-400 to-pink-400', 4, '["Python", "Audio Processing", "System Integration"]', 4, 'Play music smoothly', '["Build a Python music player", "Handle play, pause, skip", "Adjust volume based on conversation", "Smooth transitions between songs"]', 'You''re the rhythm keeper! 🎚️', 6),

  (dj_blue_project_id, 'The Designers', 'Make it beautiful and easy to use', 'Palette', 'from-teal-400 to-blue-400', 3, '["UI/UX Design", "Frontend Development"]', 3, 'Make it beautiful and easy to use', '["Design a simple music player UI", "Show current song & next 2 songs", "Add play/pause/skip buttons", "Display current mood with colors"]', 'You''re the face of the magic! 🎨', 7),

  (dj_blue_project_id, 'The Architects', 'Connect all the pieces together', 'Puzzle', 'from-gray-400 to-gray-600', 5, '["System Architecture", "Python", "Integration"]', 5, 'Connect all the pieces together', '["Make teams talk to each other", "Create the main program loop", "Handle errors between components", "Test the complete system"]', 'You''re the master builders! 🏗️', 8);
END;
$$;

-- ==============================================================
-- 10. PERMISSIONS
-- ==============================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Blue Pigeon Group Projects database schema created successfully!';
  RAISE NOTICE 'Tables created: group_projects, project_teams, project_participants, project_tasks';
  RAISE NOTICE 'RPC functions created for user management and project operations';
  RAISE NOTICE 'DJ Blue project and teams seeded successfully';
  RAISE NOTICE 'Ready for Group Projects integration!';
END;
$$;