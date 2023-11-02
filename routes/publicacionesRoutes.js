const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicacionesController');

/**
 * creamos las rutas para las publicaciones con sus respectivas controladores
 */
router.get('/publicaciones', publicacionesController.getPublicaciones);

router.post('/publicaciones', publicacionesController.createPublicacion);

router.put('/publicaciones/:id', publicacionesController.UpdatePublicacion);

router.delete('/publicaciones/:id', publicacionesController.deletePublicaciones);


module.exports = router;