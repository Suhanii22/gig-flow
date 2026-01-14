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



//Socket.IO 
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "https://gig-flow-opal.vercel.app",
    credentials: true,
  },
});



io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});




// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
