import { useEffect } from 'react';
import { useCitations } from '@/contexts/CitationContext';

interface CitationHighlighterProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

export const CitationHighlighter = ({ editorRef }: CitationHighlighterProps) => {
  const { citations } = useCitations();

  useEffect(() => {
    if (!editorRef.current || citations.length === 0) return;

    const editor = editorRef.current;
    const latestCitation = citations[citations.length - 1];

    // Find and highlight the text in the editor
    const highlightText = (text: string, color: string) => {
      const selection = window.getSelection();
      const range = document.createRange();
      
      // Search for the text in the editor
      const walker = document.createTreeWalker(
        editor,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node;
      while (node = walker.nextNode()) {
        const textContent = node.textContent || '';
        const index = textContent.toLowerCase().indexOf(text.toLowerCase());
        
        if (index !== -1) {
          const span = document.createElement('span');
          span.className = `citation-highlight ${color} px-1 rounded border-l-2 border-primary`;
          span.setAttribute('data-citation', latestCitation.source);
          
          const before = textContent.substring(0, index);
          const matched = textContent.substring(index, index + text.length);
          const after = textContent.substring(index + text.length);
          
          const parent = node.parentNode;
          if (parent) {
            if (before) parent.insertBefore(document.createTextNode(before), node);
            span.textContent = matched;
            parent.insertBefore(span, node);
            if (after) parent.insertBefore(document.createTextNode(after), node);
            parent.removeChild(node);
            break;
          }
        }
      }
    };

    highlightText(latestCitation.text, latestCitation.color);
  }, [citations, editorRef]);

  return null;
};
