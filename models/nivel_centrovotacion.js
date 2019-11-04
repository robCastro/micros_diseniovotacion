/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('nivel_centrovotacion', {
		idnivel_centrovotacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		idcentrovotacion_fk: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'centrovotacion',
				key: 'idcentrovotacion'
			}
		},
		idnivel_fk: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'nivel_centrovotacion',
		timestamps: false
	});
};
