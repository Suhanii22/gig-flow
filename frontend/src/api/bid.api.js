import API from "./axios";

// Submit a new bid
export const createNewBid = (data) => API.post("/api/bids", data); 
// data = { gigId, price, message }

// Get all bids for a specific gig (owner only)
export const fetchBidsByGig = (gigId) => API.get(`/api/bids/${gigId}`);

// Hire a freelancer (patch bid status)
export const hireBid = (bidId) => API.patch(`/api/bids/${bidId}/hire`);
