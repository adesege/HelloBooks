'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _stockmanager = require('./stockmanager');

var _stockmanager2 = _interopRequireDefault(_stockmanager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { // export object so we can easily access each controller file
  users: _user2.default,
  bookController: _book2.default,
  stockController: _stockmanager2.default
};