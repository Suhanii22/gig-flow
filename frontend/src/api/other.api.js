import API from "./axios";


//fetch current user
export const fetchCurrentUser = () => API.get("/api/other/me");