import { User } from '../../models/User.model.js';

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleLogin= (passport) => {
    console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback"
    }, async(accessToken, refreshToken,profile,done) =>{
        console.log(profile)
        try {
            const user = await User.findOneAndUpdate({
                googleId:profile?.id
            },

            {
                name:profile.displayName,
                email:profile.emails[0].value,
                picture:profile.photos[0].value
            },
            {upsert:true,new:true}
        );
        done(null,user)
        } catch (error) {
            done(error,null)
        }
    }))
}

export default googleLogin;