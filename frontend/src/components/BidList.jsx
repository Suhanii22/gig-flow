import { useEffect, useState } from "react";
import { fetchBidsByGig } from "../api/bid.api";
import { hireBid } from "../api/bid.api";

const BidsList = ({ gigId ,isOwner}) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const loadBids = async () => {
      try {
        const res = await fetchBidsByGig(gigId);
        setBids(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadBids();
  }, [gigId]);

  if (!bids.length) return <p>No bids yet</p>;


    const handleHire = async (bidId) => {
    try {
        console.log("req sent from handle hire")
      const res = await hireBid(bidId); // store response from backend
      alert(res.data.message);          // show backend message

      // update local bids to reflect accepted/rejected
      setBids((prev) =>
        prev.map((b) =>
          b._id === bidId
            ? { ...b, status: "accepted" }
            : { ...b, status: "rejected" }
        )
      );
    } catch (err) {
      console.error("Hire error:", err);

      // show actual error message from backend if available
      const message = err.response?.data?.message || "Hiring failed";
      alert(message);
    }
  };

  return (
    <div>
      <h3>Bids for this gig</h3>
      {bids.map((bid) => (
        <div key={bid._id} className="border p-2 my-2">
          <p>Freelancer: {bid.freelancerId?.name || "Unknown"}</p>
          <p>Price: ₹{bid.price}</p>
          <p>Message: {bid.message}</p>
          <p>Status: {bid.status}</p>




          
          {/* ✅ HIRE BUTTON */}
          {isOwner && bid.status === "pending" && (
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => handleHire(bid._id)}
            >
              Hire
            </button>
          )}

          {bid.status === "accepted" && <p>✅ Hired</p>}
        </div>
      ))}
    </div>
  );
};

export default BidsList;
