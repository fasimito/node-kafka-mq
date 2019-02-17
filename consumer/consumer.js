'use strict';
var ServiceRouter = require('../service-router/serviceRouter.js');
var toKafka = function () {
    var kafka = require('kafka-node');
    var Consumer = kafka.Consumer;
    var client = new kafka.Client('10.104.185.48:2181'); //测试
    var Offset = kafka.Offset;
    var offset = new Offset(client);
    console.log('连接kafka中');
    var topics = [{
        topic: 'DataCloudLevel', partition: 0, offset: 537
    }, {
        topic: 'DataCloudLevel', partition: 1, offset: 310
    }, {
        topic: 'DataCloudLevel', partition: 2, offset: 20103
    }, {
        topic: 'DataCloudLevel', partition: 3, offset: 42055
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
        var key = message.key.toString();
        console.log(key);
        if (key != -1) {
            console.log(message);
            try {
                var msg = JSON.parse(message.value);
                ServiceRouter.dispatch(key, msg);
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