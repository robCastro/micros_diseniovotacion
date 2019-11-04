/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('centrovotacion', {
		idcentrovotacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'centrovotacion',
		timestamps: false
	});
};
