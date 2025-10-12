-- Improve the file reading mode question
-- Make it clearer and more educational

UPDATE quiz_questions
SET
  question_text = 'What is the correct file mode to open a file for reading in Python?',
  code_snippet = 'file = open("data.txt", ____)',
  options = '[
    {"id": "a", "text": "\"w\" - write mode"},
    {"id": "b", "text": "\"r\" - read mode"},
    {"id": "c", "text": "\"a\" - append mode"},
    {"id": "d", "text": "\"x\" - exclusive creation mode"}
  ]',
  explanation = 'The "r" mode (read mode) opens a file for reading only. This is the default mode if no mode is specified. Other modes: "w" (write - overwrites file), "a" (append - adds to end), "x" (exclusive create - fails if file exists).',
  question_type = 'code_snippet'
WHERE
  question_text = 'Which mode opens a file for reading in Python?'
  AND quiz_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- Alternative: If you want to keep it simpler without code snippet
-- UPDATE quiz_questions
-- SET
--   question_text = 'Which file mode is used to open a file for reading in Python?',
--   options = '[
--     {"id": "a", "text": "open(file, \"w\") - Write mode"},
--     {"id": "b", "text": "open(file, \"r\") - Read mode"},
--     {"id": "c", "text": "open(file, \"a\") - Append mode"},
--     {"id": "d", "text": "open(file, \"x\") - Create mode"}
--   ]',
--   explanation = 'Mode "r" (read) is the correct choice. It opens the file for reading only and is actually the default mode. Mode "w" overwrites the file for writing, "a" appends to the end, and "x" creates a new file (fails if exists).'
-- WHERE
--   question_text = 'Which mode opens a file for reading in Python?'
--   AND quiz_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
