'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var router = function router(req, res, next) {
  var group = req.decoded.group;
  if (group !== 'user') {
    // check that the signed in user is a user
    return res.status(403).send({ message: 'Well, you need to be a user to go in here' });
  }
  next();
};

exports.default = router;