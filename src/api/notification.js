import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:4000/api/notifications";

// Create notification
export const createNotificationAPI = async (user_id, organization_id, message) => {
  const token = getToken();
  const res = await axios.post(BASE_URL, { user_id, organization_id, message }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.notification;
};

// Get notifications for user
export const getNotifications = async (user_id) => {
  const token = getToken();
  const res = await axios.get(`${BASE_URL}/${user_id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.notifications;
};
