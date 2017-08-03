'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomString = _utils2.default.randomString;
var User = _models2.default.User;

exports.default = {
  signup: function signup(req, res) {
    var password = req.body.password;
    var name = req.body.name || '';
    var email = req.body.email || '';
    password = User.generateHash(password) || '';

    User.create({
      password: password,
      name: name,
      email: email,
      key: randomString(10)
    }, {
      fields: ['name', 'email', 'password', 'key']
    }).then(function () {
      return res.status(201).send({ message: 'Your account has been created successfully. Go to the login page to sign in to your account.', status: 'Created', code: 201 });
    }).catch(function (error) {
      return res.status(400).send({
        message: error.errors[0].message,
        status: 'Bad Request',
        code: 400
      });
    }).catch(function (error) {
      return res.status(500).send({
        message: error.message,
        status: 'Internal Server Error',
        code: 500
      });
    });
  },
  signin: function signin(req, res) {
    var secret = _app2.default.get('secret');
    var password = req.body.password || '';
    var email = req.body.email || '';

    User.findOne({ where: { email: email } }).then(function (user) {
      if (user) {
        if (!user.validPassword(password)) {
          res.status(400).send({ message: 'You provided a wrong password', status: 'Bad Request', code: 400 });
        }
        var token = _jsonwebtoken2.default.sign({ user: user.id, group: user.userGroup }, secret, { expiresIn: 24 * 60 * 60 });
        res.status(200).send({ token: token, userId: user.id, group: user.userGroup, message: 'Successfully validated', status: 'OK', code: 200 });
      } else {
        res.status(400).send({ message: 'User not found', status: 'Bad Request', code: 400 });
      }
    }).catch(function (error) {
      return res.status(500).send({
        message: error.message,
        status: 'Internal Server Error',
        code: 500
      });
    });
  }
};