import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
        isUnique(value, next) {
          User.find({
            where: { email: value },
            attributes: ['id']
          }).done((error) => {
            if (error) { return next('This email address already belongs to someone'); }
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
      validate: {
      }
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  }, {
    freezeTableName: true,
    tableName: 'User'
  });

  User.prototype.validPassword = password => bcrypt.compareSync(password, this.password);
  User.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  return User;
};
