-- ==============================================================
-- Blue Pigeon Group Projects - Wellness Oracle & AI Study Buddy
-- Insert new projects and their teams
-- ==============================================================

-- Insert Wellness Oracle Project
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
  'Personal Wellness Oracle',
  'Your AI life coach that understands your patterns and guides you toward optimal living through deep biological intelligence',
  'ai_wellness',
  5,
  32, -- 8 teams × 4 avg members
  0,
  'active',
  jsonb_build_object(
    'vision', 'Build an AI that understands genetics, emotional triggers, and family patterns to provide personalized wellness guidance',
    'tech_stack', ARRAY['Python', 'React', 'LangChain', 'ChromaDB', 'PostgreSQL', 'Supabase'],
    'duration_weeks', 8,
    'learning_focus', ARRAY['AI Architecture', 'Vector Databases', 'LLM Chains', 'Health Data Analysis']
  )
) ON CONFLICT DO NOTHING;

-- Insert AI Study Buddy Project
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
  'AI Study Buddy',
  'Personal tutor that adapts to your learning style and maximizes knowledge retention through cognitive science',
  'ai_education',
  5,
  32, -- 8 teams × 4 avg members
  0,
  'active',
  jsonb_build_object(
    'vision', 'Create an AI that understands individual cognitive patterns and provides personalized learning experiences',
    'tech_stack', ARRAY['Python', 'React', 'Machine Learning', 'Educational Psychology', 'Knowledge Graphs'],
    'duration_weeks', 8,
    'learning_focus', ARRAY['Cognitive Science', 'Learning Analytics', 'AI Tutoring', 'Memory Optimization']
  )
) ON CONFLICT DO NOTHING;

-- ==============================================================
-- Wellness Oracle Teams
-- ==============================================================

-- Get the Wellness Oracle project ID
DO $$
DECLARE
    wellness_project_id UUID;
