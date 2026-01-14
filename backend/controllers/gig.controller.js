
import Gig from "../models/Gig.js";

//fetching all gigs
export const getAllGigs = async (req, res) => {


  const filter = { status: "open" };

  const gigs = await Gig.find(filter)
    .sort({ createdAt: -1 })
    .populate("assignedFreelancer", "_id name email");


  console.log("req.user in getAllGigs:", req.user);

  // Adding isOwner for each gig
  const gigsWithOwnerFlag = gigs.map((gig) => ({
    ...gig._doc,
    isOwner: gig.ownerId.toString() === req.user.id

  }));

  res.json(gigsWithOwnerFlag);

};


export const createGig = async (req, res) => {

  const { title, description, budget } = req.body;

  if (!title || !description || !budget) {
    return res.json({ message: "All fields required" });
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user.id,
    status: "open",
  });

  res.json(gig);

};


// controllers/gig.controller.js
export const searchGigs = async (req, res) => {

  const { q } = req.query;

  const filter = {
    status: "open",
  };

  if (q) {
    filter.title = { $regex: q, $options: "i" };
  }

  const gigs = await Gig.find(filter).sort({ createdAt: -1 });
  res.json(gigs);

};


