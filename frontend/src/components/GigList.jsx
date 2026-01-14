import GigCard from "./GigCard";
import { useState } from "react";
import { createNewBid } from "../api/bid.api";
import BidsList from "./BidList";


const GigList = ({ gigs, currentUser }) => {


  // if (!gigs || gigs.length === 0) {
  //   return <p className="text-l font-light pt-20">No gigs found</p>;
  // }


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


  // function to toggle bid list visibility
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
    // <div className="border w-[70%] flex flex-col gap-4 p-2">
    //   {gigs.map((gig) => (
    //     <div key={gig._id} className="border p-4 rounded-[20px] " >
    //       <h3>{gig.title} </h3>
    //       <p>{gig.description} </p>
    //       <p>Budget: ₹{gig.budget}</p>
    //       <p>Status: {gig.status}</p>
    //       <p>owner:{gig.isOwner}</p>
    //       {/* <button onClick={handleBid} disabled={gig.status !== "open"}> */}

    //       <button className="border"
    //         onClick={() => handlePlaceBid(gig._id)}
    //         disabled={gig.status !== "open"}
    //       >
    //         {gig.status === "open" ? "Place Bid" : "Bidding Closed"}
    //       </button>




    //       {gig.status === "assigned" && gig.assignedFreelancer._id === currentUser._id && (
    //         <p>✅ This gig is assigned to you!</p>
    //       )}




    //       {gig.isOwner && <p>(This is your gig)</p>}

    //       {gig.isOwner && (
    //         <button
    //           className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
    //           onClick={() => toggleBids(gig._id)}
    //         >
    //           {visibleGigId === gig._id ? "Hide Bids" : "Show Bids"}
    //         </button>
    //       )}


    //       {gig.isOwner && visibleGigId === gig._id && (
    //         <div className="border p-2 mt-2 bg-gray-100">
    //           {/* <p>Here will be the list of bids for this gig.</p> */}
    //           <BidsList gigId={gig._id} isOwner={gig.isOwner} />
    //         </div>
    //       )}





    //       {showBidForm && currentGigId === gig._id && (
    //         <form onSubmit={submitBid} className="border p-4 my-4">
    //           <h3>Place Bid</h3>
    //           <input
    //             type="number"
    //             placeholder="Price"
    //             value={bidData.price}
    //             onChange={(e) =>
    //               setBidData({ ...bidData, price: e.target.value })
    //             }
    //             required
    //           />
    //           <input
    //             type="text"
    //             placeholder="Message"
    //             value={bidData.message}
    //             onChange={(e) =>
    //               setBidData({ ...bidData, message: e.target.value })
    //             }
    //             required
    //           />
    //           <button type="submit">Submit Bid</button>
    //           <button type="button" onClick={() => setShowBidForm(false)}>
    //             Cancel
    //           </button>
    //         </form>
    //       )}


    //     </div>

    //   ))}

    // </div>


    <div className="w-[70%] flex flex-col gap-4">
       { !gigs || gigs.length === 0 && (
     <p className="text-l font-light pt-[25%] text-center">No gigs found</p>)}
  {gigs.map((gig) => (
    <div
      key={gig._id}
      className="border border-gray-200 rounded-lg p-4 bg-[#ffffff]"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        {gig.title}
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {gig.description}
      </p>

      <div className="text-sm text-gray-700 mt-3 space-y-1">
        <p><span className="font-medium">Budget:</span> ₹{gig.budget}</p>
        <p><span className="font-medium">Status:</span> {gig.status}</p>
        {/* <p><span className="font-medium">Owner:</span> {String(gig.isOwner)}</p> */}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => handlePlaceBid(gig._id)}
          disabled={gig.status !== "open"}
          className={`px-4 py-1.5 text-sm rounded border
            ${
              gig.status === "open"
                ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
        >
          {gig.status === "open" ? "Place Bid" : "Bidding Closed"}
        </button>

        {gig.isOwner && (
          <button
            onClick={() => toggleBids(gig._id)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            {visibleGigId === gig._id ? "Hide Bids" : "Show Bids"}
          </button>
        )}
      </div>

      {/* Assigned info */}
      {gig.status === "assigned" &&
        gig.assignedFreelancer._id === currentUser._id && (
          <p className="text-sm text-green-600 mt-3">
            ✅ Assigned to you
          </p>
        )}

      {gig.isOwner && (
        <p className="text-xs text-gray-500 mt-2">
          (This is your gig)
        </p>
      )}

      {/* Bids list */}
      {gig.isOwner && visibleGigId === gig._id && (
        <div className="mt-4 border border-gray-200 rounded p-3 bg-gray-50">
          <BidsList gigId={gig._id} isOwner={gig.isOwner} />
        </div>
      )}

      {/* Bid form */}
      {showBidForm && currentGigId === gig._id && (
        <form
          onSubmit={submitBid}
          className="mt-4 border border-gray-200 rounded p-4 space-y-3"
        >
          <h3 className="text-sm font-semibold text-gray-800">
            Place Bid
          </h3>

          <input
            type="number"
            placeholder="Price"
            value={bidData.price}
            onChange={(e) =>
              setBidData({ ...bidData, price: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            required
          />

          <input
            type="text"
            placeholder="Message"
            value={bidData.message}
            onChange={(e) =>
              setBidData({ ...bidData, message: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowBidForm(false)}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  ))}
</div>


  );
};

export default GigList;
