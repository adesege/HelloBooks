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
var borrowedBook = _models2.default.borrowedBook;
var stockManager = _models2.default.stockManager;

/**
 * @class bookClass
 * @classdesc Book Class
 */

var BookClass = function () {
  function BookClass() {
    _classCallCheck(this, BookClass);
  }

  _createClass(BookClass, null, [{
    key: 'create',

    /**
     * @method create
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
            id: bookId
          });
        }).catch(function (error) {
          return res.status(400).send({ message: error.message });
        });
      }).catch(function (error) {
        return res.status(400).send({ message: error.message });
      }).catch(function (error) {
        return res.status(500).send({ message: error.message });
      });
    }
    /**
       * @method edit
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
            res.status(200).send({ message: 'Book successfully updated' });
          }).catch(function (error) {
            return res.status(400).send({ message: error.message });
          });
        } else {
          res.status(400).send({ message: 'Book not found', status: 'Not Found', code: 404 });
        }
      }).catch(function (error) {
        return res.status(500).send({ message: error.message });
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
      // get all the books in the database
      Book.findAll().then(function (books) {
        res.status(200).send({ message: books });
      }).catch(function (error) {
        return res.status(500).send({ message: error.message });
      });
    }
    /**
     * @method borrowBook
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
      returnedDate = new Date(returnedDate);

      Book.findById(bookId).then(function (book) {
        if (!book) {
          // check if no book can be found
          return res.status(404).send({ message: 'Sorry, we can\'t find this book' });
        }

        if (book.quantity <= 0) {
          // check if book quantity is less than or equal to zero
          return res.status(404).send({ message: 'There are no more copies left of this book to borrow' });
        }

        borrowedBook.findOne({ where: { bookId: bookId, userId: userId, isReturned: isReturned } }).then(function (borrowed) {
          if (borrowed) {
            return res.status(403).send({
              message: 'You have already borrowed this book. Please return it before you can borrow it again.' });
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
              id: id.get('id')
            });
          }).catch(function (error) {
            return res.status(400).send({
              message: error.message
            });
          }).catch(function (error) {
            return res.status(500).send({
              message: error.message
            });
          });
        }).catch(function (error) {
          return res.status(400).send({
            message: error.message
          });
        });
      }).catch(function () {});
    }
    /**
      * @method getBorrowedBook
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
            message: books
          });
        } else {
          res.status(404).send({ message: 'No record available' });
        }
      }).catch(function (error) {
        return res.status(400).send({
          message: error.message
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
        return res.status(400).send({
          message: 'Invalid user'
        });
      }

      if (bookId === undefined) {
        return res.status(400).send({
          message: 'Please select a book to return'
        });
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
            res.status(200).send({ message: 'You have successfully returned this book' });
          }).catch(function (error) {
            return res.status(400).send({ message: error.message });
          });
        } else {
          return res.status(404).json({ message: 'No record available', status: 'Not Found', code: 404 });
        }
      }).catch(function (error) {
        return res.status(400).send({ message: error.message });
      });
    }
  }]);

  return BookClass;
}();

exports.default = BookClass;