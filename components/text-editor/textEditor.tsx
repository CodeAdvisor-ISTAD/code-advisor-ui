"use client";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./toolBar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useEffect, useState } from "react";
import ImageResize from "tiptap-extension-resize-image";
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import "./styleTextEditor.css";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import yaml from "highlight.js/lib/languages/yaml";
import sql from "highlight.js/lib/languages/sql";
import php from "highlight.js/lib/languages/php";
import pgsql from "highlight.js/lib/languages/pgsql";

import "highlight.js/styles/github.css";
import React, { forwardRef, useImperativeHandle } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor = forwardRef<unknown, RichTextEditorProps>(
  ({ content, onChange }, ref) => {
    const lowlights = createLowlight(common);
    lowlights.register("css", css);
    lowlights.register("javascript", js);
    lowlights.register("typescript", ts);
    lowlights.register("html", html);
    lowlights.register("java", java);
    lowlights.register("yaml", yaml);
    lowlights.register("sql", sql);
    lowlights.register("pgsql", pgsql);
    lowlights.register("php", php);

    const editor = useEditor({
      extensions: [
        StarterKit.configure(),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Heading.configure({
          levels: [1, 2, 3],
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        }),
        CodeBlockLowlight.configure({
          lowlight: lowlights,
          HTMLAttributes: {
            class: "tiptap",
          },
          languageClassPrefix: "language-",
        }),
        Highlight,
        Image,
        ImageResize,
      ],
      content: content,
      editorProps: {
        attributes: {
          class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange(html); // Only call the onChange prop
      },
    });

    useImperativeHandle(ref, () => ({
      clearContent: () => {
        if (editor) {
          editor.commands.clearContent();
        }
      },
      setContent: (content: string) => {
        if (editor) {
          editor.commands.setContent(content);
        }
      },
    }));

    useEffect(() => {
      if (editor && content) {
        editor.commands.setContent(content);
      }
    }, [content, editor]);

    return (
      <div>
        {editor && <ToolBar editor={editor} />}
        <EditorContent editor={editor} style={{ zIndex: "0" }} />
      </div>
    );
  }
);

export default React.memo(RichTextEditor);