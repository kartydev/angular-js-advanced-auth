var express = require('express');

var apiFiles = './backend';
var wwwFiles = process.env.NODE_ENV == 'PROD'
    ? './build'
    : './frontend';

var app = require(apiFiles + '/app');
var www = express.static(wwwFiles);

express()
  .use('/api', app)
  .use('/', www)
  .listen(process.env.PORT || 8888);