BEGIN
    SELECT id INTO wellness_project_id FROM group_projects WHERE name = 'Personal Wellness Oracle';

    -- Team 1: The Data Harvesters
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Data Harvesters',
      'Collect comprehensive wellness data that actually matters',
      '⚡',
      'from-green-400 to-emerald-400',
      4, 0, 2,
      'Connect to real APIs and build the data foundation',
      to_jsonb(ARRAY[
        'Sleep API integrations (Fitbit, Apple Health, Oura)',
        'Daily step and activity tracking',
        'Simple 1-10 health ratings (energy, digestion, mood)',
        'Voice-to-text diary entry system',
        'Data validation and error handling'
      ]),
      'You''re the foundation of everything! 📊',
      1
    );

    -- Team 2: The Vector Architects
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Vector Architects',
      'Transform all wellness data into searchable, meaningful vectors',
      '🧠',
      'from-purple-400 to-pink-400',
      4, 0, 5,
      'Build the AI brain that makes every piece of data searchable',
      to_jsonb(ARRAY[
        'Embed diary entries using sentence transformers',
        'Create temporal vector indexes for time-based patterns',
        'Build similarity search for wellness patterns',
        'Handle multi-modal data (numbers + text + context)',
        'Implement time-decay for pattern relevance'
      ]),
      'You''re the AI''s memory system! 🧠',
      2
    );

    -- Team 3: The LLM Chain Engineers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The LLM Chain Engineers',
      'Build the conversational AI that understands wellness context',
      '🤖',
      'from-blue-400 to-cyan-400',
      4, 0, 5,
      'Create the intelligent conversation system',
      to_jsonb(ARRAY[
        'Design prompt chains for health pattern analysis',
        'Build retrieval-augmented generation pipeline',
        'Create context-aware response generation',
        'Handle complex health correlations and insights',
        'Implement conversation memory and state management'
      ]),
      'You''re the conversational genius! 💬',
      3
    );

    -- Team 4: The Pattern Detectives
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Pattern Detectives',
      'Find hidden connections in wellness data',
      '🔍',
      'from-yellow-400 to-orange-400',
      4, 0, 4,
      'Discover the patterns humans miss',
      to_jsonb(ARRAY[
        'Correlation analysis between wellness metrics',
        'Identify cyclical patterns (weekly, monthly rhythms)',
        'Detect early warning signals for energy crashes',
        'Build predictive models for mood and energy',
        'Time-series analysis for personal optimization'
      ]),
      'You''re the pattern whisperer! 🔍',
      4
    );

    -- Team 5: The Memory Keepers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Memory Keepers',
      'Store and retrieve personal history with blazing speed',
      '💾',
      'from-indigo-400 to-purple-400',
      4, 0, 4,
      'Build the high-performance data backbone',
      to_jsonb(ARRAY[
        'Design efficient wellness data schemas',
        'Build fast retrieval systems with proper indexing',
        'Handle privacy and security (Row Level Security)',
        'Create data export/backup systems',
        'Optimize for vector similarity searches'
      ]),
      'You''re the keeper of memories! 💾',
      5
    );

    -- Team 6: The Conversation Designers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Conversation Designers',
      'Make talking to AI feel natural and deeply understanding',
      '💬',
      'from-pink-400 to-rose-400',
      4, 0, 3,
      'Craft the perfect human-AI interaction',
      to_jsonb(ARRAY[
        'Design conversation flows for health topics',
        'Handle sensitive health discussions with empathy',
        'Create emotional tone recognition',
        'Build trust through consistent accuracy',
        'Design intuitive voice and text interfaces'
      ]),
      'You''re the empathy engineer! ❤️',
      6
    );

    -- Team 7: The Interface Magicians
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Interface Magicians',
      'Create a wellness companion that feels magical to use',
      '✨',
      'from-emerald-400 to-teal-400',
      4, 0, 4,
      'Build the beautiful, intuitive experience',
      to_jsonb(ARRAY[
        'Design chat interface with integrated data visualization',
        'Create quick daily logging flows',
        'Build insight presentation with beautiful charts',
        'Mobile-first responsive design',
        'Real-time data synchronization UI'
      ]),
      'You''re the experience wizard! ✨',
      7
    );

    -- Team 8: The Wellness Orchestrators
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Wellness Orchestrators',
      'Coordinate all systems into one intelligent, learning assistant',
      '🎼',
      'from-violet-400 to-indigo-400',
      4, 0, 5,
      'Build the master AI that connects everything',
      to_jsonb(ARRAY[
        'Connect all team components into unified system',
        'Build the main conversation and analysis loop',
        'Handle complex multi-turn conversations',
        'Deploy and scale the complete wellness AI',
        'Coordinate real-time learning and adaptation'
      ]),
      'You''re the conductor of the symphony! 🎼',
      8
    );
END;
$$;

-- ==============================================================
-- AI Study Buddy Teams
-- ==============================================================

-- Get the AI Study Buddy project ID
DO $$
DECLARE
    study_project_id UUID;
