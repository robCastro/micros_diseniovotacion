//Ejecutar este script con
// node auto-generate.js
// Va a generar los modelos para las tablas especificadas en la variable tablas
//La config de la base a utilizar debe existir en /config/config.json
//SOBRA DECIR que este archivo no debe existir en produccion.

var SequelizeAuto = require('sequelize-auto');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

//tablas> se usa para indicar cuales tablas se desean generar como modelos.
//Si no se incluye el atributo en la funcion SequelizeAuto, se asume que se
//desean incluir todas las tablas de la BD
// var tablas = [
//   'afiliacion',
//   'candidato',
//   'centrovotacion',
//   'conteo',
//   'mesa',
//   'centrovotacion',
//   'nivel_centrovotacion'
// ];

var auto = new SequelizeAuto(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    directory:'./models',
    additional: {
        timestamps: false
    },
    // tables: tablas
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables);
  console.log(auto.foreignKeys);
});

