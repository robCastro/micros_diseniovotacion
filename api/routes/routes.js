'use strict';

const express = require('express');
const disenioController = require('../controllers/disenioController');
const router = express.Router();

router.get('/votacion', disenioController.listar_votaciones);


module.exports = router;
