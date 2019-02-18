'use strict';
var toKafka = function () {
    var kafka = require('kafka-node');
    var Consumer = kafka.Consumer;
    var Client = kafka.KafkaClient;

    var client = new Client({ kafaHost: 'localhost:9092' });
    // var Offset = kafka.Offset;
    // var offset = new Offset(client);
    console.log('连接kafka中');
    var topics = [{
        topic: 'DataCloudLevel', partition: 0
    }];
    var options = {
        autoCommit: false,
        autoCommitMsgCount: 100,
        autoCommitIntervalMs: 1000,
        fetchMaxWaitMs: 100,
        fetchMinBytes: 1,
        fetchMaxBytes: 1024 * 10,
        fromOffset: true,
        fromBeginning: false
    };
    var consumer = new Consumer(
        client,
        topics,
        options
    );
    consumer.on('message', function (message) {
        var key = message.key;
        console.log(key);
        if (key != -1) {
            console.log(message);
            try {
                var msg = message.value;
                // ServiceRouter.dispatch(key, msg);
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log(message)
        }
    });
    consumer.on('error', function (message) {
        console.log(message);
        console.log('kafka错误');
    });
};
module.exports = toKafka;