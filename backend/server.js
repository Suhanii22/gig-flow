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


import http from "http";       // needed to attach socket.io
import { Server } from "socket.io";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());



const allowedOrigins = ["http://localhost:5173"]; // frontend URL


app.use(cors({
  origin: 'http://localhost:5173',  // Exact origin of your frontend (not '*')
  credentials: true,  // Allow credentials (cookies, auth headers, etc.)
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Include OPTIONS for preflight
  // allowedHeaders: ['Content-Type', 'Authorization'],  // Adjust based on your headers
}));

// app.use(cors(corsOptions));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



  // app.get("/api/gigs", (req, res) => {
  //   res.json({ message: "Hello from backend!" });
  // // res.send("This is a message from the server!");
  //   });


// Routes
app.use("/api/auth", authRoutes);
// app.use("api/gigs", gigRoutes);
// console.log("2");
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
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
   console.log("🟢 socket connected:", socket.id);
  console.log("New client connected:", socket.id);



  // Listen for a simple test event
  // socket.on("testMessage", (data) => {
  //   console.log("📨 Received from frontend:", data, "from socket:", socket.id);

  //   // Optional: send a response back
  //   socket.emit("testResponse", { msg: "Hello from backend!" });
  // });



  // Listen for "joinRoom" from frontend
  socket.on("joinRoom", (userId) => {
    socket.join(`freelancer-${userId}`);
    console.log(`Socket ${socket.id} joined room freelancer-${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 socket disconnected:", socket.id);
    console.log("Client disconnected:", socket.id);
  });
});






// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
