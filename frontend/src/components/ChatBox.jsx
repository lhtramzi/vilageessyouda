// src/components/ChatBox.jsx

import React, { useState, useEffect, useRef } from 'react';

const ChatBox = ({ messages, onSend, userName, isAdmin }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-96 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">الدردشة</h3>
      <div className="flex-1 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md text-sm ${
              msg.sender === userName
                ? 'bg-blue-100 dark:bg-blue-700 self-end'
                : msg.sender === 'SYSTEM'
                ? 'text-center text-gray-500 italic'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            {msg.sender !== 'SYSTEM' && (
              <span className="font-semibold">{msg.sender}: </span>
            )}
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg border-t border-b border-l border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="اكتب رسالة..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
        >
