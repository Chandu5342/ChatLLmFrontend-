// src/components/ChatInput.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { sendMessageToLLM } from '../api/chat';

export default function ChatInput({ chatId, addMessage }) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);

    try {
      const res = await sendMessageToLLM({
        chat_id: chatId,
        sender_id: user.id,
        content: message,
      });

      // Update chat in parent
      addMessage(res.data.userMessage);
      addMessage(res.data.assistantMessage);

      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
      alert(err.response?.data?.message || 'Send failed');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="d-flex mt-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
      />
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
