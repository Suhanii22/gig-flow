import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { io } from "../server.js";




// Submit a new bid (freelancer)
export const createBid = async (req, res) => {
  try {
    const { gigId, price, message } = req.body;

    if (!gigId || !price || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optional: prevent owner from bidding on their own gig
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });



   if (gig.ownerId.toString() === (req.user.id || req.user._id).toString()) {
  return res.status(403).json({ message: "Cannot bid on your own gig" });
}

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      price,
      message,
      status: "pending",
    });

    res.status(201).json(bid);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create bid" });
  }
};

// Get all bids for a specific gig (owner only)
export const getBidsByGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // Only the gig owner can see all bids
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId }).populate("freelancerId", "name email");
    res.status(200).json(bids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

// Hire a freelancer (update bid status)
export const hireBid = async (req, res) => {
//    try {
    console.log("1")
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

      console.log("2")
    const gig = await Gig.findById(bid.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

      console.log("3")
   if (gig.ownerId.toString() !== (req.user.id || req.user._id).toString()) {
  return res.status(403).json({ message: "Not allowed" });
}

  console.log("4")
    if (bid.status !== "pending") {
  return res.status(400).json({ message: "Bid already processed" });
}

if (gig.status !== "open") {
  return res.status(400).json({ message: "Gig is not open for hiring" });
}
  
  console.log("5")

    // accept selected bid
    bid.status = "hired";
    await bid.save();





      console.log("6")
    // reject other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

      console.log("7")
    // update gig
    gig.status = "assigned";
    gig.assignedFreelancer = bid.freelancerId;
    await gig.save();




     // ✅ Emit real-time event to the hired freelancer
//  io.to(`freelancer-${bid.freelancerId}`).emit("hiredNotification", {
//   message: `You have been hired for "${gig.title}"!`,
//   gigId: gig._id, // optional, send any extra info you want
// });




io.to(`freelancer-${bid.freelancerId}`).emit('hiredNotification', {
  message: `You have been hired for "${gig.title}"!`,
  gigId: gig._id,
  gigTitle: gig.title
});





 console.log("completed")
    res.json({ message: "Freelancer hired successfully" });
   
//   } catch (err) {
//     console.log("this is error")
//     res.status(500).json({ message: "Hiring failed" });
//   }


console.log("its hirebid controller")
};


// export const hireBid = async (req, res) => {
//   try {
//     // 🔒 Atomic bid acceptance
//     const bid = await Bid.findOneAndUpdate(
//       { _id: req.params.bidId, status: "pending" },
//       { status: "hired" },
//       { new: true }
//     );

//     if (!bid) {
//       return res.status(400).json({ message: "Bid already processed" });
//     }

//     // 🔒 Reject other bids
//     await Bid.updateMany(
//       { gigId: bid.gigId, _id: { $ne: bid._id } },
//       { status: "rejected" }
//     );

//     // 🔒 Atomic gig assignment
//     const gig = await Gig.findOneAndUpdate(
//       { _id: bid.gigId, status: "open" },
//       {
//         status: "assigned",
//         assignedFreelancer: bid.freelancerId,
//       },
//       { new: true }
//     );

//     if (!gig) {
//       return res.status(400).json({ message: "Gig already assigned" });
//     }

//     res.json({ message: "Freelancer hired successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Hiring failed" });
//   }
// };


