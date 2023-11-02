const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cache = require('../services/cache');


/**
 * creamos las rutas para los usuarios con sus respectivas controladores
 */
router.get('/users', userController.getAllUsers);

router.get('/users/:id',userController.getUserById);

router.post('/users', userController.createUser);

router.put('/users/:id', userController.updateUserById);

router.delete('/users/:id', userController.deleteUserById);

router.get('/users/redis', userController.getWithRedis);


module.exports = router;