var express = require('express');
var router = express.Router();

router.use('/login', require('./login.js'));

module.exports = router;