BEGIN
    SELECT id INTO study_project_id FROM group_projects WHERE name = 'AI Study Buddy';

    -- Team 1: The Content Digesters
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Content Digesters',
      'Transform any learning material into structured, searchable knowledge',
      '📚',
      'from-blue-400 to-cyan-400',
      4, 0, 3,
      'Parse PDFs, videos, images into AI-readable knowledge graphs',
      to_jsonb(ARRAY[
        'PDF text extraction with structure preservation',
        'Video transcription with timestamp mapping',
        'Image text recognition (OCR) for diagrams',
        'Concept hierarchy mapping and relationships',
        'Knowledge graph construction with NetworkX'
      ]),
      'You''re the knowledge translator! 📚',
      1
    );

    -- Team 2: The Learning Style Detectives
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Learning Style Detectives',
      'Understand how each individual brain learns most effectively',
      '👁️',
      'from-purple-400 to-pink-400',
      4, 0, 5,
      'Build the AI that discovers personal learning patterns',
      to_jsonb(ARRAY[
        'Track learning interaction patterns (clicks, pauses, rewinds)',
        'A/B test different explanation methods',
        'Visual vs. auditory vs. kinesthetic analysis',
        'Optimal study session timing detection',
        'Performance correlation with explanation styles'
      ]),
      'You''re the mind reader! 🔍',
      2
    );

    -- Team 3: The Question Generators
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Question Generators',
      'Create perfect practice questions that test deep understanding',
      '💡',
      'from-yellow-400 to-orange-400',
      4, 0, 4,
      'AI that generates personalized questions based on learning style',
      to_jsonb(ARRAY[
        'Generate multiple choice questions with intelligent distractors',
        'Create visual interpretation questions for diagrams',
        'Build analogy-based questions for conceptual learning',
        'Adapt difficulty to student mastery level',
        'Question effectiveness tracking and optimization'
      ]),
      'You''re the challenge creator! 💡',
      3
    );

    -- Team 4: The Memory Scientists
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Memory Scientists',
      'Optimize long-term knowledge retention through personalized spaced repetition',
      '🧠',
      'from-green-400 to-emerald-400',
      4, 0, 5,
      'Build personal forgetting curves and optimal review schedules',
      to_jsonb(ARRAY[
        'Build personal forgetting curve models with scipy',
        'Implement adaptive spaced repetition algorithms',
        'Schedule optimal review times for maximum retention',
        'Track concept mastery over time',
        'Predict retention and schedule interventions'
      ]),
      'You''re the memory master! 🧠',
      4
    );

    -- Team 5: The Tutor AI
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Tutor AI',
      'Provide personalized explanations that adapt to individual confusion patterns',
      '🤖',
      'from-indigo-400 to-purple-400',
      4, 0, 5,
      'The conversational AI that becomes the perfect tutor',
      to_jsonb(ARRAY[
        'LLM chains for concept explanation',
        'Adaptive teaching based on confusion signals',
        'Generate analogies and examples from student interests',
        'Handle "I don''t understand" conversations',
        'Create personalized explanation styles'
      ]),
      'You''re the perfect teacher! 🤖',
      5
    );

    -- Team 6: The Progress Trackers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Progress Trackers',
      'Monitor learning progress and maintain motivation through intelligent insights',
      '📊',
      'from-pink-400 to-rose-400',
      4, 0, 3,
      'Track mastery and generate motivating insights',
      to_jsonb(ARRAY[
        'Knowledge mastery calculation algorithms',
        'Study streak tracking and gamification',
        'Goal setting and achievement systems',
        'Motivation and encouragement systems',
        'Progress visualization and insights'
      ]),
      'You''re the cheerleader! 📊',
      6
    );

    -- Team 7: The Study Interface
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Study Interface',
      'Create an engaging, distraction-free learning environment',
      '✨',
      'from-emerald-400 to-teal-400',
      4, 0, 4,
      'Build the interface that adapts to focus and learning style',
      to_jsonb(ARRAY[
        'Adaptive study session design based on learning style',
        'Progress visualization with beautiful charts',
        'Gamified learning elements without distraction',
        'Focus and productivity tools',
        'Real-time interface adaptation'
      ]),
      'You''re the experience architect! ✨',
      7
    );

    -- Team 8: The Learning Orchestrators
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), study_project_id,
      'The Learning Orchestrators',
      'Coordinate all systems into optimal, personalized learning experiences',
      '🎼',
      'from-violet-400 to-indigo-400',
      4, 0, 5,
      'Build the master AI that conducts the learning symphony',
      to_jsonb(ARRAY[
        'Integrate all learning systems into unified experience',
        'Personalize complete study plans',
        'Handle different subjects and learning goals',
        'Scale personalized education',
        'Real-time learning adaptation and optimization'
      ]),
      'You''re the learning conductor! 🎼',
      8
    );
END;
$$;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Wellness Oracle and AI Study Buddy projects added successfully!';
  RAISE NOTICE 'Each project has 8 specialized teams ready for collaboration';
  RAISE NOTICE 'Teams range from ⭐⭐⭐ to ⭐⭐⭐⭐⭐ difficulty levels';
  RAISE NOTICE 'Maximum 32 participants per project (4 per team)';
END;
$$;