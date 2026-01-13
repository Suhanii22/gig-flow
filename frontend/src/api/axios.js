import axios from "axios";


//creating instance of axios
const API=axios.create({
    //  baseURL: import.meta.env.VITE_BACKEND_URL , 
    baseURL: "https://gig-flow-urlc.onrender.com",
    // credentials: "include", 
    withCredentials: true,
    headers:{
        "content-Type":"application/json",
    },
   
});


//attaching token to every request
//used when we already have token

// API.interceptors.request.use(
//     (config)=>{
//        const token=localStorage.getItem("token");
//        if(token){
//         config.headers.Authorization=`Bearer ${token}`
//        }
//        return config;
//     }
// );



export default API;
