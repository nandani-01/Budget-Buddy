const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/User");


const authMiddleware = expressAsyncHandler(async (req,res,next)=>{
    let token;

    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req?.headers.authorization?.split('')[1];

        try{
            if(token){
                const decodedUser = jwt.verify(token,'abcd');
                const user = await user.findbyId(decodedUser?.id)
                req.user = user;
                next();
            }
        } catch(error){
            throw new Error("Not authorized token expired");
        }
    }
    else{
        throw new Error("There is no token attached to the header ")
    }
});


module.exports = authMiddleware;