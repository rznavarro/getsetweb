import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Components } from 'react-markdown';

interface MathRendererProps {
  content: string;
}

export function MathRenderer({ content }: MathRendererProps) {
  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1 className="font-dancing text-3xl font-bold text-white mb-4 mt-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="font-dancing text-2xl font-bold text-white mb-3 mt-5" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="font-dancing text-xl font-bold text-white mb-2 mt-4" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="font-montserrat text-white mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-dancing font-bold text-white" {...props}>
        {children}
      </strong>
    ),
    ul: ({ children, ...props }) => (
      <ul className="font-montserrat text-white ml-6 mb-4 list-disc" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="font-montserrat text-white ml-6 mb-4 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-2" {...props}>
        {children}
      </li>
    ),
    code: ({ children, ...props }) => (
      <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-white" {...props}>
        {children}
      </code>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-white/50 pl-4 italic my-4 text-white" {...props}>
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="math-content">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
