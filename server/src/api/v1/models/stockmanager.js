export default (sequelize, DataTypes) => {
  const Book = sequelize.model('Book');
  const stockManager = sequelize.define('stockManager', {
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

  stockManager.afterCreate((stock) => {
    Book.findById(stock.bookId).then((book) => {
      if (book.quantity >= 0) {
        book.update({
          quantity: book.quantity + stock.quantity
        }, {
          where: { id: stock.bookId, }
        })
          .then();
        // .catch(error => next(null, error.message));
      }
    });
  });

  return stockManager;
};
