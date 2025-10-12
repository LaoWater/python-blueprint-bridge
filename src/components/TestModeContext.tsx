import React, { createContext, useContext, useState } from 'react';

interface TestModeContextType {
  isTestMode: boolean;
  setTestMode: (mode: boolean) => void;
}

const TestModeContext = createContext<TestModeContextType | undefined>(undefined);

export const TestModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTestMode, setIsTestMode] = useState(false);

  const setTestMode = (mode: boolean) => {
    setIsTestMode(mode);
  };

  return (
    <TestModeContext.Provider value={{ isTestMode, setTestMode }}>
      {children}
    </TestModeContext.Provider>
  );
};

export const useTestMode = () => {
  const context = useContext(TestModeContext);
  if (context === undefined) {
    throw new Error('useTestMode must be used within a TestModeProvider');
  }
  return context;
};
