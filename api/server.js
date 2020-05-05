'use strict';
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const path = require('path');

require('./utils/jwt');
require('./utils/matomo');

const db = require('./utils/db');
const url = require('./routes/urlRouter');
const port = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

/**
 * Socket.io to allow real time statistics update on the frontpage
 */
const io = require('socket.io')(http);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

/**
 * Serve the built UI files
 */
app.use(express.static('../ui/build'));

/**
 * Authentication middleware to provide the req.user if the user has logged in
 */
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

/**
 * All the application routes
 */
app.use('/', url(io));

/**
 * GraphQL route, logic in schema/schema.js
 */
app.use('/graphql', (req, res, next) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res, next, io },
  })(req, res, next);
});

/**
 * Handle frontend navigation
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'));
});

db.on('connected', () => {
  http.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
  );
});
