
import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
  sessions?: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the main content start
      const mainContent = document.getElementById('getting-started') || 
                         document.getElementById('journey-begins') || 
                         document.getElementById('introduction') ||
                         document.getElementById('overview');
      
      if (mainContent) {
        const rect = mainContent.getBoundingClientRect();
        const shouldBeSticky = rect.top <= 120; // Account for navbar height + padding
        setIsSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Increased for better spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className={`
        ${isSticky ? 'fixed top-24 z-40' : 'static'} 
        max-h-[calc(100vh-8rem)] overflow-y-auto p-4 
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md 
        border border-gray-200 dark:border-gray-800 rounded-md 
        transition-all duration-300 animate-fade-in shadow-sm hover:shadow-md
        ${isSticky ? 'w-72' : 'w-full'}
      `}
    >
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">On This Page</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-left w-full transition-colors group"
            >
              <div className="flex flex-col">
                <span className="group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                {item.sessions && (
                  <span className="text-xs text-muted-foreground italic mt-1">
                    {item.sessions}
                  </span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
