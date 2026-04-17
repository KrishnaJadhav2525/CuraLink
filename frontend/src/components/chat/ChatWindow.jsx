import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import useChatStore from '../../store/useChatStore.js';
import { motion } from 'framer-motion';
import { Dna, BookOpen, FlaskConical, Sparkles } from 'lucide-react';

export default function ChatWindow() {
  const messages  = useChatStore((s) => s.messages);
  const isLoading = useChatStore((s) => s.isLoading);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#ffffff' }}>
      <div className="flex flex-col pt-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages.every((m) => !m.isStreaming) && (
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
            <LoadingSpinner message="Running research pipeline…" />
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

