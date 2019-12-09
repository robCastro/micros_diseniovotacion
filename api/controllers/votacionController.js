'use strict';

const models = require('../../models/index');
//Opciones para where, por ejemplo mayor que, menor que
const Op = models.Sequelize.Op; 
// para hacer request post a api crear votacion en otro micros
const urls = require('../../urls');
var Request = require("request"); 


const Votacion = models.votacion;
const Ordenamiento = models.ordenamiento;
const TipoVotacion = models.tipo_votacion;

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
		else{
			res.status(400).json({msg: 'Especifique una fecha de inicio'});
		}
	}
	else{
		// podrian ponerse todas las votaciones aca
		res.status(400).json({msg: 'Especifique una fecha de inicio'});
	}
}

// La funcion retornará la promesa de Crear una votacion
// El then y el catchh serán manejados en el consumer para hacer o no consumer.commit
exports.post_votacion = async function(jsonVotacion){
	return await Votacion.create({
		id_tipo_votacion: parseInt(jsonVotacion.tipoVotacion.id_tipo_votacion),
		id_ordenamiento: parseInt(jsonVotacion.ordenamiento.id_ordenamiento),
		fecha_inicio_votacion: jsonVotacion.fecha_inicio_votacion,
		fecha_fin_votacion: jsonVotacion.fecha_fin_votacion,
		nombre_votacion: jsonVotacion.nombre_votacion,
		descripcion_votacion: jsonVotacion.descripcion_votacion
	});
}