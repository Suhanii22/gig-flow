import API from "./axios";

// Submit a new bid
export const createNewBid = (data) => API.post("/bids", data); 


// Get all bids for a specific gig (owner only)
export const fetchBidsByGig = (gigId) => API.get(`/bids/${gigId}`);

// Hire a freelancer (patch bid status)
export const hireBid = (bidId) => API.patch(`/bids/${bidId}/hire`);


export const fetchUserBids = () => API.get("/bids/my");

