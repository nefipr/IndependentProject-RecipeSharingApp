const router = require('express').Router();

const usersController = require('../controller');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/login.html'));
});
  
  
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/signup.html'));
});


// Register User
router.post('/signup', usersController.signIn);

// Login user 
router.post("/login", usersController.logIn);

module.exports = router;