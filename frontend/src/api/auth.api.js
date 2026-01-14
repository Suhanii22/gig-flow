import API from "./axios";

// REGISTER
export const registerUser = (data) => API.post("/auth/register", data);

// LOGIN
export const loginUser = (data) => API.post("/auth/login", data);


export const LogoutUser = () => API.post("/auth/logout");
