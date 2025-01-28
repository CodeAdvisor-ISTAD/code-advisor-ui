"use client"; // Ensure this is a client-side component

import React, { useRef, useEffect } from "react";
import "highlight.js/styles/github.css"; // Import the highlight.js styles
import "./styleTextEditor.css"; // Use your custom CSS file

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = React.memo(({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log("content : ", content);

  // Function to apply syntax highlighting
  const applySyntaxHighlighting = () => {
    if (containerRef.current) {
      // Find all <pre><code> blocks inside the container
      const codeBlocks = containerRef.current.querySelectorAll("pre code");
      // Apply syntax highlighting to each block
      codeBlocks.forEach((block) => {
        (window as any).hljs.highlightElement(block);
      });
    }
  };

  // Apply syntax highlighting immediately after rendering
  useEffect(() => {
    applySyntaxHighlighting();
  }, [content]); // Re-run this effect when content changes

  return (
<<<<<<< HEAD
    <>
      <div
        className="tiptap"
        dangerouslySetInnerHTML={{ __html: content }}
      />

    </>
=======
    <div
      ref={containerRef}
      className="tiptap prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
>>>>>>> 74623ab8108269f38ea91e946d09845abe6a3721
  );
});

export default Preview;