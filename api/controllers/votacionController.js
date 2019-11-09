'use strict';

const models = require('../../models/index');

const Votacion = models.votacion;

exports.get_votacion = function(req, res){
	if(Number.isNaN(parseInt(req.params.id))){
		res.status(400).json({ msg: 'Utilizar parametros numericos'})
	}
	else{
		Votacion.findByPk(parseInt(req.params.id))
			.then(votacion => {
				if (votacion == null){
					console.log(`votacion con id: ${req.params.id} no encontrado`);
	                res.status(404).json({ msg: 'votacion no encontrada'});
				}
				else{
	                res.status(200).json(votacion);
	            }
	        })
	        .catch(err => {
	            console.log('Error en consulta de votacion: ' + err);
	            res.status(500).json({ msg: "Error en consulta de votacion" });
			});
	}
}