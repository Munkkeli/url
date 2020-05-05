'use strict';
const jwt = require('jsonwebtoken');
const p4ssw0rd = require('p4ssw0rd');
const User = require('../models/userModel');

const login = (req, { email, password }) =>
  new Promise(async (resolve, reject) => {
    const record = await User.findOne({ email });
    if (!record) {
      p4ssw0rd.simulate();
      return resolve({});
    }

    if (!p4ssw0rd.check(password, record.password)) {
      return resolve({});
    }

    const user = {
      _id: record._id.toString(),
      email: record.email,
    };

    req.login(user, { session: false }, (error) => {
      if (error) return reject(error);

      const token = jwt.sign(user, process.env.JWT_SECRET);
      return resolve({ token });
    });
  });

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
