import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const socket = useRef(null);

  useEffect(() => {
    if (!user?.id) return;

    // Disconnect old socket if any
    if (socket.current) {
      socket.current.disconnect();
    }

    socket.current = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:4000", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.current.on("connect", () => {
      console.log("✅ Connected to Socket.IO:", socket.current.id);
      socket.current.emit("register", user.id);
    });

    socket.current.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO");
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
