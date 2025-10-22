import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const socket = useRef(null);

  useEffect(() => {
    if (!user?.id) return;

    // Disconnect previous socket if exists
    if (socket.current) {
      socket.current.disconnect();
    }

    // Connect new socket
    socket.current = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:4000", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    const s = socket.current;

    s.on("connect", () => {
      console.log("✅ Connected to Socket.IO:", s.id);
      s.emit("register", user.id);

      // 🔔 Trigger a custom event so other components know socket is ready
      window.dispatchEvent(new Event("socket-ready"));
    });

    s.on("disconnect", () => console.log("❌ Disconnected from Socket.IO"));

    return () => s.disconnect();
  }, [user?.id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
