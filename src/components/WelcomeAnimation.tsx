import React, { useState, useEffect } from 'react';

interface WelcomeAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
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
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setShowCursor(true);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    
    const typeLines = async () => {
      const newDisplayedLines: string[] = [];
      
      // Type each message line by line
      for (let lineIndex = 0; lineIndex < messages.length; lineIndex++) {
        setCurrentLineIndex(lineIndex);
        const currentMessage = messages[lineIndex];
        
        // Type current message character by character
        for (let charIndex = 0; charIndex <= currentMessage.length; charIndex++) {
          setCurrentCharIndex(charIndex);
          const currentText = currentMessage.slice(0, charIndex);
          
          // Update the current line being typed
          const updatedLines = [...newDisplayedLines];
          updatedLines[lineIndex] = currentText;
          setDisplayedLines(updatedLines);
          
          // Wait between characters
          await new Promise(resolve => setTimeout(resolve, 60));
        }
        
        // Line complete - add to permanent lines and pause
        newDisplayedLines.push(currentMessage);
        setShowCursor(false);
        await new Promise(resolve => setTimeout(resolve, 400));
        setShowCursor(true);
      }
      
      // All lines complete, hold for longer to be readable
      setShowCursor(false);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Hold for 3 seconds
      
      // Fade out
      setIsAnimating(false);
      setTimeout(onComplete, 800);
    };

    // Start typing after brief delay
    setTimeout(typeLines, 400);
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
      <div className="bg-gray-900/50 backdrop-blur-md border border-green-500/15 rounded-lg px-4 py-3 max-w-sm shadow-xl">
        <div className="font-mono text-xs text-green-400/90 space-y-1">
          {displayedLines.map((line, index) => (
            <div key={index} className="flex items-center min-h-[14px]">
              <span className="flex-1">{line}</span>
            </div>
          ))}
          {/* Current line being typed */}
          {currentLineIndex < messages.length && (
            <div className="flex items-center min-h-[14px]">
              <span className="flex-1">
                {displayedLines[currentLineIndex] || ''}
              </span>
              {showCursor && (
                <span 
                  className="inline-block w-0.5 h-3 bg-green-400/70 ml-1"
                  style={{
                    animation: 'blink 0.8s infinite'
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};