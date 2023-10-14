const express = require('express');
const router = express.Router();

router.use('*/*', require('./swagger'))
router.use('/recipes', require('./recipes'))

module.exports = router;

