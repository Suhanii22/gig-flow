import React, { useEffect, useState } from "react";
import { fetchAllGigs } from "../api/gig.api";
import Gig from "../components/GigCard";
import CreateGig from "../components/CreateGig";
import GigList from "../components/GigList";
import { fetchCurrentUser } from "../api/other.api";
import { searchGigs } from "../api/gig.api";

import { SocketProvider } from '../context/SocketContext'
import Notifications from "../components/Notifications.jsx"



const UserDashboard = () => {
  const [gigs, setGigs] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const [showBidForm, setShowBidForm] = useState(false);
  const [currentGigId, setCurrentGigId] = useState(null);
  const [bidData, setBidData] = useState({ price: "", message: "" });
  const [currentUser, setCurrentUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");







  useEffect(() => {
    loadData();
  }, []);


  //   useEffect(() => {
  const loadData = async () => {


    const userRes = await fetchCurrentUser(); // GET /api/auth/me
    setCurrentUser(userRes.data);
    console.log("userdash");
    console.log(userRes.data.name)
    console.log(userRes)

    console.log("im load gig")
    const res = await fetchAllGigs();



    setGigs(res.data);
    console.log(gigs)



    console.log("im load gig completed")

  };

  const handlePlaceBid = (gigId) => {
    setCurrentGigId(gigId);
    setShowBidForm(true);
    setBidData({ price: "", message: "" });
  };

  const submitBid = async (e) => {
    e.preventDefault();

  }

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


  return (



    <SocketProvider currentUser={currentUser}>



      <div className="flex">

        {/* <div className="border flex justify-center gap-4">


          <div className="border inline-block p-2 m-3">
            <button onClick={() => setShowCreate(prev => !prev)}>
              {showCreate ? "Cancel" : "Create Job"}
            </button>
          </div>


          <input
            type="text"
            placeholder="Search gigs by title"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 m-3"
          />


          <Notifications className='absoloute right-0 top-0' />


          {showCreate && (
            <CreateGig
              onSuccess={() => {
                setShowCreate(false);
                loadData(); // refresh list after submit
              }}
            />
          )}
        </div> */}

        <div className="border flex flex-col items-center p-4 w-2/3">
          <div className="p-4 mb-5 text-2xl font-semibold bg-[#edecec] rounded-2xl">Available Gigs</div>
          <GigList gigs={gigs} currentUser={currentUser} />
        </div>

        <div className="border w-1/3">


          
        <Notifications className='absoloute right-0 top-0' />

      
          <input
            type="text"
            placeholder="Search gigs by title"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 m-3 w-[90%] rounded-xl text-center"
          />
        

<div className="border p-2 m-3  rounded-xl text-center">
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

    </SocketProvider>
  );
};

export default UserDashboard;
