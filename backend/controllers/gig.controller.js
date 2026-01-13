
import Gig from "../models/Gig.js";

//fetching all gigs
export const getAllGigs = async (req, res) => {
  try {
    // const gigs = await Gig.find()
    // .sort({ createdAt: -1 })
    // .populate("assignedFreelancer", "name email")


     const filter = { status: "open" };

    const gigs = await Gig.find(filter)
      .sort({ createdAt: -1 })
      .populate("assignedFreelancer", "_id name email");

    
     console.log("req.user in getAllGigs:", req.user);
    // Add isOwner for each gig
    const gigsWithOwnerFlag = gigs.map((gig) => ({
      ...gig._doc, // spread original data
      isOwner: gig.ownerId.toString() === req.user.id
      
    }));

    res.status(200).json(gigsWithOwnerFlag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};


export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id,   // ✅ comes from cookie → middleware
      status: "open",       // ✅ backend-controlled
    });

    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: "Failed to create gig" });
  }
};


// controllers/gig.controller.js
export const searchGigs = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {
      status: "open",
    };

    if (q) {
      filter.title = { $regex: q, $options: "i" }; // case-insensitive
    }

    const gigs = await Gig.find(filter).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};


