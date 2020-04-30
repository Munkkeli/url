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
app.use(passport.initialize());

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) throw new Error('Authentication error');
    if (!user) return next();

    req.logIn(user, { session: false }, (error) => {
      if (error) throw new Error('Authentication error');
      return next();
    });
  })(req, res, next);
};

app.use(authenticate);

app.use('/auth', auth);
app.use('/', url);

app.use('/graphql', (req, res, next) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res, next },
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
