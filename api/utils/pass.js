'use strict';
const passport = require('passport');
const passportJWT = require('passport-jwt');
const p4ssw0rd = require('p4ssw0rd');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = require('passport-local').Strategy;
const User = require('../models/userModel');

// local strategy for username password login
passport.use(
  new Strategy(async (email, password, done) => {
    try {
      console.log('login', email);
      const user = User.findOne({ email });
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        p4ssw0rd.simulate();

        return done(null, false, { message: 'Incorrect credentials.' });
      }

      if (!p4ssw0rd.check(user.password, password)) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }

      return done(null, { ...user }, { message: 'Logged In Successfully' });
    } catch (err) {
      return done(err);
    }
  })
);

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
