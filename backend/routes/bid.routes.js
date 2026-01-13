import express from "express";
import { createBid, getBidsByGig, hireBid } from "../controllers/bid.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Submit a new bid (freelancer)
router.post("/", verifyToken, createBid);

// Get all bids for a specific gig (gig owner only)
router.get("/:gigId", verifyToken, getBidsByGig);

// // Hire a freelancer (update bid status, gig owner only)
router.patch("/:bidId/hire", verifyToken, hireBid);

export default router;
