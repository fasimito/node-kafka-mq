var kafka = require('kafka-node');
var KeyedMessage = kafka.KeyedMessage;
var Producer = kafka.Producer;
var client = new kafka.KafkaClient()
var producer = new Producer(client);
console.log('连接kafka中');

class toKafka {
    static produce(key, message, cb) {
        console.log(4);
        let payloads = [
            { topic: 'DataCloudLevel', messages: new KeyedMessage(key, message) }
        ];
        producer.on('ready', function () {
            console.log(3)
        });
        producer.send(payloads, function (err, data) {
            if (!!err) {
                console.log(err)
            }
            console.log(data);
            console.log(key + message);
            cb(data);
        });
    }
}
module.exports = toKafka;