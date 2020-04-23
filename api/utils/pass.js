'use strict';
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

// local strategy for username password login
passport.use(
  new Strategy(async (email, password, done) => {
    try {
      const user = userModel.getUserLogin(email);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, { ...user }, { message: 'Logged In Successfully' });
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, done) => {
      const user = userModel.getUserLogin(jwtPayload.email);
      return done(null, user);
    }
  )
);

module.exports = passport;
