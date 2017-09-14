'use strict';

var url = require('url');


var StockManager = require('./StockManagerService');


module.exports.addBookStock = function addBookStock (req, res, next) {
  StockManager.addBookStock(req.swagger.params, res, next);
};

module.exports.deleteBookStock = function deleteBookStock (req, res, next) {
  StockManager.deleteBookStock(req.swagger.params, res, next);
};

module.exports.getBookStocks = function getBookStocks (req, res, next) {
  StockManager.getBookStocks(req.swagger.params, res, next);
};
