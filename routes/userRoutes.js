const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cache = require('../services/cache');
const verifyToken = require('../middlewares/verifyToken');


/**
 * creamos las rutas para los usuarios con sus respectivas controladores
 */
router.get('/', userController.getAllUsers);

router.get('/:id',userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUserById);

router.delete(':/id', userController.deleteUserById);

router.get('/users/redis', userController.getWithRedis);


module.exports = router;