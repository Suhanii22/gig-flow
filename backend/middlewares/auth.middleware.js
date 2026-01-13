import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   try {
//     // 1️⃣ Get token from cookies
//     const token = req.cookies.token;


//     if (!token) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     // 2️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 3️⃣ Attach user info to request
//     req.user = { id: decoded.id }; // only id, no role needed

//     next(); // continue to next middleware / controller
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };




// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id };  // attach user info to request
//     next(); // pass control to next middleware or route handler
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };









const verifyToken = (req, res, next) => {
 
  const token = req.cookies.token;
  console.log(req)


if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };  // attach user info to request
    next(); // pass control to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export  {verifyToken};