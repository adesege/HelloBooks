

export default (sequelize, DataTypes) => {
  const notification = sequelize.define('Notification', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    notificationType: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Notification'
  });

  notification.associate = (models) => {
    notification.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'Book'
    });
    notification.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User'
    });
  };


  return notification;
};
