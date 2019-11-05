/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mesa', {
		id_mesa: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'votacion',
				key: 'id_votacion'
			}
		},
		id_centro_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'centro_votacion',
				key: 'id_centro_votacion'
			}
		},
		numero_mesa: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ponderacion_mesa: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		cantidad_abstenciones_mesa: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		cantidad_anulados_mesa: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		habilitada_mesa: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		en_uso_mesa: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		ip_mesa: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'mesa',
		timestamps: false
	});
};
