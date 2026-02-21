import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
     googleId:{type:String, sparse:true},
    name:String,
    picture:String,

   
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true
    },
    lastLogin:{
        type:Date,
        default:Date.now

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken: String,
    verificationTokenExpiresAt:Date,
},{timestamps:true});

export const User= mongoose.model('User',userSchema);