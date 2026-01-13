// controllers/authController.js

import User from "../models/User.js";



export const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email");
    if (!user) return res.status(404).json({ message: "User not found" });


    // const { _id, name, email } = user;
    console.log("this is from me")
    console.log(user)
    // console.log(name,id,email)
    // res.json({ id: _id, email });
    res.json(user);
  } catch (err) {
    console.error("getMyInfo error:", err);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};



