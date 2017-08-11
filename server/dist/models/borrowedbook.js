'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Book = sequelize.model('Book');
  var borrowedBook = sequelize.define('borrowedBook', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please select a book to borrow'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Invalid user'
        }
      }
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    returnedDate: {
      type: DataTypes.DATEONLY
    }
  }, {
    hooks: {
      afterCreate: function afterCreate(borrowed, options, next) {
        Book.findById(borrowed.bookId).then(function (book) {
          if (book.quantity > 0) {
            book.update({
              quantity: book.quantity - 1
            }, {
              where: { id: borrowed.bookId }
            }).then().catch(function (error) {
              return next(null, error.message);
            });
          }
        });
      }
    },
    freezeTableName: true,
    tableName: 'borrowedBook'
  });

  borrowedBook.belongsTo(Book, { foreignKey: 'bookId' });
  borrowedBook.afterBulkUpdate(function (borrowed) {
    var bookId = borrowed.attributes.bookId;
    Book.findById(bookId).then(function (book) {
      if (book.quantity >= 0) {
        book.update({
          quantity: book.quantity + 1
        }, {
          where: { id: bookId }
        }).then().catch(function () {});
      }
    });
  });

  borrowedBook.afterBulkCreate(function (borrowed) {
    var bookId = borrowed.bookId;
    Book.findById(bookId).then(function (book) {
      if (book.quantity >= 0) {
        book.update({
          quantity: book.quantity - 1
        }, {
          where: { id: bookId }
        }).then().catch(function () {});
      }
    });
  });

  return borrowedBook;
};