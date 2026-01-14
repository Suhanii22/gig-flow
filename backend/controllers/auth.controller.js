import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// REGISTERATION
export const registerUser = async (req, res) => {


  const { name, email, password } = req.body;


  // Checking if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ message: "User already exists" });

  // Hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creating user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generating token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  //cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });



  res.json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },

  });


};




// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding user
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Invalid credentials" });

    // Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Invalid credentials" });

    // Generating JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    //cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 5 * 24 * 60 * 60 * 1000,
      
    // });

    res.json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

    });



  } catch (error) {
    console.error(error);
    res.json({ message: "Server error" });
  }
};



//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
