import GigCard from "./GigCard";
import { useState } from "react";
import { createNewBid } from "../api/bid.api";
import BidsList from "./BidList";


const GigList = ({ gigs, currentUser }) => {


  if (!gigs || gigs.length === 0) {
    return <p className="text-l font-light pt-20">No gigs found</p>;
  }



  const [showBidForm, setShowBidForm] = useState(false);
  const [currentGigId, setCurrentGigId] = useState(null);
  const [bidData, setBidData] = useState({ price: "", message: "" });

  const [visibleGigId, setVisibleGigId] = useState(null);

  // Open bid form
  const handlePlaceBid = (gigId) => {
    setCurrentGigId(gigId);
    setShowBidForm(true);
    setBidData({ price: "", message: "" });
  };


  // ✅ New function to toggle bid list visibility
  const toggleBids = (gigId) => {
    if (visibleGigId === gigId) {
      setVisibleGigId(null); // hide if already open
    } else {
      setVisibleGigId(gigId); // show bids for this gig
    }
  };





  // Submit bid
  const submitBid = async (e) => {
    e.preventDefault();
    await createNewBid({
      gigId: currentGigId,
      price: bidData.price,
      message: bidData.message,
    });

    alert("Bid placed!");
    setShowBidForm(false);
    setBidData({ price: "", message: "" });

  };




  return (
    <div className="border w-[70%] flex flex-col gap-4 p-2">
      {gigs.map((gig) => (
        <div key={gig._id} className="border p-4 rounded-[20px]" >
          <h3>{gig.title} </h3>
          <p>{gig.description} </p>
          <p>Budget: ₹{gig.budget}</p>
          <p>Status: {gig.status}</p>
          <p>owner:{gig.isOwner}</p>
          {/* <button onClick={handleBid} disabled={gig.status !== "open"}> */}

          <button className="border"
            onClick={() => handlePlaceBid(gig._id)}
            disabled={gig.status !== "open"}
          >
            {gig.status === "open" ? "Place Bid" : "Bidding Closed"}
          </button>




          {gig.status === "assigned" && gig.assignedFreelancer._id === currentUser._id && (
            <p>✅ This gig is assigned to you!</p>
          )}




          {gig.isOwner && <p>(This is your gig)</p>}

          {gig.isOwner && (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
              onClick={() => toggleBids(gig._id)}
            >
              {visibleGigId === gig._id ? "Hide Bids" : "Show Bids"}
            </button>
          )}


          {gig.isOwner && visibleGigId === gig._id && (
            <div className="border p-2 mt-2 bg-gray-100">
              {/* <p>Here will be the list of bids for this gig.</p> */}
              <BidsList gigId={gig._id} isOwner={gig.isOwner} />
            </div>
          )}





          {showBidForm && currentGigId === gig._id && (
            <form onSubmit={submitBid} className="border p-4 my-4">
              <h3>Place Bid</h3>
              <input
                type="number"
                placeholder="Price"
                value={bidData.price}
                onChange={(e) =>
                  setBidData({ ...bidData, price: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Message"
                value={bidData.message}
                onChange={(e) =>
                  setBidData({ ...bidData, message: e.target.value })
                }
                required
              />
              <button type="submit">Submit Bid</button>
              <button type="button" onClick={() => setShowBidForm(false)}>
                Cancel
              </button>
            </form>
          )}


        </div>

      ))}

    </div>
  );
};

export default GigList;
