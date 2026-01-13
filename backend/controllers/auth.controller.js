import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// REGISTERATION
export const registerUser = async (req, res) => {
    console.log("REGISTER HIT", req.body);

  // const { name, email, password, role , services } = req.body;

 const { name, email, password } = req.body;

  try {
    // Checking if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // services: role === "provider" ? services || [] : [],
    });

    // Generating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

   res.cookie("token", token, {
  httpOnly: true,
  secure: false,        // true only in production (https)
  sameSite: "lax",
  maxAge: 5 * 24 * 60 * 60 * 1000,
});

    // res.status(201).json({
    //   user: { id: user._id, name: user.name, email: user.email },
    //   token,
    // });


    res.status(201).json({
  message: "User registered successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
  // token,
});


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generating JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

      res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

     res.status(201).json({
  message: "User logged in successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
  // token,
});



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
