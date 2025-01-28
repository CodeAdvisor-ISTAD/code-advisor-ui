// components/HighlightInitializer.tsx
"use client"; // Mark this component as a Client Component

import { useEffect } from "react";
import hljs from "highlight.js";

const HighlightInitializer = () => {
  useEffect(() => {
    // Initialize highlight.js
    (window as any).hljs = hljs;
  }, []);

  return null; // This component doesn't render anything
};

export default HighlightInitializer;