'use strict';
const URL = require('../models/urlModel');
const authController = require('../controllers/authController');
const urlController = require('../controllers/urlController');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const urlType = new GraphQLObjectType({
  name: 'url',
  description: 'Shortened URL record',
  fields: () => ({
    _id: { type: GraphQLID },
    hash: { type: GraphQLString },
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    password: { type: GraphQLString },
    isObscured: { type: GraphQLBoolean },
    expiresAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

const urlRemoveType = new GraphQLObjectType({
  name: 'urlRemove',
  description: 'URL remove response',
  fields: () => ({
    success: { type: GraphQLBoolean },
  }),
});

const userType = new GraphQLObjectType({
  name: 'user',
  description: 'User record',
  fields: () => ({
    email: { type: GraphQLString },
  }),
});

const registerType = new GraphQLObjectType({
  name: 'register',
  description: 'Register response',
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations...',
  fields: {
    shortenUrl: {
      type: urlType,
      description: 'Shorten a URL',
      args: {
        url: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        isObscured: { type: GraphQLBoolean },
        isMine: { type: GraphQLBoolean },
        expiresAt: { type: GraphQLInt },
      },
      resolve(parent, args, { req, res, next }) {
        return urlController.minify(req, { ...args });
      },
    },
    removeUrl: {
      type: urlRemoveType,
      description: 'Remove a URL',
      args: {
        hash: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, { req, res, next }) {
        return urlController.remove(req, { ...args });
      },
    },
    registerUser: {
      type: registerType,
      description: 'Register a new user',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, { req, res, next }) {
        return authController.register(req, { ...args });
      },
    },
    loginUser: {
      type: registerType,
      description: 'Login a user',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, { req, res, next }) {
        return authController.login(req, { ...args });
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    listOwnURLs: {
      type: new GraphQLList(urlType),
      description: 'Get all URLs by user',
      resolve(parent, args, { req }) {
        return urlController.list(req);
      },
    },
    statistics: {
      type: GraphQLInt,
      description: 'Dummy endpoint for now',
      resolve(parent, args) {
        return 1;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
