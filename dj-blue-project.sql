-- ==============================================================
-- Blue Pigeon Group Projects - DJ Blue Project
-- Insert DJ Blue project and its teams
-- ==============================================================

-- Insert DJ Blue Project
INSERT INTO group_projects (
  id,
  name,
  description,
  project_type,
  difficulty_level,
  max_participants,
  current_participants,
  status,
  project_data
) VALUES (
  gen_random_uuid(),
  'DJ Blue - Group Mood Music Assistant',
  'A magical DJ that reads the room and plays the perfect soundtrack',
  'audio_ai',
  4,
  40, -- 8 teams × 5 avg members
  0,
  'active',
  jsonb_build_object(
    'vision', 'Create an AI that understands group conversations and dynamically selects music to enhance human connection and emotional atmosphere',
    'tech_stack', ARRAY['Python', 'React', 'Audio Processing', 'Speech Recognition', 'Machine Learning', 'OpenAI API'],
    'duration_weeks', 4,
    'learning_focus', ARRAY['Audio Processing', 'Natural Language Processing', 'Real-time Systems', 'UI/UX Design']
  )
) ON CONFLICT DO NOTHING;

-- ==============================================================
-- DJ Blue Teams
-- ==============================================================

-- Get the DJ Blue project ID
DO $$
DECLARE
    dj_blue_project_id UUID;
BEGIN
    SELECT id INTO dj_blue_project_id FROM group_projects WHERE name = 'DJ Blue - Group Mood Music Assistant';

    -- Team 1: The Listeners
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The Listeners',
      'Record conversations with a simple Python script',
      '🎤',
      'from-purple-400 to-pink-400',
      5, 0, 2,
      'Record conversations with a simple Python script',
      to_jsonb(ARRAY[
        'Press record, save as MP3',
        'Split audio every 10 minutes',
        'Name files with timestamps',
        'Keep a backup folder'
      ]),
      'You''re the ears of the system! 👂',
      1
    );

    -- Team 2: The Music Librarians
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The Music Librarians',
      'Organize our music collection',
      '🎵',
      'from-blue-400 to-cyan-400',
      5, 0, 1,
      'Organize our music collection',
      to_jsonb(ARRAY[
        'Collect 50+ MP3 songs',
        'Create mood folders (Happy, Chill, Party, Focus)',
        'Make a simple spreadsheet of songs',
        'Test all files play correctly'
      ]),
      'You''re the heart of the playlist! 💿',
      2
    );

    -- Team 3: The Translators
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The Translators',
      'Turn audio into text we can read',
      '🧠',
      'from-green-400 to-emerald-400',
      5, 0, 3,
      'Turn audio into text we can read',
      to_jsonb(ARRAY[
        'Use Whisper or Google Speech API',
        'Save transcripts as text files',
        'Handle errors gracefully',
        'Keep the last 3 transcripts'
      ]),
      'You''re the bridge to understanding! 🌉',
      3
    );

    -- Team 4: The Mood Readers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The Mood Readers',
      'Feel the vibe of the conversation',
      '✨',
      'from-yellow-400 to-orange-400',
      5, 0, 4,
      'Feel the vibe of the conversation',
      to_jsonb(ARRAY[
        'Send transcript to ChatGPT',
        'Ask: ''What''s the mood? Scale 1-10 energy?''',
        'Get back: mood type + energy level',
        'Remember the last 3 moods'
      ]),
      'You''re the soul of the system! ✨',
      4
    );

    -- Team 5: The DJs
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The DJs',
      'Pick the perfect next songs',
      '🎧',
      'from-indigo-400 to-purple-400',
      5, 0, 3,
      'Pick the perfect next songs',
      to_jsonb(ARRAY[
        'Match mood to music genre',
        'Pick 3 songs for the queue',
        'Avoid repeating recent songs',
        'Smooth energy transitions'
      ]),
      'You''re the taste makers! 🎵',
      5
    );

    -- Team 6: The Sound Engineers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The Sound Engineers',
      'Play music smoothly',
      '🔊',
      'from-red-400 to-pink-400',
      5, 0, 4,
      'Play music smoothly',
      to_jsonb(ARRAY[
        'Build a Python music player',
        'Handle play, pause, skip',
        'Adjust volume based on conversation',
        'Smooth transitions between songs'
      ]),
      'You''re the rhythm keeper! 🎚️',
      6
    );

    -- Team 7: The AI Designers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The AI Designers',
      'Make it beautiful and easy to use',
      '🎨',
      'from-teal-400 to-blue-400',
      5, 0, 4,
      'Make it beautiful and easy to use',
      to_jsonb(ARRAY[
        'Create a presentation website',
        'Create Player UI & Show current song and next 2 songs',
        'Add play/pause/skip buttons',
        'Display current mood with colors'
      ]),
      'You''re the face of the Magic! 🎨',
      7
    );

    -- Team 8: The Architects
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), dj_blue_project_id,
      'The Architects',
      'Connect all the pieces together',
      '🧩',
      'from-gray-400 to-gray-600',
      5, 0, 5,
      'Connect all the pieces together',
      to_jsonb(ARRAY[
        'Make teams talk to each other',
        'Create the main program loop',
        'Handle errors between components',
        'Test the complete system'
      ]),
      'You''re the master builders! 🏗️',
      8
    );
END;
$$;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'DJ Blue project added successfully!';
  RAISE NOTICE 'Project has 8 specialized teams ready for collaboration';
  RAISE NOTICE 'Teams range from ⭐ to ⭐⭐⭐⭐⭐ difficulty levels';
  RAISE NOTICE 'Maximum 40 participants total (5 per team)';
END;
$$;