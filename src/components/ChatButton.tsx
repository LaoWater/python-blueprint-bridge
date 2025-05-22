
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "Hello! How can I help you with Python today?", 
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample Python assistant responses
  const botResponses = [
    "In Python, you can use list comprehensions for concise data transformations: `[x*2 for x in range(10)]`",
    "Remember that Python uses indentation for code blocks, not curly braces like many other languages.",
    "The Zen of Python: Simple is better than complex, and explicit is better than implicit.",
    "Python's built-in functions like map(), filter(), and reduce() can help write cleaner functional code.",
    "For data science, the pandas library is essential - try `import pandas as pd` to get started.",
    "Use virtual environments to manage your project dependencies: `python -m venv env`",
    "Python dictionaries are super powerful. Try `dict.get(key)` to avoid KeyError exceptions.",
    "Type hints are available in Python 3.5+: `def greet(name: str) -> str:`",
    "The f-string syntax makes string formatting easy: `f\"Hello, {name}!\"`",
    "To debug your code, try adding `breakpoint()` where you want to pause execution."
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { 
      content: inputText, 
      sender: 'user',
      timestamp: new Date()
    }]);
    
    setInputText('');
    
    // Simulate assistant response after a short delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { 
        content: randomResponse, 
        sender: 'assistant',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-border animate-fade-in overflow-hidden">
          <div className="p-4 bg-python-blue dark:bg-python-dark text-white dark:text-python-yellow flex justify-between items-center">
            <h3 className="font-medium">Python Assistant</h3>
            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/10">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 h-[calc(100%-140px)] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-python-light dark:bg-python-dark text-python-blue dark:text-python-yellow self-end' 
                        : 'bg-gray-100 dark:bg-gray-800 self-start'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Python..."
                className="flex-grow"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputText.trim()}
                className="shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 bg-python-blue dark:bg-python-dark text-white rounded-full shadow-lg hover:bg-python-blue/90 dark:hover:bg-python-dark/90 transition-all"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} className="animate-pulse" />
      </button>
    </div>
  );
};

export default ChatButton;
