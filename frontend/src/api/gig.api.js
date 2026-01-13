import API from "./axios";




//fetching all gigs
export const fetchAllGigs = () => API.get("/api/gigs");

//creating gig
export const createNewGig = (data) => API.post("/api/gigs", data);


export const searchGigs = (query) => API.get(`/api/gigs/search?q=${query}`);

