-- Add password protection to personal_files table
ALTER TABLE personal_files 
ADD COLUMN password_hash TEXT,
ADD COLUMN password_protected BOOLEAN DEFAULT FALSE,
ADD COLUMN last_password_attempt TIMESTAMP WITH TIME ZONE;

-- Create index for faster password lookups
CREATE INDEX idx_personal_files_password_protected ON personal_files(user_id, password_protected);

-- Add function to verify password attempts (rate limiting)
CREATE OR REPLACE FUNCTION check_password_attempt_rate_limit(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  last_attempt TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get the last password attempt for this user
  SELECT MAX(last_password_attempt)
  INTO last_attempt
  FROM personal_files
  WHERE user_id = p_user_id;
  
  -- Allow if no previous attempt or if more than 1 minute has passed
  IF last_attempt IS NULL OR last_attempt < NOW() - INTERVAL '1 minute' THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_password_attempt_rate_limit(UUID) TO authenticated;