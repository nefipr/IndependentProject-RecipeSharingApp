const { newsletterValidationRules, validate } = require('../validation')

const router = require('express').Router();

const usersController = require('../controller');

// Register User
router.post('/newslettersignup', newsletterValidationRules(), validate, usersController.signUp);

// Login user 
// router.post("/login", usersController.logIn);

module.exports = router;