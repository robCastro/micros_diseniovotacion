const Kafka = require("node-rdkafka");
require('dotenv').config();
const models = require('../models/index');

const Votacion = models.votacion;

var kafkaConf = {
  //Info: https://github.com/edenhill/librdkafka/blob/v1.2.2/CONFIGURATION.md
  "client.id": "disenio",
  "group.id": "disenio-group",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  "debug": "generic,broker,security"
};

const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topics = [`${prefix}Votacion`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});
consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  console.log('topics: ', topics);
  consumer.subscribe(topics);
  consumer.consume();
});
consumer.on("data", function(m) {
  console.log("m: ", m)
  console.log("m.String: ", m.value.toString());
  if(m.topic === '40khj5pk-Votacion' && m.partition === 0){
    jsonVotacion = JSON.parse(m.value.toString());
    Votacion.create({
      id_tipo_votacion: parseInt(jsonVotacion.tipoVotacion.id_tipo_votacion),
      id_ordenamiento: parseInt(jsonVotacion.ordenamiento.id_ordenamiento),
      fecha_inicio_votacion: jsonVotacion.fecha_inicio_votacion,
      fecha_fin_votacion: jsonVotacion.fecha_fin_votacion,
      nombre_votacion: jsonVotacion.nombre_votacion,
      descripcion_votacion: jsonVotacion.descripcion_votacion
    }).then(votacion => {
      console.log('Votacion Guardada: ', jsonVotacion);
      consumer.commit(m);
    }).catch(err => {
      console.log('Error en guardado de Votacion: ', err);
    });
  }
  consumer.commit(m);
  
});
consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
//consumer.on('event.log', function(log) {
//  console.log(log);
//});
consumer.connect();

//setTimeout(function() {
//  consumer.disconnect();
//}, 300000);

module.exports = consumer;