const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User");
const generateToken = require("../../middlewares/generateToken");

//register
const registerUser = async(req,res) =>{
    const {email,firstname , lastname,password} = req?.body;

    const userExists = await User.findOne({email});
    if(userExists) throw new Error("User Already Exists");
    try{
        if(userExists){
            res.json("user Exist");
        }
        const user = await User.create({email,firstname,lastname,password});
        return res.json({status:true , message:"recored registered"})
    }catch(error){
        res.json(error);
    }
};

//fecthing all users
const fetchUsersCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

//login user
const loginUsersCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userFound = await User.findOne({ email });
  
      if (userFound && (await userFound.isPasswordMatch(password))) {
        res.json({
          _id: userFound._id,
          firstname: userFound.firstname,
          lastname: userFound.lastname,
          email: userFound.email,
          isAdmin: userFound.isAdmin,
          token: generateToken(userFound._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error in loginUsersCtrl:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports = {registerUser,fetchUsersCtrl,loginUsersCtrl}