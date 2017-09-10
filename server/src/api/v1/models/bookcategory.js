export default (sequelize, DataTypes) => {
  const bookCategory = sequelize.define('bookCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a category name'
        }
      }
    }
  }, {
    freezeTableName: true,
    tableName: 'bookCategory'
  });

  bookCategory.associate = (models) => {
    bookCategory.hasMany(models.Book, {
      foreignKey: 'bookCategoryId'
    });
  };
  return bookCategory;
};
