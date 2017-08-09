'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authenticate = require('./authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _userAuthenticate = require('./userAuthenticate');

var _userAuthenticate2 = _interopRequireDefault(_userAuthenticate);

var _adminAuthenticate = require('./adminAuthenticate');

var _adminAuthenticate2 = _interopRequireDefault(_adminAuthenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  authenticate: _authenticate2.default,
  userAuthenticate: _userAuthenticate2.default,
  adminAuthenticate: _adminAuthenticate2.default
};