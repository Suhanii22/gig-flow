import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {

 
  const token = req.cookies.token;
 

if (!token) {
    return res.json({ message: "Not authenticated" });
  }


  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };  // attaching user info to request
    next(); 

};


export  {verifyToken};