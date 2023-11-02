const express = require('express');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();


router.get('/ruta-protegida', verifyToken, (req, res ) => {
    res.json({ msg: 'Ruta protegida accedida con exito!'})
});