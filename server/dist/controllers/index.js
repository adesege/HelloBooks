'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserClass = require('./UserClass');

var _UserClass2 = _interopRequireDefault(_UserClass);

var _BookClass = require('./BookClass');

var _BookClass2 = _interopRequireDefault(_BookClass);

var _StockManagerClass = require('./StockManagerClass');

var _StockManagerClass2 = _interopRequireDefault(_StockManagerClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { // export object so we can easily access each controller file
  UserClass: _UserClass2.default,
  BookClass: _BookClass2.default,
  StockManagerClass: _StockManagerClass2.default
};