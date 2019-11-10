/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('votacion', {
		id_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_tipo_votacion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'tipo_votacion',
				key: 'id_tipo_votacion'
			}
		},
		id_ordenamiento: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ordenamiento',
				key: 'id_ordenamiento'
			}
		},
		fecha_inicio_votacion: {
			type: DataTypes.DATE,
			allowNull: false
		},
		fecha_fin_votacion: {
			type: DataTypes.DATE,
			allowNull: false
		},
		nombre_votacion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descripcion_votacion: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'votacion',
		timestamps: false
	});
};
