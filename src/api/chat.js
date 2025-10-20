import API from './axios';

// 🔹 Get all chats for an organization
export const getOrgChats = async (organization_id) => {
  if (!organization_id) throw new Error('Organization ID required');

  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await API.get(`/chats/org/${organization_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.chats; // backend returns { status, chats }
};

// 🔹 Get messages for a chat
export const getChatMessages = async (chat_id) => {
 
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await API.get(`/chats/${chat_id}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🔹 Send message to LLM
export const sendMessageToLLM = async (chat_id, sender_id, content) => {
 
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  // ✅ Always include auth + required payload
  const res = await API.post(
    '/chats/send',
    { chat_id, sender_id, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

// 🔹 Create a new chat session
export const createChat = async (organization_id, created_by, title = 'Untitled Chat') => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await API.post(
    '/chats',
    { organization_id, created_by, title },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};
