const Kafka = require("node-rdkafka");
require('dotenv').config();

const post_votacion = require('../api/controllers/votacionController').post_votacion;

var kafkaConf = {
  //Info: https://github.com/edenhill/librdkafka/blob/v1.2.2/CONFIGURATION.md
  "group.id": "disenio-group",
  "client.id": "disenio",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  "debug": "generic,broker,security",
  "enable.auto.commit": false
};

const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topics = [`${prefix}Votacion`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning",

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
  if(m.topic === '40khj5pk-Votacion' && m.partition === 0){
    jsonVotacion = JSON.parse(m.value.toString());
    let promesa = post_votacion(jsonVotacion);
    // Lo retornado es una promesa
    console.log('Retorno Promesa: ', promesa);
    promesa.then(votacion => {
      consumer.commitMessage(m);
      console.log('Commit hecho', m);
    }).catch(err => {
      // Si hay un error, no se hace commit del mensaje
      // Probar, por ejemplo, a parar por un segundo el proceso de PostgreSQL
      // Enviar mensajes usando el producer y
      // Luego subir de nuevo postgres y reiniciar el consumer
      console.log('Error: ', err);
    });
  }
});


consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});

consumer.connect();

module.exports = consumer;