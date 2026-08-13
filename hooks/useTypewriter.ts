"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDuration?: number;
  enabled?: boolean;
}

export function useTypewriter(words: string[], options?: TypewriterOptions) {
  const { typingSpeed = 100, erasingSpeed = 50, pauseDuration = 2000, enabled = true } = options ?? {};
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (!enabled || words.length === 0) return;
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isErasing && text.length < currentWord.length) {
      timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
    } else if (!isErasing && text.length === currentWord.length) {
      timeout = setTimeout(() => setIsErasing(true), pauseDuration);
    } else if (isErasing && text.length > 0) {
      timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), erasingSpeed);
    } else {
      timeout = setTimeout(() => {
        setIsErasing(false);
        setWordIndex((i) => i + 1);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isErasing, wordIndex, words, typingSpeed, erasingSpeed, pauseDuration, enabled]);

  return enabled ? text : (words[0] ?? "");
}
