const express = require("express");
const {userVerification } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

router.get("/dashboard", userVerification, (req, res) => {
  res.json({ status: true, message: "Welcome to the dashboard!", user: req.user });
});

router.get("/profile", userVerification, (req, res) => {
  res.json({ status: true, message: "User Profile", user: req.user });
});

// router.get("/transactions", userVerification, (req, res) => {
//   res.json({ status: true, message: "Transactions List", transactions: [] });
// });

module.exports = router; 
