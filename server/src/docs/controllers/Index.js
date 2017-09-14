'use strict';

var url = require('url');


var Index = require('./IndexService');


module.exports.index = function index (req, res, next) {
  Index.index(req.swagger.params, res, next);
};
