const User = require("../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler")

module.exports.userVerification = asynchandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid token" });
      }

      const user = await User.findById(data.id);
      if (!user) {
        return res.status(401).json({ status: false, message: "User not found" });
      }

      req.user = user._id
      next(); 
    });
  } catch (error) {
    console.error("Error in user verification:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
});
