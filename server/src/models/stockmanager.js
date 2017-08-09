export default (sequelize, DataTypes) => {
  const stockManager = sequelize.define('stockManager', {
    bookId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    recordDate: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return stockManager;
};
