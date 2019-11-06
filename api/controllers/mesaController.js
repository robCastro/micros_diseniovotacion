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
				res.status(500).json({ msg: "Ip no valida" });
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

exports.putMesa = function(req, res){
	
}