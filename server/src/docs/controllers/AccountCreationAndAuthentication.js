'use strict';

var url = require('url');


var AccountCreationAndAuthentication = require('./AccountCreationAndAuthenticationService');


module.exports.addUser = function addUser (req, res, next) {
  AccountCreationAndAuthentication.addUser(req.swagger.params, res, next);
};

module.exports.logUser = function logUser (req, res, next) {
  AccountCreationAndAuthentication.logUser(req.swagger.params, res, next);
};
