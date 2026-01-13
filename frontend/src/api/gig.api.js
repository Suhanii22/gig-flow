import API from "./axios";




//fetching all gigs
export const fetchAllGigs = () => API.get("/gigs");

//creating gig
export const createNewGig = (data) => API.post("/gigs", data);


export const searchGigs = (query) => API.get(`/gigs/search?q=${query}`);

