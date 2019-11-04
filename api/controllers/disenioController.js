'use strict';

const models = require('../../models/index');

const Votacion = models.votacion;

exports.listar_votaciones = function(req, res) {
  Votacion.findAll()
    .then(votaciones => {
	res.status(200).json(votaciones);
    })
    .catch(err => {
	console.log('Error: ' + err);
	res.status(500).json({ msg: "Error al mostrar votaciones" });
    });
};
