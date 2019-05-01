const discit_controller = require('/api/server/controllers/discit/user');

module.exports = (app) => {
  app.route('/discit/login').get(discit_controller.get_login_url);
  app.route('/discit/access').post(discit_controller.get_access_token);
  app.route('/discit/refresh').post(discit_controller.refresh_access_token);
};
