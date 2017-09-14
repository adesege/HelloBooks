'use strict';

var url = require('url');


var UserBookActions = require('./UserBookActionsService');


module.exports.borrowBook = function borrowBook (req, res, next) {
  UserBookActions.borrowBook(req.swagger.params, res, next);
};

module.exports.getBorrowedBook = function getBorrowedBook (req, res, next) {
  UserBookActions.getBorrowedBook(req.swagger.params, res, next);
};

module.exports.returnBorrowedBook = function returnBorrowedBook (req, res, next) {
  UserBookActions.returnBorrowedBook(req.swagger.params, res, next);
};
