import API from "./axios";

// REGISTER
export const registerUser = (data) => API.post("/api/auth/register", data);

// LOGIN
export const loginUser = (data) => API.post("/api/auth/login", data);
