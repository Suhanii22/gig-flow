import express from "express";
// import { getAllGigs, createGig } from "../controllers/gig.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { getMyInfo } from "../controllers/other.controller.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   console.log("GET /api/gigs HIT");
//   res.json([]);
// });

// router.get("/", (req, res) => {
//   console.log("GET /api/gigs HIT");
//   res.json([{ test: "route works" }]);
// });

// router.get("/", (req, res) => {
//   console.log("HIT /api/gigs");
//   res.json([]);
// });
// router.post("/", (req, res) => {
//   console.log("HIT /api/gigs");
//   res.json({hiiii});
// });

router.get("/me", verifyToken , getMyInfo);


export default router;
