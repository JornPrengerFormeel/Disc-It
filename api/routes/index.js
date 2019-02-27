const user_controller = require('../controllers/user');

module.exports = (app) => {
  app.route('/user/login').post(user_controller.get_login_url);
};
