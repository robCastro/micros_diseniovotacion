/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipovotacion', {
		idtipovotacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'tipovotacion',
		timestamps: false
	});
};
