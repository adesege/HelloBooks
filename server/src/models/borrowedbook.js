export default (sequelize, DataTypes) => {
  const Book = sequelize.model('Book');
  const borrowedBook = sequelize.define('borrowedBook', {
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
  },
  {
    hooks: {
      afterCreate: (borrowed, options, next) => {
        Book.findById(borrowed.bookId).then((book) => {
          if (book.quantity > 0) {
            book.update({
              quantity: book.quantity - 1
            }, {
              where: { id: borrowed.bookId, }
            })
              .then()
              .catch(error => next(null, error.message));
          }
        });
      }
    },
    freezeTableName: true,
    tableName: 'borrowedBook'
  });

  borrowedBook.belongsTo(Book, { foreignKey: 'bookId' });
  borrowedBook.afterBulkUpdate((borrowed) => {
    const bookId = borrowed.attributes.bookId;
    Book.findById(bookId).then((book) => {
      if (book.quantity >= 0) {
        book.update({
          quantity: book.quantity + 1
        }, {
          where: { id: bookId, }
        })
          .then()
          .catch(() => {});
      }
    });
  });

  return borrowedBook;
};
