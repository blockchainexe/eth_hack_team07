var express    = require('express');
var path = require('path');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = require('./routes/v1/');
app.use('/api/v1/', router);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, '/views')));

// serving template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var index = require('./routes/index');
app.use('/', index);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
