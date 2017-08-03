'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var randomString = function randomString() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

  var randArray = '';
  limit = [].concat(_toConsumableArray(Array(parseInt(limit, 10)).keys()));
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomStrings = limit.map(function () {
    randArray += possible.charAt(Math.floor(Math.random() * possible.length));
    return randArray;
  });
  return randomStrings.join('');
};

var validatePassword = function validatePassword(password, hash) {
  return _bcrypt2.default.compareSync(password, hash);
};

exports.default = {
  randomString: randomString,
  validatePassword: validatePassword
};