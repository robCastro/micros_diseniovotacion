'use strict';

const express = require('express');
const disenioController = require('../controllers/disenioController');
const mesaController = require('../controllers/mesaController');
const router = express.Router();

router.get('/votacion', disenioController.listar_votaciones);

router.get('/mesas/:id', mesaController.getMesaId);
router.get('/mesas/', mesaController.getMesas);
module.exports = router;
