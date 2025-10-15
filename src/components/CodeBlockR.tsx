import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlockR({
  language = 'python',
  children,
}: {
  language?: string;
  children: string;
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      showLineNumbers
      wrapLongLines
      customStyle={{
        borderRadius: '0.75rem',
        padding: '1rem',
        margin: 0,
        background: 'transparent',
        overflowX: 'auto',
        fontSize: '0.9rem',
      }}
      lineNumberStyle={{ color: '#6b7280', paddingRight: '1em' }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
