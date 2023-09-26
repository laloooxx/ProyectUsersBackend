const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getAllUsers);

router.post('/users', userController.createUser);

router.put('/users/:id', userController.updateUserById);

router.delete('/users/:id', userController.deleteUserById);

module.exports = router;