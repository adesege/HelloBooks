'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _usermiddleware = require('./usermiddleware');

var _usermiddleware2 = _interopRequireDefault(_usermiddleware);

var _adminmiddleware = require('./adminmiddleware');

var _adminmiddleware2 = _interopRequireDefault(_adminmiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  middleware: _middleware2.default,
  userMiddleware: _usermiddleware2.default,
  adminMiddleware: _adminmiddleware2.default
};