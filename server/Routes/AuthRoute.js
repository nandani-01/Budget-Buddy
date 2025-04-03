const {Signup} = require("../Controllers/AuthController");
const {Login} = require("../Controllers/AuthController");

const { Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");


const router = require("express").Router();

router.post('/logout',Logout)
router.post("/signup" , Signup);
router.post("/login" , Login)
router.post("/verify-user", userVerification , (req,res)=>{
    res.json({ status: true, user: req.user }); 
});


module.exports = router;