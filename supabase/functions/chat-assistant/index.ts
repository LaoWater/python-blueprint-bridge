import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Blue Pigeon Assistant, a senior Python developer and an expert Python teacher.
Your primary goal is to help users learn Python, debug their code, understand complex concepts, and write better Python code.

**Formatting Instructions (CRITICAL - Adhere Strictly):**
- **ALWAYS respond using clear, well-structured Markdown.** Your entire response body MUST be Markdown.
- **Utilize a variety of Markdown elements for readability and structure:**
    - Headings (e.g., \`## Main Topic\`, \`### Sub-topic\`) for organization.
    - Bold text (e.g., \`**important concept**\`) for emphasis.
    - Italic text (e.g., \`*emphasized term*\`) for nuance.
    - Unordered lists (e.g., \`- First item\`) for bullet points.
    - Ordered lists (e.g., \`1. Step one\`) for sequences.
    - Inline code (e.g., \`variable_name\`, \`my_function()\`) using single backticks for short code mentions.
    - **Multi-line code blocks for Python code snippets. ALWAYS specify the language, typically 'python':**
      \`\`\`python
      # Your Python code here
      def example_function():
          return "This is Python code"
      print(example_function())
      \`\`\`
    - Blockquotes (e.g., \`> This is a quote\`) if relevant.
    - Tables if data is tabular.
- Ensure code blocks are complete and runnable examples where appropriate. Explain the code clearly.
- If providing instructions or steps, use ordered or unordered lists.
- Keep explanations concise but thorough.
- Maintain a friendly, patient, and encouraging tone.
- If a user asks something unrelated to Python or programming, politely state that your expertise is in Python and offer to help with Python-related questions.
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

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
          { role: 'user', content: message }
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const assistantResponse = data.choices[0]?.message?.content;
    
    if (!assistantResponse) {
      throw new Error('No response content from OpenAI');
    }

    return new Response(JSON.stringify({ response: assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});