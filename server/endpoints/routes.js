let wagner = require('wagner-core');
require('../models/models')(wagner);

module.exports = function (app) {

  app.use('/shop', require('../routes/shop')(wagner));
  app.use('/client', require('../routes/client')(wagner));
};
