

import React from 'react';
import { useState } from 'react'
import { loginUser } from '../api/auth.api';

import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  
    // const res =
     await loginUser(formData)


  //  localStorage.setItem("token", res.data.token);



    //navigating to dashboard
    navigate("/userdashboard");

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }



  return (


    <form onSubmit={handleSubmit} className=' h-[60vh] flex flex-col justify-center  mt-[10%]  w-1/2 max-w-[400px]  p-6   bg-[#f0eeee] m-auto rounded-xl'>    
     <span className='pl-3 text-2xl font-bold mb-8 '>SignIn</span>
      <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} className=' p-2 m-2 bg-[#ffff] rounded-2xl ' />
      <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} className=' p-2 m-2 bg-[#ffff] rounded-2xl ' />

      <button type="submit" className=' p-2 m-2 mt-8  bg-[#315171] text-[#ffff] font-semibold'>
        Submit
      </button>


      <p onClick={() => navigate("/register")} className=' m-auto mt-4 '>
        Don’t have an account?<span className='text-[#425ccd] font-[500]'> Register</span>
      </p>

    </form>



  )
}

export default Login