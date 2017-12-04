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
    }
  }, {
    freezeTableName: true,
    tableName: 'stockManager'
  });

  stockManager.afterCreate(stock =>
    Book
      .findById(stock.bookId)
      .then((book) => {
        book.update({
          quantity: book.quantity + stock.quantity
        }, {
          where: { id: stock.bookId, }
        })
          .then();
      }));

  stockManager.associate = (models) => {
    stockManager.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      as: 'book'
    });
  };

  return stockManager;
};
