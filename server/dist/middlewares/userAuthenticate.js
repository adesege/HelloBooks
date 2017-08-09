'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var router = function router(req, res, next) {
  var group = req.decoded.group;
  if (group !== 'user') {
    console.log(group);
    return res.status(403).send({
      status: 'Forbidden',
      message: 'Well, you need to be a user to go in here',
      code: 403 });
  }
  next();
};

exports.default = router;