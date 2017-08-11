'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You haven\'t selected a book to update.'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The title field is required'
        },
        min: {
          args: 3,
          msg: 'Title field must not be less than 3 characters'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The description field is required'
        },
        escape: true
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Author field is required.'
        },
        min: {
          args: 3,
          msg: 'Author field must not be less than 3 characters'
        }

      }
    },
    bookURL: {
      type: DataTypes.STRING

    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input an ISBN number.'
        }
      }
    },
    publishedDate: DataTypes.STRING,
    bookCategoryId: DataTypes.INTEGER,
    coverPhotoId: DataTypes.INTEGER,
    documentPath: DataTypes.STRING(1000),
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'Book'
  });

  return Book;
};