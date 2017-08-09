'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

<<<<<<< HEAD
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  users: _user2.default
=======
var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _stockManager = require('./stockManager');

var _stockManager2 = _interopRequireDefault(_stockManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  users: _user2.default,
  bookController: _book2.default,
  stockController: _stockManager2.default
>>>>>>> dev
};