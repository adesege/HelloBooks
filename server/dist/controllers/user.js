'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomString = _utils2.default.randomString;
var User = _models2.default.User;

exports.default = {
  create: function create(req, res) {
    var password = User.generateHash(req.body.password);
    var name = req.body.name;
    var email = req.body.email;
    if (name.length < 3) {
      return res.status(400).send({ message: 'The name you entered must be more than 3 characters', status: 'Bad Request', code: 400 });
    }
    User.create({
      password: password,
      name: name,
      email: email,
      key: randomString(10)
    }, {
      fields: ['name', 'email', 'password', 'key']
    }).then(function () {
      return res.status(201).send({ message: 'Your account has been created successfully. Go to the login page to sign in to your account.', status: '200 OK', code: 200 });
    }).catch(_sequelize2.default.ValidationError, function (error) {
      return res.status(400).send({
        message: error.errors[0].message,
        status: 'Bad Request',
        code: 400
      });
    }).catch(function (error) {
      return res.status(400).send({
        message: error.errors[0].message,
        status: 'Internal Server Error',
        code: 500
      });
    });
  }
};