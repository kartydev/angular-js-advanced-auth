var _  = require('underscore');
module.exports = function(app) {

  var root = require('./controllers/root');

  // ROOT PAGE
  app.get('/login', root.login);
  app.get('/oauth', root.oauth);

};
