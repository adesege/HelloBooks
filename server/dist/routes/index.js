'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = _controllers2.default.users;
var bookController = _controllers2.default.books;
var apiRoutes = _express2.default.Router();

exports.default = function (app) {
  app.get('/', function (_, res) {
    res.render('template');
  });

  apiRoutes.get('/', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to Hello-Books api. !'
    });
  });

  apiRoutes.post('/users/signup', userController.signup);
  apiRoutes.post('/users/signin', userController.signin);

  apiRoutes.post('/books', _authenticate2.default, bookController.create);

  app.use('/api', apiRoutes);
};