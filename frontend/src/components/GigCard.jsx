import React from "react";

const Gig = ({ gig }) => {



  // const isOwner = gig.ownerId === currentUser.id;

  // const handleBid = () => {
  //   if (isOwner) {
  //     alert("You cannot bid on your own gig");
  //     return;
  //   }

  //   onBid(gig.id);
  // };

  return (

    <>
       <div className="border">
         <h3>{gig.title}  title</h3>
         <p>{gig.description} desc</p>
         <p>Budget: ₹{gig.budget}</p>
         <p>Status: {gig.status}</  p> 
         {/* <button onClick={handleBid} disabled={gig.status !== "open"}> */}
   
         <button>
           Place Bid
         </button  >
         {/* {isOwner && <p>(This is your gig)</p>} */}
       </div>



    </>

  );
};

export default Gig;
