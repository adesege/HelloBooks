'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var router = function router(req, res, next) {
  var group = req.decoded.group;
  if (group !== 'admin') {
    // check that the signed in user is an admin
    return res.status(403).send({ message: 'Well, you need to be an admin to go in here' });
  }
  next();
};

exports.default = router;