/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('nivel_centro_votacion', {
		id_nivel_centro_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_centro_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'centro_votacion',
				key: 'id_centro_votacion'
			}
		},
		id_nivel: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'nivel_centro_votacion',
		timestamps: false
	});
};
