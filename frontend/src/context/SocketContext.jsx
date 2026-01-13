// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io as socketIOClient } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, currentUser }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    // Connect to backend Socket.IO server
    const socketInstance = socketIOClient(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });



    //remove later
    socketInstance.on("connect", () => {
  console.log("🟢 frontend socket connected:", socketInstance.id);
});




    setSocket(socketInstance);

    // Join a room named after the user's ID
    socketInstance.emit("joinRoom", currentUser.id);

    // Listen for notifications
    socketInstance.on("hiredNotification", (data) => {
      console.log("Received notification:", data);
      setNotifications((prev) => [...prev, data]);
    });




    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket and notifications
export const useSocket = () => {
  return useContext(SocketContext);
};
