import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const proetectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unautherized - No Token Provided"})
        }

        const decoded =  jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded){
            return res.status(401).json({error: "Unautherized - No Token Provided"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;

        next();
    }
    catch(err){
        console.log("error in protectRoute middleware: ", err.message);
        console.log(token)
        res.status(500).json({error: "Internal server error"});
    }
}

export default proetectRoute;