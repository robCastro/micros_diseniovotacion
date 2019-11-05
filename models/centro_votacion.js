/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('centro_votacion', {
		id_centro_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_centro_votacion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		direccion_centro_votacion: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'centro_votacion',
		timestamps: false
	});
};
