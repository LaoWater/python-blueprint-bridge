import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a file processing assistant. Your task is to convert various file types into well-formatted Markdown documentation.

**Instructions:**
- Convert the provided file content into clean, readable Markdown
- Preserve the original structure and meaning
- Add appropriate headers, code blocks, lists, and formatting
- For code files (.py, .js, .sql): Use proper syntax highlighting
- For text files: Structure as documentation with headers and sections
- For data files (.json): Format as structured documentation
- Add a header with filename and file type
- Include a brief summary of the file's purpose if apparent
- Use proper Markdown formatting (headers, code blocks, lists, etc.)

**Output Format:**
Return ONLY the Markdown content, no additional text or explanations.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileId, filename, content } = await req.json();
    console.log('Processing file:', filename);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get auth header and create authenticated client
    const authHeader = req.headers.get('Authorization');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: authHeader || ''
        }
      }
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User must be authenticated to manage personal files');
    }

    // Process with OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { 
            role: 'user', 
            content: `Filename: ${filename}\n\nFile Content:\n${content}` 
          }
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const processedContent = data.choices[0]?.message?.content;
    
    if (!processedContent) {
      throw new Error('No response content from OpenAI');
    }

    // Update file record with processed content
    const { error: updateError } = await supabase
      .from('personal_files')
      .update({
        processed_md_content: processedContent,
        upload_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', fileId);

    if (updateError) throw updateError;

    console.log('File processing completed for:', filename);

    return new Response(JSON.stringify({ 
      success: true,
      processed_content: processedContent 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-personal-file function:', error);
    
    // Update file status to error if we have fileId
    const { fileId } = await req.json().catch(() => ({}));
    if (fileId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      await supabase
        .from('personal_files')
        .update({ upload_status: 'error' })
        .eq('id', fileId);
    }
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});