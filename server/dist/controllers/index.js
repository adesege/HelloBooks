'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userclass = require('./userclass');

var _userclass2 = _interopRequireDefault(_userclass);

var _bookclass = require('./bookclass');

var _bookclass2 = _interopRequireDefault(_bookclass);

var _stockmanagerclass = require('./stockmanagerclass');

var _stockmanagerclass2 = _interopRequireDefault(_stockmanagerclass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { // export object so we can easily access each controller file
  UserClass: _userclass2.default,
  BookClass: _bookclass2.default,
  StockManagerClass: _stockmanagerclass2.default
};