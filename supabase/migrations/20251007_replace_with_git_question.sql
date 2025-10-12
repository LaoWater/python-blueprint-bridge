-- Replace boring file mode question with practical Git question
-- Git is essential for modern developers and much more relevant!

UPDATE quiz_questions
SET
  question_text = 'What is the primary purpose of Git in software development?',
  code_snippet = NULL,
  question_type = 'theoretical',
  options = '[
    {"id": "a", "text": "To write Python code faster"},
    {"id": "b", "text": "To track changes in code and collaborate with other developers"},
    {"id": "c", "text": "To run Python programs in the cloud"},
    {"id": "d", "text": "To create graphical user interfaces"}
  ]',
  correct_answer = 'b',
  explanation = 'Git is a version control system that tracks changes in your code over time. It allows you to save different versions of your project, collaborate with other developers, merge code changes, and revert to previous versions if needed. Git is essential for team collaboration and maintaining code history in modern software development.',
  chapter = 'git_basics',
  points = 1
WHERE
  question_text LIKE '%mode opens a file for reading%'
  OR question_text LIKE '%file mode%reading%';

-- Note: If the above doesn't work, you can also target by the specific quiz_id
-- UPDATE quiz_questions
-- SET ... (same as above)
-- WHERE quiz_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
--   AND question_text LIKE '%file%reading%';
