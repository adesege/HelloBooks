

export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    notificationType: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Notification'
  });
  return Notification;
};
