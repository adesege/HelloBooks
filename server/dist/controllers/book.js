'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = _models2.default.Book;
var borrowedBook = _models2.default.borrowedBook;
var stockManager = _models2.default.stockManager;

/**
 * @class bookClass
 * @classdesc Book Class
 */

var bookClass = function () {
  function bookClass() {
    _classCallCheck(this, bookClass);
  }

  _createClass(bookClass, null, [{
    key: 'create',

    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @return {void} 
     */
    value: function create(req, res) {
      var title = req.body.title || '';
      var description = req.body.description || '';
      var author = req.body.author || '';
      var publishedDate = req.body.published_date || '';
      var bookURL = req.body.book_url || '';
      var ISBN = req.body.isbn || '';
      var bookCategoryId = req.body.book_category || 0;
      var coverPhotoId = req.body.cover_photo || 0;
      var documentPath = req.body.document_path || '';
      var userId = req.decoded.user;
      var stock = req.body.stock;
      delete req.body.stock;

      Book.create({
        title: title,
        description: description,
        author: author,
        publishedDate: publishedDate,
        bookURL: bookURL,
        ISBN: ISBN,
        bookCategoryId: bookCategoryId,
        coverPhotoId: coverPhotoId,
        documentPath: documentPath,
        userId: userId
      }, {
        fields: ['title', 'description', 'author', 'userId', 'publishedDate', 'bookURL', 'ISBN', 'bookCategoryId', 'coverPhotoId', 'documentPath']
      }).then(function (id) {
        var bookId = id.get('id');
        stock.bookId = bookId;
        stockManager.create(stock).then(function () {
          return res.status(201).send({
            message: 'Book added successfully',
            id: bookId,
            status: 'Created',
            code: 201
          });
        }).catch(function (error) {
          return res.status(400).send({
            message: error.message,
            status: 'Bad Request',
            code: 400
          });
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
    }
    /**
       *
       * @param {object} req
       * @param {object} res
       * @returns {void}
       */

  }, {
    key: 'edit',
    value: function edit(req, res) {
      var title = req.body.title || '';
      var description = req.body.description || '';
      var author = req.body.author || '';
      var publishedDate = req.body.published_date || '';
      var bookURL = req.body.book_url || '';
      var ISBN = req.body.isbn || '';
      var bookCategoryId = req.body.book_category || 0;
      var coverPhotoId = req.body.cover_photo || 0;
      var documentPath = req.body.document_path || '';
      var id = req.query.book_id;

      Book.findOne({ where: { id: id } }).then(function (book) {
        if (book) {
          Book.update({
            title: title,
            description: description,
            author: author,
            publishedDate: publishedDate,
            bookURL: bookURL,
            ISBN: ISBN,
            bookCategoryId: bookCategoryId,
            coverPhotoId: coverPhotoId,
            documentPath: documentPath
          }, {
            where: { id: id }
          }).then(function () {
            res.status(200).send({ message: 'Book successfully updated', status: 'OK', code: 200 });
          }).catch(function (error) {
            return res.status(400).send({
              message: error.message,
              status: 'Bad Request',
              code: 400
            });
          });
        } else {
          res.status(400).send({ message: 'Book not found', status: 'Not Found', code: 404 });
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
      Book.findAll().then(function (books) {
        res.status(200).send({ message: books, status: 'OK', code: 200 });
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
     * @param {object} req 
     * @param {object} res
     * @return {object} response 
     */

  }, {
    key: 'borrowBook',
    value: function borrowBook(req, res) {
      var bookId = req.query.book_id;
      var userId = req.params.userId;
      var returnedDate = req.body.return_date || '';
      var isReturned = false;
      returnedDate = (0, _moment2.default)(returnedDate, 'DD-MM-YYYY');

      Book.findById(bookId).then(function (book) {
        if (!book) {
          res.status(404).send({
            message: 'Sorry, we can\'t find this book',
            status: 'Not Found',
            code: 404
          });
          return;
        }

        if (book.quantity <= 0) {
          res.status(404).send({
            message: 'There are no more copies left of this book to borrow',
            status: 'Not Found',
            code: 404
          });
          return;
        }

        borrowedBook.findOne({ where: { bookId: bookId, userId: userId, isReturned: isReturned } }).then(function (borrowed) {
          if (borrowed) {
            res.status(403).send({
              message: 'You have already borrowed this book. Please return it before you can borrow it again.',
              status: 'Forbidden',
              code: 403 });
            return;
          }
          borrowedBook.create({
            bookId: bookId,
            userId: userId,
            isReturned: isReturned,
            returnedDate: returnedDate
          }, {
            fields: ['bookId', 'userId', 'returnedDate', 'isReturned']
          }).then(function (id) {
            return res.status(201).send({
              message: 'You have successfully  borrowed this book',
              status: 'Created',
              id: id.get('id'),
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
        }).catch(function (error) {
          return res.status(400).send({
            message: error.message,
            status: 'Bad Request',
            code: 400
          });
        });
      }).catch(function () {});
    }
    /**
      * 
      * @param {object} req 
      * @param {object} res 
      * @return {object} response
    */

  }, {
    key: 'getBorrowedBook',
    value: function getBorrowedBook(req, res) {
      var userId = req.params.userId;
      var isReturned = req.query.returned;

      borrowedBook.findAll({
        include: [Book],
        where: { userId: userId, isReturned: isReturned }
      }).then(function (books) {
        if (books) {
          res.status(200).send({
            message: books,
            status: 'OK',
            code: 200 });
        } else {
          res.status(404).send({ message: 'No record available', status: 'No Content', code: 404 });
        }
      }).catch(function (error) {
        return res.status(400).send({
          message: error.message,
          status: 'Bad Request',
          code: 400
        });
      });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @return {object} response
     */

  }, {
    key: 'returnBorrowedBook',
    value: function returnBorrowedBook(req, res) {
      var userId = req.params.userId;
      var bookId = req.body.book_id;
      var isReturned = true;
      var id = req.query.id;

      if (userId === undefined) {
        res.status(400).send({
          message: 'Invalid user',
          status: 'Bad Request',
          code: 400 });
        return;
      }

      if (bookId === undefined) {
        res.status(400).send({
          message: 'Please select a book to return',
          status: 'Bad Request',
          code: 400 });
        return;
      }

      borrowedBook.findOne({
        where: { id: id, userId: userId, bookId: bookId, isReturned: false }
      }).then(function (books) {
        if (books) {
          borrowedBook.update({
            isReturned: isReturned,
            bookId: bookId
          }, {
            where: { id: id, userId: userId, bookId: bookId, isReturned: false }, individualHooks: true
          }).then(function () {
            res.status(200).send({
              message: 'You have successfully returned this book',
              status: 'OK',
              code: 200 });
          }).catch(function (error) {
            return res.status(400).send({
              message: error.message,
              status: 'Bad Request',
              code: 400
            });
          });
        } else {
          return res.status(404).json({ message: 'No record available', status: 'Not Found', code: 404 });
        }
      }).catch(function (error) {
        return res.status(400).send({
          message: error.message,
          status: 'Bad Request',
          code: 400
        });
      });
    }
  }]);

  return bookClass;
}();

exports.default = bookClass;