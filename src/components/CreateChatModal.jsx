// src/components/MessageInput.jsx
import React, { useState } from 'react';

export default function MessageInput({ chat, onNewMessage }) {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim() || !chat) return;

    const userMsg = { id: Date.now(), role: 'user', content };
    const assistantMsg = { id: Date.now() + 1, role: 'assistant', content: 'This is a dummy assistant reply.' };

    onNewMessage(userMsg, assistantMsg);
    setContent('');
  };

  return (
    <div className="d-flex p-2 border-top">
      <input
        type="text"
        className="form-control me-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="btn btn-primary" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
