
import cloudinary from 'cloudinary';


const CLOUDINARY_UPLOAD_PRESET = 'hellobooks';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/adesege/upload';

export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
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
      unique: true,
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
      type: DataTypes.STRING,

    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input an ISBN number.'
        }
      }
    },
    publishedDate: DataTypes.STRING,
    bookCategoryId: DataTypes.INTEGER,
    coverPhotoPath: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    documentPath: DataTypes.STRING(1000),
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },
  {
    freezeTableName: true,
    tableName: 'Book'
  });

  return Book;
};
