'use strict';
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/userModel');

/**
 * Passport strategy to handle JWT bearer tokens
 */
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      const user = await User.findOne({ email: jwtPayload.email });
      return done(null, { _id: user._id, email: user.email });
    }
  )
);

module.exports = passport;
