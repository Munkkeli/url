'use strict';
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
require('./utils/pass');
require('./utils/matomo');
const db = require('./utils/db');
const auth = require('./routes/authRouter');
const url = require('./routes/urlRouter');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/', url);

const checkAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw new Error('Authentication error');
    if (!user) throw new Error('Not authenticated');

    req.logIn(user, function (err) {
      if (err) throw new Error('Authentication error');
      return next();
    });
  })(req, res, next);
};

app.use('/graphql', (req, res, next) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res, next, checkAuth },
  })(req, res, next);
});

db.on('connected', () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));

  /*
  setTimeout(() => {
    const URL = require('./models/urlModel');

    URL.create({
      url: 'https://www.youtube.com/watch?v=TwXQfT_0DdU',
      isObscured: true,
    });
  }, 1000);
  */
});
