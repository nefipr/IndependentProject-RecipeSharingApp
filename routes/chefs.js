const { chefValidationRules, validate } = require('../validation')

const router = require('express').Router();

const usersController = require('../controller/chefController');


router.get('/', usersController.getAllChefs);

router.get('/:id', validate, usersController.getSingleChef);

router.post('/', chefValidationRules(), validate, usersController.addNewChef);

router.put('/:id', chefValidationRules(), validate, usersController.updateChefInfo);

router.delete('/:id', validate, usersController.deleteChef);

module.exports = router;