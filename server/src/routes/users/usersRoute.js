const express = require("express");
const { registerUser,fetchUsersCtrl,loginUsersCtrl } = require("../../controllers/users/usersCtrl");

const userRoute = express.Router();


userRoute.post("/register",registerUser);
userRoute.post("/login",loginUsersCtrl);
userRoute.post("/",fetchUsersCtrl);

module.exports = userRoute;