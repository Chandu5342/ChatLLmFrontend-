import React, { useEffect, useRef } from 'react';

export default function ChatWindow({ chat, messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        minHeight: 0,
        background: '#f1f3f5',
      }}
    >
      {!chat ? (
        <div className="text-muted">Start a new chat or select one from the sidebar.</div>
      ) : messages.length === 0 ? (
        <div className="text-muted">No messages yet — start chatting!</div>
      ) : (
        <>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded ${
                msg.role === 'user' ? 'bg-primary text-white ms-auto' : 'bg-light'
              }`}
              style={{ maxWidth: '55%' }}
            >
              {msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}
