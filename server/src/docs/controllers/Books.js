'use strict';

var url = require('url');


var Books = require('./BooksService');


module.exports.addBook = function addBook (req, res, next) {
  Books.addBook(req.swagger.params, res, next);
};

module.exports.editBook = function editBook (req, res, next) {
  Books.editBook(req.swagger.params, res, next);
};
