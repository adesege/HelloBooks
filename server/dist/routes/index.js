'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = _controllers2.default.users;

exports.default = function (app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to Hello-Books api. !'
    });
  });

  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);
};