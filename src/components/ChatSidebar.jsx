import React from 'react';

export default function ChatSidebar({ chats, selectedChat, onSelectChat, onNewChat }) {
  return (
    <div
      className="border-end p-2 d-flex flex-column"
      style={{ width: '250px', height: '100%', overflowY: 'auto', flexShrink: 0 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Chats</h5>
        <button className="btn btn-sm btn-success" onClick={onNewChat}>
          + New
        </button>
      </div>

      {chats.length === 0 && <div>No chats yet.</div>}

      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`p-2 mb-1 rounded ${
            selectedChat?.id === chat.id ? 'bg-primary text-white' : 'bg-light'
          }`}
          onClick={() => onSelectChat(chat)}
          style={{ cursor: 'pointer' }}
        >
          {chat.title || 'Untitled Chat'}
        </div>
      ))}
    </div>
  );
}
