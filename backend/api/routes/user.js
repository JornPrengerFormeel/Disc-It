'use strict';

module.exports = function(app) {
  var user_controller = require('../controllers/user');

  app.route('/user/login')
    .post(user_controller.login);

};
