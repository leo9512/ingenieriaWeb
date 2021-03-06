const bodyParser = require('body-parser');
const logger = require('morgan');
let express = require('express');
const config = require('./index');
let cors = require('cors');

module.exports = function (app) {

  app.use('/public', express.static('public'));
  app.use(cors({origin: '*'}));

  // todo: set a reasonable size
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended : true, parameterLimit:50000}));
  app.use(logger('dev'));
  app.set('port',  config.port);
};
