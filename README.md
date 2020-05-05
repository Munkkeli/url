# URL Shortener Application

#### by Tuomas Pöyry

## Setup

The `ui` folder holds the React application responsible for the frontend.
The `api` folder has the Node.js backend.

Run `npm install` in both.

### UI

For development, simply run `npm start`.
For production, built the UI with `npm run build`.

**NOTE:** The `apiUrl` for GrapthQL is normally configured for production, you can change this in the `ui/src/Util.ts` file.

### API

Create a `.env` file, and look at the `.env.example` for guidance.

`DB_URL` should be a connection string to a MongoDB instance.  
`MATOMO_SITE_ID` and `MATOMO_SITE_URL` can be left empty to disable Matomo tracking.  
`JWT_SECRET` should be a long random string to encrypt the JWT session tokens with.

## GraphQL API Documentation

For the endpoints that require login, append the JWT token that `/loginUser` gives you to the `Authorization` header as a bearer token, like so: `Authorization: Bearer <TOKEN>`.

**NOTE:** The `hash` of a shortened link is the part after the last `/`. So for `https://v1a.pw/ABCD` the `hash` would be `ABCD`.

### Mutations

#### `/shortenUrl`

Shorten a URL with options.

```js
// The URL to shorten
url: { type: new GraphQLNonNull(GraphQLString) },

// Set to "true" if the shortened URL should be hard to guess
isObscured: { type: GraphQLBoolean },

// Should this URL be linked to the logged in account
isMine: { type: GraphQLBoolean },

// Currently not used
password: { type: GraphQLString },
expiresAt: { type: GraphQLInt },
```

#### `/updateUrl` (Requires login)

Update an existing URL linked to your account.

```js
// The "hash" of the URL that should be updated
hash: { type: new GraphQLNonNull(GraphQLString) },

// The new URL this link should be changed to point to
url: { type: new GraphQLNonNull(GraphQLString) },
```

#### `/removeUrl` (Requires login)

Remove an existing URL linked to your account.

```js
// The "hash" of the URL that should be removed
hash: { type: new GraphQLNonNull(GraphQLString) },
```

#### `/registerUser`

Register a new user.

```js
email: { type: new GraphQLNonNull(GraphQLString) },
password: { type: new GraphQLNonNull(GraphQLString) },
```

#### `/loginUser`

Login with a registered user.

```js
email: { type: new GraphQLNonNull(GraphQLString) },
password: { type: new GraphQLNonNull(GraphQLString) },
```

### Queries

#### `/listOwnURLs` (Requires login)

List all URLs linked to the currently logged in account.

#### `/stats`

List generic statistics about the site.
