import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export function CodeBlockR({
  language = 'python',
  children,
}: {
  language?: string;
  children: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const bg = getComputedStyle(ref.current.parentElement!).backgroundColor;
    const match = bg.match(/\d+(\.\d+)?/g)?.map(Number);
    if (match && match.length >= 3) {
      const [r, g, b] = match;
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      setIsDark(brightness < 128);
    }
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div ref={ref} className="relative group" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : prism}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1rem',
          margin: 0,
          background: 'transparent',
          overflowX: 'auto',
        }}
        codeTagProps={{
          style: { fontSize: '1rem', lineHeight: 1.5 },
        }}
        lineNumberStyle={{
          color: isDark ? '#9ca3af' : '#6b7280',
          paddingRight: '1em',
        }}
      >
        {children}
      </SyntaxHighlighter>

      <button
        onClick={handleCopy}
        className={`absolute top-3 right-3 p-2 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity ${
          isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'
        }`}
        aria-label="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
