import React, { useEffect, useState } from "react";
import { fetchAllGigs } from "../api/gig.api";

import CreateGig from "../components/CreateGig";
import GigList from "../components/GigList";
import { fetchCurrentUser } from "../api/other.api";
import { searchGigs } from "../api/gig.api";
import { LogoutUser } from "../api/auth.api";

import { useNavigate } from "react-router-dom";




const UserDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [currentGigId, setCurrentGigId] = useState(null);
  const [bidData, setBidData] = useState({ price: "", message: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();





  const loadData = async () => {

    const userRes = await fetchCurrentUser();
    setCurrentUser(userRes.data);

    const res = await fetchAllGigs();
    setGigs(res.data);


  };

  useEffect(() => {

    loadData();

  }, []);






  const handlePlaceBid = (gigId) => {
    setCurrentGigId(gigId);
    setShowBidForm(true);
    setBidData({ price: "", message: "" });
  };


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





      <div className="  bg-[#f5f4f4] min-h-[100vh]">



        <div className=" flex  justify-between p-1  bg-[#fff] rounded-b-2xl border-b-2 border-gray-100">
          <div className="p-3 mb-1 ml-5 text-3xl font-semibold  rounded-2xl ">Available Gigs</div>
          {/* </div>

        <div className=" w-1/3"> */}



          <div className="flex ">

            <input
              type="text"
              placeholder="Search gigs by title"
              value={searchTerm}
              onChange={handleSearch}
              className="  rounded-3xl text-center py-2 my-3 outline-none focus:outline-none hover:bg-[#f8f8f8] focus:bg-[#f8f8f8]"
            />




            <div className=" px-4 pt-5  rounded-xl text-center hover:text-blue-600 ">
              <button onClick={() => setShowCreate(prev => !prev)}>
                {showCreate ? "Cancel" : "Create Job"}
              </button>
            </div>


            {showCreate && (
              <CreateGig
                onSuccess={() => {
                  setShowCreate(false);
                  loadData();
                }}
              />
            )}






            <button
              onClick={handleLogout}
              className="px-4 py-2    rounded  hover:text-red-600 "
            >
              Logout
            </button>

          </div>


        </div>
        <div >
          <GigList gigs={gigs} currentUser={currentUser} />

        </div>



      </div>


    </>
  );
};

export default UserDashboard;
