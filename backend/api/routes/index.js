const user_controller = require('../controllers/user');

module.exports = (app) => {
  app.route('/user/login').get(user_controller.get_login_url);
};
