"use client";
import React, { createContext, useState, useContext } from 'react';

type CommentMode = 'edit' | 'reply' | null;

type CommentContextType = {
    replyTo: any;
    setReplyTo: React.Dispatch<React.SetStateAction<any>>;
    mode: CommentMode;
    setMode: React.Dispatch<React.SetStateAction<CommentMode>>;
    answerUuid: string;
    setAnswerUuid: React.Dispatch<React.SetStateAction<string>>;
};

const CommentContext = createContext<CommentContextType>({
    replyTo: null,
    setReplyTo: () => {},
    mode: null,
    setMode: () => {},
    answerUuid: '',
    setAnswerUuid: () => {},
});

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
    const [replyTo, setReplyTo] = useState<any>(null);
    const [mode, setMode] = useState<CommentMode>(null);
    const [answerUuid, setAnswerUuid] = useState<string>('');
    

    return (
        <CommentContext.Provider value={{ replyTo, setReplyTo, mode, setMode, answerUuid, setAnswerUuid }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => useContext(CommentContext);