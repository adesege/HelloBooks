'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = _models2.default.Book;
var stockManager = _models2.default.stockManager;

/**
 * @class bookClass
 * @classdesc Book Class
 */

var stockManagerClass = function () {
  function stockManagerClass() {
    _classCallCheck(this, stockManagerClass);
  }

  _createClass(stockManagerClass, null, [{
    key: 'create',

    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @return {void} 
     */
    value: function create(req, res) {
      var quantity = req.body.quantity || '';
      var recordDate = req.body.record_date || '';
      var bookId = req.query.book_id || req.body.book_id || '';

      Book.findById(bookId).then(function (book) {
        if (book) {
          stockManager.create({
            quantity: quantity,
            recordDate: recordDate,
            bookId: bookId
          }, {
            fields: ['quantity', 'recordDate', 'bookId']
          }).then(function (id) {
            res.status(201).send({
              message: 'Stock added successfully',
              id: id.get('id'),
              status: 'Created',
              code: 201
            });
          }).catch(function (error) {
            return res.status(400).send({
              message: error.message,
              status: 'Bad Request',
              code: 400
            });
          }).catch(function (error) {
            return res.status(500).send({
              message: error.message,
              status: 'Internal Server Error',
              code: 500
            });
          });
        } else {
          return res.status(404).send({
            message: 'Book not found',
            status: 'Not Found',
            code: 404
          });
        }
      });
    }
    /**
       * 
       * @param {object} req 
       * @param {object} res
       * @returns {void} 
       */

  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var id = req.query.id || '';

      stockManager.findById(id).then(function (stock) {
        if (stock !== null) {
          stockManager.destroy({
            where: { id: id }
          }).then(function () {
            Book.findById(stock.bookId).then(function (book) {
              if (book.quantity >= 0) {
                book.update({ quantity: book.quantity - stock.quantity }, { where: { id: stock.bookId }
                }).then().catch(function (error) {
                  return res.status(400).send({
                    message: error.message,
                    status: 'Bad Request',
                    code: 400
                  });
                });
              }
            });
            return res.status(200).send({ message: 'Stock deleted successfully', status: 'OK', code: 200 });
          }).catch(function (error) {
            return res.status(400).send({
              message: error.message,
              status: 'Bad Request',
              code: 400
            });
          });
        } else {
          return res.status(400).send({ message: 'Stock not found', status: 'Not Found', code: 404 });
        }
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message,
          status: 'Internal Server Error',
          code: 500
        });
      });
    }
    /**
     * 
     * @method get
     * @param {object} req 
     * @param {object} res 
     * @return {object} response
     */

  }, {
    key: 'get',
    value: function get(req, res) {
      stockManager.findAll().then(function (stocks) {
        if (stocks) {
          res.status(200).send({ message: stocks, status: 'OK', code: 200 });
        } else {
          res.status(404).send({ message: 'No record available', status: 'No Content', code: 404 });
        }
      }).catch(function (error) {
        return res.status(500).send({
          message: error.message,
          status: 'Internal Server Error',
          code: 500
        });
      });
    }
  }]);

  return stockManagerClass;
}();

exports.default = stockManagerClass;