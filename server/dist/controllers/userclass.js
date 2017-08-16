'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var randomString = _utils2.default.randomString; // generates random strings
var User = _models2.default.User; // get User model

/**
 * @class UserClass
 * @classdesc User Class
 */

var UserClass = function () {
  function UserClass() {
    _classCallCheck(this, UserClass);
  }

  _createClass(UserClass, null, [{
    key: 'signup',

    /**
     * @method signup
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
          message: 'Your account has been created successfully. Go to the login page to sign in to your account.' });
      }).catch(function (error) {
        error.errors.map(function (value) {
          delete value.__raw;
          delete value.path;
          delete value.type;
          delete value.value;
          return value;
        });
        return res.status(400).send({
          message: error.errors
        });
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message
        });
      });
    }

    /**
     * @method signin
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

      if (email === '') return res.status(400).send({ message: 'The email field is required' });
      if (password === '') return res.status(400).send({ message: 'The password field is required' });

      User.findOne({ where: { email: email } }).then(function (user) {
        if (user) {
          if (!user.validPassword(password)) {
            return res.status(400).send({
              message: 'You provided a wrong password' });
          }
          var token = _jsonwebtoken2.default.sign({ user: user.id, group: user.userGroup }, secret, { expiresIn: 24 * 60 * 60 });
          return res.status(200).send({
            token: token,
            userId: user.id,
            group: user.userGroup,
            message: 'Successfully validated'
          });
        }
        return res.status(404).send({ message: 'User not found' });
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message
        });
      });
    }
    /**
       * @method books
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
          message: 'User not found' });
      }
      User.findAll({}).then(function (books) {
        if (books) {
          res.status(200).send({ message: books });
        } else {
          res.status(400).send({ message: 'No record available' });
        }
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message
        });
      });
    }
  }]);

  return UserClass;
}();

exports.default = UserClass;