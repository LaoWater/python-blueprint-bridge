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
  'Your AI wellness companion that discovers patterns in your daily diary entries and guides you toward optimal living through holistic understanding',
  'ai_wellness',
  5,
  32, -- 8 teams × 4 avg members
  0,
  'active',
  jsonb_build_object(
    'vision', 'Build an AI that analyzes diary patterns across environment, lifestyle, emotions, goals, and personal biology to provide holistic wellness guidance',
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
      'The Life Pattern Collectors',
      'Capture holistic wellness data from daily life patterns',
      '⚡',
      'from-green-400 to-emerald-400',
      4, 0, 2,
      'Build comprehensive data foundation for holistic wellness tracking',
      to_jsonb(ARRAY[
        'Daily diary entry system with voice-to-text',
        'Environmental data integration (air quality, weather)',
        'Sleep and activity tracking (multiple device APIs)',
        'Simple wellness ratings (energy, digestion, mood, stress)',
        'Goal and intention tracking system',
        'Data validation and privacy protection'
      ]),
      'You capture the story of human experience! 📖',
      1
    );

    -- Team 2: The Vector Architects
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Pattern Memory Builders',
      'Transform life experiences into searchable AI memory',
      '🧠',
      'from-purple-400 to-pink-400',
      4, 0, 5,
      'Create AI memory that understands context and connections',
      to_jsonb(ARRAY[
        'Embed diary entries and life context using transformers',
        'Build multi-dimensional pattern recognition (emotional, physical, environmental)',
        'Create similarity search across different wellness domains',
        'Handle complex life context (goals, relationships, environment)',
        'Implement temporal pattern weighting and relevance scoring'
      ]),
      'You create the AI''s understanding of patterns! 🧠',
      2
    );

    -- Team 3: The LLM Chain Engineers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Wisdom Conversation Engineers',
      'Build AI that understands your unique life context and patterns',
      '🤖',
      'from-blue-400 to-cyan-400',
      4, 0, 5,
      'Create deeply contextual and personalized AI conversations',
      to_jsonb(ARRAY[
        'Design prompts for holistic pattern analysis (physical, emotional, environmental)',
        'Build retrieval systems that understand multi-factor wellness connections',
        'Create empathetic, personalized response generation',
        'Handle complex life correlations and provide gentle guidance',
        'Implement conversation memory with personal context awareness'
      ]),
      'You bring wisdom to every conversation! 💬',
      3
    );

    -- Team 4: The Pattern Detectives
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Life Connection Detectives',
      'Discover hidden patterns across all aspects of daily life',
      '🔍',
      'from-yellow-400 to-orange-400',
      4, 0, 4,
      'Find meaningful connections across all life domains',
      to_jsonb(ARRAY[
        'Multi-factor correlation analysis (environment, emotions, goals, physical)',
        'Identify personal rhythm patterns (daily, weekly, seasonal)',
        'Detect early signals for wellness disruptions',
        'Build holistic predictive models for energy and mood',
        'Discover unique personal optimization patterns'
      ]),
      'You reveal the hidden connections in life! 🔍',
      4
    );

    -- Team 5: The Memory Keepers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Personal History Guardians',
      'Securely store and instantly access your complete wellness story',
      '💾',
      'from-indigo-400 to-purple-400',
      4, 0, 4,
      'Build secure, high-performance personal data systems',
      to_jsonb(ARRAY[
        'Design schemas for complex life pattern data',
        'Build lightning-fast pattern retrieval systems',
        'Implement bulletproof privacy and security (Row Level Security)',
        'Create personal data ownership and export systems',
        'Optimize for multi-dimensional pattern searches'
      ]),
      'You protect and serve personal stories! 💾',
      5
    );

    -- Team 6: The Conversation Designers
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Empathy Engineers',
      'Create AI conversations that feel genuinely understanding and supportive',
      '💬',
      'from-pink-400 to-rose-400',
      4, 0, 3,
      'Design deeply empathetic AI communication',
      to_jsonb(ARRAY[
        'Design conversation flows for sensitive personal topics',
        'Create emotional intelligence for wellness discussions',
        'Build tone recognition that responds with appropriate empathy',
        'Establish trust through gentle, non-judgmental guidance',
        'Design interfaces that feel safe and supportive'
      ]),
      'You create genuine understanding! ❤️',
      6
    );

    -- Team 7: The Interface Magicians
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Experience Alchemists',
      'Transform complex life data into beautiful, intuitive experiences',
      '✨',
      'from-emerald-400 to-teal-400',
      4, 0, 4,
      'Craft magical user experiences for personal wellness',
      to_jsonb(ARRAY[
        'Design intuitive daily life logging interfaces',
        'Create beautiful visualizations of personal patterns',
        'Build seamless diary entry and insight discovery flows',
        'Design mobile-first experiences for daily use',
        'Create delightful interactions that encourage reflection'
      ]),
      'You transform data into delight! ✨',
      7
    );

    -- Team 8: The Wellness Orchestrators
    INSERT INTO project_teams (
      id, project_id, name, description, icon, color_scheme,
      max_members, current_members, difficulty_stars, mission,
      tasks, team_vibe, sort_order
    ) VALUES (
      gen_random_uuid(), wellness_project_id,
      'The Life Harmony Orchestrators',
      'Unite all systems into one wise, understanding companion',
      '🎼',
      'from-violet-400 to-indigo-400',
      4, 0, 5,
      'Create the master AI that understands your complete story',
      to_jsonb(ARRAY[
        'Integrate all components into harmonious wellness AI',
        'Build the central intelligence that connects all life patterns',
        'Orchestrate complex, context-aware conversations',
        'Deploy and scale personalized wellness wisdom',
        'Coordinate continuous learning from your unique patterns'
      ]),
      'You orchestrate the harmony of wellness! 🎼',
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