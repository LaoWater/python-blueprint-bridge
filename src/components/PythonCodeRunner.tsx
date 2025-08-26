// src/components/PythonCodeRunner.tsx
// Example React component demonstrating Python terminal integration

import React, { useState } from 'react';
import { usePythonTerminal } from '../hooks/usePythonTerminal';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export const PythonCodeRunner: React.FC = () => {
  const {
    sessionId,
    status,
    isReady,
    error,
    isLoading,
    isConnected,
    terminalOutput,
    canRun,
    canSendCommands,
    createSession,
    saveAndRunFile,
    sendCommand,
    deleteSession,
    clearOutput
  } = usePythonTerminal();

  const [code, setCode] = useState(`# Welcome to Blue Pigeon Python Terminal!
print("🐍 Hello from Python!")

# Try some basic operations
x = 42
y = 13
result = x + y
print(f"The answer to everything plus lucky number: {result}")

# Data structures
fruits = ["apple", "banana", "cherry"]
print(f"My favorite fruits: {', '.join(fruits)}")

# Simple function
def greet(name):
    return f"Hello, {name}! Welcome to Blue Pigeon!"

print(greet("Programmer"))
`);
  
  const [filename, setFilename] = useState('main.py');
  const [command, setCommand] = useState('');

  const handleCreateSession = async () => {
    try {
      await createSession();
    } catch (err) {
      console.error('Failed to create session:', err);
    }
  };

  const handleRunCode = async () => {
    if (!canRun) return;
    
    try {
      await saveAndRunFile(filename, code);
    } catch (err) {
      console.error('Failed to run code:', err);
    }
  };

  const handleSendCommand = async () => {
    if (!canSendCommands || !command.trim()) return;
    
    try {
      await sendCommand(command);
      setCommand('');
    } catch (err) {
      console.error('Failed to send command:', err);
    }
  };

  const handleDeleteSession = async () => {
    try {
      await deleteSession();
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'creating': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            🐍 Python Code Runner
            {sessionId && (
              <Badge variant="outline" className={`${getStatusColor(status)} text-white`}>
                {status}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Editor Section */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-32"
                />
                <Button
                  onClick={handleRunCode}
                  disabled={!canRun}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Running...' : '▶ Run Code'}
                </Button>
              </div>
              
              <Textarea
                placeholder="Write your Python code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            </div>

            {/* Terminal Output Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Terminal Output</h3>
                <div className="flex gap-2">
                  {isConnected && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      🔗 Connected
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearOutput}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <Card className="bg-black text-green-400 min-h-96">
                <CardContent className="p-4">
                  <ScrollArea className="h-80">
                    <pre className="text-xs whitespace-pre-wrap font-mono">
                      {terminalOutput || 'No output yet. Create a session and run some code!'}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Command Input */}
              {isConnected && (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter terminal command..."
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
                    className="font-mono text-sm"
                  />
                  <Button
                    onClick={handleSendCommand}
                    disabled={!canSendCommands}
                    variant="outline"
                  >
                    Send
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Session Management */}
          <div className="flex flex-wrap gap-3">
            {!sessionId ? (
              <Button 
                onClick={handleCreateSession}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Creating...' : '🚀 Create Python Session'}
              </Button>
            ) : (
              <Button 
                onClick={handleDeleteSession}
                disabled={isLoading}
                variant="destructive"
              >
                🛑 End Session
              </Button>
            )}

            {sessionId && (
              <div className="text-sm text-muted-foreground">
                Session ID: <code className="bg-muted px-1 rounded">{sessionId}</code>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 How to Use</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Create Session:</strong> Click "Create Python Session" to start a new Kubernetes pod</li>
            <li><strong>Write Code:</strong> Edit the Python code in the left panel</li>
            <li><strong>Run Code:</strong> Click "▶ Run Code" to save and execute your Python script</li>
            <li><strong>Interactive Terminal:</strong> Use the command input to run additional terminal commands</li>
            <li><strong>End Session:</strong> Click "🛑 End Session" to cleanup the Kubernetes pod</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700 font-semibold mb-2">🔧 Integration Features:</p>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>✅ Kubernetes-based Python environment isolation</li>
              <li>✅ Real-time WebSocket terminal connection</li>
              <li>✅ File saving and execution</li>
              <li>✅ Interactive command execution</li>
              <li>✅ Session management and cleanup</li>
              <li>✅ Pre-installed packages (pandas, numpy, matplotlib, etc.)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PythonCodeRunner;