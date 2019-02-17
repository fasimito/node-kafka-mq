var express = require('express');
var router = express.Router();
var kafka = require('../producer/producer.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/toKafka', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  kafka.produce(req.body.key, req.body.message, function (result) {
    res.send(result)
  });
});

module.exports = router;
