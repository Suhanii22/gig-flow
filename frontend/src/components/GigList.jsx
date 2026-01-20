



import { useState, useEffect } from "react";
import { createNewBid, fetchUserBids } from "../api/bid.api";
import BidsList from "./BidList";

const GigList = ({ gigs, currentUser }) => {
  const [showBidForm, setShowBidForm] = useState(false);
  const [currentGigId, setCurrentGigId] = useState(null);
  const [bidData, setBidData] = useState({ price: "", message: "" });
  const [visibleGigId, setVisibleGigId] = useState(null);
  const [userBids, setUserBids] = useState([]);

  // Load user's bids
  useEffect(() => {
    const loadUserBids = async () => {
      try {
        const res = await fetchUserBids();
        setUserBids(res.data);
      } catch (err) {
        console.error("Failed to load user bids:", err);
      }
    };
    loadUserBids();
  }, []);

  // Open bid form
  const handlePlaceBid = (gigId) => {
    setCurrentGigId(gigId);
    setShowBidForm(true);
    setBidData({ price: "", message: "" });
  };

  // Toggle owner's bid list
  const toggleBids = (gigId) => {
    setVisibleGigId(visibleGigId === gigId ? null : gigId);
  };

  // Submit a bid
  const submitBid = async (e) => {
    e.preventDefault();
    try {
      await createNewBid({
        gigId: currentGigId,
        price: bidData.price,
        message: bidData.message,
      });
      alert("Bid placed!");
      setShowBidForm(false);
      setBidData({ price: "", message: "" });

      // Refresh user bids so status updates immediately
      const res = await fetchUserBids();
      setUserBids(res.data);
    } catch (err) {
      console.error("Failed to create bid:", err);
      alert("Failed to place bid");
    }
  };

  // Get my bid for a gig
  const getMyBidForGig = (gigId) => {
    return userBids.find((b) => b.gigId === gigId) || null;
  };

  return (
    <div className=" p-5 w-[100%] h-[80vh] overflow-y-auto hide-scrollbar  flex flex-wrap  gap-4">
      {!gigs || gigs.length === 0 ? (
        <p className="text-l font-light  m-auto text-center">No gigs found</p>
      ) : (
        gigs
          .filter((gig) => {
            const myBid = getMyBidForGig(gig._id);
            return gig.status === "open" || myBid || gig.assignedFreelancer?._id === currentUser._id;
          })
          .map((gig) => {
            const myBid = getMyBidForGig(gig._id);
            return (
              <div
                key={gig._id}
                className="w-[300px]   m-auto rounded-2xl p-4 bg-[#ffffff] "
              >
                <h3 className="text-lg font-semibold text-gray-800">{gig.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{gig.description}</p>

                <div className="text-sm text-gray-700 mt-3 space-y-1">
                  <p>
                    <span className="font-medium">Budget:</span> ₹{gig.budget}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {gig.status}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handlePlaceBid(gig._id)}
                    disabled={!!myBid || gig.status !== "open"}
                    className={`px-4 py-1.5 text-sm rounded border ${
                      gig.status === "open" && !myBid
                        ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                        : "border-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {myBid ? myBid.status : "Place Bid"}
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
                  gig.assignedFreelancer?._id === currentUser._id && (
                    <p className="text-sm text-green-600 mt-3"> Assigned to you</p>
                  )}

                {gig.isOwner && (
                  <p className="text-xs text-gray-500 mt-2">(This is your gig)</p>
                )}

                {/* Owner bid list */}
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
                    <h3 className="text-sm font-semibold text-gray-800">Place Bid</h3>

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
            );
          })
      )}
    </div>
  );
};

export default GigList;
