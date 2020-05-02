'use strict';
const passport = require('passport');
const passportJWT = require('passport-jwt');
const p4ssw0rd = require('p4ssw0rd');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      const user = await User.findOne({ email: jwtPayload.email });
      return done(null, { _id: user._id, email: user.email });
    }
  )
);

module.exports = passport;
