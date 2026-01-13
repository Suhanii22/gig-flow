import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import GigCard from './components/GigCard'
import Login from './pages/Login'
// import { Routes } from 'react-router-dom'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'


function App() {
 

  return (
    <>

    <Routes >
    
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
      


      <Route path="/userdashboard" element={<UserDashboard />} />
    
    
    
     </Routes>
     
     
     </>
  )
}

export default App
