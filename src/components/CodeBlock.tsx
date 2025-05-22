
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
}

const CodeBlock = ({ title, language = 'python', code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="flex justify-between mb-2">
        {title && <span className="text-sm font-medium text-python-blue dark:text-python-yellow">{title}</span>}
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">{language}</span>
        </div>
      </div>
      
      <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
      
      <button 
        onClick={handleCopy} 
        className="copy-button" 
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
