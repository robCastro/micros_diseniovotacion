/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipo_votacion', {
		id_tipo_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_tipo_votacion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descripcion_tipo_votacion: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'tipo_votacion',
		timestamps: false
	});
};
