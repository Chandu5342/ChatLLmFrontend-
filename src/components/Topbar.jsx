import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext"; // 🧩 import socket context
import { Bell, Coins } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import UserDropdown from "./UserDropdown";
import OrgDropdown from "./OrgDropdown";
import { getUserById } from "../api/user";

export default function Topbar() {
  const { user, activeOrg } = useContext(UserContext);
  const socket = useContext(SocketContext); // 🧩 access socket
  const [credits, setCredits] = useState(0);
  const [notifications, setNotifications] = useState([]); // 🔔 store incoming notifications
  const [showNotifications, setShowNotifications] = useState(false);

  // 🪣 Fetch user data (credits + notifications)
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserById(user.id);
        console.log("User data:", data);
        setCredits(data.user.credits || 0);
        setNotifications(data.user.notifications || []);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, [user]);

useEffect(() => {
  if (!socket) return;

  console.log("🧠 Setting up notification listener...");

  const handleNotification = (newNotification) => {
    console.log("🔔 New notification received:", newNotification);
    setNotifications((prev) => [newNotification, ...prev]);
  };

  socket.on("notification", handleNotification);

  return () => {
    console.log("🧹 Removing notification listener");
    socket.off("notification", handleNotification);
  };
}, [socket]);

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white shadow-sm"
      style={{ height: "60px", zIndex: 10 }}
    >
      {/* Left: Org Dropdown */}
      <div className="d-flex align-items-center gap-3">
        <OrgDropdown />
      </div>

      {/* Center: App Title */}
      <div className="fw-semibold text-muted">💬 AI Chat Dashboard</div>

      {/* Right: Credits + Notifications + UserDropdown */}
      <div className="d-flex align-items-center gap-3">
        {/* Credits */}
        <div className="d-flex align-items-center text-warning fw-semibold">
          <Coins size={18} className="me-1 text-warning" />
          {credits || 0} credits
        </div>

        {/* Notifications */}
        <div className="position-relative">
          <Bell
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setShowNotifications(!showNotifications)}
          />

          {/* 🔴 Badge count */}
          {notifications.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
            >
              {notifications.length}
            </span>
          )}

          <NotificationPanel
            visible={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
          />
        </div>

        {/* User Dropdown */}
        <UserDropdown user={user} />
      </div>
    </div>
  );
}
