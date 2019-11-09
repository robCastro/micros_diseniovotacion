'use strict';

const models = require('../../models/index');

const Votacion = models.votacion;
const Op = models.Sequelize.Op; //Opciones para where, por ejemplo mayor que, menor que

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

exports.get_votaciones = function(req, res){
	if(Object.keys(req.query).length > 0){
		if (req.query.strFechaInicio){
			let fechaInicio = new Date(req.query.strFechaInicio);
			// si la fecha tiene formato valido
			if(fechaInicio instanceof Date && !isNaN(fechaInicio)){
				Votacion.findAll({
					// where fecha inicio votacion mayor que fecha inicio
					where:{
						fecha_inicio_votacion: {
							[Op.gt]: fechaInicio
						}
					}
				}).then(votaciones => {
					res.status(200).json(votaciones);
				}).catch(err => {
					console.log('Error en consulta de votacion: ' + err);
	            	res.status(500).json({ msg: "Error en consulta de votacion" });
				})
			}
			else{
				res.status(500).json({msg: "Fecha de consulta no es valida"});
			}
			
		}
	}
	else{
		// todas
		res.sendStatus(500);
	}
}