

export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    notificationType: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Notification'
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'Book'
    });
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User'
    });
  };


  return Notification;
};
