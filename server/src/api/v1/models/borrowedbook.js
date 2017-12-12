import moment from 'moment';
import models from './index';
import Utils from '../utils';

export default (sequelize, DataTypes) => {
  const Book = sequelize.model('Book');
  const borrowedBook = sequelize.define(
    'borrowedBook', {
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please select a book to borrow'
          },
          not: {
            args: ['[a-z]', 'i'],
            msg: 'Book ID must be integer'
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
          },
          not: {
            args: ['[a-z]', 'i'],
            msg: 'User ID must be integer'
          }
        }
      },
      isReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      expectedReturnDate: {
        type: DataTypes.DATEONLY
      },
      notificationSent: DataTypes.BOOLEAN
    },
    {
      hooks: {
        afterCreate: borrowed =>
          Book
            .findById(borrowed.bookId)
            .then((book) => {
              if (book.quantity > 0) {
                book
                  .update({
                    quantity: book.quantity - 1
                  }, {
                    where: { id: borrowed.bookId, }
                  })
                  .then(() => {
                    models.Notification.create({
                      bookId: borrowed.bookId,
                      userId: borrowed.userId,
                      notificationType: 'BOOK_BORROWED'
                    });
                  });
              }
            }),
        beforeCreate: borrowed =>
          models.User.findById(borrowed.userId)
            .then((user) => {
              if (user) {
                const expectedReturnDate = parseInt(Utils.returnDate(user.userRank), 10);
                borrowed.expectedReturnDate = moment().add(expectedReturnDate, 'days');
              }
            })
      },
      freezeTableName: true,
      tableName: 'borrowedBook'
    }
  );

  borrowedBook.associate = (model) => {
    borrowedBook.belongsTo(Book, { foreignKey: 'bookId' });
    borrowedBook.belongsTo(model.User, { foreignKey: 'userId' });
  };
  borrowedBook.afterBulkUpdate((borrowed) => {
    const { bookId, userId } = borrowed.attributes;
    if (bookId) {
      Book
        .findById(bookId)
        .then((book) => {
          if (book.quantity >= 0) {
            book.update({
              quantity: book.quantity + 1
            }, {
              where: { id: bookId, }
            })
              .then(() => {
                models.Notification.update(
                  {
                    notificationType: 'BOOK_RETURNED'
                  },
                  {
                    where: {
                      bookId,
                      userId,
                      notificationType: 'BOOK_BORROWED'
                    }
                  }
                );
              })
              .catch(() => {});
          }
        });
    }
  });

  return borrowedBook;
};
