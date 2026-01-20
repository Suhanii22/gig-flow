

// // src/context/SocketContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// // create socket ONCE
// const socket = io("https://gig-flow-urlc.onrender.com", {
//   withCredentials: true,
//   autoConnect: false,
// });

// export const SocketProvider = ({ children, currentUser }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (!currentUser) return;

//     // connect once user is available
//     if (!socket.connected) {
//       socket.connect();
//     }

//     socket.on("connect", () => {
//       console.log("🟢 frontend socket connected:", socket.id);

//       // join room AFTER connection
//       socket.emit("joinRoom", currentUser.id);
//     });

//     socket.on("hiredNotification", (data) => {
//       console.log("Received notification:", data);
//       setNotifications((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("hiredNotification");
     
//     };
//   }, [currentUser]);

//   return (
//     <SocketContext.Provider value={{ socket, notifications }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);
