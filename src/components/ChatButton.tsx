
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTheme } from './theme-provider';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-border animate-fade-in overflow-hidden">
          <div className="p-4 bg-python-blue dark:bg-python-dark text-white dark:text-python-yellow flex justify-between items-center">
            <h3 className="font-medium">Python Assistant</h3>
            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/10">
              <X size={18} />
            </button>
          </div>
          <div className="p-4 h-[calc(100%-60px)] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%] self-start">
                <p className="text-sm">Hello! How can I help you with Python today?</p>
              </div>
              <div className="bg-python-light dark:bg-python-dark p-3 rounded-lg max-w-[80%] self-end text-python-blue dark:text-python-yellow">
                <p className="text-sm">Ask me anything about Python syntax or concepts.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={toggleChat}
        className="chat-button"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} className="animate-pulse" />
      </button>
    </div>
  );
};

export default ChatButton;
