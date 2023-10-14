const express = require('express');
const router = express.Router();

const recipesController = require('../controller');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

module.exports = router;