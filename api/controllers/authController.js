'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const p4ssw0rd = require('p4ssw0rd');
const User = require('../models/userModel');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(err, user, info);
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res, next);
};

const register = (req, { email, password }) =>
  new Promise(async (resolve, reject) => {
    const isInUse = await User.find({ email });
    if (isInUse.length) {
      return reject(new Error('Email is already in use, please login.'));
    }

    const createResult = await User.create({
      email,
      password: p4ssw0rd.hash(password),
    });

    const user = {
      _id: createResult._id.toString(),
      email: createResult.email,
    };

    req.login(user, { session: false }, (error) => {
      if (error) return reject(error);

      const token = jwt.sign(user, 'your_jwt_secret');
      return resolve({ token });
    });
  });

module.exports = {
  login,
  register,
};
