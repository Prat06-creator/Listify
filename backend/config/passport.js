// const passport = require('passport');


// require('./strategies/google-login')(passport)
// require('./strategies/jwt')(passport)

import passport from 'passport';
import googleLogin from './strategies/google-login.js';
import jwtStrategy from './strategies/jwt.js';
googleLogin(passport);
jwtStrategy(passport);
export default passport;