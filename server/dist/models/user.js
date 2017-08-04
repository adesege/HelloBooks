'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The name field is required'
        },
        is: {
          args: /^[\w ]+$/,
          msg: 'Name must contain alphabet characters only'
        },
        min: 3
      }
    },
    key: {
      type: DataTypes.STRING
    },
    userRank: DataTypes.STRING,
    userGroup: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'The email field is required' },
        isEmail: { args: true, msg: 'The email field is not a valid email address' },
        isUnique: function isUnique(email, next) {
          User.find({
            where: { email: email },
            attributes: ['id']
          }).done(function (error) {
            if (error) {
              return next('This email address already belongs to a user');
            }
            next();
          });
        }
      }
    },
    isActive: DataTypes.INTEGER,
    isValidated: DataTypes.INTEGER,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The password field is required'
        }
      }
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    freezeTableName: true,
    tableName: 'User'
  });

  User.prototype.validPassword = function validPassword(password) {
    return _bcrypt2.default.compareSync(password, this.password);
  };
  User.generateHash = function (password) {
    if (password === null || password === undefined) {
      return '';
    }
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8), null);
  };

  return User;
};