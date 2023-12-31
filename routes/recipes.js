const { recipeValidationRules, validate } = require('../validation')

const express = require('express');
const router = express.Router();

const recipesController = require('../controller');

router.get('/', recipesController.getAll);

router.get('/:id', validate, recipesController.getSingle);

router.post('/', recipeValidationRules(), validate, recipesController.createNewRecipe);

router.put('/:id', recipeValidationRules(), validate,recipesController.updateRecipe);

router.delete('/:id', validate, recipesController.deleteRecipe);

module.exports = router;