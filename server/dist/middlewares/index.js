'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _userMiddleware = require('./userMiddleware');

var _userMiddleware2 = _interopRequireDefault(_userMiddleware);

var _adminMiddleware = require('./adminMiddleware');

var _adminMiddleware2 = _interopRequireDefault(_adminMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  middleware: _middleware2.default,
  userMiddleware: _userMiddleware2.default,
  adminMiddleware: _adminMiddleware2.default
};