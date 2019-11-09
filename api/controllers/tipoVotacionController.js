'use strict';

const models = require('../../models/index');

const TipoVotacion = models.tipo_votacion;

exports.get_tipos_votaciones = function(req, res) {
  TipoVotacion.findAll()
    .then(tipos => {
		res.status(200).json(tipos);
    })
    .catch(err => {
		console.log('Error al consultar Tipos de Votaciones: ' + err);
		res.status(500).json({ msg: "Error al consultar Tipos de Votaciones" });
    });
};
