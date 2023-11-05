const router = require('express').Router();

const usersController = require('../controller/chefController');


router.get('/', usersController.getAllChefs);

router.get('/:id', usersController.getSingleChef);

router.post('/', usersController.addNewChef);

router.put('/:id', usersController.updateChefInfo);

router.delete('/:id', usersController.deleteChef);

module.exports = router;