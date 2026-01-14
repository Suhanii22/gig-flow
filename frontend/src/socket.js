// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://gig-flow-urlc.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;