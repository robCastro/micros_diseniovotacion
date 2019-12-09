'use strict';

const models = require('../../models/index');
const isValidIP = require('validate-ip-node');

const Mesa = models.mesa;

exports.getMesaId = function(req, res){
	if(Number.isNaN(parseInt(req.params.id))){
		res.status(400).json({ msg: 'Utilizar parametros numericos'})
	}
	else{
		Mesa.findByPk(parseInt(req.params.id))
			.then(mesa => {
				if (mesa == null){
					console.log(`Mesa con id: ${req.params.id} no encontrado`);
	                res.status(404).json({ msg: 'Mesa no encontrada'});
				}
				else{
	                res.status(200).json(mesa);
	            }
	        })
	        .catch(err => {
	            console.log('Error: ' + err);
	            res.status(500).json({ msg: "Error en consulta de mesa" });
			});
	}
}

exports.getMesas = function(req, res){
	if(Object.keys(req.query).length > 0){
		if (req.query.ip){
			if(!isValidIP(req.query.ip)){
				res.status(400).json({ msg: "Ip no valida" });
			}
		}
		Mesa.findAll({
				where: {
					ip_mesa: req.query.ip
				}
			})
			.then(mesas => {
				res.status(200).json(mesas);
			})
			.catch(err => {
				console.log('Error: ' + err);
				res.status(500).json({ msg: "Error al mostrar mesas" });
    		});
	}
	else{
		Mesa.findAll()
			.then(mesas => {
				res.status(200).json(mesas);
			})
			.catch(err => {
				console.log('Error: ' + err);
				res.status(500).json({ msg: "Error al mostrar mesas" });
    		});
	}
}

exports.putMesaId = function(req, res){
	
	let {id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa } = req.body;
	console.log(id_mesa, id_votacion, id_centro_votacion, numero_mesa, ponderacion_mesa, cantidad_abstenciones_mesa, cantidad_anulados_mesa, habilitada_mesa, en_uso_mesa, ip_mesa);
	if(Number.isNaN(parseFloat(ponderacion_mesa))){
		res.status(400).json({ msg: 'Utilizar parametros numericos'})
	}
	if(!isValidIP(ip_mesa)){
		res.status(400).json({ msg: "Ip no valida" });
	}
	let errores = [];
	if (!id_mesa){
		errores.push({msg: "Mesa no especificada"});
	}
	if (!id_votacion){
		errores.push({msg: "Votacion no especificada"});
	}
	if (!id_centro_votacion){
		errores.push({msg: "Centro de Votacion no especificado"});
	}
	if (!numero_mesa){
		errores.push({msg: "Numero de mesa no especificado"});
	}
	if (!ponderacion_mesa){
		errores.push({msg: "Ponderacion de mesa no especificada"});
	}
	if (cantidad_abstenciones_mesa == null){
		errores.push({msg: "Cantidad de Abstenciones no especificada"});
	}
	if (cantidad_anulados_mesa == null){
		errores.push({msg: "Cantidad de Anulados no especificada"});
	}
	if (habilitada_mesa == null){
		errores.push({msg: "No se especificó si la mesa está habilitada"});
	}
	if (en_uso_mesa == null){
		errores.push({msg: "No se especificó si la mesa está en uso"});
	}
	if (!ip_mesa){
		errores.push({msg: "Ip de Mesa no especificada"});
	}
	if(errores.length > 0){
    	res.status(400).json(errores);
    }
    else{
		Mesa.update({
			id_votacion: id_votacion,
			id_centro_votacion: id_centro_votacion,
			numero_mesa: numero_mesa,
			ponderacion_mesa: ponderacion_mesa,
			cantidad_abstenciones_mesa: cantidad_abstenciones_mesa,
			cantidad_anulados_mesa: cantidad_anulados_mesa,
			habilitada_mesa: habilitada_mesa,
			en_uso_mesa: en_uso_mesa,
			ip_mesa: ip_mesa
		},{
			where:{
				id_mesa: parseInt(id_mesa)
			}
		}).then(() => {
			res.status(204).json({msg: "actualizado correctamente"});
		}).catch(err => {
			console.log("Error: " + err);
           	res.status(500).json("Error en actualizacion de mesa");
		})
    }
}

exports.anular_voto = function(id_mesa, consumer, mensaje){
	console.log(id_mesa);
	Mesa.findByPk(parseInt(id_mesa)).then(mesa => {
		return mesa.increment('cantidad_anulados_mesa', {by: 1});
	}).then(mesa => {
		// Por si acaso hay que hacer algo con la mesa actualizada
		consumer.commitMessage(mensaje);
		console.log('Voto Anulado registrado, commit realizado');
	}).catch(err => {
		console.log('Error: ', err);
	});
}

exports.abstener_voto = function(id_mesa, consumer, mensaje){
	Mesa.findByPk(id_mesa).then(mesa => {
		return mesa.increment('cantidad_abstenciones_mesa', {by: 1});
	}).then(mesa => {
		// Por si acaso hay que hacer algo con la mesa actualizada
		consumer.commitMessage(mensaje);
		console.log('Abstencion registrada, commit realizado');
	}).catch(err => {
		console.log('Error: ', err);
	});
}