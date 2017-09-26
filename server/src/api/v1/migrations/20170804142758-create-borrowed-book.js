

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('borrowedBook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      isReturned: {
        type: Sequelize.BOOLEAN
      },
      expectedReturnDate: {
        type: Sequelize.DATEONLY
      },
      notificationSent: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('borrowedBook');
  }
};
