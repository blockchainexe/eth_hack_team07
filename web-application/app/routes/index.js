var express = require('express');
var router = express.Router();
const renderer = require('vue-server-renderer').createRenderer()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
