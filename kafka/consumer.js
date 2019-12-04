var Kafka = require("node-rdkafka");
require('dotenv').config();

console.log(process.env.CLOUDKARAFKA_BROKERS, process.env.CLOUDKARAFKA_USERNAME, process.env.CLOUDKARAFKA_PASSWORD, process.env.CLOUDKARAFKA_TOPIC_PREFIX);

var kafkaConf = {
  "group.id": "cloudkarafka-example",
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
  console.log("calling commit");
  consumer.commit(m);
  console.log("m: ", m)
  console.log("m.String: ", m.value.toString());
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

setTimeout(function() {
  consumer.disconnect();
}, 300000);

module.exports = consumer;