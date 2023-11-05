const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();


const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const oauthSecret = process.env.OAUTH_SECRET;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: oauthSecret,
  baseURL: 'https://recipe-builder-app.onrender.com',
  clientID: 'HnroyG2pTLipFxYdbeDPiLze9BoZIoKT',
  issuerBaseURL: 'https://dev-aequs7zjla5588in.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Hello, here you will find the best Mexican Food, move to /recipes' : 'Logged out. Type /login to access the Recipe Book');
});



router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


router.use('/', require('./swagger'))
// router.use('/', require('./users'))
router.use('/recipes', requiresAuth(), require('./recipes'))

module.exports = router;

