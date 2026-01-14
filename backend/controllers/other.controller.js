// controllers/authController.js

import User from "../models/User.js";



export const getMyInfo = async (req, res) => {
 
    const user = await User.findById(req.user.id).select("_id name email");
    if (!user) return res.json({ message: "User not found" });

    res.json(user);
 
};



