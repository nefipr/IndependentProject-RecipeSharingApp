const express = require('express');
const router = express.Router();

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'recipe-builder-app.onrender.com',
  clientID: 'HnroyG2pTLipFxYdbeDPiLze9BoZIoKT',
  issuerBaseURL: 'https://dev-aequs7zjla5588in.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


router.use('/', require('./swagger'))
// router.use('/', require('./users'))
router.use('/recipes', requiresAuth(), require('./recipes'))

module.exports = router;

