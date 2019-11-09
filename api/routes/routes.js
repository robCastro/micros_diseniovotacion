'use strict';

const express = require('express');
const router = express.Router();


const disenioController = require('../controllers/disenioController');
const mesaController = require('../controllers/mesaController');
const ordenamientoController = require('../controllers/ordenamientoController');
const tipoVotacionController = require('../controllers/tipoVotacionController');
const votacionController = require('../controllers/votacionController');


router.get('/votaciones/', votacionController.get_votaciones);
router.get('/votaciones/:id', votacionController.get_votacion);


router.get('/mesas/:id', mesaController.getMesaId);
router.get('/mesas/', mesaController.getMesas);
router.put('/mesas/:id', mesaController.putMesaId);


router.get('/tipo_votacion/', tipoVotacionController.get_tipos_votaciones);
router.get('/ordenamiento/', ordenamientoController.get_ordenamientos);


module.exports = router;
