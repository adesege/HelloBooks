'use strict';

var url = require('url');


var BookCategories = require('./BookCategoriesService');


module.exports.addBookCategory = function addBookCategory (req, res, next) {
  BookCategories.addBookCategory(req.swagger.params, res, next);
};

module.exports.deleteBookCategory = function deleteBookCategory (req, res, next) {
  BookCategories.deleteBookCategory(req.swagger.params, res, next);
};

module.exports.editBookCategory = function editBookCategory (req, res, next) {
  BookCategories.editBookCategory(req.swagger.params, res, next);
};

module.exports.getBookCategory = function getBookCategory (req, res, next) {
  BookCategories.getBookCategory(req.swagger.params, res, next);
};
