/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mesa', {
		idmesa: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		numerador: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idcentrovotacion_fk: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'centrovotacion',
				key: 'idcentrovotacion'
			}
		}
	}, {
		tableName: 'mesa',
		timestamps: false
	});
};
