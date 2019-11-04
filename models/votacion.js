/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('votacion', {
		idvotacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		fechainicio: {
			type: DataTypes.DATE,
			allowNull: false
		},
		fechafin: {
			type: DataTypes.DATE,
			allowNull: false
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		idtipovotacion_fk: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'tipovotacion',
				key: 'idtipovotacion'
			}
		},
		idordenamiento_fk: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ordenamiento',
				key: 'idordenamiento'
			}
		}
	}, {
		tableName: 'votacion',
		timestamps: false
	});
};
