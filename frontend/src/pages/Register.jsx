
import React from 'react'
import { useState } from 'react'
import { registerUser } from "../api/auth.api";

import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();



  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    password: ""

  });

  const handleSubmit = async (e) => {
    e.preventDefault();

      // const res = 
      await registerUser(formData);

      //  localStorage.setItem("token", res.data.token);



      // console.log(res.data);

      //navigating to dashboard
      navigate("/userdashboard")

  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>

      <form onSubmit={handleSubmit} className='flex flex-col mt-[10%]  w-1/2 max-w-[400px] p-6   bg-[#f0eeee] m-auto rounded-xl'>
        <span className='pl-3 text-2xl font-bold mb-8 '>SignUp</span>
        <input type="text" placeholder='Name' name='name' value={formData.name} onChange={handleChange} className=' p-2 m-2 bg-[#ffff] rounded-2xl' />
        <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} className=' p-2 m-2 bg-[#ffff] rounded-2xl' />
        <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} className=' p-2 m-2 bg-[#ffff] rounded-2xl' />

        <button type="submit" className=' p-2 m-2 mt-10 bg-[#315171] text-[#ffff] font-semibold'>
          Submit
        </button>


        <p onClick={() => navigate("/login")} className='m-auto p-3'>
          Already have an account? <span className='text-[#425ccd] font-[500]'>Login</span>
        </p>

      </form>

    </>
  )
}

export default Register