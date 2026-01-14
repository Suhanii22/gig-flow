import express from "express";
import { getAllGigs, createGig ,searchGigs } from "../controllers/gig.controller.js";

import  {verifyToken}  from "../middlewares/auth.middleware.js";


const router = express.Router();

//getting all gigs
router.get("/", verifyToken , getAllGigs);

//creating a gig
router.post("/",verifyToken, createGig);

//searching gigs
router.get("/search", searchGigs);


export default router;
