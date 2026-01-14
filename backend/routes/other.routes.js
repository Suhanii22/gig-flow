import express from "express";
// import { getAllGigs, createGig } from "../controllers/gig.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { getMyInfo } from "../controllers/other.controller.js";

const router = express.Router();

//getting loggedin user info
router.get("/me", verifyToken , getMyInfo);


export default router;
