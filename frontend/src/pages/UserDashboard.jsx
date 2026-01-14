import React, { useEffect, useState } from "react";
import { fetchAllGigs } from "../api/gig.api";

import CreateGig from "../components/CreateGig";
import GigList from "../components/GigList";
import { fetchCurrentUser } from "../api/other.api";
import { searchGigs } from "../api/gig.api";
import { LogoutUser } from "../api/auth.api";

// import { SocketProvider } from '../context/SocketContext'
// import Notifications from "../components/Notifications.jsx"
import socket from "../socket";
import toast, { Toaster } from "react-hot-toast";

const UserDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [currentGigId, setCurrentGigId] = useState(null);
  const [bidData, setBidData] = useState({ price: "", message: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");






  useEffect(() => {

    loadData();
  }, []);


  const loadData = async () => {

    const userRes = await fetchCurrentUser(); 
    setCurrentUser(userRes.data);

    const res = await fetchAllGigs();
    setGigs(res.data);
   

  };




  // ✅ Socket.IO Setup
  useEffect(() => {
    if (!currentUser) return;

    // Connect socket
    socket.connect();
    
    // Join user's room
    socket.emit("join", currentUser._id || currentUser.id);
    console.log("✅ Joined room for user:", currentUser._id || currentUser.id);

    // Listen for hired notification
    socket.on("hired", (data) => {
      console.log("🎉 Notification received:", data);
      
      toast.success(
        <div>
          <strong>🎉 {data.message}</strong>
          <p className="text-sm mt-1">Gig: {data.gigTitle}</p>
        </div>,
        {
          duration: 6000,
          position: "top-right",
          style: {
            background: '#10b981',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
          },
        }
      );

      // Optional: Reload gigs to update UI
      loadData();
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    // Cleanup
    return () => {
      socket.off("hired");
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [currentUser]);




  const handlePlaceBid = (gigId) => {
    setCurrentGigId(gigId);
    setShowBidForm(true);
    setBidData({ price: "", message: "" });
  };

  // const submitBid = async (e) => {
  //   e.preventDefault();

  // }

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      loadData(); // reset to all gigs
      return;
    }

    const res = await searchGigs(value);
    setGigs(res.data);
  };



  const handleLogout = async () => {
    
     await LogoutUser();

    // Clear frontend state
      setCurrentUser(null);

      // Redirect to login page (optional)
      navigate("/login");
  }


  return (
<>

    <Toaster />


      <div className="flex bg-[#efefef] min-h-[100vh]">

       

        <div className=" flex flex-col items-center p-4 w-2/3">
          <div className="p-4 mb-5 text-2xl font-semibold bg-[#fdfbfb] shadow-2xl rounded-2xl">Available Gigs</div>
          <GigList gigs={gigs} currentUser={currentUser} />
        </div>

        <div className=" w-1/3">

          <button
      onClick={handleLogout}
      className="px-4 py-2 border-2 border-[#e44d4d] w-[85%] m-[20px] rounded hover:bg-red-400"
    >
      Logout
    </button>



          <input
            type="text"
            placeholder="Search gigs by title"
            value={searchTerm}
            onChange={handleSearch}
            className=" p-2 m-3 w-[90%] rounded-xl text-center bg-[#ffffff] shadow-xl"
          />


          <div className=" p-2 m-3  rounded-xl text-center bg-[#ffffff] shadow-xl">
            <button onClick={() => setShowCreate(prev => !prev)}>
              {showCreate ? "Cancel" : "Create Job"}
            </button>
          </div>


          {showCreate && (
            <CreateGig
              onSuccess={() => {
                setShowCreate(false);
                loadData(); // refresh list after submit
              }}
            />
          )}
        </div>



      </div>


</>
  );
};

export default UserDashboard;
