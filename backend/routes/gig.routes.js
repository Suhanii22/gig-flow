import express from "express";
import { getAllGigs, createGig ,searchGigs } from "../controllers/gig.controller.js";

import  {verifyToken}  from "../middlewares/auth.middleware.js";


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

router.get("/", verifyToken , getAllGigs);

router.post("/",verifyToken, createGig);

router.get("/search", searchGigs);


export default router;
