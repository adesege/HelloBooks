'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

<<<<<<< HEAD
var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);
=======
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);
>>>>>>> dev

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

<<<<<<< HEAD
var randomString = _utils2.default.randomString;
var User = _models2.default.User;

exports.default = {
  create: function create(req, res) {
    var password = User.generateHash(req.body.password);
    var name = req.body.name;
    var email = req.body.email;
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
=======
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var randomString = _utils2.default.randomString;
var User = _models2.default.User;

/**
 * @class userClass
 * @classdesc User Class
 */

var userClass = function () {
  function userClass() {
    _classCallCheck(this, userClass);
  }

  _createClass(userClass, null, [{
    key: 'signup',

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @return {object} response
     */
    value: function signup(req, res) {
      var password = req.body.password;
      var name = req.body.name || '';
      var email = req.body.email || '';
      password = User.generateHash(password) || '';
      var userGroup = req.body.group || '';

      User.create({
        password: password,
        name: name,
        email: email,
        userGroup: userGroup,
        key: randomString(10)
      }, {
        fields: ['name', 'email', 'password', 'key', 'userGroup']
      }).then(function () {
        return res.status(201).send({
          message: 'Your account has been created successfully. Go to the login page to sign in to your account.',
          status: 'Created',
          code: 201 });
      }).catch(function (error) {
        return res.status(400).send({
          message: error.message,
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
    }

    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @return {object} response
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      var secret = _app2.default.get('secret');
      var password = req.body.password || '';
      var email = req.body.email || '';

      User.findOne({ where: { email: email } }).then(function (user) {
        if (user) {
          if (!user.validPassword(password)) {
            return res.status(400).send({
              message: 'You provided a wrong password',
              status: 'Bad Request',
              code: 400 });
          }
          var token = _jsonwebtoken2.default.sign({ user: user.id, group: user.userGroup }, secret, { expiresIn: 24 * 60 * 60 });
          return res.status(200).send({
            token: token,
            userId: user.id,
            group: user.userGroup,
            message: 'Successfully validated',
            status: 'OK',
            code: 200
          });
        }
        return res.status(404).send({ message: 'User not found', status: 'Bad Request', code: 404 });
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message,
          status: 'Internal Server Error',
          code: 500
        });
      });
    }
    /**
       * 
       * @param {object} req 
       * @param {object} res
       * @return {object} response 
    */

  }, {
    key: 'books',
    value: function books(req, res) {
      var userId = req.params.userId;
      if (userId === null || userId === '') {
        res.status(400).send({
          message: 'User not found',
          status: 'Not Found',
          code: 404 });
      }
      User.findAll({}).then(function (books) {
        if (books) {
          res.status(200).send({ message: books, status: 'OK', code: 200 });
        } else {
          res.status(400).send({ message: 'No record available', status: 'No Content', code: 204 });
        }
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message,
          status: 'Internal Server Error',
          code: 500
        });
      });
    }
  }]);

  return userClass;
}();

exports.default = userClass;
>>>>>>> dev
