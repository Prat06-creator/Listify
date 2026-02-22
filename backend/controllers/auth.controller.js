import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {User} from '../models/User.model.js';
import {generateTokenAndSetCookies} from '../utils/generateTokenAndSetCookies.js'
import transporter from '../config/nodemailer.js';
import generateEmailTemplate from '../config/emailTemplates.js';
import jwt from 'jsonwebtoken';
dotenv.config();
export const signup = async (req, res) => {
  console.log("📨 Received signup request:", req.body);
  const { email, username } = req.body;
  try {
    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const userAlreadyExists = await User.findOne({ email });
    console.log("User already exists:", userAlreadyExists);
    if (userAlreadyExists) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        isUserAlreadyExists: true,
        isVerified: userAlreadyExists.isVerified
      });
    }
const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    // create new user
    const newUser = await User.create({
      email,
      username,
      isVerified: false,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify your email",
      html: generateEmailTemplate(username, verificationToken)
    });
    return res.status(201).json({
      success: true,
      message: "User created",
      isUserAlreadyExists: false
    });

  } catch (error) {
    console.log("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
export const verifyEmail = async(req,res)=>{
    const {email, code}=req.body;
    try {
        const user=await User.findOne({
           email,
            verificationToken : code,
            verificationTokenExpiresAt:{$gt:Date.now()},
        });
        if (!user){
            return res.status(400).json({success:false, message: "Invalid verification token"});
            }
        if (Date.now()>user.verificationTokenExpiresAt){
            return res.status(400).json({success:false, message: "Verification token expired"});
            
            
        }
        user.isVerified=true;
        user.verificationToken=undefined; //once user is logged in no need of storing in database so undefined
        user.verificationTokenExpiresAt=undefined;
        await user.save(); //updates value and stores in database
        generateTokenAndSetCookies(res, user._id);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

        res.status(200).json({success:true,message:"Email verified successfully", token,
          user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
        });
    
    
    } catch (error) {
        console.error("Error verifying email:", error);
}
}
export const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up.",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
      });
    }
    generateTokenAndSetCookies(res, user._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const logout=async(req,res)=>{
    res.send("logout route");
}
