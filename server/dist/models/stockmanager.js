'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Book = sequelize.model('Book');
  var stockManager = sequelize.define('stockManager', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please select a book'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty'
        }
      }
    },
    recordDate: DataTypes.DATEONLY
  }, {
    freezeTableName: true,
    tableName: 'stockManager'
  });

  stockManager.afterCreate(function (stock, options, next) {
    Book.findById(stock.bookId).then(function (book) {
      if (book.quantity >= 0) {
        book.update({
          quantity: book.quantity + stock.quantity
        }, {
          where: { id: stock.bookId }
        }).then().catch(function (error) {
          return next(null, error.message);
        });
      }
    });
  });

  return stockManager;
};