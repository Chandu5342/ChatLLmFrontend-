import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { Bell, Coins } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import UserDropdown from "./UserDropdown";
import OrgDropdown from "./OrgDropdown";
import { getUserById } from "../api/user";

export default function Topbar() {
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext); // ref
  const [credits, setCredits] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch initial user data
  useEffect(() => {
    if (!user?.id) return;
    const fetchUserData = async () => {
      try {
        const data = await getUserById(user.id);
        console.log("👤 User data fetched:", data);
        setCredits(data.user.credits || 0);
        setNotifications(data.user.notifications || []);
      } catch (err) {
        console.error("❌ Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, [user]);

  // Setup Socket listeners after socket is ready
  useEffect(() => {
    const setupListeners = () => {
      if (!socket?.current) return;
      const s = socket.current;

      //console.log("🧠 [Topbar] Socket ready, attaching listeners:", s.id);

      const handleNotification = (newNotification) => {
        console.log("🔔 [Socket] Notification received:", newNotification);
        setNotifications((prev) => [newNotification, ...prev]);
      };

      const handleCreditUpdate = (data) => {
        console.log("💰 [Socket] Credit update received:", data);
        setCredits(data);
      };

      s.on("notification", handleNotification);
      s.on("credit-update", handleCreditUpdate);

      return () => {
        s.off("notification", handleNotification);
        s.off("credit-update", handleCreditUpdate);
      };
    };

    // Listen to custom event dispatched from SocketContext
    window.addEventListener("socket-ready", setupListeners);

    return () => {
      window.removeEventListener("socket-ready", setupListeners);
    };
  }, [socket]);

  // Debug render logs
  //console.log("👀 [Topbar Render] Current notifications:", notifications);
 // console.log("👀 [Topbar Render] Current credits:", credits);

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white shadow-sm"
      style={{ height: "60px", zIndex: 10 }}
    >
      <div className="d-flex align-items-center gap-3">
        <OrgDropdown />
      </div>

      <div className="fw-semibold text-muted">💬 AI Chat Dashboard</div>

      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center text-warning fw-semibold">
          <Coins size={18} className="me-1 text-warning" />
          {credits || 0} credits
        </div>

        <div className="position-relative">
          <Bell
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setShowNotifications(!showNotifications)}
          />

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

        <UserDropdown user={user} />
      </div>
    </div>
  );
}
