import React, { useState, useEffect, useContext } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import Topbar from '../components/Topbar';
import { UserContext } from '../context/UserContext';
import { getOrgChats, getChatMessages, createChat, sendMessageToLLM } from '../api/chat';

export default function Chat() {
  const { activeOrg, user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeOrg?.id) return;
    const fetchChats = async () => {
      setLoading(true);
      try {
        const chatsData = await getOrgChats(activeOrg.id);
        setChats(chatsData);
      } catch (err) {
        console.error('Failed to fetch chats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [activeOrg]);

  useEffect(() => {
    if (!selectedChat?.id) {
      setMessages([]);
      return;
    }
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(selectedChat.id);
        setMessages(data.messages);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [selectedChat]);

 const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    let chatToUse = selectedChat;
    try {
      if (!chatToUse?.id) {
        const title = content.length > 30 ? content.slice(0, 30) + "..." : content;
        const newChat = await createChat(activeOrg.id, user.id, title || "New Chat");
        setChats((prev) => [newChat, ...prev]);
        setSelectedChat(newChat);
        chatToUse = newChat.chat;
      }
      console.log(chatToUse)
      const tempMessage = { id: Date.now(), role: "user", content };
      setMessages((prev) => [...prev, tempMessage]);

      await sendMessageToLLM(chatToUse.id, user.id, content);

      const updated = await getChatMessages(chatToUse.id);
      setMessages(updated.messages);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };
  const handleNewChat = () => {
    setSelectedChat(null);
    setMessages([]);
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', overflow: 'hidden' }}>
      <Topbar />

      <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
        <ChatSidebar
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          onNewChat={handleNewChat}
        />

        <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
          <ChatWindow chat={selectedChat} messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
