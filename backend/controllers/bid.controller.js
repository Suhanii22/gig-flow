import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { io } from "../server.js";




// Submit a new bid (freelancer)
export const createBid = async (req, res) => {
 
    const { gigId, price, message } = req.body;

    //is evrything present
    if (!gigId || !price || !message) {
      return res.json({ message: "All fields are required" });
    }

    //finding in db
    const gig = await Gig.findById(gigId);
    if (!gig) return res.json({ message: "Gig not found" });

     //is this owner
    if (gig.ownerId.toString() === (req.user.id || req.user._id).toString()) {
      return res.json({ message: "Cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      price,
      message,
      status: "pending",
    });

    res.json(bid);
 
};

// Get all bids for a specific gig (owner only)
export const getBidsByGig = async (req, res) => {
  
    const { gigId } = req.params;

    //finding in db
    const gig = await Gig.findById(gigId);
    if (!gig) return res.json({ message: "Gig not found" });

    // Only the gig owner can see all bids
    if (gig.ownerId.toString() !== req.user.id) {
      return res.json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId }).populate("freelancerId", "name email");
    res.json(bids);

};

// Hire a freelancer (update bid status)
export const hireBid = async (req, res) => {
  
 
  const bid = await Bid.findById(req.params.bidId);
  if (!bid) return res.json({ message: "Bid not found" });

 
  const gig = await Gig.findById(bid.gigId);
  if (!gig) return res.json({ message: "Gig not found" });

  if (gig.ownerId.toString() !== (req.user.id || req.user._id).toString()) {
    return res.json({ message: "Not allowed" });
  }

  if (bid.status !== "pending") {
    return res.json({ message: "Bid already processed" });
  }

  if (gig.status !== "open") {
    return res.json({ message: "Gig is not open for hiring" });
  }

  // accept selected bid
  bid.status = "hired";
  await bid.save();

  // reject other bids
  await Bid.updateMany(
    { gigId: gig._id, _id: { $ne: bid._id } },
    { status: "rejected" }
  );

  // update gig
  gig.status = "assigned";
  gig.assignedFreelancer = bid.freelancerId;
  await gig.save();


  io.to(`freelancer-${bid.freelancerId}`).emit('hiredNotification', {
    message: `You have been hired for "${gig.title}"!`,
    gigId: gig._id,
    gigTitle: gig.title
  });

  res.json({ message: "Freelancer hired successfully" });

};


