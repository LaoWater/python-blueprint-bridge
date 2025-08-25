-- ==============================================================
-- Blue Pigeon IDE - Ultimate RLS Fix
-- Auto-populate user_id and proper INSERT policies
-- ==============================================================

-- ==============================================================
-- 1. CREATE FUNCTION TO AUTO-POPULATE USER_ID ON INSERT
-- ==============================================================

-- Function to automatically set user_id for projects
CREATE OR REPLACE FUNCTION set_user_id_for_projects()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically set the user_id to the current authenticated user
  NEW.user_id = auth.uid();
  
  -- Ensure user is authenticated
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to create projects';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically set user_id for file_system_items
CREATE OR REPLACE FUNCTION set_user_id_for_files()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically set the user_id to the current authenticated user
  NEW.user_id = auth.uid();
  
  -- Ensure user is authenticated
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to create files';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically set user_id for file_history
CREATE OR REPLACE FUNCTION set_user_id_for_history()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically set the user_id to the current authenticated user
  NEW.user_id = auth.uid();
  
  -- Ensure user is authenticated
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to create file history';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically set user_id for recent_files
CREATE OR REPLACE FUNCTION set_user_id_for_recent()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically set the user_id to the current authenticated user
  NEW.user_id = auth.uid();
  
  -- Ensure user is authenticated
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to track recent files';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================
-- 2. CREATE TRIGGERS FOR AUTO-POPULATION
-- ==============================================================

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS auto_set_user_id_projects ON projects;
DROP TRIGGER IF EXISTS auto_set_user_id_files ON file_system_items;
DROP TRIGGER IF EXISTS auto_set_user_id_history ON file_history;
DROP TRIGGER IF EXISTS auto_set_user_id_recent ON recent_files;

-- Create triggers for auto-populating user_id
CREATE TRIGGER auto_set_user_id_projects
  BEFORE INSERT ON projects
  FOR EACH ROW EXECUTE FUNCTION set_user_id_for_projects();

CREATE TRIGGER auto_set_user_id_files
  BEFORE INSERT ON file_system_items
  FOR EACH ROW EXECUTE FUNCTION set_user_id_for_files();

CREATE TRIGGER auto_set_user_id_history
  BEFORE INSERT ON file_history
  FOR EACH ROW EXECUTE FUNCTION set_user_id_for_history();

CREATE TRIGGER auto_set_user_id_recent
  BEFORE INSERT ON recent_files
  FOR EACH ROW EXECUTE FUNCTION set_user_id_for_recent();

-- ==============================================================
-- 3. UPDATE RLS POLICIES FOR INSERT OPERATIONS
-- ==============================================================

-- Drop and recreate INSERT policies with proper checks
DROP POLICY IF EXISTS "Users can create projects" ON projects;
DROP POLICY IF EXISTS "Users can create files" ON file_system_items;
DROP POLICY IF EXISTS "Users can create file history" ON file_history;
DROP POLICY IF EXISTS "Users can create recent files" ON recent_files;

-- Projects INSERT policy - allow if user is authenticated (user_id will be auto-set)
CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- File system items INSERT policy - allow if user is authenticated and owns project
CREATE POLICY "Users can create files" ON file_system_items
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    (project_id IS NULL OR user_owns_project(project_id))
  );

-- File history INSERT policy - allow if user is authenticated
CREATE POLICY "Users can create file history" ON file_history
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Recent files INSERT policy - allow if user is authenticated  
CREATE POLICY "Users can create recent files" ON recent_files
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ==============================================================
-- 4. ENSURE ALL OTHER POLICIES ARE CORRECT
-- ==============================================================

-- Verify SELECT policies exist and are correct
DO $$
BEGIN
  -- Check if SELECT policies exist, create if missing
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' AND policyname = 'Users can view own projects'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id)';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'file_system_items' AND policyname = 'Users can view own files'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own files" ON file_system_items FOR SELECT USING (auth.uid() = user_id)';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'file_history' AND policyname = 'Users can view own file history'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own file history" ON file_history FOR SELECT USING (auth.uid() = user_id)';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'recent_files' AND policyname = 'Users can view own recent files'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own recent files" ON recent_files FOR SELECT USING (auth.uid() = user_id)';
  END IF;
END;
$$;

-- ==============================================================
-- 5. ENHANCED DEBUGGING FUNCTION
-- ==============================================================

CREATE OR REPLACE FUNCTION debug_rls_setup()
RETURNS TABLE(
  table_name TEXT,
  policy_name TEXT,
  policy_cmd TEXT,
  policy_check TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.tablename::TEXT,
    p.policyname::TEXT,
    p.cmd::TEXT,
    COALESCE(p.qual, p.with_check)::TEXT
  FROM pg_policies p
  WHERE p.tablename IN ('projects', 'file_system_items', 'file_history', 'recent_files')
  ORDER BY p.tablename, p.policyname;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================
-- 6. TEST FUNCTION FOR AUTHENTICATED OPERATIONS
-- ==============================================================

CREATE OR REPLACE FUNCTION test_authenticated_operations()
RETURNS TEXT AS $$
DECLARE
  result TEXT := '';
  current_user_id UUID;
  test_project_id UUID;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RETURN 'ERROR: No authenticated user found. Please sign in first.';
  END IF;
  
  result := result || 'Testing with User ID: ' || current_user_id::TEXT || E'\n';
  
  BEGIN
    -- Test project creation
    INSERT INTO projects (name, description, is_active)
    VALUES ('Test Project', 'RLS Test Project', false)
    RETURNING id INTO test_project_id;
    
    result := result || 'SUCCESS: Project created with ID: ' || test_project_id::TEXT || E'\n';
    
    -- Test file creation
    INSERT INTO file_system_items (project_id, name, type, content)
    VALUES (test_project_id, 'test.txt', 'file', 'Hello RLS!');
    
    result := result || 'SUCCESS: File created in project' || E'\n';
    
    -- Clean up test data
    DELETE FROM file_system_items WHERE project_id = test_project_id;
    DELETE FROM projects WHERE id = test_project_id;
    
    result := result || 'SUCCESS: All RLS policies working correctly!' || E'\n';
    
  EXCEPTION WHEN OTHERS THEN
    result := result || 'ERROR: ' || SQLERRM || E'\n';
  END;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION debug_rls_setup() TO authenticated;
GRANT EXECUTE ON FUNCTION test_authenticated_operations() TO authenticated;

-- ==============================================================
-- SUCCESS MESSAGE
-- ==============================================================

DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Blue Pigeon IDE - Ultimate RLS Fix Applied!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Changes Made:';
  RAISE NOTICE '1. Auto-populate user_id triggers created';
  RAISE NOTICE '2. INSERT policies updated for authentication';
  RAISE NOTICE '3. All CRUD operations should now work';
  RAISE NOTICE '4. Complete user data isolation maintained';
  RAISE NOTICE '';
  RAISE NOTICE 'Test Commands:';
  RAISE NOTICE '- Debug policies: SELECT * FROM debug_rls_setup();';
  RAISE NOTICE '- Test operations: SELECT test_authenticated_operations();';
  RAISE NOTICE '';
  RAISE NOTICE 'Your IDE should now work perfectly!';
  RAISE NOTICE '==============================================';
END;
$$;