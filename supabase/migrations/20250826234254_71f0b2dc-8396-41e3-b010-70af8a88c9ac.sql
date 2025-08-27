-- Create personal_files table for secure user file storage
CREATE TABLE public.personal_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  original_filename TEXT NOT NULL,
  file_extension TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  processed_md_content TEXT,
  upload_status TEXT NOT NULL DEFAULT 'uploading' CHECK (upload_status IN ('uploading', 'processing', 'completed', 'error')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT personal_files_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS for security
ALTER TABLE public.personal_files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for personal_files
CREATE POLICY "Users can view own files" 
  ON public.personal_files FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own files" 
  ON public.personal_files FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own files" 
  ON public.personal_files FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own files" 
  ON public.personal_files FOR DELETE 
  USING (auth.uid() = user_id);

-- Create email verification codes table
CREATE TABLE public.email_verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT email_verification_codes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS for verification codes
ALTER TABLE public.email_verification_codes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for verification codes
CREATE POLICY "Users can view own verification codes" 
  ON public.email_verification_codes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own verification codes" 
  ON public.email_verification_codes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own verification codes" 
  ON public.email_verification_codes FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to automatically set user_id and updated_at
CREATE OR REPLACE FUNCTION public.set_user_id_for_personal_files()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.user_id = auth.uid();
  NEW.updated_at = now();
  
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to manage personal files';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for personal_files
CREATE TRIGGER set_user_id_personal_files
  BEFORE INSERT OR UPDATE ON public.personal_files
  FOR EACH ROW EXECUTE FUNCTION public.set_user_id_for_personal_files();

-- Create function to clean up expired verification codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.email_verification_codes 
  WHERE expires_at < now() OR used = true;
END;
$$;