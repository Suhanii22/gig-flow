import axios from "axios";


//creating instance of axios
const API=axios.create({
    //  baseURL: import.meta.env.VITE_BACKEND_URL , 
    baseURL: "/api",
    // baseURL:"http://localhost:5000/api",
    
    withCredentials: true,
    headers:{
        "Content-Type":"application/json",
    },
   
});



export default API;
