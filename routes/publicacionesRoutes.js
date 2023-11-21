const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicacionesController');
const verifyToken = require('../middlewares/verifyToken');

/**
 * creamos las rutas para las publicaciones con sus respectivas controladores
 */
router.get('/', publicacionesController.getPublicaciones);

router.get('/:id',publicacionesController.getPublicacionesById);

router.post('/', publicacionesController.createPublicacion);

router.put('/:id', publicacionesController.UpdatePublicacion);

router.delete('/:id', publicacionesController.deletePublicaciones);


module.exports = router;