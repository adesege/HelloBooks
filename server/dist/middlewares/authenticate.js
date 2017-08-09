'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = function router(req, res, next) {
  var token = req.body.authenticate_token || req.query.authenticate_token || req.headers['authenticate-token'];

  if (token) {
    _jsonwebtoken2.default.verify(token, _app2.default.get('secret'), function (err, decoded) {
      if (err) {
        return res.status(401).send({
          status: 'Unauthorized',
          message: 'Failed to authenticate user.',
          code: 401 });
      }

      var userId = req.body.userId || req.query.userId || req.params.userId;
      if (userId || userId !== undefined) {
        var tokenUserId = decoded.user;
        if (parseInt(userId, 10) === parseInt(tokenUserId, 10)) {} else {
          return res.status(400).send({
            status: 'Forbidden',
            message: 'Sorry, this is not you.',
            code: 400 });
        }
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      status: 'Unauthorized',
      message: 'Failed to authenticate user.',
      code: 401
    });
  }
};

exports.default = router;