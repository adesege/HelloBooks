'use strict';
module.exports = function(sequelize, DataTypes) {
  var borrowedBook = sequelize.define('borrowedBook', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    returnedDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return borrowedBook;
};