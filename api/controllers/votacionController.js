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

exports.post_votacion = function(req, res){
	console.log(req.body);
	console.log(req.body.tipoVotacion.id_tipo_votacion);
	console.log(req.body.ordenamiento.id_ordenamiento);
	console.log(new Date())
	if (isNaN(parseInt(req.body.ordenamiento.id_ordenamiento)) || isNaN(parseInt(req.body.tipoVotacion.id_tipo_votacion))){
		res.status(400).json({msg: 'Usar parametros numericos'});
	}
	else{
		let fechaInicio = new Date(req.body.fecha_inicio_votacion);
		let fechaFin = new Date(req.body.fecha_fin_votacion);
		if(fechaInicio instanceof Date && !isNaN(fechaInicio)){
			if (fechaInicio.getTime() <= (new Date).getTime()){
				res.status(400).json({msg: 'La fecha de Inicio debe ser mayor a la fecha actual'});
			}
			else{
				if(fechaFin instanceof Date && !isNaN(fechaFin)){
					Ordenamiento.findOne({
						where:{id_ordenamiento: parseInt(req.body.ordenamiento.id_ordenamiento)},
						attributes: ['id_ordenamiento']
					}).then(ordenamiento => {
						if (ordenamiento !== null){
							TipoVotacion.findOne({
								where: {id_tipo_votacion: parseInt(req.body.tipoVotacion.id_tipo_votacion)},
								attributes: ['id_tipo_votacion']
							}).then(tipo => {
								if (tipo !== null){
									Votacion.create({
										id_tipo_votacion: parseInt(req.body.tipoVotacion.id_tipo_votacion),
										id_ordenamiento: parseInt(req.body.ordenamiento.id_ordenamiento),
										fecha_inicio_votacion: fechaInicio,
										fecha_fin_votacion: fechaFin,
										nombre_votacion: req.body.nombre_votacion,
										descripcion_votacion: req.body.descripcion_votacion
									// este then es en caso exitoso
									}).then(votacion => {
										// propagando a microS votacion
										console.log(urls.votacion + "votacion/")
										Request.post({
											"headers": { "content-type": "application/json" },
											"url": urls.votacion + "votacion/",
											"body": JSON.stringify(votacion)
										}).on('response', function(response){
											if(response.statusCode !== 200){
												res.status(500).json({ msg: "Error guardando la votacion, revisar microS votacion", micro_resp: response });
												return votacion.destroy({force: true});
											}
											else{
												res.status(200).json(votacion);
											}
										}).on('error', function(err){
											res.status(500).json({ msg: "Error guardando la votacion, revisar microS votacion" });
											return votacion.destroy({force: true});
										});
									}).catch(err => {
										console.log('Error guardando la votacion: ' + err);
				    					res.status(500).json({ msg: "Error guardando la votacion" });
									});
									
								}
								else{
									res.status(404).json({msg: 'Tipo Votacion no existe'});
								}
							}).catch(err => {
								console.log('Error verificando existencia de tipos de votacion: ' + err);
				    			res.status(500).json({ msg: "Error verificando existencia de tipos de votacion" });
							});
						}
						else{
							res.status(404).json({msg: 'Ordenamiento no existe'});
						}
					}).catch(err => {
						console.log('Error verificando existencia de ordenamiento: ' + err);
				    	res.status(500).json({ msg: "Error verificando existencia de ordenamiento" });
					});
				}
				else{
					res.status(400).json({msg: 'Fecha de fin no valida'});
				}
			}
		}
		else{
			res.status(400).json({msg: 'Fecha de inicio no valida'});
		}
	}
	
}