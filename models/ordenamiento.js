/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ordenamiento', {
		id_ordenamiento: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_ordenamiento: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descripcion_ordenamiento: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'ordenamiento',
		timestamps: false
	});
};
