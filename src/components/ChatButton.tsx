import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2, ClipboardCopy, Check, Trash2 } from 'lucide-react'; // Added Trash2
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming this is your custom ShadCN Input
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const INITIAL_ASSISTANT_MESSAGE: Message = {
  content: "Ask me anything about Python, and I'll do my best to help you with clear explanations and code examples.",
  sender: 'assistant',
  timestamp: new Date()
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

const markdownProseClasses = (sender: 'user' | 'assistant') => `
  prose prose-sm
  max-w-none
  prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1.5
  prose-p:my-1.5
  prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-li:leading-snug
  prose-blockquote:my-1.5 prose-blockquote:pl-3 prose-blockquote:border-l-2 prose-blockquote:italic
  ${sender === 'user' ? 'prose-blockquote:border-white/50' : 'dark:prose-blockquote:border-gray-600 prose-blockquote:border-gray-300'}
  prose-code:font-mono prose-code:text-xs prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm
  prose-code:before:content-[''] prose-code:after:content-['']
  prose-pre:font-mono prose-pre:text-xs prose-pre:my-2 prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-md prose-pre:overflow-x-auto
  ${sender === 'user' ? 'prose-invert' : 'dark:prose-invert'}
`;

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_ASSISTANT_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input field


  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
      // Focus input when chat opens
      // Timeout helps ensure the element is rendered and ready for focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]); // Scroll when messages update or chat opens/closes

  // Separate useEffect for focusing input, depends only on isOpen
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);


  const handleClearChat = () => {
    setMessages([INITIAL_ASSISTANT_MESSAGE]);
    setInputText('');
    // Optionally, re-focus input after clearing
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return; // isLoading check here prevents multiple rapid sends

    const newUserMessage: Message = { content: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, newUserMessage]);
    const currentInput = inputText; // Capture current input before clearing
    setInputText(''); // Clear input field immediately
    setIsLoading(true); // Set loading for the button

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { message: currentInput }
      });

      if (error) {
        console.error("Error calling chat assistant:", error);
        setMessages(prev => [...prev, { 
          content: "Sorry, I encountered an error. Please try again.", 
          sender: 'assistant', 
          timestamp: new Date() 
        }]);
      } else if (data?.response) {
        setMessages(prev => [...prev, { 
          content: data.response, 
          sender: 'assistant', 
          timestamp: new Date() 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          content: "I received an empty response. Please try again.", 
          sender: 'assistant', 
          timestamp: new Date() 
        }]);
      }
    } catch (error) {
      console.error("Error calling chat assistant:", error);
      setMessages(prev => [...prev, { 
        content: "Sorry, I encountered an error. Please try again.", 
        sender: 'assistant', 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false); // Reset loading for the button
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) { // Also check !isLoading here for consistency
      e.preventDefault();
      handleSendMessage();
    }
  };

  const extractTextFromHastNode = (node: any): string => {
    let textContent = '';
    function getText(elementNode: any) {
      if (elementNode.type === 'text') textContent += elementNode.value;
      else if (elementNode.type === 'element' && elementNode.children) elementNode.children.forEach(getText);
    }
    if (node && node.children) node.children.forEach(getText);
    return textContent;
  };

  return (
    <div className="fixed bottom-12 right-8 z-[999]">
      {isOpen && (
        <div className="mb-4 w-[90vw] max-w-[900px] h-[80vh] max-h-[800px] bg-white dark:bg-gray-950 rounded-lg shadow-2xl border border-border animate-fade-in overflow-hidden flex flex-col">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-800 dark:to-blue-900 text-white dark:text-blue-100 flex justify-between items-center shrink-0">
            <div className="flex items-center">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center mr-3"><Bot size={16} className="text-white" /></div>
              <h3 className="font-medium text-lg">Blue Pigeon Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-full hover:bg-white/15 transition-colors"
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                <Trash2 size={18} />
              </button>
              <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[85%] shadow-md text-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-700 dark:to-indigo-700'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                  }`}>
                    <div className={markdownProseClasses(message.sender)}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          pre: ({ node, children, ...props }) => {
                          const codeNode = node?.children?.[0];
                          const textToCopy = codeNode ? extractTextFromHastNode(codeNode) : '';
                          const [copied, setCopied] = useState(false);
                          const handleCopy = async () => {
                            if (!textToCopy) return;
                            try {
                              await navigator.clipboard.writeText(textToCopy);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            } catch (err) { console.error('Failed to copy: ', err); }
                          };
                          const preBg = message.sender === 'user' ? 'bg-black/30' : 'bg-gray-100 dark:bg-slate-800';
                          return (
                            <div className="relative group my-2">
                              <pre {...props} className={`${props.className || ''} ${preBg} p-3 pt-9 rounded-md overflow-x-auto text-xs leading-relaxed`}>{children}</pre>
                              {textToCopy && (
                                <button onClick={handleCopy} className="absolute top-1.5 right-1.5 p-1 bg-slate-600/60 hover:bg-slate-500/80 rounded text-slate-100/80 hover:text-slate-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label={copied ? "Copied!" : "Copy code"}>
                                  {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
                                </button>
                              )}
                            </div>
                          );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-2 pt-1 border-t ${message.sender === 'user' ? 'border-white/20' : 'border-gray-200 dark:border-gray-700/50'} text-right ${
                      message.sender === 'user' ? 'text-blue-100 dark:text-indigo-200 opacity-75' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && ( /* This is now just a visual cue, doesn't reflect input state */
                 <div className="flex justify-start"><div className="p-3 rounded-lg max-w-[85%] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md"><div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"><Loader2 size={16} className="animate-spin" /><span>Assistant is typing...</span></div></div></div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-3 border-t border-border bg-white dark:bg-gray-900 shrink-0">
            <div className="flex items-center space-x-2">
              <Input
                ref={inputRef} // Assign ref to input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Python..."
                className="flex-grow dark:bg-gray-800 dark:text-gray-50"
                // Input is NOT disabled by isLoading anymore
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputText.trim() || isLoading} // Button is disabled by isLoading
                className="shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
          </div>
        </div>
      )}

      <button onClick={toggleChat} className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group" aria-label="Open chat assistant">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 rounded-full transition-transform duration-300 group-hover:scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        <Bot size={28} className="relative z-10 text-white transition-transform duration-300 group-hover:rotate-[-15deg] group-hover:scale-110" />
      </button>
    </div>
  );
};

export default ChatButton;