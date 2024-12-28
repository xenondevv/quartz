import User from "../models/User.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const {name, username, email, password} = req.body;
    
    try{
        const emailExists = await User.findOne({email});
        const usernameExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({message: "Email already in use!"});
        }

        if(usernameExists){
            return res.status(400).json({message: "Username already in use!"});
        }

        const user = await User.create({
            name,
            username,
            email,
            password
        });
        
        res.status(201).json({
            message: "User created",
        });
    }
    catch (error){
        res.status(500).json({
            message: "Error: " + error.message,
        });
    }

}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        if(user.password === password){
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1000d'});
            return res.status(200).json({token});
        }else {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        res.status(500).json({message: "Error: " + error.message});
    }

}

export {registerUser, loginUser};