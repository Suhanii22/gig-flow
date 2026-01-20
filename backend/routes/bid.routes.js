import express from "express";
import { createBid, getBidsByGig, hireBid ,getMyBids} from "../controllers/bid.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = express.Router();

// submiting a new bid (freelancer)
router.post("/", verifyToken, createBid);

router.get("/my",verifyToken,getMyBids);

// Geting all bids for a specific gig (gig owner only)
router.get("/:gigId", verifyToken, getBidsByGig);

// // Hiring a freelancer (update bid status, gig owner only)
router.patch("/:bidId/hire", verifyToken, hireBid);

export default router;
