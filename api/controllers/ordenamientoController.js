'use strict';

const models = require('../../models/index');

const Ordenamiento = models.ordenamiento;

exports.get_ordenamientos = function(req, res) {
  Ordenamiento.findAll()
    .then(ordenamientos => {
		res.status(200).json(ordenamientos);
    })
    .catch(err => {
		console.log('Error al consultar ordenamientos: ' + err);
		res.status(500).json({ msg: "Error al consultar ordenamientos" });
    });
};
