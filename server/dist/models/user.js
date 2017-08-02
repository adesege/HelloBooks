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
        isAlpha: true,
        notEmpty: true,
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
        isEmail: true,
        notEmpty: true,
        isUnique: function isUnique(value, next) {
          User.find({
            where: { email: value },
            attributes: ['id']
          }).done(function (error) {
            if (error) {
              return next('This email address already belongs to someone');
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
      notEmpty: true,
      allowNull: false,
      validate: {}
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

  User.prototype.validPassword = function (password) {
    return _bcrypt2.default.compareSync(password, undefined.password);
  };
  User.generateHash = function (password) {
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8), null);
  };

  return User;
};