import React, { useEffect, useRef } from "react";

export default function ChatWindow({ chat, messages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!chat) {
    return (
      <div className="d-flex align-items-center justify-content-center text-muted w-100">
        Select or start a chat to begin.
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1.25rem",
        background: "#f5f7fa",
        minHeight: 0,
      }}
    >
      {messages.length === 0 ? (
        <div className="text-muted">No messages yet — start chatting!</div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-3 ${
              msg.role === "user" ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "12px",
                background: msg.role === "user" ? "#007bff" : "#ffffff",
                color: msg.role === "user" ? "#fff" : "#000",
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))
      )}

      {/* ✅ AI Typing Indicator */}
      {isTyping && (
        <div className="d-flex justify-content-start mb-2">
          <div
            style={{
              padding: "8px 12px",
              background: "#ffffff",
              borderRadius: "12px",
              fontStyle: "italic",
              color: "#555",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          >
            AI is typing<span className="blink"> ▋</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
