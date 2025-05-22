import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2 } from 'lucide-react';
import { useTheme } from './theme-provider'; // Assuming this path is correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are Blue Pigeon Assistant, a senior Python developer and an expert teacher.
Your primary goal is to help users learn Python, debug their code, understand complex concepts, and write better Python code.
Provide clear, concise, and accurate explanations.
When providing code snippets, ensure they are complete, runnable (if applicable), and well-commented if complex.
Format all your responses using Markdown. This includes using code blocks for Python code (e.g., \`\`\`python ... \`\`\`), lists for steps, bold/italics for emphasis, etc.
Be friendly, patient, and encouraging.
If a user asks something unrelated to Python or programming, politely steer them back or state you specialize in Python.
`;

// Define the prose classes that will be applied to the Markdown content wrapper
const markdownWrapperProseClasses = `
  prose prose-sm dark:prose-invert max-w-none
  prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5
  prose-headings:my-2
  prose-code:font-mono prose-code:text-xs prose-code:before:content-[''] prose-code:after:content-['']
  prose-pre:my-2 prose-pre:rounded-md prose-pre:text-xs
`;

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm Blue Pigeon, your Python assistant. How can I help you with Python today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) { // Only scroll if chat is open
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const newUserMessage: Message = {
      content: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    // Add user message and immediately update UI for responsiveness
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    // Construct message history for API call *after* adding user message to local state
    // This ensures the API gets the most current user message.
    const currentMessagesForApi = [...messages, newUserMessage];
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...currentMessagesForApi.map(msg => ({ // Use updated messages for API
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      // The last user message is already included from currentMessagesForApi,
      // so no need to add { role: "user", content: newUserMessage.content } again
    ];

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: apiMessages as any,
      });

      const assistantResponse = completion.choices[0]?.message?.content;
      if (assistantResponse) {
        setMessages(prev => [...prev, {
          content: assistantResponse,
          sender: 'assistant',
          timestamp: new Date()
        }]);
      } else {
        throw new Error("No response from assistant.");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setMessages(prev => [...prev, {
        content: "Sorry, I encountered an error trying to respond. Please check the console or try again later.",
        sender: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-12 right-8 z-[999]">
      {isOpen && (
        <div className="mb-4 w-[500px] md:w-[600px] h-[700px] bg-white dark:bg-gray-950 rounded-lg shadow-xl border border-border animate-fade-in overflow-hidden flex flex-col">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-800 dark:to-blue-900 text-white dark:text-blue-100 flex justify-between items-center shrink-0">
            <div className="flex items-center">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot size={16} className="text-white" />
              </div>
              <h3 className="font-medium text-lg">Blue Pigeon Assistant</h3>
            </div>
            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[85%] shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white dark:from-blue-600 dark:to-indigo-700'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        wrapper: ({children}) => <div className={markdownWrapperProseClasses}>{children}</div>,
                        pre: ({node, children, ...props}) => {
                          const preStyle = message.sender === 'user'
                              ? 'bg-black/20 text-white'
                              : 'bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-slate-100';
                          return <pre className={`${preStyle} p-3 rounded-md overflow-x-auto`} {...props}>{children}</pre>;
                        },
                        code: ({node, inline, className: langClassName, children, ...props}) => {
                          if (inline) {
                            const inlineCodeStyle = message.sender === 'user'
                              ? 'bg-black/25 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
                            return (
                              <code
                                className={`${langClassName || ''} ${inlineCodeStyle} px-1.5 py-0.5 rounded-md font-mono text-xs`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          return <code className={`${langClassName || ''} font-mono`} {...props}>{children}</code>;
                        }
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    <p className={`text-xs mt-1.5 text-right ${
                      message.sender === 'user'
                        ? 'text-blue-100 dark:text-indigo-200 opacity-70'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {/* Corrected typing indicator condition */}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="p-3 rounded-lg max-w-[85%] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Loader2 size={16} className="animate-spin" />
                            <span>Assistant is typing...</span>
                        </div>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-3 border-t border-border bg-white dark:bg-gray-900 shrink-0">
            <div className="flex items-center space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Python..."
                className="flex-grow dark:bg-gray-800 dark:text-gray-50 disabled:opacity-70"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputText.trim() || isLoading}
                className="shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        aria-label="Open chat assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 transition-transform duration-300 group-hover:scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="absolute inset-0 blue-pigeon-glow"></div>
        <Bot size={28} className="relative z-10 text-white transition-transform duration-300 group-hover:rotate-[-15deg] group-hover:scale-110" />
      </button>
    </div>
  );
};

export default ChatButton;