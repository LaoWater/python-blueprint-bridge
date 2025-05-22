
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useContent } from './ContentProvider';
import EditableContent from './EditableContent';

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
  page: string;
  section: string;
}

const EditableCodeBlock = ({ title, language = 'python', code, page, section }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { getContent } = useContent();
  
  const codeContent = getContent(page, section);
  const displayCode = codeContent?.code || code;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block relative group mb-4">
      <div className="flex justify-between mb-2">
        {title && (
          <EditableContent
            type="title"
            page={page}
            section={`${section}-title`}
            contentId={codeContent?.id}
            className="text-sm font-medium text-python-blue dark:text-python-yellow"
          >
            <span>{title}</span>
          </EditableContent>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">{language}</span>
        </div>
      </div>
      
      <EditableContent
        type="code"
        page={page}
        section={section}
        contentId={codeContent?.id}
        className="relative"
      >
        <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto">
          <code className="language-python">{displayCode}</code>
        </pre>
      </EditableContent>
      
      <button 
        onClick={handleCopy} 
        className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
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

export default EditableCodeBlock;
