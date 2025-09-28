import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookies from '../utils/generateToken.js';

export const signup = async(req,res) =>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"})
        }

        const user = await User.findOne({ username });

        if(user){
            return res.status(400).json({error: "Username already exists"})
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const profilePic = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740&q=80";

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic
        })

        if(newUser){
            // Generate JWT token here
            generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();
        }

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic
        })
    }
    catch(err){
        console.log("Error in singup controller", err.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async(req,res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookies(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            profilePic: user.profilePic
        })


    }
    catch(err){
        console.log("Error in login controller", err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout = (req,res) =>{
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    }
    catch(err){
        console.log("Error in logout controller", err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
