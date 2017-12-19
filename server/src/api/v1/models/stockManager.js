export default (sequelize, DataTypes) => {
  const bookModel = sequelize.model('Book');
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
        },
        not: {
          args: ['[a-z]', 'i'],
          msg: 'Quantity must be integer'
        }
      }
    }
  }, {
    freezeTableName: true,
    tableName: 'stockManager'
  });

  stockManager.afterCreate(stock =>
    bookModel
      .findById(stock.bookId)
      .then((newBook) => {
        newBook.update({
          quantity: newBook.quantity + stock.quantity
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
