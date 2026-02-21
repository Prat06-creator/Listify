// const {Strategy:JwtStrategy} = require('passport-jwt');
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { User } from '../../models/User.model.js';



const cookieExtracter = req=> req.cookies?.token;


const jwtStrategy = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest:cookieExtracter,
        secretOrKey:process.env.JWT_SECRET
    },async(payload,done) => {
        try {
             const user = await User.findById(payload.sub)
             if(user) {
                done(null,user)
             }else{
                done(null,false)
             }
        } catch (error) {
            done(error,false)
        }
    }))
}
export default jwtStrategy;