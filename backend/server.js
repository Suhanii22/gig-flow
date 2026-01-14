import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
// Routes
import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";
import otherRoutes from "./routes/other.routes.js";

import http from "http";      
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  // origin:"http://localhost:5173",
  origin: "https://gig-flow-opal.vercel.app" , 
  credentials: true,  
}));

// Connecting to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



// Routes
app.use("/api/auth", authRoutes);

app.use("/api/gigs", gigRoutes);

app.use("/api/bids", bidRoutes);

app.use("/api/other", otherRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("GigFlow API is running...");
});





// Create HTTP server and attach Socket.io
const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    // origin:"http://localhost:5173",
    origin: "https://gig-flow-opal.vercel.app",
    credentials: true,
  },
});




io.use((socket, next) => {
  const rawCookie = socket.request.headers.cookie;

  if (!rawCookie) {
    return next(new Error("Not authenticated"));
  }

  const cookies = cookie.parse(rawCookie);
  const token = cookies.token;

  if (!token) {
    return next(new Error("Not authenticated"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: decoded.id }; // same shape as req.user
    next();
  } catch (err) {
    next(new Error("Not authenticated"));
  }
});



io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);



  // Listen for "joinRoom" from frontend
  const userId = socket.user.id;

socket.join(`freelancer-${userId}`);
console.log(`User ${userId} joined room freelancer-${userId}`);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});




// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
