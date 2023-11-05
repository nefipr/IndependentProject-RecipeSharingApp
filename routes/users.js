const router = require('express').Router();

const usersController = require('../controller');

// Register User
router.post('/signup', usersController.signUp);

// Login user 
router.post("/login", usersController.logIn);

module.exports = router;