// CommentContext.jsx
"use client";
import { createContext, useContext, useState } from "react";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const [replyTo, setReplyTo] = useState(null);

    return (
        <CommentContext.Provider value={{ replyTo, setReplyTo }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => useContext(CommentContext);
