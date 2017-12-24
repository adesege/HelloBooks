import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      oauthID: {
        type: DataTypes.STRING
      },
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
      userGroup: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'The email field is required'
          },
          isEmail: {
            args: true,
            msg: 'The email field is not a valid email address'
          },
          isUnique(email, next) {
            return User.find({
              where: { email },
              attributes: ['id']
            }).done((error) => {
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
    },
    {
      freezeTableName: true,
      tableName: 'User'
    }
  );

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.generateHash = (password) => {
    if (password === null || password === undefined) { return ''; }
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  return User;
};
