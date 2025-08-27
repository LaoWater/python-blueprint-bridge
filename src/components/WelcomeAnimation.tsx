import React, { useState, useEffect } from 'react';

interface WelcomeAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const messages = [
    'Global connection established ⚡',
    'Europe West → San Francisco pod',
    'Your keystrokes race across continents...',
    'VM ready 🚀 Syncing files...'
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentMessageIndex(0);
      setDisplayedText('');
      setShowCursor(true);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    let messageIndex = 0;
    let charIndex = 0;

    const typeMessage = () => {
      const currentMessage = messages[messageIndex];
      
      if (!currentMessage) {
        // All messages complete, hold briefly then finish
        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(onComplete, 500);
        }, 800);
        return;
      }

      if (charIndex < currentMessage.length) {
        // Continue typing current message
        setDisplayedText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeMessage, 50); // Typing speed
      } else {
        // Message complete, pause then move to next
        setShowCursor(false);
        setTimeout(() => {
          messageIndex++;
          charIndex = 0;
          setCurrentMessageIndex(messageIndex);
          setDisplayedText('');
          setShowCursor(true);
          setTimeout(typeMessage, 200);
        }, 600); // Pause between messages
      }
    };

    // Start typing after brief delay
    setTimeout(typeMessage, 300);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-4 right-4 z-[100] transition-all duration-500 ${
        isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
      style={{ 
        position: 'fixed', 
        top: '16px', 
        right: '16px', 
        zIndex: 100,
        pointerEvents: 'none'
      }}
    >
      <div className="bg-gray-900/40 backdrop-blur-sm border border-green-500/10 rounded-lg px-3 py-2 max-w-xs shadow-lg">
        <div className="font-mono text-xs text-green-400/85 flex items-center min-h-[16px]">
          <span className="flex-1">
            {displayedText}
          </span>
          {showCursor && (
            <span 
              className="inline-block w-0.5 h-3 bg-green-400/60 ml-0.5"
              style={{
                animation: 'blink 0.8s infinite'
              }}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};